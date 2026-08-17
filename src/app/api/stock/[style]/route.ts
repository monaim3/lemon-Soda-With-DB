import { NextResponse } from "next/server";
import { getStyle } from "@/lib/catalogue";
import { fetchStock, levelsForStyle } from "@/lib/stock";

/**
 * GET /api/stock/LEM1111 -> { "LEM1111_BK-XS": 82, "LEM1111_BK-S": 174, ... }
 *
 * Stock levels are dealer-only, so this answers 401 unless the caller is signed
 * in. The product page treats any failure as "unknown" and shows "—", which is
 * the safe reading: showing 0 would wrongly tell a dealer they cannot order
 * something sitting in the warehouse.
 */

/** Never prerender — stock is live. */
export const dynamic = "force-dynamic";

/**
 * Is this request from a signed-in dealer?
 *
 * There is no session yet, so this is the one place to wire authentication in:
 * read the session cookie or Authorization header, verify it against the
 * backend, and return whether it is a valid dealer. Until then nobody is signed
 * in and stock stays hidden, which is the correct default for private data.
 *
 * STOCK_PUBLIC=1 opens it up without a session. It exists so the feed can be
 * demonstrated before authentication is built — do not set it in production.
 */
function isSignedIn(request: Request): boolean {
  if (process.env.STOCK_PUBLIC === "1") return true;

  // TODO: replace with a real session check once the backend exists, e.g.
  //   const token = request.headers.get("cookie")?.match(/session=([^;]+)/)?.[1];
  //   return await verifyDealerSession(token);
  void request;
  return false;
}

export async function GET(request: Request, { params }: { params: Promise<{ style: string }> }) {
  const { style: code } = await params;
  const style = getStyle(code);
  if (!style) {
    return NextResponse.json({ error: "Unknown style" }, { status: 404 });
  }

  if (!isSignedIn(request)) {
    return NextResponse.json({ error: "Sign in to view stock levels" }, { status: 401 });
  }

  try {
    const levels = await fetchStock();
    const skus = style.colours.flatMap((c) => c.skus.map((s) => s.sku));
    return NextResponse.json(
      { style: style.code, levels: levelsForStyle(levels, skus) },
      // Never cached by the browser. The response depends on who is asking, so
      // a stored copy would keep showing stock after a dealer signs out or
      // their session expires. Load is handled upstream instead: fetchStock
      // caches the feed itself for an hour, so repeat views cost HMZ nothing.
      { headers: { "Cache-Control": "no-store" } }
    );
  } catch (error) {
    // Log for the operator; tell the browser only that it is unavailable, so a
    // misconfigured credential never leaks through an error message.
    console.error("Stock feed unavailable:", error);
    return NextResponse.json({ error: "Stock temporarily unavailable" }, { status: 503 });
  }
}
