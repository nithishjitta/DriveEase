import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Navbar({ user, setUser, theme, toggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { key: "/", label: "Explore" },
    { key: "/bookings", label: "My Bookings" },
    { key: "/how-it-works", label: "How it Works" },
    { key: "/about", label: "About Us" },
  ];

  return (
    <>
      <nav className="nav">
        <Link to="/" className="nav-logo">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            {" "}
            <path d="M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11a2 2 0 0 1 2 2v3m4 4H11a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2z" />{" "}
            <circle cx="7" cy="17" r="2" />{" "}
            <circle cx="17" cy="17" r="2" />{" "}
          </svg>
          DriveEase
        </Link>

        <div className="nav-links">
          {navItems.map(({ key, label }) => (
            <Link
              key={key}
              to={key}
              className={`nav-link${location.pathname === key ? " active" : ""}`}
            >
              {label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <button
            className="theme-toggle"
            onClick={toggleTheme}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            {theme === "light" ? (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </svg>
            ) : (
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            )}
          </button>
          {user ? (
            <>
              <span style={{ fontSize: 13, color: "var(--muted)" }}>
                Hi, {user.name}
              </span>
              <button className="btn-ghost" onClick={() => setUser(null)}>
                Sign Out
              </button>
              <div className="nav-avatar" title={user.name}>
                <img src="https://i.pravatar.cc/36?img=11" alt={user.name} />
              </div>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="btn-ghost">
                Dashboard
              </Link>
              <Link to="/signin" className="btn-gold">
                Sign In
              </Link>
            </>
          )}
          {/* Mobile hamburger */}
          <button
            className="nav-hamburger"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {mobileOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="mobile-menu">
          {navItems.map(({ key, label }) => (
            <Link
              key={key}
              to={key}
              className="mobile-menu-item"
              onClick={() => setMobileOpen(false)}
            >
              {label}
            </Link>
          ))}
          <div className="mobile-menu-divider" />
          {user ? (
            <button
              className="mobile-menu-item"
              onClick={() => {
                setUser(null);
                setMobileOpen(false);
              }}
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link
                to="/signin"
                className="mobile-menu-item"
                onClick={() => setMobileOpen(false)}
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="mobile-menu-item mobile-menu-gold"
                onClick={() => setMobileOpen(false)}
              >
                Get Started
              </Link>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
