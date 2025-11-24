# Job Application Tracker (Lean Next.js + Email Forwarding MVP)

A privacy-focused tracker for job applications and interviews, with simple analytics and email forwarding to attach recruiter threads. Built with Next.js API routes, Prisma, PostgreSQL, and Tailwind.

## Features
- Applications CRUD with a clean, accessible UI
- Interview scheduling with reminders
- Simple analytics (response rate, offer rate, status funnel)
- Email forwarding via unique user alias to attach recruiter threads
- Auth with NextAuth (JWT), Prisma + Postgres
- Lean Next.js architecture (App Router + API routes)

## Stack
Next.js (App Router) • TypeScript • Prisma • PostgreSQL • NextAuth • Tailwind

## Environment
Copy `.env.example` to `.env` and fill values.

## Dev commands
- Install: `pnpm install`
- DB: `pnpm prisma migrate dev && pnpm prisma generate`
- Run: `pnpm dev`
- Seed: `pnpm seed`
- Mock inbound email: `pnpm mock:email`

## License
MIT.
