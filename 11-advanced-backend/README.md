# Stage 11 — Advanced Backend

Move slow work out of HTTP requests and harden your API for production.

## Concepts — one tiny script each

- `queue.ts` — a BullMQ producer + worker with retries
- `cron.ts` — a scheduled job with node-cron
- `health.ts` — a `GET /health` endpoint reporting app + DB status
- `rate-limit.ts` — limit requests per IP with express-rate-limit

## How to work it

- Write one script per concept in `src/`, each printing its output
- The API should never do slow work synchronously — enqueue it
- Every script must pass `npm run typecheck`

## How to run

```bash
npm install bullmq ioredis node-cron express-rate-limit
npm run typecheck
node src/queue.ts   # repeat per script
```

## Move on when

You understand why a slow task shouldn't run inside an HTTP request.