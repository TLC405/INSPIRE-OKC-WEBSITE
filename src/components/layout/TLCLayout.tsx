import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { 
  Home, 
  Dumbbell, 
  Heart, 
  DollarSign, 
  Users, 
  Menu, 
  X,
  Headphones,
  Sparkles,
  LogIn,
  LogOut,
  ChevronLeft
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { ArchitectChat } from "@/components/ai/ArchitectChat";
import { cn } from "@/lib/utils";

interface TLCLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
  pageTitle?: string;
}

const navItems = [
  { path: "/", label: "Hub", icon: Home },
  { path: "/workout", label: "Workout", icon: Dumbbell },
  { path: "/singles", label: "Singles", icon: Heart },
  { path: "/adulting", label: "Adulting", icon: DollarSign },
  { path: "/community", label: "Signal", icon: Users },
];

const GPS_COORDS = "Lat_35.4676°N • Lon_97.5164°W";

export const TLCLayout = ({ children, showBackButton = false, pageTitle }: TLCLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, loading, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Desktop Header */}
      <header className="fixed top-0 left-0 right-0 z-40 border-b-4 border-foreground bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Back Button */}
            <div className="flex items-center gap-4">
              {showBackButton ? (
                <button
                  onClick={() => navigate(-1)}
                  className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                  <span className="font-mono text-xs uppercase tracking-wider hidden sm:block">Back</span>
                </button>
              ) : (
                <Link to="/" className="flex items-center gap-2 group">
                  <span className="text-xl font-black uppercase tracking-tight">
                    INSPIRE<span className="text-primary">_</span>OKC
                  </span>
                </Link>
              )}
              {pageTitle && (
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider hidden md:block">
                  / {pageTitle}
                </span>
              )}
            </div>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={cn(
                      "flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                      isActive(item.path)
                        ? "text-primary bg-primary/10 border-b-2 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/podcast"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                  isActive("/podcast")
                    ? "text-primary bg-primary/10 border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Headphones className="w-4 h-4" />
                Podcast
              </Link>
              <Link
                to="/cartoonizer"
                className={cn(
                  "flex items-center gap-2 px-3 py-2 font-mono text-xs uppercase tracking-wider transition-all",
                  isActive("/cartoonizer")
                    ? "text-primary bg-primary/10 border-b-2 border-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <Sparkles className="w-4 h-4" />
                Studio
              </Link>
            </nav>

            {/* Auth + Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              {!loading && (
                <>
                  {user ? (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => signOut()}
                      className="hidden sm:flex items-center gap-2 font-mono text-xs uppercase"
                    >
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </Button>
                  ) : (
                    <Link to="/auth" className="hidden sm:block">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="font-mono text-xs uppercase"
                      >
                        <LogIn className="w-4 h-4 mr-2" />
                        Sign In
                      </Button>
                    </Link>
                  )}
                </>
              )}
              <Link to="/apply" className="hidden md:block">
                <Button className="brutal-btn text-xs py-2 px-4">
                  Apply
                </Button>
              </Link>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-muted transition-colors"
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t-4 border-foreground bg-background animate-fade-in">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setMobileMenuOpen(false)}
                    className={cn(
                      "flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-wider transition-all",
                      isActive(item.path)
                        ? "text-primary bg-primary/10 border-l-4 border-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <Link
                to="/podcast"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                <Headphones className="w-5 h-5" />
                Podcast
              </Link>
              <Link
                to="/cartoonizer"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
              >
                <Sparkles className="w-5 h-5" />
                TLC Studio
              </Link>
              <div className="pt-4 border-t border-border">
                {user ? (
                  <button
                    onClick={() => {
                      signOut();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground w-full"
                  >
                    <LogOut className="w-5 h-5" />
                    Sign Out
                  </button>
                ) : (
                  <Link
                    to="/auth"
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 font-mono text-sm uppercase tracking-wider text-muted-foreground hover:text-foreground"
                  >
                    <LogIn className="w-5 h-5" />
                    Sign In
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 z-40 border-t-4 border-foreground bg-background">
        <div className="flex items-center justify-around h-16">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex flex-col items-center justify-center gap-1 flex-1 h-full transition-colors",
                  isActive(item.path)
                    ? "text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                <Icon className="w-5 h-5" />
                <span className="font-mono text-[10px] uppercase tracking-wider">
                  {item.label}
                </span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* GPS Footer (Desktop) */}
      <footer className="hidden lg:block border-t-4 border-foreground bg-card py-4">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <span className="font-mono text-xs text-muted-foreground uppercase tracking-[0.3em]">
            OS_TLC_ARCH_v6.0
          </span>
          <span className="font-mono text-xs text-muted-foreground tracking-wider">
            {GPS_COORDS}
          </span>
          <span className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} INSPIRE_OKC
          </span>
        </div>
      </footer>

      {/* AI Chatbot */}
      <ArchitectChat />
    </div>
  );
};
