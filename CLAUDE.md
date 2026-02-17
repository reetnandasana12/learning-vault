# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Docusaurus v3.9.2 documentation site using the classic preset with TypeScript support. React 19, MDX 3, and Infima CSS framework. The `future.v4` flag is enabled for Docusaurus v4 compatibility.

## Commands

- `npm start` — Dev server at http://localhost:3000 with hot reload
- `npm run build` — Production build to `/build` directory
- `npm run serve` — Serve the production build locally
- `npm run typecheck` — TypeScript type checking (`tsc`)
- `npm run clear` — Clear Docusaurus cache (`.docusaurus/`)

No test runner is configured. No linter is configured.

## Architecture

### Content Layer

- **`/docs`** — Documentation pages (`.md`/`.mdx`). Sidebar is auto-generated from folder structure. Ordering controlled by `sidebar_position` in front matter and `_category_.json` files in directories.
- **`/blog`** — Blog posts using `YYYY-MM-DD-slug.md` naming convention for auto-dating. Author metadata in `authors.yml`, tags in `tags.yml`.
- **`/static`** — Public assets served at root. Reference images as `/img/filename`.

### Source Code (`/src`)

- **`/src/pages`** — Standalone pages (React `.tsx` or `.md`). The homepage is `index.tsx`.
- **`/src/components`** — Reusable React components (e.g., `HomepageFeatures`).
- **`/src/css/custom.css`** — Global CSS overrides and Infima CSS variable customization for light/dark themes.

### Key Config Files

- **`docusaurus.config.ts`** — Main site config: metadata, navbar, footer, presets, theme settings. Broken links set to `throw` (strict).
- **`sidebars.ts`** — Sidebar definitions. Currently uses auto-generated sidebar from `/docs` folder structure.

### Patterns

- CSS Modules (`.module.css`) for component-scoped styles; global styles in `custom.css`.
- Use `@site/` alias for absolute imports from project root.
- Use `@theme/` alias to import Docusaurus theme components (`Layout`, `Heading`, etc.).
- Use `useDocusaurusContext()` hook to access site config in React components.
- Doc front matter: `sidebar_position`, `title`, `slug`, `id` for controlling navigation and URLs.
