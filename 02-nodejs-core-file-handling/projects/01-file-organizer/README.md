# Project 01 — File Organizer

> Stage: 02 · Difficulty: ⭐⭐

## Assignment

Build a CLI tool that organizes a messy folder: it scans a directory, categorizes every file by type (and/or modification date), and moves them into sorted subfolders.

## Example behavior

```
Before:  ~/Downloads/  (1000 random files)
After:
  ~/Downloads/
  ├── images/        # .png .jpg .gif .webp .svg
  ├── documents/     # .pdf .doc .txt .md
  ├── videos/        # .mp4 .mov .webm
  ├── audio/         # .mp3 .wav .flac
  ├── archives/      # .zip .tar .gz
  ├── code/          # .ts .js .py .json
  └── other/         # everything else
```

## CLI interface

```
node src/index.ts <target-dir> [--by-type | --by-date] [--dry-run]
```

- `--by-date`: sort into `2026/08/16/` style folders by modified date instead of type.
- `--dry-run`: don't move anything — just print what *would* happen.
- Must handle: nested subdirectories, hidden files (skip `.`/`..`), and paths with spaces.

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes (strict mode)
- [ ] Uses `fs/promises` and `path` (async everywhere; no sync variants except where unavoidable)
- [ ] Categorizes by extension into the folders above
- [ ] `--by-date` works
- [ ] `--dry-run` works and moves nothing
- [ ] Handles the target folder being nested (recurses subdirs)
- [ ] Prints a summary: files found, files moved, folders created
- [ ] No files are *lost* — nothing overwritten silently (skip + report name collisions)

## Hints

- `fs.readdir(dir, { withFileTypes: true })` returns entries with `isDirectory()`.
- Use `path.extname(file).toLowerCase()` for extension checks.
- `fs.mkdir(dest, { recursive: true })` creates parents too.
- `fs.rename(oldPath, newPath)` works for same-filesystem moves.
- Build the category mapping as a `Record<string, string>` — one source of truth.

## Stretch goals

- Add `--undo` (logs the moves to a JSON journal and can reverse them).
- Sort by BOTH type and date: `images/2026/08/`.
- Add size detection: `--big-files` moves anything > 100MB into `large/`.
- Add tests (you'll learn testing in Stage 09 — a head start is fine).

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
mkdir -p /tmp/messy && touch /tmp/messy/{a.png,b.jpg,c.pdf,d.ts,e.mp4}
node src/index.ts /tmp/messy --dry-run
node src/index.ts /tmp/messy
```
