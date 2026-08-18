import { facetHref } from "@/lib/catalogue";

export type NavLink = {
  label: string;
  href: string;
  /** Opens in a new tab. Used for destinations outside this site. */
  external?: boolean;
};

/**
 * Product groups.
 *
 * The menu wording is not the wording in the product data — the data says
 * "Polo's", "Sweat" and "Polar Fleece" where the menu says "Poloshirts",
 * "Sweatshirts" and "Fleece". The href side of each entry must match the data
 * exactly or the link lands on an empty catalogue, so if the category names in
 * the source file ever change, these are the strings to update.
 */
export const MENU_ITEMS: NavLink[] = [
  { label: "All products", href: "/catalogue" },
  { label: "Poloshirts", href: facetHref("category", "Polo's") },
  { label: "T-shirts", href: facetHref("category", "T-shirts") },
  { label: "Sweatshirts", href: facetHref("category", "Sweat") },
  { label: "Shirts", href: facetHref("category", "Shirts") },
  { label: "Fleece", href: facetHref("category", "Polar Fleece") },
  { label: "Jackets", href: facetHref("category", "Jackets") },
];

/**
 * Collections. Workwear covers both the plain "Workwear" collection and the
 * "Workwear/Everywear" crossover styles, so it carries two values.
 */
export const MENU_COLLECTIONS: NavLink[] = [
  { label: "Workwear", href: facetHref("collection", "Workwear", "Workwear/Everywear") },
  { label: "Originals", href: facetHref("collection", "Originals") },
  { label: "Deluxe", href: facetHref("collection", "Deluxe") },
  { label: "Private Label", href: "https://privatelabelconcept.nl", external: true },
];

/** The Everywear card in the menu, alongside the two link columns. */
export const MENU_EVERYWEAR: NavLink = {
  label: "Workwear · Everywear",
  href: facetHref("collection", "Workwear/Everywear"),
};

export const DRAWER_PRIMARY = [
  { label: "Catalogue", href: "/catalogue" },
];

export const DRAWER_TRADE = ["Register account"];

export const ACCENTS = ["#5B87A6", "#E0B02A", "#35507E", "#8E4249"];

/** Lemon & Soda's social profiles, linked from the footer. */
export const SOCIAL = {
  linkedin: "https://www.linkedin.com/company/lemonandsoda/",
  facebook: "https://www.facebook.com/lemonandsoda/",
  instagram: "https://www.instagram.com/lemonandsoda79/",
} as const;
