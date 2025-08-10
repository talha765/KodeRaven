import React from "react";
import ShaderGradientComponent from "./ShaderGradient";
import NoiseBackgroundDemo from "./NoiseBackgroundDemo";
import GlassAboutButton from "./GlassAboutButton";
const Hero = () => {
  return (
    <div className="relative w-screen h-screen flex flex-col justify-center items-center text-white overflow-hidden bg-transparent pt-24">
      
      <ShaderGradientComponent />

      <div className="relative z-10 mt-10">
        <GlassAboutButton />
      </div>
    </div>
  );
};

export default Hero;
