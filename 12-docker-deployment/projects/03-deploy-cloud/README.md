# Project 03 — Deploy to the Cloud + CI

> Stage: 12

Deploy a real backend to the cloud and add a GitHub Actions CI pipeline.

## What to build

1. **Deploy** (pick one): Render (simplest) / Railway (fast DX) / Fly.io (container-native)
   - Deploy your production API (11-03) or the compose stack (12-02) stripped to one API + its DB/Redis
2. **CI** (`.github/workflows/ci.yml`): on push/PR run `npm ci` → `npm run typecheck` → `npm test` → `npm run build`
3. **CD**: pushing to `main` triggers an automatic re-deploy

## Rules

- App is live: a public URL responds with `/healthz` ok and real API calls work
- Env vars configured on the platform, not in the repo
- CI goes red on a deliberate break, then green after the fix
- README documents: live URL, how CI works, how to deploy, how to roll back

## How to run

```bash
git add . && git commit -m "feat: deployable production api" && git push -u origin main
# create the service on your platform, set env vars, watch it deploy
# add .github/workflows/ci.yml, push, watch CI on GitHub
curl https://<your-app>.onrender.com/healthz
```