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
            StoryWeave
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground">
            Weave your photos with cinematic magic
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl mx-auto">
            An AI-powered image weaver that morphs your photos with the magic of cinematic styles. 
            A creative playground where you pull threads of inspiration from your favorite animated films 
            and weave them into your own unique visual tapestries.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { name: "Simpsons Spool", img: "🟡" },
            { name: "SpongeBob Spool", img: "🟨" },
            { name: "Rick & Morty Spool", img: "🟢" },
            { name: "Pokémon Spool", img: "🔴" },
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
          Enter The Loom
        </Button>

        <div className="text-xs text-muted-foreground space-y-1">
          <p>Upload → Select Style Spool → Weave (3 steps)</p>
          <p>12 cinematic style spools • AI-powered weaving • High-res masterpieces</p>
        </div>
      </div>
    </div>
  );
};
