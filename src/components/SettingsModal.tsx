import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { X, Link as LinkIcon, Settings, Info, ChevronRight, ChevronLeft, Globe, Search, Filter, BookOpen, Palette, Moon, Sun, User, Save, Download, Upload, Trash2, AlertTriangle, Users, Loader2, QrCode, Scan, Camera, Check, RefreshCw, Shield, Server, Mail, Code2, GitBranch, Database, Wifi, CheckCircle2, XCircle, Type, CheckCircle } from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useProfile } from '../hooks/useProfile';
import { useTodayData } from '../hooks/useTodayData';
import { getTranslations, type BibleTranslation } from '../data/bibleApi';
import { getContacts, exportAll, importAll, resetApp } from '../data/db';
import { generateLinkQR, generateActivityQR, processLinkPayload, processActivitySnapshot, type LinkPayload, type ActivitySnapshot } from "../utils/qr";
import QRScanner from "./QRScanner";
import { Role, type Relation } from '../data/types';

interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function SettingsModal({ isOpen, onClose }: SettingsModalProps) {
    const navigate = useNavigate();
    const location = useLocation();
    const {
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
        downloadStatus,
        triggerDownload,
        isOffline
    } = useSettings();
    const { profile, loading: profileLoading, updateRole, updateDisplayName } = useProfile();
    const { todayData } = useTodayData();

    // Navigation State
    const [currentView, setCurrentView] = useState<'main' | 'translation' | 'reader' | 'appearance' | 'link' | 'settings' | 'about'>('main');

    // Translation State
    const [translations, setTranslations] = useState<BibleTranslation[]>([]);
    const [translationSearch, setTranslationSearch] = useState('');
    const [languageFilter, setLanguageFilter] = useState<string>('English');

    // Settings/Profile State
    const [displayName, setDisplayName] = useState('');
    const [contacts, setContacts] = useState<any[]>([]);

    // Link/QR State
    const [activeQrTab, setActiveQrTab] = useState<"generate" | "scan">("generate");
    const [selectedRelation, setSelectedRelation] = useState<Relation>("myMentee");
    const [qrCodeUrl, setQrCodeUrl] = useState<string>('');
    const [activityQrUrl, setActivityQrUrl] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [isCameraActive, setIsCameraActive] = useState(false);
    const [scanResult, setScanResult] = useState<string>('');
    const [manualCode, setManualCode] = useState<string>('');

    const isBiblePage = location.pathname.startsWith('/bible/read');

    // Initial Data Load
    useEffect(() => {
        if (isOpen) {
            if (translations.length === 0) {
                getTranslations().then(setTranslations).catch(console.error);
            }
            if (profile) {
                setDisplayName(profile.displayName || '');
            }
            loadContacts();
        }
    }, [isOpen, profile]);

    // Link/QR: Generate code on relation change
    useEffect(() => {
        if (isOpen && currentView === 'link' && activeQrTab === 'generate' && profile) {
            generateLinkCode();
        }
    }, [isOpen, currentView, activeQrTab, selectedRelation, profile]);


    const loadContacts = async () => {
        try {
            const contactMap = await getContacts();
            setContacts(Object.values(contactMap));
        } catch (error) {
            console.error('Failed to load contacts:', error);
        }
    };

    if (!isOpen) return null;

    // --- Actions ---

    const handleSaveProfile = async () => {
        if (!profile) return;
        try {
            if (displayName !== profile.displayName) {
                await updateDisplayName(displayName || null);
            }
            alert('Profile saved successfully!');
        } catch (error) {
            console.error('Failed to save profile:', error);
            alert('Failed to save profile. Please try again.');
        }
    };

    const handleRoleChange = async (newRole: Role) => {
        try {
            await updateRole(newRole);
        } catch (error) {
            console.error('Failed to update role:', error);
            alert('Failed to update role. Please try again.');
        }
    };

    const handleExport = async () => {
        try {
            const data = await exportAll();
            const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `mentorship-backup-${new Date().toISOString().split('T')[0]}.json`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);
        } catch (error) {
            console.error('Export failed:', error);
            alert('Failed to export data. Please try again.');
        }
    };

    const handleImport = () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            const file = (e.target as HTMLInputElement).files?.[0];
            if (!file) return;
            try {
                const text = await file.text();
                const data = JSON.parse(text);
                await importAll(data);
                alert('Data imported successfully!');
                window.location.reload();
            } catch (error) {
                console.error('Import failed:', error);
                alert('Failed to import data. Please check the file format.');
            }
        };
        input.click();
    };

    const handleReset = async () => {
        if (confirm('Are you sure you want to reset the app? This will delete all your data.')) {
            try {
                await resetApp();
                window.location.reload();
            } catch (error) {
                console.error('Reset failed:', error);
                alert('Failed to reset app. Please try again.');
            }
        }
    };

    // QR Actions
    const generateLinkCode = async () => {
        if (!profile) return;
        setIsGenerating(true);
        try {
            const qrUrl = await generateLinkQR(profile, selectedRelation);
            setQrCodeUrl(qrUrl);
        } catch (error) {
            console.error('Error generating QR code:', error);
        }
        setIsGenerating(false);
    };

    const generateActivitySnapshot = async () => {
        if (!profile || !todayData) return;
        setIsGenerating(true);
        try {
            const qrUrl = await generateActivityQR(profile, {
                morning: todayData.morning,
                afternoon: todayData.afternoon,
                night: todayData.night,
            });
            setActivityQrUrl(qrUrl);
        } catch (error) {
            console.error('Error generating activity QR code:', error);
        }
        setIsGenerating(false);
    };

    const handleScanResult = (result: LinkPayload | ActivitySnapshot) => {
        setIsCameraActive(false);
        if (result.type === 'triad-link') {
            const processed = processLinkPayload(result);
            setScanResult(processed.message);
        } else if (result.type === 'activity-snapshot') {
            const processed = processActivitySnapshot(result);
            setScanResult(`Activity from ${result.userName}: M(${result.todayProgress.morning ? '✓' : '✗'}) A(${result.todayProgress.afternoon ? '✓' : '✗'}) N(${result.todayProgress.night ? '✓' : '✗'})`);
        }
    };

    const processManualCode = () => {
        try {
            const decoded = JSON.parse(manualCode);
            handleScanResult(decoded);
        } catch (error) {
            setScanResult('Invalid code format');
        }
    };


    // Helpers
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

    const relationsList: { value: Relation; label: string }[] = [
        { value: "myMentee", label: "Add me as your Mentor" },
        { value: "myMentor", label: "Add me as your Mentee" },
        { value: "myScout", label: "Add me as your Steward" },
        { value: "mySteward", label: "Add me as your Scout" },
        { value: "myPreScout", label: "Add me as your Pre-Scout contact" },
    ];

    const rolesList = [
        { value: Role.PRE_SCOUT, label: 'Pre-Scout' },
        { value: Role.SCOUT, label: 'Scout' },
        { value: Role.MENTEE, label: 'Mentee' },
        { value: Role.MENTOR, label: 'Mentor' },
        { value: Role.STEWARD, label: 'Steward' }
    ];

    const getTitle = () => {
        switch (currentView) {
            case 'translation': return 'Bible Translation';
            case 'reader': return 'Reader Settings';
            case 'appearance': return 'Appearance';
            case 'link': return 'Link & QR';
            case 'settings': return 'Role & Settings';
            case 'about': return 'About & Privacy';
            default: return 'Settings & More';
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className={`bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] ${currentView === 'link' ? 'h-[80vh]' : ''}`} onClick={e => e.stopPropagation()}>

                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-2">
                        {currentView !== 'main' && (
                            <button
                                onClick={() => setCurrentView('main')}
                                className="p-1 -ml-2 hover:bg-accent/10 rounded-full transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                        )}
                        <h2
                            className={`text-lg font-bold ${currentView !== 'main' ? 'cursor-pointer hover:text-primary transition-colors' : ''}`}
                            onClick={() => currentView !== 'main' && setCurrentView('main')}
                        >
                            {getTitle()}
                        </h2>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="overflow-y-auto custom-scrollbar flex-1">
                    {currentView === 'main' && (
                        <div className="p-2 space-y-2">
                            {/* Bible Reading Settings (Conditional) */}
                            {isBiblePage && (
                                <button
                                    onClick={() => setCurrentView('reader')}
                                    className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left bg-primary/5 border border-primary/10 mb-2"
                                >
                                    <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-medium text-foreground">Reader Settings</h3>
                                        <p className="text-xs text-muted-foreground">Customize your reading experience</p>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                                </button>
                            )}

                            {/* Translation (Conditional - kept near top if relevant, but user asked for Appearance first) */}
                            <button
                                onClick={() => setCurrentView('translation')}
                                className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                    <Globe className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">Bible Translation</h3>
                                    <p className="text-xs text-muted-foreground">Current: {translations.find(t => t.id === selectedTranslation)?.shortName || selectedTranslation}</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>

                            {/* Appearance (Moved to Top Priority) */}
                            <button
                                onClick={() => setCurrentView('appearance')}
                                className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                    <Palette className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">Appearance</h3>
                                    <p className="text-xs text-muted-foreground">Dark mode & display settings</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>

                            <div className="h-px bg-border my-2" />

                            {/* Link & QR */}
                            <button
                                onClick={() => setCurrentView('link')}
                                className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                    <LinkIcon className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">Link & QR</h3>
                                    <p className="text-xs text-muted-foreground">Connect with your triad</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>

                            {/* Role & Settings */}
                            <button
                                onClick={() => setCurrentView('settings')}
                                className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                    <Settings className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">Role & Settings</h3>
                                    <p className="text-xs text-muted-foreground">Manage preferences & Data</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>

                            {/* About & Privacy */}
                            <button
                                onClick={() => setCurrentView('about')}
                                className="w-full flex items-center p-4 hover:bg-accent/5 rounded-lg transition-colors group text-left"
                            >
                                <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors">
                                    <Info className="w-5 h-5 text-primary" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="font-medium text-foreground">About & Privacy</h3>
                                    <p className="text-xs text-muted-foreground">App info & data</p>
                                </div>
                                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors" />
                            </button>
                        </div>
                    )}

                    {currentView === 'reader' && (
                        <div className="p-4 space-y-4 animate-in slide-in-from-right duration-200">
                            {/* Reader Mode Toggle */}
                            <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-border gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium flex items-center gap-2">
                                        <BookOpen className="w-4 h-4 text-primary" />
                                        Reader Mode
                                    </span>
                                    <span className="text-xs text-muted-foreground max-w-[200px]">
                                        Hides verse numbers/footnotes for clean reading.
                                    </span>
                                </div>
                                <button
                                    onClick={() => setReaderMode(!readerMode)}
                                    className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${readerMode ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${readerMode ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            {/* Mnemonics */}
                            <div className="space-y-3">
                                <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider ml-1">Mnemonics</h4>
                                <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-border gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium">Book & Chapter</span>
                                        <span className="text-xs text-muted-foreground">Show aids above nav bar.</span>
                                    </div>
                                    <button
                                        onClick={() => setShowMnemonics(!showMnemonics)}
                                        className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${showMnemonics ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${showMnemonics ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-border gap-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium">Verse Mnemonics</span>
                                        <span className="text-xs text-muted-foreground">Show aids inline with verses.</span>
                                    </div>
                                    <button
                                        onClick={() => setShowVerseMnemonics(!showVerseMnemonics)}
                                        className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${showVerseMnemonics ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${showVerseMnemonics ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>
                            </div>

                            {selectedTranslation === 'BSB' && (
                                <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-border gap-4 mt-4">
                                    <div className="flex flex-col gap-1">
                                        <span className="font-medium">Compare with MSB</span>
                                    </div>
                                    <button
                                        onClick={() => setShowMsb(!showMsb)}
                                        className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${showMsb ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                                    >
                                        <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${showMsb ? 'left-6' : 'left-1'}`} />
                                    </button>
                                </div>
                            )}
                        </div>
                    )}

                    {currentView === 'appearance' && (
                        <div className="p-4 space-y-4 animate-in slide-in-from-right duration-200">
                            <div className="flex items-center justify-between p-4 bg-secondary/5 rounded-lg border border-border gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium flex items-center gap-2">
                                        {theme === 'dark' ? <Moon className="w-4 h-4 text-primary" /> : <Sun className="w-4 h-4 text-primary" />}
                                        Dark Mode
                                    </span>
                                    <span className="text-xs text-muted-foreground">Switch between light and dark themes.</span>
                                </div>
                                <button
                                    onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                                    className={`w-12 h-7 rounded-full transition-colors relative flex-shrink-0 ${theme === 'dark' ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}
                                >
                                    <div className={`w-5 h-5 bg-white rounded-full absolute top-1 transition-transform shadow-sm ${theme === 'dark' ? 'left-6' : 'left-1'}`} />
                                </button>
                            </div>

                            <div className="flex flex-col p-4 bg-secondary/5 rounded-lg border border-border gap-4">
                                <div className="flex flex-col gap-1">
                                    <span className="font-medium flex items-center gap-2">
                                        <Type className="w-4 h-4 text-primary" />
                                        Font Size
                                    </span>
                                    <span className="text-xs text-muted-foreground">Adjust the global text size.</span>
                                </div>
                                <div className="grid grid-cols-4 gap-2">
                                    {(['small', 'normal', 'large', 'xl'] as const).map((size) => (
                                        <button
                                            key={size}
                                            onClick={() => setFontSize(size)}
                                            className={`py-2 px-1 rounded-lg text-sm font-medium transition-all ${fontSize === size
                                                ? 'bg-primary text-primary-foreground shadow-sm'
                                                : 'bg-background border border-border hover:border-primary/50'
                                                }`}
                                        >
                                            <span className={
                                                size === 'small' ? 'text-xs' :
                                                    size === 'large' ? 'text-lg' :
                                                        size === 'xl' ? 'text-xl' :
                                                            'text-base'
                                            }>Aa</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === 'translation' && (
                        <div className="p-4 space-y-4 animate-in slide-in-from-right duration-200">
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
                            <div className="space-y-1">
                                {filteredTranslations.map(t => {
                                    const status = downloadStatus?.[t.id];
                                    const isDownloadable = ['BSB'].includes(t.id); // Currently only BSB is hosted locally

                                    return (
                                        <div key={t.id} className="flex items-center gap-2 w-full p-2 hover:bg-accent/5 rounded-lg transition-colors group">
                                            <button
                                                onClick={() => setSelectedTranslation(t.id)}
                                                className="flex-1 text-left flex items-center justify-between"
                                            >
                                                <div>
                                                    <div className={`font-bold ${selectedTranslation === t.id ? 'text-primary' : ''}`}>
                                                        {t.name} <span className="text-xs font-normal text-muted-foreground ml-1">({t.shortName})</span>
                                                    </div>
                                                    <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                                        {t.languageEnglishName || t.language}
                                                    </div>
                                                </div>
                                                {selectedTranslation === t.id && <div className="w-2 h-2 rounded-full bg-primary mr-2" />}
                                            </button>

                                            {/* Download/Status Action */}
                                            <div className="shrink-0">
                                                {status?.isDownloading ? (
                                                    <div className="p-2 text-primary" title={`Downloading: ${status.progress}%`}>
                                                        <Loader2 className="w-4 h-4 animate-spin" />
                                                    </div>
                                                ) : status?.isReady ? (
                                                    <div className="p-2 text-green-500/70" title="Offline Ready">
                                                        <CheckCircle className="w-4 h-4" />
                                                    </div>
                                                ) : isDownloadable && !isOffline ? (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            triggerDownload(t.id);
                                                        }}
                                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                        title="Download for offline use"
                                                    >
                                                        <Download className="w-4 h-4" />
                                                    </button>
                                                ) : null}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    )}

                    {currentView === 'link' && (
                        <div className="p-4 space-y-6 animate-in slide-in-from-right duration-200">
                            {/* Tabs */}
                            <div className="bg-secondary/10 border border-border rounded-xl p-1 grid grid-cols-2 gap-1">
                                <button
                                    onClick={() => setActiveQrTab("generate")}
                                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeQrTab === "generate"
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                                        }`}
                                >
                                    <QrCode className="w-4 h-4" />
                                    My Codes
                                </button>
                                <button
                                    onClick={() => setActiveQrTab("scan")}
                                    className={`flex items-center justify-center gap-2 py-2 px-4 rounded-lg text-sm font-medium transition-all duration-200 ${activeQrTab === "scan"
                                        ? "bg-background text-foreground shadow-sm"
                                        : "text-muted-foreground hover:bg-background/50 hover:text-foreground"
                                        }`}
                                >
                                    <Scan className="w-4 h-4" />
                                    Scan
                                </button>
                            </div>

                            {activeQrTab === 'generate' ? (
                                <div className="space-y-6">
                                    <div className="space-y-4">
                                        <div className="bg-secondary/5 rounded-xl p-3 border border-border">
                                            <label className="text-xs text-muted-foreground block mb-2">I want to link with someone who will be...</label>
                                            <select
                                                value={selectedRelation}
                                                onChange={(e) => setSelectedRelation(e.target.value as Relation)}
                                                className="w-full p-2 bg-background border border-input rounded-lg text-sm"
                                            >
                                                {relationsList.map((relation) => (
                                                    <option key={relation.value} value={relation.value}>
                                                        {relation.label}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>

                                        <div className="bg-white rounded-xl p-6 shadow-sm border border-border flex flex-col items-center justify-center min-h-[200px]">
                                            {isGenerating ? (
                                                <RefreshCw className="animate-spin text-primary w-8 h-8" />
                                            ) : qrCodeUrl ? (
                                                <img src={qrCodeUrl} alt="QR Code" className="w-48 h-48 object-contain" />
                                            ) : (
                                                <span className="text-muted-foreground">QR will appear here</span>
                                            )}
                                            <p className="text-xs text-muted-foreground mt-4 text-center">
                                                Scan to link as {selectedRelation.replace('my', '')}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="border-t border-border pt-6">
                                        <h3 className="text-sm font-semibold mb-3">Share Activity</h3>
                                        <button
                                            onClick={generateActivitySnapshot}
                                            disabled={isGenerating || !todayData}
                                            className="w-full btn btn-secondary flex items-center justify-center gap-2 mb-4"
                                        >
                                            {isGenerating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <QrCode className="w-4 h-4" />}
                                            Generate Snapshot
                                        </button>
                                        {activityQrUrl && (
                                            <div className="bg-white rounded-xl p-4 shadow-sm border border-border flex flex-col items-center justify-center">
                                                <img src={activityQrUrl} alt="Activity QR" className="w-32 h-32 object-contain" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div className="bg-black rounded-xl overflow-hidden aspect-square relative">
                                        <QRScanner
                                            onScanResult={handleScanResult}
                                            onError={(err) => setScanResult(`Error: ${err}`)}
                                            isActive={isCameraActive}
                                        />
                                        {!isCameraActive && (
                                            <div className="absolute inset-0 flex items-center justify-center bg-zinc-900/90 text-zinc-500">
                                                <Camera className="w-12 h-12" />
                                            </div>
                                        )}
                                    </div>
                                    <button
                                        onClick={() => setIsCameraActive(!isCameraActive)}
                                        className={`w-full btn ${isCameraActive ? 'bg-destructive text-destructive-foreground' : 'btn-primary'}`}
                                    >
                                        {isCameraActive ? 'Stop Camera' : 'Start Camera'}
                                    </button>

                                    {scanResult && (
                                        <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-sm flex items-start gap-2">
                                            <Check className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                                            <p>{scanResult}</p>
                                        </div>
                                    )}

                                    <div className="pt-4 border-t border-border">
                                        <textarea
                                            value={manualCode}
                                            onChange={(e) => setManualCode(e.target.value)}
                                            className="w-full p-2 bg-secondary/10 border border-transparent rounded-lg text-xs font-mono mb-2"
                                            rows={2}
                                            placeholder="Paste code manually..."
                                        />
                                        <button onClick={processManualCode} disabled={!manualCode} className="w-full btn btn-secondary text-xs py-2">Process Code</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}

                    {currentView === 'settings' && (
                        <div className="p-4 space-y-6 animate-in slide-in-from-right duration-200">
                            {/* Profile */}
                            <div className="space-y-3">
                                <h3 className="section-header flex items-center gap-2 text-sm font-semibold text-primary">
                                    <User className="w-4 h-4" /> Profile
                                </h3>
                                <div className="bg-secondary/5 border border-border rounded-xl p-4 space-y-3">
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Display Name</label>
                                        <input
                                            type="text"
                                            value={displayName}
                                            onChange={(e) => setDisplayName(e.target.value)}
                                            className="w-full p-2 bg-background border border-input rounded-lg text-sm"
                                            placeholder="Enter your name"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-medium">Role</label>
                                        <select
                                            value={profile?.currentRole || Role.MENTEE}
                                            onChange={(e) => handleRoleChange(e.target.value as Role)}
                                            className="w-full p-2 bg-background border border-input rounded-lg text-sm"
                                        >
                                            {rolesList.map((role) => (
                                                <option key={role.value} value={role.value}>{role.label}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <button onClick={handleSaveProfile} className="w-full btn btn-primary text-sm py-2 mt-2">
                                        <Save className="w-4 h-4 mr-2" /> Save Profile
                                    </button>
                                </div>
                            </div>

                            {/* Data Mgmt */}
                            <div className="space-y-3">
                                <h3 className="section-header flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Database className="w-4 h-4" /> Data
                                </h3>
                                <div className="bg-secondary/5 border border-border rounded-xl p-4 space-y-3">
                                    <div className="grid grid-cols-2 gap-2">
                                        <button onClick={handleExport} className="btn btn-secondary text-xs flex flex-col items-center justify-center p-3 gap-1 h-auto">
                                            <Download className="w-4 h-4" /> Export
                                        </button>
                                        <button onClick={handleImport} className="btn btn-secondary text-xs flex flex-col items-center justify-center p-3 gap-1 h-auto">
                                            <Upload className="w-4 h-4" /> Import
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Danger Zone */}
                            <div className="space-y-3">
                                <h3 className="section-header flex items-center gap-2 text-sm font-semibold text-destructive">
                                    <AlertTriangle className="w-4 h-4" /> Danger Zone
                                </h3>
                                <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
                                    <button onClick={handleReset} className="w-full text-destructive hover:bg-destructive/10 p-2 rounded-lg text-sm flex items-center justify-center gap-2 transition-colors">
                                        <Trash2 className="w-4 h-4" /> Reset All Data
                                    </button>
                                </div>
                            </div>

                            {/* Contacts Preview */}
                            <div className="space-y-3">
                                <h3 className="section-header flex items-center gap-2 text-sm font-semibold text-primary">
                                    <Users className="w-4 h-4" /> Contacts
                                </h3>
                                <div className="bg-secondary/5 border border-border rounded-xl p-2 max-h-40 overflow-y-auto">
                                    {contacts.length === 0 ? (
                                        <p className="text-xs text-muted-foreground text-center py-4">No contacts added yet.</p>
                                    ) : (
                                        contacts.map(c => (
                                            <div key={c.id} className="flex justify-between items-center p-2 hover:bg-accent/5 rounded-lg text-sm">
                                                <span>{c.displayName || 'Unknown'}</span>
                                                <span className="text-xs text-muted-foreground">{c.relation}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {currentView === 'about' && (
                        <div className="p-4 space-y-6 animate-in slide-in-from-right duration-200">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-lg font-bold">
                                    <Info className="w-5 h-5 text-primary" />
                                    <h3>About</h3>
                                </div>
                                <div className="bg-secondary/5 rounded-xl p-4 text-sm text-muted-foreground space-y-2">
                                    <p>A Christian men's mentorship application built around the "triad" model.</p>
                                    <p>Designed to help you stay connected to your faith and brothers through the M.A.N. (Morning, Afternoon, Night) rhythm.</p>
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-lg font-bold">
                                    <Shield className="w-5 h-5 text-primary" />
                                    <h3>Privacy</h3>
                                </div>
                                <div className="grid grid-cols-1 gap-2 text-xs">
                                    <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        Data stored locally in browser
                                    </div>
                                    <div className="bg-green-500/10 text-green-700 dark:text-green-400 p-3 rounded-lg flex items-center gap-2">
                                        <CheckCircle2 className="w-4 h-4 shrink-0" />
                                        Works completely offline
                                    </div>
                                    <div className="bg-destructive/10 text-destructive p-3 rounded-lg flex items-center gap-2">
                                        <XCircle className="w-4 h-4 shrink-0" />
                                        No external servers
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2 text-xs text-muted-foreground pt-4 border-t border-border">
                                <div className="flex justify-between">
                                    <span>Version</span>
                                    <span>1.0.0 (PWA)</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Storage</span>
                                    <span>IndexedDB</span>
                                </div>
                                <p className="pt-2 text-center opacity-60">Soli Deo Gloria</p>
                            </div>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
}
