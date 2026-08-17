"use client";

import Link from "next/link";
import { Suspense, useEffect, useMemo, useRef, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import SiteHeader from "@/components/chrome/SiteHeader";
import SiteFooter from "@/components/chrome/SiteFooter";
import {
  buildFacets,
  colourLabel,
  heroImage,
  img,
  matchesFacets,
  shortWeight,
  sortStyles,
  STYLES,
  SORTS,
  type ActiveFacets,
  type FacetKey,
  type SortKey,
  type Style,
} from "@/lib/catalogue";
import { searchStyles } from "@/lib/search";
import { formatPrice, retailPrice } from "@/lib/pricing";
import {
  APPLY_BTN,
  BADGE,
  BODY,
  BODY_GRID,
  CARD,
  CARD_CODE,
  CARD_COLOURS,
  CARD_FOOT,
  CARD_GROUP,
  CARD_IMG_WRAP,
  CARD_NAME,
  CARD_PRICE,
  CARD_ROW,
  CARD_SPEC,
  CARD_SWATCH,
  CARD_SWATCHES,
  CARD_SWATCH_MORE,
  CHIP,
  CHIPS,
  CHIP_X,
  CLEAR,
  CLEAR_INLINE,
  CLEAR_SEARCH,
  CRUMBS,
  EMPTY,
  FACET,
  FACET_ARROW,
  FACET_BOX,
  FACET_COUNT,
  FACET_NAME,
  FACET_OPTION,
  FACET_OPTIONS,
  FACET_SWATCH,
  FACET_TOGGLE,
  GRID,
  HEAD,
  PAGER_ROW,
  PAGES,
  PAGE_ARROW,
  PAGE_BTN,
  PAGE_LABEL,
  RAIL,
  RAIL_HEAD,
  RAIL_HEAD_LABEL,
  REFINE_BARS,
  REFINE_DRAWER,
  REFINE_DRAWER_BODY,
  REFINE_DRAWER_CLOSE,
  REFINE_DRAWER_FOOT,
  REFINE_DRAWER_HEAD,
  REFINE_DRAWER_LABEL,
  REFINE_OPEN,
  REFINE_SCRIM,
  RESULT_LABEL,
  SEARCH_SUMMARY,
  SORT_LABEL,
  SORT_SELECT,
  SORT_WRAP,
  THUMB,
  THUMBS,
  TITLE,
  TOOLBAR,
  TOOLBAR_LEFT,
} from "./catalogueClasses";

const PER_PAGE = 12;

function ChevronDown() {
  return (
    <svg width="9" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

function Chevron({ dir }: { dir: "left" | "right" }) {
  return (
    <svg
      width="8"
      height="13"
      viewBox="0 0 6 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
      aria-hidden="true"
      style={dir === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 1L1 5l4 4" />
    </svg>
  );
}

/** Alternate views for the hover preview: the style's other model shots. */
function altViews(style: Style): string[] {
  const gallery = style.gallery.filter((g) => g !== style.hero).map((g) => img(style.code, g));
  if (gallery.length) return gallery.slice(0, 3);
  // Fall back to the first view of the first few colours.
  return style.colours
    .flatMap((c) => (c.views[0] ? [img(style.code, c.views[0])] : []))
    .slice(0, 3);
}

/**
 * Facets, sort and page all live in the query string rather than component
 * state. That makes a filtered view shareable, and — the reason it matters —
 * means returning from a product page restores exactly where you were instead
 * of resetting to page 1. Repeated params (?category=A&category=B) avoid
 * needing a delimiter that a value might contain.
 */
const FACET_KEYS: FacetKey[] = [
  "category",
  "collection",
  "colourGroup",
  "gender",
  "size",
  "fabric",
  "fitting",
];

function CatalogueContent() {
  const [open, setOpen] = useState<Record<string, boolean>>({ category: true });
  const [refine, setRefine] = useState(false);
  const [hoverCode, setHoverCode] = useState<string | null>(null);
  const [previewSrc, setPreviewSrc] = useState<string | null>(null);

  const facets = useMemo(() => buildFacets(), []);

  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const query = (params.get("q") ?? "").trim();

  const active: ActiveFacets = useMemo(() => {
    const a: ActiveFacets = {};
    for (const key of FACET_KEYS) {
      const values = params.getAll(key);
      if (values.length) a[key] = values;
    }
    return a;
  }, [params]);

  const sort = (params.get("sort") as SortKey) || "code";
  const page = Math.max(0, (Number(params.get("page")) || 1) - 1);

  /**
   * router.replace is async, so two changes in the same tick would both read the
   * pre-change URL and the first would be lost. Track the latest committed query
   * in a ref and build each change from that.
   */
  const paramsRef = useRef(params.toString());
  useEffect(() => {
    paramsRef.current = params.toString();
  }, [params]);

  /** Replace rather than push, so paginating doesn't bury the product link in history. */
  const commit = (mutate: (p: URLSearchParams) => void, opts?: { top?: boolean }) => {
    const next = new URLSearchParams(paramsRef.current);
    mutate(next);
    const qs = next.toString();
    paramsRef.current = qs;
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    if (opts?.top) window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggle = (key: FacetKey, value: string) => {
    commit((p) => {
      const current = p.getAll(key);
      p.delete(key);
      const next = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      next.forEach((v) => p.append(key, v));
      p.delete("page");
    });
  };

  // A search narrows the pool first; facets then refine within those results.
  const pool = useMemo(() => {
    if (query.length < 2) return STYLES;
    return searchStyles(query, 0).map((h) => h.style);
  }, [query]);

  const filtered = useMemo(() => pool.filter((s) => matchesFacets(s, active)), [pool, active]);
  const list = useMemo(() => sortStyles(filtered, sort), [filtered, sort]);

  const pageCount = Math.max(1, Math.ceil(list.length / PER_PAGE));
  const currentPage = Math.min(page, pageCount - 1);
  const start = currentPage * PER_PAGE;
  const shown = list.slice(start, start + PER_PAGE);

  const chips: { key: FacetKey; value: string; label: string }[] = [];
  for (const facet of facets) {
    for (const v of active[facet.key] ?? []) {
      const found = facet.values.find((x) => x.value === v);
      chips.push({ key: facet.key, value: v, label: found?.label ?? v });
    }
  }

  const clearAll = () => {
    commit((p) => {
      FACET_KEYS.forEach((k) => p.delete(k));
      p.delete("page");
    });
  };

  const clamp = (i: number) => Math.max(0, Math.min(i, pageCount - 1));

  const setPageParam = (p: URLSearchParams, i: number) => {
    if (i <= 0) p.delete("page");
    else p.set("page", String(i + 1)); // 1-based in the URL
  };

  const goToPage = (i: number) => commit((p) => setPageParam(p, clamp(i)), { top: true });

  const stepPage = (delta: number) =>
    commit((p) => setPageParam(p, clamp(currentPage + delta)), { top: true });

  const resultLabel =
    list.length === STYLES.length
      ? `Showing ${start + 1}–${Math.min(start + PER_PAGE, list.length)} of ${list.length} styles`
      : `${list.length} of ${STYLES.length} styles`;

  const renderFacet = (facet: ReturnType<typeof buildFacets>[number]) => {
    const isOpen = open[facet.key] ?? facet.key === "category";
    const picked = active[facet.key]?.length ?? 0;
    return (
      <div key={facet.key} className={FACET}>
        <button
          type="button"
          className={FACET_TOGGLE}
          aria-expanded={isOpen}
          style={{ color: isOpen || picked ? "#121211" : "rgba(18,18,17,0.64)" }}
          onClick={() => setOpen((o) => ({ ...o, [facet.key]: !isOpen }))}
        >
          <span>
            {facet.label}
            {picked ? ` (${picked})` : ""}
          </span>
          <span className={FACET_ARROW} style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}>
            <ChevronDown />
          </span>
        </button>
        {isOpen && (
          <div className={FACET_OPTIONS}>
            {facet.values.map((v) => {
              const on = !!active[facet.key]?.includes(v.value);
              return (
                <button
                  key={v.value}
                  type="button"
                  className={FACET_OPTION}
                  style={{ color: on ? "#121211" : "rgba(18,18,17,0.78)" }}
                  onClick={() => toggle(facet.key, v.value)}
                >
                  <span
                    className={FACET_BOX}
                    style={{
                      background: on ? "#121211" : "transparent",
                      borderColor: on ? "#121211" : "rgba(18,18,17,0.28)",
                    }}
                  />
                  <span className={FACET_NAME}>{v.label}</span>
                  <span className={FACET_COUNT}>{v.count}</span>
                  {v.hex && (
                    <span
                      className={FACET_SWATCH}
                      style={{ background: v.hex, boxShadow: "0 0 0 1px rgba(18,18,17,0.18) inset" }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      <SiteHeader />

      <section className={HEAD}>
        <div className={CRUMBS}>
          <Link href="/">Home</Link>
          <span>/</span>
          <span>Catalogue</span>
        </div>
        <h1 className={TITLE}>{query ? "Search results" : "The catalogue"}</h1>
        {query && (
          <p className={SEARCH_SUMMARY}>
            <span>
              {list.length === 1 ? "1 style matches" : `${list.length} styles match`} “{query}”
            </span>
            <button type="button" className={CLEAR_SEARCH} onClick={() => router.push("/catalogue")}>
              Clear search
            </button>
          </p>
        )}
      </section>

      <section className={BODY}>
        <div className={BODY_GRID}>
          <aside className={RAIL}>
            <div className={RAIL_HEAD}>
              <span className={RAIL_HEAD_LABEL}>Refine</span>
              <button
                type="button"
                className={CLEAR}
                style={{ color: chips.length ? "rgba(18,18,17,0.82)" : "rgba(18,18,17,0.5)" }}
                onClick={clearAll}
              >
                Clear
              </button>
            </div>
            {facets.map(renderFacet)}
          </aside>

          <div style={{ minWidth: 0 }}>
            <div className={TOOLBAR}>
              <div className={TOOLBAR_LEFT}>
                <button type="button" className={REFINE_OPEN} onClick={() => setRefine(true)}>
                  <span className={REFINE_BARS}>
                    <span />
                    <span style={{ width: "70%" }} />
                    <span style={{ width: "40%" }} />
                  </span>
                  Refine{chips.length ? ` (${chips.length})` : ""}
                </button>
                <span className={RESULT_LABEL}>{resultLabel}</span>
              </div>
              <label className={SORT_WRAP}>
                <span className={SORT_LABEL}>Sort</span>
                <select
                  className={SORT_SELECT}
                  value={sort}
                  onChange={(e) => {
                    const value = e.target.value as SortKey;
                    commit((p) => {
                      if (value === "code") p.delete("sort");
                      else p.set("sort", value);
                      p.delete("page");
                    });
                  }}
                >
                  {SORTS.map((s) => (
                    <option key={s.key} value={s.key}>
                      {s.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {chips.length > 0 && (
              <div className={CHIPS}>
                {chips.map((c) => (
                  <button key={c.key + c.value} type="button" className={CHIP} onClick={() => toggle(c.key, c.value)}>
                    <span>{c.label}</span>
                    <span className={CHIP_X}>×</span>
                  </button>
                ))}
              </div>
            )}

            <div className={GRID}>
              {shown.map((style) => {
                const hovering = hoverCode === style.code;
                const hero = heroImage(style);
                const alts = altViews(style);
                const views = hero ? [hero, ...alts.filter((a) => a !== hero)] : alts;
                const activeSrc = (hovering && previewSrc) || hero || alts[0];
                return (
                  <Link
                    key={style.code}
                    href={`/product/${style.code}`}
                    className={CARD}
                    onMouseEnter={() => {
                      setHoverCode(style.code);
                      setPreviewSrc(null);
                    }}
                    onMouseLeave={() => {
                      setHoverCode(null);
                      setPreviewSrc(null);
                    }}
                  >
                    <span className={CARD_IMG_WRAP}>
                      {activeSrc && <img src={activeSrc} alt={style.name} loading="lazy" />}
                      {style.isNew && <span className={BADGE}>New</span>}
                      {hovering && views.length > 1 && (
                        <span className={THUMBS} style={{ top: style.isNew ? 52 : 14 }}>
                          {views.slice(0, 4).map((src) => (
                            <span
                              key={src}
                              className={THUMB}
                              style={{
                                border: src === activeSrc ? "1px solid #121211" : "1px solid rgba(18,18,17,0.14)",
                              }}
                              onMouseEnter={() => setPreviewSrc(src)}
                              onMouseLeave={() => setPreviewSrc(null)}
                            >
                              <img src={src} alt="" loading="lazy" />
                            </span>
                          ))}
                        </span>
                      )}
                    </span>
                    <span className={CARD_ROW}>
                      <span className={CARD_CODE}>{style.code}</span>
                      <span className={CARD_GROUP}>{style.collection}</span>
                    </span>
                    <span className={CARD_NAME}>{style.name}</span>
                    <span className={CARD_SPEC}>
                      {style.sizeRange}
                      {style.weight ? ` · ${shortWeight(style.weight)}` : ""}
                    </span>
                    <span className={CARD_SWATCHES}>
                      {style.colours.slice(0, 10).map((c) => (
                        <span
                          key={c.code}
                          className={CARD_SWATCH}
                          style={{ background: c.hex }}
                          title={c.name}
                        />
                      ))}
                      {style.colours.length > 10 && (
                        <span className={CARD_SWATCH_MORE}>+{style.colours.length - 10}</span>
                      )}
                    </span>
                    <span className={CARD_FOOT}>
                      <span className={CARD_COLOURS}>{colourLabel(style.colours.length)}</span>
                      {retailPrice(style.code) !== null && (
                        <span className={CARD_PRICE}>{formatPrice(retailPrice(style.code)!)}</span>
                      )}
                    </span>
                  </Link>
                );
              })}
            </div>

            {shown.length === 0 && (
              <p className={EMPTY}>
                {query ? `No styles match “${query}”` : "No styles match those filters"}.{" "}
                <button
                  type="button"
                  className={CLEAR_INLINE}
                  onClick={() => {
                    clearAll();
                    if (query) router.push("/catalogue");
                  }}
                >
                  Clear {query ? "search" : "all"}
                </button>
              </p>
            )}

            <div className={PAGER_ROW}>
              <span className={PAGE_LABEL}>
                Page {currentPage + 1} of {pageCount}
              </span>
              <div className={PAGES}>
                <button
                  type="button"
                  className={PAGE_ARROW}
                  aria-label="Previous page"
                  disabled={currentPage === 0}
                  onClick={() => stepPage(-1)}
                >
                  <Chevron dir="left" />
                </button>
                {Array.from({ length: pageCount }, (_, i) => (
                  <button
                    key={i}
                    type="button"
                    className={PAGE_BTN}
                    aria-current={i === currentPage ? "page" : undefined}
                    style={{
                      color: i === currentPage ? "#121211" : "rgba(18,18,17,0.8)",
                      borderBottomColor: i === currentPage ? "#121211" : "transparent",
                    }}
                    onClick={() => goToPage(i)}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  type="button"
                  className={PAGE_ARROW}
                  aria-label="Next page"
                  disabled={currentPage >= pageCount - 1}
                  onClick={() => stepPage(1)}
                >
                  <Chevron dir="right" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div
        className={REFINE_SCRIM}
        style={{ opacity: refine ? 1 : 0, pointerEvents: refine ? "auto" : "none" }}
        onClick={() => setRefine(false)}
      />
      <aside className={REFINE_DRAWER} style={{ transform: refine ? "translateX(0)" : "translateX(-100%)" }}>
        <div className={REFINE_DRAWER_HEAD}>
          <span className={REFINE_DRAWER_LABEL}>Refine</span>
          <button type="button" className={REFINE_DRAWER_CLOSE} onClick={() => setRefine(false)}>
            Close
          </button>
        </div>
        <div className={REFINE_DRAWER_BODY}>
          {facets.map(renderFacet)}
          <div className={REFINE_DRAWER_FOOT}>
            <button type="button" className={APPLY_BTN} onClick={() => setRefine(false)}>
              Show {list.length} styles
            </button>
            <button
              type="button"
              className={CLEAR}
              style={{ color: chips.length ? "rgba(18,18,17,0.82)" : "rgba(18,18,17,0.5)" }}
              onClick={clearAll}
            >
              Clear
            </button>
          </div>
        </div>
      </aside>

      <SiteFooter />
    </>
  );
}


export default function CataloguePage() {
  // useSearchParams needs a Suspense boundary for the prerendered shell.
  return (
    <Suspense fallback={null}>
      <CatalogueContent />
    </Suspense>
  );
}
