import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar({ user, setUser, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { key: "/",             label: "Explore" },
    { key: "/how-it-works", label: "How it Works" },
    { key: "/about",        label: "About Us" },
  ];

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleSignOut = async () => {
    try {
      await fetch("http://localhost:3000/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.log("Logout error:", error);
    }
    setDropdownOpen(false);
    setUser(null);
    navigate("/");
  };

  const menuItems = [
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
      label: "Dashboard", sub: "Overview & analytics",
      action: () => { setDropdownOpen(false); navigate("/dashboard"); },
    },
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>,
      label: "My Profile", sub: "View public profile",
      action: () => { setDropdownOpen(false); navigate("/profile"); },
    },
    {
      icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
      label: "Update Profile", sub: "Edit your details",
      action: () => { setDropdownOpen(false); navigate("/update-profile"); },
    },
  ];

  const initials = (user?.firstname || user?.name || "U")[0].toUpperCase();

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m4 4H11a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z"/>
            <circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/>
          </svg>
          DriveEase
        </Link>

        <div className="nav-links">
          {navItems.map(({ key, label }) => (
            <Link key={key} to={key} className={`nav-link${location.pathname === key ? " active" : ""}`}>{label}</Link>
          ))}
        </div>

        <div className="nav-actions">
          <button className="theme-toggle" onClick={toggleTheme}>
            {theme === "light" ? (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            ) : (
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
            )}
          </button>

          {user ? (
            <div ref={dropdownRef} style={{ position: "relative" }}>
              <button onClick={() => setDropdownOpen(v => !v)} style={{
                width: 38, height: 38, borderRadius: "50%",
                border: `2px solid ${dropdownOpen ? "var(--gold)" : "rgba(212,168,83,0.5)"}`,
                overflow: "hidden", cursor: "pointer", background: "none", padding: 0,
                transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
                boxShadow: dropdownOpen ? "0 0 0 4px rgba(212,168,83,0.15)" : "none",
                transform: dropdownOpen ? "scale(1.05)" : "scale(1)",
                flexShrink: 0,
              }}>
                {user.imageUrl ? (
                  <img src={user.imageUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
                ) : (
                  <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(212,168,83,0.25), rgba(212,168,83,0.08))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: "var(--gold)" }}>
                    {initials}
                  </div>
                )}
              </button>

              {dropdownOpen && (
                <div style={{
                  position: "absolute", top: "calc(100% + 12px)", right: 0, width: 256,
                  background: "var(--surface)", border: "1px solid var(--border)",
                  borderRadius: 20, overflow: "hidden", zIndex: 200,
                  boxShadow: "0 24px 64px rgba(0,0,0,0.4), 0 4px 16px rgba(0,0,0,0.2)",
                  animation: "navDropIn 0.22s cubic-bezier(0.34,1.4,0.64,1) both",
                }}>
                  <style>{`@keyframes navDropIn{from{opacity:0;transform:translateY(-6px) scale(0.97)}to{opacity:1;transform:translateY(0) scale(1)}}`}</style>

                  {/* Header */}
                  <div style={{ padding: "18px 18px 14px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 46, height: 46, borderRadius: "50%", border: "2px solid rgba(212,168,83,0.35)", overflow: "hidden", flexShrink: 0 }}>
                      {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", background: "linear-gradient(135deg, rgba(212,168,83,0.25), rgba(212,168,83,0.06))", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Syne',sans-serif", fontSize: 18, fontWeight: 800, color: "var(--gold)" }}>{initials}</div>
                      )}
                    </div>
                    <div style={{ minWidth: 0, flex: 1 }}>
                      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: 14, fontWeight: 800, color: "var(--text)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.firstname || user.name || "User"}
                      </div>
                      <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {user.email || "DriveEase member"}
                      </div>
                    </div>
                  </div>

                  {/* Menu */}
                  <div style={{ padding: "8px 8px 4px" }}>
                    {menuItems.map(item => (
                      <button key={item.label} onClick={item.action} style={{
                        display: "flex", alignItems: "center", gap: 10, width: "100%",
                        padding: "9px 10px", background: "none", border: "none",
                        borderRadius: 11, cursor: "pointer", textAlign: "left",
                        transition: "background 0.15s",
                      }}
                        onMouseEnter={e => e.currentTarget.style.background = "rgba(212,168,83,0.06)"}
                        onMouseLeave={e => e.currentTarget.style.background = "none"}
                      >
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: "var(--surface2)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--muted)", flexShrink: 0, transition: "background 0.15s, color 0.15s" }}
                          onMouseEnter={e => { e.currentTarget.style.background = "rgba(212,168,83,0.1)"; e.currentTarget.style.color = "var(--gold)"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "var(--surface2)"; e.currentTarget.style.color = "var(--muted)"; }}
                        >{item.icon}</div>
                        <div>
                          <div style={{ fontSize: 13, fontWeight: 600, color: "var(--text)", lineHeight: 1.2 }}>{item.label}</div>
                          {/* <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>{item.sub}</div> */}
                        </div>
                      </button>
                    ))}

                    <div style={{ height: 1, background: "var(--border)", margin: "6px 2px" }} />

                    <button onClick={handleSignOut} style={{
                      display: "flex", alignItems: "center", gap: 10, width: "100%",
                      padding: "9px 10px", background: "none", border: "none",
                      borderRadius: 11, cursor: "pointer", marginBottom: 4,
                      transition: "background 0.15s",
                    }}
                      onMouseEnter={e => e.currentTarget.style.background = "rgba(224,82,82,0.06)"}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}
                    >
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: "rgba(224,82,82,0.08)", border: "1px solid rgba(224,82,82,0.15)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--red)", flexShrink: 0 }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                      </div>
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: "var(--red)", lineHeight: 1.2 }}>Sign Out</div>
                        {/* <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 1 }}>See you soon</div> */}
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/signin" className="btn-ghost">Sign In</Link>
              <Link to="/signup" className="btn-gold">Get Started</Link>
            </>
          )}

          <button className="nav-hamburger" onClick={() => setMobileOpen(!mobileOpen)}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {mobileOpen ? (<><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></>) : (<><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></>)}
            </svg>
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="mobile-menu">
          {navItems.map(({ key, label }) => (
            <Link key={key} to={key} className="mobile-menu-item" onClick={() => setMobileOpen(false)}>{label}</Link>
          ))}
          <div className="mobile-menu-divider" />
          {user ? (
            <button className="mobile-menu-item" onClick={() => { setUser(null); setMobileOpen(false); }}>Sign Out</button>
          ) : (
            <>
              <Link to="/signin" className="mobile-menu-item" onClick={() => setMobileOpen(false)}>Sign In</Link>
              <Link to="/signup" className="mobile-menu-item mobile-menu-gold" onClick={() => setMobileOpen(false)}>Get Started</Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;