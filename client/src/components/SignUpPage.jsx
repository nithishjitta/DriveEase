import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import eyeOpenIcon from "../assets/eye_icon.svg";
import eyeCloseIcon from "../assets/eye_close_icon.svg";

function SignUpPage({ setPage, setUser }) {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    contact: "",
    password: "",
    confirm: "",
    agree: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError("");
    if (!form.firstname || !form.email || !form.password) {
      setError("Please fill in all required fields.");
      return;
    }
    if (!form.email.includes("@")) {
      setError("Enter a valid email address.");
      return;
    }
    if (form.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (form.password !== form.confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (!form.agree) {
      setError("Please accept the terms to continue.");
      return;
    }
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("firstname", form.firstname);
      formData.append("lastname", form.lastname);
      formData.append("email", form.email);
      formData.append("contact", form.contact);
      formData.append("password", form.password);
      if (form.image) formData.append("image", form.image);

      const res = await fetch("http://localhost:3000/signup", {
        method: "POST",
        body: formData, // no Content-Type header needed!
      });
      const data = await res.json();
      if (res.ok) {
        setUser({ email: form.email });
        navigate("/signin");
      }
    } catch (err) {
      setError("Error creating account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-glow" />
        <div className="auth-visual-title">
          Join <em>thousands</em>
          <br />
          of happy drivers.
        </div>
        <p className="auth-visual-sub">
          Create a free account and unlock access to 180+ premium vehicles. Your
          next adventure is one click away.
        </p>
        <img
          className="auth-car-img"
          src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=700&q=80"
          alt="Car"
        />
        <div className="auth-trust">
          <div className="auth-trust-item">
            <div className="auth-trust-num">Free</div>
            <div className="auth-trust-label">Sign Up</div>
          </div>
          <div className="auth-trust-item">
            <div className="auth-trust-num">Zero</div>
            <div className="auth-trust-label">Hidden Fees</div>
          </div>
          <div className="auth-trust-item">
            <div className="auth-trust-num">24/7</div>
            <div className="auth-trust-label">Support</div>
          </div>
        </div>
      </div>

      <div className="auth-form-side">
        <Link className="auth-logo" to="/">
          DriveEase
        </Link>
        <h2 className="auth-heading">Create account</h2>
        <p className="auth-sub">
          Already have an account?{" "}
          <Link
            className="auth-sub"
            to="/signin"
            style={{
              all: "unset",
              color: "var(--gold)",
              fontWeight: 700,
              cursor: "pointer",
              textDecoration: "underline",
              textDecorationColor: "rgba(212,168,83,0.4)",
            }}
          >
            Sign in
          </Link>
        </p>

        <div className="form-grp">
          <div className="form-row">
            <div className="form-field">
              <label className="form-label">First Name *</label>
              <input
                className="form-input"
                placeholder="Arjun"
                value={form.firstname}
                onChange={(e) => set("firstname", e.target.value)}
              />
            </div>
            <div className="form-field">
              <label className="form-label">Last Name</label>
              <input
                className="form-input"
                placeholder="Sharma"
                value={form.lastname}
                onChange={(e) => set("lastname", e.target.value)}
              />
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Email Address *</label>
            <input
              className="form-input"
              type="email"
              placeholder="you@example.com"
              value={form.email}
              onChange={(e) => set("email", e.target.value)}
            />
          </div>
          <div className="form-field">
            <label className="form-label">Phone Number</label>
            <input
              className="form-input"
              type="tel"
              placeholder="+91 98765 43210"
              value={form.contact}
              onChange={(e) => set("contact", e.target.value)}
            />
          </div>
          <div className="form-row">
            <div className="form-field password-field">
              <label className="form-label">Password *</label>
              <input
                className="form-input"
                type={showPassword ? "text" : "password"}
                placeholder="Min 6 chars"
                value={form.password}
                onChange={(e) => set("password", e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword((prev) => !prev)}
              >
                <img
                  src={showPassword ? eyeOpenIcon : eyeCloseIcon}
                  alt={showPassword ? "Hide password" : "Show password"}
                />
              </button>
            </div>
            <div className="form-field password-field">
              <label className="form-label">Confirm *</label>
              <input
                className="form-input"
                type={showConfirm ? "text" : "password"}
                placeholder="Repeat password"
                value={form.confirm}
                onChange={(e) => set("confirm", e.target.value)}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowConfirm((prev) => !prev)}
              >
                <img
                  src={showConfirm ? eyeOpenIcon : eyeCloseIcon}
                  alt={showConfirm ? "Hide password" : "Show password"}
                />
              </button>
            </div>
          </div>
          <div className="form-field">
            <label className="form-label">Profile Picture</label>
            <div
              onClick={() => document.getElementById("profile-upload").click()}
              style={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                gap: 16,
                background: "var(--surface2)",
                border: "1px solid var(--border)",
                borderRadius: 12,
                padding: "12px 16px",
                cursor: "pointer",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = "var(--gold)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            >
              {/* Avatar preview / placeholder */}
              <div
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  overflow: "hidden",
                  flexShrink: 0,
                  background: "var(--surface3)",
                  border: "2px solid rgba(212,168,83,0.3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {form.avatarPreview ? (
                  <img
                    src={form.avatarPreview}
                    alt="Preview"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                ) : (
                  <svg
                    width="22"
                    height="22"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="var(--muted)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                )}
              </div>

              {/* Text */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: "var(--text)",
                    marginBottom: 2,
                  }}
                >
                  {form.avatarPreview ? "Change photo" : "Upload a photo"}
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>
                  JPG, PNG or WEBP · Max 5MB
                </div>
              </div>

              {/* Upload icon */}
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: "rgba(212,168,83,0.1)",
                  border: "1px solid rgba(212,168,83,0.2)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "var(--gold)",
                  flexShrink: 0,
                }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="17 8 12 3 7 8" />
                  <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
              </div>

              {/* Hidden input */}
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const url = URL.createObjectURL(file);
                    set("avatarPreview", url);
                    set("image", file);
                  }
                }}
              />
            </div>
          </div>
          <label className="agree-check">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(e) => set("agree", e.target.checked)}
            />
            I agree to the{" "}
            <span style={{ color: "var(--gold)", cursor: "pointer" }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span style={{ color: "var(--gold)", cursor: "pointer" }}>
              Privacy Policy
            </span>
          </label>
        </div>

        {error && (
          <p style={{ color: "var(--red)", fontSize: 13, marginTop: 6 }}>
            {error}
          </p>
        )}

        <button
          className="auth-submit"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Creating account…" : "Create Free Account →"}
        </button>

        <div className="or-divider">
          <div className="or-line" />
          or sign up with
          <div className="or-line" />
        </div>
        <div className="social-auth">
          <button className="social-auth-btn">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Google
          </button>
          <button className="social-auth-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
