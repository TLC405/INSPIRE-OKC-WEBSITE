import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  Brain, 
  Heart, 
  DollarSign, 
  Target,
  MessageCircle,
  Sparkles,
  Clock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const quizzes = [
  {
    id: "attachment",
    icon: Heart,
    title: "Attachment Style",
    description: "Discover how you connect in relationships. Understanding your attachment style is the first step to healthier bonds.",
    duration: "5 min",
    difficulty: "Easy",
    color: "text-pink-500 border-pink-500 bg-pink-500/10",
    questions: 12,
  },
  {
    id: "communication",
    icon: MessageCircle,
    title: "Communication Archetype",
    description: "Are you a director, collaborator, analyzer, or harmonizer? Learn your natural communication style.",
    duration: "4 min",
    difficulty: "Easy",
    color: "text-blue-500 border-blue-500 bg-blue-500/10",
    questions: 10,
  },
  {
    id: "money-mindset",
    icon: DollarSign,
    title: "Money Mindset",
    description: "Uncover your financial psychology. Saver, spender, avoider, or monk? Your relationship with money matters.",
    duration: "6 min",
    difficulty: "Medium",
    color: "text-green-500 border-green-500 bg-green-500/10",
    questions: 15,
  },
  {
    id: "values",
    icon: Target,
    title: "Core Values Finder",
    description: "Identify what truly matters to you. Align your actions with your values for a more fulfilling life.",
    duration: "8 min",
    difficulty: "Medium",
    color: "text-purple-500 border-purple-500 bg-purple-500/10",
    questions: 20,
  },
  {
    id: "strengths",
    icon: Sparkles,
    title: "Strengths Assessment",
    description: "Discover your natural talents and learn how to leverage them in career and relationships.",
    duration: "10 min",
    difficulty: "Deep",
    color: "text-orange-500 border-orange-500 bg-orange-500/10",
    questions: 25,
  },
];

const SelfMastery = () => {
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
              OS_TLC_MASTERY_v1.0
            </span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 border-4 border-accent mb-6">
              <Brain className="w-4 h-4 text-accent" />
              <span className="text-sm font-black text-accent uppercase tracking-widest">
                Self Mastery
              </span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
              KNOW <span className="text-accent">YOURSELF</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Quizzes and assessments to understand your patterns, values, and potential.
              AI-interpreted results for actionable insights.
            </p>
          </div>

          {/* Quizzes Grid */}
          <section className="mb-12">
            <div className="space-y-4">
              {quizzes.map((quiz, index) => {
                const Icon = quiz.icon;
                return (
                  <div
                    key={quiz.id}
                    className={cn(
                      "brutal-card group cursor-pointer animate-fade-in",
                      "hover:translate-x-[-4px] hover:translate-y-[-4px]"
                    )}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                      <div className={cn(
                        "w-16 h-16 flex items-center justify-center border-4 flex-shrink-0",
                        quiz.color
                      )}>
                        <Icon className="w-8 h-8" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <h3 className="text-xl font-black uppercase">{quiz.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {quiz.duration}
                          </div>
                        </div>
                        <p className="text-muted-foreground text-sm mb-3">
                          {quiz.description}
                        </p>
                        <div className="flex items-center gap-4">
                          <span className={cn(
                            "px-2 py-0.5 text-xs font-bold uppercase border-2",
                            quiz.difficulty === "Easy" && "border-green-500 text-green-500",
                            quiz.difficulty === "Medium" && "border-yellow-500 text-yellow-500",
                            quiz.difficulty === "Deep" && "border-purple-500 text-purple-500",
                          )}>
                            {quiz.difficulty}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {quiz.questions} questions
                          </span>
                        </div>
                      </div>
                      
                      <Button className="brutal-btn group-hover:bg-secondary transition-colors flex-shrink-0">
                        Start
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </section>

          {/* AI Interpretation */}
          <section className="mb-12">
            <div className="brutal-card-pink p-8 text-center">
              <Sparkles className="w-12 h-12 text-primary-foreground mx-auto mb-4" />
              <h3 className="text-2xl font-black uppercase mb-3 text-primary-foreground">
                AI-Powered Insights
              </h3>
              <p className="text-primary-foreground/80 max-w-md mx-auto mb-6">
                After completing a quiz, THE ARCHITECT will analyze your results and provide personalized insights and action steps.
              </p>
              <div className="flex justify-center gap-4">
                <div className="px-4 py-2 bg-background/20 border-2 border-primary-foreground/30">
                  <span className="text-primary-foreground font-mono text-xs uppercase">Gemini 3 Flash</span>
                </div>
                <div className="px-4 py-2 bg-background/20 border-2 border-primary-foreground/30">
                  <span className="text-primary-foreground font-mono text-xs uppercase">Real-Time Analysis</span>
                </div>
              </div>
            </div>
          </section>

          {/* Coming Soon */}
          <section>
            <div className="brutal-card text-center p-8 bg-muted/50">
              <h3 className="text-xl font-black uppercase mb-2">More Assessments Coming</h3>
              <p className="text-muted-foreground mb-4">
                Career values, emotional intelligence, conflict style, and more.
              </p>
              <Link to="/apply">
                <Button variant="outline" className="brutal-border font-bold uppercase">
                  Join to Get Early Access
                </Button>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SelfMastery;
