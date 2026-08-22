# Project 01 — Node HTTP Server

> Stage: 04

A bare HTTP server using `node:http` only — no frameworks.

## What to build

- `GET /` → text · `GET /health` → JSON with uptime · `GET /users` + `GET /users/:id` → JSON or 404
- `GET /echo?msg=hi` → echoes the query · `GET /now` → current time · `GET /slow` → responds after 2s
- `POST /users` → parse + validate JSON body, return 201 and the created user, or 400
- Any other path → 404 JSON

## Rules

- Correct status codes (200/201/400/404) and `Content-Type`
- A body-parse failure returns 400, never crashes
- Port from `PORT` env, default 3000
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts
# another terminal:
curl http://localhost:3000/health
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Alice"}'
```