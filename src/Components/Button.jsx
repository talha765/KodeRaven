import React from 'react';

const Button = ({ 
  children, 
  onClick, 
  className = "", 
  variant = "primary",
  size = "md",
  disabled = false,
  type = "button"
}) => {
  const baseClasses = "relative overflow-hidden rounded-md border border-gray-200 bg-white text-lg font-semibold transition-all duration-300 ease-[cubic-bezier(.2,.8,.2,1)] hover:-translate-y-0.5 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 group";
  
  const variantClasses = {
    primary: "text-gray-900 hover:text-black hover:shadow-[0_0_0_2px_rgba(147,51,234,0.3),0_0_20px_rgba(147,51,234,0.2)]",
    secondary: "text-gray-700 hover:text-gray-900 hover:shadow-[0_0_0_2px_rgba(0,0,0,0.1),0_0_20px_rgba(0,0,0,0.05)]",
    outline: "border-gray-300 text-gray-700 hover:text-gray-900 hover:shadow-[0_0_0_2px_rgba(147,51,234,0.3),0_0_20px_rgba(147,51,234,0.2)]"
  };
  
  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-6 py-2.5 text-sm",
    lg: "px-6 py-3 text-base"
  };

  const combinedClasses = `${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={combinedClasses}
    >
      <span className="relative z-[1]">{children}</span>
      <span className="pointer-events-none absolute inset-0 -z-0 bg-[radial-gradient(120px_60px_at_50%_-20%,rgba(0,0,0,0.05),transparent_60%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </button>
  );
};

export default Button;
