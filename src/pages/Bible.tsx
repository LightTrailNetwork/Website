import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Brain, ChevronRight, Search, Book, X, List, Clock, Users } from 'lucide-react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import BibleReader from '../components/BibleReader';
import BibleBookSummary from '../components/BibleBookSummary';
import MemorizationHub from '../components/MemorizationHub';
import HierarchicalMemory from '../components/HierarchicalMemory';
import { GraceView, CrownPathView, John316View, GatherAroundView } from '../components/MemoryTools';
import { getBooks } from '../data/bibleApi';
import type { BibleBook } from '../data/bibleApi';
import MnemonicsList from '../components/MnemonicsList';
import MemoryPassages from '../components/MemoryPassages';
import MemoryLists from '../components/MemoryLists';
import { ParablesView } from '../components/ParablesView';
import MnemonicSystemHub from '../components/MnemonicSystemHub';
import MnemonicDetail from '../components/MnemonicDetail';
import NamesStudy from '../components/study/NamesStudy';
import { CHRONOLOGICAL_BOOKS, CHRONOLOGICAL_ERAS } from '../data/chronologicalBooks';

function BibleHome() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [activeTab, setActiveTab] = useState<'chapters' | 'mnemonics'>('chapters');
    const [bookSearchQuery, setBookSearchQuery] = useState('');
    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA' | 'CHRONO'>('ALL');
    const [selectedBookForChapters, setSelectedBookForChapters] = useState<BibleBook | null>(null);

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
        } else if (bookFilter === 'CHRONO') {
            filtered.sort((a, b) => {
                const chronoA = CHRONOLOGICAL_BOOKS.find(cb => cb.name === a.name)?.order || 999;
                const chronoB = CHRONOLOGICAL_BOOKS.find(cb => cb.name === b.name)?.order || 999;
                return chronoA - chronoB;
            });
        }
        return filtered;
    }, [books, bookFilter, bookSearchQuery]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20 px-4 sm:px-6">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8 relative">
                <div className="absolute top-8 right-0 hidden sm:flex gap-2">
                    <Link
                        to="/bible/names"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-sm font-medium transition-colors text-primary"
                    >
                        <Users className="w-4 h-4" />
                        Names Study
                    </Link>
                    <Link
                        to="/bible/memory"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-sm font-medium transition-colors text-primary"
                    >
                        <Brain className="w-4 h-4" />
                        Memory Tools
                    </Link>
                </div>
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Scripture Library</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    "Your word is a lamp to my feet and a light to my path."
                </p>

                {/* Mobile Memory Link */}
                <div className="sm:hidden flex justify-center gap-2 pt-2">
                    <Link
                        to="/bible/names"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-sm font-medium transition-colors text-primary"
                    >
                        <Users className="w-4 h-4" />
                        Names
                    </Link>
                    <Link
                        to="/bible/memory"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/10 hover:bg-secondary/20 text-sm font-medium transition-colors text-primary"
                    >
                        <Brain className="w-4 h-4" />
                        Memory
                    </Link>
                </div>
            </div>

            {/* Main Content Tabs */}
            <div className="space-y-6">
                {/* Tabs Navigation */}
                <div className="flex justify-center">
                    <div className="inline-flex items-center p-1 rounded-xl bg-secondary/10 border border-border">
                        <button
                            onClick={() => setActiveTab('chapters')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'chapters'
                                ? 'bg-background shadow-sm text-foreground ring-1 ring-border'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Book className="w-4 h-4" />
                            Book List
                        </button>
                        <button
                            onClick={() => setActiveTab('mnemonics')}
                            className={`px-6 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'mnemonics'
                                ? 'bg-background shadow-sm text-foreground ring-1 ring-border'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            Book Mnemonics
                        </button>
                    </div>
                </div>

                {/* Chapter Selection Modal (Only relevant for Chapter List view) */}
                {selectedBookForChapters && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200" onClick={() => setSelectedBookForChapters(null)}>
                        <div className="bg-card border border-border rounded-xl shadow-lg max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
                            <div className="p-4 border-b border-border flex justify-between items-center bg-secondary/5">
                                <div className="flex items-center gap-4">
                                    <h3 className="text-xl font-bold flex items-center gap-2">
                                        <Book className="w-5 h-5 text-primary" />
                                        {selectedBookForChapters.name}
                                    </h3>
                                    <button
                                        onClick={() => {
                                            navigate(`/bible/read/${selectedBookForChapters.name.replace(/\s+/g, '')}`);
                                            setSelectedBookForChapters(null);
                                        }}
                                        className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors font-medium"
                                    >
                                        <BookOpen className="w-3.5 h-3.5" />
                                        Overview
                                    </button>
                                </div>
                                <button
                                    onClick={() => setSelectedBookForChapters(null)}
                                    className="p-1 hover:bg-secondary/20 rounded-full transition-colors"
                                >
                                    <X className="w-5 h-5 text-muted-foreground" />
                                </button>
                            </div>
                            <div className="p-6 overflow-y-auto">
                                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                                    {Array.from({ length: selectedBookForChapters.numberOfChapters }, (_, i) => i + 1).map(chapter => (
                                        <button
                                            key={chapter}
                                            onClick={() => {
                                                navigate(`/bible/read/${selectedBookForChapters.name.replace(/\s+/g, '')}/${chapter}`);
                                                setSelectedBookForChapters(null);
                                            }}
                                            className="aspect-square flex items-center justify-center rounded-lg border border-border hover:border-primary hover:bg-primary/5 hover:text-primary font-medium transition-all text-sm"
                                        >
                                            {chapter}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Area */}
                <div className="min-h-[500px]">
                    {activeTab === 'chapters' && (
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
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
                                    {(['ALL', 'ALPHA', 'CHRONO', 'OT', 'NT'] as const).map(filter => (
                                        <button
                                            key={filter}
                                            onClick={() => setBookFilter(filter)}
                                            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${bookFilter === filter
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
                                                }`}
                                        >
                                            {filter === 'ALPHA' ? 'Alphabetical' :
                                                filter === 'CHRONO' ? 'Chronological' :
                                                    filter === 'OT' ? 'Old Testament' :
                                                        filter === 'NT' ? 'New Testament' :
                                                            'All Books'}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Books Grid */}
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {filteredBooks.map(book => {
                                    const chronoData = bookFilter === 'CHRONO' ? CHRONOLOGICAL_BOOKS.find(cb => cb.name === book.name) : null;

                                    return (
                                        <div
                                            key={book.id}
                                            onClick={() => navigate(`/bible/read/${book.name.replace(/\s+/g, '')}/1`)}
                                            className="group relative flex flex-col rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                                        >
                                            <div className="flex-1 p-4 text-left hover:bg-secondary/5 transition-colors">
                                                <span className="font-bold text-sm block mb-1 group-hover:text-primary transition-colors">{book.name}</span>

                                                {chronoData && (
                                                    <div className="mb-2">
                                                        <span className="block text-[10px] text-primary font-bold uppercase tracking-wider">{chronoData.era}</span>
                                                        <span className="block text-[10px] text-muted-foreground flex items-center gap-1">
                                                            <Clock className="w-3 h-3" />
                                                            {chronoData.year}
                                                        </span>
                                                    </div>
                                                )}

                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        if (book.numberOfChapters === 1) {
                                                            navigate(`/bible/read/${book.name.replace(/\s+/g, '')}/1`);
                                                        } else {
                                                            setSelectedBookForChapters(book);
                                                        }
                                                    }}
                                                    className="text-xs text-muted-foreground hover:text-primary hover:underline decoration-primary/50 underline-offset-2 transition-all relative z-10"
                                                >
                                                    {book.numberOfChapters} {book.numberOfChapters === 1 ? 'Chapter' : 'Chapters'}
                                                </button>
                                            </div>

                                            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                                                <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    )}

                    {activeTab === 'mnemonics' && (
                        <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <MnemonicsList
                                books={filteredBooks}
                                onNavigate={(bookId, chap, verse) => {
                                    const book = books.find(b => b.id === bookId);
                                    if (book) {
                                        const url = `/bible/read/${book.name.replace(/\s+/g, '')}/${chap}${verse ? `/${verse}` : ''}`;
                                        navigate(url);
                                    }
                                }}
                                onChapterSelect={(book) => setSelectedBookForChapters(book)}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default function Bible() {
    return (
        <Routes>
            <Route path="/" element={<BibleHome />} />
            <Route path="/read" element={<BibleHome />} />
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
            <Route path="/memory/passages" element={<MemoryPassages />} />
            <Route path="/memory/lists" element={<MemoryLists />} />
            <Route path="/memory/parables" element={<ParablesView />} />
            <Route path="/memory/mnemonics" element={<MnemonicSystemHub />} />
            <Route path="/memory/mnemonics/:id" element={<MnemonicDetail />} />
            <Route path="/names" element={<NamesStudy />} />
        </Routes>
    );
}

