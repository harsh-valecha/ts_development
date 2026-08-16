# Project 03 — Type Challenges

> Stage: 01 · Difficulty: ⭐⭐

## Assignment

Re-implement TypeScript's built-in **utility types from scratch** in a file `src/types.ts`, then use them in `src/index.ts`. This is the "hard mode" project of Stage 01 — it forces you to deeply understand conditional types, mapped types, and inference.

## The challenge list (build all of these)

1. `MyPick<T, K extends keyof T>` — like `Pick`
2. `MyOmit<T, K extends keyof T>` — like `Omit` (hint: build it *on top of* MyPick + `Exclude`)
3. `MyPartial<T>` — all props optional
4. `MyReadonly<T>` — all props readonly
5. `MyRequired<T>` — all props required (bonus)
6. `MyRecord<K extends keyof any, T>` — object with keys `K`, values `T`
7. `MyReturnType<F>` — the return type of a function (needs `infer`)
8. `MyExclude<T, U>` — remove types assignable to `U`
9. `MyDeepReadonly<T>` — readonly at every nested level (recursive — hardest)

## Requirements / acceptance criteria

- [ ] All 9 types implemented **without** using any built-in utility types internally (you may use `keyof`, `in`, conditional types, `infer`, indexed access)
- [ ] `npx tsc --noEmit` passes — that's the real test: your types must behave identically to the originals
- [ ] `src/index.ts` has a test usage for each type, ideally with cases that SHOULD error (use `// @ts-expect-error` to assert a type is rejected)
- [ ] No use of `any`

## Hints

- `keyof T` gives you all keys of T. Mapped types: `{ [K in keyof T]: T[K] }`.
- Conditional types: `T extends U ? X : Y`.
- `infer` is used with function types: `F extends (...args: any[]) => infer R ? R : never` — note: you can't use `any` here per the rules, so use `(...args: never[]) => infer R` or an untyped rest: `(...args: any[])` is disallowed, so get creative (`(...args: never[]) => infer R` works because we never call it).
- `// @ts-expect-error` means "this line must fail to compile." It's a great way to prove your types are strict.

## Stretch goals

- `MyDeepReadonly` with arrays: also deeply freeze array element types.
- `MyAwaited<T>` — unwrap a Promise type recursively.
- `MyFlatten<T>` — flatten nested arrays into a single level.
- Compare your implementations against the real ones in TS's `lib.es5.d.ts`.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit   # if this passes, your types are correct
node src/index.ts
```
