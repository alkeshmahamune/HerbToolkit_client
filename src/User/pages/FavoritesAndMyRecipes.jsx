import { PlusCircle } from "lucide-react";
import { C } from "../theme";
import { RECIPES } from "../data/data";
import { RecipeCard } from "../../components/UI";

export function Favorites() {
  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Favorites ❤️</h2>
        <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>Recipes you love</p>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
        {RECIPES.slice(0, 5).map((r) => <RecipeCard key={r.id} r={r} />)}
      </div>
    </div>
  );
}

export function MyRecipes() {
  return (
    <div className="afu" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>My Recipes</h2>
          <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>Recipes you've created</p>
        </div>
        <button style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          <PlusCircle size={14} /> Create Recipe
        </button>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(220px,1fr))", gap: 14 }}>
        {RECIPES.map((r) => <RecipeCard key={r.id} r={r} />)}
      </div>
    </div>
  );
}
