import React, { useEffect, useRef, useState } from 'react';

const ReactiveNoiseBackground = ({ 
  children,
  noiseOpacity = 0.08,
  animationSpeed = 0.0005,
  mouseInfluence = 0.02,
  gradientColors = ['#1e3a8a', '#3b82f6', '#8b5cf6'],
  noiseScale = 100 
}) => {
  const containerRef = useRef(null);
  const noiseCanvasRef = useRef(null);
  const animationRef = useRef(null);
  const mousePositionRef = useRef({ x: 0.5, y: 0.5 });
  const timeRef = useRef(0);
  const [isVisible, setIsVisible] = useState(true);

  // Generate noise pattern on canvas
  const generateNoisePattern = (canvas, scale = noiseScale) => {
    const ctx = canvas.getContext('2d');
    const width = canvas.width;
    const height = canvas.height;
    
    const imageData = ctx.createImageData(width, height);
    const data = imageData.data;
    
    for (let i = 0; i < data.length; i += 4) {
      // Generate random grayscale noise
      const noise = Math.random() * 255;
      data[i] = noise;     // R
      data[i + 1] = noise; // G
      data[i + 2] = noise; // B
      data[i + 3] = 255;   // A
    }
    
    ctx.putImageData(imageData, 0, 0);
    return canvas.toDataURL();
  };

  // Create multiple noise layers with different scales
  const createNoiseLayers = () => {
    const layers = [];
    const scales = [80, 120, 160];
    
    scales.forEach((scale, index) => {
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth / 2;
      canvas.height = window.innerHeight / 2;
      
      const noiseDataUrl = generateNoisePattern(canvas, scale);
      layers.push({
        id: index,
        dataUrl: noiseDataUrl,
        speed: 1 + index * 0.3,
        opacity: noiseOpacity * (1 - index * 0.2),
        scale: 1 + index * 0.1
      });
    });
    
    return layers;
  };

  // Handle mouse movement
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    mousePositionRef.current = { x, y };
  };

  // Animation loop
  const animate = () => {
    if (!isVisible) return;
    
    timeRef.current += animationSpeed;
    const container = containerRef.current;
    if (!container) return;

    const noiseLayers = container.querySelectorAll('.noise-layer');
    const mouse = mousePositionRef.current;
    
    noiseLayers.forEach((layer, index) => {
      const speed = 1 + index * 0.3;
      const mouseOffsetX = (mouse.x - 0.5) * mouseInfluence * 50;
      const mouseOffsetY = (mouse.y - 0.5) * mouseInfluence * 50;
      
      const animationOffset = timeRef.current * speed * 10;
      const x = Math.sin(animationOffset) * 10 + mouseOffsetX;
      const y = Math.cos(animationOffset * 0.8) * 8 + mouseOffsetY;
      
      layer.style.transform = `translate3d(${x}px, ${y}px, 0) scale(${1.2 + index * 0.1})`;
    });
    
    animationRef.current = requestAnimationFrame(animate);
  };

  // Intersection observer for performance optimization
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0 }
    );
    
    if (containerRef.current) {
      observer.observe(containerRef.current);
    }
    
    return () => observer.disconnect();
  }, []);

  // Initialize and start animation
  useEffect(() => {
    if (!isVisible) return;
    
    const container = containerRef.current;
    if (!container) return;

    // Add mouse event listeners
    container.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousemove', handleMouseMove);
    
    // Start animation
    animate();
    
    return () => {
      container.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isVisible]);

  // Create noise layers data
  const [noiseLayers] = useState(() => createNoiseLayers());

  return (
    <div 
      ref={containerRef}
      className="relative overflow-hidden min-h-screen"
      style={{
        background: `linear-gradient(135deg, ${gradientColors.join(', ')})`
      }}
    >
      {/* Noise texture layers */}
      {noiseLayers.map((layer, index) => (
        <div
          key={layer.id}
          className="noise-layer absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${layer.dataUrl})`,
            backgroundSize: '200px 200px',
            backgroundRepeat: 'repeat',
            opacity: layer.opacity,
            mixBlendMode: index % 2 === 0 ? 'overlay' : 'soft-light',
            filter: 'contrast(150%) brightness(120%)',
            willChange: 'transform'
          }}
        />
      ))}
      
      {/* Additional grain overlay for fine texture */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 100%)',
          mixBlendMode: 'multiply'
        }}
      />
      
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
      
      {/* Style injection for animations */}
      <style jsx>{`
        @keyframes subtleFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-2px); }
        }
        
        .noise-layer {
          animation: subtleFloat 8s ease-in-out infinite;
          animation-delay: calc(var(--layer-index, 0) * -2s);
        }
        
        @media (prefers-reduced-motion: reduce) {
          .noise-layer {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};

// Demo component showing usage
const NoiseBackgroundDemo = () => {
  return (
    <ReactiveNoiseBackground
      noiseOpacity={0.06}
      animationSpeed={0.0008}
      mouseInfluence={0.025}
      gradientColors={['#0f172a', '#1e293b', '#334155', '#475569']}
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center text-white p-8">
          <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-300">
            Reactive Noise
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl">
            Move your mouse around to see the subtle reactive noise texture effect. 
            The background responds to your cursor position with smooth, animated grain.
          </p>
          <button className="px-8 py-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition-all duration-300">
            Interact with the background
          </button>
        </div>
      </div>
    </ReactiveNoiseBackground>
  );
};

export default NoiseBackgroundDemo;