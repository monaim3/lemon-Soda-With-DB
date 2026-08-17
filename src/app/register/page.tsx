import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/chrome/SiteFooter";
import RegistrationForm from "@/components/form/RegistrationForm";
import {
  BACK,
  BAR,
  CONTACT,
  EYEBROW,
  HEADER,
  HEADING,
  LEDE,
  LOGO,
  SECTION,
  TITLE,
  WRAP,
} from "@/components/form/registrationClasses";

export const metadata: Metadata = {
  title: "Account Registration Form — Lemon & Soda UK",
};

export default function RegisterPage() {
  return (
    <>
      <header className={HEADER}>
        <div className={BAR}>
          <nav>
            <Link href="/" className={BACK}>
              <span />
              Back
            </Link>
          </nav>
          <Link href="/" className={LOGO}>
            <img src="/brand/lemonsoda-logo.png" alt="Lemon & Soda" />
          </Link>
          <nav style={{ display: "flex", justifyContent: "flex-end" }}>
            <a href="mailto:info.uk@lemon-soda.eu" className={CONTACT}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className={SECTION}>
        <div className={WRAP}>
          <div className={HEADING}>
            <span className={EYEBROW}>Lemon &amp; Soda UK Ltd</span>
            <h1 className={TITLE}>Account Registration Form</h1>
            <p className={LEDE}>
              Complete all three sections to open a trade account. Fields marked with an asterisk are required.
            </p>
          </div>

          <RegistrationForm />
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
