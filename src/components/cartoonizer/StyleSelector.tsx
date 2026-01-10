import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
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
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);

  const filteredStyles = TEEFEE_ME_STYLES.filter(s => s.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
            <Sparkles className="w-4 h-4" />
            30+ Cartoon Styles
          </div>
          <h2 className="text-3xl md:text-4xl font-bold">
            Pick Your <span className="tfm-gradient-text">Vibe</span>
          </h2>
          <p className="text-muted-foreground text-sm md:text-base max-w-md mx-auto">
            Transform into your favorite cartoon universe. Every style preserves your unique identity.
          </p>
        </div>

        {/* Category Pills - Horizontal Scroll */}
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide justify-center flex-wrap">
            {CATEGORIES.map((cat) => (
              <Button
                key={cat}
                variant={activeCategory === cat ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(cat)}
                className={`
                  whitespace-nowrap transition-all duration-300 shrink-0
                  ${activeCategory === cat 
                    ? "shadow-lg shadow-primary/25 scale-105" 
                    : "hover:bg-muted"
                  }
                `}
              >
                <span className="mr-1.5">{CATEGORY_EMOJIS[cat]}</span>
                {CATEGORY_LABELS[cat]}
              </Button>
            ))}
          </div>
        </div>

        {/* Style Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredStyles.map((style, index) => (
            <div
              key={style.id}
              className="group relative cursor-pointer animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
              onClick={() => onStyleSelect(style.id)}
              onMouseEnter={() => setHoveredStyle(style.id)}
              onMouseLeave={() => setHoveredStyle(null)}
            >
              {/* Card */}
              <div className={`
                relative overflow-hidden rounded-2xl border border-border/50 
                transition-all duration-300 ease-out
                ${hoveredStyle === style.id 
                  ? "scale-[1.02] shadow-2xl shadow-primary/20 border-primary/50" 
                  : "hover:shadow-lg"
                }
              `}>
                {/* Gradient Preview Background */}
                <div className={`
                  aspect-[4/3] bg-gradient-to-br ${style.previewGradient}
                  flex items-center justify-center relative overflow-hidden
                `}>
                  {/* Pattern overlay */}
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
                  
                  {/* Icon */}
                  <span className={`
                    text-5xl md:text-6xl transition-transform duration-300 drop-shadow-lg
                    ${hoveredStyle === style.id ? "scale-110" : ""}
                  `}>
                    {style.previewIcon}
                  </span>

                  {/* Shine effect on hover */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent
                    translate-x-[-100%] transition-transform duration-700
                    ${hoveredStyle === style.id ? "translate-x-[100%]" : ""}
                  `} />
                </div>

                {/* Content */}
                <div className="p-3 md:p-4 bg-card space-y-2">
                  <div>
                    <h3 className="font-semibold text-sm md:text-base truncate">
                      {style.label}
                    </h3>
                    <p className="text-xs text-muted-foreground line-clamp-1">
                      {style.description}
                    </p>
                  </div>

                  {/* Transform Button */}
                  <Button 
                    size="sm" 
                    className={`
                      w-full transition-all duration-300
                      ${hoveredStyle === style.id 
                        ? "bg-primary shadow-lg shadow-primary/25" 
                        : "bg-primary/90"
                      }
                    `}
                  >
                    Transform
                    <ArrowRight className={`
                      w-3.5 h-3.5 ml-1.5 transition-transform duration-300
                      ${hoveredStyle === style.id ? "translate-x-1" : ""}
                    `} />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Info */}
        <div className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{filteredStyles.length} styles</span>
            {" "}in {CATEGORY_LABELS[activeCategory]} • FaceLock identity preservation
          </p>
        </div>
      </div>
    </div>
  );
};
