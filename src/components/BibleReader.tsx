import React, { useState, useEffect, useMemo, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useParams, useNavigate, useLocation, useNavigationType, Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ChevronDown, ChevronUp, BookOpen, Loader2, AlertCircle, MessageSquare, Grid, Globe, X, Search, Filter, Eye, Link as LinkIcon, Columns, ArrowLeft, ArrowRight, History, WifiOff } from 'lucide-react';
import { getChapter, getBooks, getTranslations, getCommentaries, getCommentaryChapter, getProfiles, getProfile, getDatasetChapter } from '../data/bibleApi';
import type { BibleChapter, ChapterContent, BibleBook, BibleTranslation, Commentary, CommentaryChapter, Profile, ProfileContent, ChapterFootnote, DatasetBookChapter } from '../data/bibleApi';

import QuickNav from './QuickNav';
import { diffVerses, type DiffToken } from '../utils/diffUtils';
import { formatPassageText, shouldInsertSpace, formatChapterContent } from '../utils/bibleUtils';
import { useScrollDirection } from '../hooks/useScrollDirection';
import { useSettings } from '../context/SettingsContext';
import { getBookMnemonic, getChapterMnemonic, getVerseMnemonic, getMnemonicHighlightIndex } from '../utils/mnemonicUtils';
import BibleSidebar from './BibleSidebar';
import { getSortedReferences } from '../utils/bibleUtils';

export default function BibleReader() {
    const { bookId, chapter, verseRange } = useParams<{ bookId: string; chapter: string; verseRange?: string }>();
    const navigate = useNavigate();
    const location = useLocation();
    const navType = useNavigationType();

    // Scroll to top on new navigation
    useEffect(() => {
        if (navType !== 'POP' && !(location.state as any)?.preserveScroll) {
            window.scrollTo(0, 0);
        }
    }, [location.pathname, navType, chapter, bookId, location.state]);

    const [bsbChapter, setBsbChapter] = useState<BibleChapter | null>(null);
    const [msbChapter, setMsbChapter] = useState<BibleChapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [profileLoading, setProfileLoading] = useState(false);
    const { selectedTranslation, setSelectedTranslation, showMsb, setShowMsb, readerMode, showMnemonics, showVerseMnemonics, isOffline } = useSettings();

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

    // Auto-close popovers on scroll
    useEffect(() => {
        const handleScroll = () => {
            if (activeFootnote) setActiveFootnote(null);
            if (refPopover) setRefPopover(null);
        };

        // Add a small delay before attaching the listener to prevent immediate triggering on touch
        const timeout = setTimeout(() => {
            window.addEventListener('scroll', handleScroll, { passive: true });
        }, 100);

        return () => {
            clearTimeout(timeout);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [activeFootnote, refPopover]);

    // Quick Nav & Translation State
    // Quick Nav State
    const [showQuickNav, setShowQuickNav] = useState(false);
    const [translations, setTranslations] = useState<BibleTranslation[]>([]);
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [navStep, setNavStep] = useState<'books' | 'chapters'>('books');
    const [selectedNavBook, setSelectedNavBook] = useState<BibleBook | null>(null);

    // Enhanced Selectors State
    const [bookFilter, setBookFilter] = useState<'ALL' | 'OT' | 'NT' | 'ALPHA'>('ALL');
    const [bookSearchQuery, setBookSearchQuery] = useState('');

    // Universal Search & Filtering State
    const [universalSearchQuery, setUniversalSearchQuery] = useState('');
    const searchInputRef = useRef<HTMLInputElement>(null);
    const [viewMode, setViewMode] = useState<'full' | 'focus'>('full');

    const [sidebarScrollTarget, setSidebarScrollTarget] = useState<number | null>(null);
    const [isSearchExpanded, setIsSearchExpanded] = useState(false);

    // Navigation State
    const [canGoBack, setCanGoBack] = useState(true);
    const [canGoForward, setCanGoForward] = useState(false);

    // Update navigation state on location change
    useEffect(() => {
        if (typeof window !== 'undefined' && 'navigation' in window) {
            // @ts-ignore - Navigation API
            setCanGoBack(window.navigation.canGoBack);
            // @ts-ignore - Navigation API
            setCanGoForward(window.navigation.canGoForward);
        }
    }, [location]);

    // Swipe Navigation State
    const [touchStart, setTouchStart] = useState<{ x: number, y: number } | null>(null);
    const [touchEnd, setTouchEnd] = useState<{ x: number, y: number } | null>(null);
    const [swipeAxis, setSwipeAxis] = useState<'horizontal' | 'vertical' | null>(null);
    const [translateX, setTranslateX] = useState(0);
    const { scrollDirection, isAtTop } = useScrollDirection();

    // Mnemonic Interaction State
    const [activeVerse, setActiveVerse] = useState<number | null>(null);

    // History State
    const [history, setHistory] = useState<{ label: string; path: string }[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // Update History
    useEffect(() => {
        if (bsbChapter) {
            const label = `${bsbChapter.book.name} ${bsbChapter.chapter.number}`;
            const path = `/bible/read/${bsbChapter.book.name.replace(/\s+/g, '')}/${bsbChapter.chapter.number}`;

            setHistory(prev => {
                const newHistory = prev.filter(h => h.path !== path); // Remove if exists (to move to top)
                return [{ label, path }, ...newHistory].slice(0, 10); // Add to top, limit to 10
            });
        }
    }, [bsbChapter]);

    // Resolve bookId from URL to API ID

    const resolvedBookId = useMemo(() => {
        if (!bookId) return null;
        if (books.length === 0) return null;

        // Check if bookId is already a valid ID
        const directMatch = books.find(b => b.id === bookId);
        if (directMatch) return directMatch.id;

        // Try to find by name
        const normalizedUrlId = bookId.toLowerCase().replace(/\s+/g, '');
        const nameMatch = books.find(b =>
            b.name.toLowerCase().replace(/\s+/g, '') === normalizedUrlId ||
            b.commonName.toLowerCase().replace(/\s+/g, '') === normalizedUrlId
        );

        if (nameMatch) return nameMatch.id;

        return bookId; // Fallback
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

    // Reset view mode when highlights are cleared
    useEffect(() => {
        if (highlightStart === null) {
            setViewMode('full');
        }
    }, [highlightStart]);

    // Fetch Books, Translations, Commentaries, and Profiles on mount
    useEffect(() => {
        const initData = async () => {
            try {
                const [booksData, commentariesData, profilesData, translationsData] = await Promise.all([
                    getBooks('BSB'),
                    getCommentaries(),
                    getProfiles(),
                    getTranslations()
                ]);
                setBooks(booksData);
                setCommentaries(commentariesData);
                setProfiles(profilesData.profiles);
                setTranslations(translationsData);

                // Set default commentary if available
                if (commentariesData.length > 0) {
                    // Prefer Matthew Henry or similar popular ones if available, otherwise first
                    const defaultComm = commentariesData.find(c => c.id === 'MHC') || commentariesData[0]!;
                    setSelectedCommentaryId(defaultComm.id);
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



    // Fetch Chapter Content
    useEffect(() => {
        const fetchData = async () => {
            if (!resolvedBookId || !chapter) return;

            setLoading(true);
            setError(null);
            setLoading(true);
            setError(null);
            setExpandedRefTexts({}); // Reset expanded refs on navigation
            setSidebarScrollTarget(null); // Reset scroll target on navigation

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

    // Sync sidebar scroll target with verse range navigation
    useEffect(() => {
        if (verseRange) {
            const rangeMatch = verseRange.match(/^(\d+)/);
            if (rangeMatch) {
                const verseNum = parseInt(rangeMatch[1]!);
                setSidebarScrollTarget(verseNum);
                // Also ensure the references tab is selected if commentary is open
                if (showCommentary) {
                    setCommentaryTab('references');
                }
            }
        }
    }, [verseRange, showCommentary]);



    const scrollToVerseInView = (verseNum: number) => {
        const element = document.getElementById(`verse-${verseNum}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Add temporary highlight
            element.classList.add('bg-yellow-100', 'dark:bg-yellow-500/20', 'transition-colors', 'duration-1000');
            setTimeout(() => {
                element.classList.remove('bg-yellow-100', 'dark:bg-yellow-500/20');
            }, 2000);
        }
    };

    const handleToggleRefText = async (refKey: string, book: string, chapter: number, verse: number, endVerse?: number) => {
        if (expandedRefTexts[refKey]) {
            const newExpanded = { ...expandedRefTexts };
            delete newExpanded[refKey];
            setExpandedRefTexts(newExpanded);
            return;
        }

        setLoadingRefs(prev => ({ ...prev, [refKey]: true }));
        try {
            const data = await getChapter(selectedTranslation, book, chapter);

            const targetEndVerse = endVerse || verse;
            const verses = data.chapter.content.filter(c => c.type === 'verse' && c.number >= verse && c.number <= targetEndVerse);

            if (verses.length > 0) {
                // Use new helper to format with line breaks
                const text = formatChapterContent(data.chapter.content, verse, targetEndVerse);
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

    // Scroll sidebar to target verse
    useEffect(() => {
        if (showCommentary && sidebarScrollTarget !== null && !commentaryLoading) {
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
    }, [showCommentary, commentaryTab, sidebarScrollTarget, commentaryLoading]);

    // Reset scroll target when sidebar closes
    useEffect(() => {
        if (!showCommentary) {
            setSidebarScrollTarget(null);
        }
    }, [showCommentary]);

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
            const bookQuery = match[1] ? match[1].trim() : '';
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
        if (window.matchMedia('(pointer: coarse)').matches) return; // Skip on touch devices

        if (hoverTimeout) clearTimeout(hoverTimeout);

        const timeout = setTimeout(() => {
            setActiveFootnote(null);
        }, 300); // 300ms delay before closing
        setCloseTimeout(timeout);
    };

    const closeFootnote = (e?: React.MouseEvent) => {
        if (e) e.stopPropagation();
        if (hoverTimeout) clearTimeout(hoverTimeout);
        if (closeTimeout) clearTimeout(closeTimeout);
        setActiveFootnote(null);
    };

    const handleFootnoteClick = (e: React.MouseEvent | null, noteId: number) => {
        if (e) e.stopPropagation();

        // Clear any pending close timeout to prevent race conditions
        if (closeTimeout) {
            clearTimeout(closeTimeout);
            setCloseTimeout(null);
        }

        // Check if mobile (sm breakpoint is 640px)
        const isMobile = window.innerWidth < 640;
        const isDirectClick = !!e;

        if (isDirectClick && isMobile) {
            // Mobile marker tap: Toggle popover
            if (activeFootnote?.id === noteId) {
                setActiveFootnote(null);
            } else {
                const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
                setActiveFootnote({ id: noteId, x: rect.left + rect.width / 2, y: rect.bottom });
            }
            return;
        }

        // Desktop marker click OR "View in Sidebar" click (mobile/desktop)
        setCommentaryTab('footnotes');
        setShowCommentary(true);
        setActiveFootnote(null);

        // Wait for sidebar to render/animate
        setTimeout(() => {
            const element = document.getElementById(`footnote-${noteId}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                // Highlight effect
                element.classList.add('bg-primary/20', 'ring-2', 'ring-primary', 'transition-all', 'duration-500');
                setTimeout(() => element.classList.remove('bg-primary/20', 'ring-2', 'ring-primary'), 2000);
            }
        }, 500);
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
            const popoverWidth = 320; // Approximate width
            const screenWidth = window.innerWidth;
            let left = rect.left + rect.width / 2;

            // Clamp to screen edges
            if (left + popoverWidth / 2 > screenWidth - 10) {
                left = screenWidth - popoverWidth / 2 - 10;
            } else if (left - popoverWidth / 2 < 10) {
                left = popoverWidth / 2 + 10;
            }

            setRefPopover({
                verse: verseNum,
                x: left,
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

                const popoverWidth = 320; // Approximate width
                const screenWidth = window.innerWidth;
                let left = rect.left + rect.width / 2;

                // Clamp to screen edges
                if (left + popoverWidth / 2 > screenWidth - 10) {
                    left = screenWidth - popoverWidth / 2 - 10;
                } else if (left - popoverWidth / 2 < 10) {
                    left = popoverWidth / 2 + 10;
                }

                setRefPopover({
                    verse: verseNum,
                    x: left,
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




    // Merge Content for Display
    const mergedContent = useMemo(() => {
        if (!bsbChapter) return [];
        if (!showMsb || !msbChapter) return bsbChapter.chapter.content;

        const combined: (ChapterContent & { isMsbOnly?: boolean })[] = [];
        const bsbContent = bsbChapter.chapter.content;
        const msbContent = msbChapter.chapter.content;

        let bsbIndex = 0;
        let msbIndex = 0;

        // Helper to get verse number from content item
        const getVerseNum = (item: ChapterContent) => item.type === 'verse' ? item.number : -1;

        while (bsbIndex < bsbContent.length || msbIndex < msbContent.length) {
            const bsbItem = bsbContent[bsbIndex];
            const msbItem = msbContent[msbIndex];

            // If we've exhausted one list, take from the other
            if (!bsbItem) {
                if (msbItem && msbItem.type === 'verse') {
                    combined.push({ ...msbItem, isMsbOnly: true });
                }
                msbIndex++;
                continue;
            }
            if (!msbItem) {
                combined.push(bsbItem);
                bsbIndex++;
                continue;
            }

            // If both are non-verses (headings, line breaks), prioritize BSB structure
            if (bsbItem.type !== 'verse') {
                combined.push(bsbItem);
                bsbIndex++;
                // If MSB also has a non-verse here, skip it to avoid duplication if structures align
                if (msbItem.type !== 'verse') msbIndex++;
                continue;
            }

            // If BSB is verse, but MSB is not, skip MSB non-verse
            if (msbItem.type !== 'verse') {
                msbIndex++;
                continue;
            }

            // Both are verses. Compare numbers.
            if (bsbItem.number === msbItem.number) {
                combined.push(bsbItem);
                bsbIndex++;
                msbIndex++;
            } else if (bsbItem.number < msbItem.number) {
                combined.push(bsbItem);
                bsbIndex++;
            } else {
                // MSB verse number is smaller (or BSB doesn't have it), so it's an MSB-only verse
                combined.push({ ...msbItem, isMsbOnly: true });
                msbIndex++;
            }
        }

        return combined;
    }, [bsbChapter, msbChapter, showMsb]);

    const renderContent = (content: (ChapterContent & { isMsbOnly?: boolean })[], msbContent?: ChapterContent[]) => {
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
                        // Use a div with height instead of br for better spacing/paragraph break
                        return <div key={index} className="h-4" />;
                    }

                    // Handle MSB Only Verses
                    if (item.isMsbOnly && item.type === 'verse') {
                        return (
                            <div key={index} className="my-4 p-4 bg-amber-50 dark:bg-gray-900/50 rounded-lg border-l-4 border-amber-500 dark:border-amber-500">
                                <span className="font-bold text-xs uppercase tracking-wider block mb-2 text-amber-600 dark:text-amber-500 flex items-center gap-2">
                                    <span className="bg-amber-100 dark:bg-amber-900/50 px-1.5 py-0.5 rounded">MSB ONLY VERSE</span>
                                </span>
                                <p className="text-muted-foreground dark:text-gray-200 italic">
                                    <sup className="text-xs font-bold mr-1 select-none">{item.number}</sup>
                                    {item.content.map((c, i) => {
                                        if (typeof c === 'string') return <span key={i}>{c}</span>;
                                        if ('text' in c) return <span key={i} className={c.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""}>{c.text}</span>;
                                        return null;
                                    })}
                                </p>
                            </div>
                        );
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
                                className={`relative group ${isHighlighted ? "bg-yellow-100 dark:bg-yellow-500/20 transition-colors duration-1000 rounded px-1 -mx-1 box-decoration-clone" : ""}`}
                                onMouseEnter={() => setActiveVerse(item.number)}
                                onMouseLeave={() => setActiveVerse(null)}
                                onClick={() => setActiveVerse(item.number)}
                            >
                                {/* Verse Mnemonic */}
                                {showVerseMnemonics && resolvedBookId && chapter && (
                                    (() => {
                                        const vMnemonic = getVerseMnemonic(resolvedBookId, parseInt(chapter), item.number);
                                        if (!vMnemonic) return null;
                                        const firstChar = vMnemonic.charAt(0);
                                        const rest = vMnemonic.slice(1);
                                        return (
                                            <span className="inline-block mr-1 select-none max-w-full">
                                                <span className="text-[10px] font-mono text-muted-foreground/70 bg-secondary/30 px-1 rounded inline-flex items-center whitespace-normal">
                                                    <span className="text-primary/70 font-bold">{firstChar}</span>{rest}
                                                </span>
                                            </span>
                                        );
                                    })()
                                )}
                                {!readerMode && (
                                    <sup className="text-xs font-bold text-muted-foreground mr-1 select-none inline-flex items-center">
                                        {item.number}
                                        {hasCrossRefs && (
                                            <button
                                                onClick={(e) => handleRefClick(e, item.number, verseRefs)}
                                                onMouseEnter={(e) => handleRefMouseEnter(e, item.number, verseRefs)}
                                                onMouseLeave={handleRefMouseLeave}
                                                className="ml-0.5 text-primary/60 hover:text-primary transition-colors"

                                            >
                                                <LinkIcon className="w-2.5 h-2.5" />
                                            </button>
                                        )}
                                    </sup>
                                )}
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
                                                                className={`${t.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""} ${t.status === 'removed' ? 'font-bold bg-yellow-100/50 dark:bg-transparent dark:text-red-400 dark:decoration-red-400/50 dark:line-through decoration-2 rounded-sm px-0.5' : ''}`}
                                                            >
                                                                {t.text}
                                                            </span>
                                                        );
                                                    })}
                                                </span>

                                                <div className="mt-2 mb-4 p-3 bg-amber-50 dark:bg-gray-900/50 rounded-lg border-l-2 border-amber-500 dark:border-amber-500 text-sm text-muted-foreground dark:text-gray-200">
                                                    <span className="font-bold text-xs uppercase tracking-wider block mb-1 text-amber-600 dark:text-amber-500 flex items-center gap-2">
                                                        <span>MSB Variation</span>
                                                    </span>
                                                    {msbDiff.map((t: DiffToken, i: number) => {
                                                        if (t.isLineBreak) return <br key={i} />;
                                                        return (
                                                            <span
                                                                key={i}
                                                                className={`${t.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""} ${t.status === 'added' ? 'font-bold bg-amber-200/50 dark:bg-transparent text-foreground dark:text-amber-400 rounded-sm px-0.5' : ''}`}
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
                                                    const noteMarker = (showFootnotes && !readerMode) ? (
                                                        <sup
                                                            key={`note-${index}-${i}`}
                                                            className="text-[10px] font-bold text-primary/70 cursor-pointer hover:text-primary hover:underline select-none ml-0.5"
                                                            onClick={(e) => handleFootnoteClick(e, c.noteId)}
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
                return <div key={index} className="h-4" />;
            }
            if (item.type === 'verse') {
                return (
                    <p key={index} id={`commentary-verse-${item.number}`} className="mb-2 text-sm scroll-mt-24">
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
        const isOfflineError = error?.toLowerCase().includes('offline') || error?.toLowerCase().includes('network') || error?.toLowerCase().includes('failed') || isOffline;

        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center px-4">
                {isOfflineError ? (
                    <div className="p-4 bg-secondary/10 rounded-full">
                        <WifiOff className="w-12 h-12 text-muted-foreground" />
                    </div>
                ) : (
                    <AlertCircle className="w-12 h-12 text-destructive" />
                )}

                <h3 className="text-lg font-semibold">
                    {isOfflineError ? 'Content Not Available Offline' : 'Error Loading Chapter'}
                </h3>

                <p className="text-muted-foreground max-w-md">
                    {isOfflineError
                        ? `The ${selectedTranslation} translation is not available offline.`
                        : error}
                </p>

                {isOfflineError && selectedTranslation !== 'BSB' && (
                    <button
                        onClick={() => {
                            setSelectedTranslation('BSB');
                            // Force reload or state clear handled by useEffect dependency on selectedTranslation
                        }}
                        className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm flex items-center gap-2"
                    >
                        <BookOpen className="w-4 h-4" />
                        Switch to BSB (Offline Ready)
                    </button>
                )}

                <button
                    onClick={() => navigate('/bible')}
                    className="text-primary hover:underline mt-2 text-sm"
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
        const keys = refsForVerse.map(r => `${verseNum}-${r.book}-${r.chapter}-${r.verse}`);
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
                const refKey = `${verseNum}-${ref.book}-${ref.chapter}-${ref.verse}`;
                if (!newExpanded[refKey]) {
                    try {
                        const data = await getChapter(selectedTranslation, ref.book, ref.chapter);
                        const startVerse = ref.verse;
                        const endVerse = ref.endVerse || ref.verse;
                        const verses = data.chapter.content.filter(c => c.type === 'verse' && c.number >= startVerse && c.number <= endVerse);

                        if (verses.length > 0) {
                            // Use new helper
                            const text = formatChapterContent(data.chapter.content, startVerse, endVerse);
                            newExpanded[refKey] = text;
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

    // Swipe Handlers
    const onTouchStart = (e: React.TouchEvent) => {
        if (e.touches.length > 0) {
            setTouchStart({ x: e.touches[0]!.clientX, y: e.touches[0]!.clientY });
        }
        setTouchEnd(null);
        setSwipeAxis(null);
        setTranslateX(0);
    };

    const onTouchMove = (e: React.TouchEvent) => {
        if (!touchStart || e.touches.length === 0) return;

        const currentX = e.touches[0]!.clientX;
        const currentY = e.touches[0]!.clientY;
        const diffX = touchStart.x - currentX;
        const diffY = touchStart.y - currentY;

        // Axis locking logic
        if (!swipeAxis) {
            if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 10) {
                setSwipeAxis('horizontal');
            } else if (Math.abs(diffY) > Math.abs(diffX) && Math.abs(diffY) > 10) {
                setSwipeAxis('vertical');
            }
        }

        if (swipeAxis === 'horizontal') {
            setTranslateX(-diffX);
        }

        setTouchEnd({ x: currentX, y: currentY });
    };

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;

        if (swipeAxis === 'horizontal') {
            const distance = touchStart.x - touchEnd.x;
            const isLeftSwipe = distance > 100;
            const isRightSwipe = distance < -100;

            if (isLeftSwipe && canGoNext) {
                handleNext();
            } else if (isRightSwipe && canGoPrev) {
                handlePrev();
            }
        }

        setTouchStart(null);
        setTouchEnd(null);
        setSwipeAxis(null);
        setTranslateX(0);
    };

    return (
        <div
            className="flex flex-col sm:gap-0 relative max-w-7xl mx-auto px-0 sm:px-4"
        >
            <div className="flex gap-6 relative">
                <div
                    className={`flex-1 w-full lg:max-w-3xl mx-auto pb-20 animate-fade-in transition-all duration-75 ease-out ${showCommentary ? 'lg:mr-[320px]' : ''}`}
                    style={translateX !== 0 ? { transform: `translateX(${translateX}px)` } : undefined}
                    onTouchStart={onTouchStart}
                    onTouchMove={onTouchMove}
                    onTouchEnd={onTouchEnd}
                >

                    {/* Navigation Header */}
                    <div id="bible-nav-header" className={`sticky z-10 bg-background/80 backdrop-blur-md border-b border-border mb-0 sm:mb-6 shadow-sm flex flex-col transition-all duration-300 sm:rounded-b-xl -mx-4 sm:mx-0 px-0 sm:px-0 ${showMnemonics ? 'py-0 sm:py-0' : ''} ${scrollDirection === 'down' && !isAtTop ? 'top-0' : 'top-16'}`}>
                        {/* Book Mnemonic */}
                        {showMnemonics && resolvedBookId && chapter && (
                            (() => {
                                const bMnemonic = getBookMnemonic(resolvedBookId, parseInt(chapter));
                                if (!bMnemonic) return null;
                                return (
                                    <div
                                        className="w-full bg-background/95 backdrop-blur border-b border-border/50 px-8 py-1 flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                                        onTouchStart={(e) => e.stopPropagation()}
                                        onTouchMove={(e) => e.stopPropagation()}
                                        onTouchEnd={(e) => e.stopPropagation()}
                                    >
                                        <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground/70 font-medium text-center whitespace-nowrap min-w-max px-4 mx-auto">
                                            {bMnemonic.text.split('').map((char, i) => (
                                                <span key={i} className={i === bMnemonic.highlightIndex ? "text-primary font-bold scale-110 inline-block" : ""}>
                                                    {char}
                                                </span>
                                            ))}
                                            {bMnemonic.hint && (
                                                <span className="ml-2 normal-case tracking-normal italic text-muted-foreground/50">
                                                    {bMnemonic.hint.split('**').map((part, i) => (
                                                        <span key={i} className={i % 2 === 1 ? "font-bold text-muted-foreground/70" : ""}>
                                                            {part}
                                                        </span>
                                                    ))}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                );
                            })()
                        )}
                        <div className={`flex items-center justify-between gap-2 sm:gap-4 transition-all ${showMnemonics ? 'p-1 sm:p-2 h-8 sm:h-auto' : 'p-1 sm:p-4 h-10 sm:h-auto'}`}>

                            {/* Mobile Search Expanded View */}
                            {isSearchExpanded && (
                                <>
                                    {createPortal(
                                        <div className="fixed inset-0 z-[40] bg-transparent" onClick={() => { setIsSearchExpanded(false); setUniversalSearchQuery(''); }} />,
                                        document.body
                                    )}
                                    <div className="flex w-full items-center gap-2 sm:hidden animate-in fade-in slide-in-from-right-5 duration-200 relative z-50">
                                        <form onSubmit={(e) => { handleUniversalSearch(e); setIsSearchExpanded(false); }} className="relative flex-1">
                                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                            <input
                                                ref={searchInputRef}
                                                type="text"
                                                placeholder="Search (e.g. John 3:16)"
                                                className="w-full pl-9 pr-10 py-2 bg-secondary/10 border-transparent rounded-full focus:ring-2 focus:ring-primary focus:bg-background transition-all text-base sm:text-sm"
                                                value={universalSearchQuery}
                                                onChange={(e) => setUniversalSearchQuery(e.target.value)}
                                                autoFocus
                                            />
                                            <button
                                                type="button"
                                                onClick={() => { setUniversalSearchQuery(''); searchInputRef.current?.focus(); }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 hover:bg-accent/10 rounded-full transition-colors text-muted-foreground hover:text-foreground"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </form>
                                    </div>
                                </>
                            )}

                            {/* Standard Navigation View */}
                            <div className={`flex items-center justify-between w-full sm:w-auto sm:justify-start sm:gap-2 relative ${isSearchExpanded ? 'hidden sm:flex' : 'flex'}`}>
                                <button
                                    onClick={handlePrev}
                                    disabled={!canGoPrev}
                                    className="p-1.5 sm:p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors shrink-0"
                                >
                                    <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                                </button>

                                <button
                                    onClick={() => setShowQuickNav(true)}
                                    className="flex-1 sm:flex-none flex items-center justify-center sm:justify-start gap-2 px-2 py-1.5 hover:bg-accent/10 rounded-lg transition-colors text-center sm:text-left min-w-[120px] sm:min-w-[140px]"
                                >
                                    <div className="hidden sm:block"><Grid className="w-5 h-5 text-primary" /></div>
                                    <div>
                                        <h2 className="text-base sm:text-lg font-bold leading-none truncate">{bsbChapter.book.name} {bsbChapter.chapter.number}</h2>
                                        <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                                            {translations.find(t => t.id === selectedTranslation)?.shortName || selectedTranslation}
                                        </p>
                                    </div>
                                </button>

                                <div className="flex items-center gap-1 sm:hidden absolute right-12 top-1/2 -translate-y-1/2 z-20">
                                    <button
                                        onClick={() => setIsSearchExpanded(true)}
                                        className="p-1.5 hover:bg-accent/10 rounded-full transition-colors shrink-0"
                                    >
                                        <Search className="w-5 h-5 text-muted-foreground" />
                                    </button>
                                </div>
                                <button
                                    onClick={handleNext}
                                    disabled={!canGoNext}
                                    className="p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors"
                                >
                                    <ChevronRight className="w-6 h-6" />
                                </button>
                            </div>

                            {/* Desktop Universal Search Bar */}
                            <form onSubmit={handleUniversalSearch} className="relative w-full sm:max-w-xs hidden sm:block">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                <input
                                    type="text"
                                    placeholder="Search (e.g. John 3:16)"
                                    className="w-full pl-9 pr-4 py-2 bg-secondary/10 border-transparent rounded-full focus:ring-2 focus:ring-primary focus:bg-background transition-all text-sm"
                                    value={universalSearchQuery}
                                    onChange={(e) => setUniversalSearchQuery(e.target.value)}
                                />
                            </form>
                        </div>

                        {/* Highlighted Verses Notice Banner */}
                        {highlightStart !== null && (
                            <div className="px-4 py-2 bg-yellow-100/90 dark:bg-yellow-900/40 border-t border-yellow-200 dark:border-yellow-800 flex items-center justify-between animate-in slide-in-from-top-2">
                                <div className="flex items-center gap-2">
                                    <span className="font-semibold text-sm">Highlighted: v. {highlightStart}{highlightEnd && highlightEnd !== highlightStart ? `-${highlightEnd}` : ''}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <button
                                        onClick={() => setViewMode(viewMode === 'full' ? 'focus' : 'full')}
                                        className="text-xs font-medium px-2 py-1 rounded bg-yellow-200/50 dark:bg-yellow-800/50 hover:bg-yellow-200 dark:hover:bg-yellow-800 transition-colors flex items-center gap-1"
                                    >
                                        {viewMode === 'full' ? <Eye className="w-3 h-3" /> : <BookOpen className="w-3 h-3" />}
                                        {viewMode === 'full' ? 'Focus View' : 'Show Full Chapter'}
                                    </button>
                                    <button
                                        onClick={() => navigate(-1)}
                                        className="text-xs text-primary hover:underline flex items-center gap-1"
                                    >
                                        <ArrowLeft className="w-3 h-3" />
                                        Back
                                    </button>
                                    <button
                                        onClick={() => navigate(`/bible/read/${bsbChapter.book.name.replace(/\s+/g, '')}/${chapter}`, {
                                            replace: true,
                                            state: { preserveScroll: true }
                                        })}
                                        className="text-xs text-primary hover:underline"
                                    >
                                        Clear
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Chapter Mnemonic */}
                        {showMnemonics && resolvedBookId && chapter && (
                            (() => {
                                const cMnemonic = getChapterMnemonic(resolvedBookId, parseInt(chapter));
                                if (!cMnemonic) return null;

                                // Get verse mnemonic if active
                                const vMnemonic = activeVerse ? getVerseMnemonic(resolvedBookId, parseInt(chapter), activeVerse) : null;
                                const highlightIdx = activeVerse ? getMnemonicHighlightIndex(cMnemonic, activeVerse) : -1;

                                return (
                                    <div className="relative z-10">
                                        <div
                                            className="w-full bg-background/95 backdrop-blur border-t border-border/50 px-8 py-1 flex overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"
                                            onTouchStart={(e) => e.stopPropagation()}
                                            onTouchMove={(e) => e.stopPropagation()}
                                            onTouchEnd={(e) => e.stopPropagation()}
                                        >
                                            <p className="text-[10px] italic text-muted-foreground/70 text-center whitespace-nowrap min-w-max px-4 mx-auto">
                                                {cMnemonic.split('').map((char, i) => (
                                                    <span key={i} className={`relative inline-flex flex-col items-center ${i === highlightIdx ? "text-primary font-bold scale-110" : ""}`}>
                                                        {char === ' ' ? '\u00A0' : char}
                                                    </span>
                                                ))}
                                            </p>
                                        </div>

                                        {/* Verse Mnemonic Row - Absolute positioned below */}
                                        {vMnemonic && (
                                            <div className="absolute top-full left-0 right-0 flex justify-center pointer-events-none mt-1">
                                                <span className="text-[10px] font-mono text-muted-foreground/90 bg-background/95 backdrop-blur-sm px-2 py-0.5 rounded-full border border-border/50 shadow-sm whitespace-normal text-center max-w-[90%]">
                                                    <span className="text-primary font-bold">{vMnemonic.charAt(0)}</span>
                                                    {vMnemonic.slice(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                );
                            })()
                        )}
                    </div>

                    {/* Chapter Content */}
                    <div className={`prose prose-lg dark:prose-invert max-w-none px-2 sm:px-4 ${loading ? 'opacity-50' : ''}`}>
                        {renderContent(mergedContent, msbChapter?.chapter.content)}
                    </div>
                </div>

                {/* Commentary Sidebar/Modal */}
                <BibleSidebar
                    showCommentary={showCommentary}
                    setShowCommentary={setShowCommentary}
                    bsbChapter={bsbChapter}
                    commentaries={commentaries}
                    selectedCommentaryId={selectedCommentaryId}
                    setSelectedCommentaryId={setSelectedCommentaryId}
                    commentaryTab={commentaryTab}
                    setCommentaryTab={setCommentaryTab}
                    commentaryChapter={commentaryChapter}
                    crossRefs={crossRefs}
                    expandedRefTexts={expandedRefTexts}
                    loadingRefs={loadingRefs}
                    toggleVerseRefs={toggleVerseRefs}
                    handleToggleRefText={handleToggleRefText}
                    books={books}
                    scrollToVerseInView={scrollToVerseInView}
                    sidebarScrollTarget={sidebarScrollTarget}
                    setSidebarScrollTarget={setSidebarScrollTarget}
                />


            </div >

            {/* Mobile Navigation Footer */}
            <div className={`fixed bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-md border-t border-border flex items-center justify-between px-4 z-50 sm:hidden transition-transform duration-300 ${scrollDirection === 'down' && !isAtTop ? 'translate-y-full' : 'translate-y-0'}`}>
                <div className="flex items-center gap-4 relative">
                    <button
                        onClick={() => setShowHistory(!showHistory)}
                        className={`p-2 rounded-full transition-colors ${showHistory ? 'bg-primary/10 text-primary' : 'hover:bg-accent/10 text-muted-foreground'}`}
                        title="History"
                    >
                        <History className="w-6 h-6" />
                    </button>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => setShowMsb(!showMsb)}
                        className={`p-2 rounded-full transition-colors ${showMsb ? 'bg-primary/10 text-primary' : 'hover:bg-accent/10 text-muted-foreground'}`}
                        title="Compare MSB"
                    >
                        <Columns className="w-5 h-5" />
                    </button>
                    <button
                        onClick={() => setShowCommentary(!showCommentary)}
                        className={`p-2 rounded-full transition-colors ${showCommentary ? 'bg-primary/10 text-primary' : 'hover:bg-accent/10 text-muted-foreground'}`}
                        title="Commentary"
                    >
                        <MessageSquare className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* History Popover (Portal) */}
            {showHistory && createPortal(
                <>
                    <div className="fixed inset-0 z-[60] bg-background/20 backdrop-blur-sm" onClick={() => setShowHistory(false)} />
                    <div className="fixed bottom-14 left-4 w-48 bg-popover border border-border rounded-lg shadow-xl z-[70] overflow-hidden animate-in fade-in slide-in-from-bottom-2 duration-200">
                        <div className="text-xs font-bold px-3 py-2 border-b border-border/50 bg-secondary/10 text-muted-foreground">
                            Recent History
                        </div>
                        <div className="max-h-60 overflow-y-auto">
                            {history.length > 0 ? (
                                history.map((item, i) => (
                                    <button
                                        key={i}
                                        onClick={() => {
                                            navigate(item.path);
                                            setShowHistory(false);
                                        }}
                                        className={`w-full text-left px-3 py-2 text-sm hover:bg-accent/10 transition-colors truncate ${i === 0 ? 'font-medium text-primary' : ''}`}
                                    >
                                        {item.label}
                                    </button>
                                ))
                            ) : (
                                <div className="px-3 py-4 text-xs text-muted-foreground text-center italic">
                                    No history yet
                                </div>
                            )}
                        </div>
                    </div>
                </>,
                document.body
            )}

            {/* Profile Modal */}
            {
                showProfileModal && (
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
                )
            }

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
                initialBook={bsbChapter?.book}
            />



            {/* Footer Controls */}
            <div className={`fixed bottom-6 gap-2 z-40 hidden sm:flex transition-all duration-300 ${showCommentary ? 'right-6 lg:right-[430px]' : 'right-6'}`}>
                {msbChapter && selectedTranslation === 'BSB' && (
                    <button
                        onClick={() => setShowMsb(!showMsb)}
                        className={`p-3 rounded-full shadow-lg transition-all ${showMsb
                            ? 'bg-primary text-primary-foreground'
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
                {activeFootnote && createPortal(
                    <>
                        {/* Mobile Backdrop for click-away */}
                        <div className="fixed inset-0 z-[59] bg-transparent sm:hidden" onClick={closeFootnote} />
                        <div
                            className="fixed z-[60] bg-popover text-popover-foreground p-4 rounded-lg shadow-xl border border-border max-w-xs animate-in fade-in zoom-in-95 duration-200"
                            style={{
                                left: Math.max(160, Math.min(activeFootnote.x, window.innerWidth - 160)),
                                top: activeFootnote.y > window.innerHeight - 250 ? 'auto' : activeFootnote.y + 20,
                                bottom: activeFootnote.y > window.innerHeight - 250 ? (window.innerHeight - activeFootnote.y) + 10 : 'auto',
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
                                    <button onClick={closeFootnote} className="text-muted-foreground hover:text-foreground md:hidden">
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                                <p className="mb-2 leading-relaxed">
                                    {bsbChapter?.chapter.footnotes.find(n => n.noteId === activeFootnote?.id)?.text}
                                </p>
                                <button
                                    onClick={() => {
                                        if (activeFootnote) {
                                            handleFootnoteClick(null, activeFootnote.id);
                                        }
                                    }}
                                    className="w-full mt-2 text-[10px] text-primary/80 font-medium text-center bg-primary/5 hover:bg-primary/10 rounded py-0.5 transition-colors"
                                >
                                    View in Sidebar
                                </button>
                            </div>
                        </div>
                    </>,
                    document.body
                )
                }
            </div >

            {/* Reference Popover */}
            {
                refPopover && createPortal(
                    <div
                        className="fixed z-[60] bg-popover text-popover-foreground px-3 py-2 rounded-lg shadow-lg border border-border animate-in fade-in zoom-in-95 duration-200 max-w-xs pointer-events-auto"
                        style={{
                            top: refPopover.y > window.innerHeight - 250 ? 'auto' : refPopover.y,
                            bottom: refPopover.y > window.innerHeight - 250 ? (window.innerHeight - refPopover.y) + 10 : 'auto',
                            left: refPopover.x,
                            transform: 'translateX(-50%)'
                        }}
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
                                setSidebarScrollTarget(refPopover.verse);
                                setRefPopover(null);
                            }}
                            className="w-full mt-2 text-[10px] text-primary/80 font-medium text-center bg-primary/5 hover:bg-primary/10 rounded py-0.5 transition-colors"
                        >
                            View all in Sidebar
                        </button>
                    </div>,
                    document.body
                )
            }
        </div >
    );
}
