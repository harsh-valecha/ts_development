# Project 02 — Generics

> Stage: 01

Make one piece of code work with many types.

## What to build

- `src/index.ts` with these generics, each printing output:
- `identity<T>(x: T): T`
- Array helpers: `first<T>`, `last<T>`, `map<T, U>`
- Constraint: `findById<T extends { id: string }>`
- Generic types/interfaces: `Box<T>`, `Repository<T>`
- `keyof` + generics: `getProperty<T, K extends keyof T>`

## Rules

- At least one function uses `<T, U>` (two type params)
- At least one generic uses `extends`
- `npx tsc --noEmit` passes with zero errors

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit
node src/index.ts
```