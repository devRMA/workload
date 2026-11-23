# 0015 — test suite egress to third party hosts

> Owner: content-writer · Gate: `copy`

## Strings

### `<key.path>`

| | Text | Chars |
|---|---|---|
| pt-BR | <...> | <n> |

- **Constraint:** <from design.md, or none>
- **Evidence:** <file backing any factual claim>

## Rejected phrasings

| Considered | Why it lost |
|---|---|

## Checks

- [ ] Every string is pt-BR — there is no i18n layer and the strings live in the components
- [ ] It reads as a native original, written for a worker who is not a lawyer
- [ ] Every legal claim traces to a passage of `legal.md`; every other factual claim to `PRODUCT.md`
- [ ] Every literal a test depends on verbatim is listed, with its `file:line`
