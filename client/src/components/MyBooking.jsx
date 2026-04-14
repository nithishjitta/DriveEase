import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BOOKINGS = [
  { id:1, car:"Toyota Camry",  image:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=500&q=80", pickup:"Jul 15, 2024", returnD:"Jul 18, 2024", location:"Hyderabad", status:"Confirmed", total:12600, days:3, host:"Rahul M.", hostAvatar:"https://i.pravatar.cc/40?img=12" },
  { id:2, car:"Honda Accord",  image:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=500&q=80", pickup:"Aug 01, 2024", returnD:"Aug 03, 2024", location:"Mumbai",    status:"Pending",   total:7200,  days:2, host:"Priya S.", hostAvatar:"https://i.pravatar.cc/40?img=5"  },
  { id:3, car:"BMW 5 Series",  image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=500&q=80", pickup:"Jun 10, 2024", returnD:"Jun 12, 2024", location:"Bangalore",  status:"Completed", total:19600, days:2, host:"Arun K.", hostAvatar:"https://i.pravatar.cc/40?img=8"  },
  { id:4, car:"Maruti Swift",  image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=500&q=80", pickup:"May 05, 2024", returnD:"May 08, 2024", location:"Delhi",      status:"Completed", total:5400,  days:3, host:"Sneha D.", hostAvatar:"https://i.pravatar.cc/40?img=9"  },
  { id:5, car:"Hyundai i20",   image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=500&q=80", pickup:"Apr 20, 2024", returnD:"Apr 22, 2024", location:"Chennai",    status:"Cancelled", total:4800,  days:2, host:"Vikram R.", hostAvatar:"https://i.pravatar.cc/40?img=15" },
];

const STATUS = {
  Confirmed:{ color:"#3DCF82", bg:"rgba(61,207,130,.09)",  border:"rgba(61,207,130,.22)" },
  Pending:  { color:"#F5A623", bg:"rgba(245,166,35,.09)",  border:"rgba(245,166,35,.22)" },
  Completed:{ color:"#7A7A8A", bg:"rgba(122,122,138,.09)", border:"rgba(122,122,138,.18)" },
  Cancelled:{ color:"#E05252", bg:"rgba(224,82,82,.09)",   border:"rgba(224,82,82,.22)" },
};

function Badge({ status }) {
  const s = STATUS[status] || STATUS.Pending;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:s.bg, border:`1px solid ${s.border}`, borderRadius:20, padding:"4px 12px", fontSize:11, fontWeight:700, color:s.color, whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:s.color }} />{status}
    </span>
  );
}

const FILTERS = ["All","Confirmed","Pending","Completed","Cancelled"];

export default function MyBooking({ user }) {
  const [filter, setFilter]   = useState("All");
  const [expanded, setExpanded] = useState(null);
  const navigate = useNavigate();

  const shown = filter === "All" ? BOOKINGS : BOOKINGS.filter(b => b.status === filter);

  const counts = FILTERS.reduce((acc, f) => ({
    ...acc,
    [f]: f === "All" ? BOOKINGS.length : BOOKINGS.filter(b => b.status === f).length,
  }), {});

  return (
    <div className="page">
      <style>{`
        .bk-card{transition:border-color .2s,box-shadow .2s}
        .bk-card:hover{border-color:rgba(212,168,83,.28)!important;box-shadow:0 8px 32px rgba(0,0,0,.18)}
        .bk-pill:hover{border-color:rgba(212,168,83,.5)!important;color:var(--text)!important}
        .bk-btn:hover{background:var(--gold2)!important;transform:translateY(-1px)}
        .bk-ghost:hover{border-color:var(--gold)!important;color:var(--gold)!important}
        @keyframes bkIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .bk-fade{animation:bkIn .32s ease both}
        .bk-detail{overflow:hidden;transition:max-height .35s ease,opacity .3s ease}
      `}</style>

      <div style={{ maxWidth:920, margin:"0 auto", padding:"52px 24px 80px" }}>

        {/* Header */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:32, flexWrap:"wrap", gap:16 }}>
          <div>
            <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(22px,3vw,30px)", fontWeight:900, letterSpacing:"-0.8px", marginBottom:6 }}>My Bookings</h1>
            <div style={{ fontSize:13, color:"var(--muted)" }}>Track and manage all your car rentals in one place.</div>
          </div>
          <button onClick={() => navigate("/")} style={{ display:"flex", alignItems:"center", gap:7, background:"var(--gold)", border:"none", borderRadius:10, padding:"10px 20px", fontSize:13, fontWeight:800, color:"#08090C", cursor:"pointer", fontFamily:"'Syne',sans-serif", transition:"all .18s" }}
            onMouseEnter={e => e.currentTarget.style.background="var(--gold2)"}
            onMouseLeave={e => e.currentTarget.style.background="var(--gold)"}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            Book a Car
          </button>
        </div>

        {/* Summary pills */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12, marginBottom:28 }}>
          {[
            { label:"Total Bookings",  value:BOOKINGS.length,                                       color:"var(--gold)"  },
            { label:"Upcoming",        value:BOOKINGS.filter(b=>b.status==="Confirmed").length,      color:"#3DCF82"      },
            { label:"Completed",       value:BOOKINGS.filter(b=>b.status==="Completed").length,      color:"var(--muted)" },
            { label:"Total Spent",     value:`₹${BOOKINGS.reduce((s,b)=>s+b.total,0).toLocaleString("en-IN")}`, color:"var(--gold)" },
          ].map(s => (
            <div key={s.label} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:16, padding:"16px 18px", textAlign:"center" }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:900, color:s.color, marginBottom:4 }}>{s.value}</div>
              <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".8px", fontWeight:700 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {/* Filter pills */}
        <div style={{ display:"flex", gap:8, marginBottom:22, flexWrap:"wrap" }}>
          {FILTERS.map(f => (
            <button key={f} className="bk-pill" onClick={() => setFilter(f)} style={{
              padding:"7px 16px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:700,
              border:`1px solid ${filter===f ? "var(--gold)" : "var(--border)"}`,
              background: filter===f ? "rgba(212,168,83,.1)" : "transparent",
              color:      filter===f ? "var(--gold)"         : "var(--muted)",
              transition:"all .15s",
            }}>
              {f} <span style={{ opacity:.7 }}>({counts[f]})</span>
            </button>
          ))}
        </div>

        {/* Booking cards */}
        <div className="bk-fade" style={{ display:"flex", flexDirection:"column", gap:16 }}>
          {shown.length === 0 && (
            <div style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, padding:56, textAlign:"center" }}>
              <div style={{ fontSize:48, marginBottom:14 }}>📭</div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:17, fontWeight:700, marginBottom:6 }}>No {filter} bookings</div>
              <div style={{ fontSize:13, color:"var(--muted)", marginBottom:20 }}>Ready for your next trip?</div>
              <button onClick={() => navigate("/")} style={{ background:"var(--gold)", border:"none", borderRadius:10, padding:"11px 24px", fontSize:13, fontWeight:800, color:"#08090C", cursor:"pointer", fontFamily:"'Syne',sans-serif" }}>
                Browse Cars
              </button>
            </div>
          )}

          {shown.map(b => {
            const open = expanded === b.id;
            return (
              <div key={b.id} className="bk-card" style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:20, overflow:"hidden" }}>

                {/* Main row */}
                <div style={{ display:"grid", gridTemplateColumns:"180px 1fr auto", minHeight:150 }}>
                  {/* Image */}
                  <div style={{ overflow:"hidden", position:"relative", flexShrink:0 }}>
                    <img src={b.image} alt={b.car} style={{ width:"100%", height:"100%", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent 55%,rgba(0,0,0,.2))" }} />
                  </div>

                  {/* Info */}
                  <div style={{ padding:"20px 24px", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10, flexWrap:"wrap" }}>
                        <span style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800 }}>{b.car}</span>
                        <Badge status={b.status} />
                      </div>
                      <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                        {[["📍",b.location],["📅",`${b.pickup} → ${b.returnD}`],["⏱",`${b.days} day${b.days>1?"s":""}`]].map(([icon,val]) => (
                          <div key={val} style={{ display:"flex", alignItems:"center", gap:5, background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:8, padding:"5px 11px", fontSize:12, fontWeight:600 }}>
                            <span>{icon}</span><span>{val}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Host */}
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:12 }}>
                      <img src={b.hostAvatar} alt={b.host} style={{ width:28, height:28, borderRadius:"50%", objectFit:"cover", border:"1px solid var(--border)" }} />
                      <span style={{ fontSize:12, color:"var(--muted)" }}>Hosted by <strong style={{ color:"var(--text)" }}>{b.host}</strong></span>
                    </div>
                  </div>

                  {/* Price + actions */}
                  <div style={{ padding:20, borderLeft:"1px solid var(--border)", display:"flex", flexDirection:"column", justifyContent:"space-between", minWidth:148 }}>
                    <div>
                      <div style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1px", fontWeight:700, marginBottom:4 }}>Total Paid</div>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:900, color:"var(--gold)" }}>₹{b.total.toLocaleString("en-IN")}</div>
                      <div style={{ fontSize:11, color:"var(--muted)", marginTop:2 }}>₹{Math.round(b.total/b.days).toLocaleString("en-IN")}/day</div>
                    </div>

                    <div style={{ display:"flex", flexDirection:"column", gap:7, marginTop:12 }}>
                      <button className="bk-btn" style={{ background:"var(--gold)", color:"#08090C", border:"none", borderRadius:9, padding:"9px 0", fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:"'Syne',sans-serif", transition:"all .18s" }}
                        onClick={() => setExpanded(open ? null : b.id)}
                      >
                        {open ? "Hide Details" : "View Details"}
                      </button>
                      {b.status === "Completed" && (
                        <button className="bk-ghost" style={{ background:"transparent", border:"1px solid var(--border)", borderRadius:9, padding:"8px 0", fontSize:11, fontWeight:700, cursor:"pointer", color:"var(--text)", transition:"all .18s" }}>
                          Rebook
                        </button>
                      )}
                      {b.status === "Pending" && (
                        <button style={{ background:"transparent", border:"1px solid rgba(224,82,82,.25)", borderRadius:9, padding:"8px 0", fontSize:11, fontWeight:700, cursor:"pointer", color:"var(--red)", transition:"all .18s" }}>
                          Cancel
                        </button>
                      )}
                      {b.status === "Completed" && (
                        <button style={{ background:"transparent", border:"1px solid rgba(245,166,35,.25)", borderRadius:9, padding:"8px 0", fontSize:11, fontWeight:700, cursor:"pointer", color:"#F5A623", transition:"all .18s" }}>
                          ★ Rate Trip
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Expandable details */}
                {open && (
                  <div style={{ borderTop:"1px solid var(--border)", padding:"20px 24px", background:"var(--surface2)", display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:16 }}>
                    {[
                      ["Booking ID",    `#DRV-${String(b.id).padStart(5,"0")}`],
                      ["Pickup Date",   b.pickup],
                      ["Return Date",   b.returnD],
                      ["Duration",      `${b.days} days`],
                      ["Location",      b.location],
                      ["Payment",       "Paid Online"],
                    ].map(([label, value]) => (
                      <div key={label} style={{ background:"var(--surface)", border:"1px solid var(--border)", borderRadius:10, padding:"12px 14px" }}>
                        <div style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1px", fontWeight:700, marginBottom:4 }}>{label}</div>
                        <div style={{ fontSize:13, fontWeight:700 }}>{value}</div>
                      </div>
                    ))}
                  </div>
                )}

              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}