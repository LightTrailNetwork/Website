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
            setShowVerseMnemonics
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
