/**
 * Classes for the landing page's own chrome: the transparent bar over the hero
 * video, and the frosted panel the sticky bar sits in once it takes over.
 * Everything shared with the inner-page header lives in headerClasses.
 */

export const HERO_HEADER =
  "fixed top-0 left-0 right-0 z-20 grid grid-cols-[1fr_auto_1fr] items-start gap-6 "
  + "px-gutter pt-[clamp(22px,3.2vw,40px)] pb-0 "
  + "transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]";

export const HERO_NAV =
  "flex items-center gap-[clamp(18px,2.4vw,32px)] text-[11.5px] tracking-[0.19em] uppercase "
  + "font-normal text-[rgba(255,255,255,0.78)] pt-[10px] "
  + "max-[759px]:[&>*:not(:first-child)]:hidden";

export const HERO_MENU_LINK =
  "flex items-center gap-[11px] bg-transparent border-0 text-inherit [font:inherit] "
  + "tracking-[inherit] uppercase cursor-pointer p-0 hover:text-white";

export const HERO_BURGER =
  "flex flex-col gap-[3.5px] w-4 [&_span]:block [&_span]:h-px [&_span]:bg-current";

export const HERO_NAV_ITEM =
  "bg-transparent border-0 text-inherit [font:inherit] tracking-[inherit] uppercase "
  + "cursor-pointer p-0 hover:text-white";

export const HERO_LOGO =
  "block justify-self-center [&_img]:h-[clamp(60px,6vw,92px)] [&_img]:w-auto "
  + "[&_img]:block [&_img]:[filter:invert(1)_brightness(1.9)]";

export const HERO_ACCOUNT =
  "border-b border-b-transparent transition-[color,border-color] duration-300 ease-[ease] "
  + "hover:text-white hover:border-b-[rgba(255,255,255,0.7)]";

export const HERO_RIGHT =
  "flex items-center justify-end gap-[clamp(18px,2.4vw,32px)] text-[11.5px] tracking-[0.19em] "
  + "uppercase font-normal text-[rgba(255,255,255,0.78)] pt-[10px]";

export const STICKY_WRAP =
  "fixed top-0 left-0 right-0 z-[60] bg-[rgba(244,242,237,0.82)] "
  + "[-webkit-backdrop-filter:saturate(140%)_blur(18px)] border-b border-b-border "
  + "transition-opacity duration-[400ms] ease-[cubic-bezier(0.4,0,0.2,1)]";
