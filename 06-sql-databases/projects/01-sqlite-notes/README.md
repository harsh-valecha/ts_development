# Project 01 — SQLite Notes (Raw SQL)

> Stage: 06

Rebuild your notes API storing data in SQLite with raw SQL — no ORM.

## What to build

Same endpoints as the Stage 05 notes API, plus `GET /tags` (tags with counts).

- Tables: `notes` + `tags` (with `ON DELETE CASCADE`)
- Create the schema from a `schema.sql` on first run

## Rules

- Every query is raw SQL: SELECT/INSERT/UPDATE/DELETE/JOIN/GROUP BY
- Creating a note with tags is one transaction
- Prepared statements for everything (no string concatenation — no SQL injection)
- `?tag=` filter uses a JOIN; `GET /tags` uses `GROUP BY` + `COUNT`
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express better-sqlite3
npm install -D typescript tsx @types/node @types/express @types/better-sqlite3
node src/index.ts
# curl the same endpoints as the Stage 05 notes API
```