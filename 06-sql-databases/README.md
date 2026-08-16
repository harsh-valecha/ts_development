# Stage 06 — SQL Databases

> Difficulty: ⭐⭐ · Est. time: 3 weeks · Projects: 3

## Why this stage exists

Your apps now store data in files — which breaks when two users write at once, and can't be queried well. Relational databases (SQL) are the backbone of most backend systems. You'll learn SQL itself (so you understand what's happening), then two modern TypeScript tools: **Prisma** (ergonomic ORM) and **Drizzle** (lightweight, SQL-first). Knowing both means you can pick the right tool per job.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Relational model | Tables, rows, columns, primary/foreign keys |
| SQL basics | `SELECT`, `INSERT`, `UPDATE`, `DELETE`, `WHERE`, `ORDER BY`, `LIMIT` |
| Joins | `INNER`, `LEFT`, aggregations (`COUNT`, `GROUP BY`) |
| SQLite | Zero-config file database — perfect for learning |
| Postgres | Production-grade server database |
| ORMs | Prisma/Drizzle map TS types ↔ database schema |
| Migrations | Versioning schema changes (add a column, alter a table) |
| Relations | `1:N`, `N:N` (join tables), referencing data |
| Indexes | Speeding up queries (concept) |
| N+1 problem | Why lazy relation loading is slow and how to fix it |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-sqlite-notes` | Notes API on **raw SQL** (better-sqlite3) — write real SQL by hand |
| 2 | `02-prisma-postgres-blog` | Blog API with Prisma: users + posts + comments, migrations, relations |
| 3 | `03-drizzle-ecommerce` | E-commerce schema with Drizzle: products, orders, order items (complex joins) |

## Order matters: raw SQL first

Do **project 1 with raw SQL** even though it's more work. If you never write SQL by hand, you'll be lost the moment an ORM does something surprising (they always do). Raw SQL first, ORM after = you understand both layers.

## Setting up Postgres (project 2)

Options (pick one):
- **Docker**: `docker run --name pg -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres`
- Homebrew: `brew install postgresql@16` then `brew services start postgresql@16`
- Cloud: [Neon](https://neon.tech) (free tier, zero setup)

Use a `.env` file for the database URL. Never commit it.

## Done checklist

- [ ] I can write `SELECT`/`INSERT`/`UPDATE`/`DELETE` and joins from memory
- [ ] I've built a CRUD API backed by SQLite with raw SQL
- [ ] I've built a Prisma app with 2+ related models and migrations
- [ ] I've built a Drizzle app with a many-to-many relationship
- [ ] I can explain primary/foreign keys and the N+1 problem
- [ ] All 3 projects pass `tsc --noEmit` and work end-to-end

## When to move on

When you can design a small schema (3–4 tables with relations) and implement it in at least one ORM. Then open `../07-nosql-databases/README.md`.

## Resources

- [SQLBolt — interactive SQL lessons](https://sqlbolt.com/)
- [SQLite docs](https://www.sqlite.org/docs.html)
- [PostgreSQL docs](https://www.postgresql.org/docs/)
- [Prisma docs](https://www.prisma.io/docs)
- [Drizzle docs](https://orm.drizzle.team/docs/overview)
- [better-sqlite3](https://github.com/WiseLibs/better-sqlite3)
