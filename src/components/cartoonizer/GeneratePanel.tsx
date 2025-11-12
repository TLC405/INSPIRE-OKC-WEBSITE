import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RefreshCw, Upload } from "lucide-react";
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
      toast.success("Cartoon generated successfully!");
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
      link.download = `cartoon-${styleId}-${Date.now()}.png`;
      link.click();

      toast.success("Image downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">
            {generating ? "Generating Your Cartoon..." : "Your Cartoon"}
          </h2>
          <p className="text-muted-foreground">
            {generating ? "This may take 10-30 seconds" : `Style: ${styleId}`}
          </p>
        </div>

        <Card className="p-8">
          <div className="space-y-6">
            {generating ? (
              <div className="flex flex-col items-center justify-center py-20 space-y-4">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary" />
                <p className="text-lg font-medium">Generating likeness...</p>
                <p className="text-sm text-muted-foreground">
                  Auto-extracting identity • Applying style • Preserving features
                </p>
              </div>
            ) : generatedImage ? (
              <div className="space-y-6">
                <div className="relative rounded-lg overflow-hidden">
                  <img
                    src={generatedImage}
                    alt="Generated cartoon"
                    className="w-full h-auto"
                  />
                </div>

                <div className="flex flex-wrap gap-3">
                  <Button onClick={handleDownload} className="flex-1 min-w-[200px]">
                    <Download className="w-4 h-4 mr-2" />
                    Download PNG
                  </Button>
                  <Button onClick={onTryAnotherStyle} variant="secondary" className="flex-1 min-w-[200px]">
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Try Another Style
                  </Button>
                  <Button onClick={onNewPhoto} variant="outline" className="flex-1 min-w-[200px]">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload New Photo
                  </Button>
                </div>
              </div>
            ) : (
              <div className="text-center py-20 space-y-4">
                <p className="text-lg text-muted-foreground">Failed to generate</p>
                <Button onClick={generateCartoon}>Try Again</Button>
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};
