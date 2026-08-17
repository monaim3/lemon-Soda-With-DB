import catalogueJson from "@/data/catalogue.json";
import sizeChartsJson from "@/data/sizecharts.json";
import { SIZE_ORDER, type Size } from "./sizes";

/**
 * The catalogue is generated from the Lemon & Soda data file by
 * scripts/build-catalogue.py; size charts come from the per-style spec sheets
 * via scripts/build-sizecharts.py. Re-run those after either source changes.
 */

export type Sku = {
  sku: string;
  size: string;
  barcode: string | null;
};

export type Colour = {
  code: string;
  name: string;
  group: string | null;
  hex: string;
  views: string[];
  skus: Sku[];
};

export type Style = {
  code: string;
  name: string;
  collection: string;
  accent: string;
  category: string;
  gender: string;
  isNew: boolean;
  description: string;
  descriptionPoints: string[];
  detailLines: string[];
  weight: string | null;
  sizes: string[];
  sizeRange: string | null;
  composition: string | null;
  compositionGroup: string | null;
  fabric: string | null;
  fitting: string | null;
  collar: string | null;
  sleeve: string | null;
  closure: string | null;
  remark: string | null;
  origin: string | null;
  customsCode: string | null;
  weightNett: string | null;
  weightBox: string | null;
  boxContents: string | null;
  hero: string | null;
  gallery: string[];
  colours: Colour[];
  skuCount: number;
};

export type SizeChartRow = { key: string | null; label: string; values: string[] };
export type SizeChart = { sizes: string[]; rows: SizeChartRow[]; tolerance: string | null };

/**
 * The spec sheets use pattern-cutting language ("Body length from HSP",
 * "1/2 Body width"). Dealers read the chart to pick a size, so the three
 * primary measurements get plain names. Anything else keeps its sheet label.
 */
const ROW_LABELS: [RegExp, string][] = [
  [/^body length/i, "Length"],
  [/^1\/2 body width$/i, "Chest"],
  [/^sleeve length/i, "Sleeve length"],
];

const friendlyLabel = (label: string) => {
  for (const [pattern, name] of ROW_LABELS) if (pattern.test(label.trim())) return name;
  return label;
};

export const STYLES = (catalogueJson as { styles: Style[] }).styles;

const BY_CODE = new Map(STYLES.map((s) => [s.code, s]));
export const getStyle = (code: string) => BY_CODE.get(code.toUpperCase());

const CHARTS = sizeChartsJson as Record<string, SizeChart>;

/**
 * Re-project a chart onto the style's own size range, so the columns on the
 * product page always match the sizes actually sold. Spec sheets list sizes in
 * their own order and may include sizes the style no longer carries.
 */
export function sizeChartFor(style: Style): { sizes: Size[]; rows: SizeChartRow[]; tolerance: string | null } | null {
  const chart = CHARTS[style.code];
  if (!chart) return null;

  const sizes = SIZE_ORDER.filter((s) => style.sizes.includes(s));
  const index = new Map(chart.sizes.map((s, i) => [s, i]));

  const rows = chart.rows.map((row) => ({
    key: row.key,
    label: friendlyLabel(row.label),
    values: sizes.map((s) => {
      const i = index.get(s);
      return i === undefined ? "—" : row.values[i] ?? "—";
    }),
  }));

  // Drop a measurement that has no value for any size this style is sold in.
  const kept = rows.filter((r) => r.values.some((v) => v !== "—"));
  return kept.length ? { sizes, rows: kept, tolerance: chart.tolerance } : null;
}

/** Product imagery lives at public/products/<CODE>/<file>, imported by scripts/import-images.py. */
export const img = (styleCode: string, file: string) =>
  `/products/${styleCode}/${encodeURIComponent(file)}`;

export const heroImage = (style: Style) =>
  style.hero ? img(style.code, style.hero) : null;

/** Every image for a colour, falling back to the style's model shots. */
export const colourViews = (style: Style, colour: Colour) => {
  const views = colour.views.map((v) => img(style.code, v));
  return views.length ? views : style.gallery.map((g) => img(style.code, g));
};

export const productSheetUrl = (code: string) => `/stylesheets/${code}.pdf`;

export const colourLabel = (n: number) => (n === 1 ? "1 colour" : `${n} colours`);

/**
 * A catalogue link with a facet pre-selected, e.g.
 * facetHref("collection", "Workwear", "Workwear/Everywear").
 *
 * Facets travel as repeated query params rather than a delimited list, because
 * the values themselves contain "/" and "'" (see "Workwear/Everywear",
 * "Polo's"). Repeating a key ORs the values, so one link can cover two
 * collections. The catalogue reads these straight back into its filter state.
 */
export const facetHref = (key: FacetKey, ...values: string[]) =>
  `/catalogue?${values.map((v) => `${key}=${encodeURIComponent(v)}`).join("&")}`;

/**
 * Weight with the per-colour exception dropped: "180 gr/m² (white: 170 gr/m²)"
 * becomes "180 gr/m²". Catalogue cards only have room for the headline figure —
 * the product page shows the full value, exceptions and all.
 *
 * The source data is inconsistently translated, so the note appears as both
 * "(white: …)" and the untranslated Dutch "(wit: …)".
 */
export const shortWeight = (weight: string | null) =>
  weight ? weight.replace(/\s*\([^)]*\)/g, "").trim() : weight;

/** Sizes a given colour is actually stocked in. */
export const sizesForColour = (colour: Colour): Size[] =>
  SIZE_ORDER.filter((s) => colour.skus.some((k) => k.size === s));

// ---------------------------------------------------------------- facets

export type FacetKey = "category" | "collection" | "gender" | "colourGroup" | "size" | "fabric" | "fitting";

export type FacetValue = { value: string; label: string; count: number; hex?: string };
export type Facet = { key: FacetKey; label: string; values: FacetValue[] };

/** A representative swatch per colour family, for the Colour facet chips. */
const GROUP_HEX: Record<string, string> = {
  BLACK: "#2D2926", WHITE: "#FFFFFF", GREY: "#868790", BLUE: "#1F5FBF",
  NAVY: "#041C2C", RED: "#C8102E", GREEN: "#1EA83C", ORANGE: "#FE5000",
  YELLOW: "#E0B02A", PINK: "#F98FD5", PURPLE: "#3C1053", BEIGE: "#C9BBA6",
  BROWN: "#6B4C3B", TURQUOISE: "#00A9CE", LIME: "#8DBE22",
};

function tally(values: string[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const v of values) if (v) m.set(v, (m.get(v) ?? 0) + 1);
  return m;
}

/** Facet values and counts derived from the styles passed in. */
export function buildFacets(styles: Style[] = STYLES): Facet[] {
  const simple = (key: FacetKey, label: string, pick: (s: Style) => string | null | undefined): Facet => ({
    key,
    label,
    values: [...tally(styles.map((s) => pick(s) ?? ""))]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: value, count })),
  });

  const colourGroups = new Map<string, number>();
  for (const s of styles) {
    const seen = new Set<string>();
    for (const c of s.colours) {
      const g = (c.group || "").toUpperCase();
      if (g && !seen.has(g)) {
        seen.add(g);
        colourGroups.set(g, (colourGroups.get(g) ?? 0) + 1);
      }
    }
  }

  const sizeCounts = new Map<string, number>();
  for (const s of styles) for (const size of s.sizes) sizeCounts.set(size, (sizeCounts.get(size) ?? 0) + 1);

  const title = (s: string) => s.charAt(0) + s.slice(1).toLowerCase();

  const colourFacet: Facet = {
    key: "colourGroup",
    label: "Colour",
    values: [...colourGroups]
      .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
      .map(([value, count]) => ({ value, label: title(value), count, hex: GROUP_HEX[value] ?? "#CCCCCC" })),
  };

  const sizeFacet: Facet = {
    key: "size",
    label: "Size",
    values: SIZE_ORDER.filter((s) => sizeCounts.has(s)).map((value) => ({
      value,
      label: value,
      count: sizeCounts.get(value) ?? 0,
    })),
  };

  const facets: Facet[] = [
    simple("category", "Productgroup", (s) => s.category),
    simple("collection", "Collections", (s) => s.collection),
    colourFacet,
    simple("gender", "Gender", (s) => s.gender),
    sizeFacet,
    simple("fabric", "Fabric", (s) => s.fabric),
    simple("fitting", "Fitting", (s) => s.fitting),
  ];

  return facets.filter((f) => f.values.length > 1);
}

export type ActiveFacets = Partial<Record<FacetKey, string[]>>;

export function matchesFacets(style: Style, active: ActiveFacets): boolean {
  return (Object.entries(active) as [FacetKey, string[]][]).every(([key, values]) => {
    if (!values?.length) return true;
    switch (key) {
      case "category":
        return values.includes(style.category);
      case "collection":
        return values.includes(style.collection);
      case "gender":
        return values.includes(style.gender);
      case "fabric":
        return values.includes(style.fabric ?? "");
      case "fitting":
        return values.includes(style.fitting ?? "");
      case "size":
        return values.some((v) => style.sizes.includes(v));
      case "colourGroup":
        return values.some((v) => style.colours.some((c) => (c.group || "").toUpperCase() === v));
      default:
        return true;
    }
  });
}

export const SORTS = [
  { key: "code", label: "Code" },
  { key: "name", label: "A–Z" },
  { key: "colours", label: "Most colours" },
] as const;

export type SortKey = (typeof SORTS)[number]["key"];

export function sortStyles(styles: Style[], sort: SortKey): Style[] {
  const out = [...styles];
  if (sort === "name") out.sort((a, b) => a.name.localeCompare(b.name));
  else if (sort === "colours") out.sort((a, b) => b.colours.length - a.colours.length || a.code.localeCompare(b.code));
  else out.sort((a, b) => a.code.localeCompare(b.code));
  return out;
}

/** Same collection first, then anything else, excluding the style itself. */
export function relatedStyles(style: Style, limit = 4): Style[] {
  const sameCategory = STYLES.filter(
    (s) => s.code !== style.code && s.category === style.category && s.collection === style.collection,
  );
  const sameCollection = STYLES.filter(
    (s) => s.code !== style.code && s.collection === style.collection && !sameCategory.includes(s),
  );
  return [...sameCategory, ...sameCollection].slice(0, limit);
}
