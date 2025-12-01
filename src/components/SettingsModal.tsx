import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { X, Link as LinkIcon, Settings, Info, ChevronRight, ChevronLeft, Globe, Search, Filter } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { getTranslations, type BibleTranslation } from '../data/bibleApi';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const navigate = useNavigate();
    const { selectedTranslation, setSelectedTranslation, showMsb, setShowMsb } = useSettings();

    // Translation State
    const [translations, setTranslations] = useState<BibleTranslation[]>([]);
    const [translationSearch, setTranslationSearch] = useState('');
    const [languageFilter, setLanguageFilter] = useState<string>('English');
    const [currentView, setCurrentView] = useState<'main' | 'translation'>('main');

    useEffect(() => {
        if (isOpen && translations.length === 0) {
            getTranslations().then(setTranslations).catch(console.error);
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleNavigate = (path: string) => {
        navigate(path);
        onClose();
    };

    // Filtered Translations Logic
    const availableLanguages = Array.from(new Set(translations.map(t => t.languageEnglishName || t.language))).sort();

    const filteredTranslations = translations.filter(t => {
        const matchesSearch =
            t.name.toLowerCase().includes(translationSearch.toLowerCase()) ||
            (t.languageEnglishName || t.language).toLowerCase().includes(translationSearch.toLowerCase()) ||
            t.shortName.toLowerCase().includes(translationSearch.toLowerCase());

        const matchesLang = languageFilter === 'All' || (t.languageEnglishName || t.language) === languageFilter;
        return matchesSearch && matchesLang;
    }).sort((a, b) => {
        if (a.id === 'BSB') return -1;
        if (b.id === 'BSB') return 1;
        return a.name.localeCompare(b.name);
    });

    const menuItems = [
        { path: '/link', label: 'Link & QR', icon: LinkIcon, description: 'Connect with your triad' },
        { path: '/settings', label: 'Role & Settings', icon: Settings, description: 'Manage preferences' },
        { path: '/about', label: 'About & Privacy', icon: Info, description: 'App info & data' }
    ];

    return (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[85vh]" onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        {currentView === 'translation' && (
                            <button
                                onClick={() => setCurrentView('main')}
                                className="p-1 -ml-2 hover:bg-accent/10 rounded-full transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}
                        <h2 className="text-lg font-bold">
                            {currentView === 'main' ? 'Settings & More' : 'Bible Translation'}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {currentView === 'main' ? (
                        <div className="p-2">
                            {/* Translation Entry Point */}
                            <button
                                onClick={() => setCurrentView('translation')}
                                className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                    <Globe className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">Bible Translation</h3>
                                    <p className="text-xs text-muted-foreground">Current: {selectedTranslation}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>

                            <div className="h-px bg-border my-2" />

                            {menuItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <button
                                        key={item.path}
                                        onClick={() => handleNavigate(item.path)}
                                        className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                                    >
                                        <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                            <Icon className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-medium text-foreground">{item.label}</h3>
                                            <p className="text-xs text-muted-foreground">{item.description}</p>
                                        </div>
                                        <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                    </button>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="p-4 space-y-4 animate-in slide-in-from-right duration-200">
                            {/* MSB Toggle */}
                            {selectedTranslation === 'BSB' && (
                                <div className="flex items-center justify-between p-3 bg-secondary/5 rounded-lg border border-border">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium">Compare with MSB</span>
                                        <span className="text-[10px] text-muted-foreground">Show MSB alongside BSB</span>
                                    </div>
                                    <button
                                        onClick={() => setShowMsb(!showMsb)}
                                        className={`w-11 h-6 rounded-full transition-colors relative ${showMsb ? 'bg-primary' : 'bg-secondary'}`}
                                    >
                                        <div className={`w-4 h-4 bg-white rounded-full absolute top-1 transition-transform ${showMsb ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>
                            )}

                            {/* Search & Filter */}
                            <div className="space-y-3 sticky top-0 bg-card z-10 pb-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search translation..."
                                        className="w-full pl-9 pr-4 py-2 bg-secondary/10 border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                        value={translationSearch}
                                        onChange={(e) => setTranslationSearch(e.target.value)}
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-muted-foreground" />
                                    <select
                                        className="flex-1 bg-secondary/10 border-transparent rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                        value={languageFilter}
                                        onChange={(e) => setLanguageFilter(e.target.value)}
                                    >
                                        <option value="All">All Languages</option>
                                        {availableLanguages.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            {/* Translation List */}
                            <div className="space-y-1">
                                {filteredTranslations.map(t => (
                                    <button
                                        key={t.id}
                                        onClick={() => setSelectedTranslation(t.id)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between group ${selectedTranslation === t.id ? 'bg-primary/10' : 'hover:bg-accent/10'
                                            }`}
                                    >
                                        <div>
                                            <div className={`font-bold ${selectedTranslation === t.id ? 'text-primary' : ''}`}>
                                                {t.name} <span className="text-xs font-normal text-muted-foreground ml-1">({t.shortName})</span>
                                            </div>
                                            <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                                {t.languageEnglishName || t.language}
                                            </div>
                                        </div>
                                        {selectedTranslation === t.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {currentView === 'main' && (
                    <div className="p-4 bg-secondary/5 border-t border-border text-center shrink-0">
                        <p className="text-xs text-muted-foreground">More settings coming soon...</p>
                    </div>
                )}
            </div>
        </div>
    );
}
