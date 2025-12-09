import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RefreshCw, Upload, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface GeneratePanelProps {
  sessionId: string;
  uploadId: string;
  uploadUrl: string;
  styleId: string;
  onTryAnotherStyle: () => void;
  onNewPhoto: () => void;
}

const STYLE_NAMES: Record<string, string> = {
  "ADULT-A1": "Simpsons Cartoon",
  "ADULT-A2": "Family Guy Cartoon",
  "ADULT-A3": "South Park Cartoon",
  "ADULT-A4": "Rick & Morty Cartoon",
  "ADULT-A5": "King of the Hill",
  "ADULT-A6": "Ren & Stimpy Cartoon",
  "ADULT-A7": "Beavis & Butthead",
  "KIDS-K1": "SpongeBob Cartoon",
  "KIDS-K2": "Pokémon Cartoon",
  "KIDS-K3": "Classic Toontown",
  "KIDS-K4": "Peppa Cartoon",
  "KIDS-K5": "Doraemon Cartoon",
};

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

  useEffect(() => {
    generateCartoon();
  }, []);

  const generateCartoon = async () => {
    setGenerating(true);
    const startTime = Date.now();

    try {
      // Track generation start
      await supabase.from("events").insert({
        session_id: sessionId,
        event_type: "GENERATE_CARTOON",
        event_data: { 
          style_id: styleId,
          upload_id: uploadId,
        },
      });

      // Call edge function to generate cartoon
      const { data, error } = await supabase.functions.invoke("generate-cartoon", {
        body: {
          imageUrl: uploadUrl,
          styleId: styleId,
        },
      });

      if (error) throw error;

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
      toast.error("Failed to generate cartoon. Please try again.");
      
      // Log error
      await supabase.from("generated_cartoons").insert({
        upload_id: uploadId,
        session_id: sessionId,
        style_id: styleId,
        image_url: "",
        generation_duration_ms: Date.now() - startTime,
        success: false,
        error_message: error instanceof Error ? error.message : "Unknown error",
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

      toast.success("Downloaded! Look for the TLC easter egg 👀");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const styleName = STYLE_NAMES[styleId] || styleId;

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">
            {generating ? "Creating Your Cartoon..." : "Your Transformation"}
          </h2>
          <p className="text-muted-foreground">
            {generating 
              ? "FaceLock is preserving your identity (15-30 seconds)" 
              : `Style: ${styleName}`}
          </p>
        </div>

        <Card className="p-6 md:p-8">
          <div className="space-y-6">
            {generating ? (
              <div className="flex flex-col items-center justify-center py-16 md:py-24 space-y-6">
                <div className="relative">
                  <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary/20 border-t-primary" />
                  <Sparkles className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-primary animate-pulse" />
                </div>
                <div className="text-center space-y-2">
                  <p className="text-lg font-medium">Transforming you into {styleName}...</p>
                  <p className="text-sm text-muted-foreground">
                    Preserving your features • Placing you in the scene • Adding TLC touches
                  </p>
                </div>
              </div>
            ) : generatedImage ? (
              <div className="space-y-6">
                <div className="relative rounded-xl overflow-hidden bg-muted">
                  <img
                    src={generatedImage}
                    alt={`Your ${styleName} transformation`}
                    className="w-full h-auto"
                  />
                  <div className="absolute bottom-3 right-3 bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium">
                    TeeFeeMe-5000
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <Button onClick={handleDownload} size="lg" className="w-full">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button onClick={onTryAnotherStyle} variant="secondary" size="lg" className="w-full">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Another Style
                  </Button>
                  <Button onClick={onNewPhoto} variant="outline" size="lg" className="w-full">
                    <Upload className="w-4 h-4 mr-2" />
                    New Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 space-y-4">
                <p className="text-lg text-muted-foreground">Generation failed</p>
                <Button onClick={generateCartoon} size="lg">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Try Again
                </Button>
              </div>
            )}
          </div>
        </Card>

        {generatedImage && (
          <div className="bg-muted/50 rounded-lg p-4 text-center">
            <p className="text-sm text-muted-foreground">
              🎯 <span className="font-medium text-foreground">Did you spot the TLC easter egg?</span> Every cartoon has a hidden "TLC" somewhere in the scene!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};