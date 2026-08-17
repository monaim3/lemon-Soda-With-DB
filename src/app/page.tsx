import Link from "next/link";
import LandingChrome from "@/components/chrome/LandingChrome";
import HeroVideo from "@/components/landing/HeroVideo";
import SiteFooter from "@/components/chrome/SiteFooter";
import { facetHref, getStyle, img, STYLES } from "@/lib/catalogue";
import {
  COLLECTIONS,
  COLLECTIONS_GRID,
  COLLECTION_BODY,
  COLLECTION_CARD,
  COLLECTION_MARK,
  COLLECTION_META,
  COLLECTION_NAME,
  COLLECTION_TEXT,
  COLLECTION_TINT,
  DIPTYCH_GRID,
  DIPTYCH_CARD,
  DIPTYCH_IMG,
  DIPTYCH_LABEL_ROW,
  DIPTYCH_META,
  DIPTYCH_NAME,
  EVERYWEAR,
  EVERYWEAR_EYEBROW,
  EVERYWEAR_INTRO,
  EVERYWEAR_INTRO_WRAP,
  EVERYWEAR_LEDE,
  EVERYWEAR_MORE,
  EVERYWEAR_RAIL_GRID,
  EVERYWEAR_RAIL_WRAP,
  EVERYWEAR_TITLE,
  HERO,
  HERO_BG,
  HERO_CONTENT,
  HERO_CTAS,
  HERO_CTA_DIVIDER,
  HERO_CTA_PRIMARY,
  HERO_CTA_SECONDARY,
  HERO_EYEBROW,
  HERO_GLOW,
  HERO_SCRIM_1,
  HERO_SCRIM_2,
  HERO_SCROLL_BAR,
  HERO_SCROLL_INDICATOR,
  HERO_STRIPES,
  HERO_TITLE,
  HERO_VIDEO,
  MARK_LEAVES,
  PL_EXPLORE,
  PL_GRID,
  PL_HEAD,
  PL_IMG,
  PL_LEDE,
  PL_OPTIONS,
  PL_OPTIONS_LABEL,
  PL_OPTION_DETAIL,
  PL_OPTION_NAME,
  PL_OPTION_ROW,
  PRIVATE_LABEL,
  RAIL_CARD,
  RAIL_CODE,
  RAIL_IMG,
  RAIL_NAME,
  SECTION_HEAD,
  SECTION_LEDE,
  SECTION_TITLE,
} from "./landingClasses";

/**
 * The four collection cards, in the order the design specifies:
 * Workwear, Originals, Deluxe, Private Label.
 *
 * The first three carry a live style count taken from `collections`, which also
 * builds the catalogue link, so the number on a card and the number it lands on
 * cannot drift apart. Workwear includes the Workwear/Everywear crossover
 * styles, matching the header menu.
 *
 * Private Label is not a catalogue collection — it is a made-to-order service —
 * so it shows a fixed caption instead of a count and links off-site.
 */
type CollectionCard = {
  name: string;
  tint: string;
  body: string;
  /** Caption under the name: the unit after `count`, or standalone text. */
  meta: string;
  /** Omitted for Private Label, which has no catalogue count. */
  count?: number;
  href: string;
  external?: boolean;
};

const COLLECTION_CARDS: CollectionCard[] = [
  {
    name: "Workwear",
    collections: ["Workwear", "Workwear/Everywear"],
    tint: "#5B87A6",
    body: "Comfortable and representative workwear made of high-quality materials for every industry.",
  },
  {
    name: "Originals",
    collections: ["Originals"],
    tint: "#E0B02A",
    body: "Timeless basics of formidable quality form the basis for the Original collection.",
  },
  {
    name: "Deluxe",
    collections: ["Deluxe"],
    tint: "#35507E",
    body: "Items with just that little bit more. More comfort, more quality and more detail.",
  },
].map((c): CollectionCard => {
  const count = STYLES.filter((s) => c.collections.includes(s.collection)).length;
  return {
    name: c.name,
    tint: c.tint,
    body: c.body,
    count,
    meta: count === 1 ? "style" : "styles",
    href: facetHref("collection", ...c.collections),
  };
});

COLLECTION_CARDS.push({
  name: "Private Label",
  tint: "#8E4249",
  body: "Tailor-made sustainable clothing, entirely in your own style, for every industry.",
  meta: "Made to spec",
  href: "https://privatelabelconcept.nl",
  external: true,
});

/** Colour count straight from the catalogue, so the captions stay accurate. */
const colourCount = (code: string) => {
  const style = getStyle(code);
  if (!style) return "";
  return style.colours.length === 1 ? "One colour" : `${style.colours.length} colours`;
};

/** The two large model shots. Curated — these are the section's editorial images. */
const DIPTYCH = [
  { code: "LEM4732", name: "Everywear", file: "LEM4732_01.jpg" },
  { code: "LEM4748", name: "Everywear Accent", file: "LEM4748_01.jpg" },
].map((d) => ({ ...d, src: img(d.code, d.file), colours: colourCount(d.code) }));

/** Four Everywear products, in this order, each with its chosen packshot. */
const EVERYWEAR_RAIL = [
  { code: "LEM4504", name: "Cooldry T-shirt", file: "LEM4504_MB_01.jpg" },
  { code: "LEM4610", name: "Accent Polo", file: "LEM4610_BK-RD_01.jpg" },
  { code: "LEM4762", name: "Cardigan", file: "LEM4762_RB_01.jpg" },
  { code: "LEM4829", name: "Softshell Jacket", file: "LEM4829_DG_01.jpg" },
].map((e) => ({ ...e, src: img(e.code, e.file) }));

const PRIVATE_LABEL_OPTIONS = [
  { name: "Full", detail: "Complete development from A to Z, from 250 pieces" },
  { name: "Semi", detail: "Existing qualities and colours, your distinctive details" },
  { name: "Print", detail: "Rapid personalisation of existing items" },
];

export default function LandingPage() {
  return (
    <div id="top" style={{ position: "relative", width: "100%", overflowX: "clip", background: "var(--paper)" }}>
      <LandingChrome />

      <section className={HERO}>
        <div className={HERO_BG}>
          <div className={HERO_STRIPES} />
          <div className={HERO_GLOW} />
          <HeroVideo src="/video/hero.webm" className={HERO_VIDEO} />
        </div>
        <div className={HERO_SCRIM_1} />
        <div className={HERO_SCRIM_2} />

        <div className={HERO_CONTENT}>
          <p className={HERO_EYEBROW}>Est. 1979 · Netherlands</p>
          <h1 className={HERO_TITLE}>The art of the essential</h1>
          <div className={HERO_CTAS}>
            <Link href="/catalogue" className={HERO_CTA_PRIMARY}>
              Explore the catalogue
            </Link>
            <span className={HERO_CTA_DIVIDER} />
            <Link href="/register" className={HERO_CTA_SECONDARY}>
              Register now
            </Link>
          </div>
        </div>

        <div className={HERO_SCROLL_INDICATOR}>
          <div className={HERO_SCROLL_BAR} />
        </div>
      </section>

      <section className={COLLECTIONS}>
        <div className={SECTION_HEAD}>
          <h2 className={SECTION_TITLE}>The collections</h2>
          <p className={SECTION_LEDE}>
            Designed in the Netherlands since the 1980s. Four collections, each with a character of its own:
            T-shirts, polos, knitwear, shirts and outerwear, made sustainably.
          </p>
        </div>

        <div className={COLLECTIONS_GRID}>
          {COLLECTION_CARDS.map((c) => {
            const body = (
              <>
                <div className={COLLECTION_TINT} style={{ background: c.tint }} />
                <div className={COLLECTION_BODY}>
                  <h3 className={COLLECTION_NAME}>{c.name}</h3>
                  <p className={COLLECTION_META}>
                    {c.count !== undefined && <span className={COLLECTION_MARK}>{c.count}</span>}
                    {c.meta}
                  </p>
                  <p className={COLLECTION_TEXT}>{c.body}</p>
                </div>
              </>
            );
            return c.external ? (
              <a
                key={c.name}
                href={c.href}
                target="_blank"
                rel="noopener noreferrer"
                className={COLLECTION_CARD}
              >
                {body}
              </a>
            ) : (
              <Link key={c.name} href={c.href} className={COLLECTION_CARD}>
                {body}
              </Link>
            );
          })}
          <img src="/brand/mark-leaves-white.png" alt="" className={MARK_LEAVES} />
        </div>
      </section>

      <section className={EVERYWEAR}>
        <div className={EVERYWEAR_INTRO_WRAP}>
          <p className={EVERYWEAR_EYEBROW}>The Everywear line</p>
          <div className={EVERYWEAR_INTRO}>
            <h2 className={EVERYWEAR_TITLE}>Workwear is Everywear</h2>
            <p className={EVERYWEAR_LEDE}>
              Cooldry, four-way stretch, quick drying and anti-bacterial. Cut a little longer, finished to hold
              its shape, and ready to brand.
            </p>
          </div>
        </div>

        <div className={DIPTYCH_GRID}>
          {DIPTYCH.map((d) => (
            <Link key={d.code} href={`/product/${d.code}`} className={DIPTYCH_CARD}>
              <span className={DIPTYCH_IMG}>{d.src && <img src={d.src} alt={d.name} />}</span>
              <span className={DIPTYCH_LABEL_ROW}>
                <span className={DIPTYCH_NAME}>{d.name}</span>
                <span className={DIPTYCH_META}>{d.colours}</span>
              </span>
            </Link>
          ))}
        </div>

        <div className={EVERYWEAR_RAIL_WRAP}>
          <div className={EVERYWEAR_RAIL_GRID}>
            {EVERYWEAR_RAIL.map((e) => (
              <Link key={e.code} href={`/product/${e.code}`} className={RAIL_CARD}>
                <span className={RAIL_IMG}>{e.src && <img src={e.src} alt={e.code} loading="lazy" />}</span>
                <span className={RAIL_CODE}>{e.code}</span>
                <span className={RAIL_NAME}>{e.name}</span>
              </Link>
            ))}
          </div>
          <Link href={facetHref("collection", "Workwear/Everywear")} className={EVERYWEAR_MORE}>
            See the Everywear line
          </Link>
        </div>
      </section>

      <section className={PRIVATE_LABEL}>
        <div className={PL_HEAD}>
          <h2 className={SECTION_TITLE}>Private Label</h2>
          <p className={PL_LEDE}>
            With Private Label by Lemon &amp; Soda, your corporate identity becomes a garment worth keeping. We
            shape the fabric, fit and finish around your brand, and stay with the project from concept through
            to delivery.
          </p>
        </div>

        <div className={PL_GRID}>
          <div className={PL_IMG}>
            <img src="/brand/Overall-Header2.jpg" alt="Private Label by Lemon & Soda" />
          </div>
          <div className={PL_OPTIONS}>
            <p className={PL_OPTIONS_LABEL}>Three options</p>
            <div>
              {PRIVATE_LABEL_OPTIONS.map((o) => (
                <div key={o.name} className={PL_OPTION_ROW}>
                  <span className={PL_OPTION_NAME}>{o.name}</span>
                  <span className={PL_OPTION_DETAIL}>{o.detail}</span>
                </div>
              ))}
            </div>
            <a href="https://privatelabelconcept.nl" target="_blank" rel="noopener" className={PL_EXPLORE}>
              Explore Private Label
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
