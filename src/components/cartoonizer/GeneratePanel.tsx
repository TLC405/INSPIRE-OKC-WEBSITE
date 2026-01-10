import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RefreshCw, Upload, Sparkles, Palette, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { getStyleById, buildStylePrompt } from "@/lib/teeFeeMeStyles";
import { getFingerprint } from "@/lib/fingerprint";

interface GeneratePanelProps {
  sessionId: string;
  uploadId: string;
  uploadUrl: string;
  styleId: string;
  onTryAnotherStyle: () => void;
  onNewPhoto: () => void;
}

const GENERATION_STEPS = [
  { label: "Analyzing face", icon: "🔍" },
  { label: "Applying style", icon: "🎨" },
  { label: "Preserving identity", icon: "🔐" },
  { label: "Rendering scene", icon: "✨" },
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
      toast.success("Your cartoon is ready!");
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

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className={`
            inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium
            bg-gradient-to-r ${styleGradient} text-white shadow-lg
          `}>
            <Palette className="w-4 h-4" />
            {styleName}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">
            {generating ? "Creating Your Cartoon..." : "Your Transformation"}
          </h2>
        </div>

        <Card className="overflow-hidden border-0 shadow-2xl">
          {generating ? (
            // Enhanced Loading State
            <div className="p-6 md:p-10">
              <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center">
                {/* Original Photo */}
                <div className="space-y-3">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Original</p>
                  <div className="relative rounded-xl overflow-hidden aspect-square">
                    <img 
                      src={uploadUrl} 
                      alt="Your photo" 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                  </div>
                </div>

                {/* Transformation Progress */}
                <div className="space-y-6">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider text-center md:text-left">
                    Transforming
                  </p>
                  
                  {/* Animated Orb */}
                  <div className="flex justify-center">
                    <div className="relative">
                      {/* Outer ring */}
                      <div className={`
                        w-32 h-32 rounded-full bg-gradient-to-br ${styleGradient}
                        animate-pulse opacity-30
                      `} />
                      
                      {/* Spinning ring */}
                      <div className="absolute inset-2 rounded-full border-4 border-dashed border-primary/50 animate-spin" 
                           style={{ animationDuration: '3s' }} />
                      
                      {/* Center content */}
                      <div className="absolute inset-4 rounded-full bg-card flex items-center justify-center">
                        <Sparkles className="w-8 h-8 text-primary animate-pulse" />
                      </div>
                    </div>
                  </div>

                  {/* Loading Message */}
                  <div className="text-center space-y-2">
                    <p className="font-semibold text-lg">{loadingMessage}</p>
                    <p className="text-sm text-muted-foreground">
                      FaceLock preserving your identity...
                    </p>
                  </div>

                  {/* Step Indicators */}
                  <div className="space-y-2">
                    {GENERATION_STEPS.map((step, index) => (
                      <div 
                        key={step.label}
                        className={`
                          flex items-center gap-3 px-4 py-2 rounded-lg transition-all duration-300
                          ${index === currentStep 
                            ? "bg-primary/10 text-primary" 
                            : index < currentStep 
                              ? "text-muted-foreground" 
                              : "text-muted-foreground/50"
                          }
                        `}
                      >
                        <span className="text-lg">{step.icon}</span>
                        <span className="text-sm font-medium">{step.label}</span>
                        {index < currentStep && (
                          <Check className="w-4 h-4 ml-auto text-green-500" />
                        )}
                        {index === currentStep && (
                          <div className="ml-auto w-4 h-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ) : generatedImage ? (
            // Result Display
            <div className="p-4 md:p-6 space-y-6">
              {/* Side by Side Comparison */}
              <div className="grid md:grid-cols-2 gap-4">
                {/* Original */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Before</p>
                  <div className="relative rounded-xl overflow-hidden aspect-square bg-muted">
                    <img
                      src={uploadUrl}
                      alt="Original photo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Generated */}
                <div className="space-y-2">
                  <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">After</p>
                  <div className="relative rounded-xl overflow-hidden aspect-square bg-muted group">
                    <img
                      src={generatedImage}
                      alt={`Your ${styleName} transformation`}
                      className="w-full h-full object-cover"
                    />
                    {/* Watermark */}
                    <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium text-white/90">
                      TeeFeeMe-5000
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <Button 
                  onClick={handleDownload} 
                  size="lg" 
                  className="w-full shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
                <Button 
                  onClick={onTryAnotherStyle} 
                  variant="secondary" 
                  size="lg" 
                  className="w-full"
                >
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Another Style
                </Button>
                <Button 
                  onClick={onNewPhoto} 
                  variant="outline" 
                  size="lg" 
                  className="w-full"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  New Photo
                </Button>
              </div>
            </div>
          ) : (
            // Error State
            <div className="p-6 md:p-10 text-center space-y-4">
              <div className="w-16 h-16 mx-auto rounded-full bg-destructive/10 flex items-center justify-center">
                <RefreshCw className="w-8 h-8 text-destructive" />
              </div>
              <div className="space-y-1">
                <p className="font-medium">Generation failed</p>
                <p className="text-sm text-muted-foreground">Something went wrong. Let's try again!</p>
              </div>
              <Button onClick={generateCartoon} size="lg">
                <RefreshCw className="w-4 h-4 mr-2" />
                Try Again
              </Button>
            </div>
          )}
        </Card>

        {/* Footer */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            A creative break for the homies 🤝
          </p>
        </div>
      </div>
    </div>
  );
};
