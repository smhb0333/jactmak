import { useMemo, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Stagger } from "../lib/Reveal.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS, HIDES, CATS, CATEGORIES, CUT_LABELS, CUTS_BY_CAT } from "../data/products.js";

export default function Shop() {
  const [sp, setSp] = useSearchParams();
  const F = { cat:sp.get("cat")||"", g:sp.get("g")||"", cut:sp.get("cut")||"", hide:sp.get("hide")||"",
              tag:sp.get("tag")||"", sort:sp.get("sort")||"feat", q:(sp.get("q")||"").toLowerCase() };

  const setF = (k, v) => {
    const n = new URLSearchParams(sp);
    v ? n.set(k, v) : n.delete(k);
    if (k === "cat") n.delete("cut");
    setSp(n, { replace:true });
  };

  const cutOptions = (F.cat ? CUTS_BY_CAT[F.cat] : Object.keys(CUT_LABELS)).map(k => [k, CUT_LABELS[k]]);

  const GROUPS = [
    { k:"g",    l:"Fit",  o:[["men","Men's"],["women","Women's"]] },
    { k:"cut",  l:"Style", o:cutOptions },
    { k:"hide", l:"Hide", o:Object.keys(HIDES).map(k => [k, HIDES[k].n]) },
    { k:"tag",  l:"More", o:[["bestseller","Best sellers"],["new","New"],["limited","Limited"],["sale","On sale"]] }
  ];

  const list = useMemo(() => {
    let out = PRODUCTS.filter(p =>
      (!F.cat || p.category === F.cat) &&
      (!F.g || p.gender === F.g) && (!F.cut || p.cut === F.cut) &&
      (!F.hide || p.hides.includes(F.hide)) &&
      (!F.tag || (F.tag === "sale" ? !!p.was : p.tags.includes(F.tag))) &&
      (!F.q || `${p.name} ${p.sub} ${p.desc} ${p.cut} ${p.tags.join(" ")}`.toLowerCase().includes(F.q))
    );
    const s = F.sort;
    if (s === "low")  out = [...out].sort((a,b) => a.price - b.price);
    if (s === "high") out = [...out].sort((a,b) => b.price - a.price);
    if (s === "rate") out = [...out].sort((a,b) => b.rating - a.rating);
    if (s === "new")  out = [...out].sort((a,b) => (b.tags.includes("new")?1:0) - (a.tags.includes("new")?1:0));
    return out;
  }, [F.cat, F.g, F.cut, F.hide, F.tag, F.sort, F.q]);

  const catLabel = F.cat ? CATEGORIES[F.cat]?.label : "Everything";
  const title = F.q ? `“${sp.get("q")}”`
    : F.g === "men" ? `Men's ${(F.cat ? CATEGORIES[F.cat].label : "jackets").toLowerCase()}`
    : F.g === "women" ? `Women's ${(F.cat ? CATEGORIES[F.cat].label : "jackets").toLowerCase()}`
    : F.cut ? `${CUT_LABELS[F.cut] || F.cut}` : catLabel;
  const active = ["cat","g","cut","hide","tag","q"].some(k => sp.get(k));
  const NOUNS = { shoes:["pair","pairs"], accessories:["piece","pieces"], bags:["bag","bags"], jackets:["jacket","jackets"] };
  const [nounS, nounP] = NOUNS[F.cat] || ["piece","pieces"];

  useEffect(() => {
    document.title = `JACTMAK — ${title === catLabel ? "Shop" : title}${F.cat ? " · " + catLabel : ""}`;
    const desc = document.querySelector('meta[name="description"]');
    if (desc) desc.setAttribute("content",
      `Shop ${catLabel.toLowerCase()} at JACTMAK — full-grain and lambskin leather, made to order. ${list.length} pieces in stock, free worldwide shipping.`);
  }, [title, catLabel, list.length, F.cat]);

  return (
    <section className="sec tight">
      <div className="wrap">
        <nav className="crumbs" aria-label="Breadcrumb"><Link to="/">Home</Link><span>/</span><span>Shop</span></nav>
        <h1 className="d t-xl" style={{ textTransform:"uppercase" }}>{title}</h1>
        <p className="lede mt16">Full-grain and lambskin leather, cut and stitched to order. Every piece shows its hide, substance and hardware before you buy.</p>

        <div className="row g8 mt32" role="group" aria-label="Category" style={{ marginBottom:20 }}>
          <button className="chip" aria-pressed={!F.cat} onClick={() => setF("cat", "")}>All</button>
          {CATS.map(([v,l]) => (
            <button key={v} className="chip" aria-pressed={F.cat === v} onClick={() => setF("cat", F.cat === v ? "" : v)}>{l}</button>
          ))}
        </div>

        <div>
          {GROUPS.map(g => (
            <div className="row g8" key={g.k} style={{ marginBottom:9, alignItems:"flex-start" }}>
              <span className="mono muted" style={{ minWidth:44, paddingTop:10 }}>{g.l}</span>
              <span className="row g8">
                {g.o.map(([v,l]) => (
                  <button key={v} className="chip" aria-pressed={F[g.k] === v}
                          onClick={() => setF(g.k, F[g.k] === v ? "" : v)}>
                    {g.k === "hide" && <span style={{ width:11, height:11, borderRadius:"50%", background:HIDES[v].hex, border:"1px solid rgba(237,229,216,.3)" }} />}
                    {l}
                  </button>
                ))}
              </span>
            </div>
          ))}
          {active && <button className="lnk mt8" onClick={() => setSp(new URLSearchParams(), { replace:true })}>Clear filters</button>}
        </div>

        <div className="row g16 mt24" style={{ justifyContent:"space-between", borderTop:"var(--line)", paddingTop:18 }}>
          <p className="mono muted">{list.length} {list.length === 1 ? nounS : nounP}</p>
          <label className="row g8"><span className="mono muted">Sort</span>
            <select className="inp" value={F.sort} onChange={e => setF("sort", e.target.value)}
                    style={{ width:"auto", padding:"9px 34px 9px 12px", fontSize:"var(--t-xs)" }}>
              <option value="feat">Featured</option><option value="new">Newest</option>
              <option value="low">Price low → high</option><option value="high">Price high → low</option>
              <option value="rate">Best rated</option>
            </select></label>
        </div>

        {list.length ? (
          <Stagger className="pgrid mt32" key={`${F.cat}${F.g}${F.cut}${F.hide}${F.tag}${F.sort}`}>
            {list.map(p => <ProductCard key={p.id} product={p} stagger />)}
          </Stagger>
        ) : (
          <div className="empty">
            <h2 className="d t-lg">Nothing matches that</h2>
            <p className="muted">Try loosening one filter — hide colours in particular are limited per piece.</p>
            <button className="btn ghost sm" onClick={() => setSp(new URLSearchParams(), { replace:true })}>Show everything</button>
          </div>
        )}
      </div>
    </section>
  );
}
