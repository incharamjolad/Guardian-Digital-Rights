import React, { useState } from 'react';
import { Menu, X, User, LogIn } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isHome = location.pathname === '/';

  return (
    <nav className="fixed w-full z-50 bg-brand-bg/90 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex-shrink-0 flex items-center gap-1">
            <span className="font-display font-bold text-2xl text-brand-text">Guard</span>
            <span className="font-display font-bold text-2xl text-brand-accent">ian</span>
          </Link>
          
          <div className="hidden md:flex ml-10 space-x-8">
            {isHome ? (
              <>
                <a href="#community" className="text-brand-muted hover:text-brand-text font-sans font-medium transition-colors">Community</a>
                <a href="#india" className="text-brand-muted hover:text-brand-text font-sans font-medium transition-colors">India Rights</a>
                <a href="#ai" className="text-brand-muted hover:text-brand-text font-sans font-medium transition-colors">AI Shield</a>
                <a href="#trust" className="text-brand-muted hover:text-brand-text font-sans font-medium transition-colors">Trust</a>
                <a href="#report" className="text-brand-muted hover:text-brand-text font-sans font-medium transition-colors">Report</a>
              </>
            ) : (
              <Link to="/" className="text-brand-muted hover:text-brand-text font-sans font-medium transition-colors">Home</Link>
            )}
          </div>

          <div className="hidden md:flex items-center gap-4">
            <ThemeToggle />
            <Link to="/login" className="text-brand-muted hover:text-brand-text p-2 rounded-full hover:bg-brand-bg3 transition-colors" title="Login">
              <LogIn className="w-5 h-5" />
            </Link>
            <Link to="/profile" className="text-brand-muted hover:text-brand-text p-2 rounded-full hover:bg-brand-bg3 transition-colors" title="Profile">
              <User className="w-5 h-5" />
            </Link>
            {isHome && (
              <a href="#report" className="bg-brand-accent text-white px-6 py-2.5 rounded-full font-sans font-bold hover:bg-brand-accent/90 transition-colors ml-2">
                Get Protected
              </a>
            )}
          </div>

          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="text-brand-muted hover:text-brand-text">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-brand-bg2 border-b border-brand-border">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {isHome ? (
              <>
                <a href="#community" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-text font-sans font-medium hover:bg-brand-bg3 rounded-md">Community</a>
                <a href="#india" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-text font-sans font-medium hover:bg-brand-bg3 rounded-md">India Rights</a>
                <a href="#ai" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-text font-sans font-medium hover:bg-brand-bg3 rounded-md">AI Shield</a>
                <a href="#trust" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-text font-sans font-medium hover:bg-brand-bg3 rounded-md">Trust</a>
                <a href="#report" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-accent font-sans font-bold hover:bg-brand-bg3 rounded-md">Report</a>
              </>
            ) : (
              <Link to="/" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-text font-sans font-medium hover:bg-brand-bg3 rounded-md">Home</Link>
            )}
            <Link to="/login" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-text font-sans font-medium hover:bg-brand-bg3 rounded-md flex items-center gap-2"><LogIn className="w-5 h-5"/> Login</Link>
            <Link to="/profile" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-brand-text font-sans font-medium hover:bg-brand-bg3 rounded-md flex items-center gap-2"><User className="w-5 h-5"/> Profile</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
