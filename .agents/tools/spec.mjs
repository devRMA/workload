#!/usr/bin/env node
/**
 * CLI do SDD.
 *   node .agents/tools/spec.mjs new "nome da feature"   → cria .specs/NNNN-slug a partir dos templates
 *   node .agents/tools/spec.mjs status                   → estado de cada spec e quem a segura
 */
import { copyFileSync, mkdirSync, readFileSync, readdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const specsDir = resolve(root, '.specs')
const templates = resolve(specsDir, 'templates')

const specFolders = () =>
	readdirSync(specsDir, { withFileTypes: true })
		.filter((d) => d.isDirectory() && /^\d{4}-/.test(d.name))
		.map((d) => d.name)
		.sort()

const field = (body, label) =>
	body.match(new RegExp(`^\\*\\*${label}:\\*\\*\\s*(.+)$`, 'm'))?.[1].replace(/`/g, '').trim() ?? '?'

const [, , cmd, ...rest] = process.argv

if (cmd === 'new') {
	const title = rest.join(' ').trim()
	if (!title) {
		console.error('uso: spec.mjs new "nome da feature"')
		process.exit(1)
	}

	const slug = title
		.toLowerCase()
		.normalize('NFD')
		.replace(/[̀-ͯ]/g, '')
		.replace(/[^a-z0-9]+/g, '-')
		.replace(/^-|-$/g, '')

	const last = specFolders().at(-1)
	const id = String((last ? Number(last.slice(0, 4)) : 0) + 1).padStart(4, '0')
	const dir = resolve(specsDir, `${id}-${slug}`)

	mkdirSync(resolve(dir, 'reports'), { recursive: true })
	mkdirSync(resolve(dir, 'evidence'), { recursive: true })

	for (const f of ['spec.md', 'design.md', 'copy.md', 'plan.md', 'STATUS.md']) {
		const body = readFileSync(resolve(templates, f), 'utf8')
			.replace(/^# NNNN — .*$/m, `# ${id} — ${title}`)
			.replace(/NNNN/g, id)
		writeFileSync(resolve(dir, f), body)
	}
	copyFileSync(resolve(templates, 'report.md'), resolve(dir, 'reports', '_template.md'))

	const index = resolve(specsDir, 'INDEX.md')
	const row = `| ${id} | [${title}](${id}-${slug}/spec.md) | draft | product-manager |\n`
	writeFileSync(
		index,
		readFileSync(index, 'utf8').replace(/\| — \| _none yet_ \| — \| — \|\n/, '').trimEnd() + `\n${row}`,
	)

	console.log(`criado .specs/${id}-${slug}/`)
	console.log('próximo: product-manager escreve spec.md')
} else if (cmd === 'status') {
	for (const folder of specFolders()) {
		let state = '?'
		let next = '?'
		let pending = []
		try {
			const body = readFileSync(resolve(specsDir, folder, 'STATUS.md'), 'utf8')
			state = field(body, 'State')
			next = field(body, 'Next agent')
			pending = [...body.matchAll(/^\| (\w[\w-]*) \| ([\w-]+) \| (pending|rejected) \|/gm)].map(
				(m) => m[1],
			)
		} catch {
			state = 'sem STATUS.md'
		}
		console.log(`${folder.padEnd(34)} ${state.padEnd(13)} → ${next}`)
		if (pending.length) console.log(`${' '.repeat(34)} gates abertos: ${pending.join(', ')}`)
	}
} else {
	console.log('uso: spec.mjs new "nome da feature" | spec.mjs status')
	process.exit(1)
}
