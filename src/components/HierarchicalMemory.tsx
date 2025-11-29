import { useState } from 'react';
import { Book, FileText } from 'lucide-react';
import mnemonicsData from '../data/bibleMnemonics.json';
import Breadcrumbs from './Breadcrumbs';

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

    const handleBookSelect = (bookId: string) => {
        setSelectedBook(bookId);
        setSelectedChapter(null);
    };

    const handleChapterSelect = (chapterId: string) => {
        setSelectedChapter(chapterId);
    };

    // Breadcrumb Logic
    const breadcrumbItems = [
        { label: 'Bible', to: '/bible' },
        { label: 'Memorization Tools', to: '/bible/memory' },
        { label: 'Hierarchical', to: selectedBook ? undefined : '#' }
    ];

    if (selectedBook) {
        breadcrumbItems.push({
            label: selectedBook,
            to: selectedChapter ? undefined : '#'
        });
    }

    if (selectedChapter) {
        breadcrumbItems.push({ label: `Chapter ${selectedChapter}` });
    }

    // Helper to handle breadcrumb navigation (resetting state)
    // Since Breadcrumbs component uses Link, we rely on React Router.
    // However, for internal state navigation (like clicking "Hierarchical" to go back to book list),
    // we might need to handle it differently if we were not using URL params.
    // But here we are using local state. 
    // The Breadcrumbs component I created uses `to` prop which is a string for `Link`.
    // If I want to support state-based navigation, I might need to modify Breadcrumbs or just use the "Back" button functionality.
    // For now, let's assume the user uses the "Back" button or the breadcrumbs which will reload the page/component state if they navigate away and back.
    // Actually, clicking "Memorization Tools" will go to /bible/memory, which unmounts this component.
    // Clicking "Hierarchical" (if it was a link) would reload this component.
    // To make it smoother, we can just rely on the "Back" button provided by Breadcrumbs.

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-fade-in px-4">
            <Breadcrumbs
                items={breadcrumbItems}
                showBackButton={true}
            />

            {/* Level 1: Books */}
            {!selectedBook && (
                <div className="space-y-6 animate-slide-up">
                    <div className="text-center space-y-2">
                        <h2 className="text-2xl font-bold">Select a Book</h2>
                        <p className="text-muted-foreground">Choose a book to see its mnemonic summary.</p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {Object.entries(data.books).map(([key, book]) => (
                            <button
                                key={key}
                                onClick={() => handleBookSelect(key)}
                                className="p-6 bg-card border border-border rounded-xl hover:shadow-md transition-all hover:border-primary/50 text-left group"
                            >
                                <div className="flex items-center justify-between mb-2">
                                    <span className="font-bold text-lg">{key}</span>
                                    <Book className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                                </div>
                                <p className="text-sm text-muted-foreground line-clamp-2">{book.mnemonic}</p>
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Level 2: Chapters */}
            {selectedBook && !selectedChapter && (
                <div className="space-y-6 animate-slide-left">
                    <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 text-center">
                        <h2 className="text-3xl font-bold text-primary mb-2">{selectedBook}</h2>
                        <p className="text-xl font-medium">{data.books[selectedBook].mnemonic}</p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {data.books[selectedBook].chapters ? (
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
                        <h2 className="text-2xl font-bold text-primary mb-1">{selectedBook} {selectedChapter}</h2>
                        <p className="text-lg font-medium">{data.books[selectedBook].chapters[selectedChapter].mnemonic}</p>
                    </div>

                    <div className="space-y-3">
                        {Object.entries(data.books[selectedBook].chapters[selectedChapter].verses).map(([verseNum, verseData]) => (
                            <div key={verseNum} className="flex items-start p-4 bg-card border border-border rounded-xl">
                                <div className="bg-secondary/10 px-3 py-1 rounded-md mr-4 font-mono font-bold text-secondary">
                                    {verseNum}
                                </div>
                                <div>
                                    <p className="text-foreground">{verseData.mnemonic}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
