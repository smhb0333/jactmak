import { motion } from "framer-motion";
import Reveal, { Stagger, item } from "../lib/Reveal.jsx";
import { JOURNAL } from "../data/content.js";

export default function Journal() {
  const all = [...JOURNAL, ...JOURNAL.slice(0,2)];
  return (
    <section className="sec"><div className="wrap">
      <Reveal y={0}><p className="eyeb">Journal</p></Reveal>
      <Reveal><h1 className="d t-xl mt16">Read before you buy</h1></Reveal>
      <Reveal delay={.06}><p className="lede mt16">
        Material, fit and care. Written because customers kept asking the same six questions.
      </p></Reveal>
      <Stagger className="mt48" style={{ display:"grid", gap:"clamp(12px,1.8vw,22px)", gridTemplateColumns:"repeat(auto-fit,minmax(250px,1fr))" }}>
        {all.map((j,i) => (
          <motion.article className="panel stack" key={j.slug + i} variants={item} style={{ gap:12, minHeight:240 }}>
            <span className="mono brass">{j.k} · {j.m}</span>
            <h2 className="d2" style={{ fontSize:"1.2rem", lineHeight:1.05 }}>{j.t}</h2>
            <p className="pcard-s">{j.d}</p>
            <span className="lnk" style={{ marginTop:"auto", alignSelf:"flex-start" }}>Read</span>
          </motion.article>))}
      </Stagger>
    </div></section>
  );
}
