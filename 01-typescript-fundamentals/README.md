# Stage 01 — TypeScript Fundamentals

Learn TypeScript's type system so the compiler catches your bugs before you run anything.

## Concepts — one tiny script each

- `basics.ts` — primitives, type annotations, type inference
- `shapes.ts` — objects, arrays, tuples, `interface` vs `type`
- `unions.ts` — unions, literal types, type narrowing
- `any-unknown.ts` — why `any` is a trap, `unknown` + narrowing, `never`
- `generics.ts` — generic functions and constraints
- `utility-types.ts` — `Partial`, `Pick`, `Omit`, `Record`, `Readonly`, `ReturnType`
- `satisfies.ts` — validating literal structures with `satisfies`

## How to work it

- Copy `package.json` + `tsconfig.json` from the main README (strict mode on)
- Write one script per concept in `src/`, each printing its output
- Every script must pass `npm run typecheck` with zero errors

## How to run

```bash
npm run typecheck
node src/basics.ts   # repeat per script
```

## Move on when

You can open any of your scripts and explain every type in it out loud.