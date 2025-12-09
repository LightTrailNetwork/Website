import { Book } from 'lucide-react';
import { OUTLINES, type BookOutline } from '../../data/studyData';
import { BIBLE_BOOKS, BIBLE_BOOK_ORDER } from '../../data/bibleBookConstants';
import VerseLink from './VerseLink';

export default function OutlinesView() {
    // Merge explicit outlines with default data for all books
    const allOutlines = BIBLE_BOOK_ORDER.map(bookId => {
        const bookData = BIBLE_BOOKS[bookId];
        const existing = OUTLINES.find(o => o.bookName === bookData.name);

        if (existing) return existing;

        // Default structure if no detailed outline exists
        return {
            id: bookId,
            bookName: bookData.name,
            theme: 'General Overview',
            sections: [
                { title: 'Full Book', range: '1', subpoints: [`${bookData.verses.length} Chapters`] }
            ]
        } as BookOutline;
    });

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-500 mb-4">Book Outlines</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    Structural breakdowns and themes for every book of the Bible.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start">
                {allOutlines.map((outline) => {
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
                                                        <span className="text-[9px] text-muted-foreground truncate">{pt}</span>
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
}
