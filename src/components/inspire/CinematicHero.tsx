import { Link } from 'react-router-dom';
import { ArrowRight, Minus } from 'lucide-react';
import { VideoBackground } from '@/components/ui/VideoBackground';
import { ParallaxLayer } from '@/components/ui/ParallaxLayer';
import { AnimatedText, RevealText } from '@/components/ui/AnimatedText';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { cn } from '@/lib/utils';
import okcHero from '@/assets/okc-community-hero.png';

export const CinematicHero = () => {
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-background">
      {/* Background */}
      <VideoBackground
        fallbackImage={okcHero}
        overlayOpacity={0.92}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="max-w-7xl mx-auto">
          {/* Elegant Typography Grid */}
          <ParallaxLayer speed={0.05} direction="down" className="mb-16">
            <div className="grid lg:grid-cols-2 gap-12 items-end">
              {/* Left: Headline */}
              <div>
                <div className="mb-6 flex items-center gap-4">
                  <div className="h-1 w-16 bg-primary" />
                  <span className="text-sm font-black uppercase tracking-[0.2em] text-primary">
                    Oklahoma City
                  </span>
                </div>
                <h1 className="text-6xl sm:text-7xl md:text-8xl font-black uppercase leading-[0.9] tracking-tight mb-8">
                  <AnimatedText
                    text="Inspire"
                    as="span"
                    animation="chars"
                    className="block text-foreground"
                    staggerDelay={0.04}
                  />
                  <AnimatedText
                    text="Your"
                    as="span"
                    animation="chars"
                    className="block text-primary"
                    staggerDelay={0.03}
                  />
                  <AnimatedText
                    text="Community"
                    as="span"
                    animation="chars"
                    className="block text-foreground"
                    staggerDelay={0.05}
                  />
                </h1>
              </div>

              {/* Right: Subheadline */}
              <div className="lg:border-l-4 lg:border-foreground lg:pl-12">
                <RevealText
                  text="Stories, podcasts, apps, and events that turn strangers into people who show up."
                  as="p"
                  className="text-xl sm:text-2xl text-foreground font-bold leading-tight mb-6"
                />
                <div className="flex items-center gap-3 text-primary font-black uppercase text-sm tracking-widest">
                  <Minus className="w-8 h-1" />
                  <span>Real-life first</span>
                </div>
              </div>
            </div>
          </ParallaxLayer>

          {/* Elegant CTA Grid */}
          <div 
            ref={ctaRef}
            className={cn(
              "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-700",
              ctaVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
          >
            {/* Primary CTA */}
            <Link to="/apply" className="group">
              <div className="relative h-full border-4 border-foreground bg-primary p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  boxShadow: '6px 6px 0 hsl(var(--foreground))',
                }}
              >
                <div className="mb-4">
                  <div className="h-1 w-12 bg-foreground mb-4" />
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-2">
                    Join Us
                  </h3>
                  <p className="text-sm font-bold text-foreground/80">
                    Apply to become part of the community
                  </p>
                </div>
                <div className="flex items-center gap-2 text-foreground font-black uppercase text-xs tracking-wider">
                  <span>Apply Now</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            {/* Secondary CTA */}
            <a href="#story" className="group">
              <div className="relative h-full border-4 border-primary bg-foreground p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  boxShadow: '6px 6px 0 hsl(var(--primary))',
                }}
              >
                <div className="mb-4">
                  <div className="h-1 w-12 bg-primary mb-4" />
                  <h3 className="text-2xl font-black uppercase tracking-tight text-background mb-2">
                    Stories
                  </h3>
                  <p className="text-sm font-bold text-background/70">
                    Read about our community impact
                  </p>
                </div>
                <div className="flex items-center gap-2 text-background font-black uppercase text-xs tracking-wider">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </a>

            {/* Tertiary CTA */}
            <Link to="/singles" className="group sm:col-span-2 lg:col-span-1">
              <div className="relative h-full border-4 border-foreground bg-background p-8 transition-all duration-300 hover:-translate-y-2"
                style={{
                  boxShadow: '6px 6px 0 hsl(var(--primary))',
                }}
              >
                <div className="mb-4">
                  <div className="h-1 w-12 bg-primary mb-4" />
                  <h3 className="text-2xl font-black uppercase tracking-tight text-foreground mb-2">
                    Singles
                  </h3>
                  <p className="text-sm font-bold text-muted-foreground">
                    Meet people at real-life events
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary font-black uppercase text-xs tracking-wider">
                  <span>Learn More</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 opacity-50">
          <div className="w-0.5 h-12 bg-foreground">
            <div className="w-full h-3 bg-primary animate-bounce" />
          </div>
        </div>
      </div>

      {/* Subtle Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary" />
    </section>
  );
};
