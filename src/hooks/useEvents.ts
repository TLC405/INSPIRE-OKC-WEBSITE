import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  source: "eventbrite" | "meetup" | "community";
  url: string;
  image?: string;
  category: string;
}

const generateFallbackEvents = () => {
  const now = new Date();
  const baseEvents: Event[] = [
    {
      id: "fallback-1",
      title: "OKC Tech Meetup: AI & Machine Learning",
      description: "Developers and enthusiasts share demos and network.",
      date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "6:30 PM",
      location: "Starspace46, Automobile Alley",
      source: "meetup",
      url: "#",
      category: "Tech",
    },
    {
      id: "fallback-2",
      title: "First Friday Art Walk",
      description: "Explore galleries and street art in the Paseo Arts District.",
      date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "6:00 PM",
      location: "Paseo Arts District",
      source: "community",
      url: "#",
      category: "Art",
    },
    {
      id: "fallback-3",
      title: "OKC Thunder vs Dallas Mavericks",
      description: "Catch the Thunder take on their divisional rivals.",
      date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "7:00 PM",
      location: "Paycom Center",
      source: "eventbrite",
      url: "#",
      category: "Sports",
    },
    {
      id: "fallback-4",
      title: "Yoga in the Park - Scissortail",
      description: "Free community yoga session. All levels welcome.",
      date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "8:00 AM",
      location: "Scissortail Park",
      source: "community",
      url: "#",
      category: "Wellness",
    },
  ];

  return baseEvents;
};

export const useEvents = (category: string = "all") => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const { data, error: fetchError } = await supabase.functions.invoke("okc-events", {
          body: { category },
        });

        if (fetchError) {
          throw new Error(fetchError.message);
        }

        const received = data?.events || [];
        const filtered =
          category === "all"
            ? received
            : received.filter((event: Event) => event.category.toLowerCase() === category.toLowerCase());

        // If API returns nothing, fall back to locally generated events so the UI stays populated
        const fallback = category === "all"
          ? generateFallbackEvents()
          : generateFallbackEvents().filter((event) => event.category.toLowerCase() === category.toLowerCase());

        setEvents(filtered.length > 0 ? filtered : fallback);
        setError(null);
      } catch (err) {
        console.error("Events fetch error:", err);
        const fallback = category === "all"
          ? generateFallbackEvents()
          : generateFallbackEvents().filter((event) => event.category.toLowerCase() === category.toLowerCase());
        setError("Failed to load events");
        // Preserve any currently shown events; otherwise show fallback data so content doesn't disappear
        setEvents((current) => current.length > 0 ? current : fallback);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  return { events, loading, error };
};
