# Project 02 — CSV ⇄ JSON Converter

> Stage: 02

A CLI that converts CSV to JSON and back, fully typed.

## What to build

- `node src/index.ts csv-to-json data.csv [output.json]`
- `node src/index.ts json-to-csv data.json [output.csv]`
- CSV→JSON: header row → array of objects; handle quoted fields with commas, missing fields, CRLF/LF
- JSON→CSV: column order = union of all keys; nested objects JSON-encoded as quoted strings

## Rules

- Write your own CSV parser (state machine: in-quote vs not) — no CSV library
- Typed row model: `type CsvRow = Record<string, string | null>`
- Round-trip: `csv-to-json data.csv | json-to-csv` reproduces equivalent data
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts csv-to-json sample.csv
node src/index.ts json-to-csv sample.json
```