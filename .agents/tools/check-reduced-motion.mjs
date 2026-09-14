#!/usr/bin/env node
/**
 * Prova em browser real que um utilitário `motion-reduce:` vence a cascata.
 * jsdom não carrega o CSS compilado e não consegue ver este defeito
 * (ver `.agents/memory/lessons/002-*.md`); axe-core também não avalia motion.
 * Os candidatos vêm do DOM vivo, não de uma lista fixa — a lição 005 mostra
 * que um único par de elementos hardcoded deixa a mesma armadilha de
 * especificidade (hover vs. motion-reduce) passar despercebida em qualquer
 * outro elemento da página.
 *
 * node .agents/tools/check-reduced-motion.mjs [--port 3100] [--base-url <url>]
 *      [--trigger '#projects article button'] [--target '[role="dialog"]']
 *      [--only-dialog]
 */
import { spawn } from 'node:child_process'
import { chromium } from 'playwright'

const arg = (flag, fallback) => {
	const i = process.argv.indexOf(flag)
	return i === -1 ? fallback : process.argv[i + 1]
}
const hasFlag = (name) => process.argv.includes(name)

const port = Number(arg('--port', '3100'))
const remote = arg('--base-url', null)
const base = remote ?? `http://127.0.0.1:${port}`
const trigger = arg('--trigger', '#projects article button')
const target = arg('--target', '[role="dialog"]')
const onlyDialog = hasFlag('--only-dialog')

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

const browser = await chromium.launch()
let exitCode = 0
let okCount = 0
let failCount = 0
let skipCount = 0

const collectCandidates = (page, scopeSelector) =>
	page.evaluate((selector) => {
		const CANDIDATE =
			/(?:^|\s)((?:group-)?(?:hover|focus|focus-visible|focus-within|group-focus-within):-?(?:translate|scale|rotate|skew)[^\s]*)/g
		for (const stale of document.querySelectorAll('[data-rm-probe], [data-rm-probe-trigger]')) {
			stale.removeAttribute('data-rm-probe')
			stale.removeAttribute('data-rm-probe-trigger')
		}
		const nodes = document.querySelectorAll(selector)
		const results = []
		let i = 0
		for (const el of nodes) {
			const cls = typeof el.className === 'string' ? el.className : ''
			for (const m of cls.matchAll(CANDIDATE)) {
				const utils = m[1]
				const isGroup = utils.startsWith('group-')
				el.setAttribute('data-rm-probe', String(i))
				let hasTrigger = true
				if (isGroup) {
					const groupEl = el.closest('[class*="group"]')
					hasTrigger = Boolean(groupEl)
					if (groupEl) groupEl.setAttribute('data-rm-probe-trigger', String(i))
				}
				results.push({ index: i, utils, signature: cls.trim(), isGroup, hasTrigger })
				i++
			}
		}
		return results
	}, scopeSelector)

const isIdentityTransform = (transform) => {
	if (transform === 'none') return true
	const values = transform.match(/^matrix(?:3d)?\(([^)]+)\)$/)?.[1].split(',').map(Number)
	if (!values) return false
	if (values.length === 6) return values.every((v, i) => v === (i === 0 || i === 3 ? 1 : 0))
	if (values.length === 16) {
		return values.every((v, i) => v === (i % 5 === 0 ? 1 : 0))
	}
	return false
}
const transformsMatch = (a, b) => a === b || (isIdentityTransform(a) && isIdentityTransform(b))

const probeCandidates = async (page, scopeSelector) => {
	const candidates = await collectCandidates(page, scopeSelector)
	for (const candidate of candidates) {
		const label = `${candidate.utils} ${candidate.signature.slice(0, 60)}`

		if (!candidate.hasTrigger) {
			console.log(`skip ${label}`)
			skipCount++
			continue
		}

		const el = page.locator(`[data-rm-probe="${candidate.index}"]`)
		const hoverTarget = candidate.isGroup
			? page.locator(`[data-rm-probe-trigger="${candidate.index}"]`)
			: el

		try {
			await hoverTarget.scrollIntoViewIfNeeded({ timeout: 2000 })
			if (!(await hoverTarget.isVisible())) throw new Error('not visible')

			const rest = await el.evaluate((node) => getComputedStyle(node).transform)
			await hoverTarget.hover({ timeout: 2000 })
			await page.waitForTimeout(250)
			const hovered = await el.evaluate((node) => getComputedStyle(node).transform)
			await page.mouse.move(0, 0)

			const passed = transformsMatch(rest, hovered)
			console.log(`${passed ? 'ok' : 'FAIL'} ${label} rest=${rest} hover=${hovered}`)
			if (passed) okCount++
			else {
				failCount++
				exitCode = 1
			}
		} catch {
			console.log(`skip ${label}`)
			skipCount++
		}
	}
}

try {
	const context = await browser.newContext({
		reducedMotion: 'reduce',
		viewport: { width: 1440, height: 900 },
	})
	const page = await context.newPage()
	await page.goto(base, { waitUntil: 'networkidle' })

	const reducedMotionApplied = await page.evaluate(
		() => matchMedia('(prefers-reduced-motion: reduce)').matches,
	)
	if (!reducedMotionApplied) {
		exitCode = 1
		throw new Error('the reduced-motion context did not apply')
	}

	if (!onlyDialog) {
		await probeCandidates(page, '*')
	}

	await page.locator(trigger).first().click()
	await page.locator(target).waitFor({ state: 'visible' })

	const elements = {
		[target]: page.locator(target),
		overlay: page.locator('[data-state="open"].inset-0').first(),
	}

	for (const [label, locator] of Object.entries(elements)) {
		const el = await locator.elementHandle()
		const computed = await el.evaluate((node) => ({
			animationName: getComputedStyle(node).animationName,
			transitionProperty: getComputedStyle(node).transitionProperty,
		}))
		const isOk = computed.animationName === 'none'
		console.log(`${isOk ? 'ok' : 'FAIL'} ${label} animationName=${computed.animationName}`)
		if (!isOk) exitCode = 1
	}

	await probeCandidates(page, '[role="dialog"] *')

	await page.keyboard.press('Escape')
	await page.locator(target).waitFor({ state: 'hidden' })

	await context.close()
} finally {
	await browser.close()
	if (server) process.kill(-server.pid)
}

console.log(`${okCount} ok, ${failCount} FAIL, ${skipCount} skip`)
process.exit(exitCode)
