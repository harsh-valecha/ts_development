# Project 01 — Task CLI

> Stage: 03 · Difficulty: ⭐⭐

## Assignment

Build a task manager CLI that stores tasks in a JSON file. This is the classic beginner CLI — it forces you to handle user input, data persistence, and a clean interface all at once.

## Commands

```
task add "Buy milk" [--due 2026-08-20] [--priority high|medium|low]
task list [--status todo|done] [--priority high]
task done <id>
task delete <id>
task clear-done
task stats
```

- `task stats` prints: total, done, todo, overdue counts.
- IDs are stable numbers that don't change when other tasks are deleted.
- Data lives in `~/.task-cli/tasks.json` (create the dir if missing).

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes (strict)
- [ ] All commands above work with sensible output (colors for priority)
- [ ] Data persists across runs (restart the terminal, tasks are still there)
- [ ] Tasks have a typed shape: `{ id, title, done, priority, due?, createdAt, completedAt? }`
- [ ] Errors are friendly: unknown command shows usage; `task done 999` says "task 999 not found"
- [ ] Exit code 0 on success, non-zero on error
- [ ] `--help` lists all commands and examples
- [ ] Concurrent writes don't corrupt the file (write atomically — write temp file then rename)

## Hints

- Parse args by hand first (`process.argv.slice(2)`), then study how a lib like `commander` structures it — but the code here is yours.
- Model tasks as a typed array and re-derive IDs from `max(id) + 1`.
- Use a small `load()` / `save()` pair at module scope; save with atomic rename.
- For dates, use ISO strings (`YYYY-MM-DD`) — they sort lexicographically.

## Stretch goals

- Add `--tag work` and `task list --tag work` for filtering by tag.
- Add `task due-today` subcommand.
- Add `--json` output to `list` for scripting.
- Write an undo: `task undo` restores the last destructive command.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts add "Learn streams"
node src/index.ts list
```
