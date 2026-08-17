"use client";

import { useRef } from "react";
import { Chevron } from "./icons";
import {
  GALLERY,
  GALLERY_ARROW,
  GALLERY_ARROW_NEXT,
  GALLERY_ARROW_PREV,
  MAIN_IMAGE,
  NO_IMAGE,
  THUMB,
  THUMB_ARROW,
  THUMB_ARROW_NEXT,
  THUMB_ARROW_PREV,
  THUMB_ROW,
  THUMB_WRAP,
  ZOOM_BTN,
} from "@/app/product/productClasses";

/**
 * Sticky image well: main shot, prev/next arrows, a zoom trigger, and a
 * scrollable thumbnail strip. Purely presentational — the selected view and the
 * image list are owned by ProductClient, because picking a colour changes both.
 */
export default function ProductGallery({
  images,
  view,
  onView,
  onZoom,
  alt,
  galleryRef,
}: {
  images: string[];
  view: number;
  onView: (i: number) => void;
  onZoom: () => void;
  alt: string;
  galleryRef: React.RefObject<HTMLDivElement | null>;
}) {
  const stripRef = useRef<HTMLDivElement>(null);
  const many = images.length > 1;

  /** Step the thumbnail strip by roughly two thumbnails. */
  const scrollThumbs = (dir: 1 | -1) => {
    const el = stripRef.current;
    if (!el) return;
    const step = (el.firstElementChild as HTMLElement | null)?.offsetWidth ?? 66;
    el.scrollBy({ left: dir * (step + 10) * 2, behavior: "smooth" });
  };

  return (
    <div className={GALLERY} ref={galleryRef}>
      <div className={MAIN_IMAGE}>
        {images[view] ? (
          <img src={images[view]} alt={alt} />
        ) : (
          <span className={NO_IMAGE}>No photography</span>
        )}

        {images[view] && (
          <button type="button" className={ZOOM_BTN} aria-label="Zoom image" onClick={onZoom}>
            <svg width="17" height="17" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.4" aria-hidden="true">
              <circle cx="8.5" cy="8.5" r="6" />
              <path d="M13 13l5 5" />
              <path d="M6 8.5h5M8.5 6v5" />
            </svg>
          </button>
        )}

        {many && (
          <>
            <button
              type="button"
              className={`${GALLERY_ARROW} ${GALLERY_ARROW_PREV}`}
              aria-label="Previous image"
              onClick={() => onView((view - 1 + images.length) % images.length)}
            >
              <Chevron dir="left" />
            </button>
            <button
              type="button"
              className={`${GALLERY_ARROW} ${GALLERY_ARROW_NEXT}`}
              aria-label="Next image"
              onClick={() => onView((view + 1) % images.length)}
            >
              <Chevron dir="right" />
            </button>
          </>
        )}
      </div>

      {many && (
        <div className={THUMB_WRAP}>
          <button
            type="button"
            className={`${THUMB_ARROW} ${THUMB_ARROW_PREV}`}
            aria-label="Scroll thumbnails left"
            onClick={() => scrollThumbs(-1)}
          >
            <Chevron dir="left" size={7} />
          </button>

          <div className={THUMB_ROW} ref={stripRef}>
            {images.map((src, i) => (
              <button
                key={src + i}
                type="button"
                className={THUMB}
                aria-label={`View ${i + 1}`}
                aria-current={i === view}
                style={{ borderColor: i === view ? "#121211" : "rgba(18,18,17,0.14)" }}
                onClick={() => onView(i)}
              >
                <img src={src} alt="" loading="lazy" />
              </button>
            ))}
          </div>

          <button
            type="button"
            className={`${THUMB_ARROW} ${THUMB_ARROW_NEXT}`}
            aria-label="Scroll thumbnails right"
            onClick={() => scrollThumbs(1)}
          >
            <Chevron dir="right" size={7} />
          </button>
        </div>
      )}
    </div>
  );
}
