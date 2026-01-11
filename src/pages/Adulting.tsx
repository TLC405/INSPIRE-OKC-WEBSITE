import { Link } from "react-router-dom";
import { ArrowLeft, Briefcase, DollarSign, Target, BookOpen } from "lucide-react";

const topics = [
  {
    icon: DollarSign,
    title: "Money Management",
    description: "Budgeting, saving, investing. The basics nobody taught you.",
    postCount: 12,
  },
  {
    icon: Briefcase,
    title: "Career Growth",
    description: "Navigating jobs, promotions, and career pivots.",
    postCount: 8,
  },
  {
    icon: Target,
    title: "Goal Setting",
    description: "Systems and strategies for actually achieving things.",
    postCount: 6,
  },
  {
    icon: BookOpen,
    title: "Life Skills",
    description: "Cooking, taxes, insurance—all the adulting essentials.",
    postCount: 15,
  },
];

const Adulting = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/20 border border-secondary/30 rounded-sm mb-6">
              <Briefcase className="w-4 h-4 text-secondary" />
              <span className="text-sm font-bold text-secondary uppercase tracking-wide">
                Adulting OKC
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Figure Out <span className="okc-gradient-text">Life</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Money, careers, and life systems. The skills they didn't teach you in school.
            </p>
          </div>

          {/* Topics Grid */}
          <div className="grid sm:grid-cols-2 gap-6 mb-12">
            {topics.map((topic, index) => {
              const Icon = topic.icon;
              return (
                <div
                  key={topic.title}
                  className="brutal-card p-6 hover:-translate-y-1 transition-all duration-300 cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-sm flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="text-lg font-black uppercase mb-1">{topic.title}</h3>
                      <p className="text-muted-foreground text-sm mb-2">{topic.description}</p>
                      <span className="text-xs text-secondary font-bold uppercase">
                        {topic.postCount} posts
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Coming Soon */}
          <div className="brutal-card p-8 text-center bg-muted/50">
            <h3 className="text-xl font-black uppercase mb-2">Content Coming Soon</h3>
            <p className="text-muted-foreground mb-4">
              We're building out the Adulting OKC library. Join to get notified when new posts drop.
            </p>
            <Link to="/apply">
              <button className="brutal-btn px-6 py-3 font-bold">
                Apply to Join
              </button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Adulting;
