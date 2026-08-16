# Stage 09 — Testing

> Difficulty: ⭐⭐ · Est. time: 2–3 weeks · Projects: 3

## Why this stage exists

Untested code is code you don't actually trust. Tests let you refactor without fear, document behavior, and catch regressions. You'll learn the modern TS stack — **Vitest** — plus the discipline of **Test-Driven Development**. Every project from here on should come with tests.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Unit tests | Testing one function/module in isolation |
| Integration tests | Testing whole routes with a real HTTP layer (`supertest`) |
| `describe` / `it` / `expect` | Vitest's test syntax & matchers |
| Mocking | `vi.mock`, `vi.fn` — replacing real dependencies (DB, network) |
| Fixtures | Sample data for tests |
| Coverage | How much of your code runs during tests (`--coverage`) |
| TDD | Red → Green → Refactor cycle |
| Testing services | Pure business logic = easy tests; keep `req`/`res` out of services |
| Test DB | Testing against a real or in-memory DB safely |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-vitest-basics` | Pure TS functions with full unit test coverage, plus mocking examples |
| 2 | `02-api-integration-tests` | Real HTTP tests against one of your earlier APIs (Stage 05 notes API is ideal) |
| 3 | `03-tdd-practice` | Build a small feature using strict TDD — test first, then code |

## Why your service layer matters here

Remember Stage 05's advice? Keeping `req`/`res` out of services means you can unit-test business logic without an HTTP server. If your Stage 05/06 code isn't structured that way, refactor it *now* — that's a great first test project on its own.

## TDD rhythm

```text
1. Write a failing test (RED)      — think about desired behavior
2. Write minimal code to pass (GREEN)
3. Refactor safely (REFACTOR)      — tests protect you
```

## Done checklist

- [ ] I can write unit tests for pure functions with Vitest
- [ ] I can mock a dependency (DB or network) with `vi.mock`
- [ ] I've written integration tests that hit real HTTP routes (supertest)
- [ ] I've built something TDD-style and the tests came first
- [ ] My earlier projects' key logic has ≥ some meaningful coverage
- [ ] All 3 projects' tests pass with `npm test`

## When to move on

When writing a test for a new function feels as natural as writing the function. Then open `../10-websockets-realtime/README.md`.

## Resources

- [Vitest docs](https://vitest.dev/)
- [supertest](https://github.com/ladjs/supertest)
- [Testing Library (JS)](https://testing-library.com/) (frontend, optional later)
- [Testing JavaScript course (Kent C. Dodds)](https://testingjavascript.com/) (paid, excellent)
