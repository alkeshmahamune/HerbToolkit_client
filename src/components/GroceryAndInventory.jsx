import React, { useState, useMemo, useEffect, useCallback } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  Check,
  X,
  Package,
  AlertTriangle,
  CheckCircle2,
  ShoppingCart,
  Loader2,
} from "lucide-react";
import axios from "axios";
import { useLocation } from "react-router-dom";

// ─── Constants ────────────────────────────────────────────────────────────────

const CATEGORIES = [
  "Dairy",
  "Vegetables",
  "Fruits",
  "Meat",
  "Grains",
  "Condiments",
  "Frozen",
];

const GROCERY_ITEMS = [
  { id: "g1", name: "Milk", emoji: "🥛", cat: "Dairy" },
  { id: "g2", name: "Eggs", emoji: "🥚", cat: "Dairy" },
  { id: "g3", name: "Butter", emoji: "🧈", cat: "Dairy" },
  { id: "g4", name: "Cheddar", emoji: "🧀", cat: "Dairy" },
  { id: "g5", name: "Yoghurt", emoji: "🫙", cat: "Dairy" },
  { id: "g6", name: "Bread", emoji: "🍞", cat: "Grains" },
  { id: "g7", name: "Rice", emoji: "🍚", cat: "Grains" },
  { id: "g8", name: "Pasta", emoji: "🍝", cat: "Grains" },
  { id: "g9", name: "Oats", emoji: "🌾", cat: "Grains" },
  { id: "g10", name: "Flour", emoji: "🌾", cat: "Grains" },
  { id: "g11", name: "Tomatoes", emoji: "🍅", cat: "Vegetables" },
  { id: "g12", name: "Onions", emoji: "🧅", cat: "Vegetables" },
  { id: "g13", name: "Garlic", emoji: "🧄", cat: "Vegetables" },
  { id: "g14", name: "Spinach", emoji: "🥬", cat: "Vegetables" },
  { id: "g15", name: "Carrots", emoji: "🥕", cat: "Vegetables" },
  { id: "g16", name: "Potatoes", emoji: "🥔", cat: "Vegetables" },
  { id: "g17", name: "Capsicum", emoji: "🫑", cat: "Vegetables" },
  { id: "g18", name: "Cucumber", emoji: "🥒", cat: "Vegetables" },
  { id: "g19", name: "Apples", emoji: "🍎", cat: "Fruits" },
  { id: "g20", name: "Bananas", emoji: "🍌", cat: "Fruits" },
  { id: "g21", name: "Lemon", emoji: "🍋", cat: "Fruits" },
  { id: "g22", name: "Chicken", emoji: "🍗", cat: "Meat" },
  { id: "g23", name: "Fish", emoji: "🐟", cat: "Meat" },
  { id: "g24", name: "Salt", emoji: "🧂", cat: "Condiments" },
  { id: "g25", name: "Olive Oil", emoji: "🫒", cat: "Condiments" },
  { id: "g26", name: "Soy Sauce", emoji: "🍶", cat: "Condiments" },
  { id: "g27", name: "Turmeric", emoji: "🌿", cat: "Condiments" },
  { id: "g28", name: "Cumin", emoji: "🌿", cat: "Condiments" },
  { id: "g29", name: "Frozen Peas", emoji: "🟢", cat: "Frozen" },
  { id: "g30", name: "Ice Cream", emoji: "🍦", cat: "Frozen" },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

const authHeaders = () => {
  const token =
    localStorage.getItem("influencerToken") ||
    localStorage.getItem("userToken");
  return token ? { Authorization: `Bearer ${token}` } : {};
};

const today = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const getStatus = (exp) => {
  const d = new Date(exp);
  d.setHours(0, 0, 0, 0);
  const diff = Math.round((d - today()) / (1000 * 60 * 60 * 24));
  if (diff < 0)
    return {
      label: "Expired",
      diff,
      cls: "bg-red-50 text-red-700 border-red-100",
    };
  if (diff <= 7)
    return {
      label: "Expiring Soon",
      diff,
      cls: "bg-amber-50 text-amber-700 border-amber-100",
    };
  return {
    label: "Fresh",
    diff,
    cls: "bg-green-50 text-green-700 border-green-100",
  };
};

const daysText = (diff) =>
  diff < 0 ? `${Math.abs(diff)}d ago` : diff === 0 ? "Today" : `${diff}d left`;

const inputCls =
  "w-full px-3 py-2.5 rounded-xl border border-stone-200 text-[13px] text-stone-800 bg-white outline-none " +
  "focus:border-teal-400 focus:ring-2 focus:ring-teal-50 transition-all font-sans";
const selectCls = inputCls + " appearance-none";

// ─── Sub-components ───────────────────────────────────────────────────────────

const StatCard = ({ label, value, color = "text-stone-800", icon: Icon }) => (
  <div className="bg-white border border-stone-200 rounded-2xl p-4 flex flex-col gap-1">
    <div className="flex items-center justify-between">
      <span
        className={`text-[26px] font-serif font-semibold leading-none ${color}`}
      >
        {value}
      </span>
      {Icon && <Icon size={18} className={color} />}
    </div>
    <p className="text-[11px] font-medium text-stone-400 uppercase tracking-widest mt-1">
      {label}
    </p>
  </div>
);

const Badge = ({ label, cls }) => (
  <span
    className={`inline-block text-[11px] font-medium px-2.5 py-0.5 rounded-full border ${cls}`}
  >
    {label}
  </span>
);

// ─── Add / Edit Modal ─────────────────────────────────────────────────────────

const ItemModal = ({ item, onSave, onClose, saving }) => {
  const [form, setForm] = useState(
    item ?? { name: "", cat: "", qty: "", exp: "", notes: "" },
  );
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const valid = form.name.trim() && form.exp;

  return (
    <div
      className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl animate-[fadeUp_.25s_ease_both]">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-serif text-[18px] font-semibold text-stone-900">
            {item ? "Edit Ingredient" : "Add Ingredient"}
          </h3>
          <button
            onClick={onClose}
            className="text-stone-400 hover:text-stone-600 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[12px] font-medium text-stone-600">
            Name <span className="text-red-400">*</span>
          </label>
          <input
            className={inputCls}
            placeholder="e.g. Milk"
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            autoFocus
          />
        </div>

        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-stone-600">
              Category
            </label>
            <select
              className={selectCls}
              value={form.cat}
              onChange={(e) => set("cat", e.target.value)}
            >
              <option value="">Select…</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-[12px] font-medium text-stone-600">
              Quantity
            </label>
            <input
              className={inputCls}
              placeholder="e.g. 500 g"
              value={form.qty}
              onChange={(e) => set("qty", e.target.value)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5 mb-4">
          <label className="text-[12px] font-medium text-stone-600">
            Expiry Date <span className="text-red-400">*</span>
          </label>
          <input
            type="date"
            className={inputCls}
            value={form.exp}
            onChange={(e) => set("exp", e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-1.5 mb-6">
          <label className="text-[12px] font-medium text-stone-600">
            Notes
          </label>
          <input
            className={inputCls}
            placeholder="Optional notes…"
            value={form.notes}
            onChange={(e) => set("notes", e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-stone-200 rounded-xl text-[13px] font-medium text-stone-600 hover:bg-stone-50 transition-all"
          >
            Cancel
          </button>
          <button
            onClick={() => onSave(form)}
            disabled={!valid || saving}
            className="px-5 py-2.5 bg-teal-600 hover:bg-teal-700 disabled:bg-stone-200
                       disabled:cursor-not-allowed text-white text-[13px] font-medium rounded-xl
                       transition-all inline-flex items-center gap-2"
          >
            {saving && <Loader2 size={13} className="animate-spin" />}
            {saving ? "Saving…" : "Save Item"}
          </button>
        </div>
      </div>
    </div>
  );
};

// ─── Inventory Tab ────────────────────────────────────────────────────────────

const InventoryTab = ({
  inventory,
  loading,
  onAdd,
  onEdit,
  onDelete,
  deletingId,
}) => {
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("");
  const [stFilter, setStFilter] = useState("");

  const filtered = useMemo(
    () =>
      inventory.filter((i) => {
        const s = getStatus(i.exp);
        return (
          (!search ||
            i.name.toLowerCase().includes(search.toLowerCase()) ||
            i.cat.toLowerCase().includes(search.toLowerCase())) &&
          (!catFilter || i.cat === catFilter) &&
          (!stFilter || s.label === stFilter)
        );
      }),
    [inventory, search, catFilter, stFilter],
  );

  const stats = useMemo(() => {
    let fresh = 0,
      expiring = 0,
      expired = 0;
    inventory.forEach((i) => {
      const s = getStatus(i.exp);
      if (s.label === "Fresh") fresh++;
      else if (s.label === "Expiring Soon") expiring++;
      else expired++;
    });
    return { fresh, expiring, expired };
  }, [inventory]);

  // Loading skeleton
  if (loading) {
    return (
      <div className="flex items-center justify-center py-24 text-stone-400 gap-2">
        <Loader2 size={18} className="animate-spin" />
        <span className="text-[13px]">Loading your pantry…</span>
      </div>
    );
  }

  const expiringSoon = inventory.filter(
    (i) => getStatus(i.exp).label === "Expiring Soon",
  );
  const expired = inventory.filter((i) => getStatus(i.exp).label === "Expired");

  return (
    <div className="flex flex-col gap-4">
      {/* ── Alert banners ── */}
      {expired.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
          <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <Trash2 size={15} className="text-red-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-red-700 mb-1">
              {expired.length} item{expired.length > 1 ? "s" : ""} expired
            </p>
            <div className="flex flex-wrap gap-1.5">
              {expired.map((i) => {
                const s = getStatus(i.exp);
                return (
                  <span
                    key={i._id ?? i.id}
                    className="inline-flex items-center gap-1 text-[11px] bg-red-100 text-red-700 px-2.5 py-1 rounded-full font-medium"
                  >
                    {i.name}{" "}
                    <span className="text-red-400 font-normal">
                      {Math.abs(s.diff)}d ago
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {expiringSoon.length > 0 && (
        <div className="flex items-start gap-3 px-4 py-3 bg-amber-50 border border-amber-100 rounded-xl">
          <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center shrink-0 mt-0.5">
            <AlertTriangle size={15} className="text-amber-500" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-semibold text-amber-700 mb-1">
              {expiringSoon.length} item{expiringSoon.length > 1 ? "s" : ""}{" "}
              expiring soon
            </p>
            <div className="flex flex-wrap gap-1.5">
              {expiringSoon.map((i,idx) => {
                const s = getStatus(i.exp);
                return (
                  <span
                    key={idx+50}
                    className="inline-flex items-center gap-1 text-[11px] bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-medium"
                  >
                    {i.name}{" "}
                    <span className="text-amber-500 font-normal">
                      {s.diff === 0 ? "today" : `${s.diff}d left`}
                    </span>
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {expiringSoon.length === 0 &&
        expired.length === 0 &&
        inventory.length > 0 && (
          <div className="flex items-center gap-3 px-4 py-3 bg-green-50 border border-green-100 rounded-xl">
            <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center shrink-0">
              <CheckCircle2 size={15} className="text-green-500" />
            </div>
            <p className="text-[13px] font-medium text-green-700">
              All {inventory.length} items are fresh — your pantry looks great!
            </p>
          </div>
        )}

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard
          label="Total Items"
          value={inventory.length}
          icon={Package}
          color="text-stone-800"
        />
        <StatCard
          label="Fresh"
          value={stats.fresh}
          icon={CheckCircle2}
          color="text-green-600"
        />
        <StatCard
          label="Expiring Soon"
          value={stats.expiring}
          icon={AlertTriangle}
          color="text-amber-500"
        />
        <StatCard
          label="Expired"
          value={stats.expired}
          icon={X}
          color="text-red-500"
        />
      </div>

      {/* Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 flex-wrap gap-3">
          <div>
            <h3 className="font-serif text-[16px] font-semibold text-stone-900">
              Ingredients
            </h3>
            <p className="text-[12px] text-stone-400 mt-0.5">
              Manage your pantry items
            </p>
          </div>
          <button
            onClick={onAdd}
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-teal-600 hover:bg-teal-700
                       text-white text-[13px] font-medium rounded-xl transition-all active:scale-[0.98]"
          >
            <Plus size={14} /> Add Item
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 px-5 py-3 border-b border-stone-100">
          <input
            className={`${inputCls} flex-1 min-w-40`}
            placeholder="Search ingredients…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className={`${selectCls} w-auto`}
            value={catFilter}
            onChange={(e) => setCatFilter(e.target.value)}
          >
            <option value="">All categories</option>
            {CATEGORIES.map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
          <select
            className={`${selectCls} w-auto`}
            value={stFilter}
            onChange={(e) => setStFilter(e.target.value)}
          >
            <option value="">All status</option>
            {["Fresh", "Expiring Soon", "Expired"].map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-stone-50 border-b border-stone-100">
                {[
                  "Name",
                  "Category",
                  "Quantity",
                  "Expiry Date",
                  "Status",
                  "Actions",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-5 py-2.5 text-left text-[11px] font-medium text-stone-400 uppercase tracking-widest whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-5 py-10 text-center text-[13px] text-stone-400"
                  >
                    {inventory.length === 0
                      ? "No items yet — add your first ingredient!"
                      : "No items match your filters"}
                  </td>
                </tr>
              ) : (
                filtered.map((item, idx) => {
                  const s = getStatus(item.exp);
                  const itemId = item._id ?? item.id;
                  const isDeleting = deletingId === itemId;
                  const daysCls =
                    s.diff < 0
                      ? "text-red-500"
                      : s.diff <= 3
                        ? "text-amber-500"
                        : "text-stone-400";
                  return (
                    <tr
                      key={itemId}
                      className={`border-b border-stone-100 last:border-0 transition-colors
                                  ${isDeleting ? "opacity-40" : "hover:bg-stone-50"}`}
                      style={{
                        animation: `fadeUp .3s ${idx * 0.04}s ease both`,
                        animationFillMode: "both",
                      }}
                    >
                      <td className="px-5 py-3">
                        <p className="text-[13px] font-medium text-stone-800">
                          {item.name}
                        </p>
                        {item.notes && (
                          <p className="text-[11px] text-stone-400 mt-0.5">
                            {item.notes}
                          </p>
                        )}
                      </td>
                      <td className="px-5 py-3">
                        <span className="text-[11px] bg-stone-100 text-stone-600 px-2.5 py-1 rounded-full font-medium">
                          {item.cat || "—"}
                        </span>
                      </td>
                      <td className="px-5 py-3 text-[13px] text-stone-600">
                        {item.qty || "—"}
                      </td>
                      <td className="px-5 py-3">
                        <p className="text-[13px] text-stone-700">{item.exp}</p>
                        <p className={`text-[11px] mt-0.5 ${daysCls}`}>
                          {daysText(s.diff)}
                        </p>
                      </td>
                      <td className="px-5 py-3">
                        <Badge label={s.label} cls={s.cls} />
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-1.5">
                          <button
                            onClick={() => onEdit(item)}
                            disabled={isDeleting}
                            className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center
                                       text-stone-500 hover:bg-sky-50 hover:border-sky-200 hover:text-sky-600 transition-all"
                          >
                            <Pencil size={12} />
                          </button>
                          <button
                            onClick={() => onDelete(itemId)}
                            disabled={isDeleting}
                            className="w-7 h-7 rounded-lg border border-stone-200 flex items-center justify-center
                                       text-stone-500 hover:bg-red-50 hover:border-red-200 hover:text-red-500 transition-all"
                          >
                            {isDeleting ? (
                              <Loader2 size={12} className="animate-spin" />
                            ) : (
                              <Trash2 size={12} />
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Grocery Tab (unchanged) ──────────────────────────────────────────────────
const GroceryTab = () => {
  const [checked, setChecked] = useState(new Set());
  const [search, setSearch] = useState("");
  const [generated, setGenerated] = useState(null);
  const [copied, setCopied] = useState(false);
  const [customItems, setCustomItems] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [customEmoji, setCustomEmoji] = useState("🛒");
  const [showCustom, setShowCustom] = useState(false);

  // Merge predefined + custom
  const allItems = useMemo(
    () => [...GROCERY_ITEMS, ...customItems],
    [customItems],
  );

  const filtered = useMemo(
    () =>
      allItems.filter(
        (g) => !search || g.name.toLowerCase().includes(search.toLowerCase()),
      ),
    [allItems, search],
  );

  const toggle = (id) =>
    setChecked((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });

  const selectAll = (val) =>
    setChecked(val ? new Set(allItems.map((g) => g.id)) : new Set());

  const generateList = () =>
    setGenerated(allItems.filter((g) => checked.has(g.id)));

  const copyList = () => {
    if (!generated) return;
    navigator.clipboard.writeText(generated.map((g) => g.name).join(", "));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Add custom item
  const addCustomItem = () => {
    const name = customInput.trim();
    if (!name) return;
    const id = `custom-${Date.now()}`;
    const newItem = { id, name, emoji: customEmoji, cat: "Custom" };
    setCustomItems((prev) => [...prev, newItem]);
    setChecked((prev) => {
      const n = new Set(prev);
      n.add(id);
      return n;
    }); // auto-check it
    setCustomInput("");
    setCustomEmoji("🛒");
  };

  const removeCustomItem = (id) => {
    setCustomItems((prev) => prev.filter((g) => g.id !== id));
    setChecked((prev) => {
      const n = new Set(prev);
      n.delete(id);
      return n;
    });
  };

  const handleCustomKey = (e) => {
    if (e.key === "Enter") addCustomItem();
  };

  // Group by category
  const byCategory = useMemo(() => {
    const groups = {};
    filtered.forEach((g) => {
      if (!groups[g.cat]) groups[g.cat] = [];
      groups[g.cat].push(g);
    });
    return groups;
  }, [filtered]);

  const EMOJI_OPTIONS = [
    "🛒",
    "🥩",
    "🥦",
    "🍎",
    "🧃",
    "🥫",
    "🧁",
    "🫙",
    "🧴",
    "🍜",
    "🌶️",
    "🥜",
  ];

  return (
    <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-stone-100 flex-wrap gap-3">
        <div>
          <h3 className="font-serif text-[16px] font-semibold text-stone-900">
            Grocery List Builder
          </h3>
          <p className="text-[12px] text-stone-400 mt-0.5">
            Check items you need, or add your own
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button
            onClick={() => setShowCustom((v) => !v)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[12px] font-medium border transition-all
              ${
                showCustom
                  ? "bg-teal-50 border-teal-300 text-teal-700"
                  : "border-stone-200 text-stone-600 hover:bg-stone-50"
              }`}
          >
            <Plus size={12} /> Add Custom
          </button>
          <button
            onClick={() => selectAll(true)}
            className="px-3 py-1.5 border border-stone-200 rounded-lg text-[12px] text-stone-600 hover:bg-stone-50 transition-all"
          >
            Select all
          </button>
          <button
            onClick={() => selectAll(false)}
            className="px-3 py-1.5 border border-stone-200 rounded-lg text-[12px] text-stone-600 hover:bg-stone-50 transition-all"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Custom item input panel */}
      {showCustom && (
        <div className="px-5 py-4 border-b border-stone-100 bg-teal-50/50 animate-[fadeUp_.2s_ease_both]">
          <p className="text-[12px] font-medium text-stone-600 mb-3">
            Add a custom grocery item
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Emoji picker */}
            <div className="relative">
              <select
                value={customEmoji}
                onChange={(e) => setCustomEmoji(e.target.value)}
                className="w-16 h-10 border border-stone-200 rounded-xl bg-white text-center text-[16px] outline-none
                           focus:border-teal-400 focus:ring-2 focus:ring-teal-50 cursor-pointer appearance-none px-2"
              >
                {EMOJI_OPTIONS.map((e) => (
                  <option key={e} value={e}>
                    {e}
                  </option>
                ))}
              </select>
            </div>

            {/* Name input */}
            <input
              className={`${inputCls} flex-1 min-w-40`}
              placeholder="Item name, e.g. Almond Milk"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              onKeyDown={handleCustomKey}
            />

            <button
              onClick={addCustomItem}
              disabled={!customInput.trim()}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-teal-600 hover:bg-teal-700
                         disabled:bg-stone-200 disabled:cursor-not-allowed text-white text-[13px]
                         font-medium rounded-xl transition-all active:scale-[0.98]"
            >
              <Plus size={13} /> Add
            </button>
          </div>

          {/* Existing custom items */}
          {customItems.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-3">
              {customItems.map((g) => (
                <span
                  key={g.id}
                  className="inline-flex items-center gap-1.5 bg-white border border-teal-200 text-teal-800
                             text-[12px] font-medium px-2.5 py-1 rounded-full"
                >
                  {g.emoji} {g.name}
                  <button
                    onClick={() => removeCustomItem(g.id)}
                    className="text-teal-400 hover:text-teal-700 transition-colors leading-none"
                  >
                    <X size={11} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search */}
      <div className="px-5 py-3 border-b border-stone-100">
        <input
          className={`${inputCls} max-w-xs`}
          placeholder="Search grocery items…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Items grouped by category */}
      <div className="px-5 py-4 max-h-105 overflow-y-auto">
        {Object.entries(byCategory).map(([cat, items]) => (
          <div key={cat} className="mb-5 last:mb-0">
            <div className="flex items-center gap-2 mb-2">
              <p className="text-[11px] font-semibold text-stone-400 uppercase tracking-widest">
                {cat}
              </p>
              {cat === "Custom" && (
                <span className="text-[10px] bg-teal-100 text-teal-700 px-2 py-0.5 rounded-full font-medium">
                  yours
                </span>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
              {items.map((g) => {
                const isChecked = checked.has(g.id);
                const isCustom = g.id.startsWith("custom-");
                return (
                  <div key={g.id} className="relative">
                    <button
                      onClick={() => toggle(g.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-xl border text-left transition-all
                        ${
                          isChecked
                            ? "border-teal-300 bg-teal-50"
                            : "border-stone-200 bg-white hover:border-teal-200 hover:bg-teal-50/50"
                        }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-[5px] border-[1.5px] flex items-center justify-center shrink-0 transition-all
                          ${isChecked ? "bg-teal-600 border-teal-600" : "border-stone-300"}`}
                      >
                        {isChecked && (
                          <Check
                            size={10}
                            className="text-white"
                            strokeWidth={3}
                          />
                        )}
                      </div>
                      <span className="text-[14px]">{g.emoji}</span>
                      <span
                        className={`text-[12px] font-medium leading-tight flex-1 ${isChecked ? "text-teal-700" : "text-stone-700"}`}
                      >
                        {g.name}
                      </span>
                    </button>
                    {/* Remove button for custom items */}
                    {isCustom && (
                      <button
                        onClick={() => removeCustomItem(g.id)}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-red-100 border border-red-200 rounded-full
                                   flex items-center justify-center text-red-500 hover:bg-red-200 transition-all"
                      >
                        <X size={8} />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-5 py-3 border-t border-stone-100 flex items-center justify-between flex-wrap gap-3 bg-stone-50">
        <span className="text-[13px] text-stone-500">
          {checked.size} item{checked.size !== 1 ? "s" : ""} selected
          {customItems.length > 0 && (
            <span className="ml-2 text-[12px] text-teal-600">
              · {customItems.length} custom
            </span>
          )}
        </span>
        <button
          onClick={generateList}
          disabled={checked.size === 0}
          className={`inline-flex items-center gap-1.5 px-5 py-2 rounded-xl text-[13px] font-medium transition-all active:scale-[0.98]
            ${
              checked.size > 0
                ? "bg-stone-900 hover:bg-stone-700 text-white"
                : "bg-stone-100 text-stone-400 cursor-not-allowed"
            }`}
        >
          <ShoppingCart size={14} /> Generate List
        </button>
      </div>

      {/* Generated list output */}
      {generated && (
        <div className="px-5 py-4 border-t border-stone-100 animate-[fadeUp_.3s_ease_both]">
          <div className="flex items-center justify-between mb-3">
            <p className="text-[12px] font-semibold text-stone-400 uppercase tracking-widest">
              Your grocery list ({generated.length} items)
            </p>
            <div className="flex gap-2">
              <button
                onClick={copyList}
                className="inline-flex items-center gap-1 px-3 py-1.5 border border-stone-200 rounded-lg
                           text-[12px] text-stone-600 hover:bg-stone-50 transition-all"
              >
                {copied ? (
                  <>
                    <Check size={12} className="text-green-500" /> Copied!
                  </>
                ) : (
                  "Copy"
                )}
              </button>
              <button
                onClick={() => setGenerated(null)}
                className="px-3 py-1.5 border border-red-100 rounded-lg text-[12px] text-red-500 hover:bg-red-50 transition-all"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="flex flex-wrap gap-2">
            {generated.map((g) => (
              <span
                key={g.id}
                className={`inline-flex items-center gap-1.5 text-[12px] font-medium px-3 py-1.5 rounded-full
                  ${
                    g.id.startsWith("custom-")
                      ? "bg-teal-50 text-teal-800 border border-teal-200"
                      : "bg-stone-100 text-stone-700"
                  }`}
              >
                {g.emoji} {g.name}
                {g.id.startsWith("custom-") && (
                  <span className="text-[10px] text-teal-600 font-normal">
                    custom
                  </span>
                )}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────

const InventoryManager = () => {
  const location = useLocation();
  let token;
  if (location.pathname.includes("user")) {
    token = localStorage.getItem("userToken");
  } else if (location.pathname.includes("influencer")) {
    token = localStorage.getItem("influencerToken");
  } else {
    token = localStorage.getItem("doctortoken");
  }
  const [tab, setTab] = useState("inventory");
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [modal, setModal] = useState(null); // null | "add" | item
  const [error, setError] = useState("");

  // ── Fetch on mount ─────────────────────────────────────────────────────────
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        setLoading(true);
        const res = await axios.get("mongodb+srv://alkeshmahamune12_db_user:tjn24OLaUtx8MsTN@cluster0.sm10gkk.mongodb.net/?appName=Cluster0/api/inventory/", {
          headers: {
            Authorization: token,
          },
        });
        setInventory(res.data.items || []);
      } catch (e) {
        setError(e.response?.data?.message || "Failed to load inventory");
      } finally {
        setLoading(false);
      }
    };
    fetchInventory();
  }, []);

  // ── Add / Edit ─────────────────────────────────────────────────────────────
  const handleSave = async (form) => {
    setSaving(true);
    try {
      if (modal === "add") {
        // POST
        const res = await axios.post(
          "mongodb+srv://alkeshmahamune12_db_user:tjn24OLaUtx8MsTN@cluster0.sm10gkk.mongodb.net/?appName=Cluster0/api/inventory/add",
          form,
          { headers: { Authorization: token } },
        );
        console.log(res.data)
        setInventory((prev) => [...prev, res.data.item]);
      } else {
        // PUT
        const itemId = modal._id ?? modal.id;
        const res = await axios.put(`/api/inventory/${itemId}`, form, {
          headers: { Authorization: token },
        });
        setInventory((prev) =>
          prev.map((i) =>
            String(i._id ?? i.id) === String(itemId) ? res.data.item : i,
          ),
        );
      }
      setModal(null);
    } catch (e) {
      setError(e.response?.data?.message || "Failed to save item");
    } finally {
      setSaving(false);
    }
  };

  // ── Delete ─────────────────────────────────────────────────────────────────
  const handleDelete = async (item) => {
  const itemId = item?._id || item?.id;

  console.log(itemId);

  if (!window.confirm("Delete this item?")) return;
  setDeletingId(itemId);

  try {
    await axios.delete(`/api/inventory/${itemId}`, {
      headers: { Authorization: token },
    });

    setInventory((prev) =>
      prev.filter((i) => String(i._id ?? i.id) !== String(itemId))
    );
  } catch (e) {
    setError(e.response?.data?.message || "Failed to delete item");
  } finally {
    setDeletingId(null);
  }
};

  return (
    <>
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(10px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .font-serif { font-family: Georgia, 'Times New Roman', serif; }
      `}</style>

      <div className="max-w-6xl mx-auto px-4 py-8 min-h-screen">
        <div className="mb-6" style={{ animation: "fadeUp .35s ease both" }}>
          <h2 className="text-xl font-semibold text-gray-800">
            Pantry & Inventory
          </h2>
          <p className="text-[13px] text-stone-500">
            Track expiry dates and manage your grocery needs
          </p>
        </div>

        {/* ── Error banner ── */}
        {error && (
          <div className="flex items-center justify-between mb-4 px-4 py-3 bg-red-50 border border-red-100 rounded-xl">
            <p className="text-[13px] text-red-600">{error}</p>
            <button
              onClick={() => setError("")}
              className="text-red-400 hover:text-red-600"
            >
              <X size={14} />
            </button>
          </div>
        )}

        {/* ── Tabs ── */}
        <div className="flex gap-1 bg-white border border-stone-200 rounded-xl p-1 w-fit mb-6">
          {[
            { key: "inventory", label: "Inventory" },
            { key: "grocery", label: "Grocery List" },
          ].map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-2 rounded-lg text-[13px] font-medium transition-all ${
                tab === t.key
                  ? "bg-teal-600 text-white"
                  : "text-stone-500 hover:text-stone-800 hover:bg-stone-50"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {tab === "inventory" && (
          <InventoryTab
            inventory={inventory}
            loading={loading}
            onAdd={() => setModal("add")}
            onEdit={(item) => setModal(item)}
            onDelete={(item)=>handleDelete(item._id)}
            deletingId={deletingId}
          />
        )}
        {tab === "grocery" && <GroceryTab />}

        {modal !== null && (
          <ItemModal
            item={modal === "add" ? null : modal}
            onSave={handleSave}
            onClose={() => !saving && setModal(null)}
            saving={saving}
          />
        )}
      </div>
    </>
  );
};

export default InventoryManager;
