import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { downloadTranslation, isTranslationOfflineReady } from '../data/bibleApi';

interface DownloadStatus {
    [key: string]: {
        isDownloading: boolean;
        progress: number; // 0-100
        total: number;
        completed: number;
        isReady: boolean;
    };
}

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
    showCrossReferences: boolean;
    setShowCrossReferences: (enabled: boolean) => void;
    showFootnotes: boolean;
    setShowFootnotes: (enabled: boolean) => void;
    theme: 'light' | 'dark';
    setTheme: (theme: 'light' | 'dark') => void;
    fontSize: 'small' | 'normal' | 'large' | 'xl';
    setFontSize: (size: 'small' | 'normal' | 'large' | 'xl') => void;
    isOffline: boolean;
    downloadStatus: DownloadStatus;
    triggerDownload: (translationId: string) => Promise<void>;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export function SettingsProvider({ children }: { children: React.ReactNode }) {
    // Initialize from localStorage or default
    const [selectedTranslation, setSelectedTranslation] = useState(() => {
        return localStorage.getItem('bible_translation') || 'BSB';
    });
    // ... (rest of states same)
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

    const [showCrossReferences, setShowCrossReferences] = useState(() => {
        const saved = localStorage.getItem('bible_show_cross_references');
        return saved === null ? true : saved === 'true';
    });

    const [showFootnotes, setShowFootnotes] = useState(() => {
        const saved = localStorage.getItem('bible_show_footnotes');
        return saved === null ? true : saved === 'true';
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

    // Download Status State
    const [downloadStatus, setDownloadStatus] = useState<DownloadStatus>({});

    const triggerDownload = async (translationId: string) => {
        if (downloadStatus[translationId]?.isDownloading) return;

        setDownloadStatus(prev => ({
            ...prev,
            [translationId]: {
                isDownloading: true,
                progress: 0,
                completed: 0,
                total: 0,
                isReady: false
            }
        }));

        try {
            await downloadTranslation(translationId, (completed, total) => {
                setDownloadStatus(prev => ({
                    ...prev,
                    [translationId]: {
                        isDownloading: true,
                        progress: Math.round((completed / total) * 100),
                        completed,
                        total,
                        isReady: false
                    }
                }));
            });

            setDownloadStatus(prev => ({
                ...prev,
                [translationId]: {
                    isDownloading: false,
                    progress: 100,
                    completed: prev[translationId]?.total || 0,
                    total: prev[translationId]?.total || 0,
                    isReady: true
                }
            }));
        } catch (error) {
            console.error(`Failed to download ${translationId}:`, error);
            setDownloadStatus(prev => {
                const existing = prev[translationId] || { progress: 0, completed: 0, total: 0 };
                return {
                    ...prev,
                    [translationId]: {
                        isDownloading: false,
                        progress: existing.progress,
                        completed: existing.completed,
                        total: existing.total,
                        isReady: false
                    }
                };
            });
        }
    };

    // Auto-check BSB and download if needed
    // Using a ref to prevent double-firing strict mode
    const initCheckDone = useRef(false);

    useEffect(() => {
        if (initCheckDone.current) return;
        initCheckDone.current = true;

        const checkBSB = async () => {
            // Check status
            const ready = await isTranslationOfflineReady('BSB');
            setDownloadStatus(prev => ({
                ...prev,
                BSB: {
                    isDownloading: false,
                    progress: ready ? 100 : 0,
                    completed: 0,
                    total: 0,
                    isReady: ready
                }
            }));

            // Auto download ONLY BSB if online and not ready
            if (!ready && navigator.onLine) {
                // Delay slightly to prioritize UI render
                setTimeout(() => triggerDownload('BSB'), 2000);
            }
        };

        checkBSB();
    }, []);

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
        localStorage.setItem('bible_show_cross_references', String(showCrossReferences));
    }, [showCrossReferences]);

    useEffect(() => {
        localStorage.setItem('bible_show_footnotes', String(showFootnotes));
    }, [showFootnotes]);

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
        const handleOnline = () => {
            setIsOffline(false);
            // Resume download? Simple retry BSB if missing
            // triggerDownload('BSB'); // Optional: auto-resume
        };
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
            showCrossReferences,
            setShowCrossReferences,
            showFootnotes,
            setShowFootnotes,
            theme,
            setTheme,
            fontSize,
            setFontSize,
            isOffline,
            downloadStatus,
            triggerDownload
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
