<div align="center">

# WorkLoad 🚀

**A modern, lightning-fast calculator for Work Hours, Overtime, and Salary Deductions.**

[![CI/CD](https://github.com/devRMA/workload/actions/workflows/ci.yml/badge.svg)](https://github.com/devRMA/workload/actions/workflows/ci.yml)
[![Coverage](https://img.shields.io/badge/coverage-100%25-brightgreen.svg)]()
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-blue.svg)]()
[![Biome](https://img.shields.io/badge/Biome-Formatter_%26_Linter-F19953.svg)]()
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Tested-2EAD33.svg)]()

</div>

---

## 🤖 Built with AI
This project was heavily driven and refactored from scratch to production level using **Google AI Studio** and **Antigravity** (from Google DeepMind's Advanced Agentic Coding team). 

---

## ⚡ Features
- **Workday Tracking**: Precise control of entry, lunch, and exit times, with real-time overtime calculation and the reduced night hour (CLT art. 73). Overtime rates are configurable and default to the statutory floor of 50%/100%.
- **Work Regimes**: CLT, Empregado Público and Estatutário. The first two contribute under the RGPS table with its ceiling; Estatutário follows the federal RPPS ladder (7.5% to 22%, uncapped).
- **Salary Calculator**: INSS, IRRF, dependents, deductions and extra gains, using the tables in force for 2026 — including the R$ 607,20 simplified deduction and the reduction that exempts income up to R$ 5.000,00.
- **Any Period**: View your pay by hour, day, week, month or year, derived from your monthly workload and daily journey.
- **Mobile-First & Premium UI**: An amazing interface developed from scratch to provide the best experience, with native support for Dark/Light Mode.
- **Offline First**: Automatically saves all user preferences in `localStorage`.

> Tax tables are the ones in force for 2026: **Portaria Interministerial MPS/MF nº 13 de 09/01/2026** for social security, and the IRRF table as amended by **Lei 15.270/2025**.

---

## 🏗️ Architecture & Best Practices

WorkLoad is a clear example of cutting-edge frontend engineering:

*   **[Atomic Design](https://bradfrost.com/blog/post/atomic-web-design/)**: Highly scalable UI, broken down into `Atoms` (Buttons, Inputs, MaskedInput), `Molecules` (FormFields, StatBoxes, HeroPanel), `Organisms` (the calculators) and `Templates` (the shared layout). Everything designed for maximum reuse.
*   **Decoupled Logic**: No business rules are tied to visual components. Tax and time rules live in `lib/` (`payroll`, `salary-period`), and the stateful glue lives in isolated **Custom Hooks** (`use-work-calculator`, `use-salary-calculator`, `use-current-time`).
*   **Clean Code & KISS**: Strictly readable code focused on the essential. Zero comments to explain confusing logic (the code speaks for itself) and strong naming conventions.
*   **Strict TypeScript**: 100% typed. No `any`, and `unknown` only where an external value has to be validated before it can be trusted.
*   **Accessibility**: WCAG AA contrast in both themes, 44px touch targets, `prefers-reduced-motion` honoured, and dialogs built on the native `<dialog>` element so focus trapping and Escape come from the platform.
*   **BiomeJS**: We replaced the classic ESLint/Prettier setup with the Rust-powered [BiomeJS](https://biomejs.dev/), ensuring linting and formatting in less than 50ms.

---

## 🧪 Quality Assurance & CI/CD

We don't ship broken code to production. The project features:

- **100% Unit Test Coverage**: Enforced, not claimed — `vitest.config.ts` fails the run below 100% statements, branches, functions and lines across `app/`, `components/`, `hooks/` and `lib/`.
- **End-to-End (E2E) Testing**: We use **Playwright** across five viewports — desktop, QHD (2560×1440), 4K (3840×2160), and simulated iPhone and Android — asserting no horizontal overflow and no control outside the viewport at any of them.
- **Continuous Integration (GitHub Actions)**: For every PR/Push to `main`, the GitHub pipeline rigorously executes:
  1. Clean installation (`npm ci`)
  2. Code standard verification (`npx @biomejs/biome ci .`)
  3. Type checking (`npm run typecheck`)
  4. Unit Test suite with coverage (`npm run test:coverage`)
  5. Next.js Production Build
  6. Full E2E Test suite (`npm run e2e`)
  7. Lighthouse CI budgets (performance, a11y, best practices, SEO)

---

## 🛠️ Stack

- **Framework:** Next.js 15 (App Router) + React 19
- **Styling:** Tailwind CSS 4 + Motion + Lucide Icons
- **Language:** TypeScript
- **Tooling:** BiomeJS, Vitest, Playwright, Date-fns

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/devRMA/workload.git

# Enter the folder
cd workload

# Install dependencies (Node 24+)
npm i
```

### Useful Commands

| Command | Description |
|---------|-----------|
| `npm run dev` | Starts the development server on port 3000 |
| `npm run build` | Runs the optimized Next.js production build |
| `npm start` | Serves the production build |
| `npm run lint` | Checks code standards with BiomeJS |
| `npm run lint:fix` | Automatically formats code and fixes linter issues |
| `npm run typecheck` | Validates if there are typing errors in the project |
| `npm test` | Runs all unit tests |
| `npm run test:watch` | Runs unit tests in watch mode |
| `npm run test:coverage` | Runs unit tests showing code coverage |
| `npm run check` | Runs lint + typecheck + unit tests (the full local gate) |
| `npm run e2e` | Runs the full user flow E2E tests (Headless) |
| `npm run e2e:ui` | Opens the Playwright UI for interactive testing and debugging |
| `npm run e2e:report` | Shows detailed E2E test results in the browser |

---

> Made with ❤️ by [Rafael](https://devrma.com)