import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";

const TrustBuilder = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="why-autoany"
      className="pt-4 pb-12 relative overflow-hidden"
    >
      <div className="w-full px-8 relative content-layer">
        {/* Main Content - Full Width Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-16">
          {/* Left Column - Partnership Content */}
          <div className="text-left">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white mb-4 font-heading text-contrast">
                The best automation systems
                <br />
                <span className="text-[#41B8D5]">are built side by side.</span>
              </h2>
            </div>

            {/* Supporting text */}
            <div
              className={`transition-all duration-1000 delay-300 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <p className="text-sm text-gray-300 leading-relaxed mb-6">
                Partnership, not just service. We work alongside your team to ensure
                every automation solution perfectly fits your unique business needs.
              </p>
            </div>

            {/* Partnership Benefits */}
            <div
              className={`transition-all duration-1000 delay-400 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#41B8D5] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Collaborative Approach</h4>
                    <p className="text-xs text-gray-400">We integrate with your existing team and workflows, not replace them.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#41B8D5] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Knowledge Transfer</h4>
                    <p className="text-xs text-gray-400">Your team learns to maintain and scale automations independently.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-[#41B8D5] rounded-full mt-2 flex-shrink-0"></div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Long-term Support</h4>
                    <p className="text-xs text-gray-400">Ongoing partnership for continuous optimization and growth.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Philosophy & Trust */}
          <div className="text-left">
            {/* Philosophy Quote */}
            <div
              className={`transition-all duration-1000 delay-500 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-2xl p-8 border border-primary/20 shadow-lg mb-8">
                <p className="text-lg text-gray-200 italic mb-4">
                  "Every successful automation starts with understanding your business"
                </p>
                <div className="text-sm text-primary font-semibold">
                  — autoany team philosophy
                </div>
              </div>
            </div>

            {/* Trust Indicators */}
            <div
              className={`transition-all duration-1000 delay-600 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
            >
              <h3 className="text-lg font-semibold text-white mb-4">Why Businesses Choose Us</h3>
              <div className="bg-gradient-to-r from-primary/5 via-gray-900 to-primary/5 rounded-2xl p-6 border border-primary/20 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300 text-sm">
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="font-medium">150+ Businesses Served</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="font-medium">98% Success Rate</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="font-medium">&lt; 24h Response Time</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                    <span className="font-medium">300% Average ROI</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom CTA Section - Centered */}
        <div className="text-center">
          <div
            className={`transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold leading-tight tracking-tight text-white mb-4 font-heading text-contrast">
              Ready to transform
              <br />
              <span className="text-[#41B8D5]">your business?</span>
            </h3>
            
            <p className="text-sm text-gray-300 max-w-2xl mx-auto leading-relaxed mb-8">
              Join 150+ businesses that have already transformed their operations.
              Your automation journey starts with a single conversation.
            </p>

            {/* CTA Button - Centered */}
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group px-12 py-5 bg-primary hover:bg-primary/90 text-white font-semibold rounded-2xl text-lg hover:scale-105 transition-all duration-300 hover:shadow-xl hover:shadow-primary/25 flex items-center justify-center mx-auto"
            >
              <span className="mr-3">Get Started</span>
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TrustBuilder;
