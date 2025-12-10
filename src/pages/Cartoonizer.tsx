import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { LandingView } from "@/components/cartoonizer/LandingView";
import { UploadView } from "@/components/cartoonizer/UploadView";
import { StyleSelector } from "@/components/cartoonizer/StyleSelector";
import { GeneratePanel } from "@/components/cartoonizer/GeneratePanel";

type Step = "landing" | "upload" | "style" | "generate";

const Cartoonizer = () => {
  const [step, setStep] = useState<Step>("landing");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [uploadId, setUploadId] = useState<string | null>(null);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<string | null>(null);

  useEffect(() => {
    createSession();
  }, []);

  const createSession = async () => {
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
    }
  };

  const handleStart = () => {
    setStep("upload");
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {step === "landing" && (
        <LandingView onStart={handleStart} />
      )}
      
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
