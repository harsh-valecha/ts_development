# Project 03 — Fastify Pokemon API

> Stage: 05 · Difficulty: ⭐⭐

## Assignment

Build an API with **Fastify** (not Express) to experience a second framework and learn how they differ. It wraps data from the [PokéAPI](https://pokeapi.co/) — you proxy, cache, and add your own endpoints on top.

## Endpoints

```
GET    /pokemon/:name        → pokemon data (from PokeAPI), normalized + typed
GET    /pokemon/:name/forms  → all forms/variants of that pokemon
GET    /types                → list of pokemon types
GET    /types/:type          → pokemon of a given type (paged)
GET    /battle/:a/:b         → pick a winner based on stats (total base stats)
GET    /favorites            → user favorites (your own persisted list)
POST   /favorites            → body { name } → add favorite
DELETE /favorites/:name      → remove favorite
GET    /health               → { status: "ok", cached: n }
```

## Requirements / acceptance criteria

- [ ] Uses **Fastify** with its **JSON Schema** validation for request bodies/params (Fastify's signature feature — different from zod!)
- [ ] PokeAPI calls are typed (define `Pokemon`, `TypeInfo`, etc. interfaces)
- [ ] In-memory **cache** of PokeAPI responses (name → data with TTL) so repeat requests don't hit PokeAPI; `GET /health` reports cache size
- [ ] `/favorites` persists to a JSON file (or SQLite — your call)
- [ ] Errors: unknown pokemon → 404; PokeAPI down → 502 with a clear message
- [ ] Timeout + abort on upstream calls (`AbortSignal.timeout`)
- [ ] Fastify built-in logging on; app exposed as a module for testing
- [ ] `npx tsc --noEmit` passes

## Hints

- Fastify schema validation lives inline on the route:

```ts
app.get<{ Params: { name: string } }>("/pokemon/:name", {
  schema: { params: { type: "object", properties: { name: { type: "string" } }, required: ["name"] } }
}, async (req, reply) => { ... });
```

- Use `app.register` and plugin encapsulation for feature groups.
- For `/battle/:a/:b`, fetch both, sum relevant base stats, pick the winner deterministically (tie-break by name).
- Add an `onClose` hook to flush/save favorites.

## Stretch goals

- Add `?stats=hp,attack` filtering.
- Add a **zod-based alternative** validation route to compare schema styles, and write a short "Express vs Fastify" comparison in the project README.
- Cache eviction: LRU when cache exceeds N entries.

## How to run

```bash
npm init -y
npm install fastify
npm install -D typescript tsx @types/node
node src/index.ts

curl http://localhost:3000/pokemon/pikachu
curl http://localhost:3000/battle/pikachu/charizard
curl -X POST http://localhost:3000/favorites -H "Content-Type: application/json" -d '{"name":"squirtle"}'
```
