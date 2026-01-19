import { useMouseParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';

interface Shape {
  type: 'square' | 'rectangle' | 'line' | 'dot' | 'cross';
  color: 'primary' | 'secondary' | 'accent' | 'foreground';
  size: 'sm' | 'md' | 'lg' | 'xl';
  position: { top?: string; bottom?: string; left?: string; right?: string };
  rotation?: number;
  parallaxIntensity?: number;
  animationDelay?: number;
}

const defaultShapes: Shape[] = [
  { type: 'square', color: 'primary', size: 'lg', position: { top: '15%', right: '10%' }, rotation: 12, parallaxIntensity: 0.03 },
  { type: 'rectangle', color: 'secondary', size: 'md', position: { top: '35%', left: '5%' }, rotation: -8, parallaxIntensity: 0.02 },
  { type: 'line', color: 'foreground', size: 'xl', position: { bottom: '20%', right: '15%' }, rotation: 45, parallaxIntensity: 0.04 },
  { type: 'dot', color: 'accent', size: 'sm', position: { top: '60%', left: '12%' }, parallaxIntensity: 0.05 },
  { type: 'cross', color: 'primary', size: 'md', position: { bottom: '35%', left: '20%' }, rotation: 15, parallaxIntensity: 0.025 },
  { type: 'square', color: 'foreground', size: 'sm', position: { top: '25%', left: '30%' }, rotation: -20, parallaxIntensity: 0.035 },
  { type: 'dot', color: 'secondary', size: 'md', position: { bottom: '15%', right: '30%' }, parallaxIntensity: 0.045 },
  { type: 'line', color: 'primary', size: 'lg', position: { top: '45%', right: '5%' }, rotation: -30, parallaxIntensity: 0.02 },
];

const sizeMap = {
  sm: { square: 'w-4 h-4', rectangle: 'w-8 h-3', line: 'w-12 h-1', dot: 'w-3 h-3', cross: 'w-6 h-6' },
  md: { square: 'w-8 h-8', rectangle: 'w-16 h-4', line: 'w-20 h-1', dot: 'w-5 h-5', cross: 'w-10 h-10' },
  lg: { square: 'w-12 h-12', rectangle: 'w-24 h-6', line: 'w-32 h-1', dot: 'w-8 h-8', cross: 'w-14 h-14' },
  xl: { square: 'w-16 h-16', rectangle: 'w-32 h-8', line: 'w-48 h-1', dot: 'w-10 h-10', cross: 'w-20 h-20' },
};

const colorMap = {
  primary: 'bg-primary',
  secondary: 'bg-secondary',
  accent: 'bg-accent',
  foreground: 'bg-foreground',
};

interface FloatingShapesProps {
  shapes?: Shape[];
  className?: string;
}

export const FloatingShapes = ({ shapes = defaultShapes, className }: FloatingShapesProps) => {
  const mousePosition = useMouseParallax(0.02);

  return (
    <div className={cn('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {shapes.map((shape, index) => {
        const intensity = shape.parallaxIntensity || 0.02;
        const translateX = mousePosition.x * intensity * 100;
        const translateY = mousePosition.y * intensity * 100;

        return (
          <div
            key={index}
            className={cn(
              'absolute transition-transform duration-300 ease-out',
              sizeMap[shape.size][shape.type],
              colorMap[shape.color],
              shape.type === 'dot' && 'rounded-full',
              shape.type === 'cross' && 'relative'
            )}
            style={{
              ...shape.position,
              transform: `rotate(${shape.rotation || 0}deg) translate(${translateX}px, ${translateY}px)`,
              animationDelay: `${shape.animationDelay || index * 0.2}s`,
            }}
          >
            {shape.type === 'cross' && (
              <>
                <div className={cn('absolute top-1/2 left-0 w-full h-1 -translate-y-1/2', colorMap[shape.color])} />
                <div className={cn('absolute top-0 left-1/2 w-1 h-full -translate-x-1/2', colorMap[shape.color])} />
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};
