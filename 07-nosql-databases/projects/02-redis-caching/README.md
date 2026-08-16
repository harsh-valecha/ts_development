# Project 02 — Redis Caching Layer

> Stage: 07 · Difficulty: ⭐⭐

## Assignment

Add a **Redis cache layer** to an existing API — ideally the SQLite notes API (Stage 06) or your Prisma blog (06-02). The goal is cache-aside: fast reads, and caches that stay correct when data changes.

## What to build

1. **Cache-aside read path**

```
GET /notes/:id
  check cache: GET notes:id   ──► hit? return cached JSON (fast)
                            └──► miss? query DB → SET notes:id with TTL (60s) → return
```

2. **Invalidation on writes**: `POST`, `PATCH`, `DELETE` must **delete** the affected keys (and any list keys) so stale data never survives.

3. **List caching**: `GET /notes` caches the page/list for a short TTL (10s), keyed by the full query (`notes:list:search=:tag=...`).

4. **Rate limiting** (bonus core feature): `GET /api/*` limited to N req/min per IP using Redis counters with TTL.

## Requirements / acceptance criteria

- [ ] Uses the `redis` npm client (or `ioredis`)
- [ ] **Measurable win**: before/after timings for a cold vs warm cache hit are logged or printed (e.g. `cache hit in 0.4ms vs DB in 8ms`)
- [ ] Cache-aside + invalidation provably correct: update a note → next GET returns the **new** data, not stale
- [ ] TTLs used everywhere (no unbounded cache growth)
- [ ] Redis down ≠ app down: cache misses fall through to the DB gracefully (catch connection errors)
- [ ] Rate limiter returns 429 with `Retry-After` header when exceeded
- [ ] `npx tsc --noEmit` passes

## Hints

- Key conventions: `notes:{id}`, `notes:list:{hashOfQuery}`. Prefix with an env-based namespace so test/prod don't collide.
- Invalidation on write: also `del` list keys — simplest correct approach is `DEL notes:list:*` via `KEYS` scan (fine for learning; mention the production-grade `SCAN` alternative in a comment).
- Wrap all Redis calls in a small `cache.ts` module with `get<T>`, `set`, `del` — so switching clients later is trivial.
- For timings, `performance.now()` before/after and log to console.
- Serialize cached values as JSON strings; type the `get<T>` return.

## Stretch goals

- Add a **cache stampede guard** (a short "lock" so concurrent misses don't all hit the DB).
- Add `PATCH /notes/:id` that re-caches the updated note (write-through) instead of just deleting.
- Add a cache statistics endpoint: `GET /_internal/cache` → { hits, misses, keys, memory }.
- Use Redis `HSET` to store note fields for finer-grained invalidation.

## How to run

```bash
npm init -y
npm install express better-sqlite3 redis
npm install -D typescript tsx @types/node @types/express
docker run --name redis -p 6379:6379 -d redis
node src/index.ts

# warm a note twice and watch the logs:
curl http://localhost:3000/notes/1   # DB miss
curl http://localhost:3000/notes/1   # cache hit
curl -X PATCH http://localhost:3000/notes/1 -d '{"title":"changed"}'
curl http://localhost:3000/notes/1   # fresh, not stale
```
