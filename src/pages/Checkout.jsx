import { useState, useMemo } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "../lib/CartContext.jsx";
import { byId, HIDES, money } from "../data/products.js";
import { SHIPPING } from "../data/content.js";
import ProductImage from "../components/ProductImage.jsx";
import { Lock, Check, Chevron, Truck, Bag, Arrow } from "../components/Icons.jsx";

const STEPS = ["Details", "Delivery", "Payment"];
const EASE = [.22, 1, .36, 1];

const emailOk = v => /^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(v.trim());
const digits  = v => v.replace(/\D/g, "");


/* Hoisted so React keeps the same element type between renders —
   defining this inside Checkout() remounts the input on every
   keystroke and the field loses focus after each character.      */
function Field({ f, err, set, k, label, type = "text", ph, mode, auto, wide }) {
  const bad = err[k];
  return (
    <div className="field" style={wide ? { gridColumn: "1/-1" } : undefined}>
      <label htmlFor={`fld-${k}`}><span>{label}</span></label>
      <input id={`fld-${k}`} className="inp" type={type} value={f[k]} onChange={set(k)}
             placeholder={ph} inputMode={mode} autoComplete={auto}
             aria-invalid={!!bad} aria-describedby={bad ? `${k}-err` : undefined} />
      {bad && <span className="err" id={`${k}-err`} role="alert">{bad}</span>}
    </div>
  );
}

export default function Checkout() {
  const { lines, subtotal, clear } = useCart();
  const nav = useNavigate();
  const [step, setStep]   = useState(0);
  const [openSum, setSum] = useState(false);
  const [ship, setShip]   = useState("std");
  const [pay, setPay]     = useState("card");
  const [err, setErr]     = useState({});
  const [f, setF] = useState({
    email:"", first:"", last:"", address:"", address2:"", city:"", postcode:"", country:"United States",
    phone:"", card:"", exp:"", cvc:"", name:""
  });

  const set = (k) => (e) => {
    let v = e.target.value;
    if (k === "card") v = digits(v).slice(0,16).replace(/(.{4})/g,"$1 ").trim();
    if (k === "exp")  { const d = digits(v).slice(0,4); v = d.length > 2 ? `${d.slice(0,2)}/${d.slice(2)}` : d; }
    if (k === "cvc")  v = digits(v).slice(0,4);
    setF(s => ({ ...s, [k]: v }));
    setErr(s => ({ ...s, [k]: undefined }));
  };

  const shipCost = SHIPPING.find(s => s.id === ship)?.price ?? 0;
  const tax   = useMemo(() => Math.round(subtotal * 0.08 * 100) / 100, [subtotal]);
  const total = subtotal + shipCost + tax;

  if (!lines.length) {
    return (
      <div className="co-shell">
        <CheckoutHeader />
        <div className="wrap"><div className="empty">
          <Bag width="30" height="30" style={{ color:"var(--brass)" }} />
          <h1 className="d t-lg">Your bag is empty</h1>
          <p className="muted">Nothing to check out yet. Every piece is made once you order.</p>
          <Link to="/shop" className="btn">Shop the collection</Link>
        </div></div>
      </div>
    );
  }

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!emailOk(f.email))      e.email = "Enter a valid email — your order updates go here.";
      if (!f.first.trim())        e.first = "Required";
      if (!f.last.trim())         e.last = "Required";
      if (!f.address.trim())      e.address = "Required";
      if (!f.city.trim())         e.city = "Required";
      if (!f.postcode.trim())     e.postcode = "Required";
    }
    if (step === 2 && pay === "card") {
      if (digits(f.card).length !== 16) e.card = "Card number must be 16 digits.";
      if (!/^\d{2}\/\d{2}$/.test(f.exp)) e.exp = "MM/YY";
      if (digits(f.cvc).length < 3)      e.cvc = "3–4 digits";
      if (!f.name.trim())                e.name = "Required";
    }
    setErr(e);
    return !Object.keys(e).length;
  };

  const next = () => {
    if (!validate()) {
      const first = document.querySelector('[aria-invalid="true"]');
      first?.focus(); first?.scrollIntoView({ block:"center", behavior:"smooth" });
      return;
    }
    if (step < 2) { setStep(s => s + 1); window.scrollTo({ top:0, behavior:"smooth" }); }
    else {
      /* Vowel-free, unambiguous alphabet: no accidental words, no 0/O or 1/I mix-ups */
      const AB = "23456789BCDFGHJKLMNPQRSTVWXYZ";
      const ref = "JM-" + Array.from({ length: 6 }, () => AB[Math.floor(Math.random() * AB.length)]).join("");
      clear();
      nav("/order-confirmed", { state: { ref, total, email: f.email, ship } });
    }
  };


  const Summary = () => (
    <div className="co-aside-inner">
      <div style={{ display:"grid", gap:2 }}>
        {lines.map(l => {
          const p = byId(l.id);
          return (
            <div className="co-line" key={`${l.id}-${l.size}-${l.hide}`}>
              <ProductImage product={p} hide={l.hide} bare />
              <div style={{ minWidth:0 }}>
                <p className="nm">{p.name}</p>
                <p className="mt">{HIDES[l.hide].n} · {l.size} · ×{l.qty}</p>
              </div>
              <span className="price">{money(p.price * l.qty)}</span>
            </div>
          );
        })}
      </div>
      <table className="spec mt24"><tbody>
        <tr><th>Subtotal</th><td>{money(subtotal)}</td></tr>
        <tr><th>Delivery</th><td>{shipCost ? money(shipCost) : "Free"}</td></tr>
        <tr><th>Estimated tax</th><td>{money(tax)}</td></tr>
        <tr className="hl"><th style={{ color:"var(--parch)" }}>Total</th><td>{money(total)}</td></tr>
      </tbody></table>
      <ul className="co-trust">
        <li><Check /><span>Free worldwide shipping, and we cover your first exchange both ways.</span></li>
        <li><Check /><span>30-day fit guarantee — full refund if a second size still isn't right.</span></li>
        <li><Check /><span>Made to order in 18–22 days. You'll get a photo before it ships.</span></li>
      </ul>
    </div>
  );

  return (
    <div className="co-shell">
      <CheckoutHeader />

      <div className="wrap narrow">
        <nav className="co-steps" aria-label="Checkout progress">
          {STEPS.map((s, i) => (
            <div key={s} style={{ display:"contents" }}>
              <button className={`co-step ${i < step ? "done" : ""} ${i === step ? "now" : ""}`}
                      onClick={() => i < step && setStep(i)} disabled={i >= step}
                      aria-current={i === step ? "step" : undefined}>
                <span className="dot">{i < step ? <Check width="11" height="11" /> : i + 1}</span>{s}
              </button>
              {i < STEPS.length - 1 && <span className="bar" aria-hidden="true" />}
            </div>
          ))}
        </nav>

        {/* Phone: collapsible summary pinned at the top */}
        <button className="co-sum-toggle" aria-expanded={openSum} aria-controls="co-sum"
                onClick={() => setSum(o => !o)}>
          <span className="lbl"><Bag width="15" height="15" />
            {openSum ? "Hide" : "Show"} order summary <Chevron className="cv" /></span>
          <span className="price" style={{ fontSize:"1.05rem" }}>{money(total)}</span>
        </button>
        <AnimatePresence initial={false}>
          {openSum && (
            <motion.div id="co-sum" key="sum" style={{ overflow:"hidden" }}
              initial={{ height:0, opacity:0 }} animate={{ height:"auto", opacity:1 }}
              exit={{ height:0, opacity:0 }} transition={{ duration:.35, ease:EASE }}>
              <div className="mob-sum"><Summary /></div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="co-body">
        <div className="wrap narrow">
          <div className="co-grid">
            <div>
              <AnimatePresence mode="wait">
                <motion.div key={step}
                  initial={{ opacity:0, x:14 }} animate={{ opacity:1, x:0 }} exit={{ opacity:0, x:-14 }}
                  transition={{ duration:.32, ease:EASE }}>

                  {step === 0 && (<>
                    <div className="co-block">
                      <h2 className="co-h"><span className="ix">1</span>Contact</h2>
                      <div className="fgrid">
                        <Field f={f} err={err} set={set} k="email" label="Email" type="email" ph="you@example.com" mode="email" auto="email" wide />
                        <Field f={f} err={err} set={set} k="phone" label="Phone (for delivery only)" type="tel" ph="+1 555 000 0000" mode="tel" auto="tel" wide />
                      </div>
                    </div>
                    <div className="co-block">
                      <h2 className="co-h"><span className="ix">2</span>Shipping address</h2>
                      <div className="fgrid two">
                        <Field f={f} err={err} set={set} k="first" label="First name" auto="given-name" />
                        <Field f={f} err={err} set={set} k="last"  label="Last name"  auto="family-name" />
                        <Field f={f} err={err} set={set} k="address"  label="Address" auto="address-line1" wide />
                        <Field f={f} err={err} set={set} k="address2" label="Apartment, suite (optional)" auto="address-line2" wide />
                        <Field f={f} err={err} set={set} k="city" label="City" auto="address-level2" />
                        <Field f={f} err={err} set={set} k="postcode" label="Postcode / ZIP" auto="postal-code" mode="numeric" />
                        <label className="field" style={{ gridColumn:"1/-1" }}>
                          <span>Country</span>
                          <select className="inp" value={f.country} onChange={set("country")} autoComplete="country-name">
                            {["United States","United Kingdom","Canada","Germany","France","Australia","Pakistan","United Arab Emirates"]
                              .map(c => <option key={c}>{c}</option>)}
                          </select>
                        </label>
                      </div>
                    </div>
                  </>)}

                  {step === 1 && (
                    <div className="co-block">
                      <h2 className="co-h"><span className="ix">3</span>Delivery</h2>
                      <p className="lede" style={{ fontSize:"var(--t-sm)", marginBottom:18 }}>
                        Your order is cut and made after checkout. Delivery time is on top of the bench time above.
                      </p>
                      <div className="pay-opts">
                        {SHIPPING.map(s => (
                          <button key={s.id} className="ship-opt" aria-pressed={ship === s.id} onClick={() => setShip(s.id)}>
                            <span style={{ display:"flex", gap:12, alignItems:"center" }}>
                              <Truck style={{ color:"var(--brass)", flex:"none" }} />
                              <span><span className="ttl">{s.label}</span><span className="sub">{s.note}</span></span>
                            </span>
                            <span className="p">{s.price ? money(s.price) : "Free"}</span>
                          </button>
                        ))}
                      </div>
                      <div className="panel mt32">
                        <p className="mono brass">Delivering to</p>
                        <p className="mt8" style={{ fontSize:"var(--t-sm)" }}>
                          {f.first} {f.last}<br />{f.address}{f.address2 && <>, {f.address2}</>}<br />
                          {f.city}, {f.postcode}<br />{f.country}
                        </p>
                        <button className="lnk mt16" onClick={() => setStep(0)}>Edit address</button>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="co-block">
                      <h2 className="co-h"><span className="ix">4</span>Payment</h2>
                      <div className="pay-opts">
                        {[["card","Card","Visa · Mastercard · Amex"],
                          ["paypal","PayPal","Redirects to PayPal"],
                          ["cod","Cash on delivery","Selected regions only"]].map(([id, t, s]) => (
                          <button key={id} className="pay-opt" aria-pressed={pay === id} onClick={() => setPay(id)}>
                            <span className="radio" aria-hidden="true" />
                            <span><span className="ttl">{t}</span><span className="sub">{s}</span></span>
                          </button>
                        ))}
                      </div>
                      {pay === "card" && (
                        <div className="fgrid two mt24">
                          <Field f={f} err={err} set={set} k="name" label="Name on card" auto="cc-name" wide />
                          <Field f={f} err={err} set={set} k="card" label="Card number" ph="4242 4242 4242 4242" mode="numeric" auto="cc-number" wide />
                          <Field f={f} err={err} set={set} k="exp"  label="Expiry" ph="MM/YY" mode="numeric" auto="cc-exp" />
                          <Field f={f} err={err} set={set} k="cvc"  label="CVC" ph="123" mode="numeric" auto="cc-csc" />
                        </div>
                      )}
                      <p className="mono muted mt24" style={{ display:"flex", gap:8, alignItems:"center" }}>
                        <Lock /> Demo build — no payment is processed and no card data is stored.
                      </p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Desktop actions */}
              <div className="row g12 mt32" style={{ justifyContent:"space-between" }}>
                {step > 0
                  ? <button className="lnk" onClick={() => { setStep(s => s - 1); window.scrollTo({top:0,behavior:"smooth"}); }}>← Back</button>
                  : <Link to="/cart" className="lnk">← Back to bag</Link>}
                <button className="btn desk-next" onClick={next}>
                  {step < 2 ? "Continue" : `Pay ${money(total)}`} <Arrow className="ar" />
                </button>
              </div>
            </div>

            <aside className="co-aside desk-sum"><Summary /></aside>
          </div>
        </div>
      </div>

      {/* Phone: sticky pay bar */}
      <div className="co-bar">
        <div className="co-bar-row">
          <span className="mono muted">{STEPS[step]} · step {step + 1} of 3</span>
          <span className="tot">{money(total)}</span>
        </div>
        <button className="btn block" onClick={next}>
          {step < 2 ? "Continue" : `Pay ${money(total)}`}
        </button>
      </div>
    </div>
  );
}

function CheckoutHeader() {
  return (
    <header className="co-hdr">
      <div className="wrap narrow">
        <div className="co-hdr-in">
          <Link className="brand" to="/" aria-label="JACTMAK home"><span className="st" />JACTMAK</Link>
          <span className="co-secure"><Lock /> Secure checkout</span>
        </div>
      </div>
    </header>
  );
}
