# Stage 07 — NoSQL Databases

> Difficulty: ⭐⭐ · Est. time: 2 weeks · Projects: 2

## Why this stage exists

Not everything fits in tables. Document databases (MongoDB) store flexible JSON-like data and scale horizontally; key-value stores (Redis) give you lightning-fast reads for caching. Real backends mix SQL + NoSQL all the time, so you need both mental models.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Documents & collections | Mongo's "rows & tables" — flexible schemas |
| `_id` & ObjectId | Mongo's primary keys |
| Mongoose schemas | Defining shape + validation in TS |
| Embedding vs referencing | When to nest documents vs link them (compare to SQL joins) |
| Indexes & aggregation | Query performance, `$group`, `$lookup` (Mongo's "join") |
| Redis basics | Key-value store, TTL (expiry), data types (strings, lists, hashes, sets) |
| Caching patterns | Cache-aside: read cache → miss → read DB → write cache |
| Cache invalidation | Deleting/updating cached data when the source changes |
| Rate limiting | Using Redis for `X requests per window` (bonus) |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-mongodb-mongoose` | Todo/notes API with Mongoose: CRUD, validation, embedded tags |
| 2 | `02-redis-caching` | Wrap an existing API (yours!) with a Redis cache layer + TTL |

## Setting up the services

**MongoDB:**
```bash
docker run --name mongo -p 27017:27017 -d mongo
# or: brew tap mongodb/brew && brew install mongodb-community && brew services start mongodb-community
```

**Redis:**
```bash
docker run --name redis -p 6379:6379 -d redis
# or: brew install redis && brew services start redis
```

## Key mental model — when SQL vs NoSQL?

- **SQL** wins for: transactions, complex queries across relations, strict data integrity (banking, orders).
- **Mongo** wins for: flexible/schemaless data, rapid iteration, document-shaped data (catalogs, content).
- **Redis** is not a primary store — it's a speed layer: caching, sessions, queues, leaderboards.

Real apps: SQL for core data, Redis in front of it for speed. That's exactly what Stage 14's capstone does.

## Done checklist

- [ ] I've built a full CRUD API on MongoDB with Mongoose schemas and validation
- [ ] I can explain embedding vs referencing with a concrete example
- [ ] I've built a cache-aside layer with Redis and TTL
- [ ] I can demonstrate a cache hit vs miss (logs or timings)
- [ ] I can explain why you wouldn't use Redis as your only database
- [ ] All 2 projects pass `tsc --noEmit` and work end-to-end

## When to move on

When you can argue for/against SQL vs Mongo for a given feature. Then open `../08-auth-security/README.md`.

## Resources

- [MongoDB University — free courses](https://university.mongodb.com/)
- [Mongoose docs](https://mongoosejs.com/docs/guide.html)
- [Redis docs](https://redis.io/docs/latest/)
- [Redis University](https://redis.io/university/)
- [Cache-aside pattern (AWS docs — pattern is universal)](https://aws.amazon.com/caching/best-practices/)
