import careData from "@/data/care-icons.json";
import {
  CARE as CARE_SECTION,
  CARE_ICON,
  CARE_ITEM,
  CARE_ROW,
  CARE_TIP,
  CERTIFICATES,
  CERTIFICATES_IMG,
  SPEC_SECTION_HEADING,
} from "@/app/product/productClasses";

/**
 * Wash-care symbols for a style, scraped from the product feed by
 * scripts/scrape-care-icons.py. The description is a hover tooltip rather than
 * a caption, so the row stays a clean line of symbols.
 */

const CARE = careData as {
  iconPath: string;
  icons: Record<string, string>;
  styles: Record<string, string[]>;
};

export function careIconsFor(code: string) {
  const files = CARE.styles[code.toUpperCase()] ?? [];
  return files.map((file) => ({
    file,
    src: `${CARE.iconPath}${file}`,
    description: CARE.icons[file] ?? "",
  }));
}

export default function CareInstructions({ code }: { code: string }) {
  const icons = careIconsFor(code);

  return (
    <>
      {icons.length > 0 && (
        <div className={CARE_SECTION}>
          <span className={SPEC_SECTION_HEADING}>Care instructions</span>
          <div className={CARE_ROW}>
            {icons.map((icon) => (
              <span
                key={icon.file}
                className={CARE_ITEM}
                // Focusable so the tooltip is reachable without a pointer.
                tabIndex={0}
                aria-label={icon.description}
              >
                <img src={icon.src} alt="" className={CARE_ICON} />
                <span className={CARE_TIP} role="tooltip">
                  {icon.description}
                </span>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* The same three certifications apply across the range. */}
      <div className={CERTIFICATES}>
        <span className={SPEC_SECTION_HEADING}>Certificates</span>
        <img
          src="/brand/certificates.jpg"
          alt="Sedex, amfori and WRAP certified"
          className={CERTIFICATES_IMG}
        />
      </div>
    </>
  );
}
