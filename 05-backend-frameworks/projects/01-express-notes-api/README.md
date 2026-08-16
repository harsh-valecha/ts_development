# Project 01 — Express Notes API

> Stage: 05 · Difficulty: ⭐⭐

## Assignment

Build a REST API for **notes** with Express — your first framework-backed API. This is the project you'll revisit in later stages (test it in Stage 09, containerize it in Stage 12), so build it well.

## Endpoints

```
GET    /notes             → list (optional ?search=)
GET    /notes/:id         → one note or 404
POST   /notes             → create (validate: title required, body optional)
PATCH  /notes/:id         → partial update
DELETE /notes/:id         → 204
GET    /health            → { status: "ok" } (DB/file check included)
```

## Note shape

```ts
interface Note {
  id: string;
  title: string;
  body: string;
  tags: string[];
  pinned: boolean;
  createdAt: string;
  updatedAt: string;
}
```

## Requirements / acceptance criteria

- [ ] Express app structured as `index.ts` (bootstrap) + `app.ts` (exported app) + `routes/` + `controllers/` + `services/`
- [ ] `express.json()` middleware for body parsing
- [ ] **zod** validation on POST/PATCH — invalid input → 400 with a useful message
- [ ] Centralized **error-handling middleware** at the end of the chain; async handlers don't leak unhandled rejections
- [ ] A tiny request-logging middleware (method, path, status, ms)
- [ ] Persistence: notes saved to `data/notes.json` (you can upgrade to SQLite in Stage 06)
- [ ] Correct status codes: 200/201/204/400/404
- [ ] `npx tsc --noEmit` passes
- [ ] `app.ts` exports the app **without listening** — this is what lets you supertest it in Stage 09

## Hints

- `app.ts` builds the app and `index.ts` calls `app.listen()` — a key pattern for testability.
- Wrap async route handlers: either a `wrap(fn)` helper or `express-async-errors`.
- Error middleware signature is `(err, req, res, next)` — four args, that's how Express detects it.
- Zod: `const NoteSchema = z.object({ title: z.string().min(1), ... })` then `NoteSchema.safeParse(req.body)`.
- PATCH should accept partial data: `z.object({...}).partial()`.

## Stretch goals

- Add `GET /notes?tag=work` filtering.
- Add `PATCH /notes/:id/pin` toggle.
- Add pagination (`?page=&pageSize=`).
- Add a root-level router (`routes/index.ts`) that mounts `routes/notes.ts`.

## How to run

```bash
npm init -y
npm install express zod
npm install -D typescript tsx @types/node @types/express
node src/index.ts

curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" \
  -d '{"title":"Buy milk","tags":["home"]}'
curl http://localhost:3000/notes
```
