import { Link, useLocation, Navigate } from "react-router-dom";
import { motion } from "framer-motion";
import { money } from "../data/products.js";
import { Check } from "../components/Icons.jsx";

export default function OrderConfirmed() {
  const { state } = useLocation();
  if (!state?.ref) return <Navigate to="/" replace />;
  return (
    <section className="sec"><div className="wrap narrow">
      <div className="co-done">
        <motion.div className="co-tick" initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ duration:.55, ease:[.34,1.4,.64,1] }}><Check width="26" height="26" /></motion.div>
        <p className="eyeb" style={{ justifyContent:"center" }}>Order placed</p>
        <h1 className="d t-xl mt16">Your order is<br />on the bench.</h1>
        <p className="lede mt24" style={{ marginInline:"auto" }}>
          We've sent a confirmation to <b className="brass">{state.email}</b>. You'll get a photograph of your
          actual order against its tech pack before it ships.
        </p>
        <div className="panel mt32" style={{ textAlign:"left" }}>
          <table className="spec"><tbody>
            <tr><th>Order reference</th><td className="brass">{state.ref}</td></tr>
            <tr><th>Total paid</th><td>{money(state.total)}</td></tr>
            <tr><th>Delivery</th><td>{state.ship === "exp" ? "Express" : "Standard"}</td></tr>
            <tr className="hl"><th>Estimated dispatch</th><td>18–22 days</td></tr>
          </tbody></table>
        </div>
        <div className="row g12 mt32" style={{ justifyContent:"center" }}>
          <Link to="/shop" className="btn">Keep looking</Link>
          <Link to="/help" className="btn ghost">Track / help</Link>
        </div>
      </div>
    </div></section>
  );
}
