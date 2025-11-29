import { Link, useLocation } from 'react-router-dom';
import { Calendar, Scroll, Link as LinkIcon, Settings, Info, X } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Today', icon: Calendar },
    { path: '/tradition', label: 'Tradition', icon: Scroll },
    { path: '/link', label: 'Link & QR', icon: LinkIcon },
    { path: '/settings', label: 'Role & Settings', icon: Settings },
    { path: '/about', label: 'About & Privacy', icon: Info }
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
      <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r border-border z-50 shadow-2xl animate-slide-up sm:animate-none sm:transition-transform">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-foreground">Mentorship App</h2>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground">Navigate the triad</p>
        </div>

        {/* Menu Items */}
        <nav className="py-6 px-3 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={handleItemClick}
                className={`flex items-center px-3 py-2.5 rounded-lg transition-colors group ${isActive
                    ? 'bg-primary text-primary-foreground'
                    : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                <Icon className={`w-5 h-5 mr-3 ${isActive ? 'text-primary-foreground' : 'text-muted-foreground group-hover:text-accent-foreground'}`} />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-border bg-muted/50">
          <p className="text-xs text-muted-foreground text-center">
            Local-first • No tracking • Offline-ready
          </p>
          <p className="text-xs text-muted-foreground/60 text-center mt-1">
            Version 1.0.0
          </p>
        </div>
      </div>
    </>
  );
}