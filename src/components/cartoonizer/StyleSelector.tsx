import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { 
  TEEFEE_ME_STYLES, 
  CATEGORY_LABELS,
  type TeeFeeMeCategory 
} from "@/lib/teeFeeMeStyles";

interface StyleSelectorProps {
  onStyleSelect: (styleId: string) => void;
}

const CATEGORY_EMOJIS: Record<TeeFeeMeCategory, string> = {
  tv_cartoon: "📺",
  adult_cartoon: "🔞",
  anime: "⚔️",
  game: "🎮",
  movie_3d: "🎬",
  movie_2d: "🎨",
  avatar: "👤"
};

const CATEGORIES: TeeFeeMeCategory[] = [
  'tv_cartoon',
  'adult_cartoon', 
  'anime',
  'game',
  'movie_3d',
  'movie_2d',
  'avatar'
];

export const StyleSelector = ({ onStyleSelect }: StyleSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<TeeFeeMeCategory>('anime');

  const filteredStyles = TEEFEE_ME_STYLES.filter(s => s.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-2xl md:text-3xl font-bold">TeeFeeMe Style Engine</h2>
          <p className="text-muted-foreground text-sm md:text-base">
            Mental health break for the homies - pick your vibe
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2">
          {CATEGORIES.map((cat) => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(cat)}
              className="text-xs md:text-sm"
            >
              {CATEGORY_EMOJIS[cat]} {CATEGORY_LABELS[cat]}
            </Button>
          ))}
        </div>

        {/* Style Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {filteredStyles.map((style) => (
            <Card 
              key={style.id}
              className="cursor-pointer group hover:border-primary/50 transition-all duration-300 hover:shadow-lg hover:shadow-primary/10 hover:-translate-y-1"
              onClick={() => onStyleSelect(style.id)}
            >
              <CardHeader className="p-3 md:p-4 pb-2">
                <CardTitle className="text-sm md:text-base">{style.label}</CardTitle>
                <CardDescription className="text-xs line-clamp-2">
                  {style.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="p-3 md:p-4 pt-0">
                <p className="text-xs text-muted-foreground mb-2 italic">
                  "{style.loadingMessage}"
                </p>
                <Button className="w-full group-hover:bg-primary/90" size="sm">
                  Transform
                  <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Tagline */}
        <div className="text-center pt-4">
          <p className="text-xs text-muted-foreground">
            {filteredStyles.length} styles in {CATEGORY_LABELS[activeCategory]} • TLC approved vibes
          </p>
        </div>
      </div>
    </div>
  );
};
