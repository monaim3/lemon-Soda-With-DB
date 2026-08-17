/**
 * Classes for the product page.
 *
 * The sticky gallery is the delicate part. Three rules work together and should
 * be changed as a set:
 *
 *   TOP      keeps its bottom padding on INFO instead, so the grid row — which
 *            is the sticky element's containing block — reaches down to where
 *            Specifications begins. Move it back here and the image unlatches
 *            at the bottom of the colours table.
 *   GALLERY  sticks to the bar height and goes static below 1240px.
 *   MAIN_IMAGE caps its height above 1240px. A sticky element taller than the
 *            viewport cannot stay pinned — its top scrolls away behind the bar.
 */

/* ------------------------------------------------------------- top / grid */

export const TOP = "pt-[clamp(28px,3.4vw,48px)] px-gutter pb-0";
export const CRUMBS =
  "flex items-center gap-[10px] text-[11px] tracking-[0.2em] uppercase font-light text-muted-45 " +
  "[&_a]:border-b [&_a]:border-b-transparent [&_a]:transition-[border-color] " +
  "[&_a]:duration-[400ms] [&_a]:ease-[ease] [&_a:hover]:border-b-[rgba(18,18,17,0.4)] " +
  "[&_span:last-child]:text-[rgba(18,18,17,0.84)]";
export const MAIN_GRID =
  "grid grid-cols-[minmax(0,0.48fr)_minmax(0,1fr)] max-[1239px]:grid-cols-1 " +
  "gap-[clamp(28px,4vw,80px)] items-start pt-[clamp(22px,2.6vw,36px)]";

/* -------------------------------------------------------------- gallery */

export const GALLERY =
  "flex flex-col gap-[clamp(12px,1.4vw,18px)] sticky max-[1239px]:static " +
  // Flush with the bottom of the sticky bar, so the top of the image is never
  // tucked behind it. scroll-margin makes programmatic scrolls land there too.
  "top-bar scroll-mt-[var(--bar-h)] " +
  // Keeps the thumbnail rail clear of Specifications at the end of the sticky
  // range. Part of the sticky box, so it costs a little travel — plenty spare.
  "pb-[clamp(36px,4.5vw,72px)]";

export const MAIN_IMAGE =
  "relative w-full aspect-[3/4] bg-image-well overflow-hidden " +
  "min-[1240px]:max-h-[calc(100vh-var(--bar-h)-150px)] " +
  "[&_img]:w-full [&_img]:h-full [&_img]:object-contain [&_img]:block";
export const NO_IMAGE =
  "flex items-center justify-center h-full text-[11px] tracking-[0.2em] uppercase text-muted-45";
export const ZOOM_BTN =
  "absolute top-3 right-3 z-[3] flex items-center justify-center w-[38px] h-[38px] p-0 " +
  "border border-[rgba(18,18,17,0.12)] bg-[rgba(255,255,255,0.9)] text-[rgba(18,18,17,0.82)] " +
  "cursor-pointer transition-[background,color,border-color] duration-300 ease-[ease] " +
  "hover:bg-ink hover:border-ink hover:text-paper";

/** Arrows sit just inside the image edges, vertically centred. */
const GALLERY_ARROW_BASE =
  "absolute top-1/2 -translate-y-1/2 z-[2] flex items-center justify-center w-11 h-11 p-0 " +
  "border-0 bg-transparent text-[rgba(18,18,17,0.72)] cursor-pointer " +
  "transition-colors duration-300 ease-[ease] hover:text-ink";
export const GALLERY_ARROW = GALLERY_ARROW_BASE;
export const GALLERY_ARROW_PREV = "left-[2px]";
export const GALLERY_ARROW_NEXT = "right-[2px]";

export const THUMB_WRAP = "flex items-center gap-[6px]";
export const THUMB_ARROW =
  "flex-none flex items-center justify-center w-[26px] h-11 p-0 border-0 bg-transparent " +
  "text-[rgba(18,18,17,0.66)] cursor-pointer transition-colors duration-300 ease-[ease] hover:text-ink";
/*
 * thumbArrowPrev / thumbArrowNext are referenced in the markup but were never
 * defined in the stylesheet, so they contributed nothing. Kept as empty strings
 * rather than removed, so the markup reads the same and the omission stays
 * visible instead of looking like something was lost in the conversion.
 */
export const THUMB_ARROW_PREV = "";
export const THUMB_ARROW_NEXT = "";
export const THUMB_ROW =
  "flex gap-[10px] flex-1 min-w-0 overflow-x-auto [scrollbar-width:none] " +
  "[&::-webkit-scrollbar]:hidden";
export const THUMB =
  "block flex-none w-[66px] max-[619px]:w-[54px] aspect-[2/3] bg-image-well overflow-hidden " +
  "transition-[border-color] duration-300 ease-[ease] border border-[rgba(18,18,17,0.14)] p-0 " +
  "cursor-pointer [&_img]:w-full [&_img]:h-full [&_img]:object-contain [&_img]:block";

/* --------------------------------------------------------------- lightbox */

export const LIGHTBOX =
  "fixed inset-0 z-[120] flex items-center justify-center p-[clamp(48px,6vw,88px)] " +
  "bg-[rgba(18,18,17,0.92)] cursor-zoom-out";
export const LIGHTBOX_IMAGE =
  "max-w-full max-h-full object-contain block cursor-default bg-white";
export const LIGHTBOX_CLOSE =
  "absolute top-[clamp(16px,2vw,28px)] right-[clamp(16px,2vw,28px)] flex items-center " +
  "justify-center w-11 h-11 p-0 border-0 bg-transparent text-[rgba(244,242,237,0.84)] " +
  "cursor-pointer transition-colors duration-300 ease-[ease] hover:text-paper";
export const LIGHTBOX_ARROW =
  "absolute top-1/2 -translate-y-1/2 flex items-center justify-center w-14 h-14 p-0 border-0 " +
  "bg-transparent text-[rgba(244,242,237,0.8)] cursor-pointer transition-colors duration-300 " +
  "ease-[ease] hover:text-paper";
export const LIGHTBOX_PREV = "left-[clamp(8px,2vw,28px)]";
export const LIGHTBOX_NEXT = "right-[clamp(8px,2vw,28px)]";
export const LIGHTBOX_COUNT =
  "absolute bottom-[clamp(18px,2.4vw,32px)] left-1/2 -translate-x-1/2 text-[11.5px] " +
  "tracking-[0.2em] uppercase font-light text-[rgba(244,242,237,0.78)] tabular-nums";

/* ------------------------------------------------------------------- info */

/** Carries the space that used to sit under the whole section — see TOP. */
export const INFO = "flex flex-col pb-[clamp(48px,5.4vw,88px)]";
export const H1 =
  "m-0 font-medium text-[clamp(30px,3.6vw,46px)] leading-none tracking-[0.02em]";
export const STYLE_NAME =
  "mt-[clamp(10px,1.2vw,16px)] mx-0 mb-0 text-[clamp(16px,1.5vw,21px)] leading-[1.35] " +
  "font-normal tracking-[0.005em] text-ink";
export const META_ROW =
  "flex flex-wrap items-center gap-y-[14px] gap-x-[22px] pt-[clamp(14px,1.6vw,20px)]";
export const META_ITEM =
  "text-[12.5px] tracking-[0.18em] uppercase font-medium text-[rgba(18,18,17,0.92)]";
export const META_DIVIDER = "w-px h-3 bg-[rgba(18,18,17,0.2)]";
/** `[p+&]` reproduces `.desc + .desc`: only a description after another tightens up. */
export const DESC =
  "mt-[clamp(16px,1.8vw,22px)] mx-0 mb-0 max-w-[52ch] text-[15.5px] leading-[1.75] font-light " +
  "text-[rgba(18,18,17,0.92)] [p+&]:mt-[10px]";
export const NEW_TAG =
  "px-[9px] py-1 bg-ink text-paper text-[9px] tracking-[0.2em] uppercase font-medium";

export const SPEC_BLOCK =
  "flex flex-col mt-[clamp(14px,1.5vw,20px)] pt-[clamp(14px,1.5vw,18px)]";
export const SPEC_ROW =
  "grid grid-cols-[118px_minmax(0,1fr)] max-[619px]:grid-cols-1 items-baseline " +
  "gap-y-1 gap-x-[14px] py-[5px] first:pt-0 first:pb-[5px]";
export const SPEC_LABEL =
  "text-[11.5px] tracking-[0.2em] uppercase font-semibold text-[#121211]";
export const SPEC_VALUE = "text-[15px] leading-[1.7] font-normal text-[#121211]";
/*
 * Self-contained, and used INSTEAD of SPEC_VALUE rather than alongside it.
 * Two utilities setting the same property are resolved by their order in the
 * generated stylesheet, not by the order they appear in the class attribute —
 * so layering PRICE_VALUE over SPEC_VALUE silently kept SPEC_VALUE's
 * line-height and weight.
 */
export const PRICE_VALUE =
  "text-[17px] leading-[1.6] font-bold tracking-[0.01em] tabular-nums text-[#121211]";
export const PRICE_NOTE =
  "block text-[11px] tracking-[0.16em] uppercase font-normal text-[rgba(18,18,17,0.66)] pt-[2px]";
export const SIZES_VALUE = "flex flex-wrap items-baseline gap-y-2 gap-x-[18px]";
export const SIZE_GUIDE_LINK =
  "text-[11px] tracking-[0.18em] uppercase font-normal text-[rgba(18,18,17,0.78)] pb-[3px] " +
  "border-b border-b-[rgba(18,18,17,0.25)] transition-[border-color,color] duration-[400ms] " +
  "ease-[ease] hover:text-[#121211] hover:border-b-[#121211]";

/* --------------------------------------------------- colours + order table */

export const MODULE =
  "flex flex-col max-w-[620px] max-[1239px]:max-w-full mt-[clamp(20px,2.2vw,28px)] " +
  "border border-[rgba(18,18,17,0.16)]";
export const MODULE_HEAD =
  "flex items-baseline justify-between gap-5 px-[clamp(12px,1.2vw,16px)] py-[14px]";
export const MODULE_TITLE =
  "text-[11px] tracking-[0.2em] uppercase font-semibold text-[#121211]";
export const MODULE_COUNT =
  "text-[11px] tracking-[0.18em] uppercase font-medium text-[rgba(18,18,17,0.82)]";

export const COLOUR_ROW =
  "grid grid-cols-4 max-[619px]:grid-cols-2 border-t border-t-[rgba(18,18,17,0.12)]";
/** Odd cells start a visual pair, so they carry no divider on the left. */
export const COLOUR_CELL =
  "flex items-center gap-[9px] min-h-[42px] px-[10px] bg-transparent " +
  "transition-[background] duration-300 ease-[ease] border-0 border-l " +
  "border-l-[rgba(18,18,17,0.12)] cursor-pointer text-left odd:border-l-0";
export const COLOUR_SWATCH =
  "flex-none block w-5 h-5 [box-shadow:0_0_0_1px_rgba(18,18,17,0.16)_inset]";
export const COLOUR_NAME = "text-[11px] tracking-[0.06em] text-[#121211]";

export const PANEL =
  "flex flex-col border-t border-t-[rgba(18,18,17,0.16)] bg-[rgba(18,18,17,0.03)]";
export const PANEL_HEAD =
  "flex items-center justify-between gap-4 px-[clamp(12px,1.2vw,16px)] py-3";
export const PANEL_HEAD_LEFT = "flex items-center gap-[11px]";
export const PANEL_SWATCH =
  "flex-none block w-[22px] h-[22px] [box-shadow:0_0_0_1px_rgba(18,18,17,0.16)_inset]";
export const PANEL_COLOUR_NAME =
  "text-[13.5px] font-semibold tracking-[0.01em] text-[#121211]";
export const PANEL_SKU =
  "text-[11px] tracking-[0.18em] uppercase font-normal text-[rgba(18,18,17,0.66)]";

const ORDER_GRID =
  "grid grid-cols-[minmax(0,1fr)_56px_62px_80px] items-center gap-[10px] px-[clamp(12px,1.2vw,16px)]";
export const ORDER_HEAD =
  `${ORDER_GRID} border-t border-t-[rgba(18,18,17,0.12)] border-b border-b-[rgba(18,18,17,0.12)]`;
export const ORDER_HEAD_CELL =
  "py-[9px] text-[10.5px] tracking-[0.18em] uppercase font-semibold text-[rgba(18,18,17,0.72)]";
export const ORDER_ROW = `${ORDER_GRID} border-b border-b-[rgba(18,18,17,0.08)]`;
export const SIZE_CELL =
  "py-[7px] text-[12.5px] tracking-[0.08em] font-medium text-[#121211]";
export const NUM_CELL = "py-[7px] text-[12.5px] font-normal text-right tabular-nums";
export const QTY_CELL_WRAP = "relative flex justify-end py-[5px]";
export const QTY_INPUT =
  "w-full max-w-[74px] h-[34px] px-[9px] bg-white font-[inherit] text-[12.5px] font-normal " +
  "text-[#121211] text-right border border-[rgba(18,18,17,0.22)]";
/** Sits above the input, with a small pointer down to it. */
export const QTY_ERROR =
  "absolute right-0 bottom-[calc(100%+7px)] z-[6] flex items-center whitespace-nowrap " +
  "px-[11px] py-[7px] bg-[#8e4249] text-[#f4f2ed] text-[10px] tracking-[0.16em] uppercase font-medium";
export const QTY_ERROR_ARROW =
  "absolute right-[18px] -bottom-1 w-2 h-2 bg-[#8e4249] rotate-45";

export const ORDER_FOOT =
  "flex flex-wrap items-center justify-between gap-y-3 gap-x-5 px-[clamp(12px,1.2vw,16px)] py-3";
export const ORDER_TOTALS = "flex items-baseline gap-[14px]";
export const ORDER_UNITS =
  "text-[11px] tracking-[0.16em] uppercase font-normal text-[rgba(18,18,17,0.7)]";
export const ORDER_VALUE = "text-[14px] font-bold tracking-[0.01em] tabular-nums";
export const ORDER_ACTIONS = "flex items-center gap-[18px]";
export const CLEAR_LINK =
  "text-[11px] tracking-[0.18em] uppercase font-normal text-[rgba(18,18,17,0.7)] pb-[3px] " +
  "border-b border-b-transparent border-x-0 border-t-0 transition-[color,border-color] " +
  "duration-300 ease-[ease] bg-transparent cursor-pointer " +
  "hover:text-[#121211] hover:border-b-[#121211]";
export const ADD_WRAP = "relative flex";
export const ADD_BTN =
  "flex items-center justify-center h-10 px-[22px] bg-[#121211] text-[#f4f2ed] text-[10px] " +
  "tracking-[0.2em] uppercase font-normal transition-opacity duration-[400ms] ease-[ease] " +
  "border-0 cursor-pointer hover:opacity-86";
export const ADD_BTN_INNER = "flex items-center gap-[10px]";
export const ORDER_DIALOG =
  "absolute right-0 bottom-[calc(100%+10px)] z-20 flex flex-col gap-[14px] w-[290px] p-[18px] " +
  "bg-white border border-[rgba(18,18,17,0.16)] [box-shadow:0_18px_40px_rgba(18,18,17,0.12)]";
export const ORDER_DIALOG_TITLE =
  "text-[13.5px] font-semibold tracking-[0.01em] text-[#121211]";
export const ORDER_DIALOG_INPUT =
  "w-full h-10 px-3 box-border border border-[rgba(18,18,17,0.22)] bg-white font-[inherit] " +
  "text-[13px] font-light text-[#121211]";
export const ORDER_DIALOG_SUBMIT =
  "flex items-center justify-center h-[42px] text-[10px] tracking-[0.2em] uppercase font-normal " +
  "transition-[background] duration-300 ease-[ease] border-0 cursor-pointer";

/* ------------------------------------------- specifications and downloads */

export const SECTION = "px-gutter pt-0 pb-[clamp(36px,4vw,64px)]";
export const SECTION_INNER =
  "flex flex-col pb-[clamp(18px,2vw,26px)] border-b border-b-section-rule";
export const SECTION_TOGGLE =
  "flex items-center justify-between gap-5 min-h-11 font-medium text-[clamp(19px,2vw,26px)] " +
  "leading-[1.15] tracking-[0.005em] text-[#121211] transition-opacity duration-300 ease-[ease] " +
  "bg-transparent border-0 cursor-pointer w-full text-left hover:opacity-60";
export const SECTION_ARROW =
  "flex-none flex items-center justify-center w-4 h-4 " +
  "transition-transform duration-[360ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

export const SHEET_ROW = "flex pt-[clamp(16px,1.8vw,22px)] px-0 pb-0";
export const SHEET_BTN =
  "inline-flex items-center gap-[9px] min-h-9 px-[14px] border border-[rgba(18,18,17,0.24)] " +
  "text-[9.5px] tracking-[0.14em] uppercase font-medium text-[#121211] " +
  "transition-[background,border-color] duration-[320ms] ease-[ease] " +
  "hover:bg-[#121211] hover:border-[#121211] hover:text-[#f4f2ed]";

export const SIZE_CHART =
  "flex flex-col gap-3 max-w-[900px] pt-[clamp(20px,2.4vw,30px)] px-0 pb-0 scroll-mt-[110px]";
export const SIZE_CHART_HEAD = "flex items-baseline justify-between gap-5";
export const SIZE_CHART_LABEL =
  "text-[11.5px] tracking-[0.22em] uppercase font-medium text-[rgba(18,18,17,0.72)]";
export const SIZE_CHART_NOTE =
  "text-[11.5px] tracking-[0.16em] uppercase font-light text-[rgba(18,18,17,0.62)]";
export const SIZE_CHART_EMPTY =
  "m-0 text-[14.5px] leading-[1.7] font-light text-muted-62 " +
  "[&_a]:border-b [&_a]:border-b-[rgba(18,18,17,0.35)]";
export const SIZE_CHART_SCROLL = "overflow-x-auto";
export const SIZE_CHART_TABLE =
  "min-w-[640px] flex flex-col border-t border-t-[rgba(18,18,17,0.08)]";
const CHART_ROW = "grid gap-4 py-[11px] border-b border-b-[rgba(18,18,17,0.08)]";
export const SIZE_CHART_HEAD_ROW = `${CHART_ROW} text-[13px] font-medium text-[#121211]`;
export const SIZE_CHART_ROW = `${CHART_ROW} items-baseline text-[14px] leading-[1.45]`;
export const SIZE_CHART_ROW_LABEL = "text-[rgba(18,18,17,0.7)]";

export const SPEC_GRID =
  "grid grid-cols-2 max-[899px]:grid-cols-1 items-start gap-y-[clamp(26px,3vw,38px)] " +
  "gap-x-[clamp(48px,6vw,96px)] max-w-[900px] pt-[clamp(30px,3.4vw,44px)] px-0 pb-0";
export const SPEC_SECTION = "flex flex-col gap-3";
export const SPEC_SECTION_HEADING =
  "text-[11.5px] tracking-[0.22em] uppercase font-medium text-[rgba(18,18,17,0.72)]";
export const SPEC_SECTION_ROWS =
  "flex flex-col border-t border-t-[rgba(18,18,17,0.08)]";
export const SPEC_SECTION_ROW =
  "grid grid-cols-[minmax(120px,150px)_minmax(0,1fr)] max-[619px]:grid-cols-1 items-baseline " +
  "gap-y-[2px] gap-x-6 py-[11px] border-b border-b-[rgba(18,18,17,0.08)]";
export const SPEC_SECTION_ROW_LABEL =
  "text-[14px] leading-[1.45] font-normal text-[rgba(18,18,17,0.7)]";
export const SPEC_SECTION_ROW_VALUE =
  "text-[15px] leading-[1.45] font-normal text-[#121211]";

/* -------------------------------------------------- care and certificates */

export const CARE =
  "flex flex-col gap-[14px] max-w-[900px] pt-[clamp(26px,3vw,38px)] px-0 pb-0 " +
  "mt-[clamp(26px,3vw,38px)]";
/** The bottom padding is room for the tooltip, which drops below the symbols. */
export const CARE_ROW =
  "flex flex-wrap items-center gap-[clamp(14px,1.8vw,24px)] pt-1 pb-[38px]";
/** `group` lets the tooltip below react to hover and keyboard focus on the symbol. */
export const CARE_ITEM =
  "group relative flex items-center justify-center cursor-help " +
  "focus-visible:outline focus-visible:outline-1 focus-visible:outline-ink " +
  "focus-visible:outline-offset-4";
export const CARE_ICON = "w-[46px] h-[46px] block";
/*
 * Below the symbol — above would cover the section heading. The ::after is the
 * little pointer back up to the icon.
 */
export const CARE_TIP =
  "absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 translate-y-[-4px] z-10 " +
  "px-3 py-2 bg-ink text-paper text-[11.5px] tracking-[0.08em] leading-[1.3] whitespace-nowrap " +
  "opacity-0 pointer-events-none transition-[opacity,transform] duration-[220ms] ease-[ease] " +
  "after:content-[''] after:absolute after:bottom-full after:left-1/2 after:-ml-1 " +
  "after:border-4 after:border-transparent after:border-b-ink " +
  "group-hover:opacity-100 group-hover:translate-y-0 " +
  "group-focus-visible:opacity-100 group-focus-visible:translate-y-0";

export const CERTIFICATES =
  "flex flex-col gap-4 max-w-[900px] pt-[clamp(26px,3vw,38px)] px-0 pb-0";
/*
 * The source asset is a JPEG on white; multiply drops the white into the page
 * ground so it doesn't sit in a visible box.
 */
export const CERTIFICATES_IMG =
  "w-full max-w-[380px] h-auto block [mix-blend-mode:multiply]";

/* -------------------------------------------------------------- downloads */

/*
 * downloadsGrid only ever existed inside a max-width:899px media query — there
 * is no base rule, so it has never set `display: grid`. Reproduced as-is.
 */
export const DOWNLOADS_GRID = "max-[899px]:grid-cols-1";
export const DOWNLOAD_ROW =
  "flex items-center justify-between gap-5 py-5 border-b border-b-[rgba(18,18,17,0.1)] " +
  "transition-opacity duration-[400ms] ease-[ease] hover:opacity-55";
export const DOWNLOAD_NAME =
  "text-[13.5px] tracking-[0.02em] font-normal text-[#121211]";
export const DOWNLOAD_META =
  "text-[11.5px] tracking-[0.16em] uppercase font-light text-[rgba(18,18,17,0.64)]";
/** Applied alongside DOWNLOAD_ROW, so it has to beat its hover. */
export const DOWNLOAD_PENDING = "opacity-50 hover:opacity-50!";

/* ---------------------------------------------------------------- related */

export const RELATED = "px-gutter pt-0 pb-[clamp(56px,6vw,96px)]";
export const RELATED_HEAD =
  "flex items-baseline justify-between gap-6 pb-[clamp(18px,2vw,26px)] " +
  "border-b border-b-section-rule";
export const RELATED_TITLE =
  "m-0 font-medium text-[clamp(19px,2vw,26px)] leading-[1.15] tracking-[0.005em]";
export const RELATED_ALL =
  "pb-1 text-[11px] tracking-[0.2em] uppercase font-light text-[rgba(18,18,17,0.78)] " +
  "border-b border-b-[rgba(18,18,17,0.25)] transition-[border-color,color] duration-[400ms] " +
  "ease-[ease] hover:text-[#121211] hover:border-b-[#121211]";
export const RELATED_GRID =
  "grid grid-cols-4 max-[899px]:grid-cols-2 gap-[clamp(20px,2.4vw,36px)] " +
  "pt-[clamp(22px,2.6vw,34px)]";
export const RELATED_CARD =
  "flex flex-col min-w-0 transition-opacity duration-[400ms] ease-[ease] hover:opacity-92";
export const RELATED_IMG =
  "block w-full aspect-[2/3] bg-image-well overflow-hidden " +
  "[&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:block";
export const RELATED_ROW = "flex items-baseline justify-between gap-4 pt-4";
export const RELATED_CODE =
  "text-[12.5px] tracking-[0.2em] uppercase font-semibold text-[rgba(18,18,17,0.9)]";
export const RELATED_GROUP =
  "text-[12.5px] tracking-[0.18em] uppercase font-medium text-[rgba(18,18,17,0.92)]";
export const RELATED_NAME =
  "block pt-2 text-[15px] leading-[1.5] font-normal text-[#121211]";
export const RELATED_COLOUR_LABEL =
  "block pt-[10px] text-[12.5px] tracking-[0.2em] uppercase font-light text-[rgba(18,18,17,0.72)]";
