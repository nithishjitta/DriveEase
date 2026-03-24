import React, { useState, useEffect } from "react";
import Stars from "./Stars";
import { enrichCar } from "./carUtils";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://69ba9cf0b3dcf7e0b4bd90ee.mockapi.io/cars";

function DetailsPage({ setPage, car }) {
  const [data, setData] = useState(car ?? null);
  const [loading, setLoading] = useState(!!car);
  const [activeImg, setActiveImg] = useState(0);
  const [wish, setWish] = useState(false);
  const [tab, setTab] = useState("specs");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [booked, setBooked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!car) return;
    // car is already fully enriched from Home, so just use it directly
    setData(car);
    setLoading(false);
    setActiveImg(0);
  }, [car]);

  if (!car) {
    return (
      <div className="page">
        <div className="details-page">
          <p
            style={{
              color: "var(--muted)",
              padding: "80px 0",
              textAlign: "center",
              fontSize: 15,
            }}
          >
            No car selected.{" "}
            <button
              className="breadcrumb-btn"
              style={{ color: "var(--gold)" }}
              onClick={() => navigate("/")}
            >
              Go back home
            </button>
          </p>
        </div>
      </div>
    );
  }

  const images =
    data?.images?.length > 0 ? data.images : data?.image ? [data.image] : [];
  const specs = data?.specs ?? {};
  const features = data?.features ?? [];
  const host = data?.host ?? {};
  const reviews = data?.reviews_list ?? [];
  const price = data?.pricePerDay ?? data?.price ?? 0;
  const rating = data?.rating ?? 0;
  const reviewCount = data?.reviews ?? 0;

  const days =
    startDate && endDate
      ? Math.max(
          1,
          Math.ceil((new Date(endDate) - new Date(startDate)) / 86400000),
        )
      : 1;
  const total = days * price;

  const handleBook = () => {
    if (!startDate || !endDate) {
      alert("Please select pickup and return dates.");
      return;
    }
    setBooked(true);
    setTimeout(() => setBooked(false), 3500);
  };

  return (
    <div className="page">
      <div className="details-page">
        {/* BREADCRUMB */}
        <div className="breadcrumb">
          <button className="breadcrumb-btn" onClick={() => navigate("/")}>
            Home
          </button>
          <span>›</span>
          <button className="breadcrumb-btn" onClick={() => navigate("/")}>
            Cars
          </button>
          <span>›</span>
          <span style={{ color: "var(--text)" }}>
            {data?.name ?? "Car Details"}
          </span>
        </div>

        {loading && (
          <div
            style={{
              textAlign: "center",
              padding: "40px 0",
              color: "var(--muted)",
            }}
          >
            Loading…
          </div>
        )}

        {!loading && (
          <div className="details-grid">
            {/* ── LEFT ── */}
            <div>
              {/* Main Image */}
              <div className="gallery-main">
                {images.length > 0 ? (
                  <img src={images[activeImg]} alt={data?.name} />
                ) : (
                  <div
                    style={{
                      width: "100%",
                      height: "100%",
                      background: "var(--surface2)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "var(--muted)",
                    }}
                  >
                    No image
                  </div>
                )}
                <div className="gallery-badge-wrap">
                  <div className="g-badge">{data?.year ?? "2024"} Model</div>
                  <div
                    className="g-badge"
                    style={{
                      background: "rgba(61,207,130,0.15)",
                      color: "var(--green)",
                      borderColor: "rgba(61,207,130,0.3)",
                    }}
                  >
                    📍 {data?.city}
                  </div>
                </div>
                <button className="g-wish" onClick={() => setWish(!wish)}>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill={wish ? "#D4A853" : "none"}
                    stroke="#D4A853"
                    strokeWidth="2"
                  >
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </button>
              </div>
              {/* Thumbnails — 4 angles */}
              {images.length > 1 && (
                <div className="thumbs">
                  {images.map((img, i) => (
                    <div
                      key={i}
                      className={`thumb${i === activeImg ? " active" : ""}`}
                      onClick={() => setActiveImg(i)}
                    >
                      <img src={img} alt={`View ${i + 1}`} />
                    </div>
                  ))}
                </div>
              )}

              {/* Car header */}
              <div className="car-title-area">
                <div className="car-cat">{data?.type}</div>
                <h1 className="car-bigname">{data?.name}</h1>
                <div className="car-meta-row">
                  <div className="meta-rating">
                    <Stars r={rating} size={15} />
                    <strong>{rating}</strong>
                    <span style={{ color: "var(--muted)", fontSize: 13 }}>
                      ({reviewCount} reviews)
                    </span>
                  </div>
                  <div className="meta-loc">
                    <svg
                      width="13"
                      height="13"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {data?.city}, India
                  </div>
                  <div className="avail-pill">
                    <div className="avail-dot" />
                    Available Now
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="tabs">
                {["specs", "features", "reviews"].map((t) => (
                  <button
                    key={t}
                    className={`tab-btn${tab === t ? " active" : ""}`}
                    onClick={() => setTab(t)}
                  >
                    {t[0].toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* SPECS */}
              {tab === "specs" && (
                <div className="specs-grid">
                  {Object.entries(specs).map(([k, v]) => {
                    const key = k.toLowerCase();
                    let icon;
                    if (key.includes("seat")) {
                      // Seats — people/users
                      icon = <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>;
                    } else if (key.includes("fuel")) {
                      // Fuel — fuel pump
                      icon = <><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></>;
                    } else if (key.includes("type") || key.includes("body")) {
                      // Type — car
                      icon = <><rect x="1" y="8" width="18" height="10" rx="2"/><path d="M5 8V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2"/><circle cx="5.5" cy="18.5" r="1.5"/><circle cx="14.5" cy="18.5" r="1.5"/><path d="M19 12h2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2h-2"/></>;
                    } else if (key.includes("transmission") || key.includes("gearbox")) {
                      // Transmission — settings/sliders
                      icon = <><line x1="4" y1="21" x2="4" y2="14"/><line x1="4" y1="10" x2="4" y2="3"/><line x1="12" y1="21" x2="12" y2="12"/><line x1="12" y1="8" x2="12" y2="3"/><line x1="20" y1="21" x2="20" y2="16"/><line x1="20" y1="12" x2="20" y2="3"/><line x1="1" y1="14" x2="7" y2="14"/><line x1="9" y1="8" x2="15" y2="8"/><line x1="17" y1="16" x2="23" y2="16"/></>;
                    } else if (key.includes("mileage") || key.includes("kmpl") || key.includes("efficiency")) {
                      // Mileage — gauge/speedometer
                      icon = <><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 8 8"/><circle cx="12" cy="12" r="1"/><path d="M16.24 7.76a6 6 0 0 1 1.4 5.6"/></>;
                    } else if (key.includes("power") || key.includes("engine") || key.includes("hp") || key.includes("torque")) {
                      // Power — zap/lightning
                      icon = <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>;
                    } else if (key.includes("city") || key.includes("location")) {
                      // City — map pin
                      icon = <><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>;
                    } else if (key.includes("price") || key.includes("rate") || key.includes("cost")) {
                      // Price — tag
                      icon = <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></>;
                    } else if (key.includes("year") || key.includes("model")) {
                      // Year — calendar
                      icon = <><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></>;
                    } else if (key.includes("color") || key.includes("colour")) {
                      // Color — palette
                      icon = <><circle cx="13.5" cy="6.5" r="1.5"/><circle cx="17.5" cy="10.5" r="1.5"/><circle cx="8.5" cy="7.5" r="1.5"/><circle cx="6.5" cy="12.5" r="1.5"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z"/></>;
                    } else if (key.includes("boot") || key.includes("cargo") || key.includes("luggage")) {
                      // Boot/cargo — package
                      icon = <><path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></>;
                    } else if (key.includes("drive") || key.includes("wheel") || key.includes("awd") || key.includes("4wd")) {
                      // Drive — steering wheel / refresh
                      icon = <><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/><line x1="12" y1="2" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="22"/><line x1="2" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="22" y2="12"/></>;
                    } else {
                      // Default — info circle
                      icon = <><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></>;
                    }
                    return (
                      <div key={k} className="spec-card">
                        <div className="spec-icon">
                          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                            {icon}
                          </svg>
                        </div>
                        <div className="spec-lbl">{k}</div>
                        <div className="spec-val">{v}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* FEATURES */}
              {tab === "features" &&
                (features.length > 0 ? (
                  <div className="feats-grid">
                    {features.map((f) => (
                      <div key={f} className="feat-item">
                        <svg
                          className="feat-check"
                          width="15"
                          height="15"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                        >
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                        {f}
                      </div>
                    ))}
                  </div>
                ) : (
                  <p style={{ color: "var(--muted)", fontSize: 14 }}>
                    No features listed.
                  </p>
                ))}

              {/* REVIEWS */}
              {tab === "reviews" && (
                <>
                  <div className="rev-summary">
                    <div style={{ textAlign: "center" }}>
                      <div className="rev-big-num">{rating}</div>
                      <div style={{ marginTop: 8 }}>
                        <Stars r={rating} size={17} />
                      </div>
                      <div
                        style={{
                          fontSize: 12,
                          color: "var(--muted)",
                          marginTop: 6,
                        }}
                      >
                        {reviewCount} ratings
                      </div>
                    </div>
                    <div className="rev-bars">
                      {[5, 4, 3, 2, 1].map((s) => (
                        <div key={s} className="rev-bar-row">
                          <span
                            style={{
                              fontSize: 12,
                              color: "var(--muted)",
                              width: 8,
                            }}
                          >
                            {s}
                          </span>
                          <div className="rev-bar-track">
                            <div
                              className="rev-bar-fill"
                              style={{
                                width:
                                  s === 5
                                    ? "72%"
                                    : s === 4
                                      ? "18%"
                                      : s === 3
                                        ? "7%"
                                        : "2%",
                              }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {reviews.length > 0 ? (
                    <div className="rev-list">
                      {reviews.map((r) => (
                        <div key={r.id} className="rev-card">
                          <div className="rev-header">
                            <img
                              src={r.avatar}
                              alt={r.name}
                              className="rev-avatar"
                            />
                            <div style={{ flex: 1 }}>
                              <div className="rev-name">{r.name}</div>
                              <div className="rev-date">{r.date}</div>
                            </div>
                            <Stars r={r.rating} size={13} />
                          </div>
                          <p className="rev-text">"{r.text}"</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: "var(--muted)", fontSize: 14 }}>
                      No reviews yet.
                    </p>
                  )}
                </>
              )}
            </div>

            {/* ── RIGHT — BOOKING CARD ── */}
            <div>
              <div className="booking-card">
                <div className="price-display">
                  <span className="price-big">
                    ₹{price?.toLocaleString("en-IN")}
                  </span>
                  <span className="price-unit"> / day</span>
                </div>
                <div className="price-note">
                  All taxes &amp; insurance included
                </div>

                <div className="date-grp">
                  <div className="date-fld">
                    <label className="date-lbl">Pickup Date</label>
                    <input
                      type="date"
                      className="date-inp"
                      value={startDate}
                      min={new Date().toISOString().split("T")[0]}
                      onChange={(e) => setStartDate(e.target.value)}
                    />
                  </div>
                  <div className="date-fld">
                    <label className="date-lbl">Return Date</label>
                    <input
                      type="date"
                      className="date-inp"
                      value={endDate}
                      min={startDate || new Date().toISOString().split("T")[0]}
                      onChange={(e) => setEndDate(e.target.value)}
                    />
                  </div>
                </div>

                <hr className="divider" />
                <div className="sum-row">
                  <span>Daily rate</span>
                  <span>₹{price?.toLocaleString("en-IN")}</span>
                </div>
                <div className="sum-row">
                  <span>Duration</span>
                  <span>
                    {days} day{days > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="sum-row">
                  <span>Insurance</span>
                  <span style={{ color: "var(--green)" }}>Included</span>
                </div>
                <hr className="divider" />
                <div className="sum-total">
                  <span>Total</span>
                  <span>₹{total?.toLocaleString("en-IN")}</span>
                </div>

                <button
                  className={`book-btn${booked ? " success" : ""}`}
                  onClick={handleBook}
                >
                  {booked ? "✓ Booking Confirmed!" : "Reserve This Car"}
                </button>
                <div className="free-cancel">
                  Free cancellation up to 48h before pickup
                </div>

                {host?.name && (
                  <div className="host-row">
                    <img
                      src={host.avatar}
                      alt={host.name}
                      className="host-img"
                    />
                    <div style={{ flex: 1 }}>
                      <div className="host-name">{host.name}</div>
                      <div className="host-sub">
                        {host.trips} trips · {host.responseRate} response rate
                      </div>
                    </div>
                    <button className="msg-btn">Message</button>
                  </div>
                )}
              </div>

              {/* Similar cars suggestion */}
              <div
                style={{
                  marginTop: 16,
                  background: "var(--surface)",
                  border: "1px solid var(--border)",
                  borderRadius: 14,
                  padding: 20,
                }}
              >
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    marginBottom: 14,
                    color: "var(--muted)",
                    textTransform: "uppercase",
                    letterSpacing: "1px",
                  }}
                >
                  Why DriveEase?
                </div>
                {[
                  { icon: "✅", text: "Verified cars & hosts" },
                  { icon: "🔒", text: "Secure payment" },
                  { icon: "📞", text: "24/7 customer support" },
                  { icon: "🚗", text: "Roadside assistance included" },
                  { icon: "💸", text: "No hidden charges" },
                ].map((item) => (
                  <div
                    key={item.text}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      marginBottom: 10,
                      fontSize: 13,
                      color: "var(--muted)",
                    }}
                  >
                    <span>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
      {booked && (
        <div className="toast">
          🎉 Your booking is confirmed! Check your email for details.
        </div>
      )}

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
                  {col.links.map(({l,p}) => { 
                    const handleClick = () => {
                      if (p) {
                        if (p === "about") navigate("/about");
                        else if (p === "howitworks") navigate("/how-it-works");
                      }
                    };
                    return <button key={l} className="footer-link" onClick={handleClick}>{l}</button>
                  })}
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

export default DetailsPage;