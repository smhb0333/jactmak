# JACTMAK — leather goods store

Multi-page React storefront — jackets, bags, shoes and accessories (34 products,
4 categories). Vite + React 18 + React Router + Framer Motion.
No Tailwind, no UI kit — three plain CSS files you fully control.

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build → dist/
npm run preview  # preview the build
```

Node 18+ required.

> **Don't open `dist/index.html` by double-clicking it.** Browsers block ES modules
> over `file://`, so you'll get a blank page. Use `npm run dev`, `npm run preview`,
> or deploy it — all three work fine.

## Deploy

`dist/` is a static folder. Drag it into Netlify/Vercel, or point any host at it.

It ships with **`BrowserRouter`** for clean, SEO-indexable URLs (`jactmak.com/shop`,
`jactmak.com/product/kestrel-moto`) rather than `/#/shop`. Because the server needs to
know to serve `index.html` for those deep links, a rewrite rule is already included:

- **Netlify** — `public/_redirects` → copied to `dist/_redirects` on build
- **Vercel** — `vercel.json` at the project root
- **Apache / cPanel** — `public/.htaccess` → copied to `dist/.htaccess` on build
- **Nginx** — add `try_files $uri $uri/ /index.html;` to your server block
- **GitHub Pages / other static-only hosts with no rewrite support** — swap
  `BrowserRouter` for `HashRouter` in `src/main.jsx` and set `base: "./"` in
  `vite.config.js`; you'll trade clean URLs for zero-config hosting.

> **Deploying under a subpath** (e.g. a GitHub Pages *project* site at
> `you.github.io/repo-name/`, not a custom domain)? Set `base: "/repo-name/"` in
> `vite.config.js`. Vite only rewrites the module `<script>` tag and `%BASE_URL%`
> placeholders in `index.html` automatically — it does **not** rewrite plain
> string paths like `"/products/…jpg"` used in JS. Those are wrapped in
> `src/lib/asset.js` (`asset(path)`, used by `ProductImage.jsx` and the category
> tiles on `Home.jsx`) precisely so images still resolve under a subpath. If you
> add any other root-absolute `public/` path as a raw string, run it through
> `asset()` too, or it'll 404 under a subpath deploy while working fine locally.

---

## Product photography

All 34 products already ship with real photography under `public/products/`,
organized by category (`jackets/men`, `jackets/women`, `bags`, `shoes`, `accessories`).
Imagery still runs through **one component**, `src/components/ProductImage.jsx` — a
product with no `photos` key falls back to the original SVG technical flat, so you can
swap in your own photography one product at a time without anything breaking.

**To replace or add photos for a product**, edit its entry in `src/data/products.js`:

```js
base({ id:"kestrel-moto", name:"Kestrel Moto", /* … */
  photos: { default: ["/products/jackets/men/kestrel-moto-leather-biker-jacket.jpg"] }
  // add a `jet:`, `oxblood:`, etc. key instead of `default` to show a different
  // photo per hide colour — any hide with no entry falls back to `default`
})
```

Drop the file in `public/products/<category>/` first, then point `photos` at it.
Cards, product page, bag, checkout and search all update automatically.

**Image specs:** roughly 4:5 portrait, ideally 1200×1500px+, JPEG. Real studio
photography with a light/neutral backdrop works well — `ProductImage` renders photos
on a warm parchment "specimen" card rather than the dark render background used by
the SVG flats, so light-background product shots sit naturally against the dark UI.

> ⚠️ Use only photography you own or have licensed. Product photos from another
> retailer are copyrighted — a takedown hits your host, your Google listing and
> your payment processor, not just the page.

---

## Structure

```
src/
  main.jsx              entry — Router + CartProvider + CSS imports
  App.jsx               routes; /checkout sits OUTSIDE the main layout; sets
                         document.title / meta description / canonical per route
  data/
    products.js         catalogue (34 products, 4 categories), hides, size
                         blocks, sizesOf()/fitOf() per category, money()
    content.js          nav (incl. Shop mega-menu), FAQs, reviews, journal
  lib/
    CartContext.jsx     bag + wishlist + toasts (useReducer)
    Reveal.jsx          Framer Motion scroll-reveal + Stagger
  components/
    Layout.jsx          header/footer shell + page transitions
    Header.jsx          sticky nav + animated mega menu
    Overlays.jsx        bag drawer, mobile menu, search — focus-trapped
    ProductImage.jsx    ← photo / SVG switch, category-aware labels
    JacketFlat.jsx      parametric SVG technical flat (fallback only)
    ProductCard.jsx  SizeTool.jsx  Accordion.jsx  Icons.jsx
  pages/                Home Shop Product Cart Checkout OrderConfirmed
                        Sizing Workshop Journal Help Contact Saved NotFound
  styles/
    global.css          design tokens — change the brand here
    components.css      component styles incl. category tiles, hero glow
    checkout.css        checkout, built mobile-first
```

### Categories

Every product has a `category`: `jackets`, `bags`, `shoes` or `accessories`
(see `CATEGORIES` in `products.js`). Sizing adapts automatically per category —
`sizesOf(p)` / `fitOf(p)` return clothing sizes + a chest/shoulder/sleeve/length
chart for jackets, US sizes + an EU/UK chart for shoes, and `"One size"` (with a
`dims` string instead of a fit chart) for bags and accessories. To add a fifth
category, add it to `CATEGORIES` and `CUTS_BY_CAT`, then teach `sizesOf`/`fitOf`
its size logic — `Shop.jsx` and `Product.jsx` pick the rest up automatically.

### Change the brand
Everything keys off CSS custom properties at the top of `src/styles/global.css`
(`--hide`, `--brass`, `--parch`, type scale). Currency is `CURRENCY` in `products.js`.

---

## SEO

- **Clean, indexable URLs** via `BrowserRouter` (see Deploy above for the rewrite rules needed).
- Per-route `<title>` / meta description / canonical link, set in `App.jsx`;
  `Shop.jsx` and `Product.jsx` override with more specific copy for filtered/product views.
- JSON-LD in `index.html` (Organization, WebSite w/ SearchAction, category ItemList)
  and per-product Product schema (price, rating, availability) injected by `Product.jsx`.
- `public/sitemap.xml` — 45 URLs (11 static + all 34 products). Regenerate after
  adding/removing products by re-running the same logic against the new `id:"…"` list
  in `products.js`.
- `public/robots.txt` points at the sitemap and excludes cart/checkout/saved.
- Every image has descriptive `alt` text; the hero image loads eagerly with
  `fetchPriority="high"` for a fast LCP, everything else lazy-loads.

**Before launch:** swap the placeholder domain `https://www.jactmak.com` in
`index.html`, `App.jsx`, `Product.jsx` and `sitemap.xml` for your real domain, and
replace the Open Graph/Twitter image with a dedicated 1200×630 social card.

> This is a client-rendered SPA. Modern Googlebot renders JS and will index it, but
> for the strongest possible SEO (fastest indexing, best previews on platforms that
> don't execute JS) consider adding prerendering or server-side rendering later —
> e.g. a static prerender step, or migrating to a framework like Next.js/Astro.

---

## Checkout notes

Three steps — Details → Delivery → Payment — on its own route outside the site chrome
(no nav, no footer; standard practice to reduce checkout abandonment).

Mobile-first specifics:
- Order summary collapses into a tap-to-expand strip at the top
- Sticky pay bar pinned to the bottom, with `env(safe-area-inset-bottom)` for notched phones
- All inputs are `font-size: 16px` — stops iOS auto-zooming on focus
- Per-field validation; invalid fields get focus + smooth scroll
- Card number, expiry and CVC auto-format and are length-capped
- `autoComplete` set correctly so mobile keyboards and password managers fill it

**No payment is processed.** To go live, wire step 3 to Stripe
(`@stripe/react-stripe-js`) or your PSP. Never post raw card data to your own server.

## State

Bag and wishlist live in React state — they reset on refresh, by design (no backend yet).
To persist, add `localStorage` read/write inside `CartProvider` in `src/lib/CartContext.jsx`.

## Verified this revision

- `npm run build` completes clean — 419 modules, no errors or warnings
- Every image path referenced in source resolves to a real file (38/38 checked)
- All 34 products carry `photos`, so none fall back to the placeholder SVG
- Preview server spot-checked: `/`, `/shop`, `/product/kestrel-moto`, `/sitemap.xml`
  all return 200 under `BrowserRouter` with the included rewrite rules
- 0 console errors during those checks

The original build (below) was verified pre-revision across a wider matrix; worth
re-running after this many changes if that level of assurance matters to you:

- 14 routes × 10 viewports (320px–1920px) — 0 horizontal overflow, 0 pages that scroll sideways
- 0 unlabelled buttons / links / inputs / images; one `h1` per route
- 0 tap targets under 24×24 at 320px
- Full checkout flow passes: validation → 3 steps → confirmation → bag cleared
