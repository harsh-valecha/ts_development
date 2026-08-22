# Project 02 — AI Chatbot API

> Stage: 13

The backend for a chatbot: persisted conversation history + streaming replies.

## What to build

- `POST /api/conversations` + list/get/delete + rename
- `POST /api/conversations/:id/messages` → streams the AI reply via **SSE** (token events + a done event)
- History persisted (SQLite is fine); the bot's context comes from stored history

## Rules

- Streaming works from a browser (SSE)
- User message saved on receipt; assistant message saved when the stream completes
- Per-user conversations with your Stage 08 JWT pattern
- Trim history when it exceeds a token budget (log what you did)
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express openai zod better-sqlite3 jsonwebtoken bcryptjs dotenv
npm install -D typescript tsx @types/node @types/express
node src/index.ts
# POST a message, observe the SSE stream in the terminal / a browser page
```