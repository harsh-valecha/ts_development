# Project 03 — TDD Practice

> Stage: 09 · Difficulty: ⭐⭐

## Assignment

Build a small feature using **strict Test-Driven Development**. The discipline here is the point: **write the failing test first (RED), write the minimum code to pass (GREEN), then refactor (REFACTOR)** — and repeat in tiny cycles.

## What to build (pick one)

**Option A — a shopping cart engine** (no server, pure logic):

- Add items (product id, qty), remove items, change quantity
- `subtotal()` in cents
- `applyCoupon(code)` — codes map to % off; invalid code rejected
- `freeShippingThreshold` — shipping $5 unless subtotal ≥ threshold
- `total()` = subtotal − discount + shipping
- Checkout validates cart isn't empty; each rule is a separate testable unit

**Option B — a lending library system**:

- `addBook`, `borrow(bookId, memberId)`, `return(bookId)`
- A book can't be borrowed twice; overdue fine computed per day; member limits (max 3 books)

**Option C — a booking/slot system** (great if you want scheduling logic):

- `book(slotId, userId)` succeeds/conflicts; overbooking impossible; cancel releases the slot

## The TDD process (do this literally)

For each unit of behavior, in this order:

1. **RED** — write a failing test describing one behavior. Run it. Watch it fail for the *right* reason (assertion, not a crash).
2. **GREEN** — write the minimum code to make it pass. No extra features, no refactoring yet.
3. **REFACTOR** — clean up (rename, extract) with tests still green.
4. Commit at each green state. Your git log should show the rhythm: `test: add ...`, `feat: implement ...`, `refactor: ...`.

## Requirements / acceptance criteria

- [ ] Every behavior has a test that existed BEFORE the implementation (git history proves it, or a note in the README)
- [ ] Test suite covers all core rules + edge cases (empty cart, duplicate codes, zero quantity, etc.)
- [ ] ≥ 80% coverage
- [ ] Zero `any`; `tsc --noEmit` clean; all tests green
- [ ] The chosen domain's rules are each isolated in their own test (e.g. `test("cannot borrow an already-borrowed book")`)

## Hints

- Break the domain into the smallest units. A good rule of thumb: if you can't write the test in under ~10 lines, the unit is too big.
- Don't "cheat" by writing implementation, then tests. If you slip, delete the implementation and redo it properly — the point is the muscle memory.
- Use `describe` per unit and `it` per rule; the test names should read like a spec.
- Refactor only with a green suite; the safety net is the whole point.

## Stretch goals

- Make the store async (in-memory with `setTimeout`-based latency) and write async tests.
- Add property-style tests: generate many random operations and assert invariants (e.g. total ≥ 0, stock never negative).
- Add a tiny README section titled "How I did TDD" describing your experience honestly.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node vitest @vitest/coverage-v8
npm test
npm run coverage
```
