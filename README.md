# Wreath Whimsy by Kami 🌿

A warm, handcrafted website for a custom wreath-making business — built with
**Next.js 16** (App Router) + **TypeScript** + **Tailwind CSS v4**.

## What's inside

- **Home** — hero, featured wreaths, "how it works", and a meet-the-maker section.
- **Gallery** (`/gallery`) — filterable grid of wreaths + gallery photos.
- **Order Custom** (`/order`) — a friendly order form that emails Kami **and** saves the request into the admin.
- **Contact** (`/contact`) — email + Facebook.
- **Studio / Admin** (`/studio`) — a visual CMS (Sanity) where Kami manages wreaths, gallery photos, and order requests. No code, no redeploys.

## The admin (Sanity Studio) — `/studio`

Kami logs in at **`/studio`** to manage the whole site:

- **🌿 Wreaths** — add/edit/delete products. Upload a photo (drag & drop),
  set name, category, price, and "feature on home page". Changes appear on the
  live site within ~1 minute (no redeploy).
- **🖼️ Gallery photos** — standalone photos of past work, with captions.
- **✉️ Order requests** — every order from the website lands here automatically
  with a status (New → In touch → In progress → Completed). Private notes too.

Content lives in Sanity, so the site reads from it at runtime and falls back to
the static list in `src/data/products.ts` if Sanity is ever unreachable.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Adding a new wreath

**The easy way (recommended):** go to `/studio`, click **🌿 Wreaths → New**,
upload a photo, fill in the details, and Publish. It appears on the site within
a minute. No code.

**The code way (fallback):** the starter list lives in
[`src/data/products.ts`](src/data/products.ts) and is used only when Sanity is
empty/unreachable. Copy an entry, give it a unique `id`, and set an `image` path
under `public/wreaths/`.

## Editing contact info & copy

Global info (name, email, Facebook link, tagline) lives in
[`src/data/site.ts`](src/data/site.ts).

## Replacing the logo

A placeholder wreath mark is used everywhere via
[`src/components/Logo.tsx`](src/components/Logo.tsx). When the official logo is
ready, drop the image into `public/` (e.g. `public/logo.png`) and follow the
comment at the top of that file to swap it in. One change updates the header,
footer, and everywhere else.

## Receiving orders

Orders go through `src/app/api/order/route.ts`, which does two things:

1. **Saves the order into Sanity** → Kami sees it under **✉️ Order requests** in
   `/studio` with a status workflow (New → In touch → In progress → Completed).
2. **Emails Kami** if [Resend](https://resend.com) is configured
   (`RESEND_API_KEY` — see `env.example.txt`). Without it, the form opens the
   customer's email app pre-filled — nothing is lost.

## Environment variables

See `env.example.txt`. The Sanity values are required for the CMS; the Resend
values are optional. All are already set in Vercel for this project.

## Deploying

Optimized for **Vercel**: push to GitHub and import the repo, or run `vercel`.
Add `RESEND_API_KEY` in the Vercel project's Environment Variables to enable
automatic order emails in production.

## Ideas for later

- Wreath detail pages with multiple photos.
- Customer reviews / testimonials.
- Online payment & deposits (Stripe).
- An Instagram feed embed.
