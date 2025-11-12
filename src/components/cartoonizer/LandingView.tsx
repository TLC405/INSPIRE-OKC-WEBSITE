import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView = ({ onStart }: LandingViewProps) => {
  return (
    <div className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center max-w-4xl mx-auto space-y-8">
        <div className="space-y-4">
          <h1 className="text-5xl md:text-7xl font-bold bg-gradient-to-r from-primary via-primary/80 to-primary/60 bg-clip-text text-transparent">
            ALI-Forge
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Transform your photo into a cartoon
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            Auto-Likeness IdentityForge preserves your facial identity while applying
            TV-inspired cartoon styles. One photo, multiple styles, 100% recognizable.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Simpsons", img: "🟡" },
            { name: "SpongeBob", img: "🟨" },
            { name: "Rick & Morty", img: "🟢" },
            { name: "Pokémon", img: "🔴" },
          ].map((style) => (
            <div
              key={style.name}
              className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
            >
              <div className="text-4xl mb-2">{style.img}</div>
              <div className="text-sm font-medium">{style.name}</div>
            </div>
          ))}
        </div>

        <Button onClick={onStart} size="lg" className="text-lg px-8">
          <Sparkles className="w-5 h-5 mr-2" />
          Start Now
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Upload → Pick Style → Generate (3 steps)</p>
          <p>12 TV-inspired styles • Identity-locked • High-res PNG</p>
        </div>
      </div>
    </div>
  );
};
