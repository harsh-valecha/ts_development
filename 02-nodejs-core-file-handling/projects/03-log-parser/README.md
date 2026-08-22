# Project 03 — Log Parser

> Stage: 02

A CLI that analyzes a big server log file and prints a report.

## What to build

- `node src/index.ts access.log [--top-ips 10] [--top-paths 10] [--errors] [--hourly] [--json]`
- Report: total requests, unique IPs/paths, top IPs, top paths, status-code distribution
- `--errors`: every line with a 4xx/5xx status · `--hourly`: requests per hour · `--json`: JSON output
- Parse each line into a typed `LogEntry` with a regex

## Rules

- Read with streams (`readline` over `createReadStream`) — must handle a 1GB log in flat memory
- Count malformed lines, never crash on them
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts access.log --top-ips 5 --hourly
node src/index.ts access.log --json
```