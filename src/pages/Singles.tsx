import { Link } from "react-router-dom";
import { ArrowLeft, Heart, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingEvents = [
  {
    id: 1,
    title: "Coffee & Conversation",
    date: "Jan 18, 2025",
    time: "10:00 AM",
    location: "Clarity Coffee, Midtown",
    spots: 8,
  },
  {
    id: 2,
    title: "Hiking at Lake Hefner",
    date: "Jan 25, 2025",
    time: "9:00 AM",
    location: "Lake Hefner Trails",
    spots: 12,
  },
  {
    id: 3,
    title: "Game Night",
    date: "Feb 1, 2025",
    time: "7:00 PM",
    location: "The Patriarch, Paseo",
    spots: 16,
  },
];

const Singles = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/20 border border-accent/30 rounded-sm mb-6">
              <Heart className="w-4 h-4 text-accent" />
              <span className="text-sm font-bold text-accent uppercase tracking-wide">
                Singles OKC
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Meet in <span className="okc-gradient-text">Real Life</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              No swiping. No DMs. Just real events with real people. Connections unlock after you show up.
            </p>
          </div>

          {/* How It Works */}
          <div className="brutal-card p-8 mb-12 bg-gradient-to-br from-accent/10 to-transparent">
            <h3 className="text-xl font-black uppercase mb-6 text-center">How It Works</h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-black text-accent">1</span>
                </div>
                <h4 className="font-bold mb-1">Apply</h4>
                <p className="text-muted-foreground text-sm">Get approved to join the community</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-black text-accent">2</span>
                </div>
                <h4 className="font-bold mb-1">Attend</h4>
                <p className="text-muted-foreground text-sm">Show up to events and meet people</p>
              </div>
              <div className="text-center">
                <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-3">
                  <span className="font-black text-accent">3</span>
                </div>
                <h4 className="font-bold mb-1">Connect</h4>
                <p className="text-muted-foreground text-sm">Exchange info with people you vibe with</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h3 className="text-xl font-black uppercase mb-6">Upcoming Events</h3>
            <div className="space-y-4">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="brutal-card p-6 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h4 className="text-lg font-black uppercase mb-2">{event.title}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {event.date} • {event.time}
                        </span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {event.spots} spots
                        </span>
                      </div>
                    </div>
                    <Button className="brutal-btn font-bold flex-shrink-0">
                      RSVP
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="brutal-card p-8 text-center bg-muted/50">
            <h3 className="text-xl font-black uppercase mb-2">Ready to Meet Your People?</h3>
            <p className="text-muted-foreground mb-4">
              Apply to join and get access to all Singles OKC events.
            </p>
            <Link to="/apply">
              <Button className="brutal-btn font-bold">
                Apply to Join
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Singles;
