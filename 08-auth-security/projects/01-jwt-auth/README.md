# Project 01 — JWT Auth

> Stage: 08

A complete JWT auth system: register, login, protected routes, refresh tokens.

## What to build

- `POST /register` + `POST /login` → returns access + refresh tokens
- `POST /refresh` (rotation: old token revoked) · `POST /logout` · `GET /me` (protected)

## Rules

- Passwords hashed with bcrypt (cost ≥ 10), never logged
- Access token: short-lived JWT (15 min), signed with a secret from `.env`
- Refresh token: long-lived (7 days), random opaque string stored hashed, single-use
- Bad email OR password → 401 (don't leak which); constant-time compare
- Middleware returns 401 on malformed/expired tokens
- `.env` gitignored, `.env.example` present
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express bcryptjs jsonwebtoken zod
npm install -D typescript tsx @types/node @types/express @types/bcryptjs @types/jsonwebtoken
node src/index.ts
curl -X POST localhost:3000/register -d '{"email":"a@b.c","password":"secret1"}'
curl -X POST localhost:3000/login -d '{"email":"a@b.c","password":"secret1"}'
curl localhost:3000/me -H "Authorization: Bearer <accessToken>"
```