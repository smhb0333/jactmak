import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./lib/CartContext.jsx";
import "./styles/global.css";
import "./styles/components.css";
import "./styles/checkout.css";

/* BrowserRouter gives clean, indexable URLs (/shop, /product/kestrel-moto)
   instead of /#/shop — essential for SEO. Requires a host-level rewrite so
   deep links resolve to index.html: see public/_redirects (Netlify),
   vercel.json (Vercel) and public/.htaccess (Apache) already included. */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider><App /></CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
