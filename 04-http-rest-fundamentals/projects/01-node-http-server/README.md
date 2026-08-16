# Project 01 — Node HTTP Server

> Stage: 04 · Difficulty: ⭐⭐

## Assignment

Build a bare HTTP server using **`node:http` only** — no Express, no Fastify. Learn routing, headers, status codes, and bodies at the rawest level.

## Routes

```
GET  /            → text: "Welcome to my server"
GET  /health      → JSON: { "status": "ok", "uptime": 123, "timestamp": "..." }
GET  /users       → JSON list of users (hardcoded array)
GET  /users/:id   → single user or 404
GET  /echo?msg=hi → JSON: { "msg": "hi", "query": "..." }
GET  /now         → current date/time as text
GET  /slow        → response after a 2s delay (simulate slow endpoint)
POST /users       → accept JSON body, validate it, add user, return 201 + created user
POST /echo        → return the body back as JSON with a Content-Type header
404 any other path → JSON error with proper status
```

## Requirements / acceptance criteria

- [ ] Runs with `node src/index.ts` and listens on a port (default 3000, overridable via env `PORT`)
- [ ] Correct status codes for each route (200/201/404) and correct `Content-Type`
- [ ] `POST /users` parses a JSON body, validates `name` is a non-empty string, returns **201** with the created user, or **400** with a message
- [ ] `GET /users/:id` returns 404 JSON for a missing id
- [ ] `GET /echo?msg=...` reads the query string with `URLSearchParams`
- [ ] No uncaught exceptions — a body-parse failure returns 400, not a crash
- [ ] `npx tsc --noEmit` passes; Node types come from `@types/node`
- [ ] Tested with `curl` (see below)

## Hints

- `http.createServer((req, res) => ...)` — `req.url` contains path + query.
- Use `new URL(req.url, "http://localhost")` to split `pathname` and `searchParams`.
- Match routes by hand: `if (pathname === "/users" && req.method === "GET")`.
- For `:id` routes, split `pathname.split("/")` and compare patterns.
- Reading a JSON body: collect `req` data events into a buffer, then `JSON.parse` inside try/catch.
- Type the handler: `req: IncomingMessage, res: ServerResponse`.

## Stretch goals

- Add a `GET /users/:id/posts/:postId` nested route.
- Add `OPTIONS` handling + `Access-Control-Allow-Origin: *` header.
- Add simple logging middleware-by-hand (a `logRequest` wrapper around handlers).
- Graceful shutdown on SIGINT: close the server, print "shutting down".

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts

# in another terminal:
curl http://localhost:3000/
curl http://localhost:3000/health
curl -X POST http://localhost:3000/users -H "Content-Type: application/json" -d '{"name":"Alice"}'
curl -v http://localhost:3000/nope   # see the 404 in verbose mode
```
