# Project 01 — Vitest Basics

> Stage: 09

Set up Vitest and unit-test pure functions — the testing vocabulary with zero complexity.

## What to build

- Write small real functions to test: `slugify`, `truncate`, `daysBetween`, `divide` (throws on /0), `calcSubtotal`, `applyTax`
- Tests using `describe`/`it`/`expect` and matchers: `toBe`, `toEqual`, `toThrow`, `toBeCloseTo`, `it.each` for parameterized cases
- Mock `fetch` with `vi.fn()` so `getJson<T>` never hits the network — test success, non-2xx, and network-error paths

## Rules

- `npm test` passes; ≥ 80% coverage
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node vitest @vitest/coverage-v8
npm test
npm run coverage
```