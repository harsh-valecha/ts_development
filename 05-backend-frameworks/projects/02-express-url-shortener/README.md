# Project 02 — Express URL Shortener

> Stage: 05 · Difficulty: ⭐⭐

## Assignment

Build a **URL shortener** — the classic "every backend dev has built one" project. It exercises routing, redirects, validation, and careful id generation.

## Endpoints

```
POST   /shorten            → body { url: string; customSlug?: string } → 201 { shortUrl, slug }
GET    /:slug              → 302 redirect to the original URL
GET    /api/stats/:slug    → { slug, url, createdAt, clicks }
GET    /api/top            → top 10 most-clicked slugs
DELETE /api/slug/:slug     → 204 (if it exists)
```

## Requirements / acceptance criteria

- [ ] `POST /shorten` validates the URL is a real absolute http/https URL (zod `.url()` + protocol check)
- [ ] Without `customSlug`: generate a short unique slug (e.g. 6-char base62 from `crypto.randomBytes`; handle collisions)
- [ ] With `customSlug`: validate format (`^[a-zA-Z0-9-_]{3,20}$`), reject if taken → 409
- [ ] `GET /:slug` returns a **302** redirect (Location header) and increments a click counter
- [ ] Unknown slug → 404 with a friendly page/JSON
- [ ] Storage in `data/links.json` (atomic writes) — SQLite upgrade optional
- [ ] Clean structure: routes / controllers / services; zod everywhere
- [ ] `npx tsc --noEmit` passes

## Hints

- Use `crypto.randomBytes(4).toString("base64url")` style generation — but ensure uniqueness against existing slugs (regenerate on collision, or check-then-insert).
- 302 = temporary redirect; 301 = permanent. Think about which is right and why (hint: click counting — 302 keeps browsers hitting your server).
- Return the full short URL in responses: build it from `req.get("host")` so it works locally and in production.
- Guard against redirect loops (a slug that redirects to itself).

## Stretch goals

- Add TTLs: `POST /shorten` accepts `{ expiresAt }` → expired slugs return 410 Gone.
- Add basic click analytics (referrer, user-agent, timestamp per click).
- Add rate limiting (preview of Stage 11): max 20 shortens/hour.
- Serve a tiny HTML page at `GET /` for "paste URL here" (vanilla JS).

## How to run

```bash
npm init -y
npm install express zod
npm install -D typescript tsx @types/node @types/express
node src/index.ts

curl -X POST http://localhost:3000/shorten -H "Content-Type: application/json" -d '{"url":"https://www.typescriptlang.org/"}'
curl -i http://localhost:3000/<slug>          # see the 302
curl http://localhost:3000/api/top
```
