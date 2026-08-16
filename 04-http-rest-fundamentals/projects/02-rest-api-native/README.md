# Project 02 — REST API (No Framework)

> Stage: 04 · Difficulty: ⭐⭐

## Assignment

Build a **complete REST API** for a resource of your choice (notes, books, products) using only `node:http` and `fs` — zero frameworks, zero ORMs. This is the hardest version of "build an API," and it will make every framework you use later feel obvious.

Pick a resource and model it. Example: **Books**.

## Endpoints (full CRUD)

```
GET    /books          → list (with optional ?search=&limit=&offset= pagination)
GET    /books/:id      → one book or 404
POST   /books          → create (validate body, 201 + created resource)
PUT    /books/:id      → full replace (all fields required)
PATCH  /books/:id      → partial update
DELETE /books/:id      → delete (204 no content, or 404)
GET    /stats          → { total, byGenre, mostRecent }
```

## Resource shape (your choice, typed)

```ts
interface Book {
  id: string;
  title: string;
  author: string;
  genre: string;
  publishedYear: number;
  pages: number;
  createdAt: string;
}
```

## Requirements / acceptance criteria

- [ ] All endpoints above work with correct status codes and `Content-Type: application/json`
- [ ] **Persistence**: books survive server restarts — stored in `data/books.json` (write atomically)
- [ ] Validation: `POST`/`PUT` reject missing/invalid fields with **400** and a descriptive error; unknown route → 404 JSON
- [ ] IDs are generated (crypto `randomUUID` or incrementing), stable across restarts
- [ ] Pagination + search actually work (`?limit=5&offset=10`)
- [ ] Request body parse errors return 400, never crash the server
- [ ] `npx tsc --noEmit` passes
- [ ] All routes tested with curl

## Architecture (this matters!)

Structure it so Stage 05 feels easy:

```text
src/
├── index.ts          # http server bootstrap
├── router.ts         # routes a path+method to a handler (your mini-framework)
├── controllers/      # books.ts — reads req, writes res
├── services/         # books.ts — business logic, NO req/res (returns data/throws)
├── store.ts          # JSON file load/save (atomic writes)
└── types.ts          # Book, CreateBookInput, etc.
```

Keep services free of `req`/`res` — this is what makes Stage 09 testing trivial later.

## Hints

- Build `router.ts` first: a `Record<method, handler[]>` or a small array of `{ method, pattern, handler }` with path param extraction. That's basically what Express does.
- `PUT` (full replace) vs `PATCH` (partial) is a classic interview question — handle both correctly.
- For search + pagination, filter the array then slice.
- Error handling: wrap handler calls in try/catch, return 500 JSON on unexpected errors.

## Stretch goals

- Add a `GET /books/:id/related` endpoint (same genre, excluding itself).
- Add a second resource (e.g. authors) with a foreign-key-ish relation.
- Write a small test client script that exercises the whole API end-to-end.
- Add ETag / Last-Modified headers for caching (concept peek).

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts

curl http://localhost:3000/books
curl -X POST http://localhost:3000/books -H "Content-Type: application/json" \
  -d '{"title":"TS in Action","author":"You","genre":"tech","publishedYear":2026,"pages":300}'
curl -X PATCH http://localhost:3000/books/<id> -d '{"pages":350}'
curl -X DELETE http://localhost:3000/books/<id>
```
