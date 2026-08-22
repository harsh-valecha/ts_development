# Project 03 — Drizzle E-commerce

> Stage: 06

An e-commerce backend with Drizzle — real business rules, orders, and stock.

## What to build

- Models: `Product`, `User`, `CartItem`, `Order`, `OrderItem` (snapshots product name/price at purchase)
- Endpoints: product list/detail, add-to-cart, cart view/edit, checkout, my orders, cancel order

## Rules

- **Checkout is one transaction**: create order + order items + decrement stock + clear cart, all or nothing
- Reject checkout if any item exceeds stock; stock never goes negative
- Money as integer cents, never floats
- Cancel restores stock and only works on PENDING orders
- Migrations via Drizzle (`drizzle-kit`)
- `npx tsc --noEmit` passes

## How to run

```bash
npm init -y
npm install express zod pg @libsql/client drizzle-orm
npm install -D typescript tsx @types/node @types/express @types/pg drizzle-kit
# define drizzle.config.ts, generate + run migrations
node src/index.ts
```