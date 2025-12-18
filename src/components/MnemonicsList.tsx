import React, { useState } from 'react';
import { ChevronDown, ChevronRight, ChevronsDown, ChevronsUp, BookOpen } from 'lucide-react';
import type { BibleBook } from '../data/bibleApi';
import { getTestamentMnemonic, getBookMnemonic, getChapterMnemonic, getChapterVerses, getTestamentSectionMnemonics } from '../utils/mnemonicUtils';
import { formatPassageText } from '../utils/bibleUtils';
import { getChapter } from '../data/bibleApi';
import { useScrollDirection } from '../hooks/useScrollDirection';

interface MnemonicsListProps {
    books: BibleBook[];
    onNavigate: (bookId: string, chapter: number, verse?: number) => void;
    onChapterSelect?: (book: BibleBook) => void;
    activeBookId?: string | undefined;
    adjustStickyForHeader?: boolean;
}

const OT_SECTIONS = [
    { start: 1, end: 5, label: "Law" },
    { start: 6, end: 17, label: "History" },
    { start: 18, end: 22, label: "Poetry & Wisdom" },
    { start: 23, end: 27, label: "Major Prophets" },
    { start: 28, end: 39, label: "Minor Prophets" }
];

const NT_SECTIONS = [
    { start: 40, end: 44, label: "Gospels & Acts" },
    { start: 45, end: 57, label: "Paul's Epistles" },
    { start: 58, end: 66, label: "General Epistles & Revelation" }
];

const otLengths = OT_SECTIONS.map(s => s.end - s.start + 1);
const otNames = getTestamentSectionMnemonics('OT', otLengths);
const OT_GROUPS = OT_SECTIONS.map((s, i) => ({ ...s, name: otNames[i] || "" }));

const ntLengths = NT_SECTIONS.map(s => s.end - s.start + 1);
const ntNames = getTestamentSectionMnemonics('NT', ntLengths);
const NT_GROUPS = NT_SECTIONS.map((s, i) => ({ ...s, name: ntNames[i] || "" }));

export default function MnemonicsList({ books, onNavigate, onChapterSelect, activeBookId, adjustStickyForHeader = true }: MnemonicsListProps) {
    const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
    const [expandedBooks, setExpandedBooks] = useState<Record<string, boolean>>({});
    const { scrollDirection, isAtTop } = useScrollDirection(); // Use scroll direction hook

    // Logic to match Header.tsx hiding behavior
    // If scrolling down and not at top, header is hidden (-translate-y-full)
    // If scrolling up or at top, header is visible (translate-y-0)
    const isHeaderHidden = scrollDirection === 'down' && !isAtTop;

    // Calculate top position: 
    // If adjustment is disabled (modal), always top-0.
    // If enabled: 
    //   - Header hidden -> top-0
    //   - Header visible -> top-16
    const stickyTopClass = !adjustStickyForHeader || isHeaderHidden ? 'top-0' : 'top-16';

    // Auto-scroll and expand active book
    React.useEffect(() => {
        if (activeBookId) {
            // Expand the book
            setExpandedBooks(prev => ({ ...prev, [activeBookId]: true }));

            // Scroll into view after a small delay to allow expansion rendering
            setTimeout(() => {
                const element = document.getElementById(`mnemonic-book-${activeBookId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [activeBookId]);

    // ... existing functions ... (toggleSection, etc - not modifying them, but ensuring context is preserved)
    // Wait, the ReplacementContent must replace the TARGET content. 
    // I need to be careful not to delete the restored functions if I include them in TargetContent.
    // The instructions say "Update specific sticky div class logic".
    // I will target the Props definition, the signature, and the variable definition.

    // Splitting this into two replacements might be safer if the functions are in between?
    // In the file view, the functions are AFTER the variable declarations.
    // Lines 9-38 cover Props, constants, component sig, state, hook, and isHeaderHidden logic.
    // So I can replace up to line 38, leaving the useEffect and functions alone.
    // But wait, the TargetContent needs to match exactly.

    // Let's replace from interface definition down to isHeaderHidden, then add stickyTopClass.

    /*
    interface MnemonicsListProps {
        books: BibleBook[];
        onNavigate: (bookId: string, chapter: number, verse?: number) => void;
        onChapterSelect?: (book: BibleBook) => void;
        activeBookId?: string | undefined;
    }
    
    ... constants ...
    
    export default function MnemonicsList({ books, onNavigate, onChapterSelect, activeBookId }: MnemonicsListProps) {
        const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
        const [expandedBooks, setExpandedBooks] = useState<Record<string, boolean>>({});
        const { scrollDirection, isAtTop } = useScrollDirection(); // Use scroll direction hook
    
        // Logic to match Header.tsx hiding behavior
        // If scrolling down and not at top, header is hidden (-translate-y-full)
        // If scrolling up or at top, header is visible (translate-y-0)
        const isHeaderHidden = scrollDirection === 'down' && !isAtTop;
    */

    /* Replacement: */
    /*
    interface MnemonicsListProps {
        books: BibleBook[];
        onNavigate: (bookId: string, chapter: number, verse?: number) => void;
        onChapterSelect?: (book: BibleBook) => void;
        activeBookId?: string | undefined;
        adjustStickyForHeader?: boolean;
    }
    
    ... constants ...
    
    export default function MnemonicsList({ books, onNavigate, onChapterSelect, activeBookId, adjustStickyForHeader = true }: MnemonicsListProps) {
        const [collapsedSections, setCollapsedSections] = useState<Record<string, boolean>>({});
        const [expandedBooks, setExpandedBooks] = useState<Record<string, boolean>>({});
        const { scrollDirection, isAtTop } = useScrollDirection(); // Use scroll direction hook
    
        // Logic to match Header.tsx hiding behavior
        // If scrolling down and not at top, header is hidden (-translate-y-full)
        // If scrolling up or at top, header is visible (translate-y-0)
        const isHeaderHidden = scrollDirection === 'down' && !isAtTop;
        const stickyTopClass = !adjustStickyForHeader || isHeaderHidden ? 'top-0' : 'top-16';
        
    */
    // And then I need to update the JSX usage of top-* classes.
    // I should do this in 2 chunks or ensure I cover enough context.


    // Auto-scroll and expand active book
    React.useEffect(() => {
        if (activeBookId) {
            // Expand the book
            setExpandedBooks(prev => ({ ...prev, [activeBookId]: true }));

            // Scroll into view after a small delay to allow expansion rendering
            setTimeout(() => {
                const element = document.getElementById(`mnemonic-book-${activeBookId}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }, 100);
        }
    }, [activeBookId]);

    const toggleSection = (name: string) => {
        setCollapsedSections(prev => ({ ...prev, [name]: !prev[name] }));
    };

    const toggleBook = (bookId: string) => {
        setExpandedBooks(prev => ({ ...prev, [bookId]: !prev[bookId] }));
    };

    const toggleAllSections = (groups: typeof OT_GROUPS, collapse: boolean) => {
        const newState = { ...collapsedSections };
        groups.forEach(g => {
            newState[g.name] = collapse;
        });
        setCollapsedSections(newState);

        // If collapsing, also collapse all books within these groups
        if (collapse) {
            const booksInGroups = books.filter(b =>
                groups.some(g => b.order >= g.start && b.order <= g.end)
            );
            setExpandedBooks(prev => {
                const next = { ...prev };
                booksInGroups.forEach(b => {
                    delete next[b.id];
                });
                return next;
            });
        }
    };

    const areAllSectionsCollapsed = (groups: typeof OT_GROUPS) => {
        return groups.every(g => collapsedSections[g.name]);
    };

    // Helper for highlighting first letter
    const renderMnemonicWithAccent = (text: string | null) => {
        if (!text) return null;
        return (
            <span>
                <span className="text-primary font-bold">{text.charAt(0)}</span>
                {text.slice(1)}
            </span>
        );
    };

    const renderBookRow = (book: BibleBook) => {
        const mnemonicData = getBookMnemonic(book.id, 1);
        const isExpanded = !!expandedBooks[book.id];

        // Handles row click to toggle expand
        const handleRowClick = (e: React.MouseEvent) => {
            // If dragging or selecting text, maybe ignore? For now simple click is fine.
            toggleBook(book.id);
        };

        const handleNavigate = (e: React.MouseEvent) => {
            e.stopPropagation();
            onNavigate(book.id, 1);
        };

        const isActive = activeBookId === book.id;

        return (
            <div
                key={book.id}
                id={`mnemonic-book-${book.id}`}
                className={`border bg-card rounded-lg overflow-hidden mb-2 transition-all duration-300 ${isActive ? 'border-primary shadow-[0_0_15px_rgba(var(--primary-rgb),0.1)] ring-1 ring-primary/20' : 'border-border hover:border-primary/30'
                    }`}
            >
                <div
                    className="flex items-center min-h-[60px] cursor-pointer hover:bg-secondary/5"
                    onClick={handleRowClick}
                >
                    {/* Collapse Toggle Icon */}
                    <div className="w-10 flex items-center justify-center text-muted-foreground">
                        {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                    </div>

                    {/* Content */}
                    <div className="flex-1 py-3 pr-3 flex flex-col gap-1">
                        <div className="flex items-center gap-3">
                            <span className="font-bold text-sm">
                                {book.name}
                            </span>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-secondary/10 text-muted-foreground">
                                {book.numberOfChapters} {book.numberOfChapters === 1 ? 'Ch' : 'Chs'}
                            </span>
                            <button
                                onClick={handleNavigate}
                                className="ml-auto text-xs flex items-center gap-1 px-2 py-1 rounded bg-primary/5 text-primary hover:bg-primary/10 transition-colors"
                                title="Read Book"
                            >
                                <BookOpen className="w-3 h-3" />
                                <span className="sr-only">Read</span>
                            </button>
                        </div>

                        {mnemonicData && (
                            <div className="text-sm">
                                <span className="text-muted-foreground">
                                    {renderMnemonicWithAccent(mnemonicData.text)}
                                </span>
                                {mnemonicData.hint && (
                                    <div className="mt-1 text-xs text-primary/80 italic font-medium">
                                        {parseHint(mnemonicData.hint)}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>

                {/* Chapters List */}
                {isExpanded && (
                    <div className="border-t border-border bg-secondary/5 p-2 pl-4 sm:pl-8 space-y-2 animate-in slide-in-from-top-2 duration-200">
                        <ChapterList book={book} onNavigate={onNavigate} />
                    </div>
                )}
            </div>
        );
    };

    return (
        <div className="relative">
            {/* Sticky Navigation */}
            {/* When header is hidden (scrolling down), sticky top is 0. 
                When header is visible (scrolling up/at top), sticky top needs to be 16 (4rem) to clear the header. 
                If adjustStickyForHeader is false, it stays at top-0. */}
            <div className={`sticky z-20 pb-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center gap-3 border-b border-border/40 mb-6 pt-2 transition-all duration-300 ${stickyTopClass}`}>
                <button
                    onClick={() => document.getElementById('ot-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-secondary/10 hover:bg-secondary/20 text-primary transition-colors border border-primary/20"
                >
                    Old Testament
                </button>
                <button
                    onClick={() => document.getElementById('nt-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                    className="px-4 py-1.5 rounded-full text-xs font-bold bg-secondary/10 hover:bg-secondary/20 text-primary transition-colors border border-primary/20"
                >
                    New Testament
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Old Testament */}
                <div id="ot-section" className="space-y-6 scroll-mt-24">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">Old Testament</h3>
                        <p className="text-xl font-medium text-foreground/90 leading-relaxed">
                            {getTestamentMnemonic('OT')}
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => toggleAllSections(OT_GROUPS, !areAllSectionsCollapsed(OT_GROUPS))}
                            className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                            {areAllSectionsCollapsed(OT_GROUPS) ? (
                                <>Expand All <ChevronsDown className="w-3 h-3" /></>
                            ) : (
                                <>Collapse All <ChevronsUp className="w-3 h-3" /></>
                            )}
                        </button>
                    </div>

                    {OT_GROUPS.map(group => {
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
                                    <div className="pl-2 animate-in slide-in-from-top-2 duration-200">
                                        {books.filter(b => b.order >= group.start && b.order <= group.end).map(renderBookRow)}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>

                {/* New Testament */}
                <div id="nt-section" className="space-y-6 scroll-mt-24">
                    <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                        <h3 className="text-sm font-bold uppercase tracking-wider text-primary mb-3">New Testament</h3>
                        <p className="text-xl font-medium text-foreground/90 leading-relaxed">
                            {getTestamentMnemonic('NT')}
                        </p>
                    </div>

                    <div className="flex justify-end">
                        <button
                            onClick={() => toggleAllSections(NT_GROUPS, !areAllSectionsCollapsed(NT_GROUPS))}
                            className="text-xs flex items-center gap-1 text-primary hover:text-primary/80 transition-colors font-medium"
                        >
                            {areAllSectionsCollapsed(NT_GROUPS) ? (
                                <>Expand All <ChevronsDown className="w-3 h-3" /></>
                            ) : (
                                <>Collapse All <ChevronsUp className="w-3 h-3" /></>
                            )}
                        </button>
                    </div>

                    {NT_GROUPS.map(group => {
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
                                    <div className="pl-2 animate-in slide-in-from-top-2 duration-200">
                                        {books.filter(b => b.order >= group.start && b.order <= group.end).map(renderBookRow)}
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// Helper Components

function ChapterList({ book, onNavigate }: { book: BibleBook, onNavigate: (bookId: string, chapter: number, verse?: number) => void }) {
    const chapters = Array.from({ length: book.numberOfChapters }, (_, i) => i + 1);
    const [expandedChapters, setExpandedChapters] = useState<Record<number, boolean>>({});

    const toggleAllChapters = (expand: boolean) => {
        const newState: Record<number, boolean> = {};
        if (expand) {
            chapters.forEach(c => newState[c] = true);
        }
        setExpandedChapters(newState);
    };

    const toggleChapter = (chap: number) => {
        setExpandedChapters(prev => ({ ...prev, [chap]: !prev[chap] }));
    };

    const allExpanded = chapters.every(c => expandedChapters[c]);

    return (
        <div className="space-y-2 border-l border-border/50 pl-2">
            <div className="flex justify-end pb-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleAllChapters(!allExpanded);
                    }}
                    className="text-[10px] flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    {allExpanded ? (
                        <>Collapse All <ChevronsUp className="w-3 h-3" /></>
                    ) : (
                        <>Expand All <ChevronsDown className="w-3 h-3" /></>
                    )}
                </button>
            </div>
            {chapters.map(chap => {
                const mnemonic = getChapterMnemonic(book.id, chap);
                const isExpanded = expandedChapters[chap];

                return (
                    <div
                        key={chap}
                        className="group flex items-start gap-2 hover:bg-background/80 rounded-md p-2 transition-colors cursor-pointer"
                        onClick={() => toggleChapter(chap)}
                    >
                        <div className="mt-0.5 text-muted-foreground">
                            {isExpanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate(book.id, chap);
                                    }}
                                    className="font-bold text-xs bg-secondary/20 px-1.5 rounded hover:bg-primary/10 hover:text-primary transition-colors h-fit"
                                    title="Read Chapter"
                                >
                                    {chap}
                                </button>
                                <span className="text-sm text-foreground/80">
                                    {mnemonic ? (
                                        <span>
                                            <span className="text-primary font-bold">{mnemonic.charAt(0)}</span>
                                            {mnemonic.slice(1)}
                                        </span>
                                    ) : <span className="text-muted-foreground/50 italic">No mnemonic</span>}
                                </span>
                            </div>

                            {isExpanded && (
                                <div
                                    className="mt-2 pl-2 cursor-auto"
                                    onClick={(e) => e.stopPropagation()} // Prevent closing chapter when interacting with verses
                                >
                                    <VerseList bookId={book.id} chapter={chap} onNavigate={onNavigate} />
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

function VerseList({ bookId, chapter, onNavigate }: { bookId: string, chapter: number, onNavigate: (bookId: string, chapter: number, verse?: number) => void }) {
    const versesData = getChapterVerses(bookId, chapter);
    const [expandedVerses, setExpandedVerses] = useState<Record<string, boolean>>({});
    const [chapterText, setChapterText] = useState<Record<number, string> | null>(null);
    const [loadingText, setLoadingText] = useState(false);

    if (!versesData || Object.keys(versesData).length === 0) {
        return <div className="text-xs text-muted-foreground italic pl-2 py-1">No verse mnemonics available.</div>;
    }

    const verseKeys = Object.keys(versesData).sort((a, b) => parseInt(a) - parseInt(b));

    const ensureTextLoaded = async () => {
        if (!chapterText && !loadingText) {
            setLoadingText(true);
            try {
                // Fetch chapter data, default to BSB
                const chapData = await getChapter('BSB', bookId, chapter);
                // Parse text
                const textMap: Record<number, string> = {};
                if (chapData && chapData.chapter && chapData.chapter.content) {
                    chapData.chapter.content.forEach(item => {
                        if (item.type === 'verse' && item.number) {
                            textMap[item.number] = formatPassageText(item.content);
                        }
                    });
                }
                setChapterText(textMap);
            } catch (e) {
                console.error("Failed to fetch text", e);
            } finally {
                setLoadingText(false);
            }
        }
    };

    const toggleAllVerses = async (expand: boolean) => {
        if (expand) {
            setLoadingText(true);
            await ensureTextLoaded(); // Ensure text is loaded before expanding
            const newState: Record<string, boolean> = {};
            verseKeys.forEach(k => newState[k] = true);
            setExpandedVerses(newState);
        } else {
            setExpandedVerses({});
        }
    };

    const toggleVerse = (verseKey: string) => {
        const isExpanding = !expandedVerses[verseKey];
        setExpandedVerses(prev => ({ ...prev, [verseKey]: isExpanding }));
        if (isExpanding) {
            ensureTextLoaded();
        }
    };

    const allExpanded = verseKeys.every(k => expandedVerses[k]);

    return (
        <div className="space-y-1 border-l border-border/50 pl-2 mt-1">
            <div className="flex justify-end pb-1">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleAllVerses(!allExpanded);
                    }}
                    className="text-[10px] flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                    {allExpanded ? (
                        <>Collapse All <ChevronsUp className="w-2.5 h-2.5" /></>
                    ) : (
                        <>Expand All <ChevronsDown className="w-2.5 h-2.5" /></>
                    )}
                </button>
            </div>
            {verseKeys.map(verseKey => {
                const verseData = versesData ? versesData[verseKey] : undefined;
                if (!verseData) return null;
                const mnemonic = typeof verseData === 'string' ? verseData : verseData.mnemonic;
                const isExpanded = expandedVerses[verseKey];
                const verseNum = parseInt(verseKey);

                return (
                    <div
                        key={verseKey}
                        className="group flex items-start gap-2 hover:bg-background/50 rounded-md p-1 transition-colors cursor-pointer"
                        onClick={() => toggleVerse(verseKey)}
                    >
                        <div className="mt-0.5 p-0.5 text-muted-foreground/70 group-hover:text-primary transition-colors">
                            {isExpanded ? <ChevronDown className="w-2.5 h-2.5" /> : <ChevronRight className="w-2.5 h-2.5" />}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-baseline gap-2">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onNavigate(bookId, chapter, parseInt(verseKey));
                                    }}
                                    className="font-medium text-[10px] text-muted-foreground bg-secondary/10 px-1 rounded min-w-[20px] text-center hover:bg-primary/10 hover:text-primary transition-colors"
                                    title="Read Verse"
                                >
                                    {verseKey}
                                </button>
                                <span className="text-xs text-foreground/70">
                                    {mnemonic && mnemonic.length > 0 && (
                                        <span>
                                            <span className="text-primary font-bold">{mnemonic.charAt(0)}</span>
                                            {mnemonic.slice(1)}
                                        </span>
                                    )}
                                </span>
                            </div>

                            {isExpanded && (
                                <div className="mt-1 pl-1 text-xs text-muted-foreground bg-secondary/5 p-2 rounded border border-border/50 cursor-text" onClick={e => e.stopPropagation()}>
                                    {loadingText && !chapterText && <span className="italic">Loading verses...</span>}
                                    {chapterText && (
                                        <span className="italic font-serif text-foreground/90">
                                            {chapterText[verseNum] || "Text not found"}
                                        </span>
                                    )}
                                    {!loadingText && !chapterText && <span className="italic text-red-400">Failed to load text.</span>}
                                </div>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// Helper
function parseHint(hint: string) {
    const parts = hint.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <span key={i} className="text-primary font-bold not-italic">{part.slice(2, -2)}</span>;
        }
        return part;
    });
}
