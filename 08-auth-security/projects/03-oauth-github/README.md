# Project 03 — OAuth with GitHub

> Stage: 08 · Difficulty: ⭐⭐

## Assignment

Add **"Login with GitHub"** to an app using **OAuth 2.0** — the Authorization Code flow. Users can authenticate without creating a password; your app never sees their GitHub credentials.

## The flow (know this cold — it's the industry standard)

```
1. User clicks "Login with GitHub"
2. Redirect browser to GitHub:  https://github.com/login/oauth/authorize?client_id=...&state=...&redirect_uri=...
3. User approves on GitHub
4. GitHub redirects back to YOUR app:  /auth/callback?code=...&state=...
5. Your server exchanges code + client_secret for an access_token  (POST to /login/oauth/access_token)
6. Server calls GitHub API with the token to fetch the user profile
7. Server creates/finds the user, issues YOUR app's own JWT, redirects to frontend with it
```

## Requirements / acceptance criteria

- [ ] GitHub OAuth app created (GitHub → Settings → Developer settings → OAuth Apps), keys in `.env`
- [ ] Uses the **official OAuth code flow** (redirect + code exchange) — not a library that hides it (you may use `octokit` only for the profile call, or just `fetch`)
- [ ] `state` parameter: a random value stored server-side (cookie/session) and verified on callback — prevents CSRF. Prove it: tampered state is rejected.
- [ ] `redirect_uri` matches exactly the one registered with GitHub
- [ ] Callback creates a user if new, logs them in if existing (match by GitHub id + email)
- [ ] After success: redirects to a frontend page that receives your app's JWT (query param or cookie) and shows the logged-in user
- [ ] Error path: user denies → `/auth/callback?error=access_denied` → friendly page, no crash
- [ ] Token never logged or committed
- [ ] `npx tsc --noEmit` passes

## Hints

- Register a callback `http://localhost:3000/auth/callback` — GitHub allows localhost URLs in dev.
- Exchanging code for token is a server-side `POST` to `https://github.com/login/oauth/access_token` with `Accept: application/json`.
- Fetch the profile: `GET https://api.github.com/user` with `Authorization: Bearer <token>` (and a `User-Agent` header — GitHub requires it).
- After your JWT is issued, redirect with `res.redirect("/welcome?token=...")` — a minimal static page can read it and `fetch('/me')`.
- If a user logs in with GitHub and their email already exists as a password account, you decide: link accounts or reject with a message. Document your choice.

## Stretch goals

- Also call `GET /user/emails` to handle users with hidden primary emails (requires extra scope).
- Store the GitHub access token so the user can "unlink" later (and revoke via GitHub API).
- Build the same flow with **Google** as a second provider (compare the differences).
- Redirect back to the originally-requested page after login (store it in `state`).

## How to run

```bash
npm init -y
npm install express bcryptjs jsonwebtoken
npm install -D typescript tsx @types/node @types/express @types/bcryptjs @types/jsonwebtoken

# .env (gitignored):
GITHUB_CLIENT_ID=...
GITHUB_CLIENT_SECRET=...
JWT_SECRET=...

node src/index.ts
# open http://localhost:3000/auth/github in a browser
```
