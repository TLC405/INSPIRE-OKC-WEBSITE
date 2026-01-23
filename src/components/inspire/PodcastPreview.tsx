import { Link } from "react-router-dom";
import { ArrowRight, Play, Headphones, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

const FEATURED_EPISODES = [
  {
    id: "1",
    title: "What Does Community Actually Mean?",
    description: "We break down what real community looks like in 2025 and why apps alone can't build it.",
    duration: "45 min",
    episodeNumber: 12,
  },
  {
    id: "2",
    title: "Building in Public: The Honest Version",
    description: "The wins, the fails, and what nobody tells you about building something from scratch.",
    duration: "38 min",
    episodeNumber: 11,
  },
  {
    id: "3",
    title: "OKC's Hidden Gems: Places Only Locals Know",
    description: "A tour of Oklahoma City's best-kept secrets—from food to art to late-night spots.",
    duration: "52 min",
    episodeNumber: 10,
  },
];

export const PodcastPreview = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 w-full h-1 bg-border" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header - Brutal */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 border-2 border-primary text-primary font-mono text-xs uppercase tracking-widest mb-4">
              <Headphones className="w-3 h-3" />
              Podcast
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-2">
              <span className="okc-gradient-text">TLC Phoenix</span>
            </h2>
            <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
              Conversations on truth, love, and connection
            </p>
          </div>
          <Link to="/podcast">
            <button className="brutal-btn-outline brutal-btn text-sm group">
              All Episodes
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </Link>
        </div>

        {/* Episodes - Brutal cards */}
        <div className="space-y-4">
          {FEATURED_EPISODES.map((episode, index) => (
            <div
              key={episode.id}
              className={cn(
                "brutal-card flex flex-col md:flex-row gap-4 md:items-center group",
                "animate-fade-in-once"
              )}
              style={{ 
                animationDelay: `${index * 0.1}s`,
                animationFillMode: 'forwards'
              }}
            >
              {/* Play Button */}
              <div className="w-16 h-16 bg-primary flex items-center justify-center border-4 border-foreground shrink-0 group-hover:scale-105 transition-transform relative">
                <Play className="w-7 h-7 text-primary-foreground fill-current" />
                {/* Pulse ring on hover */}
                <div className="absolute inset-0 border-4 border-primary opacity-0 group-hover:opacity-100 group-hover:animate-pulse-ring" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 bg-muted border-2 border-border text-xs font-black uppercase tracking-wider">
                    EP_{episode.episodeNumber.toString().padStart(2, '0')}
                  </span>
                  {index === 0 && (
                    <span className="px-2 py-0.5 bg-secondary text-secondary-foreground border-2 border-foreground text-xs font-black uppercase">
                      <Zap className="w-3 h-3 inline mr-1" />
                      Latest
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight group-hover:text-primary transition-colors">
                  {episode.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-1 font-mono">
                  {episode.description}
                </p>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 px-4 py-2 border-2 border-border text-sm font-mono uppercase">
                <Headphones className="w-4 h-4 text-primary" />
                {episode.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
