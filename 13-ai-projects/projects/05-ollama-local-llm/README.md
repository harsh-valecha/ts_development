# Project 05 — Local LLM with Ollama

> Stage: 13

Rebuild AI features with zero API keys using Ollama — local models on your machine.

## What to build

- `src/chat.ts` — chat CLI with `llama3.2`, streaming, and a REPL with conversation history
- `src/embed.ts` + `src/search.ts` — embeddings + semantic search with `nomic-embed-text`
- `src/rag.ts` — retrieve chunks → answer with the local model → cite sources

## Rules

- Zero API keys; works offline
- Models picked from a config, not hardcoded names scattered around
- Streaming works; RAG answers are grounded (the model refuses when context lacks the answer)
- `npx tsc --noEmit` passes

## How to run

```bash
brew install ollama && ollama pull llama3.2 && ollama pull nomic-embed-text
npm init -y
npm install ollama
npm install -D typescript tsx @types/node
node src/chat.ts "What is an event loop?"
node src/rag.ts "What are the refund rules?"
```