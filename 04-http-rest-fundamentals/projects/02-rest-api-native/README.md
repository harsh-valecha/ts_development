# Project 02 — REST API (No Framework)

> Stage: 04

A full CRUD REST API using only `node:http` and `fs` — zero frameworks, zero ORMs.

## What to build

Full CRUD for a resource (e.g. books) plus:

- `GET /books` → list with `?search=` + pagination (`?limit=&offset=`)
- `GET /books/:id` → one or 404 · `POST /books` → 201 · `PUT/PATCH /books/:id` · `DELETE /books/:id` → 204
- `GET /stats` → `{ total, byGenre, mostRecent }`

## Rules

- Data persists to `data/books.json` (atomic writes)
- Validate input: missing/invalid fields → 400; unknown route → 404 JSON
- Structure: `index.ts` (bootstrap) + `router.ts` + `controllers/` + `services/` (no `req`/`res`) + `store.ts` + `types.ts`
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts
curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d '{"title":"TS in Action","author":"You","genre":"tech","publishedYear":2026,"pages":300}'
curl http://localhost:3000/books
```