# Stage 07 — NoSQL Databases

Learn MongoDB (flexible documents) and Redis (fast caching).

## Concepts — one tiny script each

- `mongoose-crud.ts` — a Mongoose schema + CRUD
- `embed-vs-ref.ts` — when to nest documents vs link them (like SQL joins)
- `redis-cache.ts` — cache-aside pattern: read cache → miss → read DB → write cache, with TTL

## How to work it

- Write one script per concept in `src/`
- Every script must pass `npm run typecheck`

## How to run

```bash
# start the services
docker run --name mongo -p 27017:27017 -d mongo
docker run --name redis -p 6379:6379 -d redis

npm install mongoose redis
npm run typecheck
node src/redis-cache.ts   # repeat per script
```

## Move on when

You can argue for or against SQL vs Mongo for a given feature.