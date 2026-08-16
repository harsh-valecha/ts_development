# Stage 10 — WebSockets & Realtime

> Difficulty: ⭐⭐ · Est. time: 2 weeks · Projects: 2

## Why this stage exists

HTTP is request/response: the client asks, the server answers. But chat messages, live notifications, multiplayer games, and stock tickers need the **server to push data to the client** instantly. WebSockets open a persistent two-way connection. This is where apps go from "web service" to "product."

## Concepts you'll learn

| Concept | What it means |
|---------|---------------|
| WebSocket protocol | Persistent, bidirectional connection over TCP |
| HTTP vs WebSocket | When each is appropriate |
| socket.io | The standard library: auto-reconnect, rooms, fallbacks |
| Events | `socket.emit`, `socket.on` — your own message protocol |
| Rooms | Grouping sockets (e.g. per chat room) |
| Broadcasting | Sending to everyone / a room / except sender |
| Connection lifecycle | `connect`, `disconnect`, heartbeats, reconnection |
| Scaling hint | WebSockets + Redis pub/sub (concept — real scaling is Stage 11+) |

## The projects (do them in order)

| # | Project | What you build |
|---|---------|----------------|
| 1 | `01-chat-app` | Realtime chat: multiple rooms, usernames, join/leave events |
| 2 | `02-live-notifications` | Server pushes live events to clients (order updates, alerts) with reconnect handling |

## Minimum viable frontend

You're a backend learner — keep the UI **minimal**. A single `index.html` with vanilla JS and `<script src="/socket.io/socket.io.js">` is enough to see your WebSocket logic work. Resist the urge to build a full frontend here; that's a different roadmap.

## Message protocol design

Design your own event names & payload shapes (types!). Example:

```ts
type ChatMessage = { room: string; user: string; text: string; at: number };
```

Define payload types in a shared file so both server and client stay in sync. This is great TypeScript practice.

## Done checklist

- [ ] I've built a chat app with multiple rooms and join/leave events
- [ ] I handle `disconnect` cleanly (remove user from room)
- [ ] I've built a server→client push feature (notifications)
- [ ] My client reconnects when the server restarts (socket.io handles this — verify it works)
- [ ] My event payloads are typed
- [ ] Both projects run and pass `tsc --noEmit`

## When to move on

When you can explain what makes WebSockets different from HTTP polling. Then open `../11-advanced-backend/README.md`.

## Resources

- [MDN — WebSockets](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API)
- [Socket.IO docs](https://socket.io/docs/v4/)
- [ws (low-level WebSocket lib)](https://github.com/websockets/ws) — explore after socket.io
