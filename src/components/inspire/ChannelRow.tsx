import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Briefcase, Heart, Dumbbell } from "lucide-react";

const channels = [
  {
    name: "Inspire OKC",
    tagline: "Volunteer-powered community + events.",
    description: "Join a network of people who show up for each other and the city.",
    icon: Users,
    href: "/community",
    action: "Apply",
    color: "bg-primary",
  },
  {
    name: "Adulting OKC",
    tagline: "Money, careers, life systems, confidence.",
    description: "Learn the skills they didn't teach you in school.",
    icon: Briefcase,
    href: "/adulting",
    action: "Read Posts",
    color: "bg-secondary",
  },
  {
    name: "Singles OKC",
    tagline: "Meet in real life first.",
    description: "Connections unlock after you attend events. No swiping.",
    icon: Heart,
    href: "/singles",
    action: "See Events",
    color: "bg-accent",
  },
  {
    name: "Workout OKC",
    tagline: "Training plans, challenges, consistency.",
    description: "Find gyms, workout buddies, and programs that stick.",
    icon: Dumbbell,
    href: "/workout",
    action: "Start Program",
    color: "bg-muted",
  },
];

export const ChannelRow = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
            Choose Your <span className="okc-gradient-text">Channel</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-xl mx-auto">
            Four communities. One mission. Real connections.
          </p>
        </div>

        {/* Channel Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {channels.map((channel, index) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.name}
                className="brutal-card p-6 flex flex-col h-full animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-12 h-12 ${channel.color} rounded-sm flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-primary-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-black uppercase mb-1">{channel.name}</h3>
                <p className="text-primary font-bold text-sm mb-2">{channel.tagline}</p>
                <p className="text-muted-foreground text-sm flex-1">{channel.description}</p>

                {/* Action */}
                <Link to={channel.href} className="mt-4">
                  <Button className="w-full brutal-btn font-bold">
                    {channel.action}
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
