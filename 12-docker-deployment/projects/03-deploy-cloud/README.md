# Project 03 — Deploy to the Cloud + CI

> Stage: 12 · Difficulty: ⭐⭐⭐

## Assignment

**Deploy a real backend to the cloud** and set up a **GitHub Actions CI pipeline**. This is the "ship it" project — the moment your code lives on a public URL.

## Part 1 — Deploy (pick ONE platform)

| Platform | Approach | Best for |
|----------|----------|----------|
| **Render** | Push to GitHub → create a Web Service → auto-deploy | Simplest, free tier, includes Postgres |
| **Railway** | Push to GitHub → project from template → deploy | Fast DX, good defaults |
| **Fly.io** | `fly launch` using your Dockerfile | Container-native, closest to Docker you already know |

What to deploy: your **production API (11-03)** or the **docker-compose stack (12-02)** stripped to one deployable API + its Postgres/Redis.

## Part 2 — CI pipeline (GitHub Actions)

Create `.github/workflows/ci.yml` in the repo:

```yaml
name: CI
on: [push, pull_request]
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 22, cache: npm }
      - run: npm ci
      - run: npm run typecheck        # tsc --noEmit
      - run: npm test                 # vitest run
      - run: npm run build            # tsc build (if compiled)
```

Add a **deploy step** (CD): on push to `main`, trigger the platform's deploy (Render/Railway deploy on push automatically; Fly via `fly deploy` with `flyctl` + `FLY_API_TOKEN` secret).

## Requirements / acceptance criteria

- [ ] App is **live**: a public URL responds with `/healthz` ok and real API calls work
- [ ] Environment variables configured on the platform (DB URL, Redis URL, JWT secret) — not in the repo
- [ ] CI turns **green** on push: typecheck + tests + build all run on GitHub
- [ ] CI catches a deliberate break: temporarily break a test, push, watch CI go **red**, then fix
- [ ] A second push to `main` triggers an automatic re-deploy with the new code (auto-deploy or CD step)
- [ ] README documents: the live URL, how CI works, how to deploy, how to roll back

## Hints

- Render: `railway`/Render need your repo public or connected — a build command `npm ci && npm run build` and start command `npm start` are required fields.
- Postgres on Render: use their managed Postgres; get the connection string from the dashboard.
- Keep your Dockerfile from 12-01; Railway/Fly can build it directly.
- CI secrets go in GitHub → repo → Settings → Secrets and variables → Actions.
- "Roll back": on Render it's a deploy history drop-down; on Railway the previous deploy. Document the steps.

## Stretch goals

- Add a **staging/production** environment split (two services, deploy staging on PR, prod on main).
- Add a smoke test in CD: after deploy, curl `/healthz` and fail the pipeline if unhealthy.
- Add a `Dockerfile` based deploy to Fly.io for one of your apps.

## How to run

```bash
# 1. push the API to a GitHub repo
git init && git add . && git commit -m "feat: deployable production api"
git remote add origin <your-repo-url>
git push -u origin main

# 2. create service on your platform, set env vars, watch it deploy

# 3. add .github/workflows/ci.yml, push, watch CI on GitHub

curl https://<your-app>.onrender.com/healthz
```
