import { useState, useEffect } from 'react';
import { Book, FileText, Loader2 } from 'lucide-react';
import mnemonicsData from '../data/bibleMnemonics.json';
import Breadcrumbs from './Breadcrumbs';
import { getBooks, type BibleBook } from '../data/bibleApi';

// Types for our data structure
interface MnemonicData {
    meta: { version: string };
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

export default function HierarchicalMemory() {
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState<'ALL' | 'OT' | 'NT'>('ALL');

    useEffect(() => {
        const fetchBooks = async () => {
            try {
                const allBooks = await getBooks('BSB');
                setBooks(allBooks);
            } catch (error) {
                console.error("Failed to fetch books", error);
            } finally {
                setLoading(false);
            }
        };
        fetchBooks();
    }, []);

    const handleBookSelect = (bookKey: string) => {
        setSelectedBook(bookKey);
        setSelectedChapter(null);
    };

    const handleChapterSelect = (chapterId: string) => {
        setSelectedChapter(chapterId);
    };

    // Helper to find the mnemonic key for a given BibleBook
    // The mnemonic data uses keys like "ACT", "MAT", "1CO"
    // The API returns books with IDs like "Acts", "Mat", "1Cor" (variable)
    // We need to map them.
    // Strategy: Normalize both and try to match.
    // Mnemonic keys seem to be uppercase abbreviations.
    const getMnemonicKey = (book: BibleBook): string | null => {
        // Direct check against known keys
        const keys = Object.keys(data.books);

        // Try to match by ID (e.g. "MAT" vs "Mat")
        const idMatch = keys.find(k => k.toLowerCase() === book.id.toLowerCase());
        if (idMatch) return idMatch;

        // Try to match by first 3 chars of name (e.g. "Genesis" -> "GEN")
        const nameMatch = keys.find(k => k === book.name.substring(0, 3).toUpperCase());
        if (nameMatch) return nameMatch;

        // Special cases mapping if needed
        const specialMap: Record<string, string> = {
            '1Cor': '1CO',
            '2Cor': '2CO',
            '1Thess': '1TH',
            '2Thess': '2TH',
            '1Tim': '1TI',
            '2Tim': '2TI',
            'Phlm': 'PHM',
            'Phil': 'PHP',
            // Add others as encountered
        };

        const specialVal = specialMap[book.id];
        if (specialVal) return specialVal;

        // Fallback: Check if the key exists in data.books directly (if ID matches exactly)
        if (data.books[book.id]) return book.id;

        return null;
    };

    // Filter and sort books
    const displayedBooks = books
        .filter(book => {
            // 1. Filter by Testament
            if (filter === 'OT' && book.order >= 40) return false;
            if (filter === 'NT' && book.order < 40) return false;

            // 2. Filter by availability in mnemonics data
            const key = getMnemonicKey(book);
            return key !== null;
        })
        .sort((a, b) => a.order - b.order);


    // Breadcrumb Logic
    const breadcrumbItems: { label: string; to?: string }[] = [
        { label: 'Bible', to: '/bible' },
        { label: 'Memorization Tools', to: '/bible/memory' },
    ];

    if (!selectedBook) {
        breadcrumbItems.push({ label: 'Hierarchical', to: '#' });
    } else {
        breadcrumbItems.push({ label: 'Hierarchical' });
    }

    // Find the full book object for the selected book key
    const selectedBookObj = selectedBook ? books.find(b => getMnemonicKey(b) === selectedBook) : null;
    const selectedBookName = selectedBookObj ? selectedBookObj.name : selectedBook;

    if (selectedBook) {
        const item: { label: string; to?: string } = {
            label: selectedBookName || selectedBook,
        };
        if (!selectedChapter) {
            item.to = '#';
        }
        breadcrumbItems.push(item);
    }

    if (selectedChapter) {
        breadcrumbItems.push({
            label: `Chapter ${selectedChapter}`
        });
    }

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">
            <Breadcrumbs
                items={breadcrumbItems}
                showBackButton={true}
            />

            {/* Level 1: Books */}
            {!selectedBook && (
                <div className="space-y-6 animate-slide-up">
                    <div className="text-center space-y-4">
                        <h2 className="text-2xl font-bold">Select a Book</h2>
                        <p className="text-muted-foreground">Choose a book to see its mnemonic summary.</p>

                        {/* Tabs */}
                        <div className="flex justify-center gap-2">
                            {(['ALL', 'OT', 'NT'] as const).map((t) => (
                                <button
                                    key={t}
                                    onClick={() => setFilter(t)}
                                    className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${filter === t
                                        ? 'bg-primary text-primary-foreground'
                                        : 'bg-secondary/10 hover:bg-secondary/20 text-muted-foreground'
                                        }`}
                                >
                                    {t === 'ALL' ? 'All Books' : t === 'OT' ? 'Old Testament' : 'New Testament'}
                                </button>
                            ))}
                        </div>
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
                                    onClick={() => handleBookSelect(key)}
                                    className="p-6 bg-card border border-border rounded-xl hover:shadow-md transition-all hover:border-primary/50 text-left group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold text-lg">{book.name}</span>
                                        <Book className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-sm text-muted-foreground line-clamp-2">{mnemonicData.mnemonic}</p>
                                </button>
                            );
                        })}
                    </div>
                </div>
            )}

            {/* Level 2: Chapters */}
            {selectedBook && !selectedChapter && (
                <div className="space-y-6 animate-slide-left">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold text-primary mb-2">{selectedBookName}</h2>
                        <p className="text-xl font-medium">{data.books[selectedBook]?.mnemonic}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {data.books[selectedBook]?.chapters ? (
                            Object.entries(data.books[selectedBook].chapters).map(([chapNum, chapData]) => (
                                <button
                                    key={chapNum}
                                    onClick={() => handleChapterSelect(chapNum)}
                                    className="p-4 bg-card border border-border rounded-xl hover:shadow-md transition-all hover:border-primary/50 text-left group"
                                >
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="font-bold">Chapter {chapNum}</span>
                                        <FileText className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                                    </div>
                                    <p className="text-sm text-muted-foreground">{chapData.mnemonic}</p>
                                </button>
                            ))
                        ) : (
                            <div className="col-span-full text-center text-muted-foreground">No chapters available for this book yet.</div>
                        )}
                    </div>
                </div>
            )}

            {/* Level 3: Verses */}
            {selectedBook && selectedChapter && (
                <div className="space-y-6 animate-slide-left">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                        <h2 className="text-2xl font-bold text-primary mb-1">{selectedBookName} {selectedChapter}</h2>
                        <p className="text-lg font-medium">{data.books[selectedBook]?.chapters[selectedChapter]?.mnemonic}</p>
                    </div>

                    <div className="space-y-3">
                        {data.books[selectedBook]?.chapters[selectedChapter]?.verses ? (
                            Object.entries(data.books[selectedBook].chapters[selectedChapter].verses).map(([verseNum, verseData]) => (
                                <div key={verseNum} className="flex items-start p-4 bg-card border border-border rounded-xl">
                                    <div className="bg-secondary/10 px-3 py-1 rounded-md mr-4 font-mono font-bold text-secondary">
                                        {verseNum}
                                    </div>
                                    <div>
                                        <p className="text-foreground">{verseData.mnemonic}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center text-muted-foreground">No verse mnemonics available.</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
