import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UploadView } from "@/components/cartoonizer/UploadView";
import { StyleSelector } from "@/components/cartoonizer/StyleSelector";
import { GeneratePanel } from "@/components/cartoonizer/GeneratePanel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ParticleCanvas } from "@/components/ui/ParticleCanvas";
import { ArrowLeft, Sparkles, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

type Step = "upload" | "style" | "generate";

const STEP_LABELS: Record<Step, string> = {
  upload: "Upload",
  style: "Style",
  generate: "Generate"
};

const Cartoonizer = () => {
  const [step, setStep] = useState<Step>("upload");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);
  const [initializing, setInitializing] = useState(true);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    createSession();
  }, []);

  const createSession = async () => {
    setInitializing(true);
    setSessionError(null);
    try {
      const { data, error } = await supabase
        .from("user_sessions")
        .insert({
          device: navigator.userAgent,
          user_agent: navigator.userAgent,
          referrer: document.referrer || null,
        })
        .select()
        .single();

      if (error) throw error;
      setSessionId(data.id);

      await supabase.from("events").insert({
        session_id: data.id,
        event_type: "VISIT",
        event_data: { timestamp: new Date().toISOString() },
      });
    } catch (error) {
      console.error("Error creating session:", error);
      toast.error("Failed to initialize session");
      setSessionError("We couldn't connect to the server. Try again or come back later.");
    }
    setInitializing(false);
  };

  const handleUploadComplete = (url: string, id: string) => {
    setUploadUrl(url);
    setUploadId(id);
    setStep("style");
  };

  const handleStyleSelect = (styleId: string) => {
    setSelectedStyle(styleId);
    setStep("generate");
  };

  const handleTryAnotherStyle = () => {
    setSelectedStyle(null);
    setStep("style");
  };

  const handleNewPhoto = () => {
    setUploadUrl(null);
    setUploadId(null);
    setSelectedStyle(null);
    setStep("upload");
  };

  if (initializing) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background relative overflow-hidden">
        <ParticleCanvas particleCount={100} className="absolute inset-0" />
        <div className="text-center space-y-4 relative z-10">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground font-mono text-sm uppercase tracking-widest">
            Initializing TeeFeeMe-5000...
          </p>
        </div>
      </div>
    );
  }

  if (sessionError && !sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4 relative overflow-hidden">
        <ParticleCanvas particleCount={50} className="absolute inset-0" />
        <div className="max-w-md w-full brutal-card text-center space-y-6 relative z-10">
          <div className="w-16 h-16 mx-auto border-4 border-destructive flex items-center justify-center">
            <Zap className="w-8 h-8 text-destructive" />
          </div>
          <h1 className="text-2xl font-black uppercase">Connection Failed</h1>
          <p className="text-muted-foreground font-mono text-sm">
            {sessionError} We saved your place—hit retry to reconnect or head back home.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={createSession} className="brutal-btn w-full">
              Retry Connection
            </Button>
            <Link to="/">
              <Button variant="outline" className="w-full border-4 border-foreground font-black uppercase">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background relative">
      {/* Background particles */}
      <ParticleCanvas 
        particleCount={80} 
        className="fixed inset-0 pointer-events-none" 
        speed={0.2}
      />

      {/* Header */}
      <header className="sticky top-0 z-50 border-b-4 border-foreground bg-background/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Back link */}
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 font-mono text-sm uppercase tracking-wider hover:text-primary transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>

            {/* Logo */}
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-primary" />
              <span className="font-black uppercase tracking-tight">TeeFeeMe-5000</span>
            </div>

            {/* Step indicator */}
            <div className="flex items-center gap-1">
              {(["upload", "style", "generate"] as Step[]).map((s, i) => (
                <div 
                  key={s}
                  className={cn(
                    "flex items-center",
                    i > 0 && "ml-1"
                  )}
                >
                  {i > 0 && (
                    <div className={cn(
                      "w-4 h-0.5 mr-1",
                      (["upload", "style", "generate"] as Step[]).indexOf(step) >= i 
                        ? "bg-primary" 
                        : "bg-border"
                    )} />
                  )}
                  <div className={cn(
                    "w-8 h-8 border-2 flex items-center justify-center font-mono text-xs font-bold",
                    step === s 
                      ? "border-primary bg-primary text-primary-foreground" 
                      : (["upload", "style", "generate"] as Step[]).indexOf(step) > i
                        ? "border-primary text-primary"
                        : "border-border text-muted-foreground"
                  )}>
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10">
        {step === "upload" && sessionId && (
          <UploadView 
            sessionId={sessionId}
            onUploadComplete={handleUploadComplete}
          />
        )}
        
        {step === "style" && (
          <StyleSelector 
            onStyleSelect={handleStyleSelect}
          />
        )}
        
        {step === "generate" && sessionId && uploadId && selectedStyle && uploadUrl && (
          <GeneratePanel 
            sessionId={sessionId}
            uploadId={uploadId}
            uploadUrl={uploadUrl}
            styleId={selectedStyle}
            onTryAnotherStyle={handleTryAnotherStyle}
            onNewPhoto={handleNewPhoto}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t-4 border-border py-4 mt-8">
        <div className="container mx-auto px-4">
          <p className="text-center text-xs text-muted-foreground font-mono uppercase tracking-widest">
            TLC_STUDIO • OS_TLC_ARCH_v6.0 • Lat_35.4676°N • Lon_97.5164°W
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Cartoonizer;
