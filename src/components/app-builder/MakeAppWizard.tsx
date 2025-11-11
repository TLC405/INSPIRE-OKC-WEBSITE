import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Wand2 } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface MakeAppWizardProps {
  onBack: () => void;
}

export const MakeAppWizard = ({ onBack }: MakeAppWizardProps) => {
  const [idea, setIdea] = useState("");
  const [enhancedPrompt, setEnhancedPrompt] = useState("");

  const handleBoostPrompt = () => {
    // TODO: Connect to AI service for prompt enhancement
    const enhanced = `ENHANCED VERSION:\n\nApp Name: ${idea.slice(0, 30)}\n\nCore Features:\n- User authentication with PIN/password\n- Mobile-first responsive design\n- Dark mode support\n- Image upload with drag-and-drop\n- Real-time processing feedback\n- Download results as PNG\n- Error handling and validation\n\nTech Stack:\n- Frontend: React + Vite + Tailwind\n- Storage: Supabase\n- Deployment: Vercel/Netlify\n\nSecurity:\n- Input validation\n- HTTPS only\n- EXIF stripping on uploads\n\nNext steps:\n1. Set up project structure\n2. Create component architecture\n3. Implement core features`;
    
    setEnhancedPrompt(enhanced);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Make Your App</h1>
          <p className="text-muted-foreground mb-8">
            Tell me what you want to build. I'll help you plan it step-by-step.
          </p>

          <Tabs defaultValue="idea" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="idea">Your Idea</TabsTrigger>
              <TabsTrigger value="boost">Prompt Booster</TabsTrigger>
              <TabsTrigger value="algorithm">Algorithm Maker</TabsTrigger>
            </TabsList>

            <TabsContent value="idea" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>What do you want to make?</CardTitle>
                  <CardDescription>
                    Describe your app idea. Examples: "cartoonifier", "Samuel L. Jackson + Simba mashup", "game where you catch falling pizzas"
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Textarea
                    placeholder="Example: I want to turn photos into Simpsons-style cartoons..."
                    value={idea}
                    onChange={(e) => setIdea(e.target.value)}
                    className="min-h-[150px]"
                  />
                  <Button onClick={handleBoostPrompt} className="w-full" disabled={!idea}>
                    <Wand2 className="w-4 h-4 mr-2" />
                    Boost This Idea
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="boost" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Prompt Booster</CardTitle>
                  <CardDescription>
                    I'll take your messy idea and turn it into a professional build plan
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {enhancedPrompt ? (
                    <div className="bg-muted p-4 rounded-lg">
                      <pre className="whitespace-pre-wrap text-sm">{enhancedPrompt}</pre>
                    </div>
                  ) : (
                    <div className="text-center py-12 text-muted-foreground">
                      Enter your idea first, then boost it to see the enhanced version here
                    </div>
                  )}
                  {enhancedPrompt && (
                    <Button className="w-full">Copy Full Prompt</Button>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="algorithm" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Algorithm Maker</CardTitle>
                  <CardDescription>
                    Break down your app into simple steps: inputs → processing → outputs
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">What are your inputs?</label>
                      <Textarea placeholder="Example: one photo, user uploads JPG or PNG" className="min-h-[80px]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">What should happen?</label>
                      <Textarea placeholder="Example: detect face, extract features, apply cartoon style" className="min-h-[80px]" />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">What should come out?</label>
                      <Textarea placeholder="Example: PNG image to download, keep identity same" className="min-h-[80px]" />
                    </div>
                    <Button className="w-full">Generate Code Steps</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};
