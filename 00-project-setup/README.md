# Stage 00 — Project Setup

> Difficulty: ⭐ · Est. time: 1–2 hours · No code files needed beyond a couple of throwaway scripts.

## Why this stage exists

Before you learn TypeScript, your tools need to work. Half the frustration beginners feel comes from misconfigured editors and terminals, not from the language itself. This stage removes that friction so the rest of the roadmap is smooth.

## What you'll set up

- Node.js (LTS or newer) via nvm
- A code editor with TypeScript support (VS Code recommended)
- Native TypeScript execution (`node file.ts`)
- `tsc` for type-checking
- A git repository for this whole `ts_development` workspace
- Good habits: `.gitignore`, `.nvmrc`, format-on-save

## Setup steps

### 1. Install nvm + Node

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
# restart terminal
nvm install --lts
nvm use --lts
node --version   # v22.6.0+ required (v26 is ideal)
```

Create `.nvmrc` in the repo root:

```bash
echo "22" > .nvmrc    # or your installed major version
```

### 2. Create the git repo (once, at repo root)

```bash
cd ~/harsh_work/ts_development
git init
```

Create a root `.gitignore`:

```gitignore
node_modules/
.env
*.log
dist/
.DS_Store
```

### 3. Editor setup (VS Code)

Install these extensions:
- **Error Lens** — shows type errors inline
- **Prettier** — code formatter
- **GitLens** — git context

Enable format-on-save for TypeScript: `Cmd+Shift+P` → "Preferences: Open User Settings (JSON)" → add:

```jsonc
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 4. Verify native TypeScript

```bash
mkdir -p /tmp/ts-test && cd /tmp/ts-test
echo 'const greet = (name: string): string => `Hello, ${name}`;
console.log(greet("TS"));' > hello.ts
node hello.ts
# expect: Hello, TS
```

If Node complains, it's too old — update Node (the error usually tells you to add a flag, but updating is better).

### 5. Install TS tooling (use npx, no global installs)

```bash
npm init -y
npm install -D typescript tsx @types/node
npx tsc --version    # prints TypeScript version
```

`tsx` runs TS with hot-reload in dev. `tsc` type-checks your code without running it.

## The exercise

Make a tiny throwaway script in `/tmp` (NOT in this repo — it's just practice):

1. Write a TS file that defines an interface, a function that uses it, and logs the result.
2. Run it with `node`.
3. Type-check it with `npx tsc --noEmit`.

## Done checklist

- [ ] `node --version` works and is ≥ 22.6
- [ ] `npx tsc --version` works
- [ ] `node hello.ts` runs a `.ts` file natively
- [ ] `git init` done at repo root, `.gitignore` created, first commit made
- [ ] VS Code shows inline type errors and formats on save

## When to move on

When the checklist above is all green, open `../01-typescript-fundamentals/README.md`.

## Resources

- [nvm docs](https://github.com/nvm-sh/nvm)
- [Node.js TypeScript support announcement](https://nodejs.org/en/learn/typescript/run-natively)
- [VS Code + TypeScript docs](https://code.visualstudio.com/docs/languages/typescript)
