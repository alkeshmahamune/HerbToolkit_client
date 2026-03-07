import {
  LayoutDashboard, BookOpen, PlusCircle, Tag, Leaf, CalendarDays,
  Heart, ChefHat, ShoppingCart, BarChart2, MessageCircle, Bell,
  Settings, HelpCircle, LogOut, ChevronLeft, ChevronRight,
} from "lucide-react";
import { C } from "../User/theme";
import { NAV, NAV_SECTIONS } from "../User/data/data";
import { Bdg } from "./UI";

const ICON_MAP = {
  dashboard:     LayoutDashboard,
  "all-recipes": BookOpen,
  "add-recipe":  PlusCircle,
  categories:    Tag,
  ingredients:   Leaf,
  planner:       CalendarDays,
  favorites:     Heart,
  "my-recipes":  ChefHat,
  shopping:      ShoppingCart,
  analytics:     BarChart2,
  comments:      MessageCircle,
  notifications: Bell,
  settings:      Settings,
  help:          HelpCircle,
  logout:        LogOut,
};

export default function Sidebar({ collapsed, setCollapsed, active, setActive, mobile, onClose }) {
  const W = collapsed ? 68 : 242;

  return (
    <>
      {mobile && (
        <div
          onClick={onClose}
          style={{
            position: "fixed", inset: 0, zIndex: 30,
            background: "rgba(0,0,0,.45)", backdropFilter: "blur(3px)",
          }}
        />
      )}
      <aside
        style={{
          display: "flex", flexDirection: "column", height: "100%",
          background: C.sb, zIndex: 40, flexShrink: 0,
          width: W, minWidth: W,
          transition: "width .3s cubic-bezier(.4,0,.2,1)", overflow: "hidden",
          position: mobile ? "fixed" : "relative", top: 0, left: 0,
          boxShadow: mobile ? "6px 0 28px rgba(0,0,0,.35)" : "none",
        }}
      >
        {/* Brand */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "16px 12px", borderBottom: "1px solid rgba(255,255,255,.06)", flexShrink: 0,
          }}
        >
          {!collapsed && (
            <div style={{ display: "flex", alignItems: "center", gap: 10, overflow: "hidden" }}>
              <div style={{ width: 34, height: 34, borderRadius: 12, background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                🍴
              </div>
              <span className="fd" style={{ color: "#fff", fontSize: 18, fontWeight: 700, letterSpacing: "-0.02em", whiteSpace: "nowrap" }}>
                RecipeHub
              </span>
            </div>
          )}
          {collapsed && (
            <div style={{ margin: "0 auto", width: 34, height: 34, borderRadius: 12, background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>
              🍴
            </div>
          )}
          <button
            onClick={() => setCollapsed((c) => !c)}
            style={{ padding: 6, borderRadius: 8, background: "transparent", border: "none", cursor: "pointer", flexShrink: 0, marginLeft: 4 }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "rgba(255,255,255,.08)")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
          >
            {collapsed
              ? <ChevronRight size={16} color="rgba(255,255,255,.35)" />
              : <ChevronLeft  size={16} color="rgba(255,255,255,.35)" />}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px", display: "flex", flexDirection: "column", gap: 16 }}>
          {NAV_SECTIONS.map((sec) => (
            <div key={sec.key}>
              {!collapsed && (
                <p style={{ padding: "0 8px 6px", fontSize: 9.5, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.14em", color: "rgba(255,255,255,.22)", whiteSpace: "nowrap" }}>
                  {sec.label}
                </p>
              )}
              {collapsed && <div style={{ height: 1, background: "rgba(255,255,255,.07)", margin: "4px 6px 8px" }} />}

              {NAV.filter((n) => n.sec === sec.key).map((item) => {
                const Icon = ICON_MAP[item.id];
                const isActive = active === item.id;
                return (
                  <button
                    key={item.id}
                    className="asi"
                    onClick={() => { setActive(item.id); if (mobile) onClose(); }}
                    title={collapsed ? item.label : ""}
                    style={{
                      width: "100%", display: "flex", alignItems: "center", gap: 10,
                      padding: "8px 10px", borderRadius: 12, textAlign: "left",
                      border: "none", cursor: "pointer", marginBottom: 2, transition: "all .15s",
                      background: isActive ? C.pri : "transparent",
                      color: isActive ? "#fff" : item.danger ? "#fc8b8b" : "rgba(255,255,255,.52)",
                    }}
                    onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.background = C.sbHov; }}
                    onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.background = "transparent"; }}
                  >
                    {Icon && <Icon size={17} strokeWidth={isActive ? 2.2 : 1.7} style={{ flexShrink: 0 }} />}
                    {!collapsed && (
                      <>
                        <span style={{ flex: 1, fontSize: 13.5, fontWeight: isActive ? 600 : 400, whiteSpace: "nowrap" }}>
                          {item.label}
                        </span>
                        {item.badge && <Bdg n={item.badge} color={isActive ? "rgba(255,255,255,.3)" : C.pri} />}
                      </>
                    )}
                  </button>
                );
              })}
            </div>
          ))}
        </nav>

        {/* User mini */}
        {!collapsed && (
          <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.06)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 14, background: "rgba(255,255,255,.05)" }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.pri, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                A
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 12.5, fontWeight: 600, color: "#fff", lineHeight: 1.3 }}>Alex Morgan</p>
                <p style={{ fontSize: 11, color: "rgba(255,255,255,.35)" }}>Pro Chef ⭐</p>
              </div>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
