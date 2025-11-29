import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, BookOpen, Loader2, AlertCircle, MessageSquare, Grid, Globe, X, Search, Filter, Eye } from 'lucide-react';
import { getChapter, getBooks, getTranslations, getCommentaries, getCommentaryChapter, getProfiles, getProfile } from '../data/bibleApi';
import type { BibleChapter, ChapterContent, BibleBook, BibleTranslation, Commentary, CommentaryChapter, Profile, ProfileContent, ChapterFootnote } from '../data/bibleApi';
import Breadcrumbs from './Breadcrumbs';
import { diffVerses, type DiffToken } from '../utils/diffUtils';

// Helper to get text content from verse parts
const getText = (content: (string | { text: string; wordsOfJesus?: boolean } | { noteId: number } | { lineBreak: boolean })[]) =>
    content.map(c => {
        if (typeof c === 'string') return c;
        if ('text' in c) return c.text;
        return '';
    }).join('').trim();

export default function BibleReader() {
    const { bookId, chapter } = useParams<{ bookId: string; chapter: string }>();
    const navigate = useNavigate();

    const [bsbChapter, setBsbChapter] = useState<BibleChapter | null>(null);
    const [msbChapter, setMsbChapter] = useState<BibleChapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [showMsb, setShowMsb] = useState(false);

    // Commentary State
    const [showCommentary, setShowCommentary] = useState(false);
    const [commentaries, setCommentaries] = useState<Commentary[]>([]);
    const [selectedCommentaryId, setSelectedCommentaryId] = useState<string>('');
    const [commentaryChapter, setCommentaryChapter] = useState<CommentaryChapter | null>(null);
    const [commentaryLoading, setCommentaryLoading] = useState(false);
    const [commentaryTab, setCommentaryTab] = useState<'chapter' | 'intro' | 'footnotes'>('chapter');

    // Profile State
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<ProfileContent | null>(null);
    const [showProfileModal, setShowProfileModal] = useState(false);

    // Footnotes State
    const [showFootnotes, setShowFootnotes] = useState(true);
    const [activeFootnote, setActiveFootnote] = useState<{ id: number; x: number; y: number } | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);

    // Quick Nav & Translation State
    const [showQuickNav, setShowQuickNav] = useState(false);
    const [showTranslations, setShowTranslations] = useState(false);
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [translations, setTranslations] = useState<BibleTranslation[]>([]);
    const [selectedTranslation, setSelectedTranslation] = useState('BSB');
    const [navStep, setNavStep] = useState<'books' | 'chapters'>('books');
    const [selectedNavBook, setSelectedNavBook] = useState<BibleBook | null>(null);

    // Enhanced Selectors State
    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA'>('ALL');
    const [bookSearchQuery, setBookSearchQuery] = useState('');
    const [translationSearch, setTranslationSearch] = useState('');
    const [languageFilter, setLanguageFilter] = useState<string>('All');

    // Universal Search & Filtering State
    const [universalSearchQuery, setUniversalSearchQuery] = useState('');
    const [visibleVerses, setVisibleVerses] = useState<number[] | null>(null);

    // Fetch Books, Translations, Commentaries, and Profiles on mount
    useEffect(() => {
        const initData = async () => {
            try {
                const [booksData, translationsData, commentariesData, profilesData] = await Promise.all([
                    getBooks('BSB'),
                    getTranslations(),
                    getCommentaries(),
                    getProfiles()
                ]);
                setBooks(booksData);
                setTranslations(translationsData);
                setCommentaries(commentariesData);
                setProfiles(profilesData.profiles);

                // Set default commentary if available
                if (commentariesData.length > 0) {
                    // Prefer Matthew Henry or similar popular ones if available, otherwise first
                    const defaultComm = commentariesData.find(c => c.id === 'MHC') || commentariesData[0];
                    setSelectedCommentaryId(defaultComm.id);
                }

                // Detect Browser Language for Default Filter
                const browserLang = navigator.language;
                if (browserLang.startsWith('en')) {
                    setLanguageFilter('English');
                } else if (browserLang.startsWith('es')) {
                    setLanguageFilter('Spanish');
                }
            } catch (e) {
                console.error("Failed to load initial bible data", e);
            }
        };
        initData();
    }, []);

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

    // Unique Languages for Filter
    const availableLanguages = useMemo(() => {
        const langs = new Set(translations.map(t => t.languageEnglishName || t.language));
        return ['All', ...Array.from(langs).sort()];
    }, [translations]);

    // Enhanced Translation Sorting & Filtering
    const filteredTranslations = useMemo(() => {
        let filtered = translations.filter(t => {
            const matchesSearch =
                t.name.toLowerCase().includes(translationSearch.toLowerCase()) ||
                (t.languageEnglishName || t.language).toLowerCase().includes(translationSearch.toLowerCase()) ||
                t.shortName.toLowerCase().includes(translationSearch.toLowerCase());

            const matchesLang = languageFilter === 'All' || (t.languageEnglishName || t.language) === languageFilter;
            return matchesSearch && matchesLang;
        });

        return filtered.sort((a, b) => {
            // Priority: BSB, MSB
            if (a.id === 'BSB') return -1;
            if (b.id === 'BSB') return 1;
            if (a.id === 'eng_msb') return -1;
            if (b.id === 'eng_msb') return 1;

            // Then English
            const aIsEnglish = (a.languageEnglishName || a.language).toLowerCase().includes('english');
            const bIsEnglish = (b.languageEnglishName || b.language).toLowerCase().includes('english');

            if (aIsEnglish && !bIsEnglish) return -1;
            if (!aIsEnglish && bIsEnglish) return 1;

            return a.name.localeCompare(b.name);
        });
    }, [translations, translationSearch, languageFilter]);

    // Fetch Chapter Content
    useEffect(() => {
        const fetchData = async () => {
            if (!bookId || !chapter) return;

            setLoading(true);
            setError(null);

            try {
                // Fetch Primary Translation
                const primaryData = await getChapter(selectedTranslation, bookId, parseInt(chapter));
                setBsbChapter(primaryData);

                // Fetch MSB (comparison) - only if primary is BSB
                if (selectedTranslation === 'BSB') {
                    try {
                        const msbData = await getChapter('eng_msb', bookId, parseInt(chapter));
                        setMsbChapter(msbData);
                    } catch (e) {
                        console.warn('MSB not available for this chapter');
                        setMsbChapter(null);
                    }
                } else {
                    setMsbChapter(null); // No comparison if not reading BSB
                }

            } catch (err) {
                console.error('Error fetching chapter:', err);
                setError('Failed to load chapter. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookId, chapter, selectedTranslation]);

    // Fetch Commentary Content
    useEffect(() => {
        const fetchCommentary = async () => {
            if (!bookId || !chapter || !showCommentary || !selectedCommentaryId) return;

            setCommentaryLoading(true);
            try {
                const data = await getCommentaryChapter(selectedCommentaryId, bookId, parseInt(chapter));
                setCommentaryChapter(data);
            } catch (e) {
                console.error("Failed to fetch commentary", e);
                setCommentaryChapter(null);
            } finally {
                setCommentaryLoading(false);
            }
        };

        fetchCommentary();
    }, [bookId, chapter, showCommentary, selectedCommentaryId]);


    const handleNext = () => {
        if (bsbChapter?.nextChapterApiLink) {
            setVisibleVerses(null); // Reset filter
            const nextChap = parseInt(chapter || '1') + 1;
            navigate(`/bible/read/${bookId}/${nextChap}`);
        }
    };

    const handlePrev = () => {
        if (bsbChapter?.previousChapterApiLink) {
            setVisibleVerses(null); // Reset filter
            const prevChap = parseInt(chapter || '1') - 1;
            if (prevChap > 0) {
                navigate(`/bible/read/${bookId}/${prevChap}`);
            }
        }
    };

    const handleBookSelect = (book: BibleBook) => {
        setSelectedNavBook(book);
        setNavStep('chapters');
    };

    const handleChapterSelect = (chapNum: number) => {
        setVisibleVerses(null); // Reset filter
        navigate(`/bible/read/${selectedNavBook?.id}/${chapNum}`);
        setShowQuickNav(false);
        setNavStep('books');
        setSelectedNavBook(null);
    };

    // Universal Search Handler
    const handleUniversalSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const query = universalSearchQuery.trim().toLowerCase();
        if (!query) return;

        // Regex to parse "Book Chapter:Verse" or "Book Chapter" or "Book"
        // Matches: "1 John 3:16", "Gen 1", "Genesis", "2 Kings", "Gen 1:1-5"
        const match = query.match(/^(\d?\s?[a-zA-Z]+)\s*(\d+)?(?::(\d+)(?:-(\d+))?)?$/);

        if (match) {
            const bookQuery = match[1].trim();
            const chapterNum = match[2] ? parseInt(match[2]) : 1;
            const startVerse = match[3] ? parseInt(match[3]) : null;
            const endVerse = match[4] ? parseInt(match[4]) : null;

            // Find book
            const book = books.find(b =>
                b.name.toLowerCase() === bookQuery ||
                b.name.toLowerCase().startsWith(bookQuery) ||
                (b.commonName && b.commonName.toLowerCase() === bookQuery)
            );

            if (book) {
                // Determine visible verses
                let versesToShow: number[] | null = null;
                if (startVerse) {
                    versesToShow = [];
                    const end = endVerse || startVerse;
                    for (let i = startVerse; i <= end; i++) {
                        versesToShow.push(i);
                    }
                }

                navigate(`/bible/read/${book.id}/${chapterNum}`, { state: { visibleVerses: versesToShow } });
                setVisibleVerses(versesToShow); // Set local state immediately
                setUniversalSearchQuery('');
            }
        }
    };

    const handleFootnoteClick = (noteId: number) => {
        setShowCommentary(true);
        setCommentaryTab('footnotes');
        // Optional: Scroll to note logic could go here
    };

    const handleFootnoteEnter = (e: React.MouseEvent, noteId: number) => {
        if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }

        const rect = (e.target as HTMLElement).getBoundingClientRect();
        const timeout = setTimeout(() => {
            setActiveFootnote({ id: noteId, x: rect.left + rect.width / 2, y: rect.top });
        }, 300); // 300ms delay
        setHoverTimeout(timeout);
    };

    const handleFootnoteLeave = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);

        const timeout = setTimeout(() => {
            setActiveFootnote(null);
        }, 300); // 300ms delay before closing
        setCloseTimeout(timeout);
    };

    const handleFootnoteTouch = (e: React.MouseEvent, noteId: number) => {
        e.stopPropagation();
        // On mobile/touch, toggle popover
        if (activeFootnote?.id === noteId) {
            setActiveFootnote(null);
        } else {
            const rect = (e.target as HTMLElement).getBoundingClientRect();
            setActiveFootnote({ id: noteId, x: rect.left + rect.width / 2, y: rect.top });
        }
    };

    const openProfile = async (profileId: string) => {
        if (!selectedCommentaryId) return;

        setProfileLoading(true);
        setShowProfileModal(true);
        try {
            const profileData = await getProfile(selectedCommentaryId, profileId);
            setSelectedProfile(profileData.profile);
        } catch (e) {
            console.error("Failed to fetch profile", e);
            setSelectedProfile(null);
        } finally {
            setProfileLoading(false);
        }
    };

    // Helper to check if we should insert a space between content parts
    const shouldInsertSpace = (prev: any, curr: any) => {
        const prevText = typeof prev === 'string' ? prev : prev.text;
        const currText = typeof curr === 'string' ? curr : curr.text;
        if (!prevText || !currText) return false;
        // Check for alphanumeric/punctuation boundary including dashes
        return /[a-zA-Z0-9;,."?!:’')\]—–]$/.test(prevText) && /^[a-zA-Z0-9“"‘(]/.test(currText);
    };

    const renderContent = (content: ChapterContent[], msbContent?: ChapterContent[]) => {
        return content.map((item, index) => {
            if (item.type === 'heading') {
                if (visibleVerses) return null;
                return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-primary">
                        {item.content.join(' ')}
                    </h3>
                );
            }

            if (item.type === 'line_break') {
                if (visibleVerses) return null;
                return <br key={index} />;
            }

            if (item.type === 'verse') {
                // Filter logic
                if (visibleVerses && !visibleVerses.includes(item.number)) {
                    return null;
                }

                const msbVerse = msbContent?.find(v => v.type === 'verse' && v.number === item.number) as { type: 'verse', number: number, content: (string | { text: string, wordsOfJesus?: boolean })[] } | undefined;

                return (
                    <span key={index} className="relative group">
                        <sup className="text-xs font-bold text-muted-foreground mr-1 select-none">{item.number}</sup>
                        {/* MSB Comparison Overlay (if enabled) */}
                        {showMsb && msbVerse ? (
                            (() => {
                                const { bsbDiff, msbDiff } = diffVerses(item.content, msbVerse.content);
                                const isIdentical = bsbDiff.every(t => t.status === 'common') && msbDiff.every(t => t.status === 'common');

                                if (isIdentical) {
                                    return (
                                        <>
                                            <span className="leading-relaxed">
                                                {/* Render BSB normally if identical */}
                                                {item.content.map((c, i) => {
                                                    // Check if we need to insert a space before this item
                                                    const prev = i > 0 ? item.content[i - 1] : null;
                                                    const needsSpace = prev && shouldInsertSpace(prev, c);

                                                    const contentElement = (() => {
                                                        if (typeof c === 'string') return <span key={i}>{c}</span>;
                                                        if ('text' in c) return <span key={i} className={c.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""}>{c.text}</span>;
                                                        if ('lineBreak' in c) return <br key={i} />;
                                                        return null;
                                                    })();

                                                    return (
                                                        <React.Fragment key={i}>
                                                            {needsSpace && <span> </span>}
                                                            {contentElement}
                                                        </React.Fragment>
                                                    );
                                                })}
                                            </span>
                                            <div className="mt-1 mb-2 px-2 py-1 bg-secondary/5 rounded border border-dashed border-secondary/30 text-[10px] text-muted-foreground inline-flex items-center gap-1 select-none">
                                                <span className="w-1.5 h-1.5 rounded-full bg-secondary/50" />
                                                Matches MSB
                                            </div>
                                        </>
                                    );
                                }

                                return (
                                    <>
                                        <span className="leading-relaxed">
                                            {/* Render BSB with Diff Highlights */}
                                            {bsbDiff.map((t: DiffToken, i: number) => {
                                                if (t.isLineBreak) return <br key={i} />;
                                                return (
                                                    <span
                                                        key={i}
                                                        className={`${t.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""} ${t.status === 'removed' ? 'font-bold bg-yellow-100/50 dark:bg-yellow-900/30 rounded-sm px-0.5' : ''}`}
                                                    >
                                                        {t.text}
                                                    </span>
                                                );
                                            })}
                                        </span>

                                        <div className="mt-2 mb-4 p-3 bg-amber-50 dark:bg-amber-950/20 rounded-lg border-l-2 border-amber-500 text-sm text-muted-foreground">
                                            <span className="font-bold text-xs uppercase tracking-wider block mb-1 text-amber-600 dark:text-amber-500 flex items-center gap-2">
                                                <span>MSB Variation</span>
                                            </span>
                                            {msbDiff.map((t: DiffToken, i: number) => {
                                                if (t.isLineBreak) return <br key={i} />;
                                                return (
                                                    <span
                                                        key={i}
                                                        className={`${t.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""} ${t.status === 'added' ? 'font-bold bg-amber-200/50 dark:bg-amber-800/30 text-foreground rounded-sm px-0.5' : ''}`}
                                                    >
                                                        {t.text}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </>
                                );
                            })()
                        ) : (
                            <span className="leading-relaxed">
                                {item.content.map((c, i) => {
                                    // Check if we need to insert a space before this item
                                    const prev = i > 0 ? item.content[i - 1] : null;
                                    const needsSpace = prev && shouldInsertSpace(prev, c);

                                    const contentElement = (() => {
                                        if (typeof c === 'string') {
                                            // Check for profile names in the text
                                            let text = c;
                                            const elements: (string | React.ReactNode)[] = [];
                                            let lastIndex = 0;

                                            const profileNames = profiles
                                                .filter(p => /^[A-Z]/.test(p.subject))
                                                .sort((a, b) => b.subject.length - a.subject.length);

                                            if (profileNames.length > 0) {
                                                const pattern = new RegExp(`\\b(${profileNames.map(p => p.subject).join('|')})\\b`, 'g');
                                                let match;
                                                while ((match = pattern.exec(text)) !== null) {
                                                    if (match.index > lastIndex) {
                                                        elements.push(text.substring(lastIndex, match.index));
                                                    }
                                                    const name = match[0];
                                                    const profile = profiles.find(p => p.subject === name);
                                                    if (profile) {
                                                        elements.push(
                                                            <button
                                                                key={`${index}-${i}-${match.index}`}
                                                                onClick={(e) => { e.stopPropagation(); openProfile(profile.id); }}
                                                                className="text-primary hover:underline font-medium decoration-dotted underline-offset-4"
                                                                title={`View Profile: ${name}`}
                                                            >
                                                                {name}
                                                            </button>
                                                        );
                                                    } else {
                                                        elements.push(name);
                                                    }
                                                    lastIndex = match.index + name.length;
                                                }
                                                if (lastIndex < text.length) {
                                                    elements.push(text.substring(lastIndex));
                                                }
                                                if (elements.length > 0) {
                                                    return <span key={i}>{elements}</span>;
                                                }
                                            }
                                            return <span key={i}>{c}</span>;
                                        }

                                        if ('text' in c) {
                                            return <span key={i} className={c.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""}>{c.text}</span>;
                                        }

                                        if ('lineBreak' in c) {
                                            return <br key={i} />;
                                        }

                                        if ('noteId' in c) {
                                            const noteMarker = showFootnotes ? (
                                                <sup
                                                    key={`note-${index}-${i}`}
                                                    className="text-[10px] font-bold text-primary/70 cursor-pointer hover:text-primary hover:underline select-none ml-0.5"
                                                    onClick={(e) => {
                                                        if (window.matchMedia('(pointer: coarse)').matches) {
                                                            handleFootnoteTouch(e, c.noteId);
                                                        } else {
                                                            e.stopPropagation();
                                                            handleFootnoteClick(c.noteId);
                                                        }
                                                    }}
                                                    onMouseEnter={(e) => handleFootnoteEnter(e, c.noteId)}
                                                    onMouseLeave={handleFootnoteLeave}
                                                >
                                                    [{c.caller || '+'}]
                                                </sup>
                                            ) : null;

                                            let space = null;
                                            const next = item.content[i + 1];
                                            if (next) {
                                                const nextText = typeof next === 'string' ? next : (next as any).text;
                                                if (nextText && /^[^.,!?;:)\]}”’]/.test(nextText)) {
                                                    space = <span key={`space-${index}-${i}`}> </span>;
                                                }
                                            }

                                            if (noteMarker || space) {
                                                return <span key={i}>{noteMarker}{space}</span>;
                                            }
                                        }

                                        return null;
                                    })();

                                    return (
                                        <React.Fragment key={i}>
                                            {needsSpace && <span> </span>}
                                            {contentElement}
                                        </React.Fragment>
                                    );
                                })}
                            </span>
                        )}
                        {' '}
                    </span >
                );
            }

            return null;
        });
    };

    // Helper to render commentary content
    const renderCommentaryContent = () => {
        if (commentaryLoading) {
            return <div className="flex justify-center p-4"><Loader2 className="animate-spin" /></div>;
        }
        if (!commentaryChapter) {
            return <p className="text-muted-foreground italic">No commentary available for this chapter.</p>;
        }

        // Commentary content structure is similar to Bible chapter
        return commentaryChapter.chapter.content.map((item, index) => {
            if (item.type === 'heading') {
                if (visibleVerses) return null;
                return <h4 key={index} className="font-bold mt-4 mb-2">{item.content.join(' ')}</h4>;
            }
            if (item.type === 'line_break') {
                if (visibleVerses) return null;
                return <br key={index} />;
            }
            if (item.type === 'verse') {
                if (visibleVerses && !visibleVerses.includes(item.number)) return null;

                return (
                    <p key={index} className="mb-2 text-sm">
                        <span className="font-bold text-primary mr-1">{item.number}</span>
                        {item.content.map((c, i) => {
                            if (typeof c === 'string') return c;
                            if ('text' in c) return c.text;
                            return null;
                        })}
                    </p>
                );
            }
            return null;
        });
    };

    // Helper to render profile content
    const renderProfileContent = () => {
        if (!selectedProfile) return null;
        return selectedProfile.content.map((item, index) => {
            if (item.type === 'heading') {
                return <h4 key={index} className="font-bold mt-4 mb-2">{item.content.join(' ')}</h4>;
            }
            if (item.type === 'line_break') {
                return <br key={index} />;
            }
            if (item.type === 'verse') {
                return (
                    <p key={index} className="mb-2 text-sm">
                        {item.content.map((c, i) => {
                            if (typeof c === 'string') return c;
                            if ('text' in c) return c.text;
                            return null;
                        })}
                    </p>
                );
            }
            return null;
        });
    };

    if (loading && !bsbChapter) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading scripture...</p>
            </div>
        );
    }
    if (error || !bsbChapter) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <h3 className="text-lg font-semibold">Error Loading Chapter</h3>
                <p className="text-muted-foreground max-w-md">{error}</p>
                <button
                    onClick={() => navigate('/bible')}
                    className="text-primary hover:underline"
                >
                    Return to Bible Home
                </button>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-6 relative max-w-7xl mx-auto px-4">
            <Breadcrumbs
                items={[
                    { label: 'Bible', to: '/bible' },
                    { label: bsbChapter.book.name, to: '#' },
                    { label: `Chapter ${bsbChapter.chapter.number}` }
                ]}
            />

            <div className="flex gap-6 relative">
                <div className={`flex-1 max-w-3xl mx-auto pb-20 animate-fade-in transition-all ${showCommentary ? 'lg:mr-[320px]' : ''}`}>
                    {/* Navigation Header */}
                    <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 mb-6 flex flex-col sm:flex-row items-center justify-between rounded-b-xl shadow-sm gap-4">
                        <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                                onClick={handlePrev}
                                disabled={!bsbChapter.previousChapterApiLink}
                                className="p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors shrink-0"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setShowQuickNav(true)}
                                className="flex items-center gap-2 px-3 py-1.5 hover:bg-accent/10 rounded-lg transition-colors text-left min-w-[140px]"
                            >
                                <Grid className="w-5 h-5 text-primary" />
                                <div>
                                    <h2 className="text-lg font-bold leading-none">{bsbChapter.book.name} {bsbChapter.chapter.number}</h2>
                                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{selectedTranslation}</p>
                                </div>
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!bsbChapter.nextChapterApiLink}
                                className="p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors shrink-0 sm:hidden"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Universal Search Bar */}
                        <form onSubmit={handleUniversalSearch} className="relative w-full sm:max-w-xs">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <input
                                type="text"
                                placeholder="Search (e.g. John 3:16)"
                                className="w-full pl-9 pr-4 py-2 bg-secondary/10 border-transparent rounded-full focus:ring-2 focus:ring-primary focus:bg-background transition-all text-sm"
                                value={universalSearchQuery}
                                onChange={(e) => setUniversalSearchQuery(e.target.value)}
                            />
                        </form>

                        <div className="flex items-center gap-2 hidden sm:flex">
                            <button
                                onClick={() => setShowTranslations(true)}
                                className="p-2 hover:bg-accent/10 rounded-full transition-colors"
                                title="Change Translation"
                            >
                                <Globe className="w-5 h-5 text-muted-foreground" />
                            </button>
                            <button
                                onClick={handleNext}
                                disabled={!bsbChapter.nextChapterApiLink}
                                className="p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    {/* Active Filter Indicator */}
                    {visibleVerses && (
                        <div className="mb-4 p-3 bg-primary/10 rounded-lg flex items-center justify-between animate-fade-in">
                            <span className="text-sm font-medium">
                                Showing verses {visibleVerses[0]} - {visibleVerses[visibleVerses.length - 1]}
                            </span>
                            <button
                                onClick={() => setVisibleVerses(null)}
                                className="text-xs flex items-center text-primary hover:underline"
                            >
                                <Eye className="w-3 h-3 mr-1" /> Show Full Chapter
                            </button>
                        </div>
                    )}

                    {/* Chapter Content */}
                    <div className={`prose prose-lg dark:prose-invert max-w-none px-4 ${loading ? 'opacity-50' : ''}`}>
                        {renderContent(bsbChapter.chapter.content, msbChapter?.chapter.content)}
                    </div>
                </div>

                {/* Commentary Sidebar/Modal */}
                {showCommentary && (
                    <>
                        {/* Mobile Overlay */}
                        <div className="lg:hidden fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setShowCommentary(false)} />

                        <div className="fixed z-50 bg-card border border-border shadow-2xl flex flex-col lg:right-4 lg:top-24 lg:bottom-4 lg:w-[400px] lg:rounded-xl inset-4 rounded-xl lg:inset-auto animate-in slide-in-from-right duration-300">
                            <div className="flex items-center justify-between mb-4 shrink-0 p-4 pb-0">
                                <h3 className="font-bold text-lg flex items-center">
                                    <MessageSquare className="w-4 h-4 mr-2 text-primary" /> Commentary
                                </h3>
                                <button onClick={() => setShowCommentary(false)} className="text-muted-foreground hover:text-foreground">
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
                                        className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'chapter' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                        onClick={() => setCommentaryTab('chapter')}
                                    >
                                        Chapter
                                    </button>
                                    <button
                                        className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'intro' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                        onClick={() => setCommentaryTab('intro')}
                                    >
                                        Book Intro
                                    </button>
                                    <button
                                        className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'footnotes' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                        onClick={() => setCommentaryTab('footnotes')}
                                    >
                                        Footnotes
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 overflow-y-auto px-4 pb-4 custom-scrollbar">
                                {commentaryTab === 'chapter' && renderCommentaryContent()}
                                {commentaryTab === 'intro' && (
                                    <div className="prose prose-sm dark:prose-invert">
                                        {commentaryChapter?.book.introduction ? (
                                            <div dangerouslySetInnerHTML={{ __html: commentaryChapter.book.introduction }} />
                                        ) : (
                                            <div className="flex flex-col items-center justify-center h-full text-muted-foreground py-10">
                                                <p className="italic">No introduction available.</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                                {commentaryTab === 'footnotes' && (
                                    <div className="space-y-4">
                                        {bsbChapter?.chapter.footnotes && bsbChapter.chapter.footnotes.length > 0 ? (
                                            bsbChapter.chapter.footnotes.map((note) => (
                                                <div key={note.noteId} id={`footnote-${note.noteId}`} className="text-sm p-3 bg-secondary/10 rounded-lg">
                                                    <div className="flex items-baseline gap-2 mb-1">
                                                        <span className="font-bold text-primary text-xs bg-primary/10 px-1.5 py-0.5 rounded">
                                                            {note.caller || '+'}
                                                        </span>
                                                        {note.reference && (
                                                            <span className="text-xs text-muted-foreground uppercase tracking-wider">
                                                                Verse {note.reference.verse}
                                                            </span>
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
                                )}
                            </div>
                        </div>
                    </>
                )}
            </div>

            {/* Profile Modal */}
            {showProfileModal && (
                <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={() => setShowProfileModal(false)}>
                    <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-2xl max-h-[85vh] flex flex-col relative" onClick={e => e.stopPropagation()}>
                        <button
                            onClick={() => setShowProfileModal(false)}
                            className="absolute right-4 top-4 p-2 hover:bg-accent/10 rounded-full z-10"
                        >
                            <X className="w-6 h-6" />
                        </button>

                        {profileLoading ? (
                            <div className="flex flex-col items-center justify-center h-64">
                                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                                <p className="text-muted-foreground">Loading profile...</p>
                            </div>
                        ) : selectedProfile ? (
                            <div className="flex flex-col h-full overflow-hidden">
                                <div className="p-6 border-b border-border bg-secondary/5">
                                    <h2 className="text-2xl font-bold mb-1">{selectedProfile.name}</h2>
                                    <p className="text-sm text-muted-foreground">Biblical Profile</p>
                                </div>
                                <div className="overflow-y-auto p-6 prose prose-lg dark:prose-invert max-w-none">
                                    {renderProfileContent()}
                                </div>
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center h-64 text-center p-6">
                                <AlertCircle className="w-12 h-12 text-muted-foreground mb-4" />
                                <h3 className="text-lg font-semibold">Profile Not Found</h3>
                                <p className="text-muted-foreground">Could not load profile data.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Quick Nav Modal */}
            {showQuickNav && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl flex flex-col max-h-[85vh]">
                        <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                            <h3 className="font-bold text-lg">
                                {navStep === 'books' ? 'Select Book' : `Select Chapter (${selectedNavBook?.name})`}
                            </h3>
                            <button onClick={() => { setShowQuickNav(false); setNavStep('books'); setSelectedNavBook(null); setBookSearchQuery(''); }} className="p-2 hover:bg-accent/10 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {navStep === 'books' && (
                            <div className="p-4 border-b border-border space-y-3 shrink-0">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <input
                                        type="text"
                                        placeholder="Search books..."
                                        className="w-full pl-9 pr-4 py-2 bg-secondary/10 border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                        value={bookSearchQuery}
                                        onChange={(e) => setBookSearchQuery(e.target.value)}
                                        autoFocus
                                    />
                                </div>
                                <div className="flex gap-2 overflow-x-auto pb-1">
                                    {(['ALL', 'OT', 'NT', 'ALPHA'] as const).map(filter => (
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

                        <div className="overflow-y-auto p-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
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
                        {navStep === 'chapters' && (
                            <div className="p-4 border-t border-border shrink-0">
                                <button onClick={() => setNavStep('books')} className="text-sm text-primary hover:underline flex items-center">
                                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Books
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Translations Modal */}
            {showTranslations && (
                <div className="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
                    <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-lg max-h-[80vh] flex flex-col">
                        <div className="p-4 border-b border-border flex items-center justify-between shrink-0">
                            <h3 className="font-bold text-lg">Select Translation</h3>
                            <button onClick={() => setShowTranslations(false)} className="p-2 hover:bg-accent/10 rounded-full">
                                <X className="w-6 h-6" />
                            </button>
                        </div>
                        <div className="p-4 border-b border-border space-y-3 shrink-0">
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search language or translation..."
                                    className="w-full pl-9 pr-4 py-2 bg-secondary/10 border-transparent rounded-lg focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                    value={translationSearch}
                                    onChange={(e) => setTranslationSearch(e.target.value)}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <Filter className="w-4 h-4 text-muted-foreground" />
                                <select
                                    className="flex-1 bg-secondary/10 border-transparent rounded-lg py-2 px-3 text-sm focus:ring-2 focus:ring-primary focus:bg-background transition-all"
                                    value={languageFilter}
                                    onChange={(e) => setLanguageFilter(e.target.value)}
                                >
                                    {availableLanguages.map(lang => (
                                        <option key={lang} value={lang}>{lang}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="overflow-y-auto p-2 space-y-1">
                            {filteredTranslations.map(t => (
                                <button
                                    key={t.id}
                                    onClick={() => { setSelectedTranslation(t.id); setShowTranslations(false); }}
                                    className={`w-full text-left p-3 rounded-lg transition-colors flex items-center justify-between group ${selectedTranslation === t.id ? 'bg-primary/10' : 'hover:bg-accent/10'
                                        }`}
                                >
                                    <div>
                                        <div className={`font-bold ${selectedTranslation === t.id ? 'text-primary' : ''}`}>
                                            {t.name} <span className="text-xs font-normal text-muted-foreground ml-1">({t.shortName})</span>
                                        </div>
                                        <div className="text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                                            {t.languageEnglishName || t.language}
                                        </div>
                                    </div>
                                    {selectedTranslation === t.id && <div className="w-2 h-2 rounded-full bg-primary" />}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Footer Controls */}
            <div className="fixed bottom-6 right-6 flex gap-2 z-40">
                {msbChapter && selectedTranslation !== 'eng_msb' && (
                    <button
                        onClick={() => setShowMsb(!showMsb)}
                        className={`p-3 rounded-full shadow-lg transition-all ${showMsb
                            ? 'bg-secondary text-secondary-foreground'
                            : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                            }`}
                        title="Toggle MSB Comparison"
                    >
                        <BookOpen className="w-5 h-5" />
                    </button>
                )}
                <button
                    onClick={() => setShowCommentary(!showCommentary)}
                    className={`p-3 rounded-full shadow-lg transition-all ${showCommentary
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-card border border-border text-muted-foreground hover:text-foreground'
                        }`}
                    title="Toggle Commentary"
                >
                    <MessageSquare className="w-5 h-5" />
                </button>
                {/* Footnote Popover */}
                {activeFootnote && (
                    <div
                        className="fixed z-50 bg-popover text-popover-foreground p-4 rounded-lg shadow-xl border border-border max-w-xs animate-in fade-in zoom-in-95 duration-200"
                        style={{
                            left: activeFootnote.x,
                            top: activeFootnote.y + 20, // Position slightly below
                            transform: 'translateX(-50%)'
                        }}
                        onMouseEnter={() => {
                            if (hoverTimeout) clearTimeout(hoverTimeout);
                            if (closeTimeout) {
                                clearTimeout(closeTimeout);
                                setCloseTimeout(null);
                            }
                        }}
                        onMouseLeave={handleFootnoteLeave}
                    >
                        <div className="text-sm">
                            <div className="font-bold mb-1 flex items-center justify-between">
                                <span>Footnote</span>
                                <button onClick={handleFootnoteLeave} className="text-muted-foreground hover:text-foreground md:hidden">
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                            <p className="mb-2 leading-relaxed">
                                {bsbChapter?.chapter.footnotes.find(n => n.noteId === activeFootnote?.id)?.text}
                            </p>
                            <button
                                onClick={() => {
                                    if (activeFootnote) {
                                        handleFootnoteClick(activeFootnote.id);
                                        setActiveFootnote(null);
                                    }
                                }}
                                className="text-xs text-primary hover:underline font-medium"
                            >
                                View in Sidebar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>


    );
}
