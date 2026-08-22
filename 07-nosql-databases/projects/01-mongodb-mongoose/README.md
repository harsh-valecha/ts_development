# Project 01 — MongoDB Todo (Mongoose)

> Stage: 07

A todo API on MongoDB with Mongoose — your first document database.

## What to build

- Model: `Todo` (title, status, priority, tags, dueDate, timestamps) + embedded `checklist: ChecklistItem[]`
- Endpoints: list with filters (`?status=&priority=&tag=&search=`), one/404, create, patch, delete, stats via aggregation

## Rules

- Mongoose schema with validation (`required`, `enum`) and `timestamps: true`
- All queries through Mongoose models (no raw driver calls)
- `GET /todos/stats` uses the aggregation pipeline (`$group`)
- Invalid `_id` → 400; missing doc → 404
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express zod mongoose
npm install -D typescript tsx @types/node @types/express
docker run --name mongo -p 27017:27017 -d mongo
node src/index.ts
```