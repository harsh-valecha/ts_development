# Stage 08 — Auth & Security

> Difficulty: ⭐⭐ · Est. time: 3 weeks · Projects: 3

## Why this stage exists

APIs without auth are toys. Every real system needs to know *who* you are (authentication) and *what* you're allowed to do (authorization). This is also where you learn security hygiene that protects users — password hashing, token expiry, CORS, rate limits. This stage is what makes your apps "real."

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Authentication vs authorization | "Who are you?" vs "What can you do?" |
| Password hashing | `bcrypt` — never store plaintext, never store unsalted hashes |
| JWT | Signed tokens carrying user claims; access + refresh tokens |
| Sessions vs tokens | Server-side sessions vs stateless JWTs — tradeoffs |
| Middleware guards | Protecting routes: 401 when unauthenticated, 403 when unauthorized |
| RBAC | Roles (user/admin/moderator) + permissions matrix |
| OAuth 2.0 | Delegated auth via GitHub/Google; authorization code flow |
| CORS | Browser security policy; configuring allowed origins |
| Security hygiene | Input validation, rate limiting, secure headers, no secrets in code |
| `.env` | Storing secrets, never committing them |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-jwt-auth` | Register/login with bcrypt + JWT access & refresh tokens, protected routes |
| 2 | `02-rbac-roles` | Add roles & permissions to your JWT app (admin-only endpoints) |
| 3 | `03-oauth-github` | "Login with GitHub" via OAuth 2.0 — no passwords |

## Security rules to live by (forever)

1. Hash passwords with bcrypt (cost factor ≥ 10). Never log them.
2. Never trust the client — validate every input on the server.
3. Keep secrets in `.env`, gitignore it, and use `.env.example` for the shape.
4. Short-lived access tokens + refresh tokens with rotation.
5. Always `await` your password comparisons (prevents timing attacks).
6. Set `expiresIn` on every token. No infinite sessions.
7. Add `.env` to `.gitignore` **before** you ever commit.

## Done checklist

- [ ] I've implemented register/login with bcrypt-hashed passwords
- [ ] My protected routes return 401 (no/invalid token) correctly
- [ ] I've implemented at least one role-based restriction returning 403
- [ ] I've completed an OAuth login with GitHub (or Google)
- [ ] My `.env` is gitignored and I have a `.env.example`
- [ ] I can explain JWT vs sessions and access vs refresh tokens
- [ ] All 3 projects pass `tsc --noEmit` and work end-to-end

## When to move on

When auth no longer feels like magic — you can trace every step of a login request. Then open `../09-testing/README.md`.

## Resources

- [JWT.io — decode & inspect tokens](https://jwt.io/)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OAuth 2.0 explained (RFC 6749 overview)](https://oauth.net/2/)
- [bcrypt docs](https://github.com/kelektiv/node.bcrypt.js)
- [Passport.js](https://www.passportjs.org/) (optional helper for OAuth)
