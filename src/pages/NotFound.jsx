import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="sec"><div className="wrap"><div className="empty">
      <span className="mono brass">404</span>
      <h1 className="d t-xl">This one sold through</h1>
      <p className="muted">The link may be old, or the run may have ended. Start again from the catalogue.</p>
      <div className="row g12" style={{ justifyContent:"center" }}>
        <Link to="/shop" className="btn">Shop the collection</Link>
        <Link to="/" className="btn ghost">Home</Link>
      </div>
    </div></div></section>
  );
}
