import { Button } from "@/components/ui/button";
import { Zap, Sparkles, Star } from "lucide-react";

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView = ({ onStart }: LandingViewProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-background via-background to-primary/10">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[10%] animate-float">
          <div className="w-3 h-3 rounded-full bg-primary/60" />
        </div>
        <div className="absolute top-32 right-[15%] animate-float" style={{ animationDelay: "0.5s" }}>
          <div className="w-2 h-2 rounded-full bg-secondary/60" />
        </div>
        <div className="absolute top-40 left-[25%] animate-float" style={{ animationDelay: "1s" }}>
          <div className="w-4 h-4 rounded-full bg-accent/40" />
        </div>
        <div className="absolute top-16 right-[30%] animate-float" style={{ animationDelay: "1.5s" }}>
          <div className="w-2 h-2 rounded-full bg-primary/50" />
        </div>
        <div className="absolute top-52 left-[60%] animate-float" style={{ animationDelay: "0.7s" }}>
          <div className="w-3 h-3 rounded-full bg-secondary/50" />
        </div>
      </div>

      {/* Gradient overlay at top */}
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-primary/10 to-transparent" />
      
      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="text-center max-w-5xl mx-auto space-y-12">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full">
            <Zap className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">Cartoon Lab Now Open</span>
          </div>
          
          {/* Main Title */}
          <div className="space-y-4">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="bg-gradient-to-r from-primary via-accent to-secondary bg-clip-text text-transparent">
                TeeFeeMe
              </span>
              <span className="text-foreground">-5000</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground font-light max-w-2xl mx-auto">
              Transform your photo into legendary cartoon characters. 
              Your face. Their world. <span className="text-primary font-medium">100% you.</span>
            </p>
          </div>

          {/* Feature Card */}
          <div className="max-w-2xl mx-auto">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary/30 via-secondary/30 to-accent/30 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-300 opacity-70" />
              
              <div className="relative bg-card border border-border rounded-2xl p-8 space-y-6">
                <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                  <Star className="w-4 h-4 text-accent" />
                  <span>FaceLock Technology</span>
                  <Star className="w-4 h-4 text-accent" />
                </div>
                
                <p className="text-foreground leading-relaxed">
                  Our AI preserves every detail that makes you <em>you</em>—from the 
                  exact shape of your eyes to that ring on your finger. Tattoos, glasses, 
                  freckles—all faithfully recreated in your chosen cartoon world.
                </p>
                
                <div className="flex flex-wrap justify-center gap-3 pt-2">
                  {["12 Cartoon Worlds", "Identity Lock", "TLC Easter Eggs", "Instant Download"].map((feature) => (
                    <span 
                      key={feature}
                      className="px-3 py-1 text-xs font-medium bg-muted rounded-full text-muted-foreground"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Style Preview Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto">
            {[
              { name: "Simpsons", emoji: "🟡", color: "from-yellow-500/20 to-orange-500/20" },
              { name: "SpongeBob", emoji: "🧽", color: "from-cyan-500/20 to-blue-500/20" },
              { name: "Rick & Morty", emoji: "🔬", color: "from-green-500/20 to-lime-500/20" },
              { name: "Pokémon", emoji: "⚡", color: "from-red-500/20 to-yellow-500/20" },
            ].map((world) => (
              <div
                key={world.name}
                className="relative group cursor-default"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${world.color} rounded-xl blur-md group-hover:blur-lg transition-all duration-300 opacity-0 group-hover:opacity-100`} />
                
                <div className="relative p-4 rounded-xl border border-border bg-card/80 backdrop-blur-sm hover:border-primary/30 transition-all duration-300">
                  <div className="text-3xl mb-1">{world.emoji}</div>
                  <div className="text-xs font-medium text-muted-foreground">{world.name}</div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <div className="space-y-4 pt-4">
            <Button 
              onClick={onStart} 
              size="lg" 
              className="text-lg px-10 py-6 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Enter the Cartoon Lab
            </Button>
            
            <p className="text-sm text-muted-foreground">
              Upload → Pick a Style → Transform in Seconds
            </p>
          </div>
        </div>
      </div>

      {/* Bottom glow */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-primary/5 via-transparent to-transparent pointer-events-none" />
    </div>
  );
};