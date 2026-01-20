import { Link } from "react-router-dom";
import { ArrowLeft, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header with Logo */}
        <div className="mb-12">
          <Link to="/" className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-primary flex items-center justify-center border-4 border-foreground brutal-shadow-sm">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <span className="font-black text-foreground text-2xl uppercase tracking-tight block">
                Inspire OKC
              </span>
              <span className="text-xs font-black uppercase tracking-wider">
                Powered by <span className="tlc-gradient-text">TLC</span>
              </span>
            </div>
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
            Privacy Policy
          </h1>
          <p className="text-muted-foreground font-bold uppercase tracking-wider text-sm">
            Last Updated: January 2025
          </p>
        </div>

        {/* Content Sections */}
        <div className="space-y-6">
          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              1. Introduction
            </h2>
            <p className="text-foreground leading-relaxed">
              Welcome to Inspire Oklahoma City. We are committed to protecting your privacy and ensuring 
              a safe, enjoyable experience. This Privacy Policy explains how we collect, use, and 
              safeguard your information.
            </p>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              2. Information We Collect
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">We collect the following types of information:</p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>
                  <strong className="font-bold">Account Information:</strong> Name, email address, and profile details you provide during signup.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>
                  <strong className="font-bold">Event Participation:</strong> Information about events you attend or express interest in.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>
                  <strong className="font-bold">Usage Data:</strong> How you interact with our platform, including pages visited and features used.
                </div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>
                  <strong className="font-bold">Device Information:</strong> Browser type, device type, and general geographic region (country/state level only).
                </div>
              </li>
            </ul>
          </section>

          <section className="brutal-card bg-secondary border-secondary">
            <h2 className="text-2xl font-black text-foreground uppercase mb-4 border-b-4 border-foreground pb-2">
              3. What We DO NOT Collect
            </h2>
            <p className="text-foreground mb-4 leading-relaxed font-bold">
              We prioritize your privacy. We explicitly <span className="text-primary">DO NOT</span> collect:
            </p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Precise GPS location or exact coordinates</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Unmasked IP addresses (we hash all IP data)</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Financial information (payments are handled by secure third parties)</div>
              </li>
              <li className="flex gap-3">
                <span className="text-foreground font-black">✗</span>
                <div>Social media passwords or access tokens</div>
              </li>
            </ul>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              4. How We Use Your Information
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">We use your information to:</p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Provide and improve our services</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Match you with events and connections</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Ensure platform safety and security</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Send important updates about events and your account</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Analyze usage patterns to improve user experience</div>
              </li>
            </ul>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              5. Data Retention
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">
              We retain your data only as long as necessary to provide our services:
            </p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Activity logs are automatically deleted after 90 days</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Account data is retained while your account is active</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>You can request account deletion at any time</div>
              </li>
            </ul>
          </section>

          <section className="brutal-card">
            <h2 className="text-2xl font-black text-primary uppercase mb-4 border-b-4 border-primary pb-2">
              6. Your Rights
            </h2>
            <p className="text-foreground mb-4 leading-relaxed">You have the right to:</p>
            <ul className="list-none space-y-3 text-foreground">
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Access your personal data</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Request correction of inaccurate data</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Request deletion of your account and data</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Opt out of marketing communications</div>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-black">▪</span>
                <div>Export your data in a portable format</div>
              </li>
            </ul>
          </section>

          <section className="brutal-card bg-primary border-primary">
            <h2 className="text-2xl font-black text-foreground uppercase mb-4 border-b-4 border-foreground pb-2">
              7. Contact Us
            </h2>
            <p className="text-foreground leading-relaxed">
              If you have questions about this Privacy Policy or your data, please contact us at{" "}
              <a 
                href="mailto:privacy@inspireokc.com" 
                className="font-black underline hover:text-secondary transition-colors"
              >
                privacy@inspireokc.com
              </a>
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t-4 border-primary text-center">
          <p className="text-muted-foreground font-bold uppercase tracking-wider text-sm">
            © 2025 Inspire Oklahoma City · Powered by <span className="tlc-gradient-text">TLC</span>
          </p>
        </div>
      </div>
    </div>
  );
}
