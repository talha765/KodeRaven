import React from "react";
import ShaderGradientComponent from "./ShaderGradient";
import NoiseBackgroundDemo from "./NoiseBackgroundDemo";
import Button from "./Button";
import AboutUsButton from "./AboutUsButton";
import hassam from "../assets/hassam.jpg";
import talha from "../assets/talha.jpg";
import suri from "../assets/suri.jpg";
import zozi from "../assets/zozi.png";

const Hero = () => {
  return (
    <div className="relative w-screen min-h-screen flex flex-col items-center text-white overflow-visible bg-[#000000] pt-24">
    
      <div className="absolute inset-0 z-0 overflow-visible">
        <ShaderGradientComponent />
      </div>
      
      {/* Hero Content */}
      <div className="relative z-10 text-center max-w-4xl px-4 mt-20">
        <h1 
          style={{
            color: '#EFF6EE',
            fontFamily: 'Blauer Nue',
            fontSize: '72px',
            fontStyle: 'normal',
            textAlign: 'left',
            alignSelf: 'stretch'
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
            textAlign: 'left',
            alignSelf: 'stretch'
          }}
        >
          Let's build something game-changing.
        </h3>
        
        {/* Buttons Container */}
        <div className="mt-8 flex justify-start gap-4 items-center">
          <div className="h-12 flex items-center">
            <Button>Book a Free Consultation</Button>
          </div>
          <div className="h-12 flex items-center">
            <AboutUsButton 
              images={[talha, hassam, suri, zozi]}
              onClick={() => console.log('About Us clicked')}
            />
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Hero;
