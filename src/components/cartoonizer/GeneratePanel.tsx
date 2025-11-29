import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Loader2, Download, Sparkles, RotateCcw, Camera } from "lucide-react";
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
  const [generatedUrl, setGeneratedUrl] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    generateCartoon();
  }, []);

  const generateCartoon = async () => {
    setGenerating(true);
    setProgress(0);

    const progressInterval = setInterval(() => {
      setProgress((prev) => Math.min(prev + 10, 90));
    }, 500);

    try {
      const { data, error } = await supabase.functions.invoke("generate-cartoon", {
        body: { imageUrl: uploadUrl, styleId },
      });

      clearInterval(progressInterval);

      if (error) throw error;

      setProgress(100);
      setGeneratedUrl(data.imageUrl);
      toast.success("Your cartoon transformation is ready!");
    } catch (error) {
      clearInterval(progressInterval);
      console.error("Generation error:", error);
      toast.error("Transformation failed. Let's try again!");
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
      a.download = `storyweave-cartoon-${Date.now()}.png`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      toast.success("Downloaded your cartoon masterpiece!");
    } catch (error) {
      console.error("Download error:", error);
      toast.error("Download failed. Please try again!");
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
    <div className="min-h-screen bg-gradient-to-br from-background via-cartoon-splash/10 to-background relative overflow-hidden">
      {/* Floating celebration elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="w-12 h-12 text-cartoon-pop" />
        </div>
        <div className="absolute top-40 right-20 animate-wiggle">
          <Sparkles className="w-10 h-10 text-cartoon-zap" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce">
          <Sparkles className="w-8 h-8 text-cartoon-splash" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cartoon-splash/20 to-cartoon-pow/20 border-3 border-cartoon-splash/40 rounded-2xl">
              <p className="text-cartoon-splash text-base font-black tracking-wider flex items-center gap-2">
                <Sparkles className="w-5 h-5 animate-spin" />
                {generating ? "TRANSFORMATION IN PROGRESS" : "STEP 3: YOUR CARTOON AWAITS"}
              </p>
            </div>

            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash bg-clip-text text-transparent">
              {generating ? "Creating Magic..." : "Ta-Da! 🎉"}
            </h2>

            <p className="text-foreground text-xl font-medium">
              {generating ? "AI is working its magic..." : `You're now a ${styleNames[styleId]}!`}
            </p>
          </div>

          {/* Generation Area */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Original Photo */}
            <Card className="border-4 border-border rounded-3xl overflow-hidden bg-card shadow-2xl">
              <div className="p-4 bg-muted border-b-4 border-border">
                <p className="text-center font-black text-lg text-foreground">Original You</p>
              </div>
              <div className="p-6">
                <img
                  src={uploadUrl}
                  alt="Original"
                  className="w-full h-auto rounded-2xl border-3 border-border"
                />
              </div>
            </Card>

            {/* Generated Cartoon */}
            <Card className="border-4 border-cartoon-pop rounded-3xl overflow-hidden bg-card shadow-2xl">
              <div className="p-4 bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash border-b-4 border-cartoon-pop">
                <p className="text-center font-black text-lg text-white">Cartoon You!</p>
              </div>
              <div className="p-6">
                {generating ? (
                  <div className="aspect-square rounded-2xl bg-muted flex flex-col items-center justify-center space-y-6 border-3 border-border">
                    <Loader2 className="w-20 h-20 text-cartoon-pop animate-spin" />
                    <div className="text-center space-y-2">
                      <p className="text-2xl font-black text-foreground">
                        {progress}%
                      </p>
                      <p className="text-muted-foreground font-semibold">
                        Applying cartoon magic...
                      </p>
                    </div>
                    <div className="w-3/4 h-4 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash transition-all duration-300 rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : generatedUrl ? (
                  <img
                    src={generatedUrl}
                    alt="Generated cartoon"
                    className="w-full h-auto rounded-2xl border-3 border-cartoon-pop"
                  />
                ) : null}
              </div>
            </Card>
          </div>

          {/* Action Buttons */}
          {!generating && generatedUrl && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleDownload}
                size="lg"
                className="text-xl px-8 py-6 bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash hover:from-cartoon-splash hover:via-cartoon-pop hover:to-cartoon-zap text-white font-black rounded-2xl transform hover:scale-105 border-3 border-foreground/20"
              >
                <Download className="w-6 h-6 mr-2" />
                Download My Cartoon!
              </Button>

              <Button
                onClick={onTryAnotherStyle}
                size="lg"
                variant="outline"
                className="text-xl px-8 py-6 font-bold rounded-2xl border-3 transform hover:scale-105"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Try Another Style
              </Button>

              <Button
                onClick={onNewPhoto}
                size="lg"
                variant="outline"
                className="text-xl px-8 py-6 font-bold rounded-2xl border-3 transform hover:scale-105"
              >
                <Camera className="w-6 h-6 mr-2" />
                New Photo
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
