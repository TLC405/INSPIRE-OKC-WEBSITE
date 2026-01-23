import { Heart, Users, Dumbbell, MapPin, ExternalLink, Calendar, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SocialSpot {
  id: string;
  category: "volunteering" | "singles" | "gym";
  name: string;
  description: string;
  location: string;
  nextEvent?: string;
  url: string;
}

const SOCIAL_SPOTS: SocialSpot[] = [
  {
    id: "v1",
    category: "volunteering",
    name: "Regional Food Bank of Oklahoma",
    description: "Sort and pack food for families in need. Drop-in shifts available.",
    location: "3355 S Purdue Ave, OKC",
    nextEvent: "Daily 9am-12pm",
    url: "#",
  },
  {
    id: "v2",
    category: "volunteering",
    name: "Habitat for Humanity OKC",
    description: "Build homes and hope. No experience needed.",
    location: "Various sites in OKC",
    nextEvent: "Saturdays 8am",
    url: "#",
  },
  {
    id: "s1",
    category: "singles",
    name: "OKC Singles Mixer",
    description: "Monthly meetups at local bars and restaurants. Real connections, no apps.",
    location: "Rotating venues",
    nextEvent: "First Friday each month",
    url: "#",
  },
  {
    id: "s2",
    category: "singles",
    name: "Speed Dating at Stitch",
    description: "Fast, fun, and face-to-face. Meet 10+ singles in one night.",
    location: "Stitch, Automobile Alley",
    nextEvent: "2nd Saturday monthly",
    url: "#",
  },
  {
    id: "g1",
    category: "gym",
    name: "Climb Up OKC",
    description: "Indoor rock climbing for all levels. Great community vibe.",
    location: "7502 N Broadway, OKC",
    url: "#",
  },
  {
    id: "g2",
    category: "gym",
    name: "YMCA of Greater OKC",
    description: "Full facilities, pools, classes. Community-focused fitness.",
    location: "Multiple locations",
    url: "#",
  },
];

const categoryConfig = {
  volunteering: {
    icon: Heart,
    label: "Volunteering",
    color: "text-secondary",
    bg: "bg-secondary",
    border: "border-secondary",
  },
  singles: {
    icon: Users,
    label: "Singles Events",
    color: "text-primary",
    bg: "bg-primary",
    border: "border-primary",
  },
  gym: {
    icon: Dumbbell,
    label: "Gyms & Fitness",
    color: "text-accent",
    bg: "bg-accent",
    border: "border-accent",
  },
};

export const SocialFeed = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute top-0 left-0 w-full h-1 bg-border" />
      
      <div className="container mx-auto px-4 relative">
        {/* Header - Brutal */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-2">
            Get <span className="okc-gradient-text">Involved</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-wider">
            Volunteering, singles events, and fitness spots in OKC
          </p>
        </div>

        {/* Category Sections */}
        {(["volunteering", "singles", "gym"] as const).map((cat) => {
          const config = categoryConfig[cat];
          const Icon = config.icon;
          const spots = SOCIAL_SPOTS.filter((s) => s.category === cat);

          return (
            <div key={cat} className="mb-12 last:mb-0">
              {/* Category Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={cn("w-10 h-10 border-4 border-foreground flex items-center justify-center", config.bg)}>
                  <Icon className="w-5 h-5 text-foreground" />
                </div>
                <h3 className="text-xl font-black uppercase tracking-wide">{config.label}</h3>
              </div>

              {/* Cards - Brutal */}
              <div className="grid md:grid-cols-2 gap-4">
                {spots.map((spot) => (
                  <div
                    key={spot.id}
                    className={cn(
                      "brutal-card group",
                      `border-l-8 ${config.border}`
                    )}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-black uppercase tracking-tight text-foreground group-hover:text-primary transition-colors">
                        {spot.name}
                      </h4>
                      <a
                        href={spot.url}
                        className="w-8 h-8 border-2 border-foreground flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 font-mono">{spot.description}</p>
                    <div className="flex flex-wrap gap-3 text-xs font-mono uppercase tracking-wider">
                      <span className="flex items-center gap-1 px-2 py-1 border-2 border-border">
                        <MapPin className="w-3 h-3 text-primary" />
                        {spot.location}
                      </span>
                      {spot.nextEvent && (
                        <span className="flex items-center gap-1 px-2 py-1 border-2 border-primary bg-primary/10">
                          <Calendar className="w-3 h-3 text-primary" />
                          {spot.nextEvent}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
