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
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <div className="flex items-center space-x-3">
                <img src={logo} alt="KodeRaven Logo" className="w-23 h-23" />
             
           
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => handleLinkClick(link.name)}
                className={`text-white hover:text-gray-300 transition-colors duration-200 font-blauer ${
                  activeLink === link.name ? 'border-b-2 border-gray-400' : ''
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Get Started Button */}
          <div className="hidden md:block">
            <button
              className="bg-gray-100 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium font-blauer"
            >
              Get Started
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-white hover:text-gray-300 focus:outline-none focus:text-gray-300"
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
            <div className="px-2 pt-2 pb-3 space-y-1 bg-black/95 border-t border-gray-800">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => handleLinkClick(link.name)}
                  className={`block px-3 py-2 rounded-md text-base font-medium font-blauer ${
                    activeLink === link.name
                      ? 'text-blue-400 bg-gray-800'
                      : 'text-white hover:text-gray-300 hover:bg-gray-800'
                  }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="px-3 py-2">
                <button
                  className="w-full bg-gray-100 text-gray-900 px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors duration-200 font-medium font-blauer"
                >
                  Get Started
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
