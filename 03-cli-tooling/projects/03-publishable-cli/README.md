# Project 03 — Publishable CLI

> Stage: 03 · Difficulty: ⭐⭐

## Assignment

Take one of your earlier CLIs (task-cli is ideal) and turn it into a **polished, installable package** — the way real npm tools ship. This project is about the 20% of polish that makes a tool feel professional.

## What to build

Choose your favorite existing CLI and upgrade it with:

1. **Proper packaging**
   - `bin` field in `package.json` → a global command name (`task-cli`)
   - Shebang `#!/usr/bin/env node` at the top of the entry file
   - `npm link` so `task-cli` works anywhere
   - `chmod +x` handling (npm does it, but understand why)

2. **Great UX**
   - `--version` prints a version from package.json
   - `--help` prints usage with examples (well-formatted, not a wall of text)
   - Flag aliases: `-h`, `-v`, short flags for common options
   - Colored output (`\x1b` codes or a tiny color helper — no heavy lib needed) with a `--no-color` flag
   - Spinner or progress for slow operations (optional)

3. **Robustness**
   - Validate inputs; fail with a *helpful* message and exit code 1
   - Handle `SIGINT` (Ctrl-C) gracefully — clean up, exit cleanly
   - Consistent exit codes (0 success, 1 user error, 2 internal error)
   - Unit-test the pure logic functions (bonus points, or save for Stage 09)

4. **Docs**
   - A `README.md` in the project describing install, usage, and examples
   - Optionally `--completion` that prints a shell completion script (stretch)

## Requirements / acceptance criteria

- [ ] `task-cli` runs from any directory after `npm link`
- [ ] `--version` and `--help` work and look professional
- [ ] Colors, with `--no-color` fallback
- [ ] Ctrl-C exits cleanly (no stack traces)
- [ ] Every user error gives a helpful message, not a crash
- [ ] `npx tsc --noEmit` passes; `npm run build` produces runnable output (or document the node-runs-ts approach)
- [ ] README documents install + usage

## Hints

- `package.json`:

```jsonc
{
  "name": "task-cli",
  "version": "1.0.0",
  "bin": { "task-cli": "./src/index.ts" },
  "scripts": { "build": "tsc", "dev": "tsx src/index.ts" }
}
```

- Test `npm link` failures: change to a directory, type `task-cli --help`.
- A tiny `colors.ts` with `red = (s) => "\x1b[31m" + s + "\x1b[0m"` is all you need.

## Stretch goals

- Ship it: `npm publish` to a test scope (`npm publish --dry-run` first).
- Add a completion script generator.
- Add `--json` output mode for every command (scripting-friendly tools get adopted).

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
npm link                 # makes `task-cli` available globally
task-cli --help
task-cli --version
```
