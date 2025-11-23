import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Gamepad2, Film, Tv, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";

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
    { id: "arcade" as Wing, name: "Game-Verse Arcade", icon: Gamepad2, styles: ARCADE_STYLES, desc: "Pixel & Power-Up Styles" },
    { id: "cinema" as Wing, name: "Screening Room", icon: Film, styles: CINEMA_STYLES, desc: "Classic Animation Films" },
    { id: "animation" as Wing, name: "Animation Alley", icon: Tv, styles: ANIMATION_STYLES, desc: "TV Cartoon Classics" },
  ];

  const currentWing = wings.find(w => w.id === activeWing)!;
  const currentIndex = wings.findIndex(w => w.id === activeWing);

  const navigateWing = (direction: "left" | "right") => {
    const newIndex = direction === "left" 
      ? (currentIndex - 1 + wings.length) % wings.length
      : (currentIndex + 1) % wings.length;
    setActiveWing(wings[newIndex].id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Ambient Lighting */}
      <div className="absolute inset-0">
        <div className={`absolute inset-0 bg-gradient-to-br ${
          activeWing === "arcade" ? "from-purple-900/20 via-transparent to-cyan-900/20" :
          activeWing === "cinema" ? "from-red-900/20 via-transparent to-amber-900/20" :
          "from-blue-900/20 via-transparent to-green-900/20"
        } transition-colors duration-700`} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-600/20 to-red-600/20 border border-amber-500/30 rounded-lg">
              <p className="text-amber-400 text-sm font-semibold tracking-wider flex items-center gap-2 justify-center">
                <Sparkles className="w-4 h-4" />
                ACT II: THE STUDIO TOUR
              </p>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-b from-amber-200 to-amber-600 bg-clip-text text-transparent">
              The Grand Studio Lobby
            </h2>
            
            <p className="text-zinc-400 text-lg">
              Explore three wings of cinematic styles. Choose your transformation.
            </p>
          </div>

          {/* Wing Navigation */}
          <div className="relative">
            {/* Navigation Arrows */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateWing("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-zinc-900/80 backdrop-blur border border-amber-500/30 hover:bg-zinc-800 hover:border-amber-400"
            >
              <ChevronLeft className="w-6 h-6 text-amber-400" />
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigateWing("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-20 h-12 w-12 rounded-full bg-zinc-900/80 backdrop-blur border border-amber-500/30 hover:bg-zinc-800 hover:border-amber-400"
            >
              <ChevronRight className="w-6 h-6 text-amber-400" />
            </Button>

            {/* Wing Display */}
            <div className="px-16">
              {/* Wing Header */}
              <div className="text-center mb-8 space-y-3">
                <div className="inline-flex items-center gap-3 px-6 py-3 bg-zinc-900/60 border-2 border-amber-500/40 rounded-xl backdrop-blur">
                  <currentWing.icon className="w-8 h-8 text-amber-400" />
                  <div className="text-left">
                    <h3 className="text-2xl font-bold text-amber-100">{currentWing.name}</h3>
                    <p className="text-sm text-amber-400/80">{currentWing.desc}</p>
                  </div>
                </div>
              </div>

              {/* Style Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentWing.styles.map((style) => (
                  <Card 
                    key={style.id}
                    className="group cursor-pointer hover:scale-105 transition-all duration-300 bg-zinc-900/60 border-2 border-zinc-700/50 hover:border-amber-500/50 backdrop-blur overflow-hidden"
                    onClick={() => onStyleSelect(style.id)}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/0 to-red-500/0 group-hover:from-amber-500/10 group-hover:to-red-500/10 transition-all duration-300" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${style.color} to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300`} />
                    
                    <CardHeader className="relative">
                      <div className="text-6xl mb-3 transform group-hover:scale-110 transition-transform duration-300">
                        {style.emoji}
                      </div>
                      <CardTitle className="text-xl text-amber-100 group-hover:text-amber-300 transition-colors">
                        {style.name}
                      </CardTitle>
                      <CardDescription className="text-zinc-400 group-hover:text-zinc-300 transition-colors">
                        {style.desc}
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="relative">
                      <Button 
                        className="w-full bg-gradient-to-r from-amber-600/80 to-red-600/80 hover:from-amber-500 hover:to-red-500 text-white border border-amber-400/30 group-hover:shadow-lg group-hover:shadow-amber-500/30 transition-all"
                      >
                        <Sparkles className="w-4 h-4 mr-2" />
                        Transform Into This
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>

          {/* Wing Indicators */}
          <div className="flex justify-center gap-3 pt-4">
            {wings.map((wing) => (
              <button
                key={wing.id}
                onClick={() => setActiveWing(wing.id)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  activeWing === wing.id 
                    ? "w-12 bg-amber-500" 
                    : "w-2 bg-zinc-700 hover:bg-zinc-600"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
