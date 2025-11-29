import { useState, useEffect } from "react";
import { QrCode, Scan, Camera, Copy, Check, RefreshCw } from "lucide-react";
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
    <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
      {/* Tabs */}
      <div className="bg-card border border-border rounded-xl p-1 grid grid-cols-2 gap-1">
        <button
          onClick={() => setActiveTab("generate")}
          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "generate"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
        >
          <QrCode className="w-4 h-4" />
          My Codes
        </button>
        <button
          onClick={() => setActiveTab("scan")}
          className={`flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeTab === "scan"
              ? "bg-primary text-primary-foreground shadow-sm"
              : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
            }`}
        >
          <Scan className="w-4 h-4" />
          Scan
        </button>
      </div>

      <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
        {activeTab === "generate" ? (
          <div className="space-y-8">
            <div className="space-y-4">
              <label className="block text-sm font-medium text-foreground">
                Generate link code for:
              </label>
              <select
                value={selectedRelation}
                onChange={(e) =>
                  setSelectedRelation(e.target.value as Relation)
                }
                className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-input transition-colors"
              >
                {relations.map((relation) => (
                  <option key={relation.value} value={relation.value}>
                    {relation.label}
                  </option>
                ))}
              </select>

              {/* QR Code Display */}
              <div className="bg-muted/30 rounded-xl p-8 text-center border border-border border-dashed">
                <div className="w-48 h-48 bg-white mx-auto rounded-xl shadow-sm p-4 flex items-center justify-center">
                  {isGenerating ? (
                    <RefreshCw className="animate-spin text-primary w-8 h-8" />
                  ) : qrCodeUrl ? (
                    <img src={qrCodeUrl} alt="Link QR Code" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground">
                      QR Code will appear here
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-4 max-w-xs mx-auto">
                  Have them scan this code to link with you as their {selectedRelation.replace('my', '').toLowerCase()}
                </p>
              </div>
            </div>

            {/* Activity Snapshot Section */}
            <div className="border-t border-border pt-8">
              <h3 className="text-lg font-semibold text-foreground mb-4">Activity Snapshot</h3>
              <div className="bg-muted/30 rounded-xl p-6 text-center border border-border border-dashed">
                <div className="w-32 h-32 bg-white mx-auto rounded-xl shadow-sm p-2 flex items-center justify-center">
                  {activityQrUrl ? (
                    <img src={activityQrUrl} alt="Activity QR Code" className="w-full h-full object-contain" />
                  ) : (
                    <span className="text-muted-foreground/50 text-xs">
                      Activity QR
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-3">
                  Share your daily progress
                </p>
              </div>
              <button
                onClick={generateActivitySnapshot}
                className="w-full mt-4 btn btn-secondary flex items-center justify-center gap-2"
                disabled={isGenerating || !todayData}
              >
                {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                {isGenerating ? 'Generating...' : 'Generate Activity Snapshot'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Camera View */}
            <div className="bg-black/5 rounded-xl overflow-hidden aspect-square relative">
              <QRScanner
                onScanResult={handleScanResult}
                onError={handleScanError}
                isActive={isCameraActive}
              />
              {!isCameraActive && (
                <div className="absolute inset-0 flex items-center justify-center bg-muted/50">
                  <Camera className="w-12 h-12 text-muted-foreground/50" />
                </div>
              )}
            </div>

            <button
              onClick={() => setIsCameraActive(!isCameraActive)}
              className={`w-full btn ${isCameraActive ? 'bg-destructive hover:bg-destructive/90 text-destructive-foreground' : 'btn-primary'}`}
            >
              {isCameraActive ? 'Stop Camera' : 'Start Camera'}
            </button>

            {/* Scan Result */}
            {scanResult && (
              <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 animate-fade-in">
                <h4 className="font-medium text-primary mb-2 flex items-center gap-2">
                  <Check className="w-4 h-4" />
                  Scan Result
                </h4>
                <p className="text-sm text-foreground/80">{scanResult}</p>
              </div>
            )}

            {/* Manual Entry */}
            <div className="border-t border-border pt-6">
              <label className="block text-sm font-medium text-foreground mb-2">
                Or enter code manually:
              </label>
              <textarea
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value)}
                className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-input transition-colors text-sm font-mono"
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
  );
}
