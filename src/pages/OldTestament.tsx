import { useState, useEffect } from "react";
import { BookOpen, Scroll, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import OTPyramidSVG from "../components/OTPyramidSVG";
import VerseLink from "../components/study/VerseLink";
import { OT_PASSAGES, type OTPassage } from "../data/otPassages";
import { getChapter, isTranslationOfflineReady } from "../data/bibleApi";

import { formatPassageText } from "../utils/bibleUtils";
import bibleMnemonics from '../data/bibleMnemonics.json';

export default function OldTestament() {
    const [hoveredBook, setHoveredBook] = useState<string | null>(null);
    const [selectedBook, setSelectedBook] = useState("Genesis");
    const [verseTexts, setVerseTexts] = useState<Record<string, string>>({});
    const [isLoadingTexts, setIsLoadingTexts] = useState(true);
    const [showAcrostic, setShowAcrostic] = useState(false);

    const handleBookClick = (book: string) => {
        setSelectedBook(book);
    };

    const handleBookHover = (book: string | null) => {
        setHoveredBook(book);
    };

    // Fetch verse texts dynamically
    useEffect(() => {
        const fetchVerses = async () => {
            setIsLoadingTexts(true);
            const selectedTranslation = localStorage.getItem("bibleTranslation") || "BSB";
            const online = navigator.onLine;
            // Check if selected translation is cached for offline use
            const isReady = await isTranslationOfflineReady(selectedTranslation);

            // Use selected translation if online OR offline+ready. Otherwise fallback to BSB (which should be local/cached).
            const effectiveTranslation = (online || isReady) ? selectedTranslation : "BSB";

            const results = await Promise.all(OT_PASSAGES.map(async (p) => {
                try {
                    const chapData = await getChapter(effectiveTranslation, p.id, p.chapter);
                    if (chapData && chapData.chapter && chapData.chapter.content) {
                        // Find the verse node
                        const verseNode = chapData.chapter.content.find((item: any) => item.type === 'verse' && item.number === p.verseNum);
                        if (verseNode && 'content' in verseNode) {
                            const text = formatPassageText(verseNode.content as any);
                            return { book: p.book, text };
                        }
                    }
                } catch (e) {
                    console.error(`Failed to fetch verse for ${p.book}`, e);
                }
                return { book: p.book, text: "Error loading text." };
            }));

            const newTexts: Record<string, string> = {};
            results.forEach(r => {
                if (r) newTexts[r.book] = r.text;
            });
            setVerseTexts(newTexts);
            setIsLoadingTexts(false);
        };

        fetchVerses();
    }, []);

    const selectedPassage = OT_PASSAGES.find((p) => p.book === selectedBook);

    // Group passages by category for the list
    const categories = ["Torah", "History", "Poetry", "Major Prophets", "Minor Prophets"];
    const groupedPassages = categories.reduce((acc, category) => {
        acc[category] = OT_PASSAGES.filter((p) => p.category === category);
        return acc;
    }, {} as Record<string, OTPassage[]>);

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in">
            {/* Introduction Section */}
            <div className="text-center space-y-4">
                <div className="max-w-3xl mx-auto">
                    <h2 className="text-xl font-semibold text-foreground text-center flex flex-col items-center justify-center gap-1 mb-4">
                        <div className="flex items-center gap-2">
                            <Scroll className="w-5 h-5 text-primary" />
                            Old Testament Overview
                        </div>
                        <p className="text-xs text-muted-foreground italic mt-1">
                            39 Passages from 39 Books mapped to 3 recurring levels of pyramids
                        </p>
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed font-light">
                        Explore the Old Testament through its key verses, arranged by structure.
                    </p>
                </div>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                {/* Left Column - Pyramid */}
                <div className="flex flex-col items-center space-y-6">
                    <div className="w-full bg-card border border-border rounded-xl p-6 lg:p-8 shadow-sm">
                        <div className="flex flex-col items-center gap-4 mb-6 px-2 sm:flex-row sm:justify-between">
                            <h2 className="text-xl font-semibold text-foreground flex flex-col gap-1 items-center sm:items-start text-center sm:text-left">
                                <div className="flex items-center gap-2">
                                    <BookOpen className="w-5 h-5 text-primary" />
                                    The Books of the Old Testament
                                </div>
                                {showAcrostic && (
                                    <p className="text-xs text-muted-foreground italic mt-1 max-w-md">
                                        "{bibleMnemonics.testaments.OT.mnemonic}"
                                    </p>
                                )}
                            </h2>
                            <button
                                onClick={() => setShowAcrostic(!showAcrostic)}
                                className="text-xs font-medium px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors border border-border flex items-center gap-2 whitespace-nowrap flex-shrink-0"
                            >
                                <span>{showAcrostic ? "Showing Acrostic" : "Showing Books"}</span>
                                <div className={`w-8 h-4 rounded-full p-0.5 transition-colors shrink-0 ${showAcrostic ? "bg-primary" : "bg-muted-foreground/30"}`}>
                                    <div className={`w-3 h-3 rounded-full bg-white shadow-sm transition-transform ${showAcrostic ? "translate-x-4" : "translate-x-0"}`} />
                                </div>
                            </button>
                        </div>
                        <div className="bg-gradient-to-br from-primary/5 to-secondary/5 rounded-xl p-4 relative overflow-hidden group">
                            <TransformWrapper
                                initialScale={1}
                                minScale={0.5}
                                maxScale={4}
                                centerOnInit={true}
                                wheel={{ step: 0.1 }}
                            >
                                {({ zoomIn, zoomOut, resetTransform }) => (
                                    <>
                                        <div className="absolute top-4 right-4 flex flex-col gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                            <button
                                                onClick={() => zoomIn()}
                                                className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                title="Zoom In"
                                            >
                                                <ZoomIn className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => zoomOut()}
                                                className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                title="Zoom Out"
                                            >
                                                <ZoomOut className="w-4 h-4" />
                                            </button>
                                            <button
                                                onClick={() => resetTransform()}
                                                className="p-2 bg-background/80 backdrop-blur-sm border border-border rounded-lg shadow-sm hover:bg-accent hover:text-accent-foreground transition-colors"
                                                title="Reset View"
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </button>
                                        </div>
                                        <TransformComponent
                                            wrapperClass="!w-full !h-full"
                                            contentClass="!w-full !h-full flex items-center justify-center"
                                        >
                                            <OTPyramidSVG
                                                selectedBook={selectedBook}
                                                hoveredBook={hoveredBook}
                                                onBookClick={handleBookClick}
                                                onBookHover={handleBookHover}
                                                showAcrostic={showAcrostic}
                                            />
                                        </TransformComponent>
                                    </>
                                )}
                            </TransformWrapper>
                        </div>

                        {/* Selected Verse Preview Card (Mobile/Desktop Quick View) */}
                        {selectedPassage && (
                            <div className="mt-4 bg-card border border-border rounded-xl p-6 shadow-sm animate-in fade-in slide-in-from-top-2 duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                        {selectedPassage.abbrev}
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="font-bold text-foreground text-lg">
                                            {selectedPassage.book}
                                        </h3>
                                        <p className="text-muted-foreground italic text-sm">
                                            {isLoadingTexts ? (
                                                <span className="animate-pulse">Loading text...</span>
                                            ) : (
                                                `"${verseTexts[selectedPassage.book] || "Text unavailable"}"`
                                            )}
                                        </p>
                                        <VerseLink
                                            reference={selectedPassage.reference.split(',')[0] ?? selectedPassage.reference}
                                            className="text-primary text-xs font-bold hover:underline block"
                                        >
                                            {selectedPassage.reference}
                                        </VerseLink>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Right Column - Scrollable List */}
                <div className="h-[600px] lg:h-[800px] overflow-hidden flex flex-col bg-card border border-border rounded-xl shadow-sm">
                    <div className="p-4 border-b border-border bg-muted/30">
                        <h3 className="font-semibold text-center text-muted-foreground text-sm uppercase tracking-wider">
                            Famous Verses
                        </h3>
                    </div>
                    <div
                        id="passage-list-desktop"
                        className="flex-1 overflow-y-auto space-y-8 scroll-smooth"
                    >
                        {categories.map((category) => (
                            <div key={category} className="space-y-4">
                                <h3 className="text-lg font-bold text-foreground border-b border-border pb-2 sticky top-0 bg-card z-10 pt-4 px-4 lg:px-6 shadow-sm">
                                    {category}
                                </h3>
                                <div className="space-y-3 px-5 lg:px-7 pb-4">
                                    {groupedPassages[category]?.map((passage) => (
                                        <div
                                            key={passage.book}
                                            id={`passage-${passage.book}`}
                                            className={`p-4 rounded-xl border transition-all cursor-pointer ${selectedBook === passage.book || hoveredBook === passage.book
                                                ? "bg-primary/10 border-primary shadow-sm transform scale-[1.01]"
                                                : "bg-card border-border hover:bg-accent/50 hover:border-primary/50"
                                                }`}
                                            onClick={() => handleBookClick(passage.book)}
                                            onMouseEnter={() => handleBookHover(passage.book)}
                                            onMouseLeave={() => handleBookHover(null)}
                                        >
                                            <div className="flex justify-between items-center mb-2">
                                                <div className="font-bold text-primary text-sm">
                                                    {passage.book}
                                                </div>
                                                <div className="text-xs text-muted-foreground font-mono bg-secondary/50 px-1.5 py-0.5 rounded">
                                                    {passage.abbrev}
                                                </div>
                                            </div>
                                            <div className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                                                {isLoadingTexts ? (
                                                    <span className="text-muted-foreground/50 italic">Loading...</span>
                                                ) : (
                                                    verseTexts[passage.book] || "Text unavailable"
                                                )}
                                            </div>
                                            <div className="text-xs text-muted-foreground mt-2 font-medium">
                                                <VerseLink
                                                    reference={passage.reference}
                                                    className="font-bold text-primary hover:underline"
                                                >
                                                    {passage.reference}
                                                </VerseLink>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
