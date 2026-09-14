#!/usr/bin/env node
/**
 * Ledger de aprendizado da squad (compound engineering).
 *   lesson.mjs new "título" --agent tech-lead --domain qa --spec 0007
 *   lesson.mjs list [--agent <name>]
 *   lesson.mjs confirm <id>      → +1 em confirmed; avisa quando atinge 3 (promover)
 *   lesson.mjs retire <id> "motivo"
 */
import { mkdirSync, readFileSync, readdirSync, renameSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const memDir = resolve(root, '.agents/memory')
const lessonsDir = resolve(memDir, 'lessons')
const archiveDir = resolve(memDir, 'archive')
const indexPath = resolve(memDir, 'LESSONS.md')
const CAP = 30

const files = () =>
	readdirSync(lessonsDir)
		.filter((f) => /^\d{3}-.*\.md$/.test(f))
		.sort()

const parse = (file) => {
	const body = readFileSync(resolve(lessonsDir, file), 'utf8')
	const fm = body.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? ''
	const get = (k) => fm.match(new RegExp(`^${k}:\\s*(.*)$`, 'm'))?.[1].trim() ?? ''
	return { file, body, id: get('id'), title: get('title'), agent: get('applies-to'), domain: get('domain'), spec: get('spec'), confirmed: Number(get('confirmed') || 0) }
}

const rewriteIndex = () => {
	const rows = files().map(parse)
	const table = rows.length
		? rows.map((l) => `| ${l.id} | [${l.title}](lessons/${l.file}) | ${l.agent} | ${l.spec} | ${l.confirmed} |`).join('\n')
		: '| — | _no lessons yet — the squad has not run_ | — | — | — |'
	const head = readFileSync(indexPath, 'utf8').split('| # | Lesson |')[0]
	writeFileSync(
		indexPath,
		`${head}| # | Lesson | Applies to | Spec | Confirmed |\n|---|---|---|---|---|\n${table}\n\n---\n\n**Active: ${rows.length} / ${CAP}.** At the cap, promote or retire before writing a new one.\n`,
	)
}

const arg = (flag, fb = '') => {
	const i = process.argv.indexOf(flag)
	return i === -1 ? fb : process.argv[i + 1]
}

const [, , cmd, ...rest] = process.argv

if (cmd === 'new') {
	const title = rest.filter((a) => !a.startsWith('--') && rest[rest.indexOf(a) - 1]?.startsWith('--') !== true).join(' ').trim()
	if (!title) {
		console.error('uso: lesson.mjs new "título" --agent <name> --domain <domain> --spec <NNNN>')
		process.exit(1)
	}
	const current = files()
	if (current.length >= CAP) {
		console.error(`limite de ${CAP} lições ativas atingido — promova (confirmed >= 3) ou aposente antes de criar outra.`)
		process.exit(1)
	}
	const id = String((current.length ? Number(parse(current.at(-1)).id) : 0) + 1).padStart(3, '0')
	const slug = title.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
	const file = `${id}-${slug}.md`

	mkdirSync(lessonsDir, { recursive: true })
	writeFileSync(
		resolve(lessonsDir, file),
		readFileSync(resolve(lessonsDir, '_template.md'), 'utf8')
			.replace('id: NNN', `id: ${id}`)
			.replace('title: <short, imperative — the rule, not the incident>', `title: ${title}`)
			.replace('applies-to: <agent name, or "all">', `applies-to: ${arg('--agent', 'all')}`)
			.replace('domain: <spec | design | copy | plan | build | qa | audit | release | recruiter | docs>', `domain: ${arg('--domain', 'build')}`)
			.replace('spec: <NNNN, or "human-feedback">', `spec: ${arg('--spec', 'human-feedback')}`)
			.replace('created: YYYY-MM-DD', `created: ${new Date().toISOString().slice(0, 10)}`),
	)
	rewriteIndex()
	console.log(`criada .agents/memory/lessons/${file} — preencha as quatro seções.`)
} else if (cmd === 'list') {
	const want = arg('--agent')
	for (const l of files().map(parse)) {
		if (want && l.agent !== want && l.agent !== 'all') continue
		console.log(`${l.id} [${l.agent}/${l.domain}] ${l.title}  (confirmed ${l.confirmed})`)
	}
} else if (cmd === 'confirm') {
	const l = files().map(parse).find((x) => x.id === rest[0]?.padStart(3, '0'))
	if (!l) {
		console.error(`lição ${rest[0]} não encontrada`)
		process.exit(1)
	}
	const next = l.confirmed + 1
	writeFileSync(resolve(lessonsDir, l.file), l.body.replace(/^confirmed:.*$/m, `confirmed: ${next}`))
	rewriteIndex()
	console.log(`${l.id} confirmed: ${next}`)
	if (next >= 3)
		console.log(`PROMOVER: mova a regra de ${l.id} para .agents/agents/${l.agent}.md (ou AGENTS.md se for transversal) e rode: lesson.mjs retire ${l.id} "promovida"`)
} else if (cmd === 'retire') {
	const l = files().map(parse).find((x) => x.id === rest[0]?.padStart(3, '0'))
	if (!l) {
		console.error(`lição ${rest[0]} não encontrada`)
		process.exit(1)
	}
	const reason = rest.slice(1).join(' ') || 'sem motivo informado'
	mkdirSync(archiveDir, { recursive: true })
	writeFileSync(resolve(lessonsDir, l.file), `${l.body}\n\n## Retired\n\n${new Date().toISOString().slice(0, 10)} — ${reason}\n`)
	renameSync(resolve(lessonsDir, l.file), resolve(archiveDir, l.file))
	rewriteIndex()
	console.log(`${l.id} arquivada: ${reason}`)
} else {
	console.log('uso: lesson.mjs new "título" [--agent X --domain Y --spec NNNN] | list [--agent X] | confirm <id> | retire <id> "motivo"')
	process.exit(1)
}
