# Project 04 — JSON Validator

> Stage: 01 · Difficulty: ⭐⭐

## Assignment

Build a small **JSON validator library** — your first real "product." Given a JSON object and a schema, it reports whether the data is valid and (importantly) *why* it's invalid. Do NOT use a validation library (zod/joi/ajv) — write it yourself.

## The schema shape

Design a simple schema type:

```ts
type Schema =
  | { type: "string"; minLength?: number; maxLength?: number }
  | { type: "number"; min?: number; max?: number }
  | { type: "boolean" }
  | { type: "array"; items: Schema }
  | { type: "object"; properties: Record<string, Schema>; required?: string[] };
```

## What to build

- `validate(value: unknown, schema: Schema): ValidationResult` where
  `ValidationResult = { valid: true } | { valid: false; errors: string[] }`
- Errors should be **path-aware**: `"name: expected string, got number"` or `"address.zip: expected number, got string"`.
- A CLI wrapper `src/cli.ts`: `node src/cli.ts schema.json data.json` prints whether data passes and any errors, with a non-zero exit code on failure.

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes with **zero errors**, strict mode on
- [ ] Uses `unknown` for input and narrows it (no `any`)
- [ ] Handles all 5 schema kinds, including nested objects/arrays and `required`
- [ ] Errors include the path to the failed field
- [ ] CLI works: valid file → "valid", exit 0; invalid → prints errors, exit 1
- [ ] Handles malformed JSON input gracefully (prints a friendly error)

## Hints

- Write the validator recursively — a nested object re-uses the same `validate`.
- Track a `path: string[]` as you recurse, then join with `"."` when reporting.
- Narrow `unknown` with `typeof value === "object" && value !== null`.
- For arrays, guard `Array.isArray(value)` before using `.length`/iteration.
- This project's pattern (schema → validation → friendly errors) is exactly what zod does. You're building a mini-zod.

## Stretch goals

- Add `"enum"` support: `{ type: "string"; enum: string[] }`.
- Add `"nullable"` or `"optional"` wrappers.
- Add type-level tests: a generic `Infer<Schema>` that produces the TS type a schema describes (`Infer<{type:"object"; properties:{name:{type:"string"}}}>` → `{ name: string }`).

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit
node src/cli.ts example-schema.json example-data.json
echo $?   # check exit code
```
