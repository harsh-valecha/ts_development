# Project 03 — Type Challenges

> Stage: 01

Re-build TS's built-in utility types from scratch — the hard-mode project.

## What to build

- `src/types.ts` with all of these (no built-in utility types inside):
- `MyPick`, `MyOmit`, `MyPartial`, `MyReadonly`, `MyRequired`
- `MyRecord`, `MyReturnType` (uses `infer`), `MyExclude`
- `MyDeepReadonly` (recursive — hardest)
- `src/index.ts` with a test usage per type, using `// @ts-expect-error` to prove rejected cases

## Rules

- No `any`
- `npx tsc --noEmit` passing IS the test — your types must behave like the originals

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit
node src/index.ts
```