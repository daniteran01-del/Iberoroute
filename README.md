# Iberoute

Share your ride to campus, split the cost.

## Problem

IBERO students commuting from far areas spend heavily on Uber/gas and sit in CDMX traffic, while many classmates travel similar routes without any way to find each other.

## Solution

Students post a ride (origin, destination, time, seats), and other students traveling the same route request to join, splitting the cost.

## Tech stack

- **Next.js** (App Router) — frontend framework, zero-config Vercel deploys
- **Tailwind CSS** — utility-first styling
- **Supabase** — hosted Postgres database + client SDK
- **Vercel** — hosting / CI deploys
- **GitHub** — version control

## Local setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create a Supabase project at [supabase.com](https://supabase.com), then run `supabase_schema.sql` in the SQL Editor to create the `rides` table.

3. Copy the env file and fill in your Supabase keys (Project Settings → API):
   ```bash
   cp .env.local.example .env.local
   ```

4. Run the dev server:
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000).

## Deploying to Vercel

1. Push this repo to GitHub.
2. Import the repo at [vercel.com/new](https://vercel.com/new).
3. Add the two environment variables from `.env.local` in the Vercel project settings.
4. Deploy. Every push to `main` redeploys automatically.

## Data model

**rides**: `id`, `driver_name`, `origin`, `destination`, `departure_time`, `seats_total`, `seats_taken`, `contact`, `created_at`

## Scope (Week 0)

Included: post a ride, browse rides, join a ride (decrements seats).
Not included (cut for scope): payments, real-time GPS tracking, in-app chat, full authentication.
