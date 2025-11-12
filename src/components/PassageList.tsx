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
        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
          {passagesData.outerPassages.title}
        </h3>
        <div className="space-y-3 px-1">
          {passagesData.outerPassages.passages.map((passage, i) => (
            <div
              key={i}
              id={`passage-${passage.key}`}
              className={`p-4 rounded-lg border-l-4 transition-all cursor-pointer ${
                selectedLetter === passage.key || hoveredLetter === passage.key
                  ? "bg-red-50 border-l-red-500 shadow-md transform scale-[1.01]"
                  : "bg-gray-50 border-l-gray-300 hover:bg-gray-100"
              }`}
              onClick={() => onLetterClick(passage.key)}
              onMouseEnter={() => onLetterHover(passage.key)}
              onMouseLeave={() => onLetterHover(null)}
            >
              <div className="font-bold text-gray-900 text-sm mb-2">
                {passage.key}
              </div>
              <div
                className="text-sm text-gray-700 leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: parseFormattedText(passage.text),
                }}
              />
              {passage.reference && (
                <div className="text-xs text-gray-500 mt-2 font-medium">
                  {passage.reference}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Inner Passages */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-gray-900 border-b-2 border-gray-200 pb-2">
          {passagesData.innerPassages.title}
        </h3>
        <div className="space-y-6">
          {passagesData.innerPassages.sections.map((section, sIdx) => (
            <div key={sIdx} className="space-y-4">
              <h4 className="text-base font-bold text-gray-800 border-b border-gray-200 pb-1">
                {section.category}
              </h4>
              {section.subsections.map((subsection, subIdx) => (
                <div key={subIdx} className="space-y-3">
                  <h5 className="text-sm font-semibold text-gray-700 italic">
                    {subsection.title}
                  </h5>
                  <div className="space-y-2 px-1">
                    {subsection.passages.map((passage, pIdx) => (
                      <div
                        key={pIdx}
                        id={`passage-${passage.key}`}
                        className={`p-3 rounded-lg border-l-4 transition-all cursor-pointer ${
                          selectedLetter === passage.key ||
                          hoveredLetter === passage.key
                            ? "bg-red-50 border-l-red-500 shadow-md transform scale-[1.01]"
                            : "bg-gray-50 border-l-gray-300 hover:bg-gray-100"
                        }`}
                        onClick={() => onLetterClick(passage.key)}
                        onMouseEnter={() => onLetterHover(passage.key)}
                        onMouseLeave={() => onLetterHover(null)}
                      >
                        <div className="font-bold text-gray-900 text-sm mb-1">
                          {passage.key}
                        </div>
                        <div
                          className="text-sm text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{
                            __html: parseFormattedText(passage.text),
                          }}
                        />
                        {passage.reference && (
                          <div className="text-xs text-gray-500 mt-2 font-medium">
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
