import { useState, useEffect, useMemo } from 'react';
import { BookOpen, Brain, ChevronRight, Search, Book, X } from 'lucide-react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import BibleReader from '../components/BibleReader';
import BibleBookSummary from '../components/BibleBookSummary';
import MemorizationHub from '../components/MemorizationHub';
import HierarchicalMemory from '../components/HierarchicalMemory';
import { GraceView, CrownPathView, John316View, GatherAroundView } from '../components/MemoryTools';
import { getBooks } from '../data/bibleApi';
import type { BibleBook } from '../data/bibleApi';
import MnemonicsList from '../components/MnemonicsList';

function BibleHome() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [activeTab, setActiveTab] = useState<'books' | 'mnemonics' | 'tools'>('books');
    const [bookSearchQuery, setBookSearchQuery] = useState('');
    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA'>('ALL');
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
        }
        return filtered;
    }, [books, bookFilter, bookSearchQuery]);

    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in pb-20 px-4 sm:px-6">
            {/* Header Section */}
            <div className="text-center space-y-4 py-8">
                <h1 className="text-4xl font-bold text-foreground tracking-tight">Bible & Memory Hub</h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    "Your word is a lamp to my feet and a light to my path."
                </p>
            </div>

            {/* Chapter Selection Modal */}
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

            <div className="space-y-6">
                {/* Tabs Navigation */}
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-card border border-border p-2 rounded-xl">
                    {/* Bible Group */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'books'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                }`}
                        >
                            <Book className="w-4 h-4" />
                            Scripture Library
                        </button>
                        <button
                            onClick={() => setActiveTab('mnemonics')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'mnemonics'
                                ? 'bg-primary text-primary-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                }`}
                        >
                            <Brain className="w-4 h-4" />
                            Bible Mnemonics
                        </button>
                    </div>

                    {/* Separator for Mobile */}
                    <div className="w-full h-[1px] bg-border sm:hidden" />

                    {/* Memory Tools Group */}
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button
                            onClick={() => setActiveTab('tools')}
                            className={`flex-1 sm:flex-none px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${activeTab === 'tools'
                                ? 'bg-secondary text-secondary-foreground shadow-sm ring-1 ring-border'
                                : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                                }`}
                        >
                            <Brain className="w-4 h-4" />
                            Memory Tool Dashboard
                        </button>
                    </div>
                </div>

                {/* Content Area */}
                <div className="min-h-[500px]">
                    {/* Books Tab Content */}
                    {activeTab === 'books' && (
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
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                {filteredBooks.map(book => (
                                    <div
                                        key={book.id}
                                        onClick={() => navigate(`/bible/read/${book.name.replace(/\s+/g, '')}/1`)}
                                        className="group relative flex flex-col rounded-lg border border-border bg-card hover:border-primary/50 hover:shadow-md transition-all overflow-hidden cursor-pointer"
                                    >
                                        <div className="flex-1 p-4 text-left hover:bg-secondary/5 transition-colors">
                                            <span className="font-bold text-sm block mb-1 group-hover:text-primary transition-colors">{book.name}</span>
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
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Mnemonics Tab Content */}
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

                    {/* Memory Tools Tab Content */}
                    {activeTab === 'tools' && (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
                            <Link
                                to="/bible/memory"
                                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                                        <Brain className="w-6 h-6 text-primary" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Memory Dashboard</h3>
                                <p className="text-sm text-muted-foreground">Overview of all your memory progress and tools in one place.</p>
                            </Link>

                            <Link
                                to="/bible/memory/hierarchical"
                                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-secondary/20 rounded-lg group-hover:bg-secondary/30 transition-colors">
                                        <BookOpen className="w-6 h-6 text-foreground" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">Hierarchical Memory</h3>
                                <p className="text-sm text-muted-foreground">Break down complex passages into structured, manageable chunks.</p>
                            </Link>

                            <Link
                                to="/bible/memory/crown-path"
                                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-amber-500/10 rounded-lg group-hover:bg-amber-500/20 transition-colors">
                                        <Brain className="w-6 h-6 text-amber-600 dark:text-amber-400" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">CROWN PATH</h3>
                                <p className="text-sm text-muted-foreground">A visual memory journey technique for retaining scripture locations.</p>
                            </Link>

                            <Link
                                to="/bible/memory/grace"
                                className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 hover:border-primary/50 hover:shadow-md transition-all"
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="p-3 bg-emerald-500/10 rounded-lg group-hover:bg-emerald-500/20 transition-colors">
                                        <Brain className="w-6 h-6 text-emerald-600 dark:text-emerald-400" />
                                    </div>
                                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:translate-x-1 transition-transform" />
                                </div>
                                <h3 className="text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">GRACE Method</h3>
                                <p className="text-sm text-muted-foreground">Systematic repetition and engagement to deepen your memory.</p>
                            </Link>
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
