import { useState, useEffect, useRef } from 'react';
import { Menu, Settings, WifiOff, Loader2, CheckCircle, Info, Book } from 'lucide-react';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useSettings } from '../context/SettingsContext';

interface HeaderProps {
  onMenuClick: () => void;
  onSettingsClick: () => void;
  title: string;
  subtitle?: string;
}

export default function Header({ onMenuClick, onSettingsClick, title, subtitle }: HeaderProps) {
  const { scrollDirection, isAtTop } = useScrollDirection();
  const { isOffline, downloadStatus } = useSettings();
  const isHidden = scrollDirection === 'down' && !isAtTop;
  const bsbStatus = downloadStatus?.['BSB'];

  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);
  const [showCheckmark, setShowCheckmark] = useState(false);
  const prevReadyRef = useRef<boolean | undefined>(undefined);

  // Monitor download completion
  useEffect(() => {
    // If status changes from not-ready to ready, show checkmark
    // We check prevReadyRef to avoid showing on initial load if already ready
    if (prevReadyRef.current === false && bsbStatus?.isReady) {
      setShowCheckmark(true);
      const timer = setTimeout(() => setShowCheckmark(false), 5000); // Hide after 5s
      return () => clearTimeout(timer);
    }
    prevReadyRef.current = bsbStatus?.isReady;
  }, [bsbStatus?.isReady]);

  useEffect(() => {
    if (activeTooltip) {
      const timer = setTimeout(() => setActiveTooltip(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [activeTooltip]);

  const handleIconClick = (message: string) => {
    setActiveTooltip(message);
  };

  return (
    <header className={`bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 relative">
          {/* Left side - Menu button and title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <a href="/" className="flex flex-col hover:opacity-80 transition-opacity">
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  {subtitle}
                </p>
              )}
            </a>
          </div>

          {/* Right side - Settings Button */}
          <div className="flex items-center space-x-2">
            {/* activeTooltip Display - Mobile Friendly "Toast" positioned absolute */}
            {activeTooltip && (
              <div className="absolute top-16 right-4 sm:right-12 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-md border border-border text-xs sm:text-sm z-50 animate-in fade-in slide-in-from-top-2 max-w-[200px] text-center">
                {activeTooltip}
              </div>
            )}

            {/* Quick Link: Bible Reader */}
            <a
              href="/bible/read"
              className="p-2 text-muted-foreground hover:text-primary hover:bg-accent/50 rounded-full transition-colors"
              title="Bible Reader"
            >
              <Book className="w-5 h-5" />
            </a>

            {/* Download Progress */}
            {bsbStatus?.isDownloading && (
              <button
                onClick={() => handleIconClick(`Downloading Bible data: ${bsbStatus.progress}%`)}
                className="p-2 text-primary hover:bg-accent/50 rounded-full transition-colors"
                title={`Downloading known translations: ${bsbStatus.progress}%`}
              >
                <Loader2 className="w-5 h-5 animate-spin" />
              </button>
            )}

            {/* Offline Ready Indicator (Only shows briefly after download) */}
            {showCheckmark && !isOffline && (
              <button
                onClick={() => handleIconClick("Download complete! Ready for offline use.")}
                className="p-2 text-green-500 hover:bg-green-500/10 rounded-full transition-all animate-in zoom-in spin-in-90"
                title="Download complete"
              >
                <CheckCircle className="w-5 h-5" />
              </button>
            )}

            {isOffline && (
              <button
                onClick={() => handleIconClick("You are offline. specific features may be limited.")}
                className="p-2 text-muted-foreground/70 hover:text-foreground hover:bg-accent/50 rounded-full transition-colors"
                title="You are offline"
              >
                <WifiOff className="w-5 h-5" />
              </button>
            )}
            <button
              onClick={onSettingsClick}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              aria-label="Open settings"
            >
              <Settings className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}