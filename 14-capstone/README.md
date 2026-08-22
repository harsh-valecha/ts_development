# Stage 14 — Capstone: AI Blog Platform

The final boss — build one real product combining everything you've learned.

## The brief

A blog where writers publish posts and visitors can ask an AI questions about the posts (RAG over the actual post content).

## What it combines

- **Auth**: register/login, JWT, roles (reader/writer/admin)
- **Persistence**: Postgres (Prisma) for data, Redis for caching + rate limiting
- **Realtime**: live notification when a post is published
- **Background**: publishing enqueues a job that indexes the post for AI
- **AI**: RAG pipeline — post chunks → embeddings → answer with sources
- **Tests**: Vitest for services, supertest for API routes
- **Ops**: Docker + compose, deployed to the cloud, CI on every push

## Rules

- Strict TypeScript, `tsc --noEmit` clean
- No secrets in the repo — `.env.example` documents what's needed
- Commit often. If stuck > 1 day on a feature, simplify it and keep moving

## Move on when

A reviewer can clone, run `docker-compose up`, and see: register → write a post → get a live notification → ask the AI a question → get a sourced answer.