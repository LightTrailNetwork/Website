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
                                            <span className="text-xl font-mono">
                                                <span className="text-primary font-extrabold">{word.charAt(0)}</span>
                                                <span className="text-muted-foreground">{word.slice(1, -1)}</span>
                                                <span className="text-indigo-500 font-extrabold">{word.slice(-1)}</span>
                                            </span>
                                        </div>
                                    ))}
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
            <div className="space-y-4">
                {system.items.map((item, idx) => {
                    // Armor of God specific rendering for items
                    const keyword = isArmorOfGod ? armorKeywords[idx] : null;

                    return (
                        <div key={idx} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all flex gap-4 sm:gap-6">
                            {/* Acrostic Letter / Index / Keyword Card */}
                            <div className="shrink-0 flex flex-col items-center">
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
                            <div className="flex-1 space-y-2">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                                    {isArmorOfGod && keyword ? (
                                        <h3 className="text-xl font-bold">
                                            {/* Highlight matching letters in the title */}
                                            {item.title.split(' ').map((word, wIdx, arr) => {
                                                const isFirstWord = wIdx === 0;
                                                const isLastMainWord = wIdx === arr.length - 1 || (arr.length > 2 && wIdx === arr.length - 1); // Simplified for "Belt of Truth" structure

                                                // Specific logic for "Belt of Truth", "Breastplate of Righteousness"
                                                // Structure usually: [Object] of [Attribute]
                                                // Object matches First Letter
                                                // Attribute matches Last Letter

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

                                {item.meaning && (
                                    <p className="text-muted-foreground font-medium">
                                        <span className="text-primary mr-2">Meaning:</span>
                                        {item.meaning}
                                    </p>
                                )}

                                {/* Sub Items (e.g., Prophecy/Fulfillment) */}
                                {item.subItems && (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4 pt-4 border-t border-border/50">
                                        {item.subItems.map((sub, sIdx) => (
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
                })}
            </div>
        </div>
    );
}
