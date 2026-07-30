import { useState } from "react";
import Reveal from "../lib/Reveal.jsx";

const MAILS = [["General & orders","studio@jactmak.com"],["Sizing help","fit@jactmak.com"],["Trade & wholesale","trade@jactmak.com"]];

export default function Contact() {
  const [f, setF] = useState({ name:"", email:"", topic:"Sizing help", msg:"" });
  const [err, setErr] = useState("");
  const [sent, setSent] = useState(false);
  const set = k => e => { setF(s => ({ ...s, [k]: e.target.value })); setErr(""); };

  const submit = (e) => {
    e.preventDefault();
    if (!f.name.trim()) return setErr("Add your name so we know who is writing.");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]{2,}$/.test(f.email)) return setErr("That email address does not look right.");
    if (!f.msg.trim()) return setErr("Tell us what you need and we will pick it up.");
    setSent(true);
  };

  return (
    <section className="sec"><div className="wrap"><div className="split">
      <div>
        <Reveal y={0}><p className="eyeb">Contact</p></Reveal>
        <Reveal><h1 className="d t-xl mt16">Talk to the studio</h1></Reveal>
        <Reveal delay={.06}><p className="lede mt16">
          Monday to Friday, 9–6 CET. Sizing questions get answered fastest if you send your chest and shoulder measurements.
        </p></Reveal>
        <div className="mt32" style={{ display:"grid", gap:20 }}>
          {MAILS.map(([t,e]) => (
            <Reveal key={e}><div><p className="mono muted">{t}</p>
              <p className="mt8"><a className="lnk" href={`mailto:${e}`}>{e}</a></p></div></Reveal>
          ))}
        </div>
      </div>
      <Reveal>
        {sent ? (
          <div className="panel"><div className="empty" style={{ padding:18 }}>
            <span className="tag ok">Sent</span>
            <h2 className="d t-lg">Message received</h2>
            <p className="muted">We will reply to {f.email} within one working day.</p>
          </div></div>
        ) : (
          <form className="panel stack g16" onSubmit={submit} noValidate>
            <label className="field"><span>Name</span>
              <input className="inp" value={f.name} onChange={set("name")} placeholder="Alex Morgan" autoComplete="name" /></label>
            <label className="field"><span>Email</span>
              <input className="inp" type="email" value={f.email} onChange={set("email")} placeholder="you@example.com" autoComplete="email" /></label>
            <label className="field"><span>Subject</span>
              <select className="inp" value={f.topic} onChange={set("topic")}>
                {["Sizing help","An order","Exchange or return","Something else"].map(o => <option key={o}>{o}</option>)}
              </select></label>
            <label className="field"><span>Message</span>
              <textarea className="inp" value={f.msg} onChange={set("msg")} placeholder="Chest and shoulder measurements help us answer faster…" /></label>
            {err && <p className="err" role="alert">{err}</p>}
            <button className="btn block" type="submit">Send</button>
          </form>
        )}
      </Reveal>
    </div></div></section>
  );
}
