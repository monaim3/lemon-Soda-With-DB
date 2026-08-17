"use client";

import { useEffect } from "react";
import {
  LIGHTBOX,
  LIGHTBOX_ARROW,
  LIGHTBOX_CLOSE,
  LIGHTBOX_COUNT,
  LIGHTBOX_IMAGE,
  LIGHTBOX_NEXT,
  LIGHTBOX_PREV,
} from "@/app/product/productClasses";

/**
 * Full-screen image viewer. Escape or a click on the backdrop closes it; the
 * arrows step through the same gallery as the page behind.
 */
export default function Lightbox({
  images,
  index,
  alt,
  onClose,
  onIndex,
}: {
  images: string[];
  index: number;
  alt: string;
  onClose: () => void;
  onIndex: (i: number) => void;
}) {
  const many = images.length > 1;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (!many) return;
      if (e.key === "ArrowRight") onIndex((index + 1) % images.length);
      if (e.key === "ArrowLeft") onIndex((index - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, images.length, many, onClose, onIndex]);

  // Hold the page still behind the overlay.
  useEffect(() => {
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, []);

  return (
    <div
      className={LIGHTBOX}
      role="dialog"
      aria-modal="true"
      aria-label={`${alt} — enlarged`}
      onClick={onClose}
    >
      <button type="button" className={LIGHTBOX_CLOSE} aria-label="Close" onClick={onClose}>
        <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
          <path d="M1 1l16 16M17 1L1 17" stroke="currentColor" strokeWidth="1.3" />
        </svg>
      </button>

      {many && (
        <button
          type="button"
          className={`${LIGHTBOX_ARROW} ${LIGHTBOX_PREV}`}
          aria-label="Previous image"
          onClick={(e) => {
            e.stopPropagation();
            onIndex((index - 1 + images.length) % images.length);
          }}
        >
          <svg width="13" height="21" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
            <path d="M5 1L1 5l4 4" />
          </svg>
        </button>
      )}

      {/* Stop propagation so clicking the photo itself doesn't dismiss. */}
      <img
        className={LIGHTBOX_IMAGE}
        src={images[index]}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />

      {many && (
        <button
          type="button"
          className={`${LIGHTBOX_ARROW} ${LIGHTBOX_NEXT}`}
          aria-label="Next image"
          onClick={(e) => {
            e.stopPropagation();
            onIndex((index + 1) % images.length);
          }}
        >
          <svg width="13" height="21" viewBox="0 0 6 10" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true" style={{ transform: "scaleX(-1)" }}>
            <path d="M5 1L1 5l4 4" />
          </svg>
        </button>
      )}

      {many && (
        <span className={LIGHTBOX_COUNT}>
          {index + 1} / {images.length}
        </span>
      )}
    </div>
  );
}
