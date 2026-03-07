import { ShoppingCart } from "lucide-react";
import { C } from "../theme";
import { WEEK, MEAL_PLAN } from "../data/data";

export default function MealPlanner() {
  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Meal Planner</h2>
          <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>Week of March 3–9, 2026</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <ShoppingCart size={14} /> Generate Shopping List
        </button>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, overflow: "auto", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "100px repeat(7,1fr)", minWidth: 700 }}>
          {/* Header row */}
          <div style={{ padding: "12px 14px", background: C.bg, borderBottom: `1px solid ${C.bdr}`, fontSize: 11, fontWeight: 700, color: C.mut, textTransform: "uppercase" }}>
            Meal
          </div>
          {WEEK.map((d) => (
            <div key={d} style={{ padding: "12px 14px", background: C.bg, borderBottom: `1px solid ${C.bdr}`, textAlign: "center", fontSize: 13, fontWeight: 700, color: C.txt }}>
              {d}
            </div>
          ))}

          {/* Meal rows */}
          {["breakfast", "lunch", "dinner"].map((meal) => (
            <>
              <div key={meal + "lbl"} style={{ padding: 14, display: "flex", alignItems: "center", borderBottom: `1px solid ${C.bdr}` }}>
                <span style={{
                  fontSize: 11, fontWeight: 700, textTransform: "capitalize", padding: "3px 8px", borderRadius: 99,
                  background: meal === "breakfast" ? C.ambLt : meal === "lunch" ? C.grnLt : C.priLt,
                  color:      meal === "breakfast" ? C.amb   : meal === "lunch" ? C.grn   : C.pri,
                }}>
                  {meal}
                </span>
              </div>
              {WEEK.map((d) => (
                <div key={d + meal} style={{ padding: 8, borderBottom: `1px solid ${C.bdr}`, textAlign: "center" }}>
                  {MEAL_PLAN[d][meal] ? (
                    <div style={{
                      fontSize: 11, fontWeight: 600, padding: "5px 6px", borderRadius: 10, lineHeight: 1.35, cursor: "pointer",
                      background: meal === "breakfast" ? C.ambLt : meal === "lunch" ? C.grnLt : C.priLt,
                      color:      meal === "breakfast" ? C.amb   : meal === "lunch" ? C.grn   : C.pri,
                    }}>
                      {MEAL_PLAN[d][meal]}
                    </div>
                  ) : (
                    <button
                      style={{ fontSize: 18, color: "#d4c4b0", background: "none", border: "none", cursor: "pointer" }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = C.pri)}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#d4c4b0")}
                    >
                      +
                    </button>
                  )}
                </div>
              ))}
            </>
          ))}
        </div>
      </div>
    </div>
  );
}
