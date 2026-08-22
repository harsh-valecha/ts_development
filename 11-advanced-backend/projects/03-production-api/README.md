# Project 03 — Production API

> Stage: 11

Harden one of your earlier APIs into a production-quality service.

## What to add

- **Typed config** (`src/config.ts`): reads `.env`, validated with zod, one frozen typed object; fails fast on a missing var
- **Structured logging** (pino): JSON logs with level, time, request id, duration; redact passwords/tokens
- **Rate limiting**: per-IP limits, 429 + `Retry-After` header
- **Health check** `GET /healthz`: `{ status, uptime, db, memory, env }` — 503 when a dependency is down
- **Graceful shutdown**: handle SIGINT/SIGTERM, finish in-flight requests, close the DB, exit 0
- Central error middleware; a `/boom` route proves errors are caught, not crashed

## Rules

- No scattered `process.env.X` — everything from `config`
- Every request logs JSON with duration + request id
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express zod pino pino-http express-rate-limit dotenv better-sqlite3
npm install -D typescript tsx @types/node @types/express @types/better-sqlite3
node src/index.ts
curl localhost:3000/healthz
# kill -INT <pid> → observe graceful shutdown logs
```