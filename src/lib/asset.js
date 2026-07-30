/* Prefixes a root-absolute public asset path ("/products/…", "/categories/…")
   with Vite's configured base ("/" on a custom domain, "/jactmak/" on GitHub
   Pages project sites, etc). Vite does NOT rewrite plain string literals like
   src="/products/x.jpg" at build time — only real asset imports and index.html
   get that treatment — so anywhere a public/ path is built as a JS string,
   it needs to go through this. */
export const asset = (path) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;
