/**
 * Class strings shared by the site chrome.
 *
 * SiteHeader, LandingChrome, SearchPanel and AccountMenu all render parts of
 * the same bar, and previously shared one stylesheet. These constants keep that
 * single source of truth: change a value here and every variant follows, which
 * is what stops the sticky bar and the landing hero bar drifting apart.
 *
 * Arbitrary values ([11.5px], [0.19em]) are used wherever the design's figure
 * has no equivalent on Tailwind's scale, so the rendered result is unchanged.
 */

/*
 * Only the -webkit- prefixed form, deliberately.
 *
 * The previous build's CSS minifier emitted only `-webkit-backdrop-filter`, and
 * the site depends on that: the standard property makes this element a
 * containing block for `position: fixed` descendants, which collapses the
 * dropdown scrim inside the header to zero height. The prefixed form blurs
 * without that side effect.
 *
 * If you switch to the standard property, give the scrim an explicit height
 * instead of relying on top/bottom, or move it out of the header.
 */
export const HEADER =
  "sticky top-0 z-[60] bg-paper border-b border-b-section-rule " +
  // The blurred variant is applied by data attribute so the caller can toggle
  // it without swapping class strings.
  "data-[blur=true]:bg-[rgba(244,242,237,0.94)] " +
  "data-[blur=true]:[-webkit-backdrop-filter:blur(14px)]";

export const BAR =
  "relative grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-gutter h-[78px] max-[759px]:h-[64px]";

/** Nav clusters either side of the logo. */
const NAV_BASE =
  "flex items-center gap-[clamp(18px,2.4vw,32px)] text-[11.5px] tracking-[0.19em] uppercase font-normal text-muted-62";
/* Below 760px only the Menu button survives; the rest of the links are hidden. */
export const NAV_LEFT = `${NAV_BASE} max-[759px]:[&>a]:hidden`;
export const NAV_RIGHT = `${NAV_BASE} justify-end max-[759px]:[&>a]:hidden`;

export const MENU_LINK =
  "flex items-center gap-[11px] h-11 cursor-pointer bg-transparent border-0 p-0 " +
  "text-inherit [font:inherit] tracking-[inherit] uppercase hover:text-ink";

export const BURGER =
  "flex flex-col gap-[3.5px] w-4 [&_span]:block [&_span]:h-px [&_span]:bg-current";

/** A bar item that underlines on hover. The border is always there, just clear. */
export const NAV_ITEM =
  "flex items-center h-11 py-[6px] px-0 border-b border-b-transparent border-x-0 border-t-0 " +
  "transition-[border-color,opacity] duration-[400ms] ease-[ease] bg-transparent text-inherit " +
  "[font:inherit] tracking-[inherit] uppercase cursor-pointer hover:text-ink hover:border-b-ink";

/* `[&_img]:…` reproduces the stylesheet's `.logo img` rule: the markup has no
   class on the image, and without this it renders at its natural size and
   blows the three-column bar apart. */
export const LOGO =
  "flex items-center justify-self-center transition-opacity duration-300 ease-[ease] " +
  "[&_img]:h-11 [&_img]:w-auto [&_img]:block max-[759px]:[&_img]:h-[34px]";

/* ------------------------------------------------------------------ search */

export const SEARCH_PANEL =
  "absolute top-0 left-[calc(50%-min(280px,41vw))] h-full overflow-hidden bg-white box-border " +
  "transition-[width] duration-[560ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
export const SEARCH_INNER = "flex items-center gap-[14px] h-full pl-[22px] pr-5";
export const SEARCH_INPUT =
  "flex-1 min-w-0 bg-transparent border-0 outline-none font-[inherit] text-[12px] tracking-[0.12em] uppercase text-ink";
/* The cross inside is classed directly in SearchPanel: a pseudo-class nested in
   an arbitrary variant ([&>span>span:first-child]:…) does not survive Tailwind's
   parsing, and the rotations were silently dropped. */
export const SEARCH_CLOSE =
  "flex-none flex items-center justify-center w-[22px] h-[22px] text-muted-45 " +
  "transition-colors duration-300 ease-[ease] bg-transparent border-0 cursor-pointer hover:text-ink";

export const SEARCH_RESULTS =
  "absolute top-full left-[calc(50%-min(280px,41vw))] w-[min(560px,82vw)] z-[70] " +
  "max-h-[min(60vh,520px)] overflow-y-auto bg-white border border-border border-t-0 box-border";
export const SEARCH_EMPTY = "m-0 p-[22px] text-[13px] font-normal text-muted-62";
export const SEARCH_HIT =
  "flex items-center gap-[14px] w-full px-[14px] py-[10px] border-0 border-b border-b-hairline " +
  "bg-transparent text-left cursor-pointer transition-[background] duration-200 ease-[ease] " +
  "data-[active=true]:bg-[rgba(18,18,17,0.04)]";
export const SEARCH_HIT_IMG =
  "flex-none block w-11 h-[58px] bg-image-well overflow-hidden " +
  "[&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:block";
export const SEARCH_HIT_TEXT = "flex flex-col gap-[3px] min-w-0";
export const SEARCH_HIT_CODE =
  "text-[11px] tracking-[0.2em] uppercase font-semibold text-[rgba(18,18,17,0.9)]";
export const SEARCH_HIT_NAME = "text-[13px] leading-[1.35] font-medium text-ink truncate";
export const SEARCH_HIT_META =
  "text-[11px] tracking-[0.14em] uppercase font-normal text-muted-45 truncate";
export const SEARCH_ALL =
  "block w-full px-[14px] py-[13px] border-0 bg-ink text-paper font-[inherit] text-[11px] " +
  "tracking-[0.2em] uppercase font-medium cursor-pointer transition-opacity duration-300 ease-[ease] hover:opacity-86";

/* ----------------------------------------------------------------- account */

export const ACCOUNT_WRAP = "relative flex items-center";
export const ACCOUNT_TRIGGER =
  "flex items-center h-11 py-[6px] px-0 border-b border-b-transparent " +
  "transition-[border-color,opacity] duration-[400ms] ease-[ease] cursor-pointer text-inherit hover:text-ink";
export const ACCOUNT_PANEL =
  "absolute top-[calc(100%+12px)] right-0 min-w-[210px] block py-2 bg-white border border-border z-[80] " +
  "transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
/** Over the landing hero the bar is dark, so the panel inverts. */
export const ACCOUNT_PANEL_DARK =
  "absolute top-[calc(100%+12px)] right-0 min-w-[210px] block py-2 z-[80] " +
  "bg-[rgba(13,13,12,0.72)] [-webkit-backdrop-filter:blur(14px)] border border-[rgba(255,255,255,0.18)] " +
  "transition-[opacity,transform] duration-[320ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
const ACCOUNT_ITEM_BASE =
  "block px-[22px] py-3 text-[11.5px] tracking-[0.19em] uppercase whitespace-nowrap " +
  "transition-[background,color] duration-300 ease-[ease]";
export const ACCOUNT_ITEM = `${ACCOUNT_ITEM_BASE} text-ink hover:bg-paper`;
export const ACCOUNT_ITEM_MUTED = `${ACCOUNT_ITEM_BASE} text-muted-62 hover:bg-paper hover:text-ink`;
export const ACCOUNT_ITEM_DARK =
  `${ACCOUNT_ITEM_BASE} text-white hover:bg-[rgba(255,255,255,0.1)] hover:text-white`;
export const ACCOUNT_ITEM_MUTED_DARK =
  `${ACCOUNT_ITEM_BASE} text-[rgba(255,255,255,0.72)] hover:bg-[rgba(255,255,255,0.1)] hover:text-white`;

/* ---------------------------------------------------------------- dropdown */

export const DROPDOWN_SCRIM =
  "fixed left-0 right-0 bottom-0 top-[78px] max-[759px]:top-[64px] z-[-1] bg-scrim pointer-events-none " +
  "transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
export const DROPDOWN =
  "absolute top-full left-1/2 -translate-x-1/2 bg-paper border border-border border-t-0 " +
  "transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
export const DROPDOWN_GRID =
  "grid grid-cols-[auto_auto_minmax(0,1fr)_minmax(0,0.5fr)] max-[959px]:grid-cols-[auto_auto_minmax(0,1fr)] " +
  "gap-[clamp(28px,3vw,56px)] box-border w-[min(1180px,calc(100vw-2*clamp(20px,4vw,56px)))] " +
  "pt-[clamp(30px,3vw,40px)] px-[clamp(32px,3.4vw,48px)] pb-[clamp(32px,3.2vw,44px)]";
export const DROPDOWN_LABEL =
  "mt-0 mx-0 mb-[clamp(18px,2vw,26px)] text-[10.5px] tracking-[0.24em] uppercase font-medium text-muted-45";
export const DROPDOWN_COL = "flex flex-col gap-[clamp(11px,1.1vw,15px)]";
export const DROPDOWN_COL_BORDERED = "border-l border-l-border pl-[clamp(36px,4vw,64px)]";
export const DROPDOWN_LINK =
  "self-start whitespace-nowrap text-[11px] tracking-[0.2em] uppercase font-medium text-ink pb-1 " +
  "border-b border-b-transparent transition-[border-color] duration-[400ms] ease-[ease] hover:border-b-ink";
export const DROPDOWN_CARD =
  "flex flex-col items-start min-w-0 transition-opacity duration-[400ms] ease-[ease] " +
  "hover:opacity-80 hover:underline hover:underline-offset-[5px] hover:decoration-1";
export const DROPDOWN_CARD_IMG =
  "block w-full bg-image-well-2 overflow-hidden [&_img]:w-full [&_img]:h-auto [&_img]:block";
/* Applied alongside DROPDOWN_CARD_IMG, so these have to win over its h-auto —
   class order in the attribute does not decide that, the important flag does. */
export const DROPDOWN_CARD_IMG_FILL =
  "h-full [&_img]:h-full! [&_img]:object-contain! [&_img]:object-[50%_0]";
export const DROPDOWN_CARD_LABEL =
  "mt-4 text-[11px] tracking-[0.2em] uppercase font-medium text-ink";
/** The second card is dropped on narrow screens. */
export const DROPDOWN_STACK = "max-[959px]:hidden";
