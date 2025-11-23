import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, RefreshCw, Upload, Sparkles, Film, Wand2 } from "lucide-react";
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
      toast.success("Your masterpiece has been woven!");
    } catch (error) {
      console.error("Generation error:", error);
      toast.error("Failed to weave image. Please try again.");
      
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
      link.download = `storyweave-${styleId}-${Date.now()}.png`;
      link.click();

      toast.success("Masterpiece saved to your device!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Failed to download image");
    }
  };

  const styleNames: Record<string, string> = {
    "ADULT-A1": "Springfield Citizen",
    "ADULT-A2": "Quahog Resident", 
    "ADULT-A3": "Mountain Town Kid",
    "ADULT-A4": "Dimension C-137",
    "ADULT-A5": "Texas Neighbor",
    "ADULT-A6": "Gross-Out Toon",
    "ADULT-A7": "MTV Generation",
    "KIDS-K1": "Bikini Bottom Buddy",
    "KIDS-K2": "Pokémon Trainer",
    "KIDS-K3": "Retro Toontown",
    "KIDS-K4": "Nursery Friend",
    "KIDS-K5": "Robo-Pal",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Dramatic Lighting */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-amber-500/10 blur-3xl rounded-full animate-pulse" />
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-red-500/10 blur-3xl rounded-full animate-pulse delay-75" />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-600/20 to-red-600/20 border border-amber-500/30 rounded-lg">
              <p className="text-amber-400 text-sm font-semibold tracking-wider flex items-center gap-2 justify-center">
                <Film className="w-4 h-4" />
                {generating ? "ACT III: THE TRANSFORMATION" : "ACT III: THE PREMIERE"}
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-600 bg-clip-text text-transparent">
              {generating ? "Your Star Turn In Progress..." : "Your Starring Role"}
            </h2>
            
            <p className="text-zinc-400 text-lg">
              {generating 
                ? "Our AI director is crafting your cinematic transformation" 
                : `Transformed into: ${styleNames[styleId] || styleId}`
              }
            </p>
          </div>

          {/* Main Content Card */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-2xl" />
            
            <Card className="relative p-8 md:p-12 border-2 border-amber-600/30 bg-zinc-900/50 backdrop-blur-sm">
              {/* Corner Markers */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/60" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/60" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/60" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/60" />

              <div className="space-y-8">
                {generating ? (
                  /* Generation Animation */
                  <div className="flex flex-col items-center justify-center py-16 space-y-6">
                    <div className="relative">
                      <div className="animate-spin rounded-full h-24 w-24 border-t-4 border-b-4 border-amber-500" />
                      <div className="absolute inset-0 animate-spin rounded-full h-24 w-24 border-r-4 border-l-4 border-red-500" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }} />
                      <Wand2 className="absolute inset-0 m-auto w-10 h-10 text-amber-400 animate-pulse" />
                    </div>
                    
                    <div className="text-center space-y-2">
                      <p className="text-2xl font-bold text-amber-100 flex items-center gap-2 justify-center">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        Cinematic Magic In Progress
                      </p>
                      <p className="text-sm text-zinc-400 font-mono">
                        Analyzing features • Applying style • Preserving identity
                      </p>
                    </div>

                    <div className="w-full max-w-md bg-zinc-800/50 rounded-full h-2 overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-amber-500 to-red-500 animate-pulse" style={{ width: '70%' }} />
                    </div>

                    <p className="text-xs text-zinc-500 italic">
                      This usually takes 10-30 seconds • AI is working to preserve your unique features
                    </p>
                  </div>
                ) : generatedImage ? (
                  /* Success Display */
                  <div className="space-y-6">
                    <div className="relative rounded-xl overflow-hidden border-4 border-amber-500/30 shadow-2xl shadow-amber-500/20">
                      <img
                        src={generatedImage}
                        alt="Your cinematic transformation"
                        className="w-full h-auto"
                      />
                      <div className="absolute top-4 right-4 px-4 py-2 bg-gradient-to-r from-amber-600 to-red-600 rounded-full border border-amber-400/50 backdrop-blur">
                        <p className="text-white text-sm font-bold flex items-center gap-2">
                          <Sparkles className="w-4 h-4" />
                          PREMIERE READY
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Button 
                        onClick={handleDownload} 
                        size="lg"
                        className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-bold border border-amber-400/50 shadow-lg shadow-amber-500/30"
                      >
                        <Download className="w-5 h-5 mr-2" />
                        Save Masterpiece
                      </Button>
                      
                      <Button 
                        onClick={onTryAnotherStyle} 
                        size="lg"
                        variant="outline"
                        className="border-2 border-amber-600/50 text-amber-100 hover:bg-amber-600/10 hover:border-amber-500"
                      >
                        <RefreshCw className="w-5 h-5 mr-2" />
                        Another Style
                      </Button>
                      
                      <Button 
                        onClick={onNewPhoto} 
                        size="lg"
                        variant="outline"
                        className="border-2 border-zinc-600/50 text-zinc-300 hover:bg-zinc-600/10"
                      >
                        <Upload className="w-5 h-5 mr-2" />
                        New Photo
                      </Button>
                    </div>

                    {/* Share Prompt */}
                    <div className="text-center pt-4 border-t border-zinc-700/50">
                      <p className="text-sm text-amber-400/80 italic">
                        ✨ Your transformation is complete! Share your starring role with the world.
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Error State */
                  <div className="text-center py-16 space-y-6">
                    <div className="mx-auto w-20 h-20 rounded-full bg-red-500/10 border-2 border-red-500/30 flex items-center justify-center">
                      <RefreshCw className="w-10 h-10 text-red-400" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-xl font-semibold text-red-400">Transformation Interrupted</p>
                      <p className="text-sm text-zinc-400">The magic didn't quite work this time</p>
                    </div>
                    <Button 
                      onClick={generateCartoon}
                      size="lg"
                      className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500"
                    >
                      <Wand2 className="w-5 h-5 mr-2" />
                      Try the Magic Again
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
