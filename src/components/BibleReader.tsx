import React, { useState, useEffect, useMemo } from 'react';
import { useParams, useNavigate, useLocation, useNavigationType, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, BookOpen, Loader2, AlertCircle, MessageSquare, Grid, Globe, X, Search, Filter, Eye, Link as LinkIcon } from 'lucide-react';
import { getChapter, getBooks, getTranslations, getCommentaries, getCommentaryChapter, getProfiles, getProfile, getDatasetChapter } from '../data/bibleApi';
import type { BibleChapter, ChapterContent, BibleBook, BibleTranslation, Commentary, CommentaryChapter, Profile, ProfileContent, ChapterFootnote, DatasetBookChapter } from '../data/bibleApi';
import Breadcrumbs from './Breadcrumbs';
import QuickNav from './QuickNav';
import { diffVerses, type DiffToken } from '../utils/diffUtils';

// Helper to get text content from verse parts
const getText = (content: (string | { text: string; wordsOfJesus?: boolean } | { noteId: number } | { lineBreak: boolean })[]) =>
    content.map(c => {
        if (typeof c === 'string') return c;
        if ('text' in c) return c.text;
        return '';
    }).join('').trim();

// Helper to sort references by score (desc) then book order (asc)
const getSortedReferences = (refs: any[], books: BibleBook[]) => {
    return [...refs].sort((a, b) => {
        // 1. Score Descending
        if ((a.score || 0) !== (b.score || 0)) {
            return (b.score || 0) - (a.score || 0);
        }
        // 2. Book Order Ascending
        const bookA = books.find(book => book.id === a.book);
        const bookB = books.find(book => book.id === b.book);
        if (bookA && bookB) {
            if (bookA.order !== bookB.order) return bookA.order - bookB.order;
        }
        // 3. Chapter/Verse Ascending
        if (a.chapter !== b.chapter) return a.chapter - b.chapter;
        return a.verse - b.verse;
    });
};

export default function BibleReader() {
    const { bookId, chapter, verseRange } = useParams<{ bookId: string; chapter: string; verseRange?: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const navType = useNavigationType();

    // Scroll to top on new navigation, but respect back button
    useEffect(() => {
        if (navType !== 'POP') {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, navType]);

    const [bsbChapter, setBsbChapter] = useState<BibleChapter | null>(null);
    const [msbChapter, setMsbChapter] = useState<BibleChapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const [showMsb, setShowMsb] = useState(false);

    // Cross Reference State
    const [crossRefs, setCrossRefs] = useState<DatasetBookChapter | null>(null);
    const [expandedRefTexts, setExpandedRefTexts] = useState<Record<string, string>>({});
    const [loadingRefs, setLoadingRefs] = useState<Record<string, boolean>>({});

    // Commentary State
    const [showCommentary, setShowCommentary] = useState(false);
    const [commentaries, setCommentaries] = useState<Commentary[]>([]);
    const [selectedCommentaryId, setSelectedCommentaryId] = useState<string>('');
    const [commentaryChapter, setCommentaryChapter] = useState<CommentaryChapter | null>(null);
    const [commentaryLoading, setCommentaryLoading] = useState(false);
    const [commentaryTab, setCommentaryTab] = useState<'chapter' | 'intro' | 'footnotes' | 'references'>('chapter');


    // Profile State
    const [profiles, setProfiles] = useState<Profile[]>([]);
    const [selectedProfile, setSelectedProfile] = useState<ProfileContent | null>(null);
    const [showProfileModal, setShowProfileModal] = useState(false);

    // Footnotes State
    const [showFootnotes, setShowFootnotes] = useState(true);
    const [activeFootnote, setActiveFootnote] = useState<{ id: number; x: number; y: number } | null>(null);
    const [hoverTimeout, setHoverTimeout] = useState<NodeJS.Timeout | null>(null);
    const [closeTimeout, setCloseTimeout] = useState<NodeJS.Timeout | null>(null);
    const [refPopover, setRefPopover] = useState<{ verse: number; x: number; y: number; refs: any[] } | null>(null);

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
    const [viewMode, setViewMode] = useState<'full' | 'focus'>('full');
    const [resolvedBookId, setResolvedBookId] = useState<string | null>(null);
    const [sidebarScrollTarget, setSidebarScrollTarget] = useState<number | null>(null);

    // Resolve bookId from URL to API ID
    useEffect(() => {
        if (!bookId) return;
        if (books.length === 0) {
            // If books aren't loaded yet, we can't resolve names efficiently.
            // However, we might be able to assume it's an ID if it's 3 chars?
            // Better to wait for books. But we need to handle the initial load.
            // For now, let's just pass it through if books are empty, but this might cause a double fetch if it's a name.
            // Actually, let's just wait for books.
            return;
        }

        // Check if bookId is already a valid ID
        const directMatch = books.find(b => b.id === bookId);
        if (directMatch) {
            setResolvedBookId(directMatch.id);
            return;
        }

        // Try to find by name
        const normalizedUrlId = bookId.toLowerCase().replace(/\s+/g, '');
        const nameMatch = books.find(b =>
            b.name.toLowerCase().replace(/\s+/g, '') === normalizedUrlId ||
            b.commonName.toLowerCase().replace(/\s+/g, '') === normalizedUrlId
        );

        if (nameMatch) {
            setResolvedBookId(nameMatch.id);
        } else {
            setResolvedBookId(bookId); // Fallback
        }
    }, [bookId, books]);

    // Parse highlighted range from URL param
    const { highlightStart, highlightEnd } = useMemo(() => {
        let start: number | null = null;
        let end: number | null = null;

        if (verseRange) {
            const rangeMatch = verseRange.match(/^(\d+)(?:-(\d+))?$/);
            if (rangeMatch) {
                start = parseInt(rangeMatch[1]!);
                end = rangeMatch[2] ? parseInt(rangeMatch[2]) : start;
            }
        }
        return { highlightStart: start, highlightEnd: end };
    }, [verseRange]);

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
                    const defaultComm = commentariesData.find(c => c.id === 'MHC') || commentariesData[0]!;
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
            if (!resolvedBookId || !chapter) return;

            setLoading(true);
            setError(null);
            setExpandedRefTexts({}); // Reset expanded refs on navigation

            try {
                // Fetch Primary Translation
                const primaryData = await getChapter(selectedTranslation, resolvedBookId, parseInt(chapter));
                setBsbChapter(primaryData);

                // Fetch MSB (comparison) - only if primary is BSB
                if (selectedTranslation === 'BSB') {
                    try {
                        const msbData = await getChapter('eng_msb', resolvedBookId, parseInt(chapter));
                        setMsbChapter(msbData);
                    } catch (e) {
                        console.warn('MSB not available for this chapter');
                        setMsbChapter(null);
                    }
                } else {
                    setMsbChapter(null); // No comparison if not reading BSB
                }

                // Fetch Cross References (open-cross-ref)
                try {
                    const crossRefData = await getDatasetChapter('open-cross-ref', resolvedBookId, parseInt(chapter));
                    setCrossRefs(crossRefData);
                } catch (e) {
                    console.warn('Cross references not available', e);
                    setCrossRefs(null);
                }

            } catch (err) {
                console.error('Error fetching chapter:', err);
                setError('Failed to load chapter. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [resolvedBookId, chapter, selectedTranslation]);

    // Scroll to highlighted verse
    useEffect(() => {
        if (!loading && verseRange) {
            const rangeMatch = verseRange.match(/^(\d+)/);
            if (rangeMatch) {
                const verseNum = rangeMatch[1];
                // Small delay to ensure rendering is complete
                setTimeout(() => {
                    const element = document.getElementById(`verse-${verseNum}`);
                    if (element) {
                        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                        // Optional: Add a temporary highlight class if needed, though we have persistent highlighting now
                    }
                }, 500);
            }
        }
    }, [loading, verseRange, bookId, chapter]);

    // Scroll sidebar to target verse when opened via icon
    useEffect(() => {
        if (showCommentary && commentaryTab === 'references' && sidebarScrollTarget) {
            setTimeout(() => {
                const element = document.getElementById(`sidebar-ref-verse-${sidebarScrollTarget}`);
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    // Optional: Add a temporary highlight to the sidebar section
                }
                setSidebarScrollTarget(null); // Reset after scrolling
            }, 300); // Small delay to allow sidebar to render
        }
    }, [showCommentary, commentaryTab, sidebarScrollTarget]);

    const scrollToVerseInView = (verseNum: number) => {
        const element = document.getElementById(`verse-${verseNum}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add temporary highlight
            element.classList.add('bg-yellow-100', 'dark:bg-yellow-900/50', 'transition-colors', 'duration-1000');
            setTimeout(() => {
                element.classList.remove('bg-yellow-100', 'dark:bg-yellow-900/50');
            }, 2000);
        }
    };

    const handleToggleRefText = async (refKey: string, book: string, chapter: number, verse: number) => {
        if (expandedRefTexts[refKey]) {
            const newExpanded = { ...expandedRefTexts };
            delete newExpanded[refKey];
            setExpandedRefTexts(newExpanded);
            return;
        }

        setLoadingRefs(prev => ({ ...prev, [refKey]: true }));
        try {
            const data = await getChapter(selectedTranslation, book, chapter);
            const verseContent = data.chapter.content.find(c => c.type === 'verse' && c.number === verse);

            if (verseContent && 'content' in verseContent) {
                const text = getText(verseContent.content);
                setExpandedRefTexts(prev => ({ ...prev, [refKey]: text }));
            } else {
                setExpandedRefTexts(prev => ({ ...prev, [refKey]: 'Verse text not available.' }));
            }
        } catch (e) {
            console.error("Failed to fetch reference text", e);
            setExpandedRefTexts(prev => ({ ...prev, [refKey]: 'Failed to load text.' }));
        } finally {
            setLoadingRefs(prev => ({ ...prev, [refKey]: false }));
        }
    };

    // Fetch Commentary Content
    useEffect(() => {
        const fetchCommentary = async () => {
            if (!resolvedBookId || !chapter || !showCommentary || !selectedCommentaryId) return;

            setCommentaryLoading(true);
            try {
                const data = await getCommentaryChapter(selectedCommentaryId, resolvedBookId, parseInt(chapter));
                setCommentaryChapter(data);
            } catch (e) {
                console.error("Failed to fetch commentary", e);
                setCommentaryChapter(null);
            } finally {
                setCommentaryLoading(false);
            }
        };

        fetchCommentary();
    }, [resolvedBookId, chapter, showCommentary, selectedCommentaryId]);


    const handleNext = () => {
        if (!bsbChapter) return;

        const currentChapterNum = parseInt(chapter || '1');

        if (currentChapterNum < bsbChapter.book.numberOfChapters) {
            // Next chapter in same book
            navigate(`/bible/read/${bsbChapter.book.name.replace(/\s+/g, '')}/${currentChapterNum + 1}`);
        } else if (books.length > 0) {
            // Next book
            const currentBookIndex = books.findIndex(b => b.id === bsbChapter.book.id);
            if (currentBookIndex !== -1 && currentBookIndex < books.length - 1) {
                const nextBook = books[currentBookIndex + 1]!;
                navigate(`/bible/read/${nextBook.name.replace(/\s+/g, '')}/1`);
            }
        }
    };

    const handlePrev = () => {
        if (!bsbChapter) return;

        const currentChapterNum = parseInt(chapter || '1');

        if (currentChapterNum > 1) {
            // Previous chapter in same book
            navigate(`/bible/read/${bsbChapter.book.name.replace(/\s+/g, '')}/${currentChapterNum - 1}`);
        } else if (books.length > 0) {
            // Previous book
            const currentBookIndex = books.findIndex(b => b.id === bsbChapter.book.id);
            if (currentBookIndex > 0) {
                const prevBook = books[currentBookIndex - 1]!;
                navigate(`/bible/read/${prevBook.name.replace(/\s+/g, '')}/${prevBook.numberOfChapters}`);
            }
        }
    };

    const handleBookSelect = (book: BibleBook) => {
        setSelectedNavBook(book);
        setNavStep('chapters');
    };

    const handleChapterSelect = (chapNum: number) => {
        navigate(`/bible/read/${selectedNavBook?.name.replace(/\s+/g, '')}/${chapNum}`);
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
                // Construct URL with verse range
                let url = `/bible/read/${book.name.replace(/\s+/g, '')}/${chapterNum}`;
                if (startVerse) {
                    url += `/${startVerse}`;
                    if (endVerse && endVerse !== startVerse) {
                        url += `-${endVerse}`;
                    }
                }

                navigate(url);
                setUniversalSearchQuery('');
                // If searching for specific verses, default to focus mode?
                // Maybe let the user decide, but for now we just navigate.
                // The existing logic will highlight them.
                if (startVerse) {
                    setViewMode('focus');
                } else {
                    setViewMode('full');
                }
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
        } finally {
            setProfileLoading(false);
        }
    };

    // Reference Popover Handlers
    const handleRefMouseEnter = (e: React.MouseEvent, verseNum: number, refs: any[]) => {
        if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch

        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }

        const rect = (e.target as HTMLElement).getBoundingClientRect();
        // Sort references before showing
        const sortedRefs = getSortedReferences(refs, books);

        const timeout = setTimeout(() => {
            setRefPopover({
                verse: verseNum,
                x: rect.left + rect.width / 2,
                y: rect.bottom + 5, // Position below the icon
                refs: sortedRefs
            });
        }, 300);
        setHoverTimeout(timeout);
    };

    const handleRefMouseLeave = () => {
        if (hoverTimeout) clearTimeout(hoverTimeout);

        const timeout = setTimeout(() => {
            setRefPopover(null);
        }, 300);
        setCloseTimeout(timeout);
    };

    const handleRefClick = (e: React.MouseEvent, verseNum: number, refs: any[]) => {
        e.stopPropagation();

        // Mobile: Toggle popover on tap
        if (window.matchMedia('(pointer: coarse)').matches) {
            if (refPopover?.verse === verseNum) {
                setRefPopover(null);
            } else {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                const sortedRefs = getSortedReferences(refs, books);
                setRefPopover({
                    verse: verseNum,
                    x: rect.left + rect.width / 2,
                    y: rect.top,
                    refs: sortedRefs
                });
            }
            return;
        }

        // Desktop: Click opens sidebar (Double click logic can be handled if needed, but single click is standard for "Open")
        // Implementation Plan asked for: Hover -> Popover, Click/DoubleTap -> Sidebar
        // So for desktop click:
        setCommentaryTab('references');
        setShowCommentary(true);
        setSidebarScrollTarget(verseNum); // Scroll sidebar to this verse
        // Also close popover
        setRefPopover(null);
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
        return (
            <>

                {content.map((item, index) => {
                    if (item.type === 'heading') {
                        if (viewMode === 'focus') return null;
                        return (
                            <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-primary">
                                {item.content.join(' ')}
                            </h3>
                        );
                    }

                    if (item.type === 'line_break') {
                        if (viewMode === 'focus') return null;
                        return <br key={index} />;
                    }

                    if (item.type === 'verse') {
                        // Filter logic

                        const msbVerse = msbContent?.find(v => v.type === 'verse' && v.number === item.number) as { type: 'verse', number: number, content: (string | { text: string, wordsOfJesus?: boolean })[] } | undefined;

                        // Get references for this verse
                        const verseRefs = crossRefs?.chapter.content.find(v => v.verse === item.number)?.references || [];
                        const hasCrossRefs = verseRefs.length > 0;

                        const isHighlighted = highlightStart !== null && highlightEnd !== null &&
                            item.number >= highlightStart && item.number <= highlightEnd;

                        // Focus Mode Filter
                        if (viewMode === 'focus' && highlightStart !== null && !isHighlighted) {
                            return null;
                        }

                        return (
                            <span
                                key={index}
                                id={`verse-${item.number}`}
                                className={`relative group ${isHighlighted ? "bg-yellow-100 dark:bg-yellow-900/30 transition-colors duration-1000 rounded px-1 -mx-1 box-decoration-clone" : ""}`}
                            >
                                <sup className="text-xs font-bold text-muted-foreground mr-1 select-none inline-flex items-center">
                                    {item.number}
                                    {hasCrossRefs && (
                                        <button
                                            onClick={(e) => handleRefClick(e, item.number, verseRefs)}
                                            onMouseEnter={(e) => handleRefMouseEnter(e, item.number, verseRefs)}
                                            onMouseLeave={handleRefMouseLeave}
                                            className="ml-0.5 text-primary/60 hover:text-primary transition-colors"
                                            title="View Cross References"
                                        >
                                            <LinkIcon className="w-2.5 h-2.5" />
                                        </button>
                                    )}
                                </sup>
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

                                                    // Simple name matching - this could be improved with more robust logic
                                                    // For now, we check if any profile name exists in the text
                                                    // We need to be careful not to match parts of words, so we use word boundaries

                                                    // Construct a regex from profile names
                                                    // Filter profiles to only those that are likely to be names (e.g. start with capital letter)
                                                    // and sort by length descending to match longest names first
                                                    const profileNames = profiles
                                                        .filter(p => /^[A-Z]/.test(p.subject))
                                                        .sort((a, b) => b.subject.length - a.subject.length);

                                                    if (profileNames.length > 0) {
                                                        // Create a regex that matches any of the profile names
                                                        // Use \b for word boundaries
                                                        const pattern = new RegExp(`\\b(${profileNames.map(p => p.subject).join('|')})\\b`, 'g');

                                                        let match;
                                                        while ((match = pattern.exec(text)) !== null) {
                                                            // Push text before match
                                                            if (match.index > lastIndex) {
                                                                elements.push(text.substring(lastIndex, match.index));
                                                            }

                                                            // Push the matched name as a link
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

                                                        // Push remaining text
                                                        if (lastIndex < text.length) {
                                                            elements.push(text.substring(lastIndex));
                                                        }

                                                        if (elements.length > 0) {
                                                            return <span key={i}>{elements}</span>;
                                                        }
                                                    }

                                                    return <span key={i}>{c}</span>;
                                                }
                                                // Handle object content
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
                })}
            </>
        );
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
                return <h4 key={index} className="font-bold mt-4 mb-2">{item.content.join(' ')}</h4>;
            }
            if (item.type === 'line_break') {
                return <br key={index} />;
            }
            if (item.type === 'verse') {
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

    const isFirstBook = books.length > 0 && bsbChapter.book.id === books[0]?.id;
    const isLastBook = books.length > 0 && bsbChapter.book.id === books[books.length - 1]?.id;
    const isFirstChapter = bsbChapter.chapter.number === 1;
    const isLastChapter = bsbChapter.chapter.number === bsbChapter.book.numberOfChapters;

    const canGoPrev = !!bsbChapter.previousChapterApiLink || (!isFirstBook);
    const canGoNext = !!bsbChapter.nextChapterApiLink || (!isLastBook);

    const toggleVerseRefs = async (verseNum: number, refs: any[]) => {
        const refsForVerse = refs.map(r => ({ ...r, verseNum }));
        const keys = refsForVerse.map(r => `${r.book}-${r.chapter}-${r.verse}`);
        const anyExpanded = keys.some(k => expandedRefTexts[k]);

        if (anyExpanded) {
            // Collapse all for this verse
            const newExpanded = { ...expandedRefTexts };
            keys.forEach(k => delete newExpanded[k]);
            setExpandedRefTexts(newExpanded);
        } else {
            // Expand all for this verse
            const newExpanded = { ...expandedRefTexts };
            const newLoading = { ...loadingRefs };

            // Mark loading
            keys.forEach(k => newLoading[k] = true);
            setLoadingRefs(newLoading);

            // Fetch
            await Promise.all(refsForVerse.map(async (ref) => {
                const refKey = `${ref.book}-${ref.chapter}-${ref.verse}`;
                if (!newExpanded[refKey]) {
                    try {
                        const data = await getChapter(selectedTranslation, ref.book, ref.chapter);
                        const verseContent = data.chapter.content.find(c => c.type === 'verse' && c.number === ref.verse);
                        if (verseContent && 'content' in verseContent) {
                            newExpanded[refKey] = getText(verseContent.content);
                        } else {
                            newExpanded[refKey] = 'Text not available.';
                        }
                    } catch (e) {
                        newExpanded[refKey] = 'Failed to load.';
                    }
                }
            }));

            setExpandedRefTexts(newExpanded);
            setLoadingRefs({});
        }
    };

    // Popover State


    return (
        <div className="flex flex-col gap-6 relative max-w-7xl mx-auto px-4">
            <Breadcrumbs
                items={[
                    { label: 'Bible', to: '/bible' },
                    { label: bsbChapter.book.name, to: `/bible/read/${bsbChapter.book.name.replace(/\s+/g, '')}` },
                    { label: `Chapter ${bsbChapter.chapter.number}` }
                ]}
            />

            <div className="flex gap-6 relative">
                <div className={`flex-1 max-w-3xl mx-auto pb-20 animate-fade-in transition-all ${showCommentary ? 'lg:mr-[320px]' : ''}`}>
                    {/* Navigation Header */}
                    <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md border-b border-border mb-6 rounded-b-xl shadow-sm flex flex-col">
                        <div className="p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-2 w-full sm:w-auto">
                                <button
                                    onClick={handlePrev}
                                    disabled={!canGoPrev}
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
                                    disabled={!canGoNext}
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
                                    disabled={!canGoNext}
                                    className="p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>
                        </div>

                        {/* Highlighted Verses Notice Banner */}
                        {highlightStart !== null && (
                            <div className="px-4 py-2 bg-yellow-100/90 dark:bg-yellow-900/40 border-t border-yellow-200 dark:border-yellow-800 flex items-center justify-between animate-in slide-in-from-top-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">Highlighted Verses: {highlightStart}{highlightEnd && highlightEnd !== highlightStart ? `-${highlightEnd}` : ''}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setViewMode(viewMode === 'full' ? 'focus' : 'full')}
                                        className="text-xs font-medium px-2 py-1 rounded bg-yellow-200/50 dark:bg-yellow-800/50 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors flex items-center gap-1"
                                    >
                                        {viewMode === 'full' ? <Eye className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                                        {viewMode === 'full' ? 'Focus View' : 'Show Full Chapter'}
                                    </button>
                                    <button onClick={() => navigate(`/bible/read/${bsbChapter.book.name.replace(/\s+/g, '')}/${chapter}`)} className="text-xs text-primary hover:underline">Clear</button>
                                </div>
                            </div>
                        )}
                    </div>

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
                                    <button
                                        className={`flex-1 pb-2 text-sm font-medium transition-colors ${commentaryTab === 'references' ? 'border-b-2 border-primary text-primary' : 'text-muted-foreground hover:text-foreground'}`}
                                        onClick={() => setCommentaryTab('references')}
                                    >
                                        Refs
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
                                {commentaryTab === 'references' && (
                                    <div className="space-y-6">
                                        <div className="flex items-center justify-between mb-2">
                                            <span className="text-xs font-medium text-muted-foreground">
                                                {crossRefs?.chapter.content.reduce((acc, v) => acc + v.references.length, 0)} References
                                            </span>
                                        </div>
                                        {crossRefs?.chapter.content.filter(v => v.references.length > 0).map(v => {
                                            const verseRefs = v.references.map(r => ({ ...r, verseNum: v.verse }));
                                            const allKeys = verseRefs.map(r => `${r.book}-${r.chapter}-${r.verse}`);
                                            const anyExpanded = allKeys.some(k => expandedRefTexts[k]);

                                            return (
                                                <div key={v.verse} id={`sidebar-ref-verse-${v.verse}`} className="border-b border-border/50 pb-4 last:border-0">
                                                    <div className="font-bold text-sm mb-2 flex items-center justify-between">
                                                        <button
                                                            onClick={() => scrollToVerseInView(v.verse)}
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
                                                        {v.references.map((ref, i) => {
                                                            const refKey = `${ref.book}-${ref.chapter}-${ref.verse}`;
                                                            const isExpanded = !!expandedRefTexts[refKey];
                                                            const isLoading = !!loadingRefs[refKey];

                                                            return (
                                                                <div
                                                                    key={i}
                                                                    className="flex flex-col bg-card hover:bg-secondary/10 rounded transition-colors border border-transparent hover:border-border/50 cursor-pointer"
                                                                    onClick={() => handleToggleRefText(refKey, ref.book, ref.chapter, ref.verse)}
                                                                >
                                                                    <div className="flex items-center justify-between p-2">
                                                                        {(() => {
                                                                            const refBook = books.find(b => b.id === ref.book);
                                                                            const bookName = refBook ? refBook.name : ref.book;
                                                                            const bookUrlName = refBook ? refBook.name.replace(/\s+/g, '') : ref.book;

                                                                            return (
                                                                                <Link
                                                                                    to={`/bible/read/${bookUrlName}/${ref.chapter}/${ref.verse}${ref.endVerse ? `-${ref.endVerse}` : ''}`}
                                                                                    className="text-sm font-medium text-foreground/80 hover:text-primary flex-1 truncate mr-2"
                                                                                    onClick={(e) => e.stopPropagation()} // Stop propagation to prevent toggle
                                                                                >
                                                                                    {bookName} {ref.chapter}:{ref.verse}{ref.endVerse ? `-${ref.endVerse}` : ''}
                                                                                </Link>
                                                                            );
                                                                        })()}
                                                                        <div className="flex items-center gap-2">
                                                                            {ref.score && (
                                                                                <span
                                                                                    className="text-[10px] text-muted-foreground bg-secondary/20 px-1.5 py-0.5 rounded hidden sm:inline-block cursor-help"
                                                                                    title="Relevance Score"
                                                                                >
                                                                                    {ref.score}
                                                                                </span>
                                                                            )}
                                                                            <button
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
                                                                                    <p className="leading-relaxed italic">
                                                                                        "{expandedRefTexts[refKey]}"
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
            <QuickNav
                isOpen={showQuickNav}
                onClose={() => setShowQuickNav(false)}
                books={books}
                onNavigate={(bookId, chapter) => {
                    const bookName = books.find(b => b.id === bookId)?.name.replace(/\s+/g, '') || bookId;
                    navigate(`/bible/read/${bookName}/${chapter}`);
                }}
                onNavigateToBookOverview={(bookId) => {
                    const bookName = books.find(b => b.id === bookId)?.name.replace(/\s+/g, '') || bookId;
                    navigate(`/bible/read/${bookName}`);
                }}
            />

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

            {/* Reference Popover */}
            {refPopover && (
                <div
                    className="fixed z-50 bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg border border-border animate-in fade-in zoom-in-95 duration-200 max-w-xs pointer-events-auto"
                    style={{ top: refPopover.y, left: refPopover.x, transform: 'translateX(-50%)' }}
                    onMouseEnter={() => {
                        if (closeTimeout) {
                            clearTimeout(closeTimeout);
                            setCloseTimeout(null);
                        }
                    }}
                    onMouseLeave={handleRefMouseLeave}
                >
                    <div className="text-xs font-bold mb-1 border-b border-border/50 pb-1 flex justify-between items-center">
                        <span>{refPopover.refs.length} Cross Reference{refPopover.refs.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="space-y-1">
                        {refPopover.refs.slice(0, 3).map((ref, i) => {
                            const refBook = books.find(b => b.id === ref.book);
                            const bookName = refBook ? refBook.name : ref.book;
                            const bookUrlName = refBook ? refBook.name.replace(/\s+/g, '') : ref.book;

                            return (
                                <Link
                                    key={i}
                                    to={`/bible/read/${bookUrlName}/${ref.chapter}/${ref.verse}${ref.endVerse ? `-${ref.endVerse}` : ''}`}
                                    className="text-xs flex justify-between gap-4 hover:bg-secondary/20 p-1 rounded transition-colors"
                                    onClick={(e) => {
                                        e.stopPropagation(); // Prevent bubbling
                                        setRefPopover(null); // Close popover on navigation
                                    }}
                                >
                                    <span className="font-medium text-primary hover:underline">{bookName} {ref.chapter}:{ref.verse}</span>
                                    {ref.score && <span className="opacity-70 text-[10px]">{ref.score}</span>}
                                </Link>
                            );
                        })}
                        {refPopover.refs.length > 3 && (
                            <div className="text-[10px] text-muted-foreground italic pt-1 px-1">
                                + {refPopover.refs.length - 3} more...
                            </div>
                        )}
                    </div>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setCommentaryTab('references');
                            setShowCommentary(true);
                            setRefPopover(null);
                        }}
                        className="w-full mt-2 text-[10px] text-primary/80 font-medium text-center bg-primary/5 hover:bg-primary/10 rounded py-0.5 transition-colors"
                    >
                        View all in Sidebar
                    </button>
                </div>
            )}
        </div>
    );
}
