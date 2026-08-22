# Project 06 — Agent with Tool Use

> Stage: 13

An AI agent that calls tools — the model decides which functions to run, your code executes them.

## What to build

- Tools (at least 3): `get_weather(city)`, `calculate(expression)`, `search_docs(query)`, `save_note(text)`, `get_time(timezone)`
- An agent loop: send messages + tool definitions → model returns `tool_calls` → your code runs each → results feed back as `tool` messages → model concludes

## Rules

- Each tool has a typed `parameters` JSON schema the model sees
- One user message can trigger multiple sequential tool calls
- A failing tool returns a clear error to the model — never crashes the agent
- Loop guard: max ~5 iterations to prevent infinite loops
- Conversation history maintained across turns (REPL style)
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install openai express zod dotenv
npm install -D typescript tsx @types/node @types/express
node src/index.ts
# > what's the weather in Tokyo?
# > calculate 12 * (3 + 4) / 2
```