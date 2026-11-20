#!/usr/bin/env node
/**
 * Gate de integridade da documentação — roda ANTES de qualquer commit/PR.
 *   node .agents/tools/docs-check.mjs [NNNN-slug]
 * Checagens mecânicas apenas; o julgamento editorial é da skill docs-integrity.
 * Sai 1 se houver qualquer falha.
 */
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = resolve(dirname(fileURLToPath(import.meta.url)), '../..')
const specsDir = resolve(root, '.specs')
const fails = []
const warns = []
const ok = []

const read = (p) => (existsSync(p) ? readFileSync(p, 'utf8') : null)
const fail = (m) => fails.push(m)
const warn = (m) => warns.push(m)
const pass = (m) => ok.push(m)

// 1. documentos raiz obrigatórios
for (const f of ['AGENTS.md', 'CLAUDE.md', 'PRODUCT.md', 'DESIGN.md', 'README.md']) {
	existsSync(resolve(root, f)) ? pass(`${f} presente`) : fail(`${f} ausente na raiz`)
}

// 2. CLAUDE.md deve apenas apontar para AGENTS.md
const claude = read(resolve(root, 'CLAUDE.md'))
if (claude && !claude.includes('AGENTS.md')) fail('CLAUDE.md não referencia AGENTS.md')

// 3. symlinks dos agents
const agentsSrc = resolve(root, '.agents/agents')
const claudeAgents = resolve(root, '.claude/agents')
const squad = existsSync(agentsSrc) ? readdirSync(agentsSrc).filter((f) => f.endsWith('.md')) : []
if (squad.length !== 10) fail(`esperados 10 agents em .agents/agents, encontrados ${squad.length}`)
for (const a of squad) {
	const link = resolve(claudeAgents, a)
	if (!existsSync(link)) fail(`.claude/agents/${a} ausente (symlink quebrado ou não criado)`)
	else if (!statSync(link).isFile()) fail(`.claude/agents/${a} não resolve para um arquivo`)
}
if (squad.length === 10 && !fails.some((f) => f.includes('.claude/agents'))) pass(`${squad.length} agents com symlinks íntegros`)

// 4. frontmatter de cada agent
for (const a of squad) {
	const body = read(resolve(agentsSrc, a))
	const fm = body?.match(/^---\n([\s\S]*?)\n---/)?.[1]
	if (!fm) {
		fail(`${a}: sem frontmatter YAML`)
		continue
	}
	for (const k of ['name', 'description', 'model', 'tools']) {
		if (!new RegExp(`^${k}:`, 'm').test(fm)) fail(`${a}: frontmatter sem "${k}"`)
	}
	const name = fm.match(/^name:\s*(.+)$/m)?.[1].trim()
	if (name && `${name}.md` !== a) fail(`${a}: campo name "${name}" não bate com o arquivo`)
	if (!body.includes('AGENTS.md')) warn(`${a}: não instrui a ler AGENTS.md`)
	if (!body.includes('.agents/memory')) warn(`${a}: não instrui a consultar a memória da squad`)
}

// 5. memória
if (!existsSync(resolve(root, '.agents/memory/LESSONS.md'))) fail('.agents/memory/LESSONS.md ausente')
else {
	const idx = read(resolve(root, '.agents/memory/LESSONS.md'))
	const lessonFiles = readdirSync(resolve(root, '.agents/memory/lessons')).filter((f) => /^\d{3}-/.test(f))
	for (const f of lessonFiles) {
		if (!idx.includes(f)) fail(`lição ${f} não está no índice LESSONS.md — rode lesson.mjs para regerar`)
		const fm = read(resolve(root, '.agents/memory/lessons', f))
		for (const s of ['## What happened', '## Why it happened', '## The rule', '## How to verify']) {
			if (!fm.includes(s)) fail(`lição ${f}: seção "${s}" não preenchida`)
		}
		if (/<[a-z ]+>/.test(fm.split('## What happened')[1] ?? '')) fail(`lição ${f}: placeholders do template não preenchidos`)
	}
	if (lessonFiles.length > 30) fail(`${lessonFiles.length} lições ativas — acima do teto de 30, promova ou aposente`)
	pass(`memória íntegra (${lessonFiles.length} lições ativas)`)
}

const HTML_ELEMENTS = new Set([
	'article', 'aside', 'button', 'caption', 'datalist', 'details', 'dialog', 'fieldset', 'figcaption',
	'figure', 'footer', 'header', 'heading', 'iframe', 'legend', 'optgroup', 'picture', 'progress',
	'section', 'select', 'summary', 'tbody', 'textarea', 'tfoot', 'thead',
])

// 6. specs
const specFolders = existsSync(specsDir)
	? readdirSync(specsDir, { withFileTypes: true }).filter((d) => d.isDirectory() && /^\d{4}-/.test(d.name)).map((d) => d.name).sort()
	: []
const index = read(resolve(specsDir, 'INDEX.md')) ?? ''
const target = process.argv[2]

for (const folder of specFolders) {
	if (!index.includes(folder)) fail(`spec ${folder} não está registrada em .specs/INDEX.md`)

	const status = read(resolve(specsDir, folder, 'STATUS.md'))
	if (!status) {
		fail(`spec ${folder}: STATUS.md ausente`)
		continue
	}
	const state = status.match(/^\*\*State:\*\*\s*(.+)$/m)?.[1].trim()
	if (!state || state.includes('|')) fail(`spec ${folder}: STATUS.md com State não preenchido`)

	// arquivo na pasta certa
	for (const f of readdirSync(resolve(specsDir, folder))) {
		if (/^(qa|audit|audit-preview|release|ponytail)\.md$/.test(f))
			fail(`spec ${folder}: ${f} está na raiz da spec — reports vão em reports/`)
	}

	const isTarget = !target || folder === target
	if (isTarget && state === 'done') {
		for (const f of ['spec.md', 'legal.md', 'design.md', 'copy.md', 'plan.md']) {
			if (!existsSync(resolve(specsDir, folder, f))) fail(`spec ${folder}: marcada done sem ${f}`)
		}
		for (const r of ['qa.md', 'audit.md', 'legal.md', 'ponytail.md']) {
			if (!existsSync(resolve(specsDir, folder, 'reports', r))) fail(`spec ${folder}: marcada done sem reports/${r}`)
		}
		const pending = [...status.matchAll(/^\| ([\w-]+) \| [\w-]+ \| (pending|rejected) \|/gm)].map((m) => m[1])
		if (pending.length) fail(`spec ${folder}: done com gates ainda ${pending.join(', ')}`)
		if (/\| .+ \| (pending|in-progress) \|/.test(status.split('## Tasks')[1]?.split('## Blockers')[0] ?? ''))
			fail(`spec ${folder}: done com tarefas não concluídas`)
		const blockers = status.split('## Blockers')[1]?.split('## Decisions log')[0]?.trim() ?? ''
		if (blockers && !/^<.*>$/s.test(blockers) && blockers.toLowerCase() !== 'none')
			fail(`spec ${folder}: done com blockers em aberto`)
	}

	// placeholders de template não preenchidos em artefatos entregues
	if (isTarget) {
		for (const f of ['spec.md', 'legal.md', 'design.md', 'copy.md', 'plan.md']) {
			const body = read(resolve(specsDir, folder, f))
			const leftovers = [...(body ?? '').matchAll(/<([a-z][a-z -]{6,})>/g)].map((m) => m[1]).filter((t) => !HTML_ELEMENTS.has(t))
			if (leftovers.length) warn(`spec ${folder}/${f}: ainda contém placeholders do template (${leftovers[0]})`)
		}
	}
}
if (specFolders.length && !fails.some((f) => f.includes('spec '))) pass(`${specFolders.length} spec(s) consistentes`)

// 7. evidence não pode ser commitada
const gitignore = read(resolve(root, '.gitignore')) ?? ''
if (!/^\.specs\/\*\/evidence\/$/m.test(gitignore)) fail('.gitignore não ignora .specs/*/evidence/')

for (const m of ok) console.log(`  ok    ${m}`)
for (const m of warns) console.log(`  aviso ${m}`)
for (const m of fails) console.log(`  FALHA ${m}`)
console.log(`\n${fails.length} falha(s), ${warns.length} aviso(s)`)
process.exit(fails.length ? 1 : 0)
