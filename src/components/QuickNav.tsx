import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Search, ChevronLeft, X, BookOpen } from 'lucide-react';
import type { BibleBook } from '../data/bibleApi';

interface QuickNavProps {
    isOpen: boolean;
    onClose: () => void;
    books: BibleBook[];
    onNavigate: (bookId: string, chapter: number) => void;
    onNavigateToBookOverview?: (bookId: string) => void;
}

export default function QuickNav({ isOpen, onClose, books, onNavigate, onNavigateToBookOverview }: QuickNavProps) {
    const [navStep, setNavStep] = useState<'books' | 'chapters'>('books');
    const [selectedNavBook, setSelectedNavBook] = useState<BibleBook | null>(null);
    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA'>('ALPHA');
    const [bookSearchQuery, setBookSearchQuery] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (isOpen && navStep === 'books' && window.innerWidth >= 768) {
            // Small delay to ensure render
            setTimeout(() => {
                inputRef.current?.focus();
            }, 10);
        }
    }, [isOpen, navStep]);

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
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh]">
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                    <h3 className="font-bold text-lg">
                        {navStep === 'books' ? 'Select Book' : `Select Chapter (${selectedNavBook?.name})`}
                    </h3>
                    <button onClick={handleClose} className="p-2 hover:bg-accent/10 rounded-full">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {navStep === 'books' && (
                    <div className="p-4 border-b border-border space-y-3 shrink-0">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                ref={inputRef}
                                type="text"
                                placeholder="Search books..."
                                className="w-full pl-9 pr-4 py-2 bg-secondary/10 border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                value={bookSearchQuery}
                                onChange={(e) => setBookSearchQuery(e.target.value)}
                            />
                        </div>
                        <div className="flex gap-2 overflow-x-auto pb-1">
                            {(['ALPHA', 'OT', 'NT'] as const).map(filter => (
                                <button
                                    key={filter}
                                    onClick={() => setBookFilter(filter)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap ${bookFilter === filter ? 'bg-primary text-primary-foreground' : 'hover:bg-accent/10'
                                        }`}
                                >
                                    {filter === 'ALPHA' ? 'A-Z' : filter === 'OT' ? 'Old Testament' : filter === 'NT' ? 'New Testament' : 'All Books'}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                <div className="overflow-y-auto p-4 flex flex-col gap-3">
                    {navStep === 'chapters' && selectedNavBook && onNavigateToBookOverview && (
                        <button
                            onClick={() => {
                                onNavigateToBookOverview(selectedNavBook.id);
                                handleClose();
                            }}
                            className="w-full p-3 mb-2 bg-primary/5 hover:bg-primary/10 text-primary font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                        >
                            <BookOpen className="w-4 h-4" />
                            View {selectedNavBook.name} Overview
                        </button>
                    )}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                        {navStep === 'books' ? (
                            filteredBooks.map(book => (
                                <button
                                    key={book.id}
                                    onClick={() => handleBookSelect(book)}
                                    className="p-4 text-sm font-medium bg-secondary/10 hover:bg-secondary/20 rounded-xl transition-colors text-center truncate min-h-[60px] flex items-center justify-center"
                                    title={book.name}
                                >
                                    {book.name}
                                </button>
                            ))
                        ) : (
                            Array.from({ length: selectedNavBook?.numberOfChapters || 0 }, (_, i) => i + 1).map(chap => (
                                <button
                                    key={chap}
                                    onClick={() => handleChapterSelect(chap)}
                                    className="p-4 text-lg font-bold bg-primary/10 hover:bg-primary/20 rounded-xl transition-colors text-center min-h-[60px] flex items-center justify-center"
                                >
                                    {chap}
                                </button>
                            ))
                        )}
                    </div>
                </div>
                {navStep === 'chapters' && (
                    <div className="p-4 border-t border-border shrink-0">
                        <button onClick={() => setNavStep('books')} className="text-sm text-primary hover:underline flex items-center">
                            <ChevronLeft className="w-4 h-4 mr-1" /> Back to Books
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
