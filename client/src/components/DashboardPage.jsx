import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ─── Mock data (replace with your real API calls) ─── */
const BOOKINGS = [
  { id:1, car:"Toyota Camry",  image:"https://images.unsplash.com/photo-1621007947382-bb3c3994e3fb?w=400&q=80", pickup:"Jul 15", returnD:"Jul 18", location:"Hyderabad", status:"Confirmed", total:12600, days:3 },
  { id:2, car:"Honda Accord",  image:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80", pickup:"Aug 01", returnD:"Aug 03", location:"Mumbai",    status:"Pending",   total:7200,  days:2 },
  { id:3, car:"BMW 5 Series",  image:"https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400&q=80", pickup:"Jun 10", returnD:"Jun 12", location:"Bangalore",  status:"Completed", total:19600, days:2 },
  { id:4, car:"Maruti Swift",  image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=400&q=80", pickup:"May 05", returnD:"May 08", location:"Delhi",      status:"Completed", total:5400,  days:3 },
  { id:5, car:"Hyundai i20",   image:"https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=400&q=80", pickup:"Apr 20", returnD:"Apr 22", location:"Chennai",    status:"Cancelled", total:4800,  days:2 },
];

const MY_CARS = [
  { id:1, name:"Maruti Swift",  type:"Hatchback", price:1800, status:"Listed",   bookings:12, rating:4.7, image:"https://images.unsplash.com/photo-1549317661-bd32c8ce0729?w=400&q=80", earned:43200 },
  { id:2, name:"Hyundai Creta", type:"SUV",       price:3200, status:"Listed",   bookings:8,  rating:4.9, image:"https://images.unsplash.com/photo-1543796076-c8a8a6213d9e?w=400&q=80", earned:51200 },
  { id:3, name:"Honda City",    type:"Sedan",     price:2400, status:"Unlisted", bookings:5,  rating:4.5, image:"https://images.unsplash.com/photo-1617788138017-80ad40651399?w=400&q=80", earned:24000 },
];

const MONTHLY = [
  { month:"Feb", amt:8200  },
  { month:"Mar", amt:11400 },
  { month:"Apr", amt:9800  },
  { month:"May", amt:14200 },
  { month:"Jun", amt:10600 },
  { month:"Jul", amt:18400 },
];

const RECENT_ACTIVITY = [
  { id:1, type:"booking",  text:"New booking for Toyota Camry",  time:"2 hours ago",  icon:"calendar" },
  { id:2, type:"payment",  text:"Payment received ₹12,600",      time:"2 hours ago",  icon:"wallet" },
  { id:3, type:"review",   text:"5★ review on Maruti Swift",     time:"1 day ago",    icon:"star" },
  { id:4, type:"booking",  text:"Booking completed — BMW 5 Ser", time:"3 days ago",   icon:"check" },
  { id:5, type:"listing",  text:"Hyundai Creta listing approved", time:"5 days ago",  icon:"car" },
];

/* ─── Status helpers ─── */
const STATUS = {
  Confirmed:{ color:"#3DCF82", bg:"rgba(61,207,130,0.09)",  border:"rgba(61,207,130,0.22)" },
  Pending:  { color:"#F5A623", bg:"rgba(245,166,35,0.09)",  border:"rgba(245,166,35,0.22)" },
  Completed:{ color:"#7A7A8A", bg:"rgba(122,122,138,0.09)", border:"rgba(122,122,138,0.18)" },
  Cancelled:{ color:"#E05252", bg:"rgba(224,82,82,0.09)",   border:"rgba(224,82,82,0.22)" },
  Listed:   { color:"#3DCF82", bg:"rgba(61,207,130,0.09)",  border:"rgba(61,207,130,0.22)" },
  Unlisted: { color:"#7A7A8A", bg:"rgba(122,122,138,0.09)", border:"rgba(122,122,138,0.18)" },
};

function Badge({ status }) {
  const s = STATUS[status] || STATUS.Pending;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:s.bg, border:`1px solid ${s.border}`, borderRadius:20, padding:"3px 10px", fontSize:11, fontWeight:700, color:s.color, whiteSpace:"nowrap" }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:s.color }} />{status}
    </span>
  );
}

/* ─── Mini bar chart ─── */
function BarChart({ data }) {
  const max = Math.max(...data.map(d => d.amt));
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:72, padding:"0 4px" }}>
      {data.map((d, i) => (
        <div key={d.month} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
          <div title={`₹${d.amt.toLocaleString("en-IN")}`} style={{
            width:"100%", borderRadius:"4px 4px 0 0", minHeight:4,
            height:`${Math.round((d.amt / max) * 60)}px`,
            background: i === data.length-1
              ? "linear-gradient(180deg,var(--gold),var(--gold2))"
              : "rgba(212,168,83,0.2)",
            transition:"height 0.6s ease",
            cursor:"default",
          }} />
          <span style={{ fontSize:9, color:"var(--muted)", fontWeight:700 }}>{d.month}</span>
        </div>
      ))}
    </div>
  );
}

/* ─── Icon SVGs ─── */
const Icon = {
  dashboard: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19h5v-8H4z"/><path d="M10 19h5V8h-5z"/><path d="M16 19h4V12h-4z"/></svg>,
  grid: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  calendar: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  car: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l2-5h14l2 5v6a1 1 0 0 1-1 1h-1a2 2 0 1 1-4 0H9a2 2 0 1 1-4 0H4a1 1 0 0 1-1-1v-6z"/><path d="M7 12V7"/><path d="M17 12V7"/></svg>,
  rupee: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 5h6a3 3 0 0 1 0 6H8v2h5a3 3 0 0 1 0 6H7"/><line x1="12" y1="1" x2="12" y2="5"/><line x1="8" y1="12" x2="14" y2="12"/></svg>,
  plus: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L8 18l-4 1 1-4 11.5-11.5z"/></svg>,
  up: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round"><polyline points="18 15 12 9 6 15"/></svg>,
  star: <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26"/></svg>,
  route: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-4.5-7-10a7 7 0 0 1 14 0c0 5.5-7 10-7 10z"/><circle cx="12" cy="10" r="2"/></svg>,
  key: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="7" cy="17" r="3"/><path d="M10 17h6"/><path d="M14 17l2-2"/><path d="M14 17l2 2"/></svg>,
  wallet: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="18" height="12" rx="3"/><path d="M6 9h12"/><circle cx="18" cy="14" r="2"/></svg>,
  check: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>,
  chart: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19h16"/><path d="M8 14v5"/><path d="M12 10v9"/><path d="M16 6v13"/></svg>,
  userEdit: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M8 11a4 4 0 1 1 8 0 4 4 0 0 1-8 0"/><path d="M4 21v-2a4 4 0 0 1 4-4h4"/><path d="m16 8 4-4 4 4-4 4z"/></svg>,
  carPlus: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 13h1l1-3h12l1 3h1"/><path d="M9 13v5"/><path d="M15 13v5"/><path d="M8 18h8"/><path d="M7 6h10"/><path d="M12 3v6"/></svg>,
  pin: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-6-5.14-6-9a6 6 0 1 1 12 0c0 3.86-6 9-6 9z"/><circle cx="12" cy="10" r="2.5"/></svg>,
  flag: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 22V6h12l-2 4 2 4H4"/></svg>,
  location: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"/><circle cx="12" cy="9" r="2.5"/></svg>,
};

const TABS = [
  { key:"overview",  label:"Overview",    icon:Icon.dashboard },
  { key:"bookings",  label:"My Bookings", icon:Icon.calendar   },
  { key:"listings",  label:"My Cars",     icon:Icon.car   },
  { key:"earnings",  label:"Earnings",    icon:Icon.rupee },
];

export default function DashboardPage({ user, setUser }) {
  const [tab, setTab]           = useState("overview");
  const [bFilter, setBFilter]   = useState("All");
  const [carStatus, setCarStatus] = useState(
    () => Object.fromEntries(MY_CARS.map(c => [c.id, c.status]))
  );
  const navigate = useNavigate();

  const initials = (user?.firstname || user?.name || "U")[0]?.toUpperCase();
  const totalEarned = MY_CARS.reduce((s, c) => s + c.earned, 0);
  const listedCount = Object.values(carStatus).filter(s => s === "Listed").length;
  const completedTrips = BOOKINGS.filter(b => b.status === "Completed").length;

  const toggleCar = (id) =>
    setCarStatus(prev => ({ ...prev, [id]: prev[id] === "Listed" ? "Unlisted" : "Listed" }));

  const filteredBookings = bFilter === "All"
    ? BOOKINGS
    : BOOKINGS.filter(b => b.status === bFilter);

  /* ── shared styles ── */
  const card = {
    background:"var(--surface)", border:"1px solid var(--border)",
    borderRadius:20, overflow:"hidden",
  };
  const goldBtn = {
    display:"flex", alignItems:"center", gap:7,
    background:"var(--gold)", border:"none", borderRadius:10,
    padding:"10px 20px", fontSize:13, fontWeight:800,
    color:"#08090C", cursor:"pointer", fontFamily:"'Syne',sans-serif",
  };
  const ghostBtn = {
    display:"flex", alignItems:"center", gap:7,
    background:"transparent", border:"1px solid var(--border)",
    borderRadius:10, padding:"10px 18px", fontSize:13, fontWeight:600,
    color:"var(--text)", cursor:"pointer",
  };

  return (
    <div className="page">
      <style>{`
        .db-hover{transition:border-color .2s,transform .2s,box-shadow .2s}
        .db-hover:hover{border-color:rgba(212,168,83,.3)!important;transform:translateY(-2px);box-shadow:0 12px 36px rgba(0,0,0,.2)}
        .db-row:hover{background:rgba(212,168,83,.025)!important}
        .db-pill:hover{border-color:rgba(212,168,83,.5)!important;color:var(--text)!important}
        .db-car:hover{border-color:rgba(212,168,83,.35)!important;transform:translateY(-3px);box-shadow:0 16px 48px rgba(0,0,0,.25)}
        @keyframes dbIn{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:translateY(0)}}
        .db-fade{animation:dbIn .3s ease both}
      `}</style>

      <div style={{ maxWidth:1160, margin:"0 auto", padding:"52px 24px 80px" }}>

        {/* ── HEADER ── */}
        <div style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:36, flexWrap:"wrap", gap:16, padding:"26px 28px", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:28, overflow:"hidden" }}>
          <div style={{ position:"absolute", inset:0, background:"radial-gradient(circle at top left, rgba(212,168,83,.12), transparent 35%), radial-gradient(circle at bottom right, rgba(255,255,255,.08), transparent 22%)", pointerEvents:"none" }} />
          <div style={{ position:"relative", display:"flex", alignItems:"center", gap:16, zIndex:1 }}>
            <div style={{ position:"relative", width:72, height:72, zIndex:1 }}>
              <div style={{ position:"absolute", top:0, left:0, width:"100%", height:"100%", borderRadius:20, background:"linear-gradient(135deg, rgba(212,168,83,.12), transparent 55%)", opacity:0.95 }} />
              <div style={{ position:"relative", width:58, height:58, borderRadius:"50%", border:"2px solid rgba(212,168,83,.4)", overflow:"hidden", background:"var(--surface)" }}>
                {user?.imageUrl
                  ? <img src={user.imageUrl} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <div style={{ width:"100%", height:"100%", background:"linear-gradient(135deg,rgba(212,168,83,.22),rgba(212,168,83,.05))", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:800, color:"var(--gold)" }}>{initials}</div>
                }
              </div>
              <div style={{ position:"absolute", bottom:12, right:12, width:14, height:14, borderRadius:"50%", background:"var(--green)", border:"2.5px solid var(--bg)" }} />
            </div>
            <div style={{ position:"relative", zIndex:1 }}>
              <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1.2px", fontWeight:700, marginBottom:10 }}>Welcome back</div>
              <h1 style={{ fontFamily:"'Syne',sans-serif", fontSize:"clamp(20px,3vw,28px)", fontWeight:900, letterSpacing:"-0.8px", lineHeight:1 }}>
                {user?.firstname || user?.name || "Driver"}
              </h1>
            </div>
          </div>

          <div style={{ position:"relative", display:"flex", gap:10, zIndex:1 }}>
            <button className="db-ghost" onClick={() => navigate("/update-profile")} style={ghostBtn}>
              {Icon.edit} Edit Profile
            </button>
            <button className="db-gbtn" onClick={() => navigate("/list-your-car")} style={goldBtn}>
              {Icon.plus} List a Car
            </button>
          </div>
        </div>

        {/* ── TABS ── */}
        <div style={{ display:"flex", gap:4, justifyContent:"center", width:"fit-content", margin:"0 auto", background:"var(--surface)", border:"1px solid var(--border)", borderRadius:14, padding:"10px 5px 14px", marginBottom:36, overflowX:"auto" }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setTab(t.key)} style={{
              display:"flex", alignItems:"center", gap:7,
              padding:"9px 18px", borderRadius:10, border:"none", cursor:"pointer",
              background: tab === t.key ? "var(--gold)" : "transparent",
              color:       tab === t.key ? "#08090C"     : "var(--muted)",
              fontSize:13, fontWeight:700, fontFamily:"'Syne',sans-serif",
              whiteSpace:"nowrap", transition:"all .18s",
            }}>
              <span style={{ opacity: tab === t.key ? 1 : 0.7 }}>{t.icon}</span>
              {t.label}
            </button>
          ))}
        </div>

        {/* ══════════════ OVERVIEW ══════════════ */}
        {tab === "overview" && (
          <div className="db-fade">

            {/* Stat cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:24 }}>
              {[
                { label:"Total Trips",  value:BOOKINGS.length,                            sub:"all time",       color:"var(--gold)", icon:Icon.route },
                { label:"Cars Listed",  value:listedCount,                                sub:"actively earning",color:"#3DCF82",    icon:Icon.grid },
                { label:"Total Earned", value:`₹${(totalEarned/1000).toFixed(1)}K`,       sub:"from hosting",   color:"var(--gold)", icon:Icon.wallet },
                { label:"Host Rating",  value:"4.8★",                                     sub:"avg across cars", color:"#F5A623",    icon:Icon.star },
              ].map(s => (
                <div key={s.label} className="db-hover" style={{ ...card, borderRadius:18, padding:"22px 20px", position:"relative", overflow:"hidden", cursor:"default" }}>
                  <div style={{ position:"absolute", top:-14, right:-14, width:52, height:52, borderRadius:"50%", background:"radial-gradient(circle,rgba(212,168,83,.06),transparent 70%)" }} />
                  <div style={{ width:52, height:52, marginBottom:14, borderRadius:18, display:"grid", placeItems:"center", background:"rgba(212,168,83,.12)", color:"var(--gold)" }}>{s.icon}</div>
                  <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1px", fontWeight:700, marginBottom:8 }}>{s.label}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:900, color:s.color, lineHeight:1 }}>{s.value}</div>
                  <div style={{ fontSize:11, color:"var(--muted)", marginTop:4 }}>{s.sub}</div>
                </div>
              ))}
            </div>

            {/* Two-col section */}
            <div style={{ display:"grid", gridTemplateColumns:"1.1fr 0.9fr", gap:20, marginBottom:20 }}>

              {/* Recent Bookings */}
              <div style={card}>
                <div style={{ padding:"18px 22px 14px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid var(--border)" }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800 }}>Recent Bookings</div>
                  <button onClick={() => setTab("bookings")} style={{ background:"none", border:"none", color:"var(--gold)", fontSize:12, fontWeight:700, cursor:"pointer" }}>View all →</button>
                </div>
                {BOOKINGS.slice(0,4).map((b, i) => (
                  <div key={b.id} className="db-row" style={{ display:"flex", alignItems:"center", gap:12, padding:"13px 22px", borderBottom: i < 3 ? "1px solid var(--border)" : "none", transition:"background .15s" }}>
                    <img src={b.image} alt={b.car} style={{ width:44, height:44, borderRadius:10, objectFit:"cover", flexShrink:0 }} />
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:700, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{b.car}</div>
                      <div style={{ fontSize:11, color:"var(--muted)" }}>{b.pickup} → {b.returnD} · {b.location}</div>
                    </div>
                    <div style={{ textAlign:"right", flexShrink:0 }}>
                      <Badge status={b.status} />
                      <div style={{ fontSize:12, fontWeight:700, color:"var(--gold)", marginTop:4 }}>₹{b.total.toLocaleString("en-IN")}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Right column */}
              <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

                {/* Earnings spark */}
                <div style={{ ...card, padding:"20px 22px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800 }}>Monthly Earnings</div>
                    <button onClick={() => setTab("earnings")} style={{ background:"none", border:"none", color:"var(--gold)", fontSize:12, fontWeight:700, cursor:"pointer" }}>Details →</button>
                  </div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:26, fontWeight:900, color:"var(--gold)", marginBottom:4 }}>₹18,400</div>
                  <div style={{ display:"flex", alignItems:"center", gap:5, marginBottom:14 }}>
                    <span style={{ color:"var(--green)" }}>{Icon.up}</span>
                    <span style={{ fontSize:11, color:"var(--green)", fontWeight:700 }}>+12% vs last month</span>
                  </div>
                  <BarChart data={MONTHLY} />
                </div>

                {/* Listed cars */}
                <div style={{ ...card, flex:1 }}>
                  <div style={{ padding:"14px 22px", display:"flex", justifyContent:"space-between", alignItems:"center", borderBottom:"1px solid var(--border)" }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800 }}>My Cars</div>
                    <button onClick={() => setTab("listings")} style={{ background:"none", border:"none", color:"var(--gold)", fontSize:12, fontWeight:700, cursor:"pointer" }}>Manage →</button>
                  </div>
                  {MY_CARS.map((c, i) => (
                    <div key={c.id} className="db-row" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 22px", borderBottom: i < MY_CARS.length-1 ? "1px solid var(--border)" : "none", transition:"background .15s" }}>
                      <img src={c.image} alt={c.name} style={{ width:40, height:40, borderRadius:9, objectFit:"cover", flexShrink:0 }} />
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ fontSize:13, fontWeight:700 }}>{c.name}</div>
                        <div style={{ fontSize:11, color:"var(--muted)" }}>₹{c.price}/day · {c.bookings} trips</div>
                      </div>
                      <Badge status={carStatus[c.id]} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Activity + Quick actions */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

              {/* Recent Activity */}
              <div style={card}>
                <div style={{ padding:"18px 22px 14px", borderBottom:"1px solid var(--border)", fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800 }}>Recent Activity</div>
                {RECENT_ACTIVITY.map((a, i) => (
                  <div key={a.id} className="db-row" style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 22px", borderBottom: i < RECENT_ACTIVITY.length-1 ? "1px solid var(--border)" : "none", transition:"background .15s" }}>
                    <div style={{ width:36, height:36, borderRadius:12, background:"rgba(212,168,83,.1)", border:"1px solid rgba(212,168,83,.18)", display:"flex", alignItems:"center", justifyContent:"center", color:"var(--gold)", flexShrink:0 }}>
                      {React.cloneElement(Icon[a.icon], { width:16, height:16 })}
                    </div>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:13, fontWeight:600, marginBottom:2, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.text}</div>
                      <div style={{ fontSize:11, color:"var(--muted)" }}>{a.time}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick actions */}
              <div style={{ ...card, padding:"18px 18px", display:"flex", flexDirection:"column", gap:16, background:"var(--surface)", border:"1px solid var(--border)" }}>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, padding:"4px 2px", color:"var(--text)" }}>Quick Actions</div>
                  {/* <div style={{ fontSize:12, color:"var(--muted)", lineHeight:1.5, maxWidth:320 }}>Fast dashboard shortcuts for bookings, car management, profile updates, and earnings.</div> */}
                </div>
                {[
                  { label:"View All Bookings",    sub:"Manage your trips",          icon:Icon.calendar, action:() => setTab("bookings") },
                  { label:"Add a New Car",         sub:"Start earning today",        icon:Icon.carPlus, action:() => navigate("/list-your-car") },
                  { label:"Update Profile",        sub:"Keep your info fresh",       icon:Icon.edit, action:() => navigate("/update-profile") },
                  { label:"View Earnings Report",  sub:"Monthly breakdown",          icon:Icon.chart, action:() => setTab("earnings") },
                ].map(q => (
                  <button key={q.label} onClick={q.action} style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", background:"transparent", border:"1px solid var(--border)", borderRadius:18, cursor:"pointer", textAlign:"left", transition:"all .18s", width:"100%", color:"var(--text)" }}
                  >
                    <div style={{ width:34, height:34, borderRadius:12, background:"rgba(212,168,83,.14)", border:"1px solid rgba(212,168,83,.22)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, color:"var(--gold)" }}>
                      {React.cloneElement(q.icon, { width:12, height:12 })}
                    </div>
                    <div>
                      <div style={{ fontSize:13, fontWeight:700, marginBottom:2, color:"var(--text)" }}>{q.label}</div>
                      <div style={{ fontSize:11, color:"var(--muted)" }}>{q.sub}</div>
                    </div>
                    <div style={{ marginLeft:"auto", color:"var(--muted)", fontSize:16 }}>›</div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ══════════════ BOOKINGS ══════════════ */}
        {tab === "bookings" && (
          <div className="db-fade">
            {/* Filter pills */}
            <div style={{ display:"flex", gap:8, marginBottom:20, flexWrap:"wrap" }}>
              {["All","Confirmed","Pending","Completed","Cancelled"].map(f => (
                <button key={f} className="db-pill" onClick={() => setBFilter(f)} style={{
                  padding:"7px 16px", borderRadius:20, cursor:"pointer", fontSize:12, fontWeight:700,
                  border:`1px solid ${bFilter===f ? "var(--gold)" : "var(--border)"}`,
                  background: bFilter===f ? "rgba(212,168,83,.1)" : "transparent",
                  color:      bFilter===f ? "var(--gold)"         : "var(--muted)",
                  transition:"all .15s",
                }}>{f} {f==="All" ? `(${BOOKINGS.length})` : `(${BOOKINGS.filter(b=>b.status===f).length})`}</button>
              ))}
            </div>

            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              {filteredBookings.length === 0 && (
                <div style={{ ...card, padding:48, textAlign:"center" }}>
                  <div style={{ width:72, height:72, margin:"0 auto 12px", borderRadius:22, display:"grid", placeItems:"center", background:"rgba(212,168,83,.08)", color:"var(--gold)" }}>{Icon.dashboard}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:700, marginBottom:6 }}>No {bFilter} bookings</div>
                  <div style={{ fontSize:13, color:"var(--muted)" }}>Your {bFilter.toLowerCase()} bookings will show up here.</div>
                </div>
              )}
              {filteredBookings.map(b => (
                <div key={b.id} className="db-hover" style={{ ...card, borderRadius:18, display:"grid", gridTemplateColumns:"160px 1fr 160px" }}>
                  <div style={{ overflow:"hidden", position:"relative" }}>
                    <img src={b.image} alt={b.car} style={{ width:"100%", height:"100%", objectFit:"cover", minHeight:150, display:"block" }} />
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(90deg,transparent 60%,rgba(0,0,0,.25))" }} />
                  </div>
                  <div style={{ padding:"20px 24px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
                      <span style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800 }}>{b.car}</span>
                      <Badge status={b.status} />
                    </div>
                    <div style={{ display:"flex", gap:10, flexWrap:"wrap" }}>
                      {[[Icon.pin,"Pickup",b.pickup],[Icon.flag,"Return",b.returnD],[Icon.location,"City",b.location],[Icon.calendar,"Days",`${b.days} days`]].map(([icon,label,value]) => (
                        <div key={label} style={{ background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:10, padding:"10px 12px", minWidth:110, display:"flex", flexDirection:"column", gap:6 }}>
                          <div style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:10, color:"var(--gold)", fontWeight:700, textTransform:"uppercase", letterSpacing:".6px" }}>
                            <span style={{ width:16, height:16, display:"inline-flex", alignItems:"center", justifyContent:"center" }}>{icon}</span>
                            {label}
                          </div>
                          <div style={{ fontSize:12, fontWeight:700 }}>{value}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div style={{ padding:20, borderLeft:"1px solid var(--border)", display:"flex", flexDirection:"column", justifyContent:"space-between" }}>
                    <div>
                      <div style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1px", fontWeight:700, marginBottom:4 }}>Total Paid</div>
                      <div style={{ fontFamily:"'Syne',sans-serif", fontSize:22, fontWeight:900, color:"var(--gold)" }}>₹{b.total.toLocaleString("en-IN")}</div>
                    </div>
                    <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                      <button className="db-gbtn" style={{ background:"var(--gold)", color:"#08090C", border:"none", borderRadius:9, padding:"9px", fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:"'Syne',sans-serif" }}>
                        View Details
                      </button>
                      {b.status === "Completed" && (
                        <button className="db-ghost" style={{ background:"transparent", border:"1px solid var(--border)", borderRadius:9, padding:"8px", fontSize:11, fontWeight:700, cursor:"pointer", color:"var(--text)" }}>
                          Rebook
                        </button>
                      )}
                      {b.status === "Pending" && (
                        <button style={{ background:"transparent", border:"1px solid rgba(224,82,82,.25)", borderRadius:9, padding:"8px", fontSize:11, fontWeight:700, cursor:"pointer", color:"var(--red)" }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════ MY CARS ══════════════ */}
        {tab === "listings" && (
          <div className="db-fade">
            <div style={{ display:"flex", justifyContent:"flex-end", marginBottom:20 }}>
              <button className="db-gbtn" onClick={() => navigate("/list-your-car")} style={goldBtn}>
                {Icon.plus} Add New Car
              </button>
            </div>
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:18 }}>
              {MY_CARS.map(c => (
                <div key={c.id} className="db-car" style={{ ...card, borderRadius:18, transition:"all .22s" }}>
                  <div style={{ position:"relative", overflow:"hidden" }}>
                    <img src={c.image} alt={c.name} style={{ width:"100%", aspectRatio:"16/10", objectFit:"cover", display:"block" }} />
                    <div style={{ position:"absolute", top:10, left:10 }}><Badge status={carStatus[c.id]} /></div>
                    <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top, rgba(0,0,0,.5) 0%, transparent 50%)" }} />
                    <div style={{ position:"absolute", bottom:10, left:12, fontSize:11, color:"rgba(255,255,255,.8)", fontWeight:700 }}>{c.type}</div>
                  </div>
                  <div style={{ padding:"16px 18px" }}>
                    <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:800, marginBottom:2 }}>{c.name}</div>
                    <div style={{ fontSize:12, color:"var(--muted)", marginBottom:14 }}>₹{c.price}/day</div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:14 }}>
                      {[[c.bookings,"Trips"],[c.rating > 0 ? c.rating+"★" : "—","Rating"],[`₹${(c.earned/1000).toFixed(1)}K`,"Earned"]].map(([v,l]) => (
                        <div key={l} style={{ background:"var(--surface2)", border:"1px solid var(--border)", borderRadius:10, padding:"8px 0", textAlign:"center" }}>
                          <div style={{ fontFamily:"'Syne',sans-serif", fontSize:14, fontWeight:800, color:"var(--gold)" }}>{v}</div>
                          <div style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:".5px", marginTop:2 }}>{l}</div>
                        </div>
                      ))}
                    </div>
                    <div style={{ display:"flex", gap:8 }}>
                      <button className="db-gbtn" onClick={() => navigate("/list-your-car")} style={{ flex:1, background:"var(--gold)", color:"#08090C", border:"none", borderRadius:9, padding:"9px 0", fontSize:12, fontWeight:800, cursor:"pointer", fontFamily:"'Syne',sans-serif", textAlign:"center" }}>Edit</button>
                      <button className="db-ghost" onClick={() => toggleCar(c.id)} style={{
                        flex:1, background:"transparent", borderRadius:9, padding:"9px 0",
                        fontSize:12, fontWeight:700, cursor:"pointer", textAlign:"center",
                        border: `1px solid ${carStatus[c.id]==="Listed" ? "rgba(224,82,82,.3)" : "rgba(61,207,130,.3)"}`,
                        color:  carStatus[c.id]==="Listed" ? "var(--red)" : "var(--green)",
                        transition:"all .15s",
                      }}>
                        {carStatus[c.id]==="Listed" ? "Unlist" : "List"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ══════════════ EARNINGS ══════════════ */}
        {tab === "earnings" && (
          <div className="db-fade">
            {/* top 3 cards */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14, marginBottom:24 }}>
              {[
                { label:"This Month",   value:"₹18,400", change:"+12%",     up:true  },
                { label:"Last Month",   value:"₹16,200", change:"+8%",      up:true  },
                { label:"All Time",     value:"₹94,400", change:"20 trips",  up:true  },
              ].map(s => (
                <div key={s.label} className="db-hover" style={{ ...card, borderRadius:18, padding:"24px 22px" }}>
                  <div style={{ fontSize:11, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1px", fontWeight:700, marginBottom:10 }}>{s.label}</div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:32, fontWeight:900, color:"var(--gold)", marginBottom:8 }}>{s.value}</div>
                  <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                    <span style={{ color:"var(--green)" }}>{Icon.up}</span>
                    <span style={{ fontSize:12, color:"var(--green)", fontWeight:700 }}>{s.change}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Monthly chart */}
            <div style={{ ...card, padding:"24px", marginBottom:20 }}>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800, marginBottom:20 }}>Monthly Breakdown</div>
              <div style={{ display:"flex", alignItems:"flex-end", gap:10, height:140 }}>
                {MONTHLY.map((d, i) => {
                  const max = Math.max(...MONTHLY.map(x => x.amt));
                  return (
                    <div key={d.month} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:8 }}>
                      <div style={{ fontSize:11, color:"var(--muted)", fontWeight:700 }}>₹{(d.amt/1000).toFixed(1)}K</div>
                      <div style={{
                        width:"100%", borderRadius:"6px 6px 0 0", minHeight:8,
                        height:`${Math.round((d.amt/max)*100)}px`,
                        background: i===MONTHLY.length-1
                          ? "linear-gradient(180deg,var(--gold),var(--gold2))"
                          : "rgba(212,168,83,.2)",
                        transition:"height .5s ease",
                      }} />
                      <span style={{ fontSize:11, color:"var(--muted)", fontWeight:700 }}>{d.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Per car */}
            <div style={card}>
              <div style={{ padding:"20px 24px", borderBottom:"1px solid var(--border)", fontFamily:"'Syne',sans-serif", fontSize:15, fontWeight:800 }}>Earnings by Car</div>
              {MY_CARS.map((c, i) => (
                <div key={c.id} className="db-row" style={{ display:"flex", alignItems:"center", gap:14, padding:"16px 24px", borderBottom: i < MY_CARS.length-1 ? "1px solid var(--border)" : "none", transition:"background .15s" }}>
                  <img src={c.image} alt={c.name} style={{ width:48, height:48, borderRadius:11, objectFit:"cover", flexShrink:0 }} />
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:700, marginBottom:3 }}>{c.name}</div>
                    <div style={{ fontSize:11, color:"var(--muted)" }}>{c.bookings} trips · ₹{c.price}/day</div>
                  </div>
                  <div style={{ flex:1.2, maxWidth:200 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                      <span style={{ fontSize:10, color:"var(--muted)", fontWeight:700 }}>Share of earnings</span>
                      <span style={{ fontSize:10, color:"var(--muted)", fontWeight:700 }}>{Math.round(c.earned/totalEarned*100)}%</span>
                    </div>
                    <div style={{ height:6, background:"var(--surface2)", borderRadius:4, overflow:"hidden" }}>
                      <div style={{ height:"100%", width:`${(c.earned/totalEarned*100).toFixed(0)}%`, background:"linear-gradient(90deg,var(--gold),var(--gold2))", borderRadius:4 }} />
                    </div>
                  </div>
                  <div style={{ fontFamily:"'Syne',sans-serif", fontSize:18, fontWeight:800, color:"var(--gold)", minWidth:80, textAlign:"right" }}>
                    ₹{(c.earned/1000).toFixed(1)}K
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}