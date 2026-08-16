# Project 02 — RBAC Roles & Permissions

> Stage: 08 · Difficulty: ⭐⭐

## Assignment

Extend your JWT auth project with a **role-based access control (RBAC)** system. Now users have roles, and roles map to permissions. Some routes check roles, others check specific permissions.

## Model

```ts
type Role = "admin" | "editor" | "user";

// permissions derived per role — this mapping is the heart of RBAC
const ROLE_PERMISSIONS: Record<Role, Permission[]> = {
  admin:  ["read", "write", "delete", "moderate"],
  editor: ["read", "write"],
  user:   ["read"],
};

type Permission = "read" | "write" | "delete" | "moderate";
```

Users get a `role` column/field at registration (default `"user"`). Admin can change roles.

## Endpoints

```
POST   /admin/users/:id/role     → set a user's role (admin only)
GET    /admin/users              → list users with roles (admin only)

POST   /posts                    → require permission "write"
PATCH  /posts/:id                → require "write" AND (author OR "admin")
DELETE /posts/:id                → require "delete" OR (author)
POST   /posts/:id/report         → any logged-in user ("moderate" needed to resolve)
GET    /moderation/queue         → require "moderate"
```

## Requirements / acceptance criteria

- [ ] Auth middleware (from project 1) still works
- [ ] New **`requireRole("admin")`** and **`requirePermission("write")`** middlewares
- [ ] RBAC returns **403** (not 401) when authenticated but not allowed — and 401 when not authenticated
- [ ] Role stored on the user and included in the JWT payload (`role` claim) so permission checks are fast (no DB hit per request)
- [ ] Admin endpoint to change roles works and re-issues tokens (or handles the stale-role problem somehow — document your choice)
- [ ] Permission matrix lives in ONE typed place (`ROLE_PERMISSIONS`) — no magic strings scattered
- [ ] `npx tsc --noEmit` passes

## Hints

- Middleware order: `authenticate` → `authorize(permission)` → handler. Each does one job.
- JWT payload: `{ sub, role, exp }` — read `role` from `req.user` after auth.
- When a role changes, the old token still says the old role → **document** your tradeoff: either short access tokens (15 min, fine), or a token-version counter stored on the user.
- For "author OR admin": the permission middleware passes, then the handler checks ownership. Combine them with a helper `canModify(req, doc)`.

## Stretch goals

- Add **resource-level** permissions (a `Post` can have its own `ownerId` + optional `acl`).
- Add `PATCH /admin/users/:id/permissions` overriding permissions for one user (hybrid RBAC/ABAC).
- Write integration tests proving 401 vs 403 paths (Stage 09 tooling).

## How to run

```bash
# build on your Stage 08 project 1. Same stack + roles.
node src/index.ts

curl -X POST localhost:3000/admin/users/2/role -H "Authorization: Bearer <adminToken>" -d '{"role":"editor"}'
curl -X POST localhost:3000/posts -H "Authorization: Bearer <editorToken>" -d '{"title":"draft"}'
curl -X DELETE localhost:3000/posts/1 -H "Authorization: Bearer <userToken>"   # 403
```
