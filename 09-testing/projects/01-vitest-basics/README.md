# Project 01 — Vitest Basics

> Stage: 09 · Difficulty: ⭐⭐

## Assignment

Set up **Vitest** and write a thorough unit-test suite for a set of pure functions. This project teaches the testing vocabulary (describe/it/expect, mocking, coverage) in a zero-complexity setting — no servers, no databases.

## The code to test

Write these functions in `src/` (with real logic — this is *your* code to test):

- `src/string-utils.ts`: `slugify(text)`, `truncate(text, maxLen)`, `capitalizeWords(text)`
- `src/date-utils.ts`: `formatDate(date, locale?)`, `daysBetween(a, b)`, `isWeekend(date)`
- `src/calc.ts`: `add`, `subtract`, `multiply`, `divide` (throws on /0), `percentage(part, total)`
- `src/cart.ts`: `calcSubtotal(items: { priceCents, quantity }[])`, `applyDiscount(subtotalCents, percent)`, `applyTax(subtotalCents, rate)`
- `src/http-client.ts`: a `getJson<T>(url)` wrapper around `fetch` (this is the one you'll MOCK)

## What your tests must cover (tests live in `tests/` or co-located `*.test.ts`)

- **Basics**: `describe`/`it`/`expect`, grouping by function
- **Matchers**: `toBe`, `toEqual`, `toThrow`, `toBeTruthy`, `toContain`, `toHaveLength`, `toBeCloseTo` (floats!)
- **Edge cases**: empty strings, negative numbers, zero-length truncation, division by zero, dates across month/year boundaries
- **Parameterized tests**: `it.each([...])` for slugify/truncate cases
- **Mocking fetch**: `vi.fn()` / `vi.spyOn` so `getJson` never hits the network — test success, non-2xx, and network-error paths
- **Coverage**: run with `--coverage`, target ≥ 80% on `src/`

## Requirements / acceptance criteria

- [ ] `npm test` passes (Vitest)
- [ ] ≥ 80% coverage (report via `npm run coverage`)
- [ ] At least 5 `it.each` parameterized cases
- [ ] `getJson` tested with `fetch` fully mocked (network never called)
- [ ] `npx tsc --noEmit` passes

## Hints

- Setup: `npm i -D vitest`, `npm i -D @vitest/coverage-v8`, script `"test": "vitest run"`, `"coverage": "vitest run --coverage"`.
- Co-locate tests next to source (`src/calc.test.ts`) or a `tests/` dir — pick one and be consistent.
- For mocking global fetch: `vi.stubGlobal("fetch", vi.fn())` is clean in Vitest.
- `toBeCloseTo` for floats — never `toBe` on decimal math.
- Test *behaviors*, not implementation: a test should still pass if you refactor internals.

## Stretch goals

- Add a failing test *first*, then make it pass (you're warming up for project 3).
- Add `vi.useFakeTimers()` tests for something time-dependent.
- Write a mutation test: temporarily introduce a bug and confirm a test catches it.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node vitest @vitest/coverage-v8
npm test
npm run coverage
```
