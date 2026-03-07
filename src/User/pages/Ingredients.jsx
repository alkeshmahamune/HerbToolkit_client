import { PlusCircle, Edit, Trash2 } from "lucide-react";
import { C } from "../theme";

const INGREDIENTS = [
  { name: "All-Purpose Flour", cat: "Pantry",     unit: "g",      stock: 2000, icon: "🌾" },
  { name: "Cherry Tomatoes",   cat: "Vegetables", unit: "g",      stock: 500,  icon: "🍅" },
  { name: "Parmesan Cheese",   cat: "Dairy",      unit: "g",      stock: 200,  icon: "🧀" },
  { name: "Garlic",            cat: "Vegetables", unit: "cloves", stock: 20,   icon: "🧄" },
  { name: "Olive Oil",         cat: "Pantry",     unit: "ml",     stock: 750,  icon: "🫒" },
  { name: "Heavy Cream",       cat: "Dairy",      unit: "ml",     stock: 400,  icon: "🥛" },
];

export default function Ingredients() {
  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Ingredients Manager</h2>
          <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>Manage your ingredient database</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <PlusCircle size={14} /> Add Ingredient
        </button>
      </div>

      <div style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, overflow: "hidden", boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ background: C.bg, borderBottom: `1px solid ${C.bdr}` }}>
              {["Ingredient", "Category", "Unit", "Stock", "Actions"].map((h) => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color: C.mut }}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {INGREDIENTS.map((d, i) => (
              <tr
                key={i}
                style={{ borderBottom: `1px solid ${C.bdr}` }}
                onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
                onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
              >
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 22 }}>{d.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>{d.name}</span>
                  </div>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: C.priLt, color: C.pri, fontSize: 11, fontWeight: 600, padding: "2px 9px", borderRadius: 99 }}>{d.cat}</span>
                </td>
                <td style={{ padding: "12px 16px", fontSize: 13, color: C.mut }}>{d.unit}</td>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 700, color: C.txt }}>{d.stock}</td>
                <td style={{ padding: "12px 16px" }}>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button style={{ padding: 6, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <Edit size={14} color={C.pri} />
                    </button>
                    <button style={{ padding: 6, borderRadius: 8, border: "none", background: "transparent", cursor: "pointer" }}
                            onMouseEnter={(e) => (e.currentTarget.style.background = C.redLt)}
                            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}>
                      <Trash2 size={14} color={C.red} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
