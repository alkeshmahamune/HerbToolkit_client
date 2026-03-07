import { BookOpen, Heart, Users, TrendingUp } from "lucide-react";
import { C } from "../theme";
import { RECIPES, CATS, NOTIFS } from "../data/data";
import { StatCard, RecipeCard } from "../../components/UI";

export default function Dashboard() {
  const stats = [
    { icon: BookOpen,   label: "Total Recipes",   value: "247",   color: C.pri, bg: C.priLt, trend: 12 },
    { icon: Heart,      label: "Total Favorites", value: "1,830", color: C.red, bg: C.redLt, trend: 8  },
    { icon: Users,      label: "Active Users",    value: "5,240", color: C.grn, bg: C.grnLt, trend: 22 },
    { icon: TrendingUp, label: "Total Views",     value: "98.4K", color: C.amb, bg: C.ambLt, trend: 15 },
  ];

  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 28 }}>
      {/* Hero Banner */}
      <div
        style={{
          borderRadius: 20, padding: "24px 28px",
          background: `linear-gradient(135deg,${C.pri},#c94e18)`,
          boxShadow: `0 8px 32px ${C.pri}50`,
          display: "flex", alignItems: "center", gap: 20, flexWrap: "wrap",
        }}
      >
        <span style={{ fontSize: 48 }}>👨‍🍳</span>
        <div style={{ flex: 1, minWidth: 200 }}>
          <h2 className="fd" style={{ color: "#fff", fontSize: 22, fontWeight: 700 }}>
            Good morning, Chef Alex!
          </h2>
          <p style={{ color: "rgba(255,235,220,.9)", fontSize: 13, marginTop: 4 }}>
            You have 3 new comments and 2 featured recipes today.
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ background: "rgba(255,255,255,.2)", color: "#fff", border: "none", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            View Activity
          </button>
          <button style={{ background: "#fff", color: C.pri, border: "none", borderRadius: 12, padding: "8px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            Add Recipe
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))", gap: 16 }}>
        {stats.map((s, i) => <StatCard key={i} {...s} delay={i * 60} />)}
      </div>

      {/* Featured Recipes + Activity */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 24, alignItems: "start" }}>
        <div>
          <h3 className="fd" style={{ fontSize: 18, fontWeight: 600, color: C.txt, marginBottom: 16 }}>
            Featured Recipes
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(200px,1fr))", gap: 14 }}>
            {RECIPES.filter((r) => r.featured).map((r) => <RecipeCard key={r.id} r={r} />)}
          </div>
        </div>

        <div>
          <h3 className="fd" style={{ fontSize: 18, fontWeight: 600, color: C.txt, marginBottom: 16 }}>
            Recent Activity
          </h3>
          <div style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, padding: 12, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
            {NOTIFS.slice(0, 5).map((n) => (
              <div
                key={n.id}
                style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: 8, borderRadius: 12, cursor: "pointer", marginBottom: 2 }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <div style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0, background: n.type === "like" ? C.redLt : n.type === "comment" ? C.grnLt : C.priLt }}>
                  {n.type === "like" ? "❤️" : n.type === "comment" ? "💬" : "⭐"}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ fontSize: 12, fontWeight: 500, color: C.txt, lineHeight: 1.4 }}>{n.text}</p>
                  <p style={{ fontSize: 11, color: C.mut, marginTop: 2 }}>{n.time}</p>
                </div>
                {!n.read && <div className="apu" style={{ width: 8, height: 8, borderRadius: "50%", background: C.pri, flexShrink: 0, marginTop: 6 }} />}
              </div>
            ))}
          </div>

          <h3 className="fd" style={{ fontSize: 18, fontWeight: 600, color: C.txt, margin: "20px 0 14px" }}>
            Top Categories
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {CATS.slice(0, 4).map((c) => {
              const pct = Math.round((c.count / 40) * 100);
              return (
                <div key={c.name} style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 16, padding: "12px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ fontSize: 22 }}>{c.icon}</span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                      <span style={{ fontWeight: 600, color: C.txt }}>{c.name}</span>
                      <span style={{ color: C.mut }}>{c.count}</span>
                    </div>
                    <div style={{ height: 6, borderRadius: 99, background: C.bdr, overflow: "hidden" }}>
                      <div className="gbr" style={{ "--tw": `${pct}%`, height: "100%", borderRadius: 99, background: C.pri }} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
