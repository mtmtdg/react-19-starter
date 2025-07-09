# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 starter project using Vite as the build tool with TypeScript support. The project includes a simple authentication system using Jotai for state management, JWT for authentication, and React Router DOM for routing. The project uses modern tooling including Biome for linting/formatting, pnpm for package management, and Husky for Git hooks.

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
- Styles: CSS modules (`.module.scss`) for component-specific styles, inline styles for simple cases
- Global styles in `index.scss`
- Authentication layouts in `src/layouts/` for route protection
- Pages in `src/pages/` directory

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
- **Dependencies:** React 19, Vite, TypeScript, Biome, Sass, Jotai, JWT-decode, Ky, React Router DOM

## Git Workflow

- **Hooks:** Husky manages pre-commit hooks
- **Lint-staged:** Runs typos fix and Biome check on staged files
- **Commit Convention:** Uses conventional commits with commitlint

## Authentication System

- **State Management:** Jotai atoms for user authentication state
- **JWT Handling:** jwt-decode for token parsing
- **HTTP Client:** Ky for API requests
- **Route Protection:** Layout components for auth guards (`RequireAuthLayout`, `RedirectIfLoggedInLayout`)
- **Form Handling:** Simple native HTML form validation
- **Path Alias:** `@/` maps to `src/` directory

## Development Notes

- Project enforces no default exports in regular code (config files exempted)
- Function complexity limited to 15 cognitive complexity
- Function length limited to 50 lines (200 for TSX files)
- Import organization follows Node → Package → Alias → Path → Types pattern
- React Hook dependency checking is enforced at error level
- Uses plain HTML elements with simple CSS (CSS modules for components, inline styles for basic cases)
- Keep styling minimal and progressive - this is a starter project for demonstrating development patterns