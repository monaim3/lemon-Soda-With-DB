/** Small inline SVGs shared across the product page. */

export function ChevronDown({ size = 11 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size * 0.64}
      viewBox="0 0 10 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      aria-hidden="true"
    >
      <path d="M1 1l4 4 4-4" />
    </svg>
  );
}

export function Chevron({ dir, size = 9 }: { dir: "left" | "right"; size?: number }) {
  return (
    <svg
      width={size}
      height={size * 1.6}
      viewBox="0 0 6 10"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.3"
      strokeLinecap="square"
      aria-hidden="true"
      style={dir === "right" ? { transform: "scaleX(-1)" } : undefined}
    >
      <path d="M5 1L1 5l4 4" />
    </svg>
  );
}
