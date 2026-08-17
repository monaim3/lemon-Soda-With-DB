/**
 * Live stock, from the HMZ feed.
 *
 * The supplier publishes one XML file of every variant they hold, refreshed
 * hourly. This module fetches, filters and indexes it. It runs on the server
 * only — the feed needs credentials, is 2.6MB, and cannot be requested from a
 * browser anyway.
 *
 * Matching is on the feed's <id>, which is exactly our SKU code
 * ("LEM1111_BK-3XL"). That matches 3,005 of our 3,012 SKUs. Barcodes are
 * deliberately not used: the supplier has re-issued them for 15 styles, so our
 * data file and their feed disagree on 559, and their file reuses some barcodes
 * across different variants.
 */

/** A row from the feed. */
type Variant = {
  id: string;
  stock: number;
  /** "20260925" when the goods are inbound rather than on the shelf. */
  availableOn: string;
};

/** SKU code -> units on hand. */
export type StockLevels = Record<string, number>;

const FEED_URL = process.env.HMZ_STOCK_URL ?? "https://stockbestand.hmz.nl/StockHMZ/Export_stock.xml";
const FEED_USER = process.env.HMZ_STOCK_USER;
const FEED_PASSWORD = process.env.HMZ_STOCK_PASSWORD;

/** The feed is regenerated hourly, so asking more often than that gains nothing. */
export const FEED_TTL_SECONDS = 3600;

const VARIANT = /<variant>([\s\S]*?)<\/variant>/g;
const field = (block: string, name: string) => {
  // <available_on /> is self-closing when empty, which the paired form misses.
  const m = block.match(new RegExp(`<${name}>([\\s\\S]*?)</${name}>`));
  return m ? m[1].trim() : "";
};

/**
 * The feed is machine-generated with a flat, stable shape, so a small reader
 * beats pulling in an XML library for four fields.
 */
function parse(xml: string): Variant[] {
  const out: Variant[] = [];
  for (const match of xml.matchAll(VARIANT)) {
    const block = match[1];
    const id = field(block, "id");
    if (!id) continue;
    const stock = Number.parseInt(field(block, "stock"), 10);
    out.push({
      id,
      stock: Number.isFinite(stock) ? stock : 0,
      availableOn: field(block, "available_on"),
    });
  }
  return out;
}

/**
 * Index the feed by SKU, keeping stock on hand only.
 *
 * A SKU appears twice when a delivery is booked in — once with no date for what
 * is in the warehouse now, once with an <available_on> date for what is coming.
 * Dropping the dated rows leaves exactly one row per SKU.
 */
export function indexCurrentStock(xml: string): StockLevels {
  const levels: StockLevels = {};
  for (const v of parse(xml)) {
    if (v.availableOn) continue;
    levels[v.id] = v.stock;
  }
  return levels;
}

/**
 * Fetch and index the feed.
 *
 * Cached for an hour by the framework's data cache, so a burst of visitors
 * causes one request upstream rather than thousands. Throws so the caller can
 * decide what to show; the product page falls back to "—" rather than implying
 * zero stock, which would wrongly stop a dealer ordering.
 */
export async function fetchStock(): Promise<StockLevels> {
  if (!FEED_USER || !FEED_PASSWORD) {
    throw new Error(
      "HMZ_STOCK_USER and HMZ_STOCK_PASSWORD are not set. " +
        "See .env.example — they belong in the hosting environment, never in the repository."
    );
  }

  const credentials = Buffer.from(`${FEED_USER}:${FEED_PASSWORD}`).toString("base64");
  const res = await fetch(FEED_URL, {
    headers: { Authorization: `Basic ${credentials}` },
    next: { revalidate: FEED_TTL_SECONDS },
  });

  if (!res.ok) throw new Error(`Stock feed returned ${res.status}`);
  return indexCurrentStock(await res.text());
}

/** Narrow a full feed index to the SKUs of one style, so the browser gets a small payload. */
export function levelsForStyle(levels: StockLevels, skus: string[]): StockLevels {
  const out: StockLevels = {};
  for (const sku of skus) {
    if (sku in levels) out[sku] = levels[sku];
  }
  return out;
}
