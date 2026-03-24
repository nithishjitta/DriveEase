import React, { useState, useEffect } from "react";
import Stars from "./Stars";
import { enrichCar } from "./carUtils";
import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:3000/cars";

function CarsPage({ setSelectedCar }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [wishes, setWishes] = useState({});
  const [filter, setFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(data => {
        const enriched = data.map(enrichCar);
        setCars(enriched);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  const toggleWish = (id, e) => { e.stopPropagation(); setWishes(p => ({ ...p, [id]: !p[id] })); };
  const openCar = (car) => { setSelectedCar(car); navigate("/details"); };

  const types = ["All", ...Array.from(new Set(cars.map(c => c.type)))];
  const cities = ["All", ...Array.from(new Set(cars.map(c => c.city)))];

  const filtered = cars.filter(c => {
    const typeOk = filter === "All" || c.type === filter;
    const cityOk = cityFilter === "All" || c.city === cityFilter;
    const queryOk = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase());
    return typeOk && cityOk && queryOk;
  });

  return (
    <div className="page">
      {/* ── BREADCRUMB ── */}
      <div style={{ padding: "20px 0", borderBottom: "1px solid var(--border)" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px", display: "flex", alignItems: "center", gap: 8, fontSize: 14 }}>
          <button 
            onClick={() => navigate("/")}
            style={{ background: "none", border: "none", color: "var(--gold)", cursor: "pointer", fontWeight: 600 }}
          >
            Home
          </button>
          <span style={{ color: "var(--muted)" }}>›</span>
          <span style={{ color: "var(--text)" }}>All Cars</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 20px" }}>
        <div style={{ marginBottom: 40 }}>
          <h1 style={{ fontSize: 32, fontWeight: 700, marginBottom: 8 }}>Explore All Cars</h1>
          <p style={{ color: "var(--muted)", fontSize: 16 }}>Browse our complete fleet with advanced search and filtering</p>
        </div>

        {/* Search + city filter */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
          <div style={{ position: "relative", flex: "1 1 220px" }}>
            <svg style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            <input className="search-input" style={{ paddingLeft: 36, width: "100%" }} placeholder="Search by name or type…" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <select className="search-input" style={{ flex: "0 0 auto" }} value={cityFilter} onChange={e => setCityFilter(e.target.value)}>
            {cities.map(c => <option key={c} value={c}>{c === "All" ? "All Cities" : c}</option>)}
          </select>
        </div>

        {/* Type filter pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32, flexWrap: "wrap" }}>
          {types.map(t => (
            <button key={t} onClick={() => setFilter(t)} style={{ padding: "7px 18px", borderRadius: 40, border: "1px solid", borderColor: filter === t ? "var(--gold)" : "var(--border)", background: filter === t ? "rgba(212,168,83,0.1)" : "transparent", color: filter === t ? "var(--gold)" : "var(--muted)", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s" }}>{t}</button>
          ))}
        </div>

        {/* Results count */}
        <div style={{ marginBottom: 24, fontSize: 14, color: "var(--muted)" }}>
          {loading ? "Loading..." : `${filtered.length} cars found`}
        </div>

        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🚗</div>
            <div style={{ fontSize: 15 }}>Loading cars…</div>
          </div>
        )}

        {error && !loading && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--red)", fontSize: 14 }}>
            <div style={{ fontSize: 32, marginBottom: 12 }}>⚠️</div>
            Failed to load: {error}
          </div>
        )}

        {!loading && !error && filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "60px 0", color: "var(--muted)", fontSize: 14 }}>
            No cars match your search.{" "}
            <button onClick={() => { setFilter("All"); setCityFilter("All"); setSearchQuery(""); }} style={{ color: "var(--gold)", background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>Clear filters</button>
          </div>
        )}

        {!loading && !error && filtered.length > 0 && (
          <div className="cars-grid">
            {filtered.map(car => (
              <div key={car.id} className="car-card" onClick={() => openCar(car)}>
                <div style={{ position: "relative", overflow: "hidden" }}>
                  <img className="car-card-img" src={car.image} alt={car.name}
                    onError={e => { e.target.src = "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80"; }} />
                  <div className="car-card-badge">{car.badge}</div>
                  <button className="car-card-wish" onClick={e => toggleWish(car.id, e)}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={wishes[car.id] ? "#D4A853" : "none"} stroke="#D4A853" strokeWidth="2">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                    </svg>
                  </button>
                </div>
                <div className="car-card-body">
                  <div className="car-card-cat">{car.type}</div>
                  <div className="car-card-name">{car.name}</div>
                  <div className="car-card-specs">
                    <div className="car-spec-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      {car.seats} Seats
                    </div>
                    <div className="car-spec-item">
                      {car.fuelType === "Electric" ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>
                      ) : car.fuelType === "Hybrid" ? (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 4 23 10 17 10"/><polyline points="1 20 1 14 7 14"/><path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/></svg>
                      ) : (
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/></svg>
                      )}
                      {car.fuelType}
                    </div>
                    <div className="car-spec-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                      </svg>
                      {car.city}
                    </div>
                  </div>
                  <div className="car-card-footer">
                    <div><div className="car-card-price">₹{car.price?.toLocaleString()}<span>/day</span></div></div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
                      <div className="car-card-rating">
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="#D4A853" stroke="#D4A853" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26" /></svg>
                        {car.rating} <span style={{ color: "var(--muted)", fontSize: 12, fontWeight: 400 }}>({car.reviews})</span>
                      </div>
                      <button className="car-rent-btn" onClick={e => { e.stopPropagation(); openCar(car); }}>Rent Now</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
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

export default CarsPage;