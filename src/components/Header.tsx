import { Menu, Settings, WifiOff, Loader2, CheckCircle } from 'lucide-react';
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

  return (
    <header className={`bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 transition-transform duration-300 ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}>
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left side - Menu button and title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-semibold text-foreground">{title}</h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-muted-foreground hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right side - Settings Button */}
          <div className="flex items-center space-x-2">
            {/* Download Progress */}
            {bsbStatus?.isDownloading && (
              <div
                className="p-2 text-primary"
                title={`Downloading BSB: ${bsbStatus.progress}%`}
              >
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            )}

            {/* Offline Ready Indicator (Online only) */}
            {bsbStatus?.isReady && !isOffline && (
              <div
                className="p-2 text-green-500/70 hover:text-green-600 transition-colors cursor-help"
                title="BSB available offline"
              >
                <CheckCircle className="w-5 h-5" />
              </div>
            )}

            {isOffline && (
              <div
                className="p-2 text-muted-foreground/70"
                title="You are offline. Showing available local translations."
              >
                <WifiOff className="w-5 h-5" />
              </div>
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