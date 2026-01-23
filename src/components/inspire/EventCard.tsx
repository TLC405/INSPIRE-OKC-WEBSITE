import { Calendar, MapPin, ExternalLink, Users } from "lucide-react";
import type { Event } from "@/hooks/useEvents";
import { cn } from "@/lib/utils";

interface EventCardProps {
  event: Event;
}

const sourceColors: Record<string, string> = {
  eventbrite: "bg-[hsl(16_100%_50%)]",
  meetup: "bg-[hsl(0_79%_58%)]",
  community: "bg-primary",
};

const categoryEmojis: Record<string, string> = {
  Tech: "💻",
  Art: "🎨",
  Sports: "🏀",
  Wellness: "🧘",
  Business: "💼",
  Music: "🎵",
  Food: "🍔",
  Community: "🤝",
};

export const EventCard = ({ event }: EventCardProps) => {
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="brutal-card group card-3d hover:translate-x-[-4px] hover:translate-y-[-4px]">
      {/* Noise texture */}
      <div className="absolute inset-0 noise opacity-30 pointer-events-none" />
      
      {/* Top row - Category & Source */}
      <div className="relative flex justify-between items-start mb-4">
        <span className="text-3xl group-hover:animate-bounce-subtle">{categoryEmojis[event.category] || "📅"}</span>
        <span
          className={cn(
            "text-[10px] font-black uppercase tracking-wider px-2 py-1 border-2 border-foreground text-white",
            sourceColors[event.source]
          )}
        >
          {event.source}
        </span>
      </div>

      {/* Title */}
      <h3 className="relative font-black text-foreground text-lg leading-tight mb-2 uppercase tracking-tight group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      {/* Description */}
      <p className="relative text-muted-foreground text-sm mb-4 line-clamp-2 font-mono">
        {event.description}
      </p>

      {/* Meta info */}
      <div className="relative space-y-2 text-sm font-mono">
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-6 h-6 border-2 border-primary flex items-center justify-center">
            <Calendar className="w-3 h-3 text-primary" />
          </div>
          <span className="uppercase text-xs tracking-wider">
            {formatDate(event.date)} · {event.time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <div className="w-6 h-6 border-2 border-secondary flex items-center justify-center">
            <MapPin className="w-3 h-3 text-secondary" />
          </div>
          <span className="truncate uppercase text-xs tracking-wider">{event.location}</span>
        </div>
      </div>

      {/* Capacity indicator (mock) */}
      <div className="relative mt-4 pt-4 border-t-2 border-border">
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center gap-1 text-muted-foreground font-mono uppercase">
            <Users className="w-3 h-3" />
            <span>Spots left</span>
          </div>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((i) => (
              <div 
                key={i} 
                className={cn(
                  "w-3 h-3 border border-foreground",
                  i <= 3 ? "bg-primary" : "bg-muted"
                )}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Hover action */}
      <div className="relative mt-4 opacity-0 group-hover:opacity-100 transition-all duration-200 translate-y-2 group-hover:translate-y-0">
        <a
          href={event.url}
          target="_blank"
          rel="noopener noreferrer"
          className="brutal-btn text-xs w-full"
        >
          Learn More
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
};
