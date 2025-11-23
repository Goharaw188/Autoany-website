import React, { useEffect, useRef } from 'react';

interface MorningsideBackgroundProps {
  className?: string;
}

const MorningsideBackground: React.FC<MorningsideBackgroundProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const timeRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Morphing shapes data
    const shapes = [
      {
        x: 0.2,
        y: 0.3,
        baseRadius: 120,
        morphSpeed: 0.8,
        rotationSpeed: 0.3,
        color: '#41B8D5',
        opacity: 0.15,
        points: 8
      },
      {
        x: 0.8,
        y: 0.7,
        baseRadius: 150,
        morphSpeed: 0.6,
        rotationSpeed: -0.4,
        color: '#60a5fa',
        opacity: 0.12,
        points: 6
      },
      {
        x: 0.5,
        y: 0.1,
        baseRadius: 100,
        morphSpeed: 1.0,
        rotationSpeed: 0.5,
        color: '#41B8D5',
        opacity: 0.08,
        points: 12
      },
      {
        x: 0.1,
        y: 0.8,
        baseRadius: 80,
        morphSpeed: 0.7,
        rotationSpeed: -0.2,
        color: '#60a5fa',
        opacity: 0.1,
        points: 10
      },
      {
        x: 0.9,
        y: 0.2,
        baseRadius: 110,
        morphSpeed: 0.9,
        rotationSpeed: 0.6,
        color: '#41B8D5',
        opacity: 0.06,
        points: 7
      }
    ];

    const animate = () => {
      const time = timeRef.current;
      const width = canvas.width / (window.devicePixelRatio || 1);
      const height = canvas.height / (window.devicePixelRatio || 1);

      // Clear canvas with gradient background
      const bgGradient = ctx.createRadialGradient(
        width / 2, height / 2, 0,
        width / 2, height / 2, Math.max(width, height) / 2
      );
      bgGradient.addColorStop(0, 'rgba(0, 0, 0, 0.95)');
      bgGradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.98)');
      bgGradient.addColorStop(1, 'rgba(0, 0, 0, 1)');

      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // Draw morphing shapes
      shapes.forEach((shape, index) => {
        const x = shape.x * width;
        const y = shape.y * height;
        const radius = shape.baseRadius + Math.sin(time * shape.morphSpeed + index) * 20;
        const rotation = time * shape.rotationSpeed + index * Math.PI / 3;

        // Create gradient for each shape
        const shapeGradient = ctx.createRadialGradient(
          x, y, 0,
          x, y, radius
        );
        
        const color = shape.color;
        const opacity = shape.opacity;
        
        shapeGradient.addColorStop(0, `${color}${Math.floor(opacity * 255).toString(16).padStart(2, '0')}`);
        shapeGradient.addColorStop(0.6, `${color}${Math.floor(opacity * 0.6 * 255).toString(16).padStart(2, '0')}`);
        shapeGradient.addColorStop(1, `${color}00`);

        ctx.fillStyle = shapeGradient;
        ctx.beginPath();

        // Create morphing polygon
        for (let i = 0; i < shape.points; i++) {
          const angle = (i / shape.points) * Math.PI * 2 + rotation;
          const morphOffset = Math.sin(time * shape.morphSpeed * 2 + i * 0.5) * 15;
          const currentRadius = radius + morphOffset;
          
          const pointX = x + Math.cos(angle) * currentRadius;
          const pointY = y + Math.sin(angle) * currentRadius;
          
          if (i === 0) {
            ctx.moveTo(pointX, pointY);
          } else {
            ctx.lineTo(pointX, pointY);
          }
        }
        
        ctx.closePath();
        ctx.fill();

        // Add subtle glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 30;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Add connecting lines between shapes
      ctx.strokeStyle = 'rgba(65, 184, 213, 0.1)';
      ctx.lineWidth = 1;
      
      for (let i = 0; i < shapes.length; i++) {
        for (let j = i + 1; j < shapes.length; j++) {
          const shape1 = shapes[i];
          const shape2 = shapes[j];
          
          const x1 = shape1.x * width;
          const y1 = shape1.y * height;
          const x2 = shape2.x * width;
          const y2 = shape2.y * height;
          
          const distance = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
          
          if (distance < 400) {
            const opacity = Math.max(0, 1 - distance / 400) * 0.3;
            ctx.globalAlpha = opacity;
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.stroke();
            ctx.globalAlpha = 1;
          }
        }
      }

      timeRef.current += 0.01;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className={`fixed inset-0 z-0 ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        style={{ 
          background: 'linear-gradient(135deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
          filter: 'blur(0.5px)'
        }}
      />
      
      {/* Additional overlay for better text contrast */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/60" />
      
      {/* Subtle noise texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
};

export default MorningsideBackground;



