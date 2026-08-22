# Stage 03 — CLI Tooling

Build small command-line tools.

## Concepts — one tiny script each

- `argv.ts` — reading `process.argv`
- `stdin-stdout.ts` — read from stdin, write to stdout
- `exit-codes.ts` — `process.exit()` and exit codes (0 = ok, 1 = error)
- `colors.ts` — ANSI colors for prettier output
- `shebang.ts` — `#!/usr/bin/env node` so the OS runs your file as a program

## How to work it

- Write one script per concept in `src/`, each printing its output
- Every script must pass `npm run typecheck`

## How to run

```bash
npm run typecheck
node src/argv.ts --flag value   # repeat per script
```

## Move on when

You can spin up a small CLI from scratch without looking up the basics.