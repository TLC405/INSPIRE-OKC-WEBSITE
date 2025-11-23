import { useState, useCallback } from "react";
import { Upload, Camera, Sparkles } from "lucide-react";
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
          faces_detected: 1, // Placeholder, will be detected by AI
        })
        .select()
        .single();

      if (dbError) throw dbError;

      toast.success("Image uploaded successfully!");
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
    <div className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 relative overflow-hidden">
      {/* Backstage Lighting */}
      <div className="absolute inset-0 bg-gradient-to-b from-red-950/20 via-transparent to-amber-950/20 pointer-events-none" />
      
      {/* Stage Spotlights */}
      <div className="absolute top-0 left-1/4 w-64 h-64 bg-amber-500/10 blur-3xl rounded-full" />
      <div className="absolute top-0 right-1/4 w-64 h-64 bg-red-500/10 blur-3xl rounded-full" />
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Backstage Header */}
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-2 bg-gradient-to-r from-amber-600/20 to-red-600/20 border border-amber-500/30 rounded-lg">
              <p className="text-amber-400 text-sm font-semibold tracking-wider flex items-center gap-2">
                <Camera className="w-4 h-4" />
                ACT I: CASTING CALL
              </p>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-b from-amber-200 to-amber-600 bg-clip-text text-transparent">
              Step Into The Spotlight
            </h2>
            
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">
              Upload a clear, well-lit photo of yourself to begin your transformation. 
              The better the photo, the more magical the result.
            </p>
          </div>

          {/* Director's Viewfinder Upload Area */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 to-red-500/20 blur-2xl" />
            
            <Card
              className={`relative p-12 border-2 transition-all duration-300 ${
                dragActive 
                  ? "border-amber-500 bg-amber-500/5 shadow-2xl shadow-amber-500/20" 
                  : "border-amber-600/30 bg-zinc-900/50 backdrop-blur-sm"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              {/* Corner Markers - Viewfinder Style */}
              <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-amber-500/60" />
              <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-amber-500/60" />
              <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-amber-500/60" />
              <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-amber-500/60" />
              
              <div className="text-center space-y-6">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/20 to-red-500/20 border-2 border-amber-500/40 flex items-center justify-center relative">
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-amber-500" />
                      <div className="absolute inset-0 bg-amber-500/20 blur-xl animate-pulse" />
                    </>
                  ) : (
                    <>
                      <Camera className="w-12 h-12 text-amber-400" />
                      <div className="absolute -inset-4 border-2 border-amber-500/20 rounded-full animate-ping" />
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-xl font-semibold text-amber-100">
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="w-5 h-5 animate-pulse" />
                        Preparing Your Close-Up...
                      </span>
                    ) : (
                      "Drop Your Headshot Here"
                    )}
                  </p>
                  <p className="text-sm text-zinc-400">
                    or click the button below to select from your device
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
                  <Button 
                    asChild 
                    disabled={uploading}
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-red-600 hover:from-amber-500 hover:to-red-500 text-white font-semibold shadow-lg shadow-amber-500/30 border border-amber-400/50"
                  >
                    <span>
                      <Upload className="w-5 h-5 mr-2" />
                      Choose Your Photo
                    </span>
                  </Button>
                </label>

                {/* Technical Specs */}
                <div className="pt-4 border-t border-zinc-700/50">
                  <p className="text-xs text-zinc-500 font-mono">
                    ACCEPTED FORMATS: JPG, PNG, WEBP, HEIC • MAX SIZE: 10MB
                  </p>
                  <p className="text-xs text-amber-500/70 mt-2 italic">
                    ✨ Pro tip: Use a well-lit, front-facing photo for best results
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Director's Notes */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="p-4 bg-zinc-900/30 border border-zinc-700/30 rounded-lg">
              <p className="text-amber-400 font-semibold mb-1">📸 Clear Photo</p>
              <p className="text-xs text-zinc-400">Front-facing, well-lit shot works best</p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-700/30 rounded-lg">
              <p className="text-amber-400 font-semibold mb-1">😊 Natural Expression</p>
              <p className="text-xs text-zinc-400">Your genuine smile or signature look</p>
            </div>
            <div className="p-4 bg-zinc-900/30 border border-zinc-700/30 rounded-lg">
              <p className="text-amber-400 font-semibold mb-1">⚡ High Quality</p>
              <p className="text-xs text-zinc-400">Larger files = better transformations</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
