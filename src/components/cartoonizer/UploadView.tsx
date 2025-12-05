import { useState, useCallback } from "react";
import { Upload, Camera, ImagePlus, Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
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

    setUploading(true);

    try {
      const reader = new FileReader();
      reader.onload = () => {
        const base64 = reader.result as string;
        setPreview(base64);
        
        setTimeout(() => {
          const uploadId = crypto.randomUUID();
          toast.success("Photo ready!");
          onUploadComplete(base64, uploadId);
          setUploading(false);
        }, 500);
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
    <div className="min-h-screen relative overflow-hidden bg-background">
      {/* Mesh Gradient Background */}
      <div className="absolute inset-0 mesh-gradient" />
      
      {/* Animated Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/5 w-80 h-80 bg-secondary/20 rounded-full blur-[100px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/5 w-96 h-96 bg-primary/15 rounded-full blur-[120px] animate-pulse-glow" style={{ animationDelay: "1.5s" }} />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10 animate-fade-up">
            <div className="glass inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6">
              <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-xs font-bold text-primary">1</span>
              </div>
              <span className="text-sm font-medium text-muted-foreground">Upload Photo</span>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
              Upload Your Photo
            </h2>
            <p className="text-muted-foreground">
              Choose a clear, front-facing photo for the best results
            </p>
          </div>

          {/* Upload Area */}
          <div 
            className="animate-fade-up"
            style={{ animationDelay: "0.1s" }}
          >
            <div
              className={`premium-card p-8 md:p-12 transition-all duration-300 cursor-pointer group ${
                dragActive ? "border-primary/50 bg-primary/5" : "hover:border-primary/30"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => document.getElementById('file-upload')?.click()}
            >
              <div className="text-center space-y-6">
                {/* Icon */}
                <div className="relative mx-auto w-20 h-20">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/30 to-accent/30 rounded-2xl blur-xl animate-pulse-glow" />
                  <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                    {uploading ? (
                      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    ) : (
                      <ImagePlus className="w-8 h-8 text-primary" />
                    )}
                  </div>
                </div>

                {/* Text */}
                <div className="space-y-2">
                  <p className="text-xl font-semibold text-foreground">
                    {uploading ? "Processing..." : "Drop your photo here"}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    or click to browse from your device
                  </p>
                </div>

                {/* Hidden Input */}
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/webp,image/heic"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                  className="hidden"
                  id="file-upload"
                  disabled={uploading}
                />

                {/* Button */}
                <Button 
                  disabled={uploading}
                  className="premium-button px-6 py-3 h-auto"
                  onClick={(e) => {
                    e.stopPropagation();
                    document.getElementById('file-upload')?.click();
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Choose Photo
                </Button>

                {/* Format Info */}
                <p className="text-xs text-muted-foreground">
                  JPG, PNG, WEBP, HEIC • Max 10MB
                </p>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div 
            className="mt-8 grid grid-cols-3 gap-4 animate-fade-up"
            style={{ animationDelay: "0.2s" }}
          >
            {[
              { icon: Camera, title: "Clear Face", desc: "Front-facing, well-lit" },
              { icon: Check, title: "High Quality", desc: "Sharp, in focus" },
              { icon: ImagePlus, title: "Solo Shot", desc: "One person only" },
            ].map((tip) => (
              <div key={tip.title} className="glass rounded-xl p-4 text-center">
                <tip.icon className="w-5 h-5 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium text-foreground">{tip.title}</p>
                <p className="text-xs text-muted-foreground">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
