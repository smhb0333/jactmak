import { Link } from "react-router-dom";
import { Stagger } from "../lib/Reveal.jsx";
import ProductCard from "../components/ProductCard.jsx";
import { PRODUCTS } from "../data/products.js";
import { useCart } from "../lib/CartContext.jsx";
import { Heart } from "../components/Icons.jsx";

export default function Saved() {
  const { fav } = useCart();
  const items = PRODUCTS.filter(p => fav.has(p.id));
  return (
    <section className="sec"><div className="wrap">
      <nav className="crumbs"><Link to="/">Home</Link><span>/</span><span>Saved</span></nav>
      <h1 className="d t-xl">Saved pieces</h1>
      {items.length ? (<>
        <p className="lede mt16">{items.length} saved. Nothing is reserved — made-to-order runs sell through.</p>
        <Stagger className="pgrid mt48">{items.map(p => <ProductCard key={p.id} product={p} stagger />)}</Stagger>
      </>) : (
        <div className="empty">
          <Heart width="30" height="30" style={{ color:"var(--brass)" }} />
          <h2 className="d t-lg">Nothing saved yet</h2>
          <p className="muted">Tap the heart on anything to keep it here while you compare hides.</p>
          <Link to="/shop" className="btn">Browse the collection</Link>
        </div>
      )}
    </div></section>
  );
}
