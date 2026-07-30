export const TICKER = [
  "Free worldwide shipping · first exchange on us",
  "Made to order in 18–22 days · one maker, one jacket",
  "30-day fit guarantee — send it back if the shoulder is wrong"
];

export const NAV = [
  { label:"Men", to:"/shop?cat=jackets&g=men", cols:[
    { h:"By cut", links:[["Moto & biker","/shop?cat=jackets&g=men&cut=moto"],["Café racer","/shop?cat=jackets&g=men&cut=racer"],["Bomber","/shop?cat=jackets&g=men&cut=bomber"],["Trucker","/shop?cat=jackets&g=men&cut=trucker"],["Aviator","/shop?cat=jackets&g=men&cut=aviator"],["Blazer","/shop?cat=jackets&g=men&cut=blazer"],["Suede","/shop?cat=jackets&g=men&cut=suede"],["Overcoat","/shop?cat=jackets&g=men&cut=coat"],["Vest","/shop?cat=jackets&g=men&cut=vest"]] },
    { h:"By hide", links:[["Full-grain cowhide","/shop?cat=jackets&g=men&hide=cognac"],["Napa lambskin","/shop?cat=jackets&g=men&hide=jet"],["Waxed steerhide","/shop?cat=jackets&g=men&cut=trucker"],["Shearling","/shop?cat=jackets&g=men&cut=aviator"]] },
    { h:"Shop", links:[["All men's jackets","/shop?cat=jackets&g=men"],["New arrivals","/shop?cat=jackets&g=men&tag=new"],["Best sellers","/shop?cat=jackets&g=men&tag=bestseller"],["Sale","/shop?tag=sale"]] }
  ], feat:{ t:"Kestrel Moto", d:"Sixteen panels, gunmetal hardware, a 1928 pattern.", c:"View jacket", to:"/product/kestrel-moto", id:"kestrel-moto", hide:"jet" } },
  { label:"Women", to:"/shop?cat=jackets&g=women", cols:[
    { h:"By cut", links:[["Moto & biker","/shop?cat=jackets&g=women&cut=moto"],["Café racer","/shop?cat=jackets&g=women&cut=racer"],["Bomber","/shop?cat=jackets&g=women&cut=bomber"],["Trucker","/shop?cat=jackets&g=women&cut=trucker"],["Blazer","/shop?cat=jackets&g=women&cut=blazer"],["Suede","/shop?cat=jackets&g=women&cut=suede"],["Trench coat","/shop?cat=jackets&g=women&cut=trench"]] },
    { h:"By hide", links:[["Napa lambskin","/shop?cat=jackets&g=women&hide=jet"],["Cognac","/shop?cat=jackets&g=women&hide=cognac"],["Oxblood","/shop?cat=jackets&g=women&hide=oxblood"],["Desert sand","/shop?cat=jackets&g=women&hide=sand"]] },
    { h:"Shop", links:[["All women's jackets","/shop?cat=jackets&g=women"],["New arrivals","/shop?cat=jackets&g=women&tag=new"],["Best sellers","/shop?cat=jackets&g=women&tag=bestseller"],["Sale","/shop?tag=sale"]] }
  ], feat:{ t:"Vesper Moto", d:"Cropped, belted, cut from 1 mm lambskin.", c:"View jacket", to:"/product/vesper-moto", id:"vesper-moto", hide:"oxblood" } },
  { label:"Shop", to:"/shop", cols:[
    { h:"Bags", links:[["Tote","/shop?cat=bags&cut=tote"],["Briefcase","/shop?cat=bags&cut=briefcase"],["Weekender","/shop?cat=bags&cut=weekender"],["Messenger","/shop?cat=bags&cut=messenger"],["Handbag","/shop?cat=bags&cut=handbag"],["Backpack","/shop?cat=bags&cut=backpack"],["All bags","/shop?cat=bags"]] },
    { h:"Shoes", links:[["Loafers","/shop?cat=shoes&cut=loafers"],["Derby","/shop?cat=shoes&cut=derby"],["Dress shoes","/shop?cat=shoes&cut=dress"],["Boots","/shop?cat=shoes&cut=boots"],["Oxfords","/shop?cat=shoes&cut=oxford"],["Moccasins","/shop?cat=shoes&cut=moccasins"],["All shoes","/shop?cat=shoes"]] },
    { h:"Accessories", links:[["Belts","/shop?cat=accessories&cut=belt"],["Wallets","/shop?cat=accessories&cut=wallet"],["Keychains","/shop?cat=accessories&cut=keychain"],["Passport holders","/shop?cat=accessories&cut=passport"],["Luggage tags","/shop?cat=accessories&cut=luggage-tag"],["All accessories","/shop?cat=accessories"]] }
  ], feat:{ t:"Foundry Briefcase", d:"Full-grain cowhide, padded 15\" laptop sleeve.", c:"View bag", to:"/product/foundry-briefcase", id:"foundry-briefcase", hide:"cognac" } },
  { label:"Sizing", to:"/sizing" },
  { label:"The workshop", to:"/workshop" },
  { label:"Journal", to:"/journal" }
];

export const PROCESS = [
  { n:"Stage 01", t:"Hide selection", d:"Every jacket starts from a single hide, graded by hand. Anything with a scar, a brand or an uneven grain goes to offcuts." },
  { n:"Stage 02", t:"Pattern & cut", d:"Your size is cut from the graded block, not shrunk down from a large. Between 10 and 19 panels depending on the jacket." },
  { n:"Stage 03", t:"Assembly", d:"One maker builds one jacket start to finish. Their initials go on the interior label with the date it left the bench." },
  { n:"Stage 04", t:"Finish & ship", d:"Hardware set, edges burnished, conditioned once, then photographed against the tech pack before it's boxed." }
];

export const REVIEWS = [
  { n:"Idris M.", p:"Kestrel Moto · Jet · L", r:5, h:"jet", t:"Third leather jacket I've owned and the first that didn't need breaking in for a month. Shoulders sat right out of the box. The hide has already started marking on the elbows in a way I actually like." },
  { n:"Sofia R.", p:"Vesper Moto · Oxblood · S", r:5, h:"oxblood", t:"I ordered a size up from the chart because I always do, then read the measurements properly and swapped to S. It's exact. The oxblood is much deeper in person than on screen." },
  { n:"Tom H.", p:"Ridgeline Racer · Cognac · M", r:5, h:"cognac", t:"Six months in and the colour has moved a lot — much richer around the cuffs and the seat of the back. That's the veg tan doing what they said it would. No cracking anywhere." },
  { n:"Amara D.", p:"Lark Racer · Sand · M", r:4, h:"sand", t:"Lighter than I expected, which is the point I think. Only note is the sand shows marks quickly, so it's not the one for a rainy commute. Beautiful otherwise." },
  { n:"Kenji W.", p:"Northwind B-3 · Tobacco · L", r:5, h:"tobacco", t:"Absurdly warm. I've worn it at −10 with a t-shirt underneath. Heavy on the shoulders for the first week and then you stop noticing. Worth the four-week wait." },
  { n:"Priya N.", p:"Foundry Trucker · Olive · S", r:5, h:"olive", t:"Bought it unlined for summer evenings and it's exactly right. The waist tabs mean it doesn't balloon. The brass has dulled down nicely already." }
];

export const JOURNAL = [
  { slug:"reading-a-leather-label", t:"Full-grain, top-grain, genuine: what the labels mean", k:"Materials", m:"7 min", d:"“Genuine leather” is the lowest grade that can legally be called leather. Here is the actual hierarchy and how to spot each one by eye." },
  { slug:"how-to-measure", t:"How to measure yourself for a leather jacket", k:"Fit", m:"5 min", d:"Four measurements, a tape and a wall. Do this once and you will never guess a size again." },
  { slug:"breaking-in", t:"Breaking in a new hide without wrecking it", k:"Care", m:"6 min", d:"What actually works, what does nothing, and the two things people do that permanently damage a jacket in week one." },
  { slug:"veg-vs-chrome", t:"Veg-tan versus chrome-tan", k:"Materials", m:"8 min", d:"One patinas, one stays put. Neither is better — they are for different jackets and different owners." }
];

export const FAQS = [
  { q:"How should a leather jacket fit?", a:"Close through the shoulder, with the seam sitting on the edge of your shoulder bone rather than hanging over it. You want to fit one thin layer underneath with the zip closed and still raise your arms. Leather stretches across the back and through the sleeve with wear, but it does not stretch in the shoulder — so if the shoulder is tight, size up. Everything else can be taken in." },
  { q:"Which size do I order?", a:"Use the measurement table on each product page, not your usual size letter. Measure a jacket you already own and like, lay it flat, and compare chest width and sleeve length. Our sizing tool takes your chest and height and returns the closest block. If you land between two sizes, take the larger for moto and trucker cuts and the smaller for racer and blazer cuts." },
  { q:"What if it does not fit?", a:"Send it back within 30 days and we cover shipping both ways on the first exchange. The jacket needs to be unworn outside, with tags on. If a second exchange still is not right, we refund in full." },
  { q:"How long does it take to make?", a:"Most jackets take 18 to 22 days on the bench, and the shearling takes 24 to 30. You get a photograph of your actual jacket against its tech pack before it ships. Express shipping is 3–5 working days on top." },
  { q:"How do I look after it?", a:"Less than you think. Hang it on a wide wooden hanger, keep it out of direct sun, and condition it once or twice a year with a neutral cream. Do not machine wash it, do not put it near a radiator to dry, and do not use silicone-based protectors — they seal the grain and stop it breathing." },
  { q:"Is the leather ethically sourced?", a:"All our hides are a by-product of the food industry, sourced from two tanneries we have worked with since 2016 — one LWG Gold rated, one Silver. We publish the tannery audit on request. The shearling is Merino from a certified supplier in Spain." }
];

export const CUTS = [
  ["moto","Moto","Asymmetric zip","oxblood"], ["racer","Café racer","Band collar","cognac"],
  ["bomber","Bomber","Ribbed hem","olive"],   ["trucker","Trucker","Chest flaps","tobacco"],
  ["aviator","Aviator","Shearling","jet"],    ["blazer","Blazer","Notch lapel","slate"]
];

export const SHIPPING = [
  { id:"std", label:"Standard", note:"3–5 working days after making", price:0 },
  { id:"exp", label:"Express",  note:"1–2 working days after making", price:24 }
];
