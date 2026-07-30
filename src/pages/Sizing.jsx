import { Link } from "react-router-dom";
import Reveal from "../lib/Reveal.jsx";
import SizeTool from "../components/SizeTool.jsx";
import { MSIZES, WSIZES, MFIT, WFIT } from "../data/products.js";

const HOW = [
  ["Chest","Tape around the fullest part, under the arms, with your arms down. Keep the tape level at the back. Do not pull tight."],
  ["Shoulder","From the bony point of one shoulder, straight across the back, to the other. Easier with a second person."],
  ["Sleeve","From the shoulder point, down the outside of a slightly bent arm, to the wrist bone."],
  ["Back length","From the bone at the base of your neck straight down to where you want the hem to sit."]
];

export default function Sizing() {
  return (
    <section className="sec"><div className="wrap">
      <nav className="crumbs"><Link to="/">Home</Link><span>/</span><span>Sizing</span></nav>
      <Reveal><h1 className="d t-xl">Get the shoulder right</h1></Reveal>
      <Reveal delay={.06}><p className="lede mt16">
        Leather stretches across the back and through the sleeve with wear. It does not stretch in the shoulder.
        Everything below assumes you measure that first.
      </p></Reveal>

      <div className="split mt48">
        <div>
          <Reveal><h2 className="d2 t-lg">How to measure</h2></Reveal>
          <div className="steps mt32">
            {HOW.map(([t,d]) => (
              <Reveal key={t}><div className="step"><h3>{t}</h3>
                <p className="lede" style={{ fontSize:"var(--t-sm)" }}>{d}</p></div></Reveal>
            ))}
          </div>
          <Reveal><div className="panel mt32">
            <p className="eyeb">Faster method</p>
            <p className="lede mt16" style={{ fontSize:"var(--t-sm)" }}>
              Take a jacket you already own and like the fit of. Lay it flat, buttoned, and measure armpit to armpit,
              then double it. Compare that number to the chest column in our tables — it will get you closer than
              measuring your body.
            </p>
          </div></Reveal>
        </div>
        <Reveal><div className="panel" style={{ position:"sticky", top:"calc(var(--hdr) + 18px)" }}><SizeTool /></div></Reveal>
      </div>

      <Reveal><h2 className="d2 t-lg mt48">Full tables</h2></Reveal>
      <div className="mt24" style={{ display:"grid", gap:"clamp(14px,2vw,26px)", gridTemplateColumns:"repeat(auto-fit,minmax(290px,1fr))" }}>
        {[["Men's block", MSIZES, MFIT], ["Women's block", WSIZES, WFIT]].map(([t, SZ, F]) => (
          <Reveal key={t}><div className="panel">
            <p className="eyeb">{t}</p>
            <div className="tscroll mt16"><table className="spec">
              <thead><tr><th>Size</th><td>Chest</td><td>Shldr</td><td>Sleeve</td><td>Length</td></tr></thead>
              <tbody>{SZ.map(s => <tr key={s}><th>{s}</th>{F[s].map((v,i) => <td key={i}>{v}"</td>)}</tr>)}</tbody>
            </table></div>
          </div></Reveal>
        ))}
      </div>
    </div></section>
  );
}
