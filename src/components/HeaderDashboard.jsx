import { useState, useRef, useEffect } from "react";
import { Search, Bell, ChevronDown, Menu, UtensilsCrossed, Settings, LogOut } from "lucide-react";
import { C } from "../User/theme";
import { NOTIFS } from "../User/data/data";
import { Bdg } from "./UI";

export default function Header({ onMenuClick }) {
  const [profOpen,  setProfOpen]  = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const fn = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setProfOpen(false);
        setNotifOpen(false);
      }
    };
    document.addEventListener("mousedown", fn);
    return () => document.removeEventListener("mousedown", fn);
  }, []);

  return (
    <header
      ref={ref}
      style={{
        height: 64, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 20px", background: C.card, borderBottom: `1px solid ${C.bdr}`,
        boxShadow: "0 2px 16px rgba(0,0,0,.05)", position: "sticky", top: 0, zIndex: 20, flexShrink: 0,
      }}
    >
      {/* Left */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <button
          onClick={onMenuClick}
          className="md:hidden"
          style={{ padding: 8, borderRadius: 10, border: "none", background: "transparent", cursor: "pointer" }}
          onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
          onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
        >
          <Menu size={20} color={C.txt} />
        </button>
        <div className="hidden sm:flex" style={{ flexDirection: "column", lineHeight: 1.2 }}>
          <span className="fd" style={{ fontSize: 15, fontWeight: 600, color: C.txt }}>Welcome back 👋</span>
          <span style={{ fontSize: 11, color: C.mut }}>Saturday, March 7, 2026</span>
        </div>
      </div>

      {/* Search */}
      <div
        style={{
          display: "flex", alignItems: "center", gap: 10, padding: "8px 14px",
          borderRadius: 16, border: `1px solid ${C.bdr}`, background: C.bg,
          flex: "0 1 360px", margin: "0 16px", transition: "border-color .15s",
        }}
        onFocus={(e)  => (e.currentTarget.style.borderColor = C.pri)}
        onBlur={(e)   => (e.currentTarget.style.borderColor = C.bdr)}
      >
        <Search size={15} color={C.mut} />
        <input
          style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 13, color: C.txt, fontFamily: "'Plus Jakarta Sans',sans-serif" }}
          placeholder="Search recipes, ingredients…"
        />
      </div>

      {/* Right */}
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>

        {/* Notifications */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setNotifOpen((o) => !o); setProfOpen(false); }}
            style={{ padding: 9, borderRadius: 12, border: "none", background: "transparent", cursor: "pointer", position: "relative" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <Bell size={18} color={C.mut} />
            <span
              className="apu"
              style={{ position: "absolute", top: 8, right: 8, width: 8, height: 8, borderRadius: "50%", background: C.pri, border: "2px solid #fff" }}
            />
          </button>

          {notifOpen && (
            <div
              style={{
                position: "absolute", right: 0, top: 46, width: 288, background: C.card,
                border: `1px solid ${C.bdr}`, borderRadius: 20,
                boxShadow: "0 16px 48px rgba(0,0,0,.12)", zIndex: 50, overflow: "hidden",
              }}
            >
              <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.bdr}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: C.txt }}>Notifications</span>
                <Bdg n={3} color={C.pri} />
              </div>
              {NOTIFS.slice(0, 4).map((n, i) => (
                <div
                  key={i}
                  style={{ display: "flex", gap: 10, padding: "10px 16px", borderBottom: `1px solid ${C.bdr}`, cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <span style={{ fontSize: 15 }}>
                    {n.type === "like" ? "❤️" : n.type === "comment" ? "💬" : "⭐"}
                  </span>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 500, color: C.txt }}>{n.text}</p>
                    <p style={{ fontSize: 11, color: C.mut, marginTop: 2 }}>{n.time}</p>
                  </div>
                  {!n.read && <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.pri, flexShrink: 0, marginTop: 6 }} />}
                </div>
              ))}
              <div style={{ padding: "12px 16px", textAlign: "center" }}>
                <button style={{ fontSize: 12, fontWeight: 600, color: C.pri, background: "none", border: "none", cursor: "pointer" }}>
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => { setProfOpen((o) => !o); setNotifOpen(false); }}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 14, border: "none", background: "transparent", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: `linear-gradient(135deg,${C.pri},#c94e18)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 14, flexShrink: 0 }}>
              A
            </div>
            <div className="hidden sm:flex" style={{ flexDirection: "column", textAlign: "left", gap: 1 }}>
              <span style={{ fontSize: 12.5, fontWeight: 600, color: C.txt }}>Alex Morgan</span>
              <span style={{ fontSize: 11, color: C.mut }}>Pro Chef</span>
            </div>
            <ChevronDown size={13} color={C.mut} />
          </button>

          {profOpen && (
            <div
              style={{
                position: "absolute", right: 0, top: 50, width: 210, background: C.card,
                border: `1px solid ${C.bdr}`, borderRadius: 20,
                boxShadow: "0 16px 48px rgba(0,0,0,.12)", zIndex: 50, overflow: "hidden",
              }}
            >
              <div style={{ padding: 16, borderBottom: `1px solid ${C.bdr}`, background: C.priLt }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg,${C.pri},#c94e18)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 15 }}>
                    A
                  </div>
                  <div>
                    <p style={{ fontWeight: 600, fontSize: 13, color: C.txt }}>Alex Morgan</p>
                    <p style={{ fontSize: 11, color: C.mut }}>alex@recipehub.app</p>
                  </div>
                </div>
              </div>
              {[
                { Ic: UtensilsCrossed, label: "My Profile" },
                { Ic: Settings,        label: "Settings"   },
              ].map(({ Ic, label }) => (
                <button
                  key={label}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", border: "none", background: "transparent", cursor: "pointer", textAlign: "left" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.priLt)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <Ic size={14} color={C.mut} />
                  <span style={{ fontSize: 13, color: C.txt }}>{label}</span>
                </button>
              ))}
              <div style={{ borderTop: `1px solid ${C.bdr}` }}>
                <button
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 16px", border: "none", background: "transparent", cursor: "pointer" }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = C.redLt)}
                  onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                >
                  <LogOut size={14} color={C.red} />
                  <span style={{ fontSize: 13, color: C.red }}>Log out</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
