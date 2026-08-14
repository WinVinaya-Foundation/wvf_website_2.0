# WinVinaya Foundation — Donations API

Express + PostgreSQL (via Prisma) backend for the `/donate` page's Razorpay payment flow. It's
the only thing that ever holds the Razorpay `key_secret` — the frontend only ever sees the
public `key_id`.

## 1. Install dependencies

```
npm install
```

## 2. Create the local database

This project expects a dedicated PostgreSQL database + role, not your default `postgres`
database. A PostgreSQL 15 server is assumed to already be running locally (Windows service).

1. Open `prisma/setup-local-db.sql`, replace `replace-with-a-strong-local-password` with a real
   password.
2. Run it once against your Postgres server as the superuser — easiest via pgAdmin 4's Query
   Tool (connect as `postgres`, open the file, execute; when the script says to connect to the
   new `wvf_donate` database before the last `GRANT`, switch pgAdmin's connection to that
   database first), or via `psql -U postgres -f prisma/setup-local-db.sql`.

This creates a `wvf_donate_app` role (login only, no superuser/createdb/createrole privileges)
that owns a new `wvf_donate` database — isolated from anything else on your Postgres server.

## 3. Configure environment variables

```
cp .env.example .env
```

Then fill in `.env`:

- `DATABASE_URL` — `postgresql://wvf_donate_app:<the password you chose>@localhost:5432/wvf_donate?schema=public`
- `RAZORPAY_KEY_ID` / `RAZORPAY_KEY_SECRET` — **use a freshly generated Razorpay TEST-mode key
  pair for local development** (`rzp_test_...`), not live keys. Never commit `.env` — it's
  gitignored.

  > If you're setting this up after pasting a live Razorpay key pair into a chat or anywhere
  > else outside a secrets manager, rotate/regenerate that key pair in the Razorpay dashboard
  > before using it anywhere, live or test.

## 4. Run the database migration

```
npm run prisma:migrate
```

This applies `prisma/migrations/` (creating it on first run) against your local `wvf_donate`
database and generates the Prisma client.

## 5. Run the dev server

```
npm run dev
```

Starts on `http://localhost:4000` (override with `PORT` in `.env`). The frontend's Vite dev
server proxies `/api` to this port — see `frontend/vite.config.ts`.

## Endpoints

All mounted under `/api/donations`:

- `POST /orders` — create a Razorpay order for a donation (fixed-tier amounts are server-computed
  and ignore whatever amount the client sent; only the `GENERAL` scheme accepts a client amount,
  enforced against `MIN_GENERAL_DONATION_PAISE`).
- `POST /:reference/verify` — verify a completed Razorpay Checkout payment (signature + captured
  status), called from the frontend's Checkout `handler` callback.
- `POST /:reference/cancel` — mark an order abandoned (Checkout modal dismissed without paying).
  Never overwrites an already-`PAID`/`FAILED` row.
- `GET /:reference` — fetch a donation receipt by reference (used by the `/donate/thank-you/:reference`
  page). PAN is always masked in this response; the full value is only ever in the database.

## Testing without real payments

The `/orders` endpoint can be exercised fully without any working Razorpay account setup beyond
having *a* valid test key pair, since it only creates an order — no money moves until Checkout
opens. The full round trip (opening Checkout, paying, landing on the thank-you page) requires
your own Razorpay test-mode keys and one of [Razorpay's published test payment
methods](https://razorpay.com/docs/payments/payments/test-card-upi-details/).
