import React from "react";
import { useNavigate } from "react-router-dom";

export default function MyProfile({ user }) {
  const navigate = useNavigate();
  const initials = (user?.firstname || user?.name || "U")[0]?.toUpperCase();

  const formatDate = (value) => {
    if (!value) return null;
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return String(value);
    return date.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });
  };

  const getFullName = () => {
    const nameParts = [user?.firstname, user?.lastname].filter(Boolean);
    return nameParts.length ? nameParts.join(" ") : user?.name || "—";
  };


  const badges = [
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8"/></svg>, label: "Top Host",       desc: "Consistent 5-star reviews", color: "#D4A853" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>, label: "Verified",       desc: "ID & documents verified",   color: "#3DCF82" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>, label: "Fast Responder", desc: "Replies within the hour",    color: "#60A5FA" },
    { icon: <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/><path d="M4 22h16"/><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/><path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/></svg>, label: "Super Host",     desc: "100+ successful trips",      color: "#F472B6" },
  ];

  const accountDetails = [
    { label: "Full Name",    value: getFullName(),    icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> },
    { label: "Email",        value: user?.email  || "—",                     icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg> },
    { label: "Phone",        value: user?.contact || "Not added",             icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg> },
    { label: "Member Since", value: formatDate(user?.createdAt) || "—",                          icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> },
  ];

  return (
    <div className="page" style={{ background: "var(--bg)", minHeight: "100vh" }}>
      <style>{`
        @keyframes mp-fadein { from{opacity:0;transform:translateY(18px)} to{opacity:1;transform:translateY(0)} }
        @keyframes mp-slide { from{opacity:0;transform:translateX(-12px)} to{opacity:1;transform:translateX(0)} }
        @keyframes mp-scale { from{opacity:0;transform:scale(.96)} to{opacity:1;transform:scale(1)} }
        @keyframes mp-glow { 0%,100%{opacity:.06} 50%{opacity:.13} }

        .mp-hero-card { animation: mp-fadein .5s ease both; }
        .mp-stats { animation: mp-fadein .5s ease .1s both; }
        .mp-badges { animation: mp-fadein .5s ease .18s both; }
        .mp-account { animation: mp-fadein .5s ease .24s both; }

        .mp-stat-tile {
          background:var(--surface); border:1px solid var(--border);
          border-radius:18px; padding:22px 20px;
          transition:all .22s cubic-bezier(.4,0,.2,1); cursor:default; position:relative; overflow:hidden;
        }
        .mp-stat-tile::before {
          content:''; position:absolute; inset:0; border-radius:18px; opacity:0;
          background:linear-gradient(135deg,rgba(212,168,83,.07),transparent);
          transition:opacity .22s;
        }
        .mp-stat-tile:hover { border-color:rgba(212,168,83,.3); transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,.3); }
        .mp-stat-tile:hover::before { opacity:1; }

        .mp-badge-tile {
          background:var(--surface2); border:1px solid var(--border);
          border-radius:16px; padding:20px 16px; text-align:center;
          transition:all .22s cubic-bezier(.4,0,.2,1); cursor:default; position:relative; overflow:hidden;
        }
        .mp-badge-tile:hover { transform:translateY(-3px); box-shadow:0 12px 32px rgba(0,0,0,.3); }

        .mp-detail-tile {
          background:var(--surface2); border:1px solid var(--border);
          border-radius:14px; padding:16px 18px;
          transition:all .22s cubic-bezier(.4,0,.2,1);
        }
        .mp-detail-tile:hover { border-color:rgba(255,255,255,.12); background:var(--surface3); }

        .mp-btn-primary {
          background:var(--gold); border:none; border-radius:12px; padding:11px 22px;
          font-size:13px; font-weight:800; color:#08090C; cursor:pointer;
          font-family:'Syne',sans-serif; letter-spacing:.3px;
          transition:all .22s cubic-bezier(.4,0,.2,1);
        }
        .mp-btn-primary:hover { background:#c49440; transform:translateY(-1px); box-shadow:0 8px 24px rgba(212,168,83,.28); }

        .mp-btn-ghost {
          background:transparent; border:1px solid var(--border); border-radius:12px; padding:11px 20px;
          font-size:13px; font-weight:600; color:var(--text); cursor:pointer;
          transition:all .22s cubic-bezier(.4,0,.2,1); font-family:'Mulish',sans-serif;
        }
        .mp-btn-ghost:hover { border-color:var(--gold); color:var(--gold); }

        .mp-verified-badge {
          position:absolute; bottom:2, right:2, width:26, height:26, border-radius:50%;
          background:var(--green); border:3px solid var(--surface);
          display:flex; align-items:center; justify-content:center; z-index:1;
        }
        .mp-tab {
          padding:8px 20px; border-radius:10px; font-size:13px; font-weight:700;
          border:none; cursor:pointer; transition:all .18s; font-family:'Mulish',sans-serif;
        }
        .mp-tab-active { background:rgba(212,168,83,.12); color:var(--gold); border:1px solid rgba(212,168,83,.22); }
        .mp-tab-idle { background:transparent; color:var(--muted); border:1px solid transparent; }
        .mp-tab-idle:hover { color:var(--text); border-color:var(--border); }

        .mp-glow-orb {
          position:absolute; border-radius:50%; pointer-events:none;
          animation:mp-glow 5s ease-in-out infinite;
        }
      `}</style>

      <div style={{ maxWidth: 960, margin: "0 auto", padding: "56px 24px 88px" }}>

        {/* ── HERO CARD ── */}
        <div className="mp-hero-card" style={{
          background: "var(--surface)", border: "1px solid var(--border)",
          borderRadius: 24, overflow: "hidden", position: "relative", marginBottom: 24
        }}>
          <div style={{ height:120, background:"linear-gradient(135deg,rgba(212,168,83,.12),rgba(212,168,83,.04))", position:"relative", borderBottom:"1px solid var(--border)" }}>
            <div style={{ position:"absolute", inset:0, backgroundImage:"linear-gradient(rgba(212,168,83,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(212,168,83,.04) 1px,transparent 1px)", backgroundSize:"32px 32px" }} />
          </div>

          {/* Diagonal accent line */}
          <div style={{
            position:"absolute", top:0, right:0, bottom:0, width:200,
            background:"linear-gradient(to left,rgba(212,168,83,.04),transparent)",
          }}/>

          <div style={{ padding: "0 36px 32px", position: "relative" }}>
            {/* Avatar */}
            <div style={{ position: "relative", marginTop: -50, marginBottom: 18, width: "fit-content" }}>
              <div style={{
                width: 96, height: 96, borderRadius: "50%",
                border: "4px solid var(--surface)", overflow: "hidden",
                background: "var(--surface2)", boxShadow:"0 0 0 1px rgba(212,168,83,.2), 0 8px 32px rgba(0,0,0,.4)",
              }}>
                {user?.imageUrl
                  ? <img src={user.imageUrl} alt="" style={{ width:"100%", height:"100%", objectFit:"cover" }} />
                  : <div style={{
                      width:"100%", height:"100%",
                      background:"linear-gradient(135deg,rgba(212,168,83,.22),rgba(212,168,83,.06))",
                      display:"flex", alignItems:"center", justifyContent:"center",
                      fontFamily:"'Syne',sans-serif", fontSize:36, fontWeight:900, color:"var(--gold)",
                    }}>{initials}</div>
                }
              </div>
              
            </div>

            {/* Info row */}
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:14 }}>
              <div>
                <h1 style={{
                  fontFamily:"'Syne',sans-serif", fontSize:28, fontWeight:900,
                  letterSpacing:"-0.9px", marginBottom:5, lineHeight:1,
                }}>
                  {user?.firstname || user?.name || "User"}
                </h1>
                <div style={{ fontSize:13, color:"var(--muted)", marginBottom:10, display:"flex", alignItems:"center", gap:6 }}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {user?.email || "member@driveease.in"}
                </div>
                <div style={{ fontSize:12, color:"var(--muted)", marginBottom:14, maxWidth:420, lineHeight:1.6 }}>
                  Manage your host profile, verification status, and account settings from one place.
                </div>
                {/* Tags */}
                <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(212,168,83,.07)", border:"1px solid rgba(212,168,83,.18)", borderRadius:20, padding:"4px 12px" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12,2 15,8 22,9 17,14 18,21 12,18 6,21 7,14 2,9 9,8"/></svg>
                    <span style={{ fontSize:11, fontWeight:800, color:"var(--gold)", letterSpacing:".5px" }}>TOP HOST</span>
                  </div>
                  <div style={{ display:"inline-flex", alignItems:"center", gap:5, background:"rgba(96,165,250,.07)", border:"1px solid rgba(96,165,250,.18)", borderRadius:20, padding:"4px 12px" }}>
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#60A5FA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    <span style={{ fontSize:11, fontWeight:800, color:"#60A5FA", letterSpacing:".5px" }}>VERIFIED</span>
                  </div>
                </div>
              </div>

              <div style={{ display:"flex", gap:10, marginTop:4 }}>
                <button className="mp-btn-ghost" onClick={() => navigate("/dashboard")}>
                  Dashboard
                </button>
                <button className="mp-btn-primary" onClick={() => navigate("/update-profile")}>
                  Edit Profile →
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* ── PROFILE TRUST ── */}
        <div className="mp-badges" style={{
          background:"var(--surface)", border:"1px solid var(--border)",
          borderRadius:22, padding:"24px", marginBottom:16,
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:18 }}>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:900, marginBottom:2 }}>Trust Signals</div>
              <div style={{ fontSize:12, color:"var(--muted)" }}>Verification and host credibility details</div>
            </div>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:12 }}>
            {badges.map((b, i) => (
              <div key={b.label} className="mp-badge-tile" style={{
                borderTop:`2px solid ${b.color}22`,
                animationDelay:`${i * 0.07}s`,
              }}>
                <div style={{ fontSize:32, marginBottom:10 }}>{b.icon}</div>
                <div style={{ fontSize:13, fontWeight:800, fontFamily:"'Syne',sans-serif", marginBottom:4, color:"var(--text)" }}>{b.label}</div>
                <div style={{ fontSize:11, color:"var(--muted)", lineHeight:1.5 }}>{b.desc}</div>
                <div style={{ marginTop:10, width:32, height:3, borderRadius:2, background:b.color, margin:"10px auto 0", opacity:.7 }}/>
              </div>
            ))}
          </div>
        </div>

        {/* ── ACCOUNT DETAILS ── */}
        <div className="mp-account" style={{
          background:"var(--surface)", border:"1px solid var(--border)",
          borderRadius:22, padding:"24px",
        }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
            <div>
              <div style={{ fontFamily:"'Syne',sans-serif", fontSize:16, fontWeight:900, marginBottom:2 }}>Account Details</div>
              <div style={{ fontSize:12, color:"var(--muted)" }}>Your personal information</div>
            </div>
            <button className="mp-btn-primary" onClick={() => navigate("/update-profile")} style={{ padding:"9px 18px", fontSize:12 }}>
              Edit →
            </button>
          </div>

          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {accountDetails.map(({ label, value, icon }) => (
              <div key={label} className="mp-detail-tile">
                <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
                  <span style={{ fontSize:14 }}>{icon}</span>
                  <span style={{ fontSize:10, color:"var(--muted)", textTransform:"uppercase", letterSpacing:"1px", fontWeight:800 }}>{label}</span>
                </div>
                <div style={{
                  fontSize:14, fontWeight:700,
                  color: (value === "Not added" || value === "—") ? "var(--muted2)" : "var(--text)",
                  fontStyle: (value === "Not added") ? "italic" : "normal",
                }}>
                  {value}
                </div>
              </div>
            ))}
          </div>

          {/* Footer CTA strip */}
          <div style={{
            marginTop:20, padding:"16px 20px",
            background:"rgba(212,168,83,.04)", border:"1px solid rgba(212,168,83,.1)",
            borderRadius:14, display:"flex", alignItems:"center", justifyContent:"space-between",
          }}>
            <div>
              <div style={{ fontSize:13, fontWeight:700, marginBottom:2 }}>Complete your profile</div>
              <div style={{ fontSize:12, color:"var(--muted)" }}>Add a phone number and city to unlock better matches</div>
            </div>
            <button className="mp-btn-ghost" onClick={() => navigate("/update-profile")} style={{ fontSize:12, padding:"9px 18px", whiteSpace:"nowrap" }}>
              Complete →
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}