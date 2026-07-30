import { useState, useEffect, useRef } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { NAV, TICKER } from "../data/content.js";
import { HIDES, byId } from "../data/products.js";
import { useCart } from "../lib/CartContext.jsx";
import ProductImage from "./ProductImage.jsx";
import { Search, Heart, Bag, Menu } from "./Icons.jsx";

export default function Header({ onSearch, onCart, onMenu }) {
  const { count, fav } = useCart();
  const [tick, setTick] = useState(0);
  const [mega, setMega] = useState(null);
  const t = useRef();
  const loc = useLocation();

  useEffect(() => {
    const id = setInterval(() => setTick(i => (i + 1) % TICKER.length), 4400);
    return () => clearInterval(id);
  }, []);
  useEffect(() => { setMega(null); }, [loc.pathname, loc.search]);

  const open = (i) => { clearTimeout(t.current); setMega(i); };
  const close = () => { t.current = setTimeout(() => setMega(null), 150); };

  return (
    <>
      <div className="ticker" aria-live="off">
        <AnimatePresence mode="wait">
          <motion.p key={tick} className="tk"
            initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
            transition={{ duration: .45, ease: [.22,1,.36,1] }}
            dangerouslySetInnerHTML={{ __html: TICKER[tick].replace(/·/g, "·") }} />
        </AnimatePresence>
      </div>

      <header className="hdr" onMouseLeave={close}>
        <div className="wrap">
          <div className="hdr-in">
            <Link className="brand" to="/" aria-label="JACTMAK home"><span className="st" />JACTMAK</Link>

            <nav className="nav" aria-label="Primary">
              {NAV.map((n, i) => n.cols ? (
                <button key={n.label} className={`nb ${mega === i ? "on" : ""}`}
                        aria-expanded={mega === i} aria-controls="mega-panel"
                        onMouseEnter={() => open(i)} onFocus={() => open(i)}
                        onClick={() => setMega(m => (m === i ? null : i))}>{n.label}</button>
              ) : (
                <NavLink key={n.label} to={n.to} className={({isActive}) => `nb ${isActive ? "on" : ""}`}
                         onMouseEnter={() => open(null)}>{n.label}</NavLink>
              ))}
            </nav>

            <div className="acts">
              <button className="ib" onClick={onSearch} aria-label="Search"><Search /></button>
              <Link className="ib fav-link" to="/saved" aria-label="Saved pieces">
                <Heart />{fav.size > 0 && <span className="pip">{fav.size}</span>}
              </Link>
              <button className="ib" onClick={onCart} aria-label={`Open bag, ${count} items`}>
                <Bag />{count > 0 && <span className="pip">{count}</span>}
              </button>
              <button className="ib mob-only" onClick={onMenu} aria-label="Open menu"><Menu /></button>
            </div>
          </div>
        </div>

        <AnimatePresence>
          {mega !== null && NAV[mega]?.cols && (
            <motion.div id="mega-panel" className="mega" key={mega}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: .3, ease: [.22,1,.36,1] }}
              onMouseEnter={() => clearTimeout(t.current)} onMouseLeave={close}>
              <div className="wrap"><div className="mega-in">
                {NAV[mega].cols.map(c => (
                  <div key={c.h}><h3>{c.h}</h3>
                    {c.links.map(([l, to]) => <Link key={l} to={to}>{l}</Link>)}
                  </div>
                ))}
                <Link to={NAV[mega].feat.to} className="mega-f"
                      style={{ background:`radial-gradient(70% 55% at 50% 20%, ${HIDES[NAV[mega].feat.hide].hex}55, transparent 70%), #221D1A` }}>
                  <div style={{ position:"absolute", inset:0, display:"grid", placeItems:"center", opacity:.85 }}>
                    <ProductImage product={byId(NAV[mega].feat.id)} hide={NAV[mega].feat.hide} bare />
                  </div>
                  <div style={{ position:"relative", zIndex:3 }}>
                    <b className="d2" style={{ fontSize:"1.16rem", display:"block" }}>{NAV[mega].feat.t}</b>
                    <span className="mono muted" style={{ display:"block", marginTop:5 }}>{NAV[mega].feat.d}</span>
                    <span className="lnk" style={{ marginTop:12, display:"inline-flex" }}>{NAV[mega].feat.c}</span>
                  </div>
                </Link>
              </div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  );
}
