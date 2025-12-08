import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronLeft, X, BookOpen, Book, Brain } from 'lucide-react';
import type { BibleBook } from '../data/bibleApi';
import MnemonicsList from './MnemonicsList';

interface QuickNavProps {
    isOpen: boolean;
    onClose: () => void;
    books: BibleBook[];
    onNavigate: (bookId: string, chapter: number) => void;
    onNavigateToBookOverview?: (bookId: string) => void;
    initialBook?: BibleBook | null;
}

export default function QuickNav({ isOpen, onClose, books, onNavigate, onNavigateToBookOverview, initialBook }: QuickNavProps) {
    const [navStep, setNavStep] = useState<'books' | 'chapters'>('books');
    const [selectedNavBook, setSelectedNavBook] = useState<BibleBook | null>(null);
    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA'>('ALL');
    const [bookSearchQuery, setBookSearchQuery] = useState('');
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [activeTab, setActiveTab] = useState<'books' | 'mnemonics'>('books');

    const inputRef = useRef<HTMLInputElement>(null);
    const chapterListRef = useRef<HTMLDivElement>(null);

    const handleWheel = (e: React.WheelEvent) => {
        if (chapterListRef.current) {
            // Scroll horizontally based on vertical wheel movement
            chapterListRef.current.scrollLeft += e.deltaY;
        }
    };



    useEffect(() => {
        if (isOpen) {
            // Always start at books list, but select the current book for the top bar context
            setNavStep('books');
            if (initialBook) {
                setSelectedNavBook(initialBook);
            } else {
                setSelectedNavBook(null);
            }
            setIsSearchOpen(false);
            setBookSearchQuery('');
            setBookFilter('ALL');
        }
    }, [isOpen, initialBook]);

    useEffect(() => {
        if (isOpen && navStep === 'books' && initialBook && bookFilter === 'ALL' && !bookSearchQuery) {
            setTimeout(() => {
                const element = document.getElementById(`book-item-${initialBook.id}`);
                if (element) {
                    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
            }, 100);
        }
    }, [isOpen, navStep, initialBook, bookFilter, bookSearchQuery]);

    useEffect(() => {
        if (isSearchOpen && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        if (isOpen && activeTab === 'mnemonics' && initialBook) {
            setTimeout(() => {
                const element = document.getElementById(`mnemonic-book-${initialBook.id}`);
                if (element) {
                    element.scrollIntoView({ block: 'center', behavior: 'smooth' });
                }
            }, 100);
        }
    }, [isOpen, activeTab, initialBook]);

    // Filtered Books
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
            filtered = filtered.filter(b => b.order < 40); // Assuming standard 66 book order
        } else if (bookFilter === 'NT') {
            filtered = filtered.filter(b => b.order >= 40);
        } else if (bookFilter === 'ALPHA') {
            filtered.sort((a, b) => a.name.localeCompare(b.name));
        }
        return filtered;
    }, [books, bookFilter, bookSearchQuery]);

    const handleBookSelect = (book: BibleBook) => {
        setSelectedNavBook(book);
        setNavStep('chapters');
    };

    const handleChapterSelect = (chapNum: number) => {
        if (selectedNavBook) {
            onNavigate(selectedNavBook.id, chapNum);
            handleClose();
        }
    };

    const handleClose = () => {
        setNavStep('books');
        setSelectedNavBook(null);
        setBookSearchQuery('');
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[70] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh] overflow-hidden">
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
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

                {navStep === 'books' && activeTab === 'books' && (
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

                                    {selectedNavBook ? (
                                        <div className="flex-1 flex items-center gap-3 overflow-hidden animate-fade-in">
                                            <span className="font-bold whitespace-nowrap">{selectedNavBook.name}</span>
                                            <div className="h-4 w-[1px] bg-border shrink-0" />
                                            <div
                                                ref={chapterListRef}
                                                onWheel={handleWheel}
                                                className="flex-1 overflow-x-auto flex items-center gap-1 pb-1 scrollbar-hide mask-linear-fade"
                                            >
                                                {Array.from({ length: selectedNavBook.numberOfChapters }, (_, i) => i + 1).map(chap => (
                                                    <button
                                                        key={chap}
                                                        onClick={() => {
                                                            onNavigate(selectedNavBook.id, chap);
                                                            handleClose();
                                                        }}
                                                        className="w-8 h-8 shrink-0 flex items-center justify-center rounded-md text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
                                                    >
                                                        {chap}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex-1 text-sm text-muted-foreground italic">
                                            Select a book...
                                        </div>
                                    )}
                                </>
                            )}
                        </div>

                        {!isSearchOpen && (
                            <div className="flex flex-wrap gap-2 pb-1 animate-fade-in justify-center">
                                {(['ALL', 'ALPHA', 'OT', 'NT'] as const).map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setBookFilter(filter)}
                                        className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${bookFilter === filter ? 'bg-primary text-primary-foreground' : 'bg-secondary/10 hover:bg-secondary/20 text-foreground'
                                            }`}
                                    >
                                        {filter === 'ALPHA' ? 'Alphabetical' :
                                            filter === 'OT' ? 'Old Testament' :
                                                filter === 'NT' ? 'New Testament' :
                                                    'All Books'}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}

                {activeTab === 'books' && (
                    <div className="overflow-y-auto p-4 flex flex-col gap-3">
                        {navStep === 'chapters' && (
                            <div className="flex items-center justify-between mb-2 gap-2">
                                <button
                                    onClick={() => setNavStep('books')}
                                    className="flex-1 p-2 bg-secondary/10 hover:bg-secondary/20 text-foreground text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2"
                                >
                                    <ChevronLeft className="w-4 h-4" /> Back
                                </button>
                                {selectedNavBook && onNavigateToBookOverview && (
                                    <button
                                        onClick={() => {
                                            onNavigateToBookOverview(selectedNavBook.id);
                                            handleClose();
                                        }}
                                        className="flex-1 p-2 bg-primary/5 hover:bg-primary/10 text-primary text-sm font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                                    >
                                        <BookOpen className="w-4 h-4" />
                                        Overview
                                    </button>
                                )}
                            </div>
                        )}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                            {navStep === 'books' ? (
                                filteredBooks.map(book => (
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
                                            className="flex-1 px-3 text-sm font-medium text-left hover:bg-secondary/10 transition-colors truncate flex items-center"
                                            title={`Go to ${book.name} Chapter 1`}
                                        >
                                            {book.name}
                                        </button>
                                        <div className="w-[1px] bg-border" />
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                if (book.numberOfChapters === 1) {
                                                    onNavigate(book.id, 1);
                                                    handleClose();
                                                } else {
                                                    handleBookSelect(book);
                                                }
                                            }}
                                            className="w-[40px] flex items-center justify-center text-xs font-bold text-muted-foreground hover:text-primary hover:bg-secondary/10 transition-colors"
                                            title={book.numberOfChapters === 1 ? `Go to ${book.name}` : `Select Chapter`}
                                        >
                                            {book.numberOfChapters}
                                        </button>
                                    </div>
                                ))
                            ) : (
                                <div className="col-span-full grid grid-cols-5 sm:grid-cols-8 md:grid-cols-10 gap-2">
                                    {Array.from({ length: selectedNavBook?.numberOfChapters || 0 }, (_, i) => i + 1).map(chap => (
                                        <button
                                            key={chap}
                                            onClick={() => handleChapterSelect(chap)}
                                            className="p-2 text-sm font-bold bg-primary/10 hover:bg-primary/20 rounded-lg transition-colors text-center min-h-[40px] flex items-center justify-center"
                                        >
                                            {chap}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}

                {activeTab === 'mnemonics' && (
                    <div className="flex flex-col h-full overflow-hidden p-4">
                        <div className="overflow-y-auto h-full">
                            <MnemonicsList
                                books={filteredBooks}
                                activeBookId={initialBook?.id}
                                adjustStickyForHeader={false}
                                onNavigate={(bookId, chap, verse) => {
                                    if (verse) {
                                        // If verse is provided, we might need a way to navigate to specific verse.
                                        // QuickNav's onNavigate prop only takes (bookId, chapter).
                                        // However, we can try to call it and assume the parent might handle scrolling if we could pass verse, 
                                        // but the prop signature is fixed.
                                        // Alternatively, we can use the existing onNavigate which goes to the chapter, 
                                        // and maybe the Bible reader will handle verse if we can pass it differently?
                                        // For now, let's just navigate to the chapter.
                                        // Ideally, we should update QuickNavProps to support verse, or use a direct navigation if possible.
                                        // But QuickNav is a controlled component often.
                                        // Let's invoke onNavigate(bookId, chap) and maybe log or try to find a hack?
                                        // Wait, the user said "link directly to /Acts/1/1".
                                        // If onNavigate just sets state, we might lose the verse.
                                        onNavigate(bookId, chap);
                                    } else {
                                        onNavigate(bookId, chap);
                                    }
                                    handleClose();
                                }}
                                onChapterSelect={(book) => {
                                    handleBookSelect(book);
                                    setActiveTab('books');
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
