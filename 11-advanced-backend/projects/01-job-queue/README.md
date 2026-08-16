# Project 01 — Job Queue with BullMQ

> Stage: 11 · Difficulty: ⭐⭐⭐

## Assignment

Build a **producer + worker** system with **BullMQ** (Redis-backed). The API enqueues jobs; a separate worker process processes them — with retries, backoff, and failure visibility.

## The scenario

An **image-processing service**. `POST /api/process` accepts `{ imageUrl }` and enqueues a job that (in a real app) would download and resize the image. Here, the worker simulates the work with delays and can be told to fail.

## What to build

1. **Producer (API server)** — `src/index.ts`
   - `POST /api/process` → validates URL, enqueues job to `image-processing` queue, returns `{ jobId, status: "queued" }`
   - `GET /api/jobs/:id` → job state (waiting/active/completed/failed) + result or error
   - `POST /api/retry/:id` → retry a failed job
2. **Worker** — `src/worker.ts` (separate process)
   - Processes jobs: logs a fake "processing" step (download, resize, optimize) with delays
   - If job data has `fail: true` → throws (to test retries)
   - On success stores a result (e.g. `{ outputUrl }`) in job's `returnvalue`
3. **Admin surface** (nice-to-have)
   - `GET /api/queues/stats` → counts per state, via `queue.getJobCounts()`
   - `GET /api/jobs/failed` → recent failures with error messages

## Job data types

```ts
type ImageJob = { imageUrl: string; id: string };
type ImageResult = { outputUrl: string; sizeBytes: number };
```

## Requirements / acceptance criteria

- [ ] Producer + worker run as **two separate processes** (`npm run dev` and `npm run worker`)
- [ ] Jobs go through the full lifecycle: queued → active → completed, visible via the API
- [ ] **Retries with backoff**: job fails → auto-retried (e.g. 3 attempts, exponential backoff), then marked failed
- [ ] Failed jobs expose the error; `/api/retry/:id` re-queues a failed job
- [ ] Concurrency: worker processes multiple jobs in parallel (`concurrency: 3`)
- [ ] The app does NOT block: HTTP response is instant, work happens in the worker
- [ ] `npx tsc --noEmit` passes

## Hints

- `new Queue("image-processing", { connection })` in the producer; `new Worker("image-processing", async (job) => {...}, { connection, concurrency: 3 })` in the worker.
- The processor's return value becomes `job.returnvalue` — store results there.
- Retries: options on the job (`attempts: 3`, `backoff: { type: "exponential", delay: 1000 }`).
- Keep `connection` config in a shared module from `.env` (REDIS_URL).
- A tiny `delay(ms)` helper simulates work. Make the failure path explicit (`fail: true` in job data) so retries are easy to observe.

## Stretch goals

- Add a **dead-letter queue**: after max attempts, push to a `image-processing-dead` queue and list it.
- Add BullMQ's **repeatable jobs** (`queue.add(..., { repeat: { every: 60000 } })`).
- Add BullMQ **events** (`queueEvents`) so the API can update a live job-status UI.
- Add a job that calls a real external API (reuse your `fetch` client from Stage 04).

## How to run

```bash
npm init -y
npm install express bullmq ioredis
npm install -D typescript tsx @types/node @types/express
docker run --name redis -p 6379:6379 -d redis

# terminal 1
node src/worker.ts
# terminal 2
node src/index.ts
# terminal 3
curl -X POST localhost:3000/api/process -d '{"imageUrl":"https://example.com/x.png"}'
curl localhost:3000/api/jobs/<id>
```
