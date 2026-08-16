# Project 03 — Fetch API Client

> Stage: 04 · Difficulty: ⭐⭐

## Assignment

Build a CLI program that consumes **public APIs** using the global `fetch`, with fully typed responses, robust error handling, and nice output. This is the flip side of Stage 04 — you've written servers, now be a great client.

## What to build

A multi-command CLI, `api-cli`, that hits several public APIs:

```
node src/index.ts poke <name>        # https://pokeapi.co → stats, types, sprite URL
node src/index.ts user <n>           # https://randomuser.me/api/?results=n → formatted profiles
node src/index.ts joke               # https://icanhazdadjoke.com (needs Accept header)
node src/index.ts weather <city>     # https://api.open-meteo.com (no key needed!)
```

For each, print **clean formatted output** (name, key fields, as a small table or pretty block).

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes; all responses have proper TS interfaces
- [ ] Uses `fetch` (global — no axios, no node-fetch)
- [ ] Typed interfaces for each API's response (e.g. `Pokemon`, `RandomUser`)
- [ ] Errors handled: network failure, non-2xx status, missing resource (e.g. `poke not-a-pokemon` → friendly error, exit 1)
- [ ] Timeout handling: fetch that hangs doesn't hang forever (`AbortSignal.timeout`)
- [ ] `--json` flag dumps the raw response for exploration
- [ ] API base URLs are config constants at the top (single source of truth)

## Hints

- The `fetch` response: check `res.ok`, then `await res.json()`.
- `AbortSignal.timeout(10000)` is built into modern Node — pass it as `signal` in options.
- For the joke API, some require `Accept: application/json` header to return JSON instead of HTML — a real-world lesson.
- Structure with a tiny `request<T>(url, options): Promise<T>` helper that centralizes error handling and typing. This is your "HTTP client" — note how much of what axios does you've just rebuilt.

## Stretch goals

- Add `api-cli search <query>` for GitHub's search API (needs a token — use a `.env` file and `process.env`, never hardcode).
- Cache responses to a `.cache` file keyed by URL + params (nice tie-in with Redis ideas in Stage 07).
- Add a spinner while waiting (simple `\r` redraw).

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts poke pikachu
node src/index.ts user 3
node src/index.ts joke
node src/index.ts weather "San Francisco" --json
```
