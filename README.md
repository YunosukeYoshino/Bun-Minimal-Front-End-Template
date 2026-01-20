# Bun Minimal Front-End Template

[![Bun](https://img.shields.io/badge/Bun-1.0+-black?logo=bun)](https://bun.sh)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-38B2AC?logo=tailwindcss)](https://tailwindcss.com)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.8-3178C6?logo=typescript)](https://www.typescriptlang.org)

A minimal front-end development template powered by [Bun](https://bun.sh). Supports both Vanilla JS and React with modern tooling out of the box.

## Overview

This template provides a streamlined development experience using Bun as the runtime, bundler, and test runner. It includes two starter applications:

- **Vanilla JS** — Simple HTML/CSS/TypeScript setup with DOM utilities
- **React** — Modern React 19 app with [shadcn/ui](https://ui.shadcn.com) components

### Features

- **Fast Development** — HMR and console streaming via Bun's dev server
- **Modern Styling** — Tailwind CSS v4 with CSS variables for theming
- **Type Safety** — TypeScript in strict mode
- **Code Quality** — Biome, Stylelint, Markuplint, and Prettier pre-configured
- **Testing** — Bun's built-in test runner with happy-dom

## Prerequisites

- [Bun](https://bun.sh) v1.0 or later

## Getting Started

Clone the repository and install dependencies:

```bash
bun install
```

Start the development server:

```bash
# Fullstack dev server with HMR (recommended)
bun run dev

# Or run individual apps
bun run dev:vanilla   # Vanilla JS at http://localhost:3000
bun run dev:react     # React at http://localhost:3000
```

> [!TIP]
> The `dev` command starts a unified server with routing:
>
> - `/` → Vanilla JS app
> - `/react` → React app

## Development

### Available Scripts

| Command               | Description                         |
| --------------------- | ----------------------------------- |
| `bun run dev`         | Start Fullstack Dev Server with HMR |
| `bun run dev:vanilla` | Start Vanilla JS dev server         |
| `bun run dev:react`   | Start React dev server              |
| `bun run build`       | Production build (minified)         |
| `bun run build:dev`   | Development build (with sourcemaps) |
| `bun run test`        | Run tests                           |
| `bun run check`       | Run Biome linter                    |
| `bun run format`      | Format code with Prettier           |

### Project Structure

```
src/
├── index.html              # Vanilla JS entry
├── scripts/                # Vanilla JS source
├── styles/                 # Global styles
├── tests/                  # Test files
└── react/                  # React application
    ├── main.tsx            # Entry point
    ├── pages/              # Page components
    ├── features/           # Feature modules (counter, todos, theme)
    └── shared/             # Shared code
        ├── ui/             # shadcn/ui components
        └── utils/          # Utilities (cn.ts)
```

## React Application

The React app demonstrates modern patterns with shadcn/ui:

- **Counter** — State management with `useCounter` hook
- **Todo List** — CRUD operations with `useTodos` hook
- **Dark Mode** — Theme switching with `useTheme` hook (persisted to localStorage)

### Adding shadcn/ui Components

Components are located in `src/react/shared/ui/`. To add more:

```bash
bunx shadcn@latest add [component]
```

> [!NOTE]
> Due to Bun's minimal setup, some shadcn CLI commands may require manual configuration. See `components.json` for current settings.

## Configuration

### Environment Variables

Variables prefixed with `PUBLIC_` are inlined into the client bundle:

```bash
PUBLIC_API_URL=https://api.example.com bun run dev
```

### Build Configuration

Edit `build.ts` to customize:

```typescript
const commonOptions = {
	minify: !isDev,
	sourcemap: isDev ? 'linked' : 'none',
	splitting: true,
	env: 'PUBLIC_*',
}
```

## Testing

Run tests with Bun's built-in test runner:

```bash
bun test              # Run all tests
bun test --watch      # Watch mode
bun test --coverage   # With coverage report
```

Tests use [happy-dom](https://github.com/capricorn86/happy-dom) to simulate browser environment.

## Resources

- [Bun Documentation](https://bun.sh/docs)
- [React Documentation](https://react.dev)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
- [shadcn/ui](https://ui.shadcn.com)
- [Biome](https://biomejs.dev)
