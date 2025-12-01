import React, { createContext, useContext, useState, useEffect } from 'react';

interface SettingsContextType {
    selectedTranslation: string;
    setSelectedTranslation: (id: string) => void;
    showMsb: boolean;
    setShowMsb: (show: boolean) => void;
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

    // Persist changes
    useEffect(() => {
        localStorage.setItem('bible_translation', selectedTranslation);
    }, [selectedTranslation]);

    useEffect(() => {
        localStorage.setItem('bible_show_msb', String(showMsb));
    }, [showMsb]);

    return (
        <SettingsContext.Provider value={{
            selectedTranslation,
            setSelectedTranslation,
            showMsb,
            setShowMsb
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
