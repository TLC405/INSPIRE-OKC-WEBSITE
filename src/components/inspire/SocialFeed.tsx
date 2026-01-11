import { Twitter, Instagram, Facebook } from "lucide-react";

interface SocialPost {
  id: string;
  platform: "twitter" | "instagram" | "facebook";
  content: string;
  author: string;
  handle: string;
  timestamp: string;
  likes: number;
}

// Mock social feed data - In production, would use real APIs
const MOCK_POSTS: SocialPost[] = [
  {
    id: "1",
    platform: "twitter",
    content: "Just had the best chicken-fried steak at Cattlemen's in Stockyards City! OKC food scene is unmatched 🥩 #OKCEats",
    author: "Sarah K.",
    handle: "@sarahk_okc",
    timestamp: "2h ago",
    likes: 142,
  },
  {
    id: "2",
    platform: "instagram",
    content: "Sunset views from Scissortail Park never get old ✨ This city keeps surprising me 🌆 #OKC #Oklahoma",
    author: "Marcus T.",
    handle: "@marcus.travels",
    timestamp: "4h ago",
    likes: 389,
  },
  {
    id: "3",
    platform: "twitter",
    content: "Thunder up! ⛈️ What a game last night! The energy at Paycom Center was ELECTRIC ⚡ #ThunderUp",
    author: "OKC Sports Fan",
    handle: "@okcsports",
    timestamp: "6h ago",
    likes: 892,
  },
  {
    id: "4",
    platform: "facebook",
    content: "Paseo Arts District First Friday was amazing! So much local talent. Support your local artists! 🎨",
    author: "OKC Arts Council",
    handle: "OKC Arts",
    timestamp: "1d ago",
    likes: 234,
  },
];

const PlatformIcon = ({ platform }: { platform: string }) => {
  switch (platform) {
    case "twitter":
      return <Twitter className="w-4 h-4" />;
    case "instagram":
      return <Instagram className="w-4 h-4" />;
    case "facebook":
      return <Facebook className="w-4 h-4" />;
    default:
      return null;
  }
};

const platformStyles: Record<string, string> = {
  twitter: "border-l-[hsl(203_89%_53%)]",
  instagram: "border-l-[hsl(340_82%_52%)]",
  facebook: "border-l-[hsl(221_44%_41%)]",
};

export const SocialFeed = () => {
  return (
    <section className="py-16 lg:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-2">
              Social <span className="okc-gradient-text">Pulse</span>
            </h2>
            <p className="text-muted-foreground">
              What OKC is talking about right now
            </p>
          </div>
          <div className="flex gap-3">
            <button className="social-badge social-badge-twitter">
              <Twitter className="w-3 h-3" /> Twitter
            </button>
            <button className="social-badge social-badge-instagram">
              <Instagram className="w-3 h-3" /> Instagram
            </button>
            <button className="social-badge social-badge-facebook">
              <Facebook className="w-3 h-3" /> Facebook
            </button>
          </div>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {MOCK_POSTS.map((post, index) => (
            <div
              key={post.id}
              className={`bg-card p-5 border-l-4 ${platformStyles[post.platform]} animate-fade-in`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-muted flex items-center justify-center text-muted-foreground">
                    <PlatformIcon platform={post.platform} />
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm">{post.author}</p>
                    <p className="text-muted-foreground text-xs">{post.handle}</p>
                  </div>
                </div>
                <span className="text-muted-foreground text-xs">{post.timestamp}</span>
              </div>

              {/* Content */}
              <p className="text-foreground leading-relaxed mb-3">{post.content}</p>

              {/* Footer */}
              <div className="flex items-center gap-4 text-muted-foreground text-xs">
                <span>❤️ {post.likes}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
