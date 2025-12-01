import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BookOpen, Loader2, AlertCircle, Grid, ChevronLeft, MessageSquare, Search } from 'lucide-react';
import { getBooks, getCommentaries, getCommentaryChapter } from '../data/bibleApi';
import type { BibleBook, Commentary } from '../data/bibleApi';
import Breadcrumbs from './Breadcrumbs';
import QuickNav from './QuickNav';

// Helper to format raw introduction text
const formatIntroduction = (text: string): string => {
    if (!text) return '';

    // 1. Fix missing spaces between lowercase and uppercase letters (e.g., "SamuelOtherwise")
    // Exclude common exceptions if any, but for old commentaries this is usually safe.
    let formatted = text.replace(/([a-z])([A-Z])/g, '$1 $2');

    // 2. Handle newlines
    // If the text contains HTML tags, we assume it's already formatted (mostly).
    // If it doesn't, or if it's just text with \n, we need to convert \n to <br>.
    if (!text.includes('<p>') && !text.includes('<br>')) {
        formatted = formatted.replace(/\n/g, '<br />');
    }

    return formatted;
};

export default function BibleBookSummary() {
    const { bookId } = useParams<{ bookId: string }>();
    const navigate = useNavigate();

    const [book, setBook] = useState<BibleBook | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [commentaries, setCommentaries] = useState<Commentary[]>([]);
    const [introText, setIntroText] = useState<string | null>(null);
    const [showQuickNav, setShowQuickNav] = useState(false);
    const [allBooks, setAllBooks] = useState<BibleBook[]>([]);

    // Scroll to top when book changes
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [bookId]);

    useEffect(() => {
        const fetchData = async () => {
            if (!bookId) return;
            setLoading(true);
            try {
                // Fetch books to find the current one
                const books = await getBooks('BSB');
                setAllBooks(books);
                // Try direct ID match first
                let currentBook = books.find(b => b.id === bookId);

                // If not found, try name match
                if (!currentBook) {
                    const normalizedId = bookId.toLowerCase().replace(/\s+/g, '');
                    currentBook = books.find(b =>
                        b.name.toLowerCase().replace(/\s+/g, '') === normalizedId ||
                        b.commonName.toLowerCase().replace(/\s+/g, '') === normalizedId
                    );
                }

                if (!currentBook) {
                    setError('Book not found');
                    setLoading(false);
                    return;
                }
                setBook(currentBook);

                // Fetch available commentaries
                const comms = await getCommentaries();
                setCommentaries(comms);

                // Try to fetch intro from the default commentary (MHC or first available)
                if (comms.length > 0) {
                    const mhc = comms.find(c => c.id === 'MHC');
                    const defaultCommId = mhc ? mhc.id : comms[0].id;
                    try {
                        // Fetch chapter 1 to get the book introduction
                        const commChapter = await getCommentaryChapter(defaultCommId, bookId, 1);
                        if (commChapter && commChapter.book && commChapter.book.introduction) {
                            setIntroText(formatIntroduction(commChapter.book.introduction));
                        }
                    } catch (e) {
                        console.warn('Failed to fetch intro', e);
                    }
                }

            } catch (err) {
                console.error('Error fetching book data:', err);
                setError('Failed to load book data.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookId]);

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Loading book details...</p>
            </div>
        );
    }

    if (error || !book) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[50vh] space-y-4 text-center">
                <AlertCircle className="w-12 h-12 text-destructive" />
                <h3 className="text-lg font-semibold">Error</h3>
                <p className="text-muted-foreground">{error || 'Book not found'}</p>
                <Link to="/bible" className="text-primary hover:underline">Return to Bible</Link>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto px-4 pb-20 animate-fade-in">
            <div className="flex items-center justify-between mb-4">
                <Breadcrumbs
                    items={[
                        { label: 'Bible', to: '/bible' },
                        { label: book.name }
                    ]}
                />
                <button
                    onClick={() => setShowQuickNav(true)}
                    className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                    <Search className="w-4 h-4" />
                    Browse Books
                </button>
            </div>

            {/* Book Header */}
            <div className="mb-8 text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen className="w-8 h-8 text-primary" />
                </div>
                <h1 className="text-4xl font-bold text-foreground">{book.name}</h1>
                {book.commonName && book.commonName !== book.name && (
                    <p className="text-xl text-muted-foreground">{book.commonName}</p>
                )}
                <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="bg-secondary/10 px-3 py-1 rounded-full">
                        {book.numberOfChapters} Chapters
                    </span>
                    <span className="bg-secondary/10 px-3 py-1 rounded-full">
                        {book.order < 40 ? 'Old Testament' : 'New Testament'}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Main Content: Chapters */}
                <div className="md:col-span-2 space-y-8">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h2 className="text-xl font-bold mb-4 flex items-center">
                            <Grid className="w-5 h-5 mr-2 text-primary" />
                            Chapters
                        </h2>
                        <div className="grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 gap-3">
                            {Array.from({ length: book.numberOfChapters }, (_, i) => i + 1).map(chap => (
                                <Link
                                    key={chap}
                                    to={`/bible/read/${book.name.replace(/\s+/g, '')}/${chap}`}
                                    className="aspect-square flex items-center justify-center rounded-lg bg-secondary/10 hover:bg-primary hover:text-primary-foreground transition-all font-medium text-sm"
                                >
                                    {chap}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Introduction (if available) */}
                    {introText && (
                        <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                            <h2 className="text-xl font-bold mb-4">Introduction</h2>
                            <div
                                className="prose prose-sm dark:prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: introText }}
                            />
                        </div>
                    )}
                </div>

                {/* Sidebar: Info & Commentaries */}
                <div className="space-y-6">
                    {/* Quick Facts */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold mb-4 text-lg">Quick Facts</h3>
                        <ul className="space-y-3 text-sm">
                            <li className="flex justify-between border-b border-border pb-2">
                                <span className="text-muted-foreground">Book Order</span>
                                <span className="font-medium">#{book.order}</span>
                            </li>
                            <li className="flex justify-between">
                                <span className="text-muted-foreground">Chapters</span>
                                <span className="font-medium">{book.numberOfChapters}</span>
                            </li>
                        </ul>
                    </div>

                    {/* Available Commentaries */}
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="font-bold mb-4 text-lg flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2 text-primary" />
                            Available Commentaries
                        </h3>
                        <p className="text-xs text-muted-foreground mb-4">
                            These commentaries are available for in-depth study of {book.name}.
                        </p>
                        <div className="space-y-2">
                            {commentaries.map(comm => (
                                <div key={comm.id} className="p-3 bg-secondary/5 rounded-lg border border-border/50 hover:border-primary/30 transition-colors">
                                    <div className="font-medium text-sm">{comm.name}</div>
                                    <div className="text-xs text-muted-foreground mt-1">{comm.languageEnglishName}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <QuickNav
                isOpen={showQuickNav}
                onClose={() => setShowQuickNav(false)}
                books={allBooks}
                onNavigate={(bookId, chapter) => {
                    const bookName = allBooks.find(b => b.id === bookId)?.name.replace(/\s+/g, '') || bookId;
                    navigate(`/bible/read/${bookName}/${chapter}`);
                }}
                onNavigateToBookOverview={(bookId) => {
                    const bookName = allBooks.find(b => b.id === bookId)?.name.replace(/\s+/g, '') || bookId;
                    navigate(`/bible/read/${bookName}`);
                }}
            />
        </div>
    );
}
