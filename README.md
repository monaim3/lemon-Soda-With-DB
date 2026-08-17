# Lemon & Soda UK — trade portal

Front end for the Lemon & Soda UK trade portal, built from the 2026 design handoff
and wired to the real product data, photography and spec sheets.

> **Handing this to a developer?** Start with [HANDOFF.md](HANDOFF.md) — architecture,
> where the data lives, what's real vs stubbed, and where the backend plugs in.

Requires **Node 22+**. Nothing else — no Python, no database server.

## Launch it

```bash
npm install && npm run dev
```

Then open http://localhost:3000.

## What to look at

| Page | URL | What's there |
| --- | --- | --- |
| Landing | `/` | Hero video, the four collections with live style counts, Everywear, Private Label |
| Catalogue | `/catalogue` | All 65 styles, filters (productgroup, collection, colour, gender, size, fabric, fitting), sort, paging |
| Product | `/product/LEM1111` | Gallery, real colours, per-colour size/order table, measured size chart, spec sheet download |
| Registration | `/register` | Dealer account form with the confirmation flow |

Every style has its own page — try `/product/LEM4504`, `/product/LEM3210`, or click
through from the catalogue.

## Where the content comes from

Everything the site renders comes from one SQLite file, **`data/lemon-soda.db`**:

| Table | Holds |
| --- | --- |
| `style`, `colour`, `sku` | 65 styles, 419 colourways, 3,012 SKUs with barcodes |
| `size_chart*` | measured size charts for 63 styles |
| `price` | retail prices (trade tiers stay behind authentication) |
| `care_icon`, `style_care_icon` | the wash-care symbols per style |

`data/schema.sql` documents the whole thing. Poke around with any SQLite client:

```bash
sqlite3 data/lemon-soda.db "SELECT code, name, collection FROM style LIMIT 5;"
```

`src/data/*.json` is generated from that database and is what the site bundles.
`npm run dev` and `npm run build` regenerate it first, so the database is always
what renders — edit the database, not the JSON. To regenerate on its own:

```bash
npm run data
```

Photography, spec sheets and care icons are already processed and live in
`public/` — nothing to build.

65 styles · 3,012 SKUs · 419 colourways · 1,201 photographs.

## Still to come

- **Trade pricing.** Retail prices are live on the catalogue and product pages.
  Category A and B are *deliberately absent from the bundle* — anything in
  `src/data/` ships to the browser and would be readable by anyone. Once a dealer
  can sign in, set `tier` in `src/components/product/ProductClient.tsx` from the
  session and fetch their rates from an authenticated endpoint.
- **Stock.** The Stock column shows `—`; there's no live stock feed connected.
- **Ordering.** "Add to order" validates quantities and takes an order reference,
  but nothing is submitted — there's no backend.
- **Registration.** Submitting shows a client-generated `LS-2026-…` reference; it
  isn't sent anywhere.
- **Search and Account.** The search panel and account links are UI only.
- **Size charts.** LEM4827 and LEM4829 have no measurement table on their spec
  sheets, so those two pages link the PDF instead of showing a chart.
