import { useState, useEffect, useMemo, useRef } from 'react';
import { BookOpen, Brain, ChevronRight, Search, Book, ChevronDown, ChevronsDown, ChevronsUp, X } from 'lucide-react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import BibleReader from '../components/BibleReader';
import BibleBookSummary from '../components/BibleBookSummary';
import MemorizationHub from '../components/MemorizationHub';
import HierarchicalMemory from '../components/HierarchicalMemory';
import { GraceView, CrownPathView, John316View, GatherAroundView } from '../components/MemoryTools';
import { getBooks } from '../data/bibleApi';
import type { BibleBook } from '../data/bibleApi';
import { getTestamentMnemonic, getBookMnemonicText } from '../utils/mnemonicUtils';

function BibleHome() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [activeTab, setActiveTab] = useState<'books' | 'mnemonics'>('books');
    const [bookSearchQuery, setBookSearchQuery] = useState('');
    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA'>('ALL');
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});

    // Fetch books on mount
    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    // Filtered Books Logic
    const filteredBooks = useMemo(() => {
        let filtered = [...books];

        if (bookSearchQuery) {
            const q = bookSearchQuery.toLowerCase();
            filtered = filtered.filter(b =>
                b.name.toLowerCase().includes(q) ||
                (b.commonName && b.commonName.toLowerCase().includes(q))
            );
        }

        if (bookFilter === 'OT') {
            filtered = filtered.filter(b => b.order < 40);
        } else if (bookFilter === 'NT') {
            filtered = filtered.filter(b => b.order >= 40);
        } else if (bookFilter === 'ALPHA') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        return filtered;
    }, [books, bookFilter, bookSearchQuery]);

    // Mnemonic Groups
    const otGroups = [
        { name: "FIRST", start: 1, end: 5, label: "The Law" },
        { name: "IS THE STORY OF", start: 6, end: 17, label: "History" },
        { name: "TRUTH", start: 18, end: 22, label: "Poetry & Wisdom" },
        { name: "ABOUT", start: 23, end: 27, label: "Major Prophets" },
        { name: "EVERYONE'S SIN", start: 28, end: 39, label: "Minor Prophets" }
    ];

    const ntGroups = [
        { name: "JESUS", start: 40, end: 44, label: "Gospels & Acts" },
        { name: "SENT HIS SPIRIT", start: 45, end: 57, label: "Paul's Epistles" },
        { name: "TO ALL OF US", start: 58, end: 66, label: "General Epistles & Revelation" }
    ];

    const toggleSection = (name: string) => {
        setCollapsedSections(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleAll = (groups: { name: string }[], collapse: boolean) => {
        const newState = { ...collapsedSections };
        groups.forEach(g => {
            newState[g.name] = collapse;
        });
        setCollapsedSections(newState);
    };

    const areAllCollapsed = (groups: { name: string }[]) => {
        return groups.every(g => collapsedSections[g.name]);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20 px-4 sm:px-6">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Bible & Memory Hub</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    "Thy word is a lamp unto my feet, and a light unto my path."
                </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Main Content Area */}
                <div className="lg:col-span-8 space-y-6">
                    {/* Tabs */}
                    <div className="flex items-center gap-2 bg-card border border-border p-1 rounded-xl w-fit">
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'books'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                }`}
                        >
                            <Book className="w-4 h-4" />
                            Scripture Library
                        </button>
                        <button
                            onClick={() => setActiveTab('mnemonics')}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'mnemonics'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                }`}
                        >
                            <Brain className="w-4 h-4" />
                            Mnemonics
                        </button>
                    </div>

                    {/* Books Tab Content */}
                    {activeTab === 'books' && (
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                            {/* Search and Filters */}
                            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center">
                                <div className="relative w-full sm:max-w-xs">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search books..."
                                        className="w-full pl-9 pr-4 py-2 bg-secondary/10 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-all"
                                        value={bookSearchQuery}
                                        onChange={(e) => setBookSearchQuery(e.target.value)}
                                    />
                                    {bookSearchQuery && (
                                        <button
                                            onClick={() => setBookSearchQuery('')}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded-full"
                                        >
                                            <X className="w-3 h-3 text-muted-foreground" />
                                        </button>
                                    )}
                                </div>

                                <div className="flex flex-wrap gap-2 justify-center">
                                    {(['ALL', 'ALPHA', 'OT', 'NT'] as const).map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setBookFilter(filter)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${bookFilter === filter
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
                                                }`}
                                        >
                                            {filter === 'ALPHA' ? 'Alphabetical' :
                                                filter === 'OT' ? 'Old Testament' :
                                                    filter === 'NT' ? 'New Testament' :
                                                        'All Books'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Books Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                                {filteredBooks.map(book => (
                                    <div
                                        key={book.id}
                                        className="group relative flex flex-col rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all overflow-hidden"
                                    >
                                        <button
                                            onClick={() => navigate(`/bible/read/${book.name.replace(/\s+/g, '')}/1`)}
                                            className="flex-1 p-4 text-left hover:bg-secondary/5 transition-colors"
                                        >
                                            <span className="font-bold text-sm block mb-1 group-hover:text-primary transition-colors">{book.name}</span>
                                            <span className="text-xs text-muted-foreground">{book.numberOfChapters} Chapters</span>
                                        </button>

                                        {/* Quick Chapter Hover (Optional - could be complex for mobile, keeping simple for now) */}
                                        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mnemonics Tab Content */}
                    {activeTab === 'mnemonics' && (
                        <div className="space-y-8">
                            {/* Old Testament */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Old Testament</h3>
                                    <p className="text-xl font-medium text-foreground/90 leading-relaxed">
                                        {getTestamentMnemonic('OT')}
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => toggleAll(otGroups, !areAllCollapsed(otGroups))}
                                        className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                        {areAllCollapsed(otGroups) ? (
                                            <>Expand All <ChevronsDown className="w-3 h-3" /></>
                                        ) : (
                                            <>Collapse All <ChevronsUp className="w-3 h-3" /></>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {otGroups.map(group => {
                                        const isCollapsed = collapsedSections[group.name];
                                        return (
                                            <div key={group.name} className="space-y-3">
                                                <button
                                                    onClick={() => toggleSection(group.name)}
                                                    className="w-full flex items-center gap-3 group select-none p-2 hover:bg-secondary/10 rounded-lg transition-colors"
                                                >
                                                    <div className="p-1 rounded-md bg-secondary/20 text-primary">
                                                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                    </div>
                                                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider">{group.name}</h4>
                                                    <div className="h-[1px] flex-1 bg-border/50" />
                                                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{group.label}</span>
                                                </button>

                                                {!isCollapsed && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-200 pl-2">
                                                        {filteredBooks.filter(b => b.order >= group.start && b.order <= group.end).map(book => {
                                                            const mnemonic = getBookMnemonicText(book.id);
                                                            return (
                                                                <div
                                                                    key={book.id}
                                                                    className="flex items-stretch rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors min-h-[80px]"
                                                                >
                                                                    <button
                                                                        onClick={() => navigate(`/bible/read/${book.name.replace(/\s+/g, '')}/1`)}
                                                                        className="flex-1 px-4 py-3 text-left hover:bg-secondary/5 transition-colors flex flex-col justify-center gap-1"
                                                                    >
                                                                        <span className="font-bold text-sm">{book.name}</span>
                                                                        {mnemonic && (
                                                                            <span className="text-xs text-muted-foreground leading-snug line-clamp-2">
                                                                                <span className="font-bold text-primary">{mnemonic.charAt(0)}</span>
                                                                                {mnemonic.slice(1)}
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* New Testament */}
                            <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6">
                                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                                    <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">New Testament</h3>
                                    <p className="text-xl font-medium text-foreground/90 leading-relaxed">
                                        {getTestamentMnemonic('NT')}
                                    </p>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        onClick={() => toggleAll(ntGroups, !areAllCollapsed(ntGroups))}
                                        className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
                                    >
                                        {areAllCollapsed(ntGroups) ? (
                                            <>Expand All <ChevronsDown className="w-3 h-3" /></>
                                        ) : (
                                            <>Collapse All <ChevronsUp className="w-3 h-3" /></>
                                        )}
                                    </button>
                                </div>

                                <div className="space-y-4">
                                    {ntGroups.map(group => {
                                        const isCollapsed = collapsedSections[group.name];
                                        return (
                                            <div key={group.name} className="space-y-3">
                                                <button
                                                    onClick={() => toggleSection(group.name)}
                                                    className="w-full flex items-center gap-3 group select-none p-2 hover:bg-secondary/10 rounded-lg transition-colors"
                                                >
                                                    <div className="p-1 rounded-md bg-secondary/20 text-primary">
                                                        {isCollapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                                                    </div>
                                                    <h4 className="text-sm font-bold text-primary uppercase tracking-wider">{group.name}</h4>
                                                    <div className="h-[1px] flex-1 bg-border/50" />
                                                    <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-widest">{group.label}</span>
                                                </button>

                                                {!isCollapsed && (
                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 animate-in slide-in-from-top-2 duration-200 pl-2">
                                                        {filteredBooks.filter(b => b.order >= group.start && b.order <= group.end).map(book => {
                                                            const mnemonic = getBookMnemonicText(book.id);
                                                            return (
                                                                <div
                                                                    key={book.id}
                                                                    className="flex items-stretch rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-colors min-h-[80px]"
                                                                >
                                                                    <button
                                                                        onClick={() => navigate(`/bible/read/${book.name.replace(/\s+/g, '')}/1`)}
                                                                        className="flex-1 px-4 py-3 text-left hover:bg-secondary/5 transition-colors flex flex-col justify-center gap-1"
                                                                    >
                                                                        <span className="font-bold text-sm">{book.name}</span>
                                                                        {mnemonic && (
                                                                            <span className="text-xs text-muted-foreground leading-snug line-clamp-2">
                                                                                <span className="font-bold text-primary">{mnemonic.charAt(0)}</span>
                                                                                {mnemonic.slice(1)}
                                                                            </span>
                                                                        )}
                                                                    </button>
                                                                </div>
                                                            );
                                                        })}
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Sidebar: Memorization Tools */}
                <div className="lg:col-span-4 space-y-8">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm sticky top-24">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-2 bg-primary/10 rounded-lg">
                                <Brain className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-foreground">Memorization</h2>
                                <p className="text-xs text-muted-foreground">Tools to hide the Word in your heart</p>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Link
                                to="/bible/memory"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">Dashboard</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Overview of all memory tools</p>
                            </Link>

                            <Link
                                to="/bible/memory/hierarchical"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">Hierarchical Memory</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Structure complex passages</p>
                            </Link>

                            <Link
                                to="/bible/memory/crown-path"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">CROWN PATH</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Visual memory journey</p>
                            </Link>

                            <Link
                                to="/bible/memory/grace"
                                className="block group relative overflow-hidden rounded-lg border border-border bg-secondary/5 hover:bg-secondary/10 transition-all p-4"
                            >
                                <div className="flex justify-between items-center">
                                    <span className="font-medium group-hover:text-primary transition-colors">GRACE Method</span>
                                    <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">Systematic repetition</p>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default function Bible() {
    return (
        <Routes>
            <Route path="/" element={<BibleHome />} />
            <Route path="/read/:bookId" element={<BibleBookSummary />} />
            <Route path="/read/:bookId/:chapter" element={<BibleReader />} />
            <Route path="/read/:bookId/:chapter/:verseRange" element={<BibleReader />} />
            <Route path="/memory" element={<MemorizationHub />} />
            <Route path="/memory/hierarchical" element={<HierarchicalMemory />} />
            <Route path="/memory/hierarchical/:bookId" element={<HierarchicalMemory />} />
            <Route path="/memory/hierarchical/:bookId/:chapterId" element={<HierarchicalMemory />} />
            <Route path="/memory/grace" element={<GraceView />} />
            <Route path="/memory/crown-path" element={<CrownPathView />} />
            <Route path="/memory/sentence" element={<John316View />} />
            <Route path="/memory/gather" element={<GatherAroundView />} />
        </Routes>
    );
}
