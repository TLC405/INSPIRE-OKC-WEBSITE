import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const channels = [
  { id: "inspire", label: "Inspire OKC Community", description: "Volunteering & community events" },
  { id: "adulting", label: "Adulting OKC", description: "Money, careers, life systems" },
  { id: "singles", label: "Singles OKC", description: "Real-life connections" },
  { id: "workout", label: "Workout OKC", description: "Fitness & accountability" },
];

const Apply = () => {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    why_join: "",
    channel_interest: [] as string[],
    referral_name: "",
  });

  const handleChannelToggle = (channelId: string) => {
    setFormData(prev => ({
      ...prev,
      channel_interest: prev.channel_interest.includes(channelId)
        ? prev.channel_interest.filter(c => c !== channelId)
        : [...prev.channel_interest, channelId]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.why_join) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (formData.channel_interest.length === 0) {
      toast.error("Please select at least one channel");
      return;
    }

    setLoading(true);

    try {
      const { error } = await supabase
        .from("community_applications")
        .insert({
          name: formData.name,
          email: formData.email,
          phone: formData.phone || null,
          why_join: formData.why_join,
          channel_interest: formData.channel_interest,
          referral_name: formData.referral_name || null,
        });

      if (error) {
        if (error.code === "23505") {
          toast.error("You've already submitted an application with this email");
          return;
        }
        throw error;
      }

      setSubmitted(true);
      toast.success("Application submitted successfully!");
    } catch (error: any) {
      console.error("Error submitting application:", error);
      toast.error("Failed to submit application. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle2 className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-3xl font-black uppercase">Application Received</h1>
          <p className="text-muted-foreground">
            Thanks for applying to join Inspire OKC. We'll review your application and get back to you within 48 hours.
          </p>
          <div className="pt-4 space-y-3">
            <Link to="/story">
              <Button className="w-full brutal-btn font-bold">
                Read My Story
              </Button>
            </Link>
            <Link to="/">
              <Button variant="outline" className="w-full brutal-border font-bold">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              Apply to <span className="okc-gradient-text">Join</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Real community. Approval required. No spam.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="brutal-card p-8 space-y-6">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="font-bold uppercase text-sm">
                Name <span className="text-destructive">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="brutal-border"
                required
              />
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label htmlFor="email" className="font-bold uppercase text-sm">
                Email <span className="text-destructive">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                className="brutal-border"
                required
              />
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label htmlFor="phone" className="font-bold uppercase text-sm">
                Phone <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="phone"
                type="tel"
                placeholder="(555) 123-4567"
                value={formData.phone}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                className="brutal-border"
              />
            </div>

            {/* Why Join */}
            <div className="space-y-2">
              <Label htmlFor="why_join" className="font-bold uppercase text-sm">
                Why do you want to join? <span className="text-destructive">*</span>
              </Label>
              <Textarea
                id="why_join"
                placeholder="Tell us a bit about yourself and why you're interested in joining Inspire OKC..."
                value={formData.why_join}
                onChange={(e) => setFormData(prev => ({ ...prev, why_join: e.target.value }))}
                className="brutal-border min-h-[120px]"
                required
              />
            </div>

            {/* Channel Interest */}
            <div className="space-y-4">
              <Label className="font-bold uppercase text-sm">
                Which channels interest you? <span className="text-destructive">*</span>
              </Label>
              <div className="grid sm:grid-cols-2 gap-3">
                {channels.map((channel) => (
                  <label
                    key={channel.id}
                    className={`flex items-start gap-3 p-4 border-2 cursor-pointer transition-all ${
                      formData.channel_interest.includes(channel.id)
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-muted-foreground"
                    }`}
                  >
                    <Checkbox
                      checked={formData.channel_interest.includes(channel.id)}
                      onCheckedChange={() => handleChannelToggle(channel.id)}
                      className="mt-0.5"
                    />
                    <div>
                      <p className="font-bold text-sm">{channel.label}</p>
                      <p className="text-xs text-muted-foreground">{channel.description}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Referral */}
            <div className="space-y-2">
              <Label htmlFor="referral" className="font-bold uppercase text-sm">
                Who referred you? <span className="text-muted-foreground">(optional)</span>
              </Label>
              <Input
                id="referral"
                type="text"
                placeholder="Name of person who referred you"
                value={formData.referral_name}
                onChange={(e) => setFormData(prev => ({ ...prev, referral_name: e.target.value }))}
                className="brutal-border"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              size="lg"
              className="w-full brutal-btn text-lg font-black uppercase"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Submit Application"}
            </Button>

            <p className="text-center text-sm text-muted-foreground">
              By applying, you agree to respect our community guidelines.
            </p>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Apply;
