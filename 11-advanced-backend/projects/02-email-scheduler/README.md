# Project 02 — Email Scheduler

> Stage: 11

Scheduled + queued emails: cron scheduler enqueues, worker sends (fake transport, no real SMTP).

## What to build

- **API** (`src/index.ts`): `POST /api/emails` (one-off with `sendAt`), `POST /api/emails/recurring` (with `cron`), list, cancel, stats
- **Scheduler**: checks every minute, enqueues a `send-email` job per due email; recurring emails advance `nextRunAt`
- **Worker** (`src/worker.ts`): "sends" via a fake transport, marks sent/failed, retries failed sends

## Rules

- One-off emails send at/after `sendAt`; recurring emails send repeatedly
- Cancelling prevents sending; failed sends retry then mark failed
- Scheduler + worker + API run as separate processes
- Sends logged with timestamps
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express better-sqlite3 bullmq cron-parser
npm install -D typescript tsx @types/node @types/express
# terminal 1: node src/worker.ts · terminal 2: node src/scheduler.ts · terminal 3: node src/index.ts
curl -X POST localhost:3000/api/emails -d '{"to":"a@b.c","subject":"hi","body":"hello","sendAt":"2026-08-16T14:30:00Z"}'
curl localhost:3000/api/emails
```