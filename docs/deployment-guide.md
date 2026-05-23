# Shopping Mall Deployment Guide

## 1. Backend database compatibility

The backend reads `DATABASE_URL` and automatically normalizes Railway-style
PostgreSQL URLs.

- Local development fallback: `sqlite:///./shop.db`
- Railway example input: `postgres://...` or `postgresql://...`
- Runtime normalization:
  - `postgres://...` -> `postgresql+psycopg://...`
  - `postgresql://...` -> `postgresql+psycopg://...`
  - If `psycopg2` is installed instead, the code can also normalize to
    `postgresql+psycopg2://...`

Relevant file:

- `backend/app/database.py`

## 2. Frontend environment variables

The frontend reads `NEXT_PUBLIC_API_URL` first.

- Local fallback: `http://127.0.0.1:8000`
- Production fallback in this project:
  `https://shoppingmall-production-a89a.up.railway.app`

Relevant files:

- `frontend/src/app/page.tsx`
- `frontend/.env.example`

### Local development

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://127.0.0.1:8000
```

### Production deployment

Create `frontend/.env.production` locally if you want a production reference,
or set the same key directly in your hosting platform:

```env
NEXT_PUBLIC_API_URL=https://shoppingmall-production-a89a.up.railway.app
```

### Current Railway deployment values

- Frontend URL:
  `https://blissful-flow-production-8ffb.up.railway.app`
- Backend URL:
  `https://shoppingmall-production-a89a.up.railway.app`

## 3. GitHub first push

Run these commands from the project root:

```bash
cd /Users/1104263/Desktop/shopping_mall
git init
git branch -M main
git add .
git commit -m "chore: initialize shopping mall monorepo"
git remote add origin https://github.com/<YOUR_GITHUB_ID>/<YOUR_PRIVATE_REPO>.git
git push -u origin main
```

If the remote repository already exists and has a different default branch or
starter files, pull/reconcile that first before pushing.

## 4. Railway deployment checklist

This repository is an isolated monorepo, so configure each service with its own
root directory.

### Backend service

1. Create a new Railway project.
2. Add an empty service or connect the GitHub repo to a service.
3. In the Backend service settings:
   - Set **Root Directory** to `/backend`
   - Confirm the start command uses the backend app
4. Generate a public domain for the backend service.

Recommended backend variables:

- `DATABASE_URL`
  - Usually available automatically after attaching a Railway PostgreSQL
    service.
- `FRONTEND_URLS`
  - Optional comma-separated allowlist for CORS.
  - Example:
    `https://blissful-flow-production-8ffb.up.railway.app`
- `PORT`
  - Railway injects this automatically at runtime.

### PostgreSQL service

1. In the Railway project canvas, click `+ New`.
2. Add a `PostgreSQL` database service.
3. Railway will provision the database and expose these connection variables:
   - `PGHOST`
   - `PGPORT`
   - `PGUSER`
   - `PGPASSWORD`
   - `PGDATABASE`
   - `DATABASE_URL`
4. Open the backend service Variables tab and ensure the backend can reference
   the PostgreSQL service's `DATABASE_URL`.

### Frontend service

1. Add another Railway service connected to the same GitHub repository.
2. In the Frontend service settings:
   - Set **Root Directory** to `/frontend`
3. Generate a public domain for the frontend service.
4. In the Frontend service Variables tab, set:

```env
NEXT_PUBLIC_API_URL=https://shoppingmall-production-a89a.up.railway.app
```

## 5. Deployment order

1. Push the monorepo to GitHub.
2. Deploy the backend service on Railway.
3. Add the PostgreSQL service.
4. Confirm the backend service is using Railway's `DATABASE_URL`.
5. Generate the backend public domain.
6. Deploy the frontend service.
7. Set `NEXT_PUBLIC_API_URL` on the frontend to the deployed backend URL.
8. Redeploy the frontend so the public client bundle picks up the new value.
