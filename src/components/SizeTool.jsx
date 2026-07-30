import { useState } from "react";
import { MSIZES, WSIZES, MFIT, WFIT } from "../data/products.js";

export default function SizeTool() {
  const [g, setG] = useState("men");
  const [chest, setChest] = useState(40);
  const [height, setHeight] = useState(178);

  const SZ = g === "women" ? WSIZES : MSIZES;
  const TB = g === "women" ? WFIT : MFIT;

  let best = SZ[0], diff = Infinity;
  SZ.forEach(s => { const d = Math.abs(TB[s][0] + 2 - chest); if (d < diff) { diff = d; best = s; } });
  const tall = height > 186 && SZ.indexOf(best) < SZ.length - 1;
  const m = TB[best];

  const swap = (next) => { setG(next); setChest(next === "women" ? 35 : 40); };

  return (
    <>
      <p className="eyeb">Find your block</p>
      <div className="row g8 mt16" role="group" aria-label="Fit block">
        <button className="chip" aria-pressed={g === "men"}   onClick={() => swap("men")}>Men's</button>
        <button className="chip" aria-pressed={g === "women"} onClick={() => swap("women")}>Women's</button>
      </div>

      <label className="field mt24">
        <span>Chest — <b className="num brass">{chest}"</b></span>
        <input type="range" min={g === "women" ? 28 : 32} max={g === "women" ? 46 : 52} step="1"
               value={chest} onChange={e => setChest(+e.target.value)} />
      </label>
      <label className="field mt16">
        <span>Height — <b className="num brass">{height} cm</b></span>
        <input type="range" min="150" max="200" step="1"
               value={height} onChange={e => setHeight(+e.target.value)} />
      </label>

      <div className="panel flat mt24" style={{ borderColor: "var(--brass)" }}>
        <div className="row" style={{ justifyContent: "space-between", alignItems: "flex-end", gap: 14 }}>
          <div>
            <p className="mono muted">Recommended</p>
            <p className="d" style={{ fontSize: "clamp(2.4rem,7vw,3.6rem)", marginTop: 4 }}>{best}</p>
          </div>
          <p className="mono steel" style={{ textAlign: "right", maxWidth: "17ch", lineHeight: 1.6 }}>
            {tall ? "Sleeve runs short at your height — consider the next size up"
                  : "Standard block fits your measurements"}
          </p>
        </div>
        <table className="spec mt16"><tbody>
          <tr><th>Chest (flat)</th><td>{m[0]}"</td></tr>
          <tr><th>Shoulder</th><td>{m[1]}"</td></tr>
          <tr><th>Sleeve</th><td>{m[2]}"</td></tr>
          <tr><th>Back length</th><td>{m[3]}"</td></tr>
        </tbody></table>
      </div>
      <p className="mono muted mt16" style={{ lineHeight: 1.7 }}>
        Measured flat, garment not body. Allow 2" ease over your chest for a moto or trucker, 1" for a racer or blazer.
      </p>
    </>
  );
}
