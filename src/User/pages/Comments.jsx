import { useState } from "react";
import { MoreHorizontal } from "lucide-react";
import { C } from "../theme";
import { COMMENTS_DATA } from "../data/data";
import { Stars } from "../../components/UI";

export default function Comments() {
  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Comments & Reviews</h2>
        <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>{COMMENTS_DATA.length} recent comments</p>
      </div>

      {COMMENTS_DATA.map((c, i) => (
        <div
          key={i}
          style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, padding: 20, boxShadow: "0 2px 8px rgba(0,0,0,.04)", display: "flex", gap: 14, alignItems: "flex-start" }}
        >
          <div style={{ width: 42, height: 42, borderRadius: "50%", background: `linear-gradient(135deg,${C.pri},#c94e18)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15, flexShrink: 0 }}>
            {c.av}
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
              <span style={{ fontWeight: 600, fontSize: 14, color: C.txt }}>{c.user}</span>
              <span style={{ background: C.priLt, color: C.pri, fontSize: 11, fontWeight: 600, padding: "1px 8px", borderRadius: 99 }}>
                on {c.recipe}
              </span>
              <span style={{ fontSize: 11, color: C.mut }}>{c.time}</span>
            </div>
            <Stars n={c.rating} />
            <p style={{ fontSize: 13, color: C.mut, marginTop: 8, lineHeight: 1.6 }}>{c.text}</p>
          </div>
          <button
            style={{ padding: 6, borderRadius: 10, border: "none", background: "transparent", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.bdr)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <MoreHorizontal size={16} color={C.mut} />
          </button>
        </div>
      ))}
    </div>
  );
}
