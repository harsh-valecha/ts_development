# Stage 12 — Docker & Deployment

Package your app so it runs identically anywhere, then ship it.

## Concepts — one file each

- `Dockerfile` — multi-stage build: build with `tsc`, slim runtime stage
- `compose.yaml` — run your app + Postgres + Redis together with volumes

## How to work it

- Add `.dockerignore` (keep `node_modules/`, `.env` out of the image)
- Add a healthcheck so Docker knows when your app is ready
- Deploy to Render/Railway and add a GitHub Actions CI pipeline

## How to run

```bash
docker build -t my-app .
docker compose up
```

## Move on when

You can take any app from this repo and get it running in a container.