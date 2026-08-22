# Project 02 — API Integration Tests

> Stage: 09

Hit real HTTP routes with supertest against one of your existing APIs (the Stage 05 notes API is ideal).

## What to build

- Happy paths: POST / GET / GET one / PATCH / DELETE on `/notes`
- Validation & errors: missing/invalid fields → 400, unknown id → 404, malformed JSON → 400
- `?search=` returns only matching notes

## Rules

- Import `app.ts` (not the listening server); use `request(app).get(...)`
- Tests use a separate test data file — never your real dev data
- Cleanup between tests (`beforeEach`/`afterEach`) so tests rerun independently
- ≥ 15 test cases; `npm test` green
- `npx tsc --noEmit` passes

## How to run

```bash
# in the notes-api project (copy of Stage 05)
npm install -D vitest supertest @types/supertest
npm test
```