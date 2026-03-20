import indian from '../assets/indian.jpg'
import italian from '../assets/italian.jpg'
import asian from '../assets/asian.jpg'
import chinese from '../assets/chinese.jpg'
import continental from '../assets/continental.jpg'
import japanese from '../assets/japanese.jpg'
import korean from '../assets/korean.jpg'
import mexican from '../assets/mexican.jpg'
import spaghetti from '../assets/pastaspaghetti.jpg'
import biryani from "../assets/biryani.jpg"

// ── Categories (your existing data) ──────────────────────────────────────────
export const catData = [
  { id:1, heading:"Breakfast",  cover:"https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=600&q=80" },
  { id:2, heading:"Lunch",      cover:"https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" },
  { id:3, heading:"Dinner",     cover:"https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&q=80" },
  { id:4, heading:"Desserts",   cover:"https://images.unsplash.com/photo-1551024601-bec78aea704b?w=600&q=80" },
  { id:5, heading:"Snacks",     cover:"https://images.unsplash.com/photo-1528735602780-2552fd46c7af?w=600&q=80" },
  { id:6, heading:"Drinks",     cover:"https://images.unsplash.com/photo-1570197788417-0e82375c9371?w=600&q=80" },
];

// ── Cuisines (your data) ──────────────────────────────────────────────────────
export const data = [
  { id:1, cover:indian,       heading:"Indian"       },
  { id:2, cover:italian,      heading:"Italian"      },
  { id:3, cover:asian,        heading:"Asian"        },
  { id:4, cover:chinese,      heading:"Chinese"      },
  { id:5, cover:continental,  heading:"Continental"  },
  { id:6, cover:japanese,     heading:"Japanese"     },
  { id:7, cover:korean,       heading:"Korean"       },
  { id:8, cover:mexican,      heading:"Mexican"      },
];

// ── Dishes per cuisine ────────────────────────────────────────────────────────
export const cuisineDishes = {
  1: [ // Indian
    { name:"Butter Chicken",  cat:"Indian", img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80",  channel:"Sanjeev Kapoor",  subs:"4.2M", views:"8.4M",  likes:198000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Biryani",         cat:"Indian", img:biryani,                                                                    channel:"Hebbars Kitchen", subs:"6.8M", views:"11.2M", likes:234000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Palak Paneer",    cat:"Indian", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80",  channel:"Vahchef",         subs:"3.1M", views:"3.2M",  likes:62000,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Dal Makhani",     cat:"Indian", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",    channel:"Chef Ranveer",    subs:"2.9M", views:"2.9M",  likes:55100,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Masala Dosa",     cat:"Indian", img:"https://images.unsplash.com/photo-1630407613729-c81da9f2c1c3?w=400&q=80", channel:"Sanjeev Kapoor",  subs:"4.2M", views:"3.8M",  likes:72100,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Chole Bhature",   cat:"Indian", img:"https://images.unsplash.com/photo-1626200926279-3c4a5a46f8b2?w=400&q=80", channel:"Hebbars Kitchen", subs:"6.8M", views:"4.1M",  likes:81200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  2: [ // Italian
    { name:"Spaghetti Carbonara", cat:"Italian", img:spaghetti,                                                                                        channel:"Pasta Grannies",   subs:"1.8M", views:"5.2M",  likes:114000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Margherita Pizza",    cat:"Italian", img:"https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80",                        channel:"Italia Squisita",  subs:"3.2M", views:"6.1M",  likes:139000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Risotto",             cat:"Italian", img:"https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",                        channel:"Gordon Ramsay",    subs:"18M",  views:"4.8M",  likes:104000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Tiramisu",            cat:"Italian", img:"https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",                        channel:"Bake With Me",     subs:"2.3M", views:"2.4M",  likes:52300,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Lasagne",             cat:"Italian", img:"https://images.unsplash.com/photo-1619895092538-128341789043?w=400&q=80",                        channel:"Italia Squisita",  subs:"3.2M", views:"3.7M",  likes:78400,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Bruschetta",          cat:"Italian", img:"https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80",                        channel:"Pasta Grannies",   subs:"1.8M", views:"1.9M",  likes:41200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  3: [ // Asian
    { name:"Pad Thai",        cat:"Asian", img:"https://images.unsplash.com/photo-1559314809-0d155014e29e?w=400&q=80",  channel:"Hot Thai Kitchen", subs:"2.1M", views:"4.4M",  likes:96000,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Green Curry",     cat:"Asian", img:"https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=400&q=80",channel:"Marion's Kitchen", subs:"3.8M", views:"3.1M",  likes:68200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Pho Soup",        cat:"Asian", img:"https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=400&q=80",channel:"Pho Fanatics",     subs:"890K", views:"2.2M",  likes:47800,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Banh Mi",         cat:"Asian", img:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80",  channel:"Hot Thai Kitchen", subs:"2.1M", views:"1.8M",  likes:38900,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Laksa",           cat:"Asian", img:"https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=400&q=80",channel:"Marion's Kitchen", subs:"3.8M", views:"2.6M",  likes:55100,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Nasi Goreng",     cat:"Asian", img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80",channel:"Pho Fanatics",     subs:"890K", views:"1.4M",  likes:29700,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  4: [ // Chinese
    { name:"Kung Pao Chicken",  cat:"Chinese", img:"https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&q=80", channel:"Chinese Cooking Demystified", subs:"2.6M", views:"5.8M",  likes:124000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Dim Sum",           cat:"Chinese", img:"https://images.unsplash.com/photo-1563245372-f21724e3856d?w=400&q=80", channel:"Woks of Life",                subs:"1.4M", views:"3.4M",  likes:74000,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Peking Duck",       cat:"Chinese", img:"https://images.unsplash.com/photo-1518984256888-4e7e3c7ae50e?w=400&q=80", channel:"Chinese Cooking Demystified", subs:"2.6M", views:"7.1M",  likes:158000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Mapo Tofu",         cat:"Chinese", img:"https://images.unsplash.com/photo-1603360946369-dc9bb6258143?w=400&q=80", channel:"Woks of Life",                subs:"1.4M", views:"2.8M",  likes:60100,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Fried Rice",        cat:"Chinese", img:"https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400&q=80", channel:"Chinese Cooking Demystified", subs:"2.6M", views:"9.2M",  likes:204000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Hot Pot",           cat:"Chinese", img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", channel:"Woks of Life",                subs:"1.4M", views:"4.4M",  likes:96200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  5: [ // Continental
    { name:"Beef Wellington",   cat:"Continental", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", channel:"Gordon Ramsay",  subs:"18M",  views:"12.1M", likes:276000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"French Onion Soup", cat:"Continental", img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", channel:"Jacques Pépin",  subs:"1.2M", views:"3.2M",  likes:69400,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Coq au Vin",        cat:"Continental", img:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80",channel:"French Guy Cooking",subs:"980K",views:"2.1M", likes:45600,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Crème Brûlée",      cat:"Continental", img:"https://images.unsplash.com/photo-1470124182917-cc6e71b22ecc?w=400&q=80", channel:"Jacques Pépin",  subs:"1.2M", views:"4.8M",  likes:104000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Steak Frites",      cat:"Continental", img:"https://images.unsplash.com/photo-1558030006-450675393462?w=400&q=80", channel:"Gordon Ramsay",  subs:"18M",  views:"8.6M",  likes:192000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Ratatouille",       cat:"Continental", img:"https://images.unsplash.com/photo-1572453800999-e8d2d1589b7c?w=400&q=80", channel:"French Guy Cooking",subs:"980K",views:"1.7M", likes:36800,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  6: [ // Japanese
    { name:"Sushi Roll",        cat:"Japanese", img:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80", channel:"Hiroyuki Terada",  subs:"3.4M", views:"9.8M",  likes:218000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Ramen",             cat:"Japanese", img:"https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80", channel:"Way of Ramen",     subs:"1.9M", views:"7.2M",  likes:160000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Tempura",           cat:"Japanese", img:"https://images.unsplash.com/photo-1615361200141-f45040f367be?w=400&q=80", channel:"Hiroyuki Terada",  subs:"3.4M", views:"3.6M",  likes:78400,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Tonkatsu",          cat:"Japanese", img:"https://images.unsplash.com/photo-1534482421-64566f976cfa?w=400&q=80", channel:"Japanese Cooking 101",subs:"1.1M",views:"2.4M", likes:52100,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Miso Soup",         cat:"Japanese", img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", channel:"Way of Ramen",     subs:"1.9M", views:"1.8M",  likes:39200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Onigiri",           cat:"Japanese", img:"https://images.unsplash.com/photo-1580822184713-fc5400e7fe10?w=400&q=80", channel:"Japanese Cooking 101",subs:"1.1M",views:"2.1M", likes:45600,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  7: [ // Korean
    { name:"Bibimbap",          cat:"Korean", img:"https://images.unsplash.com/photo-1553163147-622ab57be1c7?w=400&q=80", channel:"Maangchi",          subs:"5.6M", views:"8.8M",  likes:196000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Korean BBQ",        cat:"Korean", img:"https://images.unsplash.com/photo-1544025162-d76694265947?w=400&q=80", channel:"Korean Bapsang",    subs:"1.3M", views:"6.2M",  likes:138000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Tteokbokki",        cat:"Korean", img:"https://images.unsplash.com/photo-1635363638580-c2809d049eee?w=400&q=80", channel:"Maangchi",          subs:"5.6M", views:"5.4M",  likes:120000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Japchae",           cat:"Korean", img:"https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80", channel:"Korean Bapsang",    subs:"1.3M", views:"2.9M",  likes:63200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Samgyeopsal",       cat:"Korean", img:"https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400&q=80", channel:"Maangchi",          subs:"5.6M", views:"4.1M",  likes:91400,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Kimchi Jjigae",     cat:"Korean", img:"https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=400&q=80", channel:"Korean Bapsang",    subs:"1.3M", views:"3.3M",  likes:72100,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  8: [ // Mexican
    { name:"Tacos al Pastor",   cat:"Mexican", img:mexican,                                                                                             channel:"Rick Bayless",    subs:"780K", views:"4.2M",  likes:91800,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Guacamole",         cat:"Mexican", img:"https://images.unsplash.com/photo-1600335895229-6e75511892c8?w=400&q=80", channel:"Muy Bueno Cooking",subs:"620K",views:"2.8M", likes:60400,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Enchiladas",        cat:"Mexican", img:"https://images.unsplash.com/photo-1534352956036-cd81e27dd615?w=400&q=80", channel:"Rick Bayless",    subs:"780K", views:"3.1M",  likes:67200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Chiles Rellenos",   cat:"Mexican", img:"https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=400&q=80", channel:"Muy Bueno Cooking",subs:"620K",views:"1.6M", likes:34800,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Pozole",            cat:"Mexican", img:"https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80", channel:"Rick Bayless",    subs:"780K", views:"1.9M",  likes:41200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Churros",           cat:"Mexican", img:"https://images.unsplash.com/photo-1624471788573-8e6db7fcfafd?w=400&q=80", channel:"Muy Bueno Cooking",subs:"620K",views:"3.8M", likes:82600,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
};

// ── Category dishes (meal-type based) ────────────────────────────────────────
export const indianDishes = {
  1: [
    { name:"Poha",        cat:"Breakfast", img:"https://images.unsplash.com/photo-1567188040759-fb8a883dc6d8?w=400&q=80", channel:"Sanjeev Kapoor",  subs:"4.2M", views:"2.1M", likes:48200, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Upma",        cat:"Breakfast", img:"https://images.unsplash.com/photo-1630401770573-e32caa5b7c80?w=400&q=80", channel:"Hebbars Kitchen", subs:"6.8M", views:"1.4M", likes:31000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Masala Dosa", cat:"Breakfast", img:"https://images.unsplash.com/photo-1630407613729-c81da9f2c1c3?w=400&q=80", channel:"Vahchef",         subs:"3.1M", views:"3.8M", likes:72100, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Idli Sambar", cat:"Breakfast", img:"https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=400&q=80", channel:"Chef Ranveer",    subs:"2.9M", views:"1.9M", likes:29400, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  2: [
    { name:"Dal Tadka",     cat:"Lunch", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80",    channel:"Sanjeev Kapoor",  subs:"4.2M", views:"2.9M", likes:55100, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Chole Bhature", cat:"Lunch", img:"https://images.unsplash.com/photo-1626200926279-3c4a5a46f8b2?w=400&q=80", channel:"Hebbars Kitchen", subs:"6.8M", views:"4.1M", likes:81200, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Rajma Chawal",  cat:"Lunch", img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", channel:"Vahchef",         subs:"3.1M", views:"1.7M", likes:34400, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Palak Paneer",  cat:"Lunch", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", channel:"Chef Ranveer",    subs:"2.9M", views:"3.2M", likes:62000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  3: [
    { name:"Butter Chicken", cat:"Dinner", img:"https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80", channel:"Sanjeev Kapoor",  subs:"4.2M", views:"8.4M",  likes:198000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Biryani",        cat:"Dinner", img:biryani,                                                                   channel:"Hebbars Kitchen", subs:"6.8M", views:"11.2M", likes:234000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Rogan Josh",     cat:"Dinner", img:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", channel:"Vahchef",         subs:"3.1M", views:"2.3M",  likes:47800,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Pav Bhaji",      cat:"Dinner", img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", channel:"Chef Ranveer",    subs:"2.9M", views:"3.6M",  likes:73200,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  4: [
    { name:"Gulab Jamun", cat:"Desserts", img:"https://images.unsplash.com/photo-1598110750624-2b8c6b01b3c3?w=400&q=80", channel:"Sanjeev Kapoor",  subs:"4.2M", views:"3.1M", likes:68000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Rasgulla",    cat:"Desserts", img:"https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&q=80",    channel:"Hebbars Kitchen", subs:"6.8M", views:"2.2M", likes:44100, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Halwa",       cat:"Desserts", img:"https://images.unsplash.com/photo-1567337710282-00832b415979?w=400&q=80", channel:"Vahchef",         subs:"3.1M", views:"1.8M", likes:36200, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Kheer",       cat:"Desserts", img:"https://images.unsplash.com/photo-1624461948787-b31f2f0df7c4?w=400&q=80", channel:"Chef Ranveer",    subs:"2.9M", views:"1.1M", likes:22700, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  5: [
    { name:"Samosa",    cat:"Snacks", img:"https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80", channel:"Sanjeev Kapoor",  subs:"4.2M", views:"5.8M", likes:121000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Bhel Puri", cat:"Snacks", img:"https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=400&q=80", channel:"Hebbars Kitchen", subs:"6.8M", views:"2.6M", likes:51000,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Aloo Tikki",cat:"Snacks", img:"https://images.unsplash.com/photo-1585937421612-70a008356fbe?w=400&q=80", channel:"Vahchef",         subs:"3.1M", views:"1.9M", likes:38600,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Pakora",    cat:"Snacks", img:"https://images.unsplash.com/photo-1574484284002-952d92456975?w=400&q=80", channel:"Chef Ranveer",    subs:"2.9M", views:"2.1M", likes:42900,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
  6: [
    { name:"Masala Chai", cat:"Drinks", img:"https://images.unsplash.com/photo-1561336313-0bd5e0b27ec8?w=400&q=80", channel:"Sanjeev Kapoor",  subs:"4.2M", views:"4.4M", likes:94200, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Lassi",       cat:"Drinks", img:"https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=400&q=80",channel:"Hebbars Kitchen", subs:"6.8M", views:"2.9M", likes:58800, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Thandai",     cat:"Drinks", img:"https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=400&q=80", channel:"Vahchef",         subs:"3.1M", views:"1.2M", likes:24300, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
    { name:"Nimbu Pani",  cat:"Drinks", img:"https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400&q=80", channel:"Chef Ranveer",    subs:"2.9M", views:"1.6M", likes:31600, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  ],
};

// ── Recently viewed (your data) ───────────────────────────────────────────────
export const recipes = [
  { name:"Spaghetti Pasta", category:"Italian",  image:spaghetti, channel:"Pasta Grannies",   subs:"1.8M", views:"5.2M",  likes:114000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  { name:"Veg Biryani",     category:"Indian",   image:biryani,   channel:"Hebbars Kitchen",  subs:"6.8M", views:"3.1M",  likes:68400,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  { name:"Sushi Roll",      category:"Japanese", image:"https://images.unsplash.com/photo-1553621042-f6e147245754?w=400&q=80", channel:"Hiroyuki Terada", subs:"3.4M", views:"9.8M", likes:218000, video:"https://www.w3schools.com/html/mov_bbb.mp4" },
  { name:"Tacos",           category:"Mexican",  image:mexican,   channel:"Rick Bayless",     subs:"780K", views:"4.2M",  likes:91800,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
];

// ── Seed comments ─────────────────────────────────────────────────────────────
export const seedComments = [
  { user:"Priya S",  init:"PS", bg:"#e1f5ee", tc:"#0f6e56", text:"This recipe is absolutely amazing! Made it last Sunday for the family and everyone loved it.", time:"2 days ago",  likes:142 },
  { user:"Rahul M",  init:"RM", bg:"#e6f1fb", tc:"#185fa5", text:"Perfect instructions. I added extra garam masala and it turned out incredible.",              time:"5 days ago",  likes:87  },
  { user:"Anita K",  init:"AK", bg:"#fef0e6", tc:"#c2500a", text:"Been searching for this authentic recipe for years. Thank you so much!",                      time:"1 week ago",  likes:203 },
  { user:"Vikram B", init:"VB", bg:"#fbeaf0", tc:"#993556", text:"Tried it twice now — the second time was even better. Great video!",                           time:"2 weeks ago", likes:56  },
];

// personal recipe data
export const textRecipes = [
  {
    title: "Butter Chicken",
    desc: "A rich, velvety tomato-based curry with tender chicken, slow-simmered in aromatic spices and finished with cream.",
    cuisine: "Indian",
    time: "45 min", serving: "4", difficulty: "Medium", cal: "480 kcal",
    tags: ["Non-veg", "Curry", "Creamy"],
    steps: [
      "Marinate chicken in yogurt & spices for 30 min",
      "Grill or pan-sear the chicken pieces",
      "Prepare the makhani sauce with tomatoes & cream",
      "Combine & simmer for 15 minutes",
    ],
    author: "Sanjeev Kapoor", authorInit: "SK",
    authorBg: "#fef3e2", authorTc: "#92400e",
    rating: "4.9", reviews: "2.1k",
  },
  {
    title: "Spaghetti Carbonara",
    desc: "Classic Roman pasta made with guanciale, eggs, Pecorino Romano, and black pepper — no cream, just technique.",
    cuisine: "Italian",
    time: "20 min", serving: "2", difficulty: "Easy", cal: "620 kcal",
    tags: ["Pasta", "Quick", "Classic"],
    steps: [
      "Boil spaghetti until al dente",
      "Fry guanciale until crispy",
      "Whisk eggs with Pecorino Romano",
      "Toss together off-heat with pasta water",
    ],
    author: "Pasta Grannies", authorInit: "PG",
    authorBg: "#fce7f3", authorTc: "#9d174d",
    rating: "4.8", reviews: "3.4k",
  },
  {
    title: "Salmon Sushi Roll",
    desc: "Fresh salmon, seasoned sushi rice, and crisp cucumber wrapped in nori — simple, elegant, and deeply satisfying.",
    cuisine: "Japanese",
    time: "35 min", serving: "3", difficulty: "Hard", cal: "310 kcal",
    tags: ["Seafood", "Raw", "Light"],
    steps: [
      "Prepare sushi rice with vinegar & sugar",
      "Lay nori on bamboo mat, spread rice",
      "Layer salmon & cucumber at the edge",
      "Roll tightly and slice into 8 pieces",
    ],
    author: "Hiroyuki Terada", authorInit: "HT",
    authorBg: "#e0f2fe", authorTc: "#075985",
    rating: "4.7", reviews: "1.8k",
  },
  {
    title: "Tacos al Pastor",
    desc: "Marinated pork carved from a vertical spit, served on corn tortillas with pineapple, onion, and cilantro.",
    cuisine: "Mexican",
    time: "50 min", serving: "6", difficulty: "Medium", cal: "390 kcal",
    tags: ["Pork", "Street food", "Spicy"],
    steps: [
      "Marinate pork in adobo sauce overnight",
      "Cook on a griddle or skillet in batches",
      "Warm corn tortillas on a dry pan",
      "Top with pineapple, onion & cilantro",
    ],
    author: "Rick Bayless", authorInit: "RB",
    authorBg: "#dcfce7", authorTc: "#166534",
    rating: "4.9", reviews: "4.2k",
  },
  {
    title: "Bibimbap",
    desc: "A Korean rice bowl topped with sautéed vegetables, a fried egg, gochujang, and sesame oil — colourful and nourishing.",
    cuisine: "Korean",
    time: "40 min", serving: "2", difficulty: "Medium", cal: "420 kcal",
    tags: ["Rice", "Vegetarian", "Spicy"],
    steps: [
      "Cook short-grain rice to perfection",
      "Sauté vegetables individually with seasoning",
      "Fry egg sunny-side-up",
      "Assemble in bowl, drizzle gochujang & sesame oil",
    ],
    author: "Maangchi", authorInit: "MA",
    authorBg: "#f3e8ff", authorTc: "#6b21a8",
    rating: "4.8", reviews: "5.6k",
  },
  {
    title: "Kung Pao Chicken",
    desc: "Stir-fried chicken with peanuts, dried chillies, and Sichuan peppercorns in a tangy, slightly sweet sauce.",
    cuisine: "Chinese",
    time: "25 min", serving: "3", difficulty: "Easy", cal: "440 kcal",
    tags: ["Stir-fry", "Spicy", "Nutty"],
    steps: [
      "Dice chicken and marinate in soy & cornstarch",
      "Toast peanuts in dry wok, set aside",
      "Stir-fry chillies and Sichuan pepper",
      "Add chicken, sauce, and peanuts; toss",
    ],
    author: "Woks of Life", authorInit: "WL",
    authorBg: "#fef9c3", authorTc: "#854d0e",
    rating: "4.7", reviews: "2.9k",
  },
];

// herbal recipe data 
export const RECIPES = [
  // HAIR
  {
    id:1, cat:"hair", type:"text",
    title:"Amla & Bhringraj Hair Oil",
    desc:"A traditional Ayurvedic recipe to stimulate hair growth, reduce greying and deeply nourish the scalp with potent herbal oils.",
    img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
    herbs:["Amla","Bhringraj","Coconut Oil","Fenugreek"],
    time:"30 min", benefit:"Promotes growth",
    steps:["Heat 200ml coconut oil in a pan on low flame.","Add 2 tbsp dried amla powder and 2 tbsp bhringraj powder.","Stir in 1 tbsp fenugreek seeds.","Simmer on low heat for 20 min until aromatic.","Strain through muslin cloth into a glass bottle.","Massage into scalp 2–3 times per week."],
  },
  {
    id:2, cat:"hair", type:"video",
    title:"Onion Juice for Hair Regrowth",
    desc:"Rich in sulphur, onion juice boosts collagen production and reactivates dormant hair follicles naturally.",
    img:"https://images.unsplash.com/photo-1618090584176-7132b9911657?w=500&q=80",
    herbs:["Onion","Castor Oil","Rosemary"],
    time:"20 min", benefit:"Reduces hair fall",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Blend 2 medium onions and strain to extract juice.","Mix with 1 tbsp castor oil and 5 drops rosemary oil.","Apply to scalp and leave for 30–45 minutes.","Rinse with mild shampoo and cool water.","Repeat twice a week for 3 months."],
  },
  {
    id:3, cat:"hair", type:"text",
    title:"Fenugreek Seed Hair Mask",
    desc:"Fenugreek seeds are packed with proteins and nicotinic acid that strengthen hair shafts and add brilliant gloss.",
    img:"https://images.unsplash.com/photo-1515023115689-589c33041d3c?w=500&q=80",
    herbs:["Fenugreek","Yoghurt","Hibiscus"],
    time:"15 min", benefit:"Deep conditioning",
    steps:["Soak 4 tbsp fenugreek seeds overnight in water.","Grind into a smooth paste the next morning.","Mix with 3 tbsp plain yoghurt.","Add crushed hibiscus petals for extra shine.","Apply from root to tip, cover with shower cap.","Leave for 45 min then rinse thoroughly."],
  },
  // FACE
  {
    id:4, cat:"face", type:"text",
    title:"Turmeric & Honey Glow Mask",
    desc:"Ancient Vedic beauty ritual combining turmeric's anti-inflammatory power with honey's moisturising enzymes.",
    img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80",
    herbs:["Turmeric","Raw Honey","Rose Water","Sandalwood"],
    time:"10 min", benefit:"Brightening glow",
    steps:["Mix ½ tsp turmeric powder with 1 tbsp raw honey.","Add 3–4 drops of rose water to thin the consistency.","Optionally add a pinch of sandalwood powder.","Apply evenly to cleansed face, avoiding eye area.","Leave for 15–20 minutes.","Rinse with lukewarm water and pat dry."],
  },
  {
    id:5, cat:"face", type:"video",
    title:"Neem Leaves Anti-Acne Steam",
    desc:"Neem's powerful antibacterial and antifungal properties deep-clean pores and reduce active breakouts.",
    img:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
    herbs:["Neem","Tulsi","Lavender"],
    time:"25 min", benefit:"Clears acne",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Boil 2 cups of water in a wide bowl.","Add a handful of fresh neem and tulsi leaves.","Add 3 drops lavender essential oil.","Drape a towel over your head and steam face for 10 min.","Rinse with cold water to close pores.","Follow with a light moisturiser."],
  },
  {
    id:6, cat:"face", type:"text",
    title:"Rose & Aloe Vera Toner",
    desc:"Soothe and balance your skin's pH with this gentle rose-aloe toner that tightens pores and deeply hydrates.",
    img:"https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=500&q=80",
    herbs:["Rose Petals","Aloe Vera","Witch Hazel","Cucumber"],
    time:"5 min", benefit:"Pore tightening",
    steps:["Blend ½ cup fresh rose petals with ¼ cup water.","Strain through fine mesh cloth.","Mix with 2 tbsp aloe vera gel.","Add 1 tbsp witch hazel.","Store in a spray bottle in the refrigerator.","Spritz on face after cleansing morning and night."],
  },
  // BODY
  {
    id:7, cat:"body", type:"text",
    title:"Lavender & Oat Bath Soak",
    desc:"A deeply relaxing full-body soak that soothes irritated skin, relieves muscle tension and promotes calm.",
    img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80",
    herbs:["Lavender","Oats","Epsom Salt","Chamomile"],
    time:"40 min", benefit:"Muscle relief",
    steps:["Mix 2 cups Epsom salt with 1 cup colloidal oat flour.","Add 1 cup dried lavender flowers.","Add 2 tbsp dried chamomile flowers.","Draw a warm bath and dissolve the mix.","Soak for 20–30 minutes.","Pat dry and apply a natural body oil."],
  },
  {
    id:8, cat:"body", type:"video",
    title:"Coffee & Coconut Scrub",
    desc:"Exfoliate dull skin, target cellulite and boost circulation with this energising herbal body scrub.",
    img:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&q=80",
    herbs:["Coffee","Coconut Oil","Peppermint","Brown Sugar"],
    time:"15 min", benefit:"Glowing skin",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Combine 1 cup ground coffee with ½ cup brown sugar.","Melt 3 tbsp coconut oil and add to mixture.","Stir in 5 drops peppermint essential oil.","Apply to damp skin in circular motions.","Focus on rough areas: knees, elbows, heels.","Rinse off in the shower."],
  },
  // IMMUNITY
  {
    id:9, cat:"immunity", type:"text",
    title:"Golden Milk (Haldi Doodh)",
    desc:"The classic Ayurvedic immune tonic — a warming blend of turmeric, black pepper and spices in milk.",
    img:"https://images.unsplash.com/photo-1534353473418-4cfa0c23c77d?w=500&q=80",
    herbs:["Turmeric","Black Pepper","Ginger","Cinnamon","Cardamom"],
    time:"10 min", benefit:"Immunity boost",
    steps:["Heat 1 cup milk in a saucepan.","Whisk in 1 tsp turmeric, ½ tsp ginger powder.","Add ¼ tsp cinnamon and a pinch of black pepper.","Sweeten with honey or jaggery.","Simmer on low heat for 3–4 minutes.","Drink warm before bedtime."],
  },
  {
    id:10, cat:"immunity", type:"video",
    title:"Elderberry & Ginger Syrup",
    desc:"A potent antiviral elderberry syrup boosted with ginger and cloves — your seasonal cold shield.",
    img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    herbs:["Elderberry","Ginger","Cloves","Cinnamon","Honey"],
    time:"45 min", benefit:"Cold & flu defence",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Combine 1 cup dried elderberries with 3 cups water.","Add 1 tbsp fresh grated ginger.","Add 1 cinnamon stick and 5 whole cloves.","Bring to boil then simmer 45 min until reduced by half.","Cool slightly, strain and mash berries.","Mix in 1 cup raw honey. Refrigerate for up to 3 months."],
  },
  // DIGESTION
  {
    id:11, cat:"digestion", type:"text",
    title:"Ginger & Fennel Digestive Tea",
    desc:"Calm bloating, improve gut motility and soothe post-meal discomfort with this powerful herbal blend.",
    img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    herbs:["Ginger","Fennel","Peppermint","Licorice Root"],
    time:"8 min", benefit:"Reduces bloating",
    steps:["Boil 2 cups water in a small pot.","Add 1 tsp freshly grated ginger.","Add 1 tsp fennel seeds and 5 fresh peppermint leaves.","Steep for 5–7 minutes covered.","Strain into a cup.","Sip slowly after meals."],
  },
  {
    id:12, cat:"digestion", type:"video",
    title:"Triphala Morning Cleanse",
    desc:"The three-fruit Ayurvedic formula that gently detoxifies the digestive tract and supports regularity.",
    img:"https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=500&q=80",
    herbs:["Triphala","Warm Water","Honey","Lemon"],
    time:"5 min", benefit:"Gut cleanse",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Mix ½ tsp triphala powder with ½ cup warm water.","Squeeze in juice of ¼ lemon.","Add ½ tsp raw honey and stir well.","Drink on an empty stomach first thing in the morning.","Wait 30 minutes before eating breakfast.","Continue for 30 days for best results."],
  },
  // SLEEP
  {
    id:13, cat:"sleep", type:"text",
    title:"Ashwagandha Warm Milk",
    desc:"A calming adaptogen blend that lowers cortisol, eases anxiety and prepares your body for deep sleep.",
    img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
    herbs:["Ashwagandha","Nutmeg","Cardamom","Warm Milk","Honey"],
    time:"8 min", benefit:"Deep sleep aid",
    steps:["Warm 1 cup of milk without boiling.","Whisk in ½ tsp ashwagandha root powder.","Add a pinch each of nutmeg and cardamom.","Sweeten with raw honey after removing from heat.","Sip slowly 30 minutes before bedtime.","Practice consistently for 4–6 weeks."],
  },
  {
    id:14, cat:"sleep", type:"video",
    title:"Valerian & Chamomile Night Tea",
    desc:"Two of nature's most powerful nervines combine to relax the mind and body for uninterrupted sleep.",
    img:"https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80",
    herbs:["Valerian Root","Chamomile","Passionflower","Lemon Balm"],
    time:"12 min", benefit:"Reduces insomnia",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Boil 1.5 cups of water and reduce to a simmer.","Add 1 tsp dried valerian root, steep 10 min.","Add 2 tbsp chamomile and passionflower flowers.","Steep an additional 5 minutes.","Strain and add a slice of lemon.","Drink warm 1 hour before bed."],
  },
  // WEIGHT
  {
    id:15, cat:"weight", type:"text",
    title:"Cinnamon & Ginger Detox Water",
    desc:"Boost metabolism, balance blood sugar and reduce cravings with this gentle herbal fat-flushing water.",
    img:"https://images.unsplash.com/photo-1554478693-f1c2fd6f4b4a?w=500&q=80",
    herbs:["Cinnamon","Ginger","Lemon","Apple Cider Vinegar","Cucumber"],
    time:"5 min", benefit:"Metabolism boost",
    steps:["Add 1 cinnamon stick to 1 litre of cold water.","Slice in 5 rounds of fresh ginger.","Add 3 slices of lemon and 5 slices of cucumber.","Add 1 tbsp raw apple cider vinegar.","Refrigerate overnight for best infusion.","Drink throughout the day, especially before meals."],
  },
  {
    id:16, cat:"weight", type:"video",
    title:"Jeera (Cumin) Slimming Water",
    desc:"An ancient Ayurvedic remedy — soaked cumin water that suppresses appetite and fires up digestion.",
    img:"https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=500&q=80",
    herbs:["Cumin Seeds","Coriander","Fennel","Fenugreek"],
    time:"Overnight", benefit:"Fat burning",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    steps:["Soak 1 tsp each cumin, coriander and fennel seeds overnight.","Boil the soaked seeds in the water in the morning.","Simmer for 5 minutes then strain.","Let it cool slightly — drink warm.","Have on an empty stomach each morning.","Maintain for 30 days for visible results."],
  },
];
// ─── Seed data ────────────────────────────────────────────────────────────────

export const SEED_SAVED = [
  // ── AI suggested ──
  {
    id:"a1", source:"ai", type:"text", cat:"Hair",
    title:"Bhringraj & Amla Scalp Serum",
    desc:"A potent AI-curated blend of bhringraj and amla to reverse hair thinning and stimulate dormant follicles naturally.",
    img:"https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=500&q=80",
    herbs:["Bhringraj","Amla","Brahmi","Coconut Oil"],
    time:"25 min", benefit:"Regrowth stimulant", savedAt:"18 Mar 2025",
    steps:[
      "Gently heat 3 tbsp of coconut oil on low flame.",
      "Add 1 tsp bhringraj and 1 tsp amla powder.",
      "Stir in 5 drops brahmi essential oil.",
      "Cool completely and store in a dropper bottle.",
      "Apply to scalp sections nightly.",
      "Massage for 5 minutes and leave overnight.",
    ],
  },
  {
    id:"a2", source:"ai", type:"video", cat:"Immunity",
    title:"Chyawanprash Morning Ritual",
    desc:"AI-recommended daily morning ritual using chyawanprash and warm water to prime your immune defences.",
    img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    herbs:["Chyawanprash","Turmeric","Ginger","Ashwagandha"],
    time:"5 min", benefit:"Daily immunity boost", savedAt:"17 Mar 2025",
    steps:[
      "Take 1 tsp chyawanprash on an empty stomach.",
      "Follow with a cup of warm water.",
      "Add ¼ tsp turmeric to warm milk as a chaser.",
      "Avoid cold drinks for 30 minutes.",
      "Practice daily for best results.",
    ],
  },
  {
    id:"a3", source:"ai", type:"text", cat:"Sleep",
    title:"Shankhpushpi & Brahmi Night Tonic",
    desc:"An AI-formulated Ayurvedic tonic that calms the nervous system and prepares the mind for deep, restful sleep.",
    img:"https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=500&q=80",
    herbs:["Shankhpushpi","Brahmi","Jatamansi","Warm Milk"],
    time:"8 min", benefit:"Deep sleep", savedAt:"16 Mar 2025",
    steps:[
      "Warm 1 cup of full-fat milk without boiling.",
      "Add ¼ tsp each of shankhpushpi and brahmi powder.",
      "Stir in a pinch of jatamansi powder.",
      "Sweeten with jaggery to taste.",
      "Sip warm 30 minutes before sleep.",
    ],
  },
  // ── Text recipes ──
  {
    id:"t1", source:"text", type:"text", cat:"Face",
    title:"Turmeric & Honey Glow Mask",
    desc:"Ancient Vedic beauty ritual combining turmeric's anti-inflammatory power with honey's moisturising enzymes for a visible glow.",
    img:"https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&q=80",
    herbs:["Turmeric","Raw Honey","Rose Water","Sandalwood"],
    time:"10 min", benefit:"Brightening glow", savedAt:"15 Mar 2025",
    steps:[
      "Mix ½ tsp turmeric powder with 1 tbsp raw honey.",
      "Add 3–4 drops of rose water to thin the consistency.",
      "Optionally add a pinch of sandalwood powder.",
      "Apply evenly to cleansed face, avoiding the eye area.",
      "Leave for 15–20 minutes.",
      "Rinse with lukewarm water and pat dry.",
    ],
  },
  {
    id:"t2", source:"text", type:"text", cat:"Digestion",
    title:"Ginger & Fennel Digestive Tea",
    desc:"Calm bloating, improve gut motility and soothe post-meal discomfort with this powerful herbal blend.",
    img:"https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=500&q=80",
    herbs:["Ginger","Fennel","Peppermint","Licorice Root"],
    time:"8 min", benefit:"Reduces bloating", savedAt:"14 Mar 2025",
    steps:[
      "Boil 2 cups of water in a small saucepan.",
      "Add 1 tsp freshly grated ginger.",
      "Add 1 tsp fennel seeds and 5 fresh peppermint leaves.",
      "Steep for 5–7 minutes covered.",
      "Strain into a cup.",
      "Sip slowly after meals.",
    ],
  },
  {
    id:"t3", source:"text", type:"text", cat:"Body",
    title:"Lavender & Oat Bath Soak",
    desc:"A deeply relaxing full-body soak that soothes irritated skin, relieves muscle tension and promotes calm.",
    img:"https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?w=500&q=80",
    herbs:["Lavender","Oats","Epsom Salt","Chamomile"],
    time:"40 min", benefit:"Muscle relief", savedAt:"13 Mar 2025",
    steps:[
      "Mix 2 cups Epsom salt with 1 cup colloidal oat flour.",
      "Add 1 cup dried lavender flowers.",
      "Add 2 tbsp dried chamomile flowers.",
      "Draw a warm bath and dissolve the mix.",
      "Soak for 20–30 minutes.",
      "Pat dry and apply a natural body oil.",
    ],
  },
  {
    id:"t4", source:"text", type:"text", cat:"Weight",
    title:"Cinnamon & Ginger Detox Water",
    desc:"Boost metabolism, balance blood sugar and reduce cravings with this gentle herbal fat-flushing water.",
    img:"https://images.unsplash.com/photo-1554478693-f1c2fd6f4b4a?w=500&q=80",
    herbs:["Cinnamon","Ginger","Lemon","Apple Cider Vinegar"],
    time:"5 min", benefit:"Metabolism boost", savedAt:"12 Mar 2025",
    steps:[
      "Add 1 cinnamon stick to 1 litre of cold water.",
      "Slice in 5 rounds of fresh ginger.",
      "Add 3 slices of lemon and 5 slices of cucumber.",
      "Add 1 tbsp raw apple cider vinegar.",
      "Refrigerate overnight for best infusion.",
      "Drink throughout the day, especially before meals.",
    ],
  },
  // ── Video recipes ──
  {
    id:"v1", source:"video", type:"video", cat:"Hair",
    title:"Onion Juice for Hair Regrowth",
    desc:"Rich in sulphur, onion juice boosts collagen production and reactivates dormant hair follicles naturally.",
    img:"https://images.unsplash.com/photo-1618090584176-7132b9911657?w=500&q=80",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    herbs:["Onion","Castor Oil","Rosemary"],
    time:"20 min", benefit:"Reduces hair fall", savedAt:"11 Mar 2025",
    steps:[
      "Blend 2 medium onions and strain to extract juice.",
      "Mix with 1 tbsp castor oil and 5 drops rosemary oil.",
      "Apply to scalp and leave for 30–45 minutes.",
      "Rinse with mild shampoo and cool water.",
      "Repeat twice a week for 3 months.",
    ],
  },
  {
    id:"v2", source:"video", type:"video", cat:"Face",
    title:"Neem Leaves Anti-Acne Steam",
    desc:"Neem's powerful antibacterial and antifungal properties deep-clean pores and reduce active breakouts.",
    img:"https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500&q=80",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    herbs:["Neem","Tulsi","Lavender"],
    time:"25 min", benefit:"Clears acne", savedAt:"10 Mar 2025",
    steps:[
      "Boil 2 cups of water in a wide bowl.",
      "Add a handful of fresh neem and tulsi leaves.",
      "Add 3 drops of lavender essential oil.",
      "Drape a towel over your head and steam face for 10 min.",
      "Rinse with cold water to close pores.",
      "Follow with a light moisturiser.",
    ],
  },
  {
    id:"v3", source:"video", type:"video", cat:"Immunity",
    title:"Elderberry & Ginger Syrup",
    desc:"A potent antiviral elderberry syrup boosted with ginger and cloves — your seasonal cold and flu shield.",
    img:"https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=500&q=80",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    herbs:["Elderberry","Ginger","Cloves","Honey"],
    time:"45 min", benefit:"Cold & flu defence", savedAt:"9 Mar 2025",
    steps:[
      "Combine 1 cup dried elderberries with 3 cups water.",
      "Add 1 tbsp fresh grated ginger.",
      "Add 1 cinnamon stick and 5 whole cloves.",
      "Bring to boil then simmer 45 min until reduced by half.",
      "Cool, strain and mash berries.",
      "Mix in 1 cup raw honey. Refrigerate up to 3 months.",
    ],
  },
  {
    id:"v4", source:"video", type:"video", cat:"Body",
    title:"Coffee & Coconut Body Scrub",
    desc:"Exfoliate dull skin, target cellulite and boost circulation with this energising herbal body scrub.",
    img:"https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=500&q=80",
    video:"https://www.w3schools.com/html/mov_bbb.mp4",
    herbs:["Coffee","Coconut Oil","Peppermint","Brown Sugar"],
    time:"15 min", benefit:"Glowing skin", savedAt:"8 Mar 2025",
    steps:[
      "Combine 1 cup ground coffee with ½ cup brown sugar.",
      "Melt 3 tbsp coconut oil and add to the mixture.",
      "Stir in 5 drops peppermint essential oil.",
      "Apply to damp skin in circular motions.",
      "Focus on rough areas: knees, elbows, heels.",
      "Rinse off in the shower.",
    ],
  },
];