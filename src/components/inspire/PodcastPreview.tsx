import { Link } from "react-router-dom";
import { ArrowRight, Play, Headphones } from "lucide-react";

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
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-2">
              <span className="okc-gradient-text">TLC Phoenix</span> Podcast
            </h2>
            <p className="text-muted-foreground text-lg">
              Conversations on truth, love, and connection
            </p>
          </div>
          <Link to="/podcast">
            <button className="brutal-btn-outline brutal-btn text-sm">
              All Episodes
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Episodes */}
        <div className="space-y-4">
          {FEATURED_EPISODES.map((episode) => (
            <div
              key={episode.id}
              className="bg-card border-2 border-border p-5 flex flex-col md:flex-row gap-4 md:items-center hover:border-primary transition-colors group"
            >
              {/* Play Button */}
              <div className="w-14 h-14 bg-primary flex items-center justify-center border-2 border-foreground shrink-0 group-hover:scale-105 transition-transform">
                <Play className="w-6 h-6 text-primary-foreground fill-current" />
              </div>

              {/* Content */}
              <div className="flex-1">
                <span className="text-xs font-bold uppercase text-muted-foreground tracking-wider">
                  Episode {episode.episodeNumber}
                </span>
                <h3 className="text-lg font-bold mt-1 group-hover:text-primary transition-colors">
                  {episode.title}
                </h3>
                <p className="text-muted-foreground text-sm mt-1 line-clamp-1">
                  {episode.description}
                </p>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Headphones className="w-4 h-4" />
                {episode.duration}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
