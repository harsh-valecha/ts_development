# Project 01 — Dockerize a TS API

> Stage: 12

Write a Dockerfile for one of your TS APIs and run it in a container.

## What to build

- A **multi-stage Dockerfile** — pick one and justify in a comment:
  - Compiled: stage 1 builds `dist/` with `tsc`, slim stage 2 copies `dist` + prod deps
  - Native TS: slim stage copies `src/`, runtime is `node src/index.ts` (Node 22.6+ runs TS)
- `.dockerignore` keeping `node_modules`, `.env`, `data/`, `*.log` out of the image
- App reads config from env vars, not hardcoded values

## Rules

- Runs as a non-root `node` user; `EXPOSE`; a `HEALTHCHECK` that hits `/healthz`
- `docker build -t my-api .` succeeds; `docker run -p 3000:3000 my-api` works from the host
- Image is slim; `.env` is NOT in the image
- README documents the exact build/run commands

## How to run

```bash
# in your API project folder
docker build -t my-api .
docker run -p 3000:3000 my-api
curl localhost:3000/healthz
docker images | grep my-api
```