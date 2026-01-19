import { useState, useRef, useEffect } from 'react';
import { cn } from '@/lib/utils';

interface VideoBackgroundProps {
  videoSrc?: string;
  fallbackImage: string;
  overlayOpacity?: number;
  className?: string;
}

export const VideoBackground = ({
  videoSrc,
  fallbackImage,
  overlayOpacity = 0.7,
  className,
}: VideoBackgroundProps) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const [showVideo, setShowVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if device prefers reduced motion or is mobile
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    
    if (!prefersReducedMotion && !isMobile && videoSrc) {
      setShowVideo(true);
    }
  }, [videoSrc]);

  const handleVideoLoad = () => {
    setIsVideoLoaded(true);
  };

  return (
    <div className={cn('absolute inset-0 overflow-hidden', className)}>
      {/* Fallback Image */}
      <div
        className={cn(
          'absolute inset-0 bg-cover bg-center bg-no-repeat transition-opacity duration-1000',
          isVideoLoaded ? 'opacity-0' : 'opacity-100'
        )}
        style={{ backgroundImage: `url(${fallbackImage})` }}
      />

      {/* Video */}
      {showVideo && videoSrc && (
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad}
          className={cn(
            'absolute inset-0 w-full h-full object-cover transition-opacity duration-1000',
            isVideoLoaded ? 'opacity-100' : 'opacity-0'
          )}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay - solid, no gradients */}
      <div
        className="absolute inset-0 bg-background"
        style={{ opacity: overlayOpacity }}
      />

      {/* Scanlines texture */}
      <div className="absolute inset-0 scanlines pointer-events-none" />

      {/* Noise texture */}
      <div className="absolute inset-0 noise pointer-events-none" />
    </div>
  );
};
