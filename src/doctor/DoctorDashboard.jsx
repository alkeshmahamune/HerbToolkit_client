import React, { useState, Suspense, lazy } from "react";
import {
  BookOpen,
  PlusSquare,
  Search,
  ChevronDown,
  PanelLeft,
  PanelLeftClose,
  HomeIcon,
  Bot,
  Barcode,
  Warehouse,
  Bookmark,
  LogOut,
  Check
} from "lucide-react";
import HerbToolkit from "../assets/HerbToolkit.png";
import { Khalbatta } from "../CustomIcons";

// pages imports - lazy loaded
const Home = lazy(() => import("./pages/Home"));
const PersonalizedRecipe = lazy(() => import("./pages/PersonalizedRecipe"));
const DoctorAddRecipe = lazy(() =>
  import("./pages/DoctorAddRecipe")
);
const AIRecipegenerator = lazy(() => import("./pages/AIRecipegenerator"));
const InventoryManagerDr = lazy(() => import("./pages/InventoryManager"));
const HerbalRecipeDr=lazy(()=>import('./pages/HerbalRecipeDr'))
const SavedRecipeDr=lazy(()=>import('./pages/SavedRecipeDr'))
const ApproveRecipe=lazy(()=>import('./pages/ApproveRecipe'))

export default function RecipeDashboard() {
  const menus = [
    { name: "Home", icon: HomeIcon, component: Home },
    { name: "Personalized Recipes", icon: BookOpen, component: PersonalizedRecipe },
    { name: "Add Recipe", icon: PlusSquare, component: DoctorAddRecipe },
    { name: "Herbal Kitchen", icon: Khalbatta, component: HerbalRecipeDr },
    { name: "AI Recipe Suggestion", icon: Bot, component: AIRecipegenerator },
    { name: "Inventory Management", icon: Warehouse, component: InventoryManagerDr },
    { name: "Saved Recipies", icon: Bookmark, component: SavedRecipeDr },
    { name: "Review Recipies", icon: Check, component: ApproveRecipe },
  ];

  const [collapsed, setCollapsed] = useState(false);
  const [active, setActive] = useState(0);

  const ActiveComponent = menus[active].component;

  const handleLogout = () => {
  // clear auth data
  localStorage.removeItem("token");

  // redirect to login
  navigate("/login");
};

  return (
    <div className="flex h-screen bg-gray-50 font-[Poppins]">
      {/* Sidebar */}
      <aside
        className={`bg-white  shadow-md flex flex-col transition-all duration-300
        ${collapsed ? "w-20" : "w-64"}`}
      >
        {/* Logo */}
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-gray-200">
          <div
            className={`flex items-center gap-3 transition-all duration-300 ${collapsed ? "justify-center" : "px-4"}`}
          >
            {/* Logo */}
            <div className="bg-green-100 p-2 rounded-xl shadow-sm">
              <img
                src={HerbToolkit}
                alt="HerbToolkit Logo"
                className="w-8 h-8 object-contain"
              />
            </div>

            {/* App Name */}
            {!collapsed && (
              <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
                HerbToolkit
              </h1>
            )}
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex items-center border-b border-gray-200">
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`w-full flex items-center transition-all duration-300 
    ${collapsed ? "justify-center" : "justify-end pr-4"} 
    py-3 hover:bg-gray-100`}
          >
            {collapsed ? (
              <PanelLeft size={20} className="text-gray-600" />
            ) : (
              <PanelLeftClose size={20} className="text-gray-600" />
            )}
          </button>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 px-2 space-y-2 mt-2">
          {menus.map((menu, index) => {
            const Icon = menu.icon;

            return (
              <div
                key={index}
                onClick={() => setActive(index)}
                className={`flex items-center ${collapsed ? "justify-center" : "justify-start"} gap-3 px-3 py-3 rounded-lg cursor-pointer transition
                ${
                  active === index
                    ? "bg-teal-600 text-white"
                    : "text-gray-600 hover:bg-teal-100"
                }`}
              >
                <Icon size={20} />
                {!collapsed && <span className="text-sm">{menu.name}</span>}
              </div>
            );
          })}
        </nav>
        <div className="p-3 border-t border-gray-200">
  <button
    onClick={handleLogout}
    className={`w-full flex items-center gap-3 px-3 py-3 rounded-lg cursor-pointer transition
    text-red-500 hover:bg-red-50 ${collapsed ? "justify-center" : ""}`}
  >
    <LogOut size={20} />
    {!collapsed && <span className="text-sm font-medium">Logout</span>}
  </button>
</div>
      </aside>

      {/* Right Section */}
      <div className="flex flex-col flex-1">
        {/* Header */}
        <header className="sticky shadow-md top-0 h-16 bg-white flex items-center justify-between px-6">
          {/* Logo */}
          <div className="text-lg font-semibold text-gray-700">Hello User!</div>

          {/* Search */}
          <div className="relative w-72">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="Search recipes..."
              className="w-full pl-9 pr-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-teal-400"
            />
          </div>

          {/* Profile */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 bg-teal-600 text-white rounded-full flex items-center justify-center text-sm font-semibold">
              A
            </div>
            {/* <span className="text-sm text-gray-700">Alex</span> */}
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="bg-white rounded-xl shadow-sm p-6 min-h-100">
            <Suspense
              fallback={
                <div className="flex items-center justify-center h-64">
                  <div className="text-gray-500">Loading...</div>
                </div>
              }
            >
              <ActiveComponent />
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}
