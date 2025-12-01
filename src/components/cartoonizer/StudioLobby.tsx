import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Gamepad2, Film, Tv, Sparkles } from "lucide-react";

const ARCADE_STYLES = [
  { id: "KIDS-K2", name: "Pokémon Trainer", desc: "Catch 'em all anime adventure style", emoji: "⚡", color: "from-yellow-500/20" },
  { id: "KIDS-K3", name: "Retro Toontown", desc: "Classic Mickey Mouse rubber-hose magic", emoji: "🎩", color: "from-red-500/20" },
];

const CINEMA_STYLES = [
  { id: "ADULT-A1", name: "Springfield Citizen", desc: "Yellow-skinned suburban satire", emoji: "🟡", color: "from-yellow-500/20" },
  { id: "ADULT-A2", name: "Quahog Resident", desc: "Pastel family sitcom style", emoji: "👨‍👩‍👧‍👦", color: "from-blue-500/20" },
  { id: "ADULT-A3", name: "Mountain Town Kid", desc: "Flat cutout paper character", emoji: "⛷️", color: "from-green-500/20" },
  { id: "ADULT-A5", name: "Texas Neighbor", desc: "Grounded realistic animation", emoji: "🏡", color: "from-orange-500/20" },
];

const ANIMATION_STYLES = [
  { id: "KIDS-K1", name: "Bikini Bottom Buddy", desc: "Undersea absurdist adventure", emoji: "🧽", color: "from-cyan-500/20" },
  { id: "ADULT-A4", name: "Dimension C-137", desc: "Sci-fi multiverse madness", emoji: "🔬", color: "from-green-500/20" },
  { id: "ADULT-A6", name: "Gross-Out Toon", desc: "Gritty grotesque chaos", emoji: "😵", color: "from-purple-500/20" },
  { id: "ADULT-A7", name: "MTV Generation", desc: "Crude 90s slacker style", emoji: "🤘", color: "from-gray-500/20" },
  { id: "KIDS-K4", name: "Nursery Friend", desc: "Minimal geometric cuteness", emoji: "🐷", color: "from-pink-500/20" },
  { id: "KIDS-K5", name: "Robo-Pal", desc: "Clean manga companion", emoji: "🤖", color: "from-blue-500/20" },
];

type Wing = "arcade" | "cinema" | "animation";

interface StudioLobbyProps {
  onStyleSelect: (styleId: string) => void;
}

export const StudioLobby = ({ onStyleSelect }: StudioLobbyProps) => {
  const [activeWing, setActiveWing] = useState<Wing>("cinema");

  const wings = [
    { id: "arcade" as Wing, name: "Game-Verse Arcade", icon: "🎮", styles: ARCADE_STYLES, desc: "Pixel-perfect power-up transformations" },
    { id: "cinema" as Wing, name: "Screening Room", icon: "🎬", styles: CINEMA_STYLES, desc: "Silver screen animation legends" },
    { id: "animation" as Wing, name: "Animation Alley", icon: "📺", styles: ANIMATION_STYLES, desc: "TV cartoon hall of fame" },
  ];

  const navigateWing = (direction: "prev" | "next") => {
    const currentIndex = wings.findIndex((w) => w.id === activeWing);
    const newIndex = direction === "prev"
      ? (currentIndex - 1 + wings.length) % wings.length
      : (currentIndex + 1) % wings.length;
    setActiveWing(wings[newIndex].id);
  };

  const wingBg = {
    arcade: "bg-gradient-to-br from-purple-900/40 via-pink-900/30 to-blue-900/40",
    cinema: "bg-gradient-to-br from-red-900/40 via-yellow-900/30 to-amber-900/40",
    animation: "bg-gradient-to-br from-blue-900/40 via-green-900/30 to-teal-900/40",
  };

  const wingAccent = {
    arcade: "from-purple-500 to-pink-500",
    cinema: "from-red-500 to-yellow-500",
    animation: "from-blue-500 to-green-500",
  };

  return (
    <div className={`min-h-screen relative overflow-hidden transition-all duration-700 ${wingBg[activeWing]}`}>
      {/* Themed Ambient Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {activeWing === "arcade" && (
          <>
            <div className="absolute top-10 left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-20 right-20 w-48 h-48 bg-pink-500/20 rounded-full blur-[100px] animate-pulse delay-150" />
            <div className="absolute top-1/2 left-1/2 w-32 h-32 bg-blue-500/20 rounded-full blur-[80px] animate-spotlight" />
          </>
        )}
        {activeWing === "cinema" && (
          <>
            <div className="absolute top-20 right-10 w-56 h-56 bg-yellow-500/20 rounded-full blur-[120px] animate-spotlight" />
            <div className="absolute bottom-10 left-10 w-44 h-44 bg-red-500/20 rounded-full blur-[100px] animate-pulse" />
          </>
        )}
        {activeWing === "animation" && (
          <>
            <div className="absolute top-16 left-1/4 w-36 h-36 bg-green-500/20 rounded-full blur-[90px] animate-float" />
            <div className="absolute bottom-24 right-1/4 w-40 h-40 bg-blue-500/20 rounded-full blur-[100px] animate-float delay-200" />
            <div className="absolute top-1/3 right-10 w-32 h-32 bg-teal-500/20 rounded-full blur-[80px] animate-wiggle" />
          </>
        )}
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-10">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className={`inline-block px-8 py-4 bg-gradient-to-r ${wingAccent[activeWing]} rounded-3xl border-4 border-white/30 shadow-2xl backdrop-blur-sm`}>
              <p className="text-white text-xl font-black tracking-wider uppercase flex items-center gap-3">
                <Sparkles className="w-5 h-5 animate-spin" />
                The Grand Studio Lobby
                <Sparkles className="w-5 h-5 animate-spin" />
              </p>
            </div>

            <h2 className={`text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r ${wingAccent[activeWing]} drop-shadow-[0_0_30px_rgba(255,255,255,0.3)]`}>
              {wings[wings.findIndex((w) => w.id === activeWing)].name}
            </h2>

            <p className="text-white/90 text-2xl font-bold drop-shadow-lg max-w-2xl mx-auto">
              {wings[wings.findIndex((w) => w.id === activeWing)].desc}
            </p>
          </div>

          {/* Wing Navigation */}
          <div className="flex items-center justify-center gap-6">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigateWing("prev")}
              className="rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
            >
              <ChevronLeft className="w-7 h-7 text-white" />
            </Button>

            <div className={`flex items-center gap-4 bg-gradient-to-r ${wingAccent[activeWing]} rounded-3xl px-8 py-4 border-4 border-white/30 shadow-2xl`}>
              <span className="text-4xl animate-bounce">
                {wings[wings.findIndex((w) => w.id === activeWing)].icon}
              </span>
              <span className="font-black text-2xl text-white drop-shadow-lg">
                {wings[wings.findIndex((w) => w.id === activeWing)].name}
              </span>
            </div>

            <Button
              variant="ghost"
              size="lg"
              onClick={() => navigateWing("next")}
              className="rounded-full bg-white/10 backdrop-blur-sm border-2 border-white/30 hover:bg-white/20 hover:scale-110 transition-all shadow-lg"
            >
              <ChevronRight className="w-7 h-7 text-white" />
            </Button>
          </div>

          {/* Styles Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {wings[wings.findIndex((w) => w.id === activeWing)].styles.map((style, idx) => (
              <Card
                key={style.id}
                className="border-4 border-white/30 rounded-3xl overflow-hidden bg-black/40 backdrop-blur-md shadow-2xl hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] transition-all duration-500 hover:scale-105 hover:-rotate-1 group"
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={`relative p-6 bg-gradient-to-br ${style.color} border-b-4 border-white/30 overflow-hidden`}>
                  <div className="absolute inset-0 bg-white/5 animate-projector-flicker" />
                  <div className="flex items-center justify-between relative z-10">
                    <span className="text-6xl animate-float drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">
                      {style.emoji}
                    </span>
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center animate-spotlight">
                      <Sparkles className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="p-8 space-y-6">
                  <div>
                    <h3 className="text-3xl font-black text-white mb-3 drop-shadow-lg group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-yellow-300 group-hover:to-red-400 transition-all">
                      {style.name}
                    </h3>
                    <p className="text-white/80 font-semibold leading-relaxed text-lg">
                      {style.desc}
                    </p>
                  </div>

                  <Button
                    onClick={() => onStyleSelect(style.id)}
                    className={`w-full text-xl py-7 bg-gradient-to-r ${wingAccent[activeWing]} hover:from-white hover:to-white hover:text-gray-900 text-white font-black rounded-2xl transform hover:scale-110 border-4 border-white/30 shadow-lg transition-all duration-300`}
                  >
                    <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                    Transform Now!
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          {/* Wing Indicators */}
          <div className="flex justify-center gap-4 pt-8">
            {wings.map((wing) => (
              <button
                key={wing.id}
                onClick={() => setActiveWing(wing.id)}
                className={`transition-all duration-300 ${
                  wing.id === activeWing
                    ? `w-16 h-5 bg-gradient-to-r ${wingAccent[wing.id]} rounded-full shadow-lg border-2 border-white/50`
                    : "w-5 h-5 bg-white/30 rounded-full hover:bg-white/50 border-2 border-white/30"
                }`}
                aria-label={`Switch to ${wing.name}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
