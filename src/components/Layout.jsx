import { useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import { CartDrawer, MenuDrawer, SearchSheet, Toasts } from "./Overlays.jsx";

export default function Layout() {
  const [cart, setCart] = useState(false);
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const loc = useLocation();

  return (
    <>
      <a className="skip" href="#main">Skip to content</a>
      <Header onSearch={() => setSearch(true)} onCart={() => setCart(true)} onMenu={() => setMenu(true)} />
      <main id="main" tabIndex={-1}>
        <AnimatePresence mode="wait">
          <motion.div key={loc.pathname + loc.search}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: .32, ease: [.22,1,.36,1] }}>
            <Outlet context={{ openCart: () => setCart(true) }} />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <CartDrawer open={cart} onClose={() => setCart(false)} />
      <MenuDrawer open={menu} onClose={() => setMenu(false)} />
      <SearchSheet open={search} onClose={() => setSearch(false)} />
      <Toasts />
    </>
  );
}
