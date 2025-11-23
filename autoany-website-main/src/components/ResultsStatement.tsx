import { useEffect, useRef, useState } from "react";
import { ArrowRight, Zap, Target, TrendingUp, Clock, Star, CheckCircle, Award } from "lucide-react";

// React Bits Components
interface FadeContentProps {
  children: React.ReactNode;
  blur?: boolean;
  duration?: number;
  easing?: string;
  delay?: number;
  threshold?: number;
  initialOpacity?: number;
  className?: string;
}

const FadeContent: React.FC<FadeContentProps> = ({
  children,
  blur = false,
  duration = 1000,
  easing = "ease-out",
  delay = 0,
  threshold = 0.1,
  initialOpacity = 0,
  className = "",
}) => {
  const [inView, setInView] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(element);
          setTimeout(() => {
            setInView(true);
          }, delay);
        }
      },
      { threshold }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: inView ? 1 : initialOpacity,
        transition: `opacity ${duration}ms ${easing}, filter ${duration}ms ${easing}`,
        filter: blur ? (inView ? 'blur(0px)' : 'blur(10px)') : 'none',
      }}
    >
      {children}
    </div>
  );
};

interface AnimatedContentProps {
  children: React.ReactNode;
  distance?: number;
  direction?: "vertical" | "horizontal";
  reverse?: boolean;
  duration?: number;
  ease?: string;
  initialOpacity?: number;
  animateOpacity?: boolean;
  scale?: number;
  threshold?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

const AnimatedContent: React.FC<AnimatedContentProps> = ({
  children,
  distance = 100,
  direction = "vertical",
  reverse = false,
  duration = 0.8,
  ease = "power3.out",
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.1,
  delay = 0,
  onComplete,
  className = "",
}) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const axis = direction === "horizontal" ? "x" : "y";
    const offset = reverse ? -distance : distance;
    const startPct = (1 - threshold) * 100;

    // Set initial state
    el.style.transform = `${axis === 'x' ? 'translateX' : 'translateY'}(${offset}px) scale(${scale})`;
    el.style.opacity = animateOpacity ? initialOpacity.toString() : '1';

    // Create animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            el.style.transition = `transform ${duration}s ${ease}, opacity ${duration}s ${ease}`;
            el.style.transform = 'translateX(0px) translateY(0px) scale(1)';
            el.style.opacity = '1';
            
            setTimeout(() => {
              onComplete?.();
            }, duration * 1000);
          }, delay * 1000);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => observer.disconnect();
  }, [distance, direction, reverse, duration, ease, initialOpacity, animateOpacity, scale, threshold, delay, onComplete]);

  return <div ref={ref} className={className}>{children}</div>;
};

interface GlareHoverProps {
  width?: string;
  height?: string;
  background?: string;
  borderRadius?: string;
  borderColor?: string;
  children?: React.ReactNode;
  glareColor?: string;
  glareOpacity?: number;
  glareAngle?: number;
  glareSize?: number;
  transitionDuration?: number;
  playOnce?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const GlareHover: React.FC<GlareHoverProps> = ({
  width = "100%",
  height = "100%",
  background = "transparent",
  borderRadius = "16px",
  borderColor = "rgba(65, 185, 213, 0.1)",
  children,
  glareColor = "#41B9D5",
  glareOpacity = 0.3,
  glareAngle = -45,
  glareSize = 250,
  transitionDuration = 650,
  playOnce = false,
  className = "",
  style = {},
}) => {
  const hex = glareColor.replace("#", "");
  let rgba = glareColor;
  if (/^[\dA-Fa-f]{6}$/.test(hex)) {
    const r = parseInt(hex.slice(0, 2), 16);
    const g = parseInt(hex.slice(2, 4), 16);
    const b = parseInt(hex.slice(4, 6), 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  } else if (/^[\dA-Fa-f]{3}$/.test(hex)) {
    const r = parseInt(hex[0] + hex[0], 16);
    const g = parseInt(hex[1] + hex[1], 16);
    const b = parseInt(hex[2] + hex[2], 16);
    rgba = `rgba(${r}, ${g}, ${b}, ${glareOpacity})`;
  }

  const overlayRef = useRef<HTMLDivElement | null>(null);

  const animateIn = () => {
    const el = overlayRef.current;
    if (!el) return;

    el.style.transition = "none";
    el.style.backgroundPosition = "-100% -100%, 0 0";
    el.style.transition = `${transitionDuration}ms ease`;
    el.style.backgroundPosition = "100% 100%, 0 0";
  };

  const animateOut = () => {
    const el = overlayRef.current;
    if (!el) return;

    if (playOnce) {
      el.style.transition = "none";
      el.style.backgroundPosition = "-100% -100%, 0 0";
    } else {
      el.style.transition = `${transitionDuration}ms ease`;
      el.style.backgroundPosition = "-100% -100%, 0 0";
    }
  };

  const overlayStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background: `linear-gradient(${glareAngle}deg,
        hsla(0,0%,0%,0) 60%,
        ${rgba} 70%,
        hsla(0,0%,0%,0) 100%)`,
    backgroundSize: `${glareSize}% ${glareSize}%, 100% 100%`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-100% -100%, 0 0",
    pointerEvents: "none",
  };

  return (
    <div
      className={`relative grid place-items-center overflow-hidden border cursor-pointer ${className}`}
      style={{
        width,
        height,
        background,
        borderRadius,
        borderColor,
        ...style,
      }}
      onMouseEnter={animateIn}
      onMouseLeave={animateOut}
    >
      <div ref={overlayRef} style={overlayStyle} />
      {children}
    </div>
  );
};

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  disabled?: boolean;
  magnetStrength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
  wrapperClassName?: string;
  innerClassName?: string;
}

const Magnet: React.FC<MagnetProps> = ({
  children,
  padding = 100,
  disabled = false,
  magnetStrength = 2,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.5s ease-in-out",
  wrapperClassName = "",
  innerClassName = "",
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const magnetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (disabled) {
      setPosition({ x: 0, y: 0 });
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      if (!magnetRef.current) return;

      const { left, top, width, height } = magnetRef.current.getBoundingClientRect();
      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const distX = Math.abs(centerX - e.clientX);
      const distY = Math.abs(centerY - e.clientY);

      if (distX < width / 2 + padding && distY < height / 2 + padding) {
        setIsActive(true);
        const offsetX = (e.clientX - centerX) / magnetStrength;
        const offsetY = (e.clientY - centerY) / magnetStrength;
        setPosition({ x: offsetX, y: offsetY });
      } else {
        setIsActive(false);
        setPosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [padding, disabled, magnetStrength]);

  const transitionStyle = isActive ? activeTransition : inactiveTransition;

  return (
    <div
      ref={magnetRef}
      className={wrapperClassName}
      style={{ position: "relative", display: "inline-block" }}
    >
      <div
        className={innerClassName}
        style={{
          transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
          transition: transitionStyle,
          willChange: "transform",
        }}
      >
        {children}
      </div>
    </div>
  );
};

// Interactive Metric Card Component
interface MetricCardProps {
  icon: React.ComponentType<any>;
  title: string;
  value: string;
  description: string;
  delay: number;
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon: Icon, title, value, description, delay, color }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={cardRef}
      className={`relative group transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <GlareHover
        background="linear-gradient(135deg, rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.8))"
        borderColor={`rgba(65, 185, 213, ${isHovered ? 0.4 : 0.1})`}
        glareColor="#41B8D5"
        glareOpacity={0.3}
        className="h-full"
        style={{
          backdropFilter: "blur(12px)",
          transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          transform: isHovered ? 'translateY(-4px) scale(1.01)' : 'translateY(0) scale(1)',
        }}
      >
        <div className="p-4 w-full h-full flex flex-col items-center justify-center relative overflow-hidden">
          {/* Icon with Hover Effect */}
          <div className="relative mb-3">
            <div 
              className="relative z-10 transition-all duration-300"
              style={{
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
              }}
            >
              <Icon className="w-8 h-8" style={{ color: isHovered ? '#41B8D5' : '#ffffff' }} />
            </div>
          </div>

          {/* Content */}
          <h3 className="text-sm font-bold text-white mb-1 text-center font-heading">
            {title}
          </h3>
          <div 
            className="text-lg font-bold mb-2 text-center transition-all duration-300"
            style={{ 
              color: isHovered ? '#41B8D5' : '#ffffff',
              transform: isHovered ? 'scale(1.05)' : 'scale(1)',
            }}
          >
            {value}
          </div>
          <p className="text-xs text-gray-300 text-center leading-relaxed">
            {description}
          </p>

          {/* Hover Indicator */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-0.5 transition-all duration-300"
            style={{
              background: `linear-gradient(90deg, #41B8D5, #41B8D588)`,
              transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
              transformOrigin: 'left',
            }}
          />
        </div>
      </GlareHover>
    </div>
  );
};

const ResultsStatement = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  const metrics = [
    {
      icon: TrendingUp,
      title: "Efficiency Gain",
      value: "40%",
      description: "Average operational improvement",
      color: "#41B8D5"
    },
    {
      icon: Target,
      title: "Success Rate",
      value: "98%",
      description: "Project success with measurable outcomes",
      color: "#41B8D5"
    },
    {
      icon: Award,
      title: "ROI Achieved",
      value: "300%",
      description: "Return on investment within first year",
      color: "#41B8D5"
    }
  ];

  const impactAreas = [
    {
      icon: Zap,
      title: "Workflow Efficiency",
      description: "Eliminate bottlenecks and reduce manual work",
      color: "#41B8D5"
    },
    {
      icon: TrendingUp,
      title: "Business Growth",
      description: "Scalable solutions that grow with your organization",
      color: "#41B8D5"
    }
  ];

  return (
    <section
      ref={sectionRef}
      id="results"
      className="py-16 text-center relative overflow-hidden"
    >

      <div className="max-w-6xl mx-auto px-8 relative content-layer">
        {/* Main Statement with Advanced Animation */}
        <div className="text-left mb-0">
          <AnimatedContent 
            distance={80} 
            duration={1.2} 
            delay={0.2} 
            className="mb-2"
          >
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white font-heading mb-0 text-contrast">
              We don't sell automation.
              <br />
              <span className="text-[#41B8D5]">
                We sell Results.
              </span>
            </h2>
          </AnimatedContent>
        </div>

        {/* Supporting Content with Enhanced Fade */}
        <div className="text-left mb-0">
          <FadeContent duration={1200} delay={600} blur={true} className="mb-8">
            <p className="text-sm text-gray-300 max-w-2xl leading-relaxed">
              Every automation we build is designed for measurable business impact. From streamlined workflows to eliminated bottlenecks, we focus on outcomes that truly matter to your bottom line.
            </p>
          </FadeContent>
        </div>

        {/* Metrics Section with Interactive Cards */}
        <AnimatedContent distance={60} duration={1} delay={0.8} className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {metrics.map((metric, index) => (
              <MetricCard
                key={index}
                icon={metric.icon}
                title={metric.title}
                value={metric.value}
                description={metric.description}
                delay={index * 200}
                color={metric.color}
              />
            ))}
          </div>
        </AnimatedContent>

        {/* Impact Areas with Enhanced Glare Effects */}
        <div className="text-left mb-0">
          <FadeContent duration={1000} delay={1200} className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {impactAreas.map((area, index) => {
                const IconComponent = area.icon;
                
                return (
                  <GlareHover
                    key={index}
                    background="linear-gradient(135deg, rgba(17, 24, 39, 0.8), rgba(65, 185, 213, 0.05))"
                    borderColor="rgba(65, 185, 213, 0.2)"
                    glareColor={area.color}
                    glareOpacity={0.4}
                    className="group h-full"
                    style={{
                      backdropFilter: "blur(10px)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                    }}
                  >
                    <div className="p-4 w-full h-full flex flex-col items-center justify-center relative">
                      {/* Animated Icon Background */}
                      <div 
                        className="absolute top-2 right-2 w-8 h-8 rounded-full opacity-10"
                        style={{
                          background: `radial-gradient(circle, ${area.color}, transparent)`,
                          animation: 'pulse 2s ease-in-out infinite',
                        }}
                      />
                      
                      <div className="mb-3 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6" style={{ color: area.color }} />
                      </div>
                      <h4 className="text-sm font-semibold text-white mb-2 font-heading text-center">
                        {area.title}
                      </h4>
                      <p className="text-xs text-gray-300 text-center leading-relaxed">
                        {area.description}
                      </p>
                    </div>
                  </GlareHover>
                );
              })}
            </div>
          </FadeContent>
        </div>

        {/* Enhanced Subtext */}
        <FadeContent duration={800} delay={1400} className="mb-2">
          <div className="flex items-center justify-center gap-4">
            <CheckCircle className="w-5 h-5 text-primary" />
            <p className="text-base text-primary font-semibold">
              Real solutions. Honest partnerships. Transformative results.
            </p>
            <CheckCircle className="w-5 h-5 text-primary" />
          </div>
        </FadeContent>
      </div>

      {/* Custom CSS for animations */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
      `}</style>
    </section>
  );
};

export default ResultsStatement;