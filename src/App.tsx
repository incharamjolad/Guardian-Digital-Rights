import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Community from './components/Community';
import IndiaRights from './components/IndiaRights';
import AiShield from './components/AiShield';
import Trust from './components/Trust';
import Report from './components/Report';
import Footer from './components/Footer';
import LoginPage from './components/LoginPage';
import ProfilePage from './components/ProfilePage';

function HomePage() {
  return (
    <main>
      <Hero />
      <Community />
      <IndiaRights />
      <AiShield />
      <Trust />
      <Report />
    </main>
  );
}

function App() {
  const location = useLocation();

  useEffect(() => {
    // Re-run observer when route changes
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    // Minor delay to let React render new route elements
    const timer = setTimeout(() => {
      document.querySelectorAll('.fade-up').forEach((el) => {
        observer.observe(el);
      });
    }, 100);

    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-brand-bg text-brand-text font-sans selection:bg-brand-accent/30 overflow-hidden transition-colors duration-300">
      {location.pathname !== '/login' && <Navbar />}
      
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
      
      {location.pathname !== '/login' && <Footer />}
    </div>
  );
}

export default App;
