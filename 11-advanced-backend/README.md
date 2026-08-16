# Stage 11 — Advanced Backend

> Difficulty: ⭐⭐⭐ · Est. time: 3–4 weeks · Projects: 3

## Why this stage exists

Real systems handle work that shouldn't run inside an HTTP request: sending emails, resizing images, syncing data. That's where **job queues**, **schedulers**, and **workers** come in. This stage also hardens your APIs for production: logging, config, rate limiting, and health checks. After this, you're a backend developer, not just an API builder.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Job queues | Decoupling work: producer enqueues, workers process |
| BullMQ | The standard Redis-backed queue for Node: queues, jobs, workers |
| Retries & failures | Job retry policies, dead-letter queues, error visibility |
| Cron jobs | Scheduled tasks (`node-cron`) — run a job at 9am daily |
| Background workers | Separate processes doing async work |
| Structured logging | `pino`/`winston`: JSON logs, log levels, request IDs |
| Rate limiting | `express-rate-limit`, Redis-backed limits per IP/user |
| Health checks | `GET /health` returning app + DB + queue status |
| Graceful shutdown | Handle SIGTERM, finish in-flight requests, close connections |
| Env-based config | A typed config module loaded from `.env` |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-job-queue` | A producer + worker system with BullMQ: job types, retries, statuses |
| 2 | `02-email-scheduler` | Scheduled + queued emails: cron trigger + queue + worker + (fake or real) email sender |
| 3 | `03-production-api` | Harden an API: pino logging, rate limiting, health checks, graceful shutdown, typed config |

## Architecture mental model

```text
HTTP request ──► API server (producer) ──► Redis queue ──► Worker process
                                          └──► retries, dead-letter, metrics
Cron ──► scheduler ──► enqueue job ──► queue ──► worker
```

The **API should never do slow work synchronously** — it should respond fast and let a worker finish the job. This is how production systems keep their APIs snappy.

## Running multiple processes

Each project needs the API server AND the worker running together:

```bash
# two terminals:
npm run dev          # API server
npm run worker       # worker process
```

Use `--watch`/`tsx` for both in dev.

## Done checklist

- [ ] I've built a queue with BullMQ: multiple job types, retries, status tracking
- [ ] My worker recovers from failures (retries with backoff)
- [ ] I've built a cron scheduler that triggers a job
- [ ] My production API logs structured JSON, rate-limits, and has `/health`
- [ ] My server handles SIGTERM gracefully (finishes requests, closes Redis/DB)
- [ ] All 3 projects run as separate processes and pass `tsc --noEmit`

## When to move on

When you understand why a slow task shouldn't run inside an HTTP request. Then open `../12-docker-deployment/README.md`.

## Resources

- [BullMQ docs](https://docs.bullmq.io/)
- [node-cron](https://github.com/node-cron/node-cron)
- [pino](https://getpino.io/) / [winston](https://github.com/winstonjs/winston)
- [express-rate-limit](https://github.com/express-rate-limit/express-rate-limit)
- [Pattern: queue-based load leveling](https://learn.microsoft.com/en-us/azure/architecture/patterns/queue-based-load-leveling)
