import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import Reveal, { Stagger, item } from "../lib/Reveal.jsx";
import ProductImage from "../components/ProductImage.jsx";
import ProductCard from "../components/ProductCard.jsx";
import SizeTool from "../components/SizeTool.jsx";
import { PRODUCTS, HIDES, byId } from "../data/products.js";
import { CUTS, PROCESS, REVIEWS, JOURNAL } from "../data/content.js";
import { Arrow, Stars } from "../components/Icons.jsx";

const MQ = ["Free worldwide shipping","First exchange on us","Made to order","LWG-certified tanneries",
            "30-day fit guarantee","One maker, one piece","Tech pack in every box"];
const EASE = [.22,1,.36,1];

const CAT_TILES = [
  { to:"/shop?cat=jackets",     img:"/categories/men-jackets-tile.jpg",  label:"Jackets",     sub:"Moto, bomber, blazer & more", cat:"jackets" },
  { to:"/shop?cat=bags",        img:"/categories/bags-tile.jpg",         label:"Bags",        sub:"Tote to weekender",           cat:"bags" },
  { to:"/shop?cat=shoes",       img:"/categories/shoes-tile.jpg",        label:"Shoes",       sub:"Goodyear-welted, resoleable", cat:"shoes" },
  { to:"/shop?cat=accessories", img:"/categories/accessories-tile.jpg",  label:"Accessories", sub:"Wallets, belts, keepsakes",   cat:"accessories" }
];

function MaskLine({ children, delay = 0, className = "" }) {
  const reduce = useReducedMotion();
  if (reduce) return <span style={{ display:"block" }} className={className}>{children}</span>;
  return (
    <span style={{ display:"block", overflow:"hidden" }}>
      <motion.span style={{ display:"block" }} className={className}
        initial={{ y:"106%" }} animate={{ y:0 }}
        transition={{ duration:1, delay, ease:EASE }}>{children}</motion.span>
    </span>
  );
}

export default function Home() {
  const [mode, setMode] = useState("render");
  const hero = byId("kestrel-moto");
  const feat = ["kestrel-moto","vesper-moto","foundry-briefcase","foundry-boots"].map(byId);
  const arrivals = PRODUCTS.filter(p => p.tags.includes("new")).slice(0, 4);

  return (<>
    <section className="hero">
      <div className="wrap">
        <div className="hero-g">
          <div className="hero-t">
            <Reveal y={0}><p className="eyeb">Est. 2016 · made to order</p></Reveal>
            <h1 className="d t-hero mt16">
              <MaskLine>Cut for</MaskLine>
              <MaskLine delay={.1}><span className="out">your</span></MaskLine>
              <MaskLine delay={.2}>shoulders.</MaskLine>
            </h1>
            <Reveal delay={.32}><p className="lede mt24">
              Full-grain leather jackets, bags, shoes and accessories, built one at a time to your measurements.
              Every piece ships with its tech pack — hide, weight, panel count, and the initials of the person who made it.
            </p></Reveal>
            <Reveal delay={.4}><div className="row g12 mt32">
              <Link to="/shop" className="btn">Shop the collection <Arrow className="ar" /></Link>
              <Link to="/sizing" className="btn ghost">Find my size</Link>
            </div></Reveal>
            <Reveal delay={.5}><div className="hstats">
              {[[String(PRODUCTS.length),"Pieces in the catalogue"],["20 days","Average on the bench"],["1","Maker per piece"]].map(([n,l]) => (
                <div className="hstat" key={l}><b>{n}</b><span>{l}</span></div>
              ))}
            </div></Reveal>
          </div>

          <motion.div className="hero-flat"
            initial={{ opacity:0, scale:.95 }} animate={{ opacity:1, scale:1 }}
            transition={{ duration:.9, delay:.18, ease:EASE }}>
            <ProductImage product={hero} hide="jet" bare priority />
            <span className="callout c1" style={{ top:"16%", left:"-2%" }}><span className="dt" /><span className="ln" />1.3 mm full-grain</span>
            <span className="callout c2" style={{ top:"47%", right:"-2%", flexDirection:"row-reverse" }}><span className="dt" /><span className="ln" />Gunmetal YKK Excella</span>
            <span className="callout c3" style={{ bottom:"13%", left:"2%" }}><span className="dt" /><span className="ln" />Roller-buckle waist</span>
          </motion.div>
        </div>
      </div>
    </section>

    <section style={{ borderBlock:"var(--line)", paddingBlock:14 }}>
      <div className="mq" aria-hidden="true">
        {[0,1].map(k => <div className="mq-t" key={k}>{MQ.map(m => <span className="mq-i" key={m}>{m}</span>)}</div>)}
      </div>
    </section>

    <section className="sec">
      <div className="wrap">
        <div className="sec-h">
          <div><Reveal y={0}><p className="eyeb">The full house</p></Reveal>
            <Reveal><h2 className="d t-xl mt16">Shop by category</h2></Reveal></div>
          <Reveal y={0}><Link to="/shop" className="lnk">Everything <Arrow /></Link></Reveal>
        </div>
        <Stagger className="cat-grid">
          {CAT_TILES.map(t => (
            <motion.div key={t.cat} variants={item}>
              <Link to={t.to} className="cat-tile">
                <img src={t.img} alt={`${t.label} — JACTMAK leather goods`} loading="lazy" width="600" height="760" />
                <span className="ct-n">{PRODUCTS.filter(p => p.category === t.cat).length} pieces</span>
                <b>{t.label}</b><span>{t.sub}</span>
                <span className="ct-cta">Shop {t.label.toLowerCase()} <Arrow /></span>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="sec top-line">
      <div className="wrap">
        <div className="sec-h">
          <div><Reveal y={0}><p className="eyeb">The catalogue</p></Reveal>
            <Reveal><h2 className="d t-xl mt16">Six jacket cuts</h2></Reveal></div>
          <Reveal y={0}><Link to="/shop?cat=jackets" className="lnk">All jackets <Arrow /></Link></Reveal>
        </div>
        <Stagger style={{ display:"grid", gap:"clamp(10px,1.4vw,16px)", gridTemplateColumns:"repeat(auto-fit,minmax(160px,1fr))" }}>
          {CUTS.map(([k,t,s,h]) => (
            <motion.div key={k} variants={item}>
              <Link to={`/shop?cat=jackets&cut=${k}`} className="hpanel grain" style={{ "--hd": HIDES[h].hex }}>
                <span className="stitch" /><b>{t}</b><span>{s}</span>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="sec top-line">
      <div className="wrap">
        <div className="sec-h">
          <div><Reveal y={0}><p className="eyeb">Ready to order</p></Reveal>
            <Reveal><h2 className="d t-xl mt16">This season's four</h2></Reveal></div>
          <Reveal y={0}><Link to="/shop" className="lnk">All {PRODUCTS.length} pieces <Arrow /></Link></Reveal>
        </div>
        <Stagger className="pgrid">{feat.map(p => <ProductCard key={p.id} product={p} stagger />)}</Stagger>
      </div>
    </section>

    {arrivals.length > 0 && (
      <section className="sec top-line">
        <div className="wrap">
          <div className="sec-h">
            <div><Reveal y={0}><p className="eyeb">Just cut</p></Reveal>
              <Reveal><h2 className="d t-xl mt16">New on the bench</h2></Reveal></div>
            <Reveal y={0}><Link to="/shop?tag=new" className="lnk">All new arrivals <Arrow /></Link></Reveal>
          </div>
          <Stagger className="pgrid">{arrivals.map(p => <ProductCard key={p.id} product={p} stagger />)}</Stagger>
        </div>
      </section>
    )}

    <section className="sec top-line">
      <div className="wrap">
        <div className="split flip">
          <Reveal><ProductImage product={hero} hide="jet" mode={mode} /></Reveal>
          <div>
            <Reveal y={0}><p className="eyeb">Nothing hidden</p></Reveal>
            <Reveal><h2 className="d t-xl mt16">Every piece ships<br />with its tech pack.</h2></Reveal>
            <Reveal delay={.08}><p className="lede mt24">
              The same drawing our cutters work from goes in the box — panel count, seam layout,
              hardware spec and the exact flat measurements of your size. If a shop cannot show you this, ask why.
            </p></Reveal>
            <Reveal delay={.14}><div className="row g8 mt32" role="group" aria-label="Drawing mode">
              <button className="chip" aria-pressed={mode === "render"} onClick={() => setMode("render")}>Hide render</button>
              <button className="chip" aria-pressed={mode === "spec"}   onClick={() => setMode("spec")}>Spec sheet</button>
            </div></Reveal>
            <Reveal delay={.18}><table className="spec mt32"><tbody>
              <tr><th>Hide</th><td>Full-grain cowhide</td></tr>
              <tr><th>Substance</th><td>1.3 – 1.5 mm</td></tr>
              <tr><th>Panels</th><td>16</td></tr>
              <tr><th>Hardware</th><td>YKK Excella, gunmetal</td></tr>
              <tr className="hl"><th>Bench time</th><td>18 – 22 days</td></tr>
            </tbody></table></Reveal>
          </div>
        </div>
      </div>
    </section>

    <section className="sec top-line">
      <div className="wrap">
        <Reveal y={0}><p className="eyeb">How one gets made</p></Reveal>
        <Reveal><h2 className="d t-xl mt16">Four stages, one bench</h2></Reveal>
        <Stagger className="steps four mt48">
          {PROCESS.map(s => (
            <motion.div className="step" key={s.n} variants={item}>
              <span className="n">{s.n}</span><h3>{s.t}</h3>
              <p className="lede" style={{ fontSize:"var(--t-sm)" }}>{s.d}</p>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="sec top-line">
      <div className="wrap">
        <div className="split">
          <div>
            <Reveal y={0}><p className="eyeb">Sizing</p></Reveal>
            <Reveal><h2 className="d t-xl mt16">The shoulder is the<br />only measurement<br />you can't fix later.</h2></Reveal>
            <Reveal delay={.08}><p className="lede mt24">
              Leather gives across the back and through the sleeve. It does not give in the shoulder. Get that one
              right and a tailor can handle the rest — so we size from the shoulder out, and we cover the first exchange either way.
            </p></Reveal>
            <Reveal delay={.14}><Link to="/sizing" className="btn ghost mt32">Full sizing guide <Arrow className="ar" /></Link></Reveal>
          </div>
          <Reveal><div className="panel"><SizeTool /></div></Reveal>
        </div>
      </div>
    </section>

    <section className="sec top-line">
      <div className="wrap">
        <div className="sec-h"><div>
          <Reveal y={0}><p className="eyeb">4.8 average · 2,576 reviews</p></Reveal>
          <Reveal><h2 className="d t-xl mt16">Worn in</h2></Reveal></div></div>
        <Stagger className="rgrid">
          {REVIEWS.slice(0,3).map(r => (
            <motion.figure className="rev" key={r.n} variants={item}>
              <Stars r={r.r} />
              <p style={{ fontSize:"var(--t-sm)", lineHeight:1.6 }}>“{r.t}”</p>
              <footer>
                <span className="av" style={{ background: HIDES[r.h].hex }}>{r.n[0]}</span>
                <span><b style={{ fontSize:"var(--t-xs)", fontWeight:500 }}>{r.n}</b><br />
                  <span className="mono muted" style={{ fontSize:9 }}>{r.p}</span></span>
              </footer>
            </motion.figure>
          ))}
        </Stagger>
      </div>
    </section>

    <section className="sec tight top-line">
      <div className="wrap">
        <div className="sec-h">
          <div><Reveal y={0}><p className="eyeb">Journal</p></Reveal>
            <Reveal><h2 className="d t-lg mt16">Read before you buy</h2></Reveal></div>
          <Reveal y={0}><Link to="/journal" className="lnk">All entries <Arrow /></Link></Reveal>
        </div>
        <Stagger style={{ display:"grid", gap:"clamp(12px,1.6vw,20px)", gridTemplateColumns:"repeat(auto-fit,minmax(230px,1fr))" }}>
          {JOURNAL.map(j => (
            <motion.div key={j.slug} variants={item}>
              <Link to="/journal" className="panel stack" style={{ gap:12, minHeight:210 }}>
                <span className="mono brass">{j.k} · {j.m}</span>
                <h3 className="d2" style={{ fontSize:"1.16rem", lineHeight:1.05 }}>{j.t}</h3>
                <p className="pcard-s" style={{ marginTop:"auto" }}>{j.d}</p>
              </Link>
            </motion.div>
          ))}
        </Stagger>
      </div>
    </section>
  </>);
}
