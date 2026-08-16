# Project 01 — Realtime Chat App

> Stage: 10 · Difficulty: ⭐⭐

## Assignment

Build a **realtime chat application** with `socket.io` (Express + socket.io server, minimal HTML/JS client). Multiple rooms, usernames, and join/leave events — the classic realtime app.

## Features

- **Multiple rooms**: `GET /` shows a room list; users join a room.
- **Username**: chosen at connect (query param `?user=Alice` or a prompt on the page).
- **Messages**: broadcast to the room, not globally.
- **Events**: system messages for joins/leaves; typing indicator.
- **History**: last 50 messages per room kept in memory and sent on join.

## Event protocol (design it, type it)

```ts
// server → all in room
"message"        → { id, user, text, at }
"system"         → { text, at }
"typing"         → { user, room }

// client → server
"join"           → { room, user }
"send-message"   → { room, text }
"typing-start"   → { room }
"typing-stop"    → { room }
```

## Requirements / acceptance criteria

- [ ] Express + socket.io working; static `public/index.html` served
- [ ] Rooms work: messages only reach the right room (test with 2 browser tabs in different rooms)
- [ ] Join/leave system messages appear; disconnect removes the user from rooms
- [ ] Typing indicator shown/cleared with a timeout (broadcast to the room)
- [ ] History: joining a room loads the last 50 messages
- [ ] Nickname validation (non-empty, unique per room)
- [ ] Message rate cap: max ~5 msgs / 5s per socket (prevent spam)
- [ ] `npx tsc --noEmit` passes

## Hints

- `io.to(room).emit("message", payload)` targets a room.
- Track memberships: `socket.join(room)`, `socket.leave(room)`; keep a `Map<room, Set<user>>` for presence.
- On `disconnect`, leave all rooms and emit system messages.
- A `Message` type in a shared `src/types.ts` used by both server and the client script.
- Typing: emit `typing-start` once, and on each subsequent key you can debounce; clear after 2s of no typing or on `typing-stop`.
- The client is vanilla JS in `public/` — keep it minimal but readable.

## Stretch goals

- Add `@`-mentions that highlight and notify the mentioned user.
- Add message persistence (SQLite — reuse Stage 06 skills).
- Show "X users online" per room.
- Add `/me` style commands (`/clear`, `/nick`).

## How to run

```bash
npm init -y
npm install express socket.io
npm install -D typescript tsx @types/node @types/express
node src/index.ts
# open http://localhost:3000 in two tabs — different users, same room
```
