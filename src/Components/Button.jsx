import React, { useState, useRef } from 'react';

const Button = ({
  children,
  onClick,
  className = "",
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button"
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const timeoutRef = useRef(null);

  // Base classes for the button, with a slightly faster transition duration for the button itself
  const baseClasses = "relative overflow-hidden rounded-md border border-gray-200 bg-white text-lg font-semibold transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-105 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group";

  // Class definitions for different variants
  const variantClasses = {
    primary: "text-gray-900 hover:text-black hover:shadow-[0_0_0_1px_rgba(147,51,234,0.2),0_0_8px_rgba(147,51,234,0.1)]",
    secondary: "text-gray-700 hover:text-gray-900 hover:shadow-[0_0_0_1px_rgba(0,0,0,0.05),0_0_8px_rgba(0,0,0,0.03)]",
    outline: "border-gray-300 text-gray-700 hover:text-gray-900 hover:shadow-[0_0_0_1px_rgba(147,51,234,0.2),0_0_8px_rgba(147,51,234,0.1)]"
  };

  // Class definitions for different sizes
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  // Combine all the classes, using optional chaining for robust prop handling
  const combinedClasses = `${baseClasses} ${variantClasses?.[variant] ?? ''} ${sizeClasses?.[size] ?? ''} ${className}`;

  // Ensure children is a string before splitting
  const text = children?.toString() ?? '';
  const letters = text.split('');

  const handleMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    // Add a small delay to prevent flickering if mouse quickly re-enters
    timeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 30);
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="relative z-[1] overflow-hidden will-change-transform will-change-opacity" style={{ minHeight: '1.2em' }}>
        {/* First version of the text that rolls up */}
        <div className="flex">
          {letters.map((letter, index) => (
            <span
              key={index}
              className="inline-block transition-all duration-150 ease-out"
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
              className="inline-block transition-all duration-150 ease-out"
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

      <span className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(120px_60px_at_50%_-20%,rgba(0,0,0,0.03),transparent_60%)] opacity-0 transition-opacity duration-200 group-hover:opacity-100" />
    </button>
  );
};

export default Button;