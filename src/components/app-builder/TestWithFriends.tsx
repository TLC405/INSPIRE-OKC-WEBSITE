import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Image, Sparkles, MessageSquare } from "lucide-react";

interface TestWithFriendsProps {
  onBack: () => void;
}

export const TestWithFriends = ({ onBack }: TestWithFriendsProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Fun Lab</h1>
          <p className="text-muted-foreground mb-8">
            Try pre-built templates and have fun with your friends!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="group hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Image className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Face Cartoonifier</CardTitle>
                <CardDescription>
                  Upload 1 photo → Pick a style → Get cartoon version
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Try Cartoonifier</Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Simpsons, SpongeBob, anime styles and more
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Sparkles className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Two-Character Mash</CardTitle>
                <CardDescription>
                  Combine your photo with famous character vibes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="secondary">Try Character Mash</Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Samuel L. Jackson + Simba, you + ninja turtle, etc.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-lg transition-all cursor-pointer">
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Quote Sticker Maker</CardTitle>
                <CardDescription>
                  Turn text into shareable image stickers
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="outline">Try Sticker Maker</Button>
                <p className="text-xs text-muted-foreground mt-2">
                  Perfect for memes and sharing with friends
                </p>
              </CardContent>
            </Card>

            <Card className="border-dashed">
              <CardHeader>
                <CardTitle className="text-muted-foreground">More Coming Soon</CardTitle>
                <CardDescription>
                  Got ideas? Add your own templates!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full" variant="ghost" disabled>
                  Suggest Template
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
