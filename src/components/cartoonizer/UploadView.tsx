import { useState, useCallback } from "react";
import { Upload, Camera, Shield, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

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
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            Step 1 of 3
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Upload Your <span className="tfm-gradient-text">Photo</span>
          </h2>
          <p className="text-muted-foreground max-w-md mx-auto">
            Choose a clear photo with your face visible. We'll preserve every unique detail.
          </p>
        </div>

        {/* Upload Zone */}
        <div
          className={`
            relative rounded-3xl overflow-hidden transition-all duration-500
            ${dragActive 
              ? "scale-[1.02]" 
              : ""
            }
          `}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          {/* Animated gradient border */}
          <div className={`
            absolute inset-0 rounded-3xl p-[2px] transition-opacity duration-300
            ${dragActive ? "opacity-100" : "opacity-0"}
          `}>
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-primary via-accent to-secondary animate-spin" 
                 style={{ animationDuration: '3s' }} />
          </div>

          {/* Card Content */}
          <div className={`
            relative glass rounded-3xl p-8 md:p-12 border-2 border-dashed transition-all duration-300
            ${dragActive 
              ? "border-primary bg-primary/5" 
              : "border-border hover:border-primary/50"
            }
          `}>
            {preview ? (
              // Preview State
              <div className="space-y-6">
                <div className="relative aspect-square max-w-sm mx-auto rounded-2xl overflow-hidden">
                  <img 
                    src={preview} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                  />
                  {uploading && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <div className="relative">
                        <div className="w-16 h-16 rounded-full border-4 border-white/30 border-t-white animate-spin" />
                        <Camera className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                </div>
                <p className="text-center text-sm text-muted-foreground">
                  {uploading ? "Uploading your photo..." : "Ready to transform!"}
                </p>
              </div>
            ) : (
              // Upload State
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className={`
                  mx-auto w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300
                  ${dragActive 
                    ? "bg-primary/20 scale-110" 
                    : "bg-muted"
                  }
                `}>
                  <Camera className={`
                    w-12 h-12 transition-all duration-300
                    ${dragActive ? "text-primary scale-110" : "text-muted-foreground"}
                  `} />
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <p className="text-xl font-semibold">
                    {dragActive ? "Drop it like it's hot! 🔥" : "Drop your photo here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click the button below to browse
                  </p>
                </div>

                {/* Upload Button */}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />
                <label htmlFor="file-upload">
                  <Button asChild disabled={uploading} size="lg" className="shadow-lg shadow-primary/25">
                    <span className="cursor-pointer">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose Photo
                    </span>
                  </Button>
                </label>

                {/* File info */}
                <div className="pt-4 flex flex-wrap justify-center gap-4 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                    JPG, PNG, WEBP, HEIC
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    Max 10MB
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* FaceLock Promise */}
        <div className="glass rounded-2xl p-5 flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
            <Shield className="w-5 h-5 text-primary" />
          </div>
          <div className="space-y-1">
            <p className="font-semibold text-sm">FaceLock Promise</p>
            <p className="text-sm text-muted-foreground">
              Your rings, tattoos, glasses, and all unique features will be preserved in every transformation. We keep what makes you, you.
            </p>
          </div>
        </div>

        {/* Tips */}
        <div className="grid grid-cols-3 gap-4 text-center">
          {[
            { emoji: "☀️", tip: "Good lighting" },
            { emoji: "👤", tip: "Face visible" },
            { emoji: "📷", tip: "Clear focus" },
          ].map((item) => (
            <div key={item.tip} className="space-y-1">
              <span className="text-2xl">{item.emoji}</span>
              <p className="text-xs text-muted-foreground">{item.tip}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
