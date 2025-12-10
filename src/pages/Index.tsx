import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { 
  Sparkles, 
  Palette, 
  Zap, 
  LogIn, 
  Upload, 
  Download, 
  Shield, 
  Wand2,
  ArrowRight,
  Star,
  Users,
  Layers,
  ChevronRight,
  Menu,
  X
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";

// ============================================================================
// HEADER COMPONENT
// ============================================================================
interface HeaderProps {
  user: ReturnType<typeof useAuth>["user"];
  isAdmin: boolean;
  loading: boolean;
  signOut: () => void;
}

const Header = ({ user, isAdmin, loading, signOut }: HeaderProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: "Overview", href: "#overview" },
    { label: "How it works", href: "#how-it-works" },
    { label: "Styles", href: "#styles" },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-foreground leading-tight">TeeFeeMe-5000</span>
              <span className="text-[10px] text-muted-foreground leading-tight hidden sm:block">Cartoon Lab</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Auth Area */}
          <div className="flex items-center gap-2">
            {!loading && (
              <>
                {user ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground hidden md:inline max-w-[120px] truncate">
                      {user.email}
                    </span>
                    <Link to="/cartoonizer">
                      <Button size="sm" className="tfm-button-hover gap-1.5">
                        <Palette className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Cartoon Lab</span>
                      </Button>
                    </Link>
                    {isAdmin && (
                      <Link to="/app-builder" className="hidden sm:block">
                        <Button size="sm" variant="secondary" className="gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          Admin
                        </Button>
                      </Link>
                    )}
                    <Button size="sm" variant="ghost" onClick={signOut} className="text-muted-foreground">
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Link to="/cartoonizer">
                      <Button size="sm" className="tfm-button-hover gap-1.5">
                        <Palette className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Launch</span> Lab
                      </Button>
                    </Link>
                    <Link to="/auth">
                      <Button size="sm" variant="outline" className="gap-1.5">
                        <LogIn className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Sign In</span>
                      </Button>
                    </Link>
                  </div>
                )}
              </>
            )}
            
            {/* Mobile Menu Toggle */}
            <button
              className="lg:hidden p-2 text-muted-foreground hover:text-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        {mobileMenuOpen && (
          <nav className="lg:hidden pt-4 pb-2 border-t border-border/40 mt-3 animate-fade-in">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-3 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              {isAdmin && (
                <Link
                  to="/app-builder"
                  className="px-4 py-3 text-sm font-medium text-secondary hover:bg-muted/50 rounded-lg transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Admin Lab
                </Link>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};

// ============================================================================
// HERO SECTION
// ============================================================================
interface HeroProps {
  isAdmin: boolean;
}

const HeroSection = ({ isAdmin }: HeroProps) => {
  return (
    <section id="overview" className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 overflow-hidden">
      {/* Decorative background blobs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 -left-32 w-96 h-96 bg-primary/8 rounded-full blur-3xl" />
        <div className="absolute top-40 -right-32 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-accent/6 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight tracking-tight">
                <span className="text-foreground">Turn your face into</span>
                <br />
                <span className="tfm-gradient-text">instant cartoon magic</span>
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0">
                Upload a photo, pick from 30+ cartoon styles, and download your transformation. It's that simple.
              </p>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <Link to="/cartoonizer">
                <Button size="lg" className="w-full sm:w-auto tfm-button-hover gap-2 text-base px-6 py-5">
                  <Sparkles className="w-5 h-5" />
                  Start Cartoonizing
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              {isAdmin ? (
                <Link to="/app-builder">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-6 py-5">
                    <Wand2 className="w-5 h-5" />
                    App Builder (Admin)
                  </Button>
                </Link>
              ) : (
                <a href="#styles">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto gap-2 text-base px-6 py-5">
                    <Layers className="w-5 h-5" />
                    Browse Styles
                  </Button>
                </a>
              )}
            </div>

            {/* Trust Pills */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start pt-2">
              {[
                { icon: Shield, label: "FaceLock-safe" },
                { icon: Zap, label: "Ready in seconds" },
                { icon: Star, label: "No skills needed" },
              ].map((item) => (
                <span
                  key={item.label}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-muted/60 text-muted-foreground rounded-full border border-border/50"
                >
                  <item.icon className="w-3 h-3" />
                  {item.label}
                </span>
              ))}
            </div>
          </div>

          {/* Right: Hero Visual Card */}
          <div className="relative animate-fade-in" style={{ animationDelay: "0.2s" }}>
            <div className="tfm-card-glass p-6 sm:p-8 rounded-3xl shadow-2xl shadow-primary/5 tfm-float">
              {/* Preview Panel */}
              <div className="flex gap-4 mb-6">
                {/* Original */}
                <div className="flex-1 aspect-square rounded-2xl bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center border border-border/50">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-muted-foreground/10 flex items-center justify-center">
                      <Users className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <span className="text-xs text-muted-foreground/60">Your photo</span>
                  </div>
                </div>
                
                {/* Arrow */}
                <div className="flex items-center">
                  <ChevronRight className="w-6 h-6 text-primary animate-pulse-soft" />
                </div>
                
                {/* Cartoon */}
                <div className="flex-1 aspect-square rounded-2xl bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center border border-primary/20">
                  <div className="text-center space-y-2">
                    <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                      <Palette className="w-8 h-8 text-primary" />
                    </div>
                    <span className="text-xs text-primary/80 font-medium">Cartoon you</span>
                  </div>
                </div>
              </div>

              {/* Style Pills */}
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Popular Styles</p>
                <div className="flex flex-wrap gap-2">
                  {["Springfield", "Bikini Bottom", "Anime", "Toontown"].map((style) => (
                    <span
                      key={style}
                      className="px-3 py-1.5 text-xs font-medium bg-card rounded-full border border-border hover:border-primary/40 transition-colors cursor-pointer"
                    >
                      {style}
                    </span>
                  ))}
                  <span className="px-3 py-1.5 text-xs font-medium text-primary bg-primary/10 rounded-full">
                    +8 more
                  </span>
                </div>
              </div>
            </div>

            {/* Floating badges */}
            <div className="absolute -top-4 -right-4 hidden lg:block animate-float" style={{ animationDelay: "0.5s" }}>
              <div className="px-3 py-2 rounded-xl bg-secondary text-secondary-foreground text-xs font-bold shadow-lg">
                FaceLock 2.0
              </div>
            </div>
            <div className="absolute -bottom-4 -left-4 hidden lg:block animate-float" style={{ animationDelay: "1s" }}>
              <div className="px-3 py-2 rounded-xl bg-accent text-accent-foreground text-xs font-bold shadow-lg">
                30+ Styles
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// HOW IT WORKS SECTION
// ============================================================================
const HowItWorksSection = () => {
  const steps = [
    {
      icon: Upload,
      title: "Drop your photo",
      description: "Upload any clear face photo. We support JPG, PNG, and more.",
      color: "primary",
    },
    {
      icon: Palette,
      title: "Pick a cartoon style",
      description: "Choose from 30+ styles across anime, games, movies, and more.",
      color: "secondary",
    },
    {
      icon: Download,
      title: "Download & share",
      description: "Get your cartoon instantly. High-res, ready for social media.",
      color: "accent",
    },
  ];

  const colorClasses = {
    primary: "bg-primary/10 text-primary border-primary/20",
    secondary: "bg-secondary/10 text-secondary border-secondary/20",
    accent: "bg-accent/10 text-accent border-accent/20",
  };

  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            How TeeFeeMe-5000 works
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Three simple steps to transform yourself into any cartoon world
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <div
              key={step.title}
              className="tfm-card text-center space-y-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex justify-center">
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center border ${
                    colorClasses[step.color as keyof typeof colorClasses]
                  }`}
                >
                  <step.icon className="w-7 h-7" />
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-xs font-bold text-muted-foreground uppercase tracking-wider">
                  Step {index + 1}
                </div>
                <h3 className="text-xl font-bold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// STYLES SECTION
// ============================================================================
const StylesSection = () => {
  const styles = [
    { name: "Springfield Life", vibe: "Yellow skin, iconic overbite", emoji: "🍩", gradient: "from-yellow-400/20 to-orange-400/20" },
    { name: "Bikini Bottom", vibe: "Undersea bubbly world", emoji: "🧽", gradient: "from-blue-400/20 to-cyan-400/20" },
    { name: "Interdimensional", vibe: "Neon sci-fi portal vibes", emoji: "🌀", gradient: "from-green-400/20 to-teal-400/20" },
    { name: "Pokémon World", vibe: "Adventure anime style", emoji: "⚡", gradient: "from-yellow-400/20 to-red-400/20" },
    { name: "Toontown Classic", vibe: "1930s rubber-hose magic", emoji: "🎬", gradient: "from-gray-400/20 to-slate-400/20" },
    { name: "Peppa World", vibe: "Minimal nursery style", emoji: "🐷", gradient: "from-pink-400/20 to-rose-400/20" },
  ];

  const features = [
    "30+ Cartoon Styles",
    "FaceLock Technology",
    "TLC Easter Eggs",
    "Instant Download",
    "High Resolution",
    "Identity Safe",
  ];

  return (
    <section id="styles" className="py-20 lg:py-28">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Cartoon styles at your fingertips
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From classic TV shows to modern animation, find your perfect cartoon world
          </p>
        </div>

        {/* Style Cards - Horizontal scroll on mobile */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 lg:mx-0 lg:px-0 lg:overflow-visible">
          <div className="flex lg:grid lg:grid-cols-3 gap-4 lg:gap-6 min-w-max lg:min-w-0">
            {styles.map((style, index) => (
              <div
                key={style.name}
                className="w-64 lg:w-auto tfm-card group cursor-pointer animate-fade-in"
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <div className={`h-24 rounded-xl bg-gradient-to-br ${style.gradient} flex items-center justify-center mb-4 group-hover:scale-[1.02] transition-transform`}>
                  <span className="text-4xl">{style.emoji}</span>
                </div>
                <h3 className="font-bold text-foreground group-hover:text-primary transition-colors">
                  {style.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{style.vibe}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Feature Tags */}
        <div className="mt-12 flex flex-wrap justify-center gap-3">
          {features.map((feature) => (
            <span
              key={feature}
              className="px-4 py-2 text-sm font-medium bg-card text-foreground rounded-full border border-border hover:border-primary/40 transition-colors"
            >
              {feature}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

// ============================================================================
// CREATORS SECTION
// ============================================================================
interface CreatorsSectionProps {
  isAdmin: boolean;
}

const CreatorsSection = ({ isAdmin }: CreatorsSectionProps) => {
  return (
    <section className="py-20 lg:py-28 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Built for creators and control freaks
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Whether you're making content or building tools, we've got you covered
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8 max-w-4xl mx-auto">
          {/* For Users */}
          <div className="tfm-card space-y-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <Users className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">For Everyone</h3>
            <p className="text-muted-foreground">
              No tech skills needed. Just upload, pick a style, and download. Perfect for social media, profile pics, or just for fun.
            </p>
            <Link to="/cartoonizer">
              <Button className="gap-2 tfm-button-hover">
                Try it now
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>

          {/* For Admin/Creators */}
          <div className={`tfm-card space-y-4 ${isAdmin ? "border-secondary/30" : ""}`}>
            <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-secondary" />
            </div>
            <h3 className="text-xl font-bold text-foreground">
              {isAdmin ? "TLC App Builder" : "For Power Users"}
            </h3>
            {isAdmin ? (
              <>
                <p className="text-muted-foreground">
                  Access the admin lab to test new styles, manage users, and build custom tools for the TeeFeeMe platform.
                </p>
                <Link to="/app-builder">
                  <Button variant="secondary" className="gap-2">
                    Open App Builder
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </>
            ) : (
              <>
                <p className="text-muted-foreground">
                  Power features and admin tools are coming soon. Stay tuned for custom style creation and batch processing.
                </p>
                <Button variant="outline" disabled className="gap-2 opacity-60">
                  Coming Soon
                </Button>
              </>
            )}
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
    <footer className="py-12 border-t border-border/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <span className="font-bold text-foreground">TeeFeeMe-5000</span>
          </div>

          {/* Links */}
          <div className="flex items-center gap-6 text-sm">
            <Link to="/cartoonizer" className="text-muted-foreground hover:text-foreground transition-colors">
              Cartoon Lab
            </Link>
            <Link to="/auth" className="text-muted-foreground hover:text-foreground transition-colors">
              Sign In
            </Link>
            <a href="#styles" className="text-muted-foreground hover:text-foreground transition-colors">
              Styles
            </a>
          </div>

          {/* Made with */}
          <p className="text-xs text-muted-foreground">
            Made in the cartoon lab ✨
          </p>
        </div>
      </div>
    </footer>
  );
};

// ============================================================================
// MAIN INDEX PAGE
// ============================================================================
const Index = () => {
  const { user, isAdmin, signOut, loading } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <Header user={user} isAdmin={isAdmin} loading={loading} signOut={signOut} />
      <main>
        <HeroSection isAdmin={isAdmin} />
        <HowItWorksSection />
        <StylesSection />
        <CreatorsSection isAdmin={isAdmin} />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
