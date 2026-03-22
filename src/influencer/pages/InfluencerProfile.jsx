import React, { useState, useRef } from "react";
import {
  User, Mail, Phone, MapPin, Calendar, Edit3, Save, X, Camera,
  LogOut, Trash2, Shield, Bell, ChevronRight, Star, CheckCircle,
  Instagram, Youtube, Twitter, Heart, MessageCircle, Share2,
  TrendingUp, Video, Image, BookOpen, Globe, Hash, DollarSign,
  Link, Play, Eye, ThumbsUp
} from "lucide-react";

const COLORS = {
  red: "#ef4444", redDark: "#b91c1c", redLight: "#fee2e2",
  blue: "#3b82f6", blueDark: "#1d4ed8", blueLight: "#dbeafe",
  gray: "#6b7280", grayLight: "#f9fafb", border: "#e5e7eb",
  dark: "#111827", white: "#ffffff",
  orange: "#f97316", purple: "#8b5cf6",
};

const InputField = ({ label, icon: Icon, value, name, type = "text", editable, onChange, options }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
    <label style={{ fontSize: "12px", fontWeight: 700, color: COLORS.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>{label}</label>
    <div style={{ position: "relative" }}>
      {Icon && <Icon size={15} style={{ position: "absolute", left: "12px", top: "50%", transform: "translateY(-50%)", color: editable ? COLORS.orange : COLORS.gray }} />}
      {options ? (
        <select name={name} value={value} onChange={onChange} disabled={!editable} style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: `1.5px solid ${editable ? COLORS.orange : COLORS.border}`, background: editable ? "#fff" : COLORS.grayLight, fontSize: "14px", color: COLORS.dark, outline: "none", appearance: "none", boxSizing: "border-box" }}>
          {options.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      ) : (
        <input type={type} name={name} value={value} onChange={onChange} disabled={!editable} style={{ width: "100%", padding: "10px 12px 10px 36px", borderRadius: "8px", border: `1.5px solid ${editable ? COLORS.orange : COLORS.border}`, background: editable ? "#fff" : COLORS.grayLight, fontSize: "14px", color: COLORS.dark, outline: "none", boxSizing: "border-box" }} />
      )}
    </div>
  </div>
);

const StatCard = ({ icon: Icon, label, value, color, sub }) => (
  <div style={{ background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "16px", display: "flex", flexDirection: "column", gap: "6px", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Icon size={18} color={color} />
    </div>
    <p style={{ fontSize: "22px", fontWeight: 800, color: COLORS.dark, fontFamily: "Georgia, serif", margin: 0 }}>{value}</p>
    <p style={{ fontSize: "12px", color: COLORS.gray, fontWeight: 600, margin: 0 }}>{label}</p>
    {sub && <p style={{ fontSize: "11px", color: "#10b981", fontWeight: 700, margin: 0 }}>{sub}</p>}
  </div>
);

const SocialHandle = ({ icon: Icon, platform, handle, color, followers, editable, onChange, name }) => (
  <div style={{ background: COLORS.grayLight, borderRadius: "10px", padding: "14px 16px", display: "flex", alignItems: "center", gap: "12px", border: `1px solid ${COLORS.border}` }}>
    <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: color + "18", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <Icon size={18} color={color} />
    </div>
    <div style={{ flex: 1 }}>
      <p style={{ margin: 0, fontSize: "11px", fontWeight: 700, color: COLORS.gray, textTransform: "uppercase", letterSpacing: "0.08em" }}>{platform}</p>
      {editable ? (
        <input name={name} value={handle} onChange={onChange} style={{ border: "none", background: "transparent", fontSize: "14px", fontWeight: 600, color: COLORS.dark, outline: "none", width: "100%", padding: 0 }} />
      ) : (
        <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: COLORS.dark }}>{handle}</p>
      )}
    </div>
    <span style={{ fontSize: "12px", fontWeight: 700, color: color }}>{followers}</span>
  </div>
);

export default function InfluencerProfile() {
  const [editing, setEditing] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  const [saved, setSaved] = useState(false);
  const fileRef = useRef();
  const bannerRef = useRef();

  const [form, setForm] = useState({
    firstName: "Meghna", lastName: "Verma",
    email: "meghna@foodiegram.in", phone: "+91 99887 76654",
    dob: "1996-07-11", gender: "Female",
    city: "Bengaluru", state: "Karnataka", pincode: "560001",
    niche: "Food & Nutrition", contentType: "Reels, Blogs, Recipes",
    collab: "Brand partnerships, Sponsored content, Recipe development",
    rate: "15000", languages: "English, Hindi, Kannada",
    website: "www.meghnaverma.in",
    igHandle: "@meghnacooks", ytHandle: "@MeghnaKitchen", twHandle: "@meghnacooks_",
    bio: "Food creator & certified nutrition enthusiast. Sharing wholesome, flavour-packed recipes that make healthy eating exciting!",
  });
  const [avatar, setAvatar] = useState(null);
  const [banner, setBanner] = useState(null);

  const handleChange = e => setForm(p => ({ ...p, [e.target.name]: e.target.value }));
  const handleSave = () => { setEditing(false); setSaved(true); setTimeout(() => setSaved(false), 2500); };
  const handleAvatar = e => { const f = e.target.files[0]; if (f) setAvatar(URL.createObjectURL(f)); };
  const handleBanner = e => { const f = e.target.files[0]; if (f) setBanner(URL.createObjectURL(f)); };

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "social", label: "Social", icon: Instagram },
    { id: "content", label: "Content", icon: Video },
    { id: "collabs", label: "Collabs", icon: DollarSign },
    { id: "settings", label: "Settings", icon: Shield },
  ];

  const posts = [
    { title: "5-Min Oat Breakfast", views: "84K", likes: "6.2K", type: "Reel" },
    { title: "Smoothie Bowl Guide", views: "61K", likes: "4.8K", type: "Post" },
    { title: "Meal Prep Sunday", views: "120K", likes: "9.1K", type: "Reel" },
    { title: "Lentil Soup Recipe", views: "45K", likes: "3.5K", type: "Blog" },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fdf8f0", fontFamily: "'Segoe UI', sans-serif" }}>
      {/* banner */}
      <div style={{
        height: "220px", position: "relative", overflow: "hidden",
        background: banner ? `url(${banner}) center/cover` : "linear-gradient(135deg, #f97316 0%, #ef4444 40%, #ec4899 100%)",
      }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.18)" }} />
        <div style={{ position: "absolute", top: "-30px", right: "-30px", width: "200px", height: "200px", borderRadius: "50%", background: "rgba(255,255,255,0.08)" }} />
        <div style={{ position: "absolute", bottom: "-50px", left: "25%", width: "160px", height: "160px", borderRadius: "50%", background: "rgba(255,255,255,0.06)" }} />

        {/* verified badge */}
        <div style={{ position: "absolute", top: "18px", left: "20px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", padding: "5px 12px", borderRadius: "99px", fontSize: "12px", fontWeight: 700, backdropFilter: "blur(8px)" }}>
          <Star size={12} fill="#fff" color="#fff" /> Verified Creator
        </div>

        {editing && (
          <button onClick={() => bannerRef.current.click()} style={{ position: "absolute", bottom: "12px", right: "12px", display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.2)", border: "1px solid rgba(255,255,255,0.4)", color: "#fff", padding: "7px 14px", borderRadius: "8px", cursor: "pointer", fontSize: "12px", fontWeight: 600, backdropFilter: "blur(8px)" }}>
            <Camera size={13} /> Change Banner
          </button>
        )}
        <input ref={bannerRef} type="file" accept="image/*" onChange={handleBanner} style={{ display: "none" }} />

        <div style={{ position: "absolute", top: "18px", right: "20px", display: "flex", gap: "10px" }}>
          {!editing ? (
            <button onClick={() => setEditing(true)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600, backdropFilter: "blur(8px)" }}>
              <Edit3 size={14} /> Edit Profile
            </button>
          ) : (
            <>
              <button onClick={handleSave} style={{ display: "flex", alignItems: "center", gap: "6px", background: "#fff", border: "none", color: COLORS.orange, padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 700 }}>
                <Save size={14} /> Save
              </button>
              <button onClick={() => setEditing(false)} style={{ display: "flex", alignItems: "center", gap: "6px", background: "rgba(255,255,255,0.18)", border: "1px solid rgba(255,255,255,0.35)", color: "#fff", padding: "8px 16px", borderRadius: "8px", cursor: "pointer", fontSize: "13px", fontWeight: 600 }}>
                <X size={14} /> Cancel
              </button>
            </>
          )}
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "0 24px" }}>
        {/* avatar + name */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: "24px", marginTop: "-64px", marginBottom: "28px" }}>
          <div style={{ position: "relative" }}>
            <div style={{ width: "128px", height: "128px", borderRadius: "50%", border: "4px solid #fff", background: avatar ? "none" : "linear-gradient(135deg, #fed7aa, #f97316)", overflow: "hidden", boxShadow: "0 8px 24px rgba(249,115,22,0.35)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              {avatar ? <img src={avatar} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} /> : <User size={48} color="#fff" />}
            </div>
            {editing && (
              <button onClick={() => fileRef.current.click()} style={{ position: "absolute", bottom: "4px", right: "4px", width: "32px", height: "32px", borderRadius: "50%", background: COLORS.orange, border: "2px solid #fff", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>
                <Camera size={14} color="#fff" />
              </button>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleAvatar} style={{ display: "none" }} />
          </div>
          <div style={{ paddingBottom: "12px" }}>
            <h1 style={{ fontSize: "26px", fontWeight: 800, color: COLORS.dark, fontFamily: "Georgia, serif", margin: 0 }}>
              {form.firstName} {form.lastName}
            </h1>
            <p style={{ color: COLORS.gray, fontSize: "14px", margin: "4px 0 6px" }}>{form.niche} Creator · {form.city}</p>
            <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
              {["Instagram", "YouTube", "Twitter"].map((p, i) => (
                <span key={p} style={{ display: "inline-flex", alignItems: "center", gap: "4px", background: [COLORS.redLight, "#fee2e2", COLORS.blueLight][i], color: [COLORS.red, COLORS.orange, COLORS.blue][i], fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "99px" }}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          {saved && (
            <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "6px", background: "#dcfce7", color: "#16a34a", padding: "8px 16px", borderRadius: "8px", fontSize: "13px", fontWeight: 700, marginBottom: "12px" }}>
              <CheckCircle size={16} /> Saved!
            </div>
          )}
        </div>

        {/* stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "16px", marginBottom: "28px" }}>
          <StatCard icon={User} label="Total Followers" value="248K" color={COLORS.orange} sub="↑ +2.3K this week" />
          <StatCard icon={Eye} label="Monthly Views" value="1.4M" color={COLORS.red} sub="↑ +12% MoM" />
          <StatCard icon={DollarSign} label="Base Rate / Post" value={`₹${form.rate}`} color="#ec4899" />
          <StatCard icon={Video} label="Posts Published" value="312" color={COLORS.blue} />
        </div>

        {/* tabs */}
        <div style={{ display: "flex", gap: "4px", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "4px", marginBottom: "24px", width: "fit-content" }}>
          {tabs.map(t => (
            <button key={t.id} onClick={() => setActiveTab(t.id)} style={{ display: "flex", alignItems: "center", gap: "6px", padding: "8px 20px", borderRadius: "8px", border: "none", cursor: "pointer", fontSize: "13px", fontWeight: 600, background: activeTab === t.id ? COLORS.orange : "transparent", color: activeTab === t.id ? "#fff" : COLORS.gray, transition: "all 0.2s" }}>
              <t.icon size={14} /> {t.label}
            </button>
          ))}
        </div>

        {/* profile tab */}
        {activeTab === "profile" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><User size={16} color={COLORS.orange} /> Personal Details</h2>
              <InputField label="First Name" icon={User} name="firstName" value={form.firstName} editable={editing} onChange={handleChange} />
              <InputField label="Last Name" icon={User} name="lastName" value={form.lastName} editable={editing} onChange={handleChange} />
              <InputField label="Email" icon={Mail} name="email" value={form.email} editable={editing} onChange={handleChange} />
              <InputField label="Phone" icon={Phone} name="phone" value={form.phone} editable={editing} onChange={handleChange} />
              <InputField label="Date of Birth" icon={Calendar} name="dob" type="date" value={form.dob} editable={editing} onChange={handleChange} />
              <InputField label="Gender" icon={User} name="gender" value={form.gender} editable={editing} onChange={handleChange} options={["Female", "Male", "Non-binary", "Prefer not to say"]} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><Globe size={16} color={COLORS.orange} /> Creator Details</h2>
                <InputField label="Niche" icon={Hash} name="niche" value={form.niche} editable={editing} onChange={handleChange} options={["Food & Nutrition", "Fitness", "Lifestyle", "Travel", "Beauty", "Tech"]} />
                <InputField label="Content Formats" icon={Video} name="contentType" value={form.contentType} editable={editing} onChange={handleChange} />
                <InputField label="Languages" icon={Globe} name="languages" value={form.languages} editable={editing} onChange={handleChange} />
                <InputField label="Website / Portfolio" icon={Link} name="website" value={form.website} editable={editing} onChange={handleChange} />
                <InputField label="City" icon={MapPin} name="city" value={form.city} editable={editing} onChange={handleChange} />
              </div>
              <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px" }}>
                <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}><Edit3 size={16} color={COLORS.orange} /> Bio</h2>
                <textarea name="bio" value={form.bio} onChange={handleChange} disabled={!editing} rows={4} style={{ width: "100%", padding: "10px 12px", borderRadius: "8px", border: `1.5px solid ${editing ? COLORS.orange : COLORS.border}`, background: editing ? "#fff" : COLORS.grayLight, fontSize: "14px", color: COLORS.dark, resize: "none", outline: "none", boxSizing: "border-box" }} />
              </div>
            </div>
          </div>
        )}

        {activeTab === "social" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 24px", display: "flex", alignItems: "center", gap: "8px" }}><Share2 size={16} color={COLORS.orange} /> Social Media Handles</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <SocialHandle icon={Instagram} platform="Instagram" name="igHandle" handle={form.igHandle} color="#e1306c" followers="185K" editable={editing} onChange={handleChange} />
              <SocialHandle icon={Youtube} platform="YouTube" name="ytHandle" handle={form.ytHandle} color="#ff0000" followers="42K" editable={editing} onChange={handleChange} />
              <SocialHandle icon={Twitter} platform="Twitter / X" name="twHandle" handle={form.twHandle} color="#1da1f2" followers="21K" editable={editing} onChange={handleChange} />
            </div>
            <div style={{ marginTop: "28px", padding: "20px", background: "linear-gradient(135deg, #fff7ed, #fef3c7)", borderRadius: "12px", border: "1px solid #fed7aa" }}>
              <p style={{ fontSize: "13px", fontWeight: 800, color: COLORS.orange, margin: "0 0 12px", textTransform: "uppercase", letterSpacing: "0.08em" }}>Platform Breakdown</p>
              {[
                { label: "Instagram", pct: 75, color: "#e1306c" },
                { label: "YouTube", pct: 17, color: "#ff0000" },
                { label: "Twitter", pct: 8, color: "#1da1f2" },
              ].map(b => (
                <div key={b.label} style={{ marginBottom: "10px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "4px" }}>
                    <span style={{ fontSize: "12px", fontWeight: 600, color: COLORS.dark }}>{b.label}</span>
                    <span style={{ fontSize: "12px", color: COLORS.gray }}>{b.pct}%</span>
                  </div>
                  <div style={{ height: "6px", background: "#e5e7eb", borderRadius: "99px", overflow: "hidden" }}>
                    <div style={{ width: `${b.pct}%`, height: "100%", background: b.color, borderRadius: "99px", transition: "width 1s ease" }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "content" && (
          <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", marginBottom: "40px" }}>
            <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 20px", display: "flex", alignItems: "center", gap: "8px" }}><TrendingUp size={16} color={COLORS.orange} /> Top Performing Content</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px" }}>
              {posts.map((p, i) => (
                <div key={i} style={{ background: COLORS.grayLight, borderRadius: "12px", overflow: "hidden", border: `1px solid ${COLORS.border}` }}>
                  <div style={{ height: "100px", background: `linear-gradient(135deg, hsl(${i * 40 + 10}, 80%, 55%), hsl(${i * 40 + 40}, 75%, 45%))`, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    {p.type === "Reel" ? <Play size={28} color="#fff" /> : p.type === "Blog" ? <BookOpen size={28} color="#fff" /> : <Image size={28} color="#fff" />}
                  </div>
                  <div style={{ padding: "14px" }}>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "13px", color: COLORS.dark }}>{p.title}</p>
                    <span style={{ fontSize: "10px", background: COLORS.orange + "20", color: COLORS.orange, fontWeight: 700, padding: "2px 8px", borderRadius: "99px", marginTop: "4px", display: "inline-block" }}>{p.type}</span>
                    <div style={{ display: "flex", gap: "16px", marginTop: "10px" }}>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: COLORS.gray }}><Eye size={12} /> {p.views}</span>
                      <span style={{ display: "flex", alignItems: "center", gap: "4px", fontSize: "12px", color: COLORS.gray }}><ThumbsUp size={12} /> {p.likes}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "collabs" && (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px", marginBottom: "40px" }}>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px", display: "flex", flexDirection: "column", gap: "20px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: 0, display: "flex", alignItems: "center", gap: "8px" }}><DollarSign size={16} color={COLORS.orange} /> Collaboration Rates</h2>
              <InputField label="Base Rate (₹ / post)" icon={DollarSign} name="rate" value={form.rate} editable={editing} onChange={handleChange} />
              <InputField label="Collaboration Types" icon={Share2} name="collab" value={form.collab} editable={editing} onChange={handleChange} />
              <InputField label="Preferred Brands Niche" icon={Hash} name="niche" value={form.niche} editable={editing} onChange={handleChange} options={["Food & Nutrition", "Fitness", "Lifestyle", "Wellness", "Kitchen Appliances"]} />
            </div>
            <div style={{ background: "#fff", borderRadius: "16px", border: `1px solid ${COLORS.border}`, padding: "28px" }}>
              <h2 style={{ fontSize: "15px", fontWeight: 800, color: COLORS.dark, margin: "0 0 16px", display: "flex", alignItems: "center", gap: "8px" }}><Star size={16} color={COLORS.orange} /> Past Brand Collabs</h2>
              {["Saffola Active", "Urban Platter", "Yoga Bar", "WOW Skin Science", "Slurrp Farm"].map((b, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px", padding: "10px 0", borderBottom: i < 4 ? `1px solid ${COLORS.border}` : "none" }}>
                  <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: `hsl(${i * 40 + 20}, 70%, 60%)`, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 800, fontSize: "13px" }}>{b[0]}</div>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: COLORS.dark }}>{b}</p>
                  <CheckCircle size={16} color="#10b981" style={{ marginLeft: "auto" }} />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "settings" && (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px", marginBottom: "40px" }}>
            {[
              { icon: Bell, label: "Notification Preferences", desc: "Collab requests, mentions and comments", color: COLORS.orange },
              { icon: Shield, label: "Privacy & Security", desc: "Password, 2FA and account security", color: "#10b981" },
              { icon: Link, label: "Connected Accounts", desc: "Manage Instagram, YouTube, Twitter links", color: COLORS.blue },
              { icon: LogOut, label: "Sign Out", desc: "Sign out of your account", color: COLORS.gray },
              { icon: Trash2, label: "Delete Account", desc: "Permanently remove your creator account", color: COLORS.red },
            ].map((s, i) => (
              <button key={i} style={{ display: "flex", alignItems: "center", gap: "16px", background: "#fff", border: `1px solid ${COLORS.border}`, borderRadius: "12px", padding: "20px 24px", cursor: "pointer", textAlign: "left", transition: "box-shadow 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 16px rgba(0,0,0,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ width: "40px", height: "40px", borderRadius: "10px", background: s.color + "18", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <s.icon size={18} color={s.color} />
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: i === 4 ? COLORS.red : COLORS.dark }}>{s.label}</p>
                  <p style={{ margin: 0, fontSize: "12px", color: COLORS.gray }}>{s.desc}</p>
                </div>
                <ChevronRight size={18} color={COLORS.gray} />
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}