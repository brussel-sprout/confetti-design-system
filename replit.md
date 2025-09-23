# Confetti Design System - Replit Setup

## Project Overview
This is a comprehensive React-based design system with TypeScript and Tailwind CSS, successfully configured for the Replit environment.

## Recent Setup Changes (2024-09-23)
- ✅ Installed dependencies using pnpm (following project conventions)
- ✅ Configured Vite development server for Replit proxy compatibility:
  - Host: `0.0.0.0:5000` 
  - Added allowedHosts for Replit domains (`.replit.dev`, `.replit.app`, `.replit.co`, `'all'`)
  - Enabled strictPort and disabled auto-open
- ✅ Created "Frontend Development Server" workflow running on port 5000
- ✅ Fixed React component prop warnings in Demo.tsx
- ✅ Configured deployment settings for autoscale with build/preview commands

## Project Architecture
- **Framework**: React 19 + TypeScript + Vite
- **Styling**: Tailwind CSS v4 with custom design tokens
- **Structure**: Atomic design pattern (atoms, molecules, organisms)
- **Build System**: Vite with library build configuration
- **Package Manager**: pnpm (required)

## Development Workflow
- **Start server**: `pnpm run dev` (configured in workflow)
- **Build**: `pnpm build` 
- **Preview**: `pnpm preview`
- **Tests**: `pnpm test`

## Key Configuration Files
- `vite.config.ts` - Configured for Replit proxy support
- `package.json` - Dependencies and scripts
- `tailwind.config.js` - Design system tokens
- `src/components/Demo.tsx` - Interactive component showcase

## Replit-Specific Configuration
- Server binds to `0.0.0.0:5000` for external access
- AllowedHosts configured for Replit proxy domains
- HMR (Hot Module Reload) working correctly
- Workflow configured for webview output

## User Preferences
- Use pnpm for all package management operations
- Follow existing project structure and conventions
- Maintain atomic design component organization

## Deployment
- Configured for autoscale deployment target
- Build command: `pnpm build`
- Run command: `pnpm preview --host 0.0.0.0`