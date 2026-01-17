import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface Event {
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

// Mock events for Oklahoma City - In production, these would come from real APIs
// Note: Eventbrite, Meetup APIs require paid access for full functionality
const generateMockEvents = (): Event[] => {
  const now = new Date();
  const events: Event[] = [
    {
      id: "ev-1",
      title: "OKC Tech Meetup: AI & Machine Learning",
      description: "Join fellow developers and tech enthusiasts for a night of AI demos and networking.",
      date: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "6:30 PM",
      location: "Starspace46, Automobile Alley",
      source: "meetup",
      url: "#",
      category: "Tech",
    },
    {
      id: "ev-2",
      title: "First Friday Art Walk",
      description: "Explore galleries and street art in the Paseo Arts District with live music and food trucks.",
      date: new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "6:00 PM",
      location: "Paseo Arts District",
      source: "community",
      url: "#",
      category: "Art",
    },
    {
      id: "ev-3",
      title: "OKC Thunder vs Dallas Mavericks",
      description: "Catch the Thunder take on their divisional rivals at the Paycom Center.",
      date: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "7:00 PM",
      location: "Paycom Center",
      source: "eventbrite",
      url: "#",
      category: "Sports",
    },
    {
      id: "ev-4",
      title: "Yoga in the Park - Scissortail",
      description: "Free community yoga session at Scissortail Park. All levels welcome!",
      date: new Date(now.getTime() + 1 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "8:00 AM",
      location: "Scissortail Park",
      source: "community",
      url: "#",
      category: "Wellness",
    },
    {
      id: "ev-5",
      title: "Entrepreneur Coffee & Connect",
      description: "Weekly networking for OKC founders, startups, and small business owners.",
      date: new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "7:30 AM",
      location: "Clarity Coffee, Film Row",
      source: "meetup",
      url: "#",
      category: "Business",
    },
    {
      id: "ev-6",
      title: "Live Jazz Night at Tower Theatre",
      description: "An evening of classic jazz and modern fusion with local and touring artists.",
      date: new Date(now.getTime() + 6 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "8:00 PM",
      location: "Tower Theatre, Uptown 23rd",
      source: "eventbrite",
      url: "#",
      category: "Music",
    },
    {
      id: "ev-7",
      title: "OKC Food Truck Festival",
      description: "Over 30 food trucks, live bands, and family fun at the Farmers Market District.",
      date: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "11:00 AM",
      location: "OKC Farmers Market",
      source: "eventbrite",
      url: "#",
      category: "Food",
    },
    {
      id: "ev-8",
      title: "Oklahoma City Memorial Run",
      description: "Annual 5K/10K honoring victims of the 1995 bombing. Proceeds support the Memorial.",
      date: new Date(now.getTime() + 10 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      time: "7:00 AM",
      location: "Oklahoma City National Memorial",
      source: "community",
      url: "#",
      category: "Community",
    },
  ];

  return events;
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    let category: string | null = null;
    let limit = 10;

    // Handle both GET query params and POST body
    if (req.method === "POST") {
      try {
        const body = await req.json();
        category = body.category || null;
        limit = body.limit || 10;
      } catch {
        // Body parsing failed, continue with defaults
      }
    } else {
      const url = new URL(req.url);
      category = url.searchParams.get("category");
      limit = parseInt(url.searchParams.get("limit") || "10");
    }

    let events = generateMockEvents();

    // Filter by category if specified
    if (category && category !== "all") {
      events = events.filter((e) => e.category.toLowerCase() === category!.toLowerCase());
    }

    // Limit results
    events = events.slice(0, limit);

    console.log(`Returning ${events.length} events for category: ${category || 'all'}`);

    return new Response(JSON.stringify({ events, total: events.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Events fetch error:", error);
    return new Response(
      JSON.stringify({ error: "Failed to fetch events", events: [] }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
