# Project 01 — MongoDB Todo (Mongoose)

> Stage: 07 · Difficulty: ⭐⭐

## Assignment

Build a **todo API on MongoDB** with **Mongoose**. This is your first document database project — notice how the mental model differs from SQL (embedded data, flexible schemas, no joins).

## Schema design

```ts
interface Todo {
  title: string;
  description?: string;
  status: "pending" | "in-progress" | "done";
  priority: "low" | "medium" | "high";
  tags: string[];                    // embedded array (a list you filter by)
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
}

// subdocument example — one todo can have many checklist items, EMBEDDED
interface ChecklistItem { text: string; done: boolean }
```

Design decision to make and document: do subtasks live **embedded** inside the todo, or as a separate collection **referenced** by id? Build it **embedded** first (a `checklist: ChecklistItem[]` field), and write one comment explaining why embedding fits here and when you'd reference instead.

## Endpoints

```
GET    /todos                → list (?status=&priority=&tag=&search=&limit=&offset=)
GET    /todos/:id            → one or 404
POST   /todos                → create (zod validation)
PATCH  /todos/:id            → partial update
DELETE /todos/:id            → 204
PATCH  /todos/:id/checklist  → set checklist: [{ text, done }]
GET    /todos/stats          → counts by status + by priority (aggregation pipeline)
```

## Requirements / acceptance criteria

- [ ] Mongoose schema with types, validation (`required`, `enum`), and `timestamps: true`
- [ ] All queries use Mongoose `Model.find`/`findById` — no raw driver calls
- [ ] `GET /todos` supports the filters above using a **query object builder**
- [ ] `GET /todos/stats` uses the **aggregation pipeline** (`$group`, `$match`)
- [ ] Invalid `_id` format → 400 (not a crash); missing doc → 404
- [ ] Cast errors and validation errors handled by central error middleware
- [ ] `npx tsc --noEmit` passes; app runs against MongoDB (Docker/local)

## Hints

- `mongoose.connection.on("error")` — always wire up connection error logging.
- `_id` in TS: `Types.ObjectId`. Convert with `doc.toObject()` for responses.
- For tag filter: `{ tags: { $in: [tag] } }`; for search: `{ title: { $regex: term, $options: "i" } }`.
- Aggregation for stats: `$group` by status + priority, then shape the result.

## Stretch goals

- Add a **User** model and make todos per-user (embed `userId` and filter on it) — preview of auth.
- Add indexes on `status`, `priority`, `dueDate` and compare `explain()` output before/after.
- Add soft-delete (`deletedAt`) and filter it out of default queries.
- Implement `?sort=dueDate` and `?sort=-priority`.

## How to run

```bash
npm init -y
npm install express zod mongoose
npm install -D typescript tsx @types/node @types/express
docker run --name mongo -p 27017:27017 -d mongo
node src/index.ts
```
