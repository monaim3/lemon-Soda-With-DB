import { STYLES, type Style } from "./catalogue";

/**
 * Search across the catalogue: style codes, names, collections, product groups,
 * fabric and colour names. Dealers mostly search by code ("4504", "LEM1111") or
 * by a plain word ("polo", "softshell", "navy"), so codes rank first.
 */

export type SearchHit = {
  style: Style;
  /** Colour names that matched, so the result can say why it appeared. */
  colours: string[];
  score: number;
};

const norm = (s: string) => s.toLowerCase().replace(/\s+/g, " ").trim();

/** Digits only, so "4504" finds LEM4504 and "lem 4504" works too. */
const digits = (s: string) => s.replace(/\D/g, "");

function scoreStyle(style: Style, q: string): { score: number; colours: string[] } {
  const code = norm(style.code);
  const name = norm(style.name);
  const qDigits = digits(q);

  let score = 0;

  // Code matches are the strongest signal.
  if (code === q) score = 1000;
  else if (qDigits && digits(code) === qDigits) score = 950;
  else if (code.startsWith(q)) score = 900;
  else if (qDigits.length >= 3 && digits(code).includes(qDigits)) score = 800;
  else if (code.includes(q)) score = 700;

  // Then the style name, favouring word-start matches.
  if (name.startsWith(q)) score = Math.max(score, 600);
  else if (new RegExp(`\\b${q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`).test(name)) score = Math.max(score, 500);
  else if (name.includes(q)) score = Math.max(score, 400);

  // Then the taxonomy.
  for (const [field, weight] of [
    [style.collection, 300],
    [style.category, 300],
    [style.fabric, 200],
    [style.fitting, 150],
    [style.gender, 120],
  ] as [string | null, number][]) {
    if (field && norm(field).includes(q)) score = Math.max(score, weight);
  }

  // Colours last, but record which ones matched so the UI can show them.
  const colours: string[] = [];
  for (const c of style.colours) {
    if (norm(c.name).includes(q) || norm(c.code) === q) {
      colours.push(c.name);
      score = Math.max(score, 250);
    }
  }

  return { score, colours };
}

export function searchStyles(rawQuery: string, limit = 8): SearchHit[] {
  const q = norm(rawQuery);
  if (q.length < 2) return [];

  const hits: SearchHit[] = [];
  for (const style of STYLES) {
    const { score, colours } = scoreStyle(style, q);
    if (score > 0) hits.push({ style, colours, score });
  }

  hits.sort((a, b) => b.score - a.score || a.style.code.localeCompare(b.style.code));
  return limit > 0 ? hits.slice(0, limit) : hits;
}

/** Total matches, for the "see all" affordance. */
export const countMatches = (rawQuery: string) => searchStyles(rawQuery, 0).length;
