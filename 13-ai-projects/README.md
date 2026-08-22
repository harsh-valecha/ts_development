# Stage 13 — AI Projects

Layer AI on top of your backend skills: LLMs, embeddings, RAG, agents.

## Concepts — one tiny script each

- `chat.ts` — a basic chat completion
- `stream.ts` — stream a response token-by-token
- `prompt.ts` — prompt patterns: system prompt, few-shot, structured output
- `structured.ts` — force JSON output and validate it with zod
- `embed-search.ts` — turn text into embeddings, measure similarity
- `rag.ts` — minimal RAG: embed docs → retrieve → answer with sources
- `agent.ts` — let the model call a tool your code runs

## How to work it

- Write one script per concept in `src/`
- Use Ollama (local, no API keys) or the OpenAI SDK — never commit `.env`
- Every script must pass `npm run typecheck`

## How to run

```bash
npm install openai zod dotenv        # or: brew install ollama
npm run typecheck
node src/chat.ts   # repeat per script
```

## Move on when

You can build a RAG pipeline without watching a tutorial.