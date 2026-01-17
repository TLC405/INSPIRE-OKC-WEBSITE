import { SharedLayout } from "@/components/layout/SharedLayout";
import { Zap, Heart, Users, Mail, MapPin, Globe } from "lucide-react";
import { Link } from "react-router-dom";

const Info = () => {
  return (
    <SharedLayout>
      <div className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          {/* Hero */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="w-20 h-20 mx-auto bg-primary flex items-center justify-center border-4 border-foreground brutal-shadow mb-6">
              <Zap className="w-10 h-10 text-primary-foreground" />
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tight mb-4">
              About <span className="okc-gradient-text">Inspire OKC</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              A platform for real community, built in Oklahoma City by TLC.
            </p>
          </div>

          {/* Mission */}
          <section className="max-w-3xl mx-auto mb-16">
            <div className="brutal-card">
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                <Heart className="w-6 h-6 text-primary" />
                The Mission
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Inspire OKC exists to turn strangers into people who show up. We believe real community 
                happens face-to-face—through volunteering, shared events, and genuine connection.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                This isn't another social network. It's a hub: events, podcasts, apps, and a private 
                community for people who want more than likes and follows. We're building something 
                that matters.
              </p>
            </div>
          </section>

          {/* TLC */}
          <section className="max-w-3xl mx-auto mb-16">
            <div className="brutal-card-red text-primary-foreground">
              <h2 className="text-2xl font-black uppercase mb-4 flex items-center gap-3">
                <Users className="w-6 h-6" />
                About TLC
              </h2>
              <p className="leading-relaxed mb-4 opacity-90">
                TLC stands for Truth, Love, and Connection. It's the philosophy behind everything 
                we build—from the Phoenix Podcast to the TeeFeeMe tool to this platform.
              </p>
              <p className="leading-relaxed opacity-90">
                I'm building this because I experienced what happens when community falls apart, 
                and I've seen what becomes possible when people actually show up for each other.
              </p>
              <Link to="/story" className="inline-block mt-4 brutal-btn bg-foreground text-background border-foreground hover:bg-background hover:text-foreground">
                Read My Story
              </Link>
            </div>
          </section>

          {/* Get Involved */}
          <section className="max-w-3xl mx-auto mb-16">
            <h2 className="text-2xl font-black uppercase mb-6">Get Involved</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Link to="/apply" className="brutal-card group">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                  Join the Community
                </h3>
                <p className="text-muted-foreground text-sm">
                  Apply for access to private channels: Adulting OKC, Singles OKC, Workout OKC, and more.
                </p>
              </Link>
              <div className="brutal-card">
                <h3 className="text-xl font-bold mb-2">Partner With Us</h3>
                <p className="text-muted-foreground text-sm">
                  Local businesses, nonprofits, and creators—let's build together.
                </p>
              </div>
            </div>
          </section>

          {/* Contact */}
          <section className="max-w-3xl mx-auto">
            <h2 className="text-2xl font-black uppercase mb-6">Contact</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-4 text-muted-foreground">
                <Mail className="w-5 h-5 text-primary" />
                <span>hello@inspireokc.com</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <MapPin className="w-5 h-5 text-primary" />
                <span>Oklahoma City, OK</span>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <Globe className="w-5 h-5 text-primary" />
                <span>inspireokc.com</span>
              </div>
            </div>
          </section>
        </div>
      </div>
    </SharedLayout>
  );
};

export default Info;
