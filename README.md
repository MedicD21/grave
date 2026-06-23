# Wreath Whimsy by Kami 🌿

A warm, handcrafted website for a custom wreath-making business — built with
**Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.

## What's inside

- **Home** — hero, featured wreaths, "how it works", and a meet-the-maker section.
- **Gallery** (`/gallery`) — filterable grid of wreaths by season/category.
- **Order Custom** (`/order`) — a friendly order form that emails Kami.
- **Contact** (`/contact`) — email + Facebook.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding a new wreath (no coding required for the data)

Everything lives in [`src/data/products.ts`](src/data/products.ts). To add a wreath:

1. Drop a photo into `public/wreaths/` (e.g. `public/wreaths/spring-tulip.jpg`).
2. Copy an existing entry in `products.ts`, give it a unique `id`, write a name
   and description, and set `image: "/wreaths/spring-tulip.jpg"`.
3. Set `featured: true` to also show it on the home page.

That's it — it appears in the gallery and filters automatically. Categories are
defined at the top of the same file; add new ones freely.

## Editing contact info & copy

Global info (name, email, Facebook link, tagline) lives in
[`src/data/site.ts`](src/data/site.ts).

## Replacing the logo

A placeholder wreath mark is used everywhere via
[`src/components/Logo.tsx`](src/components/Logo.tsx). When the official logo is
ready, drop the image into `public/` (e.g. `public/logo.png`) and follow the
comment at the top of that file to swap it in. One change updates the header,
footer, and everywhere else.

## Receiving orders by email

Orders are sent through `src/app/api/order/route.ts`.

- **Without setup:** the form opens the customer's email app pre-filled to Kami —
  nothing is lost.
- **Automatic emails:** create a free [Resend](https://resend.com) account and
  add a `.env.local` file (see `env.example.txt`) with your `RESEND_API_KEY`.

## Deploying

Optimized for **Vercel**: push to GitHub and import the repo, or run `vercel`.
Add `RESEND_API_KEY` in the Vercel project's Environment Variables to enable
automatic order emails in production.

## Ideas for later

- Wreath detail pages with multiple photos.
- Customer reviews / testimonials.
- Online payment & deposits (Stripe).
- An Instagram feed embed.
