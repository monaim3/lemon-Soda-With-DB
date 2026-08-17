/**
 * Classes for the landing page.
 *
 * Three patterns worth knowing before editing:
 *
 * - Keyframes (lsDrift, lsFade, lsScroll) stay in globals.css and are referenced
 *   by name, so the timing functions and stops live in one place.
 * - Where an image zooms as its card is hovered, the card carries `group` and
 *   the frame uses `group-hover:[&_img]:…`. The markup has no class on the
 *   image itself, so the rule has to reach it by descendant selector.
 * - `[&_img]:…` generally reproduces the stylesheet's `.frame img` rules without
 *   touching the JSX.
 */

/*
 * The hero animations, fixed.
 *
 * They had never run. Landing.module.css asked for `animation: lsDrift …`, but
 * the keyframes are defined in globals.css while the rule lived in a CSS
 * Module — and a module rewrites animation names to a scoped form
 * (`Landing-module__x__lsDrift`) so components cannot clash. Nothing defined
 * that scoped name, so the reference pointed at nothing and the browser
 * silently skipped it. An animation naming keyframes that do not exist is not
 * an error; it simply does nothing.
 *
 * Referring to the global names directly reconnects the two halves. Two of the
 * three are on: the hero copy fades up on load, and the scroll indicator
 * pulses. The stripes stay still by choice — the drift was switched off after
 * seeing it, since the hero video already carries the movement. globals.css
 * keeps its keyframes, so restoring it means adding an animate utility to
 * HERO_STRIPES naming lsDrift, 34s, ease-in-out, infinite, alternate.
 *
 * Written out rather than shown as a class on purpose: Tailwind scans source
 * files for class-like strings, comments included, so a literal utility here
 * would generate a rule nothing uses.
 *
 * Keep the keyframes in globals.css. Moving them into a component stylesheet
 * would scope their names and break the link again, in exactly the same silent
 * way.
 */

/* -------------------------------------------------------------------- hero */

export const HERO =
  "relative h-dvh min-h-[560px] max-[759px]:min-h-[520px] w-full overflow-hidden bg-[#0d0d0c]";
export const HERO_BG = "absolute inset-0 overflow-hidden";
export const HERO_STRIPES =
  "absolute inset-[-6%] " +
  "bg-[repeating-linear-gradient(122deg,#161614_0px,#161614_26px,#1d1c19_26px,#1d1c19_52px)]";
export const HERO_GLOW =
  "absolute inset-0 " +
  "bg-[radial-gradient(120%_90%_at_62%_34%,rgba(190,180,160,0.16)_0%,rgba(0,0,0,0)_62%)]";
export const HERO_VIDEO =
  "absolute inset-0 w-full h-full object-cover block transition-opacity duration-[600ms] ease-[ease]";
export const HERO_SCRIM_1 =
  "absolute inset-0 bg-[linear-gradient(to_bottom,rgba(58,58,56,0.34)_0%,rgba(58,58,56,0.14)_26%,rgba(48,48,46,0.26)_55%,rgba(30,30,28,0.62)_100%)]";
export const HERO_SCRIM_2 =
  "absolute inset-0 bg-[radial-gradient(90%_70%_at_18%_88%,rgba(28,28,26,0.42)_0%,rgba(0,0,0,0)_68%)]";

export const HERO_CONTENT =
  "absolute left-gutter bottom-[clamp(84px,11vh,132px)] z-[15] max-w-[min(900px,86vw)] " +
  "animate-[lsFade_1200ms_cubic-bezier(0.2,0,0.1,1)_both_260ms]";
export const HERO_EYEBROW =
  "mt-0 mx-0 mb-[clamp(16px,2vw,26px)] text-[12px] tracking-[0.24em] uppercase font-semibold " +
  "text-[rgba(255,255,255,0.66)]";
export const HERO_TITLE =
  "m-0 font-display font-normal text-[clamp(38px,7.4vw,116px)] leading-[0.98] tracking-[-0.015em] " +
  "text-white [text-shadow:0_1px_40px_rgba(0,0,0,0.28)]";
export const HERO_CTAS =
  "flex items-center gap-[clamp(20px,2.4vw,32px)] mt-[clamp(24px,3.4vw,42px)]";
export const HERO_CTA_PRIMARY =
  "inline-block pb-[6px] text-[clamp(9.5px,1.4vw,12px)] tracking-[0.24em] uppercase font-normal " +
  "text-white border-b border-b-[rgba(255,255,255,0.55)] transition-[border-color] duration-[400ms] " +
  "ease-[ease] hover:border-b-white";
export const HERO_CTA_DIVIDER = "block w-px h-[15px] bg-[rgba(255,255,255,0.3)]";
export const HERO_CTA_SECONDARY =
  "inline-block pb-[6px] text-[clamp(9.5px,1.4vw,12px)] tracking-[0.24em] uppercase font-normal " +
  "text-[rgba(255,255,255,0.62)] border-b border-b-transparent " +
  "transition-[color,border-color] duration-[400ms] ease-[ease] " +
  "hover:text-white hover:border-b-[rgba(255,255,255,0.55)]";

export const HERO_SCROLL_INDICATOR =
  "absolute left-1/2 bottom-[34px] -translate-x-1/2 z-[15] w-px h-[46px] " +
  "bg-[rgba(255,255,255,0.22)] overflow-hidden";
export const HERO_SCROLL_BAR =
  "w-full h-full bg-[rgba(255,255,255,0.85)] " +
  "animate-[lsScroll_3.4s_cubic-bezier(0.6,0,0.4,1)_infinite]";

/* ------------------------------------------------------------- collections */

export const COLLECTIONS =
  "px-gutter pt-[clamp(80px,11vw,168px)] pb-[clamp(64px,8vw,120px)] bg-paper";
export const SECTION_HEAD =
  "flex items-baseline justify-between gap-8 flex-wrap pb-[clamp(32px,4vw,56px)] " +
  "border-b border-b-section-rule";
export const SECTION_TITLE =
  "m-0 font-display font-normal text-[clamp(28px,4.2vw,60px)] leading-[1.02] tracking-[-0.01em]";
export const SECTION_LEDE =
  "m-0 max-w-[52ch] text-[15.5px] leading-[1.8] font-light text-[rgba(18,18,17,0.76)]";

export const COLLECTIONS_GRID =
  "relative grid grid-cols-4 max-[1079px]:grid-cols-2 max-[759px]:grid-cols-1 " +
  "gap-y-[clamp(40px,4.5vw,64px)] gap-x-[2px] pt-[clamp(36px,4.4vw,64px)]";
export const COLLECTION_CARD =
  "flex flex-col transition-opacity duration-[400ms] ease-[ease] hover:opacity-72";
export const COLLECTION_TINT = "relative h-[clamp(150px,17vw,230px)] w-full overflow-hidden";
export const COLLECTION_BODY = "pt-6 pr-[clamp(24px,3vw,52px)] pb-0 pl-1";
export const COLLECTION_NAME =
  "mt-0 mx-0 mb-[18px] text-[18px] tracking-[0.18em] uppercase font-medium";
export const COLLECTION_META =
  "mt-[-8px] mx-0 mb-[18px] text-[13px] tracking-[0.22em] uppercase font-normal " +
  "text-[rgba(18,18,17,0.64)] flex items-baseline gap-[7px]";
export const COLLECTION_MARK = "text-[12px] leading-none";
export const COLLECTION_TEXT =
  "mt-0 mx-0 mb-5 text-[15.5px] leading-[1.8] font-light text-[rgba(18,18,17,0.8)]";

/** Centred on the tint row, so its offset is half the tint height below the grid's padding. */
export const MARK_LEAVES =
  "absolute left-1/2 top-[calc(clamp(36px,4.4vw,64px)+clamp(150px,17vw,230px)/2)] " +
  "-translate-x-1/2 -translate-y-1/2 w-[clamp(108px,11.5vw,158px)] h-auto pointer-events-none " +
  "max-[759px]:hidden";

/* --------------------------------------------------------------- everywear */

export const EVERYWEAR =
  "bg-ink text-paper pt-[clamp(80px,10vw,150px)] px-0 pb-[clamp(64px,8vw,110px)]";
export const EVERYWEAR_INTRO_WRAP = "px-gutter";
export const EVERYWEAR_EYEBROW =
  "mt-0 mx-0 mb-[clamp(20px,2.4vw,32px)] text-[14px] tracking-[0.24em] uppercase font-normal " +
  "text-[rgba(244,242,237,0.66)]";
export const EVERYWEAR_INTRO =
  "grid grid-cols-[1.5fr_1fr] max-[759px]:grid-cols-1 gap-[clamp(28px,5vw,96px)] items-end " +
  "pb-[clamp(40px,5vw,72px)] border-b border-b-[rgba(244,242,237,0.16)]";
export const EVERYWEAR_TITLE =
  "m-0 font-display font-normal text-[clamp(32px,5.4vw,84px)] leading-[1.02] tracking-[-0.015em]";
export const EVERYWEAR_LEDE =
  "m-0 max-w-[46ch] text-[15.5px] leading-[1.8] font-light text-[rgba(244,242,237,0.78)]";

export const DIPTYCH_GRID =
  "grid grid-cols-2 max-[759px]:grid-cols-1 gap-[2px] pt-[clamp(40px,5vw,72px)]";
/** `group` lets the frame below reach the image on card hover. */
export const DIPTYCH_CARD =
  "group flex flex-col min-w-0 transition-opacity duration-[400ms] ease-[ease] hover:opacity-82";
export const DIPTYCH_IMG =
  "block w-full h-[clamp(320px,44vw,620px)] bg-[#1a1a18] overflow-hidden " +
  "[&_img]:w-full [&_img]:h-full [&_img]:object-cover [&_img]:object-[50%_22%] [&_img]:block " +
  "[&_img]:transition-transform [&_img]:duration-[1200ms] [&_img]:ease-[cubic-bezier(0.2,0,0.1,1)] " +
  "group-hover:[&_img]:scale-105";
export const DIPTYCH_LABEL_ROW =
  "flex items-baseline justify-between gap-5 pt-5 px-gutter pb-0";
export const DIPTYCH_NAME = "text-[11px] tracking-[0.2em] uppercase font-normal";
export const DIPTYCH_META =
  "text-[11px] tracking-[0.2em] uppercase font-light text-[rgba(244,242,237,0.66)]";

export const EVERYWEAR_RAIL_WRAP = "pt-[clamp(56px,7vw,104px)] px-gutter pb-0";
export const EVERYWEAR_RAIL_GRID =
  "grid grid-cols-4 max-[759px]:grid-cols-2 gap-[clamp(20px,2.4vw,36px)]";
export const RAIL_CARD =
  "group flex flex-col min-w-0 transition-opacity duration-[400ms] ease-[ease] hover:opacity-78";
/*
 * The packshots are portrait (600x850 / 640x800) on a white sweep. A portrait
 * frame lets them fill it — in a landscape box they floated small and boxed in.
 * `contain` keeps every garment uncropped; the residual few pixels are white on
 * white, so the frame reads as exactly the image.
 */
export const RAIL_IMG =
  "block w-full aspect-[3/4] bg-white overflow-hidden " +
  "[&_img]:w-full [&_img]:h-full [&_img]:object-contain [&_img]:block " +
  "[&_img]:transition-transform [&_img]:duration-[1200ms] [&_img]:ease-[cubic-bezier(0.2,0,0.1,1)] " +
  "group-hover:[&_img]:scale-105";
export const RAIL_CODE = "pt-4 text-[10.5px] tracking-[0.2em] uppercase font-normal";
export const RAIL_NAME =
  "pt-[7px] text-[11px] tracking-[0.2em] uppercase font-light text-[rgba(244,242,237,0.66)]";
export const EVERYWEAR_MORE =
  "inline-block mt-[clamp(36px,4.4vw,60px)] pb-[6px] text-[10.5px] tracking-[0.24em] uppercase " +
  "text-paper border-b border-b-[rgba(244,242,237,0.4)] transition-[border-color] duration-[400ms] " +
  "ease-[ease] hover:border-b-paper";

/* ----------------------------------------------------------- private label */

export const PRIVATE_LABEL =
  "bg-paper pt-[clamp(52px,6.4vw,100px)] px-gutter pb-[clamp(40px,4.6vw,72px)]";
export const PL_HEAD =
  "flex items-start justify-between gap-8 flex-wrap pb-[clamp(32px,4vw,56px)] " +
  "border-b border-b-section-rule";
export const PL_LEDE =
  "m-0 max-w-[52ch] pt-1 text-[14px] leading-[1.8] font-light text-[rgba(18,18,17,0.76)]";
export const PL_GRID =
  "grid grid-cols-2 max-[759px]:grid-cols-1 gap-[clamp(32px,4vw,64px)] items-start " +
  "pt-[clamp(36px,4.4vw,64px)]";
/** Hover is on the frame itself here, not a card wrapping it. */
export const PL_IMG =
  "w-full bg-[#e6e2da] overflow-hidden " +
  "[&_img]:w-full [&_img]:h-auto [&_img]:block " +
  "[&_img]:transition-transform [&_img]:duration-[1200ms] [&_img]:ease-[cubic-bezier(0.2,0,0.1,1)] " +
  "hover:[&_img]:scale-105";
export const PL_OPTIONS = "pl-1";
export const PL_OPTIONS_LABEL =
  "mt-0 mx-0 mb-[clamp(24px,2.8vw,34px)] text-[14px] tracking-[0.24em] uppercase font-normal " +
  "text-[rgba(18,18,17,0.7)]";
export const PL_OPTION_ROW =
  "grid grid-cols-[clamp(56px,6vw,76px)_1fr] gap-[clamp(18px,2.2vw,32px)] items-baseline " +
  "py-[clamp(14px,1.6vw,18px)] border-t border-t-section-rule";
export const PL_OPTION_NAME =
  "text-[11px] tracking-[0.2em] uppercase font-medium text-[#121211] whitespace-nowrap";
export const PL_OPTION_DETAIL =
  "text-[13.5px] leading-[1.85] font-light text-[rgba(18,18,17,0.8)]";
export const PL_EXPLORE =
  "inline-block mt-[clamp(30px,3.4vw,46px)] pb-[5px] text-[10px] tracking-[0.22em] uppercase " +
  "text-[#121211] border-b border-b-[rgba(18,18,17,0.35)] transition-[border-color] " +
  "duration-[400ms] ease-[ease] hover:border-b-[#121211]";
