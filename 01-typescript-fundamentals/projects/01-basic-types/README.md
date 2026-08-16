# Project 01 — Basic Types

> Stage: 01 · Difficulty: ⭐

## Assignment

Create a TypeScript program (`src/index.ts`) that demonstrates you understand TypeScript's core type system. Write it as a series of small, clearly-commented sections — this file is your personal reference cheat-sheet.

## Must cover

1. **Primitives & inference**: annotate vs let TS infer.
2. **Objects & arrays**: typed object literals, typed arrays, `readonly`.
3. **Tuples**: e.g. `[number, string]`.
4. **Unions & literals**: a `type Status = "pending" | "active" | "done"` and functions that switch on it.
5. **Narrowing**: `typeof`, `in`, and discriminated unions (a `type` with a `kind` field).
6. **Optional & nullable**: `?`, `null | undefined`, `??`, and when NOT to use `!`.
7. **`unknown` vs `any` vs `never`**: demonstrate why `any` is a trap — pass an `any` where a number is expected and show it silently breaking, then do the same safely with `unknown` + narrowing.
8. **Enums vs literal unions**: pick a side and justify it in a comment.

Each section should print something to the console (e.g. `node src/index.ts`) and every value should have an explicit type or clearly inferred one.

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes with **zero errors**
- [ ] `node src/index.ts` runs without crashing
- [ ] Every section from the list above exists with a working example
- [ ] A comment explains `unknown` vs `any` in your own words
- [ ] No `any` used anywhere except the section deliberately demonstrating why it's bad

## Hints

- Use `const` and `let` deliberately — inference with `const` gives literal types.
- A discriminated union looks like: `type Circle = { kind: "circle"; radius: number }` + `type Square = { kind: "square"; side: number }`, then a function that narrows on `shape.kind`.
- `never` shows up when a union is exhausted: the `default` branch of a `switch`.

## Stretch goals

- Write a function `assertNever` and use it in your exhaustive switch.
- Add a section on `satisfies` with a config object.
- Convert one object type to both `interface` and `type` and compare.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit   # type-check
node src/index.ts  # run
```
