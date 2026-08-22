# Project 01 — Job Queue with BullMQ

> Stage: 11

A producer + worker system with BullMQ (Redis-backed) — retries, backoff, failure visibility.

## What to build

- **Producer** (`src/index.ts`): `POST /api/process` enqueues a job, returns `{ jobId, status: "queued" }`; `GET /api/jobs/:id` shows state
- **Worker** (`src/worker.ts`, separate process): simulates processing with delays; job data `fail: true` throws (to test retries)
- `POST /api/retry/:id` re-queues a failed job

## Rules

- Producer + worker run as two separate processes
- Jobs retry with exponential backoff (e.g. 3 attempts) then fail visibly
- Worker processes jobs in parallel (`concurrency: 3`)
- The HTTP response is instant — work happens in the worker
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express bullmq ioredis
npm install -D typescript tsx @types/node @types/express
docker run --name redis -p 6379:6379 -d redis
# terminal 1: node src/worker.ts
# terminal 2: node src/index.ts
curl -X POST localhost:3000/api/process -d '{"imageUrl":"https://example.com/x.png"}'
curl localhost:3000/api/jobs/<id>
```