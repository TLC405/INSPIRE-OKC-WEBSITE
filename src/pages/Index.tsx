import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Palette, Zap, LogIn } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Index = () => {
  const { user, isAdmin, signOut, loading } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {/* Header */}
      <header className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Zap className="w-6 h-6 text-primary" />
          <span className="font-bold text-lg">TeeFeeMe-5000</span>
        </div>
        <div className="flex items-center gap-3">
          {!loading && (
            <>
              {user ? (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground hidden sm:inline">
                    {user.email}
                  </span>
                  {isAdmin && (
                    <Link to="/app-builder">
                      <Button variant="outline" size="sm">
                        <Sparkles className="w-4 h-4 mr-1" />
                        Admin Lab
                      </Button>
                    </Link>
                  )}
                  <Button variant="ghost" size="sm" onClick={signOut}>
                    Sign Out
                  </Button>
                </div>
              ) : (
                <Link to="/auth">
                  <Button variant="outline" size="sm">
                    <LogIn className="w-4 h-4 mr-1" />
                    Sign In
                  </Button>
                </Link>
              )}
            </>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex items-center justify-center min-h-[calc(100vh-80px)] px-4">
        <div className="text-center max-w-3xl mx-auto space-y-8">
          {/* Logo/Brand */}
          <div className="flex justify-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center animate-pulse-glow">
              <Zap className="w-8 h-8 text-primary-foreground" />
            </div>
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary/60 flex items-center justify-center animate-pulse-glow" style={{ animationDelay: "0.5s" }}>
              <Palette className="w-8 h-8 text-secondary-foreground" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                TeeFeeMe
              </span>
              <span className="text-foreground">-5000</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mx-auto">
              Transform yourself into iconic cartoon characters. 
              Your face, their world, 100% you.
            </p>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/cartoonizer">
              <Button size="lg" className="w-full sm:w-auto text-lg px-8 py-6">
                <Palette className="w-5 h-5 mr-2" />
                Cartoon Lab
              </Button>
            </Link>
            {isAdmin && (
              <Link to="/app-builder">
                <Button size="lg" variant="secondary" className="w-full sm:w-auto text-lg px-8 py-6">
                  <Sparkles className="w-5 h-5 mr-2" />
                  App Builder (Admin)
                </Button>
              </Link>
            )}
          </div>

          {/* Feature Tags */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {["12 Cartoon Styles", "FaceLock Technology", "TLC Easter Eggs", "Instant Download"].map((tag) => (
              <span 
                key={tag}
                className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;