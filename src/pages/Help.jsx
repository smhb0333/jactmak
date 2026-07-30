import { Link } from "react-router-dom";
import Reveal from "../lib/Reveal.jsx";
import Accordion from "../components/Accordion.jsx";
import { FAQS } from "../data/content.js";

export default function Help() {
  return (
    <section className="sec"><div className="wrap narrow">
      <nav className="crumbs"><Link to="/">Home</Link><span>/</span><span>Help</span></nav>
      <Reveal><h1 className="d t-xl">Help centre</h1></Reveal>
      <Reveal delay={.06}><p className="lede mt16">
        If it is not answered here, email <Link to="/contact" className="lnk">studio@jactmak.com</Link> —
        a person replies within one working day.
      </p></Reveal>
      <div className="mt48">{FAQS.map(f => <Accordion key={f.q} title={f.q}><p>{f.a}</p></Accordion>)}</div>
    </div></section>
  );
}
