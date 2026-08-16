# TypeScript Backend Developer Roadmap

A self-paced, project-driven roadmap to become a confident **JavaScript + TypeScript backend developer**. Every stage has a README explaining the concepts, and every project folder has a README with the assignment spec. **You build everything yourself** — no starter code, no answers. The READMEs guide you; you write the code.

---

## Table of Contents

1. [How to use this roadmap](#how-to-use-this-roadmap)
2. [Prerequisites & setup](#prerequisites--setup)
3. [The roadmap](#the-roadmap)
4. [Project conventions](#project-conventions)
5. [Milestone checklists](#milestone-checklists)
6. [Learning tips](#learning-tips)
7. [Recommended resources](#recommended-resources)

---

## How to use this roadmap

- Start at **`00-project-setup`** and move through stages **in order** (01 → 14). Later stages assume the skills from earlier ones.
- Each stage folder contains a `README.md` (the "why & what") and a `projects/` folder. Each project has its own `README.md` with:
  - **Assignment** — what to build, in plain English.
  - **Requirements / acceptance criteria** — how you'll know you're done.
  - **Hints** — pointers, not solutions.
  - **Stretch goals** — go further if you want more challenge.
- Build one project at a time. When it passes its own acceptance criteria, commit it, tick the checklist, and move on.
- Only move to the next stage when you can explain the previous stage's concepts to someone else (rubber-duck style).
- The **capstone (Stage 14)** is the final boss: it combines almost everything. Aim to build it largely from memory with READMEs open only for API reference.

---

## Prerequisites & setup

### 1. Install Node.js (LTS or newer)

This roadmap targets **Node.js 22.6+**, which can run TypeScript files **natively** (`node file.ts`). Node 26 is even better.

Recommended: install Node via **nvm** so you can switch versions easily.

```bash
# install nvm (macOS/Linux)
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# restart your terminal, then:
nvm install --lts
nvm use --lts
node --version   # should print v22.6.0 or higher
```

> Create a `.nvmrc` in the repo root containing your Node version (e.g. `22`) so the right version is used automatically.

### 2. Verify TypeScript runs natively

```bash
node --eval "const x: number = 42; console.log(x)"   # put this in a .ts file instead
```

Create `hello.ts`, write `console.log("Hello TS")`, then run `node hello.ts`. If it prints, native TS works and you don't need a build step for learning.

### 3. Global tooling you'll use

| Tool        | Purpose                                   | When to install |
|-------------|-------------------------------------------|-----------------|
| `tsx`       | Dev runner for TS (watch mode, env vars)  | Stage 01        |
| `typescript`| `tsc` for type-checking (`--noEmit`)      | Stage 01        |
| `@types/node` | Node API types                          | Stage 02        |
| `npx`       | Run CLI tools without global install      | Always          |
| `Docker`    | Containerize apps                         | Stage 12        |

### 4. Editor

Any editor works, but **VS Code** (free) with these extensions is the smoothest TS experience:
- **TypeScript + JavaScript** (built-in, but keep it updated)
- **Prettier** (formatting)
- **Error Lens** (inline type errors)
- **GitLens** (git integration)

Enable VS Code's "Format on Save" for TS files.

### 5. Verify your full toolchain (Stage 00 exercise)

Do the setup exercise in `00-project-setup/README.md` before starting Stage 01.

---

## The roadmap

> Difficulty: ⭐ = beginner · ⭐⭐ = intermediate · ⭐⭐⭐ = advanced

| # | Stage | What you'll learn | Projects | Difficulty |
|---|-------|-------------------|----------|------------|
| 00 | [Project Setup](00-project-setup/README.md) | Toolchain, editor, running TS, git | Setup exercise | ⭐ |
| 01 | [TypeScript Fundamentals](01-typescript-fundamentals/README.md) | Types, interfaces, unions, generics, utility types | Basic Types, Generics, Type Challenges, JSON Validator | ⭐ |
| 02 | [Node Core & File Handling](02-nodejs-core-file-handling/README.md) | fs/path, streams, buffers, async I/O | File Organizer, CSV→JSON, Log Parser, Big File Streamer | ⭐⭐ |
| 03 | [CLI Tooling](03-cli-tooling/README.md) | argv, stdin/stdout, colors, publishable CLIs | Task CLI, Markdown TOC, Publishable CLI | ⭐⭐ |
| 04 | [HTTP & REST Fundamentals](04-http-rest-fundamentals/README.md) | HTTP protocol, node:http, routing, fetch | HTTP Server, Native REST API, Fetch API Client | ⭐⭐ |
| 05 | [Backend Frameworks](05-backend-frameworks/README.md) | Express & Fastify, middleware, validation | Notes API, URL Shortener, Pokemon API | ⭐⭐ |
| 06 | [SQL Databases](06-sql-databases/README.md) | SQL, SQLite, Prisma, Drizzle, migrations | SQLite Notes, Prisma Blog, Drizzle E-commerce | ⭐⭐ |
| 07 | [NoSQL Databases](07-nosql-databases/README.md) | MongoDB, Mongoose, Redis caching | Mongo Todo, Redis Caching | ⭐⭐ |
| 08 | [Auth & Security](08-auth-security/README.md) | bcrypt, JWT, sessions, RBAC, OAuth | JWT Auth, RBAC Roles, GitHub OAuth | ⭐⭐ |
| 09 | [Testing](09-testing/README.md) | Vitest, unit tests, mocking, integration tests, TDD | Vitest Basics, API Integration Tests, TDD Practice | ⭐⭐ |
| 10 | [WebSockets & Realtime](10-websockets-realtime/README.md) | WebSockets, socket.io, rooms, events | Chat App, Live Notifications | ⭐⭐ |
| 11 | [Advanced Backend](11-advanced-backend/README.md) | Job queues, cron, logging, rate limiting, health checks | Job Queue, Email Scheduler, Production API | ⭐⭐⭐ |
| 12 | [Docker & Deployment](12-docker-deployment/README.md) | Docker, docker-compose, cloud deploy, CI | Dockerize API, Docker Compose, Deploy to Cloud | ⭐⭐⭐ |
| 13 | [AI Projects](13-ai-projects/README.md) | LLMs, prompt engineering, embeddings, RAG, agents | 6 AI projects | ⭐⭐⭐ |
| 14 | [Capstone](14-capstone/README.md) | Everything combined | AI Blog Platform | ⭐⭐⭐ |

---

## Project conventions

These conventions keep every project consistent. Follow them for each project folder you create.

### Folder layout for each project

```
<project-folder>/
├── README.md          # the assignment (given to you)
├── package.json       # you create this
├── tsconfig.json      # you create this (see below)
└── src/
    └── index.ts       # entry point (you create it)
```

### Standard `package.json` shape (per project)

```jsonc
{
  "name": "project-name",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "tsx watch src/index.ts",   // or "node --watch src/index.ts"
    "start": "node src/index.ts",
    "typecheck": "tsc --noEmit"
  }
}
```

- Use **ESM** (`"type": "module"`) — it's the modern standard.
- `tsx watch` gives hot-reload in dev; plain `node` works too on Node 22.6+.

### Standard `tsconfig.json` (per project)

```jsonc
{
  "compilerOptions": {
    "target": "ES2023",
    "module": "nodenext",
    "moduleResolution": "nodenext",
    "strict": true,
    "noEmit": true,            // we run TS directly; tsc is only for checking
    "skipLibCheck": true,
    "types": ["node"]
  },
  "include": ["src"]
}
```

> `strict: true` from day one. It's uncomfortable at first, but it's exactly why you'll become a good TS dev.

### Naming conventions

- Files: `kebab-case.ts` (e.g. `auth-utils.ts`). Entry point: `src/index.ts`.
- Functions/variables: `camelCase`. Types/classes: `PascalCase`. Constants: `UPPER_SNAKE_CASE`.
- Types should be named with `Type` suffix only when needed (`UserId`, `Product`); avoid `I`-prefixes (`IProduct`) — that's a legacy convention.

### Running things

- Dev: `npm run dev`
- Type-check: `npm run typecheck`
- Every project's README tells you exactly what commands to run to verify it.

### Sample data

When a project needs sample data (CSV files, logs, JSON), **generate your own** with a tiny script or by hand. Creating realistic test data is a real skill.

### Committing

- `git init` at the repo root once (done in Stage 00).
- Commit after each completed project with a message like: `feat: complete stage-02 file organizer`.
- Never commit secrets (`.env`, API keys). Add `.env` to a root `.gitignore`:

```gitignore
node_modules/
.env
*.log
dist/
```

---

## Milestone checklists

### 🏁 Milestone A — "I can write TypeScript" (Stages 00–01)
- [ ] I can run a `.ts` file with Node and type-check it with `tsc`
- [ ] I can explain `interface` vs `type`, unions, and generics
- [ ] I've completed all 4 projects in Stage 01

### 🏁 Milestone B — "I can build backend I/O" (Stages 02–03)
- [ ] I've read/written files with `fs/promises` and streams
- [ ] I've built at least 2 CLI tools and used one globally with `npm link`
- [ ] I understand event loop basics (async vs sync, blocking vs non-blocking)

### 🏁 Milestone C — "I can build HTTP APIs" (Stages 04–05)
- [ ] I've built an HTTP server without a framework
- [ ] I've built 2+ REST APIs with Express/Fastify
- [ ] I can explain what middleware is and how routing works

### 🏁 Milestone D — "I can persist data" (Stages 06–07)
- [ ] I've written raw SQL and used an ORM with migrations
- [ ] I've built at least one MongoDB project
- [ ] I can explain the difference between relational and document DBs

### 🏁 Milestone E — "I can secure, test, and go realtime" (Stages 08–10)
- [ ] I've implemented JWT auth with hashed passwords
- [ ] I've written unit + integration tests
- [ ] I've built a realtime chat app

### 🏁 Milestone F — "I can ship production-ready systems" (Stages 11–12)
- [ ] I've built a job queue with retries
- [ ] I can containerize an app with Docker + docker-compose
- [ ] I've deployed an app to the cloud with a CI pipeline

### 🏁 Milestone G — "I can build AI applications" (Stages 13–14)
- [ ] I've built at least 3 AI projects including a RAG system
- [ ] I've built a local LLM app with Ollama (no API key needed)
- [ ] I've completed the capstone AI Blog Platform

---

## Learning tips

1. **Type first, then code.** Write the types/interfaces for a problem before the logic. This is the #1 habit that separates good TS devs.
2. **Type-check before you run.** `npm run typecheck` should pass before you celebrate.
3. **Break things on purpose.** When you get a type error, understand *why* before fixing it.
4. **Use the official docs, not just tutorials.** Node docs, MDN, and package READMEs are your best friends.
5. **Read the error messages.** Node and TypeScript errors are usually descriptive — read them fully.
6. **Rewrite > copy.** Don't copy-paste snippets. Type them out; muscle memory matters.
7. **Teach it back.** After each project, write a 3-5 sentence summary in the project README in your own words (add a "What I learned" section).
8. **Be consistent.** 30–60 focused minutes daily beats 6 hours on Sunday.
9. **Stuck for more than 45 minutes?** Take a break, write down exactly what's confusing, then use AI/docs/Google as a targeted reference — but only *after* trying.
10. **Finish what you start.** A finished small project is worth more than ten half-finished ones.

---

## Recommended resources

**Docs (use these daily):**
- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [Node.js Docs](https://nodejs.org/en/docs)
- [MDN — JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [Express](https://expressjs.com/) · [Fastify](https://fastify.dev/) · [Prisma](https://www.prisma.io/docs) · [Drizzle](https://orm.drizzle.team/) · [Mongoose](https://mongoosejs.com/)

**Reference sites:**
- [TypeScript Playground](https://www.typescriptlang.org/play) — experiment quickly
- [Can I Use / MDN for API support](https://developer.mozilla.org/)

**Free interactive practice:**
- [Exercism TypeScript track](https://exercism.org/tracks/typescript)
- [type-challenges on GitHub](https://github.com/type-challenges/type-challenges) (referenced in Stage 01)
- [Coding Train](https://thecodingtrain.com/) — great for JS fundamentals video-wise

**Books:**
- *Programming TypeScript* (Boris Cherny) — the best TS book
- *You Don't Know JS* (Kyle Simpson) — deep JS fundamentals

---

> Last stage update: 16 Aug 2026. Built for a self-learner targeting backend + AI in TypeScript. Now go open `00-project-setup/README.md`. 🚀
