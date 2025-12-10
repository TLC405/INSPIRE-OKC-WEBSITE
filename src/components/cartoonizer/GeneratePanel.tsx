import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RefreshCw, Upload, Sparkles } from "lucide-react";
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

  const style = getStyleById(styleId);
  const styleName = style?.label || styleId;

  useEffect(() => {
    if (style?.loadingMessage) {
      setLoadingMessage(style.loadingMessage);
    }
    generateCartoon();
  }, []);

  const generateCartoon = async () => {
    setGenerating(true);
    const startTime = Date.now();

    try {
      // Get fingerprint for rate limiting
      const fingerprint = await getFingerprint();

      // Build the full prompt using the style engine
      const promptData = buildStylePrompt({
        styleId,
        subjectHint: 'portrait of the same person from the uploaded photo',
        lightingHint: 'soft studio lighting',
        moodHint: 'friendly and confident',
        extraNotes: 'keep the face clearly recognizable and the style faithful to the chosen show or game'
      });

      // Track generation start
      await supabase.from("events").insert({
        session_id: sessionId,
        event_type: "GENERATE_CARTOON",
        event_data: { 
          style_id: styleId,
          upload_id: uploadId,
        },
      });

      // Call edge function with built prompt
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

      // Save generated cartoon to database
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
      
      // Log error
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
      // Track download event
      await supabase.from("events").insert({
        session_id: sessionId,
        event_type: "DOWNLOAD_IMAGE",
        event_data: { style_id: styleId },
      });

      // Download image
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
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">
            {generating ? "Creating Your Cartoon..." : "Your Transformation"}
          </h2>
          {!generating && generatedImage && (
            <p className="text-muted-foreground text-sm">
              Style: {styleName}
            </p>
          )}
        </div>

        <Card className="p-4 md:p-6">
          <div className="space-y-6">
            {generating ? (
              <div className="flex flex-col items-center justify-center py-12 md:py-20 space-y-4">
                <div className="relative">
                  <div className="animate-spin rounded-full h-14 w-14 border-4 border-primary/20 border-t-primary" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-1">
                  <p className="font-medium text-lg">{loadingMessage}</p>
                  <p className="text-xs text-muted-foreground">
                    FaceLock preserving your identity...
                  </p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="space-y-4">
                <div className="relative rounded-xl overflow-hidden bg-muted">
                  <img
                    src={generatedImage}
                    alt={`Your ${styleName} transformation`}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-2 right-2 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    TeeFeeMe-5000
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  <Button onClick={handleDownload} size="lg" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={onTryAnotherStyle} variant="secondary" size="lg" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Another Style
                  </Button>
                  <Button onClick={onNewPhoto} variant="outline" size="lg" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    New Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-12 space-y-3">
                <p className="text-muted-foreground">Generation failed</p>
                <Button onClick={generateCartoon} size="lg">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </Card>

        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            A creative break for the homies 🤝
          </p>
        </div>
      </div>
    </div>
  );
};
