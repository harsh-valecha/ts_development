# Project 04 — Big File Streamer

> Stage: 02 · Difficulty: ⭐⭐

## Assignment

Build a tool that transforms a **very large file** (hundreds of MB) using Node **streams**, proving you can process data that would never fit in memory.

## The task

```
node src/index.ts huge.txt [--upper] [--lower] [--reverse-lines] [--compress] [--decompress]
```

- `--upper`: uppercase every line.
- `--lower`: lowercase every line.
- `--reverse-lines`: reverse the order of lines (harder — see hints).
- `--compress`: write output as gzip (`.gz`).
- `--decompress`: read a `.gz` file and decompress it.
- Default: copy `huge.txt` to `huge.txt.out` unchanged.

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes (strict)
- [ ] Uses **only streams** — `createReadStream`, `createWriteStream`, `Transform`, `pipeline` (from `node:stream/promises`) — no `readFile`/`writeFile` on the big file
- [ ] Peak memory stays low: process a 500MB file and report memory usage (`--report-mem`), prove it doesn't balloon
- [ ] `--compress` / `--decompress` work using `zlib` through the stream pipeline
- [ ] Handles `backpressure` correctly (the readable side pauses when the writable side is slow — verify no data is lost)
- [ ] Correctly propagates stream errors (pipeline rejects)

## Hints

- A `Transform` is a duplex stream: read chunks in, write transformed chunks out. `chunk` is a `Buffer` — use `chunk.toString()` and remember line boundaries may split mid-line.
- For line-based transforms, use `Transform` with `readline` + a `passThrough` pipeline, or handle the partial-line-at-chunk-end problem yourself. The `readline` + `Transform` combo is the clean way.
- `pipeline(readable, transform, writable)` handles backpressure and cleanup for you.
- For `--reverse-lines` on a huge file, you cannot hold all lines in memory — either use a temporary file with an index, or process in chunked batches (document your approach).
- `process.memoryUsage().heapUsed` in `--report-mem` shows current heap usage.

## Stretch goals

- Add `--line-numbers` (prefix each line with its number) — forces you to handle the mid-line-chunk problem correctly.
- Add `--split N` to split input into N roughly-equal output files.
- Compare throughput: naive `readFile` on a 200MB file vs your stream version. Note the memory difference in a comment.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
# make a big test file:
node -e "const fs=require('fs');const w=fs.createWriteStream('huge.txt');for(let i=0;i<5e6;i++)w.write('line number '+i+'\n');w.end()"
node src/index.ts huge.txt --upper --compress --report-mem
node src/index.ts huge.txt.gz --decompress --reverse-lines --report-mem
```
