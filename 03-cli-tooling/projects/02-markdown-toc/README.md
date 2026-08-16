# Project 02 — Markdown TOC Generator

> Stage: 03 · Difficulty: ⭐⭐

## Assignment

Build a CLI that reads a Markdown file and **injects or regenerates a table of contents** based on its headings.

## Commands

```
node src/index.ts README.md [--insert] [--max-depth 3] [--no-anchors] [--stdout]
```

- Default: print the generated TOC to stdout.
- `--insert`: replace any existing `<!-- TOC -->` section in the file, or insert one at the top if none exists.
- `--max-depth N`: only include headings up to depth N.
- `--no-anchors`: render plain text entries without markdown links.

## TOC format

```markdown
## Table of Contents
- [1. Getting Started](#1-getting-started)
  - [Setup](#setup)
- [2. API](#2-api)
```

- Entries reflect heading hierarchy (nested lists by depth).
- Anchor links match GitHub's slug rules for headings.
- Multiple `#` headings with the same text get unique anchors (`## Install` → `#install`, second one → `#install-1`).

## Requirements / acceptance criteria

- [ ] `npx tsc --noEmit` passes (strict)
- [ ] Parses headings correctly (skips headings inside code blocks/fenced blocks)
- [ ] `--insert` is idempotent: run it twice, file contains exactly one TOC
- [ ] Handles files with no headings gracefully
- [ ] Preserves the rest of the file byte-for-byte when inserting (don't clobber it)
- [ ] GitHub-style anchor generation for the default slugging
- [ ] Non-zero exit + friendly message if the file doesn't exist

## Hints

- Read line by line; track whether you're inside a ``` fence ``` to skip headings there.
- A heading is a line starting with `#` (up to 6), e.g. `## Setup` → depth 2, text `Setup`.
- GitHub slug: lowercase, strip punctuation, spaces → `-`.
- For `--insert`, find the `<!-- TOC -->` marker; if absent, insert right after the first top-level heading or at the top.

## Stretch goals

- Add `--backlinks` to add "back to top" links after each heading.
- Also update the TOC for any file in a whole directory (`--dir docs`).
- Support `- ` list bullets vs `1. ` ordered numbering depending on a flag.

## How to run

```bash
npm init -y
npm install -D typescript tsx @types/node
node src/index.ts README.md            # print TOC
node src/index.ts README.md --insert   # write it into the file
```
