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
  { id:9, cover:mexican,      heading:"Mexican"      },
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
    { name:"Tacos al Pastor",   cat:"Mexican", img:mexican, channel:"Rick Bayless",    subs:"780K", views:"4.2M",  likes:91800,  video:"https://www.w3schools.com/html/mov_bbb.mp4" },
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