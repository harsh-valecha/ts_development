# Project 03 — OAuth with GitHub

> Stage: 08

"Login with GitHub" using OAuth 2.0's Authorization Code flow.

## What to build

- Redirect to GitHub authorize URL → user approves → callback with `code` + `state`
- Exchange the code for an access token (server-side POST), then fetch the GitHub profile
- Create the user if new, log them in if existing; issue your app's own JWT and redirect with it

## Rules

- Implement the flow yourself (no OAuth library hiding it); `fetch` for the token + profile calls
- `state` param stored server-side and verified on callback (prevents CSRF)
- Keys in `.env` (gitignored); tokens never logged or committed
- Handle user-denies gracefully (no crash)
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express bcryptjs jsonwebtoken
npm install -D typescript tsx @types/node @types/express @types/bcryptjs @types/jsonwebtoken
# .env: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET, JWT_SECRET
node src/index.ts
# open http://localhost:3000/auth/github in a browser
```