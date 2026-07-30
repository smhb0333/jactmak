import { Link } from "react-router-dom";
import { useCart } from "../lib/CartContext.jsx";
import { byId, HIDES, money } from "../data/products.js";
import ProductImage from "../components/ProductImage.jsx";
import { Bag, X, Arrow } from "../components/Icons.jsx";

export default function Cart() {
  const { lines, subtotal, setQty, remove } = useCart();

  if (!lines.length) return (
    <section className="sec"><div className="wrap"><div className="empty">
      <Bag width="30" height="30" style={{ color:"var(--brass)" }} />
      <h1 className="d t-lg">Your bag is empty</h1>
      <p className="muted">Start with a cut, or find your block first — it saves an exchange.</p>
      <div className="row g12" style={{ justifyContent:"center" }}>
        <Link to="/shop" className="btn">Shop the collection</Link>
        <Link to="/sizing" className="btn ghost">Find my size</Link>
      </div>
    </div></div></section>
  );

  return (
    <section className="sec"><div className="wrap">
      <nav className="crumbs"><Link to="/">Home</Link><span>/</span><span>Bag</span></nav>
      <h1 className="d t-xl">Your bag</h1>
      <div className="split mt48" style={{ gridTemplateColumns:"" }}>
        <div>
          {lines.map((l, i) => {
            const p = byId(l.id);
            return (
              <div className="cl" key={`${l.id}-${l.size}-${l.hide}`}>
                <Link to={`/product/${p.id}`} aria-label={p.name}><ProductImage product={p} hide={l.hide} bare /></Link>
                <div className="stack" style={{ gap:7, minWidth:0 }}>
                  <div className="row" style={{ justifyContent:"space-between", gap:10, alignItems:"flex-start" }}>
                    <div style={{ minWidth:0 }}>
                      <Link to={`/product/${p.id}`} className="pcard-n" style={{ display:"block", fontSize:"1.06rem" }}>{p.name}</Link>
                      <p className="mono muted mt8">{HIDES[l.hide].n} · Size {l.size}</p>
                    </div>
                    <button className="ib" style={{ width:30, height:30, flex:"none" }} onClick={() => remove(i)}
                            aria-label={`Remove ${p.name}`}><X width="12" height="12" /></button>
                  </div>
                  <div className="row" style={{ justifyContent:"space-between", gap:10, marginTop:"auto" }}>
                    <div className="qty" style={{ transform:"scale(.88)", transformOrigin:"left" }}>
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
        <aside className="panel" style={{ position:"sticky", top:"calc(var(--hdr) + 18px)" }}>
          <h2 className="d2" style={{ fontSize:"1.16rem" }}>Summary</h2>
          <table className="spec mt24"><tbody>
            <tr><th>Subtotal</th><td>{money(subtotal)}</td></tr>
            <tr><th>Shipping</th><td>Free</td></tr>
            <tr><th>Made to order</th><td>18–22 days</td></tr>
            <tr className="hl"><th style={{ color:"var(--parch)" }}>Total</th><td>{money(subtotal)}</td></tr>
          </tbody></table>
          <Link to="/checkout" className="btn block mt24">Checkout <Arrow className="ar" /></Link>
          <Link to="/shop" className="btn ghost block mt8">Keep looking</Link>
          <p className="mono muted mt16" style={{ textAlign:"center", lineHeight:1.8 }}>
            Free worldwide shipping<br />First exchange on us
          </p>
        </aside>
      </div>
    </div></section>
  );
}
