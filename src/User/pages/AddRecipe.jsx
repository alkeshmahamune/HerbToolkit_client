import { useState } from "react";
import { Check, Trash2, Plus } from "lucide-react";
import { C } from "../theme";
import { CATS } from "../data/data";

const inp = {
  width: "100%", padding: "10px 16px", borderRadius: 12,
  border: `1px solid ${C.bdr}`, background: C.bg, color: C.txt,
  fontSize: 13, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif",
};

const STEPS = ["Basic Info", "Ingredients", "Instructions", "Publish"];

export default function AddRecipe() {
  const [step, setStep] = useState(1);

  return (
    <div className="afu" style={{ maxWidth: 680, display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Add New Recipe</h2>
        <p style={{ fontSize: 13, color: C.mut, marginTop: 4 }}>Share your culinary creation with the world</p>
      </div>

      {/* Stepper */}
      <div style={{ display: "flex", alignItems: "center" }}>
        {STEPS.map((s, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", flex: i < STEPS.length - 1 ? 1 : "none" }}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
              <div
                onClick={() => setStep(i + 1)}
                style={{
                  width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center",
                  justifyContent: "center", fontSize: 13, fontWeight: 700, cursor: "pointer", transition: "all .2s",
                  background: step > i + 1 ? C.grn : step === i + 1 ? C.pri : C.bdr,
                  color: step >= i + 1 ? "#fff" : C.mut,
                }}
              >
                {step > i + 1 ? <Check size={14} /> : i + 1}
              </div>
              <span style={{ fontSize: 10, fontWeight: 600, color: step === i + 1 ? C.pri : C.mut, whiteSpace: "nowrap" }}>
                {s}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div style={{ flex: 1, height: 2, margin: "0 8px 16px", background: step > i + 1 ? C.grn : C.bdr, transition: "background .3s" }} />
            )}
          </div>
        ))}
      </div>

      {/* Form Card */}
      <div style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
        {step === 1 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>Recipe Name</label>
              <input style={inp} placeholder="e.g. Creamy Mushroom Risotto" />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>Category</label>
                <select style={inp}>{CATS.map((c) => <option key={c.name}>{c.name}</option>)}</select>
              </div>
              <div>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>Difficulty</label>
                <select style={inp}><option>Easy</option><option>Medium</option><option>Hard</option></select>
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
              {["Prep Time (min)", "Cook Time (min)", "Servings"].map((l) => (
                <div key={l}>
                  <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>{l}</label>
                  <input type="number" style={inp} placeholder="0" />
                </div>
              ))}
            </div>
            <div>
              <label style={{ fontSize: 13, fontWeight: 600, color: C.txt, display: "block", marginBottom: 6 }}>Description</label>
              <textarea rows={3} style={{ ...inp, resize: "none" }} placeholder="Describe your recipe…" />
            </div>
          </div>
        )}

        {step === 2 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>Ingredients</p>
            {["2 cups flour", "1 tsp salt", "3 eggs"].map((v, i) => (
              <div key={i} style={{ display: "flex", gap: 8 }}>
                <input defaultValue={v} style={{ ...inp, flex: 1 }} />
                <button style={{ padding: "0 12px", borderRadius: 12, border: `1px solid ${C.bdr}`, background: C.card, cursor: "pointer" }}>
                  <Trash2 size={14} color={C.red} />
                </button>
              </div>
            ))}
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 16px", borderRadius: 12, border: `1.5px dashed ${C.pri}`, background: "transparent", color: C.pri, fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" }}>
              <Plus size={14} /> Add Ingredient
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>Instructions</p>
            {["Preheat oven to 180°C", "Mix dry ingredients", "Fold in wet ingredients"].map((s, i) => (
              <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 26, height: 26, borderRadius: "50%", background: C.pri, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, flexShrink: 0, marginTop: 8 }}>
                  {i + 1}
                </div>
                <textarea defaultValue={s} rows={2} style={{ ...inp, flex: 1, resize: "none" }} />
              </div>
            ))}
            <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "10px 16px", borderRadius: 12, border: `1.5px dashed ${C.pri}`, background: "transparent", color: C.pri, fontSize: 13, fontWeight: 600, cursor: "pointer", width: "100%" }}>
              <Plus size={14} /> Add Step
            </button>
          </div>
        )}

        {step === 4 && (
          <div style={{ textAlign: "center", padding: "32px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: 14 }}>
            <span style={{ fontSize: 56 }}>🎉</span>
            <h3 className="fd" style={{ fontSize: 20, fontWeight: 700, color: C.txt }}>Ready to Publish!</h3>
            <p style={{ fontSize: 13, color: C.mut, maxWidth: 320 }}>Your recipe looks great. Click publish to share it with the community.</p>
          </div>
        )}

        <div style={{ display: "flex", gap: 12, marginTop: 20 }}>
          {step > 1 && (
            <button
              onClick={() => setStep((s) => s - 1)}
              style={{ padding: "10px 20px", borderRadius: 12, border: `1px solid ${C.bdr}`, background: C.card, fontSize: 13, fontWeight: 600, color: C.mut, cursor: "pointer" }}
            >
              ← Back
            </button>
          )}
          <button
            onClick={() => setStep((s) => Math.min(4, s + 1))}
            style={{ marginLeft: "auto", padding: "10px 20px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}
          >
            {step === 4 ? "🚀 Publish Recipe" : "Next Step →"}
          </button>
        </div>
      </div>
    </div>
  );
}
