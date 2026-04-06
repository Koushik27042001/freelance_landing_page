import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, AnimatePresence, useInView } from "framer-motion";

const COLORS = {
  accent: "#00f5c4",
  accent2: "#7c6bff",
  danger: "#ff4d6d",
};

const NAV_LINKS = ["Services", "Stack", "Projects", "Contact"];

const SERVICES = [
  {
    icon: "◈",
    title: "Frontend Development",
    desc: "Pixel-perfect interfaces with React, Angular & modern CSS. Blazing fast, responsive, and accessible.",
    color: "#00f5c4",
  },
  {
    icon: "⬡",
    title: "Backend & API Development",
    desc: "Robust Node.js servers, RESTful APIs, real-time WebSockets, authentication & secure data pipelines.",
    color: "#7c6bff",
  },
  {
    icon: "⬢",
    title: "Cloud & DevOps",
    desc: "Deployment on Vercel, Render & Firebase. CI/CD workflows, scalable architecture, zero downtime.",
    color: "#ff4d6d",
  },
];

const TECHS = [
  { name: "React", cat: "frontend" },
  { name: "Angular", cat: "frontend" },
  { name: "JavaScript", cat: "frontend" },
  { name: "HTML", cat: "frontend" },
  { name: "CSS", cat: "frontend" },
  { name: "Node.js", cat: "backend" },
  { name: "MongoDB", cat: "backend" },
  { name: "PostgreSQL", cat: "backend" },
  { name: "Firebase Auth", cat: "backend" },
  { name: "GitHub", cat: "devops" },
  { name: "Vercel", cat: "devops" },
  { name: "Render", cat: "devops" },
];

const PROJECTS = [
  {
    title: "Realtime Chat Application",
    desc: "Full-stack realtime chat app with modern UI and WebSocket communication.",
    repo: "https://github.com/Koushik27042001/chat-application-realtime",
    live: "https://chat-application-realtime-ruddy.vercel.app",
    tag: "Full-Stack",
    color: "#00f5c4",
    num: "01",
  },
  {
    title: "Movie Search App",
    desc: "Movie search app using OMDB/TMDB APIs with dynamic UI and smooth animations.",
    repo: "https://github.com/Koushik27042001/Movie-search-app",
    live: "https://movie-search-app-six-tan.vercel.app/",
    tag: "Frontend",
    color: "#7c6bff",
    num: "02",
  },
  {
    title: "Room Booking System",
    desc: "Booking platform with full UI + backend logic for managing rooms and reservations.",
    repo: "https://github.com/Koushik27042001/room-booking-system",
    live: "https://room-booking-system-amber-seven.vercel.app/",
    tag: "Full-Stack",
    color: "#ff4d6d",
    num: "03",
  },
  {
    title: "Portfolio Website",
    desc: "Personal portfolio showcasing skills, projects, and professional journey.",
    repo: "#",
    live: "https://steady-moxie-766c8e.netlify.app/",
    tag: "Frontend",
    color: "#00f5c4",
    num: "04",
  },
  {
    title: "E-Commerce Platform",
    desc: "Full-featured e-commerce website with product listings, cart, and checkout.",
    repo: "#",
    live: "https://dancing-basbousa-52ce64.netlify.app/",
    tag: "Full-Stack",
    color: "#7c6bff",
    num: "05",
  },
  {
    title: "Eurofin Infotech Project",
    desc: "Internship project with certification-based organization and real-world deliverables.",
    repo: "https://github.com/Koushik27042001/eurofin-infotech",
    live: null,
    tag: "Internship",
    color: "#ff4d6d",
    num: "06",
  },
];

const catColor = { frontend: "#00f5c4", backend: "#7c6bff", devops: "#ff4d6d" };

function ParticleCanvas() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext("2d");
    let W = (canvas.width = window.innerWidth);
    let H = (canvas.height = window.innerHeight);
    const pts = Array.from({ length: 80 }, () => ({
      x: Math.random() * W,
      y: Math.random() * H,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      r: Math.random() * 1.5 + 0.5,
    }));
    let raf;
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,245,196,0.45)";
        ctx.fill();
        for (let j = i + 1; j < pts.length; j++) {
          const q = pts[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(0,245,196,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return (
    <canvas
      ref={ref}
      style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }}
    />
  );
}

function GlitchText({ text }) {
  return (
    <span
      style={{ position: "relative", display: "inline-block" }}
      className="glitch-wrap"
    >
      {text}
      <style>{`
        .glitch-wrap::before,.glitch-wrap::after{content:attr(data-text);position:absolute;inset:0;pointer-events:none}
        .glitch-wrap::before{color:#7c6bff;animation:glitch1 3s infinite;clip-path:polygon(0 30%,100% 30%,100% 50%,0 50%)}
        .glitch-wrap::after{color:#ff4d6d;animation:glitch2 3s infinite;clip-path:polygon(0 60%,100% 60%,100% 80%,0 80%)}
        @keyframes glitch1{0%,90%,100%{transform:translate(0)}92%{transform:translate(-3px,1px)}94%{transform:translate(3px,-1px)}96%{transform:translate(-2px,2px)}}
        @keyframes glitch2{0%,88%,100%{transform:translate(0)}90%{transform:translate(3px,-1px)}92%{transform:translate(-3px,1px)}94%{transform:translate(2px,-2px)}}
      `}</style>
    </span>
  );
}

function AnimatedCounter({ to, label }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = Math.ceil(to / 50);
    const id = setInterval(() => {
      start += step;
      if (start >= to) { setCount(to); clearInterval(id); }
      else setCount(start);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return (
    <div ref={ref} style={{ textAlign: "center" }}>
      <div style={{ fontSize: "clamp(2.5rem,5vw,4rem)", fontWeight: 800, fontFamily: "'Orbitron',sans-serif", color: COLORS.accent, lineHeight: 1 }}>
        {count}+
      </div>
      <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.85rem", marginTop: "0.4rem", letterSpacing: "0.15em", textTransform: "uppercase" }}>
        {label}
      </div>
    </div>
  );
}

function SectionReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function MagneticCard({ children, color }) {
  const ref = useRef(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hover, setHover] = useState(false);
  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 18;
    setPos({ x, y });
  };
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setPos({ x: 0, y: 0 }); setHover(false); }}
      animate={{ rotateX: -pos.y * 0.6, rotateY: pos.x * 0.6, scale: hover ? 1.03 : 1 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      style={{
        background: "rgba(255,255,255,0.03)",
        border: `1px solid ${hover ? color : "rgba(255,255,255,0.08)"}`,
        borderRadius: "16px",
        padding: "2rem",
        position: "relative",
        overflow: "hidden",
        cursor: "default",
        transformStyle: "preserve-3d",
        transition: "border-color 0.3s",
        boxShadow: hover ? `0 0 40px ${color}22` : "none",
      }}
    >
      {hover && (
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: `radial-gradient(circle at ${50 + pos.x * 3}% ${50 + pos.y * 3}%, ${color}12, transparent 70%)`,
        }} />
      )}
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const [activeNav, setActiveNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const navBg = useTransform(scrollY, [0, 100], ["rgba(5,5,15,0)", "rgba(5,5,15,0.95)"]);

  useEffect(() => {
    const unsub = scrollY.onChange(v => setActiveNav(v > 50));
    return unsub;
  }, [scrollY]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  return (
    <div style={{ background: "#05050f", color: "#fff", fontFamily: "'Space Grotesk', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Orbitron:wght@700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-track{background:#05050f}
        ::-webkit-scrollbar-thumb{background:#00f5c4;border-radius:2px}
        html{scroll-behavior:smooth}
        a{text-decoration:none;color:inherit}
        .noise::after{content:'';position:fixed;inset:0;background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");pointer-events:none;z-index:9999;opacity:0.35}
        .tag{display:inline-flex;align-items:center;padding:3px 10px;border-radius:20px;font-size:0.72rem;font-weight:600;letter-spacing:0.1em;text-transform:uppercase}
        @keyframes spin-slow{to{transform:rotate(360deg)}}
        @keyframes pulse-ring{0%,100%{opacity:0.15;transform:scale(1)}50%{opacity:0.35;transform:scale(1.08)}}
        @keyframes scan{0%{top:-100%}100%{top:200%}}
        .scan-line{position:absolute;left:0;right:0;height:2px;background:linear-gradient(90deg,transparent,#00f5c4,transparent);animation:scan 3s linear infinite;pointer-events:none}
      `}</style>
      <div className="noise" />

      {/* NAV */}
      <motion.nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
          background: navBg,
          backdropFilter: activeNav ? "blur(20px)" : "none",
          borderBottom: activeNav ? "1px solid rgba(0,245,196,0.1)" : "none",
          padding: "1.2rem 5%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
        }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 800, fontSize: "1.1rem", letterSpacing: "0.05em", cursor: "pointer" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <span style={{ color: COLORS.accent }}>Code</span>Nova
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          style={{ display: "flex", gap: "2.5rem", alignItems: "center" }}
          className="desktop-nav"
        >
          {NAV_LINKS.map((l) => (
            <button key={l} onClick={() => scrollTo(l.toLowerCase())}
              style={{ background: "none", border: "none", color: "rgba(255,255,255,0.65)", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = COLORS.accent}
              onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.65)"}
            >
              {l}
            </button>
          ))}
          <button
            onClick={() => scrollTo("contact")}
            style={{ padding: "0.5rem 1.4rem", background: "transparent", border: `1px solid ${COLORS.accent}`, borderRadius: "6px", color: COLORS.accent, fontSize: "0.82rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", fontWeight: 700, transition: "all 0.25s" }}
            onMouseEnter={e => { e.target.style.background = COLORS.accent; e.target.style.color = "#05050f"; }}
            onMouseLeave={e => { e.target.style.background = "transparent"; e.target.style.color = COLORS.accent; }}
          >
            Hire Me
          </button>
        </motion.div>
      </motion.nav>

      {/* HERO */}
      <section style={{ position: "relative", minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "0 5%", overflow: "hidden" }}>
        <ParticleCanvas />

        {/* Rings */}
        {[1, 0.7, 0.45].map((op, i) => (
          <div key={i} style={{
            position: "absolute", border: `1px solid rgba(0,245,196,${op * 0.12})`,
            borderRadius: "50%", width: `${500 + i * 200}px`, height: `${500 + i * 200}px`,
            animation: `pulse-ring ${3 + i}s ease-in-out infinite`,
            animationDelay: `${i * 0.5}s`, pointerEvents: "none",
          }} />
        ))}

        <motion.div
          initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ position: "relative", zIndex: 1 }}
        >
          <div style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "6px 16px", border: "1px solid rgba(0,245,196,0.3)", borderRadius: "20px", marginBottom: "2rem", fontSize: "0.75rem", letterSpacing: "0.18em", color: COLORS.accent, textTransform: "uppercase", fontWeight: 600 }}>
            <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: COLORS.accent, animation: "pulse-ring 1.5s ease-in-out infinite", display: "inline-block" }} />
            Available for Freelance
          </div>

          <h1 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2.5rem,7vw,6rem)", fontWeight: 900, lineHeight: 1.05, marginBottom: "1.5rem" }}>
            <GlitchText text="Build Scalable" />
            <br />
            <span style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>
              Web Solutions
            </span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            style={{ fontSize: "clamp(1rem,1.8vw,1.2rem)", color: "rgba(255,255,255,0.55)", maxWidth: "560px", margin: "0 auto 3rem", lineHeight: 1.7 }}
          >
            From frontend to backend, APIs to cloud deployment — full-cycle web solutions built by Koushik Chakraborty.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
            style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}
          >
            <button
              onClick={() => scrollTo("projects")}
              style={{ padding: "0.9rem 2.5rem", background: COLORS.accent, border: "none", borderRadius: "8px", color: "#05050f", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", transition: "all 0.25s" }}
              onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 15px 40px ${COLORS.accent}40`; }}
              onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
            >
              View Projects →
            </button>
            <a
              href="https://steady-moxie-766c8e.netlify.app/"
              target="_blank"
              rel="noreferrer"
              style={{ padding: "0.9rem 2.5rem", background: "transparent", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "8px", color: "#fff", fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", cursor: "pointer", fontFamily: "'Space Grotesk',sans-serif", transition: "all 0.25s", display: "inline-block" }}
              onMouseEnter={e => { e.target.style.borderColor = "rgba(255,255,255,0.5)"; e.target.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.target.style.borderColor = "rgba(255,255,255,0.2)"; e.target.style.transform = ""; }}
            >
              Portfolio ↗
            </a>
          </motion.div>
        </motion.div>

        {/* scroll cue */}
        <motion.div
          animate={{ y: [0, 10, 0] }} transition={{ repeat: Infinity, duration: 2 }}
          style={{ position: "absolute", bottom: "2.5rem", left: "50%", transform: "translateX(-50%)", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px", opacity: 0.4 }}
        >
          <div style={{ width: "1px", height: "50px", background: `linear-gradient(to bottom, transparent, ${COLORS.accent})` }} />
          <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase" }}>Scroll</span>
        </motion.div>
      </section>

      {/* STATS */}
      <section style={{ padding: "5rem 5%", borderTop: "1px solid rgba(255,255,255,0.05)", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "3rem" }}>
          {[{ to: 6, label: "Projects Completed" }, { to: 12, label: "Technologies Mastered" }, { to: 3, label: "Live Deployments" }, { to: 2, label: "Years Experience" }].map((s, i) => (
            <SectionReveal key={i} delay={i * 0.1}>
              <AnimatedCounter {...s} />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" style={{ padding: "8rem 5%" }}>
        <SectionReveal>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{ color: COLORS.accent, fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>What I Do</p>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800 }}>Core Services</h2>
          </div>
        </SectionReveal>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: "1.5rem" }}>
          {SERVICES.map((s, i) => (
            <SectionReveal key={i} delay={i * 0.15}>
              <MagneticCard color={s.color}>
                <div style={{ fontSize: "2.5rem", marginBottom: "1.2rem", filter: `drop-shadow(0 0 12px ${s.color})` }}>{s.icon}</div>
                <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "0.8rem", color: s.color }}>{s.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.55)", lineHeight: 1.8, fontSize: "0.9rem" }}>{s.desc}</p>
              </MagneticCard>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* TECH STACK */}
      <section id="stack" style={{ padding: "8rem 5%", background: "rgba(255,255,255,0.015)" }}>
        <SectionReveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: COLORS.accent2, fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Arsenal</p>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800 }}>Tech Stack</h2>
          </div>
        </SectionReveal>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          {["frontend", "backend", "devops"].map((cat) => (
            <SectionReveal key={cat}>
              <div style={{ marginBottom: "2.5rem" }}>
                <p style={{ color: catColor[cat], fontSize: "0.72rem", letterSpacing: "0.2em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>{cat}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem" }}>
                  {TECHS.filter(t => t.cat === cat).map((t, i) => (
                    <motion.span
                      key={i}
                      whileHover={{ scale: 1.08, borderColor: catColor[cat] }}
                      style={{
                        padding: "0.5rem 1.2rem", borderRadius: "6px",
                        border: "1px solid rgba(255,255,255,0.12)",
                        fontSize: "0.85rem", fontWeight: 600, cursor: "default",
                        transition: "all 0.2s", color: "rgba(255,255,255,0.8)",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {t.name}
                    </motion.span>
                  ))}
                </div>
              </div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={{ padding: "8rem 5%" }}>
        <SectionReveal>
          <div style={{ textAlign: "center", marginBottom: "5rem" }}>
            <p style={{ color: COLORS.danger, fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Portfolio</p>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800 }}>Selected Projects</h2>
          </div>
        </SectionReveal>
        <div style={{ maxWidth: "1100px", margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(320px,1fr))", gap: "1.5rem" }}>
          {PROJECTS.map((p, i) => (
            <SectionReveal key={i} delay={(i % 3) * 0.1}>
              <motion.div
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: "16px", padding: "2rem", position: "relative", overflow: "hidden", height: "100%", display: "flex", flexDirection: "column", cursor: "default" }}
              >
                <div className="scan-line" style={{ opacity: 0 }} />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                  <span style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "2.5rem", fontWeight: 900, color: `${p.color}20`, lineHeight: 1 }}>{p.num}</span>
                  <span className="tag" style={{ background: `${p.color}18`, color: p.color, border: `1px solid ${p.color}40` }}>{p.tag}</span>
                </div>
                <h3 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "0.95rem", fontWeight: 700, marginBottom: "0.75rem", color: "#fff", lineHeight: 1.3 }}>{p.title}</h3>
                <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.875rem", lineHeight: 1.75, flex: 1 }}>{p.desc}</p>
                <div style={{ display: "flex", gap: "1rem", marginTop: "1.8rem", paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.07)" }}>
                  {p.repo !== "#" && (
                    <a href={p.repo} target="_blank" rel="noreferrer"
                      style={{ fontSize: "0.8rem", color: "rgba(255,255,255,0.45)", letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 600, transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = "#fff"}
                      onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.45)"}
                    >GitHub →</a>
                  )}
                  {p.live && (
                    <a href={p.live} target="_blank" rel="noreferrer"
                      style={{ fontSize: "0.8rem", color: p.color, letterSpacing: "0.1em", textTransform: "uppercase", fontWeight: 700, transition: "opacity 0.2s" }}
                      onMouseEnter={e => e.target.style.opacity = "0.7"}
                      onMouseLeave={e => e.target.style.opacity = "1"}
                    >Live Demo ↗</a>
                  )}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <section style={{ padding: "6rem 5%", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: `linear-gradient(135deg, ${COLORS.accent}10, ${COLORS.accent2}10)`, border: "1px solid rgba(0,245,196,0.1)" }} />
        <div style={{ position: "relative", maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
          <SectionReveal>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 800, marginBottom: "1.5rem" }}>
              Ready to Build Something{" "}
              <span style={{ background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                Extraordinary?
              </span>
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "1.05rem", marginBottom: "2.5rem", lineHeight: 1.7 }}>
              Let's collaborate and turn your vision into a high-performance web application.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a href="mailto:koushikchakrabortykgp@gmail.com"
                style={{ padding: "1rem 2.8rem", background: COLORS.accent, border: "none", borderRadius: "8px", color: "#05050f", fontWeight: 800, fontSize: "0.9rem", letterSpacing: "0.12em", textTransform: "uppercase", display: "inline-block", transition: "all 0.25s" }}
                onMouseEnter={e => { e.target.style.transform = "translateY(-3px)"; e.target.style.boxShadow = `0 15px 40px ${COLORS.accent}50`; }}
                onMouseLeave={e => { e.target.style.transform = ""; e.target.style.boxShadow = ""; }}
              >
                Get In Touch →
              </a>
              <a href="https://steady-moxie-766c8e.netlify.app/" target="_blank" rel="noreferrer"
                style={{ padding: "1rem 2.8rem", background: "transparent", border: `1px solid ${COLORS.accent2}60`, borderRadius: "8px", color: COLORS.accent2, fontWeight: 700, fontSize: "0.9rem", letterSpacing: "0.1em", textTransform: "uppercase", display: "inline-block", transition: "all 0.25s" }}
                onMouseEnter={e => { e.target.style.borderColor = COLORS.accent2; e.target.style.transform = "translateY(-3px)"; }}
                onMouseLeave={e => { e.target.style.borderColor = `${COLORS.accent2}60`; e.target.style.transform = ""; }}
              >
                Full Portfolio ↗
              </a>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" style={{ padding: "8rem 5%", background: "rgba(255,255,255,0.015)" }}>
        <SectionReveal>
          <div style={{ textAlign: "center", marginBottom: "4rem" }}>
            <p style={{ color: COLORS.accent, fontSize: "0.8rem", letterSpacing: "0.25em", textTransform: "uppercase", fontWeight: 700, marginBottom: "1rem" }}>Get In Touch</p>
            <h2 style={{ fontFamily: "'Orbitron',sans-serif", fontSize: "clamp(2rem,4vw,3.5rem)", fontWeight: 800 }}>Contact</h2>
          </div>
        </SectionReveal>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          {[
            { label: "Name", value: "Koushik Chakraborty", href: null, icon: "◉" },
            { label: "Phone", value: "+91 8337899494", href: "tel:+918337899494", icon: "◈" },
            { label: "Email", value: "koushikchakrabortykgp@gmail.com", href: "mailto:koushikchakrabortykgp@gmail.com", icon: "⬡" },
            { label: "Portfolio", value: "steady-moxie-766c8e.netlify.app", href: "https://steady-moxie-766c8e.netlify.app/", icon: "⬢" },
            { label: "E-Commerce", value: "dancing-basbousa-52ce64.netlify.app", href: "https://dancing-basbousa-52ce64.netlify.app/", icon: "◫" },
          ].map((item, i) => (
            <SectionReveal key={i} delay={i * 0.08}>
              <motion.div
                whileHover={{ x: 8 }}
                style={{ display: "flex", alignItems: "center", gap: "1.5rem", padding: "1.5rem 0", borderBottom: "1px solid rgba(255,255,255,0.06)" }}
              >
                <span style={{ color: COLORS.accent, fontSize: "1.2rem", width: "24px", flexShrink: 0 }}>{item.icon}</span>
                <div style={{ flex: 1 }}>
                  <p style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.7rem", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: "0.25rem" }}>{item.label}</p>
                  {item.href ? (
                    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                      style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 500, transition: "color 0.2s" }}
                      onMouseEnter={e => e.target.style.color = COLORS.accent}
                      onMouseLeave={e => e.target.style.color = "#fff"}
                    >{item.value}</a>
                  ) : (
                    <p style={{ color: "#fff", fontSize: "0.95rem", fontWeight: 500 }}>{item.value}</p>
                  )}
                </div>
              </motion.div>
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ padding: "2.5rem 5%", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
        <span style={{ fontFamily: "'Orbitron',sans-serif", fontWeight: 700, fontSize: "0.9rem" }}>
          <span style={{ color: COLORS.accent }}>Code</span>Nova
        </span>
        <p style={{ color: "rgba(255,255,255,0.3)", fontSize: "0.8rem" }}>
          © {new Date().getFullYear()} Koushik Chakraborty — All rights reserved
        </p>
        <div style={{ display: "flex", gap: "1.5rem" }}>
          {["GitHub", "Portfolio", "E-Commerce"].map((l, i) => {
            const hrefs = ["https://github.com/Koushik27042001", "https://steady-moxie-766c8e.netlify.app/", "https://dancing-basbousa-52ce64.netlify.app/"];
            return (
              <a key={i} href={hrefs[i]} target="_blank" rel="noreferrer"
                style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s" }}
                onMouseEnter={e => e.target.style.color = COLORS.accent}
                onMouseLeave={e => e.target.style.color = "rgba(255,255,255,0.35)"}
              >{l}</a>
            );
          })}
        </div>
      </footer>
    </div>
  );
}
