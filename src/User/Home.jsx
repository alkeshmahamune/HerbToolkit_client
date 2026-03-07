import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header  from "../components/HeaderDashboard";

import Dashboard          from "./pages/Dashboard";
import AllRecipes         from "./pages/AllRecipes";
import AddRecipe          from "./pages/AddRecipe";
import Categories         from "./pages/Categories";
import Ingredients        from "./pages/Ingredients";
import MealPlanner        from "./pages/MealPlanner";
import { Favorites, MyRecipes } from "./pages/FavoritesAndMyRecipes";
import ShoppingList       from "./pages/ShoppingList";
import Analytics          from "./pages/Analytics";
import Comments           from "./pages/Comments";
import Notifications      from "./pages/Notifications";
import Settings           from "./pages/Settings";
import Help               from "./pages/Help";
import Logout             from "./pages/Logout";

const PAGES = {
  dashboard:     Dashboard,
  "all-recipes": AllRecipes,
  "add-recipe":  AddRecipe,
  categories:    Categories,
  ingredients:   Ingredients,
  planner:       MealPlanner,
  favorites:     Favorites,
  "my-recipes":  MyRecipes,
  shopping:      ShoppingList,
  analytics:     Analytics,
  comments:      Comments,
  notifications: Notifications,
  settings:      Settings,
  help:          Help,
  logout:        Logout,
};

const Home=()=>{
  const [collapsed,  setCollapsed] = useState(false);
  const [active,     setActive]    = useState("dashboard");
  const [mobileOpen, setMobile]    = useState(false);

  const Page = PAGES[active] || Dashboard;

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: "#fafaf8", fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex" style={{ flexShrink: 0 }}>
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          active={active}
          setActive={setActive}
          mobile={false}
          onClose={() => {}}
        />
      </div>

      {/* Mobile Sidebar */}
      {mobileOpen && (
        <Sidebar
          collapsed={false}
          setCollapsed={() => {}}
          active={active}
          setActive={setActive}
          mobile={true}
          onClose={() => setMobile(false)}
        />
      )}

      {/* Main area */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden" }}>
        <Header onMenuClick={() => setMobile(true)} />
        <main style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          <Page key={active} />
        </main>
      </div>
    </div>
  );
}
export default Home