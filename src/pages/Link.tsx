import { useState } from "react";
import type { Relation } from "../data/types";

export default function Link() {
  const [activeTab, setActiveTab] = useState<"generate" | "scan">("generate");
  const [selectedRelation, setSelectedRelation] =
    useState<Relation>("myMentee");

  const relations: { value: Relation; label: string }[] = [
    { value: "myMentee", label: "Add me as your Mentor" },
    { value: "myMentor", label: "Add me as your Mentee" },
    { value: "myScout", label: "Add me as your Steward" },
    { value: "mySteward", label: "Add me as your Scout" },
    { value: "myPreScout", label: "Add me as your Pre-Scout contact" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4">
          <h1 className="text-xl font-semibold">Link & QR</h1>
          <p className="text-primary-100 text-sm">
            Connect with your triad members
          </p>
        </div>

        {/* Tabs */}
        <div className="flex bg-white border-b">
          <button
            onClick={() => setActiveTab("generate")}
            className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeTab === "generate"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500"
            }`}
          >
            My Codes
          </button>
          <button
            onClick={() => setActiveTab("scan")}
            className={`flex-1 py-3 px-4 text-center font-medium border-b-2 transition-colors ${
              activeTab === "scan"
                ? "border-primary-600 text-primary-600"
                : "border-transparent text-gray-500"
            }`}
          >
            Scan
          </button>
        </div>

        {/* Content */}
        <div className="p-4">
          {activeTab === "generate" ? (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Generate link code for:
                </label>
                <select
                  value={selectedRelation}
                  onChange={(e) =>
                    setSelectedRelation(e.target.value as Relation)
                  }
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  {relations.map((relation) => (
                    <option key={relation.value} value={relation.value}>
                      {relation.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* QR Code Display */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-48 h-48 bg-white mx-auto rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">
                    QR Code will appear here
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Have them scan this code to link with you
                </p>
              </div>

              <button className="w-full btn btn-secondary">
                Generate Activity Snapshot
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Camera View */}
              <div className="bg-gray-100 rounded-lg p-8 text-center">
                <div className="w-full h-48 bg-gray-200 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
                  <span className="text-gray-500">
                    Camera view will appear here
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Point camera at QR code to scan
                </p>
              </div>

              <button className="w-full btn btn-primary">Start Camera</button>

              {/* Manual Entry */}
              <div className="border-t pt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter code manually:
                </label>
                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Paste QR code data here..."
                />
                <button className="w-full mt-2 btn btn-secondary">
                  Process Code
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
