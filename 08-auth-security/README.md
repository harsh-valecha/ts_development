# Stage 08 — Auth & Security

Know who's using your API and what they're allowed to do.

## Concepts — one tiny script each

- `bcrypt-hash.ts` — hash and compare passwords (never store plaintext)
- `jwt-sign.ts` — sign and verify a JWT with an expiry
- `auth-guard.ts` — protect a route: 401 unauthenticated, 403 unauthorized

## How to work it

- Write one script per concept in `src/`, each printing its output
- Keep secrets in `.env` (gitignored); never hardcode them
- Always `await` password comparisons, set `expiresIn` on tokens
- Every script must pass `npm run typecheck`

## How to run

```bash
npm install bcrypt jsonwebtoken
npm run typecheck
node src/jwt-sign.ts   # repeat per script
```

## Move on when

Auth no longer feels like magic — you can trace every step of a login request.