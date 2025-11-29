import { useState, useCallback } from "react";
import { Upload, Camera, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
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
      // Convert to base64 for in-memory storage
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        const uploadId = crypto.randomUUID();
        
        toast.success("Image ready! Let's pick your style!");
        onUploadComplete(base64, uploadId);
        setUploading(false);
      };
      reader.onerror = () => {
        toast.error("Failed to read image");
        setUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error("Upload error:", error);
      toast.error("Failed to process image");
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
    <div className="min-h-screen bg-gradient-to-br from-background via-cartoon-splash/10 to-background relative overflow-hidden">
      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 animate-float">
          <Camera className="w-12 h-12 text-cartoon-pop" />
        </div>
        <div className="absolute top-40 right-20 animate-wiggle">
          <Camera className="w-10 h-10 text-cartoon-zap" />
        </div>
        <div className="absolute bottom-32 left-1/4 animate-bounce">
          <Sparkles className="w-8 h-8 text-cartoon-splash" />
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block px-6 py-3 bg-gradient-to-r from-cartoon-splash/20 to-cartoon-pow/20 border-3 border-cartoon-splash/40 rounded-2xl">
              <p className="text-cartoon-splash text-base font-black tracking-wider flex items-center gap-2">
                <Camera className="w-5 h-5" />
                STEP 1: UPLOAD YOUR PHOTO
              </p>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-black bg-gradient-to-r from-cartoon-splash via-cartoon-pow to-cartoon-pop bg-clip-text text-transparent">
              Show Us Your Best Smile!
            </h2>
            
            <p className="text-foreground text-xl font-medium">
              Upload a clear photo of yourself for the best cartoon transformation
            </p>
          </div>

          {/* Upload Area */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cartoon-pop/20 to-cartoon-splash/20 blur-2xl" />
            
            <Card
              className={`relative p-12 border-4 transition-all duration-300 ${
                dragActive 
                  ? "border-cartoon-pop bg-cartoon-pop/5 shadow-2xl shadow-cartoon-pop/20" 
                  : "border-border bg-card backdrop-blur-sm"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
            >
              <div className="text-center space-y-6">
                <div className="mx-auto w-24 h-24 rounded-full bg-gradient-to-br from-cartoon-pop/20 to-cartoon-splash/20 border-4 border-cartoon-pop/40 flex items-center justify-center relative">
                  {uploading ? (
                    <>
                      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cartoon-pop" />
                      <div className="absolute inset-0 bg-cartoon-pop/20 blur-xl animate-pulse" />
                    </>
                  ) : (
                    <>
                      <Camera className="w-12 h-12 text-cartoon-pop" />
                      <div className="absolute -inset-4 border-4 border-cartoon-pop/20 rounded-full animate-ping" />
                    </>
                  )}
                </div>

                <div className="space-y-3">
                  <p className="text-2xl font-black text-foreground">
                    {uploading ? (
                      <span className="flex items-center justify-center gap-2">
                        <Sparkles className="w-6 h-6 animate-pulse" />
                        Preparing Your Photo...
                      </span>
                    ) : (
                      "Drop Your Photo Here"
                    )}
                  </p>
                  <p className="text-muted-foreground">
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
                    className="bg-gradient-to-r from-cartoon-pop via-cartoon-pow to-cartoon-splash hover:from-cartoon-splash hover:via-cartoon-pop hover:to-cartoon-zap text-white font-black border-3 border-foreground/20 rounded-xl"
                  >
                    <span>
                      <Upload className="w-5 h-5 mr-2" />
                      Choose Your Photo
                    </span>
                  </Button>
                </label>

                {/* Tips */}
                <div className="pt-6 border-t-2 border-border">
                  <p className="text-xs text-muted-foreground font-mono mb-3">
                    ACCEPTED FORMATS: JPG, PNG, WEBP, HEIC • MAX SIZE: 10MB
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs">
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="font-bold text-cartoon-pop mb-1">📸 Clear Photo</p>
                      <p className="text-muted-foreground">Front-facing, well-lit</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="font-bold text-cartoon-zap mb-1">😊 Natural Look</p>
                      <p className="text-muted-foreground">Your genuine smile</p>
                    </div>
                    <div className="bg-muted/50 rounded-lg p-2">
                      <p className="font-bold text-cartoon-splash mb-1">⚡ High Quality</p>
                      <p className="text-muted-foreground">Better results</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
