import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import carImg from "../assets/banner_car_image.png";

function HowItWorksPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("renter");

  // Scroll animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("is-visible"); observer.unobserve(e.target); } }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    setTimeout(() => document.querySelectorAll(".hiw-animate").forEach(el => observer.observe(el)), 0);
    return () => observer.disconnect();
  }, [activeTab]);

  const renterSteps = [
    {
      num: "01",
      title: "Browse & Discover",
      desc: "Explore hundreds of verified cars across 6 cities. Filter by type, fuel, price range, and availability. Every listing includes real photos, specs, and honest host reviews.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      ),
    },
    {
      num: "02",
      title: "Pick Your Dates",
      desc: "Select pickup and return dates with real-time availability. No back-and-forth, no waiting. See your total cost upfront — what you see is exactly what you pay.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      num: "03",
      title: "Book & Pay Securely",
      desc: "Checkout in under 60 seconds. All-inclusive pricing with zero hidden fees. Your payment is held securely until you pick up the car — full protection guaranteed.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/>
        </svg>
      ),
    },
    {
      num: "04",
      title: "Hit the Road",
      desc: "Pick up your car at the agreed time and location. Every vehicle is inspected, cleaned, and fully fueled before handover. Drive anywhere — India's roads await.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m4 4H11a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/>
        </svg>
      ),
    },
  ];

  const hostSteps = [
    {
      num: "01",
      title: "Create Your Listing",
      desc: "Sign up and add your car in minutes. Upload photos, set your price, write a description, and define your availability. Our smart pricing tool helps you earn the most.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
        </svg>
      ),
    },
    {
      num: "02",
      title: "Get Verified & Go Live",
      desc: "We verify your car's documents and your identity within 48 hours. Once approved, your listing goes live to thousands of renters across India — instantly.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        </svg>
      ),
    },
    {
      num: "03",
      title: "Accept Bookings",
      desc: "Review renter profiles, accept or decline requests, and communicate through our secure in-app chat. You're always in control of who drives your car.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
      ),
    },
    {
      num: "04",
      title: "Earn & Grow",
      desc: "Get paid instantly after every trip. Track your earnings, reviews, and performance in your host dashboard. Top hosts earn ₹30,000+ per month — just from idle days.",
      icon: (
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
        </svg>
      ),
    },
  ];

  const steps = activeTab === "renter" ? renterSteps : hostSteps;

  const hostPerks = [
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, title: "Full Insurance", desc: "Every trip is covered. Zero liability for you." },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, title: "Instant Payouts", desc: "Money in your account within 24h of trip end." },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>, title: "You're in Control", desc: "Set your own price, schedule, and rules." },
    { icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.38 2 2 0 0 1 3.59 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.56a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>, title: "24/7 Support", desc: "We're always on call if anything comes up." },
  ];

  return (
    <div className="page" style={{ overflowX: "hidden" }}>

      {/* ── HERO ── */}
      <section style={{
        position: "relative",
        background: "var(--bg)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
        paddingTop: 80,
        paddingBottom: 0,
      }}>
        {/* Grid lines */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          backgroundImage: "linear-gradient(rgba(212,168,83,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,168,83,0.04) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
        {/* Glow */}
        <div style={{ position: "absolute", top: -100, left: "50%", transform: "translateX(-50%)", width: 600, height: 400, borderRadius: "50%", background: "radial-gradient(ellipse, rgba(212,168,83,0.08) 0%, transparent 70%)", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "flex-end", gap: 40 }}>
          {/* Left text */}
          <div style={{ paddingBottom: 80 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)", borderRadius: 40, padding: "6px 16px", marginBottom: 28 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 8px rgba(212,168,83,0.9)" }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: "var(--gold)", letterSpacing: "1.5px", textTransform: "uppercase" }}>The DriveEase Way</span>
            </div>
            <h1 style={{ fontSize: "clamp(32px, 4.5vw, 56px)", fontWeight: 900, lineHeight: 1.1, marginBottom: 20, fontFamily: "'Syne', sans-serif" }}>
              Simple.<br />
              <em style={{ color: "var(--gold)", fontStyle: "italic" }}>Transparent.</em><br />
              Made for India.
            </h1>
            <p style={{ color: "var(--muted)", fontSize: 16, lineHeight: 1.8, maxWidth: 420, marginBottom: 36 }}>
              Whether you're renting your dream car for a weekend or turning your parked car into a passive income machine — DriveEase makes it effortless.
            </p>

            {/* Tab switcher */}
            <div style={{ display: "inline-flex", background: "var(--surface2)", border: "1px solid var(--border)", borderRadius: 50, padding: 4, gap: 4 }}>
              {["renter", "host"].map(t => (
                <button
                  key={t}
                  onClick={() => setActiveTab(t)}
                  style={{
                    padding: "10px 28px", borderRadius: 40, border: "none", cursor: "pointer", fontSize: 14, fontWeight: 700, transition: "all 0.25s",
                    background: activeTab === t ? "var(--gold)" : "transparent",
                    color: activeTab === t ? "#000" : "var(--muted)",
                    fontFamily: "'Syne', sans-serif",
                  }}
                >
                  {t === "renter" ? "I'm a Renter" : "I'm a Car Host"}
                </button>
              ))}
            </div>
          </div>

          {/* Right — 3D floating car */}
          <div style={{ position: "relative", display: "flex", alignItems: "flex-end", justifyContent: "center", minHeight: 340 }}>
            {/* Ground reflection */}
            <div style={{
              position: "absolute", bottom: 0, left: "50%", transform: "translateX(-50%)",
              width: "85%", height: 40,
              background: "radial-gradient(ellipse, rgba(212,168,83,0.18) 0%, transparent 70%)",
              filter: "blur(8px)",
            }} />
            {/* Outer glow ring */}
            <div style={{
              position: "absolute", bottom: 20, left: "50%", transform: "translateX(-50%)",
              width: "90%", height: 20,
              background: "radial-gradient(ellipse, rgba(212,168,83,0.10) 0%, transparent 70%)",
              filter: "blur(12px)",
            }} />

            <img
              src={carImg}
              alt="DriveEase car"
              style={{
                width: "100%",
                maxWidth: 580,
                position: "relative",
                zIndex: 2,
                filter: "drop-shadow(0px 30px 60px rgba(212,168,83,0.25)) drop-shadow(0px 10px 30px rgba(0,0,0,0.8))",
                animation: "carFloat 4s ease-in-out infinite",
                transformOrigin: "bottom center",
              }}
            />

            {/* Floating badge — top left */}
            <div style={{
              position: "absolute", top: 24, left: 16, zIndex: 4,
              background: "var(--surface)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(212,168,83,0.25)", borderRadius: 14,
              padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(212,168,83,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#D4A853" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", fontFamily: "'Syne', sans-serif" }}>4.9 Rating</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>1,200+ reviews</div>
              </div>
            </div>

            {/* Floating badge — bottom right */}
            <div style={{
              position: "absolute", bottom: 48, right: 0, zIndex: 4,
              background: "var(--surface)", backdropFilter: "blur(16px)",
              border: "1px solid rgba(61,207,130,0.25)", borderRadius: 14,
              padding: "12px 16px", display: "flex", alignItems: "center", gap: 10,
            }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "rgba(61,207,130,0.1)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3dcf82" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 15, fontWeight: 800, color: "var(--text)", fontFamily: "'Syne', sans-serif" }}>100% Insured</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Every trip, every car</div>
              </div>
            </div>
          </div>
        </div>

        {/* Float animation keyframes injected inline */}
        <style>{`
          @keyframes carFloat {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-14px); }
          }
        `}</style>
      </section>

      {/* ── STEPS ── */}
      <section style={{ padding: "100px 0", background: "var(--bg)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>

          {/* Section header */}
          <div className="hiw-animate" style={{ textAlign: "center", marginBottom: 72, opacity: 0, transform: "translateY(30px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center", display: "flex" }}>
              {activeTab === "renter" ? "As a Renter" : "As a Car Host"}
            </div>
            <h2 className="section-title" style={{ textAlign: "center" }}>
              {activeTab === "renter" ? "Rent a car in 4 easy steps" : "Start earning in 4 simple steps"}
            </h2>
          </div>

          {/* Steps — alternating layout */}
          <div style={{ display: "flex", flexDirection: "column", gap: 80 }}>
            {steps.map((step, i) => (
              <div key={step.num} className="hiw-animate" style={{
                display: "grid",
                gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
                gap: 60,
                alignItems: "center",
                direction: i % 2 === 0 ? "ltr" : "rtl",
                opacity: 0,
                transform: "translateY(40px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}>
                {/* Text side */}
                <div style={{ direction: "ltr" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
                    <div style={{
                      width: 56, height: 56, borderRadius: 16,
                      background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.2)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      color: "var(--gold)", flexShrink: 0,
                    }}>
                      {step.icon}
                    </div>
                    <div style={{ fontSize: 13, fontWeight: 700, color: "rgba(212,168,83,0.4)", letterSpacing: "2px" }}>STEP {step.num}</div>
                  </div>
                  <h3 style={{ fontSize: 28, fontWeight: 800, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>{step.title}</h3>
                  <p style={{ color: "var(--muted)", fontSize: 15, lineHeight: 1.8, maxWidth: 420 }}>{step.desc}</p>
                </div>

                {/* Visual card side */}
                <div style={{ direction: "ltr" }}>
                  <div style={{
                    background: "linear-gradient(135deg, rgba(212,168,83,0.06) 0%, rgba(212,168,83,0.02) 100%)",
                    border: "1px solid rgba(212,168,83,0.12)",
                    borderRadius: 24,
                    height: 220,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    position: "relative", overflow: "hidden",
                  }}>
                    <div style={{ position: "absolute", top: -30, right: -30, width: 160, height: 160, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 70%)" }} />
                    <div style={{ fontSize: 72, fontWeight: 900, color: "rgba(212,168,83,0.08)", fontFamily: "'Syne', sans-serif", position: "absolute", bottom: -10, right: 20, lineHeight: 1 }}>{step.num}</div>
                    <div style={{ color: "var(--gold)", zIndex: 1, transform: "scale(2.5)", opacity: 0.7 }}>{step.icon}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOST PERKS (only when host tab active) ── */}
      {activeTab === "host" && (
        <section style={{ padding: "80px 0", background: "var(--surface)", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
            <div style={{ textAlign: "center", marginBottom: 56 }}>
              <div className="section-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Why Hosts Love Us</div>
              <h2 className="section-title" style={{ textAlign: "center" }}>Everything we handle.<br />So you don't have to.</h2>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 20 }}>
              {hostPerks.map(p => (
                <div key={p.title} className="hiw-animate" style={{
                  background: "rgba(212,168,83,0.04)", border: "1px solid rgba(212,168,83,0.12)",
                  borderRadius: 20, padding: "28px 24px",
                  opacity: 0, transform: "translateY(30px)", transition: "opacity 0.5s ease, transform 0.5s ease",
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.2)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                    {p.icon}
                  </div>
                  <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8, fontFamily: "'Syne', sans-serif" }}>{p.title}</div>
                  <div style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.65 }}>{p.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── CTA ── */}
      <div className="cta-section section-animate">
        <div className="cta-inner">
          <div className="cta-glow" />
          <div>
            <h2 className="cta-title">
              {activeTab === "renter" ? "Ready to find your ride?" : "Ready to start earning?"}
            </h2>
            <p className="cta-sub">
              {activeTab === "renter"
                ? "Join thousands of happy drivers across India. Transparent pricing, verified cars, 24/7 support."
                : "List your car for free and start earning within 48 hours. Zero listing fees, full insurance, instant payouts."}
            </p>
          </div>
          <div className="cta-actions">
            {activeTab === "renter" ? (
              <>
                <Link className="hero-btn-primary" to="/">Browse Cars</Link>
                <button className="hero-btn-secondary" onClick={() => setActiveTab("host")}>I'm a Host →</button>
              </>
            ) : (
              <>
                <Link className="hero-btn-primary" to="/list-your-car">List Your Car — Free</Link>
                <button className="hero-btn-secondary" onClick={() => setActiveTab("renter")}>I'm a Renter →</button>
              </>
            )}
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
              { head: "Company", links: [{ l: "About Us", p: "/about" }, { l: "How it Works", p: "/how-it-works" }, { l: "Careers", p: null }, { l: "Blog", p: null }] },
              { head: "Support", links: [{ l: "Help Center", p: null }, { l: "Safety", p: null }, { l: "Cancellation", p: null }, { l: "Insurance", p: null }] },
              { head: "Legal", links: [{ l: "Privacy Policy", p: null }, { l: "Terms of Service", p: null }, { l: "Cookie Policy", p: null }] },
            ].map(col => (
              <div key={col.head} className="footer-col">
                <h4>{col.head}</h4>
                <div className="footer-links">
                  {col.links.map(({ l, p }) => (
                    <button key={l} className="footer-link" onClick={() => p && navigate(p)}>{l}</button>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="footer-bottom">
            <div className="footer-copy">© 2025 DriveEase. All rights reserved.</div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--green)" }} />
              <span style={{ fontSize: 12, color: "var(--muted)" }}>All systems operational</span>
            </div>
          </div>
        </div>
      </footer>

      {/* Scroll animation styles */}
      <style>{`
        .hiw-animate.is-visible {
          opacity: 1 !important;
          transform: translateY(0px) !important;
        }
      `}</style>
    </div>
  );
}

export default HowItWorksPage;