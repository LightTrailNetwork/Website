import { useState } from "react";
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
    <div className="max-w-6xl mx-auto bg-white shadow-sm">
      <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
        {/* Introduction Section */}
        <div className="text-center space-y-4">
          <div className="max-w-4xl mx-auto">
            <p className="text-base lg:text-lg text-gray-700 leading-relaxed">
              {passagesData.headline}
            </p>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Column - Pyramid */}
          <div className="flex flex-col items-center space-y-6">
            <div className="w-full">
              <h2 className="text-xl font-semibold text-gray-900 text-center mb-4">
                The Passage Pyramid
              </h2>
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-6 lg:p-8">
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
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-800">
                  <strong>Interactive:</strong> Click any letter on the pyramid
                  to highlight the corresponding passage in the list →
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Passage List */}
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Scripture Passages
            </h2>
            <div className="max-h-[70vh] overflow-y-auto pr-2 space-y-4">
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
          <h2 className="text-xl font-semibold text-gray-900 text-center">
            Scripture Passages
          </h2>
          <div className="space-y-4">
            <PassageList
              selectedLetter={selectedLetter}
              hoveredLetter={hoveredLetter}
              onLetterClick={handleLetterClick}
              onLetterHover={handleLetterHover}
            />
          </div>
        </div>

        {/* Footer Info */}
        <div className="border-t pt-6 mt-8">
          <div className="text-center space-y-2">
            <p className="text-sm text-gray-600">
              This pyramid contains 40 foundational Bible passages organized
              around three core themes:
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full font-medium">
                Abide - Personal Relationship with God
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full font-medium">
                Imitate - Following Christ's Example
              </span>
              <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full font-medium">
                Mobilize - Serving Others
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
