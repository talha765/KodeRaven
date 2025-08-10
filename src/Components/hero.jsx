import React from "react";
import ShaderGradientComponent from "./ShaderGradient";
import NoiseBackgroundDemo from "./NoiseBackgroundDemo";
const Hero = () => {
  return (
<<<<<<< Updated upstream
    <div className="relative w-screen h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-[#000000] pt-16">
=======
    <div className="relative w-screen min-h-screen flex flex-col items-center text-white overflow-visible bg-[#000000] pt-24">
>>>>>>> Stashed changes
    
      <div className="absolute inset-0 z-0 overflow-visible">
        <ShaderGradientComponent />
      </div>
      <div className="relative z-10 text-left mt-20">
                 <h1 
           style={{
             color: '#EFF6EE',
             fontFamily: 'Blauer Nue',
             fontSize: '72px',
             fontStyle: 'normal',
           }}
         >
           Your product, our code. <br />
           AI-enhanced
           <span className="text-purple-400">
             .
           </span>
         </h1>
        <h3 
          style={{
            color: '#EFF6EE',
            fontFamily: 'Outfit',
            fontSize: '24px',
            fontStyle: 'normal',
            fontWeight: 300,
            marginTop: '20px',
            lineHeight: 'normal',
          }}
        >
          Let's build something game-changing.
        </h3>
      </div>
      
      {/* Placeholder sections for scroll gradient testing */}
      <div className="relative z-10 w-full max-w-4xl px-4 space-y-32 mt-32">
        {/* Section 1 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Section 1</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            This is a placeholder section to test how the ShaderGradient flows as you scroll. 
            The gradient should continue flowing down the page without being cut off.
          </p>
        </div>

        {/* Section 2 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Section 2</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Keep scrolling to see the gradient animation continue. The overflow-visible property 
            should allow the ShaderGradient to extend beyond the hero section.
          </p>
        </div>

        {/* Section 3 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <h2 className="text-3xl font-bold text-white mb-4">Section 3</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            Notice how the gradient background flows seamlessly through all sections. 
            This creates a beautiful continuous visual experience as you scroll.
          </p>
        </div>

        {/* Section 4 */}
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 mb-32">
          <h2 className="text-3xl font-bold text-white mb-4">Section 4</h2>
          <p className="text-white/80 text-lg leading-relaxed">
            The ShaderGradient should now be visible throughout the entire scroll experience, 
            creating a cohesive and immersive background effect.
          </p>
        </div>
      </div>
      
      {/* Placeholder cat image for scroll testing */}
  
    </div>
  );
};

export default Hero;
