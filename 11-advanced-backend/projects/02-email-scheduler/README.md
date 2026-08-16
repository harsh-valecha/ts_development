# Project 02 — Email Scheduler

> Stage: 11 · Difficulty: ⭐⭐⭐

## Assignment

Build a **scheduled + queued email system**: a cron scheduler enqueues jobs, a worker sends them, and the API schedules one-off and recurring emails. Use a **fake email transport** (log to console/file or `nodemailer` with a test account) — no real SMTP needed.

## What to build

1. **API** — `src/index.ts`
   - `POST /api/emails` → schedule a one-off email `{ to, subject, body, sendAt }`
   - `POST /api/emails/recurring` → `{ to, subject, body, cron }` (e.g. `"0 9 * * *"`)
   - `GET /api/emails` → list (status: scheduled/sent/failed, nextRunAt)
   - `DELETE /api/emails/:id` → cancel a scheduled email
   - `GET /api/emails/stats` → counts by status
2. **Scheduler** — checks every minute (BullMQ repeatable job or `node-cron`):
   - Finds due emails → enqueues a `send-email` job per email
   - Recurring emails compute the **next run time** after sending
3. **Worker** — `src/worker.ts`:
   - Consumes `send-email` jobs
   - "Sends" via a fake transport (`sendEmail(to, subject, body)` logs/returns a message id), marks email sent/failed
   - Retries failed sends (BullMQ attempts + backoff)

## Data model (SQLite is fine)

```ts
interface Email {
  id: string;
  to: string;
  subject: string;
  body: string;
  cron?: string;            // recurring if present
  sendAt?: Date;            // one-off date (ISO)
  nextRunAt?: Date;         // for recurring
  status: "scheduled" | "sent" | "failed" | "cancelled";
  attempts: number;
}
```

## Requirements / acceptance criteria

- [ ] One-off emails send at/after their `sendAt` time (test with a time ~1 min in the future)
- [ ] Recurring emails send repeatedly and `nextRunAt` advances correctly
- [ ] Cancelling a scheduled email prevents it from sending
- [ ] Failed sends retry (attempts counted), then mark failed
- [ ] Scheduler and worker are separate from the API (run as 2–3 processes)
- [ ] Sends are logged with timestamps; stats endpoint reflects reality
- [ ] `npx tsc --noEmit` passes

## Hints

- Two clean approaches — pick one: **(a)** BullMQ **repeatable job** (`repeat: { cron: "* * * * *" }`) that scans for due emails each minute; **(b)** `node-cron` in the scheduler process doing the scan then `queue.add(...)`. Both are valid — try (a) first, it's the BullMQ-native way.
- Store `nextRunAt` in the DB and compute it from cron with the `cron-parser` lib.
- The fake transport returns a deterministic `messageId` — pretend success. To test retries, add an env flag `FAIL_SEND=true` that makes the transport throw.
- Guard against double-sends: a `WHERE status='scheduled' AND nextRunAt <= now` SELECT can double-fire if two scheduler ticks overlap — make the "claim" atomic (UPDATE status='sending' ... returning) or document the risk.

## Stretch goals

- Add a **daily digest**: `POST /api/emails/digest` collects events into one daily email.
- Add email **templates** (string interpolation or a tiny `{{name}}` engine you write).
- Add `GET /api/emails/:id/history` — every attempt with timestamps and results.
- Wire in real `nodemailer` with a free Ethereal test account (`nodemailer.createTestAccount()`).

## How to run

```bash
npm init -y
npm install express better-sqlite3 bullmq cron-parser
npm install -D typescript tsx @types/node @types/express

# terminal 1
node src/worker.ts
# terminal 2
node src/scheduler.ts
# terminal 3
node src/index.ts
curl -X POST localhost:3000/api/emails -d '{"to":"a@b.c","subject":"hi","body":"hello","sendAt":"2026-08-16T14:30:00Z"}'
curl localhost:3000/api/emails
curl localhost:3000/api/emails/stats
```
