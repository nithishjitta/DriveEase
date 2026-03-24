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
import {BrowserRouter, Routes, Route, useLocation, Link} from 'react-router-dom';
export default function App() {
  const [page, setPage] = useState("home");
  const [user, setUser] = useState(null);
  const [selectedCar, setSelectedCar] = useState(null);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  const hideNav = location.pathname === "/signin" || location.pathname === "/signup";

  return (
    <>
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
        <Route path="/bookings" element={<MyBooking />}></Route>
      </Routes>
    </>
  );
}