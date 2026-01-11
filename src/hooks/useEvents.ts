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

        setEvents(data.events || []);
        setError(null);
      } catch (err) {
        console.error("Events fetch error:", err);
        setError("Failed to load events");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [category]);

  return { events, loading, error };
};
