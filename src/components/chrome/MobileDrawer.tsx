"use client";

import Link from "next/link";
import { useEffect } from "react";
import { ACCENTS, DRAWER_PRIMARY, DRAWER_TRADE } from "@/data/nav";

const CLOSE_LINK =
  "flex items-center gap-[11px] p-0 bg-transparent border-0 cursor-pointer " +
  "text-[11.5px] tracking-[0.19em] uppercase font-normal text-muted-45 hover:text-ink";
/* Underline appears on hover, so the border is always present but transparent —
   colouring it in avoids the 1px reflow a border-width change would cause. */
const TRADE_LINK =
  "self-start pb-[5px] border-b border-b-transparent text-[11px] tracking-[0.2em] uppercase " +
  "font-medium text-muted-62 transition-[border-color,color] duration-[400ms] ease-[ease] " +
  "hover:text-ink hover:border-b-ink";

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <>
      <div
        className="fixed inset-0 z-[87] bg-[rgba(18,18,17,0.28)] transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{ opacity: open ? 1 : 0, pointerEvents: open ? "auto" : "none" }}
        onClick={onClose}
      />
      <aside
        className="fixed top-0 left-0 bottom-0 w-[clamp(320px,26vw,420px)] max-[759px]:w-[84vw] z-[88] bg-paper border-r border-r-border transition-transform duration-[560ms] ease-[cubic-bezier(0.33,0,0.1,1)] flex flex-col"
        style={{ transform: open ? "translateX(0)" : "translateX(-100%)" }}
      >
        <div className="flex items-center justify-between gap-6 px-gutter pt-[calc(clamp(22px,3.2vw,40px)+10px)]">
          <button type="button" className={CLOSE_LINK} onClick={onClose}>
            <span className="block relative w-4 h-px">
              <span className="absolute inset-0 bg-current rotate-45" />
              <span className="absolute inset-0 bg-current -rotate-45" />
            </span>
            Close
          </button>
        </div>
        <nav className="flex-1 flex flex-col px-gutter pt-[clamp(48px,6vw,88px)]">
          <div className="flex flex-col gap-[clamp(8px,1vw,14px)]">
            {DRAWER_PRIMARY.map((d) => (
              <Link key={d.label} href={d.href} className="font-display text-[clamp(26px,2.6vw,38px)] font-normal leading-[1.14] tracking-[-0.01em] text-ink transition-opacity duration-[400ms] ease-[ease] hover:opacity-45" onClick={onClose}>
                {d.label}
              </Link>
            ))}
          </div>
          <div className="flex flex-col gap-[clamp(12px,1.4vw,18px)] mt-[clamp(40px,5vw,64px)]">
            {DRAWER_TRADE.map((d) => (
              <a key={d} href="#" className={TRADE_LINK}>
                {d}
              </a>
            ))}
          </div>
          <a href="#" className="self-start mt-auto mb-[clamp(32px,4vw,48px)] pb-[5px] border-b border-b-[rgba(18,18,17,0.25)] text-[11px] tracking-[0.2em] uppercase font-medium text-muted-62 transition-[border-color,color] duration-[400ms] ease-[ease] hover:text-ink hover:border-b-ink">
            Contact Us
          </a>
        </nav>
        <div className="grid grid-cols-4 w-[calc(100%+1px)] -mr-px">
          {ACCENTS.map((c) => (
            <span key={c} className="h-1" style={{ background: c }} />
          ))}
        </div>
      </aside>
    </>
  );
}
