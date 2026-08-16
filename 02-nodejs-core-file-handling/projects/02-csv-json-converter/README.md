# Project 02 — CSV ⇄ JSON Converter

> Stage: 02 · Difficulty: ⭐⭐

## Assignment

Build a CLI that converts between CSV and JSON, with full typing.

```
node src/index.ts csv-to-json data.csv [output.json]
node src/index.ts json-to-csv data.json [output.csv]
```

## Requirements — CSV → JSON

- Read CSV (with a header row), output an array of objects: `[{ "name": "Alice", "age": "30" }, ...]`.
- Handle **quoted fields** containing commas and quotes: `"last, first"`.
- Handle **missing fields** (empty cells → `null` or `""`, you decide, document it).
- Handle **CRLF and LF** line endings.
- `output.json` is optional; without it, print to stdout.

## Requirements — JSON → CSV

- Accept an array of objects (a JSON file or stdin).
- Column order = union of all keys in document order.
- Fields missing from a row → empty cell.
- Objects/arrays inside a field → JSON-encode them as a quoted string.

## Requirements — both

- [ ] `npx tsc --noEmit` passes (strict)
- [ ] Typed row model: `type CsvRow = Record<string, string | null>` for reading, plus your own `interface` for a typed example dataset
- [ ] Round-trip test: `csv-to-json data.csv | json-to-csv` reproduces equivalent data
- [ ] Meaningful errors for malformed input (unclosed quote, wrong JSON shape, empty file)

## Hints

- Write your own CSV parser — do NOT use a CSV library. A state machine (in-quote vs not-in-quote) is the classic approach.
- Streaming output for big files: write line-by-line with `createWriteStream` rather than building one giant string.
- For JSON→CSV, consider processing with `readline` if files are large.

## Stretch goals

- Add `--pretty` for indented JSON output.
- Handle **CSV with escaped quotes** (`""` inside a quoted field).
- Add `--detect-types` to coerce `"30"` → `30` when all values in a column look numeric.
- Benchmark: convert a 100MB CSV and report time + memory usage.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts csv-to-json sample.csv
node src/index.ts json-to-csv sample.json
```
