# Project 02 — Redis Caching Layer

> Stage: 07

Wrap one of your existing APIs with a Redis cache — cache-aside with TTLs.

## What to build

- Cache-aside reads: check cache → hit? return fast · miss? query DB → SET with TTL → return
- Invalidate on writes: `POST`/`PATCH`/`DELETE` delete the affected keys so stale data never survives
- Cache list endpoints for a short TTL, keyed by the full query
- Rate limit `GET /api/*` with Redis counters (bonus core feature)

## Rules

- Prove the win: log cold vs warm timings (`cache hit in 0.4ms vs DB in 8ms`)
- TTLs everywhere; Redis down ≠ app down (fall through to DB gracefully)
- Rate limiter returns 429 with a `Retry-After` header
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express better-sqlite3 redis
npm install -D typescript tsx @types/node @types/express
docker run --name redis -p 6379:6379 -d redis
node src/index.ts
curl http://localhost:3000/notes/1   # DB miss
curl http://localhost:3000/notes/1   # cache hit
```