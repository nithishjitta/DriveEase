import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/Home';
import DetailsPage from './components/DetailsPage';
import CarsPage from './components/CarsPage';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import AboutPage from './components/AboutPage';
import HowItWorksPage from './components/HowItWorksPage';
import DashboardPage from './components/DashboardPage.jsx';
import MyBooking from './components/MyBooking';
import MyProfile from './components/MyProfile';
import UpdateProfile from './components/UpdateProfile';
import {BrowserRouter, Routes, Route, useLocation, Link} from 'react-router-dom';

export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [theme, setTheme] = useState('dark');
  const [loading, setLoading] = useState(true);
  const [showReloadEffect, setShowReloadEffect] = useState(false);

  const location = useLocation();

  // Check authentication status on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("http://localhost:3000/me", {
          method: "GET",
          credentials: "include",
        });
        if (res.ok) {
          const data = await res.json();
          setUser(data.user);
        }
      } catch (error) {
        console.log("Not authenticated");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    setShowReloadEffect(true);
    const timer = setTimeout(() => setShowReloadEffect(false), 550);
    return () => clearTimeout(timer);
  }, [location.pathname]);


  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const hideNav = location.pathname === "/signin" || location.pathname === "/signup";

  const reloadOverlay = showReloadEffect ? (
    <div className="reload-overlay">
      <div className="reload-box">
        <div className="reload-spinner">
          <span />
          <span />
          <span />
          <span />
        </div>
        <div className="reload-text">Loading…</div>
      </div>
    </div>
  ) : null;

  if (loading) {
    return (
      <>
        {reloadOverlay}
        <div>Loading...</div>
      </>
    );
  }

  return (
    <>
      {reloadOverlay}
      {!hideNav && (
        <Navbar
          user={user}
          setUser={setUser}
          theme={theme}
          toggleTheme={toggleTheme}
        />
      )}

      <Routes>
        <Route path="/" element={<HomePage setPage={setPage} setSelectedCar={setSelectedCar} />} />
        <Route path="/cars" element={<CarsPage setSelectedCar={setSelectedCar} />} />
        <Route path="/details" element={<DetailsPage setPage={setPage} car={selectedCar} />} />
        <Route path="/signin" element={<SignInPage setPage={setPage} setUser={setUser} />} />
        <Route path="/signup" element={<SignUpPage setPage={setPage} setUser={setUser} />} />
        <Route path="/about" element={<AboutPage setPage={setPage} />} />
        <Route path="/how-it-works" element={<HowItWorksPage setPage={setPage} />} />
        <Route path="/dashboard" element={<DashboardPage user={user} />} />
        <Route path="/bookings" element={<MyBooking user={user} />}></Route>
        <Route path="/profile" element={<MyProfile user={user} />} />
        <Route path="/update-profile" element={<UpdateProfile user={user} setUser={setUser} />} />
      </Routes>
    </>
  );
}