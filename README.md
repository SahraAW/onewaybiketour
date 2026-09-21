# One Way Bike Tours

One Way Bike Tours is a Next.js frontend for exploring curated one-way and round-trip cycling routes.

## Current architecture

- Next.js 14 App Router with TypeScript
- Tailwind CSS 3 and Framer Motion
- Static tour catalogue in `lib/tours.ts`
- Shared UI in `components/`
- Pages in `app/`: home, tours, tour details, onboarding, login, and register
- No backend or API routes are present in the supplied project

The login and register screens are currently presentation-only forms. They do not create accounts or authenticate users because the supplied project contains no backend contract, persistence layer, or authentication provider.

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validate

```bash
npm run typecheck
npm run build
```

## Adding a backend later

Keep the tour catalogue contract aligned with `lib/tours.ts`. The first backend integration should define explicit endpoints for authentication and tour data, then replace the presentation-only form handlers and static tour imports with typed API clients. Until that contract exists, the static data is the intentional source of truth for the demo application.
