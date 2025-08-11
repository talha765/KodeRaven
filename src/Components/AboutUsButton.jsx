import React, { useState, useRef } from 'react';

const AboutUsButton = ({ images = [], onClick, children = "About Us" }) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  // Split text into individual characters
  const text = children.toString();
  const letters = text.split('');

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 30);
  };

  return (
    <button
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="transition-all duration-300 hover:scale-105 focus:outline-none"
      style={{
        display: 'flex',
        padding: '10px 24px',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '10px',
        borderRadius: '6px',
        background: 'rgba(239, 246, 238, 0.20)',
        backdropFilter: 'blur(3.349999904632568px)',
        border: 'none',
        cursor: 'pointer',
        height: '44px'
      }}
    >
      {/* Profile Images */}
      <div className="flex -space-x-2">
        {images.slice(0, 4).map((image, index) => (
          <div
            key={index}
            className="w-6 h-6 rounded-full border-2 border-white/20 overflow-hidden"
            style={{
              zIndex: 4 - index
            }}
          >
            <img
              src={image}
              alt={`Team member ${index + 1}`}
              className="w-full h-full object-cover"
              style={{
                transform: index === 0 ? 'scale(1.2)' : 'scale(1)',
                transformOrigin: 'center'
              }}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
        
        {/* Placeholder circles if less than 4 images */}
        {Array.from({ length: Math.max(0, 4 - images.length) }).map((_, index) => (
          <div
            key={`placeholder-${index}`}
            className="w-6 h-6 rounded-full border-2 border-white/20 bg-white/10 flex items-center justify-center"
            style={{
              zIndex: 4 - (images.length + index)
            }}
          >
            <div className="w-2 h-2 rounded-full bg-white/30"></div>
          </div>
        ))}
      </div>
      
      {/* Button Text with rolling animation */}
      <div className="relative overflow-hidden" style={{ minHeight: '1.2em' }}>
        {/* First version of the text that rolls up */}
        <div className="flex">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-150 ease-out text-white font-medium text-base whitespace-nowrap"
              style={{
                transform: isHovered ? 'translateY(-100%) rotateX(90deg)' : 'translateY(0%) rotateX(0deg)',
                opacity: isHovered ? 0 : 1,
                transitionDelay: `${index * 0.01}s`,
                transformOrigin: 'bottom',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>

        {/* Second version of the text that rolls in from bottom */}
        <div className="absolute top-0 left-0 flex">
          {letters.map((letter, index) => (
            <span
              key={`animated-${index}`}
              className="inline-block transition-all duration-150 ease-out text-white font-medium text-base whitespace-nowrap"
              style={{
                transform: isHovered ? 'translateY(0%) rotateX(0deg)' : 'translateY(100%) rotateX(-90deg)',
                opacity: isHovered ? 1 : 0,
                transitionDelay: `${0.05 + index * 0.01}s`,
                transformOrigin: 'top',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
};

export default AboutUsButton;
