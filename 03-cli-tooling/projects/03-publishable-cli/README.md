# Project 03 — Publishable CLI

> Stage: 03

Polish one of your CLIs into a real installable npm package.

## What to build

- `bin` field in `package.json` + shebang `#!/usr/bin/env node` so `task-cli` runs anywhere
- `npm link` to install it globally
- `--version` and `--help` with examples; flag aliases (`-h`, `-v`)
- Colored output with a `--no-color` fallback
- Helpful errors with proper exit codes (0 success, 1 user error)
- Handle Ctrl-C cleanly (no stack traces)

## Rules

- `npx tsc --noEmit` passes
- A README documenting install + usage

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npm link
task-cli --help
task-cli --version
```