import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Download, RefreshCw, Upload, Sparkles, Palette, Check, Zap, Share2, AlertTriangle } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getStyleById, buildStylePrompt } from "@/lib/teeFeeMeStyles";
import { getFingerprint } from "@/lib/fingerprint";
import { cn } from "@/lib/utils";

interface GeneratePanelProps {
  sessionId: string;
  uploadId: string;
  uploadUrl: string;
  styleId: string;
  onTryAnotherStyle: () => void;
  onNewPhoto: () => void;
}

const GENERATION_STEPS = [
  { label: "Analyzing face", icon: "🔍", complete: "✓" },
  { label: "Applying style", icon: "🎨", complete: "✓" },
  { label: "Preserving identity", icon: "🔐", complete: "✓" },
  { label: "Rendering scene", icon: "✨", complete: "✓" },
];

export const GeneratePanel = ({
  sessionId,
  uploadId,
  uploadUrl,
  styleId,
  onTryAnotherStyle,
  onNewPhoto,
}: GeneratePanelProps) => {
  const [generating, setGenerating] = useState(false);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loadingMessage, setLoadingMessage] = useState("Transforming...");
  const [currentStep, setCurrentStep] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);

  const style = getStyleById(styleId);
  const styleName = style?.label || styleId;
  const styleGradient = style?.previewGradient || "from-primary to-secondary";

  useEffect(() => {
    if (style?.loadingMessage) {
      setLoadingMessage(style.loadingMessage);
    }
    generateCartoon();
  }, []);

  // Animate through steps while generating
  useEffect(() => {
    if (!generating) return;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % GENERATION_STEPS.length);
    }, 2500);

    return () => clearInterval(interval);
  }, [generating]);

  const generateCartoon = async () => {
    setGenerating(true);
    setCurrentStep(0);
    const startTime = Date.now();

    try {
      const fingerprint = await getFingerprint();

      const promptData = buildStylePrompt({
        styleId,
        subjectHint: 'portrait of the same person from the uploaded photo',
        lightingHint: 'soft studio lighting',
        moodHint: 'friendly and confident',
        extraNotes: 'keep the face clearly recognizable and the style faithful to the chosen show or game'
      });

      await supabase.from("events").insert({
        session_id: sessionId,
        event_type: "GENERATE_CARTOON",
        event_data: { 
          style_id: styleId,
          upload_id: uploadId,
        },
      });

      const { data, error } = await supabase.functions.invoke("generate-cartoon", {
        body: {
          imageUrl: uploadUrl,
          styleId: styleId,
          prompt: promptData.fullPrompt,
          negativePrompt: promptData.negativePrompt,
          fingerprintHash: fingerprint,
          sessionId: sessionId,
        },
      });

      if (error) throw error;

      if (data.error) {
        throw new Error(data.error);
      }

      const duration = Date.now() - startTime;

      await supabase.from("generated_cartoons").insert({
        upload_id: uploadId,
        session_id: sessionId,
        style_id: styleId,
        image_url: data.imageUrl,
        generation_duration_ms: duration,
        success: true,
      });

      setGeneratedImage(data.imageUrl);
      setShowConfetti(true);
      toast.success("Your cartoon is ready!");
      
      // Hide confetti after animation
      setTimeout(() => setShowConfetti(false), 3000);
    } catch (error) {
      console.error("Generation error:", error);
      const errorMsg = error instanceof Error ? error.message : "Unknown error";
      
      if (errorMsg.includes("Daily generation limit")) {
        toast.error("You've hit your daily limit. Come back tomorrow!");
      } else {
        toast.error("Failed to generate. Try again.");
      }
      
      await supabase.from("generated_cartoons").insert({
        upload_id: uploadId,
        session_id: sessionId,
        style_id: styleId,
        image_url: "",
        generation_duration_ms: Date.now() - startTime,
        success: false,
        error_message: errorMsg,
      });
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedImage) return;

    try {
      await supabase.from("events").insert({
        session_id: sessionId,
        event_type: "DOWNLOAD_IMAGE",
        event_data: { style_id: styleId },
      });

      const link = document.createElement("a");
      link.href = generatedImage;
      link.download = `teefeme-5000-${styleId}-${Date.now()}.png`;
      link.click();

      toast.success("Downloaded! Enjoy homie 🤝");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const handleShare = async () => {
    if (!generatedImage) return;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: `My ${styleName} Transformation`,
          text: `Check out my cartoon transformation made with TeeFeeMe-5000!`,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        toast.success("Link copied to clipboard!");
      }
    } catch (error) {
      console.error("Share error:", error);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Confetti celebration */}
        {showConfetti && (
          <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute animate-confetti"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 0.5}s`,
                  backgroundColor: ['hsl(330, 100%, 55%)', 'hsl(0, 85%, 50%)', 'hsl(50, 100%, 50%)', 'hsl(280, 100%, 60%)'][Math.floor(Math.random() * 4)],
                  width: `${Math.random() * 10 + 5}px`,
                  height: `${Math.random() * 10 + 5}px`,
                }}
              />
            ))}
          </div>
        )}

        {/* Header - Brutal */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 brutal-border bg-card font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Step_03 / 03</span>
          </div>
          <div className={cn(
            "inline-flex items-center gap-2 px-4 py-2 border-4 border-foreground font-black uppercase text-sm",
            `bg-gradient-to-r ${styleGradient} text-white`
          )}>
            <Palette className="w-4 h-4" />
            {styleName}
          </div>
          <h2 className="text-2xl md:text-4xl font-black uppercase tracking-tight">
            {generating ? "Creating Your Cartoon..." : "Your Transformation"}
          </h2>
        </div>

        {/* Main Card - Brutal */}
        <div className="brutal-card overflow-hidden">
          {generating ? (
            // Enhanced Loading State
            <div className="p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                {/* Original Photo */}
                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    [ Original ]
                  </p>
                  <div className="relative border-4 border-foreground overflow-hidden aspect-square">
                    <img 
                      src={uploadUrl} 
                      alt="Your photo" 
                      className="w-full h-full object-cover"
                    />
                    {/* Corner accents */}
                    <div className="absolute top-0 left-0 w-6 h-6 border-t-4 border-l-4 border-primary" />
                    <div className="absolute top-0 right-0 w-6 h-6 border-t-4 border-r-4 border-primary" />
                    <div className="absolute bottom-0 left-0 w-6 h-6 border-b-4 border-l-4 border-primary" />
                    <div className="absolute bottom-0 right-0 w-6 h-6 border-b-4 border-r-4 border-primary" />
                  </div>
                </div>

                {/* Transformation Progress */}
                <div className="space-y-6">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center md:text-left">
                    [ Transforming ]
                  </p>
                  
                  {/* Animated Orb - Brutal style */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Outer ring */}
                      <div className="w-32 h-32 border-4 border-primary animate-pulse-neon" />
                      
                      {/* Spinning ring */}
                      <div 
                        className="absolute inset-2 border-4 border-dashed border-secondary animate-spin" 
                        style={{ animationDuration: '3s' }} 
                      />
                      
                      {/* Center content */}
                      <div className="absolute inset-4 bg-card border-2 border-foreground flex items-center justify-center">
                        <Zap className="w-10 h-10 text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Loading Message */}
                  <div className="text-center space-y-2">
                    <p className="font-black uppercase text-lg">{loadingMessage}</p>
                    <p className="text-sm text-muted-foreground font-mono">
                      FaceLock preserving your identity...
                    </p>
                  </div>

                  {/* Step Indicators - Brutal */}
                  <div className="space-y-2">
                    {GENERATION_STEPS.map((step, index) => (
                      <div 
                        key={step.label}
                        className={cn(
                          "flex items-center gap-3 px-4 py-2 border-2 transition-all duration-300",
                          index === currentStep 
                            ? "border-primary bg-primary/10 text-primary" 
                            : index < currentStep 
                              ? "border-muted text-muted-foreground" 
                              : "border-border text-muted-foreground/50"
                        )}
                      >
                        <span className="text-lg">{index <= currentStep ? step.icon : "○"}</span>
                        <span className="text-sm font-mono uppercase tracking-wider">{step.label}</span>
                        {index < currentStep && (
                          <Check className="w-4 h-4 ml-auto text-green-500" />
                        )}
                        {index === currentStep && (
                          <div className="ml-auto w-4 h-4 border-2 border-primary border-t-transparent animate-spin" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : generatedImage ? (
            // Result Display - Brutal
            <div className="p-4 md:p-6 space-y-6">
              {/* Side by Side Comparison */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    [ Before ]
                  </p>
                  <div className="relative border-4 border-foreground overflow-hidden aspect-square bg-muted">
                    <img
                      src={uploadUrl}
                      alt="Original photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Generated */}
                <div className="space-y-2">
                  <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                    [ After ]
                    <Sparkles className="w-3 h-3 text-primary" />
                  </p>
                  <div className="relative border-4 border-primary overflow-hidden aspect-square bg-muted group shadow-stacked">
                    <img
                      src={generatedImage}
                      alt={`Your ${styleName} transformation`}
                      className="w-full h-full object-cover"
                    />
                    {/* Watermark */}
                    <div className="absolute bottom-2 right-2 bg-background/90 backdrop-blur-sm px-2 py-1 border-2 border-foreground text-xs font-black uppercase">
                      TeeFeeMe-5000
                    </div>
                    {/* Shine overlay on hover */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
                  </div>
                </div>
              </div>

              {/* Action Buttons - Brutal */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Button 
                  onClick={handleDownload} 
                  className="brutal-btn col-span-2 sm:col-span-1"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={handleShare}
                  variant="secondary"
                  className="border-4 border-foreground font-black uppercase"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button 
                  onClick={onTryAnotherStyle} 
                  variant="outline" 
                  className="border-4 border-foreground font-black uppercase hover:bg-muted"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  New Style
                </Button>
                <Button 
                  onClick={onNewPhoto} 
                  variant="outline" 
                  className="border-4 border-foreground font-black uppercase hover:bg-muted"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  New Photo
                </Button>
              </div>
            </div>
          ) : (
            // Error State - Brutal
            <div className="p-6 md:p-10 text-center space-y-6">
              <div className="w-20 h-20 mx-auto border-4 border-destructive bg-destructive/10 flex items-center justify-center">
                <AlertTriangle className="w-10 h-10 text-destructive" />
              </div>
              <div className="space-y-2">
                <p className="font-black uppercase text-xl">Generation Failed</p>
                <p className="text-sm text-muted-foreground font-mono">
                  Something went wrong. Let's try again!
                </p>
              </div>
              <Button onClick={generateCartoon} className="brutal-btn">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
            A creative break for the homies 🤝
          </p>
        </div>
      </div>
    </div>
  );
};
