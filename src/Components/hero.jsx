import React from "react";
import WebGLHeroBackground from './WebGLHeroBackground'

const Hero = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-[#0a0a0a]">
      <WebGLHeroBackground />

      {/* Content */}
     
      <div className="relative mt-8 flex space-x-5">
       
      </div>
    </div>
  );
};

export default Hero;
