# Stage 09 — Testing

Tests let you refactor without fear. Learn Vitest and Test-Driven Development.

## Concepts — one tiny script each

- `math.test.ts` — your first unit test: a pure function, `describe`/`it`/`expect`
- `mock.test.ts` — mock a dependency (DB or network) with `vi.mock`
- `api.test.ts` — integration test hitting a real HTTP route with supertest

## How to work it

- Write a failing test first (RED), then minimal code to pass (GREEN), then refactor (TDD rhythm)
- Write one test script per concept
- Every script must pass `npm run typecheck`

## How to run

```bash
npm install -D vitest supertest
npm test
```

## Move on when

Writing a test for a new function feels as natural as writing the function.