import { useState, useEffect, useRef } from "react";
import emailjs from "@emailjs/browser";

// ─── BRIVON-STYLE THEME ───────────────────────────────────────────────────────
const T = {
  charcoal:   "#1a1a1a",   // main bg
  charcoal2:  "#222222",   // card bg
  charcoal3:  "#2a2a2a",   // border/alt
  lime:       "#c8f135",   // electric lime accent
  limeDark:   "#a8d020",
  limeLight:  "#d8ff50",
  white:      "#ffffff",
  offwhite:   "#f0f0f0",
  muted:      "#888888",
  mutedLight: "#aaaaaa",
  danger:     "#ff4444",
  success:    "#44ff88",
};

const EMAILJS_CONFIG = {
  publicKey: "33WAuqfL4b86LPglb",
  serviceId: "service_14hs89a",
  templateId: "template_myyycgp",
};

// ─── GLOBAL CSS ───────────────────────────────────────────────────────────────
const GlobalCSS = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap');
    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body { background: ${T.charcoal}; color: ${T.white}; font-family: 'Inter', sans-serif; overflow-x: hidden; }
    ::selection { background: ${T.lime}; color: ${T.charcoal}; }
    ::-webkit-scrollbar { width: 4px; }
    ::-webkit-scrollbar-track { background: ${T.charcoal}; }
    ::-webkit-scrollbar-thumb { background: ${T.lime}; border-radius: 2px; }

    .nav-link:hover { color: ${T.lime} !important; }
    .btn-lime:hover { background: ${T.limeLight} !important; transform: translateY(-2px); box-shadow: 0 8px 32px rgba(200,241,53,0.3); }
    .btn-outline:hover { background: ${T.lime} !important; color: ${T.charcoal} !important; }
    .card-hover:hover { border-color: ${T.lime} !important; transform: translateY(-4px); }
    .project-card:hover { border-color: ${T.lime} !important; }
    .project-card:hover .proj-title { color: ${T.lime} !important; }
    .faq-btn:hover { color: ${T.lime} !important; }
    .footer-link:hover { color: ${T.lime} !important; }
    .social-btn:hover { background: ${T.lime} !important; color: ${T.charcoal} !important; border-color: ${T.lime} !important; }

    .tech-track { display: flex; gap: 12px; animation: marquee 30s linear infinite; width: max-content; }
    .tech-wrapper { overflow: hidden; padding: 20px 0; mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent); }
    @keyframes marquee { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }

    .stat-num { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; color: ${T.lime}; line-height: 1; display: block; }
    .stat-label { font-size: 0.72rem; color: ${T.muted}; text-transform: uppercase; letter-spacing: 0.12em; margin-top: 6px; display: block; }

    .section-eyebrow { font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; color: ${T.lime}; display: inline-block; margin-bottom: 16px; }
    .big-title { font-size: clamp(2.4rem, 5.5vw, 4.2rem); font-weight: 900; line-height: 1.05; letter-spacing: -0.03em; color: ${T.white}; }
    .big-title .accent { color: ${T.lime}; }
    .section-sub { font-size: 1rem; color: ${T.muted}; line-height: 1.8; max-width: 540px; margin-top: 16px; }

    .divider { width: 48px; height: 3px; background: ${T.lime}; margin: 20px 0; }
    .divider-center { margin: 20px auto; }

    .num-label { font-size: 0.62rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.18em; color: ${T.lime}; margin-bottom: 8px; display: block; }

    @media (max-width: 768px) {
      .nav-desktop { display: none !important; }
      .hamburger { display: flex !important; }
      .hero-grid { grid-template-columns: 1fr !important; }
      .two-col { grid-template-columns: 1fr !important; }
      .three-col { grid-template-columns: 1fr !important; }
      .four-col { grid-template-columns: 1fr 1fr !important; }
    }
    @media (min-width: 769px) {
      .hamburger { display: none !important; }
    }
  `}</style>
);

// ─── NAVBAR ───────────────────────────────────────────────────────────────────
function Navbar({ onAdmin }) {
  const [scrolled, setScrolled] = useState(false);
  const [mob, setMob] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  const go = (id) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMob(false); };
  const links = [["services","Services"],["portfolio","Work"],["about","Studio"],["pricing","Pricing"],["contact","Contact"]];
  return (
    <>
      <nav style={{ position: "fixed", top: 0, width: "100%", zIndex: 200, background: scrolled ? "rgba(26,26,26,0.96)" : "transparent", backdropFilter: scrolled ? "blur(20px)" : "none", borderBottom: scrolled ? `1px solid ${T.charcoal3}` : "none", transition: "all 0.3s" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span style={{ fontSize: "1.3rem", fontWeight: 900, color: T.white, letterSpacing: "-0.04em" }}>
              Nexa<span style={{ color: T.lime }}>bytes</span>
            </span>
          </div>
          {/* Desktop links */}
          <ul className="nav-desktop" style={{ display: "flex", gap: 36, listStyle: "none" }}>
            {links.map(([id, label]) => (
              <li key={id}>
                <span className="nav-link" onClick={() => go(id)} style={{ color: T.mutedLight, fontSize: "0.85rem", fontWeight: 500, cursor: "pointer", transition: "color 0.2s" }}>{label}</span>
              </li>
            ))}
          </ul>
          {/* Right buttons */}
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <button className="btn-lime" onClick={() => go("contact")} style={{ background: T.lime, color: T.charcoal, border: "none", padding: "10px 24px", borderRadius: 4, fontSize: "0.82rem", fontWeight: 800, cursor: "pointer", transition: "all 0.2s", letterSpacing: "0.02em" }}>Start a Project</button>
            <button onClick={onAdmin} style={{ background: "transparent", color: T.lime, border: `1px solid ${T.charcoal3}`, padding: "9px 16px", borderRadius: 4, fontSize: "0.78rem", fontWeight: 700, cursor: "pointer" }}>⚙ Admin</button>
            <button className="hamburger" onClick={() => setMob(!mob)} style={{ background: "none", border: "none", color: T.white, fontSize: "1.4rem", cursor: "pointer", padding: 4 }}>☰</button>
          </div>
        </div>
      </nav>
      {mob && (
        <div style={{ position: "fixed", top: 72, left: 0, right: 0, background: T.charcoal2, borderBottom: `1px solid ${T.charcoal3}`, padding: "24px 40px", zIndex: 199, display: "flex", flexDirection: "column", gap: 20 }}>
          {links.map(([id, label]) => (
            <span key={id} onClick={() => go(id)} style={{ color: T.offwhite, fontSize: "1rem", fontWeight: 600, cursor: "pointer" }}>{label}</span>
          ))}
        </div>
      )}
    </>
  );
}

// ─── HERO ─────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "0 40px 80px", maxWidth: 1400, margin: "0 auto", paddingTop: 120 }}>
      {/* Main headline */}
      <div style={{ marginBottom: 60 }}>
        <h1 className="big-title" style={{ fontSize: "clamp(3rem, 8vw, 7rem)", marginBottom: 32 }}>
          We build software<br />
          the business, not<br />
          <span className="accent">/ the brief.</span>
        </h1>
        <div style={{ display: "flex", gap: 40, alignItems: "flex-start", flexWrap: "wrap" }}>
          <p style={{ fontSize: "1rem", color: T.muted, lineHeight: 1.8, maxWidth: 480 }}>
            NEXABYTES is a premium software development agency. We build AI systems, web apps, mobile apps, and enterprise software for startups and businesses that care about craft   not just shipping.
          </p>
          <div style={{ display: "flex", gap: 12, alignItems: "center", flexShrink: 0 }}>
            <button className="btn-lime" onClick={() => document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" })} style={{ background: T.lime, color: T.charcoal, border: "none", padding: "14px 32px", borderRadius: 4, fontSize: "0.9rem", fontWeight: 800, cursor: "pointer", transition: "all 0.2s" }}>See our work →</button>
            <button className="btn-outline" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: "transparent", color: T.white, border: `1px solid ${T.charcoal3}`, padding: "13px 28px", borderRadius: 4, fontSize: "0.9rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s" }}>Start a project</button>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap", gap: 20 }}>
          <div>
            {/* <span className="section-eyebrow">Islamabad · Pakistan · est. 2024</span> */}
          </div>
          <div style={{ display: "flex", gap: 40, flexWrap: "wrap" }}>
            {[["30+","Projects Delivered"],["100%","Client Satisfaction"],["<24h","Response Time"]].map(([n, l]) => (
              <div key={l} style={{ textAlign: "right" }}>
                <span className="stat-num" style={{ fontSize: "1.6rem" }}>{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom divider row */}
      <div style={{ borderTop: `1px solid ${T.charcoal3}`, paddingTop: 28, display: "flex", gap: 32, flexWrap: "wrap" }}>
        {["Custom Software","Web Applications","Mobile Apps","AI & Machine Learning","APIs & Cloud","Enterprise Solutions"].map(s => (
          <span key={s} style={{ fontSize: "0.75rem", color: T.muted, textTransform: "uppercase", letterSpacing: "0.1em" }}>{s}</span>
        ))}
      </div>
    </section>
  );
}

// ─── SERVICES ─────────────────────────────────────────────────────────────────
function Services({ services }) {
  return (
    <section id="services" style={{ padding: "120px 40px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
        <div>
          <span className="section-eyebrow">What we do</span>
          <h2 className="big-title">Five disciplines.<br /><span className="accent">One team.</span></h2>
        </div>
        <p className="section-sub" style={{ marginTop: 0, maxWidth: 380 }}>
          From concept to launch   we handle every layer of your product so you can focus on growing your business.
        </p>
      </div>

      <div style={{ display: "grid", gap: 1, borderTop: `1px solid ${T.charcoal3}` }}>
        {services.map((s, i) => (
          <div key={s.id} className="card-hover" style={{ display: "grid", gridTemplateColumns: "80px 1fr 1fr auto", alignItems: "center", gap: 40, padding: "36px 0", borderBottom: `1px solid ${T.charcoal3}`, transition: "all 0.25s", cursor: "default" }}>
            <span className="num-label" style={{ marginBottom: 0 }}>{String(i + 1).padStart(2, "0")}</span>
            <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: T.white, lineHeight: 1.4 }}>{s.title}</h3>
            <p style={{ fontSize: "0.85rem", color: T.muted, lineHeight: 1.7 }}>{s.desc}</p>
            <span style={{ fontSize: "1.8rem" }}>{s.icon}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PORTFOLIO ────────────────────────────────────────────────────────────────
function Portfolio({ projects }) {
  return (
    <section id="portfolio" style={{ padding: "120px 40px", background: T.charcoal2, borderTop: `1px solid ${T.charcoal3}`, borderBottom: `1px solid ${T.charcoal3}` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
          <div>
            <span className="section-eyebrow">Selected work · 2024–25</span>
            <h2 className="big-title">Projects we're<br /><span className="accent">proud of.</span></h2>
          </div>
          <p className="section-sub" style={{ marginTop: 0, maxWidth: 340 }}>
            Real products. Real results. Built with care from first line to final deployment.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 2 }}>
          {projects.map((p, i) => (
            <div key={p.id} className="project-card" style={{ background: T.charcoal, border: `1px solid ${T.charcoal3}`, transition: "all 0.25s", overflow: "hidden" }}>
              <div style={{ position: "relative", overflow: "hidden", height: 240 }}>
                <img src={p.img} alt={p.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(20%)", transition: "transform 0.4s, filter 0.4s" }}
                  onMouseEnter={e => { e.target.style.transform = "scale(1.04)"; e.target.style.filter = "grayscale(0%)"; }}
                  onMouseLeave={e => { e.target.style.transform = "scale(1)"; e.target.style.filter = "grayscale(20%)"; }}
                  onError={e => { e.target.style.display = "none"; }}
                />
                <div style={{ position: "absolute", top: 16, left: 16 }}>
                  <span style={{ background: T.lime, color: T.charcoal, fontSize: "0.62rem", fontWeight: 800, padding: "4px 10px", letterSpacing: "0.1em", textTransform: "uppercase" }}>No. {String(i + 1).padStart(3, "0")}</span>
                </div>
              </div>
              <div style={{ padding: "28px 24px" }}>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 14 }}>
                  {p.tags.map(t => (
                    <span key={t} style={{ fontSize: "0.65rem", fontWeight: 700, color: T.lime, textTransform: "uppercase", letterSpacing: "0.1em", border: `1px solid ${T.charcoal3}`, padding: "3px 8px" }}>{t}</span>
                  ))}
                </div>
                <h3 className="proj-title" style={{ fontSize: "1.1rem", fontWeight: 800, color: T.white, marginBottom: 10, transition: "color 0.2s" }}>{p.title}</h3>
                <p style={{ fontSize: "0.83rem", color: T.muted, lineHeight: 1.7, marginBottom: 16 }}>{p.desc}</p>
                <div style={{ fontSize: "0.78rem", color: T.lime, fontWeight: 600, marginBottom: 20 }}>{p.impact}</div>
                <div style={{ display: "flex", gap: 10, borderTop: `1px solid ${T.charcoal3}`, paddingTop: 18 }}>
                  <button className="btn-lime" onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ background: T.lime, color: T.charcoal, border: "none", padding: "9px 20px", fontSize: "0.78rem", fontWeight: 800, cursor: "pointer", transition: "all 0.2s", borderRadius: 3 }}>Case Study</button>
                  <a href={p.demo} target="_blank" rel="noreferrer" className="btn-outline" style={{ background: "transparent", color: T.mutedLight, border: `1px solid ${T.charcoal3}`, padding: "8px 18px", fontSize: "0.78rem", fontWeight: 600, cursor: "pointer", transition: "all 0.2s", textDecoration: "none", borderRadius: 3, display: "inline-flex", alignItems: "center" }}>Live Demo ↗</a>
                </div>
              </div>
            </div>
          ))}
          {/* CTA Card */}
          <div style={{ background: T.lime, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "60px 32px", textAlign: "center", minHeight: 300, cursor: "pointer" }} onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}>
            <span style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.2em", color: T.charcoal, marginBottom: 20, display: "block" }}>Your project</span>
            <h3 style={{ fontSize: "2rem", fontWeight: 900, color: T.charcoal, lineHeight: 1.15, marginBottom: 24, letterSpacing: "-0.03em" }}>Ready to build something great?</h3>
            <span style={{ fontSize: "0.9rem", fontWeight: 800, color: T.charcoal }}>Start a conversation →</span>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── ABOUT / STUDIO ───────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ padding: "120px 40px", maxWidth: 1400, margin: "0 auto" }}>
      <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
        <div>
          <span className="section-eyebrow">Chapter 01</span>
          <h2 className="big-title">A studio that treats<br /><span className="accent">each line as craft.</span></h2>
          <div className="divider" />
          <p style={{ fontSize: "0.95rem", color: T.muted, lineHeight: 1.85, marginBottom: 20 }}>
            Founded in 2024, NEXABYTES is a technology-driven software company dedicated to building innovative digital solutions that empower businesses to grow, automate, and stay ahead in a rapidly evolving digital world.
          </p>
          <p style={{ fontSize: "0.95rem", color: T.muted, lineHeight: 1.85, marginBottom: 20 }}>
            We specialize in Artificial Intelligence, Machine Learning, Mobile App Development, Web Application Development, ASP.NET Enterprise Solutions, and Cloud-Integrated Backend Systems.
          </p>
          <blockquote style={{ borderLeft: `3px solid ${T.lime}`, paddingLeft: 24, margin: "32px 0", fontStyle: "italic", color: T.mutedLight, fontSize: "1rem", lineHeight: 1.7 }}>
            "We don't just build software   we create intelligent digital solutions that solve real business challenges and drive measurable results."
          </blockquote>
          <p style={{ fontSize: "0.88rem", color: T.muted }}>  Nexabytes, Founding Principle</p>
        </div>
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, border: `1px solid ${T.charcoal3}` }}>
            {[["30+","Projects Delivered"],["100%","Satisfaction Rate"],["<24h","Response Time"],["4+","Years Experience"]].map(([n, l]) => (
              <div key={l} style={{ padding: "40px 28px", borderBottom: `1px solid ${T.charcoal3}`, borderRight: `1px solid ${T.charcoal3}` }}>
                <span className="stat-num">{n}</span>
                <span className="stat-label">{l}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 40, padding: "32px", border: `1px solid ${T.charcoal3}`, background: T.charcoal2 }}>
            <span className="section-eyebrow" style={{ marginBottom: 20 }}>Our Commitment</span>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {[["✅","100% Client Retention   every client we take on, we keep."],["🔐","NDA Protected   full confidentiality on every engagement."],["🏆","On-Time Delivery   we scope honestly and ship on schedule."],["🤝","Long-Term Support   we stay on as your engineering partner."]].map(([icon, text]) => (
                <div key={text} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <span style={{ fontSize: "0.9rem", flexShrink: 0 }}>{icon}</span>
                  <span style={{ fontSize: "0.83rem", color: T.muted, lineHeight: 1.6 }}>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── PROCESS ──────────────────────────────────────────────────────────────────
function Process() {
  const steps = [
    ["Discovery","We dig deep into your goals, users, and constraints. A first call is always free   always with the person who will run your project."],
    ["Design","Wireframes and prototypes before a single line of code. We light the brief before we shoot it."],
    ["Build","Agile sprints with continuous delivery and feedback loops. Clean, reviewed, documented code."],
    ["Test","End-to-end QA, security review, and performance audit. We don't ship until it's right."],
    ["Launch","Deployment with CI/CD pipelines, monitoring, and a colour-managed handoff the day of delivery."],
    ["Scale","Ongoing support, analytics, iterative improvement. We stay on as your engineering partner."],
  ];
  return (
    <section id="process" style={{ padding: "120px 40px", background: T.charcoal2, borderTop: `1px solid ${T.charcoal3}`, borderBottom: `1px solid ${T.charcoal3}` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ marginBottom: 72 }}>
          <span className="section-eyebrow">How we work</span>
          <h2 className="big-title">From the first call<br /><span className="accent">to the last commit.</span></h2>
        </div>
        <div style={{ display: "grid", gap: 0 }}>
          {steps.map(([ title, desc], i) => (
            <div key={title} style={{ display: "grid", gridTemplateColumns: "60px 220px 1fr", gap: 40, alignItems: "start", padding: "32px 0", borderBottom: `1px solid ${T.charcoal3}` }}>
              <span className="num-label" style={{ marginBottom: 0, paddingTop: 4 }}>Step {String(i + 1).padStart(2, "0")}</span>
              <h3 style={{ fontSize: "1rem", fontWeight: 800, color: T.white }}>{title}</h3>
              <p style={{ fontSize: "0.85rem", color: T.muted, lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TECH STACK ───────────────────────────────────────────────────────────────
function TechStack() {
  const pills = ["⚛️ React","▲ Next.js","🟩 Node.js","☕ Spring Boot","🐍 Python","🤖 TensorFlow","🐳 Docker","☁️ AWS","🍃 MongoDB","🐬 MySQL","📱 Kotlin Compose","💙 Flutter","🔷 TypeScript","🌀 Vue.js","📨 Kafka","🔥 Firebase"];
  const doubled = [...pills, ...pills];
  return (
    <section style={{ padding: "80px 0", borderBottom: `1px solid ${T.charcoal3}` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 40px", marginBottom: 40, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16 }}>
        <span className="section-eyebrow" style={{ marginBottom: 0 }}>Technologies we excel in</span>
        <span style={{ fontSize: "0.78rem", color: T.muted }}>Modern stacks only   never outdated tools</span>
      </div>
      <div className="tech-wrapper">
        <div className="tech-track">
          {doubled.map((p, i) => (
            <div key={i} style={{ background: T.charcoal2, border: `1px solid ${T.charcoal3}`, padding: "12px 22px", fontSize: "0.85rem", fontWeight: 600, color: T.mutedLight, whiteSpace: "nowrap", flexShrink: 0 }}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── TESTIMONIALS ─────────────────────────────────────────────────────────────
function Testimonials() {
  const reviews = [
    { name: "Daniyal Khan", role: "Founder, EduTech Startup", avatar: "A", quote: "Nexabytes took our rough idea and turned it into a fully working product in record time. The code quality was impressive and they communicated clearly throughout.", result: "Launched 3 weeks ahead of schedule" },
    { name: "Ahsan", role: "Head of HR, Recruitment Platform", avatar: "S", quote: "The AI matching engine they built reduced our shortlisting time by almost half. The team really understood our HR workflows and built something we actually use every day.", result: "40% reduction in shortlisting time" },
    { name: "Muhammad Uzair", role: "CTO, Smart City Solutions", avatar: "M", quote: "Professional, reliable, and genuinely invested in the outcome. They built our parking system from scratch   real-time, containerised, and scalable. Outstanding engineering.", result: "Full production deployment, zero downtime" },
  ];
  return (
    <section id="testimonials" style={{ padding: "120px 40px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ marginBottom: 72 }}>
        <span className="section-eyebrow">Client reviews</span>
        <h2 className="big-title">Words from people<br /><span className="accent">we've helped.</span></h2>
      </div>
      <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
        {reviews.map((r, i) => (
          <div key={r.name} style={{ background: T.charcoal2, border: `1px solid ${T.charcoal3}`, padding: "40px 32px" }}>
            <div style={{ color: T.lime, fontSize: "1rem", marginBottom: 24, letterSpacing: 2 }}>★★★★★</div>
            <blockquote style={{ fontSize: "0.92rem", color: T.mutedLight, lineHeight: 1.8, marginBottom: 32, fontStyle: "italic" }}>"{r.quote}"</blockquote>
            <div style={{ borderTop: `1px solid ${T.charcoal3}`, paddingTop: 24, display: "flex", gap: 14, alignItems: "center" }}>
              <div style={{ width: 44, height: 44, background: T.lime, color: T.charcoal, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 900, fontSize: "1rem", flexShrink: 0 }}>{r.avatar}</div>
              <div>
                <div style={{ fontWeight: 800, color: T.white, fontSize: "0.9rem" }}>{r.name}</div>
                <div style={{ fontSize: "0.75rem", color: T.muted, marginTop: 2 }}>{r.role}</div>
                <div style={{ fontSize: "0.72rem", color: T.lime, fontWeight: 700, marginTop: 4 }}>✓ {r.result}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// ─── PRICING ──────────────────────────────────────────────────────────────────
function Pricing({ plans }) {
  return (
    <section id="pricing" style={{ padding: "120px 40px", background: T.charcoal2, borderTop: `1px solid ${T.charcoal3}`, borderBottom: `1px solid ${T.charcoal3}` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72, flexWrap: "wrap", gap: 24 }}>
          <div>
            <span className="section-eyebrow">Investment</span>
            <h2 className="big-title">Simple, transparent<br /><span className="accent">pricing.</span></h2>
          </div>
          <p className="section-sub" style={{ marginTop: 0, maxWidth: 340 }}>No surprises. Pick a starting point and we'll scope it precisely for your project.</p>
        </div>
        <div className="three-col" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 2 }}>
          {plans.map(p => (
            <div key={p.id} style={{ background: p.featured ? T.lime : T.charcoal, border: `1px solid ${p.featured ? T.lime : T.charcoal3}`, padding: "48px 36px", position: "relative", transition: "all 0.2s" }}>
              {p.featured && <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 3, background: T.charcoal }} />}
              <div style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: p.featured ? T.charcoal : T.lime, marginBottom: 12 }}>{p.name}</div>
              <div style={{ fontSize: "clamp(2rem,4vw,3rem)", fontWeight: 900, color: p.featured ? T.charcoal : T.white, lineHeight: 1, marginBottom: 8, letterSpacing: "-0.03em" }}>{p.price}</div>
              <div style={{ fontSize: "0.82rem", color: p.featured ? "rgba(26,26,26,0.65)" : T.muted, marginBottom: 36 }}>{p.sub}</div>
              <div style={{ borderTop: `1px solid ${p.featured ? "rgba(26,26,26,0.15)" : T.charcoal3}`, paddingTop: 28, marginBottom: 36 }}>
                {p.features.map(f => (
                  <div key={f} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ color: p.featured ? T.charcoal : T.lime, fontWeight: 800, fontSize: "0.8rem", flexShrink: 0, marginTop: 2 }}>✓</span>
                    <span style={{ fontSize: "0.84rem", color: p.featured ? T.charcoal : T.muted, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })} style={{ width: "100%", padding: "14px", background: p.featured ? T.charcoal : T.lime, color: p.featured ? T.lime : T.charcoal, border: "none", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", letterSpacing: "0.04em", transition: "all 0.2s" }}>
                Get Started →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
function FAQ() {
  const [open, setOpen] = useState(null);
  const faqs = [
    ["How long does a typical project take?","A simple landing page takes 1–2 weeks. Complex web apps or AI systems typically take 4–12 weeks depending on scope. We scope precisely before we commit."],
    ["Do you sign NDAs?","Absolutely. We sign NDAs before any sensitive information is shared, for every engagement regardless of size."],
    ["Can I see the code and own it at the end?","Yes   you own 100% of the IP and source code upon final payment. We hand over full repositories."],
    ["What technologies do you specialise in?","React, Next.js, Node.js, Java Spring Boot, Python, Flutter, React Native, TensorFlow, PostgreSQL, MongoDB, Docker, and AWS, among others."],
    ["Do you offer ongoing support after launch?","Yes. We offer monthly retainers for support, monitoring, and iterative feature development after every project launch."],
    ["How do we start?","Fill in the contact form below   we'll schedule a free 20-minute discovery call within 24 hours."],
  ];
  return (
    <section id="faq" style={{ padding: "120px 40px", maxWidth: 1400, margin: "0 auto" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }} className="two-col">
        <div>
          <span className="section-eyebrow">FAQs</span>
          <h2 className="big-title">Common<br /><span className="accent">questions.</span></h2>
          <div className="divider" />
          <p style={{ fontSize: "0.9rem", color: T.muted, lineHeight: 1.8 }}>Can't find your answer? Send us a note   we reply within 24 hours.</p>
        </div>
        <div>
          {faqs.map(([q, a], i) => (
            <div key={i} style={{ borderBottom: `1px solid ${T.charcoal3}` }}>
              <button className="faq-btn" onClick={() => setOpen(open === i ? null : i)} style={{ width: "100%", textAlign: "left", background: "none", border: "none", padding: "24px 0", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 700, fontSize: "0.92rem", color: open === i ? T.lime : T.white, transition: "color 0.2s", gap: 16 }}>
                <span>{q}</span>
                <span style={{ color: T.lime, fontSize: "1.2rem", flexShrink: 0, transform: open === i ? "rotate(45deg)" : "none", transition: "transform 0.2s" }}>+</span>
              </button>
              {open === i && <p style={{ padding: "0 0 24px", fontSize: "0.86rem", color: T.muted, lineHeight: 1.8 }}>{a}</p>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── CONTACT ──────────────────────────────────────────────────────────────────
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", service: "", budget: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
  }, []);

  const handle = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  const submit = async e => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message || !form.budget) { alert("Please fill in all required fields, including your budget."); return; }

    if (EMAILJS_CONFIG.publicKey === "YOUR_PUBLIC_KEY" || EMAILJS_CONFIG.serviceId === "YOUR_SERVICE_ID" || EMAILJS_CONFIG.templateId === "YOUR_TEMPLATE_ID") {
      alert("Please add your EmailJS Public Key, Service ID, and Template ID in the contact form config before sending mail.");
      return;
    }

    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_CONFIG.serviceId,
        EMAILJS_CONFIG.templateId,
        {
          from_name: form.name,
          from_email: form.email,
          service: form.service || "General Inquiry",
          project_type: form.service || "General Inquiry",
          budget: form.budget,
          total_budget: form.budget,
          message: form.message,
        },
        {
          publicKey: EMAILJS_CONFIG.publicKey,
        }
      );
      setSent(true);
      setForm({ name: "", email: "", service: "", budget: "", message: "" });
    } catch (error) {
      console.error("EmailJS error:", error);
      alert("Failed to send message. Please try again or email us directly.");
    } finally {
      setSending(false);
    }
  };
  const inputStyle = { width: "100%", background: T.charcoal, border: `1px solid ${T.charcoal3}`, color: T.white, padding: "14px 16px", fontSize: "0.88rem", outline: "none", fontFamily: "inherit", marginBottom: 14, transition: "border-color 0.2s" };
  return (
    <section id="contact" style={{ padding: "120px 40px", background: T.charcoal2, borderTop: `1px solid ${T.charcoal3}` }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="two-col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div>
            <span className="section-eyebrow">Booking · 2025</span>
            <h2 className="big-title">Have a project that<br />deserves the<br /><span className="accent">right team?</span></h2>
            <div className="divider" />
            <p style={{ fontSize: "0.92rem", color: T.muted, lineHeight: 1.85, marginBottom: 48 }}>
              We take on projects year-round. If you have a brief, the right time to send a first note is now. We'll schedule a free discovery call within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {[
                ["📧", "Email", "nexabyte.byt@gmail.com"],
                ["📞", "Phone", "+92 311 0158663"],
                ["📍", "Location", "Islamabad, Pakistan   Remote Worldwide"],
                ["⏱️", "Response", "Within 24 hours, guaranteed"]
              ].map(([icon, label, val]) => (
                <div key={label} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, background: T.charcoal, border: `1px solid ${T.charcoal3}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: "0.68rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.12em", color: T.lime, marginBottom: 4 }}>{label}</div>
                    <div style={{ fontSize: "0.85rem", color: T.muted }}>{val}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            {sent ? (
              <div style={{ padding: "80px 0", textAlign: "center" }}>
                <div style={{ fontSize: "3rem", marginBottom: 20 }}>✓</div>
                <h3 style={{ fontSize: "1.8rem", fontWeight: 900, color: T.lime, marginBottom: 12 }}>Message sent.</h3>
                <p style={{ color: T.muted }}>We'll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={submit}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0 14px" }}>
                  <div>
                    <label style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted, display: "block", marginBottom: 8 }}>Full Name *</label>
                    <input name="name" value={form.name} onChange={handle} style={inputStyle} placeholder="Your name" onFocus={e => e.target.style.borderColor = T.lime} onBlur={e => e.target.style.borderColor = T.charcoal3} />
                  </div>
                  <div>
                    <label style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted, display: "block", marginBottom: 8 }}>Email *</label>
                    <input name="email" type="email" value={form.email} onChange={handle} style={inputStyle} placeholder="your@email.com" onFocus={e => e.target.style.borderColor = T.lime} onBlur={e => e.target.style.borderColor = T.charcoal3} />
                  </div>
                </div>
                <label style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted, display: "block", marginBottom: 8 }}>Project Type</label>
                <select name="service" value={form.service} onChange={handle} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  <option value="">Select a service…</option>
                  {["Custom Software","Web Application","Mobile App","AI / ML","API & Backend","Enterprise Solution","Other"].map(o => <option key={o}>{o}</option>)}
                </select>
                <label style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted, display: "block", marginBottom: 8 }}>Budget *</label>
                <select name="budget" value={form.budget} onChange={handle} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  <option value="">Select budget range…</option>
                  {["Under $1k","$1k - $3k","$3k - $5k","$5k - $10k","$10k - $20k","$20k+"].map(o => <option key={o}>{o}</option>)}
                </select>
                <label style={{ fontSize: "0.65rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.muted, display: "block", marginBottom: 8 }}>Project Description *</label>
                <textarea name="message" value={form.message} onChange={handle} style={{ ...inputStyle, minHeight: 140, resize: "vertical" }} placeholder="Tell us about your project, goals, and timeline…" onFocus={e => e.target.style.borderColor = T.lime} onBlur={e => e.target.style.borderColor = T.charcoal3} />
                <button type="submit" className="btn-lime" disabled={sending} style={{ width: "100%", padding: "16px", background: sending ? T.limeDark : T.lime, color: T.charcoal, border: "none", fontWeight: 800, fontSize: "0.9rem", cursor: sending ? "wait" : "pointer", letterSpacing: "0.04em", transition: "all 0.2s", marginTop: 4, opacity: sending ? 0.8 : 1 }}>
                  {sending ? "Sending..." : "Send Message   Let's Build →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── FOOTER ───────────────────────────────────────────────────────────────────
function Footer() {
  const go = id => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  return (
    <footer style={{ background: T.charcoal, borderTop: `1px solid ${T.charcoal3}`, padding: "72px 40px 36px" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        <div className="four-col" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 48, marginBottom: 60 }}>
          <div>
            <div style={{ fontSize: "1.4rem", fontWeight: 900, color: T.white, marginBottom: 16, letterSpacing: "-0.04em" }}>Nexa<span style={{ color: T.lime }}>bytes</span></div>
            <p style={{ fontSize: "0.82rem", color: T.muted, lineHeight: 1.8, maxWidth: 260, marginBottom: 24 }}>A premium software development agency building next-generation digital products between Islamabad and the world.</p>
            <div style={{ display: "flex", gap: 10 }}>
              {[["🐙","https://github.com"],["💼","https://linkedin.com"],["📧","mailto:nexabyte.byt@gmail.com"]].map(([icon, href]) => (
                <a key={href} href={href} target="_blank" rel="noreferrer" className="social-btn" style={{ width: 36, height: 36, border: `1px solid ${T.charcoal3}`, display: "flex", alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: "0.9rem", transition: "all 0.2s" }}>{icon}</a>
              ))}
            </div>
          </div>
          {[
            ["Services",["Custom Software","Web Apps","Mobile Apps","AI & ML","Cloud & APIs","Support"], []],
            ["Company",["services","portfolio","about","pricing","contact"],["Services","Work","Studio","Pricing","Contact"]],
            ["Contact",["nexabyte.byt@gmail.com","Islamabad, Pakistan","Remote Worldwide","Mon–Sat 9AM–6PM PKT"], []],
          ].map(([heading, items, labels]) => (
            <div key={heading}>
              <h4 style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.18em", color: T.lime, marginBottom: 20 }}>{heading}</h4>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 12 }}>
                {items.map((item, i) => (
                  <li key={item}>
                    {labels.length > 0
                      ? <span className="footer-link" onClick={() => go(item)} style={{ color: T.muted, fontSize: "0.82rem", cursor: "pointer", transition: "color 0.2s" }}>{labels[i]}</span>
                      : <span style={{ color: T.muted, fontSize: "0.82rem" }}>{item}</span>
                    }
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div style={{ borderTop: `1px solid ${T.charcoal3}`, paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ fontSize: "0.75rem", color: T.muted }}>© 2026 Nexabytes. All rights reserved.</span>
          <span style={{ fontSize: "0.75rem", color: T.muted }}>Built with precision for ambitious businesses.</span>
        </div>
      </div>
    </footer>
  );
}

// ─── ADMIN PANEL ──────────────────────────────────────────────────────────────
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD;

const INITIAL_PROJECTS = [
  { id: 1, title: "Chicken House", tags: ["React 19", "TypeScript", "Tailwind", "Vite"], desc: "Digital food ordering platform with live order tracking, modern UI, and fast frontend performance.", impact: "⚡ Realtime orders, delivery tracking, smooth mobile-first ordering", img: "https://images.pexels.com/photos/19252769/pexels-photo-19252769.jpeg", demo: "https://chicken-house-rust.vercel.app/" },
  { id: 2, title: "AI Recruitment Engine", tags: ["Python", "TensorFlow", "React", "Node.js"], desc: "Intelligent matching engine that analyses CVs and ranks candidates against job requirements in real time.", impact: "✅ 40% reduction in shortlisting time for enterprise HR teams", img: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg", demo: "#contact" },
  { id: 3, title: "Smart Parking System", tags: ["Java Spring Boot", "Docker", "React", "IoT"], desc: "Real-time containerized smart parking management system with sensor integration and live dashboard.", impact: "✅ Full production deployment, zero downtime", img: "https://images.pexels.com/photos/1004409/pexels-photo-1004409.jpeg", demo: "#contact" },
];

const INITIAL_SERVICES = [
  { id: 1, icon: "⚙️", title: "Custom Business Software & Automation", desc: "Tailor-made solutions built around your exact workflow. Scalable architecture that grows with your business." },
  { id: 2, icon: "🌐", title: "Modern Websites & Web Applications", desc: "High-performance web apps with React, Next.js and Vue   beautiful, fast, and SEO-ready." },
  { id: 3, icon: "📱", title: "Flutter & React Native Mobile Apps", desc: "Native and cross-platform iOS & Android apps with Kotlin Compose, React Native, and Flutter." },
  { id: 4, icon: "🤖", title: "AI & Machine Learning", desc: "Predictive models, NLP systems, and intelligent automation that give your business a data-driven edge." },
  { id: 5, icon: "🏢", title: "ASP.NET Enterprise Solutions", desc: "Robust enterprise-grade solutions built on Microsoft's ecosystem for large organisations." },
  { id: 6, icon: "🔌", title: "Secure APIs, Cloud & Database Systems", desc: "RESTful and GraphQL APIs with Spring Boot and Node.js   secure, documented, and integration-ready." },
  { id: 7, icon: "🛡️", title: "Continuous Support & Product Scaling", desc: "Long-term partnership: bug fixes, updates, security patches, and feature expansions." },
];

const INITIAL_PRICING = [
  { id: 1, name: "Starter", price: "From $499", sub: "Perfect for MVPs and landing pages", features: ["Single-page or simple web app","Responsive design","Basic backend or API","2 weeks delivery","30-day support"], featured: false },
  { id: 2, name: "Growth", price: "From $1,499", sub: "Full product for growing businesses", features: ["Multi-page web application","Custom backend & database","3rd-party integrations","4–6 weeks delivery","3 months support","CI/CD deployment"], featured: true },
  { id: 3, name: "Enterprise", price: "Custom", sub: "Large-scale systems and platforms", features: ["Full system architecture","AI/ML integration available","Cloud deployment (AWS/GCP)","Dedicated team","12 months SLA support","Ongoing product scaling"], featured: false },
];

const STORAGE_KEYS = {
  projects: "nexabytes-projects",
  services: "nexabytes-services",
  plans: "nexabytes-plans",
};

const readStoredData = (key, fallback) => {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    return fallback;
  }
};

function AdminPanel({ projects, setProjects, services, setServices, plans, setPlans, onClose }) {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [pwErr, setPwErr] = useState(false);
  const [tab, setTab] = useState("projects");
  const [newProj, setNewProj] = useState({ title: "", tags: "", desc: "", impact: "", img: "", demo: "" });
  const [newSvc, setNewSvc] = useState({ icon: "", title: "", desc: "" });
  const [editSvc, setEditSvc] = useState(null);
  const [editPlan, setEditPlan] = useState(null);
  const [editPlanFeatures, setEditPlanFeatures] = useState("");

  const login = () => { if (pw === ADMIN_PASSWORD) { setAuthed(true); setPwErr(false); } else setPwErr(true); };
  const addProject = () => {
    if (!newProj.title || !newProj.desc) { alert("Title and description required."); return; }
    setProjects(ps => [...ps, { ...newProj, id: Date.now(), tags: newProj.tags.split(",").map(t => t.trim()).filter(Boolean) }]);
    setNewProj({ title: "", tags: "", desc: "", impact: "", img: "", demo: "" });
  };
  const deleteProject = id => { if (window.confirm("Delete this project?")) setProjects(ps => ps.filter(p => p.id !== id)); };
  const addService = () => {
    if (!newSvc.title) { alert("Title required."); return; }
    setServices(ss => [...ss, { ...newSvc, id: Date.now() }]);
    setNewSvc({ icon: "", title: "", desc: "" });
  };
  const deleteService = id => { if (window.confirm("Delete this service?")) setServices(ss => ss.filter(s => s.id !== id)); };
  const saveService = () => { setServices(ss => ss.map(s => s.id === editSvc.id ? editSvc : s)); setEditSvc(null); };
  const startEditPlan = plan => { setEditPlan({ ...plan }); setEditPlanFeatures(plan.features.join("\n")); };
  const savePlan = () => {
    setPlans(ps => ps.map(p => p.id === editPlan.id ? { ...editPlan, features: editPlanFeatures.split("\n").map(f => f.trim()).filter(Boolean) } : p));
    setEditPlan(null); setEditPlanFeatures("");
  };

  const panelBg = { background: "#111", height: "100vh", overflowY: "auto", padding: 28, width: "min(500px,100vw)" };
  const inp = { width: "100%", background: "#1a1a1a", border: `1px solid ${T.charcoal3}`, color: T.white, padding: "10px 14px", fontSize: "0.85rem", outline: "none", fontFamily: "inherit", marginBottom: 10 };
  const saveBtn = { background: T.lime, color: T.charcoal, border: "none", padding: "9px 20px", fontWeight: 800, cursor: "pointer", fontSize: "0.82rem" };
  const delBtn = { background: T.danger, color: "#fff", border: "none", padding: "6px 14px", fontWeight: 700, cursor: "pointer", fontSize: "0.75rem" };
  const tabBtn = (id, label) => <button onClick={() => setTab(id)} style={{ padding: "8px 16px", border: "none", background: tab === id ? T.lime : T.charcoal3, color: tab === id ? T.charcoal : T.muted, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>{label}</button>;

  if (!authed) return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.8)", zIndex: 300, display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={panelBg}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 40 }}>
          <span style={{ fontWeight: 900, fontSize: "1.1rem", color: T.white }}>⚙️ Admin Login</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.muted, fontSize: "1.5rem", cursor: "pointer" }}>×</button>
        </div>
        <div style={{ border: `1px solid ${T.charcoal3}`, padding: 32, textAlign: "center" }}>
          <div style={{ fontSize: "2.5rem", marginBottom: 16 }}>🔐</div>
          <h3 style={{ color: T.white, marginBottom: 8, fontWeight: 800 }}>Company Access Only</h3>
          <p style={{ color: T.muted, fontSize: "0.8rem", marginBottom: 24 }}>Enter your admin password to continue</p>
          <input type="password" placeholder="Admin password" value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && login()} style={{ ...inp, marginBottom: 8, textAlign: "center" }} />
          {pwErr && <p style={{ color: T.danger, fontSize: "0.78rem", marginBottom: 10 }}>Incorrect password.</p>}
          <button style={{ ...saveBtn, width: "100%", padding: 14 }} onClick={login}>Login →</button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 300, display: "flex", alignItems: "flex-start", justifyContent: "flex-end" }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={panelBg}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
          <div>
            <div style={{ fontWeight: 900, fontSize: "1.1rem", color: T.white }}>⚙️ Admin Panel</div>
            <div style={{ fontSize: "0.72rem", color: T.muted, marginTop: 2 }}>Company access only</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: T.muted, fontSize: "1.5rem", cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "flex", gap: 2, marginBottom: 28 }}>
          {tabBtn("projects","📁 Projects")}
          {tabBtn("services","⚙️ Services")}
          {tabBtn("pricing","💰 Pricing")}
        </div>

        {/* PROJECTS */}
        {tab === "projects" && <>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.lime, marginBottom: 14 }}>Current Projects ({projects.length})</div>
            {projects.map(p => (
              <div key={p.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: T.charcoal2, border: `1px solid ${T.charcoal3}`, padding: "12px 14px", marginBottom: 8 }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.88rem", color: T.white }}>{p.title}</div>
                  <div style={{ fontSize: "0.72rem", color: T.muted }}>{p.tags?.join(", ")}</div>
                </div>
                <button style={delBtn} onClick={() => deleteProject(p.id)}>🗑 Delete</button>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.lime, marginBottom: 14 }}>Add New Project</div>
            {[["title","Project Title *"],["tags","Tech Tags (comma-separated)"],["img","Image URL"],["demo","Demo URL"]].map(([key, label]) => (
              <div key={key}><label style={{ fontSize: "0.7rem", color: T.muted, display: "block", marginBottom: 4 }}>{label}</label><input value={newProj[key]} onChange={e => setNewProj(f => ({ ...f, [key]: e.target.value }))} style={inp} /></div>
            ))}
            {[["desc","Description *"],["impact","Impact / Result"]].map(([key, label]) => (
              <div key={key}><label style={{ fontSize: "0.7rem", color: T.muted, display: "block", marginBottom: 4 }}>{label}</label><textarea value={newProj[key]} onChange={e => setNewProj(f => ({ ...f, [key]: e.target.value }))} style={{ ...inp, minHeight: 70, resize: "vertical" }} /></div>
            ))}
            <button style={{ ...saveBtn, width: "100%", padding: 12 }} onClick={addProject}>+ Add Project</button>
          </div>
        </>}

        {/* SERVICES */}
        {tab === "services" && <>
          <div style={{ marginBottom: 24 }}>
            <div style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.lime, marginBottom: 14 }}>Current Services ({services.length})</div>
            {services.map(s => (
              <div key={s.id}>
                {editSvc?.id === s.id ? (
                  <div style={{ background: T.charcoal2, border: `1px solid ${T.lime}`, padding: 14, marginBottom: 8 }}>
                    <input value={editSvc.icon} onChange={e => setEditSvc(f => ({ ...f, icon: e.target.value }))} style={inp} placeholder="Icon emoji" />
                    <input value={editSvc.title} onChange={e => setEditSvc(f => ({ ...f, title: e.target.value }))} style={inp} placeholder="Title" />
                    <textarea value={editSvc.desc} onChange={e => setEditSvc(f => ({ ...f, desc: e.target.value }))} style={{ ...inp, minHeight: 70, resize: "vertical" }} placeholder="Description" />
                    <div style={{ display: "flex", gap: 8 }}><button style={saveBtn} onClick={saveService}>Save</button><button style={{ ...delBtn, background: T.muted }} onClick={() => setEditSvc(null)}>Cancel</button></div>
                  </div>
                ) : (
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: T.charcoal2, border: `1px solid ${T.charcoal3}`, padding: "12px 14px", marginBottom: 8 }}>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", color: T.white }}>{s.icon} {s.title}</div>
                      <div style={{ fontSize: "0.7rem", color: T.muted }}>{s.desc.slice(0, 55)}…</div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => setEditSvc(s)} style={{ ...saveBtn, padding: "6px 12px", fontSize: "0.72rem" }}>Edit</button>
                      <button style={delBtn} onClick={() => deleteService(s.id)}>🗑</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.lime, marginBottom: 14 }}>Add New Service</div>
            <input value={newSvc.icon} onChange={e => setNewSvc(f => ({ ...f, icon: e.target.value }))} style={inp} placeholder="Icon emoji e.g. 🔧" />
            <input value={newSvc.title} onChange={e => setNewSvc(f => ({ ...f, title: e.target.value }))} style={inp} placeholder="Service Title *" />
            <textarea value={newSvc.desc} onChange={e => setNewSvc(f => ({ ...f, desc: e.target.value }))} style={{ ...inp, minHeight: 70, resize: "vertical" }} placeholder="Description" />
            <button style={{ ...saveBtn, width: "100%", padding: 12 }} onClick={addService}>+ Add Service</button>
          </div>
        </>}

        {/* PRICING */}
        {tab === "pricing" && <>
          <div style={{ fontSize: "0.62rem", fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.15em", color: T.lime, marginBottom: 14 }}>Pricing Plans</div>
          <p style={{ fontSize: "0.78rem", color: T.muted, marginBottom: 20 }}>Edit any plan   changes reflect instantly on the website.</p>
          {plans.map(plan => (
            <div key={plan.id}>
              {editPlan?.id === plan.id ? (
                <div style={{ background: T.charcoal2, border: `1px solid ${T.lime}`, padding: 16, marginBottom: 12 }}>
                  <div style={{ fontSize: "0.65rem", fontWeight: 800, color: T.lime, marginBottom: 12 }}>Editing: {plan.name}</div>
                  {[["name","Plan Name"],["price","Price"],["sub","Subtitle"]].map(([key, label]) => (
                    <div key={key}><label style={{ fontSize: "0.7rem", color: T.muted, display: "block", marginBottom: 4 }}>{label}</label><input value={editPlan[key]} onChange={e => setEditPlan(p => ({ ...p, [key]: e.target.value }))} style={inp} /></div>
                  ))}
                  <label style={{ fontSize: "0.7rem", color: T.muted, display: "block", marginBottom: 4 }}>Features (one per line)</label>
                  <textarea value={editPlanFeatures} onChange={e => setEditPlanFeatures(e.target.value)} style={{ ...inp, minHeight: 120, resize: "vertical" }} />
                  <label style={{ fontSize: "0.7rem", color: T.muted, display: "block", marginBottom: 8 }}>Featured / Highlighted?</label>
                  <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                    {[true, false].map(v => (
                      <button key={String(v)} onClick={() => setEditPlan(p => ({ ...p, featured: v }))} style={{ padding: "7px 16px", border: `1px solid ${editPlan.featured === v ? T.lime : T.charcoal3}`, background: editPlan.featured === v ? T.lime : "transparent", color: editPlan.featured === v ? T.charcoal : T.muted, fontWeight: 700, fontSize: "0.78rem", cursor: "pointer" }}>
                        {v ? "⭐ Yes" : "No"}
                      </button>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 8 }}>
                    <button style={saveBtn} onClick={savePlan}>✓ Save Plan</button>
                    <button style={{ ...delBtn, background: T.muted }} onClick={() => { setEditPlan(null); setEditPlanFeatures(""); }}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", background: T.charcoal2, border: `1px solid ${plan.featured ? T.lime : T.charcoal3}`, padding: "14px 16px", marginBottom: 10 }}>
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 4 }}>
                      <span style={{ fontWeight: 800, fontSize: "0.9rem", color: T.white }}>{plan.name}</span>
                      {plan.featured && <span style={{ background: T.lime, color: T.charcoal, fontSize: "0.55rem", fontWeight: 800, padding: "2px 8px" }}>FEATURED</span>}
                    </div>
                    <div style={{ fontSize: "1.1rem", fontWeight: 900, color: T.lime }}>{plan.price}</div>
                    <div style={{ fontSize: "0.72rem", color: T.muted, marginTop: 2 }}>{plan.features.length} features</div>
                  </div>
                  <button onClick={() => startEditPlan(plan)} style={{ ...saveBtn, padding: "7px 14px", fontSize: "0.75rem" }}>✏️ Edit</button>
                </div>
              )}
            </div>
          ))}
        </>}
      </div>
    </div>
  );
}

// ─── WHATSAPP FLOATING BUTTON ─────────────────────────────────────────────────
function WhatsAppButton() {
  const number = "923110158663";
  const url = `https://wa.me/${number}?text=${encodeURIComponent("Hello Nexabytes, I want to discuss my project.")}`;

  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
      style={{
        position: "fixed",
        left: 24,
        bottom: 28,
        width: 54,
        height: 54,
        borderRadius: "50%",
        background: "#25D366",
        color: "#fff",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "1.6rem",
        textDecoration: "none",
        boxShadow: "0 12px 28px rgba(37, 211, 102, 0.35)",
        zIndex: 60,
      }}
    >
      💬
    </a>
  );
}

// ─── BACK TO TOP ──────────────────────────────────────────────────────────────
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const fn = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  if (!show) return null;
  return (
    <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn-lime" style={{ position: "fixed", bottom: 32, right: 32, width: 48, height: 48, background: T.lime, border: "none", color: T.charcoal, fontSize: "1.1rem", cursor: "pointer", fontWeight: 900, zIndex: 50, transition: "all 0.2s" }}>↑</button>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [projects, setProjects] = useState(() => readStoredData(STORAGE_KEYS.projects, INITIAL_PROJECTS));
  const [services, setServices] = useState(() => readStoredData(STORAGE_KEYS.services, INITIAL_SERVICES));
  const [plans, setPlans] = useState(() => readStoredData(STORAGE_KEYS.plans, INITIAL_PRICING));
  const [adminOpen, setAdminOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.projects, JSON.stringify(projects));
  }, [projects]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.services, JSON.stringify(services));
  }, [services]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.plans, JSON.stringify(plans));
  }, [plans]);

  return (
    <div style={{ background: T.charcoal, color: T.white, minHeight: "100vh" }}>
      <GlobalCSS />
      <Navbar onAdmin={() => setAdminOpen(true)} />
      <main>
        <Hero />
        <Services services={services} />
        <Portfolio projects={projects} />
        <About />
        <Process />
        <TechStack />
        <Testimonials />
        <Pricing plans={plans} />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <WhatsAppButton />
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