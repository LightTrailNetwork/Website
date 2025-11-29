import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, BookOpen, Loader2, AlertCircle, MessageSquare } from 'lucide-react';
import { getChapter } from '../data/bibleApi';
import type { BibleChapter, ChapterContent } from '../data/bibleApi';

// Simple mock for commentaries since the API endpoint structure wasn't fully detailed in the prompt
// In a real scenario, we'd fetch this from the API
const MOCK_COMMENTARY = {
    "GEN": {
        "1": "In the beginning... This chapter establishes God as the sovereign creator of the universe. The days of creation are structured to form a habitat and then fill it with inhabitants."
    }
};

export default function BibleReader() {
    const { bookId, chapter } = useParams<{ bookId: string; chapter: string }>();
    const navigate = useNavigate();

    const [bsbChapter, setBsbChapter] = useState<BibleChapter | null>(null);
    const [msbChapter, setMsbChapter] = useState<BibleChapter | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showMsb, setShowMsb] = useState(false);
    const [showCommentary, setShowCommentary] = useState(false);
    const [commentary, setCommentary] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (!bookId || !chapter) return;

            setLoading(true);
            setError(null);
            setCommentary(null);

            try {
                // Fetch BSB (primary)
                const bsbData = await getChapter('BSB', bookId, parseInt(chapter));
                setBsbChapter(bsbData);

                // Fetch MSB (comparison) - fail silently if not available
                try {
                    const msbData = await getChapter('MSB', bookId, parseInt(chapter));
                    setMsbChapter(msbData);
                } catch (e) {
                    console.warn('MSB not available for this chapter');
                }

                // Load commentary (mock for now)
                // In real app: const comm = await getCommentary(bookId, chapter);
                const comm = MOCK_COMMENTARY[bookId as keyof typeof MOCK_COMMENTARY]?.[chapter as keyof (typeof MOCK_COMMENTARY)["GEN"]];
                if (comm) setCommentary(comm);

            } catch (err) {
                console.error('Error fetching chapter:', err);
                setError('Failed to load chapter. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [bookId, chapter]);

    const handleNext = () => {
        if (bsbChapter?.nextChapterApiLink) {
            const nextChap = parseInt(chapter || '1') + 1;
            navigate(`/bible/read/${bookId}/${nextChap}`);
        }
    };

    const handlePrev = () => {
        if (bsbChapter?.previousChapterApiLink) {
            const prevChap = parseInt(chapter || '1') - 1;
            if (prevChap > 0) {
                navigate(`/bible/read/${bookId}/${prevChap}`);
            }
        }
    };

    // Helper to render content
    const renderContent = (content: ChapterContent[], comparisonContent?: ChapterContent[]) => {
        return content.map((item, index) => {
            if (item.type === 'heading') {
                return (
                    <h3 key={index} className="text-xl font-semibold mt-6 mb-3 text-primary">
                        {item.content.join(' ')}
                    </h3>
                );
            }

            if (item.type === 'line_break') {
                return <br key={index} />;
            }

            if (item.type === 'verse') {
                // Check for differences if MSB is available
                const msbVerse = comparisonContent?.find(
                    c => c.type === 'verse' && c.number === item.number
                ) as Extract<ChapterContent, { type: 'verse' }> | undefined;

                const hasDifference = msbVerse && JSON.stringify(item.content) !== JSON.stringify(msbVerse.content);

                return (
                    <span key={index} className="relative group">
                        <sup className="text-xs text-muted-foreground font-medium mr-1 select-none">
                            {item.number}
                        </sup>
                        <span
                            className={`leading-relaxed ${hasDifference && showMsb ? 'bg-yellow-500/10 decoration-yellow-500/30 underline decoration-dotted' : ''}`}
                            title={hasDifference ? "Click to toggle MSB comparison" : undefined}
                            onClick={() => hasDifference && setShowMsb(!showMsb)}
                        >
                            {item.content.map((c, i) => {
                                if (typeof c === 'string') return c;
                                if ('text' in c) return <span key={i} className={c.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""}>{c.text}</span>;
                                return null;
                            })}
                        </span>
                        {hasDifference && showMsb && (
                            <div className="my-2 p-3 bg-secondary/10 rounded-lg border border-secondary/20 text-sm">
                                <span className="font-bold text-secondary text-xs uppercase tracking-wider block mb-1">
                                    Majority Standard Bible (MSB)
                                </span>
                                {msbVerse.content.map((c, i) => {
                                    if (typeof c === 'string') return c;
                                    if ('text' in c) return <span key={i} className={c.wordsOfJesus ? "text-red-700 dark:text-red-400" : ""}>{c.text}</span>;
                                    return null;
                                })}
                            </div>
                        )}
                        {' '}
                    </span>
                );
            }

            return null;
        });
    };

    if (loading) {
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
        <div className="flex gap-6 relative">
            <div className={`flex-1 max-w-3xl mx-auto pb-20 animate-fade-in transition-all ${showCommentary ? 'lg:mr-[320px]' : ''}`}>
                {/* Navigation Header */}
                <div className="sticky top-20 z-10 bg-background/80 backdrop-blur-md border-b border-border p-4 mb-6 flex items-center justify-between rounded-b-xl">
                    <button
                        onClick={handlePrev}
                        disabled={!bsbChapter.previousChapterApiLink}
                        className="p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors"
                    >
                        <ChevronLeft className="w-6 h-6" />
                    </button>

                    <div className="text-center">
                        <h2 className="text-xl font-bold">{bsbChapter.book.name} {bsbChapter.chapter.number}</h2>
                        <p className="text-xs text-muted-foreground">Berean Standard Bible</p>
                    </div>

                    <button
                        onClick={handleNext}
                        disabled={!bsbChapter.nextChapterApiLink}
                        className="p-2 hover:bg-accent/10 rounded-full disabled:opacity-30 transition-colors"
                    >
                        <ChevronRight className="w-6 h-6" />
                    </button>
                </div>

                {/* Chapter Content */}
                <div className="prose prose-lg dark:prose-invert max-w-none px-4">
                    {renderContent(bsbChapter.chapter.content, msbChapter?.chapter.content)}
                </div>
            </div>

            {/* Commentary Sidebar */}
            {showCommentary && (
                <div className="hidden lg:block fixed right-4 top-24 bottom-4 w-80 bg-card border border-border rounded-xl shadow-lg overflow-y-auto p-6 animate-slide-left">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-lg flex items-center">
                            <MessageSquare className="w-4 h-4 mr-2 text-primary" /> Commentary
                        </h3>
                        <button onClick={() => setShowCommentary(false)} className="text-muted-foreground hover:text-foreground">
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                    <div className="prose prose-sm dark:prose-invert">
                        {commentary ? (
                            <p>{commentary}</p>
                        ) : (
                            <p className="text-muted-foreground italic">No commentary available for this chapter.</p>
                        )}
                    </div>
                </div>
            )}

            {/* Footer Controls */}
            <div className="fixed bottom-6 right-6 flex gap-2 z-50">
                {msbChapter && (
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
            </div>
        </div>
    );
}
