import { useState, useEffect } from "react";
import type { Relation } from "../data/types";
import { useProfile } from "../hooks/useProfile";
import { useTodayData } from "../hooks/useTodayData";
import { generateLinkQR, generateActivityQR, processLinkPayload, processActivitySnapshot } from "../utils/qr";
import type { LinkPayload, ActivitySnapshot } from "../utils/qr";
import QRScanner from "../components/QRScanner";

export default function Link() {
  const { profile } = useProfile();
  const { todayData } = useTodayData();
  const [activeTab, setActiveTab] = useState<"generate" | "scan">("generate");
  const [selectedRelation, setSelectedRelation] = useState<Relation>("myMentee");
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
  const [activityQrUrl, setActivityQrUrl] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [scanResult, setScanResult] = useState<string>('');
  const [manualCode, setManualCode] = useState<string>('');

  const relations: { value: Relation; label: string }[] = [
    { value: "myMentee", label: "Add me as your Mentor" },
    { value: "myMentor", label: "Add me as your Mentee" },
    { value: "myScout", label: "Add me as your Steward" },
    { value: "mySteward", label: "Add me as your Scout" },
    { value: "myPreScout", label: "Add me as your Pre-Scout contact" },
  ];

  // Generate link QR code
  const generateLinkCode = async () => {
    if (!profile) return;
    
    setIsGenerating(true);
    try {
      const qrUrl = await generateLinkQR(profile, selectedRelation);
      setQrCodeUrl(qrUrl);
    } catch (error) {
      console.error('Error generating QR code:', error);
      setScanResult('Failed to generate QR code');
    }
    setIsGenerating(false);
  };

  // Generate activity snapshot QR
  const generateActivitySnapshot = async () => {
    if (!profile || !todayData) return;
    
    setIsGenerating(true);
    try {
      const qrUrl = await generateActivityQR(profile, {
        morning: todayData.morning,
        afternoon: todayData.afternoon,
        night: todayData.night,
      });
      setActivityQrUrl(qrUrl);
    } catch (error) {
      console.error('Error generating activity QR code:', error);
      setScanResult('Failed to generate activity QR code');
    }
    setIsGenerating(false);
  };

  // Handle QR scan result
  const handleScanResult = (result: LinkPayload | ActivitySnapshot) => {
    setIsCameraActive(false);
    
    if (result.type === 'triad-link') {
      const processed = processLinkPayload(result);
      setScanResult(processed.message);
    } else if (result.type === 'activity-snapshot') {
      const processed = processActivitySnapshot(result);
      setScanResult(`Activity from ${result.userName}: Morning(${result.todayProgress.morning ? '✓' : '✗'}), Afternoon(${result.todayProgress.afternoon ? '✓' : '✗'}), Night(${result.todayProgress.night ? '✓' : '✗'})`);
    }
  };

  // Handle scan error
  const handleScanError = (error: string) => {
    setScanResult(`Error: ${error}`);
  };

  // Process manual code
  const processManualCode = () => {
    try {
      const decoded = JSON.parse(manualCode);
      handleScanResult(decoded);
    } catch (error) {
      setScanResult('Invalid code format');
    }
  };

  // Generate QR code when relation changes
  useEffect(() => {
    if (profile && activeTab === 'generate') {
      generateLinkCode();
    }
  }, [selectedRelation, profile, activeTab]);

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-sm">

        {/* Tabs */}
        <div className="flex bg-white border-b px-4 sm:px-6 lg:px-8">
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

        {/* Content - responsive layout */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="max-w-2xl mx-auto">
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
                <div className="w-48 h-48 bg-white mx-auto rounded-lg border flex items-center justify-center">
                  {isGenerating ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                  ) : qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Link QR Code" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-gray-500">
                      QR Code will appear here
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  Have them scan this code to link with you as their {selectedRelation.replace('my', '').toLowerCase()}
                </p>
              </div>

              {/* Activity Snapshot Section */}
              <div className="border-t pt-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Activity Snapshot</h3>
                <div className="bg-gray-100 rounded-lg p-6 text-center">
                  <div className="w-32 h-32 bg-white mx-auto rounded-lg border flex items-center justify-center">
                    {activityQrUrl ? (
                      <img src={activityQrUrl} alt="Activity QR Code" className="w-full h-full object-contain" />
                    ) : (
                      <span className="text-gray-400 text-xs">
                        Activity QR
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 mt-2">
                    Share your daily progress
                  </p>
                </div>
                <button 
                  onClick={generateActivitySnapshot}
                  className="w-full mt-4 btn btn-secondary"
                  disabled={isGenerating || !todayData}
                >
                  {isGenerating ? 'Generating...' : 'Generate Activity Snapshot'}
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Camera View */}
              <div className="bg-gray-100 rounded-lg p-6">
                <QRScanner
                  onScanResult={handleScanResult}
                  onError={handleScanError}
                  isActive={isCameraActive}
                />
              </div>

              <button 
                onClick={() => setIsCameraActive(!isCameraActive)}
                className="w-full btn btn-primary"
              >
                {isCameraActive ? 'Stop Camera' : 'Start Camera'}
              </button>

              {/* Scan Result */}
              {scanResult && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="font-medium text-blue-900 mb-2">Scan Result:</h4>
                  <p className="text-sm text-blue-800">{scanResult}</p>
                </div>
              )}

              {/* Manual Entry */}
              <div className="border-t pt-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Or enter code manually:
                </label>
                <textarea
                  value={manualCode}
                  onChange={(e) => setManualCode(e.target.value)}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  rows={3}
                  placeholder="Paste QR code data here..."
                />
                <button 
                  onClick={processManualCode}
                  className="w-full mt-2 btn btn-secondary"
                  disabled={!manualCode.trim()}
                >
                  Process Code
                </button>
              </div>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  );
}
