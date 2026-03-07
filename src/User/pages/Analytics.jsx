import { useState } from "react";
import { Eye, Heart, Star, Users } from "lucide-react";
import { C } from "../theme";
import { RECIPES } from "../data/data";
import { StatCard } from "../../components/UI";

export default function Analytics() {
  const bars = RECIPES.map((r) => ({ ...r, h: Math.round((r.views / 3120) * 100) }));

  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Recipe Analytics</h2>
        <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>Performance overview</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
        {[
          { icon: Eye,   label: "Total Views",  value: "98.4K", color: C.pri, bg: C.priLt, trend: 15 },
          { icon: Heart, label: "Total Likes",  value: "1,010", color: C.red, bg: C.redLt, trend: 8  },
          { icon: Star,  label: "Avg Rating",   value: "4.72",  color: C.amb, bg: C.ambLt, trend: 3  },
          { icon: Users, label: "Recipe Saves", value: "5,240", color: C.grn, bg: C.grnLt, trend: 22 },
        ].map((s, i) => <StatCard key={i} {...s} delay={i * 60} />)}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Bar Chart */}
        <div style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.txt, marginBottom: 20 }}>Views by Recipe</h3>
          <div style={{ display: "flex", alignItems: "flex-end", gap: 10, height: 160 }}>
            {bars.map((r, i) => {
              const [hov, setHov] = useState(false);
              return (
                <div
                  key={i}
                  onMouseEnter={() => setHov(true)}
                  onMouseLeave={() => setHov(false)}
                  style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6, cursor: "pointer" }}
                >
                  <span style={{ fontSize: 11, fontWeight: 700, color: C.pri, opacity: hov ? 1 : 0, transition: "opacity .15s" }}>{r.views}</span>
                  <div
                    className="gbr"
                    style={{ "--tw": "100%", width: "100%", borderRadius: "6px 6px 0 0", height: `${r.h}%`, background: `linear-gradient(to top,${C.pri},${C.priMd})`, opacity: hov ? 0.8 : 1, transition: "opacity .15s" }}
                  />
                  <span style={{ fontSize: 16 }}>{r.img}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Rating Leaderboard */}
        <div style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
          <h3 style={{ fontSize: 15, fontWeight: 600, color: C.txt, marginBottom: 18 }}>Top Recipes by Rating</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {[...RECIPES].sort((a, b) => b.rating - a.rating).map((r, i) => (
              <div key={r.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 18, width: 26, textAlign: "center" }}>
                  {["🥇", "🥈", "🥉", "4️⃣", "5️⃣", "6️⃣"][i]}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: C.txt, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{r.name}</p>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 4 }}>
                    <div style={{ flex: 1, height: 6, borderRadius: 99, background: C.bdr, overflow: "hidden" }}>
                      <div className="gbr" style={{ "--tw": `${(r.rating / 5) * 100}%`, height: "100%", borderRadius: 99, background: C.amb }} />
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: C.amb }}>{r.rating}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
