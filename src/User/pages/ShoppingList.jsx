import { useState } from "react";
import { Check, Plus } from "lucide-react";
import { C } from "../theme";
import { SHOPPING_ITEMS } from "../data/data";

export default function ShoppingList() {
  const [items, setItems] = useState(SHOPPING_ITEMS);
  const toggle = (id) => setItems((s) => s.map((i) => i.id === id ? { ...i, done: !i.done } : i));
  const done = items.filter((i) => i.done).length;

  return (
    <div className="afu" style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Shopping List</h2>
        <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>{done}/{items.length} items collected</p>
      </div>

      {/* Progress bar */}
      <div style={{ height: 8, borderRadius: 99, background: C.bdr, overflow: "hidden" }}>
        <div
          className="gbr"
          style={{ "--tw": `${(done / items.length) * 100}%`, height: "100%", borderRadius: 99, background: C.grn }}
        />
      </div>

      {/* Items */}
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggle(item.id)}
            style={{
              display: "flex", alignItems: "center", gap: 12, padding: "14px 16px",
              borderRadius: 20, cursor: "pointer", transition: "all .15s",
              background: C.card, border: `1px solid ${item.done ? C.grnLt : C.bdr}`,
              opacity: item.done ? 0.65 : 1, boxShadow: "0 2px 8px rgba(0,0,0,.04)",
            }}
          >
            <div
              style={{
                width: 22, height: 22, borderRadius: "50%", flexShrink: 0, transition: "all .15s",
                border: `2px solid ${item.done ? C.grn : C.bdr}`,
                background: item.done ? C.grn : "transparent",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              {item.done && <Check size={12} color="#fff" strokeWidth={3} />}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 14, fontWeight: 600, color: C.txt, textDecoration: item.done ? "line-through" : "none" }}>
                {item.item}
              </p>
              <p style={{ fontSize: 12, color: C.mut, marginTop: 2 }}>{item.cat}</p>
            </div>
            <span style={{ background: C.priLt, color: C.pri, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 99 }}>
              {item.qty}
            </span>
          </div>
        ))}
      </div>

      <button style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: "12px 16px", borderRadius: 20, border: `1.5px dashed ${C.pri}`, background: "transparent", color: C.pri, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
        <Plus size={14} /> Add Item
      </button>
    </div>
  );
}
