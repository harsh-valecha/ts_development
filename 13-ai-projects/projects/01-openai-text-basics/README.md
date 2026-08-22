# Project 01 — OpenAI Text Basics

> Stage: 13

Core LLM skills with the OpenAI SDK: chat, prompts, streaming, structured output.

## What to build (one script per skill in `src/`)

- `basic.ts` — a simple chat; compare `temperature` 0 vs 1
- `stream.ts` — the same prompt streamed token-by-token
- `prompts.ts` — system prompt persona, few-shot examples, chain-of-thought
- `structured.ts` — force JSON output and validate it with zod (retry once on failure)
- `tokens.ts` — count tokens and estimate cost

## Rules

- `OPENAI_API_KEY` from `.env` (gitignored, `.env.example` present) — never hardcoded
- Streaming visibly works (tokens appear progressively)
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install openai zod dotenv
npm install -D typescript tsx @types/node
# .env:  OPENAI_API_KEY=sk-...
node src/basic.ts
node src/stream.ts
node src/structured.ts
```