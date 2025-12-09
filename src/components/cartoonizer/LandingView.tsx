import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView = ({ onStart }: LandingViewProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950">
      {/* Theater Ambiance - Twinkling Lights */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-[10%] animate-pulse">
          <Star className="w-2 h-2 text-amber-400 fill-amber-400" />
        </div>
        <div className="absolute top-20 right-[15%] animate-pulse delay-100">
          <Star className="w-1.5 h-1.5 text-amber-300 fill-amber-300" />
        </div>
        <div className="absolute top-32 left-[25%] animate-pulse delay-200">
          <Star className="w-2 h-2 text-amber-500 fill-amber-500" />
        </div>
        <div className="absolute top-40 right-[30%] animate-pulse delay-300">
          <Star className="w-1.5 h-1.5 text-amber-400 fill-amber-400" />
        </div>
        <div className="absolute top-16 left-[60%] animate-pulse delay-150">
          <Star className="w-2 h-2 text-amber-300 fill-amber-300" />
        </div>
        <div className="absolute top-28 right-[70%] animate-pulse delay-250">
          <Star className="w-1.5 h-1.5 text-amber-500 fill-amber-500" />
        </div>
      </div>

      {/* Velvet Curtain Top Border */}
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-red-950 to-transparent opacity-30" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-12">
          {/* Marquee Header */}
          <div className="space-y-6">
            <div className="inline-block px-8 py-3 bg-gradient-to-r from-amber-500/20 via-amber-400/30 to-amber-500/20 border-2 border-amber-500/50 rounded-lg shadow-2xl shadow-amber-500/20">
              <p className="text-amber-400 text-sm font-semibold tracking-widest uppercase">
                ✨ Tonight's Premiere ✨
              </p>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-bold bg-gradient-to-b from-amber-200 via-amber-300 to-amber-600 bg-clip-text text-transparent drop-shadow-2xl">
              StoryWeave
            </h1>
            
            <p className="text-2xl md:text-3xl text-amber-100/90 font-light italic">
              Where You Become the Star
            </p>
          </div>

          {/* Starring Role Poster */}
          <div className="relative max-w-2xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/30 to-red-500/30 blur-2xl group-hover:blur-3xl transition-all duration-500" />
            
            <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 border-4 border-amber-600/60 rounded-2xl p-8 shadow-2xl transform hover:scale-[1.02] transition-all duration-300">
              {/* Ornate Corner Decorations */}
              <div className="absolute top-2 left-2 w-6 h-6 border-t-2 border-l-2 border-amber-500/60" />
              <div className="absolute top-2 right-2 w-6 h-6 border-t-2 border-r-2 border-amber-500/60" />
              <div className="absolute bottom-2 left-2 w-6 h-6 border-b-2 border-l-2 border-amber-500/60" />
              <div className="absolute bottom-2 right-2 w-6 h-6 border-b-2 border-r-2 border-amber-500/60" />
              
              <div className="space-y-6">
                <div className="text-amber-200 text-lg font-serif italic">
                  An Exclusive Transformation Experience
                </div>
                
                <div className="space-y-3">
                  <p className="text-zinc-300 text-base leading-relaxed">
                    Step into the spotlight and watch as AI weaves your photo into 
                    the fabric of legendary animated worlds. From pixelated game heroes 
                    to hand-drawn cartoon icons, your starring role awaits.
                  </p>
                  
                  <div className="flex justify-center gap-4 text-sm text-zinc-400 pt-2">
                    <span className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-amber-500" />
                      12 Cinematic Styles
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-4 h-4 text-amber-500" />
                      AI-Powered Magic
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Worlds Showcase */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
            {[
              { name: "Simpsons Universe", emoji: "🟡", glow: "from-yellow-500/20" },
              { name: "SpongeBob Seas", emoji: "🧽", glow: "from-cyan-500/20" },
              { name: "Sci-Fi Dimensions", emoji: "🔬", glow: "from-green-500/20" },
              { name: "Pokémon Realm", emoji: "⚡", glow: "from-red-500/20" },
            ].map((world) => (
              <div
                key={world.name}
                className="relative group"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${world.glow} to-transparent blur-xl group-hover:blur-2xl transition-all duration-300 opacity-0 group-hover:opacity-100`} />
                
                <div className="relative p-6 rounded-xl border border-zinc-700/50 bg-zinc-900/40 backdrop-blur-sm hover:border-amber-600/50 transition-all duration-300">
                  <div className="text-4xl mb-2">{world.emoji}</div>
                  <div className="text-xs font-medium text-zinc-300">{world.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Grand Entrance Button */}
          <div className="pt-4 space-y-4">
            <Button 
              onClick={onStart} 
              size="lg" 
              className="text-xl px-12 py-7 bg-gradient-to-r from-amber-600 via-amber-500 to-red-600 hover:from-amber-500 hover:via-amber-400 hover:to-red-500 text-white font-bold shadow-2xl shadow-amber-500/40 hover:shadow-amber-400/60 transform hover:scale-105 transition-all duration-300 border-2 border-amber-400/50"
            >
              <Sparkles className="w-6 h-6 mr-3" />
              Enter the Premiere
            </Button>
            
            <p className="text-zinc-500 text-xs italic">
              The curtain rises in 3 simple acts: Upload • Choose Your World • Transform
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Stage Lighting Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-amber-500/10 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};
