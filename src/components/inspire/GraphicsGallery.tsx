import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Download, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Graphic {
  id: string;
  title: string;
  category: "mental-health" | "motivation" | "community";
  imageUrl: string;
  downloadUrl: string;
}

// Placeholder graphics - in production, these would come from database
const GRAPHICS: Graphic[] = [
  {
    id: "g1",
    title: "Breathe Through It",
    category: "mental-health",
    imageUrl: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    downloadUrl: "#",
  },
  {
    id: "g2",
    title: "One Day at a Time",
    category: "motivation",
    imageUrl: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=400&h=400&fit=crop",
    downloadUrl: "#",
  },
  {
    id: "g3",
    title: "You Are Not Alone",
    category: "mental-health",
    imageUrl: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=400&h=400&fit=crop",
    downloadUrl: "#",
  },
  {
    id: "g4",
    title: "Build Your People",
    category: "community",
    imageUrl: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?w=400&h=400&fit=crop",
    downloadUrl: "#",
  },
  {
    id: "g5",
    title: "Keep Moving Forward",
    category: "motivation",
    imageUrl: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=400&h=400&fit=crop",
    downloadUrl: "#",
  },
  {
    id: "g6",
    title: "It's Okay to Rest",
    category: "mental-health",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    downloadUrl: "#",
  },
];

const CATEGORIES = [
  { id: "all", label: "All", emoji: "✨" },
  { id: "mental-health", label: "Mental Health", emoji: "💚" },
  { id: "motivation", label: "Motivation", emoji: "🔥" },
  { id: "community", label: "Community", emoji: "🤝" },
];

export const GraphicsGallery = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedGraphic, setSelectedGraphic] = useState<Graphic | null>(null);

  const filteredGraphics = selectedCategory === "all"
    ? GRAPHICS
    : GRAPHICS.filter((g) => g.category === selectedCategory);

  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles className="w-8 h-8 text-primary" />
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight">
              Graphic <span className="okc-gradient-text">Designs</span>
            </h2>
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl">
            Visual reminders for mental health, motivation, and community. Free to download and share.
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-sm font-bold uppercase tracking-wider border-2 transition-all ${
                selectedCategory === cat.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-transparent text-muted-foreground border-border hover:border-primary hover:text-foreground"
              }`}
            >
              <span className="mr-2">{cat.emoji}</span>
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredGraphics.map((graphic) => (
            <div
              key={graphic.id}
              className="group cursor-pointer"
              onClick={() => setSelectedGraphic(graphic)}
            >
              <div className="aspect-square overflow-hidden border-2 border-border group-hover:border-primary transition-all">
                <img
                  src={graphic.imageUrl}
                  alt={graphic.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <p className="mt-2 text-sm font-bold truncate">{graphic.title}</p>
            </div>
          ))}
        </div>

        {/* Lightbox */}
        <Dialog open={!!selectedGraphic} onOpenChange={() => setSelectedGraphic(null)}>
          <DialogContent className="max-w-2xl p-0 border-4 border-foreground bg-card overflow-hidden">
            {selectedGraphic && (
              <>
                <div className="relative">
                  <img
                    src={selectedGraphic.imageUrl}
                    alt={selectedGraphic.title}
                    className="w-full aspect-square object-cover"
                  />
                  <button
                    onClick={() => setSelectedGraphic(null)}
                    className="absolute top-4 right-4 p-2 bg-background/80 border-2 border-foreground hover:bg-primary transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-black mb-2">{selectedGraphic.title}</h3>
                  <Button
                    onClick={() => window.open(selectedGraphic.downloadUrl, "_blank")}
                    className="brutal-btn w-full"
                  >
                    <Download className="w-4 h-4" />
                    Download
                  </Button>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </section>
  );
};
