# Stage 04 — HTTP & REST Fundamentals

> Difficulty: ⭐⭐ · Est. time: 2 weeks · Projects: 3

## Why this stage exists

Before you touch Express or Fastify, you need to understand what's actually happening under the hood. HTTP is *the* protocol of the web — understanding it deeply (methods, status codes, headers, bodies, REST semantics) makes every framework and API you ever use click into place.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| HTTP protocol | Request/response model, how a browser talks to a server |
| Methods | GET, POST, PUT, PATCH, DELETE, and when to use each |
| Status codes | 200/201/204, 400/401/403/404, 500 — what they communicate |
| Headers | `Content-Type`, `Authorization`, `Content-Length`, etc. |
| Routes & URL parsing | `req.url`, query strings, path params |
| Request body | Parsing JSON/URL-encoded bodies |
| REST design | Resources, collections, naming conventions |
| `node:http` | Built-in server — no framework |
| `fetch` | Client-side HTTP calls (Node has global `fetch`) |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-node-http-server` | A bare `node:http` server that responds differently to different routes |
| 2 | `02-rest-api-native` | A full CRUD REST API with **zero frameworks** — in-memory + file storage |
| 3 | `03-fetch-api-client` | A client program that calls public APIs (`fetch`), with typed responses and error handling |

## Why build APIs by hand first?

Frameworks hide everything. If you build one REST API with raw `node:http`, you'll understand routing, body parsing, and status codes at a level that makes Express trivial later. It's painful now, powerful forever.

## Done checklist

- [ ] I can explain GET/POST/PUT/PATCH/DELETE and when each applies
- [ ] I've built a working HTTP server with routing and no framework
- [ ] I've built a full CRUD API (create/read/update/delete) with proper status codes
- [ ] I've consumed third-party APIs with `fetch` and typed the responses
- [ ] I can read a raw HTTP request/response (curl -v output makes sense)
- [ ] All 3 projects pass `tsc --noEmit`

## When to move on

When REST and HTTP feel natural, not scary. Then open `../05-backend-frameworks/README.md`.

## Resources

- [MDN — HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [MDN — HTTP status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Status)
- [Node.js http docs](https://nodejs.org/api/http.html)
- [MDN — Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)
- Test your API with [curl](https://curl.se/docs/manpage.html) or [Postman](https://www.postman.com/)/[Hoppscotch](https://hoppscotch.io/)
