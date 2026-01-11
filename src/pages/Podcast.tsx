import { Link } from "react-router-dom";
import { ArrowLeft, Play, Clock, Headphones } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - will be replaced with Supabase data
const episodes = [
  {
    id: 1,
    number: 47,
    title: "Starting Over at 30",
    description: "What it really feels like to rebuild your life from scratch. The fears, the freedom, and the unexpected clarity.",
    duration: "42:15",
    date: "Jan 5, 2025",
  },
  {
    id: 2,
    number: 46,
    title: "Building Community in a Lonely City",
    description: "Why OKC needs more than networking events. Creating spaces where people actually connect.",
    duration: "38:22",
    date: "Dec 29, 2024",
  },
  {
    id: 3,
    number: 45,
    title: "The Death of Hustle Culture",
    description: "Burnout, breakdowns, and finding a sustainable way to build without destroying yourself.",
    duration: "51:08",
    date: "Dec 22, 2024",
  },
  {
    id: 4,
    number: 44,
    title: "Why Most Apps Fail (And What I'm Doing Different)",
    description: "Lessons from building TeeFeeMe, Inspire OKC, and a dozen failed projects before them.",
    duration: "35:44",
    date: "Dec 15, 2024",
  },
];

const Podcast = () => {
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
              <Headphones className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                TLC Phoenix Podcast
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Raw <span className="okc-gradient-text">Conversations</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Building, living, and figuring it out in public.
            </p>
          </div>

          {/* Featured Episode */}
          <div className="brutal-card p-8 mb-8 bg-gradient-to-br from-primary/10 to-transparent">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="w-32 h-32 bg-primary rounded-sm flex items-center justify-center flex-shrink-0">
                <Headphones className="w-16 h-16 text-primary-foreground" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-primary font-bold uppercase tracking-wide mb-2">
                  Latest Episode
                </p>
                <h2 className="text-2xl font-black uppercase mb-2">
                  Ep. {episodes[0].number}: {episodes[0].title}
                </h2>
                <p className="text-muted-foreground mb-4">{episodes[0].description}</p>
                <div className="flex items-center gap-4">
                  <Button className="brutal-btn font-bold">
                    <Play className="w-4 h-4 mr-2" />
                    Play Episode
                  </Button>
                  <span className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {episodes[0].duration}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* All Episodes */}
          <div className="space-y-4">
            <h3 className="text-xl font-black uppercase mb-4">All Episodes</h3>
            {episodes.slice(1).map((episode) => (
              <div
                key={episode.id}
                className="brutal-card p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <p className="text-sm text-primary font-bold uppercase tracking-wide mb-1">
                      Episode {episode.number}
                    </p>
                    <h4 className="text-lg font-black uppercase mb-2">{episode.title}</h4>
                    <p className="text-muted-foreground text-sm line-clamp-2">{episode.description}</p>
                    <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {episode.duration}
                      </span>
                      <span>{episode.date}</span>
                    </div>
                  </div>
                  <Button size="icon" variant="outline" className="brutal-border flex-shrink-0">
                    <Play className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>

          {/* Subscribe CTA */}
          <div className="brutal-card p-8 mt-12 text-center bg-muted/50">
            <h3 className="text-xl font-black uppercase mb-2">Never Miss an Episode</h3>
            <p className="text-muted-foreground mb-4">Subscribe on your favorite platform.</p>
            <div className="flex flex-wrap justify-center gap-3">
              <Button variant="outline" className="brutal-border font-bold">
                Apple Podcasts
              </Button>
              <Button variant="outline" className="brutal-border font-bold">
                Spotify
              </Button>
              <Button variant="outline" className="brutal-border font-bold">
                YouTube
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Podcast;
