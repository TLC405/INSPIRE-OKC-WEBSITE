import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const STYLES = [
  // Adult block
  { id: "ADULT-A1", name: "Simpsons Cartoon", desc: "Yellow-toned suburban world with thick outlines", emoji: "🟡", scene: "Springfield living room" },
  { id: "ADULT-A2", name: "Family Guy Cartoon", desc: "Pastel sitcom style with oval eyes", emoji: "👨‍👩‍👧‍👦", scene: "Quahog neighborhood" },
  { id: "ADULT-A3", name: "South Park Cartoon", desc: "Flat cutout paper aesthetic", emoji: "⛷️", scene: "Snowy Colorado town" },
  { id: "ADULT-A4", name: "Rick & Morty Cartoon", desc: "Neon sci-fi with portal effects", emoji: "🔬", scene: "Interdimensional lab" },
  { id: "ADULT-A5", name: "King of the Hill", desc: "Grounded Texas suburban realism", emoji: "🏡", scene: "Arlen backyard" },
  { id: "ADULT-A6", name: "Ren & Stimpy Cartoon", desc: "Grotesque detail with texture", emoji: "😵", scene: "Chaotic living room" },
  { id: "ADULT-A7", name: "Beavis & Butthead", desc: "Crude teen flat color style", emoji: "🤘", scene: "Couch with TV" },
  
  // Kids block
  { id: "KIDS-K1", name: "SpongeBob Cartoon", desc: "Underwater absurdist with bubbles", emoji: "🧽", scene: "Bikini Bottom" },
  { id: "KIDS-K2", name: "Pokémon Cartoon", desc: "Anime adventure style", emoji: "⚡", scene: "Battle arena with Pokéballs" },
  { id: "KIDS-K3", name: "Classic Toontown", desc: "Rubber-hose 1930s animation", emoji: "🎩", scene: "Vintage cartoon stage" },
  { id: "KIDS-K4", name: "Peppa Cartoon", desc: "Minimal nursery illustration", emoji: "🐷", scene: "Muddy puddle hill" },
  { id: "KIDS-K5", name: "Doraemon Cartoon", desc: "Blue robo-cat world", emoji: "🤖", scene: "Futuristic room with gadgets" },
];

interface StyleSelectorProps {
  onStyleSelect: (styleId: string) => void;
}

export const StyleSelector = ({ onStyleSelect }: StyleSelectorProps) => {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="text-center space-y-3">
          <h2 className="text-3xl md:text-4xl font-bold">Cartoon Lab</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Choose your cartoon universe. Your face will be placed directly into these iconic worlds.
          </p>
        </div>

        <div className="space-y-8">
          {/* Adult Styles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              Adult Worlds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {STYLES.filter(s => s.id.startsWith("ADULT")).map((style) => (
                <Card 
                  key={style.id}
                  className="cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
                  onClick={() => onStyleSelect(style.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{style.emoji}</div>
                    <CardTitle className="text-base">{style.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {style.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground mb-3">
                      Scene: {style.scene}
                    </p>
                    <Button className="w-full group-hover:bg-primary/90" size="sm">
                      Transform
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Kids Styles */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-secondary" />
              Kids Worlds
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {STYLES.filter(s => s.id.startsWith("KIDS")).map((style) => (
                <Card 
                  key={style.id}
                  className="cursor-pointer group hover:border-secondary/50 transition-all duration-300 hover:shadow-lg hover:shadow-secondary/10 hover:-translate-y-1"
                  onClick={() => onStyleSelect(style.id)}
                >
                  <CardHeader className="pb-2">
                    <div className="text-4xl mb-2 group-hover:scale-110 transition-transform duration-300">{style.emoji}</div>
                    <CardTitle className="text-base">{style.name}</CardTitle>
                    <CardDescription className="text-xs line-clamp-2">
                      {style.desc}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-xs text-muted-foreground mb-3">
                      Scene: {style.scene}
                    </p>
                    <Button className="w-full group-hover:bg-secondary/90" variant="secondary" size="sm">
                      Transform
                      <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
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