import { Link } from "react-router-dom";
import { Zap, Menu, X, LogIn, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { WeatherWidget } from "@/components/inspire/WeatherWidget";
import { EventsSection } from "@/components/inspire/EventsSection";
import { SocialFeed } from "@/components/inspire/SocialFeed";
import { TeeFeeSection } from "@/components/inspire/TeeFeeSection";

// ============================================================================
// HEADER
// ============================================================================
const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-b-4 border-primary">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-foreground brutal-shadow-sm">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-black text-foreground text-xl uppercase tracking-tight">
                Inspire OKC
              </span>
              <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-widest">
                Powered by TLC
              </p>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {["Events", "Social", "TeeFeeMe"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="px-4 py-2 text-sm font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              >
                {item}
              </a>
            ))}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <Link to="/cartoonizer">
                      <Button size="sm" className="brutal-btn text-xs">
                        <Sparkles className="w-3 h-3" />
                        Lab
                      </Button>
                    </Link>
                    <Button size="sm" variant="ghost" onClick={signOut} className="text-muted-foreground text-xs">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth">
                    <Button size="sm" variant="outline" className="gap-1.5 border-2 border-foreground hover:bg-foreground hover:text-background">
                      <LogIn className="w-3 h-3" />
                      Sign In
                    </Button>
                  </Link>
                )}
              </>
            )}
            <button
              className="md:hidden p-2 text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="md:hidden pt-4 border-t-2 border-border mt-3">
            {["Events", "Social", "TeeFeeMe"].map((item) => (
              <a
                key={item}
                href={`#${item.toLowerCase()}`}
                className="block px-4 py-3 text-sm font-bold uppercase text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};

// ============================================================================
// HERO
// ============================================================================
const HeroSection = () => {
  return (
    <section className="pt-28 pb-16 lg:pt-36 lg:pb-24 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 -right-32 w-80 h-80 bg-secondary/20 blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12 items-start">
          {/* Left: Main Content - 3 cols */}
          <div className="lg:col-span-3 space-y-8">
            {/* Marquee */}
            <div className="overflow-hidden bg-primary py-2 border-y-4 border-foreground -mx-4 px-4">
              <div className="animate-marquee whitespace-nowrap flex gap-8">
                {Array(4).fill(null).map((_, i) => (
                  <span key={i} className="text-primary-foreground font-black uppercase tracking-widest text-sm">
                    🔥 OKLAHOMA CITY · EVENTS · CULTURE · COMMUNITY · INSPIRE · 
                  </span>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <h1 className="text-5xl sm:text-6xl lg:text-8xl font-black uppercase leading-[0.9] tracking-tighter">
                <span className="text-foreground">Inspire</span>
                <br />
                <span className="okc-gradient-text">Oklahoma</span>
                <br />
                <span className="text-foreground">City</span>
              </h1>

              <p className="text-lg sm:text-xl text-muted-foreground max-w-xl font-medium">
                Real-time events, weather, and culture from the heart of Oklahoma. 
                Stay connected. Stay inspired. <span className="text-primary font-bold">Powered by TLC.</span>
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#events">
                  <button className="brutal-btn">
                    Explore Events
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </a>
                <Link to="/cartoonizer">
                  <button className="brutal-btn-outline brutal-btn">
                    <Sparkles className="w-4 h-4" />
                    TeeFeeMe Lab
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Weather - 2 cols */}
          <div className="lg:col-span-2">
            <WeatherWidget />
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// FOOTER
// ============================================================================
const Footer = () => {
  return (
    <footer className="py-12 bg-card border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-foreground">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <span className="font-black text-foreground uppercase">Inspire OKC</span>
              <p className="text-xs text-muted-foreground">Powered by TLC</p>
            </div>
          </div>

          <div className="flex gap-6 text-sm font-bold uppercase tracking-wider">
            <Link to="/cartoonizer" className="text-muted-foreground hover:text-primary transition-colors">
              TeeFeeMe
            </Link>
            <a href="#events" className="text-muted-foreground hover:text-primary transition-colors">
              Events
            </a>
          </div>

          <p className="text-muted-foreground text-sm">
            Made with 💗 in Oklahoma City
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN PAGE
// ============================================================================
const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      <Header />
      <HeroSection />
      <div id="events">
        <EventsSection />
      </div>
      <div id="social">
        <SocialFeed />
      </div>
      <div id="teefeeme">
        <TeeFeeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
