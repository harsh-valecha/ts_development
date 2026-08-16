# Project 04 — RAG Document Q&A

> Stage: 13 · Difficulty: ⭐⭐⭐

## Assignment

Build a full **RAG (Retrieval-Augmented Generation) pipeline**: ingest documents, chunk and embed them, and answer questions using ONLY the retrieved context — with sources cited. This is the single most in-demand AI backend skill right now.

## Pipeline

```text
INGEST:  docs → chunk → embed → store vectors (+ chunk text)
QUERY:   question → embed → retrieve top-k chunks → LLM("answer using only these chunks") → answer + sources
```

## What to build

1. **`src/ingest.ts`** — ingest a knowledge base
   - Read a set of documents you write (`data/docs/*.md` — e.g. a product manual, company policy, or the READMEs in THIS repo!)
   - **Chunk** them: split by sections/paragraphs with overlap (~200–500 chars, overlapping ~50). Write the chunker yourself.
   - Embed each chunk, store `{ id, docId, text, vector }` in `data/rag-store.json`
   - Print: docs ingested, chunks created, token count

2. **`src/answer.ts`** — the Q&A CLI

```
node src/answer.ts "What are the refund rules?"
```

   - Retrieve top 5 chunks (cosine similarity — reuse project 3's math)
   - Build a prompt: system says *"Answer ONLY from the provided context. If unknown, say 'Not covered by the knowledge base.'"* + the chunks + the question
   - Stream the answer to stdout
   - **Cite sources**: after the answer, print the source chunk(s) it was based on (with doc + snippet)

3. **`src/index.ts`** — HTTP API
   - `POST /api/ingest` → re-ingest a docs folder
   - `POST /api/ask` → { question } → answer + sources (stream optional)
   - `GET /api/chunks?q=...` → raw retrieval results (debug endpoint — great for understanding RAG)

## Requirements / acceptance criteria

- [ ] Ingestion: chunking with overlap works; a large doc produces multiple sensible chunks
- [ ] A question answerable ONLY from the docs is answered correctly (test 5 questions you wrote the answers to)
- [ ] A question NOT in the docs → the model says so (no hallucinated answers) — test this
- [ ] Answers always come with cited source chunks
- [ ] Chunking quality matters: you can demo how different chunk sizes change answer quality (note it in README)
- [ ] Retrieval is reusable (shared `retrieve` module) — separate from generation
- [ ] `npx tsc --noEmit` passes

## Hints

- Reuse project 3's `embed` + `similarity` code (copy or import — this is your own toolbox).
- Chunker: split on `\n\n`/headings, merge until size target, overlap by N chars.
- Prompt design is the secret sauce — system prompt explicitly forbids using outside knowledge. This is called *grounding*.
- Sources: the retrieve step returns `{ text, score, docId }`; pass those docIds through to the answer output.
- Add a `confidence` heuristic: mean similarity of retrieved chunks; low → warn "answer may be weak".

## Stretch goals

- Add a vector **index** (pgvector or a simple inverted index) for retrieval at scale.
- Support **PDF ingestion** (justify: parse text — or keep to markdown and note the tradeoff).
- Add a **chat-over-your-docs**: conversation history + RAG per turn (combine with project 2).
- Auto-grade: write 10 Q/A pairs and measure how often answers are correct.

## How to run

```bash
npm init -y
npm install openai express zod dotenv
npm install -D typescript tsx @types/node @types/express
node src/ingest.ts          # build the store
node src/answer.ts "What are the refund rules?"
node src/index.ts           # then POST /api/ask
```
