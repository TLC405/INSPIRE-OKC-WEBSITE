import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Sparkles, ArrowRight } from "lucide-react";

const STYLES = [
  { id: "ADULT-A1", name: "Simpsons", desc: "Classic yellow Springfield style", emoji: "🟡", category: "adult" },
  { id: "ADULT-A2", name: "Family Guy", desc: "Pastel Quahog aesthetic", emoji: "👨‍👩‍👧‍👦", category: "adult" },
  { id: "ADULT-A3", name: "South Park", desc: "Flat paper cutout look", emoji: "⛷️", category: "adult" },
  { id: "ADULT-A4", name: "Rick & Morty", desc: "Sci-fi multiverse style", emoji: "🔬", category: "adult" },
  { id: "ADULT-A5", name: "King of the Hill", desc: "Grounded Texas aesthetic", emoji: "🏡", category: "adult" },
  { id: "ADULT-A6", name: "Ren & Stimpy", desc: "Grotesque 90s chaos", emoji: "😵", category: "adult" },
  { id: "ADULT-A7", name: "Beavis & Butthead", desc: "MTV slacker vibes", emoji: "🤘", category: "adult" },
  { id: "KIDS-K1", name: "SpongeBob", desc: "Bikini Bottom adventure", emoji: "🧽", category: "kids" },
  { id: "KIDS-K2", name: "Pokémon", desc: "Anime trainer style", emoji: "⚡", category: "kids" },
  { id: "KIDS-K3", name: "Classic Disney", desc: "Golden age animation", emoji: "🎩", category: "kids" },
  { id: "KIDS-K4", name: "Peppa Pig", desc: "Minimal geometric art", emoji: "🐷", category: "kids" },
  { id: "KIDS-K5", name: "Doraemon", desc: "Clean manga aesthetic", emoji: "🤖", category: "kids" },
];

interface StudioLobbyProps {
  onStyleSelect: (styleId: string) => void;
}

export const StudioLobby = ({ onStyleSelect }: StudioLobbyProps) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "adult" | "kids">("all");

  const filteredStyles = filter === "all" 
    ? STYLES 
    : STYLES.filter(s => s.category === filter);

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[140px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">2</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">Choose Style</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Pick Your Style
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select from 12 iconic cartoon styles. Your identity will be preserved perfectly.
            </p>
          </div>

          {/* Filter Tabs */}
          <div 
            className="flex justify-center gap-2 mb-8 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {[
              { id: "all", label: "All Styles" },
              { id: "adult", label: "Adult Animation" },
              { id: "kids", label: "Kids Classics" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id as any)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  filter === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Styles Grid */}
          <div 
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-10 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {filteredStyles.map((style, idx) => (
              <button
                key={style.id}
                onClick={() => setSelectedId(style.id)}
                className={`premium-card p-5 text-left transition-all duration-300 group ${
                  selectedId === style.id
                    ? "border-primary/50 bg-primary/10 ring-2 ring-primary/30"
                    : "hover:border-primary/30"
                }`}
                style={{ animationDelay: `${idx * 0.05}s` }}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-3xl">{style.emoji}</span>
                  {selectedId === style.id && (
                    <div className="w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                      <Sparkles className="w-3 h-3 text-primary-foreground" />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
                  {style.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {style.desc}
                </p>
              </button>
            ))}
          </div>

          {/* Continue Button */}
          <div 
            className="flex justify-center animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <Button
              onClick={() => selectedId && onStyleSelect(selectedId)}
              disabled={!selectedId}
              size="lg"
              className="premium-button px-8 py-6 h-auto text-lg group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Generate Cartoon
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Selected Style Info */}
          {selectedId && (
            <div className="mt-6 text-center animate-scale-in">
              <p className="text-sm text-muted-foreground">
                Selected: <span className="text-foreground font-medium">{STYLES.find(s => s.id === selectedId)?.name}</span>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
