import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const STYLES = [
  // Adult block
  { id: "ADULT-A1", name: "Simpsons-Style", desc: "Suburban parody with warm yellows and thick lines", emoji: "🟡" },
  { id: "ADULT-A2", name: "Family Guy-Style", desc: "Pastel sitcom with oval eyes and thin lines", emoji: "👨‍👩‍👧‍👦" },
  { id: "ADULT-A3", name: "South Park-Style", desc: "Flat cutout with no shading", emoji: "⛷️" },
  { id: "ADULT-A4", name: "Rick & Morty-Style", desc: "Neon sci-fi with acid colors and rim lighting", emoji: "🔬" },
  { id: "ADULT-A5", name: "King of the Hill", desc: "Grounded natural faces with warm tones", emoji: "🏡" },
  { id: "ADULT-A6", name: "Ren & Stimpy", desc: "Gritty grotesque with texture and exaggeration", emoji: "😵" },
  { id: "ADULT-A7", name: "Beavis & Butthead", desc: "Crude teen style with flat colors", emoji: "🤘" },
  
  // Kids block
  { id: "KIDS-K1", name: "SpongeBob-Style", desc: "Undersea absurdist with bright bubbles", emoji: "🧽" },
  { id: "KIDS-K2", name: "Pokémon-Style", desc: "Adventure anime with manga lines", emoji: "⚡" },
  { id: "KIDS-K3", name: "Classic Toontown", desc: "Rubber-hose animation with Mickey energy", emoji: "🎩" },
  { id: "KIDS-K4", name: "Peppa-Style", desc: "Minimal nursery with thin lines", emoji: "🐷" },
  { id: "KIDS-K5", name: "Doraemon-Style", desc: "Blue robo-cat world with clean lines", emoji: "🤖" },
];

interface StyleSelectorProps {
  onStyleSelect: (styleId: string) => void;
}

export const StyleSelector = ({ onStyleSelect }: StyleSelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-bold">Pick Your Style</h2>
          <p className="text-muted-foreground">
            Choose from 12 TV-inspired cartoon styles
          </p>
        </div>

        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Adult Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {STYLES.filter(s => s.id.startsWith("ADULT")).map((style) => (
                <Card 
                  key={style.id}
                  className="cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1"
                  onClick={() => onStyleSelect(style.id)}
                >
                  <CardHeader>
                    <div className="text-4xl mb-2">{style.emoji}</div>
                    <CardTitle className="text-lg">{style.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {style.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="secondary">
                      Select Style
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xl font-semibold mb-4">Kids Styles</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {STYLES.filter(s => s.id.startsWith("KIDS")).map((style) => (
                <Card 
                  key={style.id}
                  className="cursor-pointer hover:border-primary/50 transition-all hover:-translate-y-1"
                  onClick={() => onStyleSelect(style.id)}
                >
                  <CardHeader>
                    <div className="text-4xl mb-2">{style.emoji}</div>
                    <CardTitle className="text-lg">{style.name}</CardTitle>
                    <CardDescription className="text-sm">
                      {style.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="secondary">
                      Select Style
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
