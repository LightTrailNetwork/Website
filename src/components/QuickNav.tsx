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
    initialChapter?: number;
}

export default function QuickNav({ isOpen, onClose, books, onNavigate, onNavigateToBookOverview, initialBook, initialChapter }: QuickNavProps) {
    const [selectedNavBook, setSelectedNavBook] = useState<BibleBook | null>(null);
    const [selectedNavChapter, setSelectedNavChapter] = useState<number | null>(null);

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

    // Reset state on open
    useEffect(() => {
        if (isOpen) {
            setSelectedNavBook(null);
            setSelectedNavChapter(null);
            setIsSearchOpen(false);
            setBookSearchQuery('');
            setBookFilter('ALL');
        }
    }, [isOpen]);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (isOpen && !selectedNavBook && initialBook && bookFilter === 'ALL' && !bookSearchQuery) {
            // Scroll book into view
            setTimeout(() => {
                const bookElement = document.getElementById(`book-item-${initialBook.id}`);
                if (bookElement) {
                    bookElement.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
            }, 100);

            // Scroll chapter into view if present
            if (initialChapter && chapterListRef.current) {
                setTimeout(() => {
                    const chapterButton = document.getElementById(`quicknav-chapter-${initialChapter}`);
                    const container = chapterListRef.current;
                    if (chapterButton && container) {
                        const containerRect = container.getBoundingClientRect();
                        const buttonRect = chapterButton.getBoundingClientRect();

                        // Calculate center position
                        const relativeLeft = buttonRect.left - containerRect.left;
                        const currentScrollLeft = container.scrollLeft;
                        const centerOffset = (containerRect.width / 2) - (buttonRect.width / 2);

                        container.scrollTo({
                            left: currentScrollLeft + relativeLeft - centerOffset,
                            behavior: 'smooth'
                        });
                    }
                }, 100);
            }
        }
    }, [isOpen, selectedNavBook, initialBook, initialChapter, bookFilter, bookSearchQuery]);

    // Derived filtered lists
    const filteredBooks = useMemo(() => {
        let filtered = [...books];
        if (bookSearchQuery) {
            const q = bookSearchQuery.toLowerCase();
            filtered = filtered.filter(b => b.name.toLowerCase().includes(q) || (b.commonName && b.commonName.toLowerCase().includes(q)));
        }
        if (bookFilter === 'OT') filtered = filtered.filter(b => b.order < 40);
        else if (bookFilter === 'NT') filtered = filtered.filter(b => b.order >= 40);
        else if (bookFilter === 'ALPHA') filtered.sort((a, b) => a.name.localeCompare(b.name));
        else if (bookFilter === 'CHRONO') {
            filtered.sort((a, b) => {
                const chronoA = CHRONOLOGICAL_BOOKS.find(cb => cb.name === a.name)?.order || 999;
                const chronoB = CHRONOLOGICAL_BOOKS.find(cb => cb.name === b.name)?.order || 999;
                return chronoA - chronoB;
            });
        }
        return filtered;
    }, [books, bookFilter, bookSearchQuery]);

    const mnemonicsBooks = useMemo(() => {
        let filtered = [...books];
        if (bookSearchQuery) {
            const q = bookSearchQuery.toLowerCase();
            filtered = filtered.filter(b => b.name.toLowerCase().includes(q) || (b.commonName && b.commonName.toLowerCase().includes(q)));
        }
        if (bookFilter === 'OT') filtered = filtered.filter(b => b.order < 40);
        else if (bookFilter === 'NT') filtered = filtered.filter(b => b.order >= 40);
        return filtered;
    }, [books, bookFilter, bookSearchQuery]);

    const handleClose = () => {
        onClose();
    };

    const getVerseCount = (bookId: string, chapter: number): number => {
        const bookData = BIBLE_BOOKS[bookId];
        return bookData?.verses[chapter - 1] || 0;
    };

    if (!isOpen) return null;

    // View Switching Logic
    const renderBookList = () => (
        <div className="flex-1 flex flex-col overflow-hidden min-h-0">
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
                                onClick={() => { setIsSearchOpen(false); setBookSearchQuery(''); }}
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

                            {initialBook ? (
                                <div className="flex-1 flex items-center gap-3 overflow-hidden animate-fade-in">
                                    <span className="font-bold whitespace-nowrap">{initialBook.name}</span>
                                    <div className="h-4 w-[1px] bg-border shrink-0" />
                                    <div
                                        ref={chapterListRef}
                                        onWheel={handleWheel}
                                        className="flex-1 overflow-x-auto flex items-center gap-1 pb-1 scrollbar-hide mask-linear-fade [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                                    >
                                        {Array.from({ length: initialBook.numberOfChapters }, (_, i) => i + 1).map(chap => {
                                            const isActive = initialChapter === chap;
                                            return (
                                                <button
                                                    key={chap}
                                                    id={`quicknav-chapter-${chap}`}
                                                    onClick={() => {
                                                        onNavigate(initialBook.id, chap);
                                                        handleClose();
                                                    }}
                                                    className={`w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-xs font-medium transition-all ${isActive
                                                        ? 'bg-primary text-primary-foreground font-bold shadow-sm scale-105'
                                                        : 'hover:bg-primary/10 hover:text-primary text-muted-foreground'}`}
                                                >
                                                    {chap}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 text-sm text-muted-foreground italic">Select a book...</div>
                            )}
                        </>
                    )}
                </div>
                {
                    !isSearchOpen && (
                        <div className="flex flex-wrap gap-2 pb-1 animate-fade-in justify-center">
                            {(['ALL', 'ALPHA', 'CHRONO', 'OT', 'NT'] as const).map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setBookFilter(filter)}
                                    className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${bookFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'}`}
                                >
                                    <span className="sm:hidden">{filter === 'ALPHA' ? 'A-Z' : filter === 'CHRONO' ? 'Chron' : filter === 'OT' ? 'OT' : filter === 'NT' ? 'NT' : 'All'}</span>
                                    <span className="hidden sm:inline">
                                        {filter === 'ALPHA' ? 'Alphabetical' : filter === 'CHRONO' ? 'Chronological' : filter === 'OT' ? 'Old Testament' : filter === 'NT' ? 'New Testament' : 'All Books'}
                                    </span>
                                </button>
                            ))}
                        </div>
                    )
                }
            </div >

            {/* Grid */}
            < div className="flex-1 overflow-y-auto p-4 min-h-0 overscroll-contain" >
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                    {filteredBooks.map(book => {
                        const chronoData = bookFilter === 'CHRONO' ? CHRONOLOGICAL_BOOKS.find(cb => cb.name === book.name) : null;
                        return (
                            <div
                                key={book.id}
                                id={`book-item-${book.id}`}
                                className={`flex items-stretch rounded-lg border bg-card overflow-hidden transition-colors h-[50px] ${initialBook?.id === book.id ? 'border-primary ring-1 ring-primary shadow-sm' : 'border-border hover:border-primary/50'}`}
                            >
                                <button
                                    onClick={() => { onNavigate(book.id, 1); handleClose(); }}
                                    className="flex-1 px-3 text-sm text-left hover:bg-secondary/10 transition-colors truncate flex flex-col justify-center gap-0.5"
                                    title={`Go to ${book.name} Chapter 1`}
                                >
                                    <span className="font-medium truncate w-full">{book.name}</span>
                                    {chronoData && <span className="text-[10px] text-muted-foreground truncate w-full leading-none">{chronoData.year}</span>}
                                </button>
                                <div className="w-[1px] bg-border" />
                                <button
                                    onClick={(e) => { e.stopPropagation(); setSelectedNavBook(book); }}
                                    className="w-[40px] flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-primary hover:bg-secondary/10 transition-colors"
                                    title="Select Chapter"
                                >
                                    {book.numberOfChapters}
                                </button>
                            </div>
                        );
                    })}
                </div>
            </div >
        </div >
    );

    const renderChapterList = () => {
        if (!selectedNavBook) return null;
        return (
            <div className="flex-1 flex flex-col overflow-hidden min-h-0 animate-in slide-in-from-right duration-200">
                <div className="p-4 border-b border-border flex items-center justify-between bg-card text-card-foreground shadow-sm shrink-0">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSelectedNavBook(null)} className="p-2 hover:bg-accent/10 rounded-full">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold">{selectedNavBook.name}</h2>
                    </div>
                    <div className="flex gap-2">
                        {onNavigateToBookOverview && (
                            <button
                                onClick={() => { onNavigateToBookOverview(selectedNavBook.id); handleClose(); }}
                                className="px-3 py-1.5 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold rounded-lg transition-colors flex items-center gap-2"
                            >
                                <BookOpen className="w-4 h-4" />
                                <span className="hidden sm:inline">Overview</span>
                            </button>
                        )}
                        <button onClick={handleClose} className="p-2 hover:bg-accent/10 rounded-full">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto p-4 min-h-0 overscroll-contain">
                    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-3">
                        {Array.from({ length: selectedNavBook.numberOfChapters }, (_, i) => i + 1).map(chap => {
                            const verseCount = getVerseCount(selectedNavBook.id, chap);
                            return (
                                <div key={chap} className="flex flex-col h-[60px] border border-border rounded-lg overflow-hidden bg-card hover:border-primary/50 transition-colors shadow-sm">
                                    <button
                                        onClick={() => { onNavigate(selectedNavBook.id, chap); handleClose(); }}
                                        className="flex-1 w-full bg-secondary/5 hover:bg-secondary/15 flex items-center justify-center text-lg font-bold"
                                        title={`Go to ${selectedNavBook.name} ${chap}`}
                                    >
                                        {chap}
                                    </button>
                                    <button
                                        onClick={(e) => { e.stopPropagation(); setSelectedNavChapter(chap); }}
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
            </div>
        );
    };

    const renderVerseList = () => {
        if (!selectedNavBook || !selectedNavChapter) return null;
        return (
            <div className="flex-1 flex flex-col overflow-hidden min-h-0 animate-in slide-in-from-right duration-200">
                <div className="p-4 border-b border-border flex items-center justify-between bg-card text-card-foreground shadow-sm shrink-0">
                    <div className="flex items-center gap-3">
                        <button onClick={() => setSelectedNavChapter(null)} className="p-2 hover:bg-accent/10 rounded-full">
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <h2 className="text-xl font-bold flex items-center gap-2">
                            <span className="opacity-70">{selectedNavBook.name}</span>
                            <span>{selectedNavChapter}</span>
                        </h2>
                    </div>
                    <button onClick={handleClose} className="p-2 hover:bg-accent/10 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex-1 overflow-y-auto p-4 min-h-0 overscroll-contain">
                    <div className="grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-12 gap-2">
                        {Array.from({ length: getVerseCount(selectedNavBook.id, selectedNavChapter) }, (_, i) => i + 1).map(verse => (
                            <button
                                key={verse}
                                onClick={() => { onNavigate(selectedNavBook.id, selectedNavChapter, verse); handleClose(); }}
                                className="p-2 text-sm font-bold bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors min-h-[40px] flex items-center justify-center"
                            >
                                {verse}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh] overflow-hidden">

                {/* Global Tab Header (Only for Books view or Mnemonics) */}
                {/* If deeper in navigation (Chapters/Verses), we hide this header to show specific title header? */}
                {/* Actually, user might want to switch tabs even deep in? */}
                {/* But 'Back' button in Chapter view usually goes to Book List. */}
                {/* Let's show Tab Header ONLY if NOT deep navigating, OR show it but disable it? */}
                {/* Simpler: Always show Tab Header. If deep nav, it just replaces content below. */}
                {/* BUT the design in renderChapterList uses a custom Header. */}
                {/* So if deep nav, we should HIDE the Global Tab Header? */}
                {/* Or render Global Header, and Render Body handles its own secondary header? */}
                {/* The previous design overlay covered the header. So let's HIDE main header if deep nav. */}

                {(!selectedNavBook || activeTab === 'mnemonics') && (
                    <div className="p-4 border-b border-border flex items-center justify-between shrink-0 bg-card z-10 transition-all">
                        <div className="flex items-center gap-2 bg-secondary/10 p-1 rounded-lg">
                            <button
                                onClick={() => setActiveTab('books')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'books' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <Book className="w-4 h-4" />
                                Books
                            </button>
                            <button
                                onClick={() => setActiveTab('mnemonics')}
                                className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all flex items-center gap-2 ${activeTab === 'mnemonics' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'}`}
                            >
                                <Brain className="w-4 h-4" />
                                Acrostics
                            </button>
                        </div>
                        <button onClick={handleClose} className="p-2 hover:bg-accent/10 rounded-full">
                            <X className="w-6 h-6" />
                        </button>
                    </div>
                )}

                {/* Content Body */}
                <div className="relative flex-1 flex flex-col overflow-hidden min-h-0">
                    {activeTab === 'mnemonics' ? (
                        <div className="flex-1 flex flex-col overflow-hidden p-4 min-h-0">
                            <div className="flex-1 overflow-y-auto min-h-0 overscroll-contain">
                                <MnemonicsList
                                    books={mnemonicsBooks}
                                    activeBookId={initialBook?.id}
                                    adjustStickyForHeader={false}
                                    onNavigate={(bookId, chap, verse) => { onNavigate(bookId, chap, verse); handleClose(); }}
                                    onChapterSelect={(book) => { setSelectedNavBook(book); setActiveTab('books'); }}
                                />
                            </div>
                        </div>
                    ) : (
                        // Books Tab Logic
                        <>
                            {!selectedNavBook && renderBookList()}
                            {selectedNavBook && !selectedNavChapter && renderChapterList()}
                            {selectedNavBook && selectedNavChapter && renderVerseList()}
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
