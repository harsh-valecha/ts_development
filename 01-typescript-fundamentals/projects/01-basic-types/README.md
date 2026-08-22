# Project 01 — Basic Types

> Stage: 01

Practice every core TS type in one file — your personal cheat-sheet.

## What to build

- `src/index.ts` with a section per concept, each printing output:
- Primitives + inference, objects/arrays/tuples, unions + literals
- Narrowing (`typeof`, `in`, discriminated unions)
- Optional/nullable (`?`, `??`, `!`), `unknown` vs `any` vs `never`
- `interface` vs `type` (pick a side and justify in a comment)

## Rules

- `npx tsc --noEmit` passes with zero errors
- No `any` except the section proving why it's bad

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit
node src/index.ts
```