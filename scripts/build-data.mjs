/**
 * Generate src/data/*.json from data/lemon-soda.db.
 *
 * The database is the source of truth; these JSON files are the form the site
 * bundles, because the catalogue filters and the product page's colour picker
 * are client components and SQLite cannot run in a browser.
 *
 *   npm run data
 *
 * `npm run dev` and `npm run build` both run this first, so the database is
 * always what the site renders — editing src/data/*.json by hand has no effect,
 * it is overwritten on the next build.
 *
 * Uses node:sqlite, built into Node 22 and later, so there is nothing to
 * install and no native module to compile. Output is deterministic: every query
 * is explicitly ordered, so rebuilding without changing the database produces
 * byte-identical files and no spurious diffs.
 */

import { DatabaseSync } from "node:sqlite";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DB_PATH = join(ROOT, "data", "lemon-soda.db");
const OUT_DIR = join(ROOT, "src", "data");

if (!existsSync(DB_PATH)) {
  console.error(
    `\nCannot find ${DB_PATH}\n` +
    `That file is the site's source of truth and is committed with the project.\n` +
    `If it is genuinely missing, restore it from version control.\n`
  );
  process.exit(1);
}

const db = new DatabaseSync(DB_PATH, { readOnly: true });

/** Run a query and return plain rows. */
const all = (sql, ...params) => db.prepare(sql).all(...params);

const meta = Object.fromEntries(all("SELECT key, value FROM meta").map((r) => [r.key, r.value]));

/** Group rows by a key, preserving each group's row order. */
function groupBy(rows, key) {
  const out = new Map();
  for (const row of rows) {
    const k = row[key];
    if (!out.has(k)) out.set(k, []);
    out.get(k).push(row);
  }
  return out;
}

// ---------------------------------------------------------------- catalogue

function buildCatalogue() {
  const styles = all("SELECT * FROM style ORDER BY code");

  const points = groupBy(all("SELECT style_code, text FROM style_description_point ORDER BY style_code, position"), "style_code");
  const details = groupBy(all("SELECT style_code, text FROM style_detail_line ORDER BY style_code, position"), "style_code");
  const sizes = groupBy(all("SELECT style_code, size FROM style_size ORDER BY style_code, position"), "style_code");
  const gallery = groupBy(all("SELECT style_code, filename FROM style_gallery ORDER BY style_code, position"), "style_code");
  const colours = groupBy(all("SELECT * FROM colour ORDER BY style_code, position"), "style_code");
  const views = groupBy(all("SELECT colour_id, filename FROM colour_view ORDER BY colour_id, position"), "colour_id");
  const skus = groupBy(all("SELECT colour_id, sku, size, barcode FROM sku ORDER BY colour_id, rowid"), "colour_id");

  const out = styles.map((s) => {
    const styleColours = (colours.get(s.code) ?? []).map((c) => ({
      code: c.code,
      name: c.name,
      group: c.colour_group,
      hex: c.hex,
      views: (views.get(c.id) ?? []).map((v) => v.filename),
      skus: (skus.get(c.id) ?? []).map((k) => ({ sku: k.sku, size: k.size, barcode: k.barcode })),
    }));

    return {
      code: s.code,
      name: s.name,
      collection: s.collection,
      accent: s.accent,
      category: s.category,
      gender: s.gender,
      isNew: Boolean(s.is_new),
      description: s.description,
      descriptionPoints: (points.get(s.code) ?? []).map((r) => r.text),
      detailLines: (details.get(s.code) ?? []).map((r) => r.text),
      weight: s.weight,
      sizes: (sizes.get(s.code) ?? []).map((r) => r.size),
      sizeRange: s.size_range,
      composition: s.composition,
      compositionGroup: s.composition_group,
      fabric: s.fabric,
      fitting: s.fitting,
      collar: s.collar,
      sleeve: s.sleeve,
      closure: s.closure,
      remark: s.remark,
      origin: s.origin,
      customsCode: s.customs_code,
      weightNett: s.weight_nett,
      weightBox: s.weight_box,
      boxContents: s.box_contents,
      hero: s.hero,
      gallery: (gallery.get(s.code) ?? []).map((r) => r.filename),
      colours: styleColours,
      skuCount: styleColours.reduce((n, c) => n + c.skus.length, 0),
    };
  });

  return {
    source: meta.catalogue_source,
    sheet: meta.catalogue_sheet,
    styleCount: out.length,
    skuCount: out.reduce((n, s) => n + s.skuCount, 0),
    styles: out,
  };
}

// -------------------------------------------------------------- size charts

function buildSizeCharts() {
  const charts = all("SELECT style_code, tolerance FROM size_chart ORDER BY style_code");
  const sizes = groupBy(all("SELECT style_code, size FROM size_chart_size ORDER BY style_code, position"), "style_code");
  const rows = groupBy(all("SELECT id, style_code, row_key, label FROM size_chart_row ORDER BY style_code, position"), "style_code");
  const values = groupBy(all("SELECT row_id, value FROM size_chart_value ORDER BY row_id, position"), "row_id");

  const out = {};
  for (const c of charts) {
    out[c.style_code] = {
      sizes: (sizes.get(c.style_code) ?? []).map((r) => r.size),
      rows: (rows.get(c.style_code) ?? []).map((r) => ({
        key: r.row_key,
        label: r.label,
        values: (values.get(r.id) ?? []).map((v) => v.value),
      })),
      tolerance: c.tolerance,
    };
  }
  return out;
}

// ------------------------------------------------------------------ prices

/**
 * Retail only, and it must stay that way: this file is imported by client
 * components, so everything in it ships to the browser and is readable by
 * anyone. Category A/B are dealer-specific and belong behind authentication.
 */
function buildPrices() {
  const rows = all("SELECT style_code, amount FROM price WHERE tier = 'retail' ORDER BY style_code");
  return {
    source: meta.price_source,
    currency: meta.price_currency,
    note: meta.price_note,
    retail: Object.fromEntries(rows.map((r) => [r.style_code, r.amount])),
  };
}

// -------------------------------------------------------------- care icons

function buildCareIcons() {
  const icons = all("SELECT filename, description FROM care_icon ORDER BY filename");
  const perStyle = groupBy(
    all("SELECT style_code, icon_filename FROM style_care_icon ORDER BY style_code, position"),
    "style_code"
  );
  const styles = {};
  for (const [code, rows] of perStyle) styles[code] = rows.map((r) => r.icon_filename);

  return {
    source: meta.care_source,
    iconPath: meta.care_icon_path,
    icons: Object.fromEntries(icons.map((i) => [i.filename, i.description])),
    styles,
  };
}

// -------------------------------------------------------------------- write

const files = {
  "catalogue.json": buildCatalogue(),
  "sizecharts.json": buildSizeCharts(),
  "prices.json": buildPrices(),
  "care-icons.json": buildCareIcons(),
};

mkdirSync(OUT_DIR, { recursive: true });
for (const [name, payload] of Object.entries(files)) {
  writeFileSync(join(OUT_DIR, name), JSON.stringify(payload, null, 1) + "\n");
  console.log(`  wrote src/data/${name}`);
}

const c = files["catalogue.json"];
console.log(`\n${c.styleCount} styles, ${c.skuCount} SKUs, ${Object.keys(files["sizecharts.json"]).length} size charts`);
db.close();
