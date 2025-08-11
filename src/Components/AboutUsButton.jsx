import React from 'react';

const AboutUsButton = ({ images = [], onClick, children = "About Us" }) => {
  return (
    <button
      onClick={onClick}
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
      
      {/* Button Text */}
      <span className="text-white font-medium text-base whitespace-nowrap">
        {children}
      </span>
    </button>
  );
};

export default AboutUsButton;
