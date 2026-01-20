import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Terms() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header with Logo */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-8">
            <div className="w-12 h-12 bg-primary flex items-center justify-center border-4 border-foreground brutal-shadow-sm">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-black text-foreground text-2xl uppercase tracking-tight">
              Inspire OKC
            </span>
          </Link>
          
          <Link to="/">
            <Button variant="outline" className="brutal-btn-outline">
              <ArrowLeft size={18} className="mr-2" />
              Back to Home
            </Button>
          </Link>
        </div>

        {/* Title */}
        <div className="brutal-card mb-8">
          <h1 className="text-5xl font-black text-foreground uppercase mb-2 okc-gradient-text">
            Terms of Service
          </h1>
          <p className="text-muted-foreground font-bold uppercase tracking-wider text-sm">
            Last Updated: January 2025
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              1. Acceptance of Terms
            </h2>
            <p className="text-foreground leading-relaxed">
              By accessing or using Inspire Oklahoma City, you agree to be bound by these Terms of Service. 
              If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              2. Eligibility
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">To use Inspire Oklahoma City, you must:</p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Be at least 18 years of age</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Be legally capable of entering into a binding contract</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Not be prohibited from using our services under applicable law</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Provide accurate and truthful information during registration</div>
              </li>
            </ul>
          </section>

          <section className="brutal-card bg-secondary border-secondary">
            <h2 className="text-2xl font-black text-foreground uppercase mb-4 border-b-4 border-foreground pb-2">
              3. User Conduct
            </h2>
            <p className="text-foreground mb-4 leading-relaxed font-bold">
              You agree to conduct yourself in a respectful manner at all times. Prohibited behavior includes:
            </p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Harassment, bullying, or intimidation of other users</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Sharing false or misleading information</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Impersonating another person or entity</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Using the platform for illegal activities</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Attempting to circumvent security measures</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Spamming or sending unsolicited messages</div>
              </li>
            </ul>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              4. Event Participation
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              When attending events organized through Inspire Oklahoma City:
            </p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>You agree to follow all event rules and guidelines</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>You understand that connections made are between consenting adults</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>You will respect the privacy and boundaries of other attendees</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>You acknowledge that we are not responsible for interactions outside our platform</div>
              </li>
            </ul>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              5. Intellectual Property
            </h2>
            <p className="text-foreground leading-relaxed">
              All content, trademarks, and intellectual property on Inspire Oklahoma City are owned by us 
              or our licensors. You may not copy, modify, or distribute our content without permission.
            </p>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              6. Account Termination
            </h2>
            <p className="text-foreground leading-relaxed">
              We reserve the right to suspend or terminate your account if you violate these terms. 
              You may also delete your account at any time through your account settings.
            </p>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              7. Limitation of Liability
            </h2>
            <p className="text-foreground leading-relaxed">
              Inspire Oklahoma City is provided "as is" without warranties of any kind. We are not 
              liable for any damages arising from your use of our services, including but not limited 
              to interactions with other users.
            </p>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              8. Changes to Terms
            </h2>
            <p className="text-foreground leading-relaxed">
              We may update these terms from time to time. Continued use of our services after changes 
              constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="brutal-card bg-primary border-primary">
            <h2 className="text-2xl font-black text-foreground uppercase mb-4 border-b-4 border-foreground pb-2">
              9. Contact
            </h2>
            <p className="text-foreground leading-relaxed">
              For questions about these Terms of Service, contact us at{" "}
              <a 
                href="mailto:legal@inspireokc.com" 
                className="font-black underline hover:text-secondary transition-colors"
              >
                legal@inspireokc.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-4 border-primary text-center">
          <p className="text-muted-foreground font-bold uppercase tracking-wider text-sm">
            © 2025 Inspire Oklahoma City · Powered by TLC
          </p>
        </div>
      </div>
    </div>
  );
}
