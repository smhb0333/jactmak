import { Link } from "react-router-dom";

const COLS = [
  { h:"Men", l:[["Moto","/shop?cat=jackets&g=men&cut=moto"],["Bomber","/shop?cat=jackets&g=men&cut=bomber"],["Aviator","/shop?cat=jackets&g=men&cut=aviator"],["Overcoat","/shop?cat=jackets&g=men&cut=coat"],["All men's","/shop?cat=jackets&g=men"]] },
  { h:"Women", l:[["Moto","/shop?cat=jackets&g=women&cut=moto"],["Blazer","/shop?cat=jackets&g=women&cut=blazer"],["Trench coat","/shop?cat=jackets&g=women&cut=trench"],["All women's","/shop?cat=jackets&g=women"]] },
  { h:"Shop", l:[["Bags","/shop?cat=bags"],["Shoes","/shop?cat=shoes"],["Accessories","/shop?cat=accessories"],["Best sellers","/shop?tag=bestseller"]] },
  { h:"Studio", l:[["The workshop","/workshop"],["Sizing guide","/sizing"],["Journal","/journal"],["Help centre","/help"],["Contact","/contact"]] }
];
const SOC = [
  ["Instagram","M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm5 5.5A4.5 4.5 0 1 0 16.5 12 4.5 4.5 0 0 0 12 7.5Z"],
  ["Pinterest","M12 2a10 10 0 0 0-3.6 19.3c-.1-.8-.2-2 0-2.9l1.3-5.5s-.3-.7-.3-1.7c0-1.6.9-2.8 2-2.8 1 0 1.4.7 1.4 1.6 0 1-.6 2.4-1 3.8-.3 1.1.6 2 1.7 2 2 0 3.4-2.6 3.4-5.7 0-2.3-1.6-4-4.4-4a5 5 0 0 0-5.2 5c0 1 .3 1.7.7 2.2l-.3 1.2c-.1.4-.4.5-.8.3-1.1-.5-1.7-2.1-1.7-3.4C5.2 8 7.4 5 12.3 5c4 0 6.6 2.9 6.6 6 0 4-2.2 6.9-5.5 6.9-1.1 0-2.2-.6-2.5-1.3l-.7 2.6c-.2.9-.8 2-1.2 2.6A10 10 0 1 0 12 2Z"],
  ["Email","M3 6.5h18v11H3zM3 7l9 6 9-6"]
];

export default function Footer() {
  return (
    <footer className="ftr">
      <div className="wrap">
        <div className="ftr-t">
          <div>
            <span className="brand" style={{ fontSize:"1.7rem" }}><span className="st" />JACTMAK</span>
            <p className="lede mt16" style={{ fontSize:"var(--t-sm)", maxWidth:"32ch" }}>
              Full-grain leather jackets, made to order by one maker at a time.
            </p>
            <div className="soc mt24">
              {SOC.map(([n, d]) => (
                <Link key={n} to="/contact" aria-label={n}>
                  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor"
                       strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d={d} /></svg>
                </Link>
              ))}
            </div>
          </div>
          {COLS.map(c => (
            <div key={c.h}><h3>{c.h}</h3>
              <ul>{c.l.map(([l, to]) => <li key={l}><Link to={to}>{l}</Link></li>)}</ul>
            </div>
          ))}
        </div>
        <div className="ftr-b">
          <span>© {new Date().getFullYear()} JACTMAK · jactmak.com</span>
          <span className="row g16">
            <Link to="/help">Shipping</Link><Link to="/help">Exchanges</Link>
            <Link to="/help">Privacy</Link><Link to="/help">Terms</Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
