import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import PillNav from "@/components/PillNav";
import Hero from "@/components/Hero";
import logo from "./assets/text logo black bg.png";
import Process from "@/components/Process";
import ResultsStatement from "@/components/ResultsStatement";
import Testimonials from "@/components/Testimonials";
import TrustBuilder from "@/components/TrustBuilder";
import Contact from "@/components/Contact";
import MorningsideBackground from "@/components/MorningsideBackground";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const MainContent = () => (
  <>
    <MorningsideBackground />
    <PillNav
      logo={logo}
      logoAlt="Autoany Logo"
            items={[
              { label: 'Home', href: '/' },
              { label: 'Process', href: '#process' },
              { label: 'Results', href: '#results' },
              { label: 'Testimonials', href: '#testimonials' },
              { label: 'Why Autoany?', href: '#why-autoany' },
              { label: 'Contact', href: '#contact' }
            ]}
      activeHref="/"
      className="custom-nav"
      ease="power2.easeOut"
      baseColor="#000000"
      pillColor="#ffffff"
      hoveredPillTextColor="#ffffff"
      pillTextColor="#000000"
      onMobileMenuClick={() => {}}
    />
          <Hero />
          <Process />
          <ResultsStatement />
          <Testimonials />
          <TrustBuilder />
          <Contact />
  </>
);

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
