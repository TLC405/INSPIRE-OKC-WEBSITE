import { Link } from "react-router-dom";
import { ArrowLeft, Rocket, ExternalLink, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - will be replaced with Supabase data
const apps = [
  {
    id: 1,
    name: "TeeFeeMe-5000",
    description: "Transform your photos into stunning cartoon art. 30+ styles. Instant results. AI-powered magic.",
    url: "/cartoonizer",
    isFeatured: true,
    status: "Live",
  },
  {
    id: 2,
    name: "Inspire OKC",
    description: "The community platform you're on right now. Connecting real people in Oklahoma City.",
    url: "/",
    isFeatured: true,
    status: "Live",
  },
  {
    id: 3,
    name: "Singles OKC Tools",
    description: "Event-first dating. No swiping. Connections unlock after you meet in person.",
    url: "/singles",
    isFeatured: false,
    status: "Beta",
  },
  {
    id: 4,
    name: "Workout Tracker",
    description: "Simple fitness logging. Track workouts, set goals, stay consistent.",
    url: "/workout",
    isFeatured: false,
    status: "Coming Soon",
  },
];

const Apps = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm mb-6">
              <Rocket className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                App Gallery
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Things I've <span className="okc-gradient-text">Built</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Apps, tools, and experiments. Use them. Break them. Fork them.
            </p>
          </div>

          {/* Apps Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {apps.map((app, index) => (
              <div
                key={app.id}
                className={`brutal-card p-6 hover:-translate-y-1 transition-all duration-300 animate-fade-in ${
                  app.isFeatured ? "md:col-span-2" : ""
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary rounded-sm flex items-center justify-center">
                        <Rocket className="w-6 h-6 text-primary-foreground" />
                      </div>
                      <div>
                        <h3 className="text-lg font-black uppercase">{app.name}</h3>
                        <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                          app.status === "Live" 
                            ? "bg-green-500/20 text-green-400"
                            : app.status === "Beta"
                            ? "bg-yellow-500/20 text-yellow-400"
                            : "bg-muted text-muted-foreground"
                        }`}>
                          {app.status}
                        </span>
                      </div>
                    </div>
                    {app.isFeatured && (
                      <div className="flex items-center gap-1 text-primary">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="text-xs font-bold uppercase">Featured</span>
                      </div>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground flex-1 mb-4">{app.description}</p>

                  {/* Action */}
                  {app.status !== "Coming Soon" ? (
                    <Link to={app.url}>
                      <Button className="brutal-btn font-bold w-full">
                        Launch App
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  ) : (
                    <Button disabled className="w-full font-bold">
                      Coming Soon
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className="brutal-card p-8 mt-12 text-center bg-muted/50">
            <h3 className="text-xl font-black uppercase mb-2">Want to Build Together?</h3>
            <p className="text-muted-foreground mb-4">
              I'm always looking for collaborators on new projects.
            </p>
            <Link to="/apply">
              <Button className="brutal-btn font-bold">
                Apply to Join
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Apps;
