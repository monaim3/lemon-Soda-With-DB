# Developer handoff — Lemon & Soda UK trade portal

A Next.js front end for the Lemon & Soda UK B2B portal, built from the 2026 design
handoff and wired to the real product data, photography, pricing and spec sheets.

**It is a complete, working front end with no backend.** Everything renders from
generated JSON in `src/data/`. Nothing is fetched at runtime and nothing is
submitted anywhere. The sections below say precisely which parts are real, which
are stubbed, and where the server-side work plugs in.

---

## 1. Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

Node 22+ is all you need — `.nvmrc` pins it. No Python, no database server, no
other toolchain. `npm run build` type-checks, lints and prerenders every route.
There are no tests (see §8).

Copy `.env.example` to `.env.local` if you want the live stock feed locally;
without it the site runs fine and the Stock column shows "—".

| Route | File | Notes |
| --- | --- | --- |
| `/` | `src/app/page.tsx` | Landing. Hero video, collections, Everywear, Private Label |
| `/catalogue` | `src/app/catalogue/page.tsx` | 65 styles, facets, sort, paging, search results |
| `/product/[code]` | `src/app/product/[code]/page.tsx` | Statically generated for all 65 styles |
| `/register` | `src/app/register/page.tsx` | Dealer application form |
| `/sign-in` | `src/app/sign-in/page.tsx` | Login form |

---

## 2. Architecture

Next.js App Router, TypeScript, Tailwind v4. No state library and no
data-fetching library — there is nothing to fetch yet.

```
src/
  app/                     routes, each with a *Classes.ts of its class strings
  components/
    chrome/                header, footer, drawer, search, account menu
    product/               gallery, specifications, care, lightbox
    form/                  registration form
    landing/               hero video
  data/                    GENERATED JSON — do not hand-edit (see §3)
  lib/                     data access + domain logic, no JSX
data/                      lemon-soda.db + schema.sql — the source of truth
scripts/                   build-data.mjs: database -> src/data/*.json
public/                    products/, care-icons/, stylesheets/, brand/, video/
```

**`src/lib` is where the domain logic lives** and is the best place to start
reading:

- `catalogue.ts` — loads the catalogue, exposes `getStyle`, image path helpers,
  facet building/matching, sorting, related styles, and size-chart projection.
- `pricing.ts` — price lookup and formatting, and the retail/trade tier concept.
- `search.ts` — the scoring function behind the header search.
- `sizes.ts` — the canonical size order (`XS … 6XL`) and range labels.

**Two headers exist by design.** `SiteHeader` is the sticky bar used on every
inner page. `LandingChrome` is the landing page's variant: a transparent bar over
the hero that hands over to the sticky bar on scroll. They share
`headerClasses.ts`, `SearchPanel` and `AccountMenu`, so search and account
behave identically in both. If you change one, check the other.

### How the styling is organised

Class strings live in a `*Classes.ts` module beside the code that uses them —
`headerClasses.ts`, `catalogueClasses.ts`, `productClasses.ts` and so on —
rather than inline in the markup. Several run to a dozen utilities and are used
in more than one component, so naming them keeps the JSX readable and keeps one
place to change a value.

Five things about this setup are load-bearing. Each was found the hard way, and
none of them announces itself if broken:

- **Tailwind is loaded without Preflight.** Preflight is its own reset and would
  restyle headings, lists, buttons and form controls. The reset in
  `globals.css` is the one the design was built against.
- **Base element rules sit in `@layer base`.** Unlayered CSS beats layered CSS
  whatever the specificity, so `a { color: inherit }` outside a layer defeats
  every text-colour utility on a link.
- **Two utilities setting the same property are resolved by their order in the
  generated stylesheet, not the order in the class attribute.** Layering an
  override on top of a base class does not reliably win — make the override
  self-contained, or mark it important.
- **`-webkit-backdrop-filter` only, never the standard property.** The standard
  one makes an element a containing block for `position: fixed` descendants,
  which collapses the dropdown scrim inside the header. `headerClasses.ts`
  explains it at the point it matters.
- **Anything that looks like a class gets generated, wherever it appears** —
  including inside comments.

Tailwind also fails silently: an unsupported variant order or a malformed
arbitrary value emits no rule at all, and the build, TypeScript and ESLint all
stay quiet. `hover:not-disabled:` and a pseudo-class nested inside an arbitrary
variant both did exactly that here. If a style is mysteriously absent, check the
built CSS actually contains a rule for the class before looking anywhere else.

---

## 3. Where the data comes from

Everything the site renders lives in **`data/lemon-soda.db`**, a single SQLite
file — styles, colourways, SKUs, size charts, retail prices and care symbols.
It is the source of truth. `data/schema.sql` documents it, and it is the
natural starting point when you build the real backend: import it into
Postgres or MySQL rather than re-typing the model.

Have a look around with any SQLite client:

```bash
sqlite3 data/lemon-soda.db "SELECT code, name, collection FROM style LIMIT 5;"
sqlite3 data/lemon-soda.db "SELECT count(*) FROM sku;"
```

`src/data/*.json` is **generated from that database** and is the form the site
bundles — the catalogue filters and the product page's colour picker are client
components, and SQLite cannot run in a browser, so the data has to reach it as
bundled JavaScript.

**`npm run dev` and `npm run build` both regenerate it first**, so the database
is always what renders. Editing those JSON files by hand does nothing; they are
overwritten on the next build. To change the data, change the database.

```
data/lemon-soda.db  ──▶  src/data/*.json  ──▶  the site
  (source of truth)      (generated on every build)
```

The generator is `scripts/build-data.mjs`, using `node:sqlite` — built into Node
22 and later, so nothing to install and no native module to compile. Its output
is deterministic, so rebuilding without changing the database produces no diff.
Run it alone with `npm run data`.

**Images, spec sheets and care symbols are already processed.** `public/`
holds the web-optimised photography, the per-style PDFs and the care icons.
Nothing needs generating; they are served as they are.

### Refreshing the data

The database is compiled offline from the supplier's workbooks, spec sheets and
original photography by a separate Python pipeline that is **not part of this
project** — Zaafir holds it. When Lemon & Soda issue new product data, that
pipeline produces an updated `data/lemon-soda.db` and any new images, and those
drop straight in here. You should not need Python or Excel to work on the site.

### Notable data quirks, already handled

- Sizes vary **per colour**, not just per style — LEM1111 Black runs to 6XL while
  Dark Grey stops at 3XL. The order table reflects this via `sizesForColour`.
- Two styles (LEM4827, LEM4829) have no measurement table on their spec sheets,
  so their size chart falls back to a link to the PDF. 63 of the 65 have one.
- Four priced styles (LEM1400, LEM3502, LEM3540, LEM3610) have no catalogue
  entry. Their prices are kept in the `price` table but nothing renders them,
  which suggests the product data is behind the pricelist.
- The supplier's workbook had Royal Blue's hex filled down over 21 Workwear and
  Everywear styles, so their swatches all read the same blue. Corrected at
  source; if a future data drop looks blue again, that is why.

---

## 4. What is real vs stubbed

**Real, from source data:** all 65 styles with colours, per-colour sizes, SKUs,
barcodes, composition, weights, customs codes and descriptions; 1,201
photographs; measured size charts; retail prices; care symbols; per-style spec
sheet PDFs.

**Stubbed — needs a backend:**

| Area | Current behaviour | Where to wire it |
| --- | --- | --- |
| Sign in | Validates both fields are non-empty, then stops | `src/app/sign-in/SignInForm.tsx` — `submit()` has the TODO |
| Trade pricing | Everyone sees retail | `src/lib/pricing.ts` + `tier` in `ProductClient.tsx` (see §5) |
| Stock | **Live from HMZ**, but dealer-only so it shows `—` until sign-in works | `src/lib/stock.ts`, `src/app/api/stock/[style]/route.ts` — see §5b |
| Add to order | Validates quantities, takes a reference, submits nothing | `ProductClient.tsx` — `addToOrder` |
| Registration | Shows a client-generated `LS-2026-…` reference | `src/components/form/RegistrationForm.tsx` — `submit()` |
| Account menu | Links only; no session | `AccountMenu.tsx` |

Search **is** functional — it runs client-side over the bundled catalogue. That
is fine for 65 styles; move it server-side if the range grows a lot.

---

## 5. Trade pricing — read before implementing

Prices come in three tiers: Retail, Category A, Category B. A dealer's tier is
assigned during account registration.

**Only retail prices exist in this project, deliberately.** Anything in
`src/data/` ships to the browser and is readable by anyone who views source, so
putting Category A/B there would publish your trade pricing. The `price` table
carries a `tier` column and holds retail rows only.

To implement:

1. Serve A/B from an authenticated endpoint, keyed by the signed-in dealer.
2. In `ProductClient.tsx`, replace the hardcoded `const tier: PriceTier = "retail"`
   with the tier from the session.
3. `priceFor(code, tier)` in `src/lib/pricing.ts` already branches on tier and
   returns `null` for trade tiers — fill that in from your API response.
4. `priceLabel(tier)` already switches the heading between "Retail price" and
   "Your price".

---

## 5b. Live stock

Stock comes from HMZ's feed — one XML file of every variant they hold, rebuilt
hourly:

```
https://stockbestand.hmz.nl/StockHMZ/Export_stock.xml   (HTTP basic auth)
```

`src/lib/stock.ts` fetches and indexes it; `src/app/api/stock/[style]/route.ts`
serves one style's levels to the page; `ProductClient` requests them after
render and fills the Stock column.

**It is server-side only, and must stay that way.** The feed needs credentials,
weighs 2.6MB and would be blocked by the browser's cross-origin rules. The
upstream fetch is cached for an hour, so a busy day costs HMZ 24 requests rather
than thousands.

### Matching

On the feed's `<id>`, which is exactly our SKU code (`LEM1111_BK-3XL`) — **3,005
of our 3,012 SKUs**. Seven have no row and show `—`.

Do **not** match on barcode, despite both files carrying one. HMZ have re-issued
barcodes for 15 styles, so the product data and the feed disagree on 559 of
them (both sets are valid EAN-13; ours is simply older), and the feed reuses
some barcodes across different variants.

### Reading the feed

A SKU appears **twice** when a delivery is booked: once with an empty
`<available_on>` for what is in the warehouse now, once with a date for what is
inbound. Only the undated rows are kept — that is stock on hand, and it leaves
exactly one row per SKU.

### Authentication

Stock is commercially sensitive, so the endpoint returns **401 unless the caller
is signed in**. There is no session yet, so `isSignedIn()` in the route is the
single place to wire it in. Until then nobody sees stock, which is the correct
default for private data.

`STOCK_PUBLIC=1` bypasses the check so the feed can be demonstrated before
authentication exists. **Do not set it in production.**

### Failure behaviour

Any failure — not signed in, feed down, bad credentials, SKU absent — shows
`—`, never `0`. Zero would tell a dealer they cannot order something that is
sitting in the warehouse. Errors are logged server-side; the browser is told
only "temporarily unavailable", so a bad credential never surfaces in a
response. The response is `Cache-Control: no-store`, because it depends on who
is asking and must not survive a sign-out.

### Environment variables

Copy `.env.example` to `.env.local` locally, and set the same three on the host:

| Variable | Purpose |
| --- | --- |
| `HMZ_STOCK_URL` | the feed (defaults to the address above) |
| `HMZ_STOCK_USER` | HMZ username |
| `HMZ_STOCK_PASSWORD` | HMZ password |

`.env*` is gitignored. These never belong in the repository.

---

## 5c. Deploying to Vercel

1. Push the repository, then import it at vercel.com.
2. **Node 22 or later** — the build reads the SQLite database via `node:sqlite`.
   `package.json` pins it with `engines`; check Project Settings if a build
   fails on it.
3. Add the three `HMZ_STOCK_*` variables under Settings → Environment Variables.
4. Set the region to **London (lhr1)** under Settings → Functions. The default
   is US East, which adds latency for UK dealers.
5. No build command to configure — the default `npm run build` regenerates the
   site's JSON from the database and prerenders all 65 product pages.

Everything except `/api/stock/[style]` is static, so only the stock endpoint
runs as a function.

Note the free Hobby tier excludes commercial use; a dealer portal needs Pro.

---

## 6. Conventions worth knowing

- **Design tokens** live in `src/app/globals.css` as CSS variables: `--ink`,
  `--paper`, `--muted-45`, `--muted-62`, `--bar-h`, `--gutter`, collection
  accents. Prefer these over literals. `--bar-h` in particular is used by the
  sticky product gallery and by scroll targets, so changing the header height is
  a one-line change.
- **No border radius and no shadows** anywhere — that is deliberate from the
  design, not an oversight. Depth comes from 1px borders.
- **Catalogue state lives in the URL** (`?category=Sweat&sort=name&page=2`), not
  in component state, so filtered views are shareable and returning from a
  product page restores exactly where the user was. Facets use repeated params
  rather than a delimiter, since values contain `/` and `'`.
- **Images use plain `<img>`, not `next/image`.** The photography has mixed,
  unknown aspect ratios and is already optimised by `import-images.py`. The lint
  rule is disabled in `eslint.config.mjs` with that reasoning.
- **Secondary text colours were darkened** from the original design values, which
  measured around 4.1:1 against the off-white and were borderline for small
  labels. Everything now clears WCAG AA.

---

## 7. Assets

`public/` is about 119MB and is what the site serves:

| Folder | Size | What |
| --- | --- | --- |
| `products/` | 77MB | 1,201 web-optimised photographs |
| `stylesheets/` | 28MB | per-style spec sheets, linked from each product page |
| `care-icons/` | small | the 12 wash-care symbols |
| `brand/`, `video/` | 14MB | logo, certificates, hero video |

These are the processed outputs, already downscaled to 1400px and re-encoded —
the 159MB of originals stayed behind with the offline pipeline. Nothing here
needs building.

---

## 8. Known gaps

- **No tests.** Behaviour was verified by driving headless Chrome over the
  DevTools protocol during development. If you add a test runner, the product
  page (colour → gallery swap, per-colour sizes, quantity validation) and the
  catalogue (facets, URL state, back navigation) are the highest-value targets.
- **No error boundaries or loading states** — there is nothing async yet.
- **No analytics, no cookie banner, no privacy policy.** The footer links to
  Terms, Privacy and Cookies are placeholders (`#`).
- **"Forgot your password"** on the sign-in page is a placeholder.
- **Landing page Everywear section is curated by hand** in `src/app/page.tsx` —
  the two model shots and the four products are an explicit list, so new
  Everywear styles will not appear automatically.
- **Care symbols and certificates** are scraped from the supplier's B2B site.
  Confirm you are happy relying on that as a source before launch; the icons are
  downloaded locally so there is no hotlinking.

---

## 9. Suggested first steps for a new developer

1. `npm install && npm run dev`, then click through all five routes.
2. Read `src/lib/catalogue.ts` top to bottom — it is the spine of the app.
3. Open `src/data/catalogue.json` and look at one style object.
4. Run `npm run data:catalogue` and watch it regenerate from `data-sources/`.
5. Then pick up the backend work in §4, starting with auth, since pricing,
   ordering and stock all depend on knowing who the dealer is.
