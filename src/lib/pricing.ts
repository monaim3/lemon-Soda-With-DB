import pricesJson from "@/data/prices.json";

/**
 * Prices come from the UK pricelist via scripts/build-prices.py.
 *
 * Only retail prices live in the bundle. Category A and B are trade prices —
 * once a dealer signs in, their tier is assigned during account registration
 * and their prices must be fetched from an authenticated endpoint. Putting them
 * here would publish them to anyone who opens the page source.
 */

export type PriceTier = "retail" | "A" | "B";

const RETAIL = (pricesJson as { retail: Record<string, number> }).retail;

export const CURRENCY = "GBP";

export const formatPrice = (value: number) =>
  new Intl.NumberFormat("en-GB", { style: "currency", currency: CURRENCY }).format(value);

/** Retail price for a style, or null when the pricelist has no entry. */
export const retailPrice = (code: string): number | null => RETAIL[code.toUpperCase()] ?? null;

/**
 * The price to show for a viewer. Signed-out visitors see retail; a signed-in
 * dealer will see their assigned tier once the API is wired up.
 */
export function priceFor(code: string, tier: PriceTier = "retail"): number | null {
  if (tier === "retail") return retailPrice(code);
  // Trade tiers are not in the bundle by design — see the note above.
  return null;
}

export const priceLabel = (tier: PriceTier) =>
  tier === "retail" ? "Retail price" : "Your price";
