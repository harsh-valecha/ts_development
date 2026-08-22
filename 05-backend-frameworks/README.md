# Stage 05 — Backend Frameworks (Express & Fastify)

Use real web frameworks — Express (classic) and Fastify (modern + fast).

## Concepts — one tiny script each

- `express-hello.ts` — minimal Express app with one route
- `middleware.ts` — a logging middleware that runs before handlers
- `zod-validate.ts` — validate request input with zod
- `env-config.ts` — load config from `.env` with `process.env`
- `fastify-hello.ts` — the same minimal app in Fastify

## How to work it

- Write one script per concept in `src/`, each printing its output
- Keep services free of `req`/`res` (pure functions — easier to test later)
- Every script must pass `npm run typecheck`

## How to run

```bash
npm install express fastify zod dotenv
npm run typecheck
node src/express-hello.ts   # then curl http://localhost:3000
```

## Move on when

You can build a small CRUD API in Express without looking up setup.