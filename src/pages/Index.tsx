import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Sparkles, Zap, Star, Palette } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-cartoon-pow/10 to-cartoon-splash/10 relative overflow-hidden">
      {/* Floating cartoon elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Star className="w-12 h-12 text-cartoon-zap fill-cartoon-zap" />
        </div>
        <div className="absolute top-40 right-20 animate-float delay-100">
          <Sparkles className="w-16 h-16 text-cartoon-pop" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-float delay-200">
          <Zap className="w-10 h-10 text-cartoon-splash fill-cartoon-splash" />
        </div>
        <div className="absolute top-1/3 right-1/4 animate-float delay-300">
          <Star className="w-8 h-8 text-cartoon-boom fill-cartoon-boom" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto text-center space-y-12">
          {/* Hero Section */}
          <div className="space-y-6">
            <div className="inline-block animate-wiggle">
              <div className="relative">
                <div className="absolute inset-0 bg-cartoon-pop blur-3xl opacity-30 animate-pulse" />
                <Palette className="w-24 h-24 text-cartoon-pop relative" />
              </div>
            </div>

            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash bg-clip-text text-transparent drop-shadow-2xl animate-pop tracking-tight">
              StoryWeave
            </h1>

            <p className="text-3xl md:text-4xl font-bold text-foreground">
              Transform Into{" "}
              <span className="text-cartoon-pop animate-pulse">Legendary</span>{" "}
              Cartoon Characters!
            </p>

            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Step into iconic animated worlds. From Simpsons to SpongeBob, from Pokémon to Rick and Morty – 
              become the star of your favorite cartoon universe!
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Sparkles, title: "12 Iconic Styles", desc: "Classic cartoons & anime", color: "cartoon-pop" },
              { icon: Zap, title: "AI-Powered", desc: "Instant transformations", color: "cartoon-zap" },
              { icon: Star, title: "Premium Quality", desc: "High-res cartoon magic", color: "cartoon-splash" },
            ].map((feature, i) => (
              <div
                key={i}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-${feature.color} blur-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-300`} />
                <div className="relative bg-card border-4 border-border rounded-3xl p-8 transform hover:scale-105 hover:-rotate-1 transition-all duration-300 shadow-xl">
                  <feature.icon className={`w-12 h-12 text-${feature.color} mx-auto mb-4 animate-bounce`} />
                  <h3 className="text-2xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="space-y-6 pt-8">
            <Button
              onClick={() => navigate("/cartoonizer")}
              size="lg"
              className="text-2xl px-12 py-8 bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash hover:from-cartoon-splash hover:via-cartoon-pop hover:to-cartoon-zap text-white font-black rounded-2xl transform hover:scale-110 hover:rotate-1 transition-all duration-300 border-4 border-foreground/20 shadow-2xl"
            >
              <Sparkles className="w-8 h-8 mr-3 animate-spin" />
              Start Your Transformation
              <Zap className="w-8 h-8 ml-3" />
            </Button>

            <p className="text-sm text-muted-foreground italic">
              Upload • Choose Your World • Transform • Share
            </p>

            {/* Style Preview */}
            <div className="flex flex-wrap justify-center gap-4 pt-8">
              {[
                { emoji: "🟡", label: "Simpsons" },
                { emoji: "🧽", label: "SpongeBob" },
                { emoji: "⚡", label: "Pokémon" },
                { emoji: "🔬", label: "Rick & Morty" },
                { emoji: "👨‍👩‍👧‍👦", label: "Family Guy" },
                { emoji: "⛷️", label: "South Park" },
              ].map((style) => (
                <div
                  key={style.label}
                  className="bg-card border-2 border-border rounded-2xl px-4 py-3 transform hover:scale-110 hover:rotate-3 transition-all duration-200 cursor-pointer"
                >
                  <div className="text-3xl mb-1">{style.emoji}</div>
                  <div className="text-xs font-semibold text-muted-foreground">{style.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cartoon-pow/20 to-transparent pointer-events-none" />
    </div>
  );
};

export default Index;
