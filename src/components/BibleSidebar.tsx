
import React, { useEffect } from 'react';
import { MessageSquare, X, ChevronUp, ChevronDown, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { BibleChapter, Commentary, CommentaryChapter, DatasetBookChapter, BibleBook } from '../../data/bibleApi';
import { getSortedReferences } from '../utils/bibleUtils';

interface BibleSidebarProps {
    showCommentary: boolean;
    setShowCommentary: (show: boolean) => void;
    bsbChapter: BibleChapter | null;
    commentaries: Commentary[];
    selectedCommentaryId: string;
    setSelectedCommentaryId: (id: string) => void;
    commentaryTab: 'chapter' | 'intro' | 'footnotes' | 'references';
    setCommentaryTab: (tab: 'chapter' | 'intro' | 'footnotes' | 'references') => void;
    commentaryChapter: CommentaryChapter | null;
    crossRefs: DatasetBookChapter | null;
    expandedRefTexts: Record<string, string>;
    loadingRefs: Record<string, boolean>;
    toggleVerseRefs: (verseNum: number, refs: any[]) => void;
    handleToggleRefText: (refKey: string, book: string, chapter: number, verse: number, endVerse?: number) => void;
    books: BibleBook[];
    scrollToVerseInView: (verseNum: number) => void;
    sidebarScrollTarget: number | null;
    setSidebarScrollTarget: (target: number | null) => void;
}

export default function BibleSidebar({
    showCommentary,
    setShowCommentary,
    bsbChapter,
    commentaries,
    selectedCommentaryId,
    setSelectedCommentaryId,
    commentaryTab,
    setCommentaryTab,
    commentaryChapter,
    crossRefs,
    expandedRefTexts,
    loadingRefs,
    toggleVerseRefs,
    handleToggleRefText,
    books,
    scrollToVerseInView,
    sidebarScrollTarget,
    setSidebarScrollTarget
}: BibleSidebarProps) {

    // Scroll sidebar to target verse
    useEffect(() => {
        if (showCommentary && sidebarScrollTarget !== null) {
            // Determine target element ID based on active tab
            let targetId = '';
            if (commentaryTab === 'references') {
                targetId = `sidebar-ref-verse-${sidebarScrollTarget}`;
            } else if (commentaryTab === 'chapter') {
                targetId = `commentary-verse-${sidebarScrollTarget}`;
            }

            if (targetId) {
                // Small delay to allow sidebar to render/animate in
                const timeout = setTimeout(() => {
                    const element = document.getElementById(targetId);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        // Add temporary highlight
                        element.classList.add('bg-primary/5', 'transition-colors', 'duration-1000');
                        setTimeout(() => {
                            element.classList.remove('bg-primary/5');
                        }, 2000);
                    }
                }, 300);
                return () => clearTimeout(timeout);
            }
        }
    }, [showCommentary, commentaryTab, sidebarScrollTarget]);

    // Reset scroll target when sidebar closes
    useEffect(() => {
        if (!showCommentary) {
            setSidebarScrollTarget(null);
        }
    }, [showCommentary, setSidebarScrollTarget]);

    const renderCommentaryContent = () => {
        if (!commentaryChapter) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                    <p className="italic">Select a commentary to view content.</p>
                </div>
            );
        }

        return (
            <div className="prose prose-sm dark:prose-invert">
                {commentaryChapter.chapter.content.map((item, index) => {
                    if (item.type === 'heading') {
                        return (
                            <h4 key={index} className="text-base font-semibold mt-4 mb-2">
                                {item.text}
                            </h4>
                        );
                    }
                    if (item.type === 'verse_comment') {
                        return (
                            <div key={index} id={`commentary-verse-${item.verse}`} className="mb-4">
                                <button
                                    onClick={() => {
                                        scrollToVerseInView(item.verse);
                                        if (window.innerWidth < 1024) {
                                            setShowCommentary(false);
                                        }
                                    }}
                                    className="font-bold text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded mr-2 hover:bg-primary/20 transition-colors"
                                >
                                    Verse {item.verse}
                                </button>
                                <div dangerouslySetInnerHTML={{ __html: item.text }} className="inline" />
                            </div>
                        );
                    }
                    if (item.type === 'verse') {
                        return (
                            <div key={index} id={`commentary-verse-${item.number}`} className="mb-4">
                                <button
                                    onClick={() => {
                                        scrollToVerseInView(item.number);
                                        if (window.innerWidth < 1024) {
                                            setShowCommentary(false);
                                        }
                                    }}
                                    className="font-bold text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded mr-2 hover:bg-primary/20 transition-colors"
                                >
                                    Verse {item.number}
                                </button>
                                <div className="inline text-foreground/90 leading-relaxed">
                                    {item.content.map((c, i) => {
                                        if (typeof c === 'string') return <span key={i}>{c}</span>;
                                        if ('text' in c) return <span key={i} className={c.wordsOfJesus ? 'text-red-700 dark:text-red-400' : ''}>{c.text}</span>;
                                        if ('lineBreak' in c && c.lineBreak) return <br key={i} />;
                                        return null;
                                    })}
                                </div>
                            </div>
                        );
                    }
                    if (item.type === 'text') {
                        return <div key={index} dangerouslySetInnerHTML={{ __html: item.text }} className="mb-2" />;
                    }
                    return null;
                })}
            </div>
        );
    };

    const renderIntroductionContent = () => {
        if (!commentaryChapter?.book.introduction) {
            return (
                <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                    <p className="italic">No introduction available.</p>
                </div>
            );
        }

        const text = commentaryChapter.book.introduction;
        // Simple check if it looks like HTML (has tags)
        if (/<[a-z][\s\S]*>/i.test(text)) {
            return <div dangerouslySetInnerHTML={{ __html: text }} />;
        }

        // Otherwise treat as plain text and split by newlines
        return (
            <div className="space-y-4 text-foreground/90 leading-relaxed">
                {text.split(/\n+/).map((para, i) => (
                    para.trim() ? <p key={i}>{para.trim()}</p> : null
                ))}
            </div>
        );
    };

    if (!showCommentary || !bsbChapter) return null;

    return (
        <>
            {/* Mobile Overlay */}
            <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setShowCommentary(false)} />

            <div className="fixed z-[60] bg-card border border-border shadow-2xl flex flex-col lg:right-4 lg:top-24 lg:bottom-4 lg:w-[400px] lg:rounded-xl inset-4 rounded-xl lg:inset-auto animate-in slide-in-from-right duration-300">
                <div className="flex items-center justify-between mb-6 shrink-0 p-4 pb-0">
                    <div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-2 mb-1">
                            <MessageSquare className="w-3 h-3" /> Commentary
                        </h3>
                        <h2 className="text-2xl font-bold text-foreground">
                            {bsbChapter.book.name} {bsbChapter.chapter.number}
                        </h2>
                    </div>
                    <button onClick={() => setShowCommentary(false)} className="p-2 hover:bg-accent/10 rounded-full transition-colors -mr-2">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="px-4 pb-2">

                    {/* Commentary Selector */}
                    <div className="mb-4 shrink-0">
                        <select
                            className="w-full bg-secondary/10 border-transparent rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                            value={selectedCommentaryId}
                            onChange={(e) => setSelectedCommentaryId(e.target.value)}
                        >
                            {commentaries.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>

                    {/* Tabs */}
                    <div className="flex border-b border-border mb-2 shrink-0">
                        <button
                            className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'intro' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={() => setCommentaryTab('intro')}
                        >
                            Book
                        </button>
                        <button
                            className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'chapter' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={() => setCommentaryTab('chapter')}
                        >
                            Chapter
                        </button>
                        <button
                            className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'footnotes' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={() => setCommentaryTab('footnotes')}
                        >
                            Footnotes
                        </button>
                        <button
                            className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'references' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                            onClick={() => setCommentaryTab('references')}
                        >
                            Refs
                        </button>
                    </div>
                </div>


                {/* Content Areas - Independent Scroll Containers */}
                {/* Chapter Tab */}
                <div className={`flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar ${commentaryTab === 'chapter' ? '' : 'hidden'}`}>
                    {renderCommentaryContent()}
                </div>

                <div className={`flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar ${commentaryTab === 'intro' ? '' : 'hidden'}`}>
                    <div className="prose prose-sm dark:prose-invert">
                        {renderIntroductionContent()}
                    </div>
                </div>

                {/* Footnotes Tab */}
                <div className={`flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar ${commentaryTab === 'footnotes' ? '' : 'hidden'}`}>
                    <div className="space-y-4">
                        {bsbChapter?.chapter.footnotes && bsbChapter.chapter.footnotes.length > 0 ? (
                            bsbChapter.chapter.footnotes.map((note) => (
                                <div key={note.noteId} id={`footnote-${note.noteId}`} className="text-sm p-3 bg-secondary/10 rounded-lg">
                                    <div className="flex items-baseline gap-2 mb-1">
                                        <span className="font-bold text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                                            {note.caller || '+'}
                                        </span>
                                        {note.reference && (
                                            <button
                                                onClick={() => {
                                                    if (note.reference?.verse) {
                                                        scrollToVerseInView(note.reference.verse);
                                                        if (window.innerWidth < 1024) {
                                                            setShowCommentary(false);
                                                        }
                                                    }
                                                }}
                                                className="text-xs text-muted-foreground uppercase tracking-wider hover:text-primary hover:underline transition-colors ml-1"
                                            >
                                                Verse {note.reference.verse}
                                            </button>
                                        )}
                                    </div>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {note.text}
                                    </p>
                                </div>
                            ))
                        ) : (
                            <p className="text-muted-foreground italic text-center py-8">No footnotes for this chapter.</p>
                        )}
                    </div>
                </div>

                {/* References Tab */}
                <div className={`flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar ${commentaryTab === 'references' ? '' : 'hidden'}`}>
                    <div className="space-y-6">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-xs font-medium text-muted-foreground">
                                {crossRefs?.chapter.content.reduce((acc, v) => acc + v.references.length, 0)} References
                            </span>
                        </div>
                        {crossRefs?.chapter.content.filter(v => v.references.length > 0).map(v => {
                            const verseRefs = v.references.map(r => ({ ...r, verseNum: v.verse }));
                            const allKeys = verseRefs.map(r => `${v.verse}-${r.book}-${r.chapter}-${r.verse}`);
                            const anyExpanded = allKeys.some(k => expandedRefTexts[k]);

                            return (
                                <div key={v.verse} id={`sidebar-ref-verse-${v.verse}`} className="border-b border-border/50 pb-4 last:border-0">
                                    <div className="font-bold text-sm mb-2 flex items-center justify-between">
                                        <button
                                            onClick={() => {
                                                scrollToVerseInView(v.verse);
                                                if (window.innerWidth < 1024) {
                                                    setShowCommentary(false); // Close modal only on mobile
                                                }
                                            }}
                                            className="flex items-center gap-2 hover:bg-secondary/10 px-2 py-1 rounded transition-colors group/header"
                                        >
                                            <span className="bg-primary/10 text-primary px-2 py-0.5 rounded text-xs group-hover/header:bg-primary/20 transition-colors">Verse {v.verse}</span>
                                            <span className="text-xs text-muted-foreground font-normal">{v.references.length} References</span>
                                        </button>
                                        <button
                                            onClick={() => toggleVerseRefs(v.verse, v.references)}
                                            className="text-[10px] text-primary hover:underline flex items-center gap-1"
                                        >
                                            {anyExpanded ? (
                                                <>Collapse All <ChevronUp className="w-3 h-3" /></>
                                            ) : (
                                                <>Expand All <ChevronDown className="w-3 h-3" /></>
                                            )}
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 gap-2">
                                        {getSortedReferences(v.references, books).map((ref, i) => {
                                            const refKey = `${v.verse}-${ref.book}-${ref.chapter}-${ref.verse}`;
                                            const isExpanded = !!expandedRefTexts[refKey];
                                            const isLoading = !!loadingRefs[refKey];

                                            return (
                                                <div
                                                    key={i}
                                                    className="flex flex-col bg-card hover:bg-secondary/10 rounded transition-colors border border-transparent hover:border-border/50 cursor-pointer"
                                                    onClick={() => handleToggleRefText(refKey, ref.book, ref.chapter, ref.verse, ref.endVerse)}
                                                >
                                                    <div className="flex items-center justify-between p-2">
                                                        {(() => {
                                                            const refBook = books.find(b => b.id === ref.book);
                                                            const bookName = refBook ? refBook.name : ref.book;
                                                            const bookUrlName = refBook ? refBook.name.replace(/\s+/g, '') : ref.book;

                                                            return (
                                                                <div className="flex-1 min-w-0 mr-2 flex items-center">
                                                                    <Link
                                                                        to={`/bible/read/${bookUrlName}/${ref.chapter}/${ref.verse}${ref.endVerse ? `-${ref.endVerse}` : ''}`}
                                                                        className="text-sm font-medium text-foreground/80 hover:text-primary truncate"
                                                                        onClick={(e) => {
                                                                            e.stopPropagation(); // Stop propagation to prevent toggle
                                                                            if (window.innerWidth < 1024) {
                                                                                setShowCommentary(false); // Close modal only on mobile
                                                                            }
                                                                        }}
                                                                    >
                                                                        {bookName} {ref.chapter}:{ref.verse}{ref.endVerse ? `-${ref.endVerse}` : ''}
                                                                    </Link>
                                                                </div>
                                                            );
                                                        })()}
                                                        <div className="flex items-center gap-2">
                                                            {ref.score !== undefined && ref.score !== null && (
                                                                <span
                                                                    className="text-[10px] text-muted-foreground bg-secondary/20 px-1.5 py-0.5 rounded inline-block cursor-help"
                                                                    title="Relevance Score"
                                                                >
                                                                    {ref.score}
                                                                </span>
                                                            )}
                                                            <button
                                                                type="button"
                                                                className="p-1 hover:bg-secondary/20 rounded text-muted-foreground hover:text-foreground transition-colors"
                                                                title={isExpanded ? "Hide Text" : "Show Text"}
                                                            >
                                                                {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                                                            </button>
                                                        </div>
                                                    </div>

                                                    {/* Expanded Text Preview */}
                                                    {isExpanded && (
                                                        <div className="px-3 pb-3 pt-0 animate-in slide-in-from-top-1 duration-200 cursor-text" onClick={e => e.stopPropagation()}>
                                                            <div className="text-xs text-muted-foreground bg-secondary/5 p-2 rounded border border-border/50">
                                                                {isLoading ? (
                                                                    <div className="flex items-center gap-2">
                                                                        <Loader2 className="w-3 h-3 animate-spin" />
                                                                        <span>Loading...</span>
                                                                    </div>
                                                                ) : (
                                                                    <p className="leading-relaxed text-foreground/90 text-sm">
                                                                        {expandedRefTexts[refKey]}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                        {(!crossRefs || crossRefs.chapter.content.every(v => v.references.length === 0)) && (
                            <div className="text-center py-10 text-muted-foreground">
                                <p>No cross-references found for this chapter.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
