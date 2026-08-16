# Project 01 — Dockerize a TS API

> Stage: 12 · Difficulty: ⭐⭐⭐

## Assignment

Write a proper **Dockerfile** for one of your TypeScript APIs (the notes API or URL shortener is ideal) and run it in a container. This teaches the container fundamentals you'll use forever.

## What to build

1. **A multi-stage Dockerfile** (two options — understand both, pick one and justify in a comment):

   **Option A — compiled:** stage 1 builds `dist/` with `tsc`, stage 2 (slim) copies only `dist` + prod deps.

   **Option B — native TS:** stage 1 installs dev deps, stage 2 (slim) copies `src/` + prod deps, runtime is `node src/index.ts` (Node 22.6+ runs TS).

2. **`.dockerignore`** — keep `node_modules`, `dist`, `.env`, `data/`, `*.log` out of the build context.

3. **Compose-ready env handling** — the app reads config from env vars, not hardcoded values (your Stage 11 `config.ts` pattern).

4. **Runtime concerns**
   - Run as a **non-root user** (`node` user)
   - `EXPOSE <port>`
   - `HEALTHCHECK` that curls `/healthz`
   - Correct `CMD` (array form, no shell unless needed)

## Requirements / acceptance criteria

- [ ] `docker build -t my-api .` succeeds
- [ ] `docker run -p 3000:3000 my-api` serves the API; `curl localhost:3000` works from the host
- [ ] The image is **slim** (built image size printed and reasonable — < ~250MB for Option A, < ~400MB for Option B)
- [ ] `docker inspect` shows it runs as the `node` user (not root)
- [ ] `docker run --rm my-api` + a failing healthcheck demonstrates Docker's health status
- [ ] `.env` is NOT in the image (check with `docker exec ... env` or by scanning the image)
- [ ] README documents the exact build/run commands

## Hints

- Layer caching: `COPY package*.json ./` → `RUN npm ci` → `COPY . .` means deps only reinstall when the lockfile changes.
- If using compiled output, remember `npm ci --omit=dev` in the runtime stage.
- Multi-stage names: `FROM node:22 AS build` / `AS runtime`.
- Healthcheck: `HEALTHCHECK --interval=5s CMD node -e "fetch('http://localhost:3000/healthz').then(r=>process.exit(r.ok?0:1))"`.
- Compare image size: `docker images | grep my-api`.

## Stretch goals

- Add a `docker history` walkthrough to your README explaining each image layer.
- Add `COPY` ownership chown to the node user: `COPY --chown=node:node ...`.
- Tag versions: `docker build -t my-api:1.0.0 .` and run both versions side by side on different ports.

## How to run

```bash
# in your API project folder
docker build -t my-api .
docker run -p 3000:3000 my-api
curl localhost:3000/healthz
docker images | grep my-api        # check size
docker exec -it <container> whoami # should print "node"
```
