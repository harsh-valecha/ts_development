# Project 01 — Express Notes API

> Stage: 05

Your first framework-backed REST API for notes.

## What to build

- `GET /notes` (+ `?search=`) · `GET /notes/:id` · `POST /notes` · `PATCH /notes/:id` · `DELETE /notes/:id` → 204 · `GET /health`
- Note shape: `{ id, title, body, tags, pinned, createdAt, updatedAt }`
- Persist to `data/notes.json`

## Rules

- Structure: `index.ts` (bootstrap) + `app.ts` (exported, not listening) + `routes/` + `controllers/` + `services/`
- Validate input with zod → 400 on bad input
- Central error-handling middleware; async handlers never leak rejections
- Correct status codes: 200/201/204/400/404
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express zod
npm install -D typescript tsx @types/node @types/express
node src/index.ts
curl -X POST http://localhost:3000/notes -H "Content-Type: application/json" -d '{"title":"Buy milk"}'
curl http://localhost:3000/notes
```