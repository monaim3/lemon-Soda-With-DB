"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SiteHeader from "@/components/chrome/SiteHeader";
import SiteFooter from "@/components/chrome/SiteFooter";
import Lightbox from "@/components/product/Lightbox";
import { rangeLabel } from "@/lib/sizes";
import { formatPrice, priceFor, priceLabel, type PriceTier } from "@/lib/pricing";
import {
  colourViews,
  heroImage,
  img,
  productSheetUrl,
  relatedStyles,
  sizeChartFor,
  sizesForColour,
  type Colour,
  type Style,
} from "@/lib/catalogue";
import ProductGallery from "./ProductGallery";
import SpecificationsSection from "./SpecificationsSection";
import { ChevronDown } from "./icons";
import {
  ADD_BTN,
  ADD_BTN_INNER,
  ADD_WRAP,
  CLEAR_LINK,
  COLOUR_CELL,
  COLOUR_NAME,
  COLOUR_ROW,
  COLOUR_SWATCH,
  CRUMBS,
  DESC,
  DOWNLOADS_GRID,
  DOWNLOAD_META,
  DOWNLOAD_NAME,
  DOWNLOAD_PENDING,
  DOWNLOAD_ROW,
  H1,
  INFO,
  MAIN_GRID,
  META_DIVIDER,
  META_ITEM,
  META_ROW,
  MODULE,
  MODULE_COUNT,
  MODULE_HEAD,
  MODULE_TITLE,
  NEW_TAG,
  NUM_CELL,
  ORDER_ACTIONS,
  ORDER_DIALOG,
  ORDER_DIALOG_INPUT,
  ORDER_DIALOG_SUBMIT,
  ORDER_DIALOG_TITLE,
  ORDER_FOOT,
  ORDER_HEAD,
  ORDER_HEAD_CELL,
  ORDER_ROW,
  ORDER_TOTALS,
  ORDER_UNITS,
  ORDER_VALUE,
  PANEL,
  PANEL_COLOUR_NAME,
  PANEL_HEAD,
  PANEL_HEAD_LEFT,
  PANEL_SKU,
  PANEL_SWATCH,
  PRICE_NOTE,
  PRICE_VALUE,
  QTY_CELL_WRAP,
  QTY_ERROR,
  QTY_ERROR_ARROW,
  QTY_INPUT,
  RELATED,
  RELATED_ALL,
  RELATED_CARD,
  RELATED_CODE,
  RELATED_COLOUR_LABEL,
  RELATED_GRID,
  RELATED_GROUP,
  RELATED_HEAD,
  RELATED_IMG,
  RELATED_NAME,
  RELATED_ROW,
  RELATED_TITLE,
  SECTION,
  SECTION_ARROW,
  SECTION_INNER,
  SECTION_TOGGLE,
  SIZES_VALUE,
  SIZE_CELL,
  SIZE_GUIDE_LINK,
  SPEC_BLOCK,
  SPEC_LABEL,
  SPEC_ROW,
  SPEC_VALUE,
  STYLE_NAME,
  TOP,
} from "@/app/product/productClasses";


export default function ProductClient({ style }: { style: Style }) {
  const [view, setView] = useState(0);
  const [colourIndex, setColourIndex] = useState(0);
  const [colourPicked, setColourPicked] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [qty, setQty] = useState<Record<string, number>>({});
  const [qtyError, setQtyError] = useState(false);
  const [orderDialog, setOrderDialog] = useState(false);
  const [orderRef, setOrderRef] = useState("");
  const [specOpen, setSpecOpen] = useState(true);
  const [downloadsOpen, setDownloadsOpen] = useState(false);
  const [perRow, setPerRow] = useState(4);
  const [zoom, setZoom] = useState(false);
  /** SKU -> units on hand. null until the request settles, and after any failure. */
  const [stock, setStock] = useState<Record<string, number> | null>(null);

  const moduleRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const priceRef = useRef<HTMLDivElement>(null);

  // Navigating between styles remounts this component (keyed on the style code
  // by the route), so gallery/colour/basket state resets on its own.

  /**
   * Stock is live and dealer-only, so it is fetched after the page renders
   * rather than built in. Any failure — not signed in, feed down — leaves it
   * null and the column shows "—".
   */
  useEffect(() => {
    let cancelled = false;
    fetch(`/api/stock/${style.code}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (!cancelled && data?.levels) setStock(data.levels);
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [style.code]);

  useEffect(() => {
    const onResize = () => setPerRow(window.innerWidth < 620 ? 2 : 4);
    onResize();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setQtyError(false);
    };
    const onDocClick = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (orderDialog && t && !t.closest?.("[data-order-dialog]") && !t.closest?.("[data-add-btn]")) {
        setOrderDialog(false);
      }
      if (!qtyError) return;
      if (t && t.tagName === "INPUT" && (t as HTMLInputElement).type === "number") return;
      setQtyError(false);
    };
    window.addEventListener("keydown", onKey);
    document.addEventListener("click", onDocClick, true);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onDocClick, true);
    };
  }, [orderDialog, qtyError]);

  const colours = style.colours;
  const activeColour: Colour | undefined = colours[colourIndex] ?? colours[0];

  const gallery = useMemo(() => {
    if (colourPicked && activeColour) return colourViews(style, activeColour);
    const hero = heroImage(style);
    const all = style.gallery.map((g) => img(style.code, g));
    return all.length ? all : hero ? [hero] : [];
  }, [style, activeColour, colourPicked]);

  /**
   * Bring the colour table into view after a colour is picked.
   *
   * Scroll distance is worked out from the viewport rather than fixed, because
   * the right answer differs by screen: on a tall monitor the table is nearly
   * in view already and a small nudge does it, while on a laptop it needs most
   * of a screen's worth. Two bounds decide it:
   *
   *   needed — scroll just far enough to show the whole table.
   *   limit  — stop with the price block tucked under the bar.
   *
   * The limit is what keeps the layout intact. Scrolling past it runs the
   * sticky gallery out of travel, so the image unlatches and its top slides
   * behind the bar. Taking the smaller of the two means a big screen scrolls
   * only as far as it needs, a small screen stops at the price, and the image
   * stays put either way.
   */
  const revealOnPick = () => {
    requestAnimationFrame(() => {
      const table = moduleRef.current;
      if (!table) return;

      const bar = document.querySelector("header");
      const barHeight = bar ? bar.getBoundingClientRect().height : 78;
      const gap = 12;
      const y = window.scrollY;
      const rect = table.getBoundingClientRect();

      // Already fully readable — moving the page would just be noise.
      if (rect.top >= barHeight && rect.bottom <= window.innerHeight) return;

      const needed = rect.bottom + y - window.innerHeight + gap;
      const price = priceRef.current;
      const limit = price
        ? price.getBoundingClientRect().top + y - barHeight - gap
        : Number.POSITIVE_INFINITY;

      const top = Math.max(0, Math.min(needed, limit));
      if (Math.abs(top - y) > 4) window.scrollTo({ top, behavior: "smooth" });
    });
  };

  const pickColour = (idx: number) => {
    const opening = !(colourIndex === idx && panelOpen);
    setColourIndex(idx);
    setPanelOpen(opening);
    // Unselecting returns the gallery to the style's model shots.
    setColourPicked(opening);
    setView(0);
    if (opening) revealOnPick();
  };

  const colourRows = useMemo(() => {
    const rows: { start: number; cells: Colour[] }[] = [];
    for (let i = 0; i < colours.length; i += perRow) {
      rows.push({ start: i, cells: colours.slice(i, i + perRow) });
    }
    return rows;
  }, [colours, perRow]);

  // Order lines for the open colour, in canonical size order.
  const orderRows = useMemo(() => {
    if (!activeColour) return [];
    const sizes = sizesForColour(activeColour);
    return sizes.map((size) => {
      const sku = activeColour.skus.find((k) => k.size === size)!;
      return { ...sku, size };
    });
  }, [activeColour]);

  /**
   * Signed-out visitors see retail. When auth lands, read the dealer's assigned
   * tier ("A" | "B") here and fetch their prices from the API — the trade rates
   * are deliberately not in the bundle.
   */
  const tier: PriceTier = "retail";
  const unitPrice = priceFor(style.code, tier);

  const orderUnits = Object.values(qty).reduce((n, v) => n + (v || 0), 0);
  const orderValue = unitPrice === null ? null : orderUnits * unitPrice;

  const setQtyFor = (sku: string, raw: string) => {
    const v = parseInt(raw, 10);
    setQty((prev) => ({ ...prev, [sku]: isNaN(v) || v <= 0 ? 0 : v }));
    setQtyError(false);
  };

  const addToOrder = () => {
    const entered = orderRows.some((r) => (qty[r.sku] || 0) > 0);
    setQtyError(!entered);
    setOrderDialog(entered);
  };

  const openSizeChart = () => {
    const go = () => {
      const el = document.getElementById("size-chart");
      if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: "smooth" });
    };
    if (!specOpen) {
      setSpecOpen(true);
      requestAnimationFrame(go);
    } else go();
  };

  const chart = sizeChartFor(style);
  const related = relatedStyles(style);

  // Specifications, dropping any attribute this style has no value for.
  const styleSpecs = [
    { label: "Collection", value: style.collection },
    { label: "Fitting", value: style.fitting },
    { label: "Fabric", value: style.fabric },
    { label: "Collar", value: style.collar },
    { label: "Sleeve", value: style.sleeve },
    { label: "Closure", value: style.closure },
    { label: "Composition", value: style.composition },
  ].filter((r) => r.value);

  const productDetails = [
    { label: "Manufacturer code", value: activeColour?.skus[0]?.barcode ?? null },
    { label: "Commodity code", value: style.customsCode },
    { label: "Country of origin", value: style.origin },
    { label: "Product weight", value: style.weightNett ? `${style.weightNett.replace(",", ".")} kg` : null },
    { label: "Box weight", value: style.weightBox },
    { label: "Box contents", value: style.boxContents ? `${style.boxContents} pieces` : null },
  ].filter((r) => r.value);

  return (
    <>
      <SiteHeader blur />

      {zoom && gallery.length > 0 && (
        <Lightbox
          images={gallery}
          index={view}
          alt={style.name}
          onClose={() => setZoom(false)}
          onIndex={setView}
        />
      )}

      <section className={TOP}>
        <div className={CRUMBS}>
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/catalogue">Catalogue</Link>
          <span>/</span>
          <span>{style.code}</span>
        </div>

        <div className={MAIN_GRID}>
          <ProductGallery
            images={gallery}
            view={view}
            onView={setView}
            onZoom={() => setZoom(true)}
            alt={style.name}
            galleryRef={galleryRef}
          />

          <div className={INFO}>
            <h1 className={H1}>{style.code}</h1>
            <p className={STYLE_NAME}>{style.name}</p>
            <div className={META_ROW}>
              <span className={META_ITEM}>{style.collection}</span>
              <span className={META_DIVIDER} />
              <span className={META_ITEM}>{style.gender}</span>
              <span className={META_DIVIDER} />
              <span className={META_ITEM}>{style.category}</span>
              {style.isNew && <span className={NEW_TAG}>New</span>}
            </div>

            {style.description && <p className={DESC}>{style.description}</p>}
            {style.descriptionPoints.map((p) => (
              <p key={p} className={DESC}>
                {p}
              </p>
            ))}

            <div ref={priceRef} className={SPEC_BLOCK}>
              <div className={SPEC_ROW}>
                <span className={SPEC_LABEL}>{priceLabel(tier)}</span>
                <span className={PRICE_VALUE}>
                  {unitPrice === null ? "—" : formatPrice(unitPrice)}
                  {tier === "retail" && (
                    <span className={PRICE_NOTE}>
                      Sign in to view your price &amp; stock levels
                    </span>
                  )}
                </span>
              </div>
              <div className={SPEC_ROW}>
                <span className={SPEC_LABEL}>Sizes</span>
                <span className={`${SPEC_VALUE} ${SIZES_VALUE}`}>
                  {style.sizeRange || rangeLabel(style.sizes as never)}
                  <a
                    href="#size-chart"
                    className={SIZE_GUIDE_LINK}
                    onClick={(e) => {
                      e.preventDefault();
                      openSizeChart();
                    }}
                  >
                    Size guide
                  </a>
                </span>
              </div>
              {style.composition && (
                <div className={SPEC_ROW}>
                  <span className={SPEC_LABEL}>Material</span>
                  <span className={SPEC_VALUE}>{style.composition}</span>
                </div>
              )}
              {style.weight && (
                <div className={SPEC_ROW}>
                  <span className={SPEC_LABEL}>Weight</span>
                  <span className={SPEC_VALUE}>{style.weight}</span>
                </div>
              )}
            </div>

            <div ref={moduleRef} className={MODULE}>
              <div className={MODULE_HEAD}>
                <span className={MODULE_TITLE}>Available colours</span>
                <span className={MODULE_COUNT}>{colours.length} colours available</span>
              </div>

              {colourRows.map((row) => {
                const holdsActive = colourIndex >= row.start && colourIndex < row.start + perRow;
                return (
                  <div key={row.start}>
                    <div className={COLOUR_ROW} style={{ gridTemplateColumns: `repeat(${perRow}, minmax(0,1fr))` }}>
                      {row.cells.map((c, j) => {
                        const idx = row.start + j;
                        const on = idx === colourIndex && panelOpen;
                        return (
                          <button
                            key={c.code}
                            type="button"
                            className={COLOUR_CELL}
                            aria-label={`${c.name} (${c.code})`}
                            aria-expanded={on}
                            style={{
                              background: on ? "rgba(18,18,17,0.06)" : "transparent",
                              borderLeft: j === 0 ? "none" : "1px solid rgba(18,18,17,0.12)",
                            }}
                            onClick={() => pickColour(idx)}
                          >
                            <span className={COLOUR_SWATCH} style={{ background: c.hex }} />
                            <span className={COLOUR_NAME} style={{ fontWeight: on ? 600 : 400 }}>
                              {c.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {holdsActive && panelOpen && activeColour && (
                      <div className={PANEL}>
                        <div className={PANEL_HEAD}>
                          <span className={PANEL_HEAD_LEFT}>
                            <span className={PANEL_SWATCH} style={{ background: activeColour.hex }} />
                            <span className={PANEL_COLOUR_NAME}>{activeColour.name}</span>
                          </span>
                          <span className={PANEL_SKU}>
                            {style.code} {activeColour.code}
                          </span>
                        </div>

                        <div className={ORDER_HEAD}>
                          <span className={ORDER_HEAD_CELL}>Size</span>
                          <span className={ORDER_HEAD_CELL} style={{ textAlign: "right" }}>
                            Stock
                          </span>
                          <span className={ORDER_HEAD_CELL} style={{ textAlign: "right" }}>
                            Price
                          </span>
                          <span className={ORDER_HEAD_CELL} style={{ textAlign: "right" }}>
                            Qty
                          </span>
                        </div>

                        {orderRows.map((r, i) => (
                          <div key={r.sku} className={ORDER_ROW}>
                            <span className={SIZE_CELL}>{r.size}</span>
                            <span className={NUM_CELL} style={{ color: "rgba(18,18,17,0.8)" }}>
                              {stock?.[r.sku] === undefined ? "—" : stock[r.sku].toLocaleString("en-GB")}
                            </span>
                            <span className={NUM_CELL}>{unitPrice === null ? "—" : formatPrice(unitPrice)}</span>
                            <span className={QTY_CELL_WRAP}>
                              <input
                                type="number"
                                min={0}
                                value={qty[r.sku] || ""}
                                onChange={(e) => setQtyFor(r.sku, e.target.value)}
                                placeholder="0"
                                aria-label={`Quantity, size ${r.size}`}
                                className={QTY_INPUT}
                                style={{ borderColor: i === 0 && qtyError ? "#8E4249" : "rgba(18,18,17,0.22)" }}
                              />
                              {i === 0 && qtyError && (
                                <span className={QTY_ERROR} role="status">
                                  Enter quantity
                                  <span className={QTY_ERROR_ARROW} />
                                </span>
                              )}
                            </span>
                          </div>
                        ))}

                        <div className={`${ORDER_FOOT} hidden`}>{/* TODO: unhide when order flow ready */}
                          <span className={ORDER_TOTALS}>
                            <span className={ORDER_UNITS}>{orderUnits === 1 ? "1 piece" : `${orderUnits} pieces`}</span>
                            <span className={ORDER_VALUE}>{orderValue === null ? "—" : formatPrice(orderValue)}</span>
                          </span>
                          <span className={ORDER_ACTIONS}>
                            <button
                              type="button"
                              className={CLEAR_LINK}
                              onClick={() => {
                                setQty({});
                                setQtyError(false);
                              }}
                            >
                              Clear
                            </button>
                            <span className={ADD_WRAP}>
                              <button type="button" data-add-btn className={ADD_BTN} onClick={addToOrder}>
                                <span className={ADD_BTN_INNER}>
                                  Add to order
                                  <svg width="10" height="7" viewBox="0 0 10 7" fill="none" stroke="currentColor" strokeWidth="1.3" aria-hidden="true">
                                    <path d="M1 5.5L5 1.5l4 4" />
                                  </svg>
                                </span>
                              </button>

                              {orderDialog && (
                                <span className={ORDER_DIALOG} data-order-dialog>
                                  <span className={ORDER_DIALOG_TITLE}>Create a new order</span>
                                  <input
                                    type="text"
                                    value={orderRef}
                                    onChange={(e) => setOrderRef(e.target.value)}
                                    placeholder="Enter order reference"
                                    className={ORDER_DIALOG_INPUT}
                                  />
                                  <button
                                    type="button"
                                    onClick={() => orderRef.trim() && setOrderDialog(false)}
                                    className={ORDER_DIALOG_SUBMIT}
                                    style={{
                                      background: orderRef.trim() ? "#121211" : "rgba(18,18,17,0.14)",
                                      color: orderRef.trim() ? "#F4F2ED" : "rgba(18,18,17,0.45)",
                                    }}
                                  >
                                    Create order
                                  </button>
                                </span>
                              )}
                            </span>
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <SpecificationsSection
        style={style}
        open={specOpen}
        onToggle={() => setSpecOpen((v) => !v)}
        chart={chart}
        styleSpecs={styleSpecs}
        productDetails={productDetails}
      />

      <section className={SECTION}>
        <div className={SECTION_INNER}>
          <button
            type="button"
            className={SECTION_TOGGLE}
            aria-expanded={downloadsOpen}
            onClick={() => setDownloadsOpen((v) => !v)}
          >
            <span>Downloads</span>
            <span className={SECTION_ARROW} style={{ transform: downloadsOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
              <ChevronDown />
            </span>
          </button>
          {downloadsOpen && (
            <div className={DOWNLOADS_GRID}>
              <a href={productSheetUrl(style.code)} target="_blank" rel="noopener" className={DOWNLOAD_ROW}>
                <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span className={DOWNLOAD_NAME}>Size specification</span>
                  <span className={DOWNLOAD_META}>PDF · {style.code}</span>
                </span>
                <svg width="18" height="18" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <path d="M10 3v10" />
                  <path d="M5.5 9.5L10 14l4.5-4.5" />
                  <path d="M3.5 17h13" />
                </svg>
              </a>
              <span className={`${DOWNLOAD_ROW} ${DOWNLOAD_PENDING}`}>
                <span style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                  <span className={DOWNLOAD_NAME}>Product images</span>
                  <span className={DOWNLOAD_META}>ZIP · not yet available</span>
                </span>
              </span>
            </div>
          )}
        </div>
      </section>

      {related.length > 0 && (
        <section className={RELATED}>
          <div className={RELATED_HEAD}>
            <h2 className={RELATED_TITLE}>Related styles</h2>
            <Link href="/catalogue" className={RELATED_ALL}>
              All styles
            </Link>
          </div>
          <div className={RELATED_GRID}>
            {related.map((r) => {
              const src = heroImage(r);
              return (
                <Link key={r.code} href={`/product/${r.code}`} className={RELATED_CARD}>
                  <span className={RELATED_IMG}>{src && <img src={src} alt={r.name} loading="lazy" />}</span>
                  <span className={RELATED_ROW}>
                    <span className={RELATED_CODE}>{r.code}</span>
                    <span className={RELATED_GROUP}>{r.collection}</span>
                  </span>
                  <span className={RELATED_NAME}>{r.name}</span>
                  <span className={RELATED_COLOUR_LABEL}>
                    {r.colours.length === 1 ? "1 colour" : `${r.colours.length} colours`}
                  </span>
                </Link>
              );
            })}
          </div>
        </section>
      )}

      <SiteFooter />
    </>
  );
}
