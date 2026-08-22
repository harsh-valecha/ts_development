# Project 02 — Markdown TOC Generator

> Stage: 03

A CLI that generates a table of contents from a Markdown file's headings.

## What to build

- `node src/index.ts README.md [--insert] [--max-depth N] [--stdout]`
- Default: print the TOC to stdout
- `--insert`: write a `<!-- TOC -->` section into the file (idempotent — running twice gives exactly one TOC)
- Anchor links follow GitHub's slug rules; duplicate headings get `-1`, `-2` suffixes

## Rules

- Skip headings inside code fences
- Preserve the rest of the file byte-for-byte when inserting
- Handle files with no headings gracefully
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts README.md
node src/index.ts README.md --insert
```