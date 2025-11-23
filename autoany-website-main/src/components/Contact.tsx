import { useEffect, useRef, useState } from 'react';
import { Mail } from 'lucide-react';
import ContactForm from './ContactForm';

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-8 lg:px-16 relative content-layer">
        {/* Header */}
        <div
          className={`text-center mb-16 transition-opacity duration-800 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white mb-4 font-heading text-contrast">
            Get In Touch
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Ready to transform your business? Let's discuss how we can help automate your operations.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* Left Column - Contact Info */}
          <div
            className={`transition-opacity duration-800 delay-200 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="space-y-8">
              <div>
                <h3 className="text-xl font-semibold text-white mb-4 font-heading">
                  Let's Start a Conversation
                </h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  Have questions about automation? Want to explore how we can help your business?
                  Fill out the form or reach out directly.
                </p>
              </div>

              {/* Contact Info Cards */}
              <div className="space-y-4">
                <div className="flex items-start gap-4 p-4 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10">
                  <div className="w-10 h-10 rounded-full bg-[#41B8D5]/20 flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5 text-[#41B8D5]" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Email</h4>
                    <a
                      href="mailto:contact@autoany.com"
                      className="text-sm text-gray-300 hover:text-[#41B8D5] transition-colors"
                    >
                      contact@autoany.com
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Info */}
              <div className="pt-6 border-t border-white/10">
                <p className="text-sm text-gray-400 leading-relaxed">
                  We typically respond within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div
            className={`transition-opacity duration-800 delay-400 ${
              isVisible ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}

