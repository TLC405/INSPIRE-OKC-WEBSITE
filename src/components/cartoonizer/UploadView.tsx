import { useState, useCallback } from "react";
import { Upload, Camera, Shield, Sparkles, Zap, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface UploadViewProps {
  sessionId: string;
  onUploadComplete: (url: string, uploadId: string) => void;
}

export const UploadView = ({ sessionId, onUploadComplete }: UploadViewProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFile = async (file: File) => {
    if (!file.type.match(/image\/(jpeg|jpg|png|webp|heic)/)) {
      toast.error("Please upload JPG, PNG, WEBP, or HEIC images only");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    // Show preview immediately
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
    setUploading(true);

    try {
      await supabase.from("events").insert({
        session_id: sessionId,
        event_type: "UPLOAD_PHOTO",
        event_data: { 
          file_size: file.size,
          file_type: file.type,
        },
      });

      const fileName = `${sessionId}/${Date.now()}-${file.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from("cartoons")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from("cartoons")
        .getPublicUrl(fileName);

      const { data: uploadData, error: dbError } = await supabase
        .from("uploads")
        .insert({
          session_id: sessionId,
          file_url: publicUrl,
          file_size: file.size,
          faces_detected: 1,
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast.success("Photo ready for transformation!");
      onUploadComplete(publicUrl, uploadData.id);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to upload image");
      setPreview(null);
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header - Brutal style */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 brutal-border bg-card font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Step_01 / 03</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Upload Your <span className="okc-gradient-text">Photo</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto font-mono text-sm">
            Choose a clear photo with your face visible. We'll preserve every unique detail.
          </p>
        </div>

        {/* Upload Zone - Brutal Card */}
        <div
          className={cn(
            "relative transition-all duration-300",
            dragActive && "scale-[1.02]"
          )}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Scanning animation border */}
          <div className={cn(
            "absolute inset-0 pointer-events-none transition-opacity duration-300",
            dragActive ? "opacity-100" : "opacity-0"
          )}>
            <div className="absolute inset-0 border-4 border-primary animate-pulse" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-primary animate-scan" />
          </div>

          {/* Card Content */}
          <div className={cn(
            "brutal-card relative transition-all duration-300",
            dragActive 
              ? "border-primary bg-primary/5" 
              : "hover:translate-x-[-2px] hover:translate-y-[-2px]"
          )}>
            {/* Noise texture */}
            <div className="absolute inset-0 noise pointer-events-none opacity-50" />

            {preview ? (
              // Preview State
              <div className="relative z-10 space-y-6 p-4 md:p-8">
                <div className="relative aspect-square max-w-sm mx-auto border-4 border-foreground overflow-hidden">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                      <div className="relative">
                        {/* Animated upload indicator */}
                        <div className="w-20 h-20 border-4 border-primary border-t-transparent animate-spin" />
                        <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-primary" />
                      </div>
                    </div>
                  )}
                  {/* Corner accents */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-4 border-l-4 border-primary" />
                  <div className="absolute top-0 right-0 w-4 h-4 border-t-4 border-r-4 border-primary" />
                  <div className="absolute bottom-0 left-0 w-4 h-4 border-b-4 border-l-4 border-primary" />
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-4 border-r-4 border-primary" />
                </div>
                <p className="text-center font-mono text-sm text-muted-foreground uppercase tracking-wider">
                  {uploading ? "[ UPLOADING... ]" : "[ READY TO TRANSFORM ]"}
                </p>
              </div>
            ) : (
              // Upload State
              <div className="relative z-10 text-center space-y-6 p-6 md:p-10">
                {/* Icon with glow */}
                <div className={cn(
                  "mx-auto w-28 h-28 border-4 border-foreground flex items-center justify-center transition-all duration-300",
                  dragActive 
                    ? "bg-primary/20 neon-glow border-primary" 
                    : "bg-muted"
                )}>
                  <Camera className={cn(
                    "w-14 h-14 transition-all duration-300",
                    dragActive ? "text-primary animate-pulse" : "text-muted-foreground"
                  )} />
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <p className="text-xl md:text-2xl font-black uppercase tracking-tight">
                    {dragActive ? "Drop it like it's hot! 🔥" : "Drop your photo here"}
                  </p>
                  <p className="text-sm text-muted-foreground font-mono">
                    or click the button below to browse
                  </p>
                </div>

                {/* Upload Button - Brutal style */}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label htmlFor="file-upload">
                  <Button 
                    asChild 
                    disabled={uploading} 
                    size="lg" 
                    className="brutal-btn cursor-pointer text-base"
                  >
                    <span>
                      <Upload className="w-5 h-5 mr-2" />
                      Choose Photo
                    </span>
                  </Button>
                </label>

                {/* File type pills */}
                <div className="pt-4 flex flex-wrap justify-center gap-3 text-xs font-mono">
                  {[
                    { type: "JPG", color: "bg-green-500" },
                    { type: "PNG", color: "bg-blue-500" },
                    { type: "WEBP", color: "bg-purple-500" },
                    { type: "HEIC", color: "bg-amber-500" },
                  ].map((item) => (
                    <span 
                      key={item.type}
                      className="flex items-center gap-1.5 px-2 py-1 border-2 border-foreground bg-card"
                    >
                      <span className={cn("w-2 h-2", item.color)} />
                      {item.type}
                    </span>
                  ))}
                  <span className="flex items-center gap-1.5 px-2 py-1 border-2 border-muted-foreground text-muted-foreground">
                    MAX 10MB
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FaceLock Promise - Brutal card */}
        <div className="brutal-card flex items-start gap-4 p-5">
          <div className="w-12 h-12 border-4 border-foreground bg-primary flex items-center justify-center shrink-0">
            <Shield className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="space-y-1">
            <p className="font-black uppercase tracking-wide text-sm flex items-center gap-2">
              FaceLock Promise
              <Zap className="w-4 h-4 text-primary" />
            </p>
            <p className="text-sm text-muted-foreground font-mono">
              Your rings, tattoos, glasses, and all unique features will be preserved in every transformation. We keep what makes you, you.
            </p>
          </div>
        </div>

        {/* Tips - Brutal grid */}
        <div className="grid grid-cols-3 gap-3">
          {[
            { emoji: "☀️", tip: "Good lighting", icon: Star },
            { emoji: "👤", tip: "Face visible", icon: Camera },
            { emoji: "📷", tip: "Clear focus", icon: Zap },
          ].map((item) => (
            <div 
              key={item.tip} 
              className="border-2 border-border p-4 text-center space-y-2 hover:border-primary transition-colors group"
            >
              <span className="text-3xl block group-hover:animate-bounce-subtle">{item.emoji}</span>
              <p className="text-xs text-muted-foreground font-mono uppercase tracking-wider">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
