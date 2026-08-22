# Stage 02 — Node Core & File Handling

Learn Node's async model by reading and writing files.

## Concepts — one tiny script each

- `read-write.ts` — read/write files with `fs/promises`
- `paths.ts` — `path.join`, `path.resolve`, `path.extname`
- `sync-vs-async.ts` — why `readFileSync` blocks everything, promise API doesn't
- `streams.ts` — copy a big file piece-by-piece (memory friendly)
- `buffer.ts` — working with raw binary data
- `errors.ts` — try/catch around async operations

## How to work it

- Write one script per concept in `src/`, each printing its output
- Prefer promises + `async/await`; use streams for large data
- Every script must pass `npm run typecheck`

## How to run

```bash
npm run typecheck
node src/streams.ts   # repeat per script
```

## Move on when

You can move data in and out of files without looking things up.