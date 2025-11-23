import { Testimonial } from '@/data/testimonials';

interface TestimonialCardProps {
  testimonial: Testimonial;
  featured?: boolean;
}

const categoryConfig = {
  'voice-agents': {
    label: 'Voice Agents',
    color: 'bg-[#41B8D5]/20 text-[#41B8D5] border-[#41B8D5]/30',
  },
  'lead-gen': {
    label: 'Lead Generation',
    color: 'bg-[#41B8D5]/20 text-[#41B8D5] border-[#41B8D5]/30',
  },
  'content': {
    label: 'Content & SEO',
    color: 'bg-[#41B8D5]/20 text-[#41B8D5] border-[#41B8D5]/30',
  },
  'bi-marketing': {
    label: 'BI & Marketing',
    color: 'bg-[#41B8D5]/20 text-[#41B8D5] border-[#41B8D5]/30',
  },
};

export default function TestimonialCard({ testimonial, featured = false }: TestimonialCardProps) {
  const category = categoryConfig[testimonial.serviceCategory];

  return (
    <div
      className={`
        relative bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 
        p-6 md:p-8 
        transition-all duration-300 hover:bg-white/10 hover:border-white/20
        ${featured ? 'ring-2 ring-[#41B8D5]/50' : ''}
      `}
    >
      {/* Featured Badge */}
      {featured && (
        <div className="absolute -top-3 right-6 bg-[#41B8D5] text-white text-xs font-semibold px-3 py-1 rounded-full">
          Featured
        </div>
      )}

      {/* Category Badge */}
      <div className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 border ${category.color}`}>
        {category.label}
      </div>

      {/* Quote */}
      <blockquote className="text-base md:text-lg text-gray-200 leading-relaxed mb-6 italic">
        "{testimonial.quote}"
      </blockquote>

      {/* Key Result Highlight */}
      {testimonial.keyResult && (
        <div className="mb-6 pb-6 border-b border-white/10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#41B8D5]/10 rounded-lg border border-[#41B8D5]/30">
            <svg
              className="w-4 h-4 text-[#41B8D5]"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
              />
            </svg>
            <span className="text-sm font-semibold text-[#41B8D5]">{testimonial.keyResult}</span>
          </div>
        </div>
      )}

      {/* Client Attribution */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#41B8D5] to-[#41B8D5]/60 flex items-center justify-center text-white font-semibold text-sm">
          {testimonial.clientName
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase()}
        </div>
        <div>
          <div className="text-sm font-semibold text-white">{testimonial.clientName}</div>
          {testimonial.clientTitle && (
            <div className="text-xs text-gray-400">{testimonial.clientTitle}</div>
          )}
          {testimonial.serviceName && (
            <div className="text-xs text-gray-500 mt-1">{testimonial.serviceName}</div>
          )}
        </div>
      </div>
    </div>
  );
}
