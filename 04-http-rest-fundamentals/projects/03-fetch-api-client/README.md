# Project 03 — Fetch API Client

> Stage: 04

A CLI that consumes public APIs with `fetch` and typed responses.

## What to build

- `node src/index.ts poke <name>` → PokeAPI stats/types
- `node src/index.ts user <n>` → randomuser.me profiles
- `node src/index.ts joke` → icanhazdadjoke (needs an `Accept` header)
- `node src/index.ts weather <city>` → open-meteo (no key)
- Print clean formatted output for each

## Rules

- Global `fetch` only (no axios/node-fetch); typed interfaces per API
- Network failure, non-2xx, and missing resource → friendly error, exit 1
- Hangs prevented with `AbortSignal.timeout`
- Centralize requests in a `request<T>(url, options)` helper
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts poke pikachu
node src/index.ts weather "San Francisco"
```