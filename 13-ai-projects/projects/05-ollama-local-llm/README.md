# Project 05 — Local LLM with Ollama

> Stage: 13 · Difficulty: ⭐⭐⭐

## Assignment

Rebuild AI features **without any paid API** using **Ollama** — local models running on your machine. This proves you can build production AI features with zero keys, zero costs, and full privacy. If you can do it with a local model, you can do it with any provider.

## Setup (no keys needed)

```bash
brew install ollama
ollama serve          # or `brew services start ollama`
ollama pull llama3.2  # a small, capable model (~2GB)
ollama pull nomic-embed-text   # embeddings model
ollama list           # verify both are installed
```

## What to build

Build a **local-first RAG Q&A** (the same shape as project 4, but fully local):

1. **`src/chat.ts`** — chat CLI using the local model:
   ```
   node src/chat.ts "Explain event loops in Node"
   ```
   - Use the Ollama JS client (`ollama` npm package) with `model: "llama3.2"`
   - Support `--stream` (token-by-token) and `--system "you are a pirate"` to compare personas
   - Keep a rolling conversation history across turns (REPL mode: type, get answer, repeat)

2. **`src/embed.ts` + `src/search.ts`** — embeddings + semantic search with `nomic-embed-text`
   - Embed a small document set (reuse `data/docs/` from project 4 or make new ones)
   - Cosine similarity search, same math as before, but local embeddings

3. **`src/rag.ts`** — tie it together: retrieve top chunks → answer with the local model → cite sources

## Requirements / acceptance criteria

- [ ] Zero API keys anywhere in the project — it works offline
- [ ] `ollama list` shows the models; the app picks models from config, not hardcoded names scattered around
- [ ] Streaming works with the local model
- [ ] Semantic search quality is demonstrable (test with overlapping-topic docs like project 3)
- [ ] RAG answers are grounded (model refuses/hedges when context lacks the answer)
- [ ] Documented: model sizes, how to swap models (`ollama pull <model>` → change config), and how this differs from OpenAI in latency/quality
- [ ] `npx tsc --noEmit` passes

## Hints

- Ollama JS: `import ollama from "ollama"` → `ollama.chat({ model, messages, stream })`.
- Embeddings: `ollama.embed({ model: "nomic-embed-text", input })`.
- Local models are slower — smaller docs, fewer chunks; note the latency vs OpenAI in your README comparison.
- Swap models by editing `config.ts` (`OLLAMA_MODEL`) — this is exactly how you'd later point the same code at `gpt-4o-mini`. Architectural insight: **the model is a config value, not the app.**
- If RAM is tight, `llama3.2:1b` is a tiny fallback model.

## Stretch goals

- Add a **model leaderboard**: run the same 5 questions across `llama3.2`, `llama3.2:1b`, `mistral`, and rate the answers.
- Add a streaming **HTTP endpoint** (SSE) so a browser can chat with your local model.
- Add a **system prompt persistence**: config file per persona so you can switch bots.
- Try embeddings from Ollama vs OpenAI on the same queries and compare result rankings.

## How to run

```bash
npm init -y
npm install ollama
npm install -D typescript tsx @types/node
node src/chat.ts "What is an event loop?"
node src/embed.ts
node src/search.ts "refund policy"
node src/rag.ts "What are the refund rules?"
```
