'use client';
import { useRef, useEffect, useCallback, useMemo } from "react";
import { gsap } from "gsap";
import { InertiaPlugin } from "gsap/InertiaPlugin";

import "./DotGrid.css";

gsap.registerPlugin(InertiaPlugin);

const throttle = (func: Function, limit: number) => {
  let lastCall = 0;
  return function (...args: any[]) {
    const now = performance.now();
    if (now - lastCall >= limit) {
      lastCall = now;
      func.apply(this, args);
    }
  };
};

function hexToRgb(hex: string) {
  const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
  if (!m) return { r: 0, g: 0, b: 0 };
  return {
    r: parseInt(m[1], 16),
    g: parseInt(m[2], 16),
    b: parseInt(m[3], 16),
  };
}

function hslToRgb(hsl: string) {
  // Handle HSL values like "hsl(var(--primary) / 0.1)"
  const match = hsl.match(/hsl\(var\(--([^)]+)\)\s*\/\s*([^)]+)\)/);
  if (match) {
    const [, variable, alpha] = match;
    // For now, return a default color - we'll handle this differently
    return { r: 100, g: 150, b: 200, alpha: parseFloat(alpha) };
  }
  
  // Handle regular HSL values
  const hslMatch = hsl.match(/hsl\(([^)]+)\)/);
  if (hslMatch) {
    const values = hslMatch[1].split(',').map(v => parseFloat(v.trim()));
    if (values.length >= 3) {
      const [h, s, l] = values;
      const a = values[3] || 1;
      
      const hue = h / 360;
      const saturation = s / 100;
      const lightness = l / 100;
      
      const c = (1 - Math.abs(2 * lightness - 1)) * saturation;
      const x = c * (1 - Math.abs((hue * 6) % 2 - 1));
      const m = lightness - c / 2;
      
      let r = 0, g = 0, b = 0;
      
      if (hue < 1/6) {
        r = c; g = x; b = 0;
      } else if (hue < 2/6) {
        r = x; g = c; b = 0;
      } else if (hue < 3/6) {
        r = 0; g = c; b = x;
      } else if (hue < 4/6) {
        r = 0; g = x; b = c;
      } else if (hue < 5/6) {
        r = x; g = 0; b = c;
      } else {
        r = c; g = 0; b = x;
      }
      
      return {
        r: Math.round((r + m) * 255),
        g: Math.round((g + m) * 255),
        b: Math.round((b + m) * 255),
        alpha: a
      };
    }
  }
  
  return { r: 0, g: 0, b: 0, alpha: 1 };
}

// Symbol drawing functions
const drawGear = (ctx: CanvasRenderingContext2D, size: number, rotation: number, pulse: number) => {
  const radius = size / 2;
  const teeth = 8;
  const toothLength = radius * 0.3;
  
  ctx.save();
  ctx.rotate(rotation);
  ctx.scale(1 + pulse * 0.1, 1 + pulse * 0.1);
  
  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const angle = (i * 2 * Math.PI) / teeth;
    const x1 = Math.cos(angle) * radius;
    const y1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle) * (radius + toothLength);
    const y2 = Math.sin(angle) * (radius + toothLength);
    
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
  }
  
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  // Inner circle
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.4, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const drawArrow = (ctx: CanvasRenderingContext2D, size: number, rotation: number, pulse: number) => {
  const radius = size / 2;
  
  ctx.save();
  ctx.rotate(rotation);
  ctx.scale(1 + pulse * 0.15, 1 + pulse * 0.15);
  
  ctx.beginPath();
  ctx.moveTo(-radius * 0.6, 0);
  ctx.lineTo(radius * 0.6, 0);
  ctx.lineTo(radius * 0.3, -radius * 0.3);
  ctx.moveTo(radius * 0.6, 0);
  ctx.lineTo(radius * 0.3, radius * 0.3);
  
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 2;
  ctx.stroke();
  
  ctx.restore();
};

const drawCog = (ctx: CanvasRenderingContext2D, size: number, rotation: number, pulse: number) => {
  const radius = size / 2;
  const teeth = 6;
  
  ctx.save();
  ctx.rotate(rotation);
  ctx.scale(1 + pulse * 0.1, 1 + pulse * 0.1);
  
  ctx.beginPath();
  for (let i = 0; i < teeth; i++) {
    const angle = (i * 2 * Math.PI) / teeth;
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.closePath();
  ctx.fill();
  
  // Inner circle
  ctx.beginPath();
  ctx.arc(0, 0, radius * 0.3, 0, Math.PI * 2);
  ctx.fillStyle = '#ffffff';
  ctx.fill();
  
  ctx.restore();
};

const drawAutomation = (ctx: CanvasRenderingContext2D, size: number, rotation: number, pulse: number) => {
  const radius = size / 2;
  
  ctx.save();
  ctx.rotate(rotation);
  ctx.scale(1 + pulse * 0.12, 1 + pulse * 0.12);
  
  // Draw a circuit-like pattern
  ctx.beginPath();
  ctx.rect(-radius * 0.4, -radius * 0.4, radius * 0.8, radius * 0.8);
  ctx.strokeStyle = ctx.fillStyle;
  ctx.lineWidth = 1.5;
  ctx.stroke();
  
  // Add connection points
  ctx.beginPath();
  ctx.arc(-radius * 0.2, -radius * 0.2, 2, 0, Math.PI * 2);
  ctx.arc(radius * 0.2, radius * 0.2, 2, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.restore();
};

const getRandomSymbol = () => {
  const symbols = ['gear', 'arrow', 'cog', 'automation'];
  return symbols[Math.floor(Math.random() * symbols.length)];
};

interface DotGridProps {
  dotSize?: number;
  gap?: number;
  baseColor?: string;
  activeColor?: string;
  proximity?: number;
  speedTrigger?: number;
  shockRadius?: number;
  shockStrength?: number;
  maxSpeed?: number;
  resistance?: number;
  returnDuration?: number;
  className?: string;
  style?: React.CSSProperties;
  symbolType?: 'gear' | 'arrow' | 'cog' | 'automation' | 'mixed';
}

const DotGrid = ({
  dotSize = 16,
  gap = 32,
  baseColor = "#5227FF",
  activeColor = "#5227FF",
  proximity = 150,
  speedTrigger = 100,
  shockRadius = 250,
  shockStrength = 5,
  maxSpeed = 5000,
  resistance = 750,
  returnDuration = 1.5,
  className = "",
  style,
  symbolType = 'mixed',
}: DotGridProps) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Array<{ 
    cx: number; 
    cy: number; 
    xOffset: number; 
    yOffset: number; 
    _inertiaApplied: boolean;
    symbolType: string;
    rotation: number;
    pulse: number;
  }>>([]);
  const pointerRef = useRef({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    speed: 0,
    lastTime: 0,
    lastX: 0,
    lastY: 0,
  });

  const baseRgb = useMemo(() => {
    if (baseColor.startsWith('hsl')) {
      return hslToRgb(baseColor);
    }
    return hexToRgb(baseColor);
  }, [baseColor]);
  
  const activeRgb = useMemo(() => {
    if (activeColor.startsWith('hsl')) {
      return hslToRgb(activeColor);
    }
    return hexToRgb(activeColor);
  }, [activeColor]);

  const circlePath = useMemo(() => {
    if (typeof window === "undefined" || !window.Path2D) return null;

    const p = new window.Path2D();
    p.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
    return p;
  }, [dotSize]);

  const buildGrid = useCallback(() => {
    const wrap = wrapperRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;

    const { width, height } = wrap.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const ctx = canvas.getContext("2d");
    if (ctx) ctx.scale(dpr, dpr);

    const cols = Math.floor((width + gap) / (dotSize + gap));
    const rows = Math.floor((height + gap) / (dotSize + gap));
    const cell = dotSize + gap;

    const gridW = cell * cols - gap;
    const gridH = cell * rows - gap;

    const extraX = width - gridW;
    const extraY = height - gridH;

    const startX = extraX / 2 + dotSize / 2;
    const startY = extraY / 2 + dotSize / 2;

    const dots = [];
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cx = startX + x * cell;
        const cy = startY + y * cell;
        const currentSymbolType = symbolType === 'mixed' ? getRandomSymbol() : symbolType;
        dots.push({ 
          cx, 
          cy, 
          xOffset: 0, 
          yOffset: 0, 
          _inertiaApplied: false,
          symbolType: currentSymbolType,
          rotation: Math.random() * Math.PI * 2,
          pulse: 0
        });
      }
    }
    dotsRef.current = dots;
  }, [dotSize, gap]);

  useEffect(() => {
    let rafId: number;
    const proxSq = proximity * proximity;

    const draw = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const { x: px, y: py } = pointerRef.current;

      for (const dot of dotsRef.current) {
        const ox = dot.cx + dot.xOffset;
        const oy = dot.cy + dot.yOffset;
        const dx = dot.cx - px;
        const dy = dot.cy - py;
        const dsq = dx * dx + dy * dy;

        let style = baseColor;
        let pulse = 0;
        let rotationSpeed = 0;

        if (dsq <= proxSq) {
          const dist = Math.sqrt(dsq);
          const t = 1 - dist / proximity;
          const r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
          const g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
          const b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
          const alpha = baseRgb.alpha || 1;
          style = `rgba(${r},${g},${b},${alpha})`;
          pulse = t * 0.5; // Pulse effect based on proximity
          rotationSpeed = t * 0.02; // Rotation speed based on proximity
        } else {
          // Use base color with alpha
          if (baseRgb.alpha !== undefined) {
            style = `rgba(${baseRgb.r},${baseRgb.g},${baseRgb.b},${baseRgb.alpha})`;
          }
        }

        // Update rotation and pulse
        dot.rotation += rotationSpeed;
        dot.pulse = pulse;

        ctx.save();
        ctx.translate(ox, oy);
        ctx.fillStyle = style;

        // Draw the appropriate symbol
        switch (dot.symbolType) {
          case 'gear':
            drawGear(ctx, dotSize, dot.rotation, dot.pulse);
            break;
          case 'arrow':
            drawArrow(ctx, dotSize, dot.rotation, dot.pulse);
            break;
          case 'cog':
            drawCog(ctx, dotSize, dot.rotation, dot.pulse);
            break;
          case 'automation':
            drawAutomation(ctx, dotSize, dot.rotation, dot.pulse);
            break;
          default:
            // Fallback to circle
            ctx.beginPath();
            ctx.arc(0, 0, dotSize / 2, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.restore();
      }

      rafId = requestAnimationFrame(draw);
    };

    draw();
    return () => cancelAnimationFrame(rafId);
  }, [proximity, baseColor, activeRgb, baseRgb, dotSize]);

  useEffect(() => {
    buildGrid();
    let ro: ResizeObserver | null = null;
    if ("ResizeObserver" in window) {
      ro = new ResizeObserver(buildGrid);
      wrapperRef.current && ro.observe(wrapperRef.current);
    } else {
      window.addEventListener("resize", buildGrid);
    }
    return () => {
      if (ro) ro.disconnect();
      else window.removeEventListener("resize", buildGrid);
    };
  }, [buildGrid]);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const now = performance.now();
      const pr = pointerRef.current;
      const dt = pr.lastTime ? now - pr.lastTime : 16;
      const dx = e.clientX - pr.lastX;
      const dy = e.clientY - pr.lastY;
      let vx = (dx / dt) * 1000;
      let vy = (dy / dt) * 1000;
      let speed = Math.hypot(vx, vy);
      if (speed > maxSpeed) {
        const scale = maxSpeed / speed;
        vx *= scale;
        vy *= scale;
        speed = maxSpeed;
      }
      pr.lastTime = now;
      pr.lastX = e.clientX;
      pr.lastY = e.clientY;
      pr.vx = vx;
      pr.vy = vy;
      pr.speed = speed;

      const rect = canvasRef.current?.getBoundingClientRect();
      if (rect) {
        pr.x = e.clientX - rect.left;
        pr.y = e.clientY - rect.top;
      }

      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - pr.x, dot.cy - pr.y);
        if (speed > speedTrigger && dist < proximity && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const pushX = dot.cx - pr.x + vx * 0.005;
          const pushY = dot.cy - pr.y + vy * 0.005;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvasRef.current?.getBoundingClientRect();
      if (!rect) return;
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;
      for (const dot of dotsRef.current) {
        const dist = Math.hypot(dot.cx - cx, dot.cy - cy);
        if (dist < shockRadius && !dot._inertiaApplied) {
          dot._inertiaApplied = true;
          gsap.killTweensOf(dot);
          const falloff = Math.max(0, 1 - dist / shockRadius);
          const pushX = (dot.cx - cx) * shockStrength * falloff;
          const pushY = (dot.cy - cy) * shockStrength * falloff;
          gsap.to(dot, {
            inertia: { xOffset: pushX, yOffset: pushY, resistance },
            onComplete: () => {
              gsap.to(dot, {
                xOffset: 0,
                yOffset: 0,
                duration: returnDuration,
                ease: "elastic.out(1,0.75)",
              });
              dot._inertiaApplied = false;
            },
          });
        }
      }
    };

    const throttledMove = throttle(onMove, 50);
    window.addEventListener("mousemove", throttledMove, { passive: true });
    window.addEventListener("click", onClick);

    return () => {
      window.removeEventListener("mousemove", throttledMove);
      window.removeEventListener("click", onClick);
    };
  }, [
    maxSpeed,
    speedTrigger,
    proximity,
    resistance,
    returnDuration,
    shockRadius,
    shockStrength,
  ]);

  return (
    <section className={`dot-grid ${className}`} style={style}>
      <div ref={wrapperRef} className="dot-grid__wrap">
        <canvas ref={canvasRef} className="dot-grid__canvas" />
      </div>
    </section>
  );
};

export default DotGrid;
