import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles, FolderGit2, Users } from "lucide-react";
import { MakeAppWizard } from "@/components/app-builder/MakeAppWizard";
import { StoreApp } from "@/components/app-builder/StoreApp";
import { TestWithFriends } from "@/components/app-builder/TestWithFriends";

type Section = "home" | "make" | "store" | "test";

const TLCAppBuilder = () => {
  const [activeSection, setActiveSection] = useState<Section>("home");

  if (activeSection === "make") {
    return <MakeAppWizard onBack={() => setActiveSection("home")} />;
  }

  if (activeSection === "store") {
    return <StoreApp onBack={() => setActiveSection("home")} />;
  }

  if (activeSection === "test") {
    return <TestWithFriends onBack={() => setActiveSection("home")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12 md:mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
            TLC App-Builder
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Turn your ideas into real apps. No coding degree needed. Explained like you're 12.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50" onClick={() => setActiveSection("make")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Sparkles className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Make App</CardTitle>
              <CardDescription>
                Turn messy ideas into full app plans with AI help
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" size="lg">
                Start Building
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50" onClick={() => setActiveSection("store")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <FolderGit2 className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Store App</CardTitle>
              <CardDescription>
                Save to local folder or push to GitHub with one click
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" size="lg" variant="secondary">
                Manage Storage
              </Button>
            </CardContent>
          </Card>

          <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer border-2 hover:border-primary/50" onClick={() => setActiveSection("test")}>
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">Test with Friends</CardTitle>
              <CardDescription>
                Try fun templates and share with your crew
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button className="w-full" size="lg" variant="outline">
                Fun Lab
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground">
            Built for you, your girlfriend, and your friends 💙
          </p>
        </div>
      </div>
    </div>
  );
};

export default TLCAppBuilder;
