import { useState } from "react";
import { BookOpen, Info } from "lucide-react";
import PyramidSVG from "../components/PyramidSVG";
import PassageList from "../components/PassageList";
import passagesData from "../data/pyramidPassages.json";

export default function Tradition() {
  const [hoveredLetter, setHoveredLetter] = useState<string | null>(null);
  const [selectedLetter, setSelectedLetter] = useState("AIM (Key)");

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
          <p className="text-lg text-muted-foreground leading-relaxed font-light whitespace-pre-line">
            {passagesData.headline}
          </p>
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
            <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4">
              <PyramidSVG
                selectedLetter={selectedLetter}
                hoveredLetter={hoveredLetter}
                onLetterClick={handleLetterClick}
                onLetterHover={handleLetterHover}
              />
            </div>
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
