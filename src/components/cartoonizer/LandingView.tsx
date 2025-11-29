import { Button } from "@/components/ui/button";
import { Sparkles, Star, Zap, Heart } from "lucide-react";

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView = ({ onStart }: LandingViewProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-cartoon-pow/10 to-background">
      {/* Playful floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[10%] animate-float">
          <Star className="w-8 h-8 text-cartoon-zap fill-cartoon-zap" />
        </div>
        <div className="absolute top-20 right-[15%] animate-float delay-100">
          <Sparkles className="w-6 h-6 text-cartoon-pop" />
        </div>
        <div className="absolute top-32 left-[25%] animate-bounce">
          <Heart className="w-7 h-7 text-cartoon-boom fill-cartoon-boom" />
        </div>
        <div className="absolute top-40 right-[30%] animate-float delay-200">
          <Zap className="w-8 h-8 text-cartoon-splash fill-cartoon-splash" />
        </div>
        <div className="absolute top-16 left-[60%] animate-wiggle">
          <Star className="w-6 h-6 text-cartoon-pop fill-cartoon-pop" />
        </div>
        <div className="absolute top-28 right-[70%] animate-float delay-300">
          <Sparkles className="w-7 h-7 text-cartoon-zap" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-12">
          {/* Header Badge */}
          <div className="space-y-6">
            <div className="inline-block px-8 py-4 bg-gradient-to-r from-cartoon-pop/20 via-cartoon-pow/30 to-cartoon-splash/20 border-4 border-cartoon-pop/50 rounded-2xl transform hover:scale-105 transition-transform">
              <p className="text-cartoon-pop text-lg font-black tracking-wider uppercase flex items-center gap-2">
                <Sparkles className="w-5 h-5" />
                Ready to Get Cartoonified?
                <Sparkles className="w-5 h-5" />
              </p>
            </div>

            <h1 className="text-7xl md:text-9xl font-black bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash bg-clip-text text-transparent drop-shadow-2xl animate-pop">
              StoryWeave
            </h1>

            <p className="text-3xl md:text-4xl text-foreground font-bold">
              Become a <span className="text-cartoon-pop">Cartoon Legend!</span>
            </p>
          </div>

          {/* Feature Box */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-cartoon-pop/30 via-cartoon-pow/30 to-cartoon-splash/30 blur-3xl group-hover:blur-4xl transition-all duration-500" />

            <div className="relative bg-card border-4 border-border rounded-3xl p-8 transform hover:scale-105 hover:rotate-1 transition-all duration-300 shadow-2xl">
              <div className="space-y-6">
                <div className="text-cartoon-pop text-2xl font-black">
                  🎨 The Ultimate Transformation Experience
                </div>

                <div className="space-y-3">
                  <p className="text-foreground text-lg leading-relaxed font-medium">
                    Upload your photo and watch as AI magic transforms you into iconic animated characters. 
                    From yellow-skinned Springfield residents to undersea adventurers, your cartoon destiny awaits!
                  </p>

                  <div className="flex justify-center gap-6 text-base text-muted-foreground pt-4 flex-wrap">
                    <span className="flex items-center gap-2 bg-cartoon-zap/10 px-4 py-2 rounded-full border-2 border-cartoon-zap/30">
                      <Star className="w-5 h-5 text-cartoon-zap fill-cartoon-zap" />
                      12 Epic Styles
                    </span>
                    <span className="flex items-center gap-2 bg-cartoon-splash/10 px-4 py-2 rounded-full border-2 border-cartoon-splash/30">
                      <Sparkles className="w-5 h-5 text-cartoon-splash" />
                      AI-Powered Magic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Style Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Simpsons", emoji: "🟡", color: "from-cartoon-zap/20" },
              { name: "SpongeBob", emoji: "🧽", color: "from-cartoon-splash/20" },
              { name: "Rick & Morty", emoji: "🔬", color: "from-cartoon-pow/20" },
              { name: "Pokémon", emoji: "⚡", color: "from-cartoon-boom/20" },
            ].map((world) => (
              <div
                key={world.name}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${world.color} to-transparent blur-xl group-hover:blur-2xl transition-all duration-300`} />

                <div className="relative p-6 rounded-2xl border-3 border-border bg-card transform hover:scale-110 hover:rotate-3 transition-all duration-300 cursor-pointer">
                  <div className="text-5xl mb-2 animate-bounce">{world.emoji}</div>
                  <div className="text-sm font-bold text-foreground">{world.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="pt-4 space-y-4">
            <Button
              onClick={onStart}
              size="lg"
              className="text-2xl px-12 py-8 bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash hover:from-cartoon-splash hover:via-cartoon-pop hover:to-cartoon-zap text-white font-black rounded-2xl transform hover:scale-110 hover:rotate-2 transition-all duration-300 border-4 border-foreground/20 shadow-2xl"
            >
              <Sparkles className="w-7 h-7 mr-3 animate-spin" />
              Let's Get Cartoony!
              <Zap className="w-7 h-7 ml-3" />
            </Button>

            <p className="text-muted-foreground text-sm italic">
              3 Easy Steps: Upload → Pick Your Style → Transform into Cartoon Magic! ✨
            </p>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-cartoon-pop/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
