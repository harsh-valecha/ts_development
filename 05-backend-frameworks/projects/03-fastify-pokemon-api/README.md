# Project 03 — Fastify Pokemon API

> Stage: 05

A second framework (Fastify) wrapping the PokéAPI — learn how it differs from Express.

## What to build

- `GET /pokemon/:name` → normalized pokemon data from PokeAPI · `GET /types` + `GET /types/:type`
- `GET /battle/:a/:b` → winner by total base stats
- `GET/POST/DELETE /favorites` → your own persisted list
- `GET /health` → `{ status: "ok", cached: n }`

## Rules

- Use Fastify's JSON Schema validation for params/body (its signature feature)
- Cache PokeAPI responses in memory (name → data with TTL) so repeats don't hit the API
- Unknown pokemon → 404; PokeAPI down → 502; timeouts with `AbortSignal.timeout`
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install fastify
npm install -D typescript tsx @types/node
node src/index.ts
curl http://localhost:3000/pokemon/pikachu
curl http://localhost:3000/battle/pikachu/charizard
```