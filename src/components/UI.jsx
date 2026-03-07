import { useState } from "react";
import { Star, Clock, Eye, Heart, Edit, Trash2, Check } from "lucide-react";
import { C } from "../User/theme";

/* ── Badge ─────────────────────────────────────────────────── */
export const Bdg = ({ n, color = C.pri }) =>
  n ? (
    <span
      style={{
        background: color, color: "#fff", fontSize: 10, fontWeight: 700,
        minWidth: 18, lineHeight: 1, padding: "2px 5px",
        borderRadius: 99, textAlign: "center", display: "inline-block",
      }}
    >
      {n}
    </span>
  ) : null;

/* ── Stars ──────────────────────────────────────────────────── */
export const Stars = ({ n }) => (
  <span style={{ display: "flex", gap: 2 }}>
    {[1, 2, 3, 4, 5].map((i) => (
      <Star
        key={i} size={11}
        fill={i <= Math.round(n) ? C.amb : "none"}
        color={i <= Math.round(n) ? C.amb : "#d4c4b0"}
      />
    ))}
  </span>
);

/* ── Difficulty Pill ────────────────────────────────────────── */
export const Pill = ({ d }) => {
  const map = {
    Easy:   [C.grn, C.grnLt],
    Medium: [C.amb, C.ambLt],
    Hard:   [C.red, C.redLt],
  };
  const [col, bg] = map[d] || [C.mut, "#f0ebe3"];
  return (
    <span style={{ color: col, background: bg, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>
      {d}
    </span>
  );
};

/* ── Stat Card ──────────────────────────────────────────────── */
import { ArrowUp, ArrowDown } from "lucide-react";
export const StatCard = ({ icon: Ic, label, value, color, bg, trend, delay = 0 }) => (
  <div
    className="afu rounded-2xl p-5 flex flex-col gap-3"
    style={{
      background: C.card, border: `1px solid ${C.bdr}`,
      boxShadow: "0 2px 12px rgba(0,0,0,.04)", animationDelay: `${delay}ms`,
    }}
  >
    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
      <div style={{ background: bg, borderRadius: 12, padding: 10 }}>
        <Ic size={20} color={color} />
      </div>
      {trend !== undefined && (
        <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 12, fontWeight: 700, color: trend >= 0 ? C.grn : C.red }}>
          {trend >= 0 ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
          {Math.abs(trend)}%
        </span>
      )}
    </div>
    <div>
      <p style={{ fontSize: 24, fontWeight: 700, color: C.txt }}>{value}</p>
      <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>{label}</p>
    </div>
  </div>
);

/* ── Recipe Card ────────────────────────────────────────────── */
export const RecipeCard = ({ r }) => {
  const [hov, setHov] = useState(false);
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20,
        overflow: "hidden", cursor: "pointer",
        boxShadow: hov ? "0 10px 32px rgba(0,0,0,.1)" : "0 2px 12px rgba(0,0,0,.04)",
        transform: hov ? "translateY(-3px)" : "none",
        transition: "all .2s ease",
      }}
    >
      <div
        style={{
          height: 140, display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 48, position: "relative",
          background: `linear-gradient(135deg,${C.priLt},${C.ambLt})`,
        }}
      >
        {r.img}
        {r.featured && (
          <span style={{ position: "absolute", top: 8, left: 8, background: C.pri, color: "#fff", fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>
            Featured
          </span>
        )}
        <div style={{ position: "absolute", top: 8, right: 8, display: "flex", gap: 6 }}>
          <button style={{ padding: 6, borderRadius: "50%", background: "rgba(255,255,255,.85)", border: "none", cursor: "pointer" }}>
            <Heart size={13} color={C.red} />
          </button>
          <button style={{ padding: 6, borderRadius: "50%", background: "rgba(255,255,255,.85)", border: "none", cursor: "pointer" }}>
            <Edit size={13} color={C.mut} />
          </button>
        </div>
      </div>
      <div style={{ padding: 16 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 8 }}>
          <p style={{ fontWeight: 600, fontSize: 14, color: C.txt, lineHeight: 1.35 }}>{r.name}</p>
          <Pill d={r.difficulty} />
        </div>
        <div style={{ display: "flex", gap: 12, fontSize: 12, color: C.mut, marginBottom: 10 }}>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Clock size={11} />{r.time}m</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Eye size={11} />{r.views.toLocaleString()}</span>
          <span style={{ display: "flex", alignItems: "center", gap: 4 }}><Heart size={11} />{r.likes}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <Stars n={r.rating} />
            <span style={{ fontSize: 12, fontWeight: 700, color: C.amb }}>{r.rating}</span>
          </span>
          <span style={{ background: C.priLt, color: C.pri, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 99 }}>
            {r.cat}
          </span>
        </div>
      </div>
    </div>
  );
};
