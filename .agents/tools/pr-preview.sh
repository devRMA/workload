#!/usr/bin/env bash
# Espera os checks do PR atual e imprime a URL de preview da Vercel.
# Uso: .agents/tools/pr-preview.sh [branch]
# Sai 1 se qualquer check falhou; imprime a URL em stdout quando tudo passa.
set -euo pipefail

BRANCH="${1:-$(git branch --show-current)}"

echo "aguardando checks de $BRANCH..." >&2
if ! gh pr checks "$BRANCH" --watch --fail-fast >&2; then
	echo "ERRO: checks do PR falharam — não prossiga para o gate de preview." >&2
	exit 1
fi

URL=$(gh pr view "$BRANCH" --json statusCheckRollup \
	--jq '[.statusCheckRollup[]?.targetUrl // empty | select(test("vercel\\.app"))] | first // empty')

if [ -z "$URL" ]; then
	URL=$(gh pr view "$BRANCH" --json comments \
		--jq '[.comments[].body | scan("https://[a-zA-Z0-9./-]*vercel\\.app")] | flatten | last // empty')
fi

if [ -z "$URL" ]; then
	echo "ERRO: checks passaram mas nenhuma URL de preview da Vercel foi encontrada." >&2
	exit 1
fi

echo "$URL"
