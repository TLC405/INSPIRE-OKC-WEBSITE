import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield } from "lucide-react";
import { WeatherWidget } from "./WeatherWidget";
import okcHero from "@/assets/okc-community-hero.png";

export const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${okcHero})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-background/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Main Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                Approval Required
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black uppercase leading-none tracking-tight">
              Building Real
              <br />
              <span className="okc-gradient-text">Community</span>
              <br />
              in OKC.
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-muted-foreground max-w-lg">
              Stories, podcasts, apps, and events that turn strangers into people who show up.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/apply">
                <Button size="lg" className="brutal-btn text-lg px-8 py-6 font-black uppercase tracking-wide">
                  Apply to Join
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/story">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="brutal-border text-lg px-8 py-6 font-bold uppercase tracking-wide"
                >
                  Explore My Work
                </Button>
              </Link>
            </div>

            {/* Trust Line */}
            <p className="text-sm text-muted-foreground">
              No spam. No random DMs. Real-life first.
            </p>
          </div>

          {/* Right: Weather Widget */}
          <div className="hidden lg:flex justify-end">
            <WeatherWidget />
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-muted-foreground/30 rounded-full flex justify-center pt-2">
          <div className="w-1 h-3 bg-muted-foreground/50 rounded-full" />
        </div>
      </div>
    </section>
  );
};
