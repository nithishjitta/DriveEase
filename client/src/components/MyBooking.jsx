import React, { useEffect, useState } from "react";

const STATUS_CONFIG = {
  Confirmed: { color: "var(--green)",  bg: "rgba(61,207,130,0.08)",  border: "rgba(61,207,130,0.2)",  label: "Confirmed" },
  Pending:   { color: "#F5A623",        bg: "rgba(245,166,35,0.08)",  border: "rgba(245,166,35,0.2)",  label: "Pending"   },
  Cancelled: { color: "var(--red)",    bg: "rgba(224,82,82,0.08)",   border: "rgba(224,82,82,0.2)",   label: "Cancelled" },
  Completed: { color: "var(--muted)",  bg: "var(--surface2)",        border: "var(--border)",         label: "Completed" },
};

function MyBooking() {
  const [bookings, setBookings] = useState([]);
  const [activeFilter, setActiveFilter] = useState("All");

  const fetchBookings = async () => {
    setBookings([
      {
        id: 1,
        car: "Toyota Camry",
        type: "Sedan",
        image: "https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=600&q=80",
        date: "2024-07-15",
        returnDate: "2024-07-18",
        status: "Confirmed",
        price: 4200,
        days: 3,
        city: "Hyderabad",
        bookingId: "DE-001234",
      },
      {
        id: 2,
        car: "Honda Accord",
        type: "Sedan",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=600&q=80",
        date: "2024-08-01",
        returnDate: "2024-08-03",
        status: "Pending",
        price: 3600,
        days: 2,
        city: "Mumbai",
        bookingId: "DE-001235",
      },
      {
        id: 3,
        car: "BMW 5 Series",
        type: "Luxury",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=600&q=80",
        date: "2024-06-10",
        returnDate: "2024-06-12",
        status: "Completed",
        price: 9800,
        days: 2,
        city: "Bangalore",
        bookingId: "DE-001198",
      },
      {
        id: 4,
        car: "Hyundai Creta",
        type: "SUV",
        image: "https://images.unsplash.com/photo-1543796076-c8a8a6213d9e?w=600&q=80",
        date: "2024-09-05",
        returnDate: "2024-09-08",
        status: "Cancelled",
        price: 5100,
        days: 3,
        city: "Delhi",
        bookingId: "DE-001267",
      },
    ]);
  };

  useEffect(() => { fetchBookings(); }, []);

  const filters = ["All", "Confirmed", "Pending", "Completed", "Cancelled"];

  const filtered = activeFilter === "All"
    ? bookings
    : bookings.filter(b => b.status === activeFilter);

  const formatDate = (d) => new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });

  return (
    <div className="page">
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "48px 48px 80px" }}>

        {/* ── HEADER ── */}
        <div style={{ marginBottom: 36 }}>
          <div className="section-eyebrow" style={{ marginBottom: 8 }}>My Bookings</div>
          <h2 className="section-title">View and Manage Your Bookings</h2>
        </div>

        {/* ── SUMMARY CARDS ── */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 36 }}>
          {[
            { label: "Total Bookings", value: bookings.length, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, color: "var(--gold)" },
            { label: "Confirmed",      value: bookings.filter(b => b.status === "Confirmed").length,  icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>, color: "var(--green)" },
            { label: "Pending",        value: bookings.filter(b => b.status === "Pending").length,    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, color: "#F5A623" },
            { label: "Total Spent",    value: `₹${bookings.filter(b => b.status !== "Cancelled").reduce((s, b) => s + b.price * b.days, 0).toLocaleString("en-IN")}`, icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, color: "var(--gold)" },
          ].map(s => (
            <div key={s.label} style={{
              background: "var(--surface)", border: "1px solid var(--border)",
              borderRadius: 16, padding: "20px 20px",
              transition: "border-color .2s, transform .2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ fontSize: 12, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 700 }}>{s.label}</div>
                <div style={{ width: 34, height: 34, borderRadius: 10, background: "rgba(212,168,83,0.08)", border: "1px solid rgba(212,168,83,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                  {s.icon}
                </div>
              </div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 26, fontWeight: 800, color: s.color }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* ── FILTER PILLS ── */}
        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {filters.map(f => (
            <button key={f} onClick={() => setActiveFilter(f)} style={{
              padding: "7px 18px", borderRadius: 40, border: "1px solid",
              borderColor: activeFilter === f ? "var(--gold)" : "var(--border)",
              background: activeFilter === f ? "rgba(212,168,83,0.1)" : "transparent",
              color: activeFilter === f ? "var(--gold)" : "var(--muted)",
              fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all .2s",
            }}>
              {f}
              {f !== "All" && (
                <span style={{ marginLeft: 6, fontSize: 11, opacity: 0.7 }}>
                  ({bookings.filter(b => b.status === f).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* ── BOOKING CARDS ── */}
        {filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--muted)" }}>
            <div style={{ marginBottom: 16 }}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" style={{ opacity: 0.3 }}>
                <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div style={{ fontSize: 15, fontWeight: 600 }}>No {activeFilter !== "All" ? activeFilter.toLowerCase() : ""} bookings found</div>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {filtered.map(booking => {
              const st = STATUS_CONFIG[booking.status] || STATUS_CONFIG.Pending;
              return (
                <div key={booking.id} style={{
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 20, overflow: "hidden",
                  display: "grid", gridTemplateColumns: "200px 1fr auto",
                  transition: "border-color .2s, transform .2s",
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(212,168,83,0.25)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.transform = "translateY(0)"; }}
                >
                  {/* Car image */}
                  <div style={{ position: "relative", overflow: "hidden" }}>
                    <img
                      src={booking.image}
                      alt={booking.car}
                      style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transition: "transform .4s ease" }}
                      onMouseEnter={e => e.target.style.transform = "scale(1.05)"}
                      onMouseLeave={e => e.target.style.transform = "scale(1)"}
                    />
                    <div style={{ position: "absolute", top: 10, left: 10, background: "rgba(8,9,12,0.7)", backdropFilter: "blur(8px)", border: "1px solid rgba(212,168,83,0.3)", borderRadius: 30, padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "var(--gold)", letterSpacing: ".5px" }}>
                      {booking.type}
                    </div>
                  </div>

                  {/* Booking details */}
                  <div style={{ padding: "24px 28px" }}>
                    {/* Top row */}
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
                      <div>
                        <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 18, fontWeight: 800, marginBottom: 4 }}>{booking.car}</div>
                        <div style={{ fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 5 }}>
                          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                          {booking.city}
                        </div>
                      </div>
                      {/* Status badge */}
                      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: st.bg, border: `1px solid ${st.border}`, borderRadius: 30, padding: "4px 12px" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: st.color }} />
                        <span style={{ fontSize: 12, fontWeight: 700, color: st.color }}>{st.label}</span>
                      </div>
                    </div>

                    {/* Info grid */}
                    <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                      {[
                        { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "Pickup", value: formatDate(booking.date) },
                        { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>, label: "Return", value: formatDate(booking.returnDate) },
                        { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, label: "Duration", value: `${booking.days} day${booking.days > 1 ? "s" : ""}` },
                        { icon: <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg>, label: "Booking ID", value: booking.bookingId },
                      ].map(item => (
                        <div key={item.label}>
                          <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "0.8px", fontWeight: 700, marginBottom: 4, display: "flex", alignItems: "center", gap: 5 }}>
                            <span style={{ color: "var(--gold)" }}>{item.icon}</span>
                            {item.label}
                          </div>
                          <div style={{ fontSize: 13, fontWeight: 600 }}>{item.value}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right — price + actions */}
                  <div style={{ padding: "24px 24px", borderLeft: "1px solid var(--border)", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "space-between", minWidth: 160 }}>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ fontSize: 11, color: "var(--muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: 4 }}>Total</div>
                      <div style={{ fontFamily: "'Syne', sans-serif", fontSize: 22, fontWeight: 800, color: "var(--gold)" }}>
                        ₹{(booking.price * booking.days).toLocaleString("en-IN")}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 2 }}>₹{booking.price.toLocaleString("en-IN")}/day</div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
                      <button style={{
                        width: "100%", padding: "9px 0", borderRadius: 10,
                        background: "var(--gold)", color: "#08090C",
                        border: "none", fontSize: 12, fontWeight: 700,
                        cursor: "pointer", transition: "all .2s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "var(--gold2)"}
                        onMouseLeave={e => e.currentTarget.style.background = "var(--gold)"}
                      >
                        View Details
                      </button>
                      {booking.status === "Confirmed" || booking.status === "Pending" ? (
                        <button style={{
                          width: "100%", padding: "9px 0", borderRadius: 10,
                          background: "transparent", color: "var(--red)",
                          border: "1px solid rgba(224,82,82,0.3)", fontSize: 12, fontWeight: 700,
                          cursor: "pointer", transition: "all .2s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(224,82,82,0.08)"; e.currentTarget.style.borderColor = "var(--red)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(224,82,82,0.3)"; }}
                        >
                          Cancel
                        </button>
                      ) : booking.status === "Completed" ? (
                        <button style={{
                          width: "100%", padding: "9px 0", borderRadius: 10,
                          background: "transparent", color: "var(--gold)",
                          border: "1px solid rgba(212,168,83,0.3)", fontSize: 12, fontWeight: 700,
                          cursor: "pointer", transition: "all .2s",
                        }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,168,83,0.08)"; e.currentTarget.style.borderColor = "var(--gold)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(212,168,83,0.3)"; }}
                        >
                          Book Again
                        </button>
                      ) : null}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBooking;