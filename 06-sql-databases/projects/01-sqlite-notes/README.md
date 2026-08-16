# Project 01 — SQLite Notes (Raw SQL)

> Stage: 06 · Difficulty: ⭐⭐

## Assignment

Rebuild your notes API (from Stage 05) but store data in **SQLite using raw SQL** via `better-sqlite3`. No ORM — you write every query by hand. This is where you truly learn SQL.

## Endpoints (same as Stage 05)

```
GET    /notes               → list (optional ?search=&tag=)
GET    /notes/:id           → one note or 404
POST   /notes               → create { title, body?, tags }
PATCH  /notes/:id           → partial update
DELETE /notes/:id           → 204
GET    /tags                → list of tags with counts
```

## Schema

```sql
CREATE TABLE notes (
  id         TEXT PRIMARY KEY,
  title      TEXT NOT NULL,
  body       TEXT DEFAULT '',
  pinned     INTEGER NOT NULL DEFAULT 0,  -- SQLite has no boolean
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE tags (
  note_id TEXT NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  name    TEXT NOT NULL,
  PRIMARY KEY (note_id, name)
);
```

## Requirements / acceptance criteria

- [ ] All queries written in **raw SQL** (SELECT/INSERT/UPDATE/DELETE/JOIN/GROUP BY)
- [ ] Schema created on first run from a `schema.sql` you write
- [ ] Transactions: creating a note with tags must atomically insert both (one `BEGIN`/`COMMIT`)
- [ ] `ON DELETE CASCADE` works — deleting a note removes its tags
- [ ] `?tag=` filter uses a JOIN; `GET /tags` uses `GROUP BY` + `COUNT`
- [ ] Prepared statements used for all parameterized queries (no string concatenation — prevent SQL injection)
- [ ] `npx tsc --noEmit` passes
- [ ] Tests via curl: create, tag-search, delete-cascade all verified

## Hints

- `better-sqlite3` is **synchronous** — that's a feature here (fast, and great for learning). Wrap queries in a small typed `db.ts` repository module.
- Parameterized: `db.prepare("SELECT * FROM notes WHERE id = ?").get(id)`.
- Row types: define TS interfaces for note + tag rows.
- Use `db.transaction(...)` for the multi-statement create.

## Stretch goals

- Add a `search` using `LIKE '%term%'` — then try `FTS5` full-text search and compare.
- Add pagination with `LIMIT ? OFFSET ?`.
- Write a `GET /notes?sort=pinned` using `ORDER BY pinned DESC, updated_at DESC`.

## How to run

```bash
npm init -y
npm install express better-sqlite3
npm install -D typescript tsx @types/node @types/express @types/better-sqlite3
node src/index.ts
# then curl the same endpoints as Stage 05
```
