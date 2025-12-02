import { Link, useLocation } from 'react-router-dom';
import { Calendar, Scroll, X, Book, Table, LayoutGrid, Home } from 'lucide-react';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Today', subtitle: 'Action Items', icon: Home },
    { path: '/schedule', label: 'Schedule', subtitle: 'Quarterly Plan', icon: LayoutGrid },
    { path: '/table', label: 'T.A.B.L.E.', subtitle: 'Quarter Curriculum', icon: Table },
    { path: '/tradition', label: 'Tradition', subtitle: 'Creed & Pyramid', icon: Scroll },
    { path: '/bible', label: 'Bible & Memory', subtitle: 'Read & Memorize', icon: Book }
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
      <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-background border-r border-border z-[70] shadow-2xl animate-slide-up sm:animate-none sm:transition-transform">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-semibold text-foreground">LightTrail Network</h2>
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
        <nav className="py-6 px-3 space-y-2">
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