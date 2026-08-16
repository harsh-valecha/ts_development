# Stage 02 — Node Core & File Handling

> Difficulty: ⭐⭐ · Est. time: 2–3 weeks · Projects: 4

## Why this stage exists

This is where you go from "writing TS" to "building backend software." Files are the foundation of most backend work: logs, configs, uploads, databases. You'll learn Node's async model (event loop, callbacks, promises, streams) by working with the filesystem — the perfect low-risk playground.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| Event loop & async I/O | How Node does many things at once without threads |
| `fs/promises` vs `fs` | Promise-based vs callback-based file API |
| `path` module | Joining, resolving, parsing paths cross-platform |
| `fs.readFile` vs `readFileSync` | Why sync blocks everything |
| Streams | Reading/writing data piece-by-piece (memory friendly) |
| Buffers | Raw binary data handling |
| `zlib` | Compression (bonus) |
| `os` module | System info |
| Try/catch with async | Error handling patterns in async code |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-file-organizer` | Scan a folder, sort files into subfolders by type/date |
| 2 | `02-csv-json-converter` | Convert CSV ↔ JSON, with proper typing |
| 3 | `03-log-parser` | Parse a big server log file, extract stats, write a report |
| 4 | `04-big-file-streamer` | Copy/transform a huge file with streams (memory-safe) |

Each project README has the full spec. Build them in order — each builds on the last.

## Key mental model

```text
call stack → Node API (fs etc.) → callback queue → event loop picks up work
```

Everything async in Node returns either a callback, a promise, or a stream. You'll use **promises + `async/await`** (modern) and **streams** (for big data). Avoid sync variants except at startup or in CLI tools.

## Done checklist

- [ ] I can read/write/create/delete files and directories with `fs/promises`
- [ ] I can explain the difference between sync, callback, promise, and stream APIs
- [ ] I've built a program that processes a file larger than memory (via streams)
- [ ] I handle errors with try/catch around async operations
- [ ] All 4 projects pass `tsc --noEmit` and run correctly
- [ ] I can explain why `readFileSync` in a server is a problem

## When to move on

When you're comfortable moving data in and out of files without looking things up constantly. Then open `../03-cli-tooling/README.md`.

## Resources

- [Node.js fs docs](https://nodejs.org/api/fs.html)
- [Node.js streams docs](https://nodejs.org/api/stream.html)
- [Node.js — Async context / event loop](https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick)
- [Streams handout (Node.js)](https://github.com/substack/stream-handbook)
