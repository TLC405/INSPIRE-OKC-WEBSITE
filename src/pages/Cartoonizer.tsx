import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { UploadView } from "@/components/cartoonizer/UploadView";
import { StyleSelector } from "@/components/cartoonizer/StyleSelector";
import { GeneratePanel } from "@/components/cartoonizer/GeneratePanel";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

type Step = "upload" | "style" | "generate";

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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5">
        <div className="text-center space-y-3">
          <div className="h-12 w-12 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto" />
          <p className="text-muted-foreground">Preparing the Cartoonizer...</p>
        </div>
      </div>
    );
  }

  if (sessionError && !sessionId) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 px-4">
        <div className="max-w-md w-full text-center space-y-4 brutal-card p-8">
          <h1 className="text-2xl font-black uppercase">Cartoonizer Unavailable</h1>
          <p className="text-muted-foreground">
            {sessionError} We saved your place—hit retry to reconnect or head back home.
          </p>
          <div className="flex flex-col gap-3">
            <Button onClick={createSession} className="w-full brutal-btn">
              Retry Connection
            </Button>
            <Link to="/">
              <Button variant="outline" className="w-full brutal-border">
                Return Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
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
    </div>
  );
};

export default Cartoonizer;
