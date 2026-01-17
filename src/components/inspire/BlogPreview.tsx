import { Link } from "react-router-dom";
import { ArrowRight, BookOpen } from "lucide-react";

const FEATURED_POSTS = [
  {
    id: "1",
    title: "Grief, Loss, and Why I Chose to Build",
    excerpt: "The story behind Inspire OKC—what happened, what it changed, and what I'm building because of it.",
    category: "Story",
    readTime: "8 min",
    hasWarning: true,
  },
  {
    id: "2",
    title: "Building Community in the Age of Apps",
    excerpt: "Why real-life connections matter more than ever, and how we're doing it differently in OKC.",
    category: "Community",
    readTime: "5 min",
  },
  {
    id: "3",
    title: "From Idea to Impact: The TeeFeeMe Story",
    excerpt: "How a weekend project turned into a tool used by thousands. Lessons learned along the way.",
    category: "Tech",
    readTime: "6 min",
  },
];

export const BlogPreview = () => {
  return (
    <section className="py-16 lg:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-12">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground uppercase tracking-tight mb-2">
              The <span className="okc-gradient-text">Story</span>
            </h2>
            <p className="text-muted-foreground text-lg">
              Writing about community, technology, and what matters
            </p>
          </div>
          <Link to="/story">
            <button className="brutal-btn-outline brutal-btn text-sm">
              All Posts
              <ArrowRight className="w-4 h-4" />
            </button>
          </Link>
        </div>

        {/* Posts Grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {FEATURED_POSTS.map((post) => (
            <Link to={`/story#${post.id}`} key={post.id}>
              <article className="brutal-card h-full group">
                {post.hasWarning && (
                  <span className="inline-block px-2 py-1 text-xs font-bold uppercase bg-secondary text-secondary-foreground mb-3">
                    Contains heavy topics
                  </span>
                )}
                <span className="text-xs font-bold uppercase text-primary tracking-wider">
                  {post.category}
                </span>
                <h3 className="text-xl font-black mt-2 mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <BookOpen className="w-3 h-3" />
                  {post.readTime} read
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
