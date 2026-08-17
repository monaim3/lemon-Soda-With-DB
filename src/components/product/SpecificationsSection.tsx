"use client";

import CareInstructions from "./CareInstructions";
import { ChevronDown } from "./icons";
import { productSheetUrl, type Style } from "@/lib/catalogue";
import type { Size } from "@/lib/sizes";
import {
  SECTION,
  SECTION_ARROW,
  SECTION_INNER,
  SECTION_TOGGLE,
  SHEET_BTN,
  SHEET_ROW,
  SIZE_CHART,
  SIZE_CHART_EMPTY,
  SIZE_CHART_HEAD,
  SIZE_CHART_HEAD_ROW,
  SIZE_CHART_LABEL,
  SIZE_CHART_NOTE,
  SIZE_CHART_ROW,
  SIZE_CHART_ROW_LABEL,
  SIZE_CHART_SCROLL,
  SIZE_CHART_TABLE,
  SPEC_GRID,
  SPEC_SECTION,
  SPEC_SECTION_HEADING,
  SPEC_SECTION_ROW,
  SPEC_SECTION_ROWS,
  SPEC_SECTION_ROW_LABEL,
  SPEC_SECTION_ROW_VALUE,
} from "@/app/product/productClasses";

type SpecRow = { label: string; value: string | null };
type Chart = { sizes: Size[]; rows: { key: string | null; label: string; values: string[] }[]; tolerance: string | null };

/**
 * The collapsible Specifications block: product-sheet link, size chart, the two
 * spec tables, then care symbols and certificates.
 */
export default function SpecificationsSection({
  style,
  open,
  onToggle,
  chart,
  styleSpecs,
  productDetails,
}: {
  style: Style;
  open: boolean;
  onToggle: () => void;
  chart: Chart | null;
  styleSpecs: SpecRow[];
  productDetails: SpecRow[];
}) {
  // One grid template shared by the header row and every measurement row.
  const chartColumns = chart
    ? `minmax(150px,220px) repeat(${chart.sizes.length}, minmax(0,1fr))`
    : undefined;

  return (
    <section className={SECTION}>
      <div className={SECTION_INNER}>
        <button type="button" className={SECTION_TOGGLE} aria-expanded={open} onClick={onToggle}>
          <span>Specifications</span>
          <span className={SECTION_ARROW} style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}>
            <ChevronDown />
          </span>
        </button>

        {open && (
          <>
            <div className={SHEET_ROW}>
              <a href={productSheetUrl(style.code)} target="_blank" rel="noopener" className={SHEET_BTN}>
                <svg width="14" height="16" viewBox="0 0 14 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
                  <path d="M1 1.5h7.5L13 6v8.5H1z" />
                  <path d="M8.5 1.5V6H13" />
                </svg>
                <span>Product sheet</span>
              </a>
            </div>

            <div id="size-chart" className={SIZE_CHART}>
              <div className={SIZE_CHART_HEAD}>
                <span className={SIZE_CHART_LABEL}>Size chart</span>
                <span className={SIZE_CHART_NOTE}>
                  Measurements in cm{chart?.tolerance ? ` — tolerance +/- ${chart.tolerance}` : ""}
                </span>
              </div>

              {chart ? (
                <div className={SIZE_CHART_SCROLL}>
                  <div className={SIZE_CHART_TABLE}>
                    <div className={SIZE_CHART_HEAD_ROW} style={{ gridTemplateColumns: chartColumns }}>
                      <span>Size</span>
                      {chart.sizes.map((s) => (
                        <span key={s}>{s}</span>
                      ))}
                    </div>
                    {chart.rows.map((row, i) => (
                      <div
                        key={row.label}
                        className={SIZE_CHART_ROW}
                        style={{
                          gridTemplateColumns: chartColumns,
                          background: i % 2 === 0 ? "rgba(18,18,17,0.03)" : "transparent",
                        }}
                      >
                        <span className={SIZE_CHART_ROW_LABEL}>
                          {row.key ? `${row.key}. ` : ""}
                          {row.label}
                        </span>
                        {row.values.map((v, j) => (
                          <span key={j} style={{ color: v === "—" ? "rgba(18,18,17,0.58)" : "#121211" }}>
                            {v}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <p className={SIZE_CHART_EMPTY}>
                  No measurement table on this style&apos;s spec sheet — see the{" "}
                  <a href={productSheetUrl(style.code)} target="_blank" rel="noopener">
                    product sheet
                  </a>
                  .
                </p>
              )}
            </div>

            <div className={SPEC_GRID}>
              {[
                { heading: "Style specs", rows: styleSpecs },
                { heading: "Product details", rows: productDetails },
              ].map((section) => (
                <div key={section.heading} className={SPEC_SECTION}>
                  <span className={SPEC_SECTION_HEADING}>{section.heading}</span>
                  <div className={SPEC_SECTION_ROWS}>
                    {section.rows.map((r) => (
                      <div key={r.label} className={SPEC_SECTION_ROW}>
                        <span className={SPEC_SECTION_ROW_LABEL}>{r.label}</span>
                        <span className={SPEC_SECTION_ROW_VALUE}>{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <CareInstructions code={style.code} />
          </>
        )}
      </div>
    </section>
  );
}
