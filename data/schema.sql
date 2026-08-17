-- Lemon & Soda UK — product database
--
-- One SQLite file holds everything the site renders: styles, colourways, SKUs,
-- size charts, retail prices and care symbols. It is the single source of
-- truth. src/data/*.json is generated from it by scripts/build-data.mjs and is
-- what the site actually bundles.
--
-- Deliberately not here: Category A/B trade prices. Those are dealer-specific
-- and must be served from an authenticated API, never shipped to the browser.
--
-- Rebuild an empty database with:  sqlite3 lemon-soda.db < schema.sql

PRAGMA foreign_keys = ON;

-- Provenance: where the data came from and when it was built.
CREATE TABLE meta (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE TABLE style (
  code              TEXT PRIMARY KEY,       -- LEM1111
  name              TEXT NOT NULL,
  collection        TEXT NOT NULL,          -- Originals | Deluxe | Workwear | Workwear/Everywear | Orange
  accent            TEXT,                   -- the collection's hex, denormalised for the UI
  category          TEXT,                   -- T-shirts | Polo's | Sweat | Shirts | Jackets | Polar Fleece
  gender            TEXT,                   -- Unisex | Him | Her
  is_new            INTEGER NOT NULL DEFAULT 0,
  description       TEXT,
  weight            TEXT,                   -- "180 gr/m² (white: 170 gr/m²)"
  size_range        TEXT,                   -- "S - 6XL"
  composition       TEXT,
  composition_group TEXT,
  fabric            TEXT,
  fitting           TEXT,
  collar            TEXT,
  sleeve            TEXT,
  closure           TEXT,
  remark            TEXT,                   -- imported but no longer displayed
  origin            TEXT,
  customs_code      TEXT,
  weight_nett       TEXT,
  weight_box        TEXT,
  box_contents      TEXT,
  hero              TEXT                    -- filename of the lead image
);

-- Bullet points under the description, in display order.
CREATE TABLE style_description_point (
  style_code TEXT NOT NULL REFERENCES style(code) ON DELETE CASCADE,
  position   INTEGER NOT NULL,
  text       TEXT NOT NULL,
  PRIMARY KEY (style_code, position)
);

-- "Label: value" lines from the data file's product-details column.
CREATE TABLE style_detail_line (
  style_code TEXT NOT NULL REFERENCES style(code) ON DELETE CASCADE,
  position   INTEGER NOT NULL,
  text       TEXT NOT NULL,
  PRIMARY KEY (style_code, position)
);

-- Every size the style is made in, across all colours, in canonical order.
CREATE TABLE style_size (
  style_code TEXT NOT NULL REFERENCES style(code) ON DELETE CASCADE,
  position   INTEGER NOT NULL,
  size       TEXT NOT NULL,
  PRIMARY KEY (style_code, position)
);

-- Style-level model shots (not colour packshots), in display order.
CREATE TABLE style_gallery (
  style_code TEXT NOT NULL REFERENCES style(code) ON DELETE CASCADE,
  position   INTEGER NOT NULL,
  filename   TEXT NOT NULL,
  PRIMARY KEY (style_code, position)
);

CREATE TABLE colour (
  id           INTEGER PRIMARY KEY,
  style_code   TEXT NOT NULL REFERENCES style(code) ON DELETE CASCADE,
  position     INTEGER NOT NULL,
  code         TEXT NOT NULL,               -- BK, DG, BK-RD
  name         TEXT NOT NULL,               -- Black, Dark Grey
  colour_group TEXT,                        -- BLACK, GREY — drives the colour facet
  hex          TEXT NOT NULL,               -- #2D2926
  UNIQUE (style_code, code)
);

CREATE TABLE colour_view (
  colour_id INTEGER NOT NULL REFERENCES colour(id) ON DELETE CASCADE,
  position  INTEGER NOT NULL,
  filename  TEXT NOT NULL,
  PRIMARY KEY (colour_id, position)
);

-- One row per orderable item. Sizes vary by colour, not just by style.
CREATE TABLE sku (
  sku        TEXT PRIMARY KEY,              -- LEM1111_BK-XS
  style_code TEXT NOT NULL REFERENCES style(code) ON DELETE CASCADE,
  colour_id  INTEGER NOT NULL REFERENCES colour(id) ON DELETE CASCADE,
  size       TEXT NOT NULL,
  barcode    TEXT
);

-- Measurements from the spec-sheet PDFs. Absent for styles whose sheet has no
-- table; the site falls back to linking the PDF.
CREATE TABLE size_chart (
  style_code TEXT PRIMARY KEY REFERENCES style(code) ON DELETE CASCADE,
  tolerance  TEXT                           -- "5%"
);

CREATE TABLE size_chart_size (
  style_code TEXT NOT NULL REFERENCES size_chart(style_code) ON DELETE CASCADE,
  position   INTEGER NOT NULL,
  size       TEXT NOT NULL,
  PRIMARY KEY (style_code, position)
);

CREATE TABLE size_chart_row (
  id         INTEGER PRIMARY KEY,
  style_code TEXT NOT NULL REFERENCES size_chart(style_code) ON DELETE CASCADE,
  position   INTEGER NOT NULL,
  row_key    TEXT,                          -- "A", "B" — the letter on the sheet's diagram
  label      TEXT NOT NULL,                 -- "Body length from HSP"
  UNIQUE (style_code, position)
);

-- One measurement per row per size. "—" where the size is not made.
CREATE TABLE size_chart_value (
  row_id   INTEGER NOT NULL REFERENCES size_chart_row(id) ON DELETE CASCADE,
  position INTEGER NOT NULL,                -- index into size_chart_size
  value    TEXT NOT NULL,
  PRIMARY KEY (row_id, position)
);

-- Retail only. See the note at the top of this file.
CREATE TABLE price (
  style_code TEXT NOT NULL,
  tier       TEXT NOT NULL DEFAULT 'retail',
  amount     REAL NOT NULL,
  currency   TEXT NOT NULL DEFAULT 'GBP',
  PRIMARY KEY (style_code, tier)
);

-- Wash-care symbols, scraped once from the supplier's B2B site.
CREATE TABLE care_icon (
  filename    TEXT PRIMARY KEY,             -- bleach_2.png, served from /care-icons/
  description TEXT NOT NULL                 -- "Do not bleach"
);

CREATE TABLE style_care_icon (
  style_code    TEXT NOT NULL REFERENCES style(code) ON DELETE CASCADE,
  position      INTEGER NOT NULL,
  icon_filename TEXT NOT NULL REFERENCES care_icon(filename),
  PRIMARY KEY (style_code, position)
);

CREATE INDEX idx_colour_style      ON colour (style_code);
CREATE INDEX idx_sku_style         ON sku (style_code);
CREATE INDEX idx_sku_colour        ON sku (colour_id);
CREATE INDEX idx_style_collection  ON style (collection);
CREATE INDEX idx_style_category    ON style (category);
