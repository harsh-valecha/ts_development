# Stage 04 — HTTP & REST Fundamentals

Understand how HTTP actually works before you touch frameworks.

## Concepts — one tiny script each

- `server.ts` — a bare `node:http` server that responds
- `routes.ts` — routing on `req.url` (different paths → different responses)
- `status-codes.ts` — returning proper status codes (200/201/204/400/404/500)
- `fetch.ts` — call a public API with `fetch` and type the response
- `body-parse.ts` — parse a JSON request body

## How to work it

- Write one script per concept in `src/`, each printing its output
- Every script must pass `npm run typecheck`

## How to run

```bash
npm run typecheck
node src/server.ts            # then curl http://localhost:3000
node src/fetch.ts             # standalone client calls
```

## Move on when

REST and HTTP feel natural, not scary — you can read a `curl -v` output.