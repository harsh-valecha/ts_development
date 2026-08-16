# Project 02 — Live Notifications

> Stage: 10 · Difficulty: ⭐⭐

## Assignment

Build a **live notification system**: server pushes realtime events to connected clients. This is the pattern behind order status updates, alerts, and activity feeds.

## Scenario

A mock **order tracking system**. Admin/console generates orders; customers subscribe and get live updates.

## Features

- **Subscription**: client connects with `?userId=<id>` and joins a personal room (`room:user:<id>`).
- **Order events**: a mock order service (in-memory store + a script that randomly advances order status) emits:
  - `order.created` → { orderId, totalCents }
  - `order.status_changed` → { orderId, from, to }  (PENDING → PAID → SHIPPED → DELIVERED)
- **Broadcast rules**:
  - status changes → the order's owner room
  - a "new order" → an admin room (`room:admin`), so staff see live orders
- **Acknowledgements & reconnect**: clients send `ack` events; server tracks delivered message IDs so a reconnecting client can ask for missed events (`GET /api/notifications/:userId` returns missed ones).
- **Connection health**: heartbeat every 30s (`ping`/`pong`); dead connections cleaned up.

## Requirements / acceptance criteria

- [ ] Personal rooms + admin room routing correct (use 2 browsers: one customer, one admin)
- [ ] `ack` + missed-notification replay actually works after a simulated disconnect (stop/start the socket)
- [ ] Heartbeat/ping keeps connections alive and detects dead ones
- [ ] All event payloads typed in shared types
- [ ] A `POST /api/orders` (or a dev script) creates an order and kicks off status transitions
- [ ] Logs are readable: each connection/disconnect/event logged with timestamp
- [ ] `npx tsc --noEmit` passes

## Hints

- Rooms are your routing primitive: `socket.join("room:user:" + userId)`.
- Maintain `Map<userId, Set<eventId>>` or store events in memory with a sequence id to implement replay.
- Simulate status progression with `setInterval` or a manual dev script hitting a `POST /api/orders/:id/advance`.
- Client "missed events" REST endpoint returns events with `id > lastAckId` from memory.
- Keep events in a capped in-memory list (e.g. last 100 per user).

## Stretch goals

- Add a notification *preferences* concept (mute certain event types).
- Add a sound/visual highlight on the admin page when a new order arrives.
- Persist events to SQLite and serve history via REST.
- Sketch (in the README) how you'd scale this with Redis pub/sub across multiple server instances (real scaling — Stage 11 groundwork).

## How to run

```bash
npm init -y
npm install express socket.io
npm install -D typescript tsx @types/node @types/express
node src/index.ts
# tab 1 (customer): open ?userId=1
# tab 2 (admin): open ?admin=1
# create an order via curl POST /api/orders, watch both tabs update live
```
