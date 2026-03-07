import { C } from "../theme";

export default function Logout() {
  return (
    <div
      className="afu"
      style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", minHeight: 400, gap: 18, textAlign: "center",
      }}
    >
      <span style={{ fontSize: 64 }}>👋</span>
      <h2 className="fd" style={{ fontSize: 24, fontWeight: 700, color: C.txt }}>
        See you later, Chef!
      </h2>
      <p style={{ fontSize: 14, color: C.mut, maxWidth: 320 }}>
        Your recipes will be here when you return. Are you sure you want to log out?
      </p>
      <div style={{ display: "flex", gap: 12 }}>
        <button style={{ padding: "10px 24px", borderRadius: 12, border: `1px solid ${C.bdr}`, background: C.card, color: C.mut, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Stay
        </button>
        <button style={{ padding: "10px 24px", borderRadius: 12, border: "none", background: C.red, color: "#fff", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
          Yes, Log Out
        </button>
      </div>
    </div>
  );
}
