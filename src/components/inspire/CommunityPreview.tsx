import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Users, Shield, ArrowRight } from "lucide-react";

const previewItems = [
  {
    icon: Calendar,
    title: "Events Calendar",
    description: "Weekly meetups, volunteer days, and community gatherings.",
  },
  {
    icon: Users,
    title: "Member Spotlight",
    description: "Meet people making moves in OKC. First names only.",
  },
  {
    icon: Shield,
    title: "Community Rules",
    description: "Show up. Be real. No spam. Support each other.",
  },
];

export const CommunityPreview = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-sm mb-6">
              <Shield className="w-4 h-4 text-primary" />
              <span className="text-sm font-bold text-primary uppercase tracking-wide">
                Members Only
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tight mb-4">
              What's <span className="okc-gradient-text">Inside</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              A glimpse of what approved members get access to.
            </p>
          </div>

          {/* Preview Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {previewItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.title}
                  className="brutal-card p-6 text-center animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="w-12 h-12 bg-primary/10 rounded-sm flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-black uppercase mb-2">{item.title}</h3>
                  <p className="text-muted-foreground text-sm">{item.description}</p>
                </div>
              );
            })}
          </div>

          {/* CTA */}
          <div className="text-center">
            <Link to="/apply">
              <Button size="lg" className="brutal-btn text-lg px-8 py-6 font-black uppercase tracking-wide">
                Apply for Access
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <p className="text-sm text-muted-foreground mt-4">
              Applications reviewed within 48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
