# Project 04 — Big File Streamer

> Stage: 02

Transform a file too big for memory using only streams.

## What to build

- `node src/index.ts huge.txt [--upper] [--lower] [--reverse-lines] [--compress] [--decompress] [--report-mem]`
- Default: copy the file unchanged
- `--compress`/`--decompress`: gzip via `zlib` through the pipeline

## Rules

- Streams only — `createReadStream`, `createWriteStream`, `Transform`, `pipeline` — no `readFile` on the big file
- Backpressure handled correctly (no data lost)
- `--report-mem` proves memory stays flat on a 500MB file
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node -e "const fs=require('fs');const w=fs.createWriteStream('huge.txt');for(let i=0;i<5e6;i++)w.write('line number '+i+'\n');w.end()"
node src/index.ts huge.txt --upper --compress --report-mem
```