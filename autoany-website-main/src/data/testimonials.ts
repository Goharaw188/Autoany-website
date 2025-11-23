export interface Testimonial {
  id: number;
  serviceCategory: 'voice-agents' | 'lead-gen' | 'content' | 'bi-marketing';
  serviceName: string;
  quote: string;
  keyResult?: string;
  clientName: string;
  clientTitle?: string;
  featured?: boolean;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    serviceCategory: 'voice-agents',
    serviceName: 'Custom Chatbot/Voice Agent Solution',
    quote: "One of the best developers I've worked with. Incredibly responsive, guided us to the most efficient workflows, and helped us ship a complex chatbot solution. We closed 2 new deals in the first few hours of chatbot going live on our website. I'd recommend them to any mid-market or enterprise company.",
    keyResult: 'Closed 2 new deals in first few hours',
    clientName: 'Lethia Owens',
    featured: true,
  },
  {
    id: 2,
    serviceCategory: 'voice-agents',
    serviceName: '24/7 AI Hotline for Always-On Customer Support',
    quote: "The team at Autoany built a fully AI-powered hotline for us using Twilio and ElevenLabs, and it's been a game-changer for our business. They didn't just set up a basic chatbot — they designed a natural-sounding system that reliably handles calls end-to-end, and kept iterating as our requirements evolved and our client pushed for more. It feels like a polished, product-level solution that we can confidently roll out, not a one-off experiment. 10/10, we'll definitely work with them again.",
    keyResult: '10/10 rating • Game-changing solution',
    clientName: 'Luke Sullivan',
    featured: true,
  },
  {
    id: 3,
    serviceCategory: 'bi-marketing',
    serviceName: 'AI-Powered BI & Marketing System',
    quote: 'Extremely knowledgeable about advanced AI and automation systems like n8n. Working together was smooth, and with their guidance we were able to solve a real business challenge and get an AI-powered marketing system running.',
    keyResult: 'Solved real business challenge',
    clientName: 'Alexander Croucher',
    featured: false,
  },
  {
    id: 4,
    serviceCategory: 'lead-gen',
    serviceName: 'End-to-End Automated Lead Generation System',
    quote: 'They built the exact system I needed, which is now saving me a lot of time and manual work. I have been sending 500 highly-personalized emails on daily-basis, and booking weekly calls consistently. Communication and support were excellent, and the system was delivered quickly.',
    keyResult: '500 personalized emails daily • Weekly calls booked',
    clientName: 'Marta Suchanek',
    featured: false,
  },
  {
    id: 5,
    serviceCategory: 'lead-gen',
    serviceName: 'Multi-Channel Lead Gen Engine',
    quote: "From day one, they understood exactly the kind of pipeline I wanted. The new system is pulling in qualified leads automatically, combining email and LinkedIn touchpoints without me lifting a finger. I'm consistently booking sales calls every week, and the visibility into my funnel is miles better than before. Super responsive team, fast delivery, and everything just works.",
    keyResult: 'Automated pipeline • Qualified leads weekly',
    clientName: 'Marcos Rojas',
    featured: false,
  },
  {
    id: 6,
    serviceCategory: 'content',
    serviceName: 'SEO Content Engine',
    quote: "Before this, our SEO efforts were stuck — we had keywords, but turning them into publishable pages was slow, manual, and inconsistent. Now the system they built turns our inputs into research, briefs, and drafts automatically, so we can ship high-quality SEO content regularly and focus on strategy instead of busywork.",
    keyResult: 'Automated content production • Focus on strategy',
    clientName: 'Dennis Redder',
    featured: false,
  },
  {
    id: 7,
    serviceCategory: 'content',
    serviceName: 'VEO 3 & Nano Banana Production System',
    quote: "Before working with them, our VEO 3 and Nano Banana content pipeline was stuck — producing consistent, on-brand AI images and videos at scale was slow, manual, and kept delaying campaigns. The system they built turned this into a reliable production engine, so we can generate high-quality assets on demand and hit our launch dates without scrambling.",
    keyResult: 'On-demand asset production • On-time launches',
    clientName: 'Aaron Mccregor',
    featured: false,
  },
  {
    id: 8,
    serviceCategory: 'voice-agents',
    serviceName: 'Multi-Service Voice Agents for Home Repair Brands',
    quote: "Running four different service lines (appliance repair, HVAC, electrical, plumbing) meant our phones never stopped — and we were constantly missing calls, repeating the same questions, and wasting staff time qualifying bad leads. The four voice agents they built now handle intake, triage, and routing for each business, so real customers get booked faster, emergencies are prioritized, and my team can actually focus on service instead of being glued to the phone.",
    keyResult: 'Four voice agents • Faster booking • Better prioritization',
    clientName: 'David Johnson',
    featured: false,
  },
];

export const getFeaturedTestimonials = (): Testimonial[] => {
  return testimonials.filter((t) => t.featured);
};

export const getTestimonialsByCategory = (category: Testimonial['serviceCategory']): Testimonial[] => {
  return testimonials.filter((t) => t.serviceCategory === category);
};

