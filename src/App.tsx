import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import Header from './components/Header';
import Drawer from './components/Drawer';
import SettingsModal from './components/SettingsModal';
import WelcomeModal from './components/WelcomeModal';
import Today from './pages/Today';
import Link from './pages/Link';
import Settings from './pages/Settings';
import Tradition from './pages/Tradition';
import OldTestament from './pages/OldTestament';
import About from './pages/About';
import Bible from './pages/Bible';

import Curriculum from './pages/Curriculum'; // New page
import Schedule from './pages/Schedule';
import BibleStudy from './pages/BibleStudy';
import JesusDivinityStudy from './pages/study/JesusDivinityStudy';
import BibleDiscrepanciesStudy from './pages/study/BibleDiscrepanciesStudy';
import StudyToolPage from './pages/StudyToolPage';
import ChurchHistoryStudy from './pages/study/ChurchHistoryStudy';
import { initDB, getProfile, createProfile } from './data/db';
import { Role } from './data/types';
import { SettingsProvider } from './context/SettingsContext';

function AppContent() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

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

        // Check welcome message status
        const hasSeenWelcome = localStorage.getItem('hasSeenWelcome');
        if (!hasSeenWelcome) {
          setShowWelcome(true);
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
    return () => clearTimeout(timeoutId);
  }, []);

  // Daily Redirect Logic
  useEffect(() => {
    const checkDailyReset = () => {
      const today = new Date().toDateString();
      const lastVisit = localStorage.getItem('lastVisitDate');

      if (lastVisit !== today) {
        // It's a new day!
        localStorage.setItem('lastVisitDate', today);
        // If not already on home, redirect
        if (location.pathname !== '/') {
          // Use setTimeout to ensure router is ready or avoid conflits during mount
          setTimeout(() => navigate('/'), 0);
        }
      }
    };

    if (isInitialized) {
      checkDailyReset();
    }
  }, [isInitialized]); // Run once after init

  // Close drawer and settings when route changes
  useEffect(() => {
    setIsDrawerOpen(false);
    setIsSettingsOpen(false);
  }, [location.pathname]);

  if (!isInitialized) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4 animate-fade-in">
          <div className="flex justify-center">
            <Loader2 className="h-10 w-10 animate-spin text-primary" />
          </div>
          <h1 className="text-xl font-semibold text-foreground">Mentorship App</h1>
          <p className="text-muted-foreground">Initializing...</p>
        </div>
      </div>
    );
  }

  // Get page info for header
  const getPageInfo = () => {
    switch (location.pathname) {
      case '/':
        return { title: "Today's Plan", subtitle: "Your daily spiritual rhythm" };
      case '/link':
        return { title: 'Link & QR', subtitle: 'Connect with your triad members' };
      case '/tradition':
        return { title: 'Tradition', subtitle: 'Our shared creed and passage pyramid' };
      case '/oldtestament':
        return { title: 'Old Testament', subtitle: 'All 39 books seen in a new way' };
      case '/curriculum':
        return { title: 'T.A.B.L.E.', subtitle: 'Quarter Curriculum' };
      case '/curriculum/table':
        return { title: 'T.A.B.L.E.', subtitle: 'Detailed Reference' };
      case '/settings':
        return { title: 'Role & Settings', subtitle: 'Manage your profile and app settings' };
      case '/about':
        return { title: 'About & Privacy', subtitle: 'Learn about the app and network' };
      default:
        if (location.pathname.startsWith('/bible/study')) {
          return { title: 'Bible Study', subtitle: 'Deep Dive & Group Tools' };
        }
        if (location.pathname.startsWith('/bible/memory')) {
          return { title: 'Bible Memory', subtitle: 'Memorize Scripture' };
        }
        if (location.pathname.startsWith('/bible/read') || location.pathname === '/bible') {
          return { title: 'Bible Reader', subtitle: 'Read Scripture' };
        }
        return { title: 'Bible & Memory', subtitle: 'Read, Study, and Memorize' };
        return { title: 'Light Trail', subtitle: 'Christian Mentorship App' };
    }
  };

  const { title, subtitle } = getPageInfo();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/20">
      {/* Header with integrated navigation */}
      <Header
        onMenuClick={() => {
          setIsDrawerOpen(true);
          setIsSettingsOpen(false);
        }}
        onSettingsClick={() => {
          setIsSettingsOpen(true);
          setIsDrawerOpen(false);
        }}
        title={title}
        subtitle={subtitle}
      />

      {/* Drawer Navigation */}
      <Drawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />



      {/* Settings Modal */}
      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />

      {/* Welcome Modal */}
      <WelcomeModal
        isOpen={showWelcome}
        onClose={() => {
          setShowWelcome(false);
          localStorage.setItem('hasSeenWelcome', 'true');
        }}
      />

      {/* Main Content */}
      <main className={`min-h-screen ${location.pathname.startsWith('/bible/read') ? 'pt-0 sm:pt-0' : 'pt-12'} pb-10 px-4 max-w-7xl mx-auto animate-slide-up`}>
        <Routes>
          <Route path="/" element={<Today />} />
          <Route path="/link" element={<Link />} />
          <Route path="/tradition" element={<Tradition />} />
          <Route path="/oldtestament" element={<OldTestament />} />
          <Route path="/curriculum" element={<Curriculum />} />
          <Route path="/curriculum/table" element={<Curriculum />} />
          <Route path="/curriculum/table/:section" element={<Curriculum />} />
          <Route path="/curriculum/table/:section/:subsection" element={<Curriculum />} />
          <Route path="/curriculum/table/:section/:subsection/:topic" element={<Curriculum />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/bible/study" element={<BibleStudy />} />
          <Route path="/bible/study/divinity" element={<JesusDivinityStudy />} />
          <Route path="/bible/study/history" element={<ChurchHistoryStudy />} />
          <Route path="/bible/study/continuity" element={<BibleDiscrepanciesStudy />} />
          <Route path="/bible/study/:toolId" element={<StudyToolPage />} />
          <Route path="/bible/*" element={<Bible />} />
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
      <SettingsProvider>
        <AppContent />
      </SettingsProvider>
    </Router>
  );
}