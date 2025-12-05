import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Wand2, Sparkles, ArrowRight, Zap, Shield, Image } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-secondary/15 rounded-full blur-[180px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-accent/10 rounded-full blur-[200px] animate-pulse-glow" style={{ animationDelay: "2s" }} />
      </div>

      {/* Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '80px 80px'
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        {/* Nav */}
        <nav className="flex items-center justify-between py-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-accent flex items-center justify-center">
              <Wand2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-bold text-lg text-foreground">Cartoonify</span>
          </div>
          
          <Button 
            onClick={() => navigate("/cartoonizer")}
            className="premium-button"
          >
            Get Started
          </Button>
        </nav>

        {/* Hero */}
        <section className="py-20 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-8 animate-fade-up">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-muted-foreground">AI-Powered Transformation</span>
            </div>

            {/* Title */}
            <h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6 animate-fade-up"
              style={{ animationDelay: "0.1s" }}
            >
              <span className="text-foreground">Turn Photos Into</span>
              <br />
              <span className="gradient-text glow-text">Cartoon Art</span>
            </h1>

            {/* Subtitle */}
            <p 
              className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              Transform yourself into iconic cartoon styles with our advanced AI. 
              From Simpsons to Anime—your face, your style, perfected.
            </p>

            {/* CTA */}
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
              style={{ animationDelay: "0.3s" }}
            >
              <Button
                onClick={() => navigate("/cartoonizer")}
                size="lg"
                className="premium-button text-lg px-8 py-6 h-auto group"
              >
                <Wand2 className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform" />
                Start Creating
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              
              <p className="text-sm text-muted-foreground">
                Free to try • No signup required
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20">
          <div className="max-w-5xl mx-auto">
            <div 
              className="text-center mb-12 animate-fade-up"
              style={{ animationDelay: "0.4s" }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                Why Cartoonify?
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto">
                Professional-grade AI transformations that preserve your unique features
              </p>
            </div>

            <div 
              className="grid md:grid-cols-3 gap-6 animate-fade-up"
              style={{ animationDelay: "0.5s" }}
            >
              {[
                { 
                  icon: Zap, 
                  title: "Lightning Fast", 
                  desc: "Get your cartoon in seconds, not minutes. Our optimized AI delivers instant results." 
                },
                { 
                  icon: Image, 
                  title: "12 Unique Styles", 
                  desc: "From Simpsons to Anime, South Park to SpongeBob—find your perfect style." 
                },
                { 
                  icon: Shield, 
                  title: "Privacy First", 
                  desc: "Your photos are processed securely and never stored. Your privacy matters." 
                },
              ].map((feature) => (
                <div 
                  key={feature.title}
                  className="premium-card p-8 hover:border-primary/30 transition-all duration-300 group"
                >
                  <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div 
            className="premium-card max-w-3xl mx-auto p-12 text-center animate-fade-up"
            style={{ animationDelay: "0.6s" }}
          >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-6">
              <Wand2 className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Ready to Transform?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Upload your photo and watch the magic happen. No account needed.
            </p>
            <Button
              onClick={() => navigate("/cartoonizer")}
              size="lg"
              className="premium-button text-lg px-10 py-6 h-auto"
            >
              Create Your Cartoon
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-8 border-t border-white/5">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <p>© 2024 Cartoonify. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-foreground transition-colors">Privacy</a>
              <a href="#" className="hover:text-foreground transition-colors">Terms</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
