import React from "react";
import ShaderGradientComponent from "./ShaderGradient";
import NoiseBackgroundDemo from "./NoiseBackgroundDemo";
const Hero = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-[#000000] pt-16">
    
      <ShaderGradientComponent />
    </div>
  );
};

export default Hero;
