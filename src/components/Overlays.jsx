import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { PRODUCTS, HIDES, byId, money } from "../data/products.js";
import { NAV } from "../data/content.js";
import { useCart } from "../lib/CartContext.jsx";
import ProductImage from "./ProductImage.jsx";
import { X, Search, Bag } from "./Icons.jsx";

/* Shared: lock scroll + Esc + focus trap while an overlay is open */
function useOverlay(open, onClose) {
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return;
    document.body.classList.add("lock");
    const prev = document.activeElement;
    const onKey = (e) => {
      if (e.key === "Escape") { onClose(); return; }
      if (e.key !== "Tab" || !ref.current) return;
      const f = [...ref.current.querySelectorAll('a[href],button:not([disabled]),input,select,textarea')]
                 .filter(el => el.offsetParent !== null);
      if (!f.length) return;
      const first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    };
    document.addEventListener("keydown", onKey);
    const id = setTimeout(() => ref.current?.querySelector("button,a,input")?.focus(), 200);
    return () => {
      document.body.classList.remove("lock");
      document.removeEventListener("keydown", onKey);
      clearTimeout(id); prev?.focus?.();
    };
  }, [open, onClose]);
  return ref;
}

const Backdrop = ({ onClick }) => (
  <motion.div className="ovl" onClick={onClick}
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .3 }} />
);
const EASE = [.22, 1, .36, 1];

/* ── Cart drawer ─────────────────────────────────────── */
export function CartDrawer({ open, onClose }) {
  const { lines, count, subtotal, setQty, remove } = useCart();
  const ref = useOverlay(open, onClose);
  return (
    <AnimatePresence>
      {open && (<>
        <Backdrop onClick={onClose} />
        <motion.aside className="drw" role="dialog" aria-modal="true" aria-label="Bag" ref={ref}
          initial={{ x: "101%" }} animate={{ x: 0 }} exit={{ x: "101%" }}
          transition={{ duration: .5, ease: EASE }}>
          <div className="drw-h">
            <div><h2 className="d2" style={{ fontSize:"1.24rem" }}>Your bag</h2>
              <p className="mono muted mt8">{count} item{count === 1 ? "" : "s"}</p></div>
            <button className="xb" onClick={onClose} aria-label="Close bag"><X /></button>
          </div>
          <div className="drw-b">
            {!lines.length ? (
              <div className="empty" style={{ padding:"44px 0" }}>
                <Bag width="26" height="26" style={{ color:"var(--brass)" }} />
                <h3 className="d2" style={{ fontSize:"1.1rem" }}>Nothing in the bag</h3>
                <p className="muted" style={{ fontSize:"var(--t-xs)" }}>Every piece is made once you order, so nothing is held.</p>
                <Link to="/shop" className="btn ghost sm" onClick={onClose}>Shop the collection</Link>
              </div>
            ) : lines.map((l, i) => {
              const p = byId(l.id);
              return (
                <div className="cl" key={`${l.id}-${l.size}-${l.hide}`}>
                  <Link to={`/product/${p.id}`} onClick={onClose} aria-label={p.name}>
                    <ProductImage product={p} hide={l.hide} bare />
                  </Link>
                  <div className="stack" style={{ gap:7, minWidth:0 }}>
                    <div className="row" style={{ justifyContent:"space-between", gap:10, alignItems:"flex-start" }}>
                      <div style={{ minWidth:0 }}>
                        <Link to={`/product/${p.id}`} onClick={onClose} className="pcard-n"
                              style={{ display:"block", fontSize:"1.06rem" }}>{p.name}</Link>
                        <p className="mono muted mt8">{HIDES[l.hide].n} · Size {l.size}</p>
                      </div>
                      <button className="ib" style={{ width:30, height:30, flex:"none" }}
                              onClick={() => remove(i)} aria-label={`Remove ${p.name}`}><X width="12" height="12" /></button>
                    </div>
                    <div className="row" style={{ justifyContent:"space-between", gap:10, marginTop:"auto" }}>
                      <div className="qty" style={{ transform:"scale(.86)", transformOrigin:"left" }}>
                        <button onClick={() => setQty(i, l.qty - 1)} aria-label="Decrease quantity">−</button>
                        <output>{l.qty}</output>
                        <button onClick={() => setQty(i, l.qty + 1)} aria-label="Increase quantity">+</button>
                      </div>
                      <span className="price">{money(p.price * l.qty)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          {lines.length > 0 && (
            <div className="drw-f">
              <div className="row" style={{ justifyContent:"space-between", marginBottom:12 }}>
                <span className="mono muted">Subtotal</span>
                <span className="price" style={{ fontSize:"1.1rem" }}>{money(subtotal)}</span>
              </div>
              <p className="mono muted" style={{ marginBottom:14 }}>Free worldwide shipping · made in 18–22 days</p>
              <Link to="/checkout" className="btn block" onClick={onClose}>Checkout</Link>
              <Link to="/cart" className="btn ghost block mt8" onClick={onClose}>View bag</Link>
            </div>
          )}
        </motion.aside>
      </>)}
    </AnimatePresence>
  );
}

/* ── Mobile menu ─────────────────────────────────────── */
export function MenuDrawer({ open, onClose }) {
  const ref = useOverlay(open, onClose);
  return (
    <AnimatePresence>
      {open && (<>
        <Backdrop onClick={onClose} />
        <motion.aside className="drw left" role="dialog" aria-modal="true" aria-label="Menu" ref={ref}
          initial={{ x: "-101%" }} animate={{ x: 0 }} exit={{ x: "-101%" }}
          transition={{ duration: .5, ease: EASE }}>
          <div className="drw-h">
            <span className="brand"><span className="st" />JACTMAK</span>
            <button className="xb" onClick={onClose} aria-label="Close menu"><X /></button>
          </div>
          <div className="drw-b">
            <nav className="mnav" aria-label="Mobile">
              {NAV.map(n => (
                <Link key={n.label} to={n.to} onClick={onClose}>
                  {n.label}{n.cols && <span className="mono muted">{n.cols.reduce((a,c) => a + c.links.length, 0)} items</span>}
                </Link>
              ))}
              <Link to="/saved" onClick={onClose}>Saved</Link>
              <Link to="/help" onClick={onClose}>Help</Link>
              <Link to="/contact" onClick={onClose}>Contact</Link>
            </nav>
            <div className="mt32" style={{ display:"grid", gap:8 }}>
              <Link to="/sizing" className="btn block" onClick={onClose}>Find my size</Link>
              <Link to="/shop" className="btn ghost block" onClick={onClose}>Shop everything</Link>
            </div>
          </div>
        </motion.aside>
      </>)}
    </AnimatePresence>
  );
}

/* ── Search sheet ────────────────────────────────────── */
export function SearchSheet({ open, onClose }) {
  const [term, setTerm] = useState("");
  const ref = useOverlay(open, onClose);
  useEffect(() => { if (!open) setTerm(""); }, [open]);

  const t = term.trim().toLowerCase();
  const list = t
    ? PRODUCTS.filter(p => `${p.name} ${p.sub} ${p.cut} ${p.desc} ${p.hides.map(h => HIDES[h].n).join(" ")}`
        .toLowerCase().includes(t)).slice(0, 6)
    : PRODUCTS.filter(p => p.tags.includes("bestseller")).slice(0, 3);

  return (
    <AnimatePresence>
      {open && (<>
        <Backdrop onClick={onClose} />
        <motion.div className="srch" role="dialog" aria-modal="true" aria-label="Search" ref={ref}
          initial={{ y: "-101%" }} animate={{ y: 0 }} exit={{ y: "-101%" }}
          transition={{ duration: .45, ease: EASE }}>
          <div className="wrap"><div style={{ paddingBlock:"24px 30px" }}>
            <div className="sfld">
              <Search width="20" height="20" style={{ flex:"none", color:"var(--parch-m)" }} />
              <input autoFocus value={term} onChange={e => setTerm(e.target.value)} type="search"
                     placeholder="Moto, tote, oxford…" aria-label="Search JACTMAK" />
              <button className="xb" onClick={onClose} aria-label="Close search"><X /></button>
            </div>
            <div style={{ marginTop:24 }}>
              {t && !list.length ? (
                <div className="empty" style={{ padding:"32px 0" }}>
                  <h3 className="d2" style={{ fontSize:"1.1rem" }}>Nothing matches “{term}”</h3>
                  <p className="muted" style={{ fontSize:"var(--t-xs)" }}>Try a cut — moto, racer, bomber — or a hide like cognac.</p>
                </div>
              ) : (<>
                <p className="mono muted" style={{ marginBottom:10 }}>
                  {t ? `${list.length} result${list.length === 1 ? "" : "s"}` : "Popular"}
                </p>
                {list.map(p => (
                  <Link key={p.id} to={`/product/${p.id}`} className="sres" onClick={onClose}>
                    <ProductImage product={p} hide={p.hides[0]} bare />
                    <span><b className="pcard-n" style={{ display:"block", fontSize:"1rem" }}>{p.name}</b>
                      <span className="pcard-s">{p.sub}</span></span>
                    <span className="price">{money(p.price)}</span>
                  </Link>
                ))}
              </>)}
            </div>
          </div></div>
        </motion.div>
      </>)}
    </AnimatePresence>
  );
}

/* ── Toasts ──────────────────────────────────────────── */
export function Toasts() {
  const { toasts } = useCart();
  return (
    <div className="toasts" role="status" aria-live="polite">
      <AnimatePresence>
        {toasts.map(t => (
          <motion.div key={t.id} className="toast"
            initial={{ opacity: 0, y: 16, scale: .95 }} animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }} transition={{ duration: .35, ease: EASE }}>{t.msg}</motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
