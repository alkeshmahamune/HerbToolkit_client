import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { C } from "../theme";

const FAQS = [
  { q: "How do I add a new recipe?",        a: "Click 'Add Recipe' in the sidebar or the + button to open the recipe creation form." },
  { q: "Can I import recipes from a URL?",   a: "Yes! Use the Import feature in Add Recipe to paste any recipe URL and auto-fill fields." },
  { q: "How does the meal planner work?",    a: "Click empty slots in the weekly calendar to assign recipes to breakfast, lunch, and dinner." },
  { q: "How do I generate a shopping list?", a: "After planning your meals, click 'Generate Shopping List' to auto-populate ingredients." },
];

export default function Help() {
  const [open, setOpen] = useState(null);

  return (
    <div className="afu" style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Help & Support</h2>
        <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>Find answers and get in touch</p>
      </div>

      {/* CTA Banner */}
      <div style={{ background: `linear-gradient(135deg,${C.priLt},${C.ambLt})`, border: `1px solid ${C.bdr}`, borderRadius: 20, padding: 28, textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 52 }}>🍳</span>
        <h3 className="fd" style={{ fontSize: 18, fontWeight: 700, color: C.txt }}>Need help cooking up answers?</h3>
        <p style={{ fontSize: 13, color: C.mut }}>Our support team is here 24/7</p>
        <button style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Contact Support
        </button>
      </div>

      {/* FAQ Accordion */}
      <div>
        <h3 className="fd" style={{ fontSize: 18, fontWeight: 600, color: C.txt, marginBottom: 14 }}>
          Frequently Asked Questions
        </h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FAQS.map((f, i) => (
            <div key={i} style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 16, overflow: "hidden" }}>
              <button
                onClick={() => setOpen(open === i ? null : i)}
                style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 18px", background: "none", border: "none", cursor: "pointer", textAlign: "left" }}
              >
                <span style={{ fontSize: 13, fontWeight: 600, color: C.txt }}>{f.q}</span>
                <ChevronDown
                  size={16}
                  color={C.mut}
                  style={{ transform: open === i ? "rotate(180deg)" : "none", transition: "transform .2s", flexShrink: 0, marginLeft: 8 }}
                />
              </button>
              {open === i && (
                <div style={{ padding: "0 18px 16px", fontSize: 13, color: C.mut, lineHeight: 1.7 }}>
                  {f.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
