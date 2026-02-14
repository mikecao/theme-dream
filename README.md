# Theme Dream

Theme Dream is a visual VS Code theme editor built with Next.js.

It lets you tweak workbench and syntax tokens in a properties panel and immediately preview the result in a VS Code-like mock UI (title bar, activity bar, explorer, tabs, editor, problems/terminal panel, and status bar).

## What It Does

- Live-edit VS Code color tokens with color + hex controls
- Preview the impact across a realistic VS Code layout
- Export a valid theme JSON file
- Generate both `colors` and `tokenColors`
- Include `semanticTokenColors` with semantic highlighting enabled

## Token Coverage

The app currently models a broad set of tokens, including:

- Window/title/status/badge colors
- Activity bar, sidebar, list states, and section headers
- Tabs, editor groups, and bottom panel states
- Editor UI (gutter, line numbers, cursor, selections, guides, whitespace)
- Diagnostics and terminal ANSI colors
- Syntax categories (keywords, strings, types, classes, properties, decorators, regexp, JSX tag/attribute, punctuation, and more)

## Tech Stack

- Next.js 16 (App Router)
- React 19
- Tailwind CSS 4
- Biome for lint/format
- `@vscode/codicons` for VS Code-style product icons

## Getting Started

Install dependencies:

```bash
pnpm install
```

Start the dev server:

```bash
pnpm dev
```

Build for production:

```bash
pnpm build
pnpm start
```

Lint and format:

```bash
pnpm lint
pnpm format
```

## Project Notes

- Main UI is currently implemented in `src/app/page.tsx`.
- Global styles are in `src/app/globals.css`.
- `pnpm dev` runs via `dotenv` (`dotenv next dev`), so local `.env` values will be loaded if present.
