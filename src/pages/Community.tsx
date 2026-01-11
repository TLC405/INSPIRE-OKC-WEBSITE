import { Link } from "react-router-dom";
import { ArrowLeft, Users, Calendar, MessageSquare, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";

const Community = () => {
  const { user } = useAuth();

  // For now, show a preview/apply page. In production, check community_members table
  const isMember = false; // Will be replaced with real check

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Shield className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black uppercase">Members Only</h1>
          <p className="text-muted-foreground">
            Sign in to access the Inspire OKC community.
          </p>
          <div className="pt-4 space-y-3">
            <Link to="/auth">
              <Button className="w-full brutal-btn font-bold">
                Sign In
              </Button>
            </Link>
            <Link to="/apply">
              <Button variant="outline" className="w-full brutal-border font-bold">
                Apply to Join
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  if (!isMember) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <Users className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black uppercase">Approval Required</h1>
          <p className="text-muted-foreground">
            You need to be an approved member to access this community. Apply now and we'll review your application within 48 hours.
          </p>
          <div className="pt-4 space-y-3">
            <Link to="/apply">
              <Button className="w-full brutal-btn font-bold">
                Apply to Join
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full brutal-border font-bold">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Inspire <span className="okc-gradient-text">OKC</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Welcome to the community.
            </p>
          </div>

          {/* Quick Actions */}
          <div className="grid sm:grid-cols-3 gap-4 mb-12">
            <div className="brutal-card p-6 text-center">
              <Calendar className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-black uppercase mb-1">Events</h3>
              <p className="text-muted-foreground text-sm">See what's coming up</p>
            </div>
            <div className="brutal-card p-6 text-center">
              <Users className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-black uppercase mb-1">Members</h3>
              <p className="text-muted-foreground text-sm">Connect with others</p>
            </div>
            <div className="brutal-card p-6 text-center">
              <MessageSquare className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-black uppercase mb-1">Discuss</h3>
              <p className="text-muted-foreground text-sm">Join the conversation</p>
            </div>
          </div>

          {/* Coming Soon */}
          <div className="brutal-card p-8 text-center bg-muted/50">
            <h3 className="text-xl font-black uppercase mb-2">More Coming Soon</h3>
            <p className="text-muted-foreground">
              Community features are being built. Check back soon for events, discussions, and more.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Community;
