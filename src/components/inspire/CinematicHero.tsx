import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Sparkles } from 'lucide-react';
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
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Layer 1: Video/Image Background */}
      <VideoBackground
        fallbackImage={okcHero}
        overlayOpacity={0.85}
      />

      {/* Layer 2: Floating Geometric Shapes */}
      <FloatingShapes />

      {/* Layer 3: Content */}
      <div className="relative z-10 container mx-auto px-4 pt-28 pb-20 lg:pt-36 lg:pb-28">
        <div className="max-w-6xl mx-auto">
          {/* Eyebrow with TLC branding */}
          <ParallaxLayer speed={0.1} direction="down">
            <div className="mb-8 flex flex-wrap gap-4 items-center">
              <div 
                className={cn(
                  "inline-flex items-center gap-2 px-6 py-3 border-4 border-primary bg-primary brutal-shadow",
                  "transition-all duration-500"
                )}
                style={{
                  transform: `translate(${mousePosition.x * 5}px, ${mousePosition.y * 5}px)`,
                }}
              >
                <Zap className="w-5 h-5 text-foreground" fill="currentColor" />
                <span className="text-sm font-black uppercase tracking-widest text-foreground">
                  Powered by <span className="tlc-gradient-text">TLC</span>
                </span>
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 border-4 border-foreground bg-background/90 brutal-shadow-sm">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-xs font-black uppercase tracking-widest text-primary">
                  Approval Required
                </span>
              </div>
            </div>
          </ParallaxLayer>

          {/* Main Headline - Ultra Bold */}
          <ParallaxLayer speed={0.05} direction="down" className="mb-10">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[12rem] font-black uppercase leading-[0.8] tracking-tighter">
              <AnimatedText
                text="Inspire"
                as="span"
                animation="chars"
                className="block text-foreground drop-shadow-[0_4px_0_hsl(var(--primary))]"
                staggerDelay={0.04}
              />
              <AnimatedText
                text="Oklahoma"
                as="span"
                animation="chars"
                className="block text-primary drop-shadow-[0_6px_0_hsl(var(--foreground))]"
                staggerDelay={0.03}
              />
              <AnimatedText
                text="City"
                as="span"
                animation="chars"
                className="block text-foreground drop-shadow-[0_4px_0_hsl(var(--primary))]"
                staggerDelay={0.05}
              />
            </h1>
          </ParallaxLayer>

          {/* Subheadline - Brutalist Cards */}
          <ParallaxLayer speed={0.03} direction="down" className="mb-12">
            <div className="max-w-2xl">
              <div className="brutal-card bg-primary border-primary p-6 mb-4">
                <RevealText
                  text="Stories, podcasts, apps, and events that turn strangers into people who show up."
                  as="p"
                  className="text-2xl sm:text-3xl text-foreground font-black uppercase leading-tight"
                />
              </div>
              <div className="brutal-card bg-foreground border-foreground p-4">
                <p className="text-base sm:text-lg text-background font-black uppercase tracking-wider">
                  🔥 No spam · No random DMs · Real-life first
                </p>
              </div>
            </div>
          </ParallaxLayer>

          {/* CTA Buttons - Enhanced Brutalist Style */}
          <div 
            ref={ctaRef}
            className={cn(
              "flex flex-wrap gap-6 transition-all duration-700",
              ctaVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
          >
            <Link to="/apply">
              <button className="group relative overflow-hidden px-10 py-6 border-4 border-foreground bg-primary text-foreground font-black uppercase tracking-wider text-xl transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  boxShadow: '8px 8px 0 hsl(var(--foreground))',
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Apply to Join
                  <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
                </span>
              </button>
            </Link>

            <a href="#story">
              <button className="group relative overflow-hidden px-10 py-6 border-4 border-primary bg-foreground text-background font-black uppercase tracking-wider text-xl transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  boxShadow: '8px 8px 0 hsl(var(--primary))',
                }}
              >
                <span className="relative z-10 flex items-center gap-3">
                  Explore Content
                  <Sparkles className="w-6 h-6 transition-transform group-hover:rotate-180" />
                </span>
              </button>
            </a>

            <Link to="/singles">
              <button className="group relative overflow-hidden px-10 py-6 border-4 border-foreground bg-background text-foreground font-black uppercase tracking-wider text-xl transition-all duration-200 hover:-translate-x-2 hover:-translate-y-2 active:translate-x-0.5 active:translate-y-0.5"
                style={{
                  boxShadow: '8px 8px 0 hsl(var(--primary))',
                }}
              >
                <span className="relative z-10">Singles OKC →</span>
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Enhanced */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-3">
          <div className="w-12 h-16 border-4 border-primary bg-background/80 flex justify-center pt-3 brutal-shadow-sm">
            <div className="w-2 h-4 bg-primary animate-bounce" />
          </div>
          <span className="text-xs uppercase tracking-widest text-foreground font-black px-3 py-1 bg-primary border-2 border-foreground">
            Scroll
          </span>
        </div>
      </div>

      {/* Bottom edge with TLC */}
      <div className="absolute bottom-0 left-0 right-0 h-2 bg-primary border-t-4 border-foreground" />
    </section>
  );
};
