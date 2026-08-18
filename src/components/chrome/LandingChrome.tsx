"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MobileDrawer from "./MobileDrawer";
import SearchPanel from "./SearchPanel";
import AccountMenu from "./AccountMenu";
import { MENU_COLLECTIONS, MENU_EVERYWEAR, MENU_ITEMS } from "@/data/nav";
import { BAR, BURGER, DROPDOWN, DROPDOWN_CARD, DROPDOWN_CARD_IMG, DROPDOWN_CARD_IMG_FILL, DROPDOWN_CARD_LABEL, DROPDOWN_COL, DROPDOWN_COL_BORDERED, DROPDOWN_GRID, DROPDOWN_LABEL, DROPDOWN_LINK, DROPDOWN_SCRIM, DROPDOWN_STACK, LOGO, MENU_LINK, NAV_ITEM, NAV_LEFT, NAV_RIGHT } from "./headerClasses";
import { HERO_ACCOUNT, HERO_BURGER, HERO_HEADER, HERO_LOGO, HERO_MENU_LINK, HERO_NAV, HERO_NAV_ITEM, HERO_RIGHT, STICKY_WRAP } from "./landingChromeClasses";

export default function LandingChrome() {
  const [scrolled, setScrolled] = useState(false);
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [account, setAccount] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => {
      if (drawer) return;
      const s = window.scrollY > 24;
      setScrolled((prev) => (prev === s ? prev : s));
      if (s === false) setMenu(false);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [drawer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (drawer) setDrawer(false);
      if (search) setSearch(false);
      if (menu) setMenu(false);
      if (account) setAccount(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer, search, menu, account]);

  useEffect(() => {
    return () => {
      if (timer.current) clearTimeout(timer.current);
      if (accountTimer.current) clearTimeout(accountTimer.current);
    };
  }, []);

  const openSearch = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.scrollY < 90) window.scrollTo({ top: 120, behavior: "smooth" });
    if (timer.current) clearTimeout(timer.current);
    setSearch(true);
    setMenu(false);
    setTimeout(() => inputRef.current?.focus(), 300);
  };
  const openMenu = () => {
    if (search) return;
    if (timer.current) clearTimeout(timer.current);
    setMenu(true);
  };
  const holdMenu = () => {
    if (timer.current) clearTimeout(timer.current);
  };
  const shutMenu = () => {
    if (timer.current) clearTimeout(timer.current);
    if (menu) setMenu(false);
  };
  const openAccount = () => {
    if (accountTimer.current) clearTimeout(accountTimer.current);
    setAccount(true);
  };
  const closeAccount = () => {
    if (accountTimer.current) clearTimeout(accountTimer.current);
    accountTimer.current = setTimeout(() => setAccount(false), 180);
  };
  const toggleAccount = () => {
    if (accountTimer.current) clearTimeout(accountTimer.current);
    setAccount((a) => !a);
  };

  /**
   * Over the hero there is no dropdown — the bar it belongs to isn't on screen
   * yet. Scroll just far enough to expose the sticky off-white bar, then open
   * its Account menu once it has arrived.
   */
  const openAccountFromHero = (e: React.MouseEvent) => {
    e.preventDefault();
    if (window.scrollY < 90) window.scrollTo({ top: 120, behavior: "smooth" });
    setTimeout(() => {
      setAccount(true);
      setMenu(false);
      setSearch(false);
    }, 420);
  };

  const closeMenuDelayed = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu(false), 180);
  };

  const revealDelay = search ? "0ms" : "560ms";
  const logoOpacity = search ? 0 : 1;

  return (
    <>
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />

      {/* Transparent hero header, visible until scroll */}
      <header
        className={HERO_HEADER}
        style={{ opacity: scrolled ? 0 : 1, pointerEvents: scrolled ? "none" : "auto" }}
      >
        <nav className={HERO_NAV}>
          <button type="button" className={HERO_MENU_LINK} onClick={() => setDrawer(true)}>
            <span className={HERO_BURGER}>
              <span />
              <span />
              <span />
            </span>
            Menu
          </button>
          <button type="button" className={HERO_NAV_ITEM} onClick={openSearch}>
            Search
          </button>
        </nav>
        <a href="#top" className={HERO_LOGO}>
          <img src="/brand/lemonsoda-logo.png" alt="Lemon & Soda" />
        </a>
        <div className={HERO_RIGHT}>
          <a href="/sign-in" className={HERO_ACCOUNT} onClick={openAccountFromHero}>
            Account
          </a>
          <a href="#" className={HERO_NAV_ITEM}>
            UK / EN
          </a>
        </div>
      </header>

      {/* Sticky solid header, hands over from hero on scroll */}
      <div
        className={STICKY_WRAP}
        style={{ opacity: scrolled ? 1 : 0, pointerEvents: scrolled ? "auto" : "none" }}
        onMouseLeave={closeMenuDelayed}
      >
        <div className={BAR}>
          <nav className={NAV_LEFT}>
            <button type="button" className={MENU_LINK} onClick={() => setDrawer(true)}>
              <span className={BURGER}>
                <span />
                <span />
                <span />
              </span>
              Menu
            </button>
            <button
              type="button"
              className={NAV_ITEM}
              onClick={openSearch}
              onMouseEnter={shutMenu}
              style={{ opacity: logoOpacity, pointerEvents: search ? "none" : "auto", transitionDelay: revealDelay }}
            >
              Search
            </button>
            <Link
              href="/catalogue"
              className={NAV_ITEM}
              onMouseEnter={openMenu}
              onFocus={openMenu}
              style={{
                color: "var(--ink)",
                borderBottomColor: menu ? "#121211" : "transparent",
                opacity: logoOpacity,
                pointerEvents: search ? "none" : "auto",
                transitionDelay: revealDelay,
              }}
            >
              Collections
            </Link>
          </nav>

          <Link href="/" className={LOGO} style={{ opacity: logoOpacity, transitionDelay: revealDelay }}>
            <img src="/brand/lemonsoda-logo.png" alt="Lemon & Soda" />
          </Link>

          <nav className={NAV_RIGHT}>
            <AccountMenu
              open={account}
              onOpen={openAccount}
              onClose={closeAccount}
              onToggle={toggleAccount}
            />
            <a href="#" className={NAV_ITEM} style={{ display: "flex" }}>
              UK / EN
            </a>
          </nav>

          <SearchPanel
            open={search}
            onClose={() => setSearch(false)}
            inputRef={inputRef}
            onMouseEnter={shutMenu}
          />
        </div>

        <div className={DROPDOWN_SCRIM} style={{ opacity: menu ? 1 : 0 }} />

        <div
          className={DROPDOWN}
          onMouseEnter={holdMenu}
          onMouseLeave={closeMenuDelayed}
          style={{ opacity: menu ? 1 : 0, pointerEvents: menu ? "auto" : "none" }}
        >
          <div className={DROPDOWN_GRID}>
            <div>
              <p className={DROPDOWN_LABEL}>Products</p>
              <div className={DROPDOWN_COL}>
                {MENU_ITEMS.map((m) => (
                  <Link key={m.label} href={m.href} className={DROPDOWN_LINK}>
                    {m.label}
                  </Link>
                ))}
              </div>
            </div>
            <div className={DROPDOWN_COL_BORDERED}>
              <p className={DROPDOWN_LABEL}>Collections</p>
              <div className={DROPDOWN_COL}>
                {MENU_COLLECTIONS.map((c) =>
                  c.external ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={DROPDOWN_LINK}
                    >
                      {c.label}
                    </a>
                  ) : (
                    <Link key={c.label} href={c.href} className={DROPDOWN_LINK}>
                      {c.label}
                    </Link>
                  )
                )}
              </div>
            </div>
            <Link href={MENU_EVERYWEAR.href} className={DROPDOWN_CARD}>
              <span className={DROPDOWN_CARD_IMG}>
                <img src="/brand/everywear.png" alt="Everywear Collection" />
              </span>
              <span className={DROPDOWN_CARD_LABEL}>{MENU_EVERYWEAR.label}</span>
            </Link>
            <Link href="/product/LEM4772" className={`${DROPDOWN_CARD} ${DROPDOWN_STACK}`}>
              <span className={`${DROPDOWN_CARD_IMG} ${DROPDOWN_CARD_IMG_FILL}`}>
                <img src="/products/LEM4772/LEM4772_02.jpg" alt="LEM4772" />
              </span>
              <span className={DROPDOWN_CARD_LABEL}>LEM4772</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
