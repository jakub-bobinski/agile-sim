# Agile Sim

Project — React Router - Tailwind CSS - Playwright.

## Requirements

- Node.js 22+ (see `.nvmrc`)

## Getting started

```bash
npm install
cp .env.example .env
npm run dev            # http://localhost:5173
```

## Scripts

| Command             | What it does                           |
| ------------------- | -------------------------------------- |
| `npm run dev`       | Dev server with hot reload             |
| `npm run build`     | Production build                       |
| `npm start`         | Serve the production build             |
| `npm run typecheck` | Generate route types + run `tsc`       |
| `npm run lint`      | ESLint                                 |
| `npm run format`    | Prettier (write)                       |
| `npm run check`     | typecheck + lint + format check        |
| `npm test`          | Playwright (`tests/api` + `tests/e2e`) |
| `npm run test:ui`   | Playwright UI mode                     |

First Playwright run: `npx playwright install chromium`.

## Project structure

```
app/
  root.tsx         # HTML shell, global error boundary
  routes.ts        # route config
  routes/          # route modules (UI routes + resource/API routes)
  app.css          # Tailwind entry
tests/
  api/             # Playwright API tests
  e2e/             # Playwright browser tests
docs/learning/     # learning log
```

## Quality gates

- **Pre-commit** (husky + lint-staged): ESLint + Prettier on staged files, then typecheck.
- **CI** (GitHub Actions): typecheck, lint, format check, build, Playwright.
