# Stage 00 — Project Setup

Get your tools working so you can run TypeScript files.

## Setup steps

- Install Node (LTS or newer) with nvm: `nvm install --lts && nvm use --lts`
- Create `.nvmrc` in the repo root with your Node major version (e.g. `22`)
- `git init` at the repo root, create `.gitignore` with `node_modules/`, `.env`, `dist/`, `*.log`
- Install tooling once: `npm install -D typescript tsx @types/node`
- Enable VS Code format-on-save for TypeScript

## Tiny scripts to try

- `hello.ts` — `console.log("Hello TS")`, run with `node hello.ts` (proves native TS works)

## How to run

```bash
npx tsc --noEmit   # type-check (must pass with zero errors)
node src/hello.ts  # run a script
```

## Move on when

`node hello.ts` prints, `npx tsc --version` works, and your editor shows inline type errors.