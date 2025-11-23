import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import logo from "@/assets/text logo main.png"; // Ensure the file is located correctly

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false); // Close mobile menu after clicking
  };

  return (
    <div className="font-sans">
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/90 backdrop-blur-md shadow-md"
            : "bg-transparent backdrop-blur-sm"
        }`}
      >
        <div className="w-full px-6">
          <div className="flex items-center justify-between h-14">
            {/* Logo - Far Left */}
            <a href="#" className="flex items-center">
              <img
                src={logo}
                alt="Autoany Logo"
                className="h-8 w-auto object-contain"
              />
            </a>

            {/* Desktop Navigation - Center */}
            <div className="hidden md:flex items-center space-x-12 absolute left-1/2 transform -translate-x-1/2">
              <button
                onClick={() => handleSmoothScroll('process')}
                className="text-black hover:text-primary font-medium text-sm cursor-pointer px-3 py-2"
              >
                Process
              </button>
              <button
                onClick={() => handleSmoothScroll('services')}
                className="text-black hover:text-primary font-medium text-sm cursor-pointer px-3 py-2"
              >
                Services
              </button>
              <button
                onClick={() => handleSmoothScroll('results')}
                className="text-black hover:text-primary font-medium text-sm cursor-pointer px-3 py-2"
              >
                Results
              </button>
              <button
                onClick={() => handleSmoothScroll('why-autoany')}
                className="text-black hover:text-primary font-medium text-sm cursor-pointer px-3 py-2"
              >
                Why Autoany?
              </button>
            </div>

            {/* CTA Button - Far Right */}
            <div className="hidden md:block">
              <Button 
                onClick={() => handleSmoothScroll('why-autoany')}
                className="bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-1.5 rounded-lg transition-all duration-200 hover:scale-105 text-xs"
              >
                Get Started
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-black p-1.5"
              >
                {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden mt-3 space-y-3 pb-4 px-6">
              <button
                onClick={() => handleSmoothScroll('process')}
                className="block text-black font-medium hover:text-primary text-xs w-full text-left"
              >
                Process
              </button>
              <button
                onClick={() => handleSmoothScroll('services')}
                className="block text-black font-medium hover:text-primary text-xs w-full text-left"
              >
                Services
              </button>
              <button
                onClick={() => handleSmoothScroll('results')}
                className="block text-black font-medium hover:text-primary text-xs w-full text-left"
              >
                Results
              </button>
              <button
                onClick={() => handleSmoothScroll('why-autoany')}
                className="block text-black font-medium hover:text-primary text-xs w-full text-left"
              >
                Why Autoany?
              </button>
              <div>
                <Button 
                  onClick={() => handleSmoothScroll('why-autoany')}
                  className="w-full mt-3 bg-primary hover:bg-primary/90 text-white font-semibold px-4 py-2 rounded-lg transition-all duration-200 text-xs"
                >
                  Get Started
                </Button>
              </div>
            </div>
          )}
        </div>

        <style jsx>{`
          @import url('https://fonts.googleapis.com/css2?family=Glacial+Indifference:wght@400;700&display=swap');
        `}</style>
      </nav>
    </div>
  );
};

export default Navigation;