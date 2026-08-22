# Project 04 — RAG Document Q&A

> Stage: 13

Full RAG pipeline: ingest docs, chunk + embed them, answer questions using only the retrieved context.

## What to build

- `src/ingest.ts` — read a set of docs, **chunk** them (split by sections, ~200-500 chars with overlap), embed each chunk, store in `data/rag-store.json`
- `src/answer.ts` — embed the question, retrieve top 5 chunks, feed to the LLM with "answer only from these chunks", stream the answer, cite sources
- `src/index.ts` — HTTP API: `/api/ingest`, `/api/ask`, `/api/chunks?q=` (debug)

## Rules

- A question answerable only from the docs is answered correctly (test 5 you wrote answers to)
- A question NOT in the docs → the model says so (no hallucination) — test this
- Answers always come with cited source chunks
- Shared `retrieve` module, separate from generation
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install openai express zod dotenv
npm install -D typescript tsx @types/node @types/express
node src/ingest.ts
node src/answer.ts "What are the refund rules?"
node src/index.ts
```