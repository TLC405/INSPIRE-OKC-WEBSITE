import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Sparkles, Palette } from "lucide-react";

const Index = () => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-background via-primary/5 to-background">
      <div className="text-center px-4">
        <div className="mb-8 flex justify-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center animate-pulse">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <div className="w-16 h-16 rounded-2xl bg-secondary/10 flex items-center justify-center animate-pulse delay-75">
            <Palette className="w-8 h-8 text-secondary-foreground" />
          </div>
        </div>
        <h1 className="mb-4 text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          TLC Vision Forge
        </h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Build apps, create cartoons, and bring your ideas to life. Start with the App Builder or explore cartoonizer features.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/app-builder">
            <Button size="lg" className="w-full sm:w-auto">
              <Sparkles className="w-4 h-4 mr-2" />
              TLC App-Builder
            </Button>
          </Link>
          <Link to="/cartoonizer">
            <Button size="lg" variant="outline" className="w-full sm:w-auto">
              <Palette className="w-4 h-4 mr-2" />
              ALI-Forge Cartoonizer
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
