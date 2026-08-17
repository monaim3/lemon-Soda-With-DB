export const SIZE_ORDER = [
  "XS",
  "S",
  "M",
  "L",
  "XL",
  "2XL",
  "3XL",
  "4XL",
  "5XL",
  "6XL",
] as const;

export type Size = (typeof SIZE_ORDER)[number];

export const rangeLabel = (sizes: Size[]) =>
  sizes.length ? `${sizes[0]} – ${sizes[sizes.length - 1]}` : "—";
