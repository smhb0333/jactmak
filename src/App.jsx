import { Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import OrderConfirmed from "./pages/OrderConfirmed.jsx";
import Sizing from "./pages/Sizing.jsx";
import Workshop from "./pages/Workshop.jsx";
import Journal from "./pages/Journal.jsx";
import Help from "./pages/Help.jsx";
import Contact from "./pages/Contact.jsx";
import Saved from "./pages/Saved.jsx";
import NotFound from "./pages/NotFound.jsx";

const TITLES = {
  "/":"Leather jackets, bags, shoes & accessories, cut to your measurements",
  "/shop":"Shop all leather goods", "/cart":"Your bag",
  "/checkout":"Checkout", "/sizing":"Sizing guide", "/workshop":"The workshop",
  "/journal":"Journal", "/help":"Help centre", "/contact":"Contact", "/saved":"Saved pieces"
};
const DESCRIPTIONS = {
  "/":"Full-grain leather jackets, bags, shoes and accessories made to order. Every piece ships with its tech pack: hide, weight, panel count and full measurements.",
  "/shop":"Browse JACTMAK's full leather goods catalogue — jackets, bags, shoes and accessories in full-grain cowhide and napa lambskin, made to order.",
  "/sizing":"Find your JACTMAK size with our interactive fit tool, built from real chest, shoulder, sleeve and back-length measurements.",
  "/workshop":"Inside the JACTMAK workshop — one maker per piece, LWG-certified tanneries, and the four stages behind every jacket, bag, shoe and accessory.",
  "/journal":"Notes on leather, fit and care from the JACTMAK workshop.",
  "/help":"Shipping, sizing, exchanges and care — everything you need to know before and after you order from JACTMAK.",
  "/contact":"Get in touch with the JACTMAK workshop.",
  "/cart":"Review your bag before checkout.", "/saved":"Your saved JACTMAK pieces."
};

function setMeta(name, content) {
  let tag = document.querySelector(`meta[name="${name}"]`);
  if (!tag) { tag = document.createElement("meta"); tag.setAttribute("name", name); document.head.appendChild(tag); }
  tag.setAttribute("content", content);
}
function setCanonical(path) {
  let tag = document.querySelector('link[rel="canonical"]');
  if (!tag) { tag = document.createElement("link"); tag.setAttribute("rel", "canonical"); document.head.appendChild(tag); }
  tag.setAttribute("href", `https://www.jactmak.com${path}`);
}

function ScrollAndTitle() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    const isProduct = pathname.startsWith("/product/");
    document.title = `JACTMAK — ${TITLES[pathname] || (isProduct ? "Product" : "Page not found")}`;
    if (!isProduct && DESCRIPTIONS[pathname]) setMeta("description", DESCRIPTIONS[pathname]);
    if (!isProduct) setCanonical(pathname + (pathname === "/shop" ? search : ""));
  }, [pathname, search]);
  return null;
}

export default function App() {
  return (<>
    <ScrollAndTitle />
    <Routes>
      {/* Checkout + confirmation sit outside the main chrome — fewer exits, higher completion */}
      <Route path="/checkout" element={<Checkout />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/order-confirmed" element={<OrderConfirmed />} />
        <Route path="/sizing" element={<Sizing />} />
        <Route path="/workshop" element={<Workshop />} />
        <Route path="/journal" element={<Journal />} />
        <Route path="/help" element={<Help />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  </>);
}
