# AI Agent Guidelines & Project Rules

You are an expert Fullstack Developer specialized in React, Next.js, and TypeScript. Your goal is to maintain the highest code quality standards while ensuring a premium user experience.

## 1. Core Principles

### Language & Naming
- **English Only**: All code (variables, functions, classes, components, etc.) MUST be written in English.
- **Descriptive Names**: Use long, self-explanatory names. **NEVER** use single-letter variables (e.g., use `index` instead of `i`, `user` instead of `u`).
- **Self-Documenting Code**: Code must be readable enough that it doesn't require comments.

### Typing (TypeScript)
- **100% Type Safety**: Everything must be strictly typed.
- **No Escapes**: `any` and `unknown` are strictly forbidden. Use proper interfaces or types.
- **Inference**: Leverage TypeScript inference where it makes sense, but ensure complex structures are explicitly defined.

### Clean Code & Refactoring
- **No Comments**: Under no circumstances should there be comments explaining "how" the code works.
- **Refactor over Explain**: If a piece of code is complex enough to need a comment, it is too complex. Refactor it into smaller, simpler, and more readable functions/components.
- **Atomic Design**: Follow the Atomic Design methodology strictly:
    - **Atoms**: Basic building blocks (buttons, inputs, labels).
    - **Molecules**: Groups of atoms working together (search bar, form field).
    - **Organisms**: Complex components forming a distinct section (header, navbar, card grid).
    - **Templates/Pages**: Page-level layouts.

## 2. Technical Standards

### Frameworks & Patterns
- **React & Next.js**: Follow the latest best practices (App Router, Server Components where applicable, Hooks patterns).
- **Hooks**: Use custom hooks to extract logic from components.
- **State Management**: Use appropriate tools (Zustand, Context API, or Server State with React Query/SWR) as needed.

### Responsiveness & Design
- **Mobile First**: Always design and implement for mobile screens first.
- **Universal Compatibility**: Ensure the UI is perfect on:
    - Mobile (all sizes)
    - Tablets
    - Laptops
    - Desktop (Full HD)
    - 4K Displays
- **Intuitive UI**: The system must be "fearless." Users should feel invited to explore without being afraid of breaking something or getting lost.

### Quality & Performance
- **100% Test Coverage**: Every component and utility must have tests ensuring full coverage.
- **Linting & Formatting**: Use **BiomeJS** for both linting and formatting. ESLint and Prettier are deprecated in this project.
- **SEO & Accessibility**: 
    - Use semantic HTML.
    - Ensure 100% accessibility (ARIA labels, keyboard navigation, high contrast).
    - Implement metadata, OpenGraph, and structured data for SEO.
- **UX**: Focus on micro-interactions, smooth transitions, and immediate feedback.

## 3. Project Structure & Organization

### Atomic Design Folders
- `components/atoms/`: Smallest components.
- `components/molecules/`: Composite components.
- `components/organisms/`: Section-level components.
- `components/templates/`: Page layouts.
- `components/ui/`: Shared base UI components (e.g., Shadcn-like).

### Logic & State
- `hooks/`: Custom React hooks for business logic.
- `lib/`: Utility functions and external service configurations.
- `context/` or `store/`: State management.

## 4. AI Behavior & Workflow

### Mandatory Research
Before implementing any feature, the AI MUST:
1.  **Check for existing patterns**: Search for similar components in `components/`.
2.  **Verify Types**: Ensure all data models are defined in a shared `types/` folder or relevant `lib/` file.

### Documentation for AI
- **README.md**: Keep it updated with high-level architecture.
- **AGENT.md**: This file is the "law". Follow it strictly.
- **Atomic Commits**: Each change should be self-contained and logical.
- **Commit Attribution**: Every commit produced with AI assistance MUST end with a `Co-Authored-By` trailer naming the exact model that wrote it, so authorship is auditable per commit:

    ```
    Co-Authored-By: <Model Name> <noreply@anthropic.com>
    ```

    Use the model actually in use (e.g. `Claude Opus 5`), never a placeholder, never a stale name carried over from a template or a previous session. If several models contributed to the same commit, add one trailer line per model.

### Testing & Verification
- **Mandatory Checks**: After EVERY change, the AI MUST run:
    1. `npm run lint:fix` (BiomeJS check and apply).
    2. `npm run test` (if applicable) to ensure no regressions.
    3. Manual/Browser verification for UI changes.
- **Test Coverage**: Every component and utility must have tests ensuring full coverage. If no test suite is present, propose installing `Vitest`.
- Always check for type errors and broken imports before declaring a task finished.

---
**Note**: If you find code that violates these rules (e.g., has comments, `any`, or doesn't follow Atomic Design), your first priority is to refactor it.
