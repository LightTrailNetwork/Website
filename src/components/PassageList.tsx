import React from "react";
import passagesData from "../data/pyramidPassages.json";

interface PassageListProps {
  selectedLetter: string;
  hoveredLetter: string | null;
  onLetterClick: (letter: string) => void;
  onLetterHover: (letter: string | null) => void;
}

export default function PassageList({
  selectedLetter,
  hoveredLetter,
  onLetterClick,
  onLetterHover,
}: PassageListProps) {
  // Helper function to parse markdown-style formatting
  const parseFormattedText = (text: string): string => {
    if (!text) return text;

    return text
      .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      .replace(/\*(.*?)\*/g, "<em>$1</em>");
  };

  // Get all passages for easy lookup
  const allPassages = [
    ...passagesData.outerPassages.passages,
    ...passagesData.innerPassages.sections.flatMap((section) =>
      section.subsections.flatMap((subsection) => subsection.passages)
    ),
  ];

  return (
    <div className="space-y-6">
      {/* Outer Passages */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {passagesData.outerPassages.title}
        </h3>
        <div className="space-y-3 px-1">
          {passagesData.outerPassages.passages.map((passage, i) => (
            <div
              key={i}
              id={`passage-${passage.key}`}
              className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedLetter === passage.key || hoveredLetter === passage.key
                  ? "bg-primary/10 border-primary shadow-sm transform scale-[1.01]"
                  : "bg-card border-border hover:bg-accent/50 hover:border-primary/50"
                }`}
              onClick={() => onLetterClick(passage.key)}
              onMouseEnter={() => onLetterHover(passage.key)}
              onMouseLeave={() => onLetterHover(null)}
            >
              <div className="font-bold text-primary text-sm mb-2">
                {passage.key}
              </div>
              <div
                className="text-sm text-foreground leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: parseFormattedText(passage.text),
                }}
              />
              {passage.reference && (
                <div className="text-xs text-muted-foreground mt-2 font-medium">
                  {passage.reference}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inner Passages */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-foreground border-b border-border pb-2">
          {passagesData.innerPassages.title}
        </h3>
        <div className="space-y-6">
          {passagesData.innerPassages.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h4 className="text-base font-bold text-foreground/90 border-b border-border pb-1">
                {section.category}
              </h4>
              {section.subsections.map((subsection, subIdx) => (
                <div key={subIdx} className="space-y-3">
                  <h5 className="text-sm font-semibold text-muted-foreground italic">
                    {subsection.title}
                  </h5>
                  <div className="space-y-2 px-1">
                    {subsection.passages.map((passage, pIdx) => (
                      <div
                        key={pIdx}
                        id={`passage-${passage.key}`}
                        className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedLetter === passage.key ||
                            hoveredLetter === passage.key
                            ? "bg-primary/10 border-primary shadow-sm transform scale-[1.01]"
                            : "bg-card border-border hover:bg-accent/50 hover:border-primary/50"
                          }`}
                        onClick={() => onLetterClick(passage.key)}
                        onMouseEnter={() => onLetterHover(passage.key)}
                        onMouseLeave={() => onLetterHover(null)}
                      >
                        <div className="font-bold text-primary text-sm mb-1">
                          {passage.key}
                        </div>
                        <div
                          className="text-sm text-foreground leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: parseFormattedText(passage.text),
                          }}
                        />
                        {passage.reference && (
                          <div className="text-xs text-muted-foreground mt-2 font-medium">
                            {passage.reference}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
