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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Background */}
      <VideoBackground
        fallbackImage={okcHero}
        overlayOpacity={0.94}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-6xl mx-auto text-center">
          {/* Ultra Premium Headline */}
          <ParallaxLayer speed={0.05} direction="down" className="mb-20">
            <h1 className="text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-black uppercase leading-[0.85] tracking-tighter mb-12">
              <AnimatedText
                text="Inspire"
                as="span"
                animation="chars"
                className="block text-foreground"
                staggerDelay={0.04}
              />
              <AnimatedText
                text="OKC"
                as="span"
                animation="chars"
                className="block text-primary"
                staggerDelay={0.03}
              />
            </h1>
            
            {/* Refined Tagline */}
            <div className="max-w-3xl mx-auto mb-8">
              <RevealText
                text="Building community through real-life connections"
                as="p"
                className="text-2xl sm:text-3xl text-foreground font-bold leading-tight"
              />
            </div>
            
            {/* Minimal Accent */}
            <div className="flex items-center justify-center gap-4 text-primary font-black uppercase text-sm tracking-widest">
              <Minus className="w-12 h-px" />
              <span>Real-life first</span>
              <Minus className="w-12 h-px" />
            </div>
          </ParallaxLayer>

          {/* Ultra Premium CTA Grid */}
          <div 
            ref={ctaRef}
            className={cn(
              "grid md:grid-cols-2 gap-8 max-w-4xl mx-auto transition-all duration-700",
              ctaVisible 
                ? "opacity-100 translate-y-0" 
                : "opacity-0 translate-y-8"
            )}
          >
            {/* Primary CTA */}
            <Link to="/apply" className="group">
              <div className="relative h-full border-4 border-foreground bg-primary p-10 transition-all duration-300 hover:-translate-y-3"
                style={{
                  boxShadow: '8px 8px 0 hsl(var(--foreground))',
                }}
              >
                <div className="mb-6">
                  <div className="h-1 w-16 bg-foreground mb-6 mx-auto" />
                  <h3 className="text-3xl font-black uppercase tracking-tight text-foreground mb-3">
                    Join
                  </h3>
                  <p className="text-base font-bold text-foreground/80">
                    Become part of the community
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-foreground font-black uppercase text-sm tracking-wider">
                  <span>Apply Now</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>

            {/* Secondary CTA */}
            <Link to="/singles" className="group">
              <div className="relative h-full border-4 border-primary bg-foreground p-10 transition-all duration-300 hover:-translate-y-3"
                style={{
                  boxShadow: '8px 8px 0 hsl(var(--primary))',
                }}
              >
                <div className="mb-6">
                  <div className="h-1 w-16 bg-primary mb-6 mx-auto" />
                  <h3 className="text-3xl font-black uppercase tracking-tight text-background mb-3">
                    Connect
                  </h3>
                  <p className="text-base font-bold text-background/70">
                    Meet people at real events
                  </p>
                </div>
                <div className="flex items-center justify-center gap-2 text-background font-black uppercase text-sm tracking-wider">
                  <span>Learn More</span>
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Minimal Scroll Indicator */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-20">
        <div className="flex flex-col items-center gap-2 opacity-40">
          <div className="w-px h-16 bg-foreground">
            <div className="w-full h-4 bg-primary animate-bounce" />
          </div>
        </div>
      </div>

      {/* Subtle Bottom Edge */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-primary/50" />
    </section>
  );
};
