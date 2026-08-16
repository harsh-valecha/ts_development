# Project 03 — Drizzle E-commerce

> Stage: 06 · Difficulty: ⭐⭐⭐

## Assignment

Build an **e-commerce backend** using **Drizzle ORM** on Postgres (or SQLite). This project is harder than the blog: it has real business rules, order/line-item modeling, and stock management — the kind of domain logic that makes a backend dev.

## Data model

```
Product  (id, name, priceCents: int, stock: int, category, createdAt)
User     (id, email, name)
CartItem (id, userId → User, productId → Product, quantity)   // one cart row per product
Order    (id, userId, status: PENDING|PAID|SHIPPED|CANCELLED, totalCents, createdAt)
OrderItem(id, orderId → Order, productId → Product, name, priceCents, quantity) // snapshot!
```

Note: `OrderItem` **snapshots** the product name/price at purchase time — never read product live for order history.

## Endpoints

```
GET    /products               → list (?category=&minPrice=&maxPrice=&sort=)
GET    /products/:id           → detail
POST   /cart/items             → add to cart (userId from token)
GET    /cart                   → cart with product details + subtotal
PATCH  /cart/items/:id         → change quantity
DELETE /cart/items/:id         → remove
POST   /orders/checkout        → create order from cart, decrement stock, clear cart (ALL in one transaction)
GET    /orders                 → my orders
GET    /orders/:id             → order with its items
POST   /orders/:id/cancel      → cancel if PENDING, restock items
```

## Requirements / acceptance criteria

- [ ] Drizzle schema with all models + relations (see below)
- [ ] **Checkout is transactional**: creating the order, writing order items, decrementing stock, and clearing the cart happen in one transaction — a failure anywhere rolls everything back
- [ ] **Stock validation**: checkout rejects if any item exceeds stock (400 with a message); stock can't go negative
- [ ] Cancel restores stock and only works on PENDING orders
- [ ] Money handled as **integer cents** (never floats — real-world rule!)
- [ ] Simple token auth (userId from a header/token; full auth is Stage 08)
- [ ] `npx tsc --noEmit` passes
- [ ] Migrations via Drizzle (`drizzle-kit`)

## Hints

- Drizzle is SQL-first: `schema.ts` → `npx drizzle-kit generate` → `migrate`. The schema is just TypeScript.
- Transactions: use `db.transaction(async (tx) => { ... })`.
- For stock, do `SELECT ... FOR UPDATE` semantics (Drizzle `for("update")`) inside the transaction to prevent overselling under concurrency — a great learning moment. Test by firing 2 checkout requests in parallel.
- Relations: import from `drizzle-orm/relations` for `getCartWithProducts`-style queries.

## Stretch goals

- Add `GET /admin/orders` with status filtering + date range.
- Add sales stats: `GET /admin/stats` → revenue by day, top products (`GROUP BY` + `SUM`).
- Add a `POST /products/:id/restock` admin endpoint.
- Write a small concurrency test (two parallel checkouts for the last item in stock).

## How to run

```bash
npm init -y
npm install express zod pg @libsql/client drizzle-orm
npm install -D typescript tsx @types/node @types/express @types/pg drizzle-kit
# define drizzle.config.ts, generate + run migrations
node src/index.ts
```
