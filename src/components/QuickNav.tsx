import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronLeft, X, BookOpen, Book, Brain, List } from 'lucide-react';
import type { BibleBook } from '../data/bibleApi';
import { CHRONOLOGICAL_BOOKS } from '../data/chronologicalBooks';
import { BIBLE_BOOKS } from '../data/bibleBookConstants';
import MnemonicsList from './MnemonicsList';

interface QuickNavProps {
    isOpen: boolean;
    onClose: () => void;
    books: BibleBook[];
    onNavigate: (bookId: string, chapter: number, verse?: number) => void;
    onNavigateToBookOverview?: (bookId: string) => void;
    initialBook?: BibleBook | null;
}

export default function QuickNav({ isOpen, onClose, books, onNavigate, onNavigateToBookOverview, initialBook }: QuickNavProps) {
    const [selectedNavBook, setSelectedNavBook] = useState<BibleBook | null>(null);
    const [selectedNavChapter, setSelectedNavChapter] = useState<number | null>(null);

    // Derived nav step logic:
    // If selectedNavBook is null -> 'books'
    // If selectedNavBook is set -> 'chapters'
    // If selectedNavChapter is set -> 'verses' (overlay on top of chapters)

    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA' | 'CHRONO'>('ALL');
    const [bookSearchQuery, setBookSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'books' | 'mnemonics'>('books');

    const inputRef = useRef<HTMLInputElement>(null);
    const chapterListRef = useRef<HTMLDivElement>(null);

    const handleWheel = (e: React.WheelEvent) => {
        if (chapterListRef.current) {
            chapterListRef.current.scrollLeft += e.deltaY;
        }
    };

    useEffect(() => {
        if (isOpen) {
            // Reset state on open
            if (initialBook) {
                // If initialBook provided, pre-select it? 
                // Usually user wants to navigate FROM the current book to ELSEWHERE.
                // But showing the book list focused on current book is good.
                // We do NOT auto-select the book to show chapters unless distinct intent.
                // Standard behavior: Show book list.
                // But highlight the current book.
                setSelectedNavBook(initialBook);
            } else {
                setSelectedNavBook(null);
            }
            setSelectedNavChapter(null);
            setIsSearchOpen(false);
            setBookSearchQuery('');
            setBookFilter('ALL');
        }
    }, [isOpen, initialBook]);

    // Scroll to current book in list
    useEffect(() => {
        if (isOpen && !selectedNavBook && initialBook && bookFilter === 'ALL' && !bookSearchQuery) {
            // Only scroll if we are in book list mode (selectedNavBook is null, or we just opened)
            // Wait, logic above sets selectedNavBook = initialBook on open.
            // If we want to show BOOK LIST, we should set selectedNavBook = null?
            // User feedback suggests they want to switch books.
            // If I set `selectedNavBook(initialBook)`, it opens in CHAPTER view.
            // This might remain the desired behavior if they click the book name header.
            // But if they open QuickNav generally, maybe they want book list.
            // "Always start at books list" logic from previous code (line 39) suggested `setNavStep('books')`.
            // But line 41 set `setSelectedNavBook(initialBook)`.
            // Wait, `navStep` was explicit. Now I derive from `selectedNavBook`.
            // If `selectedNavBook` is set, we are in Chapter View.
            // So if I set it to `initialBook`, it opens Chapter view.
            // Is that what we want? 
            // Previous code: `setNavStep('books')` AND `setSelectedNavBook(initialBook)`.
            // But `navStep` took precedence? No, `useEffect` overwrote it?
            // Actually previous code: `setNavStep('books')`. Then `if (initialBook) setSelectedNavBook(...)`.
            // But render logic checked `navStep`.

            // Refined Logic for new structure:
            // We want to start at BOOK LIST unless specifically toggled.
            // So on Open, `setSelectedNavBook(null)` is better?
            // But highlighting the current book is nice.
            // Let's START with `selectedNavBook = null` (Book List).
            // But we can store `initialBook` for scrolling.
        }
    }, []); // Check implementation below

    // Refined Open Effect
    useEffect(() => {
        if (isOpen) {
            // Always show book list initially
            setSelectedNavBook(null);
            setSelectedNavChapter(null);
            setIsSearchOpen(false);
            setBookSearchQuery('');
            setBookFilter('ALL');

            // Scroll to initial book
            if (initialBook) {
                setTimeout(() => {
                    const element = document.getElementById(`book-item-${initialBook.id}`);
                    if (element) {
                        element.scrollIntoView({ block: 'center', behavior: 'smooth' });
                    }
                }, 100);
            }
        }
    }, [isOpen, initialBook]);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    // Filtered Books for Grid
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

    // Filtered Books for Mnemonics (Canonical)
    const mnemonicsBooks = useMemo(() => {
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
        }
        return filtered;
    }, [books, bookFilter, bookSearchQuery]);

    const handleClose = () => {
        setSelectedNavBook(null);
        setSelectedNavChapter(null);
        setBookSearchQuery('');
        onClose();
    };

    // Verse helpers
    const getVerseCount = (bookId: string, chapter: number): number => {
        const bookData = BIBLE_BOOKS[bookId];
        if (!bookData) return 999; // Fallback
        return bookData.verses[chapter - 1] || 0;
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh] overflow-hidden relative">

                {/* Main Header (Book List) */}
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0 bg-card z-10">
                    <div className="flex items-center gap-2 bg-secondary/10 p-1 rounded-lg">
                        <button
                            onClick={() => setActiveTab('books')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'books'
                                ? 'bg-background shadow-sm text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Book className="w-4 h-4" />
                            Books
                        </button>
                        <button
                            onClick={() => setActiveTab('mnemonics')}
                            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'mnemonics'
                                ? 'bg-background shadow-sm text-foreground'
                                : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            <Brain className="w-4 h-4" />
                            Mnemonics
                        </button>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-accent/10 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="relative flex-1 overflow-hidden">
                    {activeTab === 'books' && (
                        <div className="h-full flex flex-col overflow-hidden">
                            {/* Search & Filters */}
                            <div className="p-4 border-b border-border space-y-3 shrink-0">
                                <div className="flex items-center gap-3 min-h-[40px]">
                                    {isSearchOpen ? (
                                        <div className="relative flex-1 animate-fade-in">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                ref={inputRef}
                                                type="text"
                                                placeholder="Search books..."
                                                className="w-full pl-9 pr-10 py-2 bg-secondary/10 border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                                value={bookSearchQuery}
                                                onChange={(e) => setBookSearchQuery(e.target.value)}
                                            />
                                            <button
                                                onClick={() => {
                                                    setIsSearchOpen(false);
                                                    setBookSearchQuery('');
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 hover:bg-accent/10 rounded-full"
                                            >
                                                <X className="w-4 h-4 text-muted-foreground" />
                                            </button>
                                        </div>
                                    ) : (
                                        <>
                                            <button
                                                onClick={() => setIsSearchOpen(true)}
                                                className="p-2 hover:bg-accent/10 rounded-full text-muted-foreground hover:text-foreground transition-colors"
                                                title="Search Books"
                                            >
                                                <Search className="w-5 h-5" />
                                            </button>
                                            <div className="flex-1 text-sm text-muted-foreground italic">
                                                Select a book...
                                            </div>
                                        </>
                                    )}
                                </div>
                                {!isSearchOpen && (
                                    <div className="flex flex-wrap gap-2 pb-1 animate-fade-in justify-center">
                                        {(['ALL', 'ALPHA', 'CHRONO', 'OT', 'NT'] as const).map(filter => (
                                            <button
                                                key={filter}
                                                onClick={() => setBookFilter(filter)}
                                                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${bookFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
                                                    }`}
                                            >
                                                <span className="sm:hidden">{filter === 'ALPHA' ? 'A-Z' : filter === 'CHRONO' ? 'Chron' : filter === 'OT' ? 'OT' : filter === 'NT' ? 'NT' : 'All'}</span>
                                                <span className="hidden sm:inline">
                                                    {filter === 'ALPHA' ? 'Alphabetical' : filter === 'CHRONO' ? 'Chronological' : filter === 'OT' ? 'Old Testament' : filter === 'NT' ? 'New Testament' : 'All Books'}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>

                            {/* Book Grid */}
                            <div className="overflow-y-auto p-4">
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                                    {filteredBooks.map(book => {
                                        const chronoData = bookFilter === 'CHRONO' ? CHRONOLOGICAL_BOOKS.find(cb => cb.name === book.name) : null;
                                        return (
                                            <div
                                                key={book.id}
                                                id={`book-item-${book.id}`}
                                                className={`flex items-stretch rounded-lg border bg-card overflow-hidden transition-colors h-[50px] ${initialBook?.id === book.id
                                                    ? 'border-primary ring-1 ring-primary shadow-sm'
                                                    : 'border-border hover:border-primary/50'
                                                    }`}
                                            >
                                                <button
                                                    onClick={() => {
                                                        onNavigate(book.id, 1);
                                                        handleClose();
                                                    }}
                                                    className="flex-1 px-3 text-sm text-left hover:bg-secondary/10 transition-colors truncate flex flex-col justify-center gap-0.5"
                                                    title={`Go to ${book.name} Chapter 1`}
                                                >
                                                    <span className="font-medium truncate w-full">{book.name}</span>
                                                    {chronoData && (
                                                        <span className="text-[10px] text-muted-foreground truncate w-full leading-none">
                                                            {chronoData.year}
                                                        </span>
                                                    )}
                                                </button>
                                                <div className="w-[1px] bg-border" />
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setSelectedNavBook(book);
                                                    }}
                                                    className="w-[40px] flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-primary hover:bg-secondary/10 transition-colors"
                                                    title="Select Chapter"
                                                >
                                                    {book.numberOfChapters}
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* CHAPTER SELECT OVERLAY (Layer 1) */}
                            {selectedNavBook && (
                                <div className="absolute inset-0 z-20 bg-background flex flex-col animate-in slide-in-from-right duration-200">
                                    <div className="p-4 border-b border-border flex items-center justify-between bg-card text-card-foreground shadow-sm shrink-0">
                                        <div className="flex items-center gap-3">
                                            <button
                                                onClick={() => setSelectedNavBook(null)}
                                                className="p-2 hover:bg-accent/10 rounded-full"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <h2 className="text-xl font-bold">{selectedNavBook.name}</h2>
                                        </div>
                                        <div className="flex gap-2">
                                            {onNavigateToBookOverview && (
                                                <button
                                                    onClick={() => {
                                                        onNavigateToBookOverview(selectedNavBook.id);
                                                        handleClose();
                                                    }}
                                                    className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                                                >
                                                    <BookOpen className="w-4 h-4" />
                                                    <span className="hidden sm:inline">Overview</span>
                                                </button>
                                            )}
                                            <button
                                                onClick={() => setSelectedNavBook(null)}
                                                className="p-2 hover:bg-accent/10 rounded-full"
                                            >
                                                <X className="w-6 h-6" />
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex-1 overflow-y-auto p-4 content-start">
                                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                                            {Array.from({ length: selectedNavBook.numberOfChapters }, (_, i) => i + 1).map(chap => {
                                                const verseCount = getVerseCount(selectedNavBook.id, chap);
                                                return (
                                                    <div key={chap} className="flex flex-col h-[60px] border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors shadow-sm">
                                                        <button
                                                            onClick={() => {
                                                                onNavigate(selectedNavBook.id, chap);
                                                                handleClose();
                                                            }}
                                                            className="flex-1 w-full bg-secondary/5 hover:bg-secondary/15 flex items-center justify-center text-lg font-bold"
                                                            title={`Go to ${selectedNavBook.name} ${chap}`}
                                                        >
                                                            {chap}
                                                        </button>
                                                        <button
                                                            onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedNavChapter(chap);
                                                            }}
                                                            className="h-[20px] w-full bg-secondary/20 hover:bg-primary/10 hover:text-primary text-[10px] text-muted-foreground flex items-center justify-center border-t border-border uppercase tracking-wider font-semibold"
                                                            title={`Select Verse in Chapter ${chap}`}
                                                        >
                                                            {verseCount} vs
                                                        </button>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    {/* VERSE SELECT OVERLAY (Layer 2) */}
                                    {selectedNavChapter && (
                                        <div className="absolute inset-0 z-30 bg-background flex flex-col animate-in slide-in-from-right duration-200">
                                            <div className="p-4 border-b border-border flex items-center justify-between bg-card text-card-foreground shadow-sm shrink-0">
                                                <div className="flex items-center gap-3">
                                                    <button
                                                        onClick={() => setSelectedNavChapter(null)}
                                                        className="p-2 hover:bg-accent/10 rounded-full"
                                                    >
                                                        <ChevronLeft className="w-5 h-5" />
                                                    </button>
                                                    <h2 className="text-xl font-bold flex items-center gap-2">
                                                        <span className="opacity-70">{selectedNavBook.name}</span>
                                                        <span>{selectedNavChapter}</span>
                                                    </h2>
                                                </div>
                                                <button
                                                    onClick={() => setSelectedNavChapter(null)}
                                                    className="p-2 hover:bg-accent/10 rounded-full"
                                                >
                                                    <X className="w-6 h-6" />
                                                </button>
                                            </div>
                                            <div className="flex-1 overflow-y-auto p-4">
                                                <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                                                    {Array.from({ length: getVerseCount(selectedNavBook.id, selectedNavChapter) }, (_, i) => i + 1).map(verse => (
                                                        <button
                                                            key={verse}
                                                            onClick={() => {
                                                                onNavigate(selectedNavBook.id, selectedNavChapter, verse);
                                                                handleClose();
                                                            }}
                                                            className="p-2 text-sm font-bold bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors min-h-[40px] flex items-center justify-center"
                                                        >
                                                            {verse}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {activeTab === 'mnemonics' && (
                        <div className="h-full flex flex-col overflow-hidden p-4">
                            <div className="overflow-y-auto h-full">
                                <MnemonicsList
                                    books={mnemonicsBooks}
                                    activeBookId={initialBook?.id}
                                    adjustStickyForHeader={false}
                                    onNavigate={(bookId, chap, verse) => {
                                        onNavigate(bookId, chap, verse);
                                        handleClose();
                                    }}
                                    onChapterSelect={(book) => {
                                        setSelectedNavBook(book);
                                        setActiveTab('books');
                                    }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
