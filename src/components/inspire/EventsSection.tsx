import { useState } from "react";
import { useEvents } from "@/hooks/useEvents";
import { EventCard } from "./EventCard";
import { Loader2 } from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Events", emoji: "🔥" },
  { id: "tech", label: "Tech", emoji: "💻" },
  { id: "music", label: "Music", emoji: "🎵" },
  { id: "art", label: "Art", emoji: "🎨" },
  { id: "sports", label: "Sports", emoji: "🏀" },
  { id: "food", label: "Food", emoji: "🍔" },
  { id: "wellness", label: "Wellness", emoji: "🧘" },
  { id: "business", label: "Business", emoji: "💼" },
];

export const EventsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { events, loading } = useEvents(selectedCategory);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-4">
            What's <span className="okc-gradient-text">Happening</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Real-time events from Eventbrite, Meetup, and the OKC community. Stay inspired.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Events Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        ) : events.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {events.map((event) => (
              <div key={event.id}>
                <EventCard event={event} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">
              No events found. Check back soon!
            </p>
          </div>
        )}
      </div>
    </section>
  );
};
