# Stage 03 — CLI Tooling

> Difficulty: ⭐⭐ · Est. time: 1–2 weeks · Projects: 3

## Why this stage exists

CLI tools are the perfect bridge between "scripts that touch files" and "applications that serve users." They make you think about user input, output formatting, exit codes, and error handling — all skills you'll use in web APIs. Plus, CLIs are genuinely useful things to build for yourself.

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| `process.argv` | Reading command-line arguments |
| `stdin` / `stdout` / `stderr` | Standard streams; piping data through your tool |
| `process.exit()` & exit codes | Communicating success/failure to the shell |
| Flags & subcommands | Designing a good CLI interface |
| `npm link` | Installing your CLI globally for testing |
| Shebang line | `#!/usr/bin/env node` so the OS runs it as a program |
| ANSI colors | Pretty terminal output |
| Persistence | Storing data (e.g. JSON in a user data file) |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-task-cli` | A task manager CLI: add/list/complete/delete tasks, stored in a JSON file |
| 2 | `02-markdown-toc` | Reads a Markdown file, generates a table of contents, inserts it |
| 3 | `03-publishable-cli` | Polish a CLI into a real installable package (`npm link`, colors, exit codes, help text) |

## Nice design rules for CLIs

- Clear usage: `mycli --help`
- Good errors: explain *what* went wrong and *how* to fix it
- Meaningful exit codes (0 = success, 1 = error)
- Colorful but not childish output
- Idempotent operations where possible (running twice doesn't corrupt data)

## Done checklist

- [ ] I can read and parse `process.argv`
- [ ] I've built a CLI that reads from stdin *and* from a file argument
- [ ] I've published one CLI locally with `npm link` and run it from anywhere
- [ ] My CLI has a `--help` flag and sensible error messages
- [ ] All 3 projects pass `tsc --noEmit`

## When to move on

When you can spin up a small CLI from scratch without looking up the basics. Then open `../04-http-rest-fundamentals/README.md`.

## Resources

- [Node.js process docs](https://nodejs.org/api/process.html)
- [commander.js](https://github.com/tj/commander.js) (library to explore, but build project 1 by hand first)
- [yargs](https://yargs.js.org/) (alternative library)
