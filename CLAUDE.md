# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 starter project using Vite as the build tool with TypeScript support. The project uses modern tooling including Biome for linting/formatting, pnpm for package management, and Husky for Git hooks.

## Essential Commands

**Development:**
```bash
pnpm dev                 # Start development server
pnpm build              # Build for production (includes TypeScript compilation)
pnpm build:clean        # Clean build directory
```

**Code Quality:**
```bash
pnpm typecheck          # TypeScript type checking (--noEmit)
pnpm lint               # Run Biome linter
pnpm lint:fix           # Run Biome linter with auto-fix
pnpm format             # Format code with Biome
pnpm format:check       # Check formatting without changes
```

**Utilities:**
```bash
pnpm typos              # Check for typos (optional dependency)
pnpm typos:fix          # Fix typos automatically
```

## Architecture & Code Structure

**Entry Point:** `src/index.tsx` - React 19 app with StrictMode enabled using createRoot

**Component Structure:**
- Components use `.component.tsx` suffix (e.g., `app.component.tsx`)
- Styles use `.component.scss` suffix for component-specific styles
- Global styles in `index.scss`

**Code Style (Biome Configuration):**
- Named exports preferred over default exports (enforced by linter)
- Single quotes for strings, JSX quotes
- 2-space indentation, 120 character line width
- Trailing commas enforced
- No console.log allowed (error level)
- Import organization with automatic sorting

**TypeScript Configuration:**
- Strict mode enabled with additional strictness options
- ES2022 target with bundler module resolution
- JSX transform uses `react-jsx`
- Unused locals/parameters are errors

## Package Management

- **Package Manager:** pnpm (enforced by preinstall hook)
- **Node Modules:** Uses pnpm workspace and lock file
- **Dependencies:** React 19, Vite, TypeScript, Biome, Sass

## Git Workflow

- **Hooks:** Husky manages pre-commit hooks
- **Lint-staged:** Runs typos fix and Biome check on staged files
- **Commit Convention:** Uses conventional commits with commitlint

## Development Notes

- Project enforces no default exports in regular code (config files exempted)
- Function complexity limited to 15 cognitive complexity
- Function length limited to 50 lines (200 for TSX files)
- Import organization follows Node → Package → Alias → Path → Types pattern
- React Hook dependency checking is enforced at error level