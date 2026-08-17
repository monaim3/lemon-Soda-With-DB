/**
 * Classes for the sign-in page.
 *
 * The header here is a simplified version of the site bar — no search, no
 * collections menu — so it does not reuse headerClasses; the registration page
 * has the same shape.
 */

/* ------------------------------------------------------------------ header */

export const HEADER = "sticky top-0 z-[60] bg-paper border-b border-b-section-rule";
export const BAR =
  "grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-gutter h-[78px] max-[759px]:h-[64px]";
/** The back arrow is a bare span styled by descendant rule. */
export const BACK =
  "flex items-center gap-[10px] h-11 text-[11.5px] tracking-[0.19em] uppercase font-light " +
  "text-muted-62 hover:text-ink [&_span]:block [&_span]:w-[14px] [&_span]:h-px [&_span]:bg-current";
export const LOGO =
  "flex items-center justify-self-center " +
  "[&_img]:h-11 [&_img]:w-auto [&_img]:block max-[759px]:[&_img]:h-[34px]";
export const HEADER_RIGHT = "flex items-center justify-end gap-[clamp(16px,2.2vw,28px)]";
export const HEADER_LINK =
  "flex items-center h-11 text-[11.5px] tracking-[0.19em] uppercase font-light text-muted-62 " +
  "transition-colors duration-300 ease-[ease] hover:text-ink";

/* -------------------------------------------------------------------- hero */

export const HERO =
  "relative h-[clamp(380px,42vw,560px)] max-[759px]:h-[320px] overflow-hidden bg-ink";
export const HERO_IMG =
  "absolute inset-0 w-full h-full object-cover object-[50%_32%] block";
export const HERO_SCRIM =
  "absolute inset-0 " +
  "bg-[linear-gradient(90deg,rgba(18,18,17,0.12)_0%,rgba(18,18,17,0.34)_46%,rgba(18,18,17,0.66)_100%)]";
/** height:100% with padding — border-box, or the headline clips. */
export const HERO_CONTENT =
  "relative box-border h-full flex flex-col justify-end items-center text-center " +
  "px-gutter pb-[clamp(34px,4vw,60px)] pt-0 max-[759px]:items-start max-[759px]:text-left";
export const HERO_EYEBROW =
  "mt-0 mx-0 mb-[clamp(12px,1.6vw,20px)] text-[11px] tracking-[0.24em] uppercase font-normal " +
  "text-[rgba(244,242,237,0.8)]";
export const HERO_TITLE =
  "m-0 font-display font-normal text-[clamp(32px,4.4vw,60px)] leading-[1.05] tracking-[-0.01em] text-paper";

/* -------------------------------------------------------------------- form */

export const SECTION =
  "pt-[clamp(40px,5vw,72px)] px-gutter pb-[clamp(56px,6vw,96px)]";
export const FORM = "max-w-[460px] mx-auto flex flex-col";
export const FORM_HEADING =
  "m-0 text-center text-[clamp(15px,1.6vw,18px)] tracking-[0.16em] uppercase font-medium text-ink";
export const FORM_SUB =
  "mt-[10px] mx-0 mb-0 text-center text-[14.5px] leading-[1.7] font-light text-muted-62";

export const ERROR =
  "mt-[clamp(20px,2.4vw,28px)] mx-0 mb-0 px-4 py-[13px] bg-white border border-[#8e4249] " +
  "text-[#8e4249] text-[13px] leading-[1.5] font-normal";

export const FIELDS =
  "flex flex-col gap-[clamp(16px,1.8vw,22px)] pt-[clamp(22px,2.6vw,32px)]";
export const FIELD = "flex flex-col gap-[7px]";
export const LABEL_ROW = "flex items-baseline justify-between gap-4";
export const LABEL =
  "text-[13px] tracking-[0.14em] uppercase font-medium text-[rgba(18,18,17,0.9)]";
export const FORGOT =
  "text-[12px] font-light text-muted-62 underline underline-offset-[3px] " +
  "transition-colors duration-300 ease-[ease] hover:text-ink";
export const INPUT =
  "h-[46px] px-[13px] bg-white border border-border-strong outline-none font-[inherit] " +
  "text-[14px] text-ink transition-[border-color] duration-200 ease-[ease] focus:border-ink";

export const HELPER =
  "mt-[14px] mx-0 mb-0 text-[13.5px] leading-[1.65] font-light text-muted-62";

export const SUBMIT =
  "min-h-[48px] mt-[clamp(20px,2.4vw,28px)] px-[26px] border-0 font-[inherit] text-[10.5px] " +
  "tracking-[0.2em] uppercase font-medium bg-ink text-paper cursor-pointer " +
  "transition-[opacity,background,color] duration-300 ease-[ease] " +
  "enabled:hover:opacity-86 " +
  "disabled:bg-[rgba(18,18,17,0.16)] disabled:text-muted-45 disabled:cursor-not-allowed";

/** The checkbox inside takes the ink accent. */
export const KEEP =
  "flex items-center gap-[11px] pt-4 text-[14px] font-light text-muted-62 cursor-pointer " +
  "[&_input]:accent-ink [&_input]:m-0";

/* ---------------------------------------------------------- register block */

export const REGISTER_BLOCK =
  "max-w-[460px] mt-[clamp(40px,5vw,64px)] mx-auto mb-0 pt-[clamp(30px,3.6vw,46px)] " +
  "border-t border-t-section-rule flex flex-col items-center text-center";
export const REGISTER_HEADING =
  "m-0 text-[clamp(15px,1.6vw,18px)] tracking-[0.16em] uppercase font-medium text-ink";
export const REGISTER_SUB =
  "mt-[10px] mx-0 mb-0 text-[14.5px] leading-[1.7] font-light text-muted-62";
export const REGISTER_BTN =
  "flex items-center justify-center min-h-[48px] mt-[clamp(20px,2.4vw,28px)] px-[30px] " +
  "border border-ink text-[10.5px] tracking-[0.2em] uppercase font-medium text-ink " +
  "transition-[background,color] duration-[320ms] ease-[ease] hover:bg-ink hover:text-paper";
export const MAILTO =
  "mt-[clamp(18px,2vw,24px)] mx-0 mb-0 text-[13.5px] leading-[1.65] font-light text-muted-45 " +
  "[&_a]:border-b [&_a]:border-b-[rgba(18,18,17,0.3)] [&_a]:text-muted-62 hover:[&_a]:text-ink";
