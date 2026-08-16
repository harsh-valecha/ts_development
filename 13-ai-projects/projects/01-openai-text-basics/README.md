# Project 01 — OpenAI Text Basics

> Stage: 13 · Difficulty: ⭐⭐⭐

## Assignment

Write a set of scripts using the **OpenAI SDK** that demonstrate the core LLM skills: basic chat, prompt patterns, streaming, and structured output. These are the building blocks of every AI feature you'll build after this.

## Scripts (`src/`)

1. **`basic.ts`** — a simple chat: system message + user message, print the reply. Explore `temperature` (try `0` vs `1` and compare answers) and `max_tokens`.

2. **`stream.ts`** — same prompt but **streamed** token-by-token to the console (LLM features feel 10× better streamed).

3. **`prompts.ts`** — demonstrate prompt engineering:
   - System prompt that sets a persona ("you are a concise technical editor")
   - **Few-shot**: give 2–3 examples in the messages before asking the real question
   - **Chain of thought**: ask the model to reason step-by-step about a problem
   - Log which approach gives the most reliable answer

4. **`structured.ts`** — force **structured JSON output** with **zod**:

```ts
const Sentiment = z.object({ sentiment: z.enum(["positive","negative","neutral"]), confidence: z.number().min(0).max(1), reasons: z.array(z.string()) });
```

   - Use the model to classify customer reviews into this schema
   - Validate the model's output with `Sentiment.safeParse` and retry once if it fails
   - (If your SDK supports `response_format: { type: "json_object" }` or tool-calling, use that too)

5. **`tokens.ts`** — understand **tokens**: use the SDK's tokenizer (or `tiktoken`-style utility) to count tokens in a prompt; print a table of `tokens ≈ $ cost` for a few model sizes. Build intuition for pricing.

## Requirements / acceptance criteria

- [ ] `OPENAI_API_KEY` read from `.env` (gitignored, `.env.example` present), never hardcoded
- [ ] All 5 scripts run; `npx tsc --noEmit` passes
- [ ] Streaming visibly works (tokens appear progressively)
- [ ] Structured output validates with zod and handles an invalid response (retry/log)
- [ ] A short `NOTES.md` section comparing temperature 0 vs 1 and few-shot vs no-shot

## Hints

- Install: `npm i openai zod dotenv`.
- System vs user messages: the system message steers behavior; user messages are the actual task.
- For JSON reliability, tell the model "respond with JSON only" in the system prompt AND validate.
- `temperature` controls randomness — lower = more deterministic. Great for structured tasks.
- Watch token costs: use a small model for experimentation where possible.

## Stretch goals

- Add a "streaming to SSE" endpoint (Express) so a browser could consume it — this is the direct pre-step for project 2.
- Compare the same prompt across 2–3 different models (gpt-4o-mini vs gpt-4o etc.) and note quality differences.
- Add a fallback: if the API fails, degrade to a rule-based keyword answer.

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
