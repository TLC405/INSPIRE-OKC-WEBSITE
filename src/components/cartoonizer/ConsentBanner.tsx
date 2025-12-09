import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface ConsentBannerProps {
  onAccept: () => void;
}

export const ConsentBanner = ({ onAccept }: ConsentBannerProps) => {
  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-end justify-center p-4">
      <Card className="max-w-2xl w-full p-6 mb-4 space-y-4">
        <h2 className="text-xl font-bold">Privacy & Terms</h2>
        <p className="text-sm text-muted-foreground">
          By using ALI-Forge, you agree to our terms. We collect anonymous usage data
          (device type, location region) to improve our service. Your uploaded photos
          are temporarily stored and automatically deleted after 7 days. We never share
          your images with third parties.
        </p>
        <div className="flex gap-3">
          <Button onClick={onAccept} className="flex-1">
            Accept & Continue
          </Button>
        </div>
      </Card>
    </div>
  );
};
