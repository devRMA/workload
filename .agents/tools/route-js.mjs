#!/usr/bin/env node
/**
 * Mede o JS inicial de uma rota a partir do build já gerado em `.next/`.
 * Substitui a métrica "First Load JS" que o `next build` deixou de imprimir a partir do Next 16
 * (`node_modules/next/dist/docs/01-app/02-guides/upgrading/version-16.md`).
 *
 * Autoridade: os `script src` que o HTML pré-renderizado da rota pede, menos os `noModule`
 * (o bundle de polyfills legado, que nenhum browser moderno baixa). Não use
 * `.next/build-manifest.json` (só traz `rootMainFiles`, um subconjunto) nem a soma de
 * `.next/static/chunks/` (traz chunks que a rota não carrega, e o CSS).
 *
 * node .agents/tools/route-js.mjs index custo-da-hora
 */
import { readFileSync } from 'node:fs'
import { gzipSync } from 'node:zlib'

const routes = process.argv.slice(2)
if (routes.length === 0) {
	console.error('uso: node .agents/tools/route-js.mjs nome-do-html-sem-extensao ...')
	process.exit(2)
}

for (const route of routes) {
	const html = readFileSync(`.next/server/app/${route}.html`, 'utf8')
	const chunks = [
		...new Set(
			[...html.matchAll(/<script\b[^>]*?\bsrc="\/_next\/(static\/[^"]+\.js)"[^>]*>/g)]
				.filter((m) => !/\bnoModule\b/i.test(m[0]))
				.map((m) => m[1]),
		),
	].sort()

	let total = 0
	for (const file of chunks) {
		const bytes = gzipSync(readFileSync(`.next/${file}`), { level: 9 }).length
		total += bytes
		console.log(`${String(bytes).padStart(8)}  ${file}`)
	}
	console.log(
		`ROUTE_JS_GZIP ${route} ${total} bytes (${(total / 1024).toFixed(2)} kB) over ${chunks.length} chunks`,
	)
}
