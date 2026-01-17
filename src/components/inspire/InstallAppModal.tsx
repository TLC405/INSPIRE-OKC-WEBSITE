import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Download, Share, Plus, Smartphone } from "lucide-react";
import { usePWAInstall } from "@/hooks/usePWAInstall";

interface InstallAppModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const InstallAppModal = ({ open, onOpenChange }: InstallAppModalProps) => {
  const { isInstallable, isInstalled, promptInstall, showIOSInstructions } = usePWAInstall();

  const handleInstall = async () => {
    const success = await promptInstall();
    if (success) {
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="brutal-card border-4 border-foreground bg-card max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black uppercase tracking-tight flex items-center gap-3">
            <Smartphone className="w-6 h-6 text-primary" />
            Install App
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {isInstalled ? (
            <div className="text-center space-y-4">
              <div className="w-16 h-16 mx-auto bg-primary/20 flex items-center justify-center border-2 border-primary">
                <Download className="w-8 h-8 text-primary" />
              </div>
              <p className="text-foreground font-bold">Already Installed!</p>
              <p className="text-muted-foreground text-sm">
                Inspire OKC is installed on your device. Check your home screen!
              </p>
            </div>
          ) : isInstallable ? (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Install Inspire OKC on your home screen for quick access and a native app experience.
              </p>
              <Button onClick={handleInstall} className="w-full brutal-btn">
                <Download className="w-4 h-4" />
                Install Now
              </Button>
            </div>
          ) : showIOSInstructions ? (
            <div className="space-y-4">
              <p className="text-muted-foreground mb-4">
                To install on iOS:
              </p>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 bg-muted border-2 border-border">
                  <span className="font-black text-primary">1</span>
                  <div className="flex items-center gap-2">
                    <span>Tap the</span>
                    <Share className="w-4 h-4" />
                    <span>Share button</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted border-2 border-border">
                  <span className="font-black text-primary">2</span>
                  <div className="flex items-center gap-2">
                    <span>Tap</span>
                    <Plus className="w-4 h-4" />
                    <span>"Add to Home Screen"</span>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 bg-muted border-2 border-border">
                  <span className="font-black text-primary">3</span>
                  <span>Tap "Add" to confirm</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-muted-foreground">
                To install this app, open this page in a supported browser:
              </p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Chrome (Android/Desktop)</li>
                <li>• Safari (iOS)</li>
                <li>• Edge (Desktop)</li>
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
