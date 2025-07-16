import React from 'react';

interface BgBlurProps {
  color1: string;
  color2: string;
  color3: string;
  blur?: number; // px
}

export const BgBlur100: React.FC<BgBlurProps> = ({ color1, color2, color3, blur = 50 }) => (
  <div id="bg-blur-100" style={{ 
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '400px',
    background: `radial-gradient(circle, ${color1} 0%, ${color2} 51%, ${color3} 100%)`,
    filter: `blur(${blur}px)`,
    mixBlendMode: 'soft-light',
    zIndex: -1
  }}></div>
);

export const BgBlur250: React.FC<BgBlurProps> = ({ color1, color2, color3, blur = 125 }) => (
  <div id="bg-blur-250" style={{ 
    position: 'absolute',
    top: '35%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '100%',
    height: '400px',
    background: `radial-gradient(circle, ${color1} 0%, ${color2} 51%, ${color3} 100%)`,
    filter: `blur(${blur}px)`,
    opacity: 0.75,
    zIndex: -2
  }}></div>
); 