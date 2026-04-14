import React from 'react'
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import eyeOpenIcon from '../assets/eye_icon.svg';
import eyeCloseIcon from '../assets/eye_close_icon.svg';

function SignInPage({ setPage, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();

  const handleSubmit = async() => {
    setError("");
    if (!email || !password) { setError("Please fill in all fields."); return; }
    if (!email.includes("@")) { setError("Please enter a valid email."); return; }
    
    try{
        setLoading(true);
        const res = await fetch("http://localhost:3000/signin", {
          method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // 🔥 IMPORTANT for cookies
        body: JSON.stringify({
          email,
          password,
        }),
      })
      const data = await res.json();
      if(res.ok){
        setUser(data.user);
        navigate("/");
      }
      else{
        setError(data.message);
      }
    }
    catch (err) {
      setError("Invalid email or password.");
    }
    finally {
      setLoading(false);
    }
  };
 
  return (
    <div className="auth-page">
      <div className="auth-visual">
        <div className="auth-visual-glow"/>
        <div className="auth-visual-title">
          The open road<br/>awaits <em>you</em>.
        </div>
        <p className="auth-visual-sub">Sign in to access your bookings, saved cars, and exclusive member rates on India's finest rentals.</p>
        <img className="auth-car-img" src="https://images.unsplash.com/photo-1555215695-3004980ad54e?w=700&q=80" alt="Car"/>
        <div className="auth-trust">
          <div className="auth-trust-item"><div className="auth-trust-num">2.4K+</div><div className="auth-trust-label">Happy Drivers</div></div>
          <div className="auth-trust-item"><div className="auth-trust-num">4.9★</div><div className="auth-trust-label">Rating</div></div>
          <div className="auth-trust-item"><div className="auth-trust-num">180+</div><div className="auth-trust-label">Cars</div></div>
        </div>
      </div>
 
      <div className="auth-form-side">
        <Link className="auth-logo" to="/">DriveEase</Link>
        <h2 className="auth-heading">Welcome back</h2>
        <p className="auth-sub">
          Don't have an account?{" "}
          <Link className="auth-sub" to="/signup" style={{all:"unset",color:"var(--gold)",fontWeight:700,cursor:"pointer",textDecoration:"underline",textDecorationColor:"rgba(212,168,83,0.4)"}}
            onClick={() => navigate("/signup")}>Create one free</Link>
        </p>
 
        <div className="form-grp">
          <div className="form-field">
            <label className="form-label">Email Address</label>
            <input className="form-input" type="email" placeholder="you@example.com"
              value={email} onChange={e => setEmail(e.target.value)}/>
          </div>
          <div className="form-field password-field">
            <label className="form-label">Password</label>
            <input className="form-input" type={showPassword ? "text" : "password"} placeholder="••••••••"
              value={password} onChange={e => setPassword(e.target.value)}/>
            <button type="button" className="password-toggle-btn" onClick={() => setShowPassword(prev => !prev)}>
              <img src={showPassword ? eyeOpenIcon : eyeCloseIcon} alt={showPassword ? "Hide password" : "Show password"} />
            </button>
          </div>
        </div>
 
        <div className="forgot-row">
          <button className="forgot-btn">Forgot password?</button>
        </div>
 
        {error && <p style={{color:"var(--red)",fontSize:13,marginTop:10}}>{error}</p>}
 
        <button className="auth-submit" onClick={handleSubmit} disabled={loading}>
          {loading ? "Signing in…" : "Sign In →"}
        </button>
 
        <div className="or-divider"><div className="or-line"/>or continue with<div className="or-line"/></div>
        <div className="social-auth">
          <button className="social-auth-btn">
            <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
            Google
          </button>
          <button className="social-auth-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z"/></svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}
 

export default SignInPage