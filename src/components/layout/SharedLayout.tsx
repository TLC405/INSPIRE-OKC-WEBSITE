import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, ArrowLeft, Home, Calendar, Users, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

interface SharedLayoutProps {
  children: React.ReactNode;
  showBackButton?: boolean;
}

const navTabs = [
  { name: "Inspire", href: "/community" },
  { name: "Adulting", href: "/adulting" },
  { name: "Singles", href: "/singles" },
  { name: "Workout", href: "/workout" },
];

const mobileNavItems = [
  { name: "Home", href: "/", icon: Home },
  { name: "Events", href: "/#events", icon: Calendar },
  { name: "Community", href: "/community", icon: Users },
  { name: "Profile", href: "/auth", icon: User },
];

export const SharedLayout = ({ children, showBackButton = false }: SharedLayoutProps) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  const isHome = location.pathname === "/";

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Left: Back button or Logo */}
            <div className="flex items-center gap-3">
              {showBackButton && !isHome && (
                <button
                  onClick={() => navigate(-1)}
                  className="p-2 hover:bg-muted rounded-lg transition-colors"
                >
                  <ArrowLeft className="w-5 h-5" />
                </button>
              )}
              <Link to="/" className="flex items-center gap-2">
                <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center">
                  <span className="text-primary-foreground font-black text-sm">IO</span>
                </div>
                <span className="font-black text-lg tracking-tight hidden sm:block">
                  INSPIRE <span className="text-primary">OKC</span>
                </span>
              </Link>
            </div>

            {/* Center: Nav Tabs (Desktop) */}
            <nav className="hidden lg:flex items-center gap-1">
              {navTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.href}
                  className={`px-4 py-2 text-sm font-bold uppercase tracking-wide transition-colors ${
                    location.pathname === tab.href
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
            </nav>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
              <Link to="/apply">
                <Button variant="outline" size="sm" className="hidden sm:flex brutal-border font-bold">
                  Apply
                </Button>
              </Link>
              
              {user ? (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={signOut}
                  className="font-bold"
                >
                  Sign Out
                </Button>
              ) : (
                <Link to="/auth">
                  <Button size="sm" className="brutal-btn font-bold">
                    Sign In
                  </Button>
                </Link>
              )}

              {/* Mobile menu button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 hover:bg-muted rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-background border-t border-border">
            <nav className="container mx-auto px-4 py-4 space-y-2">
              {navTabs.map((tab) => (
                <Link
                  key={tab.name}
                  to={tab.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`block px-4 py-3 font-bold uppercase tracking-wide transition-colors ${
                    location.pathname === tab.href
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {tab.name}
                </Link>
              ))}
              <Link
                to="/apply"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-4 py-3 font-bold uppercase tracking-wide text-primary"
              >
                Apply to Join
              </Link>
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1 pt-16 pb-20 lg:pb-0">
        {children}
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-t border-border lg:hidden">
        <div className="flex items-center justify-around h-16">
          {mobileNavItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.href || 
              (item.href.includes("#") && location.pathname === "/" && location.hash === item.href.replace("/", ""));
            
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex flex-col items-center gap-1 px-4 py-2 transition-colors ${
                  isActive ? "text-primary" : "text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs font-bold">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Footer (Desktop only) */}
      <footer className="hidden lg:block bg-card border-t border-border py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded-sm flex items-center justify-center">
                <span className="text-primary-foreground font-black text-xs">IO</span>
              </div>
              <span className="font-black text-sm">INSPIRE OKLAHOMA CITY</span>
            </div>
            <p className="text-muted-foreground text-sm">
              Powered by TLC • Made in Oklahoma
            </p>
            <div className="flex gap-6 text-sm">
              <Link to="/story" className="text-muted-foreground hover:text-foreground transition-colors">
                Story
              </Link>
              <Link to="/podcast" className="text-muted-foreground hover:text-foreground transition-colors">
                Podcast
              </Link>
              <Link to="/apps" className="text-muted-foreground hover:text-foreground transition-colors">
                Apps
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};
