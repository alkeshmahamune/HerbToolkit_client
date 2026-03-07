export const RECIPES = [
  { id:1, name:"Spaghetti Carbonara",   cat:"Pasta",    time:30, rating:4.8, views:2430, likes:186, img:"🍝", difficulty:"Medium", featured:true  },
  { id:2, name:"Avocado Toast Supreme", cat:"Breakfast",time:15, rating:4.6, views:1820, likes:143, img:"🥑", difficulty:"Easy",   featured:false },
  { id:3, name:"Thai Green Curry",      cat:"Asian",    time:45, rating:4.9, views:3120, likes:241, img:"🍲", difficulty:"Hard",   featured:true  },
  { id:4, name:"Classic Beef Burger",   cat:"Grills",   time:25, rating:4.5, views:1560, likes:118, img:"🍔", difficulty:"Easy",   featured:false },
  { id:5, name:"Mango Tiramisu",        cat:"Desserts", time:60, rating:4.7, views:2100, likes:167, img:"🍮", difficulty:"Medium", featured:false },
  { id:6, name:"Lemon Herb Salmon",     cat:"Seafood",  time:20, rating:4.8, views:1990, likes:155, img:"🐟", difficulty:"Easy",   featured:true  },
];

export const CATS = [
  { name:"Breakfast", count:24, icon:"🍳", col:"#fef3c7" },
  { name:"Pasta",     count:18, icon:"🍝", col:"#fff1eb"  },
  { name:"Asian",     count:31, icon:"🍜", col:"#edf7f2"  },
  { name:"Desserts",  count:22, icon:"🍰", col:"#fdf2f8"  },
  { name:"Seafood",   count:15, icon:"🦞", col:"#eff6ff"  },
  { name:"Grills",    count:19, icon:"🍖", col:"#fef2f2"  },
  { name:"Salads",    count:12, icon:"🥗", col:"#edf7f2"  },
  { name:"Soups",     count:9,  icon:"🍲", col:"#fffbeb"  },
];

export const SHOPPING_ITEMS = [
  { id:1, item:"Cherry Tomatoes", qty:"500g",    cat:"Vegetables", done:false },
  { id:2, item:"Parmesan Cheese", qty:"200g",    cat:"Dairy",      done:true  },
  { id:3, item:"Spaghetti",       qty:"400g",    cat:"Pantry",     done:false },
  { id:4, item:"Heavy Cream",     qty:"1 cup",   cat:"Dairy",      done:false },
  { id:5, item:"Garlic",          qty:"6 cloves",cat:"Vegetables", done:true  },
  { id:6, item:"Olive Oil",       qty:"3 tbsp",  cat:"Pantry",     done:false },
];

export const NOTIFS = [
  { id:1, type:"like",    text:"Marco liked your Salmon recipe",     time:"5m ago",  read:false },
  { id:2, type:"comment", text:"New comment on Thai Green Curry",     time:"22m ago", read:false },
  { id:3, type:"system",  text:"Your recipe was featured this week!", time:"1h ago",  read:false },
  { id:4, type:"like",    text:"Sofia saved your Tiramisu recipe",   time:"3h ago",  read:true  },
  { id:5, type:"comment", text:"New comment on Classic Beef Burger",  time:"1d ago",  read:true  },
];

export const COMMENTS_DATA = [
  { id:1, user:"Alice B.",  recipe:"Carbonara",    text:"Absolutely divine! The creaminess was perfect.",  rating:5, time:"2h ago", av:"A" },
  { id:2, user:"Tom S.",    recipe:"Thai Curry",   text:"Needed a bit more heat for my taste, but great!", rating:4, time:"5h ago", av:"T" },
  { id:3, user:"Riya M.",   recipe:"Avocado Toast",text:"So quick and healthy — my go-to breakfast now.",  rating:5, time:"1d ago", av:"R" },
  { id:4, user:"Carlos F.", recipe:"Beef Burger",  text:"Best burger recipe I've found online!",           rating:5, time:"2d ago", av:"C" },
];

export const WEEK = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];

export const MEAL_PLAN = {
  Mon:{ breakfast:"Avocado Toast",  lunch:"Lemon Salmon", dinner:"Thai Curry"  },
  Tue:{ breakfast:"Oats Bowl",      lunch:"Caesar Salad", dinner:"Carbonara"   },
  Wed:{ breakfast:"",               lunch:"Beef Burger",  dinner:"Miso Soup"   },
  Thu:{ breakfast:"Egg Muffins",    lunch:"",             dinner:"Stir Fry"    },
  Fri:{ breakfast:"Smoothie Bowl",  lunch:"Pasta Salad",  dinner:"BBQ Ribs"    },
  Sat:{ breakfast:"Pancakes",       lunch:"Tacos",        dinner:"Pizza"       },
  Sun:{ breakfast:"French Toast",   lunch:"Brunch Bowl",  dinner:"Roast"       },
};

export const NAV = [
  { id:"dashboard",     label:"Dashboard",          sec:"main"   },
  { id:"all-recipes",   label:"All Recipes",         sec:"main"   },
  { id:"add-recipe",    label:"Add Recipe",          sec:"main"   },
  { id:"categories",    label:"Categories",          sec:"main"   },
  { id:"ingredients",   label:"Ingredients Manager", sec:"main"   },
  { id:"planner",       label:"Meal Planner",        sec:"manage" },
  { id:"favorites",     label:"Favorites",           sec:"manage" },
  { id:"my-recipes",    label:"My Recipes",          sec:"manage" },
  { id:"shopping",      label:"Shopping List",       sec:"manage" },
  { id:"analytics",     label:"Recipe Analytics",    sec:"manage" },
  { id:"comments",      label:"Comments & Reviews",  sec:"other",  badge:5 },
  { id:"notifications", label:"Notifications",       sec:"other",  badge:3 },
  { id:"settings",      label:"Settings",            sec:"other"  },
  { id:"help",          label:"Help & Support",      sec:"other"  },
  { id:"logout",        label:"Logout",              sec:"other",  danger:true },
];

export const NAV_SECTIONS = [
  { key:"main",   label:"Kitchen" },
  { key:"manage", label:"Manage"  },
  { key:"other",  label:"Account" },
];
