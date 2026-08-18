"use client";

import { useEffect, useRef, useState } from "react";

/**
 * The hero video sits over a striped fallback and fades in once it can play, so
 * a slow connection (or reduced-motion) never leaves the hero blank.
 */
export default function HeroVideo({ src, className }: { src: string; className?: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.muted = true;
    el.defaultMuted = true;
    el.playsInline = true;
    el.setAttribute("playsinline", "");
    el.setAttribute("webkit-playsinline", "");

    const ok = () => setReady(true);
    const onError = () => setReady(false);
    const events = ["loadeddata", "canplay", "playing"] as const;
    events.forEach((e) => el.addEventListener(e, ok));
    el.addEventListener("error", onError);

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      el.autoplay = false;
      el.pause();
    } else {
      el.autoplay = true;
      const play = () => {
        const p = el.play();
        if (p && p.catch) p.catch(() => {});
      };
      play();
      el.addEventListener("canplay", play, { once: true });
    }

    return () => {
      events.forEach((e) => el.removeEventListener(e, ok));
      el.removeEventListener("error", onError);
    };
  }, []);

  return (
    <video
      ref={ref}
      className={className}
      src={src}
      loop
      muted
      playsInline
      preload="auto"
      aria-hidden="true"
      style={{ opacity: ready ? 1 : 0 }}
    />
  );
}
