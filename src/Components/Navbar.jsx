import React, { useState, useEffect } from 'react';
import logo from '../assets/logo.svg';
import Button from './Button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('Home');
  const [isScrolled, setIsScrolled] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Our Work', href: '#our-work' },
    { name: 'Services', href: '#services' },
    { name: 'Why Choose Us?', href: '#why-choose-us' },
    { name: 'FAQ', href: '#faq' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (linkName) => {
    setActiveLink(linkName);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      {/* Glassy bar background - only show when scrolled */}
      {isScrolled && (
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(255,255,255,0.10),rgba(255,255,255,0.04)_40%,rgba(0,0,0,0))]" />
      )}
      <div className={`transition-all duration-300 ${
        isScrolled 
          ? 'backdrop-blur-xl bg-white/5 border-b border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.25)]' 
          : 'backdrop-blur-none bg-transparent border-b border-transparent'
      }`}>
        {/* Edge-to-edge content (no side padding) */}
        <div className="w-full">
          <div className="h-16 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] md:gap-4">
            {/* Logo */}
            <div className="flex items-center md:justify-self-start">
              <div className="flex items-center space-x-3 pl-3 py-1.5">
                <img src={logo} alt="KodeRaven Logo" className="h-10 md:h-12 w-auto select-none p-2" />
              </div>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center justify-center space-x-6 md:justify-self-center">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`group relative inline-block px-2 py-2 text-white/90 transition-all duration-400 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 hover:text-white whitespace-nowrap ${
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
            <div className="hidden md:flex md:justify-self-end pr-3 items-center relative z-10">
              <Button>Get Started</Button>

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
              <div className="px-4 pt-4 pb-6 space-y-3 bg-black/50 backdrop-blur-xl border-t border-white/10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => handleLinkClick(link.name)}
                    className={`group block px-4 py-3 rounded-md text-base font-medium transition-all duration-300 ${
                      activeLink === link.name
                        ? 'text-purple-300 bg-white/10'
                        : 'text-white/90 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    {link.name}
                    <span className={`mt-2 block h-[2px] w-0 bg-gradient-to-r from-fuchsia-400 via-purple-400 to-indigo-400 transition-all duration-500 group-hover:w-full ${activeLink === link.name ? 'w-full' : ''}`} />
                  </a>
                ))}
                <div className="px-4 py-3">
                  <Button className="w-full">Get Started</Button>
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
