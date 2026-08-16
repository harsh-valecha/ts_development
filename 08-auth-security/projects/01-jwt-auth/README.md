# Project 01 — JWT Auth

> Stage: 08 · Difficulty: ⭐⭐

## Assignment

Build a complete **JWT authentication system**: register, login, protected routes, and refresh tokens. This is the foundation every real API needs.

## Endpoints

```
POST   /register        → { email, password } → 201, hashed password stored, returns tokens
POST   /login           → { email, password } → validates, returns tokens
POST   /refresh         → { refreshToken } → new access + refresh tokens (rotation)
POST   /logout          → invalidates the refresh token
GET    /me              → current user (protected by access token)
GET    /profile         → protected: your profile
GET    /public          → no auth needed (sanity check)
```

## Data model

```ts
interface User {
  id: string;
  email: string;
  passwordHash: string;      // bcrypt — NEVER plaintext
  createdAt: string;
}
```

Refresh tokens stored server-side (table/collection/file) so you can revoke them:

```ts
interface RefreshToken {
  token: string;            // random, stored hashed
  userId: string;
  expiresAt: Date;
  revoked: boolean;
}
```

## Requirements / acceptance criteria

- [ ] Passwords hashed with **bcrypt** (cost ≥ 10); never logged
- [ ] Access token: short-lived JWT (15 min) with `sub` = userId, `iat`, `exp`; signed with a secret from `.env`
- [ ] Refresh token: long-lived (7 days), **random opaque string**, stored hashed, single-use (rotation: old one revoked when a new one is issued)
- [ ] `GET /me` middleware verifies the JWT: malformed/expired → 401 with a clear message
- [ ] Login returns 401 (not 404) on bad email **or** password (don't leak which was wrong); use constant-time compare
- [ ] `/refresh` with a revoked/expired token → 401
- [ ] Rate-limit `/login` (simple in-memory counter is fine here; Redis version is Stage 11)
- [ ] `npx tsc --noEmit` passes; `.env` gitignored with `.env.example` present

## Hints

- JWT secret: `crypto.randomBytes(32).toString("hex")` in `.env`.
- Use `jsonwebtoken` (or `jose` if you want modern standards) — sign `{ sub: user.id }` with `expiresIn`.
- Verify in a reusable `authMiddleware(req, res, next)`.
- Hash refresh tokens before storing (`crypto.createHash("sha256")`) — leaking the DB doesn't leak usable tokens.
- Constant-time email compare: compare **both** hashes, or use a fixed-time string compare helper.

## Stretch goals

- Add email format validation (zod) + uniqueness check → 409 on duplicate.
- Add "remember me": login with `{ remember: true }` issues a longer refresh token.
- Add `GET /admin/refresh-tokens` listing active sessions per user (device table).
- Write the auth flow as integration tests (you'll have the tooling by Stage 09).

## How to run

```bash
npm init -y
npm install express bcryptjs jsonwebtoken zod
npm install -D typescript tsx @types/node @types/express @types/bcryptjs @types/jsonwebtoken
node src/index.ts

# flow:
curl -X POST localhost:3000/register -d '{"email":"a@b.c","password":"secret1"}'
curl -X POST localhost:3000/login    -d '{"email":"a@b.c","password":"secret1"}'
# -> { accessToken, refreshToken }
curl localhost:3000/me -H "Authorization: Bearer <accessToken>"
curl -X POST localhost:3000/refresh -d '{"refreshToken":"<refreshToken>"}'
```
