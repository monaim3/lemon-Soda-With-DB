"use client";

import Link from "next/link";
import { ACCOUNT_ITEM, ACCOUNT_ITEM_MUTED, ACCOUNT_PANEL, ACCOUNT_PANEL_DARK, ACCOUNT_TRIGGER, ACCOUNT_WRAP } from "./headerClasses";

/**
 * The Account dropdown in the right-hand nav. Opening is controlled by the
 * header so the hero link can open the sticky bar's menu after scrolling into
 * it, and so opening the menu can close search and the collections dropdown.
 */
export default function AccountMenu({
  open,
  onOpen,
  onClose,
  onToggle,
  dark = false,
  style,
}: {
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  onToggle: () => void;
  /** Variant for use over a dark bar. */
  dark?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <span className={ACCOUNT_WRAP} onMouseEnter={onOpen} onMouseLeave={onClose}>
      <a
        href="/sign-in"
        className={ACCOUNT_TRIGGER}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => {
          e.preventDefault();
          onToggle();
        }}
        style={{ borderBottomColor: open ? "#121211" : "transparent", ...style }}
      >
        Account
      </a>

      <span
        className={`${ACCOUNT_PANEL} ${dark ? ACCOUNT_PANEL_DARK : ""}`}
        role="menu"
        style={{
          opacity: open ? 1 : 0,
          transform: open ? "translateY(0)" : "translateY(-6px)",
          pointerEvents: open ? "auto" : "none",
        }}
      >
        <Link href="/sign-in" role="menuitem" className={ACCOUNT_ITEM} onClick={onClose}>
          Sign in
        </Link>
        <Link
          href="/register"
          role="menuitem"
          className={`${ACCOUNT_ITEM} ${ACCOUNT_ITEM_MUTED}`}
          onClick={onClose}
        >
          Register
        </Link>
      </span>
    </span>
  );
}
