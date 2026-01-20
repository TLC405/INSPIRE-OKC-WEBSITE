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
      <header className="border-b-4 border-primary bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-bold uppercase tracking-wide">
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary border-4 border-foreground brutal-shadow-sm mb-6">
              <Heart className="w-4 h-4 text-foreground" fill="currentColor" />
              <span className="text-sm font-black text-foreground uppercase tracking-wide">
                Singles OKC
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Meet in <span className="okc-gradient-text">Real Life</span>
            </h1>
            <p className="text-foreground text-lg max-w-xl mx-auto font-bold">
              No swiping. No DMs. Just real events with real people. Connections unlock after you show up.
            </p>
          </div>

          {/* How It Works */}
          <div className="brutal-card p-8 mb-12 bg-secondary border-secondary">
            <h3 className="text-2xl font-black uppercase mb-8 text-center border-b-4 border-foreground pb-4">
              How It Works
            </h3>
            <div className="grid sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary border-4 border-foreground brutal-shadow-sm flex items-center justify-center mx-auto mb-4">
                  <span className="font-black text-3xl text-foreground">1</span>
                </div>
                <h4 className="font-black uppercase mb-2">Apply</h4>
                <p className="text-foreground text-sm font-bold">Get approved to join the community</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary border-4 border-foreground brutal-shadow-sm flex items-center justify-center mx-auto mb-4">
                  <span className="font-black text-3xl text-foreground">2</span>
                </div>
                <h4 className="font-black uppercase mb-2">Attend</h4>
                <p className="text-foreground text-sm font-bold">Show up to events and meet people</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary border-4 border-foreground brutal-shadow-sm flex items-center justify-center mx-auto mb-4">
                  <span className="font-black text-3xl text-foreground">3</span>
                </div>
                <h4 className="font-black uppercase mb-2">Connect</h4>
                <p className="text-foreground text-sm font-bold">Exchange info with people you vibe with</p>
              </div>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="mb-12">
            <h3 className="text-2xl font-black uppercase mb-8 border-b-4 border-primary pb-4">
              Upcoming Events
            </h3>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <div
                  key={event.id}
                  className="brutal-card p-6 hover:-translate-y-1 transition-all duration-200 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-black uppercase mb-3">{event.title}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-foreground font-bold">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {event.date} • {event.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {event.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {event.spots} spots
                        </span>
                      </div>
                    </div>
                    <Button className="brutal-btn font-black uppercase flex-shrink-0">
                      RSVP
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="brutal-card p-8 text-center bg-primary border-primary">
            <h3 className="text-2xl font-black uppercase mb-3 text-foreground">
              Ready to Meet Your People?
            </h3>
            <p className="text-foreground font-bold mb-6 text-lg">
              Apply to join and get access to all Singles OKC events.
            </p>
            <Link to="/apply">
              <Button className="brutal-btn font-black uppercase bg-foreground text-background hover:bg-foreground/90 border-foreground">
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
