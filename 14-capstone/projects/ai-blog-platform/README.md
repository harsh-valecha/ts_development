# Capstone — AI Blog Platform

> Stage: 14 · Difficulty: ⭐⭐⭐ · The final boss

## The brief

Build **"RAG-Powered Blog Platform"** — a blog where writers publish posts, and visitors can **ask an AI questions about the content**, answered via RAG over the actual posts. Everything you've learned, in one deployable product.

## Core features (each maps to a stage you've completed)

| Feature | Skills (stage) |
|---------|----------------|
| Auth: register/login, roles (reader/writer/admin) | JWT, bcrypt, RBAC (08) |
| Posts CRUD with zod validation | Express, validation (05) |
| Postgres (Prisma) for users/posts/comments | SQL, Prisma, migrations (06) |
| Redis caching of hot posts + rate limiting | NoSQL, caching (07, 11) |
| Live "new post"/comment notifications | WebSockets/socket.io (10) |
| Publishing enqueues an "index for AI" job | BullMQ queue (11) |
| RAG: chunk posts → embed → retrieve → answer with sources | AI (13) |
| Vitest + supertest tests | Testing (09) |
| Dockerfile + docker-compose + cloud deploy + CI | Docker, deployment (12) |

## Data model

```
User      (id, email, passwordHash, role, createdAt)
Post      (id, title, slug, content, published, publishedAt, authorId → User, views)
Comment   (id, content, createdAt, postId → Post, authorId → User)
Embedding (id, postId → Post, chunkIndex, text, vector[])   # the RAG store
```

## Suggested milestones (do in order)

1. **Skeleton**: app structure, typed `config`, `/healthz`, docker-compose (app + Postgres + Redis) running.
2. **Auth + roles**: register/login, JWT, writer-only post creation, admin user management.
3. **Posts CRUD**: Prisma models, zod, slug generation, tests for services.
4. **Caching + rate limits**: Redis cache-aside on post reads, per-IP limits.
5. **Realtime**: socket.io emits "new post" to subscribers; comments notify the post author live.
6. **Queue + indexing**: `publish` enqueues a job that chunks + embeds the post into the Embedding table. Indexing must NEVER block the API response.
7. **RAG Q&A**: `POST /api/ask` → retrieve chunks from that post's embeddings → answer with sources. Works per-post and across all posts.
8. **Testing**: services unit tests + supertest integration tests; ≥ 70% coverage on services/auth.
9. **Deploy**: Dockerized, deployed to Render/Railway, GitHub Actions CI (typecheck → test → build) green.
10. **Polish**: README with setup + architecture diagram, `.env.example`, seed script, final cleanup.

## The "wow" demo (your acceptance test)

1. Writer publishes "My Journey with TypeScript" → subscribers see a live notification.
2. A visitor asks the AI: *"What does the author say about generics?"* → sourced answer with the exact post paragraph quoted.
3. Kill the app → restart → everything (users, posts, embeddings) still there; cached reads fast again.
4. Run it in Docker with one command; CI is green.

## Rules

- **You build it.** Docs + API references allowed; full-project tutorials are not.
- `tsc --noEmit` clean, strict mode, zero `any` (except genuinely-untyped edges, each justified).
- Secrets only via `.env`; `.env.example` committed; `.env` and `node_modules` gitignored.
- Commit often with clear messages — the history shows your journey.
- Stuck > 1 day on a feature? Simplify it, ship the MVP, revisit later. A deployed working product beats a perfect draft.

## When you finish

You've completed the roadmap. Update the master `README.md` checklist (Milestone G), write a short "Capstone retrospective" in this folder's README — what you'd do differently, what you're proud of, what you want to build next — and then go build something *you* want. You're a TypeScript backend developer now. 🎉

## Resources

All the docs from Stages 05–13 are your reference. The skill is yours.
