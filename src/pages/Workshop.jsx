import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Reveal, { Stagger, item } from "../lib/Reveal.jsx";
import Accordion from "../components/Accordion.jsx";
import { HIDES } from "../data/products.js";
import { PROCESS, FAQS } from "../data/content.js";

const HIDESHOW = [
  ["cognac","Veg-tanned","Darkens with light and wear"],
  ["jet","Chrome-tanned","Holds colour, softer hand"],
  ["tobacco","Waxed steerhide","Patinas fast at the elbow"],
  ["sand","Napa lambskin","0.8 mm, drapes like cloth"]
];
const STATS = [["2016","Year one","First bench, two makers"],["12","Blocks","Graded, not scaled"],
               ["2","Tanneries","LWG Gold and Silver"],["30","Day guarantee","Fit, no questions"]];

export default function Workshop() {
  return (<>
    <section className="sec"><div className="wrap">
      <Reveal y={0}><p className="eyeb">The workshop</p></Reveal>
      <Reveal><h1 className="d t-hero mt16" style={{ maxWidth:"13ch" }}>One maker.<br /><span className="out">One piece.</span></h1></Reveal>
      <Reveal delay={.2}><p className="lede mt24" style={{ fontSize:"var(--t-md)" }}>
        We do not run a line. Every jacket, bag, shoe and small piece is assigned to one maker who cuts it, sews it, sets the hardware and signs the
        label. It is slower and it costs more, and it is the only way we have found to keep the standard from drifting.
      </p></Reveal>
    </div></section>

    <section className="sec top-line"><div className="wrap">
      <Stagger style={{ display:"grid", gap:"clamp(10px,1.4vw,16px)", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))" }}>
        {HIDESHOW.map(([h,t,s]) => (
          <motion.div className="hpanel grain" key={t} variants={item} style={{ "--hd": HIDES[h].hex }}>
            <span className="stitch" /><b>{t}</b><span>{s}</span>
          </motion.div>
        ))}
      </Stagger>
    </div></section>

    <section className="sec top-line"><div className="wrap">
      <Reveal><h2 className="d t-xl">Four stages, one bench</h2></Reveal>
      <Stagger className="steps four mt48">
        {PROCESS.map(s => (
          <motion.div className="step" key={s.n} variants={item}>
            <span className="n">{s.n}</span><h3>{s.t}</h3>
            <p className="lede" style={{ fontSize:"var(--t-sm)" }}>{s.d}</p>
          </motion.div>))}
      </Stagger>
      <Stagger className="mt48" style={{ display:"grid", gap:"clamp(12px,1.6vw,20px)", gridTemplateColumns:"repeat(auto-fit,minmax(180px,1fr))" }}>
        {STATS.map(([n,t,d]) => (
          <motion.div className="panel" key={t} variants={item}>
            <b className="d" style={{ fontSize:"clamp(1.9rem,4vw,2.8rem)", display:"block" }}>{n}</b>
            <p className="mono brass mt8">{t}</p><p className="pcard-s mt8">{d}</p>
          </motion.div>))}
      </Stagger>
    </div></section>

    <section className="sec top-line"><div className="wrap">
      <Reveal><h2 className="d t-lg">Common questions</h2></Reveal>
      <div className="mt32">{FAQS.slice(0,4).map(f => <Accordion key={f.q} title={f.q}><p>{f.a}</p></Accordion>)}</div>
      <Link to="/help" className="lnk mt32" style={{ display:"inline-flex" }}>Full help centre</Link>
    </div></section>
  </>);
}
