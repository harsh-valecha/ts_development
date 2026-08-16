# Project 03 — Production API

> Stage: 11 · Difficulty: ⭐⭐⭐

## Assignment

Take one of your earlier APIs (the notes API from Stage 06 is ideal) and harden it into a **production-quality service**: structured logging, rate limiting, typed config, health checks, graceful shutdown, and solid error handling. This is the difference between a project and a product.

## What to add

1. **Typed configuration** (`src/config.ts`)
   - Reads `.env` (via `dotenv`), validates with zod, exposes a typed frozen `config` object
   - `PORT`, `NODE_ENV`, `LOG_LEVEL`, `DB_PATH`, `RATE_LIMIT_MAX`, `RATE_LIMIT_WINDOW_MS`
   - Fails fast on startup if a required var is missing

2. **Structured logging** (pino)
   - JSON logs with `level`, `time`, `reqId` per request, `duration_ms`
   - Request logging middleware (`pino-http` or hand-rolled with pino)
   - Redact sensitive fields (passwords, tokens, Authorization header) — prove the redaction works
   - `NODE_ENV=production` changes log level automatically

3. **Rate limiting**
   - Per-IP limits using `express-rate-limit` (in-memory is fine here)
   - 429 response with `Retry-After` header and a JSON body

4. **Health check** (`GET /healthz`)
   - Returns 200 with `{ status: "ok", uptime, db: "ok"|"down", memory, env }`
   - DB check is real (e.g. a trivial `SELECT 1` against SQLite)
   - 503 if a dependency is down

5. **Graceful shutdown**
   - Handle `SIGINT`/`SIGTERM`: stop accepting connections, drain in-flight requests, close the DB, exit 0
   - A second signal forces exit (with a log)

6. **Error handling polish**
   - Central error middleware mapping errors → proper status codes
   - Zod errors → 400 with field messages
   - Unknown routes → 404 JSON
   - A `/boom` route that throws, to prove errors are caught and logged (not crashed)

## Requirements / acceptance criteria

- [ ] `config` is a single typed object — no scattered `process.env.X`
- [ ] Every request produces a structured JSON log with duration + request id
- [ ] Rate limit exceeded → 429 + `Retry-After`; different endpoints can have different limits
- [ ] `/healthz` accurately reflects DB status (test by stopping the DB file/connection)
- [ ] Ctrl-C → clean shutdown log messages, DB closed, exit code 0
- [ ] No crash on `/boom` — returns 500 JSON with error logged
- [ ] `npx tsc --noEmit` passes

## Hints

- pino: `const logger = pino({ level })`; a request-logging middleware wraps `res.on("finish")` to log the completed request.
- Redaction: `pino({ redact: ["req.headers.authorization", "*.password"] })`.
- Health checks should be *cheap* — `db.prepare("SELECT 1").get()`.
- For graceful shutdown: `server.close(cb)` then close DB then `process.exit(0)`; add a `setTimeout` force-exit on the second signal.
- `NODE_ENV` gates: dev = verbose logs + no rate limiting (or huge limits).

## Stretch goals

- Add an in-flight request counter and refuse new requests during shutdown (drain).
- Add `GET /metrics` with simple counters (requests, errors, duration histograms) — groundwork for Prometheus later.
- Dockerize it (that's Stage 12 — a head start is fine).

## How to run

```bash
npm init -y
npm install express zod pino pino-http express-rate-limit dotenv better-sqlite3
npm install -D typescript tsx @types/node @types/express @types/better-sqlite3
node src/index.ts
# open the app, then:
#   kill -INT <pid>    → observe graceful shutdown logs
#   curl localhost:3000/boom    → 500 JSON, logged
#   hammer the API       → 429s
curl localhost:3000/healthz
```
