import { Link } from "react-router-dom";
import { ArrowLeft, Dumbbell, MapPin, Users, Target } from "lucide-react";
import { Button } from "@/components/ui/button";

const gyms = [
  {
    id: 1,
    name: "YMCA Downtown",
    type: "Full Gym",
    location: "Downtown OKC",
    vibe: "Community-focused, all fitness levels",
  },
  {
    id: 2,
    name: "Flex Fitness",
    type: "24/7 Gym",
    location: "Midtown",
    vibe: "Serious lifting, late night friendly",
  },
  {
    id: 3,
    name: "CrossFit OKC",
    type: "CrossFit Box",
    location: "Paseo",
    vibe: "High intensity, strong community",
  },
];

const programs = [
  {
    title: "30-Day Consistency Challenge",
    description: "Build the habit. 30 days of showing up, no matter what.",
    duration: "30 days",
    difficulty: "Beginner",
  },
  {
    title: "Strength Foundations",
    description: "Master the big lifts. Squat, bench, deadlift, overhead press.",
    duration: "8 weeks",
    difficulty: "Beginner-Intermediate",
  },
  {
    title: "5K Training Plan",
    description: "From couch to 5K. Run your first race in OKC.",
    duration: "6 weeks",
    difficulty: "Beginner",
  },
];

const Workout = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-muted border border-border rounded-sm mb-6">
              <Dumbbell className="w-4 h-4 text-foreground" />
              <span className="text-sm font-bold text-foreground uppercase tracking-wide">
                Workout OKC
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Get <span className="okc-gradient-text">Consistent</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Training plans, local gyms, and accountability. Find your people, stay consistent.
            </p>
          </div>

          {/* Programs */}
          <div className="mb-12">
            <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Training Programs
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              {programs.map((program, index) => (
                <div
                  key={program.title}
                  className="brutal-card p-6 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <h4 className="font-black uppercase mb-2">{program.title}</h4>
                  <p className="text-muted-foreground text-sm mb-4">{program.description}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{program.duration}</span>
                    <span>{program.difficulty}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Local Gyms */}
          <div className="mb-12">
            <h3 className="text-xl font-black uppercase mb-6 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-primary" />
              Local Gyms
            </h3>
            <div className="space-y-4">
              {gyms.map((gym, index) => (
                <div
                  key={gym.id}
                  className="brutal-card p-6 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col sm:flex-row justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="text-lg font-black uppercase">{gym.name}</h4>
                        <span className="text-xs bg-muted px-2 py-1 rounded font-bold uppercase">
                          {gym.type}
                        </span>
                      </div>
                      <p className="text-muted-foreground text-sm">
                        <span className="font-bold">{gym.location}</span> • {gym.vibe}
                      </p>
                    </div>
                    <Button variant="outline" className="brutal-border font-bold flex-shrink-0">
                      View Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Find a Buddy */}
          <div className="brutal-card p-8 text-center bg-gradient-to-br from-primary/10 to-transparent">
            <Users className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-black uppercase mb-2">Find a Workout Buddy</h3>
            <p className="text-muted-foreground mb-4">
              Connect with community members who train at the same gym or have similar fitness goals.
            </p>
            <Link to="/apply">
              <Button className="brutal-btn font-bold">
                Join the Community
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Workout;
