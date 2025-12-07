import { useState, useEffect } from 'react';
import { Book, FileText, Loader2 } from 'lucide-react';
import { useParams, useNavigate } from 'react-router-dom';
import mnemonicsData from '../data/bibleMnemonics.json';

import { getBooks, getChapter, type BibleBook, type BibleChapter } from '../data/bibleApi';
import { formatPassageText } from '../utils/bibleUtils';
import { useSettings } from '../context/SettingsContext';

// Types for our data structure
interface MnemonicData {
    meta: { version: string };
    testaments: {
        OT: { mnemonic: string };
        NT: { mnemonic: string };
    };
    books: Record<string, BookData>;
}

interface BookData {
    mnemonic: string;
    chapters: Record<string, ChapterData>;
}

interface ChapterData {
    mnemonic: string;
    verses: Record<string, VerseData>;
}

interface VerseData {
    mnemonic: string;
}

const data = mnemonicsData as unknown as MnemonicData;

// Helper component for consistent mnemonic styling
const MnemonicText = ({ text, className = "", highlightClass = "text-primary" }: { text: string; className?: string; highlightClass?: string }) => {
    if (!text) return null;
    const firstChar = text.charAt(0);
    const rest = text.slice(1);

    return (
        <span className={className}>
            <span className={`${highlightClass} font-bold font-serif text-[1.1em] mr-[1px]`}>
                {firstChar}
            </span>
            {rest}
        </span>
    );
};

export default function HierarchicalMemory() {
    const { bookId, chapterId } = useParams<{ bookId: string; chapterId: string }>();
    const navigate = useNavigate();
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'OT' | 'NT'>('ALL');

    const { selectedTranslation } = useSettings();

    const [chapterContent, setChapterContent] = useState<BibleChapter | null>(null);
    const [contentLoading, setContentLoading] = useState(false);

    // Load initial data (Books only)
    useEffect(() => {
        const loadData = async () => {
            try {
                const booksData = await getBooks(selectedTranslation);
                setBooks(booksData);
            } catch (error) {
                console.error('Error loading initial data:', error);
            } finally {
                setLoading(false);
            }
        };
        loadData();
    }, [selectedTranslation]);

    // Helper to find the mnemonic key for a given BibleBook
    const getMnemonicKey = (book: BibleBook): string | null => {
        const keys = Object.keys(data.books);

        const idMatch = keys.find(k => k.toLowerCase() === book.id.toLowerCase());
        if (idMatch) return idMatch;

        const nameMatch = keys.find(k => k === book.name.substring(0, 3).toUpperCase());
        if (nameMatch) return nameMatch;

        const specialMap: Record<string, string> = {
            '1Cor': '1CO',
            '2Cor': '2CO',
            '1Thess': '1TH',
            '2Thess': '2TH',
            '1Tim': '1TI',
            '2Tim': '2TI',
            'Phlm': 'PHM',
            'Phil': 'PHP',
        };

        const specialVal = specialMap[book.id];
        if (specialVal) return specialVal;

        if (data.books[book.id]) return book.id;

        return null;
    };

    // Helper to find mnemonic key from URL param
    const getMnemonicKeyFromParam = (param: string): string | null => {
        if (!param) return null;

        const normalizedParam = param.toLowerCase();

        // 1. Try to find a book that matches the param (by ID or Name)
        const book = books.find(b =>
            b.id.toLowerCase() === normalizedParam ||
            b.name.replace(/\s+/g, '').toLowerCase() === normalizedParam ||
            b.commonName.replace(/\s+/g, '').toLowerCase() === normalizedParam
        );

        if (book) {
            return getMnemonicKey(book);
        }

        // 2. Fallback: try to match directly against mnemonic keys
        const keys = Object.keys(data.books);
        const keyMatch = keys.find(k => k.toLowerCase() === normalizedParam);
        if (keyMatch) return keyMatch;

        return null;
    };

    // Derived state from URL params
    const selectedBookKey = bookId ? getMnemonicKeyFromParam(bookId) : null;
    const selectedChapter = chapterId || null;

    // Find the full book object for the selected book key
    const selectedBookObj = selectedBookKey ? books.find(b => getMnemonicKey(b) === selectedBookKey) : null;
    const selectedBookName = selectedBookObj ? selectedBookObj.name : (bookId || null);

    // Fetch Chapter Content when selection changes
    useEffect(() => {
        const fetchChapterContent = async () => {
            if (!selectedBookObj || !selectedChapter) {
                setChapterContent(null);
                return;
            }

            setContentLoading(true);
            try {
                const chapterData = await getChapter(selectedTranslation, selectedBookObj.id, parseInt(selectedChapter));
                setChapterContent(chapterData);
            } catch (error) {
                console.error("Failed to fetch chapter content", error);
                setChapterContent(null);
            } finally {
                setContentLoading(false);
            }
        };

        fetchChapterContent();
    }, [selectedBookObj, selectedChapter, selectedTranslation]);

    const handleBookSelect = (book: BibleBook) => {
        // Use full book name without spaces for URL
        const urlName = book.name.replace(/\s+/g, '');
        navigate(`/bible/memory/hierarchical/${urlName}`);
    };

    const handleChapterSelect = (chapNum: string) => {
        if (selectedBookObj) {
            const urlName = selectedBookObj.name.replace(/\s+/g, '');
            navigate(`/bible/memory/hierarchical/${urlName}/${chapNum}`);
        } else if (bookId) {
            navigate(`/bible/memory/hierarchical/${bookId}/${chapNum}`);
        }
    };

    // Filter and sort books
    const displayedBooks = books
        .filter(book => {
            if (filter === 'OT' && book.order >= 40) return false;
            if (filter === 'NT' && book.order < 40) return false;

            const key = getMnemonicKey(book);
            return key !== null;
        })
        .sort((a, b) => a.order - b.order);

    // Helper to get verse text
    const getVerseText = (verseNum: string) => {
        if (!chapterContent) return null;
        const vNum = parseInt(verseNum);
        const verses = chapterContent.chapter.content.filter(c => c.type === 'verse' && c.number === vNum);
        if (verses.length === 0) return null;

        return verses.map(v => {
            if ('content' in v) {
                return formatPassageText(v.content);
            }
            return '';
        }).join(' ');
    };





    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-4 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div className="flex-1 min-w-0">
                    {/* Breadcrumbs or Nav could go here */}
                </div>

                {/* Translation Indicator */}
                {selectedBookKey && (
                    <div className="flex-shrink-0">
                        <div className="flex items-center gap-1 text-sm text-muted-foreground bg-secondary/10 px-3 py-1.5 rounded-full">
                            <span className="font-medium text-foreground">{selectedTranslation}</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Content */}
            {!selectedBookKey && (
                <div className="space-y-8 animate-slide-up">

                    {/* Testament Selection / Mnemonic View */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Old Testament Card */}
                        {(filter === 'ALL' || filter === 'OT') && (
                            <div
                                onClick={() => setFilter(filter === 'OT' ? 'ALL' : 'OT')}
                                className={`relative overflow-hidden rounded-xl border transition-all cursor-pointer group ${filter === 'OT' ? 'col-span-full md:col-span-2 border-orange-500/50 bg-orange-500/5 shadow-md' :
                                    'border-border hover:border-orange-500/30 hover:shadow-sm bg-card'
                                    }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className={`text-2xl font-bold ${filter === 'OT' ? 'text-orange-500' : 'text-foreground'}`}>Old Testament</h2>
                                        {/* Optional Badge */}
                                    </div>

                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground">
                                            {data.testaments?.OT?.mnemonic}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* New Testament Card */}
                        {(filter === 'ALL' || filter === 'NT') && (
                            <div
                                onClick={() => setFilter(filter === 'NT' ? 'ALL' : 'NT')}
                                className={`relative overflow-hidden rounded-xl border transition-all cursor-pointer group ${filter === 'NT' ? 'col-span-full md:col-span-2 border-purple-500/50 bg-purple-500/5 shadow-md' :
                                    'border-border hover:border-purple-500/30 hover:shadow-sm bg-card'
                                    }`}
                            >
                                <div className="p-6">
                                    <div className="flex items-center justify-between mb-4">
                                        <h2 className={`text-2xl font-bold ${filter === 'NT' ? 'text-purple-500' : 'text-foreground'}`}>New Testament</h2>
                                    </div>

                                    <div className="animate-in fade-in slide-in-from-top-2">
                                        <p className="text-xl md:text-2xl font-serif leading-relaxed text-foreground">
                                            {data.testaments?.NT?.mnemonic}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* View Controls */}
                    <div className="flex items-center justify-between border-b pb-2">
                        <h3 className="text-lg font-semibold text-muted-foreground">Books</h3>
                        {filter !== 'ALL' && (
                            <button
                                onClick={() => setFilter('ALL')}
                                className="text-sm text-primary hover:underline"
                            >
                                Show All Testaments
                            </button>
                        )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {displayedBooks.map((book) => {
                            const key = getMnemonicKey(book);
                            if (!key) return null;
                            const mnemonicData = data.books[key];
                            if (!mnemonicData) return null;

                            return (
                                <button
                                    key={book.id}
                                    onClick={() => handleBookSelect(book)}
                                    className="p-6 bg-card border border-border rounded-xl hover:shadow-md transition-all hover:border-primary/50 text-left group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-lg">{book.name}</span>
                                        <Book className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">
                                        <MnemonicText text={mnemonicData.mnemonic} className="text-muted-foreground" />
                                    </p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Level 2: Chapters */}
            {selectedBookKey && !selectedChapter && (
                <div className="space-y-6 animate-slide-left">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold text-primary mb-2">{selectedBookName}</h2>
                        <p className="text-xl font-medium">{data.books[selectedBookKey]?.mnemonic}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {data.books[selectedBookKey]?.chapters ? (
                            Object.entries(data.books[selectedBookKey].chapters).map(([chapNum, chapData]) => (
                                <button
                                    key={chapNum}
                                    onClick={() => handleChapterSelect(chapNum)}
                                    className="p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all hover:border-primary/50 text-left group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold">Chapter {chapNum}</span>
                                        <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">
                                        <MnemonicText text={chapData.mnemonic} />
                                    </p>
                                </button>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-muted-foreground">No chapters available for this book yet.</div>
                        )}
                    </div>
                </div>
            )}

            {/* Level 3: Verses */}
            {selectedBookKey && selectedChapter && (
                <div className="space-y-6 animate-slide-left">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                        <h2 className="text-2xl font-bold text-primary mb-1">{selectedBookName} {selectedChapter}</h2>
                        <p className="text-lg font-medium">{data.books[selectedBookKey]?.chapters[selectedChapter]?.mnemonic}</p>
                    </div>

                    <div className="space-y-3">
                        {data.books[selectedBookKey]?.chapters[selectedChapter]?.verses ? (
                            Object.entries(data.books[selectedBookKey].chapters[selectedChapter].verses).map(([verseNum, verseData]) => {
                                const verseText = getVerseText(verseNum);
                                return (
                                    <div key={verseNum} className="flex items-start p-4 bg-card border border-border rounded-xl">
                                        <div className="bg-primary/10 px-3 py-1 rounded-md mr-4 font-mono font-bold text-primary min-w-[2.5rem] text-center shrink-0">
                                            {verseNum}
                                        </div>
                                        <div className="space-y-2 w-full">
                                            <p className="text-foreground font-medium text-lg border-b border-border/50 pb-2 mb-2">
                                                <MnemonicText text={verseData.mnemonic} highlightClass="text-primary text-xl" />
                                            </p>
                                            {contentLoading ? (
                                                <div className="flex items-center gap-2 text-muted-foreground text-sm">
                                                    <Loader2 className="w-3 h-3 animate-spin" />
                                                    <span>Loading text...</span>
                                                </div>
                                            ) : verseText ? (
                                                <p className="text-muted-foreground leading-relaxed font-serif text-lg">
                                                    {verseText}
                                                </p>
                                            ) : (
                                                <p className="text-muted-foreground/50 italic text-sm">
                                                    Text not available
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="text-center text-muted-foreground">No verse mnemonics available.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
