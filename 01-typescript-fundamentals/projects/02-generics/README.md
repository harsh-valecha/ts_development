# Project 02 — Generics

> Stage: 01 · Difficulty: ⭐

## Assignment

Build `src/index.ts` with a set of generic functions and types, each demonstrated with `console.log` output. Generics let one piece of code work with many types — this is the single most important TS skill for building reusable libraries and framework code.

## Must cover

1. **Generic identity**: `function identity<T>(x: T): T`.
2. **Generic array helpers**: write your own `first<T>`, `last<T>`, `map<T, U>`.
3. **Generic constraints**: `<T extends HasId>` — a type with an `id` field. Write `findById<T extends { id: string }>`.
4. **Generic types**: `type Box<T> = { value: T }`; use it in a couple of shapes.
5. **Generic interfaces**: `interface Repository<T>` with `get(id): T | undefined`, `save(item: T): void`.
6. **Generic classes** (optional): `Stack<T>` with `push`, `pop`, `peek`, `isEmpty`.
7. **Multiple type params**: `<K, V>` for a simple `pair<K, V>` or `Dict`.
8. **`keyof` + generics**: `getProperty<T, K extends keyof T>(obj: T, key: K): T[K]`.

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes with **zero errors**
- [ ] `node src/index.ts` runs and prints results for each section
- [ ] At least one function uses `<T, U>` (two type parameters)
- [ ] At least one generic uses a constraint (`extends`)
- [ ] The `Repository<T>` interface is implemented by a concrete class
- [ ] Each section has a comment explaining *why* generics help there

## Hints

- Try to write `map<T, U>` from scratch before looking anything up — it's the classic.
- With `K extends keyof T`, TS knows `obj[key]` is `T[K]`. This is called **indexed access types**.
- If a generic isn't needed, don't add it. Generics for the sake of it is a smell.

## Stretch goals

- Make `Repository<T>` work with an async `get`/`save` (promises — fine, we're in Node).
- Add a generic `Result<T, E>` union type (`ok` | `err`) and a helper `unwrap`.
- Write `createApi<T extends Record<string, unknown>>(basePath)` returning typed fetch wrappers.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --noEmit
node src/index.ts
```
