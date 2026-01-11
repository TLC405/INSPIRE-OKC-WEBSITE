import { Link } from "react-router-dom";
import { BookOpen, Headphones, Rocket } from "lucide-react";

const startCards = [
  {
    icon: BookOpen,
    title: "My Story",
    description: "Why I built this. The losses, the lessons, and the vision.",
    href: "/story",
    color: "from-primary to-primary/70",
  },
  {
    icon: Headphones,
    title: "Listen",
    description: "TLC Phoenix Podcast. Raw conversations about building and living.",
    href: "/podcast",
    color: "from-secondary to-secondary/70",
  },
  {
    icon: Rocket,
    title: "Build With Me",
    description: "Apps, tools, and projects I've created. Use them. Fork them.",
    href: "/apps",
    color: "from-accent to-accent/70",
  },
];

export const StartHereSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Start <span className="okc-gradient-text">Here</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Three paths into my world. Pick one.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {startCards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.title}
                to={card.href}
                className="group brutal-card p-8 hover:-translate-y-2 transition-all duration-300"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${card.color} rounded-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-8 h-8 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-xl font-black uppercase mb-2">{card.title}</h3>
                <p className="text-muted-foreground">{card.description}</p>

                {/* Arrow */}
                <div className="mt-4 text-primary font-bold text-sm uppercase tracking-wide group-hover:translate-x-2 transition-transform">
                  Explore →
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
