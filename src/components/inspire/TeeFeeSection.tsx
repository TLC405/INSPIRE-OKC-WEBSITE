import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Palette, Zap, Star } from "lucide-react";
import { cn } from "@/lib/utils";

export const TeeFeeSection = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background pattern - no gradients, solid elements */}
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute top-0 left-0 w-full h-1 bg-primary" />
      <div className="absolute bottom-0 left-0 w-full h-1 bg-secondary" />
      
      {/* Corner accents */}
      <div className="absolute top-4 left-4 w-16 h-16 border-t-4 border-l-4 border-primary opacity-50" />
      <div className="absolute bottom-4 right-4 w-16 h-16 border-b-4 border-r-4 border-secondary opacity-50" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 border-4 border-foreground bg-primary text-primary-foreground font-black text-sm uppercase tracking-widest shadow-stacked">
              <Sparkles className="w-4 h-4" />
              Featured Tool
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              <span className="text-foreground">TeeFeeMe</span>
              <br />
              <span className="text-shadow-stacked text-primary">-5000</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-lg font-mono">
              Transform your photos into 30+ cartoon styles. AI-powered, 
              identity-safe, instant results. Created by TLC for the homies.
            </p>

            {/* Features - Brutal pills */}
            <div className="flex flex-wrap gap-3">
              {[
                { icon: Palette, label: "30+ Styles", highlight: true },
                { icon: Zap, label: "Instant", highlight: false },
                { icon: Star, label: "FaceLock Safe", highlight: false },
              ].map((feat) => (
                <div
                  key={feat.label}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 border-4 border-foreground font-black text-sm uppercase tracking-wider",
                    feat.highlight ? "bg-secondary text-secondary-foreground" : "bg-card text-foreground"
                  )}
                >
                  <feat.icon className="w-4 h-4" />
                  {feat.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/cartoonizer">
              <button className="brutal-btn text-lg group">
                Launch Cartoon Lab
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
          </div>

          {/* Right: Visual - Brutal card */}
          <div className="relative">
            <div className="brutal-card-pink p-6 md:p-8">
              {/* Mock transformation preview */}
              <div className="grid grid-cols-2 gap-4 md:gap-6 relative">
                {/* Original */}
                <div className="aspect-square bg-background border-4 border-foreground flex items-center justify-center relative group/item">
                  <div className="text-center">
                    <span className="text-4xl md:text-5xl">👤</span>
                    <p className="text-xs font-black mt-2 text-foreground uppercase tracking-wider">Your Photo</p>
                  </div>
                  {/* Corner brackets */}
                  <div className="absolute top-1 left-1 w-3 h-3 border-t-2 border-l-2 border-primary" />
                  <div className="absolute top-1 right-1 w-3 h-3 border-t-2 border-r-2 border-primary" />
                  <div className="absolute bottom-1 left-1 w-3 h-3 border-b-2 border-l-2 border-primary" />
                  <div className="absolute bottom-1 right-1 w-3 h-3 border-b-2 border-r-2 border-primary" />
                </div>

                {/* Arrow indicator - centered */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 bg-foreground border-4 border-primary flex items-center justify-center animate-pulse-neon">
                    <ArrowRight className="w-6 h-6 text-background" />
                  </div>
                </div>

                {/* Cartoon */}
                <div className="aspect-square bg-accent border-4 border-foreground flex items-center justify-center relative">
                  <div className="text-center">
                    <span className="text-4xl md:text-5xl">🎨</span>
                    <p className="text-xs font-black mt-2 text-foreground uppercase tracking-wider">Cartoon You</p>
                  </div>
                  {/* Shimmer effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
              </div>

              {/* Style previews - brutal pills */}
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  { emoji: "🟡", name: "Simpsons" },
                  { emoji: "🧽", name: "SpongeBob" },
                  { emoji: "🐉", name: "Anime" },
                  { emoji: "🎬", name: "Pixar" },
                  { emoji: "🦸", name: "Marvel" },
                ].map((style) => (
                  <span
                    key={style.name}
                    className="px-3 py-1.5 bg-foreground text-background text-xs font-black whitespace-nowrap uppercase tracking-wide border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
                  >
                    {style.emoji} {style.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-3 -right-3 bg-secondary text-secondary-foreground px-4 py-2 font-black text-sm uppercase border-4 border-foreground shadow-stacked animate-bounce-subtle">
              <Star className="w-3 h-3 inline mr-1" />
              Free to Use
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
