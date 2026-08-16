# Stage 01 — TypeScript Fundamentals

> Difficulty: ⭐ · Est. time: 2–3 weeks (self-paced) · Projects: 4

## Why this stage exists

You know basic JS — variables, functions, arrays, objects. This stage layers TypeScript's type system on top of that knowledge. The goal is not just to *write* types but to **let the compiler catch your bugs before you run anything**. Every project after this relies on these skills, so take your time.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Type annotations | Telling TS what a value is: `let x: number` |
| Type inference | Letting TS figure types out so you write fewer annotations |
| `interface` vs `type` | Two ways to define shapes; when each is best |
| Unions & literals | `type Status = "open" \| "closed"` |
| Arrays & tuples | Typed collections |
| `any`, `unknown`, `never` | The escape hatches and why `any` is a trap |
| Type narrowing | `typeof`, `in`, discriminated unions |
| Optional & nullable | `?`, `??`, `!`, `null`/`undefined` handling |
| Generics | Functions/types that work with many types: `identity<T>` |
| Utility types | `Partial`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType` |
| `satisfies` | Newer way to validate literal structures |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-basic-types` | A structured exercise file: all the basic types, narrowing, unions |
| 2 | `02-generics` | Generic functions, generic constraints, and custom generic types |
| 3 | `03-type-challenges` | Hand-rolled utility types (the "hard mode" project) |
| 4 | `04-json-validator` | A real tool that validates JSON against a schema — your first "product" |

## How to work each project

1. Read the project README's assignment.
2. Create `package.json`, `tsconfig.json` (copy the ones from the master README), and `src/`.
3. Write types **first**, then the logic.
4. `npm run typecheck` must pass with **zero errors** before you're done.
5. Use `node src/index.ts` (or `npm run dev` with tsx) to run.
6. Add a "What I learned" section to the project README when you finish.

## Tips for this stage

- Turn on **strict mode** (`"strict": true`) and keep it on forever.
- When you hit a type error, read the whole message. They're surprisingly specific.
- Prefer `interface` for objects you'll extend, `type` for unions and computed types.
- Never use `any` unless you genuinely don't know the type — and even then prefer `unknown`.

## Done checklist

- [ ] All 4 projects pass `tsc --noEmit` with no errors
- [ ] I can explain the difference between `interface`, `type`, and a class
- [ ] I can write a generic function from scratch
- [ ] I've used at least 5 utility types (`Partial`, `Pick`, `Omit`, `Record`, `ReturnType`)
- [ ] I understand why `any` is dangerous
- [ ] I can explain type narrowing with a concrete example

## When to move on

When you can open any of your Stage 01 files and explain every type in it. Then open `../02-nodejs-core-file-handling/README.md`.

## Resources

- [TypeScript Handbook](https://www.typescriptlang.org/docs/handbook/intro.html)
- [TypeScript Playground](https://www.typescriptlang.org/play)
- [Exercism TS track](https://exercism.org/tracks/typescript)
