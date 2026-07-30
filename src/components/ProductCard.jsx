import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import ProductImage from "./ProductImage.jsx";
import { HIDES, money, viewLabel } from "../data/products.js";
import { useCart } from "../lib/CartContext.jsx";
import { Heart, Stars } from "./Icons.jsx";
import { item } from "../lib/Reveal.jsx";

export default function ProductCard({ product: p, stagger = false }) {
  const [hide, setHide] = useState(p.hides[0]);
  const { fav, toggleFav } = useCart();
  const saved = fav.has(p.id);
  const Wrap = stagger ? motion.article : "article";
  const wrapProps = stagger ? { variants: item } : {};

  return (
    <Wrap className="pcard" {...wrapProps}>
      <div className="pcard-m">
        <Link to={`/product/${p.id}`} aria-label={p.name}>
          <ProductImage product={p} hide={hide} bare />
        </Link>
        <div className="pcard-tags">
          {p.tags.includes("bestseller") && <span className="tag">Best seller</span>}
          {p.tags.includes("new") && <span className="tag s">New</span>}
          {p.tags.includes("limited") && <span className="tag q">Limited run</span>}
          {p.was && <span className="tag r">−{Math.round((1 - p.price / p.was) * 100)}%</span>}
        </div>
        <button className="pcard-fav" aria-pressed={saved} onClick={() => toggleFav(p.id)}
                aria-label={`${saved ? "Remove" : "Save"} ${p.name}`}>
          <Heart filled={saved} width="15" height="15" />
        </button>
        <div className="pcard-cta">
          <Link to={`/product/${p.id}`} className="btn sm block">{viewLabel(p)}</Link>
        </div>
      </div>

      <Link to={`/product/${p.id}`} className="stack" style={{ gap: 6 }}>
        <h3 className="pcard-n">{p.name}</h3>
        <p className="pcard-s">{p.sub}</p>
      </Link>

      <div className="hides" role="group" aria-label={`Hide colours for ${p.name}`}>
        {p.hides.map(h => (
          <button key={h} className="hide-sw" aria-pressed={hide === h} title={HIDES[h].n}
                  aria-label={HIDES[h].n} style={{ background: HIDES[h].hex }}
                  onClick={() => setHide(h)} />
        ))}
      </div>

      <div className="pcard-f">
        <span className="price">{p.was && <s>{money(p.was)}</s>}{money(p.price)}</span>
        <span className="mono muted" style={{ display:"inline-flex", alignItems:"center", gap:6 }}>
          <Stars r={p.rating} /> {p.rating}
        </span>
      </div>
    </Wrap>
  );
}
