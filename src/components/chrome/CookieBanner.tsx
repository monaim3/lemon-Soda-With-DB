"use client";

import { useState, useEffect } from "react";

const KEY = "ls_cookie_accepted";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(KEY)) setVisible(true);
  }, []);

  if (!visible) return null;

  function accept() {
    localStorage.setItem(KEY, "1");
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie notice"
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 9999,
        background: "var(--ink)",
        color: "var(--paper)",
        borderTop: "1px solid rgba(244,242,237,0.12)",
        display: "flex",
        alignItems: "center",
        gap: "24px",
        padding: "14px clamp(20px, 4vw, 56px)",
        fontFamily: "var(--font-ui)",
        fontSize: "13px",
        lineHeight: "1.55",
      }}
    >
      <p style={{ margin: 0, flex: 1, color: "rgba(244,242,237,0.84)" }}>
        We use cookies to give you the best experience on our site. By continuing to browse, you agree to our use of cookies.{" "}
        <a
          href="/privacy"
          style={{ color: "var(--paper)", textDecoration: "underline", textUnderlineOffset: "2px" }}
        >
          Learn more
        </a>
      </p>

      <button
        onClick={accept}
        style={{
          flexShrink: 0,
          background: "var(--paper)",
          color: "var(--ink)",
          border: "none",
          padding: "9px 22px",
          fontSize: "12px",
          fontFamily: "var(--font-ui)",
          fontWeight: 500,
          letterSpacing: "0.08em",
          textTransform: "uppercase",
          cursor: "pointer",
          whiteSpace: "nowrap",
        }}
      >
        Accept
      </button>
    </div>
  );
}
