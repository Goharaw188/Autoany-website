import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import HeroBentoCard from "./HeroBentoCard";
import StarBorder from "./StarBorder";
import AutomationGrid from "./AutomationGrid";
import PlatformLoop from "./PlatformLoop";


export function BotIcon({ size = 48, color = '#41B9D5' }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block' }}
      aria-hidden="true"
    >
      <rect x="5" y="8" width="14" height="10" rx="3" />
      <circle cx="9" cy="13" r="1.8" />
      <circle cx="15" cy="13" r="1.8" />
      <path d="M12 4v2m-6 14h12" />
      <circle cx="12" cy="3" r="1" />
    </svg>
  );
}

export function WorkflowIconAnimated({ size = 48, color = 'currentColor', animateOnLoad = false }) {
  const id = 'aa-flow';
  return (
    <svg
      id={id}
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ display: 'inline-block' }}
      aria-hidden="true"
    >
      <style>{`
        #${id} .aa-s { stroke-dasharray: 100; stroke-dashoffset: 100; }
        #${id}:hover .aa-s { animation: aa-draw 1s cubic-bezier(.22,1,.36,1) forwards; }
        ${animateOnLoad ? `#${id} .aa-s { animation: aa-draw 1s cubic-bezier(.22,1,.36,1) forwards; }` : ''}
        @keyframes aa-draw { to { stroke-dashoffset: 0; } }
        @media (prefers-reduced-motion: reduce){
          #${id}:hover .aa-s, #${id} .aa-s { animation: none !important; }
        }
      `}</style>

      <rect className="aa-s" x="3" y="4" width="6" height="4" rx="1" />
      <rect className="aa-s" x="15" y="4" width="6" height="4" rx="1" />
      <rect className="aa-s" x="9" y="16" width="6" height="4" rx="1" />
      <path className="aa-s" d="M9 6h6m3 8-3-3m0 0h-4m4 0v-3" />
      <circle className="aa-s" cx="18" cy="14" r="1.8" />
    </svg>
  );
}

export function ApiPlugIcon({ size = 48, color = 'currentColor', id = 'aa-api' }) {
  return (
    <svg id={id} viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block' }} aria-hidden="true">
      <style>{`
        #${id}{ transform-box:fill-box; transform-origin:50% 50%; }
        #${id}:hover{ animation:${id}-wiggle 800ms ease-in-out 1; }
        @keyframes ${id}-wiggle { 0%{transform:rotate(0)} 40%{transform:rotate(-6deg)} 80%{transform:rotate(3deg)} 100%{transform:rotate(0)} }
        @media (prefers-reduced-motion:reduce){ #${id}:hover{ animation:none } }
      `}</style>
      <rect x="3" y="13" width="6" height="6" rx="1.2" />
      <path d="M7 8l4 4m-4-4l2-2a4 4 0 0 1 5.7 0l3.3 3.3a4 4 0 0 1 0 5.7l-2 2m-2 2-4-4" />
    </svg>
  );
}

export function EmailIcon({ size = 48, color = 'currentColor', id = 'aa-email' }) {
  return (
    <svg id={id} viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke={color} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block' }} aria-hidden="true">
      <style>{`
        #${id} .aa-s{ stroke-dasharray:100; stroke-dashoffset:100; }
        #${id}:hover .aa-s{ animation:${id}-draw 1s cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes ${id}-draw { to{ stroke-dashoffset:0 } }
        @media (prefers-reduced-motion:reduce){ #${id}:hover .aa-s{ animation:none } }
      `}</style>
      <rect className="aa-s" x="3" y="5" width="18" height="14" rx="2" />
      <path className="aa-s" d="M3 7l9 6 9-6" />
    </svg>
  );
}

export function DatabaseIcon({ size = 48, color = 'currentColor', id = 'aa-db' }) {
  return (
    <svg id={id} viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block' }} aria-hidden="true">
      <style>{`
        #${id} .aa-s{ opacity:.95; animation:${id}-pulse 2.6s ease-in-out infinite; }
        @keyframes ${id}-pulse { 50%{ opacity:.65 } }
        @media (prefers-reduced-motion:reduce){ #${id} .aa-s{ animation:none } }
      `}</style>
      <ellipse className="aa-s" cx="12" cy="6" rx="7" ry="3.2" />
      <path   className="aa-s" d="M5 6v6c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2V6" />
      <path   className="aa-s" d="M5 12v6c0 1.8 3.1 3.2 7 3.2s7-1.4 7-3.2v-6" />
    </svg>
  );
}

// Unified pulse animation component for all icons
export function PulseIcon({ children, size = 48, color = 'currentColor', id = 'aa-pulse' }) {
  return (
    <svg id={id} viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block' }} aria-hidden="true">
      <style>{`
        #${id} .aa-s{ opacity:.95; animation:${id}-pulse 2.6s ease-in-out infinite; }
        @keyframes ${id}-pulse { 50%{ opacity:.65 } }
        @media (prefers-reduced-motion:reduce){ #${id} .aa-s{ animation:none } }
      `}</style>
      {children}
    </svg>
  );
}

export function CalendarClockIcon({ size = 48, color = 'currentColor', id = 'aa-cal' }) {
  return (
    <svg id={id} viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block' }} aria-hidden="true">
      <style>{`
        #${id} .hand{ transform-box:fill-box; transform-origin:50% 50%; animation:${id}-tick 8s linear infinite; }
        @keyframes ${id}-tick { to{ transform:rotate(360deg) } }
        @media (prefers-reduced-motion:reduce){ #${id} .hand{ animation:none } }
      `}</style>
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M7 3v4M17 3v4M3 9h18" />
      <circle cx="16.5" cy="15.5" r="3.5" />
      <g className="hand">
        <path d="M16.5 15.5v-2" />
        <path d="M16.5 15.5l1.4 1" />
      </g>
    </svg>
  );
}

export function ShieldCheckIcon({ size = 48, color = 'currentColor', id = 'aa-shield' }) {
  return (
    <svg id={id} viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block' }} aria-hidden="true">
      <style>{`
        #${id} .draw{ stroke-dasharray:100; stroke-dashoffset:100; }
        #${id}:hover .draw{ animation:${id}-draw 900ms cubic-bezier(.22,1,.36,1) forwards; }
        @keyframes ${id}-draw { to{ stroke-dashoffset:0 } }
        @media (prefers-reduced-motion:reduce){ #${id}:hover .draw{ animation:none } }
      `}</style>
      <path d="M12 3l7 3v6c0 5-3.5 7.8-7 9-3.5-1.2-7-4-7-9V6l7-3z" />
      <path className="draw" d="M8.5 12l2.5 2.5L16 9.5" />
    </svg>
  );
}

export function BoltIcon({ size = 48, color = 'currentColor', id = 'aa-bolt-tilt' }) {
  return (
    <svg id={id} viewBox="0 0 24 24" width={size} height={size}
      fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
      style={{ display: 'inline-block' }} aria-hidden="true">
      <style>{`
        #${id}{ transform-box:fill-box; transform-origin:50% 50%; }
        #${id}:hover{ animation:${id}-tilt 1.2s ease-in-out 1; }
        @keyframes ${id}-tilt { 0%{transform:rotate(0)} 40%{transform:rotate(-5deg)} 80%{transform:rotate(3deg)} 100%{transform:rotate(0)} }
        @media (prefers-reduced-motion:reduce){ #${id}:hover{ animation:none } }
      `}</style>
      <path d="M13 2L4 14h6l-1 8 9-12h-6l1-8z" />
    </svg>
  );
}

const Hero = () => {
  const [typedText, setTypedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopIndex, setLoopIndex] = useState(0);

  const phrases = ["Achieve Anything."];

  useEffect(() => {
    const currentPhrase = phrases[loopIndex % phrases.length];
    let typingSpeed = isDeleting ? 50 : 100;

    const type = () => {
      setTypedText((prev) =>
        isDeleting
          ? currentPhrase.substring(0, prev.length - 1)
          : currentPhrase.substring(0, prev.length + 1)
      );

      if (!isDeleting && typedText === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1200);
      }

      if (isDeleting && typedText === "") {
        setIsDeleting(false);
        setLoopIndex((prev) => (prev + 1) % phrases.length);
      }
    };

    const timer = setTimeout(type, typingSpeed);
    return () => clearTimeout(timer);
  }, [typedText, isDeleting, loopIndex]);

  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen w-full pt-16">

              <div className="relative content-layer">
          {/* Hero Content */}
          <div className="min-h-[80vh] flex flex-col lg:flex-row items-center justify-between px-8 lg:px-16 gap-8 lg:gap-12">
            <div className="text-left max-w-2xl lg:max-w-xl">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white mb-3 font-heading text-contrast">
            Automate Everything.
          </h1>
          
          <div className="text-lg md:text-xl lg:text-2xl font-semibold text-[#41B8D5] font-mono whitespace-nowrap mb-6">
            {typedText}
            <span className="animate-pulse ml-1">|</span>
          </div>

          <div className="mb-8">
            <HeroBentoCard
              text="Partner with autoany to identify high-impact automation opportunities, implement intelligent solutions, and transform your business operations with measurable results."
              enableSpotlight={true}
              enableTilt={true}
              enableMagnetism={true}
              clickEffect={true}
              spotlightRadius={200}
              particleCount={8}
              glowColor="65, 184, 213"
              style={{
                fontSize: "14px",
                lineHeight: "1.5",
                padding: "16px"
              }}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-start">
            <StarBorder
              as="button"
              color="#41B8D5"
              speed="5s"
              className="font-semibold"
              onClick={() => handleSmoothScroll('contact')}
            >
              Get Free Consultation
            </StarBorder>
          </div>
        </div>
        
        {/* Automation Grid */}
        <div className="flex items-center justify-center w-full lg:w-auto">
          <AutomationGrid />
        </div>
        </div>
        
        {/* Platform Loop */}
        <div className="absolute -bottom-6 left-0 right-0">
          <PlatformLoop />
        </div>
      </div>
    </section>
  );
};

export default Hero;