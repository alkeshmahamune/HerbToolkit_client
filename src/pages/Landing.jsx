import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import heroImg from "../assets/heroImg.png";
import usertemp from "../assets/userThumbnail.jpg";
import iPhone from "../assets/iPhone.png";
import { Plus, Star, ArrowUp, ChefHat, Refrigerator, Heart, Users, Share2, Sparkles, Check, Instagram, Twitter, Youtube, Facebook, Mail, Phone, MapPin } from "lucide-react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

/* ─── Scroll-reveal hook ─── */
function useReveal() {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold: 0.15 }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

/* ─── Feature card data ─── */
const features = [
  { icon: <Sparkles size={28} />, title: "AI Powered", desc: "Smart recipe suggestions based on your ingredients and preferences." },
  { icon: <Refrigerator size={28} />, title: "Inventory Tracker", desc: "Never let food go to waste — track what's in your kitchen in real time." },
  { icon: <ChefHat size={28} />, title: "Recipe Manager", desc: "Save, organise, and customise your personal recipe collection." },
  { icon: <Heart size={28} />, title: "Health & Skin Care", desc: "Nutrition insights and wellness tips tailored just for you." },
  { icon: <Users size={28} />, title: "Community Module", desc: "Connect with food influencers and home cooks around the world." },
  { icon: <Share2 size={28} />, title: "Multi-Format Sharing", desc: "Share recipes as cards, videos, or step-by-step guides effortlessly." },
];

/* ─── How It Works steps ─── */
const steps = [
  { num: "01", title: "Create Your Profile", desc: "Tell us your dietary preferences, allergies, and cuisine loves." },
  { num: "02", title: "Add Your Inventory", desc: "Scan or type in the ingredients you already have at home." },
  { num: "03", title: "Get AI Suggestions", desc: "Receive personalised recipe recommendations instantly." },
  { num: "04", title: "Cook & Track", desc: "Follow guided steps and track your nutrition and wellness goals." },
];

/* ─── Testimonial data ─── */
const testimonials = [
  {
    text: "This app completely changed how I plan my meals. The AI suggests recipes based on what I already have at home — no more food waste!",
    name: "Shivani Manjre",
    role: "Food Enthusiast",
  },
  {
    text: "The inventory tracker is a game changer. I saved so much money just by knowing what's already in my fridge.",
    name: "Rahul Deshmukh",
    role: "Home Cook",
  },
  {
    text: "I love the health tracking feature. It keeps me on top of my nutrition goals without feeling like a chore.",
    name: "Priya Kulkarni",
    role: "Wellness Blogger",
  },
];

/* ══════════════════════════════════════════
   ENHANCED NAV (replaces <Header/> inline styling via a wrapper)
   ══════════════════════════════════════════ */
const NavEnhancement = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 999,
        height: scrolled ? "0px" : "4px",
        background: "linear-gradient(90deg, #ef4444, #3b82f6, #ef4444)",
        backgroundSize: "200% 100%",
        animation: "shimmer 3s linear infinite",
        transition: "height 0.4s",
        pointerEvents: "none",
      }}
    />
  );
};

/* ─── Feature Cards Grid ─── */
const FeaturesGrid = () => {
  const [ref, visible] = useReveal();
  return (
    <div
      ref={ref}
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "16px",
        width: "100%",
      }}
    >
      {features.map((f, i) => (
        <div
          key={i}
          style={{
            background: "#fff",
            border: "1px solid #fee2e2",
            borderRadius: "12px",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "8px",
            boxShadow: "0 2px 12px rgba(239,68,68,0.07)",
            transform: visible ? "translateY(0)" : "translateY(30px)",
            opacity: visible ? 1 : 0,
            transition: `transform 0.5s ease ${i * 0.08}s, opacity 0.5s ease ${i * 0.08}s`,
            cursor: "default",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = "0 8px 24px rgba(239,68,68,0.18)";
            e.currentTarget.style.borderColor = "#fca5a5";
            e.currentTarget.style.transform = "translateY(-3px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = "0 2px 12px rgba(239,68,68,0.07)";
            e.currentTarget.style.borderColor = "#fee2e2";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          <div style={{ color: "#ef4444" }}>{f.icon}</div>
          <p style={{ fontWeight: 700, fontSize: "15px" }}>{f.title}</p>
          <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.5 }}>{f.desc}</p>
        </div>
      ))}
    </div>
  );
};

/* ─── How It Works Section ─── */
const HowItWorks = () => {
  const [ref, visible] = useReveal();
  return (
    <section
      ref={ref}
      style={{
        width: "85%",
        margin: "0 auto",
        padding: "60px 0",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(40px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "48px" }}>
        <p style={{ color: "#ef4444", fontWeight: 700, letterSpacing: "0.15em", textTransform: "uppercase", fontSize: "13px", marginBottom: "12px" }}>
          Simple Process
        </p>
        <h2 style={{ fontSize: "2.25rem", fontWeight: 800, fontFamily: "Roboto, sans-serif", lineHeight: 1.2 }}>
          How HerbToolkit Works
        </h2>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "24px", position: "relative" }}>
        {/* connector line */}
        <div style={{
          position: "absolute", top: "36px", left: "12.5%", right: "12.5%", height: "2px",
          background: "linear-gradient(90deg, #fca5a5, #ef4444, #fca5a5)",
          zIndex: 0,
        }} />
        {steps.map((s, i) => (
          <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", textAlign: "center", zIndex: 1 }}>
            <div style={{
              width: "72px", height: "72px", borderRadius: "50%",
              background: i % 2 === 0 ? "#ef4444" : "#fff",
              border: "3px solid #ef4444",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontWeight: 900, fontSize: "18px",
              color: i % 2 === 0 ? "#fff" : "#ef4444",
              boxShadow: "0 4px 16px rgba(239,68,68,0.25)",
              transition: "transform 0.2s",
            }}>
              {s.num}
            </div>
            <p style={{ fontWeight: 700, fontSize: "15px" }}>{s.title}</p>
            <p style={{ color: "#6b7280", fontSize: "13px", lineHeight: 1.6 }}>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

/* ─── Testimonials Carousel ─── */
const TestimonialsCarousel = () => {
  const [active, setActive] = useState(0);
  const [ref, visible] = useReveal();
  useEffect(() => {
    const id = setInterval(() => setActive((p) => (p + 1) % testimonials.length), 4000);
    return () => clearInterval(id);
  }, []);
  const t = testimonials[active];
  return (
    <div
      ref={ref}
      style={{
        width: "60%",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateX(0)" : "translateX(-30px)",
        transition: "opacity 0.6s ease, transform 0.6s ease",
      }}
    >
      <div style={{
        background: "#fff",
        borderRadius: "16px",
        padding: "40px",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        border: "1px solid #fee2e2",
        minHeight: "220px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        gap: "24px",
      }}>
        {/* stars */}
        <div style={{ display: "flex", gap: "4px" }}>
          {[...Array(5)].map((_, i) => <Star key={i} size={18} fill="#f59e0b" color="#f59e0b" />)}
        </div>
        <p style={{ fontWeight: 600, fontSize: "17px", color: "#374151", lineHeight: 1.7, fontStyle: "italic" }}>
          "{t.text}"
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "52px", height: "52px", borderRadius: "50%", overflow: "hidden", border: "3px solid #fca5a5" }}>
            <img src={usertemp} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
          <div>
            <p style={{ fontWeight: 700, fontSize: "15px" }}>{t.name}</p>
            <p style={{ color: "#9ca3af", fontSize: "13px" }}>{t.role}</p>
          </div>
        </div>
        {/* dots */}
        <div style={{ display: "flex", gap: "8px" }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? "24px" : "8px", height: "8px",
                borderRadius: "99px", border: "none", cursor: "pointer",
                background: i === active ? "#ef4444" : "#fca5a5",
                transition: "width 0.3s, background 0.3s",
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

/* ─── Enhanced Footer ─── */
const EnhancedFooter = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const handleSubscribe = () => { if (email) { setSubscribed(true); setEmail(""); } };

  return (
    <footer style={{ background: "#0f0f0f", color: "#e5e7eb", marginTop: "40px" }}>
      {/* newsletter band */}
      <div style={{
        background: "linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)",
        padding: "48px 8%",
        display: "flex", justifyContent: "space-between", alignItems: "center",
        gap: "24px", flexWrap: "wrap",
      }}>
        <div>
          <h3 style={{ fontSize: "1.6rem", fontWeight: 800, color: "#fff", marginBottom: "8px", fontFamily: "Roboto, sans-serif" }}>
            Stay in the Loop 🍳
          </h3>
          <p style={{ color: "#fecaca", fontSize: "15px" }}>Weekly recipes, tips, and kitchen hacks delivered to your inbox.</p>
        </div>
        <div style={{ display: "flex", gap: "0", borderRadius: "10px", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.3)" }}>
          {subscribed ? (
            <div style={{ background: "#fff", padding: "14px 28px", fontWeight: 700, color: "#ef4444", display: "flex", alignItems: "center", gap: "8px" }}>
              <Check size={18} /> Subscribed!
            </div>
          ) : (
            <>
              <input
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={{ padding: "14px 20px", border: "none", outline: "none", fontSize: "15px", width: "260px" }}
              />
              <button
                onClick={handleSubscribe}
                style={{ background: "#1f1f1f", color: "#fff", padding: "14px 24px", border: "none", cursor: "pointer", fontWeight: 700, fontSize: "14px", transition: "background 0.2s" }}
                onMouseEnter={(e) => e.currentTarget.style.background = "#374151"}
                onMouseLeave={(e) => e.currentTarget.style.background = "#1f1f1f"}
              >
                Subscribe
              </button>
            </>
          )}
        </div>
      </div>

      {/* main footer grid */}
      <div style={{ padding: "64px 8% 40px", display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: "40px" }}>
        {/* brand */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{ background: "#ef4444", borderRadius: "10px", padding: "8px" }}>
              <ChefHat size={22} color="#fff" />
            </div>
            <span style={{ fontSize: "1.3rem", fontWeight: 900, color: "#fff", letterSpacing: "-0.5px" }}>HerbToolkit</span>
          </div>
          <p style={{ color: "#9ca3af", fontSize: "14px", lineHeight: 1.8, maxWidth: "260px" }}>
            Your AI-powered kitchen companion. Discover, cook, and thrive with personalised recipes and wellness guidance.
          </p>
          <div style={{ display: "flex", gap: "12px", marginTop: "8px" }}>
            {[
              { icon: <Instagram size={18} />, label: "Instagram" },
              { icon: <Twitter size={18} />, label: "Twitter" },
              { icon: <Youtube size={18} />, label: "Youtube" },
              { icon: <Facebook size={18} />, label: "Facebook" },
            ].map(({ icon, label }) => (
              <button
                key={label}
                title={label}
                style={{
                  width: "38px", height: "38px", borderRadius: "50%",
                  background: "#1f1f1f", border: "1px solid #374151",
                  color: "#9ca3af", cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#ef4444"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.borderColor = "#ef4444"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#1f1f1f"; e.currentTarget.style.color = "#9ca3af"; e.currentTarget.style.borderColor = "#374151"; }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* links */}
        {[
          { heading: "Product", links: ["Features", "Pricing", "Changelog", "Roadmap", "API Docs"] },
          { heading: "Company", links: ["About Us", "Blog", "Careers", "Press", "Partners"] },
          { heading: "Support", links: ["Help Center", "Community", "Contact Us", "Privacy Policy", "Terms of Service"] },
        ].map(({ heading, links }) => (
          <div key={heading}>
            <p style={{ fontWeight: 700, color: "#fff", marginBottom: "20px", fontSize: "15px" }}>{heading}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
              {links.map((l) => (
                <li key={l}>
                  <a
                    href="#"
                    style={{ color: "#9ca3af", textDecoration: "none", fontSize: "14px", transition: "color 0.2s" }}
                    onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
                    onMouseLeave={(e) => e.currentTarget.style.color = "#9ca3af"}
                  >
                    {l}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* contact strip */}
      <div style={{ padding: "0 8% 32px", display: "flex", gap: "32px", flexWrap: "wrap" }}>
        {[
          { icon: <Mail size={15} />, text: "hello@herbtoolkit.com" },
          { icon: <Phone size={15} />, text: "+91 98765 43210" },
          { icon: <MapPin size={15} />, text: "Pune, Maharashtra, India" },
        ].map(({ icon, text }) => (
          <div key={text} style={{ display: "flex", alignItems: "center", gap: "8px", color: "#6b7280", fontSize: "13px" }}>
            <span style={{ color: "#ef4444" }}>{icon}</span>
            {text}
          </div>
        ))}
      </div>

      {/* bottom bar */}
      <div style={{ borderTop: "1px solid #1f2937", padding: "24px 8%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px" }}>
        <p style={{ color: "#4b5563", fontSize: "13px" }}>© 2025 HerbToolkit. All rights reserved.</p>
        <div style={{ display: "flex", gap: "24px" }}>
          {["Privacy", "Terms", "Cookies"].map((l) => (
            <a key={l} href="#" style={{ color: "#4b5563", fontSize: "13px", textDecoration: "none" }}
              onMouseEnter={(e) => e.currentTarget.style.color = "#ef4444"}
              onMouseLeave={(e) => e.currentTarget.style.color = "#4b5563"}
            >
              {l}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};

/* ─── Scroll to Top Button ─── */
const ScrollToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const handler = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      style={{
        position: "fixed", bottom: "32px", right: "32px", zIndex: 998,
        width: "48px", height: "48px", borderRadius: "50%",
        background: "#ef4444", border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        boxShadow: "0 4px 20px rgba(239,68,68,0.4)",
        opacity: show ? 1 : 0, pointerEvents: show ? "auto" : "none",
        transform: show ? "translateY(0) scale(1)" : "translateY(10px) scale(0.8)",
        transition: "all 0.3s ease",
      }}
      onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-3px) scale(1.1)"}
      onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0) scale(1)"}
    >
      <ArrowUp size={22} color="#fff" />
    </button>
  );
};

/* ══════════════════════════════════════════
   MAIN LANDING COMPONENT
   ══════════════════════════════════════════ */
const Landing = () => {
  const navigate = useNavigate();
  const navigateLogin = () => navigate("/login");
  const navigateSignup = () => navigate("/register");

  return (
    <>
      {/* shimmer top-bar nav accent */}
      <style>{`
        @keyframes shimmer { 0%{background-position:0% 50%} 100%{background-position:200% 50%} }
        @keyframes float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
      `}</style>
      <NavEnhancement />
      <ScrollToTop />

      <div className="w-full flex flex-col gap-8">
        {/* ── header component (unchanged) ── */}
        <Header />

        {/* ── hero section (unchanged) ── */}
        <div className="w-full h-[65%] justify-between items-center sm:w-[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] sm:mt-0 md:mt-0 lg:mt-0 xl:mt-0 sm:h-svh md:h-svh lg:h-svh xl:h-svh sm:mx-auto flex sm:justify-start md:justify-start lg:justify-start xl:justify-start">
          <div className=" w-full h-full sm:w-[60%] flex flex-col gap-8 justify-center items-start">
            <h1 className="font-bold text-6xl roboto leading-22">
              Cook Smarter. Eat Better. <br />
              Your AI-Powered <br />{" "}
              <span className="text-red-600">Kitchen Companion</span>
            </h1>
            <p className="text-gray-500 poppins text-lg">
              Discover personalized recipes, manage your kitchen inventory, and
              get intelligent cooking and wellness guidance — all in one powerful
              platform.
            </p>
            <div className="w-full flex justify-start gap-8">
              <button className="px-3 py-2 bg-blue-500 border hover:text-black hover:bg-white transition-all border-blue-500 rounded-md font-semibold text-white cursor-pointer" onClick={navigateSignup}>
                Get Started Free
              </button>
              <button className="px-3 py-2 text-black border border-blue-500 rounded-md font-semibold cursor-pointer" onClick={navigateLogin}>
                Explore Recipes
              </button>
            </div>
          </div>
          <div className="w-[40%] flex justify-center items-center">
            <img src={heroImg} alt="" className="w-full" style={{ animation: "float 4s ease-in-out infinite" }} />
          </div>
        </div>

        {/* ── main content — replaced bg-red-400 placeholder with feature cards ── */}
        <div className="w-full flex justify-between items-start pb-5 sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto ">
          <div className="w-[60%] h-120">
            <FeaturesGrid />
          </div>
          <div className="w-[35%] flex flex-col gap-5">
            <h1 className="font-semibold roboto text-3xl">Key Features</h1>
            <ul className="px-7 leading-10">
              <li className="poppins-light">AI Powered</li>
              <li className="poppins-light">Inventory Tracker</li>
              <li className="poppins-light">Personal Recipe Manager</li>
              <li className="poppins-light">Health and Skin Care</li>
              <li className="poppins-light">Influencer and Community Module</li>
              <li className="poppins-light">Multi-Format Recipe Sharing</li>
            </ul>
          </div>
        </div>

        {/* ── ✨ NEW: How It Works ── */}
        <HowItWorks />

        {/* ── sub content (unchanged) ── */}
        <div className="w-full flex flex-col justify-between gap-6 items-start pb-5 sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto ">
          <div className="w-full flex justify-start gap-55">
            <div className="w-[50%]">
              <h1 className="font-semibold text-4xl roboto">Hi, <span className="text-red-600">Foodies</span></h1>
              <p className="text-gray-500 py-5">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro
                nobis ea et aspernatur quod accusantium sit est magnam, alias
                velit veritatis? Unde neque, itaque nemo earum nulla beatae velit
                at.
              </p>
            </div>
            <div className="w-[25%] flex flex-col justify-between relative items-center">
              <div className="w-15 h-15 bg-red-400 rounded-full absolute right-50 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
              <div className="w-15 h-15 bg-red-400 rounded-full absolute right-39 -z-20 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
              <div className="w-15 h-15 bg-red-400 rounded-full absolute right-29 -z-30 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
              <div className="w-15 h-15 bg-red-400 rounded-full absolute right-19 -z-40 bg-center bg-cover" style={{ backgroundImage: `url(${usertemp})` }}></div>
              <div className="w-15 h-15 flex justify-center items-center rounded-full absolute right-0 text-center">
                <Plus />
              </div>
              <div className="w-full absolute bottom-5 text-center">
                <p className="poppins font-semibold">Our Happy Customes</p>
                <p className="poppins-light">4.8 reviews</p>
              </div>
            </div>
          </div>
          <div className="w-full flex justify-between">
            <div className="w-[20%] flex flex-col py-5 items-center justify-center">
              <h1 className="font-bold text-3xl roboto">10K+</h1>
              <p className="font-semibold poppins text-gray-500">Users</p>
            </div>
            <div className="w-[20%] flex flex-col py-5 items-center justify-center">
              <h1 className="font-bold text-3xl roboto">98%</h1>
              <p className="font-semibold poppins text-gray-500">User Satisfaction</p>
            </div>
            <div className="w-[20%] flex flex-col py-5 items-center justify-center">
              <h1 className="font-bold text-3xl roboto">500+</h1>
              <p className="font-semibold poppins text-gray-500">Items of Food</p>
            </div>
            <div className="w-[20%] flex flex-col py-5 items-center justify-center">
              <h1 className="font-bold text-3xl roboto">10+</h1>
              <p className="font-semibold poppins text-gray-500">Categories</p>
            </div>
          </div>
        </div>

        {/* ── last content — replaced left placeholder with testimonials carousel ── */}
        <div className="w-full sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto flex justify-between">
          <TestimonialsCarousel />
          <div className="w-[35%] flex flex-col gap-5">
            <h1 className="uppercase font-bold poppins-semibold tracking-widest text-xl text-red-600">What they say</h1>
            <h1 className="roboto font-bold text-4xl">What Our Customer Say about us</h1>
            <p className="poppins text-lg font-semibold text-gray-500">"This app completely changed how I plan my meals. The AI suggests recipes based on what I already have at home — no more food waste!"</p>
            <div className="w-full flex justify-start gap-5 items-center">
              <div className="w-20 h-20 rounded-full overflow-hidden">
                <img src={usertemp} alt="" />
              </div>
              <div>
                <p className="poppins-semibold">Shivani Manjre</p>
                <p className="font-light">Food Enthusiastic</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── CTA section (unchanged) ── */}
        <div className="w-full flex flex-col justify-between gap-6 items-start pb-5 sm:w[85%] md:w-[85%] lg:w-[85%] xl:w-[85%] mx-auto ">
          <div className="w-full h-135 flex justify-between bg-red-50 rounded-md">
            <div className="w-[40%] flex flex-col gap-8 justify-start p-5 ">
              <h1 className="uppercase font-bold poppins-semibold tracking-widest text-xl text-red-600">GET STARTED</h1>
              <h2 className="roboto capitalize font-bold text-4xl">get Started with HerbToolkit today!</h2>
              <p className="font-semibold text-gray-800 open-sans">Discover personalized recipes, manage your kitchen inventory, and get intelligent cooking and wellness guidance — all in one platform.</p>
              <div className="py-8">
                <button className="py-2 px-3 rounded-lg bg-red-500 font-semibold text-white cursor-pointer">Get Started</button>
              </div>
            </div>
            <div className="w-[55%] flex justify-center items-center">
              <img src={iPhone} alt="" className="w-[35%]" />
            </div>
          </div>
        </div>

        {/* ── ✨ ENHANCED footer (replaces <Footer/>) ── */}
        <EnhancedFooter />
      </div>
    </>
  );
};

export default Landing;