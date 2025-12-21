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

    // Logic for Beatitudes visualization
    const isBeatitudes = system.id === 'beatitudes';

    // Logic for Overseer visualization
    const isOverseer = system.id === 'overseer-qualifications';

    const renderItem = (item: any, idx: number) => {
        // Armor of God specific rendering
        const keyword = isArmorOfGod ? armorKeywords[idx] : null;

        // Ten Commandments Numbering
        const cmdNum = idx + 1;

        // Beatitudes Custom Rendering
        if (isBeatitudes) {
            return (
                <div key={idx} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 relative overflow-hidden">
                    {/* Visual Mnemonic Anchor */}
                    <div className="shrink-0 flex flex-col items-center justify-center sm:w-32 text-center z-10">
                        <div className="bg-primary/10 rounded-lg px-4 py-3 border border-primary/20 w-full mb-2">
                            <span className="text-xl font-bold font-mono tracking-wide">
                                {item.letter === "PoorSH" && <><span className="text-primary">Poor</span><span className="text-muted-foreground">SH</span></>}
                                {item.letter === "Mour" && <><span className="text-primary">Mour</span><span className="text-muted-foreground text-sm block">Comfort</span></>}
                                {item.letter === "ME" && <span className="text-primary">ME</span>}
                                {item.letter === "HeaTHeR" && <><span className="text-primary">Hea</span><span className="text-muted-foreground">T</span><span className="text-primary">HeR</span></>}
                                {item.letter === "Mercy" && <><span className="text-primary">Mercy</span><span className="text-muted-foreground text-sm block">Mercy</span></>}
                                {item.letter === "PuGo" && <><span className="text-primary">Pu</span><span className="text-muted-foreground">Go</span></>}
                                {item.letter === "Make Sons" && <><span className="text-primary">Make</span> <span className="text-muted-foreground">Sons</span></>}
                                {item.letter === "PRiuS" && <><span className="text-primary">PR</span><span className="text-muted-foreground lowercase">iu</span><span className="text-primary">S</span></>}
                            </span>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-muted-foreground font-bold">Memory Key</p>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-2 z-10">
                        <h3 className="text-xl font-bold text-foreground">
                            {item.title}
                        </h3>
                        {item.text && (
                            <p className="text-lg text-muted-foreground italic font-medium">
                                "{item.text}"
                            </p>
                        )}
                        {item.letter === "PRiuS" && (
                            <div className="mt-2 text-xs text-muted-foreground/70 font-mono">
                                <span className="text-primary font-bold">KOH</span>nstantly = <span className="text-primary font-bold">K</span>ingdom <span className="text-primary font-bold">O</span>f <span className="text-primary font-bold">H</span>eaven
                            </div>
                        )}
                    </div>
                </div>
            );
        }

        // Overseer Custom Rendering
        if (isOverseer) {
            let titleNode: React.ReactNode = item.title;

            // Highlighting logic
            if (item.letter === "ARch") { // Above reproach
                // Note: user said "ch" is last two letters of Reproach. But "AR" is "Above Reproach". Wait. "ARCH". A-R-ch.
                // "AR is 'Above Reproach' and the 'ch' is the last two letters of 'Reproach'"
                titleNode = <><span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">A</span>bove <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">R</span>eproa<span className="text-muted-foreground font-bold underline decoration-muted-foreground/30 underline-offset-4">ch</span></>;
            }
            else if (item.letter === "HOW") { // Husband of one wife
                titleNode = <><span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">H</span>usband of <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">O</span>ne <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">W</span>ife</>;
            }
            else if (item.letter === "SOMe") { // Sober-minded
                titleNode = <><span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">So</span>ber-<span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">M</span>ind<span className="text-muted-foreground font-bold underline decoration-muted-foreground/30 underline-offset-4">e</span>d</>; // "SOMe" -> SO ber M ind e d? SO-M-e?
            }
            else if (item.letter === "SECONd") { // Self-controlled
                // SECONd -> SElf-CONtrolled
                titleNode = <><span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Se</span>lf-<span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Con</span>trolle<span className="text-muted-foreground font-bold underline decoration-muted-foreground/30 underline-offset-4">d</span></>;
            }
            else if (item.letter === "R") {
                titleNode = <><span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">R</span>espectable</>;
            }
            else if (item.letter === "H") {
                titleNode = <><span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">H</span>ospitable</>;
            }
            else if (item.letter === "AT") {
                titleNode = <><span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">A</span>ble to <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">T</span>each</>;
            }
            else if (item.letter === "Drunkard") {
                titleNode = <>Not a <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Drunkard</span></>;
            }
            else if (item.letter === "Violent") {
                titleNode = <>Not <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Violent</span></>;
            }
            else if (item.letter === "Quarrelsome") {
                titleNode = <>Not <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">Quarrelsome</span></>;
            }
            else if (item.letter === "money") {
                titleNode = <>Not a lover of <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">money</span></>;
            }

            return (
                <div key={idx} className="bg-card border border-border rounded-xl p-6 hover:shadow-md transition-all flex flex-col sm:flex-row gap-6 relative overflow-hidden items-center text-center sm:text-left">
                    <div className="shrink-0 flex items-center justify-center sm:w-32 z-10">
                        <div className="bg-primary/10 rounded-lg px-4 py-2 border border-primary/20 mb-2 font-mono font-bold text-lg min-w-[80px]">
                            {item.letter === 'money' ? item.letter :
                                item.letter.split('').map((char: string, cIdx: number) => {
                                    // Simple logic to dim lowercase letters if they are filler?
                                    // For Overseer, uppercase are mainly primary
                                    return <span key={cIdx} className={char === char.toUpperCase() ? 'text-primary' : 'text-muted-foreground'}>{char}</span>
                                })
                            }
                        </div>
                    </div>

                    <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground">
                            {titleNode}
                        </h3>
                    </div>
                </div>
            );
        }

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
                        <p className="text-xl text-primary font-medium">
                            {isBeatitudes || isOverseer ? (
                                <VerseLink reference={system.subtitle} className="hover:underline decoration-primary underline-offset-4">
                                    {system.subtitle}
                                </VerseLink>
                            ) : (
                                system.subtitle
                            )}
                        </p>
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
                            ) : isBeatitudes ? (
                                <div className="text-lg sm:text-2xl font-medium leading-relaxed max-w-2xl mx-auto space-y-4 font-mono text-left bg-card p-6 rounded-xl border border-border/50 shadow-sm">
                                    <div className="space-y-2">
                                        <p>
                                            <span className="text-primary font-bold">PoorSH</span> (is) <br />
                                            <span className="text-primary font-bold">Mour Comfort</span>(able), <br />
                                            (for) <span className="text-primary font-bold">ME</span>.
                                        </p>
                                        <p>
                                            <span className="text-primary font-bold">HeaTHeR</span> (is) <span className="text-primary font-bold">Satisfied</span> <br />
                                            <span className="text-primary font-bold gap-2">Mercy Mercy</span>, <br />
                                            (with) <span className="text-primary font-bold">PuGo</span> <span className="text-xs text-muted-foreground italic align-middle ml-1">[like the car]</span>.
                                        </p>
                                        <p>
                                            (We) <span className="text-primary font-bold">Make</span> (our) <span className="text-primary font-bold">Sons</span> <br />
                                            (drive the) <span className="text-primary font-bold">PRiuS KOH</span>nstantly.
                                        </p>
                                    </div>

                                    <div className="pt-4 border-t border-border/50 text-base text-muted-foreground italic">
                                        "Porsche is more comfortable for me. Heather is satisfied, mercy mercy, with Peugeot. We make our sons drive the Prius constantly."
                                    </div>
                                </div>
                            ) : isOverseer ? (
                                <div className="text-lg sm:text-2xl font-medium leading-relaxed max-w-2xl mx-auto space-y-4 font-mono text-left bg-card p-6 rounded-xl border border-border/50 shadow-sm">
                                    <div className="space-y-2">
                                        <p>
                                            <span className="text-primary font-bold">ARch</span>(ee), <span className="text-primary font-bold">HOW</span> (does) <br />
                                            <span className="text-primary font-bold">SOMe SECONd</span> <br />
                                            <span className="text-primary font-bold">RHAT</span> <span className="text-xs text-muted-foreground italic align-middle ml-1">[pronounced "rate"]</span>
                                        </p>
                                        <p>
                                            <span className="text-primary font-bold">Drunkard</span> (who is) <br />
                                            <span className="text-primary font-bold">Violent</span> (and) <br />
                                            <span className="text-primary font-bold">Quarrelsome</span> <br />
                                            (have any) <span className="text-primary font-bold">money</span>?
                                        </p>
                                    </div>
                                    <div className="pt-4 border-t border-border/50 text-base text-muted-foreground italic">
                                        "Archie, how does some second rate drunkard who is violent and quarrelsome have any money?"
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
