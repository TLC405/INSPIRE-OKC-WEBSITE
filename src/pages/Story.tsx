import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, AlertTriangle, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const chapters = [
  {
    number: 1,
    title: "What Happened",
    excerpt: "The day everything changed. Losing someone who defined your world.",
    hasWarning: true,
    warningText: "Contains discussion of death and grief.",
    content: `
      <p class="text-lg mb-6">There are moments that split your life into "before" and "after." This is mine.</p>
      <p class="mb-4">I won't pretend I have all the words for it. Some days, I still don't. But here's what I know: when you lose someone you love, the world doesn't stop. Bills still come. People still expect you to show up. Life keeps moving whether you're ready or not.</p>
      <p class="mb-4">For months, I existed in a fog. Going through the motions. Smiling when expected. Dying inside.</p>
      <p class="mb-4">This isn't the inspirational part. This is the real part. The ugly, painful, raw part that nobody talks about in motivational speeches.</p>
    `,
  },
  {
    number: 2,
    title: "What It Changed",
    excerpt: "How loss rewired my brain, my priorities, and my definition of success.",
    hasWarning: false,
    content: `
      <p class="text-lg mb-6">Grief doesn't just break you. It rebuilds you. Whether you like it or not.</p>
      <p class="mb-4">I stopped caring about things that used to consume me. Status. Approval. The endless chase for "more." None of it mattered when I was staring at the ceiling at 3am wondering why I was still here and they weren't.</p>
      <p class="mb-4">But slowly—painfully slowly—something else started to emerge. A clarity I didn't have before. An urgency to build something that mattered. To stop waiting for the "right time" that might never come.</p>
      <p class="mb-4">Because if there's one thing death teaches you, it's that time is the only currency that actually matters. And we're all running out of it.</p>
    `,
  },
  {
    number: 3,
    title: "What I Built Because of It",
    excerpt: "From grief to purpose. Building Inspire OKC and everything else.",
    hasWarning: false,
    content: `
      <p class="text-lg mb-6">This is the chapter I'm still writing.</p>
      <p class="mb-4">Inspire OKC exists because I needed it to exist. Not for clout. Not for money. Because I needed to believe that strangers could become community. That people could actually show up for each other in a world that feels increasingly disconnected.</p>
      <p class="mb-4">Every app I've built, every podcast episode, every event—it's all an attempt to create what I wished existed when I was at my lowest.</p>
      <p class="mb-4">A place where people are real. Where showing up matters more than performing. Where you can be broken and still belong.</p>
      <p class="mb-6">That's what I'm building. That's why I'm here. And if any of this resonates with you—I hope you'll join me.</p>
    `,
  },
];

const Story = () => {
  const [selectedChapter, setSelectedChapter] = useState<number | null>(null);
  const [warningAccepted, setWarningAccepted] = useState(false);

  const currentChapter = selectedChapter !== null ? chapters[selectedChapter] : null;

  const handleChapterClick = (index: number) => {
    const chapter = chapters[index];
    if (chapter.hasWarning && !warningAccepted) {
      setSelectedChapter(index);
    } else {
      setSelectedChapter(index);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Page Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tight mb-4">
              My <span className="okc-gradient-text">Story</span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Grief, loss, and why I chose to build.
            </p>
          </div>

          {/* Content Warning Banner */}
          <div className="brutal-card p-6 mb-8 bg-muted/50">
            <div className="flex items-start gap-4">
              <AlertTriangle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="font-bold mb-2">Content Note</h3>
                <p className="text-muted-foreground text-sm">
                  This section contains heavy topics including death and grief. 
                  Take care of yourself first. If you're not in a space for this today,{" "}
                  <Link to="/apps" className="text-primary hover:underline">
                    explore lighter content here
                  </Link>.
                </p>
              </div>
            </div>
          </div>

          {!currentChapter ? (
            /* Chapter Selection */
            <div className="space-y-4">
              {chapters.map((chapter, index) => (
                <button
                  key={chapter.number}
                  onClick={() => handleChapterClick(index)}
                  className="w-full brutal-card p-6 text-left hover:-translate-y-1 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-primary font-bold uppercase tracking-wide mb-1">
                        Chapter {chapter.number}
                      </p>
                      <h3 className="text-xl font-black uppercase mb-2">{chapter.title}</h3>
                      <p className="text-muted-foreground">{chapter.excerpt}</p>
                      {chapter.hasWarning && (
                        <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" />
                          {chapter.warningText}
                        </p>
                      )}
                    </div>
                    <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </button>
              ))}
            </div>
          ) : currentChapter.hasWarning && !warningAccepted ? (
            /* Warning Gate */
            <div className="brutal-card p-8 text-center">
              <AlertTriangle className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-black uppercase mb-2">Content Warning</h3>
              <p className="text-muted-foreground mb-6">{currentChapter.warningText}</p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button 
                  onClick={() => setWarningAccepted(true)}
                  className="brutal-btn font-bold"
                >
                  I'm Ready to Read
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => setSelectedChapter(null)}
                  className="brutal-border font-bold"
                >
                  Go Back
                </Button>
              </div>
            </div>
          ) : (
            /* Chapter Content */
            <div className="space-y-8">
              <Button 
                variant="ghost" 
                onClick={() => {
                  setSelectedChapter(null);
                  setWarningAccepted(false);
                }}
                className="font-bold"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                All Chapters
              </Button>

              <article className="brutal-card p-8">
                <p className="text-sm text-primary font-bold uppercase tracking-wide mb-2">
                  Chapter {currentChapter.number}
                </p>
                <h2 className="text-3xl font-black uppercase mb-8">{currentChapter.title}</h2>
                <div 
                  className="prose prose-invert max-w-none"
                  dangerouslySetInnerHTML={{ __html: currentChapter.content }}
                />
              </article>

              {/* Navigation */}
              <div className="flex justify-between">
                {selectedChapter > 0 && (
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setSelectedChapter(selectedChapter - 1);
                      setWarningAccepted(false);
                    }}
                    className="brutal-border font-bold"
                  >
                    Previous Chapter
                  </Button>
                )}
                {selectedChapter < chapters.length - 1 && (
                  <Button 
                    onClick={() => {
                      setSelectedChapter(selectedChapter + 1);
                      setWarningAccepted(false);
                    }}
                    className="brutal-btn font-bold ml-auto"
                  >
                    Next Chapter
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Story;
