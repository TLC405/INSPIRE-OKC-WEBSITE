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
      setProgress((prev) => {
        const newProgress = Math.min(prev + 10, 90);
        setCurrentMessage(Math.floor((newProgress / 100) * transformationMessages.length));
        return newProgress;
      });
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

  const transformationMessages = [
    "Sculpting your cartoon form...",
    "Applying animation magic...",
    "Fine-tuning your character...",
    "Adding the final touches...",
    "Almost ready for the premiere...",
  ];

  const [currentMessage, setCurrentMessage] = useState(0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 relative overflow-hidden">
      {/* Soundstage Spotlights */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-1/4 w-64 h-64 bg-yellow-500/20 rounded-full blur-[150px] animate-spotlight" />
        <div className="absolute top-20 right-1/4 w-72 h-72 bg-purple-500/20 rounded-full blur-[150px] animate-spotlight" style={{ animationDelay: "1s" }} />
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-blue-500/20 rounded-full blur-[120px] animate-spotlight" style={{ animationDelay: "2s" }} />
        
        {/* Animated Sparkles */}
        <div className="absolute top-20 left-10 animate-float">
          <Sparkles className="w-12 h-12 text-yellow-300" />
        </div>
        <div className="absolute top-40 right-20 animate-wiggle">
          <Sparkles className="w-10 h-10 text-purple-300" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce">
          <Sparkles className="w-8 h-8 text-blue-300" />
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-6">
            <div className="inline-block px-10 py-5 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 rounded-3xl border-4 border-white/40 shadow-2xl backdrop-blur-sm">
              <p className="text-white text-xl font-black tracking-widest uppercase flex items-center gap-3">
                <Sparkles className="w-6 h-6 animate-spin" />
                {generating ? "The Animator's Desk" : "Premiere Complete"}
                <Sparkles className="w-6 h-6 animate-spin" />
              </p>
            </div>

            <h2 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-300 via-purple-400 to-blue-400 drop-shadow-[0_0_40px_rgba(255,255,255,0.4)]">
              {generating ? "Transforming..." : "Standing Ovation! 🎬"}
            </h2>

            <p className="text-white text-2xl font-bold drop-shadow-lg">
              {generating ? transformationMessages[Math.min(currentMessage, transformationMessages.length - 1)] : `You're now a ${styleNames[styleId]}!`}
            </p>
          </div>

          {/* Generation Area */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Original Photo - Film Reel Frame */}
            <Card className="border-4 border-white/40 rounded-3xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 shadow-2xl backdrop-blur-sm">
              <div className="p-5 bg-gradient-to-r from-gray-700 to-gray-800 border-b-4 border-white/30">
                <p className="text-center font-black text-2xl text-white drop-shadow-lg">🎬 Before</p>
              </div>
              <div className="p-8">
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 to-purple-500 rounded-2xl blur opacity-50" />
                  <img
                    src={uploadUrl}
                    alt="Original"
                    className="relative w-full h-auto rounded-2xl border-4 border-white/30"
                  />
                </div>
              </div>
            </Card>

            {/* Generated Cartoon - Cel Animation Frame */}
            <Card className="border-4 border-yellow-400 rounded-3xl overflow-hidden bg-gradient-to-br from-purple-900 to-blue-900 shadow-[0_0_50px_rgba(234,179,8,0.5)] backdrop-blur-sm">
              <div className="p-5 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 border-b-4 border-yellow-300">
                <p className="text-center font-black text-2xl text-white drop-shadow-lg">✨ After</p>
              </div>
              <div className="p-8">
                {generating ? (
                  <div className="aspect-square rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900 flex flex-col items-center justify-center space-y-8 border-4 border-white/20 relative overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0">
                      <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 via-purple-500/20 to-blue-500/20 animate-pulse" />
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent animate-[shimmer_2s_infinite]" />
                    </div>
                    
                    <Loader2 className="w-24 h-24 text-yellow-400 animate-spin relative z-10 drop-shadow-[0_0_20px_rgba(234,179,8,0.8)]" />
                    <div className="text-center space-y-3 relative z-10">
                      <p className="text-4xl font-black text-white drop-shadow-lg">
                        {progress}%
                      </p>
                      <p className="text-white/90 font-bold text-lg animate-pulse">
                        {transformationMessages[Math.min(currentMessage, transformationMessages.length - 1)]}
                      </p>
                    </div>
                    <div className="w-3/4 h-6 bg-gray-800 rounded-full overflow-hidden border-2 border-white/30 relative z-10">
                      <div
                        className="h-full bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 transition-all duration-500 rounded-full shadow-[0_0_20px_rgba(234,179,8,0.6)]"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  </div>
                ) : generatedUrl ? (
                  <div className="relative animate-fade-in">
                    <div className="absolute -inset-1 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 rounded-2xl blur opacity-75 animate-pulse" />
                    <img
                      src={generatedUrl}
                      alt="Generated cartoon"
                      className="relative w-full h-auto rounded-2xl border-4 border-yellow-300 shadow-2xl"
                    />
                  </div>
                ) : null}
              </div>
            </Card>
          </div>

          {/* Studio Control Buttons */}
          {!generating && generatedUrl && (
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                onClick={handleDownload}
                size="lg"
                className="text-2xl px-12 py-8 bg-gradient-to-r from-yellow-400 via-purple-500 to-blue-500 hover:from-yellow-300 hover:via-purple-400 hover:to-blue-400 text-white font-black rounded-full transform hover:scale-110 border-4 border-white/40 shadow-[0_0_40px_rgba(234,179,8,0.6)] transition-all duration-300"
              >
                <Download className="w-7 h-7 mr-3" />
                Download Masterpiece
              </Button>

              <Button
                onClick={onTryAnotherStyle}
                size="lg"
                className="text-xl px-10 py-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border-4 border-white/30 transform hover:scale-105 transition-all"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Different Style
              </Button>

              <Button
                onClick={onNewPhoto}
                size="lg"
                className="text-xl px-10 py-8 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-full border-4 border-white/30 transform hover:scale-105 transition-all"
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
