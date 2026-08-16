# Stage 14 — Capstone: AI Blog Platform

> Difficulty: ⭐⭐⭐ · Est. time: 4–6 weeks · Project: 1

## Why this stage exists

The final boss. This capstone combines **everything** you've learned into one real, deployable product: TypeScript, REST, databases, auth, caching, realtime, queues, Docker, deployment, testing — and AI on top. When you finish this, you are not "learning TypeScript." You are a TypeScript backend developer who can ship.

## The brief

Build **"RAG-Powered Blog Platform"** — a blog where users write posts, and visitors can **ask an AI questions about the posts**, answered using RAG over the actual post content.

### Core features

- **Auth (Stage 08)**: register/login with bcrypt + JWT; roles (reader/writer/admin).
- **Content**: writers create/edit/delete posts. Readers browse.
- **Persistence (06 + 07)**: Postgres (Prisma) for users/posts; Redis for caching hot posts and rate limiting.
- **Realtime (10)**: live notification when a new post is published or a comment is added (socket.io).
- **Background (11)**: publishing a post enqueues an "index post for AI" job (BullMQ) so RAG ingestion never blocks the API.
- **AI (13)**: RAG pipeline — post chunks → embeddings → vector search → answer questions about the blog with sources. Use Ollama locally and/or OpenAI in production.
- **Tests (09)**: Vitest for services + supertest integration tests; coverage on critical paths.
- **Ops (12)**: Dockerfile + docker-compose (app + Postgres + Redis + worker), deployed to Render/Railway, CI via GitHub Actions (typecheck → test → build).

## Suggested milestones (do these in order)

| # | Milestone | Deliverable |
|---|-----------|-------------|
| 1 | Project skeleton | App structure, typed config, `/health`, docker-compose running app+PG+Redis |
| 2 | Auth + users | Register/login, JWT, roles, protected writer routes |
| 3 | Posts CRUD | Full CRUD with Prisma, zod validation, tests for services |
| 4 | Caching + rate limits | Redis cache-aside on read routes, rate limits on API |
| 5 | Realtime | Live "new post" + comment notifications over socket.io |
| 6 | Queue + indexing | Publishing enqueues a BullMQ job that embeds the post |
| 7 | RAG Q&A | Ask questions over the blog, get answers with cited sources |
| 8 | Tests everywhere | Unit + integration coverage on services and auth |
| 9 | Docker + deploy | Containerized, deployed, CI green on every push |
| 10 | Polish | README with setup + architecture diagram, `.env.example`, cleanup |

## Rules of the capstone

1. **Build it yourself.** You may use official docs and API references, but not step-by-step tutorials for the whole project.
2. **TypeScript strict mode on. `tsc --noEmit` clean.**
3. **No secrets in the repo.** `.env.example` documents what's needed.
4. **Commit often** with clear messages — the git history is part of the deliverable.
5. **If you get stuck on one feature > 1 day**, simplify that feature and keep moving. A working, deployed MVP beats a perfect unfinished app.

## What "done" looks like

- A reviewer can clone your repo, read the README, run `docker-compose up`, and have the whole system running.
- Register → write a post → see a live notification → ask the AI a question about it → get a sourced answer.
- The app is deployed somewhere with a public URL.
- You can explain every layer of the architecture diagram.

## After the capstone

You've reached the end. Now go build things that matter to *you* — your own ideas, products, or open-source contributions. The roadmap gave you the foundation; your projects give you the identity. 🎉

## Resources

Everything you already used in Stages 05–13. The docs are your reference — the skill is yours.
