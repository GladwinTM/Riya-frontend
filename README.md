# Riya storefront

Next.js storefront for the Riya cooking-oil shop. It talks only to the NestJS API at `NEXT_PUBLIC_API_URL` (default `http://localhost:3001/api/v1`).

## Run

1. Start the backend (`Riya-backend`, port 3001).
2. Copy `.env.example` to `.env.local` if needed.
3. `npm install && npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

## What is included

- Home, shop (search + category filters), product detail
- Local cart (`localStorage`)
- Guest COD checkout (`POST /orders`)
- Order confirmation and track-order (device-local for guests)
- About and contact (contact fields from `GET /content/contact`)

Prices and totals on checkout are estimates only. The server is the source of truth when an order is created.
