import { useId } from "react";
import { HIDES, METALS } from "../data/products.js";

/* ─────────────────────────────────────────────────────────
   TECHNICAL FLAT
   Draws each jacket the way a factory tech pack draws it:
   front elevation, panel seams, stitch lines, hardware.
   mode "render" → grained hide   |   mode "spec" → blueprint
   Original artwork — free of any third-party rights.
   ───────────────────────────────────────────────────────── */

const CUT = {
  moto:    { hem:424, rib:0, collar:"lapel",  close:"asym",    pockets:"motoZip", belt:1 },
  racer:   { hem:418, rib:0, collar:"band",   close:"centre",  pockets:"slash",   belt:0 },
  bomber:  { hem:400, rib:1, collar:"rib",    close:"centre",  pockets:"welt",    belt:0 },
  trucker: { hem:410, rib:0, collar:"shirt",  close:"placket", pockets:"flap",    belt:0 },
  aviator: { hem:434, rib:0, collar:"shear",  close:"centre",  pockets:"welt",    belt:1 },
  blazer:  { hem:452, rib:0, collar:"notch",  close:"button",  pockets:"flap",    belt:0 }
};

function shade(hex, pct) {
  const n = parseInt(hex.slice(1), 16);
  const f = v => Math.max(0, Math.min(255, Math.round(v + (pct > 0 ? 255 - v : v) * (pct / 100))));
  return "#" + [(n >> 16) & 255, (n >> 8) & 255, n & 255].map(f).map(v => v.toString(16).padStart(2, "0")).join("");
}

export default function JacketFlat({ product, hide = "jet", mode = "render" }) {
  const uid = useId().replace(/[:]/g, "");
  const c = CUT[product.cut] || CUT.racer;
  const H = HIDES[hide] || HIDES.jet;
  const metal = METALS[product.metal].hex;
  const spec = mode === "spec";
  const hem = c.hem, ribTop = hem - 26;
  const wIn = product.gender === "women" ? 8 : 0;
  const wA  = product.gender === "women" ? 11 : 4;
  const L = 92 + wIn,  R = 308 - wIn;
  const uL = 112 + wIn, uR = 288 - wIn;
  const bL = 110 + wIn + wA, bR = 290 - wIn - wA;
  const hL = 108 + wIn, hR = 292 - wIn;
  const hy = c.rib ? ribTop : hem;

  const line = spec ? "#9DB0BC" : "rgba(255,255,255,.30)";
  const fill = v => (spec ? "none" : v);
  const g = n => `url(#${n}${uid})`;

  const body = `M170,94 L${L},114 C${L+14},148 ${uL-6},174 ${uL},202 L${bL},312 L${hL},${hy} L${hR},${hy} L${bR},312 L${uR},202 C${uR+6},174 ${R-14},148 ${R},114 L230,94 Z`;
  const slL  = `M${L},114 C${L-24},140 ${L-42},168 ${L-48},202 L${L-58},338 L${L+4},352 L${uL-6},264 L${uL},202 Z`;
  const slR  = `M${R},114 C${R+24},140 ${R+42},168 ${R+48},202 L${R+58},338 L${R-4},352 L${uR+6},264 L${uR},202 Z`;

  /* collar */
  let collar = null;
  if (c.collar === "lapel") collar = (<>
    <path d={`M170,94 L${L},114 L${L+54},190 L196,126 Z`} fill={fill(g("c"))} stroke={line} strokeWidth="1" />
    <path d={`M230,94 L${R},114 L${R-54},190 L204,126 Z`} fill={fill(g("c"))} stroke={line} strokeWidth="1" /></>);
  else if (c.collar === "notch") collar = (<>
    <path d={`M170,94 L${L+10},118 L${L+44},182 L198,130 Z`} fill={fill(g("c"))} stroke={line} strokeWidth="1" />
    <path d={`M230,94 L${R-10},118 L${R-44},182 L202,130 Z`} fill={fill(g("c"))} stroke={line} strokeWidth="1" /></>);
  else if (c.collar === "band")
    collar = <rect x="164" y="84" width="72" height="26" rx="4" fill={fill(g("c"))} stroke={line} strokeWidth="1" />;
  else if (c.collar === "rib") collar = (<>
    <rect x="162" y="80" width="76" height="28" rx="5" fill={fill(g("r"))} stroke={line} strokeWidth="1" />
    {!spec && Array.from({ length: 9 }, (_, i) =>
      <line key={i} x1={170 + i * 8} y1="84" x2={170 + i * 8} y2="105" stroke="rgba(0,0,0,.26)" strokeWidth="1.4" />)}</>);
  else if (c.collar === "shirt") collar = (<>
    <path d="M170,92 L140,106 L178,144 L200,114 Z" fill={fill(g("c"))} stroke={line} strokeWidth="1" />
    <path d="M230,92 L260,106 L222,144 L200,114 Z" fill={fill(g("c"))} stroke={line} strokeWidth="1" /></>);
  else if (c.collar === "shear") {
    const w = Array.from({ length: 16 }, (_, i) => `${150 + i * 6.5},${i % 2 ? 74 : 84}`).join(" ");
    collar = (<>
      <path d={`M148,110 L${w} L252,110 L236,150 L164,150 Z`} fill={fill("#C6B49A")} stroke={line} strokeWidth="1" />
      <path d="M156,150 L244,150 L238,166 L162,166 Z" fill={fill("#C6B49A")} stroke={line} strokeWidth="1" /></>);
  }

  const zip = (x1, y1, x2, y2, k) => spec ? null : (
    <g key={k}>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={metal} strokeWidth="4.5" strokeLinecap="round" opacity=".92" />
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(0,0,0,.4)" strokeWidth="4.5" strokeDasharray="1.4 3" />
    </g>);

  /* closure */
  let close = null;
  if (c.close === "asym") close = (<>
    <path d={`M238,102 L216,190 L214,${hem}`} fill="none" stroke={line} strokeWidth="1.2" />
    {zip(238,106,216,190,"a")}{zip(216,190,214,hem-6,"b")}
    {!spec && <rect x="208" y={hem-24} width="13" height="19" rx="2.5" fill={metal} />}</>);
  else if (c.close === "centre") close = (<>
    <line x1="200" y1={c.collar==="rib"?110:116} x2="200" y2={hy} stroke={line} strokeWidth="1.2" />
    {zip(200, c.collar==="rib"?112:118, 200, hy-6, "c")}
    {!spec && <rect x="194" y={hy-26} width="12" height="18" rx="2.5" fill={metal} />}</>);
  else if (c.close === "placket") close = (<>
    <rect x="186" y="116" width="28" height={hem-116} fill={fill(g("c"))} stroke={line} strokeWidth="1" />
    {!spec && [0,1,2,3,4].map(i => (<g key={i}>
      <circle cx="200" cy={142 + i*((hem-160)/4)} r="5" fill={metal} />
      <circle cx="200" cy={142 + i*((hem-160)/4)} r="2" fill="rgba(0,0,0,.35)" /></g>))}</>);
  else if (c.close === "button") close = (<>
    <path d={`M198,128 L196,${hem}`} fill="none" stroke={line} strokeWidth="1.2" />
    {!spec && [0,1].map(i => <circle key={i} cx="212" cy={300 + i*46} r="6" fill={metal} />)}</>);

  /* pockets */
  let pk = null;
  if (c.pockets === "motoZip") pk = (<>
    <path d={`M${bL+16},300 L${bL+62},278`} stroke={spec?line:metal} strokeWidth="3.5" strokeLinecap="round" />
    <path d={`M${bR-16},300 L${bR-62},278`} stroke={spec?line:metal} strokeWidth="3.5" strokeLinecap="round" />
    <path d={`M${uL+20},210 L${uL+58},202`} stroke={spec?line:metal} strokeWidth="3" strokeLinecap="round" /></>);
  else if (c.pockets === "slash") pk = (<>
    <path d={`M${bL+14},296 L${bL+54},284`} stroke={line} strokeWidth="1.4" />
    <path d={`M${bR-14},296 L${bR-54},284`} stroke={line} strokeWidth="1.4" /></>);
  else if (c.pockets === "welt") pk = (<>
    <rect x={bL+14} y="286" width="46" height="7" rx="2" fill={fill("rgba(0,0,0,.3)")} stroke={line} strokeWidth="1" />
    <rect x={bR-60} y="286" width="46" height="7" rx="2" fill={fill("rgba(0,0,0,.3)")} stroke={line} strokeWidth="1" /></>);
  else if (c.pockets === "flap") pk = (<>
    <rect x={uL+14} y="200" width="44" height="34" rx="2" fill={fill(g("c"))} stroke={line} strokeWidth="1" />
    <rect x={uR-58} y="200" width="44" height="34" rx="2" fill={fill(g("c"))} stroke={line} strokeWidth="1" />
    {!spec && <><circle cx={uL+36} cy="230" r="3.4" fill={metal} /><circle cx={uR-36} cy="230" r="3.4" fill={metal} /></>}</>);

  const ribs = c.rib ? (<>
    <rect x={hL-2} y={ribTop} width={hR-hL+4} height="26" rx="3" fill={fill(g("r"))} stroke={line} strokeWidth="1" />
    {!spec && Array.from({length:22},(_,i)=>
      <line key={i} x1={hL+i*((hR-hL)/21)} y1={ribTop+3} x2={hL+i*((hR-hL)/21)} y2={ribTop+23} stroke="rgba(0,0,0,.24)" strokeWidth="1.4" />)}
    <rect x={L-60} y="332" width="64" height="22" rx="3" fill={fill(g("r"))} stroke={line} strokeWidth="1" />
    <rect x={R-4}  y="332" width="64" height="22" rx="3" fill={fill(g("r"))} stroke={line} strokeWidth="1" /></>) : null;

  const belt = c.belt ? (<>
    <rect x={bL-2} y="334" width={bR-bL+4} height="16" rx="2" fill={fill(g("c"))} stroke={line} strokeWidth="1" />
    {!spec && <rect x={bR-48} y="331" width="20" height="22" rx="2" fill="none" stroke={metal} strokeWidth="2.6" />}</>) : null;

  const stitch = spec ? null : (<g fill="none" stroke="rgba(255,255,255,.26)" strokeWidth="1" strokeDasharray="3 3.4">
    <path d={`M${uL+9},206 L${bL+7},312`} /><path d={`M${uR-9},206 L${bR-7},312`} />
    <path d={`M${L+4},118 C${L+16},150 ${uL-2},176 ${uL+3},202`} />
    <path d={`M${R-4},118 C${R-16},150 ${uR+2},176 ${uR-3},202`} />
    <path d={`M${hL+4},${hy-5} L${hR-4},${hy-5}`} stroke="rgba(255,255,255,.2)" /></g>);

  const dim = spec ? (
    <g fontFamily="Azeret Mono, monospace" fontSize="9" fill="#9DB0BC" letterSpacing="1">
      <line x1={L} y1="70" x2={R} y2="70" stroke="#9DB0BC" strokeWidth=".8" />
      <line x1={L} y1="64" x2={L} y2="76" stroke="#9DB0BC" strokeWidth=".8" />
      <line x1={R} y1="64" x2={R} y2="76" stroke="#9DB0BC" strokeWidth=".8" />
      <text x="200" y="60" textAnchor="middle">SHOULDER</text>
      <line x1={hR+26} y1="114" x2={hR+26} y2={hem} stroke="#9DB0BC" strokeWidth=".8" />
      <line x1={hR+20} y1="114" x2={hR+32} y2="114" stroke="#9DB0BC" strokeWidth=".8" />
      <line x1={hR+20} y1={hem} x2={hR+32} y2={hem} stroke="#9DB0BC" strokeWidth=".8" />
      <text x={hR+38} y={(114+hem)/2} dominantBaseline="middle">LENGTH</text>
      <line x1={uL} y1="248" x2={uR} y2="248" stroke="#9DB0BC" strokeWidth=".8" strokeDasharray="4 3" />
      <text x="200" y="242" textAnchor="middle">CHEST</text>
      <line x1={L-40} y1={hem+22} x2={R+40} y2={hem+22} stroke="#3A302B" strokeWidth="1" />
      <text x={L-40} y={hem+38}>{product.panels} PANELS</text>
      <text x={R+40} y={hem+38} textAnchor="end">{product.cut.toUpperCase()} BLOCK</text>
    </g>) : null;

  return (
    <svg viewBox={`0 0 400 ${hem+56}`} role="img"
         aria-label={`${product.name}, ${H.n}, technical front view`}>
      <defs>
        <linearGradient id={`b${uid}`} x1="18%" y1="4%" x2="82%" y2="96%">
          <stop offset="0" stopColor={shade(H.hex,26)} /><stop offset=".42" stopColor={H.hex} /><stop offset="1" stopColor={shade(H.hex,-30)} />
        </linearGradient>
        <linearGradient id={`c${uid}`} x1="10%" y1="0%" x2="90%" y2="100%">
          <stop offset="0" stopColor={shade(H.hex,14)} /><stop offset="1" stopColor={shade(H.hex,-20)} />
        </linearGradient>
        <linearGradient id={`s${uid}`} x1="0%" y1="0%" x2="100%" y2="70%">
          <stop offset="0" stopColor={shade(H.hex,8)} /><stop offset="1" stopColor={shade(H.hex,-38)} />
        </linearGradient>
        <linearGradient id={`r${uid}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0" stopColor={shade(H.hex,-14)} /><stop offset="1" stopColor={shade(H.hex,-40)} />
        </linearGradient>
        <radialGradient id={`h${uid}`} cx="38%" cy="26%" r="58%">
          <stop offset="0" stopColor="#fff" stopOpacity=".17" /><stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <path d={slL}  fill={fill(g("s"))} stroke={line} strokeWidth="1.2" />
      <path d={slR}  fill={fill(g("s"))} stroke={line} strokeWidth="1.2" />
      <path d={body} fill={fill(g("b"))} stroke={line} strokeWidth="1.2" />
      {!spec && <ellipse cx="182" cy="200" rx="112" ry="104" fill={g("h")} />}
      {ribs}{belt}{pk}{stitch}{close}{collar}{dim}
    </svg>
  );
}
