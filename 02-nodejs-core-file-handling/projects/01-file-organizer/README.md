# Project 01 — File Organizer

> Stage: 02

A CLI that sorts a messy folder into subfolders by file type.

## What to build

- `node src/index.ts <dir> [--by-date] [--dry-run]`
- Categorize files by extension into `images/`, `documents/`, `videos/`, `audio/`, `archives/`, `code/`, `other/`
- `--by-date`: sort into `2026/08/16/`-style folders instead
- `--dry-run`: print what would happen, move nothing
- Recurse into subdirectories; skip hidden files; never overwrite silently

## Rules

- Use `fs/promises` + `path` (async everywhere)
- Print a summary: files found, moved, folders created
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
mkdir -p /tmp/messy && touch /tmp/messy/{a.png,b.jpg,c.pdf,d.ts,e.mp4}
node src/index.ts /tmp/messy --dry-run
node src/index.ts /tmp/messy
```