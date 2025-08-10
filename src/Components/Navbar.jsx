import React, { useState } from 'react';
import logo from '../assets/logo.svg';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us?', href: '#why-choose-us' },
    { name: 'FAQ', href: '#faq' }
  ];

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glassy bar background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0.04)_40%,rgba(0,0,0,0))]" />
      <div className="backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]">
        {/* Edge-to-edge content (no side padding) */}
        <div className="w-full">
          <div className="h-[84px] flex items-center justify-between md:grid md:grid-cols-3">
            {/* Logo */}
            <div className="flex items-center md:justify-self-start">
              <div className="flex items-center space-x-3 pl-3 py-1.5">
                <img src={logo} alt="KodeRaven Logo" className="h-[50px] md:h-[58px] w-auto select-none" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center md:gap-5 lg:gap-7 xl:gap-8 md:justify-self-center flex-nowrap whitespace-nowrap overflow-x-auto md:text-sm lg:text-base">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`group relative inline-block px-2 py-1 text-white/90 whitespace-nowrap transition-all duration-400 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:text-white ${
                    activeLink === link.name ? 'text-white' : ''
                  }`}
                >
                  {link.name}
                  {/* underline */}
                  <span
                    className={`pointer-events-none absolute left-0 -bottom-0.5 h-[2px] w-full origin-left scale-x-0 transform bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 transition-transform duration-500 ease-out group-hover:scale-x-100 ${
                      activeLink === link.name ? 'scale-x-100' : ''
                    }`}
                  />
                </a>
              ))}
            </div>

            {/* Get Started Button */}
            <div className="hidden md:flex md:justify-self-end pr-3">
              <button
                className="relative overflow-hidden rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:text-white hover:shadow-[0_10px_30px_rgba(147,51,234,0.35)] focus:outline-none"
              >
                <span className="relative z-[1]">Get Started</span>
                <span className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(120px_60px_at_50%_-20%,rgba(168,85,247,0.35),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </button>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden pr-3">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-white hover:text-white/90 focus:outline-none transition-transform duration-300 hover:-translate-y-0.5"
                aria-label="Toggle menu"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {isMenuOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                  )}
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 bg-black/50 backdrop-blur-xl border-t border-white/10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleLinkClick(link.name)}
                    className={`group block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 ${
                      activeLink === link.name
                        ? 'text-purple-300 bg-white/10'
                        : 'text-white/90 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    <span className={`mt-1 block h-[2px] w-0 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 transition-all duration-500 group-hover:w-full ${activeLink === link.name ? 'w-full' : ''}`} />
                  </a>
                ))}
                <div className="px-3 py-2">
                  <button
                    className="w-full rounded-xl border border-white/15 bg-white/10 px-5 py-2 text-sm font-medium text-white/90 backdrop-blur-md transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:text-white hover:shadow-[0_10px_30px_rgba(147,51,234,0.35)]"
                  >
                    Get Started
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
