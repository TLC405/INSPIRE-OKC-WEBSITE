import { useEffect, useState, useRef, useCallback } from 'react';

interface ParallaxConfig {
  speed?: number;
  direction?: 'up' | 'down';
  easing?: boolean;
}

export const useParallax = (config: ParallaxConfig = {}) => {
  const { speed = 0.3, direction = 'up', easing = true } = config;
  const [transform, setTransform] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  const updateTransform = useCallback(() => {
    if (!ref.current) return;
    
    const rect = ref.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const elementCenter = rect.top + rect.height / 2;
    const viewportCenter = viewportHeight / 2;
    const distanceFromCenter = elementCenter - viewportCenter;
    
    const multiplier = direction === 'up' ? -1 : 1;
    const newTransform = distanceFromCenter * speed * multiplier;
    
    if (easing) {
      setTransform(prev => prev + (newTransform - prev) * 0.1);
    } else {
      setTransform(newTransform);
    }
    
    ticking.current = false;
  }, [speed, direction, easing]);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(updateTransform);
        ticking.current = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateTransform();
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, [updateTransform]);

  return { ref, transform };
};

// Mouse parallax for hero elements
export const useMouseParallax = (intensity: number = 0.02) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      const x = (e.clientX - centerX) * intensity;
      const y = (e.clientY - centerY) * intensity;
      setPosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [intensity]);

  return position;
};
