import { useState, useEffect, useRef } from "react";

// ─── THEME ───────────────────────────────────────────────────────────────────
const T = {
  white: "#ffffff",
  bg: "#f8faff",
  bgAlt: "#eef2fb",
  blue: "#2563eb",
  blueDark: "#1d4ed8",
  blueLight: "#3b82f6",
  blueXLight: "#dbeafe",
  heading: "#1e3a8a",
  text: "#1e293b",
  muted: "#475569",
  border: "#cbd5e1",
  borderLight: "#e2e8f0",
  success: "#16a34a",
  danger: "#dc2626",
};

const styles = {
  // Layout
  app: { fontFamily: "'Inter', 'Segoe UI', sans-serif", background: T.bg, color: T.text, minHeight: "100vh" },
  // Nav
  nav: { position: "fixed", top: 0, width: "100%", zIndex: 100, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", borderBottom: `1px solid ${T.borderLight}`, boxShadow: "0 1px 12px rgba(37,99,235,0.06)" },
  navInner: { maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", height: 68, padding: "0 24px" },
  logo: { fontSize: "1.5rem", fontWeight: 900, color: T.blue, textDecoration: "none", letterSpacing: "-0.03em" },
  navLinks: { display: "flex", gap: 32, listStyle: "none", margin: 0, padding: 0 },
  navLink: { color: T.muted, textDecoration: "none", fontSize: "0.88rem", fontWeight: 500, transition: "color 0.2s", cursor: "pointer" },
  navCta: { background: T.blue, color: "#fff", border: "none", padding: "10px 22px", borderRadius: 50, fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s" },
  adminBtn: { background: "transparent", color: T.blue, border: `1.5px solid ${T.blue}`, padding: "8px 18px", borderRadius: 50, fontSize: "0.8rem", fontWeight: 700, cursor: "pointer", marginLeft: 12 },
  // Hero
  hero: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "120px 24px 80px", background: `linear-gradient(160deg, #f0f7ff 0%, #e8f0fe 50%, #f8faff 100%)`, position: "relative", overflow: "hidden" },
  heroContent: { maxWidth: 820, position: "relative", zIndex: 1 },
  heroBadge: { display: "inline-flex", alignItems: "center", gap: 8, background: T.blueXLight, border: `1px solid ${T.blueLight}`, padding: "6px 18px", borderRadius: 50, fontSize: "0.78rem", color: T.blue, fontWeight: 700, marginBottom: 28 },
  heroTitle: { fontSize: "clamp(2.2rem,5.5vw,3.8rem)", fontWeight: 900, lineHeight: 1.1, letterSpacing: "-0.03em", color: T.heading, marginBottom: 20 },
  heroHighlight: { color: T.blue },
  heroSub: { fontSize: "1.05rem", color: T.muted, maxWidth: 580, margin: "0 auto 40px", lineHeight: 1.75 },
  heroStats: { display: "flex", gap: 48, justifyContent: "center", marginTop: 64, flexWrap: "wrap" },
  statNum: { fontSize: "2rem", fontWeight: 900, color: T.blue, display: "block" },
  statLabel: { fontSize: "0.75rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginTop: 4 },
  // Buttons
  btnPrimary: { background: T.blue, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 50, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "inline-block" },
  btnOutline: { background: "transparent", color: T.blue, border: `2px solid ${T.blue}`, padding: "12px 30px", borderRadius: 50, fontSize: "0.95rem", fontWeight: 700, cursor: "pointer", transition: "all 0.2s", textDecoration: "none", display: "inline-block", marginLeft: 12 },
  // Section
  section: { padding: "96px 24px", maxWidth: "100%" },
  sectionInner: { maxWidth: 1280, margin: "0 auto" },
  eyebrow: { display: "inline-block", fontSize: "0.72rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.blue, marginBottom: 10, background: T.blueXLight, padding: "4px 12px", borderRadius: 50 },
  sectionTitle: { fontSize: "clamp(1.7rem,3.5vw,2.6rem)", fontWeight: 900, color: T.heading, lineHeight: 1.15, marginBottom: 14, letterSpacing: "-0.02em" },
  sectionSub: { color: T.muted, fontSize: "1rem", maxWidth: 520, lineHeight: 1.75 },
  // Cards
  serviceCard: { background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 20, padding: "28px 24px", transition: "all 0.25s", boxShadow: "0 2px 16px rgba(37,99,235,0.05)", cursor: "default" },
  projectCard: { background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 20, overflow: "hidden", transition: "all 0.25s", boxShadow: "0 2px 16px rgba(37,99,235,0.06)", display: "flex", flexDirection: "column" },
  tag: { background: T.blueXLight, color: T.blue, fontSize: "0.68rem", fontWeight: 700, padding: "3px 10px", borderRadius: 50, border: `1px solid ${T.blueLight}30` },
  // Pricing
  priceCard: { background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 20, padding: "36px 28px", transition: "all 0.2s", boxShadow: "0 2px 16px rgba(37,99,235,0.05)" },
  priceCardFeatured: { background: T.blue, border: `2px solid ${T.blue}`, borderRadius: 20, padding: "36px 28px", color: "#fff", boxShadow: "0 8px 40px rgba(37,99,235,0.35)" },
  // Footer
  footer: { background: T.heading, color: "#fff", padding: "56px 24px 28px" },
  footerInner: { maxWidth: 1280, margin: "0 auto" },
  // Testimonial
  testimonialCard: { background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 20, padding: "28px", boxShadow: "0 2px 16px rgba(37,99,235,0.05)" },
  // Admin
  adminOverlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "flex-end" },
  adminPanel: { background: T.white, width: "min(520px, 100vw)", height: "100vh", overflowY: "auto", boxShadow: "-8px 0 40px rgba(0,0,0,0.18)", padding: 28 },
  adminTitle: { fontSize: "1.2rem", fontWeight: 800, color: T.heading, marginBottom: 6 },
  adminSection: { marginBottom: 32 },
  adminSectionTitle: { fontSize: "0.8rem", fontWeight: 800, color: T.blue, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 14, paddingBottom: 8, borderBottom: `2px solid ${T.blueXLight}` },
  input: { width: "100%", border: `1.5px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", fontSize: "0.88rem", color: T.text, outline: "none", marginBottom: 10, boxSizing: "border-box", background: T.bg },
  textarea: { width: "100%", border: `1.5px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", fontSize: "0.88rem", color: T.text, outline: "none", marginBottom: 10, boxSizing: "border-box", background: T.bg, minHeight: 80, resize: "vertical" },
  saveBtn: { background: T.blue, color: "#fff", border: "none", padding: "10px 22px", borderRadius: 10, fontWeight: 700, cursor: "pointer", fontSize: "0.85rem" },
  deleteBtn: { background: T.danger, color: "#fff", border: "none", padding: "6px 14px", borderRadius: 8, fontWeight: 700, cursor: "pointer", fontSize: "0.78rem" },
  adminItemRow: { display: "flex", justifyContent: "space-between", alignItems: "center", background: T.bgAlt, border: `1px solid ${T.borderLight}`, borderRadius: 10, padding: "10px 14px", marginBottom: 8 },
  loginBox: { background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 20, padding: 32, maxWidth: 340, margin: "0 auto" },
};

// ─── INITIAL DATA ─────────────────────────────────────────────────────────────
const INITIAL_PROJECTS = [
  { id: 1, title: "Chicken House", tags: ["React 19", "TypeScript", "Tailwind", "Vite"], desc: "Digital food ordering platform with live order tracking, modern UI, and fast frontend performance for a restaurant experience.", impact: "⚡ Realtime orders, delivery tracking, smooth mobile-first ordering", img: "https://images.pexels.com/photos/19252769/pexels-photo-19252769.jpeg", demo: "https://chicken-house-rust.vercel.app/" },
  { id: 2, title: "AI Recruitment Engine", tags: ["Python", "TensorFlow", "React", "Node.js"], desc: "Intelligent matching engine that analyses CVs and ranks candidates against job requirements in real time.", impact: "✅ 40% reduction in shortlisting time for enterprise HR teams", img: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg", demo: "#contact" },
  { id: 3, title: "Smart Parking System", tags: ["Java Spring Boot", "Docker", "React", "IoT"], desc: "Real-time containerized smart parking management system with sensor integration and live dashboard.", impact: "✅ Full production deployment, zero downtime", img: "https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg", demo: "#contact" },
];

const INITIAL_SERVICES = [
  { id: 1, icon: "⚙️", title: "Custom Business Software & Automation", desc: "Tailor-made solutions built around your exact workflow. Scalable architecture that grows with your business." },
  { id: 2, icon: "🌐", title: "Modern Websites & Web Applications", desc: "High-performance web apps with React, Next.js and Vue  beautiful, fast, and SEO-ready." },
  { id: 3, icon: "📱", title: "Flutter & React Native Mobile Apps", desc: "Native and cross-platform iOS & Android apps with Kotlin Compose, React Native, and Flutter." },
  { id: 4, icon: "🤖", title: "AI & Machine Learning", desc: "Predictive models, NLP systems, and intelligent automation that give your business a data-driven edge." },
  { id: 5, icon: "🏢", title: "ASP.NET Enterprise Solutions", desc: "Robust enterprise-grade solutions built on Microsoft's ecosystem for large organisations." },
  { id: 6, icon: "🔌", title: "Secure APIs, Cloud & Database Systems", desc: "RESTful and GraphQL APIs with Spring Boot and Node.js  secure, documented, and integration-ready." },
  { id: 7, icon: "🛡️", title: "Continuous Support & Product Scaling", desc: "Long-term partnership: bug fixes, updates, security patches, and feature expansions  we stay with you." },
];

const ADMIN_PASSWORD = "nexabytes2024";

const INITIAL_PRICING = [
  { id: 1, name: "Starter", price: "From $499", sub: "Perfect for MVPs and landing pages", features: ["Single-page or simple web app","Responsive design","Basic backend or API","2 weeks delivery","30-day support"], featured: false },
  { id: 2, name: "Growth", price: "From $1,499", sub: "Full product for growing businesses", features: ["Multi-page web application","Custom backend & database","3rd-party integrations","4–6 weeks delivery","3 months support","CI/CD deployment"], featured: true },
  { id: 3, name: "Enterprise", price: "Custom", sub: "Large-scale systems and platforms", features: ["Full system architecture","AI/ML integration available","Cloud deployment (AWS/GCP)","Dedicated team","12 months SLA support","Ongoing product scaling"], featured: false },
];

// ─── COMPONENT: Navbar ────────────────────────────────────────────────────────
function Navbar({ onAdminOpen }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const scroll = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };
  const links = [["services","Services"],["portfolio","Work"],["about","About"],["pricing","Pricing"],["contact","Contact"]];
  return (
    <>
      <nav style={{ ...styles.nav, boxShadow: scrolled ? "0 2px 24px rgba(37,99,235,0.10)" : "0 1px 8px rgba(37,99,235,0.04)" }}>
        <div style={styles.navInner}>
          <span style={styles.logo}>Nexabytes</span>
          <ul style={{ ...styles.navLinks, display: "flex" }} className="nav-desktop">
            {links.map(([id,label]) => (
              <li key={id}><span style={styles.navLink} onClick={() => scroll(id)}>{label}</span></li>
            ))}
          </ul>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <button style={styles.navCta} onClick={() => scroll("contact")}>Start a Project</button>
            <button style={styles.adminBtn} onClick={onAdminOpen}>⚙ Admin</button>
            <button onClick={() => setMobileOpen(!mobileOpen)} style={{ background: "none", border: "none", cursor: "pointer", padding: 8, display: "none" }} className="hamburger">☰</button>
          </div>
        </div>
      </nav>
      {mobileOpen && (
        <div style={{ position: "fixed", top: 68, left: 0, right: 0, background: "#fff", borderBottom: `1px solid ${T.borderLight}`, padding: "16px 24px", zIndex: 99, display: "flex", flexDirection: "column", gap: 16 }}>
          {links.map(([id,label]) => (
            <span key={id} style={{ ...styles.navLink, fontSize: "1rem", cursor: "pointer" }} onClick={() => scroll(id)}>{label}</span>
          ))}
        </div>
      )}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        body { overflow-x: hidden; }
        .nav-desktop { display: flex !important; }
        @media(max-width: 768px) { .nav-desktop { display: none !important; } .hamburger { display: block !important; } }
        .service-card-hover:hover { border-color: ${T.blue} !important; transform: translateY(-5px); box-shadow: 0 8px 32px rgba(37,99,235,0.14) !important; }
        .project-card-hover:hover { border-color: ${T.blue} !important; transform: translateY(-5px); box-shadow: 0 8px 32px rgba(37,99,235,0.14) !important; }
        .price-card-hover:hover { border-color: ${T.blue} !important; box-shadow: 0 8px 32px rgba(37,99,235,0.14) !important; }
        .btn-primary-hover:hover { background: ${T.blueDark} !important; transform: translateY(-2px); box-shadow: 0 6px 24px rgba(37,99,235,0.4); }
        .btn-outline-hover:hover { background: ${T.blueXLight} !important; }
        .nav-link-hover:hover { color: ${T.blue} !important; }
        .tech-track { display: flex; gap: 12px; animation: scroll-tech 28s linear infinite; width: max-content; }
        .tech-wrapper { overflow: hidden; padding: 16px 0; }
        @keyframes scroll-tech { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        ::-webkit-scrollbar { width: 5px; } ::-webkit-scrollbar-thumb { background: ${T.blueLight}; border-radius: 4px; }
      `}</style>
    </>
  );
}

// ─── COMPONENT: Hero ─────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={styles.hero}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 0%, rgba(37,99,235,0.10) 0%, transparent 70%)", pointerEvents: "none" }} />
      <div style={styles.heroContent}>
        <div style={styles.heroBadge}>✦ Premium Software Development Agency</div>
        <h1 style={styles.heroTitle}>
          Empowering Businesses Through{" "}
          <span style={styles.heroHighlight}>AI, Software & Innovation</span>
        </h1>
        <p style={styles.heroSub}>
          NEXABYTES helps startups, businesses, and enterprises build next‑generation digital products using Artificial Intelligence, Machine Learning, modern web technologies, and scalable cloud infrastructure.
        </p>
        <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
          <button className="btn-primary-hover" style={styles.btnPrimary} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Start Your Project →</button>
          <button className="btn-outline-hover" style={styles.btnOutline} onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })}>View Our Work</button>
        </div>
        <div style={styles.heroStats}>
          {[["30+","Projects Delivered"],["100%","Client Satisfaction"],["4+","Years Experience"],["<24h","Response Time"]].map(([n,l]) => (
            <div key={l} style={{ textAlign: "center" }}>
              <span style={styles.statNum}>{n}</span>
              <span style={styles.statLabel}>{l}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Services ──────────────────────────────────────────────────────
function Services({ services }) {
  return (
    <section id="services" style={{ ...styles.section, background: T.white }}>
      <div style={styles.sectionInner}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={styles.eyebrow}>What We Do</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>End-to-End Software Services</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto" }}>From concept to launch  we handle every layer of your product so you can focus on growing your business.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 20 }}>
          {services.map(s => (
            <div key={s.id} className="service-card-hover" style={styles.serviceCard}>
              <div style={{ fontSize: "2rem", marginBottom: 14 }}>{s.icon}</div>
              <h3 style={{ fontSize: "0.98rem", fontWeight: 800, color: T.heading, marginBottom: 10 }}>{s.title}</h3>
              <p style={{ fontSize: "0.85rem", color: T.muted, lineHeight: 1.7 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Why ──────────────────────────────────────────────────────────
function Why() {
  const features = [
    ["⚡","Fast Delivery","Agile sprints and lean processes mean you get working software, fast."],
    ["🧱","Clean & Scalable Code","Reviewed, documented, and built to extend  not to rewrite in 6 months."],
    ["🔬","Modern Technologies","We use what's proven and current  never outdated stacks."],
    ["💬","Transparent Communication","Weekly updates, open channels, and honest timelines. Always."],
    ["🔒","Security First","Auth, encryption, and vulnerability scanning built into every release."],
    ["🤝","Long-Term Support","We don't disappear at launch. We stay on as your engineering partner."],
  ];
  return (
    <section id="why" style={{ ...styles.section, background: T.bgAlt }}>
      <div style={styles.sectionInner}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 56, alignItems: "center" }}>
          <div>
            <span style={styles.eyebrow}>Why Nexabytes</span>
            <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Built for Startups.<br />Trusted by Enterprises.</h2>
            <p style={styles.sectionSub}>We combine the agility of a startup with enterprise-grade engineering discipline. Every project we ship is production-ready, secure, and built to scale.</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 32 }}>
              {features.map(([icon, title, desc]) => (
                <div key={title} style={{ background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 16, padding: 18 }}>
                  <div style={{ fontSize: "1.3rem", marginBottom: 8 }}>{icon}</div>
                  <h4 style={{ fontSize: "0.88rem", fontWeight: 800, color: T.heading, marginBottom: 6 }}>{title}</h4>
                  <p style={{ fontSize: "0.78rem", color: T.muted, lineHeight: 1.65 }}>{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 24, padding: 40, boxShadow: "0 4px 32px rgba(37,99,235,0.07)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, marginBottom: 32 }}>
              {[["30+","Projects Delivered"],["100%","Satisfaction Rate"],["<24h","Response Time"],["4+","Years Experience"]].map(([n,l]) => (
                <div key={l} style={{ textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: 900, color: T.blue }}>{n}</div>
                  <div style={{ fontSize: "0.72rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginTop: 4 }}>{l}</div>
                </div>
              ))}
            </div>
            <div style={{ borderTop: `1px solid ${T.borderLight}`, paddingTop: 24 }}>
              <div style={styles.eyebrow}>Our Commitment</div>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 14 }}>
                {["✅ 100% Client Retention","🔐 NDA Protected","🏆 On-Time Delivery"].map(b => (
                  <span key={b} style={{ background: T.blueXLight, color: T.blue, fontSize: "0.75rem", fontWeight: 700, padding: "6px 14px", borderRadius: 50 }}>{b}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Process ───────────────────────────────────────────────────────
function Process() {
  const steps = [
    ["🎯","Discovery","We dig deep into your goals, users, and constraints."],
    ["🖌️","Design","Wireframes and prototypes before a single line of code."],
    ["⚙️","Build","Agile sprints with continuous delivery and feedback."],
    ["🧪","Test","End-to-end QA, security review, and performance audit."],
    ["🚀","Launch","Deployment with CI/CD pipelines and monitoring."],
    ["📈","Scale","Ongoing support, analytics, and iterative improvement."],
  ];
  return (
    <section id="process" style={{ ...styles.section, background: T.white }}>
      <div style={styles.sectionInner}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={styles.eyebrow}>How We Work</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Our Proven Process</h2>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
          {steps.map(([icon, title, desc], i) => (
            <div key={title} style={{ textAlign: "center", padding: "28px 16px", background: T.bgAlt, borderRadius: 20, border: `1.5px solid ${T.borderLight}` }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: T.blueXLight, border: `2px solid ${T.blue}`, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: "1.4rem" }}>{icon}</div>
              <div style={{ fontSize: "0.62rem", fontWeight: 800, color: T.blue, textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: 6 }}>Step {i + 1}</div>
              <div style={{ fontWeight: 800, color: T.heading, fontSize: "0.9rem", marginBottom: 8 }}>{title}</div>
              <div style={{ fontSize: "0.78rem", color: T.muted, lineHeight: 1.6 }}>{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Portfolio ─────────────────────────────────────────────────────
function Portfolio({ projects }) {
  return (
    <section id="portfolio" style={{ ...styles.section, background: T.bgAlt }}>
      <div style={styles.sectionInner}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={styles.eyebrow}>Our Work</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Projects We're Proud Of</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto" }}>Real products. Real results. Built with care from first line to final deployment.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 24 }}>
          {projects.map(p => (
            <div key={p.id} className="project-card-hover" style={styles.projectCard}>
              <img src={p.img} alt={p.title} style={{ width: "100%", height: 200, objectFit: "cover", display: "block" }} onError={e => { e.target.style.display = "none"; }} />
              <div style={{ padding: 24, flex: 1, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 12 }}>
                  {p.tags.map(t => <span key={t} style={styles.tag}>{t}</span>)}
                </div>
                <h3 style={{ fontSize: "1rem", fontWeight: 800, color: T.heading, marginBottom: 8 }}>{p.title}</h3>
                <p style={{ fontSize: "0.83rem", color: T.muted, lineHeight: 1.65, marginBottom: 12, flex: 1 }}>{p.desc}</p>
                <div style={{ fontSize: "0.78rem", color: T.blue, fontWeight: 700, marginBottom: 16 }}>{p.impact}</div>
                <div style={{ display: "flex", gap: 10 }}>
                  <button className="btn-primary-hover" style={{ ...styles.btnPrimary, fontSize: "0.82rem", padding: "9px 20px" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Case Study</button>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="btn-outline-hover" style={{ ...styles.btnOutline, fontSize: "0.82rem", padding: "7px 18px", marginLeft: 0 }}>Live Demo</a>
                </div>
              </div>
            </div>
          ))}
          {/* Placeholder card */}
          <div style={{ ...styles.projectCard, alignItems: "center", justifyContent: "center", minHeight: 300, background: `linear-gradient(135deg, ${T.blueXLight}, ${T.bgAlt})`, border: `2px dashed ${T.blueLight}` }}>
            <div style={{ textAlign: "center", padding: 32 }}>
              <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🚀</div>
              <h3 style={{ color: T.heading, marginBottom: 8, fontWeight: 800 }}>Your Project Here</h3>
              <p style={{ fontSize: "0.83rem", color: T.muted, marginBottom: 20 }}>Ready to build something great?</p>
              <button className="btn-primary-hover" style={{ ...styles.btnPrimary, fontSize: "0.85rem", padding: "11px 24px" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>Start a Conversation →</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Testimonials ──────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { name: "Ahmed Raza", role: "Founder, EduTech Startup", avatar: "A", quote: "Nexabytes took our rough idea and turned it into a fully working product in record time. The code quality was impressive and they communicated clearly throughout. Highly recommend.", result: "✅ Launched 3 weeks ahead of schedule" },
    { name: "Sara Khan", role: "Head of HR, Recruitment Platform", avatar: "S", quote: "The AI matching engine they built reduced our shortlisting time by almost half. The team really understood our HR workflows and built something we actually use every day.", result: "✅ 40% reduction in shortlisting time" },
    { name: "Mohammad Tariq", role: "CTO, Smart City Solutions", avatar: "M", quote: "Professional, reliable, and genuinely invested in the outcome. They built our parking system from scratch  real-time, containerized, and scalable. Outstanding engineering.", result: "✅ Full production deployment, zero downtime" },
  ];
  return (
    <section id="testimonials" style={{ ...styles.section, background: T.white }}>
      <div style={styles.sectionInner}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={styles.eyebrow}>Client Reviews</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Words From People We've Helped</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto" }}>Every project is a partnership. Here's what our clients say.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
          {reviews.map(r => (
            <div key={r.name} style={styles.testimonialCard}>
              <div style={{ color: "#f59e0b", marginBottom: 14, fontSize: "1.1rem" }}>★★★★★</div>
              <blockquote style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.75, marginBottom: 20, fontStyle: "italic" }}>"{r.quote}"</blockquote>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: T.blue, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "1rem", flexShrink: 0 }}>{r.avatar}</div>
                <div>
                  <div style={{ fontWeight: 800, color: T.heading, fontSize: "0.9rem" }}>{r.name}</div>
                  <div style={{ fontSize: "0.75rem", color: T.muted }}>{r.role}</div>
                  <div style={{ fontSize: "0.75rem", color: T.success, fontWeight: 700, marginTop: 2 }}>{r.result}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: About ─────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ ...styles.section, background: T.bgAlt }}>
      <div style={styles.sectionInner}>
        <div style={{ maxWidth: 940, margin: "0 auto", background: T.white, border: `1.5px solid ${T.borderLight}`, borderRadius: 24, padding: "48px 52px", boxShadow: "0 4px 32px rgba(37,99,235,0.07)" }}>
          <span style={styles.eyebrow}>About Us</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Who We Are</h2>
          {[
            "Founded in 2024, NEXABYTES is a technology-driven software company dedicated to building innovative digital solutions that empower businesses to grow, automate, and stay ahead in a rapidly evolving digital world.",
            "We specialize in Artificial Intelligence, Machine Learning, Mobile App Development (Flutter & React Native), Website & Web Application Development, ASP.NET Enterprise Solutions, and Cloud-Integrated Backend Systems. By combining modern technologies with user-centric design and scalable architectures, we deliver software that is secure, reliable, and built for long-term success.",
            "From ambitious startups validating their first product to established organizations accelerating digital transformation, we provide complete end-to-end development services  including strategy, UI/UX design, development, testing, deployment, cloud integration, and ongoing support.",
            "At NEXABYTES, we don't just build software  we create intelligent digital solutions that solve real business challenges and drive measurable results.",
          ].map((p, i) => (
            <p key={i} style={{ color: T.muted, fontSize: "0.96rem", lineHeight: 1.85, marginTop: i === 0 ? 20 : 14 }}>{p}</p>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Tech Stack ────────────────────────────────────────────────────
function TechStack() {
  const pills = ["⚛️ React","▲ Next.js","🟩 Node.js","☕ Java Spring Boot","🐍 Python","🤖 TensorFlow","🐳 Docker","☁️ AWS","🍃 MongoDB","🐬 MySQL","📱 Kotlin Compose","💙 Flutter","📨 Kafka","🔷 TypeScript","🌀 Vue.js"];
  const doubled = [...pills, ...pills];
  return (
    <section id="tech" style={{ ...styles.section, background: T.white, paddingTop: 72, paddingBottom: 72 }}>
      <div style={styles.sectionInner}>
        <div style={{ textAlign: "center", marginBottom: 36 }}>
          <span style={styles.eyebrow}>Our Stack</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Technologies We Excel In</h2>
        </div>
      </div>
      <div className="tech-wrapper">
        <div className="tech-track">
          {doubled.map((p, i) => (
            <div key={i} style={{ background: T.bgAlt, border: `1.5px solid ${T.borderLight}`, borderRadius: 50, padding: "10px 20px", fontSize: "0.88rem", fontWeight: 600, color: T.text, whiteSpace: "nowrap", flexShrink: 0 }}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Pricing ───────────────────────────────────────────────────────
function Pricing({ plans }) {
  return (
    <section id="pricing" style={{ ...styles.section, background: T.bgAlt }}>
      <div style={styles.sectionInner}>
        <div style={{ textAlign: "center", marginBottom: 52 }}>
          <span style={styles.eyebrow}>Investment</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Simple, Transparent Pricing</h2>
          <p style={{ ...styles.sectionSub, margin: "0 auto" }}>No surprises. Pick a starting point and we'll scope it precisely for your project.</p>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24, alignItems: "start" }}>
          {plans.map(p => (
            <div key={p.name} className={p.featured ? "" : "price-card-hover"} style={p.featured ? { ...styles.priceCardFeatured, position: "relative" } : styles.priceCard}>
              {p.featured && <div style={{ position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)", background: "#f59e0b", color: "#fff", fontSize: "0.72rem", fontWeight: 800, padding: "4px 16px", borderRadius: 50 }}>MOST POPULAR</div>}
              <div style={{ fontSize: "1rem", fontWeight: 800, color: p.featured ? "#fff" : T.heading, marginBottom: 6 }}>{p.name}</div>
              <div style={{ fontSize: "1.9rem", fontWeight: 900, color: p.featured ? "#fff" : T.blue, marginBottom: 4 }}>{p.price}</div>
              <div style={{ fontSize: "0.82rem", color: p.featured ? "rgba(255,255,255,0.75)" : T.muted, marginBottom: 24 }}>{p.sub}</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 }}>
                {p.features.map(f => (
                  <li key={f} style={{ fontSize: "0.85rem", color: p.featured ? "rgba(255,255,255,0.9)" : T.muted, display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ color: p.featured ? "#86efac" : T.success, fontWeight: 800 }}>✓</span>{f}
                  </li>
                ))}
              </ul>
              <button className="btn-primary-hover" style={{ ...styles.btnPrimary, width: "100%", textAlign: "center", background: p.featured ? "#fff" : T.blue, color: p.featured ? T.blue : "#fff" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: FAQ ───────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["How long does a typical project take?","A simple landing page takes 1–2 weeks. Complex web apps or AI systems typically take 4–12 weeks. We scope precisely before we commit."],
    ["Do you sign NDAs?","Absolutely. We sign NDAs before any sensitive information is shared, for every engagement regardless of size."],
    ["Can I see the code and own it at the end?","Yes  you own 100% of the IP and source code upon final payment. We hand over full repositories."],
    ["What technologies do you specialise in?","React, Next.js, Node.js, Java Spring Boot, Python, Flutter, React Native, TensorFlow, PostgreSQL, MongoDB, Docker, and AWS, among others."],
    ["Do you offer ongoing support after launch?","Yes. We offer monthly retainers for support, monitoring, and iterative feature development after every project launch."],
  ];
  return (
    <section id="faq" style={{ ...styles.section, background: T.white }}>
      <div style={{ ...styles.sectionInner, maxWidth: 760 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span style={styles.eyebrow}>FAQs</span>
          <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Common Questions</h2>
        </div>
        {faqs.map(([q, a], i) => (
          <div key={i} style={{ border: `1.5px solid ${T.borderLight}`, borderRadius: 16, marginBottom: 12, overflow: "hidden" }}>
            <button onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "18px 22px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, fontSize: "0.9rem", color: T.heading }}>
              {q}<span style={{ color: T.blue, fontSize: "1.2rem", transition: "transform 0.2s", transform: open === i ? "rotate(45deg)" : "none" }}>+</span>
            </button>
            {open === i && <div style={{ padding: "0 22px 18px", fontSize: "0.87rem", color: T.muted, lineHeight: 1.75 }}>{a}</div>}
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── COMPONENT: Contact ───────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", message: "" });
  const [sent, setSent] = useState(false);
  const handle = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) { alert("Please fill in all required fields."); return; }
    setSent(true);
  };
  const inputStyle = { ...styles.input, marginBottom: 16, fontFamily: "inherit" };
  return (
    <section id="contact" style={{ ...styles.section, background: T.bgAlt }}>
      <div style={styles.sectionInner}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 52, alignItems: "start" }}>
          <div>
            <span style={styles.eyebrow}>Get In Touch</span>
            <h2 style={{ ...styles.sectionTitle, marginTop: 8 }}>Let's Build Something Great</h2>
            <p style={{ ...styles.sectionSub, marginBottom: 32 }}>Have a project in mind? Fill in the form and we'll get back to you within 24 hours to discuss the details.</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {[["📧","Email","nexabyte.byt@gmail.com"],["📍","Location"," Islamabad, Pakistan  Remote Worldwide"],["⏱️","Response Time","We reply within 24 hours, guaranteed"]].map(([icon,label,val]) => (
                <div key={label} style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: T.blueXLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontWeight: 700, color: T.heading, fontSize: "0.88rem" }}>{label}</div>
                    <div style={{ color: T.muted, fontSize: "0.82rem" }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: T.white, borderRadius: 24, padding: "36px 32px", border: `1.5px solid ${T.borderLight}`, boxShadow: "0 4px 32px rgba(37,99,235,0.07)" }}>
            {sent ? (
              <div style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "3rem", marginBottom: 16 }}>🎉</div>
                <h3 style={{ color: T.heading, fontWeight: 800, marginBottom: 8 }}>Message Sent!</h3>
                <p style={{ color: T.muted, fontSize: "0.9rem" }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 16px" }}>
                  <div><label style={{ fontSize: "0.78rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 6 }}>Full Name *</label><input name="name" value={form.name} onChange={handle} style={inputStyle} placeholder="Your name" /></div>
                  <div><label style={{ fontSize: "0.78rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 6 }}>Email *</label><input name="email" type="email" value={form.email} onChange={handle} style={inputStyle} placeholder="your@email.com" /></div>
                </div>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 6 }}>Service Needed</label>
                <select name="service" value={form.service} onChange={handle} style={{ ...inputStyle, appearance: "none" }}>
                  <option value="">Select a service…</option>
                  {["Custom Software","Web Application","Mobile App","AI / ML","API & Backend","Enterprise Solution","Other"].map(o => <option key={o}>{o}</option>)}
                </select>
                <label style={{ fontSize: "0.78rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 6 }}>Project Description *</label>
                <textarea name="message" value={form.message} onChange={handle} style={{ ...styles.textarea, fontFamily: "inherit" }} placeholder="Tell us about your project, goals, and timeline…" />
                <button type="submit" className="btn-primary-hover" style={{ ...styles.btnPrimary, width: "100%", textAlign: "center", marginTop: 8 }}>Send Message  Let's Build →</button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── COMPONENT: Footer ────────────────────────────────────────────────────────
function Footer() {
  const scroll = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={styles.footer}>
      <div style={styles.footerInner}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: "#fff", marginBottom: 12 }}>Nexabytes</div>
            <p style={{ fontSize: "0.82rem", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: 240 }}>Premium software development agency building next-generation digital products for startups and enterprises.</p>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              {[["🐙","https://github.com"],["💼","https://linkedin.com"],["📧","mailto:nexabyte.byt@gmail.com"]].map(([icon, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" style={{ width: 34, height: 34, borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.14)", display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: "0.9rem" }}>{icon}</a>
              ))}
            </div>
          </div>
          {[
            ["Services",["Custom Software","Web Apps","Mobile Apps","AI & ML","Cloud & APIs","Support"]],
            ["Company",["About","Portfolio","Pricing","FAQ","Contact"]],
            ["Contact",["nexabyte.byt@gmail.com"," Islamabad, Pakistan","Remote Worldwide","Mon–Sat 9AM–6PM PKT"]],
          ].map(([heading, items]) => (
            <div key={heading}>
              <h4 style={{ fontSize: "0.78rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.1em", color: "#fff", marginBottom: 16 }}>{heading}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                {items.map(item => (
                  <li key={item}><span style={{ color: "rgba(255,255,255,0.58)", fontSize: "0.82rem", cursor: "pointer" }} onClick={() => {}}>{item}</span></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.12)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>© 2024 Nexabytes. All rights reserved.</span>
          <span style={{ fontSize: "0.78rem", color: "rgba(255,255,255,0.45)" }}>Built with ❤️ for ambitious businesses.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── COMPONENT: Admin Panel ───────────────────────────────────────────────────
function AdminPanel({ projects, setProjects, services, setServices, plans, setPlans, onClose }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [tab, setTab] = useState("projects");

  // New project form
  const [newProj, setNewProj] = useState({ title: "", tags: "", desc: "", impact: "", img: "", demo: "" });
  // New service form
  const [newSvc, setNewSvc] = useState({ icon: "", title: "", desc: "" });
  // Edit service
  const [editSvc, setEditSvc] = useState(null);
  // Edit plan
  const [editPlan, setEditPlan] = useState(null);
  const [editPlanFeatures, setEditPlanFeatures] = useState("");

  const login = () => {
    if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(false); }
    else setPwErr(true);
  };

  const addProject = () => {
    if (!newProj.title || !newProj.desc) { alert("Title and description are required."); return; }
    setProjects(ps => [...ps, { ...newProj, id: Date.now(), tags: newProj.tags.split(",").map(t => t.trim()).filter(Boolean) }]);
    setNewProj({ title: "", tags: "", desc: "", impact: "", img: "", demo: "" });
  };

  const deleteProject = (id) => { if (window.confirm("Delete this project?")) setProjects(ps => ps.filter(p => p.id !== id)); };

  const addService = () => {
    if (!newSvc.title) { alert("Title is required."); return; }
    setServices(ss => [...ss, { ...newSvc, id: Date.now() }]);
    setNewSvc({ icon: "", title: "", desc: "" });
  };

  const deleteService = (id) => { if (window.confirm("Delete this service?")) setServices(ss => ss.filter(s => s.id !== id)); };

  const saveService = () => {
    setServices(ss => ss.map(s => s.id === editSvc.id ? editSvc : s));
    setEditSvc(null);
  };

  const startEditPlan = (plan) => {
    setEditPlan({ ...plan });
    setEditPlanFeatures(plan.features.join("\n"));
  };

  const savePlan = () => {
    const updated = { ...editPlan, features: editPlanFeatures.split("\n").map(f => f.trim()).filter(Boolean) };
    setPlans(ps => ps.map(p => p.id === updated.id ? updated : p));
    setEditPlan(null);
    setEditPlanFeatures("");
  };

  if (!authed) {
    return (
      <div style={styles.adminOverlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
        <div style={styles.adminPanel}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 28 }}>
            <div style={styles.adminTitle}>⚙️ Admin Login</div>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.4rem", cursor: "pointer", color: T.muted }}>×</button>
          </div>
          <div style={styles.loginBox}>
            <div style={{ fontSize: "2rem", textAlign: "center", marginBottom: 16 }}>🔐</div>
            <h3 style={{ textAlign: "center", color: T.heading, marginBottom: 20, fontWeight: 800 }}>Company Access Only</h3>
            <input type="password" placeholder="Admin password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} style={{ ...styles.input, marginBottom: 8 }} />
            {pwErr && <p style={{ color: T.danger, fontSize: "0.8rem", marginBottom: 8 }}>Incorrect password.</p>}
            <button style={{ ...styles.saveBtn, width: "100%", padding: "12px" }} onClick={login}>Login to Admin Panel</button>
          </div>
        </div>
      </div>
    );
  }

  const tabBtn = (id, label) => (
    <button onClick={() => setTab(id)} style={{ padding: "8px 18px", borderRadius: 8, border: "none", background: tab === id ? T.blue : T.bgAlt, color: tab === id ? "#fff" : T.muted, fontWeight: 700, fontSize: "0.82rem", cursor: "pointer" }}>{label}</button>
  );

  return (
    <div style={styles.adminOverlay} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={styles.adminPanel}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <div style={styles.adminTitle}>⚙️ Admin Panel</div>
            <div style={{ fontSize: "0.75rem", color: T.muted }}>Company access only</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: T.muted }}>×</button>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 24, flexWrap: "wrap" }}>
          {tabBtn("projects","📁 Projects")}
          {tabBtn("services","⚙️ Services")}
          {tabBtn("pricing","💰 Pricing")}
        </div>

        {/* ── PROJECTS TAB ── */}
        {tab === "projects" && (
          <>
            <div style={styles.adminSection}>
              <div style={styles.adminSectionTitle}>Current Projects ({projects.length})</div>
              {projects.map(p => (
                <div key={p.id} style={styles.adminItemRow}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.88rem", color: T.heading }}>{p.title}</div>
                    <div style={{ fontSize: "0.73rem", color: T.muted }}>{p.tags?.join(", ")}</div>
                  </div>
                  <button style={styles.deleteBtn} onClick={() => deleteProject(p.id)}>🗑 Delete</button>
                </div>
              ))}
            </div>
            <div style={styles.adminSection}>
              <div style={styles.adminSectionTitle}>Add New Project</div>
              {[["title","Project Title *","e.g. Smart Dashboard"],["tags","Tech Tags (comma-separated)","React, Node.js, MongoDB"],["desc","Description *","What the project does..."],["impact","Impact / Result","⚡ Key achievement"],["img","Image URL","https://..."],["demo","Demo / Live URL","https://..."]].map(([key, label, ph]) => (
                <div key={key}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 4 }}>{label}</label>
                  {key === "desc" || key === "impact"
                    ? <textarea value={newProj[key]} onChange={e => setNewProj(f => ({ ...f, [key]: e.target.value }))} style={styles.textarea} placeholder={ph} />
                    : <input value={newProj[key]} onChange={e => setNewProj(f => ({ ...f, [key]: e.target.value }))} style={styles.input} placeholder={ph} />
                  }
                </div>
              ))}
              <button style={{ ...styles.saveBtn, width: "100%", padding: "12px" }} onClick={addProject}>+ Add Project</button>
            </div>
          </>
        )}

        {/* ── PRICING TAB ── */}
        {tab === "pricing" && (
          <div style={styles.adminSection}>
            <div style={styles.adminSectionTitle}>Pricing Plans  Edit Anytime</div>
            <p style={{ fontSize: "0.78rem", color: T.muted, marginBottom: 16 }}>Click <strong>Edit</strong> on any plan to change its name, price, subtitle, or features. Changes show live on the website.</p>
            {plans.map(plan => (
              <div key={plan.id}>
                {editPlan?.id === plan.id ? (
                  <div style={{ background: T.bgAlt, border: `1.5px solid ${T.blue}`, borderRadius: 14, padding: 16, marginBottom: 12 }}>
                    <div style={{ fontSize: "0.75rem", fontWeight: 800, color: T.blue, marginBottom: 10 }}>Editing: {plan.name}</div>
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 4 }}>Plan Name</label>
                    <input value={editPlan.name} onChange={e => setEditPlan(p => ({ ...p, name: e.target.value }))} style={styles.input} placeholder="e.g. Starter" />
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 4 }}>Price *</label>
                    <input value={editPlan.price} onChange={e => setEditPlan(p => ({ ...p, price: e.target.value }))} style={styles.input} placeholder="e.g. From $499" />
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 4 }}>Subtitle</label>
                    <input value={editPlan.sub} onChange={e => setEditPlan(p => ({ ...p, sub: e.target.value }))} style={styles.input} placeholder="e.g. Perfect for MVPs" />
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 4 }}>Features (one per line)</label>
                    <textarea value={editPlanFeatures} onChange={e => setEditPlanFeatures(e.target.value)} style={{ ...styles.textarea, minHeight: 120 }} placeholder={"Responsive design\nBasic backend or API\n2 weeks delivery"} />
                    <label style={{ fontSize: "0.75rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 4 }}>Featured / Highlighted Plan?</label>
                    <div style={{ display: "flex", gap: 10, marginBottom: 12 }}>
                      {[true, false].map(v => (
                        <button key={String(v)} onClick={() => setEditPlan(p => ({ ...p, featured: v }))} style={{ padding: "7px 18px", borderRadius: 8, border: `1.5px solid ${editPlan.featured === v ? T.blue : T.border}`, background: editPlan.featured === v ? T.blueXLight : T.white, color: editPlan.featured === v ? T.blue : T.muted, fontWeight: 700, fontSize: "0.8rem", cursor: "pointer" }}>
                          {v ? "⭐ Yes (highlighted)" : "No"}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button style={styles.saveBtn} onClick={savePlan}>✓ Save Plan</button>
                      <button style={{ ...styles.deleteBtn, background: T.muted }} onClick={() => { setEditPlan(null); setEditPlanFeatures(""); }}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ ...styles.adminItemRow, alignItems: "flex-start" }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <span style={{ fontWeight: 800, fontSize: "0.9rem", color: T.heading }}>{plan.name}</span>
                        {plan.featured && <span style={{ background: "#f59e0b", color: "#fff", fontSize: "0.62rem", fontWeight: 800, padding: "2px 8px", borderRadius: 50 }}>FEATURED</span>}
                      </div>
                      <div style={{ fontSize: "1rem", fontWeight: 900, color: T.blue }}>{plan.price}</div>
                      <div style={{ fontSize: "0.72rem", color: T.muted, marginTop: 2 }}>{plan.sub}</div>
                      <div style={{ fontSize: "0.7rem", color: T.muted, marginTop: 4 }}>{plan.features.length} features listed</div>
                    </div>
                    <button onClick={() => startEditPlan(plan)} style={{ ...styles.saveBtn, padding: "7px 14px", fontSize: "0.78rem", flexShrink: 0 }}>✏️ Edit</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* ── SERVICES TAB ── */}
        {tab === "services" && (
          <>
            <div style={styles.adminSection}>
              <div style={styles.adminSectionTitle}>Current Services ({services.length})</div>
              {services.map(s => (
                <div key={s.id}>
                  {editSvc?.id === s.id ? (
                    <div style={{ ...styles.adminItemRow, flexDirection: "column", alignItems: "stretch", gap: 8 }}>
                      <input value={editSvc.icon} onChange={e => setEditSvc(f => ({ ...f, icon: e.target.value }))} style={styles.input} placeholder="Icon emoji" />
                      <input value={editSvc.title} onChange={e => setEditSvc(f => ({ ...f, title: e.target.value }))} style={styles.input} placeholder="Service title" />
                      <textarea value={editSvc.desc} onChange={e => setEditSvc(f => ({ ...f, desc: e.target.value }))} style={styles.textarea} placeholder="Description" />
                      <div style={{ display: "flex", gap: 8 }}>
                        <button style={styles.saveBtn} onClick={saveService}>Save</button>
                        <button style={{ ...styles.deleteBtn, background: T.muted }} onClick={() => setEditSvc(null)}>Cancel</button>
                      </div>
                    </div>
                  ) : (
                    <div style={styles.adminItemRow}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: "0.88rem", color: T.heading }}>{s.icon} {s.title}</div>
                        <div style={{ fontSize: "0.72rem", color: T.muted, maxWidth: 280 }}>{s.desc.slice(0, 60)}…</div>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button onClick={() => setEditSvc(s)} style={{ ...styles.saveBtn, padding: "6px 12px", fontSize: "0.75rem" }}>Edit</button>
                        <button style={styles.deleteBtn} onClick={() => deleteService(s.id)}>🗑</button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={styles.adminSection}>
              <div style={styles.adminSectionTitle}>Add New Service</div>
              {[["icon","Icon Emoji","🔧"],["title","Service Title *","e.g. DevOps & CI/CD"],["desc","Description","What this service includes..."]].map(([key, label, ph]) => (
                <div key={key}>
                  <label style={{ fontSize: "0.75rem", fontWeight: 700, color: T.muted, display: "block", marginBottom: 4 }}>{label}</label>
                  {key === "desc"
                    ? <textarea value={newSvc[key]} onChange={e => setNewSvc(f => ({ ...f, [key]: e.target.value }))} style={styles.textarea} placeholder={ph} />
                    : <input value={newSvc[key]} onChange={e => setNewSvc(f => ({ ...f, [key]: e.target.value }))} style={styles.input} placeholder={ph} />
                  }
                </div>
              ))}
              <button style={{ ...styles.saveBtn, width: "100%", padding: "12px" }} onClick={addService}>+ Add Service</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ─── COMPONENT: Chatbot ───────────────────────────────────────────────────────
function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState([{ type: "bot", text: "Hi! I'm the Nexabytes assistant. Ask me anything about our services, pricing, or timelines." }]);
  const [input, setInput] = useState("");
  const endRef = useRef(null);
  useEffect(() => { endRef.current?.scrollIntoView({ behavior: "smooth" }); }, [msgs]);
  const reply = (text) => {
    const v = text.toLowerCase();
    if (v.includes("service") || v.includes("offer")) return "We offer custom software, web apps, mobile apps, AI/ML solutions, UI/UX design, API development, and cloud deployment.";
    if (v.includes("price") || v.includes("cost")) return "Pricing starts at $499. Scope, timeline, and complexity shape the final quote  we always do a free discovery call first.";
    if (v.includes("time") || v.includes("how long")) return "Simple projects take 1–2 weeks; complex products take 4–12 weeks depending on scope.";
    if (v.includes("start") || v.includes("project")) return "Great! Click 'Start a Project' or use the contact form below  we'll guide you through every step.";
    if (v.includes("ai") || v.includes("machine learning")) return "Yes! We build AI chatbots, recommendation engines, forecasting tools, and custom ML models.";
    if (v.includes("contact") || v.includes("email")) return "Reach us at nexabyte.byt@gmail.com or fill in the contact form  we reply within 24 hours.";
    return "Great question! We can help with services, pricing, timelines, and getting started. Try one of the options above.";
  };
  const send = (text) => {
    const msg = text || input.trim();
    if (!msg) return;
    setMsgs(m => [...m, { type: "user", text: msg }, { type: "bot", text: reply(msg) }]);
    setInput("");
  };
  const chips = ["Our services","Pricing","Timeline","Start a project"];
  return (
    <>
      <button onClick={() => setOpen(!open)} style={{ position: "fixed", right: 24, bottom: 80, background: T.blue, color: "#fff", border: "none", borderRadius: 50, padding: "13px 20px", display: "flex", alignItems: "center", gap: 8, fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", boxShadow: "0 8px 28px rgba(37,99,235,0.4)", zIndex: 70 }}>
        💬 Chat
      </button>
      {open && (
        <div style={{ position: "fixed", right: 24, bottom: 148, width: "min(360px, calc(100vw - 32px))", maxHeight: "70vh", display: "flex", flexDirection: "column", background: "#fff", border: `1.5px solid ${T.borderLight}`, borderRadius: 20, boxShadow: "0 16px 56px rgba(37,99,235,0.15)", zIndex: 70, overflow: "hidden" }}>
          <div style={{ background: T.blue, padding: "14px 16px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ color: "#fff", fontWeight: 800, fontSize: "0.95rem" }}>Nexabytes Assistant</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "0.72rem" }}>Typically replies instantly</div>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "#fff", fontSize: "1.2rem", cursor: "pointer" }}>×</button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10 }}>
            {msgs.map((m, i) => (
              <div key={i} style={{ maxWidth: "88%", padding: "10px 14px", borderRadius: 14, fontSize: "0.88rem", lineHeight: 1.55, alignSelf: m.type === "user" ? "flex-end" : "flex-start", background: m.type === "user" ? T.blue : T.bgAlt, color: m.type === "user" ? "#fff" : T.text }}>{m.text}</div>
            ))}
            <div ref={endRef} />
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, padding: "0 12px 10px" }}>
            {chips.map(c => <button key={c} onClick={() => send(c)} style={{ border: `1px solid ${T.borderLight}`, background: T.bgAlt, color: T.muted, padding: "5px 10px", borderRadius: 50, fontSize: "0.75rem", cursor: "pointer" }}>{c}</button>)}
          </div>
          <div style={{ display: "flex", gap: 8, padding: "0 12px 12px", borderTop: `1px solid ${T.borderLight}` }}>
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && send()} placeholder="Ask us anything…" style={{ flex: 1, border: `1.5px solid ${T.borderLight}`, borderRadius: 50, padding: "9px 14px", fontSize: "0.85rem", outline: "none", fontFamily: "inherit" }} />
            <button onClick={() => send()} style={{ background: T.blue, color: "#fff", border: "none", borderRadius: 50, padding: "9px 16px", fontWeight: 800, cursor: "pointer" }}>→</button>
          </div>
        </div>
      )}
    </>
  );
}

// ─── COMPONENT: Back to Top ───────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 400);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ position: "fixed", bottom: 28, right: 24, width: 44, height: 44, borderRadius: 12, background: T.heading, border: "none", color: "#fff", fontSize: "1.1rem", cursor: "pointer", boxShadow: "0 4px 20px rgba(30,58,138,0.35)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center" }}>↑</button>
  );
}

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [plans, setPlans] = useState(INITIAL_PRICING);
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <div style={styles.app}>
      <Navbar onAdminOpen={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <Services services={services} />
        <Why />
        <Process />
        <Portfolio projects={projects} />
        <Testimonials />
        <About />
        <TechStack />
        <Pricing plans={plans} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
      <BackToTop />
      {adminOpen && (
        <AdminPanel
          projects={projects} setProjects={setProjects}
          services={services} setServices={setServices}
          plans={plans} setPlans={setPlans}
          onClose={() => setAdminOpen(false)}
        />
      )}
    </div>
  );
}
