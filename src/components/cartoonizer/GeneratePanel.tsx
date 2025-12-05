import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Download, Sparkles, RotateCcw, Camera, Share2 } from "lucide-react";
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
  "ADULT-A5": "King of the Hill Cartoon",
  "ADULT-A6": "Ren & Stimpy Cartoon",
  "ADULT-A7": "Beavis & Butthead Cartoon",
  "KIDS-K1": "SpongeBob Cartoon",
  "KIDS-K2": "Pokémon Cartoon",
  "KIDS-K3": "Classic Disney Cartoon",
  "KIDS-K4": "Peppa Pig Cartoon",
  "KIDS-K5": "Doraemon Cartoon",
};

const GENERATION_MESSAGES = [
  "Analyzing facial features...",
  "Applying style transformation...",
  "Preserving your identity...",
  "Adding artistic details...",
  "Finalizing your cartoon...",
];

export const GeneratePanel = ({
  sessionId,
  uploadId,
  uploadUrl,
  styleId,
  onTryAnotherStyle,
  onNewPhoto,
}: GeneratePanelProps) => {
  const [generating, setGenerating] = useState(true);
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  useEffect(() => {
    generateCartoon();
  }, []);

  const generateCartoon = async () => {
    setGenerating(true);
    setProgress(0);
    setMessageIndex(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        const newProgress = Math.min(prev + Math.random() * 15, 90);
        setMessageIndex(Math.floor((newProgress / 100) * GENERATION_MESSAGES.length));
        return newProgress;
      });
    }, 600);

    try {
      const { data, error } = await supabase.functions.invoke("generate-cartoon", {
        body: { imageUrl: uploadUrl, styleId },
      });

      clearInterval(progressInterval);

      if (error) throw error;

      setProgress(100);
      setGeneratedUrl(data.imageUrl);
      toast.success("Your cartoon is ready!");
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Generation error:", error);
      toast.error("Generation failed. Please try again.");
      setGenerating(false);
    } finally {
      setGenerating(false);
    }
  };

  const handleDownload = async () => {
    if (!generatedUrl) return;

    try {
      const response = await fetch(generatedUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `cartoon-${STYLE_NAMES[styleId]?.toLowerCase().replace(/\s+/g, "-")}-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Downloaded!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[150px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-secondary/15 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">3</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">
                {generating ? "Generating" : "Complete"}
              </span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              {generating ? "Creating Your Cartoon..." : "Your Cartoon is Ready!"}
            </h2>
            <p className="text-muted-foreground">
              {generating 
                ? GENERATION_MESSAGES[Math.min(messageIndex, GENERATION_MESSAGES.length - 1)]
                : `Transformed into ${STYLE_NAMES[styleId]} style`
              }
            </p>
          </div>

          {/* Image Comparison */}
          <div 
            className="grid md:grid-cols-2 gap-6 mb-10 animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            {/* Original */}
            <div className="premium-card overflow-hidden">
              <div className="px-4 py-3 border-b border-white/10">
                <p className="text-sm font-medium text-muted-foreground">Original</p>
              </div>
              <div className="p-4">
                <div className="relative rounded-xl overflow-hidden">
                  <img
                    src={uploadUrl}
                    alt="Original"
                    className="w-full h-auto"
                  />
                </div>
              </div>
            </div>

            {/* Generated */}
            <div className="premium-card overflow-hidden border-primary/30">
              <div className="px-4 py-3 border-b border-white/10 bg-gradient-to-r from-primary/10 to-accent/10">
                <p className="text-sm font-medium text-foreground flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-primary" />
                  {STYLE_NAMES[styleId]}
                </p>
              </div>
              <div className="p-4">
                {generating ? (
                  <div className="aspect-square rounded-xl bg-muted/50 flex flex-col items-center justify-center space-y-6">
                    {/* Loader */}
                    <div className="relative">
                      <div className="absolute inset-0 bg-primary/20 rounded-full blur-xl animate-pulse-glow" />
                      <div className="relative w-16 h-16 rounded-full border-2 border-primary/30 border-t-primary animate-spin" />
                    </div>
                    
                    {/* Progress */}
                    <div className="w-full max-w-xs space-y-2">
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-500 rounded-full"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                      <p className="text-xs text-center text-muted-foreground">
                        {Math.round(progress)}%
                      </p>
                    </div>
                  </div>
                ) : generatedUrl ? (
                  <div className="relative rounded-xl overflow-hidden animate-scale-in">
                    <div className="absolute -inset-1 bg-gradient-to-r from-primary/50 to-accent/50 rounded-xl blur-md opacity-50" />
                    <img
                      src={generatedUrl}
                      alt="Generated cartoon"
                      className="relative w-full h-auto rounded-xl"
                    />
                  </div>
                ) : null}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          {!generating && generatedUrl && (
            <div 
              className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-up"
              style={{ animationDelay: "0.2s" }}
            >
              <Button
                onClick={handleDownload}
                size="lg"
                className="premium-button px-8 py-6 h-auto text-lg"
              >
                <Download className="w-5 h-5 mr-2" />
                Download
              </Button>

              <Button
                onClick={onTryAnotherStyle}
                size="lg"
                variant="outline"
                className="glass border-white/20 hover:bg-white/10 px-6 py-6 h-auto"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Try Another Style
              </Button>

              <Button
                onClick={onNewPhoto}
                size="lg"
                variant="outline"
                className="glass border-white/20 hover:bg-white/10 px-6 py-6 h-auto"
              >
                <Camera className="w-5 h-5 mr-2" />
                New Photo
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
