#!/usr/bin/env node
/**
 * Captura evidência de browser real para os gates da squad (qa, auditor, recruiter).
 * Sobe `next dev` se a porta estiver livre, percorre os viewports/temas,
 * roda axe-core e grava screenshots + report.json.
 *
 * node .agents/tools/preview.mjs --out .specs/0002-slug/evidence [--path /] [--port 3100]
 */
import { spawn } from 'node:child_process'
import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import { AxeBuilder } from '@axe-core/playwright'
import { chromium } from 'playwright'

const arg = (flag, fallback) => {
	const i = process.argv.indexOf(flag)
	return i === -1 ? fallback : process.argv[i + 1]
}

const out = resolve(arg('--out', '.specs/scratch/evidence'))
const port = Number(arg('--port', '3100'))
const routes = arg('--path', '/').split(',')
// --base-url aponta para um deploy remoto (preview da Vercel); sem ele, sobe o dev local.
const remote = arg('--base-url', null)
const base = remote ?? `http://127.0.0.1:${port}`

const VIEWPORTS = {
	desktop: { width: 1440, height: 900 },
	mobile: { width: 390, height: 844 },
}
const THEMES = ['light', 'dark']

const waitForServer = async (deadlineMs = 120_000) => {
	const until = Date.now() + deadlineMs
	while (Date.now() < until) {
		try {
			const res = await fetch(base, { signal: AbortSignal.timeout(2000) })
			if (res.ok) return true
		} catch {}
		await new Promise((r) => setTimeout(r, 1000))
	}
	throw new Error(`servidor não respondeu em ${base}`)
}

const isUp = async () => {
	try {
		return (await fetch(base, { signal: AbortSignal.timeout(1500) })).ok
	} catch {
		return false
	}
}

mkdirSync(out, { recursive: true })

let server = null
if (remote) {
	await waitForServer(60_000)
} else if (!(await isUp())) {
	server = spawn('pnpm', ['exec', 'next', 'dev', '-p', String(port)], {
		stdio: 'ignore',
		detached: true,
	})
	await waitForServer()
}

const report = { base, routes, capturedAt: new Date().toISOString(), pages: [] }
const browser = await chromium.launch()

try {
	for (const route of routes) {
		for (const [vpName, viewport] of Object.entries(VIEWPORTS)) {
			for (const theme of THEMES) {
				const context = await browser.newContext({
					viewport,
					colorScheme: theme,
					deviceScaleFactor: 2,
				})
				const page = await context.newPage()
				const consoleErrors = []
				page.on('console', (m) => {
					if (m.type() === 'error') consoleErrors.push(m.text())
				})
				page.on('pageerror', (e) => consoleErrors.push(String(e)))

				await page.goto(base + route, { waitUntil: 'networkidle' })

				const slug = `${route.replace(/\W+/g, '_')}-${vpName}-${theme}`
				const file = `${slug}.png`
				await page.screenshot({ path: resolve(out, file), fullPage: true })

				const axe = await new AxeBuilder({ page })
					.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
					.analyze()

				const toViolations = (violations) =>
					violations.map((v) => ({
						id: v.id,
						impact: v.impact,
						help: v.help,
						nodes: v.nodes.length,
						targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
						...(v.id === 'color-contrast'
							? { ratios: v.nodes.map((n) => n.any?.[0]?.data?.contrastRatio ?? null) }
							: {}),
					}))
				const toIncomplete = (incomplete) =>
					incomplete
						.filter((v) => v.id === 'color-contrast')
						.map((v) => ({
							nodes: v.nodes.length,
							targets: v.nodes.slice(0, 5).map((n) => n.target.join(' ')),
						}))

				const dialogs = []
				const triggers = page.locator('#projects article button')
				const dialogCount = await triggers.count()
				for (let i = 0; i < dialogCount; i++) {
					await triggers.nth(i).click()
					await page.locator('[role="dialog"]').waitFor({ state: 'visible' })
					await page.waitForTimeout(400)
					const dialogAxe = await new AxeBuilder({ page })
						.include('[role="dialog"]')
						.withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
						.analyze()
					dialogs.push({
						index: i,
						axeViolations: toViolations(dialogAxe.violations),
						contrastIncomplete: toIncomplete(dialogAxe.incomplete),
					})
					await page.keyboard.press('Escape')
					await page.locator('[role="dialog"]').waitFor({ state: 'hidden' })
				}

				report.pages.push({
					route,
					viewport: vpName,
					theme,
					screenshot: file,
					title: await page.title(),
					lang: await page.getAttribute('html', 'lang'),
					headings: await page.$$eval('h1,h2,h3', (ns) =>
						ns.map((n) => `${n.tagName}: ${n.textContent.trim().slice(0, 80)}`),
					),
					imagesMissingAlt: await page.$$eval(
						'img:not([alt])',
						(ns) => ns.length,
					),
					consoleErrors,
					axeViolations: toViolations(axe.violations),
					contrastIncomplete: toIncomplete(axe.incomplete),
					dialogs,
				})
				await context.close()
			}
		}
	}
} finally {
	await browser.close()
	if (server) process.kill(-server.pid)
}

writeFileSync(resolve(out, 'report.json'), `${JSON.stringify(report, null, 2)}\n`)

const violations = report.pages.flatMap((p) => [
	...p.axeViolations,
	...p.dialogs.flatMap((d) => d.axeViolations),
])
const incomplete = report.pages.flatMap((p) => [
	...p.contrastIncomplete,
	...p.dialogs.flatMap((d) => d.contrastIncomplete),
])
const errors = report.pages.flatMap((p) => p.consoleErrors)
console.log(`capturas: ${report.pages.length} → ${out}`)
console.log(
	`violações axe: ${violations.length} (dialogs: ${report.pages.reduce((n, p) => n + p.dialogs.flatMap((d) => d.axeViolations).length, 0)} violações) | contrast incomplete: ${incomplete.length} | erros de console: ${errors.length}`,
)
for (const v of violations) console.log(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes})`)
process.exit(violations.some((v) => v.impact === 'critical' || v.impact === 'serious') ? 1 : 0)
