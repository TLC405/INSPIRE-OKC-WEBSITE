import { Link } from "react-router-dom";
import { Zap, Menu, X, LogIn, Sparkles, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { EventsSection } from "@/components/inspire/EventsSection";
import { SocialFeed } from "@/components/inspire/SocialFeed";
import { TeeFeeSection } from "@/components/inspire/TeeFeeSection";
import { BlogPreview } from "@/components/inspire/BlogPreview";
import { PodcastPreview } from "@/components/inspire/PodcastPreview";
import { GraphicsGallery } from "@/components/inspire/GraphicsGallery";
import { InstallAppModal } from "@/components/inspire/InstallAppModal";
import { CinematicHero } from "@/components/inspire/CinematicHero";
import { ScrollProgress } from "@/components/ui/ScrollProgress";

// ============================================================================
// HEADER
// ============================================================================
const Header = () => {
  const { user, loading, signOut } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [installModalOpen, setInstallModalOpen] = useState(false);

  const navItems = [
    { label: "Social Singles", href: "/singles", isRoute: true },
    { label: "Calisthenics", href: "/calisthenics", isRoute: true },
    { label: "Apps", href: "/apps", isRoute: true },
    { label: "Info", href: "/info", isRoute: true },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-foreground">
        <div className="container mx-auto px-6 py-5">
          <div className="flex items-center justify-between">
            {/* Minimal Logo */}
            <button
              onClick={() => setInstallModalOpen(true)}
              className="flex items-center gap-4 group cursor-pointer"
            >
              <div className="w-10 h-10 bg-foreground flex items-center justify-center transition-all group-hover:bg-primary">
                <Zap className="w-5 h-5 text-background group-hover:text-foreground" fill="currentColor" />
              </div>
              <div className="text-left">
                <span className="font-black text-foreground text-xl uppercase tracking-tight flex items-center gap-2">
                  Inspire OKC
                </span>
                <p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                  By <span className="tlc-gradient-text">TLC</span>
                </p>
              </div>
            </button>

            {/* Clean Nav Links */}
            <nav className="hidden lg:flex items-center gap-8">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="text-sm font-bold uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-px after:bg-primary hover:after:w-full after:transition-all"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Minimal Auth */}
            <div className="flex items-center gap-4">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-3">
                      <Link to="/cartoonizer">
                        <Button size="sm" className="brutal-btn-sm font-bold uppercase">
                          <Sparkles className="w-4 h-4" />
                          Lab
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" onClick={signOut} className="text-muted-foreground text-sm font-bold uppercase hover:text-foreground">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth">
                      <Button size="sm" className="border-2 border-foreground bg-background text-foreground font-bold uppercase hover:bg-foreground hover:text-background transition-colors">
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </>
              )}
              <button
                className="lg:hidden p-2 text-foreground hover:text-primary transition-colors"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Refined Mobile Nav */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pt-6 mt-6 border-t border-border">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-4 py-3 text-base font-bold uppercase text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-4 py-3 text-base font-bold uppercase text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>
          )}
        </div>
      </header>

      <InstallAppModal open={installModalOpen} onOpenChange={setInstallModalOpen} />
    </>
  );
};


// ============================================================================
// FOOTER
// ============================================================================
const Footer = () => {
  return (
    <footer className="py-20 bg-card border-t border-foreground">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-12 gap-12 mb-16">
          {/* Logo & Mission - Spans more columns */}
          <div className="md:col-span-5">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-foreground flex items-center justify-center">
                <Zap className="w-6 h-6 text-background" fill="currentColor" />
              </div>
              <div>
                <span className="font-black text-foreground uppercase text-xl block leading-none">
                  Inspire OKC
                </span>
                <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mt-1">
                  By <span className="tlc-gradient-text">TLC</span>
                </p>
              </div>
            </div>
            <p className="text-foreground font-medium text-base leading-relaxed max-w-md">
              Building community through real-life connections. Stories, podcasts, apps, and events that turn strangers into people who show up.
            </p>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3">
            <h3 className="font-black text-foreground uppercase text-sm mb-4 tracking-wide">
              Explore
            </h3>
            <div className="flex flex-col gap-3">
              <Link to="/singles" className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
                Social Singles
              </Link>
              <Link to="/calisthenics" className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
                Calisthenics
              </Link>
              <Link to="/apps" className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
                Applications
              </Link>
            </div>
          </div>

          {/* Community Links */}
          <div className="md:col-span-2">
            <h3 className="font-black text-foreground uppercase text-sm mb-4 tracking-wide">
              Connect
            </h3>
            <div className="flex flex-col gap-3">
              <Link to="/apply" className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
                Apply
              </Link>
              <Link to="/info" className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
                Info
              </Link>
            </div>
          </div>

          {/* Legal Links */}
          <div className="md:col-span-2">
            <h3 className="font-black text-foreground uppercase text-sm mb-4 tracking-wide">
              Legal
            </h3>
            <div className="flex flex-col gap-3">
              <Link to="/privacy" className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
                Privacy
              </Link>
              <Link to="/terms" className="text-muted-foreground hover:text-primary transition-colors font-bold text-sm">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground font-medium text-sm">
              © 2025 Inspire Oklahoma City
            </p>
            <p className="text-muted-foreground font-medium text-sm">
              Made with care in Oklahoma City
            </p>
          </div>
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
      <ScrollProgress />
      <Header />
      <CinematicHero />
      <div id="events">
        <EventsSection />
      </div>
      <div id="story">
        <BlogPreview />
      </div>
      <div id="podcast">
        <PodcastPreview />
      </div>
      <div id="social">
        <SocialFeed />
      </div>
      <div id="graphics">
        <GraphicsGallery />
      </div>
      <div id="teefeeme">
        <TeeFeeSection />
      </div>
      <Footer />
    </div>
  );
};

export default Index;
