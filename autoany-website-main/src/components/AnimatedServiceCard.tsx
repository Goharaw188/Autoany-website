import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface AnimatedServiceCardProps {
  service: {
    title: string;
    description: string;
    icon: any;
  };
  index: number;
}

const AnimatedServiceCard: React.FC<AnimatedServiceCardProps> = ({ service, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    // Initial animation
    gsap.fromTo(cardRef.current,
      {
        opacity: 0,
        y: 50,
        scale: 0.9,
      },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        delay: index * 0.1,
        ease: "power3.out"
      }
    );
  }, [index]);

  const getServiceAnimation = () => {
    switch (service.title) {
      case "Workflow Automation":
        return (
          <div className="workflow-animation">
            <svg viewBox="0 0 24 24" role="img" aria-labelledby="title" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <title id="title">Workflow automation</title>
              {/* Nodes */}
              <rect x="3" y="4" width="6" height="6" rx="1.5" className="workflow-node"/>
              <rect x="15" y="4" width="6" height="6" rx="1.5" className="workflow-node"/>
              <rect x="3" y="14" width="6" height="6" rx="1.5" className="workflow-node"/>
              <rect x="15" y="14" width="6" height="6" rx="1.5" className="workflow-node"/>
              {/* Connectors (split + merge) */}
              <path d="M9 7h3c2 0 3 1 3 3v0" className="workflow-connector"/>
              <path d="M12 10h3" className="workflow-connector"/>
              <path d="M9 17h3c2 0 3-1 3-3v0" className="workflow-connector"/>
              <path d="M12 14h3" className="workflow-connector"/>
              {/* vertical spine */}
              <path d="M12 7v7" className="workflow-spine"/>
            </svg>
          </div>
        );
      
      case "AI Chatbots":
        return (
          <div className="chatbot-animation">
            <svg viewBox="0 0 24 24" role="img" aria-labelledby="title" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <title id="title">AI chatbot</title>
              {/* Head + shoulders */}
              <path d="M10.5 9a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Z" className="chatbot-head"/>
              <path d="M3.75 19c0-3.315 3.358-5.5 6.75-5.5s6.75 2.185 6.75 5.5" className="chatbot-body"/>
              {/* Chat bubble */}
              <path d="M14.5 7.5h4.25A2.25 2.25 0 0 1 21 9.75v2A2.25 2.25 0 0 1 18.75 14h-1.2l-1.8 1.8V14" className="chatbot-bubble"/>
              <path d="M16 10.25h2.5" className="chatbot-line"/>
              <path d="M16 12h1.5" className="chatbot-line"/>
            </svg>
          </div>
        );
      
      case "Data Analytics":
        return (
          <div className="analytics-animation">
            <svg viewBox="0 0 24 24" role="img" aria-labelledby="title" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <title id="title">Data analytics</title>
              {/* Baseline */}
              <path d="M3 19.5h18" className="analytics-baseline"/>
              {/* Bars left→right: 1 tallest, 2 lower, 3 lower, 4 very short */}
              <rect x="4.5" y="6" width="3" height="13.5" rx="0.75" className="analytics-bar bar-1"/>
              <rect x="9.5" y="8" width="3" height="11.5" rx="0.75" className="analytics-bar bar-2"/>
              <rect x="14.5" y="10" width="3" height="9.5" rx="0.75" className="analytics-bar bar-3"/>
              <rect x="19.5" y="17" width="3" height="2.5" rx="0.75" className="analytics-bar bar-4"/>
            </svg>
          </div>
        );
      
      case "CRM Automation":
        return (
          <div className="crm-animation">
            <svg viewBox="0 0 24 24" role="img" aria-labelledby="title" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <title id="title">CRM (database sync)</title>
              {/* Database cylinder */}
              <ellipse cx="12" cy="6" rx="6" ry="2.5" className="crm-database-top"/>
              <path d="M6 6v6.5c0 1.38 2.686 2.5 6 2.5s6-1.12 6-2.5V6" className="crm-database-side"/>
              <path d="M6 9c0 1.38 2.686 2.5 6 2.5s6-1.12 6-2.5" className="crm-database-middle"/>
              {/* Sync arrows */}
              <path d="M8 18a4 4 0 0 0 7 0" className="crm-sync-arrow"/>
              <path d="M15 18l-1.2-1.2" className="crm-sync-arrow"/>
              <path d="M9 18l1.2 1.2" className="crm-sync-arrow"/>
            </svg>
          </div>
        );
      
      case "API Integrations":
        return (
          <div className="api-animation">
            <svg viewBox="0 0 24 24" role="img" aria-labelledby="title" xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <title id="title">API integration</title>
              {/* Left endpoint */}
              <path d="M4 8.5h4c1.657 0 3 1.343 3 3s-1.343 3-3 3H4" className="api-endpoint-left"/>
              <path d="M4 8.5V7" className="api-endpoint-left"/>
              <path d="M4 15.5V17" className="api-endpoint-left"/>
              {/* Right endpoint */}
              <path d="M20 8.5h-4c-1.657 0-3 1.343-3 3s1.343 3 3 3h4" className="api-endpoint-right"/>
              <path d="M20 8.5V7" className="api-endpoint-right"/>
              <path d="M20 15.5V17" className="api-endpoint-right"/>
              {/* Link bolt */}
              <path d="M9 12h6" className="api-link"/>
            </svg>
          </div>
        );
      
      case "Process Optimization":
        return (
          <div className="process-animation">
            <div className="step step-1"></div>
            <div className="step step-2"></div>
            <div className="step step-3"></div>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div ref={cardRef} className={`animated-service-card ${service.title === "Workflow Automation" || service.title === "AI Chatbots" || service.title === "Data Analytics" || service.title === "CRM Automation" || service.title === "API Integrations" ? "svg-card" : ""}`}>
      {service.title === "Workflow Automation" || service.title === "AI Chatbots" || service.title === "Data Analytics" || service.title === "CRM Automation" || service.title === "API Integrations" ? (
        <>
          <div className="service-animation svg-top-left">
            {getServiceAnimation()}
          </div>
          <h4 className="service-title">{service.title}</h4>
          <p className="service-description">{service.description}</p>
        </>
      ) : (
        <>
          <div className="service-icon">
            <service.icon className="w-8 h-8" />
          </div>
          <h4 className="service-title">{service.title}</h4>
          <p className="service-description">{service.description}</p>
          <div className="service-animation">
            {getServiceAnimation()}
          </div>
        </>
      )}
    </div>
  );
};

export default AnimatedServiceCard;
