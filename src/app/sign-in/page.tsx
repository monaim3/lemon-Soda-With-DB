import Link from "next/link";
import type { Metadata } from "next";
import SiteFooter from "@/components/chrome/SiteFooter";
import SignInForm from "./SignInForm";
import {
  BACK,
  BAR,
  HEADER,
  HEADER_LINK,
  HEADER_RIGHT,
  HERO,
  HERO_CONTENT,
  HERO_EYEBROW,
  HERO_IMG,
  HERO_SCRIM,
  HERO_TITLE,
  LOGO,
  MAILTO,
  REGISTER_BLOCK,
  REGISTER_BTN,
  REGISTER_HEADING,
  REGISTER_SUB,
  SECTION,
} from "./signInClasses";

export const metadata: Metadata = {
  title: "Sign in — Lemon & Soda UK",
  description: "Log in to the Lemon & Soda UK trade portal to see trade pricing and place orders.",
};

export default function SignInPage() {
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
          <nav className={HEADER_RIGHT}>
            <Link href="/register" className={HEADER_LINK}>
              Register
            </Link>
            <a href="mailto:info.uk@lemon-soda.eu" className={HEADER_LINK}>
              Contact
            </a>
          </nav>
        </div>
      </header>

      <section className={HERO}>
        <img src="/brand/ls-header-beeld2-0326.jpeg" alt="" className={HERO_IMG} />
        <div className={HERO_SCRIM} />
        <div className={HERO_CONTENT}>
          <p className={HERO_EYEBROW}>Trade portal</p>
          <h1 className={HERO_TITLE}>Login to your account</h1>
        </div>
      </section>

      <section className={SECTION}>
        <SignInForm />

        <div className={REGISTER_BLOCK}>
          <h2 className={REGISTER_HEADING}>I don&apos;t have an account</h2>
          <p className={REGISTER_SUB}>and I want to buy Lemon &amp; Soda products</p>
          <Link href="/register" className={REGISTER_BTN}>
            Register an account
          </Link>
          <p className={MAILTO}>
            Questions about your account?{" "}
            <a href="mailto:info.uk@lemon-soda.eu">info.uk@lemon-soda.eu</a>
          </p>
        </div>
      </section>

      <SiteFooter />
    </>
  );
}
