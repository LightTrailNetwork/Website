import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Drawer from './components/Drawer';
import Today from './pages/Today';
import Link from './pages/Link';
import Settings from './pages/Settings';
import Tradition from './pages/Tradition';
import About from './pages/About';
import { initDB, getProfile, createProfile } from './data/db';
import { Role } from './data/types';

function AppContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Initialize the app and create user profile if needed
    const initializeApp = async () => {
      try {
        console.log('Starting app initialization...');
        await initDB();
        console.log('Database initialized');
        
        const profile = await getProfile();
        console.log('Profile loaded:', profile);
        
        if (!profile) {
          console.log('Creating new profile...');
          await createProfile(undefined, Role.MENTEE);
          console.log('Profile created');
        }
        
        setIsInitialized(true);
        console.log('App initialization complete');
      } catch (error) {
        console.error('Failed to initialize app:', error);
        setIsInitialized(true); // Continue anyway
      }
    };

    // Add a timeout to prevent infinite loading
    const timeoutId = setTimeout(() => {
      console.warn('Initialization timeout - proceeding anyway');
      setIsInitialized(true);
    }, 5000);

    initializeApp().finally(() => {
      clearTimeout(timeoutId);
    });

    return () => clearTimeout(timeoutId);
  }, []);

  // Close drawer when route changes
  useEffect(() => {
    setIsDrawerOpen(false);
  }, [location.pathname]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">✝️</div>
          <h1 className="text-xl font-semibold text-gray-800">Mentorship App</h1>
          <p className="text-gray-600">Initializing...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hamburger Menu Button - Hide on Tradition page (fullscreen) */}
      {location.pathname !== '/tradition' && (
        <button
          onClick={() => setIsDrawerOpen(true)}
          className="fixed top-4 left-4 z-30 bg-white shadow-lg rounded-lg p-2 text-gray-600 hover:text-gray-800"
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
      )}

      {/* Drawer Navigation */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      {/* Main Content */}
      <main>
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/link" element={<Link />} />
          <Route path="/tradition" element={<Tradition />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}