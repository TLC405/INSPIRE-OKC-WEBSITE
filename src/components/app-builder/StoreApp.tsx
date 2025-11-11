import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Folder, Github } from "lucide-react";
import { Input } from "@/components/ui/input";

interface StoreAppProps {
  onBack: () => void;
}

export const StoreApp = ({ onBack }: StoreAppProps) => {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Button variant="ghost" onClick={onBack} className="mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Button>

        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Store Your Apps</h1>
          <p className="text-muted-foreground mb-8">
            Save your projects locally or push to GitHub. Your choice!
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Folder className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>Local Folder</CardTitle>
                <CardDescription>
                  Save to a folder on your computer. Simple and private.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Folder Name</label>
                  <Input placeholder="tlc-apps" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">App Name</label>
                  <Input placeholder="cartoonifier-simba" />
                </div>
                <Button className="w-full">Save to Local Folder</Button>
                <p className="text-xs text-muted-foreground">
                  I'll tell you exactly where to create the folder and how to organize your files
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="mb-4 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <Github className="w-6 h-6 text-primary" />
                </div>
                <CardTitle>GitHub Repo</CardTitle>
                <CardDescription>
                  Push to GitHub for version control and sharing
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Repository Name</label>
                  <Input placeholder="my-awesome-cartoonizer" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Description</label>
                  <Input placeholder="Turns photos into cartoon styles" />
                </div>
                <Button className="w-full">Generate Git Commands</Button>
                <p className="text-xs text-muted-foreground">
                  I'll give you the exact commands to copy and paste
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Your Saved Apps</CardTitle>
              <CardDescription>Recent projects you've worked on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                No apps saved yet. Create your first app above!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
