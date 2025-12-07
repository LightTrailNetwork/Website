import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
    selectedTranslation: string;
    setSelectedTranslation: (id: string) => void;
    showMsb: boolean;
    setShowMsb: (show: boolean) => void;
    readerMode: boolean;
    setReaderMode: (enabled: boolean) => void;
    showMnemonics: boolean;
    setShowMnemonics: (enabled: boolean) => void;
    showVerseMnemonics: boolean;
    setShowVerseMnemonics: (enabled: boolean) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    fontSize: 'small' | 'normal' | 'large' | 'xl';
    setFontSize: (size: 'small' | 'normal' | 'large' | 'xl') => void;
    isOffline: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    // Initialize from localStorage or default
    const [selectedTranslation, setSelectedTranslation] = useState(() => {
        return localStorage.getItem('bible_translation') || 'BSB';
    });

    const [showMsb, setShowMsb] = useState(() => {
        return localStorage.getItem('bible_show_msb') === 'true';
    });

    const [readerMode, setReaderMode] = useState(() => {
        return localStorage.getItem('bible_reader_mode') === 'true';
    });

    const [showMnemonics, setShowMnemonics] = useState(() => {
        return localStorage.getItem('bible_show_mnemonics') === 'true';
    });

    const [showVerseMnemonics, setShowVerseMnemonics] = useState(() => {
        return localStorage.getItem('bible_show_verse_mnemonics') === 'true';
    });

    const [theme, setTheme] = useState<'light' | 'dark'>(() => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') return savedTheme;
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    });

    const [fontSize, setFontSize] = useState<'small' | 'normal' | 'large' | 'xl'>(() => {
        return (localStorage.getItem('fontSize') as 'small' | 'normal' | 'large' | 'xl') || 'normal';
    });

    const [isOffline, setIsOffline] = useState(!navigator.onLine);

    // Persist changes
    useEffect(() => {
        localStorage.setItem('bible_translation', selectedTranslation);
    }, [selectedTranslation]);

    useEffect(() => {
        localStorage.setItem('bible_show_msb', String(showMsb));
    }, [showMsb]);

    useEffect(() => {
        localStorage.setItem('bible_reader_mode', String(readerMode));
    }, [readerMode]);

    useEffect(() => {
        localStorage.setItem('bible_show_mnemonics', String(showMnemonics));
    }, [showMnemonics]);

    useEffect(() => {
        localStorage.setItem('bible_show_verse_mnemonics', String(showVerseMnemonics));
    }, [showVerseMnemonics]);

    useEffect(() => {
        localStorage.setItem('theme', theme);
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
        const sizes = {
            small: '14px',
            normal: '16px',
            large: '18px',
            xl: '20px'
        };
        document.documentElement.style.fontSize = sizes[fontSize];
    }, [fontSize]);

    // Network status listener
    useEffect(() => {
        const handleOnline = () => setIsOffline(false);
        const handleOffline = () => setIsOffline(true);

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, []);

    return (
        <SettingsContext.Provider value={{
            selectedTranslation,
            setSelectedTranslation,
            showMsb,
            setShowMsb,
            readerMode,
            setReaderMode,
            showMnemonics,
            setShowMnemonics,
            showVerseMnemonics,
            setShowVerseMnemonics,
            theme,
            setTheme,
            fontSize,
            setFontSize,
            isOffline
        }}>
            {children}
        </SettingsContext.Provider>
    );
}

export function useSettings() {
    const context = useContext(SettingsContext);
    if (context === undefined) {
        throw new Error('useSettings must be used within a SettingsProvider');
    }
    return context;
}
