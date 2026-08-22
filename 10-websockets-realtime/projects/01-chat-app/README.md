# Project 01 — Realtime Chat App

> Stage: 10

A realtime chat app with socket.io — rooms, usernames, join/leave events.

## What to build

- Multiple rooms; users join a room with a chosen username
- Messages broadcast to the room, not globally
- System messages for join/leave; typing indicator
- Last 50 messages per room kept in memory and sent on join

## Rules

- Design and type your event protocol (e.g. `{ room, user, text, at }`) in a shared `types.ts`
- `io.to(room).emit(...)` targets a room; disconnect leaves all rooms cleanly
- Nickname validation (non-empty, unique per room)
- Cap message rate (~5 msgs / 5s) to prevent spam
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express socket.io
npm install -D typescript tsx @types/node @types/express
node src/index.ts
# open http://localhost:3000 in two tabs — different users, same room
```