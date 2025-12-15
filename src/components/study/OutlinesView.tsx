import React, { useMemo, useState } from 'react';
import { Menu, X, Book } from 'lucide-react';
import { OUTLINES, type BookOutline } from '../../data/studyData';
import { BIBLE_BOOKS, BIBLE_BOOK_ORDER } from '../../data/bibleBookConstants';
import VerseLink from './VerseLink';

const CATEGORY_ORDER = [
    'Torah',
    'Old Testament History',
    'Poetry',
    'Major Prophets',
    'Minor Prophets',
    'Gospels',
    'New Testament History',
    'Pauline Epistles',
    'General Epistles',
    'Prophecy'
];

export default function OutlinesView() {
    // Merge explicit outlines with default data for all books
    const allOutlines = useMemo(() => {
        return BIBLE_BOOK_ORDER.map(bookId => {
            const bookData = BIBLE_BOOKS[bookId];
            if (!bookData) return null;

            const existing = OUTLINES.find(o => o.bookName === bookData.name);
            if (existing) return existing;

            // Default structure if no detailed outline exists
            // Try to infer category or default to 'Other'
            return {
                id: bookId,
                bookName: bookData.name,
                theme: 'General Overview',
                category: 'Uncategorized',
                sections: [
                    { title: 'Full Book', range: '1', subpoints: [`${bookData.verses.length} Chapters`] }
                ]
            } as BookOutline;
        }).filter((o): o is BookOutline => o !== null);
    }, []);

    const groupedOutlines = useMemo(() => {
        const groups: Record<string, BookOutline[]> = {};
        allOutlines.forEach(outline => {
            const cat = outline.category || 'Uncategorized';
            if (!groups[cat]) groups[cat] = [];
            groups[cat].push(outline);
        });
        return groups;
    }, [allOutlines]);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const scrollToCategory = (cat: string) => {
        const id = cat.toLowerCase().replace(/ /g, '-');
        const el = document.getElementById(id);
        if (el) {
            const offset = 100;
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-500 mb-4">Book Outlines</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    Structural breakdowns and themes for every book of the Bible.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 relative">
                {/* Sticky Sidebar (Desktop) */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 px-3">Sections</h3>
                        {CATEGORY_ORDER.map(cat => {
                            if (!groupedOutlines[cat]) return null;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => scrollToCategory(cat)}
                                    className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors flex justify-between group"
                                >
                                    <span className="font-medium">{cat}</span>
                                    <span className="text-[10px] text-muted-foreground group-hover:text-emerald-600/70">
                                        {groupedOutlines[cat].length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>

                {/* Main Content */}
                <div className="flex-1 space-y-16">
                    {CATEGORY_ORDER.map(cat => {
                        const outlines = groupedOutlines[cat];
                        if (!outlines || outlines.length === 0) return null;

                        return (
                            <div key={cat} id={cat.toLowerCase().replace(/ /g, '-')} className="scroll-mt-24">
                                <h3 className="text-2xl font-bold mb-6 text-foreground border-b pb-2 border-border">{cat}</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 items-start">
                                    {outlines.map((outline) => {
                                        const isDetailed = outline.theme !== 'General Overview';
                                        return (
                                            <div key={outline.id} className="group bg-card border border-border/60 hover:border-emerald-500/30 rounded-lg overflow-hidden flex flex-col shadow-sm hover:shadow-md transition-all h-full">
                                                {/* Card Header */}
                                                <div className="bg-secondary/5 p-3 border-b border-border/40">
                                                    <h3 className="font-bold text-sm tracking-tight flex items-center gap-2 text-foreground/90">
                                                        <span className="w-6 h-6 rounded-md bg-emerald-500/10 text-emerald-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                                                            {outline.bookName.substring(0, 3).toUpperCase()}
                                                        </span>
                                                        <span className="truncate">{outline.bookName}</span>
                                                    </h3>
                                                    {isDetailed && (
                                                        <p className="text-[10px] text-emerald-600/80 uppercase font-bold tracking-wider mt-1.5 pl-8 truncate">
                                                            {outline.theme}
                                                        </p>
                                                    )}
                                                </div>

                                                {/* Card Body */}
                                                <div className="p-3 flex-1 flex flex-col gap-2 relative min-h-[100px]">
                                                    {!isDetailed && (
                                                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-[0.03]">
                                                            <Book className="w-16 h-16" />
                                                        </div>
                                                    )}

                                                    {outline.sections.map((section, idx) => (
                                                        <div key={idx} className="relative pl-3 border-l-2 border-border/30 hover:border-emerald-500/40 transition-colors py-2 group/section">
                                                            <div className="flex flex-col gap-1.5">
                                                                <span className="text-xs font-semibold text-foreground/90 leading-tight group-hover/section:text-emerald-700 dark:group-hover/section:text-emerald-400 transition-colors">
                                                                    {section.title}
                                                                </span>
                                                                <div className="flex items-center">
                                                                    <VerseLink
                                                                        book={outline.bookName}
                                                                        reference={section.range}
                                                                        className="inline-block text-[10px] font-mono text-muted-foreground bg-secondary/50 hover:bg-emerald-500/10 hover:text-emerald-600 px-1.5 py-0.5 rounded transition-colors whitespace-nowrap border border-border/50"
                                                                    >
                                                                        {section.range.match(/^\d+$/) ? 'Ch ' + section.range : section.range}
                                                                    </VerseLink>
                                                                </div>
                                                            </div>

                                                            {/* Subpoints */}
                                                            {section.subpoints && (
                                                                <div className="mt-1 space-y-0.5">
                                                                    {section.subpoints.slice(0, 3).map((pt, i) => (
                                                                        <div key={i} className="flex items-center gap-1.5 pl-1">
                                                                            <div className="w-0.5 h-0.5 rounded-full bg-muted-foreground/50 shrink-0" />
                                                                            <span className="text-[9px] text-muted-foreground truncate max-w-[200px]">{pt}</span>
                                                                        </div>
                                                                    ))}
                                                                    {section.subpoints.length > 3 && (
                                                                        <div className="text-[9px] text-muted-foreground/40 pl-2">+{section.subpoints.length - 3} more</div>
                                                                    )}
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Navigation FAB */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Toggle navigation"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 lg:hidden flex flex-col pt-24 px-6 animate-in fade-in duration-200">
                    <h3 className="text-xl font-bold mb-6 text-emerald-600">Jump to Category</h3>
                    <div className="space-y-4 overflow-y-auto pb-24">
                        {CATEGORY_ORDER.map(cat => {
                            if (!groupedOutlines[cat]) return null;
                            return (
                                <button
                                    key={cat}
                                    onClick={() => scrollToCategory(cat)}
                                    className="w-full text-left p-4 rounded-lg bg-secondary/50 hover:bg-emerald-500/10 hover:text-emerald-600 transition-all border border-border/50 flex justify-between items-center"
                                >
                                    <span className="font-bold text-lg">{cat}</span>
                                    <span className="text-sm text-muted-foreground bg-background px-2 py-1 rounded-full border border-border/50">
                                        {groupedOutlines[cat].length}
                                    </span>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}
        </div>
    );
}
