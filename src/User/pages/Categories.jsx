import { useState } from "react";
import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { C } from "../theme";
import { CATS } from "../data/data";

export default function Categories() {
  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Categories</h2>
          <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>{CATS.length} categories</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <PlusCircle size={14} /> New Category
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(160px,1fr))", gap: 14 }}>
        {CATS.map((c, i) => {
          const [hov, setHov] = useState(false);
          return (
            <div
              key={i}
              onMouseEnter={() => setHov(true)}
              onMouseLeave={() => setHov(false)}
              style={{
                background: c.col, border: `1px solid ${C.bdr}`, borderRadius: 20,
                padding: "20px 16px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12,
                cursor: "pointer", transform: hov ? "translateY(-4px)" : "none",
                boxShadow: hov ? "0 10px 28px rgba(0,0,0,.1)" : "0 2px 8px rgba(0,0,0,.04)",
                transition: "all .2s ease",
              }}
            >
              <span style={{ fontSize: 40 }}>{c.icon}</span>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontWeight: 600, fontSize: 14, color: C.txt }}>{c.name}</p>
                <p style={{ fontSize: 12, color: C.mut, marginTop: 2 }}>{c.count} recipes</p>
              </div>
              <div style={{ display: "flex", gap: 8, opacity: hov ? 1 : 0, transition: "opacity .15s" }}>
                <button style={{ padding: 6, borderRadius: 8, background: "rgba(255,255,255,.7)", border: "none", cursor: "pointer" }}>
                  <Edit size={12} color={C.mut} />
                </button>
                <button style={{ padding: 6, borderRadius: 8, background: "rgba(255,255,255,.7)", border: "none", cursor: "pointer" }}>
                  <Trash2 size={12} color={C.red} />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
