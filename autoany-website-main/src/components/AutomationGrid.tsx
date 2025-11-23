import React, { useEffect, useRef, useState } from 'react';
import { 
  Mic, 
  Share2, 
  FileText, 
  Target, 
  Users, 
  MessageCircle, 
  Mail, 
  ShoppingCart, 
  Calendar, 
  BarChart3, 
  Star, 
  FileInput 
} from 'lucide-react';

interface AutomationItemProps {
  icon: React.ComponentType<any>;
  title: string;
  delay: number;
  index: number;
}

const AutomationItem: React.FC<AutomationItemProps> = ({ icon: Icon, title, delay, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={itemRef}
      className={`group relative transition-all duration-700 ease-out ${
        isVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-4 scale-95'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transitionDelay: `${delay}ms`
      }}
    >
      {/* Glare Effect Overlay */}
      <div
        className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(-45deg,
            hsla(0,0%,0%,0) 60%,
            rgba(65, 184, 213, 0.3) 70%,
            hsla(0,0%,0%,0) 100%)`,
          backgroundSize: '200% 200%',
          backgroundPosition: '-100% -100%',
          animation: isHovered ? 'glare-sweep 0.6s ease forwards' : 'none'
        }}
      />
      
      {/* Main Card */}
      <div
        className="relative bg-gradient-to-br from-gray-900/80 to-gray-800/60 backdrop-blur-sm border border-[#41B8D5]/20 rounded-lg p-3 h-full transition-all duration-300 group-hover:border-[#41B8D5]/40 group-hover:shadow-lg group-hover:shadow-[#41B8D5]/10"
        style={{
          transform: isHovered ? 'translateY(-2px) scale(1.02)' : 'translateY(0) scale(1)',
        }}
      >
        {/* Animated Background Pattern */}
        <div 
          className="absolute inset-0 rounded-lg opacity-5 group-hover:opacity-10 transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle at 30% 20%, #41B8D5 0%, transparent 50%),
                        radial-gradient(circle at 70% 80%, #60a5fa 0%, transparent 50%)`,
            transform: isHovered ? 'scale(1.1)' : 'scale(1)',
            transition: 'transform 0.4s ease',
          }}
        />
        
        {/* Icon with Animation */}
        <div className="relative mb-2 flex justify-center">
          <div 
            className="absolute inset-0 rounded-full opacity-20 group-hover:opacity-30 transition-opacity duration-300"
            style={{
              background: `radial-gradient(circle, #41B8D5, transparent)`,
              transform: isHovered ? 'scale(1.5)' : 'scale(1)',
              transition: 'transform 0.4s ease',
            }}
          />
          <div 
            className="relative z-10 transition-all duration-300"
            style={{
              transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
            }}
          >
            <Icon className="w-5 h-5 text-[#41B8D5]" />
          </div>
        </div>

        {/* Title */}
        <h3 className="text-xs font-medium text-white text-center leading-tight group-hover:text-[#41B8D5] transition-colors duration-300">
          {title}
        </h3>

        {/* Hover Indicator */}
        <div 
          className="absolute bottom-0 left-0 right-0 h-0.5 rounded-b-lg transition-all duration-300"
          style={{
            background: `linear-gradient(90deg, #41B8D5, #60a5fa)`,
            transform: isHovered ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'left',
          }}
        />
      </div>

      {/* Custom CSS for glare animation */}
      <style jsx>{`
        @keyframes glare-sweep {
          to {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
};

const AutomationGrid: React.FC = () => {
  const automationServices = [
    { icon: Mic, title: 'AI Voice Agents & Call Automation' },
    { icon: Share2, title: 'Social Media Automation' },
    { icon: FileText, title: 'AI Content Generation' },
    { icon: Target, title: 'Lead Generation & Outreach Automation' },
    { icon: Users, title: 'CRM & Sales Automation' },
    { icon: MessageCircle, title: 'Customer Support Chatbots' },
    { icon: Mail, title: 'Email Marketing Automation' },
    { icon: ShoppingCart, title: 'E-commerce & Order Automation' },
    { icon: Calendar, title: 'Appointment & Calendar Scheduling' },
    { icon: BarChart3, title: 'Business Reporting & Insights' },
    { icon: Star, title: 'Reputation & Review Management' },
    { icon: FileInput, title: 'AI Data Entry & Document Automation' }
  ];

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Grid Header */}
      <div className="text-center mb-6">
        <h3 className="text-base font-semibold text-white mb-1 font-heading">
          Automation Solutions
        </h3>
        <p className="text-xs text-gray-400">
          Comprehensive automation across all business functions
        </p>
      </div>

      {/* Automation Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-2 md:gap-3">
        {automationServices.map((service, index) => (
          <AutomationItem
            key={index}
            icon={service.icon}
            title={service.title}
            delay={index * 100}
            index={index}
          />
        ))}
      </div>

    </div>
  );
};

export default AutomationGrid;
