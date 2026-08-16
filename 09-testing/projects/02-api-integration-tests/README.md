# Project 02 — API Integration Tests

> Stage: 09 · Difficulty: ⭐⭐

## Assignment

Write **integration tests** that hit real HTTP routes against one of your existing APIs — the **Express Notes API (Stage 05)** is the perfect target. Tests spin up the actual app (or a copy) with `supertest` and exercise the full request pipeline.

## What to test

Create `tests/notes.integration.test.ts` covering:

1. **Happy paths**
   - POST /notes → 201, body matches the created note
   - GET /notes → 200, array containing it
   - GET /notes/:id → 200, correct note
   - PATCH /notes/:id → 200, updated field reflects change
   - DELETE /notes/:id → 204, then GET → 404

2. **Validation & errors**
   - POST with missing `title` → 400 with a useful message
   - POST with `body` as a number → 400
   - GET unknown id → 404
   - PATCH invalid id format → 400 or 404 (your choice, be consistent)
   - Malformed JSON body → 400, not a crash

3. **Search & filters**
   - `?search=` returns only matching notes
   - `?tag=` filtering works (if your notes API supports it)

## Requirements / acceptance criteria

- [ ] Tests run against the **real app** (import `app.ts`, not the listening server)
- [ ] Uses `supertest` (`request(app).get(...)`)
- [ ] Uses a **separate test data file/DB** — tests must not touch your real dev data
- [ ] Cleanup between tests (`beforeEach`/`afterEach`) so tests are independent and rerunnable
- [ ] ≥ 15 test cases across the categories above
- [ ] `npm test` green, `npx tsc --noEmit` green

## Hints

- The Stage 05 pattern (`app.ts` exports app, `index.ts` listens) is *exactly* why — `supertest(app)` needs the app, not the port.
- Point the notes store at `data/test-notes.json` via env var or by clearing state in `beforeEach`.
- `supertest`: `await request(app).post("/notes").send({...}).expect(201)`.
- Assert on *both* status and body shape — `expect(res.body.title).toBe(...)`.
- Make the storage layer injectable if it isn't already (dependency injection via a `createApp({ store })` factory is the clean way).

## Stretch goals

- Add tests for a route that needs auth (from Stage 08) — login, get token, hit protected route.
- Measure and assert response times stay under a threshold.
- Add a simple CI-friendly runner (the `test` script just works in GitHub Actions later).

## How to run

```bash
# in the notes-api project (copy of Stage 05)
npm install -D vitest supertest @types/supertest
npm test
```
