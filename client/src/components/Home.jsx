import React, { useState, useEffect } from "react";
import Stars from "./Stars";
import { enrichCar } from "./carUtils";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/banner_car_image.png";
const API_URL = "http://localhost:3000/cars";
const CACHE_TTL = 24 * 60 * 60 * 1000; // 24 hours

const TESTIMONIALS = [
  { id: 1, name: "Meera Nair",  city: "Bangalore", avatar: "https://i.pravatar.cc/64?img=5", rating: 5, text: "DriveEase made our anniversary trip unforgettable. The car was in showroom condition and booking was completely effortless." },
  { id: 2, name: "Karan Shah",  city: "Mumbai",    avatar: "https://i.pravatar.cc/64?img=8", rating: 5, text: "I've tried 5 rental services — none come close. The car we got was insanely fun and the host was incredibly helpful." },
  { id: 3, name: "Ananya R.",   city: "Hyderabad", avatar: "https://i.pravatar.cc/64?img=9", rating: 5, text: "Booked a luxury car for a weekend getaway. Every detail was perfect. Pricing is super transparent — no hidden charges at all." },
  { id: 4, name: "Rajesh Patel",  city: "Delhi", avatar: "https://i.pravatar.cc/64?img=12", rating: 5, text: "Outstanding experience! The BMW was pristine and the customer service team went above and beyond to help." },
  { id: 5, name: "Priya Sharma",   city: "Chennai", avatar: "https://i.pravatar.cc/64?img=15", rating: 5, text: "Best car rental service I've used. The booking process is smooth and the car delivery was faster than promised." },
  { id: 6, name: "Vikram Singh",   city: "Bangalore", avatar: "https://i.pravatar.cc/64?img=18", rating: 5, text: "Very reliable and trustworthy. Rented the Innova for a family trip and everything was perfect. Highly recommended!" },
  { id: 7, name: "Sneha Desai",    city: "Mumbai", avatar: "https://i.pravatar.cc/64?img=22", rating: 5, text: "Amazing service! The car was clean, well-maintained, and the staff was super helpful. Will definitely book again." },
  { id: 8, name: "Arjun Nair",     city: "Cochin", avatar: "https://i.pravatar.cc/64?img=25", rating: 4, text: "Great experience overall. The car rent was affordable and the booking process was straightforward. No complaints!" },
  { id: 9, name: "Neha Kapoor",    city: "Hyderabad", avatar: "https://i.pravatar.cc/64?img=28", rating: 5, text: "Perfect for our road trip! The Fortuner was spacious and the car was in excellent condition. Top-notch service!" },
  { id: 10, name: "Rohit Gupta",   city: "Delhi", avatar: "https://i.pravatar.cc/64?img=31", rating: 5, text: "Impressed with the transparency in pricing and the quality of vehicles. DriveEase is my go-to rental service now." },
];

function HomePage({ setPage, setSelectedCar }) {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [imagesFetching, setImagesFetching] = useState(false);
  const [wishes, setWishes] = useState({});
  const [filter, setFilter] = useState("All");
  const [cityFilter, setCityFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [pickupDate, setPickupDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [pickupCity, setPickupCity] = useState("");
  const reviewsScrollRef = React.useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(API_URL)
      .then(r => { if (!r.ok) throw new Error(`HTTP ${r.status}`); return r.json(); })
      .then(async (data) => {
        const enriched = data.map(enrichCar);
        setCars(enriched);
        setLoading(false);
      })
      .catch(e => { setError(e.message); setLoading(false); });
  }, []);

  // Scroll animations observer
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll('.scroll-animate, .scroll-animate-left, .scroll-animate-right, .scroll-animate-scale').forEach(el => {
        if (!el.classList.contains('is-visible')) {
          observer.observe(el);
        }
      });
    }, 0);

    return () => observer.disconnect();
  }, []);

  // Auto-scroll reviews carousel like YouTube/Netflix
  useEffect(() => {
    const scrollContainer = reviewsScrollRef.current;
    if (!scrollContainer) return;

    let isAutoScrolling = true;
    let scrollAmount = 0;
    const scrollStep = 0.5;
    const scrollInterval = 30;

    const autoScroll = setInterval(() => {
      if (isAutoScrolling && scrollContainer) {
        scrollAmount += scrollStep;
        scrollContainer.scrollLeft = scrollAmount;

        if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth - 10) {
          scrollAmount = 0;
          scrollContainer.scrollLeft = 0;
        }
      }
    }, scrollInterval);

    const handleMouseEnter = () => { isAutoScrolling = false; };
    const handleMouseLeave = () => { isAutoScrolling = true; };

    if (scrollContainer) {
      scrollContainer.addEventListener('mouseenter', handleMouseEnter);
      scrollContainer.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(autoScroll);
      if (scrollContainer) {
        scrollContainer.removeEventListener('mouseenter', handleMouseEnter);
        scrollContainer.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, []);

  // Scroll animations observer for CTA and sections
  useEffect(() => {
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    setTimeout(() => {
      document.querySelectorAll('.section-animate').forEach(el => {
        if (!el.classList.contains('visible')) {
          observer.observe(el);
        }
      });
    }, 0);

    return () => observer.disconnect();
  }, []);

  const toggleWish = (id, e) => { e.stopPropagation(); setWishes(p => ({ ...p, [id]: !p[id] })); };
  const openCar = (car) => { setSelectedCar(car); navigate("/details"); };
  const heroCar = cars[0] ?? null;
  const handleSearch = () => { if (pickupCity) setCityFilter(pickupCity); document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" }); };

  const types = ["All", ...Array.from(new Set(cars.map(c => c.type)))];
  const cities = ["All", ...Array.from(new Set(cars.map(c => c.city)))];

  const filtered = cars.filter(c => {
    const typeOk = filter === "All" || c.type === filter;
    const cityOk = cityFilter === "All" || c.city === cityFilter;
    const queryOk = !searchQuery || c.name.toLowerCase().includes(searchQuery.toLowerCase()) || c.type.toLowerCase().includes(searchQuery.toLowerCase());
    return typeOk && cityOk && queryOk;
  });

  // Show first 12 cars
  const displayedCars = filtered.slice(0, 12);
  const hasMoreCars = filtered.length > 12;

  return (
    <div className="page">
      {/* ── HERO ── */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-lines" />
        <div className="hero-content">
          <div>
            <div className="hero-eyebrow"><span />Premium Car Rentals · India</div>
            <h1 className="hero-title">Drive Your<br /><em>Dream Car</em><br />Today</h1>
            <p className="hero-sub">Explore India's finest fleet of cars — from budget hatchbacks to premium luxury sedans. Seamless booking, transparent pricing, unforgettable journeys.</p>
            <div className="hero-ctas">
              <button className="hero-btn-primary" onClick={() => document.getElementById("fleet")?.scrollIntoView({ behavior: "smooth" })}>
                Browse Fleet
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
              </button>
              <Link className="hero-btn-secondary" to="/how-it-works">
                How it Works
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item"><div className="stat-num">{loading ? "…" : `${cars.length}+`}</div><div className="stat-label">Cars Available</div></div>
              <div className="stat-item"><div className="stat-num">6</div><div className="stat-label">Cities</div></div>
              <div className="stat-item"><div className="stat-num">4.7★</div><div className="stat-label">Avg Rating</div></div>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-car-card">
              {heroCar ? (
                <>
                  <img className="hero-car-img" src={heroCar.image} alt={heroCar.name} />
                  <div className="hero-car-overlay">
                    <div className="hero-car-name">{heroCar.name}</div>
                    <div className="hero-car-price">From ₹{heroCar.price?.toLocaleString()}/day</div>
                  </div>
                </>
              ) : (
                <div className="hero-car-img" style={{ background: "var(--surface2)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", fontSize: 14 }}>Loading…</div>
              )}
            </div>
            <div className="hero-float-badge" style={{ position: "absolute", top: 20, right: -20 }}>
              <div className="hero-float-label">Cities Covered</div>
              <div className="hero-float-val">6</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SEARCH BAR ── */}
      <div className="search-section">
        <div className="search-bar">
          <div className="search-field">
            <label className="search-label">Pick-up City</label>
            <select className="search-input" value={pickupCity} onChange={e => setPickupCity(e.target.value)}>
              <option value="">Any City</option>
              {["Hyderabad","Delhi","Mumbai","Bangalore","Chennai"].map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="search-field">
            <label className="search-label">Pick-up Date</label>
            <input type="date" className="search-input" value={pickupDate} min={new Date().toISOString().split("T")[0]} onChange={e => setPickupDate(e.target.value)} />
          </div>
          <div className="search-field">
            <label className="search-label">Return Date</label>
            <input type="date" className="search-input" value={returnDate} min={pickupDate || new Date().toISOString().split("T")[0]} onChange={e => setReturnDate(e.target.value)} />
          </div>
          <button className="search-btn" onClick={handleSearch}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" /></svg>
            Search
          </button>
        </div>
      </div>

      {/* ── BRANDS ── */}
      <div className="brands-section">
        <p className="brands-label">Available brands in our fleet</p>
        <div className="brands-strip">
          {["Toyota","Honda","Hyundai","Kia","Tata","Mahindra","Mercedes-Benz","BMW","Audi","Volkswagen","Volvo","Jeep"].map(b => (
            <div key={b} className="brand-name">{b}</div>
          ))}
        </div>
      </div>

      {/* ── FLEET ── */}
      <section className="section" id="fleet">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Our Collection</div>
            <h2 className="section-title">Find Your<br />Perfect Ride</h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            {!loading && <span style={{ color: "var(--muted)", fontSize: 14 }}>{filtered.length} cars found</span>}
            {imagesFetching && (
              <span style={{ fontSize: 12, color: "var(--gold)", display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ display: "inline-block", width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", animation: "blink 1s infinite" }} />
                Loading images…
              </span>
            )}
          </div>
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

        {loading && (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <div style={{ fontSize: 36, marginBottom: 16 }}>🚗</div>
            <div style={{ fontSize: 15 }}>Loading cars from API…</div>
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
            {displayedCars.map(car => (
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
                    {/* Seats — users icon */}
                    <div className="car-spec-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
                        <circle cx="9" cy="7" r="4"/>
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
                        <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                      </svg>
                      {car.seats} Seats
                    </div>
                    {/* Fuel Type — dynamic icon */}
                    <div className="car-spec-item">
                      {car.fuelType === "Electric" ? (
                        /* Zap / lightning bolt */
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                        </svg>
                      ) : car.fuelType === "Hybrid" ? (
                        /* Refresh / recycle */
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <polyline points="23 4 23 10 17 10"/>
                          <polyline points="1 20 1 14 7 14"/>
                          <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                        </svg>
                      ) : (
                        /* Fuel pump — Lucide fuel */
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="3" y1="22" x2="15" y2="22"/>
                          <line x1="4" y1="9" x2="14" y2="9"/>
                          <path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/>
                          <path d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 2 2 2 2 0 0 0 2-2V9.83a2 2 0 0 0-.59-1.42L18 5"/>
                        </svg>
                      )}
                      {car.fuelType}
                    </div>
                    {/* City — map pin */}
                    <div className="car-spec-item">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/>
                        <circle cx="12" cy="10" r="3"/>
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

        {/* Explore All Cars Link */}
        {!loading && !error && hasMoreCars && (
          <div style={{ textAlign: "center", marginTop: 40, marginBottom: 20 }}>
            <button 
              onClick={() => navigate("/cars")}
              className="hero-btn-primary"
              style={{ display: "inline-flex", alignItems: "center", gap: 8 }}
            >
              Explore All Cars
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </section>

      {/* ── LIST YOUR CAR ── */}
      <section className="section-animate" style={{ padding: "48px 0", overflow: "hidden" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px" }}>
          <div style={{
            position: "relative",
            borderRadius: 24,
            overflow: "hidden",
            background: "var(--surface)",
            border: "1px solid rgba(212,168,83,0.2)",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
          }}>
            {/* Decorative glow blobs */}
            <div style={{ position: "absolute", top: -80, left: -80, width: 320, height: 320, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.12) 0%, transparent 70%)", pointerEvents: "none" }} />
            <div style={{ position: "absolute", bottom: -60, right: 320, width: 240, height: 240, borderRadius: "50%", background: "radial-gradient(circle, rgba(212,168,83,0.07) 0%, transparent 70%)", pointerEvents: "none" }} />

            {/* LEFT — Content */}
            <div style={{ padding: "48px 48px", display: "flex", flexDirection: "column", justifyContent: "center", position: "relative", zIndex: 1 }}>
              {/* Eyebrow */}
              <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(212,168,83,0.1)", border: "1px solid rgba(212,168,83,0.25)", borderRadius: 40, padding: "6px 14px", width: "fit-content", marginBottom: 20 }}>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--gold)", boxShadow: "0 0 8px rgba(212,168,83,0.8)" }} />
                <span style={{ fontSize: 12, fontWeight: 700, color: "var(--gold)", letterSpacing: "1.5px", textTransform: "uppercase" }}>For Car Owners</span>
              </div>

              <h2 style={{ fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 800, lineHeight: 1.15, marginBottom: 16, fontFamily: "'Syne', sans-serif" }}>
                Your car earns.<br />
                <em style={{ fontStyle: "italic", color: "var(--gold)" }}>Even when you don't drive.</em>
              </h2>

              <p style={{ color: "var(--muted)", fontSize: 14, lineHeight: 1.75, marginBottom: 28, maxWidth: 400 }}>
                Turn idle days into steady income. List your car on DriveEase and connect with thousands of verified renters across India. We handle insurance, payments, and support — you just collect.
              </p>

              {/* CTA buttons */}
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                <Link
                  to="/list-your-car"
                  className="hero-btn-primary"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
                >
                  List Your Car
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
                <Link
                  to="/how-it-works"
                  className="hero-btn-secondary"
                  style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 14 }}
                >
                  See how it works
                </Link>
              </div>
            </div>

            {/* RIGHT — car image, no float */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "32px 24px 0 0" }}>
              <img
                src={logo}
                alt="List your car on DriveEase"
                style={{
                  width: "100%",
                  maxWidth: 460,
                  display: "block",
                  filter: "drop-shadow(0px 20px 40px rgba(0,0,0,0.7))",
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="how-section section-animate">
        <div className="how-inner">
          <div style={{ textAlign: "center" }}>
            <div className="section-eyebrow" style={{ justifyContent: "center", display: "flex" }}>Simple Process</div>
            <h2 className="section-title" style={{ textAlign: "center" }}>How DriveEase Works</h2>
          </div>
          <div className="how-steps">
            {[
              { num:"01", icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>, title:"Browse & Filter", desc:"Explore our full fleet. Filter by city, car type, fuel, and budget to find your perfect ride." },
              { num:"02", icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, title:"Pick Your Dates", desc:"Select pickup and return dates. See real-time availability — no waiting, no back-and-forth." },
              { num:"03", icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>, title:"Book & Pay", desc:"Secure checkout in seconds. All-inclusive pricing — zero hidden fees, zero surprises." },
              { num:"04", icon:<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m4 4H11a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/></svg>, title:"Hit the Road", desc:"Pick up your car and drive. Every vehicle is cleaned, inspected, and fully fueled." },
            ].map((step) => (
              <div key={step.num} className="how-step scroll-animate">
                <div className="how-icon">{step.icon}</div>
                <div className="how-num">{step.num}</div>
                <div className="how-title">{step.title}</div>
                <p className="how-desc">{step.desc}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", marginTop: 40 }}>
            <Link className="hero-btn-primary" to="/how-it-works">
              Learn More
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section">
        <div className="section-header">
          <div>
            <div className="section-eyebrow">Reviews</div>
            <h2 className="section-title">What Our Drivers<br />Are Saying</h2>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="#D4A853" stroke="#D4A853" strokeWidth="1.5"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>
            <span style={{ fontFamily:"'Syne',sans-serif", fontWeight:800, fontSize:18 }}>4.8</span>
            <span style={{ color:"var(--muted)", fontSize:13 }}>from 1,200+ reviews</span>
          </div>
        </div>
        
        {/* Horizontal scrolling reviews container */}
        <div className="reviews-scroll-container" ref={reviewsScrollRef}>
          <div className="reviews-scroll-track">
            {TESTIMONIALS.map((t, idx) => (
              <div key={t.id} className="testi-card-horizontal scroll-animate">
                <div className="testi-quote">"</div>
                <p className="testi-text">{t.text}</p>
                <div style={{ marginBottom: 16 }}><Stars r={t.rating} size={15} /></div>
                <div className="testi-author">
                  <img src={t.avatar} alt={t.name} className="testi-avatar" />
                  <div><div className="testi-name">{t.name}</div><div className="testi-city">{t.city}</div></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <div className="cta-section section-animate">
        <div className="cta-inner">
          <div className="cta-glow" />
          <div>
            <h2 className="cta-title">Ready to hit the road?</h2>
            <p className="cta-sub">Join thousands of happy drivers across India. Transparent pricing, verified cars, 24/7 support.</p>
          </div>
          <div className="cta-actions">
            <Link className="hero-btn-primary" to="/signup">Get Started Free</Link>
            <Link className="hero-btn-secondary" to="/about">About Us</Link>
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

export default HomePage;