# Stage 13 — AI Projects

> Difficulty: ⭐⭐⭐ · Est. time: 4–6 weeks · Projects: 6

## Why this stage exists

You've mastered backend engineering. Now layer on AI. Modern AI apps are backend apps: they call LLM APIs, manage prompts, store and retrieve embeddings, stream responses, and orchestrate agents. You'll start with **free/self-hosted options (Ollama)** so you can learn with zero API keys, and also learn the **OpenAI SDK** so you're job-ready with paid providers.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| LLM basics | Tokens, temperature, system vs user messages, completions vs chat |
| Prompt engineering | System prompts, few-shot examples, structured output (JSON) |
| Streaming | `stream: true` — token-by-token responses over SSE |
| Function/tool calling | Letting the model request actions your code executes |
| Embeddings | Turning text into vectors; measuring similarity |
| Cosine similarity | The math behind semantic search |
| Vector search | Naive (compute all) vs vector DBs (pgvector, Chroma, Pinecone) |
| RAG | Retrieval-Augmented Generation: search docs → feed to LLM → answer |
| Chunking | Splitting documents into retrievable pieces |
| Agents | LLM + tools + loop: model decides which tool to call |
| Local models | Ollama: Llama, Mistral, etc. run on your machine, no keys |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-openai-text-basics` | Chat completions, prompt patterns, streaming, structured JSON output |
| 2 | `02-ai-chatbot-api` | A chat API with message history (your own API + storage) |
| 3 | `03-embeddings-search` | Embed documents, store vectors, semantic search with similarity scores |
| 4 | `04-rag-document-qa` | RAG: ingest docs → chunk → embed → retrieve → answer with sources |
| 5 | `05-ollama-local-llm` | Everything above but with a local Ollama model — no keys required |
| 6 | `06-agent-tool-use` | An agent with function calling: tools like weather lookup / calculator / DB query |

## Two paths: paid vs free

| | OpenAI SDK | Ollama (free) |
|---|---|---|
| Cost | Pay per token (small) | Free, runs locally |
| Setup | `OPENAI_API_KEY` in `.env` | `brew install ollama`, `ollama pull llama3.2` |
| Real-world relevance | High (you'll use this at work) | Perfect for learning + privacy |
| Streaming | Yes | Yes |

**Recommendation:** Do project 1 with OpenAI (it's the standard), projects 3–4 with whichever you prefer, project 5 *must* be Ollama (no keys needed), and project 6 with either. Never commit your `.env`.

## Key mental model — RAG in one paragraph

1. **Ingest**: split your documents into chunks.
2. **Embed**: convert each chunk into a vector.
3. **Store**: save vectors + text in a searchable store.
4. **Retrieve**: on a user question, embed it and find the closest chunks.
5. **Generate**: feed the top chunks + the question to the LLM with "answer using only these docs."

## Done checklist

- [ ] I can call a chat LLM, stream responses, and get structured JSON output
- [ ] I've built a chat API with history persistence
- [ ] I've implemented semantic search with embeddings + cosine similarity
- [ ] I've built a full RAG pipeline (ingest → retrieve → answer with sources)
- [ ] I've run a local LLM with Ollama with **no API keys**
- [ ] I've built an agent with at least 2 tool calls
- [ ] My `.env` is never committed; code works with `.env.example`

## When to move on

When you can build a RAG pipeline without watching a tutorial. Then take on the final boss: `../14-capstone/README.md`.

## Resources

- [OpenAI API docs](https://platform.openai.com/docs)
- [Ollama](https://ollama.com/) · [Ollama Node library](https://github.com/ollama/ollama-js)
- [Anthropic docs](https://docs.anthropic.com/en/docs) (alternative provider)
- [Hugging Face — embeddings & models](https://huggingface.co/)
- [Pinecone RAG guide](https://www.pinecone.io/learn/retrieval-augmented-generation/)
- [LangChain.js](https://js.langchain.com/) — explore AFTER building RAG by hand
