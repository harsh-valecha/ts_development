# Project 03 — Log Parser

> Stage: 02 · Difficulty: ⭐⭐

## Assignment

Build a CLI that analyzes a server log file and produces a human-readable report.

## Log format (Nginx-style, generate your own sample)

```
127.0.0.1 - - [16/Aug/2026:13:00:00 +0000] "GET /api/users HTTP/1.1" 200 512 "-" "curl/8.0"
192.168.1.5 - - [16/Aug/2026:13:00:02 +0000] "POST /api/login HTTP/1.1" 401 120 "-" "Mozilla/5.0"
```

## CLI interface

```
node src/index.ts access.log [--top-ips 10] [--top-paths 10] [--errors] [--hourly] [--json]
```

## Report must include

1. **Total requests**, unique IPs, unique paths.
2. **Top N IPs** by request count.
3. **Top N paths** by request count.
4. **Status code distribution** (200: 1500, 404: 40, 500: 3, ...).
5. `--errors`: list every line with a 4xx/5xx status (path, IP, code, timestamp).
6. `--hourly`: requests per hour (`13:00`, `14:00`, ...).
7. `--json`: output the whole report as JSON (instead of a table).

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes (strict)
- [ ] Uses **streams** to read the file (`readline` over `createReadStream`) — must handle a 1GB log without running out of memory
- [ ] Parses each line with a regex into a typed `LogEntry`
- [ ] Aggregations are typed and correct (spot-check counts by hand)
- [ ] Report renders as a clean aligned table (or JSON with `--json`)
- [ ] Unknown/malformed lines are counted and reported, not crashed on
- [ ] Helpful error if file doesn't exist

## Hints

- Typed model:

```ts
interface LogEntry {
  ip: string;
  date: Date;
  method: "GET" | "POST" | ...;
  path: string;
  status: number;
  bytes: number;
  userAgent: string;
}
```

- A `Record<string, number>` map per metric, then sort descending for "top N".
- `readline` lets you process line-by-line from a stream — memory stays flat regardless of file size.
- Test your regex against all 4–5 sample lines you invent (including edge cases: path with query string, missing user-agent).

## Stretch goals

- Add `--filter-status 500` to see only matching entries.
- Add `--from` / `--to` date filtering.
- Write a second script `src/generate-log.ts` that generates a realistic 100k-line log for benchmarking.
- Report slowest requests by `bytes` (hint: add a `response_time_ms` field to your generator).

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts access.log --top-ips 5 --hourly
node src/index.ts access.log --json
```
