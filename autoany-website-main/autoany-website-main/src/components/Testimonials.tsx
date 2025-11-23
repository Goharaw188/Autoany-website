import { useEffect, useRef, useState } from 'react';
import { testimonials, getFeaturedTestimonials } from '@/data/testimonials';
import TestimonialCard from './TestimonialCard';

export default function Testimonials() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const featuredTestimonials = getFeaturedTestimonials();
  const regularTestimonials = testimonials.filter((t) => !t.featured);

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

  return (
    <section 
      ref={sectionRef}
      id="testimonials" 
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-8 lg:px-16 relative content-layer">
        {/* Header */}
        <div 
          className={`text-center mb-16 transition-opacity duration-800 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight text-white mb-4 font-heading text-contrast">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Real results from businesses that transformed their operations with AutoAny automation solutions.
          </p>
        </div>

        {/* Featured Testimonials */}
        {featuredTestimonials.length > 0 && (
          <div 
            className={`mb-16 transition-opacity duration-800 delay-200 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8">
              {featuredTestimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} featured={true} />
              ))}
            </div>
          </div>
        )}

        {/* Regular Testimonials Grid */}
        <div 
          className={`transition-opacity duration-800 delay-400 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {regularTestimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} featured={false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
