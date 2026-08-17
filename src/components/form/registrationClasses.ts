/**
 * Classes for the dealer registration form.
 *
 * The page header matches the sign-in page's — a simplified bar with a back
 * link, the mark, and one link on the right.
 */

/* ------------------------------------------------------------------ header */

export const HEADER = "sticky top-0 z-[60] bg-paper border-b border-b-section-rule";
export const BAR =
  "grid grid-cols-[1fr_auto_1fr] items-center gap-6 px-gutter h-[78px] max-[759px]:h-[64px]";
export const BACK =
  "flex items-center gap-[10px] h-11 text-[11.5px] tracking-[0.19em] uppercase font-light " +
  "text-muted-62 hover:text-ink [&_span]:block [&_span]:w-[14px] [&_span]:h-px [&_span]:bg-current";
export const LOGO =
  "flex items-center justify-self-center " +
  "[&_img]:h-11 [&_img]:w-auto [&_img]:block max-[759px]:[&_img]:h-[34px]";
export const CONTACT =
  "flex items-center justify-end h-11 text-[11.5px] tracking-[0.19em] uppercase font-light " +
  "text-muted-62 hover:text-ink";

/* ------------------------------------------------------------------ intro */

export const SECTION =
  "pt-[clamp(30px,3.6vw,52px)] px-gutter pb-[clamp(56px,6vw,96px)]";
export const WRAP = "max-w-[940px] mx-auto";
export const HEADING =
  "flex flex-col gap-[10px] pb-[clamp(22px,2.4vw,32px)] border-b border-b-section-rule";
export const EYEBROW =
  "text-[13px] tracking-[0.22em] uppercase font-medium text-[rgba(18,18,17,0.86)]";
export const TITLE =
  "m-0 font-display font-normal text-[clamp(28px,3.6vw,46px)] leading-[1.05] tracking-[-0.01em]";
export const LEDE =
  "mt-[6px] mx-0 mb-0 max-w-[62ch] text-[14.5px] leading-[1.7] font-light text-[rgba(18,18,17,0.78)]";

/* ------------------------------------------------- confirmation, post-submit */

export const DONE =
  "flex flex-col gap-[14px] mt-[clamp(28px,3vw,40px)] p-[clamp(24px,2.6vw,34px)] " +
  "bg-white border border-border-strong";
export const DONE_HEADING = "m-0 font-medium text-[clamp(19px,2vw,26px)] leading-[1.2]";
export const DONE_BODY =
  "m-0 max-w-[60ch] text-[14.5px] leading-[1.75] font-light text-[rgba(18,18,17,0.82)]";
export const DONE_RESET =
  "self-start mt-[6px] min-h-[36px] flex items-center px-4 border border-[rgba(18,18,17,0.24)] " +
  "text-[9.5px] tracking-[0.14em] uppercase font-medium bg-transparent cursor-pointer " +
  "hover:bg-ink hover:border-ink hover:text-paper";

/* ------------------------------------------------------------------- form */

export const FORM = "flex flex-col gap-[clamp(30px,3.4vw,46px)] pt-[clamp(26px,3vw,38px)]";
/*
 * The stylesheet drew the divider with `.fieldset + .fieldset`. The fieldsets
 * are contiguous siblings inside the form, so every one except the first is the
 * same set — expressed here so the rule travels with the fieldset itself.
 */
export const FIELDSET =
  "m-0 p-0 border-0 flex flex-col gap-[clamp(14px,1.6vw,20px)] " +
  "[&:not(:first-of-type)]:border-t [&:not(:first-of-type)]:border-t-section-rule " +
  "[&:not(:first-of-type)]:pt-[clamp(24px,2.6vw,34px)]";
export const LEGEND = "p-0 flex items-baseline gap-[14px]";
export const SECTION_NUM =
  "text-[12.5px] tracking-[0.2em] uppercase font-medium text-[rgba(18,18,17,0.84)]";
export const SECTION_TITLE = "text-[18px] font-medium tracking-[0.01em]";

export const GRID =
  "grid grid-cols-2 max-[759px]:grid-cols-1 gap-y-[clamp(14px,1.6vw,20px)] " +
  "gap-x-[clamp(18px,2vw,28px)] pt-[6px]";
export const FULL = "col-span-full";

export const FIELD = "flex flex-col gap-[7px]";
export const LABEL =
  "text-[13px] tracking-[0.14em] uppercase font-medium text-[rgba(18,18,17,0.9)]";

const CONTROL =
  "px-3 bg-white border border-border-strong outline-none text-[14px] text-ink " +
  "transition-[border-color] duration-200 ease-[ease] font-[inherit] focus:border-ink";
export const INPUT = `${CONTROL} h-[42px]`;
export const TEXTAREA = `${CONTROL} px-3 py-[11px] leading-[1.6] resize-y`;

/** Ownership is a row of checkbox chips; the box inside takes the ink accent. */
export const OWNERSHIP_ROW = "flex flex-wrap gap-[10px] pt-[6px]";
export const OWNERSHIP_CHIP =
  "flex items-center gap-[10px] min-h-[42px] px-4 border border-border-strong cursor-pointer " +
  "text-[11px] tracking-[0.14em] uppercase [&_input]:accent-ink [&_input]:m-0";

export const CONSENT_WRAP =
  "flex flex-col items-start gap-4 border-t border-t-section-rule pt-[clamp(22px,2.4vw,30px)]";
/** The checkbox sits 3px low so it lines up with the first line of text. */
export const CONSENT_LABEL =
  "flex items-start gap-3 cursor-pointer [&_input]:mt-[3px] [&_input]:mx-0 [&_input]:mb-0 " +
  "[&_input]:accent-ink";
export const CONSENT_TEXT =
  "text-[14.5px] leading-[1.65] font-normal text-ink max-w-[76ch] " +
  "[&_a]:border-b [&_a]:border-b-[rgba(18,18,17,0.3)]";
export const RESPONSE_NOTE =
  "m-0 text-[15px] leading-[1.65] font-light text-[rgba(18,18,17,0.84)]";
export const SUBMIT =
  "min-h-[46px] px-[26px] bg-ink text-paper border border-ink cursor-pointer text-[10.5px] " +
  "tracking-[0.2em] uppercase font-medium transition-opacity duration-300 ease-[ease] hover:opacity-82";
