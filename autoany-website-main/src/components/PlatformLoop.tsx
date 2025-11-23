import React from 'react';

const PlatformLoop: React.FC = () => {
  const platforms = [
    'n8n',
    'Go High Level',
    'Make.com',
    'Hubspot',
    'Retell AI',
    'VAPI',
    'Airtable',
    'cal.com',
    'ElevenLabs',
    'Salesforce',
    'Calendly',
    'Twilio',
    'Zoho CRM',
    'Click Up'
  ];

  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-white via-white to-white/98 backdrop-blur-md border-t border-gray-200/30 shadow-2xl relative">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#41B8D5]/5 to-transparent pointer-events-none"></div>
      
      <div className="flex animate-scroll relative z-10">
        {/* First set of platforms */}
        {platforms.map((platform, index) => (
          <div
            key={`first-${index}`}
            className="flex-shrink-0 px-8 py-4 mx-3"
          >
            <div className="text-black text-sm font-bold whitespace-nowrap hover:text-[#41B8D5] transition-all duration-500 hover:scale-110 tracking-wider relative group">
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-[#41B8D5]/10 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              <span className="relative z-10">{platform}</span>
            </div>
          </div>
        ))}
        
        {/* Duplicate set for seamless loop */}
        {platforms.map((platform, index) => (
          <div
            key={`second-${index}`}
            className="flex-shrink-0 px-8 py-4 mx-3"
          >
            <div className="text-black text-sm font-bold whitespace-nowrap hover:text-[#41B8D5] transition-all duration-500 hover:scale-110 tracking-wider relative group">
              {/* Subtle glow effect on hover */}
              <div className="absolute inset-0 rounded-full bg-[#41B8D5]/10 scale-0 group-hover:scale-150 transition-transform duration-500 opacity-0 group-hover:opacity-100"></div>
              <span className="relative z-10">{platform}</span>
            </div>
          </div>
        ))}
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 25s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>
    </div>
  );
};

export default PlatformLoop;
