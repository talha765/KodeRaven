import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import VANTA from "vanta/dist/vanta.particles.min";

const Background = () => {
  const vantaRef = useRef(null);
  const vantaEffect = useRef(null);

  useEffect(() => {
    if (!vantaEffect.current) {
      vantaEffect.current = VANTA({
        el: vantaRef.current,
        THREE: THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0xff3f81, // particle color
        backgroundColor: 0x0a0a0a, // background color
        size: 2.0, // particle size
        speed: 1.0,
      });
    }
    return () => {
      if (vantaEffect.current) vantaEffect.current.destroy();
    };
  }, []);

  return <div ref={vantaRef} style={{ width: "100%", height: "100vh" }}></div>;
};

export default Background;
