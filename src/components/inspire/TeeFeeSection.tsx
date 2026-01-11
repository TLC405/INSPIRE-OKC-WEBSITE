import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Palette, Zap } from "lucide-react";

export const TeeFeeSection = () => {
  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10" />
      
      <div className="container mx-auto px-4 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground text-sm font-bold uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              Featured Tool
            </div>

            <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tight">
              <span className="text-foreground">TeeFeeMe</span>
              <br />
              <span className="okc-gradient-text">-5000</span>
            </h2>

            <p className="text-muted-foreground text-lg max-w-lg">
              Transform your photos into 30+ cartoon styles. AI-powered, 
              identity-safe, instant results. Created by TLC for the homies.
            </p>

            {/* Features */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: Palette, label: "30+ Styles" },
                { icon: Zap, label: "Instant" },
                { icon: Sparkles, label: "FaceLock Safe" },
              ].map((feat) => (
                <div
                  key={feat.label}
                  className="flex items-center gap-2 px-4 py-2 bg-muted border-2 border-border text-sm font-bold"
                >
                  <feat.icon className="w-4 h-4 text-primary" />
                  {feat.label}
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link to="/cartoonizer">
              <button className="brutal-btn text-lg">
                Launch Cartoon Lab
                <ArrowRight className="w-5 h-5" />
              </button>
            </Link>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="brutal-card-pink p-8">
              {/* Mock transformation preview */}
              <div className="grid grid-cols-2 gap-6">
                {/* Original */}
                <div className="aspect-square bg-background border-4 border-foreground flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl">👤</span>
                    <p className="text-xs font-bold mt-2 text-foreground">YOUR PHOTO</p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="w-12 h-12 bg-foreground flex items-center justify-center animate-pulse-neon">
                    <ArrowRight className="w-6 h-6 text-background" />
                  </div>
                </div>

                {/* Cartoon */}
                <div className="aspect-square bg-accent border-4 border-foreground flex items-center justify-center">
                  <div className="text-center">
                    <span className="text-4xl">🎨</span>
                    <p className="text-xs font-bold mt-2 text-foreground">CARTOON YOU</p>
                  </div>
                </div>
              </div>

              {/* Style previews */}
              <div className="mt-6 flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                {["🟡 Simpsons", "🧽 SpongeBob", "🐉 Anime", "🎬 Pixar", "🦸 Marvel"].map((style) => (
                  <span
                    key={style}
                    className="px-3 py-1.5 bg-foreground text-background text-xs font-bold whitespace-nowrap"
                  >
                    {style}
                  </span>
                ))}
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -top-4 -right-4 bg-secondary text-secondary-foreground px-4 py-2 font-black text-sm uppercase border-4 border-foreground animate-pulse-neon">
              Free to Use
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
