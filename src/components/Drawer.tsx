import { Link, useLocation } from 'react-router-dom';
import { Calendar, Scroll, X, Book, Table, LayoutGrid, Home, Brain, BookOpen, Loader2, CheckCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const location = useLocation();
  const { downloadStatus } = useSettings();
  const bsbStatus = downloadStatus?.['BSB'];

  const menuItems = [
    { path: '/', label: 'Today', subtitle: 'Action Items', icon: Home },
    { path: '/bible/read', label: 'Bible Reader', subtitle: 'Read Scripture', icon: Book },
    { path: '/bible/memory', label: 'Bible Memory', subtitle: 'Memorize Scripture', icon: Brain },
    { path: '/bible/study', label: 'Bible Study', subtitle: 'Deep Dive Tools', icon: BookOpen },
    { path: '/schedule', label: 'Schedule', subtitle: 'Quarterly Plan', icon: LayoutGrid },
    { path: '/table', label: 'Curriculum', subtitle: 'Quarterly Content', icon: Table },
    { path: '/tradition', label: 'Tradition', subtitle: 'Creed & Pyramid', icon: Scroll },
  ];

  const handleItemClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 animate-fade-in"
        onClick={onClose}
      />

      {/* Drawer */}
      <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r border-border z-[70] shadow-2xl animate-slide-up sm:animate-none sm:transition-transform flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-border shrink-0">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-foreground">Light Trail Network</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">Navigate the trail</p>
        </div>

        {/* Menu Items */}
        <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleItemClick}
                className={`flex items-center px-4 py-3 rounded-xl transition-all group ${isActive
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                  }`}
              >
                <div className={`p-2 rounded-lg mr-4 ${isActive ? 'bg-primary-foreground/10' : 'bg-background border border-border group-hover:border-primary/20'}`}>
                  <Icon className={`w-5 h-5 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-primary'}`} />
                </div>
                <div className="flex flex-col">
                  <span className={`font-semibold text-sm ${isActive ? 'text-primary-foreground' : 'text-foreground'}`}>{item.label}</span>
                  <span className={`text-xs ${isActive ? 'text-primary-foreground/80' : 'text-muted-foreground'}`}>{item.subtitle}</span>
                </div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-6 border-t border-border bg-muted/50 shrink-0 space-y-4">

          {/* Download Status Indicator */}
          {bsbStatus?.isDownloading && (
            <div className="flex items-center gap-3 text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-900">
              <Loader2 className="w-4 h-4 animate-spin shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="font-semibold text-xs uppercase tracking-wider mb-0.5">Updating Library</span>
                <span className="text-xs opacity-90 truncate">Downloading Translations ({bsbStatus.progress}%)</span>
              </div>
            </div>
          )}

          <div className="text-center">
            <p className="text-xs text-muted-foreground">
              Local-first • No tracking • Offline-ready
            </p>
            <p className="text-xs text-muted-foreground/60 mt-1">
              Version 1.0.0
            </p>
          </div>
        </div>
      </div>
    </>
  );
}