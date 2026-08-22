# Project 02 — Docker Compose Stack

> Stage: 12

A full multi-service stack with docker-compose: your API + Postgres + Redis + a worker.

## What to build

```
services:
  api:       (your app image, ports exposed)
  postgres:  (official image + volume)
  redis:     (official image + volume)
  worker:    (your app's image, different CMD)
```

Use a real multi-service app (email scheduler or production API) that needs Postgres/Redis + a worker.

## Rules

- `docker compose up` starts everything; services reach each other by name (`postgres:5432`)
- Volumes: Postgres + Redis data survive `docker compose down`
- Secrets via `env_file`/`environment`, never committed (use `.env.example`)
- API waits for Postgres/Redis (healthchecks + retry loop)
- `npx tsc --noEmit` passes in the app

## How to run

```bash
docker compose up --build
docker compose ps
curl localhost:3000/healthz
docker compose down && docker compose up -d   # data persists
```