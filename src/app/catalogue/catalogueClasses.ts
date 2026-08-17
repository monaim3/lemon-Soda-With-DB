/**
 * Classes for the catalogue: the facet rail, the card grid, the toolbar and
 * the mobile refine drawer.
 *
 * The rail is sticky under the header, so its offset and max height are
 * expressed against the same 78px bar height the rest of the site uses.
 */

/* -------------------------------------------------------------------- head */

export const HEAD = "pt-[clamp(36px,4.4vw,64px)] px-gutter pb-0";
/** The final crumb is the current page, so it sits darker than the links. */
export const CRUMBS =
  "flex items-center gap-[10px] text-[11px] tracking-[0.2em] uppercase font-normal text-muted-45 " +
  "[&_a]:border-b [&_a]:border-b-transparent [&_a]:transition-[border-color] " +
  "[&_a]:duration-[400ms] [&_a]:ease-[ease] [&_a:hover]:border-b-[rgba(18,18,17,0.4)] " +
  "[&_span:last-child]:text-[rgba(18,18,17,0.84)]";
export const TITLE =
  "m-0 font-display font-medium text-[clamp(38px,6vw,92px)] leading-[0.98] tracking-[-0.015em] " +
  "pt-[clamp(20px,2.4vw,32px)] px-0 pb-[clamp(24px,2.8vw,40px)]";

export const SEARCH_SUMMARY =
  "flex flex-wrap items-baseline gap-y-2 gap-x-5 mt-[-8px] mx-0 mb-0 " +
  "pb-[clamp(20px,2.4vw,32px)] text-[13px] font-normal text-muted-62";
export const CLEAR_SEARCH =
  "p-0 border-0 border-b border-b-[rgba(18,18,17,0.35)] bg-transparent font-[inherit] " +
  "text-[11px] tracking-[0.18em] uppercase text-ink cursor-pointer " +
  "transition-[border-color] duration-300 ease-[ease] hover:border-b-ink";

/* -------------------------------------------------------------- facet rail */

export const BODY = "px-gutter pt-0 pb-[clamp(56px,6vw,96px)]";
export const BODY_GRID =
  "grid grid-cols-[minmax(190px,220px)_1fr] max-[1119px]:grid-cols-1 " +
  "gap-[clamp(28px,3.6vw,64px)] items-start";
export const RAIL =
  "flex flex-col sticky top-[calc(78px+28px)] max-h-[calc(100vh-78px-56px)] overflow-y-auto " +
  "pr-2 max-[1119px]:hidden";
export const RAIL_HEAD =
  "flex items-baseline justify-between gap-4 pb-[14px] border-b border-b-section-rule";
export const RAIL_HEAD_LABEL =
  "text-[12px] tracking-[0.22em] uppercase font-medium text-muted-45";
export const CLEAR =
  "text-[12px] tracking-[0.18em] uppercase font-normal border-b border-b-transparent " +
  "border-x-0 border-t-0 transition-[color,border-color] duration-[400ms] ease-[ease] " +
  "bg-transparent cursor-pointer p-0 text-inherit hover:border-b-[rgba(18,18,17,0.4)]";

export const FACET = "flex flex-col border-b border-b-[rgba(18,18,17,0.1)]";
export const FACET_TOGGLE =
  "flex items-center justify-between gap-3 min-h-[46px] text-[12px] tracking-[0.22em] uppercase " +
  "font-medium transition-colors duration-[400ms] ease-[ease] bg-transparent border-0 " +
  "cursor-pointer w-full text-inherit p-0 hover:text-ink";
export const FACET_ARROW =
  "flex-none flex items-center justify-center w-[14px] h-[14px] " +
  "transition-transform duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
export const FACET_OPTIONS =
  "flex flex-col gap-[11px] pt-[2px] px-0 pb-[clamp(18px,2vw,24px)]";
export const FACET_OPTION =
  "flex items-center gap-[11px] text-[12.5px] tracking-[0.1em] font-normal " +
  "transition-colors duration-[400ms] ease-[ease] bg-transparent border-0 cursor-pointer " +
  "w-full text-left p-0 text-inherit hover:text-ink";
export const FACET_BOX =
  "flex-none block w-[11px] h-[11px] border border-[rgba(18,18,17,0.28)] " +
  "transition-[background,border-color] duration-[400ms] ease-[ease]";
export const FACET_NAME = "flex-1 min-w-0";
export const FACET_COUNT =
  "flex-none w-7 text-right text-[rgba(18,18,17,0.72)] text-[12px] tracking-[0.08em] tabular-nums";
export const FACET_SWATCH = "flex-none block w-[14px] h-[14px]";

/* ----------------------------------------------------------------- toolbar */

export const TOOLBAR =
  "flex flex-wrap items-center justify-between gap-y-4 gap-x-6 pb-[clamp(20px,2.2vw,28px)] " +
  "border-b border-b-section-rule";
export const TOOLBAR_LEFT = "flex items-center gap-[22px]";
/** Only appears once the rail is hidden. */
export const REFINE_OPEN =
  "hidden max-[1119px]:flex items-center gap-[10px] h-11 text-[12px] tracking-[0.2em] uppercase " +
  "font-medium border-b border-b-[rgba(18,18,17,0.35)] transition-[border-color] " +
  "duration-[400ms] ease-[ease] bg-transparent border-t-0 border-l-0 border-r border-r-transparent " +
  "cursor-pointer text-inherit p-0 hover:border-b-ink";
export const REFINE_BARS =
  "flex flex-col gap-[3px] w-[13px] [&_span]:block [&_span]:h-px [&_span]:bg-current";
export const RESULT_LABEL =
  "text-[11.5px] tracking-[0.2em] uppercase font-normal text-[rgba(18,18,17,0.8)]";

export const CHIPS = "flex flex-wrap items-center gap-[10px] pt-[clamp(18px,2vw,24px)]";
export const CHIP =
  "flex items-center gap-[9px] px-3 py-[7px] border border-[rgba(18,18,17,0.22)] text-[11px] " +
  "tracking-[0.18em] uppercase font-normal text-[rgba(18,18,17,0.82)] " +
  "transition-[border-color,color] duration-[400ms] ease-[ease] bg-transparent cursor-pointer " +
  "hover:border-ink hover:text-ink";
export const CHIP_X = "text-[12px] leading-none text-[rgba(18,18,17,0.66)]";

export const SORT_WRAP = "flex items-center gap-[10px]";
export const SORT_LABEL =
  "text-[11px] tracking-[0.2em] uppercase font-medium text-muted-45";
export const SORT_SELECT =
  "h-[34px] px-2 border border-border-strong bg-white font-[inherit] text-[11px] " +
  "tracking-[0.12em] uppercase text-ink cursor-pointer";

/* -------------------------------------------------------------------- grid */

export const GRID =
  "grid grid-cols-4 max-[1119px]:grid-cols-3 max-[759px]:grid-cols-2 " +
  "gap-y-[clamp(28px,3vw,52px)] gap-x-[clamp(20px,2.4vw,36px)] pt-[clamp(28px,3.2vw,48px)]";

export const CARD =
  "flex flex-col min-w-0 transition-opacity duration-[400ms] ease-[ease] hover:opacity-92";
/*
 * The photography arrives in several ratios (600x850, 640x800, 1400x2100), so
 * `cover` would crop heads and shoulders off some styles and sides off others.
 * `contain` shows every shot whole; the well is the same light grey as the
 * photographers' backdrop, so the letterboxing is invisible.
 */
export const CARD_IMG_WRAP =
  "relative block w-full aspect-[3/4] bg-image-well overflow-hidden " +
  "[&_img]:w-full [&_img]:h-full [&_img]:object-contain [&_img]:block";
export const BADGE =
  "absolute left-0 top-0 px-[11px] py-[7px] bg-ink text-paper text-[10px] tracking-[0.2em] " +
  "uppercase font-medium";
export const THUMBS =
  "absolute left-[14px] flex flex-col gap-2 transition-opacity duration-[320ms] ease-[ease]";
export const THUMB =
  "block w-[52px] aspect-[3/4] bg-white overflow-hidden " +
  "transition-[border-color] duration-[240ms] ease-[ease] " +
  "[&_img]:w-full [&_img]:h-full [&_img]:object-contain [&_img]:block";

export const CARD_ROW = "flex items-baseline justify-between gap-3 pt-4 min-w-0";
export const CARD_CODE =
  "flex-none text-[11.5px] tracking-[0.2em] uppercase font-semibold text-[rgba(18,18,17,0.9)]";
/** Long collection names (Workwear/Everywear) must not spill into the next card. */
export const CARD_GROUP =
  "min-w-0 truncate text-right text-[11px] tracking-[0.18em] uppercase font-normal text-muted-62";
export const CARD_NAME = "block pt-2 text-[15px] leading-[1.5] font-medium text-ink";
export const CARD_SPEC =
  "block pt-[9px] text-[12.5px] tracking-[0.13em] font-normal text-[rgba(18,18,17,0.82)]";
export const CARD_SWATCHES = "flex flex-wrap items-center gap-1 pt-3";
export const CARD_SWATCH =
  "block w-3 h-3 [box-shadow:0_0_0_1px_rgba(18,18,17,0.18)_inset]";
export const CARD_SWATCH_MORE =
  "text-[10.5px] tracking-[0.1em] text-[rgba(18,18,17,0.66)] pl-[2px]";
export const CARD_FOOT = "flex items-baseline justify-between gap-3";
export const CARD_PRICE =
  "flex-none pt-[10px] text-[13px] font-medium tracking-[0.01em] text-ink tabular-nums";
export const CARD_COLOURS =
  "block pt-[10px] text-[11.5px] tracking-[0.2em] uppercase font-normal text-[rgba(18,18,17,0.8)]";

export const EMPTY = "py-[clamp(40px,6vw,80px)] text-[14px] font-normal text-muted-62";
export const CLEAR_INLINE =
  "bg-transparent border-0 border-b border-b-[rgba(18,18,17,0.4)] p-0 [font:inherit] " +
  "text-ink cursor-pointer";

/* ------------------------------------------------------------------ pager */

export const PAGER_ROW =
  "flex flex-wrap items-center justify-between gap-5 mt-[clamp(40px,5vw,72px)] " +
  "pt-[clamp(20px,2.2vw,28px)] border-t border-t-section-rule";
export const PAGE_LABEL =
  "text-[11px] tracking-[0.2em] uppercase font-normal text-muted-45";
export const PAGES = "flex items-center gap-[clamp(12px,1.4vw,20px)]";
export const PAGE_ARROW =
  "flex items-center justify-center w-8 h-11 p-0 border-0 bg-transparent " +
  "text-[rgba(18,18,17,0.72)] cursor-pointer transition-[color,opacity] duration-300 ease-[ease] " +
  "enabled:hover:text-ink disabled:opacity-[0.22] disabled:cursor-default";
export const PAGE_BTN =
  "min-w-6 text-center text-[11.5px] tracking-[0.16em] font-normal pb-1 " +
  "border-b border-b-transparent border-x-0 border-t-0 " +
  "transition-[color,border-color] duration-[400ms] ease-[ease] bg-transparent cursor-pointer " +
  "text-inherit hover:text-ink";

/* --------------------------------------------------- mobile refine drawer */

export const REFINE_SCRIM =
  "fixed inset-0 z-[85] bg-[rgba(18,18,17,0.28)] " +
  "transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]";
export const REFINE_DRAWER =
  "fixed top-0 left-0 bottom-0 w-[clamp(320px,42vw,420px)] max-[759px]:w-[86vw] z-[86] bg-paper " +
  "border-r border-r-border transition-transform duration-500 ease-[cubic-bezier(0.4,0,0.2,1)] " +
  "flex flex-col overflow-y-auto";
export const REFINE_DRAWER_HEAD =
  "flex items-center justify-between gap-6 pt-[clamp(26px,4vw,40px)] px-[clamp(20px,4vw,40px)] pb-0";
export const REFINE_DRAWER_LABEL =
  "text-[12px] tracking-[0.22em] uppercase font-medium text-muted-45";
export const REFINE_DRAWER_CLOSE =
  "flex items-center h-11 text-[12.5px] tracking-[0.19em] uppercase font-normal text-muted-45 " +
  "bg-transparent border-0 cursor-pointer hover:text-ink";
export const REFINE_DRAWER_BODY =
  "flex flex-col pt-[clamp(18px,2.4vw,28px)] px-[clamp(20px,4vw,40px)] pb-[clamp(28px,4vw,48px)]";
export const REFINE_DRAWER_FOOT = "flex items-center gap-6 pt-[clamp(22px,2.6vw,32px)]";
export const APPLY_BTN =
  "flex-1 flex items-center justify-center h-12 bg-ink text-paper text-[12px] tracking-[0.22em] " +
  "uppercase font-medium transition-opacity duration-[400ms] ease-[ease] border-0 cursor-pointer " +
  "hover:opacity-86";
