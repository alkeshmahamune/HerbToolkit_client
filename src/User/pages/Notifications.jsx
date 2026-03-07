import { C } from "../theme";
import { NOTIFS } from "../data/data";

export default function Notifications() {
  const unread = NOTIFS.filter((n) => !n.read).length;

  return (
    <div className="afu" style={{ maxWidth: 560, display: "flex", flexDirection: "column", gap: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div>
          <h2 className="fd" style={{ fontSize: 22, fontWeight: 700, color: C.txt }}>Notifications</h2>
          <p style={{ fontSize: 13, color: C.mut, marginTop: 2 }}>{unread} unread</p>
        </div>
        <button style={{ fontSize: 13, fontWeight: 600, color: C.pri, background: "none", border: "none", cursor: "pointer" }}>
          Mark all read
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {NOTIFS.map((n, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 16px",
              borderRadius: 20, cursor: "pointer", transition: "all .15s",
              background: n.read ? C.card : C.priLt,
              border: `1px solid ${n.read ? C.bdr : `${C.pri}30`}`,
              boxShadow: "0 2px 8px rgba(0,0,0,.04)",
            }}
          >
            <div style={{ width: 38, height: 38, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0, background: n.type === "like" ? C.redLt : n.type === "comment" ? C.grnLt : C.ambLt }}>
              {n.type === "like" ? "❤️" : n.type === "comment" ? "💬" : "⭐"}
            </div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: 13, fontWeight: 500, color: C.txt }}>{n.text}</p>
              <p style={{ fontSize: 12, color: C.mut, marginTop: 3 }}>{n.time}</p>
            </div>
            {!n.read && (
              <div className="apu" style={{ width: 10, height: 10, borderRadius: "50%", background: C.pri, flexShrink: 0, marginTop: 6 }} />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
