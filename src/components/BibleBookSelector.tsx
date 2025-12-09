import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronDown, ChevronRight, Book, BookOpen } from 'lucide-react';
import { getBooks } from '../data/bibleApi';
import type { BibleBook } from '../data/bibleApi';

const BOOK_CATEGORIES = {
    'Old Testament': {
        'Torah': ['Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy'],
        'History': ['Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel', '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther'],
        'Poetry': ['Job', 'Psalms', 'Proverbs', 'Ecclesiastes', 'Song of Solomon'],
        'Major Prophets': ['Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel'],
        'Minor Prophets': ['Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah', 'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi']
    },
    'New Testament': {
        'Gospels': ['Matthew', 'Mark', 'Luke', 'John'],
        'History': ['Acts'],
        'Pauline Epistles': ['Romans', '1 Corinthians', '2 Corinthians', 'Galatians', 'Ephesians', 'Philippians', 'Colossians', '1 Thessalonians', '2 Thessalonians', '1 Timothy', '2 Timothy', 'Titus', 'Philemon'],
        'General Epistles': ['Hebrews', 'James', '1 Peter', '2 Peter', '1 John', '2 John', '3 John', 'Jude'],
        'Prophecy': ['Revelation']
    }
};

export default function BibleBookSelector() {
    const navigate = useNavigate();
    const [books, setBooks] = useState<BibleBook[]>([]);
    const [expandedCategory, setExpandedCategory] = useState<string | null>('Old Testament');
    const [expandedGenre, setExpandedGenre] = useState<string | null>('New Testament-Gospels'); // Default open for quick access

    useEffect(() => {
        const fetchBooks = async () => {
            const data = await getBooks();
            setBooks(data);
        };
        fetchBooks();
    }, []);

    const getBookObj = (name: string) => books.find(b => b.name === name || b.commonName === name);

    return (
        <div className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {Object.entries(BOOK_CATEGORIES).map(([testament, genres]) => (
                    <div key={testament} className="space-y-4">
                        <h3 className="text-xl font-bold text-foreground flex items-center gap-2 pb-2 border-b border-border">
                            <Book className="w-5 h-5 text-primary" />
                            {testament}
                        </h3>

                        <div className="space-y-3">
                            {Object.entries(genres).map(([genre, bookNames]) => {
                                const uniqueKey = `${testament}-${genre}`;
                                const isExpanded = expandedGenre === uniqueKey;

                                return (
                                    <div key={genre} className="bg-card border border-border rounded-lg overflow-hidden">
                                        <button
                                            onClick={() => setExpandedGenre(isExpanded ? null : uniqueKey)}
                                            className="w-full flex items-center justify-between p-3 hover:bg-secondary/10 transition-colors"
                                        >
                                            <span className="font-medium text-sm text-muted-foreground uppercase tracking-wider">{genre}</span>
                                            {isExpanded ? <ChevronDown className="w-4 h-4 text-muted-foreground" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                                        </button>

                                        {isExpanded && (
                                            <div className="p-3 pt-0 grid grid-cols-2 sm:grid-cols-3 gap-2 animate-in slide-in-from-top-2 duration-200">
                                                {bookNames.map(name => {
                                                    const book = getBookObj(name);
                                                    if (!book) return null;

                                                    return (
                                                        <button
                                                            key={name}
                                                            onClick={() => navigate(`/bible/read/${book.name.replace(/\s+/g, '')}/1`)}
                                                            className="text-left px-3 py-2 rounded-md hover:bg-primary/10 hover:text-primary transition-colors text-sm truncate"
                                                            title={name}
                                                        >
                                                            {name}
                                                        </button>
                                                    );
                                                })}
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
