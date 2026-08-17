"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { colourLabel, heroImage } from "@/lib/catalogue";
import { countMatches, searchStyles } from "@/lib/search";
import { SEARCH_ALL, SEARCH_CLOSE, SEARCH_EMPTY, SEARCH_HIT, SEARCH_HIT_CODE, SEARCH_HIT_IMG, SEARCH_HIT_META, SEARCH_HIT_NAME, SEARCH_HIT_TEXT, SEARCH_INNER, SEARCH_INPUT, SEARCH_PANEL, SEARCH_RESULTS } from "./headerClasses";

/**
 * The in-bar search box and its results. Shared by the sticky header and the
 * landing page's scrolled-in header so the two can't drift apart.
 *
 * The box animates its width from 0; the side borders must be 0px wide when
 * closed or a 2px white sliver shows in the bar.
 */
export default function SearchPanel({
  open,
  onClose,
  inputRef,
  onMouseEnter,
}: {
  open: boolean;
  onClose: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onMouseEnter?: () => void;
}) {
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(-1);
  const router = useRouter();
  const listRef = useRef<HTMLDivElement>(null);

  const hits = useMemo(() => searchStyles(query), [query]);
  const total = useMemo(() => (query.trim().length >= 2 ? countMatches(query) : 0), [query]);

  // Clear when the panel closes, so reopening starts fresh. Adjusted during
  // render rather than in an effect, which avoids a second render pass.
  const [wasOpen, setWasOpen] = useState(open);
  if (wasOpen !== open) {
    setWasOpen(open);
    if (!open) {
      setQuery("");
      setActive(-1);
    }
  }

  const go = (href: string) => {
    onClose();
    router.push(href);
  };

  const seeAll = () => go(`/catalogue?q=${encodeURIComponent(query.trim())}`);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, hits.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, -1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (active >= 0 && hits[active]) go(`/product/${hits[active].style.code}`);
      else if (query.trim().length >= 2) seeAll();
    }
  };

  const showResults = open && query.trim().length >= 2;

  return (
    <>
      <div
        className={SEARCH_PANEL}
        onMouseEnter={onMouseEnter}
        style={{
          width: open ? "min(560px, 82vw)" : "0px",
          borderLeft: `${open ? "1px" : "0px"} solid ${open ? "rgba(18,18,17,0.12)" : "transparent"}`,
          borderRight: `${open ? "1px" : "0px"} solid ${open ? "rgba(18,18,17,0.12)" : "transparent"}`,
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <div className={SEARCH_INNER}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="rgba(18,18,17,0.45)" strokeWidth="1.2" aria-hidden="true" style={{ flex: "none" }}>
            <circle cx="6.8" cy="6.8" r="4.8" />
            <path d="M10.4 10.4L14 14" />
          </svg>
          <input
            ref={inputRef}
            type="search"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setActive(-1);
            }}
            onKeyDown={onKeyDown}
            placeholder="Search styles, colours, codes"
            className={SEARCH_INPUT}
            aria-label="Search the catalogue"
            aria-expanded={showResults}
            aria-controls="search-results"
            role="combobox"
            autoComplete="off"
          />
          <button type="button" onClick={onClose} aria-label="Close search" className={SEARCH_CLOSE}>
            {/* The close cross: a 13px rule, duplicated and counter-rotated. */}
            <span className="block relative w-[13px] h-px">
              <span className="absolute inset-0 w-[13px] h-px bg-current rotate-45" />
              <span className="absolute inset-0 w-[13px] h-px bg-current -rotate-45" />
            </span>
          </button>
        </div>
      </div>

      {showResults && (
        <div className={SEARCH_RESULTS} id="search-results" role="listbox" ref={listRef}>
          {hits.length === 0 ? (
            <p className={SEARCH_EMPTY}>
              No styles match “{query.trim()}”.
            </p>
          ) : (
            <>
              {hits.map((hit, i) => {
                const src = heroImage(hit.style);
                return (
                  <button
                    key={hit.style.code}
                    type="button"
                    role="option"
                    aria-selected={i === active}
                    className={SEARCH_HIT}
                    data-active={i === active}
                    onMouseEnter={() => setActive(i)}
                    onClick={() => go(`/product/${hit.style.code}`)}
                  >
                    <span className={SEARCH_HIT_IMG}>
                      {src && <img src={src} alt="" loading="lazy" />}
                    </span>
                    <span className={SEARCH_HIT_TEXT}>
                      <span className={SEARCH_HIT_CODE}>{hit.style.code}</span>
                      <span className={SEARCH_HIT_NAME}>{hit.style.name}</span>
                      <span className={SEARCH_HIT_META}>
                        {hit.style.collection} · {colourLabel(hit.style.colours.length)}
                        {hit.colours.length > 0 && ` · ${hit.colours.slice(0, 3).join(", ")}`}
                      </span>
                    </span>
                  </button>
                );
              })}
              <button type="button" className={SEARCH_ALL} onClick={seeAll}>
                {total > hits.length
                  ? `See all ${total} results`
                  : `See ${total === 1 ? "the result" : "all results"} in the catalogue`}
              </button>
            </>
          )}
        </div>
      )}
    </>
  );
}
