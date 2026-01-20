import { Link } from "react-router-dom";
import { ArrowLeft, Dumbbell, Calendar, MapPin, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const upcomingWorkouts = [
  {
    id: 1,
    title: "Morning Park Workout",
    date: "Jan 20, 2025",
    time: "7:00 AM",
    location: "Myriad Gardens",
    spots: 15,
  },
  {
    id: 2,
    title: "Strength Training Session",
    date: "Jan 22, 2025",
    time: "6:00 PM",
    location: "Wheeler Park",
    spots: 12,
  },
  {
    id: 3,
    title: "Weekend Bootcamp",
    date: "Jan 27, 2025",
    time: "8:00 AM",
    location: "Lake Hefner",
    spots: 20,
  },
];

const Calisthenics = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-foreground bg-card">
        <div className="container mx-auto px-6 py-5 flex items-center justify-between">
          <Link to="/" className="inline-flex items-center gap-2 text-foreground hover:text-primary transition-colors font-bold uppercase text-sm">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-xs font-bold uppercase tracking-wider">
            By <span className="tlc-gradient-text">TLC</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary border-2 border-foreground mb-6"
              style={{ boxShadow: '4px 4px 0 hsl(var(--foreground))' }}
            >
              <Dumbbell className="w-5 h-5 text-foreground" />
              <span className="text-sm font-black text-foreground uppercase tracking-wide">
                Calisthenics OKC
              </span>
            </div>
            <h1 className="text-5xl md:text-6xl font-black uppercase tracking-tight mb-4">
              Train <span className="text-primary">Together</span>
            </h1>
            <p className="text-foreground text-lg max-w-xl mx-auto font-bold">
              Free outdoor workouts. All skill levels welcome. Build strength and community.
            </p>
          </div>

          {/* How It Works */}
          <div className="border-4 border-foreground p-8 mb-16 bg-card"
            style={{ boxShadow: '6px 6px 0 hsl(var(--foreground))' }}
          >
            <h3 className="text-2xl font-black uppercase mb-8 text-center pb-4 border-b-2 border-foreground">
              How It Works
            </h3>
            <div className="grid sm:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-14 h-14 bg-primary border-2 border-foreground flex items-center justify-center mx-auto mb-4"
                  style={{ boxShadow: '4px 4px 0 hsl(var(--foreground))' }}
                >
                  <span className="font-black text-2xl text-foreground">1</span>
                </div>
                <h4 className="font-black uppercase mb-2">Show Up</h4>
                <p className="text-muted-foreground text-sm font-medium">Find a session and join us</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary border-2 border-foreground flex items-center justify-center mx-auto mb-4"
                  style={{ boxShadow: '4px 4px 0 hsl(var(--foreground))' }}
                >
                  <span className="font-black text-2xl text-foreground">2</span>
                </div>
                <h4 className="font-black uppercase mb-2">Train</h4>
                <p className="text-muted-foreground text-sm font-medium">Work out at your own pace</p>
              </div>
              <div className="text-center">
                <div className="w-14 h-14 bg-primary border-2 border-foreground flex items-center justify-center mx-auto mb-4"
                  style={{ boxShadow: '4px 4px 0 hsl(var(--foreground))' }}
                >
                  <span className="font-black text-2xl text-foreground">3</span>
                </div>
                <h4 className="font-black uppercase mb-2">Connect</h4>
                <p className="text-muted-foreground text-sm font-medium">Meet like-minded people</p>
              </div>
            </div>
          </div>

          {/* Upcoming Workouts */}
          <div className="mb-16">
            <h3 className="text-2xl font-black uppercase mb-8 pb-4 border-b-2 border-primary">
              Upcoming Workouts
            </h3>
            <div className="space-y-4">
              {upcomingWorkouts.map((workout) => (
                <div
                  key={workout.id}
                  className="border-2 border-foreground p-6 hover:-translate-y-1 transition-all duration-200 bg-card"
                  style={{ boxShadow: '4px 4px 0 hsl(var(--foreground))' }}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <h4 className="text-xl font-black uppercase mb-3">{workout.title}</h4>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground font-bold">
                        <span className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-primary" />
                          {workout.date} • {workout.time}
                        </span>
                        <span className="flex items-center gap-2">
                          <MapPin className="w-4 h-4 text-primary" />
                          {workout.location}
                        </span>
                        <span className="flex items-center gap-2">
                          <Users className="w-4 h-4 text-primary" />
                          {workout.spots} spots
                        </span>
                      </div>
                    </div>
                    <Button className="border-2 border-foreground bg-primary text-foreground font-black uppercase hover:bg-foreground hover:text-background transition-colors flex-shrink-0">
                      Join
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="border-4 border-foreground p-8 text-center bg-primary"
            style={{ boxShadow: '8px 8px 0 hsl(var(--foreground))' }}
          >
            <h3 className="text-2xl font-black uppercase mb-3 text-foreground">
              Ready to Train?
            </h3>
            <p className="text-foreground font-bold mb-6 text-lg">
              No equipment needed. Just show up and get strong with us.
            </p>
            <Link to="/apply">
              <Button className="border-2 border-foreground bg-foreground text-background font-black uppercase hover:bg-background hover:text-foreground transition-colors">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Calisthenics;
