import { useState, useCallback } from "react";
import { Upload, Image as ImageIcon, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UploadViewProps {
  sessionId: string;
  onUploadComplete: (url: string, uploadId: string) => void;
}

export const UploadView = ({ sessionId, onUploadComplete }: UploadViewProps) => {
  const [uploading, setUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.match(/image\/(jpeg|jpg|png|webp|heic)/)) {
      toast.error("Please upload JPG, PNG, WEBP, or HEIC images only");
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      toast.error("File size must be less than 10MB");
      return;
    }

    setUploading(true);

    try {
      // Track upload event
      await supabase.from("events").insert({
        session_id: sessionId,
        event_type: "UPLOAD_PHOTO",
        event_data: { 
          file_size: file.size,
          file_type: file.type,
        },
      });

      // Upload to storage
      const fileName = `${sessionId}/${Date.now()}-${file.name}`;
      const { error: uploadError, data } = await supabase.storage
        .from("cartoons")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: { publicUrl } } = supabase.storage
        .from("cartoons")
        .getPublicUrl(fileName);

      // Save upload record
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
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">Upload Your Photo</h2>
          <p className="text-muted-foreground">
            Choose a clear photo with your face visible. We'll preserve every detail.
          </p>
        </div>

        <Card
          className={`p-8 md:p-12 border-2 border-dashed transition-all duration-300 ${
            dragActive 
              ? "border-primary bg-primary/5 scale-[1.02]" 
              : "border-border hover:border-primary/50"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
        >
          <div className="text-center space-y-6">
            <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              uploading 
                ? "bg-primary/20" 
                : dragActive 
                  ? "bg-primary/20 scale-110" 
                  : "bg-muted"
            }`}>
              {uploading ? (
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary" />
              ) : (
                <Camera className={`w-10 h-10 transition-colors ${dragActive ? "text-primary" : "text-muted-foreground"}`} />
              )}
            </div>

            <div className="space-y-2">
              <p className="text-lg font-medium">
                {uploading ? "Processing your photo..." : "Drop your photo here"}
              </p>
              <p className="text-sm text-muted-foreground">
                or click to browse your device
              </p>
            </div>

            <input
              type="file"
              accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
              onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
              className="hidden"
              id="file-upload"
              disabled={uploading}
            />

            <label htmlFor="file-upload">
              <Button asChild disabled={uploading} size="lg">
                <span className="cursor-pointer">
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Photo
                </span>
              </Button>
            </label>

            <div className="pt-4 space-y-2">
              <p className="text-xs text-muted-foreground">
                Accepts: JPG, PNG, WEBP, HEIC • Max size: 10MB
              </p>
              <p className="text-xs text-muted-foreground">
                ✨ Tip: Clear lighting and front-facing photos work best
              </p>
            </div>
          </div>
        </Card>

        {/* FaceLock Promise */}
        <div className="bg-muted/50 rounded-lg p-4 text-center">
          <p className="text-sm text-muted-foreground">
            <span className="font-medium text-foreground">FaceLock Promise:</span> Your rings, tattoos, glasses, 
            and all unique features will be preserved in the transformation.
          </p>
        </div>
      </div>
    </div>
  );
};