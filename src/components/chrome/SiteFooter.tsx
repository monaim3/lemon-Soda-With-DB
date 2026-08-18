import Link from "next/link";
import { ACCENTS, SOCIAL } from "@/data/nav";

/*
 * Repeated class strings are named rather than pasted at each use — several of
 * these appear a dozen times, and a name is easier to change and to read than a
 * wall of utilities. Arbitrary values ([11px], [0.22em]) keep the exact figures
 * the design uses where Tailwind's scale has no equivalent.
 */
const HEADING = "text-[11px] tracking-[0.22em] uppercase font-medium text-on-dark-40";
const ADDRESS = "text-[14px] leading-[1.95] tracking-[0.04em] font-normal text-on-dark-86";
const CONTACT_LINK = "text-[14px] tracking-[0.04em] font-normal text-on-dark-90 transition-colors duration-[400ms] ease-[ease] hover:text-paper";
const LINK = "text-[11px] tracking-[0.18em] uppercase font-normal text-on-dark-95 transition-colors duration-[400ms] ease-[ease] hover:text-paper";
const SOCIAL_LINK = "flex text-on-dark-84 transition-colors duration-[400ms] ease-[ease] hover:text-paper";
const COL = "flex flex-col gap-4";

export default function SiteFooter() {
  return (
    <footer id="site-footer" className="bg-ink text-paper px-gutter pt-[clamp(36px,4vw,56px)] pb-0 border-t border-t-on-dark-14">
      <div className="grid grid-cols-[minmax(280px,1.3fr)_1fr_1fr_0.8fr] gap-[clamp(28px,3.4vw,56px)] pb-[clamp(32px,3.6vw,48px)] max-[1039px]:grid-cols-2 max-[759px]:grid-cols-1">
        <div className={COL}>
          <span className={HEADING}>Contact</span>
          <span className={ADDRESS}>
            Lemon &amp; Soda UK Ltd
            <br />
            Epworth House, 25 City Road
            <br />
            London, England, EC1Y 1AA
          </span>
          <a href="mailto:info.uk@lemon-soda.eu" className={CONTACT_LINK}>
            info.uk@lemon-soda.eu
          </a>
          <a href="tel:+442079657390" className={CONTACT_LINK}>
            +44 (0)207 965 7390
          </a>
        </div>
        <div className={COL}>
          <span className={HEADING}>Dealers</span>
          <a href="#" className={LINK}>
            Find dealers
          </a>
          <Link href="/register" className={LINK}>
            Register account
          </Link>
          <Link href="/sign-in" className={LINK}>
            Dealer login
          </Link>
          <a href="#" className={LINK}>
            Download catalogue
          </a>
        </div>
        <div className={COL}>
          <span className={HEADING}>Legal</span>
          <a href="https://drive.google.com/file/d/1wbNswGZUtZhpX_3itOkXd0e4jzW8eNjP/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={LINK}>
            Terms &amp; conditions
          </a>
          <a href="https://drive.google.com/file/d/1ojs0cnhrolsOkm2b39EKKYmQwgHw1cM4/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={LINK}>
            Privacy policy
          </a>
          <a href="https://drive.google.com/file/d/10TaaTX-_XgpGVVJf7kHXgSvDHVER1ecH/view?usp=sharing" target="_blank" rel="noopener noreferrer" className={LINK}>
            Cookies
          </a>
        </div>
        <div className={COL}>
          <span className={HEADING}>Follow</span>
          <div className="flex items-center gap-5 pt-[2px]">
            <a
              href={SOCIAL.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lemon & Soda on LinkedIn"
              className={SOCIAL_LINK}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3 9h4v12H3V9zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.19 1.46-2.19 2.97V21h-4V9z" />
              </svg>
            </a>
            <a
              href={SOCIAL.facebook}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lemon & Soda on Facebook"
              className={SOCIAL_LINK}
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.78-1.63 1.57v1.89h2.78l-.44 2.91h-2.34v7.03C18.34 21.24 22 17.08 22 12.06z" />
              </svg>
            </a>
            <a
              href={SOCIAL.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Lemon & Soda on Instagram"
              className={SOCIAL_LINK}
            >
              <svg
                width="26"
                height="26"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="1.1" fill="currentColor" stroke="none" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-4 h-[2px]">
        {ACCENTS.map((c) => (
          <span key={c} style={{ background: c }} />
        ))}
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-5 items-center justify-between pt-[clamp(16px,1.8vw,22px)] pb-[clamp(18px,2vw,26px)] text-[11px] tracking-[0.2em] uppercase font-normal text-on-dark-40">
        <span>© 2026 Lemon &amp; Soda · Est. 1979</span>
        <span>United Kingdom · English</span>
      </div>
    </footer>
  );
}
