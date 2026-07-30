import JacketFlat from "./JacketFlat.jsx";
import { HIDES } from "../data/products.js";
import { asset } from "../lib/asset.js";

/* ─────────────────────────────────────────────────────────
   ONE SWITCH FOR ALL PRODUCT IMAGERY.
   If a product has `photos`, we render the photograph on a
   neutral "specimen" backdrop — like a sample under lab light.
   Otherwise we fall back to the SVG technical flat.
   ───────────────────────────────────────────────────────── */
export default function ProductImage({
  product, hide = "jet", mode = "render", index = 0, bare = false, className = "", priority = false
}) {
  const H = HIDES[hide] || HIDES.jet;
  const photo = product.photos?.[hide]?.[index] ?? product.photos?.default?.[index] ?? null;
  const showPhoto = photo && mode !== "spec";
  const isJacket = product.category === "jackets";

  return (
    <div className={`flat ${mode === "spec" ? "spec" : showPhoto ? "photo" : "grain"} ${className}`} style={{ "--hd": H.hex }}>
      {showPhoto
        ? <img src={asset(photo)} alt={`${product.name} — ${product.sub} in ${H.n}, JACTMAK`} loading={priority ? "eager" : "lazy"}
               fetchPriority={priority ? "high" : "auto"} decoding="async" width="800" height="1000" />
        : <JacketFlat product={product} hide={hide} mode={mode} />}
      <span className="reg a" /><span className="reg b" />
      {!bare && <>
        <span className="flat-tl">{product.cut}{isJacket ? ` / ${product.panels} pnl` : ""}</span>
        <span className="flat-br">{mode === "spec" ? "spec sheet" : H.n}</span>
      </>}
    </div>
  );
}
