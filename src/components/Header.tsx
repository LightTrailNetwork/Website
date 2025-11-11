import { useLocation } from 'react-router-dom';

interface HeaderProps {
  onMenuClick: () => void;
  title: string;
  subtitle?: string;
}

export default function Header({ onMenuClick, title, subtitle }: HeaderProps) {
  const location = useLocation();
  
  // Hide header on Tradition page (fullscreen experience)
  if (location.pathname === '/tradition') {
    return null;
  }

  return (
    <header className="bg-primary-600 text-white shadow-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8">
          {/* Left side - Menu button and title */}
          <div className="flex items-center space-x-4">
            <button
              onClick={onMenuClick}
              className="p-2 rounded-md text-primary-100 hover:text-white hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-white transition-colors"
              aria-label="Open menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
            
            <div className="flex flex-col">
              <h1 className="text-lg sm:text-xl font-semibold">{title}</h1>
              {subtitle && (
                <p className="text-xs sm:text-sm text-primary-100 hidden sm:block">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          {/* Right side - App logo/name on desktop */}
          <div className="hidden md:flex items-center space-x-2">
            <div className="text-2xl">✝️</div>
            <span className="text-lg font-semibold">Triad</span>
          </div>
        </div>
      </div>
    </header>
  );
}