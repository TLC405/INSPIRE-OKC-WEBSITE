import { Calendar, MapPin, ExternalLink } from "lucide-react";
import type { Event } from "@/hooks/useEvents";

interface EventCardProps {
  event: Event;
}

const sourceColors: Record<string, string> = {
  eventbrite: "bg-[hsl(16_100%_50%)] text-white",
  meetup: "bg-[hsl(0_79%_58%)] text-white",
  community: "bg-primary text-primary-foreground",
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
    <div className="event-card group">
      {/* Top row - Category & Source */}
      <div className="flex justify-between items-start mb-3">
        <span className="text-2xl">{categoryEmojis[event.category] || "📅"}</span>
        <span
          className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 ${
            sourceColors[event.source]
          }`}
        >
          {event.source}
        </span>
      </div>

      {/* Title */}
      <h3 className="font-bold text-foreground text-lg leading-tight mb-2 group-hover:text-primary transition-colors">
        {event.title}
      </h3>

      {/* Description */}
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {event.description}
      </p>

      {/* Meta info */}
      <div className="space-y-2 text-sm">
        <div className="flex items-center gap-2 text-muted-foreground">
          <Calendar className="w-4 h-4 text-primary" />
          <span>
            {formatDate(event.date)} · {event.time}
          </span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <MapPin className="w-4 h-4 text-secondary" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      {/* Hover action */}
      <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
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
