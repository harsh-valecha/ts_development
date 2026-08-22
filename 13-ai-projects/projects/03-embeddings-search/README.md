# Project 03 — Embeddings & Semantic Search

> Stage: 13

Embed a set of documents and search them by meaning, not keywords.

## What to build

- `src/embed.ts` — embed ~20-50 documents (your own), store the vectors in `data/embeddings.json`
- `src/search.ts` — embed a query, compute **cosine similarity by hand** (dot product of normalized vectors), return ranked results `{ id, text, score }`
- `src/index.ts` — small HTTP API: add a document, search, delete

## Rules

- Vectors computed once and reused on search
- No library for the math — write cosine similarity yourself
- Prove it's semantic: "waterproof speaker" finds "rugged bluetooth speaker for the shower" with zero word overlap
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install openai express zod dotenv
npm install -D typescript tsx @types/node @types/express
node src/embed.ts
node src/search.ts "waterproof speaker"
node src/index.ts
```