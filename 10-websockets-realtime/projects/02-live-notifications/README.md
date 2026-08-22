# Project 02 — Live Notifications

> Stage: 10

A server that pushes live order events to connected clients.

## What to build

- Clients connect with `?userId=<id>` and join a personal room (`room:user:<id>`); admins join `room:admin`
- A mock order service emits `order.created` and `order.status_changed` events (PENDING → PAID → SHIPPED → DELIVERED)
- Status changes go to the owner's room; new orders go to the admin room
- Clients send `ack` events; a reconnecting client can fetch missed events
- Heartbeat every 30s; dead connections cleaned up

## Rules

- `ack` + missed-event replay actually works after a simulated disconnect
- All payloads typed in shared types
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express socket.io
npm install -D typescript tsx @types/node @types/express
node src/index.ts
# tab 1 (customer): open ?userId=1 · tab 2 (admin): open ?admin=1
# create an order via curl POST /api/orders, watch both tabs update live
```