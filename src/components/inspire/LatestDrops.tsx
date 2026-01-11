import { Link } from "react-router-dom";
import { FileText, Headphones, Rocket, Presentation } from "lucide-react";

// Mock data - will be replaced with real data from Supabase
const latestDrops = [
  {
    type: "post",
    icon: FileText,
    label: "Latest Post",
    title: "Why I Chose to Build After Loss",
    date: "Jan 8, 2025",
    href: "/story",
  },
  {
    type: "podcast",
    icon: Headphones,
    label: "Latest Episode",
    title: "TLC Phoenix Ep. 47: Starting Over at 30",
    date: "Jan 5, 2025",
    href: "/podcast",
  },
  {
    type: "app",
    icon: Rocket,
    label: "Latest App",
    title: "TeeFeeMe-5000 v2.0 Released",
    date: "Jan 3, 2025",
    href: "/apps",
  },
  {
    type: "slides",
    icon: Presentation,
    label: "Latest Deck",
    title: "Building Community in the AI Era",
    date: "Dec 28, 2024",
    href: "/slides",
  },
];

export const LatestDrops = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-2">
              Latest <span className="okc-gradient-text">Drops</span>
            </h2>
            <p className="text-muted-foreground">
              Fresh content from the lab
            </p>
          </div>
        </div>

        {/* Drops Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {latestDrops.map((drop, index) => {
            const Icon = drop.icon;
            return (
              <Link
                key={drop.title}
                to={drop.href}
                className="group brutal-card p-5 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Header */}
                <div className="flex items-center gap-2 mb-3">
                  <Icon className="w-4 h-4 text-primary" />
                  <span className="text-xs font-bold uppercase text-primary tracking-wide">
                    {drop.label}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-bold text-foreground mb-2 group-hover:text-primary transition-colors line-clamp-2">
                  {drop.title}
                </h3>

                {/* Date */}
                <p className="text-xs text-muted-foreground">{drop.date}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
