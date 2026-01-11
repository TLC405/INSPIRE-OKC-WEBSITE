import { Link } from "react-router-dom";
import { ArrowLeft, Presentation, Download, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

// Mock data - will be replaced with Supabase data
const slides = [
  {
    id: 1,
    title: "Building Community in the AI Era",
    description: "How to create authentic connections when algorithms rule our attention.",
    date: "Dec 28, 2024",
    slides: 24,
  },
  {
    id: 2,
    title: "From Grief to Purpose",
    description: "A visual journey through loss, rebuilding, and finding meaning.",
    date: "Nov 15, 2024",
    slides: 18,
  },
  {
    id: 3,
    title: "The Inspire OKC Vision",
    description: "Pitch deck for building volunteer-powered community in Oklahoma City.",
    date: "Oct 30, 2024",
    slides: 32,
  },
  {
    id: 4,
    title: "AI Product Development 101",
    description: "Lessons learned building TeeFeeMe-5000 and other AI-powered apps.",
    date: "Sep 22, 2024",
    slides: 28,
  },
];

const Slides = () => {
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm mb-6">
              <Presentation className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                Slide Decks
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Presentations & <span className="okc-gradient-text">Decks</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              View and download my slide presentations.
            </p>
          </div>

          {/* Slides Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {slides.map((deck, index) => (
              <div
                key={deck.id}
                className="brutal-card p-6 hover:-translate-y-1 transition-all duration-300 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Thumbnail Placeholder */}
                <div className="aspect-video bg-muted rounded-sm flex items-center justify-center mb-4">
                  <Presentation className="w-12 h-12 text-muted-foreground" />
                </div>

                {/* Content */}
                <h3 className="text-lg font-black uppercase mb-2">{deck.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{deck.description}</p>

                {/* Meta */}
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span>{deck.date}</span>
                  <span>{deck.slides} slides</span>
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 brutal-border font-bold">
                    <Eye className="w-4 h-4 mr-2" />
                    View
                  </Button>
                  <Button variant="outline" className="brutal-border font-bold">
                    <Download className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Slides;
