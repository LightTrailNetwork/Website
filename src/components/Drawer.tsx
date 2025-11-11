import { Link, useLocation } from 'react-router-dom';

interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Drawer({ isOpen, onClose }: DrawerProps) {
  const location = useLocation();

  const menuItems = [
    { path: '/', label: 'Today', icon: '📅' },
    { path: '/tradition', label: 'Tradition', icon: '📜' },
    { path: '/link', label: 'Link & QR', icon: '🔗' },
    { path: '/settings', label: 'Role & Settings', icon: '⚙️' },
    { path: '/about', label: 'About & Privacy', icon: 'ℹ️' }
  ];

  const handleItemClick = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="fixed left-0 top-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-200 ease-in-out">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Mentorship App</h2>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 text-2xl"
            >
              ×
            </button>
          </div>
          <p className="text-primary-100 text-sm mt-1">Navigate the triad</p>
        </div>

        {/* Menu Items */}
        <nav className="py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={handleItemClick}
              className={`flex items-center px-6 py-3 text-gray-700 hover:bg-gray-100 transition-colors ${
                location.pathname === item.path
                  ? 'bg-primary-50 text-primary-600 border-r-2 border-primary-600'
                  : ''
              }`}
            >
              <span className="text-xl mr-3">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-gray-50">
          <p className="text-xs text-gray-500 text-center">
            Local-first • No tracking • Offline-ready
          </p>
          <p className="text-xs text-gray-400 text-center mt-1">
            Version 1.0.0
          </p>
        </div>
      </div>
    </>
  );
}