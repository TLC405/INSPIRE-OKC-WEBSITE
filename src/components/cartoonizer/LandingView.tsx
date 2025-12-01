import { Button } from "@/components/ui/button";
import { Sparkles, Star } from "lucide-react";

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView = ({ onStart }: LandingViewProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-gray-900 via-purple-900/20 to-gray-900">
      {/* Theater Curtains */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-32 h-full bg-gradient-to-r from-red-900 to-transparent opacity-40 animate-float" />
        <div className="absolute top-0 right-0 w-32 h-full bg-gradient-to-l from-red-900 to-transparent opacity-40 animate-float" />
      </div>

      {/* Twinkling Lights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-[10%] animate-pulse">
          <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
        </div>
        <div className="absolute top-20 right-[15%] animate-pulse delay-100">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="absolute top-32 left-[25%] animate-pulse delay-200">
          <Star className="w-5 h-5 text-yellow-200 fill-yellow-200" />
        </div>
        <div className="absolute top-40 right-[30%] animate-pulse delay-300">
          <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
        </div>
        <div className="absolute top-16 left-[60%] animate-pulse delay-150">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
        </div>
        <div className="absolute top-28 right-[70%] animate-pulse delay-250">
          <Star className="w-5 h-5 text-yellow-200 fill-yellow-200" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-6xl mx-auto space-y-16">
          {/* Marquee Header */}
          <div className="space-y-8">
            <div className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 rounded-3xl border-4 border-yellow-300 shadow-2xl transform hover:scale-105 transition-transform animate-pulse">
              <p className="text-gray-900 text-2xl font-black tracking-widest uppercase flex items-center gap-3">
                <Sparkles className="w-6 h-6 animate-spin" />
                Tonight's Premiere
                <Sparkles className="w-6 h-6 animate-spin" />
              </p>
            </div>

            <h1 className="text-8xl md:text-[10rem] font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-red-400 to-yellow-300 drop-shadow-[0_0_30px_rgba(250,204,21,0.5)] animate-float leading-none">
              StoryWeave
            </h1>

            <p className="text-4xl md:text-5xl text-yellow-100 font-black drop-shadow-lg">
              Your <span className="text-red-400">Starring Role</span> Awaits
            </p>
          </div>

          {/* The Poster Frame */}
          <div className="relative max-w-3xl mx-auto group">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/40 via-red-500/40 to-yellow-400/40 blur-[100px] group-hover:blur-[120px] transition-all duration-500" />

            <div className="relative bg-gradient-to-b from-yellow-900/30 to-red-900/30 backdrop-blur-sm border-8 border-yellow-600 rounded-3xl p-12 transform hover:scale-105 hover:rotate-1 transition-all duration-500 shadow-[0_0_50px_rgba(250,204,21,0.3)]">
              <div className="space-y-8">
                <div className="text-5xl font-black text-yellow-300 tracking-tight border-b-4 border-yellow-600 pb-4">
                  🎭 The Premiere Experience
                </div>

                <div className="space-y-6">
                  <p className="text-yellow-50 text-2xl leading-relaxed font-semibold">
                    Step onto the red carpet and into the spotlight. Your photo becomes the star of an epic transformation—
                    from classic animated legends to modern cartoon masterpieces.
                  </p>

                  <div className="flex justify-center gap-8 text-lg text-yellow-200 pt-6 flex-wrap">
                    <span className="flex items-center gap-3 bg-yellow-500/20 px-6 py-3 rounded-full border-2 border-yellow-400/50 backdrop-blur-sm">
                      <Star className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                      <span className="font-bold">12 Iconic Styles</span>
                    </span>
                    <span className="flex items-center gap-3 bg-red-500/20 px-6 py-3 rounded-full border-2 border-red-400/50 backdrop-blur-sm">
                      <Sparkles className="w-6 h-6 text-red-300" />
                      <span className="font-bold">Studio-Grade AI</span>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Worlds Preview */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Springfield", emoji: "🟡", glow: "shadow-[0_0_30px_rgba(234,179,8,0.6)]" },
              { name: "Bikini Bottom", emoji: "🧽", glow: "shadow-[0_0_30px_rgba(14,165,233,0.6)]" },
              { name: "Dimension C-137", emoji: "🔬", glow: "shadow-[0_0_30px_rgba(34,197,94,0.6)]" },
              { name: "Kanto Region", emoji: "⚡", glow: "shadow-[0_0_30px_rgba(251,191,36,0.6)]" },
            ].map((world) => (
              <div
                key={world.name}
                className="relative group cursor-pointer"
              >
                <div className={`absolute inset-0 ${world.glow} rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                <div className="relative p-8 rounded-2xl border-4 border-yellow-600/50 bg-gradient-to-b from-gray-800 to-gray-900 transform hover:scale-110 hover:-rotate-2 transition-all duration-300">
                  <div className="text-6xl mb-3 animate-bounce">{world.emoji}</div>
                  <div className="text-base font-bold text-yellow-100">{world.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA - Velvet Rope Entry */}
          <div className="pt-8 space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 blur-2xl opacity-75 animate-pulse" />
              
              <Button
                onClick={onStart}
                size="lg"
                className="relative text-3xl px-16 py-10 bg-gradient-to-r from-yellow-400 via-red-500 to-yellow-400 hover:from-yellow-300 hover:via-red-400 hover:to-yellow-300 text-gray-900 font-black rounded-full transform hover:scale-110 transition-all duration-300 border-4 border-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.6)]"
              >
                <Sparkles className="w-8 h-8 mr-4 animate-spin" />
                Enter The Theater
                <Star className="w-8 h-8 ml-4 fill-gray-900" />
              </Button>
            </div>

            <p className="text-yellow-200 text-lg font-semibold italic drop-shadow-lg">
              🎬 Lights, Camera, Transformation! Your starring role begins now.
            </p>
          </div>
        </div>
      </div>

      {/* Stage Lights Bottom Glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-yellow-600/20 via-red-600/10 to-transparent pointer-events-none" />
    </div>
  );
};
