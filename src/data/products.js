/* ─────────────────────────────────────────────────────────
   PRODUCT CATALOGUE — Jackets · Bags · Shoes · Accessories
   Every product carries `photos.default`, an array of real
   product photography paths served from /public/products/.
   ProductImage falls back to the SVG technical flat only if
   `photos` is absent.
   ───────────────────────────────────────────────────────── */

export const CURRENCY = "$";

export const HIDES = {
  jet:     { n: "Jet Black",    hex: "#1C1A19" },
  cognac:  { n: "Cognac",       hex: "#8B4A24" },
  oxblood: { n: "Oxblood",      hex: "#5E2028" },
  olive:   { n: "Field Olive",  hex: "#3F4230" },
  tobacco: { n: "Tobacco",      hex: "#6B4423" },
  slate:   { n: "Slate",        hex: "#4A4E52" },
  sand:    { n: "Desert Sand",  hex: "#A8845C" }
};

export const METALS = {
  brass:  { n: "Antique brass",  hex: "#C9A66B" },
  nickel: { n: "Brushed nickel", hex: "#C3C9CC" },
  gun:    { n: "Gunmetal",       hex: "#5E6468" }
};

/* ── Categories ─────────────────────────────────────────── */
export const CATEGORIES = {
  jackets:     { label: "Jackets",     singular: "jacket",  to: "/shop?cat=jackets" },
  bags:        { label: "Bags",        singular: "bag",     to: "/shop?cat=bags" },
  shoes:       { label: "Shoes",       singular: "shoes",   to: "/shop?cat=shoes" },
  accessories: { label: "Accessories", singular: "piece",   to: "/shop?cat=accessories" }
};
export const CATS = Object.entries(CATEGORIES).map(([k, v]) => [k, v.label]);

export const CUT_LABELS = {
  moto:"Moto & biker", racer:"Café racer", bomber:"Bomber", trucker:"Trucker", aviator:"Aviator",
  blazer:"Blazer", suede:"Suede", coat:"Overcoat", vest:"Vest", trench:"Trench coat",
  tote:"Tote", briefcase:"Briefcase", weekender:"Weekender", messenger:"Messenger",
  handbag:"Handbag", backpack:"Backpack",
  loafers:"Loafers", derby:"Derby", dress:"Dress", boots:"Boots", oxford:"Oxford", moccasins:"Moccasins",
  keychain:"Keychain", "luggage-tag":"Luggage tag", belt:"Belt", wallet:"Wallet", passport:"Passport holder"
};
export const CUTS_BY_CAT = {
  jackets:     ["moto","racer","bomber","trucker","aviator","blazer","suede","coat","vest","trench"],
  bags:        ["tote","briefcase","weekender","messenger","handbag","backpack"],
  shoes:       ["loafers","derby","dress","boots","oxford","moccasins"],
  accessories: ["keychain","luggage-tag","belt","wallet","passport"]
};

export const MSIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const WSIZES = ["XS", "S", "M", "L", "XL"];
export const SHOE_SIZES = ["7", "8", "9", "10", "11", "12"];
export const ONE_SIZE = ["One size"];

/* [chest, shoulder, sleeve, back length] — garment measured flat, inches */
export const MFIT = { XS:[34,17,24.5,25], S:[36,17.75,25,25.5], M:[38,18.5,25.5,26],
                      L:[40,19.25,26,26.5], XL:[42,20,26.5,27], XXL:[44,20.75,27,27.5] };
export const WFIT = { XS:[31,14.5,23,22.5], S:[33,15.25,23.5,23], M:[35,16,24,23.5],
                      L:[37,16.75,24.5,24], XL:[39,17.5,25,24.5] };
/* [EU, UK] equivalents for each US size */
export const SHOE_FIT = { "7":[40,6], "8":[41,7], "9":[42,8], "10":[43,9], "11":[44,10], "12":[45,11] };

export const sizesOf = (p) => {
  if (p.category === "shoes") return SHOE_SIZES;
  if (p.category === "jackets") return p.gender === "women" ? WSIZES : MSIZES;
  return ONE_SIZE;
};
export const fitOf = (p) => {
  if (p.category === "shoes") return SHOE_FIT;
  if (p.category === "jackets") return p.gender === "women" ? WFIT : MFIT;
  return {};
};
export const viewLabel = (p) => `View ${CATEGORIES[p.category]?.singular || "item"}`;

const base = (o) => ({
  category:"jackets", gender: "men", rating: 4.8, reviews: 120, tags: [], metal: "brass",
  hideType: "Full-grain cowhide", weight: "1.2–1.4 mm", lining: "Quilted viscose",
  panels: 14, made: "18–22 days", out: [], photos: null, dims: null, ...o
});

export const PRODUCTS = [
  /* ══════════════════ JACKETS — MEN ══════════════════ */
  base({ id:"kestrel-moto", name:"Kestrel Moto", cut:"moto", sub:"Asymmetric biker · full-grain cowhide",
    price:489, was:589, hides:["jet","oxblood","slate"], metal:"gun", rating:4.9, reviews:412,
    tags:["bestseller"], panels:16, weight:"1.3–1.5 mm", out:["XS"],
    photos:{ default:["/products/jackets/men/kestrel-moto-leather-biker-jacket.jpg"] },
    desc:"The asymmetric zip, the notched lapels, the belted waist — a 1928 pattern with none of the 1928 stiffness. Cut from 1.3 mm full-grain cowhide that starts firm and gives you a jacket shaped to your shoulders by month three.",
    details:["Asymmetric YKK Excella zip, gunmetal finish","Belted waist with roller buckle","Two zip hand pockets, one internal chest pocket","Quilted viscose body lining, satin sleeve lining"] }),
  base({ id:"ridgeline-racer", name:"Ridgeline Racer", cut:"racer", sub:"Café racer · vegetable-tanned cowhide",
    price:429, hides:["cognac","jet","tobacco"], rating:4.9, reviews:338, tags:["bestseller"],
    panels:11, weight:"1.1–1.3 mm", lining:"Bemberg cupro",
    photos:{ default:["/products/jackets/men/ridgeline-cafe-racer-leather-jacket.jpg"] },
    desc:"Minimal by design: a band collar, a straight centre zip, nothing else competing for attention. Vegetable-tanned, so it darkens and marks with wear instead of staying flat.",
    details:["Snap-fastened band collar","Centre YKK zip with leather pull","Two slash hand pockets","Bemberg cupro lining — breathes better than polyester"] }),
  base({ id:"foundry-trucker", name:"Foundry Trucker", cut:"trucker", sub:"Trucker jacket · waxed steerhide",
    price:399, hides:["tobacco","jet","olive"], rating:4.7, reviews:196,
    panels:13, weight:"1.4–1.6 mm", lining:"Unlined, taped seams",
    photos:{ default:["/products/jackets/men/foundry-trucker-waxed-steerhide-jacket.jpg"] },
    desc:"Built on a workwear block — squared shoulders, twin chest flaps, adjustable waist tabs. Heavier steerhide with a hand wax finish that picks up a patina fast on the elbows and cuffs.",
    details:["Twin chest flap pockets, brass snaps","Adjustable waist tabs","Unlined with bound and taped interior seams","Copper rivets at stress points"] }),
  base({ id:"northwind-b3", name:"Northwind B-3", cut:"aviator", sub:"Shearling aviator · sheepskin",
    price:749, was:899, hides:["tobacco","jet"], rating:4.9, reviews:154, tags:["limited"],
    panels:18, weight:"1.8–2.2 mm", lining:"Natural shearling", made:"24–30 days",
    hideType:"Merino sheepskin", out:["XS","XXL"],
    photos:{ default:["/products/jackets/men/northwind-b3-shearling-aviator-jacket.jpg"] },
    desc:"The heavy one. A full shearling collar, sheepskin body, and enough wool inside that you will overheat above 5°C. Made in a smaller run because the hides have to be matched by hand.",
    details:["Full shearling throat latch and collar","Twin buckle straps at collar","Natural shearling lining throughout","Rated comfortable to −15°C"] }),
  base({ id:"meridian-blazer", name:"Meridian Blazer", cut:"blazer", sub:"Leather blazer · lambskin",
    price:459, hides:["jet","cognac"], metal:"nickel", rating:4.7, reviews:121, tags:["new"],
    panels:15, weight:"0.8–1.0 mm", hideType:"Napa lambskin", lining:"Satin",
    photos:{ default:["/products/jackets/men/meridian-leather-blazer.jpg"] },
    desc:"A two-button blazer cut in 0.9 mm lambskin, so it drapes like cloth rather than standing away from you. The one jacket here you can wear over a shirt to something formal.",
    details:["Notch lapel, two-button front","Four-panel back with centre vent","Two flap pockets, one welt chest pocket","Full satin lining"] }),
  base({ id:"ironside-bomber", name:"Ironside Bomber", cut:"bomber", sub:"Flight bomber · lambskin",
    price:419, hides:["olive","jet","cognac"], rating:4.8, reviews:287,
    panels:12, weight:"1.0–1.2 mm", hideType:"Napa lambskin",
    photos:{ default:["/products/jackets/men/ironside-bomber-lambskin-jacket.jpg"] },
    desc:"An A-2 silhouette softened at the shoulder. Ribbed collar, cuffs and hem in a heavy cotton-wool blend that holds shape after a winter rather than going slack.",
    details:["Ribbed knit collar, cuffs and hem","Centre YKK zip, brass finish","Two front welt pockets, two interior","Action-back pleats for shoulder movement"] }),
  base({ id:"wilder-suede-bomber", name:"Wilder Suede Bomber", cut:"suede", sub:"Suede bomber · goat suede",
    price:439, hides:["tobacco","sand","olive"], rating:4.7, reviews:64, tags:["new"],
    panels:12, weight:"1.0–1.2 mm", hideType:"Goat suede", lining:"Quilted viscose",
    photos:{ default:["/products/jackets/men/wilder-suede-bomber-jacket.jpg"] },
    desc:"Suede instead of a finished grain, which means it marks if you look at it wrong for the first month and then stops caring entirely. Same bomber block as the Ironside, cut from goat suede that softens fast.",
    details:["Ribbed knit collar, cuffs and hem","Centre YKK zip, brass finish","Two front welt pockets, one interior","Suede protector spray included"] }),
  base({ id:"harrington-coat", name:"Harrington Overcoat", cut:"coat", sub:"Longline overcoat · full-grain cowhide",
    price:689, hides:["jet","cognac","tobacco"], metal:"nickel", rating:4.8, reviews:58, tags:["new"],
    panels:20, weight:"1.2–1.4 mm", lining:"Satin, full body", made:"22–26 days",
    photos:{ default:["/products/jackets/men/harrington-leather-overcoat.jpg"] },
    desc:"Cut to the knee, with enough structure through the shoulder to wear over a suit and enough drape below to move properly. Built to replace a wool overcoat entirely, not sit alongside it.",
    details:["Notch lapel, three-button single-breasted front","Two flap pockets, one interior breast pocket","Full satin lining, body and sleeve","Back vent for stride"] }),
  base({ id:"drifter-vest", name:"Drifter Vest", cut:"vest", sub:"Utility vest · waxed steerhide",
    price:259, hides:["tobacco","jet","olive"], rating:4.6, reviews:47,
    panels:8, weight:"1.4–1.6 mm", lining:"Unlined", made:"12–16 days",
    photos:{ default:["/products/jackets/men/drifter-leather-vest.jpg"] },
    desc:"No sleeves, so it doesn't fight with what you layer underneath — a flannel in autumn, nothing in a warm bar in December. Four patch pockets, waxed steerhide that's already rugged out of the box.",
    details:["Four patch pockets with brass snaps","Adjustable side straps","Unlined, bound interior seams","Works over any long-sleeve layer"] }),

  /* ══════════════════ JACKETS — WOMEN ══════════════════ */
  base({ id:"vesper-moto", name:"Vesper Moto", cut:"moto", gender:"women", sub:"Asymmetric biker · lambskin",
    price:469, was:559, hides:["oxblood","jet","sand"], metal:"gun", rating:4.9, reviews:503,
    tags:["bestseller"], panels:16, weight:"0.9–1.1 mm", hideType:"Napa lambskin", out:["XL"],
    photos:{ default:["/products/jackets/women/vesper-moto-leather-biker-jacket.jpg"] },
    desc:"Cropped at the hip, nipped at the waist, and cut from lambskin soft enough to pack. The asymmetric zip sits off-centre so it layers cleanly under a coat.",
    details:["Asymmetric zip with gunmetal hardware","Waist belt with roller buckle","Zip cuffs and two zip hand pockets","Quilted satin lining"] }),
  base({ id:"lark-racer", name:"Lark Racer", cut:"racer", gender:"women", sub:"Minimal racer · lambskin",
    price:409, hides:["sand","jet","cognac"], metal:"nickel", rating:4.8, reviews:264, tags:["new"],
    panels:10, weight:"0.8–1.0 mm", hideType:"Napa lambskin", lining:"Bemberg cupro",
    photos:{ default:["/products/jackets/women/lark-cafe-racer-leather-jacket.jpg"] },
    desc:"No lapels, no belt, no external hardware beyond the zip. A collarless racer that reads as a layer rather than a statement — which is exactly why it gets worn more.",
    details:["Collarless neckline","Concealed nickel centre zip","Two hidden side-seam pockets","Bemberg cupro lining"] }),
  base({ id:"atlas-bomber", name:"Atlas Bomber", cut:"bomber", gender:"women", sub:"Cropped bomber · lambskin",
    price:399, hides:["jet","olive","oxblood"], rating:4.7, reviews:188,
    panels:12, weight:"0.9–1.1 mm", hideType:"Napa lambskin",
    photos:{ default:["/products/jackets/women/atlas-bomber-lambskin-jacket.jpg"] },
    desc:"Cropped two inches shorter than the men's block and cut narrower through the sleeve. Ribbed hem sits at the natural waist so it works over a dress as easily as jeans.",
    details:["Ribbed collar, cuffs and hem","Brass centre zip","Two welt pockets, one interior zip pocket","Full satin lining"] }),
  base({ id:"solace-blazer", name:"Solace Blazer", cut:"blazer", gender:"women", sub:"Longline blazer · lambskin",
    price:479, hides:["tobacco","jet"], metal:"nickel", rating:4.8, reviews:96,
    panels:15, weight:"0.8–1.0 mm", hideType:"Napa lambskin", lining:"Satin",
    photos:{ default:["/products/jackets/women/solace-longline-leather-blazer.jpg"] },
    desc:"Cut long — past the hip, with a single button and a soft shoulder. Tailored enough for an office, loose enough to wear open over a jumper.",
    details:["Single-button longline front","Soft unstructured shoulder","Two flap pockets, two interior","Centre back vent"] }),
  base({ id:"marlow-trucker", name:"Marlow Trucker", cut:"trucker", gender:"women", sub:"Cropped trucker · cowhide",
    price:389, hides:["cognac","sand","jet"], rating:4.6, reviews:142,
    panels:13, weight:"1.1–1.3 mm", lining:"Unlined, taped seams",
    photos:{ default:["/products/jackets/women/marlow-trucker-leather-jacket.jpg"] },
    desc:"A shrunken trucker — cropped, boxy through the body, narrow in the sleeve. Unlined so it stays light, with every interior seam bound in cotton tape.",
    details:["Shirt collar with snap fastening","Twin chest flap pockets","Adjustable waist tabs","Unlined, bound interior seams"] }),
  base({ id:"nova-moto", name:"Nova Moto", cut:"moto", gender:"women", sub:"Panelled moto · lambskin",
    price:449, hides:["slate","jet","oxblood"], metal:"nickel", rating:4.8, reviews:171, tags:["new"],
    panels:19, weight:"0.9–1.1 mm", hideType:"Napa lambskin", out:["XS"],
    photos:{ default:["/products/jackets/women/nova-moto-panelled-leather-jacket.jpg"] },
    desc:"Nineteen panels instead of the usual sixteen, which is what gives the waist its shape without a belt. More cutting, more stitching, better line.",
    details:["Nineteen-panel construction, no waist belt","Quilted shoulder and elbow panels","Asymmetric nickel zip","Two zip hand pockets"] }),
  base({ id:"echo-suede", name:"Echo Suede", cut:"suede", gender:"women", sub:"Suede jacket · lambskin suede",
    price:429, hides:["sand","tobacco","oxblood"], rating:4.7, reviews:52, tags:["new"],
    panels:11, weight:"0.8–1.0 mm", hideType:"Lambskin suede", lining:"Bemberg cupro",
    photos:{ default:["/products/jackets/women/echo-suede-jacket.jpg"] },
    desc:"The nap catches the light differently to every other jacket here, which is the entire argument for suede. Cut narrow through the body from lambskin suede soft enough to fold into a bag.",
    details:["Collarless neckline, single button","Two hidden side-seam pockets","Bemberg cupro lining","Suede protector spray included"] }),
  base({ id:"wren-trench", name:"Wren Trench", cut:"trench", gender:"women", sub:"Leather trench coat · lambskin",
    price:649, hides:["cognac","jet","tobacco"], metal:"nickel", rating:4.8, reviews:39, tags:["new"],
    panels:17, weight:"0.9–1.1 mm", hideType:"Napa lambskin", lining:"Satin, full body", made:"22–26 days",
    photos:{ default:["/products/jackets/women/wren-leather-trench-coat.jpg"] },
    desc:"A belted trench in lambskin instead of cotton gabardine, which sounds like a gimmick until you're still dry after twenty minutes of real rain. Storm flaps at the shoulder, a proper belt, no shortcuts.",
    details:["Storm flap at both shoulders","Self-belt with D-ring hardware","Two flap pockets, two interior","Full satin lining, back vent"] }),

  /* ══════════════════ BAGS ══════════════════ */
  base({ id:"meridian-tote", name:"Meridian Tote", category:"bags", gender:"unisex", cut:"tote",
    sub:"Structured tote · full-grain cowhide", price:249, hides:["cognac","jet","tobacco","sand"],
    hideType:"Full-grain cowhide", weight:"1.6–1.8 mm", lining:"Cotton canvas", panels:null,
    made:"10–14 days", dims:"38 × 34 × 14 cm", rating:4.7, reviews:83, tags:["new"],
    photos:{ default:["/products/bags/meridian-tote-bag.jpg"] },
    desc:"Open-top and structured enough to stand on its own on a counter, with a base thick enough that it doesn't sag once you load a laptop and the rest of a day into it.",
    details:["Two rolled top handles, hand-stitched","Open top, internal zip pocket","Reinforced base panel","Cotton canvas interior lining"] }),
  base({ id:"foundry-briefcase", name:"Foundry Briefcase", category:"bags", gender:"unisex", cut:"briefcase",
    sub:"Structured briefcase · full-grain cowhide", price:389, hides:["cognac","jet","oxblood"],
    hideType:"Full-grain cowhide", weight:"1.5–1.7 mm", lining:"Cotton twill", panels:null,
    made:"14–18 days", dims:"40 × 30 × 9 cm", rating:4.8, reviews:104, tags:["bestseller"],
    photos:{ default:["/products/bags/foundry-briefcase.jpg"] },
    desc:"Built for a laptop and not much else, on purpose. A single main compartment, a padded sleeve, and a shoulder strap for the days you don't want to carry it by hand.",
    details:["Padded 15\" laptop sleeve","Detachable, adjustable shoulder strap","Brass turn-lock closure","Two exterior slip pockets"] }),
  base({ id:"atlas-weekender", name:"Atlas Weekender", category:"bags", gender:"unisex", cut:"weekender",
    sub:"Weekend holdall · full-grain cowhide", price:459, hides:["tobacco","cognac","jet"], metal:"gun",
    hideType:"Full-grain cowhide", weight:"1.6–1.8 mm", lining:"Cotton canvas", panels:null,
    made:"16–20 days", dims:"52 × 28 × 24 cm", rating:4.8, reviews:71,
    photos:{ default:["/products/bags/atlas-weekender-bag.jpg"] },
    desc:"Sized for two or three days, not a week — the point where a bag stops being useful the moment it's big enough to avoid packing properly. Wide enough mouth to see everything at once.",
    details:["Full-width zip closure, two pulls","Detachable, adjustable shoulder strap","Interior zip pocket, two slip pockets","Reinforced feet on base"] }),
  base({ id:"ranger-messenger", name:"Ranger Messenger", category:"bags", gender:"unisex", cut:"messenger",
    sub:"Messenger bag · full-grain cowhide", price:299, hides:["tobacco","olive","jet"], metal:"gun",
    hideType:"Full-grain cowhide", weight:"1.3–1.5 mm", lining:"Cotton twill", panels:null,
    made:"12–16 days", dims:"36 × 27 × 11 cm", rating:4.6, reviews:58,
    photos:{ default:["/products/bags/ranger-messenger-bag.jpg"] },
    desc:"Flap-over and cross-body, built to sit flat against your back on a bike rather than swinging. A thirteen-inch laptop fits in the padded sleeve with room either side for the rest of a commute.",
    details:["Flap-over closure, two buckle straps","Padded 13\" laptop sleeve","Adjustable cross-body strap","Front slip pocket, interior zip pocket"] }),
  base({ id:"marlowe-handbag", name:"Marlowe Handbag", category:"bags", gender:"women", cut:"handbag",
    sub:"Structured handbag · napa lambskin", price:329, hides:["oxblood","cognac","jet","sand"], metal:"nickel",
    hideType:"Napa lambskin", weight:"0.9–1.1 mm", lining:"Satin", panels:null,
    made:"14–18 days", dims:"30 × 22 × 11 cm", rating:4.8, reviews:97, tags:["bestseller"],
    photos:{ default:["/products/bags/marlowe-leather-handbag.jpg"] },
    desc:"A top-handle bag structured enough to keep its shape empty and soft enough not to look severe full. Sized to actually carry things, which is rarer than it should be.",
    details:["Top handle plus detachable shoulder strap","Nickel turn-lock closure","Interior zip pocket, two slip pockets","Protective metal feet on base"] }),
  base({ id:"voyager-backpack", name:"Voyager Backpack", category:"bags", gender:"unisex", cut:"backpack",
    sub:"Leather backpack · full-grain cowhide", price:349, hides:["jet","tobacco","cognac"], metal:"gun",
    hideType:"Full-grain cowhide", weight:"1.4–1.6 mm", lining:"Cotton canvas", panels:null,
    made:"16–20 days", dims:"30 × 42 × 15 cm", rating:4.7, reviews:66, tags:["new"],
    photos:{ default:["/products/bags/voyager-leather-backpack.jpg"] },
    desc:"Two main compartments instead of one cavern, so a laptop doesn't end up loose against whatever else you're carrying. Padded straps that hold their shape rather than folding flat empty.",
    details:["Padded 15\" laptop compartment","Padded, adjustable shoulder straps","Top handle for short carries","Front flap pocket, side water-bottle pocket"] }),

  /* ══════════════════ SHOES ══════════════════ */
  base({ id:"ashford-loafers", name:"Ashford Loafers", category:"shoes", gender:"men", cut:"loafers",
    sub:"Penny loafers · full-grain calfskin", price:229, hides:["cognac","jet","tobacco"],
    hideType:"Full-grain calfskin", weight:"1.0–1.2 mm", lining:"Leather sock lining", panels:null,
    made:"14–18 days", rating:4.6, reviews:74,
    photos:{ default:["/products/shoes/ashford-leather-loafers.jpg"] },
    desc:"A penny loafer built on a leather sole and stacked heel, cut from calfskin that takes a shine rather than staying matte. No sock required by week two.",
    details:["Full leather sole, stacked leather heel","Hand-stitched moc-toe apron","Leather sock lining, breathable through wear","Cork-filled footbed shapes to your foot"] }),
  base({ id:"harrow-derby", name:"Harrow Derby", category:"shoes", gender:"men", cut:"derby",
    sub:"Derby shoes · full-grain calfskin", price:259, hides:["jet","cognac"], metal:"nickel",
    hideType:"Full-grain calfskin", weight:"1.0–1.2 mm", lining:"Leather sock lining", panels:null,
    made:"14–18 days", rating:4.7, reviews:61, tags:["new"],
    photos:{ default:["/products/shoes/harrow-derby-shoes.jpg"] },
    desc:"Open lacing for a bit more room through the instep than an Oxford gives you — the shoe you reach for when the Oxfords feel like a meeting you didn't agree to.",
    details:["Five-eyelet open lacing","Goodyear-welted leather sole","Leather sock lining","Reinforced heel counter"] }),
  base({ id:"whitfield-dress", name:"Whitfield Dress Shoes", category:"shoes", gender:"men", cut:"dress",
    sub:"Cap-toe dress shoes · full-grain calfskin", price:279, hides:["jet","oxblood"], metal:"nickel",
    hideType:"Full-grain calfskin", weight:"1.0–1.2 mm", lining:"Leather sock lining", panels:null,
    made:"16–20 days", rating:4.8, reviews:88, tags:["bestseller"],
    photos:{ default:["/products/shoes/whitfield-dress-shoes.jpg"] },
    desc:"A cap-toe built for the days a plain shoe isn't quite enough — polished calfskin over a leather sole, the kind of shoe that's meant to be resoled twice, not replaced once.",
    details:["Cap-toe with broguing detail","Goodyear-welted leather sole","Leather sock lining","Resoleable construction"] }),
  base({ id:"foundry-boots", name:"Foundry Boots", category:"shoes", gender:"men", cut:"boots",
    sub:"Service boots · waxed cowhide", price:319, hides:["tobacco","jet","oxblood"], metal:"gun",
    hideType:"Waxed full-grain cowhide", weight:"1.8–2.0 mm", lining:"Unlined, leather sock", panels:null,
    made:"18–22 days", rating:4.8, reviews:132, tags:["bestseller"],
    photos:{ default:["/products/shoes/foundry-leather-boots.jpg"] },
    desc:"Six-inch boots on a Goodyear welt and a commercial rubber outsole, built to be resoled rather than binned. The waxed finish is meant to scuff — it looks better in a year than it does today.",
    details:["Six-inch shaft, five-eyelet lacing","Goodyear-welted commercial rubber sole","Steel shank for arch support","Waxed cowhide, ages fast on purpose"] }),
  base({ id:"sterling-oxfords", name:"Sterling Oxfords", category:"shoes", gender:"men", cut:"oxford",
    sub:"Oxford shoes · full-grain calfskin", price:269, hides:["jet","cognac"], metal:"nickel",
    hideType:"Full-grain calfskin", weight:"1.0–1.2 mm", lining:"Leather sock lining", panels:null,
    made:"16–20 days", rating:4.7, reviews:69,
    photos:{ default:["/products/shoes/sterling-oxford-shoes.jpg"] },
    desc:"Closed lacing and a plain cap toe — the shoe you buy once and wear to everything formal for a decade. Cut from calfskin finished to take a proper mirror shine.",
    details:["Closed (balmoral) lacing","Goodyear-welted leather sole","Leather sock lining","Takes a high-shine polish"] }),
  base({ id:"camden-moccasins", name:"Camden Moccasins", category:"shoes", gender:"men", cut:"moccasins",
    sub:"Driving moccasins · full-grain calfskin", price:199, hides:["tobacco","sand","cognac"],
    hideType:"Full-grain calfskin", weight:"0.9–1.1 mm", lining:"Unlined", panels:null,
    made:"12–16 days", rating:4.5, reviews:44,
    photos:{ default:["/products/shoes/camden-leather-moccasins.jpg"] },
    desc:"Rubber pebble sole, no structure to speak of, and a heel low enough to actually work a pedal in. Built for the car and the twenty minutes either side of it, not a full day on your feet.",
    details:["Rubber pebble-grip sole","Hand-stitched apron construction","Unlined, breaks in within a week","Packs flat for travel"] }),

  /* ══════════════════ ACCESSORIES ══════════════════ */
  base({ id:"rivet-keychain", name:"Rivet Keychain", category:"accessories", gender:"unisex", cut:"keychain",
    sub:"Leather keychain · full-grain offcut", price:39,
    hides:["jet","cognac","tobacco","oxblood","olive","slate","sand"],
    hideType:"Full-grain cowhide offcut", weight:"2.0–2.2 mm", lining:null, panels:null,
    made:"5–7 days", dims:"10 × 3 cm", rating:4.7, reviews:210, tags:["bestseller"],
    photos:{ default:["/products/accessories/rivet-leather-keychain.jpg"] },
    desc:"Cut from the offcuts of a Kestrel or a Foundry, so no two are from quite the same hide. A brass swivel clip and a keyring, nothing else to it.",
    details:["Brass swivel clip and keyring","Hand-burnished edges","Cut from full-grain offcuts","Deepens in colour with handling"] }),
  base({ id:"transit-luggage-tag", name:"Transit Luggage Tag", category:"accessories", gender:"unisex", cut:"luggage-tag",
    sub:"Personalised luggage tag · full-grain cowhide", price:45, hides:["jet","cognac","tobacco","oxblood"],
    hideType:"Full-grain cowhide", weight:"1.8–2.0 mm", lining:null, panels:null,
    made:"7–10 days", dims:"11 × 7 cm", rating:4.8, reviews:132, tags:["new"],
    photos:{ default:["/products/accessories/transit-leather-luggage-tag.jpg"] },
    desc:"A leather window over a card insert, so your name is visible without your address being visible to everyone in the baggage line. Initials debossed on request at checkout.",
    details:["Card insert behind a leather window","Adjustable leather strap closure","Free deboss — up to 3 initials","Reinforced eyelet and stitching"] }),
  base({ id:"cambridge-belt", name:"Cambridge Belt", category:"accessories", gender:"unisex", cut:"belt",
    sub:"Leather belt · full-grain cowhide", price:89, hides:["cognac","jet","tobacco","oxblood"],
    hideType:"Full-grain cowhide", weight:"3.2–3.6 mm", lining:null, panels:null,
    made:"7–10 days", dims:"125 × 3.5 cm — cut to size at checkout", rating:4.7, reviews:158,
    photos:{ default:["/products/accessories/cambridge-leather-belt.jpg"] },
    desc:"A single piece of 3.2 mm cowhide with no backing layer, so it doesn't delaminate the way a bonded belt eventually does. Cut to your waist size, not sold pre-punched to a stock length.",
    details:["Solid brass roller buckle","Single-piece full-grain construction, no backing","Cut and punched to your size","Edge-burnished and creased by hand"] }),
  base({ id:"ledger-wallet", name:"Ledger Bifold Wallet", category:"accessories", gender:"unisex", cut:"wallet",
    sub:"Bifold wallet · full-grain cowhide", price:99, hides:["jet","cognac","oxblood","tobacco"], metal:null,
    hideType:"Full-grain cowhide", weight:"1.0–1.2 mm", lining:"Unlined interior", panels:null,
    made:"7–10 days", dims:"11 × 9 cm", rating:4.8, reviews:246, tags:["bestseller"],
    photos:{ default:["/products/accessories/ledger-bifold-wallet.jpg"] },
    desc:"Six card slots and a centre bill compartment, built from a single folded piece rather than layers glued together — thinner in the pocket than that construction usually allows.",
    details:["Six card slots, one bill compartment","Single-fold construction, minimal bulk","Edge-burnished by hand","Slim enough for a front pocket"] }),
  base({ id:"voyager-passport", name:"Voyager Passport Holder", category:"accessories", gender:"unisex", cut:"passport",
    sub:"Passport holder · full-grain cowhide", price:69, hides:["jet","cognac","tobacco","oxblood"], metal:null,
    hideType:"Full-grain cowhide", weight:"1.0–1.2 mm", lining:"Cotton twill", panels:null,
    made:"7–10 days", dims:"14 × 10 cm", rating:4.7, reviews:91, tags:["new"],
    photos:{ default:["/products/accessories/voyager-passport-holder.jpg"] },
    desc:"A slot for the passport, two card slots and a gusseted pocket for a boarding pass — enough to get through security without digging through a bag.",
    details:["Passport slot, two card slots","Gusseted pocket for boarding passes","Cotton twill interior lining","Corner-rounded, edge-burnished"] })
];

export const byId    = (id) => PRODUCTS.find(p => p.id === id);
export const money   = (n)  => CURRENCY + n.toLocaleString(undefined, { maximumFractionDigits: 2 });
