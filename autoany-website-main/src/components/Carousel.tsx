import { useEffect, useState, useRef } from "react";
import { Circle, Code, FileText, Layers, Layout } from 'lucide-react';
import GradientText from './GradientText';

import "./Carousel.css";

const DEFAULT_ITEMS = [
  {
    title: "Text Animations",
    description: "Cool text animations for your projects.",
    id: 1,
    icon: <FileText className="carousel-icon" />,
  },
  {
    title: "Animations",
    description: "Smooth animations for your projects.",
    id: 2,
    icon: <Circle className="carousel-icon" />,
  },
  {
    title: "Components",
    description: "Reusable components for your projects.",
    id: 3,
    icon: <Layers className="carousel-icon" />,
  },
  {
    title: "Backgrounds",
    description: "Beautiful backgrounds and patterns for your projects.",
    id: 4,
    icon: <Layout className="carousel-icon" />,
  },
  {
    title: "Common UI",
    description: "Common UI components are coming soon!",
    id: 5,
    icon: <Code className="carousel-icon" />,
  },
];

export default function Carousel({
  items = DEFAULT_ITEMS,
  baseWidth = 300,
  autoplay = false,
  autoplayDelay = 3000,
  pauseOnHover = false,
  loop = false,
  round = false,
  showHeading = false,
  headingText = "",
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (pauseOnHover && containerRef.current) {
      const container = containerRef.current;
      const handleMouseEnter = () => setIsHovered(true);
      const handleMouseLeave = () => setIsHovered(false);
      container.addEventListener("mouseenter", handleMouseEnter);
      container.addEventListener("mouseleave", handleMouseLeave);
      return () => {
        container.removeEventListener("mouseenter", handleMouseEnter);
        container.removeEventListener("mouseleave", handleMouseLeave);
      };
    }
  }, [pauseOnHover]);

  useEffect(() => {
    if (autoplay && (!pauseOnHover || !isHovered)) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => {
          if (prev === items.length - 1) {
            return loop ? 0 : prev;
          }
          return prev + 1;
        });
      }, autoplayDelay);
      return () => clearInterval(timer);
    }
  }, [autoplay, autoplayDelay, isHovered, loop, items.length, pauseOnHover]);

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === items.length - 1) {
        return loop ? 0 : prev;
      }
      return prev + 1;
    });
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => {
      if (prev === 0) {
        return loop ? items.length - 1 : prev;
      }
      return prev - 1;
    });
  };

  return (
    <div
      ref={containerRef}
      className={`carousel-container ${round ? "round" : ""}`}
      style={{
        width: `${baseWidth}px`,
        ...(round && { height: `${baseWidth}px`, borderRadius: "50%" }),
      }}
    >
      {showHeading && (
        <div className="carousel-heading">
          <GradientText
            colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
            animationSpeed={3}
            showBorder={false}
            className="carousel-heading-gradient"
          >
            {headingText}
          </GradientText>
        </div>
      )}
      
      <div className="carousel-track">
        <div 
          className="carousel-slides"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: 'transform 0.5s ease-in-out'
          }}
        >
          {items.map((item, index) => (
                         <div
               key={index}
               className={`carousel-item ${round ? "round" : ""}`}
               style={{
                 width: `${baseWidth - 32}px`,
                 height: round ? `${baseWidth - 32}px` : "100%",
                 ...(round && { borderRadius: "50%" }),
               }}
             >
                               <div className="carousel-item-content">
                  <div className="carousel-item-title">
                    <GradientText
                      colors={["#41B8D5", "#60a5fa", "#41B8D5", "#60a5fa", "#41B8D5"]}
                      animationSpeed={4}
                      showBorder={false}
                      className="carousel-title-gradient"
                    >
                      {item.title}
                    </GradientText>
                  </div>
                  <p className="carousel-item-description">{item.description}</p>
                </div>
             </div>
          ))}
        </div>
      </div>
      
      <div className="carousel-controls">
        <button 
          className="carousel-control prev"
          onClick={prevSlide}
          aria-label="Previous slide"
        >
          ‹
        </button>
        <button 
          className="carousel-control next"
          onClick={nextSlide}
          aria-label="Next slide"
        >
          ›
        </button>
      </div>

      <div className={`carousel-indicators-container ${round ? "round" : ""}`}>
        <div className="carousel-indicators">
          {items.map((_, index) => (
            <button
              key={index}
              className={`carousel-indicator ${currentIndex === index ? "active" : "inactive"}`}
              onClick={() => setCurrentIndex(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
