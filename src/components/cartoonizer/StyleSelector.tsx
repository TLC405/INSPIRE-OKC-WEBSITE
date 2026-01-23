import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Star, Zap } from "lucide-react";
import { 
  TEEFEE_ME_STYLES, 
  CATEGORY_LABELS,
  type TeeFeeMeCategory 
} from "@/lib/teeFeeMeStyles";
import { cn } from "@/lib/utils";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

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

// Featured styles for spotlight
const FEATURED_STYLES = ['ghibli_wonder', 'pixar_soft_3d', 'dbz_saiyan', 'simpsons_prime_time'];

export const StyleSelector = ({ onStyleSelect }: StyleSelectorProps) => {
  const [activeCategory, setActiveCategory] = useState<TeeFeeMeCategory>('anime');
  const [hoveredStyle, setHoveredStyle] = useState<string | null>(null);
  const { ref: gridRef, isVisible } = useScrollAnimation({ threshold: 0.1 });

  const filteredStyles = TEEFEE_ME_STYLES.filter(s => s.category === activeCategory);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Hero Header - Brutal */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 brutal-border bg-card font-mono text-xs uppercase tracking-widest">
            <Sparkles className="w-4 h-4 text-primary" />
            <span>Step_02 / 03</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tight">
            Pick Your <span className="okc-gradient-text">Vibe</span>
          </h2>
          <p className="text-muted-foreground font-mono text-sm max-w-md mx-auto">
            Transform into your favorite cartoon universe. Every style preserves your unique identity.
          </p>
          
          {/* Style count badge */}
          <div className="flex items-center justify-center gap-2 pt-2">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-black uppercase">
              30+ Styles
            </span>
            <span className="px-3 py-1 border-2 border-primary text-primary text-xs font-black uppercase">
              FaceLock™
            </span>
          </div>
        </div>

        {/* Category Pills - Horizontal Scroll */}
        <div className="relative">
          <div className="flex gap-2 overflow-x-auto pb-3 scrollbar-hide justify-center flex-wrap">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  "whitespace-nowrap px-4 py-2 border-4 font-black uppercase text-sm tracking-wide transition-all duration-200",
                  activeCategory === cat 
                    ? "border-foreground bg-primary text-primary-foreground shadow-stacked translate-x-[-2px] translate-y-[-2px]" 
                    : "border-border bg-card text-foreground hover:border-foreground"
                )}
              >
                <span className="mr-2">{CATEGORY_EMOJIS[cat]}</span>
                {CATEGORY_LABELS[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Style Cards Grid with stagger animation */}
        <div 
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4"
        >
          {filteredStyles.map((style, index) => {
            const isFeatured = FEATURED_STYLES.includes(style.id);
            
            return (
              <div
                key={style.id}
                className={cn(
                  "group relative cursor-pointer",
                  isVisible && "animate-fade-in-once"
                )}
                style={{ 
                  animationDelay: `${index * 0.05}s`,
                  animationFillMode: 'forwards'
                }}
                onClick={() => onStyleSelect(style.id)}
                onMouseEnter={() => setHoveredStyle(style.id)}
                onMouseLeave={() => setHoveredStyle(null)}
              >
                {/* Featured badge */}
                {isFeatured && (
                  <div className="absolute -top-2 -right-2 z-20 bg-secondary text-secondary-foreground px-2 py-0.5 text-xs font-black uppercase border-2 border-foreground">
                    <Star className="w-3 h-3 inline mr-1" />
                    Hot
                  </div>
                )}

                {/* Card - Brutal style */}
                <div className={cn(
                  "relative overflow-hidden border-4 border-foreground bg-card transition-all duration-200",
                  hoveredStyle === style.id 
                    ? "translate-x-[-4px] translate-y-[-4px] shadow-stacked-deep" 
                    : "shadow-brutal-sm hover:translate-x-[-2px] hover:translate-y-[-2px]"
                )}>
                  {/* Gradient Preview Background */}
                  <div className={cn(
                    "aspect-[4/3] bg-gradient-to-br flex items-center justify-center relative overflow-hidden",
                    style.previewGradient
                  )}>
                    {/* Noise overlay */}
                    <div className="absolute inset-0 noise opacity-30" />
                    
                    {/* Scanlines */}
                    <div className="absolute inset-0 scanlines opacity-20" />
                    
                    {/* Icon */}
                    <span className={cn(
                      "text-5xl md:text-6xl transition-transform duration-300 drop-shadow-lg relative z-10",
                      hoveredStyle === style.id && "scale-125 animate-bounce-subtle"
                    )}>
                      {style.previewIcon}
                    </span>

                    {/* Shine effect on hover */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent",
                      "translate-x-[-100%] transition-transform duration-500",
                      hoveredStyle === style.id && "translate-x-[100%]"
                    )} />
                  </div>

                  {/* Content */}
                  <div className="p-3 md:p-4 border-t-4 border-foreground space-y-3">
                    <div>
                      <h3 className="font-black uppercase text-sm md:text-base truncate tracking-tight">
                        {style.label}
                      </h3>
                      <p className="text-xs text-muted-foreground font-mono line-clamp-1">
                        {style.description}
                      </p>
                    </div>

                    {/* Transform Button - Brutal */}
                    <button 
                      className={cn(
                        "w-full py-2 px-3 border-2 border-foreground font-black uppercase text-xs tracking-wider",
                        "flex items-center justify-center gap-1 transition-all duration-200",
                        hoveredStyle === style.id 
                          ? "bg-primary text-primary-foreground" 
                          : "bg-card text-foreground hover:bg-muted"
                      )}
                    >
                      Transform
                      <ArrowRight className={cn(
                        "w-3.5 h-3.5 transition-transform duration-300",
                        hoveredStyle === style.id && "translate-x-1"
                      )} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer Info */}
        <div className="text-center pt-4">
          <div className="inline-flex items-center gap-4 px-6 py-3 border-2 border-border font-mono text-xs">
            <span className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <span className="font-bold text-foreground">{filteredStyles.length}</span> styles in {CATEGORY_LABELS[activeCategory]}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">FaceLock identity preservation</span>
          </div>
        </div>
      </div>
    </div>
  );
};
