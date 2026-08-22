# Project 02 — RBAC Roles & Permissions

> Stage: 08

Add roles and permissions to your JWT auth app.

## What to build

- Roles: `admin` / `editor` / `user`, mapped to permissions in one typed `ROLE_PERMISSIONS` record
- `POST /admin/users/:id/role` (admin only) to change roles
- Protected endpoints: `requireRole("admin")` and `requirePermission("write")` middlewares
- E.g. `POST /posts` needs "write"; `GET /moderation/queue` needs "moderate"

## Rules

- 401 when not authenticated; 403 when authenticated but not allowed
- Include `role` in the JWT so permission checks are fast
- Middleware order: `authenticate` → `authorize(permission)` → handler
- `npx tsc --noEmit` passes

## How to run

```bash
# build on your Stage 08 project 1, same stack + roles
node src/index.ts
curl -X POST localhost:3000/admin/users/2/role -H "Authorization: Bearer <adminToken>" -d '{"role":"editor"}'
curl -X DELETE localhost:3000/posts/1 -H "Authorization: Bearer <userToken>"   # 403
```