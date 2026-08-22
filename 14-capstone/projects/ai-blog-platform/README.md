# Capstone — AI Blog Platform

> Stage: 14 · The final boss

A blog where writers publish posts and visitors can ask an AI questions about the posts (RAG over the actual content).

## What it combines

- **Auth**: register/login, JWT, roles (reader/writer/admin)
- **Persistence**: Postgres (Prisma) for users/posts/comments, Redis for caching + rate limiting
- **Realtime**: live "new post" notification via socket.io
- **Background**: publishing enqueues a job (BullMQ) that chunks + embeds the post — indexing never blocks the API
- **AI**: RAG — retrieve chunks → answer with cited sources
- **Tests**: Vitest for services, supertest for API routes
- **Ops**: Docker + compose, deployed to the cloud, GitHub Actions CI

## Suggested milestones (in order)

1. Skeleton + typed config + `/healthz` + docker-compose running
2. Auth + roles → 3. Posts CRUD → 4. Caching + rate limits
5. Realtime → 6. Queue + indexing → 7. RAG Q&A
8. Tests → 9. Deploy → 10. Polish (README, `.env.example`, seed)

## Rules

- You build it (docs + API references allowed, full-project tutorials not)
- Strict TS, `tsc --noEmit` clean, zero `any`
- Secrets only via `.env`; `.env.example` committed
- Commit often. Stuck > 1 day on a feature? Simplify and ship the MVP

## Done when

A reviewer can clone, run `docker-compose up`, and see: register → write a post → get a live notification → ask the AI a question → get a sourced answer.