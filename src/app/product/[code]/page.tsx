import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProductClient from "@/components/product/ProductClient";
import { getStyle, STYLES } from "@/lib/catalogue";

export function generateStaticParams() {
  return STYLES.map((s) => ({ code: s.code }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ code: string }>;
}): Promise<Metadata> {
  const { code } = await params;
  const style = getStyle(code);
  if (!style) return { title: "Style not found — Lemon & Soda UK" };
  return {
    title: `${style.code} ${style.name} — Lemon & Soda UK`,
    description: style.description || undefined,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  const style = getStyle(code);
  if (!style) notFound();
  // Keyed so moving between styles mounts a fresh page rather than carrying
  // the previous style's gallery, colour selection and quantities across.
  return <ProductClient key={style.code} style={style} />;
}
