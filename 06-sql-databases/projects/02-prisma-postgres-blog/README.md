# Project 02 — Prisma Postgres Blog

> Stage: 06 · Difficulty: ⭐⭐

## Assignment

Build a **blog API** using **Postgres + Prisma**. This is your first relational project with multiple connected models, migrations, and an ORM — the skill stack used by most production TypeScript backends.

## Data model

```
User   (id, email unique, name, passwordHash, role: USER|ADMIN, createdAt)
Post   (id, title, content, published: bool, createdAt, updatedAt, authorId → User)
Comment(id, content, createdAt, postId → Post, authorId → User)
```

Relations: User 1:N Post, Post 1:N Comment, User 1:N Comment.

## Endpoints

```
POST   /register            → create user (email/password validation)
POST   /login               → return a token (keep it simple; full auth in Stage 08)
GET    /posts               → published posts, newest first
GET    /posts/:id           → post + its comments (with author names)
POST   /posts               → create (auth: must be logged in)
PATCH  /posts/:id           → update own post
DELETE /posts/:id           → delete own post (admin can delete any)
POST   /posts/:id/comments  → add comment (logged in)
GET    /users/:id/posts     → all posts by a user
GET    /admin/stats         → counts per model (admin only, auth required)
```

## Requirements / acceptance criteria

- [ ] Prisma schema with all 3 models + relations + enums
- [ ] **Migrations**: use `prisma migrate dev`; make an initial migration and at least one follow-up change (add a `views` counter to Post) as a second migration
- [ ] Seeded data: a `prisma/seed.ts` script creating 2 users, 5 posts, 10 comments
- [ ] Queries use `include` for relations correctly (avoid N+1 — batch with include, not per-row queries)
- [ ] A simple token auth middleware (plain JWT-ish or a signed header is fine; real auth is Stage 08)
- [ ] All validation with zod; correct status codes
- [ ] `npx tsc --noEmit` passes; app runs against Postgres (Docker/local/Neon)

## Hints

- Setup: `npm install @prisma/client`, `npm install -D prisma`, `npx prisma init` → put `DATABASE_URL` in `.env`.
- Keep a `.env.example` in the repo; never commit the real `.env`.
- For the N+1 lesson: first write the posts-with-comments query naively (per-row), observe the query count with `DEBUG=prisma` or Prisma's query logging, then fix with `include: { comments: true }`.
- Wrap Prisma calls in a `repositories/` layer so controllers stay clean.

## Stretch goals

- Add a `Post.authorId` filter query: `GET /posts?author=<id>`.
- Add a many-to-many `Tag` model (posts ↔ tags) — the classic `PostTag` join table.
- Add pagination (cursor-based with `skip`/`take`).
- Set up `prisma migrate deploy` for production + a `docker-compose.yml` preview (full Docker is Stage 12).

## How to run

```bash
npm init -y
npm install express zod @prisma/client bcryptjs jsonwebtoken
npm install -D typescript tsx @types/node @types/express @types/bcryptjs @types/jsonwebtoken prisma
npx prisma migrate dev --name init
npx tsx prisma/seed.ts
node src/index.ts
```
