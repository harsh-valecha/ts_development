# Project 06 — Agent with Tool Use

> Stage: 13 · Difficulty: ⭐⭐⭐

## Assignment

Build an **AI agent** that can call **tools** — the model decides which functions to invoke, your code executes them, and the results feed back into the conversation. This is how modern agents work (function calling / tool use).

## The agent

An **assistant with tools**:

| Tool | What it does |
|------|--------------|
| `get_weather(city)` | Calls a real weather API (open-meteo, no key) or returns simulated data |
| `calculate(expression)` | Safely evaluates a math expression (write a tiny parser or use a safe eval) |
| `search_docs(query)` | Retrieves chunks from your Stage 13 RAG store (reuse project 4's retrieval!) |
| `save_note(text)` | Appends to a notes file |
| `get_time(timezone)` | Current time in a timezone |

## How it works

```text
user: "What's the weather in Tokyo and remind me to buy milk?"
  ↓ agent loop
1. send messages + tool definitions to the model
2. model returns tool_calls: [get_weather("Tokyo"), save_note("buy milk")]
3. your code runs each tool, appends results as "tool" messages
4. model replies with the final answer → print it
5. (repeat while the model keeps requesting tools)
```

## Requirements / acceptance criteria

- [ ] Uses the SDK's **tool/function-calling** API (`tools`, `tool_calls`, `tool` message role)
- [ ] The agent loop runs correctly: model requests tools → your code executes → feeds back → model concludes
- [ ] At least 3 tools implemented, each with a typed `parameters` schema the model sees
- [ ] **Multi-tool turns work**: one user message triggers multiple sequential tool calls
- [ ] A tool that **fails** (bad city name, eval error) returns a clear error message to the model instead of crashing the agent
- [ ] Loop guard: max N iterations (e.g. 5) to prevent infinite tool loops
- [ ] Conversation history maintained across turns (REPL-style)
- [ ] `npx tsc --noEmit` passes; `.env` gitignored (and it works with Ollama too — see stretch)

## Hints

- OpenAI: `tools: [{ type: "function", function: { name, description, parameters } }]` where `parameters` is a JSON Schema object. The description text is what steers the model — write good ones.
- When the response has `message.tool_calls`, execute each, then push `{ role: "tool", tool_call_id, content }` back.
- Keep a `TOOLS` registry: `name → { schema, execute(args) }` in one typed place.
- `calculate`: reject anything but `0-9 + - * / ( ) .`; `new Function` on a sanitized string is acceptable for learning but comment the risk, or write a tiny shunting-yard parser.
- Reuse `retrieve` from project 4 so the agent can "know" your docs.

## Stretch goals

- Add a `search_web(query)` tool (fetch + summarize, or a search API).
- Run the same agent against **Ollama** (llama3 supports tool calling in recent versions) and compare reliability.
- Add **tool call visualization** for a CLI: print which tool is running as it runs.
- Persist the conversation + note that the agent "used" tools (trace log) for auditing.

## How to run

```bash
npm init -y
npm install openai express zod dotenv
npm install -D typescript tsx @types/node @types/express
node src/index.ts
# REPL:
# > what's the weather in Tokyo?
# > calculate 12 * (3 + 4) / 2
# > remind me to buy milk
```
