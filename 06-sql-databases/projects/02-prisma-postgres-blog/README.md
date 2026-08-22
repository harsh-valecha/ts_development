# Project 02 — Prisma Postgres Blog

> Stage: 06

A blog API with Postgres + Prisma — your first multi-model relational project.

## What to build

- Models: `User` (1:N `Post`), `Post` (1:N `Comment`), `User` (1:N `Comment`)
- Endpoints: register/login, `GET /posts` (+ `/posts/:id` with comments), create/update/delete posts, add comments, `GET /users/:id/posts`, `GET /admin/stats`

## Rules

- Prisma migrations: an initial one + one follow-up (add a `views` counter to Post)
- Seed script: 2 users, 5 posts, 10 comments
- Load relations with `include` (avoid the N+1 problem)
- Simple token auth middleware; zod validation everywhere
- `npx tsc --noEmit` passes; runs against Postgres (Docker/local/Neon)

## How to run

```bash
npm init -y
npm install express zod @prisma/client bcryptjs jsonwebtoken
npm install -D typescript tsx @types/node @types/express @types/bcryptjs @types/jsonwebtoken prisma
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
node src/index.ts
```