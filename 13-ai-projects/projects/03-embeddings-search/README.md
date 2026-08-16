# Project 03 — Embeddings & Semantic Search

> Stage: 13 · Difficulty: ⭐⭐⭐

## Assignment

Build a **semantic search engine**: embed a set of documents, store the vectors, and answer queries by finding the most similar ones. This is the core mechanism behind RAG (project 4).

## What to build

1. **`src/embed.ts`** — embed a list of documents with the OpenAI embeddings API (or a local model):
   - Reads documents from `data/documents.json` (write ~20–50 realistic ones: product reviews, FAQ entries, news snippets — your own)
   - Embeds each `{ id, text }` and stores the vectors in `data/embeddings.json`
   - Normalize vectors (unit length) at embed time for fast dot-product

2. **`src/search.ts`** — the search CLI:

```
node src/search.ts "waterproof bluetooth speaker"
node src/search.ts --top 5 "laptop for programming"
```

   - Embeds the query, computes **cosine similarity** against every stored vector (naive — fine here; vector DBs come later)
   - Returns ranked results: `[ { id, text, score } ]`, sorted desc, top N
   - Prints with score formatting and a small explanation

3. **`src/index.ts`** — a small HTTP API so it's servable:
   - `POST /api/documents` → add a document (embeds + stores it incrementally)
   - `GET /api/search?q=...&top=5` → search
   - `DELETE /api/documents/:id`

## Requirements / acceptance criteria

- [ ] Embeddings computed and stored once, reused on search (no re-embedding on every query)
- [ ] Cosine similarity implemented **by hand** (dot product of normalized vectors) — no library for the math
- [ ] Search results are genuinely semantic: "waterproof speaker" finds "rugged bluetooth speaker for the shower" even with zero word overlap — prove it with a test case
- [ ] Scoring: results sorted, top N honored, scores in [−1, 1]
- [ ] Typed: `Embedding = { id: string; vector: number[]; text: string }`
- [ ] `npx tsc --noEmit` passes; `.env` gitignored

## Hints

- OpenAI: `openai.embeddings.create({ model: "text-embedding-3-small", input: text })` → `data[0].embedding`.
- Normalize: `v / Math.sqrt(v.reduce((a,b)=>a+b*b,0))`; then similarity = simple dot product.
- Pick your document set deliberately: overlapping topics with different wording make the semantic effect obvious.
- Store vectors as arrays in JSON; for ~50 docs this is trivially small. Note in the README why this won't scale and what a vector DB (pgvector/Chroma) does instead.

## Stretch goals

- Implement **chunking**: allow long documents and split them by paragraphs before embedding.
- Add a simple **fuzzy fallback**: if top score < threshold, say "no close match" instead of garbage.
- Use pgvector in Postgres instead of JSON storage, with an index — compare query time.
- Visualize: for a query, print top-3 with similarity and a one-line reason (highest-scoring shared keywords).

## How to run

```bash
npm init -y
npm install openai express zod dotenv
npm install -D typescript tsx @types/node @types/express
node src/embed.ts           # build the vector store
node src/search.ts "waterproof speaker"
node src/index.ts           # then curl /api/search?q=...
```
