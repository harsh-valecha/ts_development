# Stage 05 — Backend Frameworks (Express & Fastify)

> Difficulty: ⭐⭐ · Est. time: 2–3 weeks · Projects: 3

## Why this stage exists

You built APIs by hand — now use the tools real companies use. Frameworks handle routing, body parsing, middleware, and error handling so you can focus on business logic. You'll learn **Express** (the classic, most widely used) and **Fastify** (modern, fast, TypeScript-friendly), and you'll be able to compare them.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Routing | `app.get("/users/:id", handler)` — params, query, nested routers |
| Middleware | Functions that run before handlers: logging, auth, parsing, CORS |
| `express.json()` | Parsing request bodies into typed objects |
| Error handling | Centralized error middleware, async error wrapping |
| Validation | Validating input with **zod** — type-safe validation |
| Environment config | `.env` files, `process.env`, never hardcode secrets |
| Structure | Organizing an app: routers, controllers, services, middleware folders |
| Fastify | Schema-based validation, built-in logging, speed |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-express-notes-api` | Express REST API for notes (CRUD, in-memory → file storage) |
| 2 | `02-express-url-shortener` | Express + zod validation + custom URL slugs + redirects |
| 3 | `03-fastify-pokemon-api` | Rebuild one API in Fastify, consume PokeAPI, add typed schemas |

## Recommended app structure (use this in all future stages)

```text
src/
├── index.ts          # bootstrap: create app, listen
├── app.ts            # build express/fastify app (exported for testing later)
├── routes/           # route definitions
├── controllers/      # request handling logic
├── services/         # business logic (no req/res types here)
├── middleware/       # auth, errors, logging
└── schemas/          # zod schemas (validation)
```

Keep **services** free of `req`/`res` — they should be pure functions you can test. This pays off massively in Stage 09 (testing).

## Done checklist

- [ ] I've built 2+ Express APIs with routing, middleware, and centralized error handling
- [ ] I validate all input with zod (invalid input → 400, not a crash)
- [ ] I use `.env` for config and never commit secrets
- [ ] My code is structured into routes/controllers/services, not one giant file
- [ ] I've built one Fastify app and can explain how it differs from Express
- [ ] All 3 projects pass `tsc --noEmit`

## When to move on

When you can build a small CRUD API in Express without looking up how to set up the server. Then open `../06-sql-databases/README.md`.

## Resources

- [Express docs](https://expressjs.com/)
- [Fastify docs](https://fastify.dev/docs/latest/)
- [zod docs](https://zod.dev/)
- [express-async-errors](https://github.com/davidbanham/express-async-errors) (or wrap handlers)
