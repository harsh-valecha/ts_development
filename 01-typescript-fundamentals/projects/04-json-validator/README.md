# Project 04 — JSON Validator

> Stage: 01

Your first mini-product: validate JSON against a schema you define, no libraries.

## What to build

- `src/index.ts` — `validate(value: unknown, schema: Schema): { valid } | { valid, errors: string[] }`
- Support 5 schema kinds: string, number, boolean, array (of `items`), object (with `properties` + `required`)
- Errors are path-aware: `"address.zip: expected number, got string"`
- `src/cli.ts` — `node src/cli.ts schema.json data.json` prints valid/invalid, exits 0 or 1

## Rules

- Narrow `unknown`, no `any`
- Write the validator recursively — nested objects reuse the same `validate`
- `npx tsc --noEmit` passes with zero errors

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit
node src/cli.ts example-schema.json example-data.json
```