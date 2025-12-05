import { useState } from "react";
import { BookOpen, Info, ZoomIn, ZoomOut, RotateCcw, Scroll } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import PyramidSVG from "../components/PyramidSVG";
import PassageList from "../components/PassageList";
import passagesData from "../data/pyramidPassages.json";

export default function Tradition() {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);

  // Helper to find passage data by key
  const findPassageByKey = (key: string) => {
    // Check outer passages
    const outer = passagesData.outerPassages.passages.find((p) => p.key === key);
    if (outer) return outer;

    // Check inner passages
    for (const section of passagesData.innerPassages.sections) {
      for (const subsection of section.subsections) {
        const inner = subsection.passages.find((p) => p.key === key);
        if (inner) return inner;
      }
    }
    return null;
  };

  const [selectedLetter, setSelectedLetter] = useState("AIM (Key)");
  const selectedPassage = findPassageByKey(selectedLetter);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
  };

  const handleLetterHover = (letter: string | null) => {
    setHoveredLetter(letter);
  };
  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
      {/* Introduction Section */}
      <div className="text-center space-y-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-xl font-semibold text-foreground text-center mb-4 flex items-center justify-center gap-2">
            <Scroll className="w-5 h-5 text-primary" />
            The Tradition
          </h2>
          <p
            className="text-lg text-muted-foreground leading-relaxed font-light whitespace-pre-line"
            dangerouslySetInnerHTML={{
              __html: passagesData.headline
                .replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-primary">$1</span>')
                .replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
            }}
          />
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Left Column - Pyramid */}
        <div className="flex flex-col items-center space-y-6">
          <div className="w-full bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
            <h2 className="text-xl font-semibold text-foreground text-center mb-6 flex items-center justify-center gap-2">
              <BookOpen className="w-5 h-5 text-primary" />
              The Passage Pyramid
            </h2>
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 relative overflow-hidden group">
              <TransformWrapper
                initialScale={1}
                minScale={0.5}
                maxScale={4}
                centerOnInit={true}
                wheel={{ step: 0.1 }}
              >
                {({ zoomIn, zoomOut, resetTransform }) => (
                  <>
                    <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <button
                        onClick={() => zoomIn()}
                        className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        title="Zoom In"
                      >
                        <ZoomIn className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => zoomOut()}
                        className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        title="Zoom Out"
                      >
                        <ZoomOut className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => resetTransform()}
                        className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                        title="Reset View"
                      >
                        <RotateCcw className="w-4 h-4" />
                      </button>
                    </div>
                    <TransformComponent wrapperClass="!w-full !h-full" contentClass="!w-full !h-full flex items-center justify-center">
                      <PyramidSVG
                        selectedLetter={selectedLetter}
                        hoveredLetter={hoveredLetter}
                        onLetterClick={handleLetterClick}
                        onLetterHover={handleLetterHover}
                      />
                    </TransformComponent>
                  </>
                )}
              </TransformWrapper>
            </div>

            {/* Verse Preview Card */}
            {selectedPassage && (
              <div className="mt-4 bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex items-start gap-4">
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold whitespace-nowrap ${selectedPassage.key.replace(" (Key)", "").length > 8
                    ? "text-xs"
                    : selectedPassage.key.replace(" (Key)", "").length > 7
                      ? "text-sm"
                      : "text-lg"
                    }`}>
                    {selectedPassage.key.replace(" (Key)", "")}
                  </div>
                  <div className="space-y-2">
                    <p
                      className="text-lg text-foreground leading-relaxed font-serif"
                      dangerouslySetInnerHTML={{
                        __html: selectedPassage.text.replace(/\*\*(.*?)\*\*/g, '<span class="text-primary font-bold">$1</span>').replace(/\*(.*?)\*/g, '<span class="italic">$1</span>')
                      }}
                    />
                    <p className="text-sm text-muted-foreground font-medium">
                      {selectedPassage.reference}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Instructions */}
          <div className="w-full max-w-md text-center">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 flex items-center gap-3 text-left">
              <Info className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-sm text-foreground/80">
                <strong>Interactive:</strong> Click any letter on the pyramid
                to highlight the corresponding passage in the list.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column - Passage List (Desktop only) */}
        <div className="hidden lg:block space-y-4">
          <h2 className="text-xl font-semibold text-foreground flex items-center gap-2">
            Scripture Passages
          </h2>
          <div id="passage-list-desktop" className="max-h-[70vh] overflow-y-auto pr-2 space-y-4 scrollbar-thin scrollbar-thumb-border scrollbar-track-transparent">
            <PassageList
              selectedLetter={selectedLetter}
              hoveredLetter={hoveredLetter}
              onLetterClick={handleLetterClick}
              onLetterHover={handleLetterHover}
            />
          </div>
        </div>
      </div>

      {/* Mobile: Passage List Below Pyramid */}
      <div className="lg:hidden space-y-4">
        <h2 className="text-xl font-semibold text-foreground text-center">
          Scripture Passages
        </h2>
        <div id="passage-list-mobile" className="space-y-4">
          <PassageList
            selectedLetter={selectedLetter}
            hoveredLetter={hoveredLetter}
            onLetterClick={handleLetterClick}
            onLetterHover={handleLetterHover}
          />
        </div>
      </div>
    </div>
  );
}
