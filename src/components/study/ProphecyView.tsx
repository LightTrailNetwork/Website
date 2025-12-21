import React, { useState, useMemo, useEffect } from 'react';
import { GitMerge, ArrowRight, Quote, BookOpen, Scale, List, Grid, ChevronDown, ChevronRight, Hash, X } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MESSIANIC_PROPHECIES, type MessianicProphecy } from '../../data/studyData';
import { BIBLE_BOOK_ORDER } from '../../data/bibleBookConstants';
import VerseLink from './VerseLink';

type ViewMode = 'cards' | 'book';

export default function ProphecyView() {
    const navigate = useNavigate();
    const location = useLocation();

    // Initialize state from URL hash
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        return location.hash === '#book' ? 'book' : 'cards';
    });

    const [showFulfillment, setShowFulfillment] = useState(true);
    const [expandedBooks, setExpandedBooks] = useState<string[]>([]);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Sync URL when mode changes
    useEffect(() => {
        if (viewMode === 'book' && location.hash !== '#book') {
            navigate('#book', { replace: true });
        } else if (viewMode === 'cards' && location.hash === '#book') {
            navigate('#', { replace: true });
        }
    }, [viewMode, navigate, location.hash]);

    // Parse and group prophecies by Book based on BIBLE_BOOK_ORDER
    const groupedByBook = useMemo(() => {
        const groups: Record<string, MessianicProphecy[]> = {};

        // Helper to parse book name from "Isaiah 7:14"
        const getBookName = (ref: string): string => {
            if (!ref) return 'Unknown';
            const parts = ref.split(' ');
            // Handle books with numbers like "1 Peter" or "2 Samuel"
            if (parts.length > 1 && /^\d+$/.test(parts[0])) {
                return `${parts[0]} ${parts[1]}`;
            }
            return parts[0] || 'Unknown';
        };

        // Group them
        MESSIANIC_PROPHECIES.forEach(p => {
            if (!p.prophecy?.verse) return;
            const book = getBookName(p.prophecy.verse);
            if (!groups[book]) groups[book] = [];
            groups[book]?.push(p);
        });

        // Helper to parse chapter/verse for sorting
        const getRefValue = (ref: string): number => {
            try {
                if (!ref) return 0;
                // Remove book name
                const book = getBookName(ref);
                const numbers = ref.replace(book, '').trim();
                const [chapter, verse] = numbers.split(':').map(n => parseInt(n.replace(/\D/g, ''))); // simple parse
                return (chapter || 0) * 1000 + (verse || 0);
            } catch (e) {
                return 0;
            }
        };

        // Sort items within each book
        Object.keys(groups).forEach(book => {
            const group = groups[book];
            if (group) {
                group.sort((a, b) => getRefValue(a.prophecy.verse) - getRefValue(b.prophecy.verse));
            }
        });

        return groups;
    }, []);

    // Get sorted list of books that actually have prophecies
    const sortedBooks = useMemo(() => {
        // We need to map the "Display Name" books (like "Genesis") to IDs if possible, 
        // or just rely on the name matching our constant order.
        // BIBLE_BOOK_ORDER contains IDs like 'GEN', 'EXO'. We need a map or just a known list order.
        // For simplicity, let's use a manual order array or try to map roughly. 
        // Actually, let's just use the order they appear in standard Bibles.

        // Let's create a simple map of Book Name -> Order Index for sorting
        const bookOrderMap: Record<string, number> = {
            'Genesis': 1, 'Exodus': 2, 'Leviticus': 3, 'Numbers': 4, 'Deuteronomy': 5,
            'Joshua': 6, 'Judges': 7, 'Ruth': 8, '1 Samuel': 9, '2 Samuel': 10,
            '1 Kings': 11, '2 Kings': 12, '1 Chronicles': 13, '2 Chronicles': 14,
            'Ezra': 15, 'Nehemiah': 16, 'Esther': 17, 'Job': 18, 'Psalms': 19, 'Psalm': 19, // Handle Psalm vs Psalms
            'Proverbs': 20, 'Ecclesiastes': 21, 'Song of Solomon': 22, 'Isaiah': 23,
            'Jeremiah': 24, 'Lamentations': 25, 'Ezekiel': 26, 'Daniel': 27,
            'Hosea': 28, 'Joel': 29, 'Amos': 30, 'Obadiah': 31, 'Jonah': 32,
            'Micah': 33, 'Nahum': 34, 'Habakkuk': 35, 'Zephaniah': 36, 'Haggai': 37,
            'Zechariah': 38, 'Malachi': 39
        };

        return Object.keys(groupedByBook).sort((a, b) => {
            const orderA = bookOrderMap[a] || 999;
            const orderB = bookOrderMap[b] || 999;
            return orderA - orderB;
        });
    }, [groupedByBook]);

    // Initialize all books as expanded on mount/change
    useEffect(() => {
        setExpandedBooks(sortedBooks);
    }, [sortedBooks]);

    const toggleBook = (book: string) => {
        setExpandedBooks(prev =>
            prev.includes(book)
                ? prev.filter(b => b !== book)
                : [...prev, book]
        );
    };

    const scrollToBook = (book: string) => {
        const el = document.getElementById(`book-${book}`);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Add slight offset for sticky header if needed
        }
    };

    // Original Grouping Logic for "Cards" View
    const groupedByTopic = useMemo(() => {
        return MESSIANIC_PROPHECIES.reduce((acc, p) => {
            if (!acc[p.topic]) acc[p.topic] = [];
            acc[p.topic]?.push(p);
            return acc;
        }, {} as Record<string, MessianicProphecy[]>);
    }, []);
    const topics = ['Birth', 'Nature', 'Ministry', 'Passion', 'Resurrection', 'Kingship', 'Priesthood', 'Covenant', 'Return'] as const;


    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header Area */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl p-6 md:p-8 border border-purple-500/20">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4 flex items-center gap-3">
                            <GitMerge className="w-8 h-8" />
                            Messianic Prophecies
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            The scarlet thread of redemption woven through history, revealing God's perfect plan for Jesus our Messiah.
                        </p>
                    </div>

                    {/* View Switcher Tabs */}
                    <div className="flex bg-secondary/50 p-1 rounded-xl shrink-0 self-start">
                        <button
                            onClick={() => setViewMode('cards')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'cards'
                                ? 'bg-background shadow text-purple-600 dark:text-purple-400'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                }`}
                        >
                            <Grid className="w-4 h-4" />
                            Topic Cards
                        </button>
                        <button
                            onClick={() => setViewMode('book')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${viewMode === 'book'
                                ? 'bg-background shadow text-purple-600 dark:text-purple-400'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                }`}
                        >
                            <List className="w-4 h-4" />
                            Book by Book
                        </button>
                    </div>
                </div>
            </div>

            {/* BOOK BY BOOK VIEW */}
            {viewMode === 'book' && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 relative">

                    {/* Navigation Sidebar (Desktop sticky, Mobile hidden/horizontal?) */}
                    <div className="lg:col-span-3">
                        <div className="sticky top-24 bg-card border border-border rounded-xl p-4 shadow-sm">
                            <h3 className="font-bold text-muted-foreground text-xs uppercase tracking-wider mb-4 px-2">
                                Jump to Book
                            </h3>
                            <div className="space-y-1">
                                {sortedBooks.map(book => (
                                    <button
                                        key={book}
                                        onClick={() => scrollToBook(book)}
                                        className="w-full text-left px-3 py-2 rounded-lg text-sm text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-colors flex items-center justify-between group"
                                    >
                                        <span>{book}</span>
                                        <span className="bg-secondary text-xs px-2 py-0.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                                            {groupedByBook[book]?.length}
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Content List */}
                    <div className="lg:col-span-9 space-y-8">

                        {/* Controls */}
                        <div className="flex justify-end mb-4">
                            <button
                                onClick={() => setShowFulfillment(!showFulfillment)}
                                className="flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80 bg-primary/10 px-4 py-2 rounded-full border border-primary/20 transition-colors"
                            >
                                {showFulfillment ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                                {showFulfillment ? "Hide Fulfillment" : "Show Fulfillment"}
                            </button>
                        </div>

                        {sortedBooks.map(book => (
                            <div key={book} id={`book-${book}`} className="scroll-mt-24">
                                <div
                                    className="flex items-center gap-3 mb-6 group cursor-pointer"
                                    onClick={() => toggleBook(book)}
                                >
                                    <div className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white p-2.5 rounded-lg shadow-sm group-hover:shadow-md transition-shadow">
                                        <BookOpen className="w-5 h-5" />
                                    </div>
                                    <h3 className="text-2xl font-bold">{book}</h3>
                                    <div className="h-px bg-border flex-grow ml-4 group-hover:bg-purple-500/30 transition-colors" />
                                </div>

                                {expandedBooks.includes(book) && (
                                    <div className="space-y-4 pl-0 md:pl-4">
                                        {groupedByBook[book]?.map(item => (
                                            <div
                                                key={item.id}
                                                className="bg-card border border-border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
                                            >
                                                {/* Header / Prophecy Line */}
                                                <div className="p-4 md:p-5 flex flex-col md:flex-row md:items-start gap-4">

                                                    {/* Reference Badge */}
                                                    <div className="shrink-0 pt-1">
                                                        <VerseLink
                                                            reference={item.prophecy.verse}
                                                            className="inline-flex items-center gap-1.5 bg-secondary text-secondary-foreground px-3 py-1.5 rounded-md font-bold text-sm border border-border/50 hover:border-purple-500/50 transition-colors"
                                                        />
                                                    </div>

                                                    {/* Prophecy Text */}
                                                    <div className="grow space-y-3">
                                                        <p className="text-lg font-medium text-foreground/90 leading-relaxed font-serif italic">
                                                            "{item.prophecy.text}"
                                                        </p>

                                                        {/* Optional Title/Topic Logic if desired */}
                                                        {item.title && (
                                                            <div className="flex flex-wrap items-center gap-2">
                                                                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground bg-secondary/30 px-2 py-0.5 rounded">
                                                                    {item.topic}
                                                                </span>
                                                                <span className="text-sm text-muted-foreground font-medium">
                                                                    — {item.title}
                                                                </span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>

                                                {/* Fulfillment Section (Collapsible) */}
                                                {showFulfillment && (
                                                    <div className="bg-emerald-500/5 border-t border-border/50 p-4 md:p-5 animate-in slide-in-from-top-2 duration-300">
                                                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                                                            <div className="shrink-0 pt-1 flex items-center gap-2 min-w-[120px]">
                                                                <ArrowRight className="w-4 h-4 text-emerald-600 dark:text-emerald-500" />
                                                                <span className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide">Fulfillment</span>
                                                            </div>
                                                            <div className="grow">
                                                                <div className="flex flex-col gap-2">
                                                                    <p className="text-base text-foreground/80 leading-relaxed">
                                                                        {item.fulfillment.text}
                                                                    </p>
                                                                    <div className="self-end md:self-start">
                                                                        <VerseLink
                                                                            reference={item.fulfillment.verse}
                                                                            className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Space at bottom for scrolling */}
                        <div className="h-32" />
                    </div>
                </div>
            )}


            {/* CARD VIEW (Original Layout) */}
            {viewMode === 'cards' && (
                <div className="space-y-16">
                    {topics.map(topic => (
                        <div key={topic} className="space-y-6">
                            <div className="flex items-center gap-3 border-b border-border pb-2">
                                <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                    <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                                </div>
                                <h3 className="text-2xl font-bold text-foreground">{topic}</h3>
                            </div>

                            <div className="grid gap-6">
                                {groupedByTopic[topic]?.map(item => (
                                    <div key={item.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                                        <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">

                                            {/* Prophecy (OT) */}
                                            <div className="p-6 relative bg-secondary/10">
                                                <div className="absolute top-4 left-4 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                    <Quote className="w-3 h-3" />
                                                    The Promise (OT)
                                                </div>
                                                <div className="mt-6 space-y-4">
                                                    <blockquote className="text-lg font-serif italic text-foreground/90 leading-relaxed border-l-4 border-purple-500/30 pl-4 py-1">
                                                        "{item.prophecy.text}"
                                                    </blockquote>
                                                    <div className="flex justify-between items-center pt-2">
                                                        <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                                            — {item.prophecy.source}
                                                        </span>
                                                        <VerseLink
                                                            reference={item.prophecy.verse}
                                                            className="text-xs bg-background border border-border px-2 py-1 rounded shadow-sm hover:shadow transition-shadow"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Fulfillment (NT) */}
                                            <div className="p-6 relative bg-card">
                                                <div className="absolute top-4 left-4 text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                                                    <ArrowRight className="w-3 h-3" />
                                                    Fulfillment (NT)
                                                </div>
                                                <div className="mt-6 space-y-4">
                                                    <blockquote className="text-lg font-medium text-foreground/90 leading-relaxed border-l-4 border-emerald-500/30 pl-4 py-1">
                                                        "{item.fulfillment.text}"
                                                    </blockquote>
                                                    <div className="flex justify-end pt-2">
                                                        <VerseLink
                                                            reference={item.fulfillment.verse}
                                                            className="text-xs bg-secondary border border-border px-2 py-1 rounded shadow-sm hover:shadow transition-shadow"
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>

                                        {/* Probability / Note */}
                                        {item.probability && (
                                            <div className="bg-purple-50 dark:bg-purple-900/10 px-6 py-3 border-t border-purple-100 dark:border-purple-900/30 flex items-start gap-2">
                                                <Scale className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                                                <p className="text-sm text-purple-800 dark:text-purple-300">
                                                    <span className="font-semibold">Note:</span> {item.probability}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {/* Mobile Navigation FAB */}
            {viewMode === 'book' && (
                <>
                    <button
                        onClick={() => setIsMobileMenuOpen(true)}
                        className="fixed bottom-6 right-6 z-50 p-4 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all md:hidden animate-in zoom-in duration-300"
                        aria-label="Open Book Menu"
                    >
                        <List className="w-6 h-6" />
                    </button>

                    {/* Mobile Book Menu Modal */}
                    {isMobileMenuOpen && (
                        <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-4 bg-background/80 backdrop-blur-sm animate-in fade-in duration-200">
                            <div
                                className="w-full max-w-lg bg-card border border-border rounded-xl shadow-2xl flex flex-col max-h-[80vh] animate-in slide-in-from-bottom-10 duration-300"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <div className="p-4 border-b border-border flex items-center justify-between sticky top-0 bg-card z-10 rounded-t-xl">
                                    <h3 className="font-semibold text-lg flex items-center gap-2">
                                        <BookOpen className="w-5 h-5 text-primary" />
                                        Jump to Book
                                    </h3>
                                    <button
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="p-2 hover:bg-muted rounded-full transition-colors"
                                    >
                                        <X className="w-5 h-5" />
                                    </button>
                                </div>
                                <div className="p-4 grid grid-cols-2 gap-3 overflow-y-auto">
                                    {sortedBooks.map(book => (
                                        <button
                                            key={book}
                                            onClick={() => {
                                                scrollToBook(book);
                                                setIsMobileMenuOpen(false);
                                            }}
                                            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-primary/10 hover:text-primary transition-colors text-left text-sm font-medium group"
                                        >
                                            {book}
                                            <span className="text-xs text-muted-foreground group-hover:text-primary/70">
                                                {groupedByBook[book]?.length}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="absolute inset-0 -z-10" onClick={() => setIsMobileMenuOpen(false)} />
                        </div>
                    )}
                </>
            )}
        </div>
    );
}
