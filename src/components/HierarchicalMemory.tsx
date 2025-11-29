import { useState } from 'react';
import { ChevronRight, ChevronLeft, Book } from 'lucide-react';
import mnemonicsData from '../data/bibleMnemonics.json';

// Types for our JSON structure
type VerseData = { mnemonic: string };
type ChapterData = { mnemonic: string; verses: Record<string, VerseData> };
type BookData = { mnemonic: string; chapters?: Record<string, ChapterData> };
type MnemonicsData = { books: Record<string, BookData> };

const data = mnemonicsData as unknown as MnemonicsData;

export default function HierarchicalMemory() {
    const [selectedBook, setSelectedBook] = useState<string | null>(null);
    const [selectedChapter, setSelectedChapter] = useState<string | null>(null);

    const handleBookSelect = (bookId: string) => {
        setSelectedBook(bookId);
        setSelectedChapter(null);
    };

    const handleChapterSelect = (chapterNum: string) => {
        setSelectedChapter(chapterNum);
    };

    const reset = () => {
        setSelectedBook(null);
        setSelectedChapter(null);
    };

    // Render Book Level
    if (!selectedBook) {
        return (
            <div className="space-y-6 animate-fade-in">
                <h2 className="text-2xl font-bold text-center">Select a Book</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {Object.entries(data.books).map(([id, book]) => (
                        <button
                            key={id}
                            onClick={() => handleBookSelect(id)}
                            className="p-4 bg-card border border-border rounded-xl hover:border-primary/50 hover:shadow-sm transition-all text-left"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <span className="font-bold text-lg">{id}</span>
                                <Book className="w-4 h-4 text-muted-foreground" />
                            </div>
                            <p className="text-sm text-muted-foreground font-medium">
                                {book.mnemonic}
                            </p>
                        </button>
                    ))}
                </div>
            </div>
        );
    }

    const bookData = data.books[selectedBook];
    if (!bookData) return null;
    const bookMnemonic = bookData.mnemonic;

    // Render Chapter Level
    if (!selectedChapter) {
        return (
            <div className="space-y-6 animate-fade-in">
                <button
                    onClick={reset}
                    className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                    <ChevronLeft className="w-4 h-4 mr-1" /> Back to Books
                </button>

                <div className="text-center space-y-2">
                    <h2 className="text-3xl font-bold">{selectedBook}</h2>
                    <p className="text-xl font-medium text-primary">{bookMnemonic}</p>
                    <p className="text-sm text-muted-foreground">Click a letter to drill down to the chapter</p>
                </div>

                <div className="flex flex-wrap justify-center gap-2 mt-8">
                    {bookMnemonic.split('').map((char, index) => {
                        if (char === ' ') return <div key={index} className="w-4" />; // Spacer

                        // Determine chapter number (1-based index ignoring spaces is tricky, 
                        // usually the mnemonic length matches chapter count exactly)
                        // Let's assume 1-to-1 mapping for now as per spec
                        // Better approach: Map the cleaned string index to chapter number
                        const cleanIndex = bookMnemonic.substring(0, index).replace(/ /g, '').length + 1;
                        const hasData = bookData.chapters && bookData.chapters[cleanIndex.toString()];

                        return (
                            <button
                                key={index}
                                disabled={!hasData}
                                onClick={() => handleChapterSelect(cleanIndex.toString())}
                                className={`w-10 h-14 rounded-lg flex items-center justify-center text-xl font-bold transition-all
                  ${hasData
                                        ? 'bg-card border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground shadow-sm'
                                        : 'bg-muted/30 text-muted-foreground cursor-not-allowed border border-transparent'
                                    }`}
                            >
                                {char}
                            </button>
                        );
                    })}
                </div>
            </div>
        );
    }

    // Render Verse Level
    const chapterData = bookData.chapters?.[selectedChapter];
    if (!chapterData) return null;

    return (
        <div className="space-y-6 animate-fade-in">
            <button
                onClick={() => setSelectedChapter(null)}
                className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors"
            >
                <ChevronLeft className="w-4 h-4 mr-1" /> Back to {selectedBook}
            </button>

            <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold">{selectedBook} {selectedChapter}</h2>
                <p className="text-lg font-medium text-secondary">{chapterData.mnemonic}</p>
            </div>

            <div className="space-y-4 mt-8">
                {Object.entries(chapterData.verses).map(([verseNum, verse]) => (
                    <div key={verseNum} className="flex items-start p-4 bg-card border border-border rounded-lg">
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold mr-4 shrink-0">
                            {verseNum}
                        </div>
                        <div>
                            <p className="font-medium text-foreground">{verse.mnemonic}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
