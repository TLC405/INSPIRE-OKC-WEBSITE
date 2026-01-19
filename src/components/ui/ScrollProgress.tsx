import { useScrollProgress } from '@/hooks/useScrollProgress';

export const ScrollProgress = () => {
  const { progress } = useScrollProgress();

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-1 bg-muted/30">
      <div
        className="h-full bg-primary transition-all duration-100 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Glow effect */}
      <div
        className="absolute top-0 h-full bg-primary blur-sm opacity-60"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
