# Project 01 — Task CLI

> Stage: 03

A task manager CLI that stores tasks in a JSON file.

## What to build

- `task add "Buy milk" [--due DATE] [--priority high|medium|low]`
- `task list [--status todo|done]`, `task done <id>`, `task delete <id>`, `task stats`
- Tasks typed: `{ id, title, done, priority, due?, createdAt, completedAt? }`
- Data persists in `~/.task-cli/tasks.json`

## Rules

- IDs are stable numbers (never reused after delete)
- Friendly errors (unknown command → usage; `task done 999` → "not found")
- Exit code 0 on success, non-zero on error; `--help` works
- Save atomically (write temp file, then rename)
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts add "Learn streams"
node src/index.ts list
```