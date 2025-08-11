import React from 'react'
import { ShaderGradientCanvas, ShaderGradient } from '@shadergradient/react'

function ShaderGradientComponent() {
  return (
    <div className="relative w-full">
      <ShaderGradientCanvas
        onMouseDown={(e) => e.preventDefault()}
        onWheel={(e) => e.preventDefault()}
        onTouchStart={(e) => e.preventDefault()}
        onTouchMove={(e) => e.preventDefault()}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100vh', // Back to viewport height
          pointerEvents: 'none',
          userSelect: 'none',
        }}
      >
        <ShaderGradient
          control='query'
          urlString='https://www.shadergradient.co/customize?animate=on&axesHelper=off&bgColor1=%23000000&bgColor2=%23000000&brightness=0.8&cAzimuthAngle=270&cDistance=0.5&cPolarAngle=180&cameraZoom=15.1&color1=%23DEB8E2&color2=%23CF68B5&color3=%231E2B6C&destination=onCanvas&embedMode=off&envPreset=city&format=gif&fov=45&frameRate=10&gizmoHelper=hide&grain=on&lightType=env&pixelDensity=1&positionX=-0.1&positionY=0&positionZ=0&range=enabled&rangeEnd=40&rangeStart=0&reflection=0.4&rotationX=0&rotationY=130&rotationZ=70&shader=defaults&type=sphere&uAmplitude=3.2&uDensity=0.8&uFrequency=5.5&uSpeed=0.3&uStrength=0.3&uTime=0&wireframe=false'
        />
      </ShaderGradientCanvas>
      
      {/* Smooth fade-out overlay that starts earlier */}
      <div 
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{
          height: '100vh',
          background: 'linear-gradient(to bottom, transparent 0%, transparent 40%, rgba(0,0,0,0.2) 60%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.9) 100%)',
          zIndex: 1
        }}
      />
    </div>
  )
}

export default ShaderGradientComponent;