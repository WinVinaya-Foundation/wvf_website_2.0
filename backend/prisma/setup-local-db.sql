-- Run this once against your local PostgreSQL 15 instance (e.g. via pgAdmin 4's Query Tool
-- connected as the postgres superuser, or `psql -U postgres`). This creates a dedicated,
-- low-privilege role and database for this app only — it does not touch any other database
-- on the server, and the app never needs your superuser password.
--
-- Replace 'replace-with-a-strong-local-password' below before running.

CREATE ROLE wvf_donate_app WITH LOGIN PASSWORD 'replace-with-a-strong-local-password'
  NOSUPERUSER NOCREATEDB NOCREATEROLE;

CREATE DATABASE wvf_donate OWNER wvf_donate_app;

REVOKE ALL ON DATABASE wvf_donate FROM PUBLIC;
GRANT CONNECT, TEMP ON DATABASE wvf_donate TO wvf_donate_app;

-- Connect to the new database before running the final grant (in psql: \c wvf_donate).
-- In pgAdmin's Query Tool, switch the connection to the wvf_donate database first.
GRANT ALL ON SCHEMA public TO wvf_donate_app;

-- After this, set backend/.env's DATABASE_URL to:
--   postgresql://wvf_donate_app:replace-with-a-strong-local-password@localhost:5432/wvf_donate?schema=public
-- (using whatever password you actually chose above), then run `npm run prisma:migrate` in backend/.
