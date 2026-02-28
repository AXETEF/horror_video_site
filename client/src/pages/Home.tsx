import { useEffect, useRef, useState } from 'react';

/**
 * Horror Video Site - Full Screen TV Static Effect
 * Design Philosophy: Dark horror aesthetic inspired by SAW film
 * - Deep blacks and blood reds
 * - Glitch effects and TV static
 * - Pulsing animations and distortion
 * - Immersive fullscreen experience
 */

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [showStatic, setShowStatic] = useState(false);
  const [staticIntensity, setStaticIntensity] = useState(0);

  const handleEnter = () => {
    // Start with TV static effect
    setShowStatic(true);
    setStaticIntensity(1);

    // Play static sound and show video after 2 seconds
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
        setShowStatic(false);
      }
    }, 2000);
  };

  const handleVideoEnd = () => {
    // Show static again at the end
    setShowStatic(true);
    setStaticIntensity(1);

    // Close browser after 3 seconds
    setTimeout(() => {
      window.close();
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Background with subtle grain effect */}
      <div className="absolute inset-0 bg-black opacity-90" />
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg"%3E%3Cfilter id="noiseFilter"%3E%3CfeTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="4" seed="2" /%3E%3C/filter%3E%3Crect width="400" height="400" filter="url(%23noiseFilter)" /%3E%3C/svg%3E")',
          backgroundSize: '200px 200px',
        }}
      />

      {/* Main content container */}
      <div className="relative z-10 w-full h-screen flex items-center justify-center">
        {/* TV Static Effect */}
        {showStatic && (
          <div
            className="absolute inset-0 z-50 pointer-events-none"
            style={{
              opacity: staticIntensity,
              backgroundImage:
                'url("data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 /%3E%3C/filter%3E%3Crect width=%22100%22 height=%22100%22 fill=%22white%22 filter=%22url(%23noise)%22 opacity=%220.3%22 /%3E%3C/svg%3E")',
              animation: 'flicker 0.15s infinite',
            }}
          />
        )}

        {/* Video Player Container */}
        <div className="relative w-full h-full max-w-4xl max-h-screen">
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            onEnded={handleVideoEnd}
            style={{
              filter: showStatic ? 'brightness(0.5) contrast(1.5)' : 'brightness(1)',
            }}
          >
            <source src="/horror.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>

        {/* Entry Screen - Before clicking */}
        {!videoRef.current?.currentTime && (
          <div className="absolute inset-0 z-40 bg-black flex flex-col items-center justify-center">
            {/* Pulsing red glow */}
            <div
              className="absolute inset-0 opacity-20"
              style={{
                background: 'radial-gradient(circle, rgba(220,20,60,0.3) 0%, transparent 70%)',
                animation: 'pulse 2s ease-in-out infinite',
              }}
            />

            {/* Main text content */}
            <div className="relative z-10 text-center px-6">
              <h1
                className="text-5xl md:text-7xl font-black mb-6 tracking-wider"
                style={{
                  color: '#dc143c',
                  textShadow: '0 0 20px rgba(220,20,60,0.8), 0 0 40px rgba(0,0,0,0.9)',
                  fontFamily: '"Arial Black", sans-serif',
                  letterSpacing: '0.1em',
                  animation: 'glitch 0.3s ease-in-out infinite',
                }}
              >
                ⚠️ WARNING ⚠️
              </h1>

              <p
                className="text-lg md:text-2xl mb-12 font-bold"
                style={{
                  color: '#ff4444',
                  textShadow: '0 0 10px rgba(220,20,60,0.6)',
                  fontFamily: '"Arial", sans-serif',
                }}
              >
                SOMETHING WANTS TO SHOW YOU SOMETHING
              </p>

              {/* Click to enter button */}
              <button
                onClick={handleEnter}
                className="px-8 py-4 md:px-12 md:py-6 text-xl md:text-2xl font-black uppercase tracking-widest transition-all duration-300 relative"
                style={{
                  background: 'linear-gradient(135deg, #dc143c 0%, #8b0000 100%)',
                  color: '#000',
                  textShadow: '0 0 5px rgba(255,255,255,0.5)',
                  boxShadow: '0 0 30px rgba(220,20,60,0.8), inset 0 0 20px rgba(255,255,255,0.1)',
                  border: '3px solid #ff4444',
                  cursor: 'pointer',
                  animation: 'pulse-button 1.5s ease-in-out infinite',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 50px rgba(220,20,60,1), inset 0 0 30px rgba(255,255,255,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 30px rgba(220,20,60,0.8), inset 0 0 20px rgba(255,255,255,0.1)';
                }}
              >
                ENTER
              </button>

              <p
                className="text-sm md:text-base mt-8 opacity-70"
                style={{
                  color: '#999',
                  fontFamily: '"Courier New", monospace',
                }}
              >
                [FULLSCREEN MODE ACTIVATED]
              </p>
            </div>
          </div>
        )}
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes flicker {
          0% { opacity: 0.97; }
          5% { opacity: 0.1; }
          10% { opacity: 0.9; }
          15% { opacity: 0.1; }
          20% { opacity: 0.8; }
          25% { opacity: 0.1; }
          30% { opacity: 0.7; }
          100% { opacity: 0.1; }
        }

        @keyframes glitch {
          0% { transform: translate(0); }
          20% { transform: translate(-2px, 2px); }
          40% { transform: translate(-2px, -2px); }
          60% { transform: translate(2px, 2px); }
          80% { transform: translate(2px, -2px); }
          100% { transform: translate(0); }
        }

        @keyframes pulse-button {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }

        @keyframes pulse {
          0%, 100% { opacity: 0.2; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
