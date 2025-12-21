import { useParams, Link, Navigate } from 'react-router-dom';
import { ArrowLeft, BookOpen, Brain } from 'lucide-react';
import { MNEMONIC_SYSTEMS } from '../data/mnemonicSystems';
import VerseLink from './study/VerseLink';

export default function MnemonicDetail() {
    const { id } = useParams();
    const system = MNEMONIC_SYSTEMS.find(s => s.id === id);

    if (!system) {
        return <Navigate to="/bible/memory/mnemonics" replace />;
    }

    // Logic for Armor of God visualization
    const isArmorOfGod = system.id === 'armor-of-god';
    const armorKeywords = isArmorOfGod
        ? (system.mnemonicPhrase?.split('.').map(s => s.trim().split(' ')).flat().filter(Boolean) || [])
        : [];

    // Logic for Ten Commandments visualization
    const isTenCommandments = system.id === 'ten-commandments';

    const renderItem = (item: any, idx: number) => {
        // Armor of God specific rendering for items
        const keyword = isArmorOfGod ? armorKeywords[idx] : null;

        // Ten Commandments Numbering
        const cmdNum = idx + 1;

        return (
            <div key={idx} className={`bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all flex gap-4 ${isTenCommandments ? 'items-center group' : 'sm:gap-6'}`}>

                {/* Acrostic Letter / Index / Keyword Card */}
                <div className="shrink-0 flex flex-col items-center z-10">
                    {isArmorOfGod && keyword ? (
                        <div className="flex flex-col items-center gap-2">
                            <div className="px-3 py-1 bg-secondary rounded border border-border font-mono text-sm font-bold">
                                <span className="text-primary">{keyword.charAt(0)}</span>
                                <span className="text-muted-foreground/50">{keyword.slice(1, -1)}</span>
                                <span className="text-indigo-500">{keyword.slice(-1)}</span>
                            </div>
                            <div className="h-full w-px bg-border/50 border-dashed border-l border-muted-foreground/30 min-h-[20px]" />
                        </div>
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-2xl font-black text-primary shadow-sm">
                            {item.letter || (idx + 1)}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className="flex-1 space-y-1 z-10">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                        {isArmorOfGod && keyword ? (
                            <h3 className="text-xl font-bold">
                                {/* Highlight matching letters in the title */}
                                {item.title.split(' ').map((word: string, wIdx: number, arr: string[]) => {
                                    const isFirstWord = wIdx === 0;

                                    let content: React.ReactNode = word;

                                    if (isFirstWord && word.toLowerCase().startsWith(keyword.charAt(0).toLowerCase())) {
                                        content = (
                                            <>
                                                <span className="text-primary underline decoration-primary/50 decoration-2 underline-offset-4">{word.charAt(0)}</span>
                                                {word.slice(1)}
                                            </>
                                        );
                                    } else if (word.toLowerCase().startsWith(keyword.slice(-1).toLowerCase())) {
                                        content = (
                                            <>
                                                <span className="text-indigo-500 underline decoration-indigo-500/50 decoration-2 underline-offset-4">{word.charAt(0)}</span>
                                                {word.slice(1)}
                                            </>
                                        );
                                    }

                                    return <span key={wIdx} className="mr-1.5">{content}</span>;
                                })}
                            </h3>
                        ) : isTenCommandments ? (
                            <div className="flex w-full items-baseline gap-3">
                                <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Cmd {cmdNum}</span>
                                <h3 className="text-xl sm:text-2xl font-bold">
                                    {/* Highlight Mapping Letters in Commandment */}
                                    {highlightCommandment(item.title, item.letter!, 'text-primary')}
                                </h3>
                            </div>
                        ) : (
                            <h3 className="text-xl font-bold">{item.title}</h3>
                        )}

                        {item.reference && (
                            <VerseLink
                                reference={item.reference}
                                className="text-xs font-medium bg-primary/10 text-primary px-3 py-1 rounded-full hover:bg-primary/20 transition-colors self-start sm:self-auto"
                            />
                        )}
                    </div>

                    {item.text && (
                        <p className="text-lg text-foreground/90 font-serif italic border-l-4 border-primary/20 pl-4 py-1">
                            "{item.text}"
                        </p>
                    )}

                    {isTenCommandments && (
                        <div className="w-full h-px bg-border/50 mt-4" />
                    )}

                    {item.meaning && (
                        <p className="text-muted-foreground font-medium pt-1">
                            <span className="text-primary mr-2 font-bold">Meaning:</span>
                            {item.meaning}
                        </p>
                    )}

                    {/* Sub Items (e.g., Prophecy/Fulfillment) */}
                    {item.subItems && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
                            {item.subItems.map((sub: any, sIdx: number) => (
                                <div key={sIdx} className="bg-secondary/5 rounded-lg p-3">
                                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-wider block mb-1">
                                        {sub.label}
                                    </span>
                                    <p className="text-sm font-medium">{sub.text}</p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        );
    };

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 pb-20 animate-fade-in space-y-8">
            {/* Header */}
            <div className="pt-8 space-y-4">
                <Link to="/bible/memory/mnemonics" className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4">
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Mnemonics
                </Link>

                <div className="bg-card border border-border rounded-xl p-8 shadow-sm space-y-6">
                    <div>
                        <h1 className="text-3xl sm:text-4xl font-bold mb-2">{system.title}</h1>
                        <p className="text-xl text-primary font-medium">{system.subtitle}</p>
                    </div>

                    <p className="text-lg text-muted-foreground leading-relaxed">
                        {system.description}
                    </p>

                    {system.mnemonicPhrase && (
                        <div className="bg-primary/5 border border-primary/20 rounded-lg p-6 text-center">
                            <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest mb-3">Memory Aid</h3>

                            {isArmorOfGod ? (
                                <div className="flex flex-wrap justify-center gap-3">
                                    {armorKeywords.map((word, idx) => (
                                        <div key={idx} className="bg-card border border-primary/30 px-4 py-2 rounded-lg shadow-sm">
                                            <span className="text-xl font-mono block">
                                                <span className="text-primary font-extrabold">{word.charAt(0)}</span>
                                                <span className="text-muted-foreground">{word.slice(1, -1)}</span>
                                                <span className="text-indigo-500 font-extrabold">{word.slice(-1)}</span>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : isTenCommandments ? (
                                <div className="space-y-6">
                                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-3xl sm:text-5xl font-mono font-bold tracking-wide">
                                        {/* FINiSH */}
                                        <div className="flex">
                                            <span className="text-primary">F</span>
                                            <span className="text-primary">I</span>
                                            <span className="text-primary">N</span>
                                            <span className="text-muted-foreground/50 font-normal italic text-4xl mt-1">i</span>
                                            <span className="text-primary">S</span>
                                            <span className="text-primary">H</span>
                                        </div>

                                        {/* MAd */}
                                        <div className="flex">
                                            <span className="text-primary">M</span>
                                            <span className="text-primary">A</span>
                                            <span className="text-primary font-normal lowercase text-4xl mt-1">d</span>
                                        </div>

                                        {/* SLiCk */}
                                        <div className="flex">
                                            <span className="text-primary">S</span>
                                            <span className="text-primary">L</span>
                                            <span className="text-muted-foreground/50 font-normal lowercase text-4xl mt-1">i</span>
                                            <span className="text-primary">C</span>
                                            <span className="text-muted-foreground/50 font-normal lowercase text-4xl mt-1">k</span>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-2xl sm:text-3xl font-mono font-bold text-primary break-words">
                                    {system.mnemonicPhrase}
                                </p>
                            )}
                        </div>
                    )}

                    {isArmorOfGod && (
                        <div className="text-sm text-muted-foreground bg-secondary/20 p-4 rounded-lg">
                            <p className="font-medium text-center">
                                <span className="text-primary font-bold">First Letter</span> = First word of Armor <span className="mx-2">•</span> <span className="text-indigo-500 font-bold">Last Letter</span> = Attribute (Truth, Righteousness, etc.)
                            </p>
                        </div>
                    )}

                    {system.translationNote && (
                        <p className="text-xs text-muted-foreground italic text-center">
                            * Based on {system.translationNote} translation
                        </p>
                    )}
                </div>
            </div>

            {/* List Items */}
            {isTenCommandments ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6">
                        {system.items.slice(0, 5).map((item, i) => renderItem(item, i))}
                    </div>
                    <div className="space-y-6">
                        {system.items.slice(5).map((item, i) => renderItem(item, i + 5))}
                    </div>
                </div>
            ) : (
                <div className="space-y-4">
                    {system.items.map(renderItem)}
                </div>
            )}
        </div>
    );
}

// Helper to highlight 10 Commandments letters
function highlightCommandment(text: string, letters: string, colorClass: string) {
    // Basic logic: Find the letters in the text and wrap them
    // Note: Use a more robust regex approach for production if needed, but this works for simple "First", "Murder", etc.

    // Case 1: First Letter Match (Most cases: First, Idol, Name, Sabbath, Honor, Murder, Steal, Covet)
    if (text.toUpperCase().startsWith(letters.toUpperCase())) {
        return (
            <>
                <span className={`${colorClass} underline decoration-primary/30 decoration-2 underline-offset-4`}>{text.substring(0, letters.length)}</span>
                {text.substring(letters.length)}
            </>
        );
    }

    // Case 2: Contains Match (Adultery -> AD, Lying -> LI)
    // Actually our data has "No Adultery", "No Lying".
    // So we need to find the word that starts with the letters.

    const words = text.split(' ');
    // Find matching word
    const matchIndex = words.findIndex(w => w.toUpperCase().startsWith(letters.toUpperCase()));

    if (matchIndex !== -1) {
        return (
            <>
                {words.map((word, i) => {
                    if (i === matchIndex) {
                        return (
                            <span key={i} className="mr-1.5">
                                <span className={`${colorClass} underline decoration-primary/30 decoration-2 underline-offset-4`}>{word.substring(0, letters.length)}</span>
                                {word.substring(letters.length)}
                            </span>
                        );
                    }
                    return <span key={i} className="mr-1.5">{word}</span>;
                })}
            </>
        );
    }

    return text;
}

function toRoman(num: number): string {
    const roman = {
        1: 'I', 2: 'II', 3: 'III', 4: 'IV', 5: 'V',
        6: 'VI', 7: 'VII', 8: 'VIII', 9: 'IX', 10: 'X'
    };
    return (roman as any)[num] || num.toString();
}
