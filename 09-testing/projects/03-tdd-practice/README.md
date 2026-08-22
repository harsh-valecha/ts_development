# Project 03 — TDD Practice

> Stage: 09

Build a small feature using strict Test-Driven Development — test first, then code.

## What to build (pick one)

- A shopping cart engine (add/remove items, subtotal, coupons, shipping, total)
- A lending library (borrow/return, no double-borrow, overdue fines, member limits)
- A booking system (book/cancel, no overbooking)

## The TDD rhythm (do this literally)

1. **RED** — write a failing test for one behavior, run it, watch it fail
2. **GREEN** — write the minimum code to pass
3. **REFACTOR** — clean up with tests still green
4. Commit at each green state

## Rules

- Every behavior has a test that existed BEFORE the implementation (git history proves it)
- ≥ 80% coverage; zero `any`
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node vitest @vitest/coverage-v8
npm test
npm run coverage
```