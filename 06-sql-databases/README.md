# Stage 06 — SQL Databases

Learn SQL itself, then two TypeScript tools: Prisma and Drizzle.

## Concepts — one tiny script each

- `sqlite-crud.ts` — raw SQL `SELECT`/`INSERT`/`UPDATE`/`DELETE` with better-sqlite3
- `joins.ts` — `INNER`/`LEFT` joins and `COUNT`/`GROUP BY`
- `prisma-crud.ts` — a small CRUD model with Prisma + a migration
- `drizzle-crud.ts` — the same idea with Drizzle (SQL-first)

## How to work it

- Write raw SQL by hand first (project 01 in the folder) so ORMs never surprise you
- Write one script per concept in `src/`
- Every script must pass `npm run typecheck`

## How to run

```bash
npm install better-sqlite3 prisma @prisma/client drizzle-orm
npm run typecheck
node src/sqlite-crud.ts   # repeat per script
```

## Move on when

You can design a small 3-4 table schema with relations and build it in one ORM.