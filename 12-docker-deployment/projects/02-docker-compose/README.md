# Project 02 — Docker Compose Stack

> Stage: 12 · Difficulty: ⭐⭐⭐

## Assignment

Build a full multi-service stack with **docker-compose**: your API + Postgres + Redis + a worker, all networked together. This is how real-world backends run locally — one command spins up everything.

## The stack

```
services:
  api:        (your app image, ports exposed)
  postgres:   (official postgres image + volume)
  redis:      (official redis image + volume)
  worker:     (your app's worker image — same image, different CMD)
```

Use a real multi-service app — the email scheduler (11-02) or production API (11-03) are ideal, since they need Postgres/Redis + a worker.

## Requirements / acceptance criteria

- [ ] `docker compose up` starts ALL services; `docker compose ps` shows them healthy
- [ ] **Networking**: the API reaches Postgres and Redis by service name (`postgres:5432`, `redis:6379`) — no localhost hacks
- [ ] **Volumes**: Postgres data and Redis data survive `docker compose down` and even `down -v` awareness — test that data persists across restarts
- [ ] **Secrets**: `DATABASE_URL`, `REDIS_URL`, `JWT_SECRET` passed via `env_file`/`environment` and NOT committed (use `env.example`)
- [ ] **Dependency order**: API waits for Postgres/Redis to be ready (depends_on + a healthcheck/retry loop)
- [ ] The API works end-to-end inside the stack (curl the host port, data lands in Postgres, jobs run in the worker)
- [ ] README documents `up`, `down`, `down -v`, and `logs -f`
- [ ] `npx tsc --noEmit` passes in the app

## Hints

- `depends_on: condition: service_healthy` + healthchecks on postgres (`pg_isready`) and redis (`redis-cli ping`).
- Worker = same image, override command: `command: ["node", "src/worker.ts"]`.
- `.env` for compose: compose reads a `.env` in the project dir for `${VAR}` substitution — keep secrets there, commit `.env.example`.
- A retry loop in the app's startup (try DB connect N times with delay) makes boot robust regardless of healthchecks.
- Volumes: `postgres-data: {}` named volumes — never bind-mount the real DB dir.

## Stretch goals

- Add the BullMQ queue dashboard (`bull-board`) as a fourth service.
- Add `restart: unless-stopped` policies and test a `docker compose kill <api>` recovery.
- Add a `Makefile` with `make up`, `make logs`, `make reset`.
- Add a `profile: [dev]` service (e.g. mailpit for email testing) that only runs with `--profile dev`.

## How to run

```bash
# in the app folder with a docker-compose.yml
docker compose up --build
docker compose ps
curl localhost:3000/healthz
# stop and restart — verify volumes persisted your data
docker compose down
docker compose up -d
```
