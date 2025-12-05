import { Button } from "@/components/ui/button";
import { Shield } from "lucide-react";

interface ConsentBannerProps {
  onAccept: () => void;
}

export const ConsentBanner = ({ onAccept }: ConsentBannerProps) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4">
      <div className="max-w-2xl mx-auto">
        <div className="glass-strong rounded-2xl p-6 shadow-2xl border border-white/10">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center flex-shrink-0">
              <Shield className="w-5 h-5 text-primary" />
            </div>
            
            <div className="flex-1 space-y-3">
              <h3 className="font-semibold text-foreground">Privacy & Terms</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                By continuing, you agree that your uploaded photos will be processed by our AI to generate cartoons. 
                Images are processed securely and not stored permanently.
              </p>
              
              <div className="flex items-center gap-3">
                <Button
                  onClick={onAccept}
                  className="premium-button px-6"
                >
                  Accept & Continue
                </Button>
                <a 
                  href="#" 
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Learn more
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
