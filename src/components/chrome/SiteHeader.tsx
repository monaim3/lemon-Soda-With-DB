"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import MobileDrawer from "./MobileDrawer";
import SearchPanel from "./SearchPanel";
import AccountMenu from "./AccountMenu";
import { MENU_COLLECTIONS, MENU_EVERYWEAR, MENU_ITEMS } from "@/data/nav";
import { BAR, BURGER, DROPDOWN, DROPDOWN_CARD, DROPDOWN_CARD_IMG, DROPDOWN_CARD_IMG_FILL, DROPDOWN_CARD_LABEL, DROPDOWN_COL, DROPDOWN_COL_BORDERED, DROPDOWN_GRID, DROPDOWN_LABEL, DROPDOWN_LINK, DROPDOWN_SCRIM, DROPDOWN_STACK, HEADER, LOGO, MENU_LINK, NAV_ITEM, NAV_LEFT, NAV_RIGHT } from "./headerClasses";

export default function SiteHeader({ blur = false }: { blur?: boolean }) {
  const [search, setSearch] = useState(false);
  const [menu, setMenu] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [account, setAccount] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const accountTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      if (search) setSearch(false);
      if (menu) setMenu(false);
      if (account) setAccount(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [search, menu, account]);

  const openSearch = (e: React.MouseEvent) => {
    e.preventDefault();
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

  const closeMenuDelayed = () => {
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setMenu(false), 180);
  };

  const revealDelay = search ? "0ms" : "560ms";
  const logoOpacity = search ? 0 : 1;

  return (
    <>
      <MobileDrawer open={drawer} onClose={() => setDrawer(false)} />
      <header className={HEADER} data-blur={blur} onMouseLeave={closeMenuDelayed}>
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
              style={{
                opacity: logoOpacity,
                pointerEvents: search ? "none" : "auto",
                transitionDelay: revealDelay,
              }}
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

          <Link
            href="/"
            className={LOGO}
            style={{ opacity: logoOpacity, transitionDelay: revealDelay }}
          >
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
      </header>
    </>
  );
}
