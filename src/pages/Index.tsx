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
    { label: "Events", href: "#events" },
    { label: "Story", href: "#story" },
    { label: "Podcast", href: "#podcast" },
    { label: "Singles", href: "/singles", isRoute: true },
    { label: "Apps", href: "/apps", isRoute: true },
    { label: "Info", href: "/info", isRoute: true },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b-4 border-primary brutal-shadow">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo - Clickable for PWA Install */}
            <button
              onClick={() => setInstallModalOpen(true)}
              className="flex items-center gap-3 group cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary flex items-center justify-center border-4 border-foreground brutal-shadow-sm group-hover:scale-110 transition-all">
                <Zap className="w-6 h-6 text-foreground" fill="currentColor" />
              </div>
              <div className="text-left">
                <span className="font-black text-foreground text-2xl uppercase tracking-tight flex items-center gap-2">
                  Inspire OKC
                  <Download className="w-4 h-4 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </span>
                <p className="text-[11px] font-black uppercase tracking-widest">
                  By <span className="tlc-gradient-text">TLC</span>
                </p>
              </div>
            </button>

            {/* Nav Links - Enhanced */}
            <nav className="hidden lg:flex items-center gap-2">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="px-4 py-2 text-sm font-black uppercase tracking-wider text-foreground hover:bg-primary hover:text-foreground transition-all border-2 border-transparent hover:border-foreground"
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="px-4 py-2 text-sm font-black uppercase tracking-wider text-foreground hover:bg-primary hover:text-foreground transition-all border-2 border-transparent hover:border-foreground"
                  >
                    {item.label}
                  </a>
                )
              )}
            </nav>

            {/* Auth - Enhanced */}
            <div className="flex items-center gap-3">
              {!loading && (
                <>
                  {user ? (
                    <div className="flex items-center gap-2">
                      <Link to="/cartoonizer">
                        <Button size="sm" className="brutal-btn text-sm font-black uppercase">
                          <Sparkles className="w-4 h-4" />
                          Lab
                        </Button>
                      </Link>
                      <Button size="sm" variant="ghost" onClick={signOut} className="text-foreground text-sm font-black uppercase border-2 border-foreground hover:bg-foreground hover:text-background">
                        Sign Out
                      </Button>
                    </div>
                  ) : (
                    <Link to="/auth">
                      <Button size="sm" className="gap-2 border-4 border-foreground bg-primary text-foreground font-black uppercase hover:bg-foreground hover:text-background brutal-shadow-sm">
                        <LogIn className="w-4 h-4" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </>
              )}
              <button
                className="lg:hidden p-3 text-foreground border-4 border-foreground bg-primary brutal-shadow-sm hover:bg-foreground hover:text-background transition-all"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>

          {/* Mobile Nav - Enhanced */}
          {mobileMenuOpen && (
            <nav className="lg:hidden pt-6 border-t-4 border-primary mt-4">
              {navItems.map((item) =>
                item.isRoute ? (
                  <Link
                    key={item.label}
                    to={item.href}
                    className="block px-6 py-4 text-base font-black uppercase text-foreground hover:bg-primary hover:text-foreground border-b-2 border-border"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <a
                    key={item.label}
                    href={item.href}
                    className="block px-6 py-4 text-base font-black uppercase text-foreground hover:bg-primary hover:text-foreground border-b-2 border-border"
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
    <footer className="py-16 bg-primary border-t-8 border-foreground">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Logo Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-foreground flex items-center justify-center border-4 border-background brutal-shadow-sm">
                <Zap className="w-8 h-8 text-background" fill="currentColor" />
              </div>
              <div>
                <span className="font-black text-foreground uppercase text-2xl block">Inspire OKC</span>
                <p className="text-sm font-black uppercase">By <span className="tlc-gradient-text">TLC</span></p>
              </div>
            </div>
            <p className="text-foreground font-bold text-sm uppercase tracking-wide">
              Real-life connections.<br/>
              No spam. No BS.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-black text-foreground uppercase text-lg mb-4 border-b-4 border-foreground pb-2">
              Navigate
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <Link to="/story" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Story
              </Link>
              <Link to="/podcast" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Podcast
              </Link>
              <Link to="/apps" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Apps
              </Link>
              <Link to="/singles" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Singles
              </Link>
              <Link to="/apply" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Apply
              </Link>
              <Link to="/info" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Info
              </Link>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-black text-foreground uppercase text-lg mb-4 border-b-4 border-foreground pb-2">
              Legal
            </h3>
            <div className="flex flex-col gap-3">
              <Link to="/privacy" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-foreground hover:text-background transition-colors font-black uppercase text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t-4 border-foreground pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-foreground font-black uppercase text-sm tracking-wider">
              © 2025 Inspire OKC · Made with 💗 in Oklahoma City
            </p>
            <div className="brutal-card bg-foreground border-foreground px-6 py-3">
              <p className="text-background font-black uppercase text-sm">
                Powered by <span className="tlc-gradient-text">TLC</span>
              </p>
            </div>
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
