import { Button } from "@/components/ui/button";
import { Sparkles, Wand2, Zap, ArrowRight } from "lucide-react";

interface LandingViewProps {
  onStart: () => void;
}

export const LandingView = ({ onStart }: LandingViewProps) => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-secondary/15 rounded-full blur-[150px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-[180px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />

      <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full">
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-sm font-medium text-muted-foreground">AI-Powered Image Generation</span>
            </div>
          </div>

          {/* Hero Title */}
          <div className="text-center space-y-6 mb-12">
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <span className="text-foreground">Transform into</span>
              <br />
              <span className="gradient-text glow-text">Any Character</span>
            </h1>
            
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              Upload your photo and watch our AI transform you into iconic cartoon styles. 
              From Simpsons to Anime—your identity, reimagined.
            </p>
          </div>

          {/* CTA Button */}
          <div 
            className="flex justify-center mb-16 animate-fade-up"
            style={{ animationDelay: "0.4s" }}
          >
            <Button
              onClick={onStart}
              size="lg"
              className="premium-button text-lg px-8 py-6 h-auto group"
            >
              <Wand2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
              Start Creating
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>

          {/* Feature Cards */}
          <div 
            className="grid md:grid-cols-3 gap-6 mb-16 animate-fade-up"
            style={{ animationDelay: "0.5s" }}
          >
            {[
              { icon: Zap, title: "Instant Generation", desc: "Results in seconds with cutting-edge AI" },
              { icon: Sparkles, title: "12 Unique Styles", desc: "From classic cartoons to modern anime" },
              { icon: Wand2, title: "Identity Preserved", desc: "Your features, perfectly stylized" },
            ].map((feature, idx) => (
              <div 
                key={feature.title}
                className="premium-card p-6 group hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Style Preview */}
          <div 
            className="animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <p className="text-center text-sm text-muted-foreground mb-6 uppercase tracking-wider">Available Styles</p>
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { name: "Simpsons", color: "from-yellow-500/20 to-yellow-600/20", border: "border-yellow-500/30" },
                { name: "Anime", color: "from-pink-500/20 to-purple-500/20", border: "border-pink-500/30" },
                { name: "South Park", color: "from-green-500/20 to-teal-500/20", border: "border-green-500/30" },
                { name: "Rick & Morty", color: "from-cyan-500/20 to-green-500/20", border: "border-cyan-500/30" },
                { name: "SpongeBob", color: "from-yellow-400/20 to-orange-500/20", border: "border-yellow-400/30" },
                { name: "+ 7 More", color: "from-primary/20 to-accent/20", border: "border-primary/30" },
              ].map((style) => (
                <div 
                  key={style.name}
                  className={`px-4 py-2 rounded-full bg-gradient-to-r ${style.color} border ${style.border} backdrop-blur-sm hover:scale-105 transition-transform cursor-default`}
                >
                  <span className="text-sm font-medium text-foreground">{style.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent pointer-events-none" />
    </div>
  );
};
