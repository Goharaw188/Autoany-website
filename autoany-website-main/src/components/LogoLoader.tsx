import { useEffect, useState } from "react";
import logo from "@/assets/text logo main.png";

const LogoLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [stage, setStage] = useState(0);
  
  // Choose your animation style here:
  const ANIMATION_STYLE = "professional"; // Options: "professional", "glow", "blur-focus", "slide-up", "zoom-focus", "shimmer", "build", "pulse", "simple"
  
  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    
    if (ANIMATION_STYLE === "build") {
      // Multi-stage build animation (3.5 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 500),
        setTimeout(() => setStage(2), 1200),
        setTimeout(() => setStage(3), 2000),
        setTimeout(() => setStage(4), 2800),
        setTimeout(() => {
          setStage(5);
          onComplete();
        }, 3500)
      ];
    } else if (ANIMATION_STYLE === "professional") {
      // Clean professional animation (2.5 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 600),
        setTimeout(() => setStage(2), 1200),
        setTimeout(() => {
          setStage(3);
          onComplete();
        }, 2500)
      ];
    } else if (ANIMATION_STYLE === "glow") {
      // Elegant glow effect (3 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 400),
        setTimeout(() => setStage(2), 1000),
        setTimeout(() => setStage(3), 1800),
        setTimeout(() => {
          setStage(4);
          onComplete();
        }, 3000)
      ];
    } else if (ANIMATION_STYLE === "blur-focus") {
      // Blur to focus effect (2.5 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 500),
        setTimeout(() => setStage(2), 1200),
        setTimeout(() => {
          setStage(3);
          onComplete();
        }, 2500)
      ];
    } else if (ANIMATION_STYLE === "slide-up") {
      // Slide up from bottom (2.3 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 400),
        setTimeout(() => setStage(2), 1000),
        setTimeout(() => {
          setStage(3);
          onComplete();
        }, 2300)
      ];
    } else if (ANIMATION_STYLE === "zoom-focus") {
      // Zoom in from distance (2.8 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 500),
        setTimeout(() => setStage(2), 1300),
        setTimeout(() => {
          setStage(3);
          onComplete();
        }, 2800)
      ];
    } else if (ANIMATION_STYLE === "pulse") {
      // Pulse animation (2.5 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 300),
        setTimeout(() => setStage(2), 800),
        setTimeout(() => {
          setStage(3);
          onComplete();
        }, 2500)
      ];
    } else if (ANIMATION_STYLE === "shimmer") {
      // Shimmer animation (2.5 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 400),
        setTimeout(() => setStage(2), 1000),
        setTimeout(() => {
          setStage(3);
          onComplete();
        }, 2500)
      ];
    } else {
      // Simple animation (2 seconds)
      timeouts = [
        setTimeout(() => setStage(1), 600),
        setTimeout(() => {
          setStage(2);
          onComplete();
        }, 2000)
      ];
    }

    return () => timeouts.forEach(clearTimeout);
  }, [onComplete]);

  // Render based on animation style
  const renderAnimation = () => {
    switch (ANIMATION_STYLE) {
      case "professional":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-all duration-1000 ${
              stage === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="relative">
              <img
                src={logo}
                alt="autoany"
                className={`w-80 h-auto transition-all duration-1000 ease-out ${
                  stage >= 1 
                    ? stage >= 2
                      ? "opacity-100 scale-100 drop-shadow-lg"
                      : "opacity-60 scale-95"
                    : "opacity-0 scale-90"
                }`}
                style={{
                  filter: stage >= 2 ? "drop-shadow(0 4px 20px hsl(var(--primary) / 0.15))" : "none"
                }}
              />
              
              {/* Subtle professional glow */}
              {stage >= 2 && (
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 rounded-lg blur-xl"></div>
              )}
            </div>
          </div>
        );

      case "glow":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-1000 ${
              stage === 4 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ backgroundColor: "#f8fafc" }}
          >
            <div className="relative">
              <img
                src={logo}
                alt="autoany"
                className={`w-80 h-auto transition-all duration-1200 ease-out ${
                  stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-80"
                }`}
                style={{
                  filter: stage >= 3 
                    ? "drop-shadow(0 0 40px hsl(var(--primary) / 0.4)) drop-shadow(0 0 80px hsl(var(--primary) / 0.2))" 
                    : stage >= 2
                    ? "drop-shadow(0 0 20px hsl(var(--primary) / 0.3))"
                    : "none"
                }}
              />
              
              {/* Expanding glow rings */}
              {stage >= 2 && (
                <>
                  <div className="absolute inset-0 bg-primary/10 rounded-full animate-ping"></div>
                  {stage >= 3 && (
                    <div className="absolute inset-0 bg-primary/5 rounded-full animate-ping animation-delay-500"></div>
                  )}
                </>
              )}
            </div>
          </div>
        );

      case "blur-focus":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-all duration-1000 ${
              stage === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <img
              src={logo}
              alt="autoany"
              className={`w-80 h-auto transition-all duration-1500 ease-out ${
                stage >= 1 
                  ? stage >= 2
                    ? "opacity-100 scale-100"
                    : "opacity-100 scale-105"
                  : "opacity-0 scale-110"
              }`}
              style={{
                filter: stage >= 2 
                  ? "blur(0px) drop-shadow(0 4px 20px rgba(0, 0, 0, 0.1))" 
                  : stage >= 1
                  ? "blur(8px)"
                  : "blur(15px)"
              }}
            />
          </div>
        );

      case "slide-up":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-gradient-to-br from-gray-50 to-blue-50 transition-all duration-1000 ${
              stage === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <img
              src={logo}
              alt="autoany"
              className={`w-80 h-auto transition-all duration-1200 ease-out ${
                stage >= 1 
                  ? stage >= 2
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-80 translate-y-4 scale-95"
                  : "opacity-0 translate-y-16 scale-90"
              }`}
              style={{
                filter: stage >= 2 ? "drop-shadow(0 8px 32px hsl(var(--primary) / 0.15))" : "none"
              }}
            />
          </div>
        );

      case "zoom-focus":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-all duration-1000 ${
              stage === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="relative overflow-hidden">
              <img
                src={logo}
                alt="autoany"
                className={`w-80 h-auto transition-all duration-1500 ease-out ${
                  stage >= 1 
                    ? stage >= 2
                      ? "opacity-100 scale-100"
                      : "opacity-100 scale-150"
                    : "opacity-0 scale-200"
                }`}
                style={{
                  filter: stage >= 2 ? "drop-shadow(0 4px 20px rgba(0, 0, 0, 0.08))" : "none"
                }}
              />
              
              {/* Mask overlay for zoom effect */}
              {stage < 2 && (
                <div className="absolute inset-0 bg-white/20 backdrop-blur-sm"></div>
              )}
            </div>
          </div>
        );

      case "build":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-1000 ${
              stage === 5 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{
              background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 50%, #e2e8f0 100%)"
            }}
          >
            {/* Animated background */}
            <div className={`absolute inset-0 transition-opacity duration-1000 ${stage >= 1 ? "opacity-100" : "opacity-0"}`}>
              <div className="absolute inset-0 opacity-5">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `
                      radial-gradient(circle at 20% 30%, hsl(var(--primary)) 0%, transparent 50%),
                      radial-gradient(circle at 80% 70%, hsl(var(--primary)) 0%, transparent 50%)
                    `
                  }}
                />
              </div>
            </div>

            {/* Logo container */}
            <div className="relative flex flex-col items-center">
              <div
                className={`transition-all duration-1000 ease-out ${
                  stage >= 2 
                    ? stage >= 3 
                      ? "opacity-100 scale-110" 
                      : "opacity-100 scale-100"
                    : "opacity-0 scale-50"
                }`}
              >
                <img
                  src={logo}
                  alt="autoany"
                  className="w-80 h-auto drop-shadow-2xl"
                  style={{
                    filter: stage >= 3 ? "drop-shadow(0 0 40px hsl(var(--primary) / 0.4))" : "none"
                  }}
                />
                
                {/* Shimmer effect */}
                {stage >= 4 && (
                  <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer" />
                  </div>
                )}
              </div>

              {/* Loading text */}
              <div className={`mt-8 transition-all duration-500 ${stage >= 2 && stage < 5 ? "opacity-100" : "opacity-0"}`}>
                <p className="text-xl text-gray-600 font-medium">
                  {stage === 2 ? "Loading autoany..." : stage === 3 ? "Preparing automation..." : stage === 4 ? "Ready!" : ""}
                </p>
              </div>
            </div>
          </div>
        );

      case "pulse":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-all duration-800 ${
              stage === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <div className="relative">
              <img
                src={logo}
                alt="autoany"
                className={`w-72 h-auto transition-all duration-1000 ${
                  stage >= 1 
                    ? stage >= 2
                      ? "opacity-100 scale-100 animate-pulse"
                      : "opacity-100 scale-100"
                    : "opacity-0 scale-80"
                }`}
              />
              
              {/* Pulse rings */}
              {stage >= 2 && (
                <>
                  <div className="absolute inset-0 border-4 border-primary/30 rounded-full animate-ping"></div>
                  <div className="absolute inset-0 border-2 border-primary/20 rounded-full animate-ping animation-delay-500"></div>
                </>
              )}
            </div>
          </div>
        );

      case "shimmer":
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center transition-all duration-800 ${
              stage === 3 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
            style={{ backgroundColor: "#BCBEC0" }}
          >
            <div className="relative w-80 h-auto">
              <img
                src={logo}
                alt="autoany"
                className={`w-full h-auto transition-all duration-1200 ease-out ${
                  stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-70"
                }`}
              />
              
              {/* Shimmer effect */}
              {stage >= 2 && (
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-0 left-[-100%] w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent animate-shimmer" />
                </div>
              )}
            </div>
          </div>
        );

      default: // "simple"
        return (
          <div
            className={`fixed inset-0 z-[999] flex items-center justify-center bg-white transition-all duration-800 ${
              stage === 2 ? "opacity-0 pointer-events-none" : "opacity-100"
            }`}
          >
            <img
              src={logo}
              alt="autoany"
              className={`w-72 h-auto transition-all duration-1000 ease-out ${
                stage >= 1 ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            />
          </div>
        );
    }
  };

  return (
    <>
      {renderAnimation()}
      
      {/* CSS for animations */}
      <style jsx>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 1.5s ease-in-out;
        }
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        .animation-delay-1000 {
          animation-delay: 1s;
        }
      `}</style>
    </>
  );
};

export default LogoLoader;