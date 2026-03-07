import { C } from "../theme";

const inp = {
  width: "100%", padding: "10px 16px", borderRadius: 12,
  border: `1px solid ${C.bdr}`, background: C.bg, color: C.txt,
  fontSize: 13, outline: "none", fontFamily: "'Plus Jakarta Sans',sans-serif",
};

const FORM_SECTIONS = [
  {
    section: "Profile",
    fields: [
      { label: "Full Name", type: "text",   value: "Alex Morgan"         },
      { label: "Email",     type: "email",  value: "alex@recipehub.app"  },
      { label: "Username",  type: "text",   value: "@chefAlex"           },
    ],
  },
  {
    section: "Preferences",
    fields: [
      { label: "Language", type: "select", options: ["English", "Spanish", "French", "Hindi"] },
      { label: "Units",    type: "select", options: ["Metric", "Imperial"] },
      { label: "Timezone", type: "select", options: ["UTC+5:30 IST", "UTC-5 EST", "UTC+1 CET"] },
    ],
  },
];

export default function Settings() {
  return (
    <div className="afu" style={{ maxWidth: 600, display: "flex", flexDirection: "column", gap: 24 }}>
      <div>
        <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Settings</h2>
        <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>Manage your preferences</p>
      </div>

      {FORM_SECTIONS.map(({ section, fields }) => (
        <div key={section} style={{ background: C.card, border: `1px solid ${C.bdr}`, borderRadius: 20, padding: 24, boxShadow: "0 2px 12px rgba(0,0,0,.04)" }}>
          <h3 className="fd" style={{ fontSize: 16, fontWeight: 600, color: C.txt, marginBottom: 20 }}>{section}</h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {fields.map((f) => (
              <div key={f.label} style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <label style={{ fontSize: 13, fontWeight: 600, color: C.mut, width: 130, flexShrink: 0 }}>{f.label}</label>
                {f.type === "select" ? (
                  <select style={{ ...inp, flex: 1 }}>
                    {f.options.map((o) => <option key={o}>{o}</option>)}
                  </select>
                ) : (
                  <input type={f.type} defaultValue={f.value} style={{ ...inp, flex: 1 }} />
                )}
              </div>
            ))}
          </div>
        </div>
      ))}

      <div style={{ display: "flex", gap: 12 }}>
        <button style={{ padding: "10px 22px", borderRadius: 12, border: "none", background: C.pri, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Save Changes
        </button>
        <button style={{ padding: "10px 22px", borderRadius: 12, border: `1px solid ${C.bdr}`, background: C.card, color: C.mut, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Cancel
        </button>
      </div>
    </div>
  );
}
