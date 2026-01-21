import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Briefcase, 
  DollarSign, 
  Target, 
  BookOpen,
  TrendingUp,
  CheckSquare,
  FileText,
  Home,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const modules = [
  {
    id: "money",
    icon: DollarSign,
    title: "Money Mastery",
    description: "Budgeting, saving, investing, debt payoff strategies.",
    color: "bg-green-500/10 border-green-500 text-green-500",
    topics: ["50/30/20 Budget", "Emergency Fund", "Index Investing 101", "Debt Snowball"],
    postCount: 12,
  },
  {
    id: "career",
    icon: Briefcase,
    title: "Career Architecture",
    description: "Resume building, salary negotiation, career pivots.",
    color: "bg-blue-500/10 border-blue-500 text-blue-500",
    topics: ["Resume Templates", "Interview Prep", "Negotiation Scripts", "LinkedIn Strategy"],
    postCount: 8,
  },
  {
    id: "habits",
    icon: Target,
    title: "Habit Engineering",
    description: "Systems for consistency, habit stacking, accountability.",
    color: "bg-purple-500/10 border-purple-500 text-purple-500",
    topics: ["Habit Stacking", "Streak Tracking", "Morning Routines", "Accountability"],
    postCount: 10,
  },
  {
    id: "life-admin",
    icon: FileText,
    title: "Life Admin",
    description: "Taxes, insurance, apartment hunting, adult stuff.",
    color: "bg-orange-500/10 border-orange-500 text-orange-500",
    topics: ["Tax Basics", "Renter's Insurance", "First Apartment", "Healthcare 101"],
    postCount: 15,
  },
];

const quickWins = [
  { title: "Set up auto-save for $50/month", category: "Money" },
  { title: "Update your LinkedIn headline", category: "Career" },
  { title: "Create a morning routine (5 min)", category: "Habits" },
  { title: "Schedule your annual checkup", category: "Life" },
];

const Adulting = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b-4 border-foreground sticky top-0 z-40 bg-background">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="font-mono text-xs uppercase tracking-wider">Back</span>
            </Link>
            <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
              OS_TLC_ADULTING_v2.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 border-4 border-secondary mb-6">
              <TrendingUp className="w-4 h-4 text-secondary" />
              <span className="text-sm font-black text-secondary uppercase tracking-widest">
                Adulting OKC
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              FIGURE OUT <span className="text-secondary">LIFE</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Money, careers, habits, and life systems. The skills they never taught you in school.
            </p>
          </div>

          {/* Quick Wins */}
          <section className="mb-12">
            <div className="brutal-card bg-primary/5 border-primary">
              <h2 className="text-xl font-black uppercase tracking-tight mb-4 flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-primary" />
                Quick Wins This Week
              </h2>
              <div className="grid sm:grid-cols-2 gap-3">
                {quickWins.map((win, i) => (
                  <div 
                    key={i}
                    className="flex items-center gap-3 p-3 bg-background border-2 border-border hover:border-primary transition-colors cursor-pointer"
                  >
                    <div className="w-6 h-6 border-2 border-foreground flex-shrink-0" />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{win.title}</p>
                      <span className="text-xs text-muted-foreground uppercase">{win.category}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Modules Grid */}
          <section className="mb-12">
            <h2 className="text-2xl font-black uppercase tracking-tight mb-6 flex items-center gap-3">
              <BookOpen className="w-6 h-6 text-primary" />
              Life Modules
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {modules.map((module, index) => {
                const Icon = module.icon;
                return (
                  <div
                    key={module.id}
                    className={cn(
                      "brutal-card group cursor-pointer animate-fade-in",
                      "hover:translate-x-[-4px] hover:translate-y-[-4px]"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <div className={cn(
                        "w-14 h-14 flex items-center justify-center border-4 flex-shrink-0",
                        module.color
                      )}>
                        <Icon className="w-7 h-7" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-xl font-black uppercase">{module.title}</h3>
                          <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                        </div>
                        <p className="text-muted-foreground text-sm">{module.description}</p>
                      </div>
                    </div>
                    
                    {/* Topics */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {module.topics.map((topic) => (
                        <span
                          key={topic}
                          className="px-2 py-1 text-xs font-bold uppercase bg-muted border border-border"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-border">
                      <span className="text-xs font-bold uppercase text-primary">
                        {module.postCount} Resources
                      </span>
                      <span className="text-xs text-muted-foreground uppercase">
                        Free Access
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* First Apartment */}
          <section className="mb-12">
            <div className="brutal-card-red p-8">
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className="w-20 h-20 bg-background flex items-center justify-center border-4 border-foreground flex-shrink-0">
                  <Home className="w-10 h-10 text-secondary" />
                </div>
                <div className="flex-1 text-center md:text-left">
                  <h3 className="text-2xl font-black uppercase mb-2 text-secondary-foreground">
                    First Apartment Guide
                  </h3>
                  <p className="text-secondary-foreground/80 mb-0 md:mb-0">
                    Complete checklist for getting your first place in OKC. Neighborhoods, costs, what to avoid.
                  </p>
                </div>
                <Button className="brutal-btn bg-background text-foreground hover:bg-background/90 flex-shrink-0">
                  Coming Soon
                </Button>
              </div>
            </div>
          </section>

          {/* CTA */}
          <section>
            <div className="brutal-card text-center p-8">
              <h3 className="text-2xl font-black uppercase mb-3">
                Want Personalized Advice?
              </h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                Ask THE ARCHITECT for help with money, career, or life decisions. AI-powered guidance available 24/7.
              </p>
              <p className="text-sm text-primary font-bold uppercase mb-4">
                Click the chat bubble in the corner →
              </p>
              <Link to="/apply">
                <Button variant="outline" className="brutal-border font-bold uppercase">
                  Or Apply to Join the Community
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Adulting;
