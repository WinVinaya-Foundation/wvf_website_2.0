# WinVinaya Foundation Website

The WinVinaya Foundation website: a React/TypeScript frontend and an Express/PostgreSQL
backend (Razorpay-backed donations API).

## Project Structure

```
wvf_website_new/
├── frontend/   React 19 + TypeScript + Vite + MUI + TanStack Router
└── backend/    Express + TypeScript + Prisma + PostgreSQL (donations/payments API)
```

## Prerequisites

- Node.js 24+ and npm
- PostgreSQL 15+ running locally (only needed for the backend)

## Running the Frontend

```bash
cd frontend
npm install
npm run dev
```

The site runs at `http://localhost:5173`. Other useful scripts (run from `frontend/`):

| Command | Purpose |
| --- | --- |
| `npm run build` | Type-check (`tsc -b`) and build for production into `frontend/dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

The frontend's dev server proxies `/api/*` requests to the backend at `http://localhost:4000`
(see `frontend/vite.config.ts`), so the backend should be running alongside it for pages that
call the API (e.g. `/donate`, `/contact`).

## Running the Backend

The backend needs a PostgreSQL database and Razorpay API keys before it will start. Full setup
instructions (including the one-time database creation script) are in
[`backend/README.md`](backend/README.md). Quick version:

```bash
cd backend
npm install

# 1. One-time: create a dedicated database + role on your local Postgres server.
#    Open backend/prisma/setup-local-db.sql, set a password, then run it via
#    pgAdmin 4's Query Tool or `psql -U postgres -f prisma/setup-local-db.sql`.

# 2. Configure environment variables
cp .env.example .env
# then fill in .env: DATABASE_URL (from step 1), RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET
# (use Razorpay TEST-mode keys for local development, never live keys)

# 3. Apply the database schema
npm run prisma:migrate

# 4. Start the dev server
npm run dev
```

The API runs at `http://localhost:4000` (health check: `GET /api/health`). Other scripts (run
from `backend/`):

| Command | Purpose |
| --- | --- |
| `npm run build` | Compile TypeScript to `backend/dist/` |
| `npm run start` | Run the compiled build (`node dist/index.js`) |
| `npm run prisma:generate` | Regenerate the Prisma client after a schema change |
| `npm run prisma:migrate` | Create/apply a database migration |
| `npm run lint` | Type-check (`tsc --noEmit`) |

**Never commit `backend/.env`** — it's gitignored, and `backend/.env.example` documents every
variable it needs with placeholder values.

## Running Both Together

Open two terminals — one running the frontend dev server, one running the backend dev server,
as shown above. With both up, the full site (including the donation flow) is available at
`http://localhost:5173`.

## License

Proprietary — see [`LICENSE`](LICENSE). All rights reserved by WinVinaya Foundation.
