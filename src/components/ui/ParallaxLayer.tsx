import { useParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

export const ParallaxLayer = ({
  children,
  speed = 0.3,
  direction = 'up',
  className,
}: ParallaxLayerProps) => {
  const { ref, transform } = useParallax({ speed, direction });

  return (
    <div
      ref={ref}
      className={cn('will-change-transform', className)}
      style={{
        transform: `translateY(${transform}px)`,
      }}
    >
      {children}
    </div>
  );
};
