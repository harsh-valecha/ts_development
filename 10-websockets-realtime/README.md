# Stage 10 — WebSockets & Realtime

Let the server push data to the client instantly over a persistent connection.

## Concepts — one tiny script each

- `echo-server.ts` — a socket.io server that echoes messages back
- `rooms.ts` — group sockets into rooms and broadcast to a room

## How to work it

- Write one script per concept in `src/`, each printing its output
- Keep the frontend minimal — a single `index.html` with vanilla JS is enough
- Type your event payloads in a shared file
- Every script must pass `npm run typecheck`

## How to run

```bash
npm install socket.io
npm run typecheck
node src/echo-server.ts   # then open the index.html in a browser
```

## Move on when

You can explain what makes WebSockets different from HTTP polling.