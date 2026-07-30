import { useState, useEffect } from "react";
import { Link, useParams, useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";
import ProductImage from "../components/ProductImage.jsx";
import ProductCard from "../components/ProductCard.jsx";
import Accordion from "../components/Accordion.jsx";
import { Stagger } from "../lib/Reveal.jsx";
import { PRODUCTS, HIDES, METALS, CATEGORIES, CUT_LABELS, byId, sizesOf, fitOf, money, viewLabel } from "../data/products.js";
import { useCart } from "../lib/CartContext.jsx";
import { Heart, Stars, Check, Arrow } from "../components/Icons.jsx";
import NotFound from "./NotFound.jsx";

export default function Product() {
  const { id } = useParams();
  const p = byId(id);
  const { add, fav, toggleFav } = useCart();
  const { openCart } = useOutletContext();
  const SZ = p ? sizesOf(p) : [], FIT = p ? fitOf(p) : {};
  const oneSize = SZ.length <= 1;
  const [hide, setHide] = useState(p?.hides[0]);
  const [mode, setMode] = useState("render");
  const [size, setSize] = useState(p ? SZ.find(s => !p.out.includes(s)) : null);
  const [qty, setQty]   = useState(1);

  useEffect(() => {
    if (!p) return;
    document.title = `JACTMAK — ${p.name} · ${p.sub}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content", `${p.name} — ${p.sub}. ${p.desc.slice(0, 130)}`);

    const ld = document.createElement("script");
    ld.type = "application/ld+json";
    ld.id = "product-ld";
    ld.textContent = JSON.stringify({
      "@context": "https://schema.org/", "@type": "Product",
      name: p.name, description: p.desc, sku: p.id,
      image: p.photos?.default?.[0] ? `https://www.jactmak.com${p.photos.default[0]}` : undefined,
      brand: { "@type": "Brand", name: "JACTMAK" },
      material: p.hideType,
      offers: {
        "@type": "Offer", url: `https://www.jactmak.com/product/${p.id}`, priceCurrency: "USD",
        price: p.price, availability: "https://schema.org/InStock",
        itemCondition: "https://schema.org/NewCondition"
      },
      aggregateRating: { "@type": "AggregateRating", ratingValue: p.rating, reviewCount: p.reviews }
    });
    const prev = document.getElementById("product-ld");
    if (prev) prev.remove();
    document.head.appendChild(ld);
    return () => { const el = document.getElementById("product-ld"); if (el) el.remove(); };
  }, [p]);

  if (!p) return <NotFound />;
  const saved = fav.has(p.id);
  const m = FIT[size] || [];
  const cat = CATEGORIES[p.category];
  const rel = PRODUCTS.filter(x => x.id !== p.id && x.category === p.category &&
    (x.cut === p.cut || x.gender === p.gender)).slice(0, 4);
  const relFinal = rel.length >= 4 ? rel : [...rel, ...PRODUCTS.filter(x => x.id !== p.id && x.category === p.category && !rel.includes(x))].slice(0, 4);

  return (<>
    <section className="sec tight">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link><span>/</span>
          <Link to={cat.to}>{cat.label}</Link><span>/</span>
          {p.category === "jackets" && p.gender !== "unisex" && (<>
            <Link to={`/shop?cat=jackets&g=${p.gender}`}>{p.gender === "men" ? "Men" : "Women"}</Link><span>/</span>
          </>)}
          <Link to={`/shop?cat=${p.category}&cut=${p.cut}`}>{CUT_LABELS[p.cut] || p.cut}</Link><span>/</span><span>{p.name}</span>
        </nav>

        <div className="pdp">
          <div className="pdp-m">
            <motion.div key={`${hide}-${mode}`} initial={{ opacity:.4 }} animate={{ opacity:1 }} transition={{ duration:.35 }}>
              <ProductImage product={p} hide={hide} mode={mode} priority />
            </motion.div>
            <div className="thumbs" role="group" aria-label="Views">
              {p.hides.map(h => (
                <button key={h} aria-pressed={mode === "render" && hide === h} aria-label={HIDES[h].n}
                        onClick={() => { setHide(h); setMode("render"); }}>
                  <ProductImage product={p} hide={h} bare />
                </button>
              ))}
              <button aria-pressed={mode === "spec"} aria-label="Spec sheet" onClick={() => setMode("spec")}
                      style={{ display:"grid", placeItems:"center" }}>
                <span className="mono steel">SPEC</span>
              </button>
            </div>
          </div>

          <div>
            <div className="row g8">
              {p.tags.map(t => <span key={t} className={`tag ${t === "new" ? "s" : t === "limited" ? "q" : ""}`}>{t}</span>)}
              {p.was && <span className="tag r">−{Math.round((1 - p.price / p.was) * 100)}%</span>}
            </div>
            <h1 className="d t-xl mt16">{p.name}</h1>
            <p className="lede mt8" style={{ fontSize:"var(--t-md)" }}>{p.sub}</p>
            <p className="mono muted mt16" style={{ display:"inline-flex", alignItems:"center", gap:8 }}>
              <Stars r={p.rating} /> <b className="brass">{p.rating}</b> · {p.reviews} reviews
            </p>
            <p className="price mt24" style={{ fontSize:"1.5rem" }}>
              {p.was && <s>{money(p.was)}</s>}{money(p.price)}
            </p>
            <p className="mt24 lede" style={{ fontSize:"var(--t-sm)" }}>{p.desc}</p>

            <fieldset className="mt32">
              <legend className="mono muted" style={{ marginBottom:11 }}>Hide — <b className="brass">{HIDES[hide].n}</b></legend>
              <div className="hides">
                {p.hides.map(h => (
                  <button key={h} className="hide-sw lg" aria-pressed={hide === h} aria-label={HIDES[h].n}
                          style={{ background:HIDES[h].hex }} onClick={() => { setHide(h); setMode("render"); }} />
                ))}
              </div>
            </fieldset>

            {oneSize ? (
              <p className="mono muted mt32">One size — fits most</p>
            ) : (
              <fieldset className="mt32">
                <legend className="row" style={{ marginBottom:11, justifyContent:"space-between", width:"100%" }}>
                  <span className="mono muted">Size — <b className="brass">{size}</b></span>
                  {p.category === "jackets" && <Link to="/sizing" className="lnk" style={{ border:0, padding:0 }}>Size guide</Link>}
                </legend>
                <div className="sizes">
                  {SZ.map(s => (
                    <button key={s} className="size-b" aria-pressed={size === s} disabled={p.out.includes(s)}
                            onClick={() => setSize(s)}>{s}</button>
                  ))}
                </div>
                {p.category === "jackets" && m.length > 0 &&
                  <p className="mono muted mt16">Chest {m[0]}" · shoulder {m[1]}" · sleeve {m[2]}" · length {m[3]}"</p>}
                {p.category === "shoes" && FIT[size] &&
                  <p className="mono muted mt16">US {size} · EU {FIT[size][0]} · UK {FIT[size][1]}</p>}
              </fieldset>
            )}

            <div className="row g12 mt32">
              <div className="qty">
                <button onClick={() => setQty(q => Math.max(1, q - 1))} aria-label="Decrease quantity">−</button>
                <output>{qty}</output>
                <button onClick={() => setQty(q => Math.min(5, q + 1))} aria-label="Increase quantity">+</button>
              </div>
              <button className="btn" style={{ flex:1, minWidth:190 }}
                      onClick={() => { add(p.id, size, hide, qty); openCart(); }}>
                Add to bag · {money(p.price * qty)}
              </button>
              <button className="ib" aria-pressed={saved} onClick={() => toggleFav(p.id)}
                      aria-label={`${saved ? "Remove" : "Save"} ${p.name}`}
                      style={{ border:"1px solid var(--hide-3)", borderRadius:2, width:48, height:48 }}>
                <Heart filled={saved} width="16" height="16" />
              </button>
            </div>
            <p className="mono muted mt16" style={{ lineHeight:1.8 }}>
              Made in {p.made} · free worldwide shipping · first exchange on us
            </p>

            <div className="mt48">
              <Accordion title="Specification" defaultOpen>
                <table className="spec"><tbody>
                  <tr><th>Hide</th><td>{p.hideType}</td></tr>
                  <tr><th>Substance</th><td>{p.weight}</td></tr>
                  {p.lining && <tr><th>Lining</th><td>{p.lining}</td></tr>}
                  {p.panels && <tr><th>Panels</th><td>{p.panels}</td></tr>}
                  {p.dims && <tr><th>Dimensions</th><td>{p.dims}</td></tr>}
                  {p.metal && <tr><th>Hardware</th><td>{METALS[p.metal].n}</td></tr>}
                  <tr className="hl"><th>Bench time</th><td>{p.made}</td></tr>
                </tbody></table>
              </Accordion>

              {p.category === "jackets" && (
                <Accordion title="Measurements">
                  <div className="tscroll"><table className="spec">
                    <thead><tr><th>Size</th><td>Chest</td><td>Shoulder</td><td>Sleeve</td><td>Length</td></tr></thead>
                    <tbody>{SZ.map(s => (
                      <tr key={s} style={p.out.includes(s) ? { opacity:.4 } : undefined}>
                        <th>{s}</th>{FIT[s].map((v,i) => <td key={i}>{v}"</td>)}
                      </tr>))}</tbody>
                  </table></div>
                  <p className="mono muted mt16">Garment measured flat in inches. Add 1–2" ease over your body chest.</p>
                </Accordion>
              )}
              {p.category === "shoes" && (
                <Accordion title="Size chart">
                  <div className="tscroll"><table className="spec">
                    <thead><tr><th>US</th><td>EU</td><td>UK</td></tr></thead>
                    <tbody>{SZ.map(s => (
                      <tr key={s}><th>{s}</th><td>{FIT[s][0]}</td><td>{FIT[s][1]}</td></tr>
                    ))}</tbody>
                  </table></div>
                  <p className="mono muted mt16">Runs true to US sizing. Between sizes? Take the half size up.</p>
                </Accordion>
              )}

              <Accordion title="Details">
                <ul style={{ display:"grid", gap:10 }}>
                  {p.details.map(d => (
                    <li key={d} className="row g12" style={{ alignItems:"flex-start" }}>
                      <Check style={{ color:"var(--brass)", flex:"none", marginTop:3 }} />
                      <span style={{ fontSize:"var(--t-sm)" }}>{d}</span>
                    </li>))}
                </ul>
              </Accordion>
              <Accordion title="Shipping & exchange">
                <p>Made to order in {p.made}, then 3–5 working days in transit. Shipping is free worldwide and we cover
                both legs of your first exchange — so if the {oneSize ? "fit" : "size"} is wrong, changing it costs you nothing.
                Full refund inside 30 days if a second exchange still is not right.</p>
              </Accordion>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section className="sec top-line">
      <div className="wrap">
        <div className="sec-h"><h2 className="d t-lg">Also in {cat.label.toLowerCase()}</h2>
          <Link to={cat.to} className="lnk">All {cat.label.toLowerCase()} <Arrow /></Link></div>
        <Stagger className="pgrid">{relFinal.map(x => <ProductCard key={x.id} product={x} stagger />)}</Stagger>
      </div>
    </section>
  </>);
}
