# Stage 12 — Docker & Deployment

> Difficulty: ⭐⭐⭐ · Est. time: 3 weeks · Projects: 3

## Why this stage exists

"It works on my machine" ends here. Docker packages your app + its exact runtime into a container that runs identically anywhere. Then you deploy it to the cloud, wire up CI, and finally call yourself someone who can *ship*. This stage turns all your local projects into deployable software.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Containers vs VMs | Processes with isolated filesystems, sharing the OS kernel |
| Images vs containers | The blueprint vs the running instance |
| Dockerfile | `FROM`, `WORKDIR`, `COPY`, `RUN`, `EXPOSE`, `CMD` |
| Multi-stage builds | Build stage (tsc) → slim runtime stage |
| `.dockerignore` | Keep node_modules, .env, etc. out of the image |
| `docker-compose` | Orchestrate app + Postgres + Redis together |
| Volumes | Persisting DB data across container restarts |
| Healthchecks | Docker knows when your app is actually ready |
| Deployment | Render/Railway/Fly.io — push code, get a URL |
| CI | GitHub Actions: typecheck + test + build on every push |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-dockerize-api` | Dockerfile + multi-stage build for a Node/TS API; run it in Docker |
| 2 | `02-docker-compose` | Compose file: your API + Postgres + Redis + a queue, all together |
| 3 | `03-deploy-cloud` | Deploy an app to Render/Railway + a GitHub Actions CI pipeline |

## Dockerfile sketch (you'll write your own)

```dockerfile
FROM node:22 AS build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npx tsc

FROM node:22 AS runtime
WORKDIR /app
COPY --from=build /app/dist ./dist
COPY package*.json ./
RUN npm ci --omit=dev
EXPOSE 3000
CMD ["node", "dist/index.js"]
```

(If you're using native TS with `node`, your runtime stage copies `src/` instead of `dist/`. Both are valid — understand *why* before choosing.)

## Deployment platform options

| Platform | Best for | Notes |
|----------|----------|-------|
| [Render](https://render.com) | Simplest free tier | Web services + Postgres, easy |
| [Railway](https://railway.app) | Great DX, templates | Pay as you go, very smooth |
| [Fly.io](https://fly.io) | Docker-native | Ships containers directly |
| [Vercel](https://vercel.com) | API routes + frontend | Less for long-running servers |

## Done checklist

- [ ] I've written a Dockerfile with a multi-stage build for a TS app
- [ ] I can run my app with `docker run` and map ports
- [ ] I've orchestrated app + DB + Redis with docker-compose and volumes
- [ ] I've deployed a backend to a cloud platform and hit it from a browser/curl
- [ ] I've set up CI that type-checks, tests, and builds on push
- [ ] My `.dockerignore` and `.gitignore` keep secrets out

## When to move on

When you can take any app from this repo and get it running in a container. Then open `../13-ai-projects/README.md` — time for the fun stuff.

## Resources

- [Docker official docs & getting started](https://docs.docker.com/get-started/)
- [Dockerfile reference](https://docs.docker.com/reference/dockerfile/)
- [Docker Compose](https://docs.docker.com/compose/)
- [Render docs](https://render.com/docs) · [Railway docs](https://docs.railway.app/)
- [GitHub Actions docs](https://docs.github.com/en/actions)
