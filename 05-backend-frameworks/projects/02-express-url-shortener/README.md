# Project 02 — Express URL Shortener

> Stage: 05

The classic "every backend dev has built one" project.

## What to build

- `POST /shorten` → `{ url, customSlug? }` → 201 `{ shortUrl, slug }`
- `GET /:slug` → 302 redirect + click counter
- `GET /api/stats/:slug` → `{ slug, url, createdAt, clicks }` · `GET /api/top` → top 10
- `DELETE /api/slug/:slug` → 204

## Rules

- Validate the URL is real http/https (zod); custom slugs match `^[a-zA-Z0-9-_]{3,20}$`, reject taken → 409
- Generate unique short slugs (base62 from `crypto.randomBytes`, handle collisions)
- Unknown slug → 404; storage in `data/links.json`
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express zod
npm install -D typescript tsx @types/node @types/express
node src/index.ts
curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d '{"url":"https://www.typescriptlang.org/"}'
curl -i http://localhost:3000/<slug>
```