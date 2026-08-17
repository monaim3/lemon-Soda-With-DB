import type { Metadata } from "next";
import { Jost, Bodoni_Moda } from "next/font/google";
import "./globals.css";

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

const bodoniModa = Bodoni_Moda({
  variable: "--font-bodoni",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Lemon & Soda UK — Trade Portal",
  description: "The art of the essential. Workwear, Originals, Deluxe and Private Label since 1979.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      // Confirms the smooth scrolling in globals.css is intentional. Without it
      // Next.js also animates the scroll on route changes, so moving between
      // pages crawls to the top instead of arriving there; in-page scrolling —
      // the colour picker, the size-chart link — stays smooth either way.
      data-scroll-behavior="smooth"
      className={`${jost.variable} ${bodoniModa.variable}`}
    >
      {/* Browser extensions (Grammarly et al) inject attributes into <body> before
          React hydrates, which otherwise logs a hydration mismatch. */}
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
