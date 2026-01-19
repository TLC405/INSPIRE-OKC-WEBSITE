import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { FloatingShapes } from '@/components/ui/FloatingShapes';
import { ParallaxLayer } from '@/components/ui/ParallaxLayer';
import { AnimatedText, RevealText } from '@/components/ui/AnimatedText';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { useMouseParallax } from '@/hooks/useParallax';
import { cn } from '@/lib/utils';
import okcHero from '@/assets/okc-community-hero.png';

export const CinematicHero = () => {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.2 });
  const mousePosition = useMouseParallax(0.01);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Layer 1: Video/Image Background */}
      <VideoBackground
        fallbackImage={okcHero}
        overlayOpacity={0.75}
      />

      {/* Layer 2: Floating Geometric Shapes */}
      <FloatingShapes />

      {/* Layer 3: Content */}
      <div className="relative z-10 container mx-auto px-4 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="max-w-5xl">
          {/* Eyebrow */}
          <ParallaxLayer speed={0.1} direction="down">
            <div className="mb-6">
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-4 py-2 border-4 border-primary bg-background/80",
                  "transition-all duration-500"
                )}
                style={{
                  transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                }}
              >
                <Zap className="w-4 h-4 text-primary" />
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  Approval Required
                </span>
              </div>
            </div>
          </ParallaxLayer>

          {/* Main Headline */}
          <ParallaxLayer speed={0.05} direction="down" className="mb-8">
            <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.85] tracking-tighter">
              <AnimatedText
                text="Inspire"
                as="span"
                animation="chars"
                className="block text-foreground"
                staggerDelay={0.04}
              />
              <AnimatedText
                text="Oklahoma"
                as="span"
                animation="chars"
                className="block text-primary"
                staggerDelay={0.03}
              />
              <AnimatedText
                text="City"
                as="span"
                animation="chars"
                className="block text-foreground"
                staggerDelay={0.05}
              />
            </h1>
          </ParallaxLayer>

          {/* Subheadline */}
          <ParallaxLayer speed={0.03} direction="down" className="mb-10">
            <div className="max-w-xl">
              <RevealText
                text="Stories, podcasts, apps, and events that turn strangers into people who show up."
                as="p"
                className="text-xl sm:text-2xl text-muted-foreground font-medium"
              />
              <p className="text-lg text-primary font-bold mt-2 animate-pulse-soft">
                Powered by TLC.
              </p>
            </div>
          </ParallaxLayer>

          {/* CTA Buttons */}
          <div 
            ref={ctaRef}
            className={cn(
              "flex flex-wrap gap-4 mb-8 transition-all duration-700",
              ctaVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
          >
            <Link to="/apply">
              <button className="group relative overflow-hidden px-8 py-4 border-4 border-foreground bg-primary text-primary-foreground font-black uppercase tracking-wider text-lg transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1 active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  boxShadow: '6px 6px 0 hsl(var(--foreground))',
                }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Apply to Join
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </span>
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-secondary translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              </button>
            </Link>

            <a href="#story">
              <button className="group relative overflow-hidden px-8 py-4 border-4 border-foreground bg-transparent text-foreground font-black uppercase tracking-wider text-lg transition-all duration-200 hover:-translate-x-1 hover:-translate-y-1"
                style={{
                  boxShadow: '6px 6px 0 hsl(var(--primary))',
                }}
              >
                <span className="relative z-10">Explore My Work</span>
                {/* Underline effect */}
                <div className="absolute bottom-0 left-0 w-full h-1 bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </button>
            </a>
          </div>

          {/* Trust Line */}
          <div 
            className={cn(
              "transition-all duration-700 delay-300",
              ctaVisible ? "opacity-100" : "opacity-0"
            )}
          >
            <p className="text-sm text-muted-foreground uppercase tracking-widest font-bold flex items-center gap-3">
              <span className="w-8 h-px bg-muted-foreground" />
              No spam. No random DMs. Real-life first.
            </p>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 animate-bounce">
          <span className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">
            Scroll
          </span>
          <div className="w-6 h-10 border-2 border-muted-foreground/50 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-primary rounded-full animate-pulse" />
          </div>
        </div>
      </div>

      {/* Bottom edge line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-primary" />
    </section>
  );
};
