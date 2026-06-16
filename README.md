# Tab Tracker

A web application for tracking guitar tabs and songs. Built with a modern TypeScript monorepo.

## Tech Stack

| Layer    | Technology                                                |
| -------- | --------------------------------------------------------- |
| Frontend | Next.js, React, TypeScript, Zustand, Tailwind CSS, Zod    |
| Backend  | NestJS, TypeScript, TypeORM, SQLite (in-memory), Zod      |
| Tooling  | pnpm, Turbo, Oxlint, Commitlint, Lefthook, Vitest, Prettier |

## Prerequisites

- Node.js >= 18
- pnpm >= 10

## Setup

```bash
pnpm install
```

## Development

Run both web and api in development mode:

```bash
pnpm dev
```

Or run individually:

```bash
pnpm --filter web dev   # Next.js at http://localhost:3000
pnpm --filter api dev   # NestJS at http://localhost:8085
```

## Build

```bash
pnpm build
```

## Lint

```bash
pnpm lint
```

## Type Check

```bash
pnpm typecheck
```

## Project Structure

```
/
├── apps/
│   ├── web/          # Next.js frontend
│   └── api/          # NestJS backend
├── oxlint.json       # Oxlint configuration
├── commitlint.config.js
├── lefthook.yaml     # Git hooks
├── vitest.workspace.ts
└── turbo.json        # Turbo pipeline
```

## Features

- User registration and login (JWT authentication)
- Browse songs with search
- View song details (album art, YouTube embed, lyrics/tab toggle)
- Create and edit songs
- Bookmark favorite songs

## Todo

- Fix the Bookmarks page
