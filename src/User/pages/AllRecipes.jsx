import { useState } from "react";
import { Filter, PlusCircle } from "lucide-react";
import { C } from "../theme";
import { RECIPES, CATS } from "../data/data";
import { RecipeCard } from "../../components/UI";

export default function AllRecipes() {
  const [filter, setFilter] = useState("All");
  const chips = ["All", ...CATS.map((c) => c.name)];
  const shown = filter === "All" ? RECIPES : RECIPES.filter((r) => r.cat === filter);

  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <div>
          <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>All Recipes</h2>
          <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>{shown.length} recipes found</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, border: `1px solid ${C.bdr}`, background: C.card, fontSize: 13, fontWeight: 600, color: C.mut, cursor: "pointer" }}>
            <Filter size={14} /> Filter
          </button>
          <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
            <PlusCircle size={14} /> New Recipe
          </button>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {chips.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            style={{
              padding: "6px 14px", borderRadius: 99, fontSize: 12, fontWeight: 600, cursor: "pointer", transition: "all .15s",
              background: filter === c ? C.pri : C.card,
              color:      filter === c ? "#fff" : C.mut,
              border:     `1px solid ${filter === c ? C.pri : C.bdr}`,
            }}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Recipe Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
        {shown.map((r) => <RecipeCard key={r.id} r={r} />)}
      </div>
    </div>
  );
}
