import React from 'react';
import Stars from './Stars';
import { Link } from 'react-router-dom';

const TEAM = [
  { name: "Rohan Mehta",    role: "CEO & Co-Founder",    avatar: "https://i.pravatar.cc/96?img=11", bio: "Ex-Ola, IIT Bombay alumni. Passionate about making mobility accessible to everyone." },
  { name: "Priya Sharma",   role: "CTO & Co-Founder",    avatar: "https://i.pravatar.cc/96?img=5",  bio: "Previously at Uber Engineering. Leads all things product & technology at DriveEase." },
  { name: "Aditya Nair",    role: "Head of Operations",  avatar: "https://i.pravatar.cc/96?img=15", bio: "10+ years in logistics and fleet management across India's top rental companies." },
  { name: "Sneha Reddy",    role: "Head of Marketing",   avatar: "https://i.pravatar.cc/96?img=9",  bio: "Brand strategist with stints at Zomato and Swiggy. Building DriveEase's voice." },
];

const VALUES = [
  {
    title: "Trust First",
    desc: "Every car is verified. Every host is vetted. Every booking is protected. Trust is the foundation of DriveEase.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    title: "Transparency",
    desc: "What you see is what you pay. No surprise charges, no fine print traps. Ever.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8"/>
        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
        <line x1="11" y1="8" x2="11" y2="14"/>
        <line x1="8" y1="11" x2="14" y2="11"/>
      </svg>
    ),
  },
  {
    title: "Community",
    desc: "We connect car owners and drivers into a thriving community built on mutual respect.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    title: "Innovation",
    desc: "We're constantly building better tools, smarter search, and smoother experiences for everyone.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
      </svg>
    ),
  },
  {
    title: "Sustainability",
    desc: "Promoting shared mobility to reduce idle cars on roads and our collective carbon footprint.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7z"/>
        <circle cx="12" cy="12" r="3"/>
        <path d="M12 2v2M12 20v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42"/>
      </svg>
    ),
  },
  {
    title: "Customer Love",
    desc: "Our support team is available 24/7 because your journey matters even at 2am.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
      </svg>
    ),
  },
];

const MILESTONES = [
  { year: "2021", title: "Founded",   desc: "DriveEase was born in a Hyderabad garage with 3 cars and a big dream." },
  { year: "2022", title: "100 Cars",  desc: "Reached 100 listed vehicles across Hyderabad and Bangalore." },
  { year: "2023", title: "Pan India", desc: "Expanded to 6 cities: Hyderabad, Delhi, Mumbai, Chennai, Bangalore, and more." },
  { year: "2024", title: "10K Trips", desc: "Celebrated 10,000 successful rentals with a 4.8★ average rating." },
  { year: "2025", title: "47+ Cars",  desc: "Over 47 verified cars, 500+ hosts, and growing every month." },
];

const STATS = [
  {
    num: "47+", label: "Cars Available",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="8" width="18" height="10" rx="2"/>
        <path d="M5 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/>
        <circle cx="5.5" cy="18.5" r="1.5"/><circle cx="14.5" cy="18.5" r="1.5"/>
        <path d="M19 12h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/>
      </svg>
    ),
  },
  {
    num: "6", label: "Cities",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
        <circle cx="12" cy="10" r="3"/>
      </svg>
    ),
  },
  {
    num: "500+", label: "Happy Hosts",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
      </svg>
    ),
  },
  {
    num: "4.8★", label: "Average Rating",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
      </svg>
    ),
  },
];

function AboutPage({ setPage }) {
  return (
    <div className="page">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 48px" }}>

        {/* ── HERO ── */}
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <div className="section-eyebrow" style={{ display: "inline-flex", justifyContent: "center", marginBottom: 16 }}>Our Story</div>
          <h1 style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(36px,5vw,64px)", fontWeight: 800, letterSpacing: "-2px", lineHeight: 1.05, marginBottom: 24 }}>
            We're building India's most<br /><span style={{ color: "var(--gold)" }}>trusted car rental</span> platform.
          </h1>
          <p style={{ fontSize: 17, color: "var(--muted)", lineHeight: 1.8, maxWidth: 620, margin: "0 auto 40px", fontWeight: 300 }}>
            DriveEase started with a simple belief: renting a car in India shouldn't be stressful, opaque, or expensive.
            We set out to change that — and we're just getting started.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <Link className="hero-btn-primary" to="/">
              Explore Cars
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
            </Link>
            <Link className="hero-btn-secondary" to="/signup">Join as a Host</Link>
          </div>
        </div>

        {/* ── STATS STRIP ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20, marginBottom: 80 }}>
          {STATS.map(s => (
            <div key={s.label} style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 18,
              padding: "28px 24px",
              textAlign: "center",
              position: "relative",
              overflow: "hidden",
              transition: "border-color .2s, transform .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.35)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Icon circle */}
              <div style={{
                width: 44, height: 44, borderRadius: "50%",
                background: "rgba(212,168,83,0.08)",
                border: "1px solid rgba(212,168,83,0.18)",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 16px",
                color: "var(--gold)",
              }}>
                {s.icon}
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, color: "var(--gold)", marginBottom: 6, lineHeight: 1 }}>{s.num}</div>
              <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px" }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── MISSION ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, alignItems: "center", marginBottom: 80 }}>
          <div>
            <div className="section-eyebrow" style={{ marginBottom: 16 }}>Our Mission</div>
            <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 36, fontWeight: 800, letterSpacing: "-1px", marginBottom: 20, lineHeight: 1.15 }}>
              Mobility for everyone,<br />everywhere in India.
            </h2>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300, marginBottom: 16 }}>
              India has millions of cars sitting idle while millions of people need affordable, reliable transportation.
              DriveEase bridges this gap — a peer-to-peer marketplace where car owners earn and drivers travel comfortably.
            </p>
            <p style={{ fontSize: 15, color: "var(--muted)", lineHeight: 1.8, fontWeight: 300 }}>
              We believe every trip should be stress-free. From the moment you search to the moment you return the keys,
              we've designed every touchpoint to be simple, transparent, and delightful.
            </p>
          </div>
          <div>
            <img
              src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80"
              alt="Our mission"
              style={{ width: "100%", borderRadius: 20, border: "1px solid var(--border)" }}
            />
          </div>
        </div>

        {/* ── VALUES ── */}
        <div style={{ marginBottom: 80 }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div className="section-eyebrow" style={{ display: "inline-flex", justifyContent: "center", marginBottom: 12 }}>What We Stand For</div>
            <h2 className="section-title">Our Core Values</h2>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {VALUES.map(v => (
              <div
                key={v.title}
                style={{
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 18,
                  padding: "28px 24px",
                  transition: "border-color .2s, transform .2s",
                  position: "relative",
                  overflow: "hidden",
                }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
              >
                {/* Subtle corner glow on hover via pseudo-element alternative */}
                <div style={{
                  width: 48, height: 48,
                  borderRadius: 14,
                  background: "linear-gradient(135deg, rgba(212,168,83,0.15) 0%, rgba(212,168,83,0.04) 100%)",
                  border: "1px solid rgba(212,168,83,0.2)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  marginBottom: 18,
                  color: "var(--gold)",
                  boxShadow: "0 4px 16px rgba(212,168,83,0.08)",
                }}>
                  {v.icon}
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 16, fontWeight: 700, marginBottom: 10 }}>{v.title}</div>
                <p style={{ fontSize: 13, color: "var(--muted)", lineHeight: 1.65, margin: 0 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA ── */}
        <div style={{
          textAlign: "center",
          background: "var(--surface)",
          border: "1px solid rgba(212,168,83,0.2)",
          borderRadius: 24,
          padding: "60px 48px",
          position: "relative",
          overflow: "hidden",
        }}>
          <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: 400, height: 300, background: "radial-gradient(circle,rgba(212,168,83,0.08),transparent 70%)", pointerEvents: "none" }} />
          <h2 style={{ fontFamily: "'Syne',sans-serif", fontSize: 32, fontWeight: 800, letterSpacing: "-1px", marginBottom: 12 }}>Ready to hit the road?</h2>
          <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 28, fontWeight: 300 }}>Join thousands of happy drivers across India.</p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
            <Link className="hero-btn-primary" to="/">Browse Cars</Link>
            <Link className="hero-btn-secondary" to="/signup">Create Account</Link>
          </div>
        </div>
      </div>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-grid">
            <div>
              <div className="footer-brand">DriveEase</div>
              <p className="footer-tagline">India's trusted car rental platform. Connecting drivers with the perfect ride across 6 major cities.</p>
              <div className="footer-social">
                <div className="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.732-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg></div>
                <div className="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/></svg></div>
                <div className="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg></div>
                <div className="social-btn"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.96-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/><polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/></svg></div>
              </div>
            </div>
            {[
              { head:"Company", links:[{l:"About Us",p:"about"},{l:"How it Works",p:"howitworks"},{l:"Careers",p:null},{l:"Blog",p:null}] },
              { head:"Support",  links:[{l:"Help Center",p:null},{l:"Safety",p:null},{l:"Cancellation",p:null},{l:"Insurance",p:null}] },
              { head:"Legal",    links:[{l:"Privacy Policy",p:null},{l:"Terms of Service",p:null},{l:"Cookie Policy",p:null}] },
            ].map(col => (
              <div key={col.head} className="footer-col">
                <h4>{col.head}</h4>
                <div className="footer-links">
                  {col.links.map(({l,p}) => <button key={l} className="footer-link" onClick={() => p && setPage(p)}>{l}</button>)}
                </div>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 DriveEase. All rights reserved.</div>
            <div style={{ display:"flex", gap:6, alignItems:"center" }}>
              <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--green)" }} />
              <span style={{ fontSize:12, color:"var(--muted)" }}>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default AboutPage;