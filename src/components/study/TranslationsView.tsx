import React from 'react';
import { BookOpen, Scale, Scroll, FileText, ArrowRightLeft, Info, Library } from 'lucide-react';
import { TRANSLATIONS, TEXT_FAMILIES } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function TranslationsView() {

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'Formal Equivalence': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300';
            case 'Optimal Equivalence': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300';
            case 'Dynamic Equivalence': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300';
            case 'Paraphrase': return 'bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300';
            default: return 'bg-secondary text-foreground';
        }
    };

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500/10 to-amber-500/10 rounded-2xl p-8 border border-orange-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-orange-800 dark:text-orange-400 mb-4 flex items-center gap-3">
                            <ArrowRightLeft className="w-8 h-8" />
                            Bible Translations
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                            "So they read distinctly from the book, in the Law of God; and they gave the sense, and helped them to understand the reading." - <VerseLink reference="Nehemiah 8:8" />
                        </p>
                    </div>
                </div>
            </div>

            {/* Translation Spectrum */}
            <div className="bg-card border border-border rounded-xl p-8 shadow-sm">
                <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                    <Scale className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                    Translation Philosophy Spectrum
                </h3>

                {/* Visual Bar - Increased height and staggered labels */}
                <div className="relative h-24 mb-6 select-none mt-8">
                    {/* The Bar */}
                    <div className="absolute top-1/2 left-0 right-0 h-4 bg-gradient-to-r from-blue-300 via-emerald-300 to-rose-300 rounded-full -translate-y-1/2 mx-2 md:mx-4" />

                    {/* Category Labels - Positioned way above */}
                    <div className="absolute top-0 left-0 text-[10px] md:text-xs font-bold uppercase text-blue-600">Word-for-Word</div>
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 text-[10px] md:text-xs font-bold uppercase text-emerald-600 whitespace-nowrap">Thought-for-Thought</div>
                    <div className="absolute top-0 right-0 text-[10px] md:text-xs font-bold uppercase text-rose-600">Paraphrase</div>

                    {/* Markers Container */}
                    <div className="absolute inset-0 mx-2 md:mx-4">
                        {/* NASB (5%) - Below */}
                        <div className="absolute top-1/2 left-[5%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-blue-600 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">NASB</span>
                        </div>

                        {/* ESV (15%) - Above */}
                        <div className="absolute top-1/2 left-[15%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">ESV</span>
                        </div>

                        {/* KJV (25%) - Below */}
                        <div className="absolute top-1/2 left-[25%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">KJV</span>
                        </div>

                        {/* NKJV (30%) - Above */}
                        <div className="absolute top-1/2 left-[30%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-blue-400 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">NKJV</span>
                        </div>

                        {/* CSB (45%) - Below */}
                        <div className="absolute top-1/2 left-[45%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-emerald-500 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">CSB</span>
                        </div>

                        {/* NIV (60%) - Above */}
                        <div className="absolute top-1/2 left-[60%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-amber-500 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">NIV</span>
                        </div>

                        {/* NLT (75%) - Below */}
                        <div className="absolute top-1/2 left-[75%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-amber-400 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">NLT</span>
                        </div>

                        {/* MSG (95%) - Above */}
                        <div className="absolute top-1/2 left-[95%] -translate-x-1/2 -translate-y-1/2 group">
                            <div className="w-4 h-4 rounded-full bg-rose-500 border-2 border-white shadow-sm group-hover:scale-125 transition-transform relative z-10" />
                            <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-bold bg-background/90 px-1.5 py-0.5 rounded shadow-sm whitespace-nowrap">MSG</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Translation Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {TRANSLATIONS.map((t) => (
                    <div key={t.id} className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h3 className="text-2xl font-bold flex items-center gap-2">
                                    {t.acronym}
                                    <span className="text-sm font-normal text-muted-foreground bg-secondary px-2 py-0.5 rounded-full">{t.year}</span>
                                </h3>
                                <p className="text-sm text-muted-foreground">{t.name}</p>
                            </div>
                            <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-wider ${getTypeColor(t.type)}`}>
                                {t.type}
                            </span>
                        </div>

                        <p className="text-sm leading-relaxed mb-4 flex-grow">
                            {t.description}
                        </p>

                        <div className="space-y-3 text-sm bg-secondary/10 p-4 rounded-lg border border-border/50">
                            <div>
                                <span className="font-bold text-muted-foreground uppercase text-[10px]">Basis:</span>
                                <span className="ml-2 font-medium">{t.textBase}</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <span className="font-bold text-emerald-600 dark:text-emerald-400 block text-[10px] uppercase mb-1">Strengths</span>
                                    <p className="text-xs text-muted-foreground leading-snug">{t.strengths}</p>
                                </div>
                                <div>
                                    <span className="font-bold text-rose-600 dark:text-rose-400 block text-[10px] uppercase mb-1">Weaknesses</span>
                                    <p className="text-xs text-muted-foreground leading-snug">{t.weaknesses}</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-border">
                            <p className="text-xs text-muted-foreground italic font-serif">
                                "{t.verseSample}"
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Text Families Section */}
            <div className="bg-secondary/5 rounded-2xl p-8 border border-border">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                    <Scroll className="w-6 h-6 text-primary" />
                    Manuscript Families: The Great Debate
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {TEXT_FAMILIES.map((fam) => (
                        <div key={fam.id} className="bg-background rounded-xl p-6 border border-border shadow-sm">
                            <h4 className="text-xl font-bold mb-2 text-primary">{fam.title}</h4>
                            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                                {fam.description}
                            </p>

                            <div className="space-y-4">
                                <div>
                                    <h5 className="text-xs font-bold uppercase text-muted-foreground mb-2">Characteristics</h5>
                                    <ul className="text-sm space-y-1">
                                        {fam.characteristics.map((c, i) => (
                                            <li key={i} className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                                                {c}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="bg-secondary/20 p-3 rounded-lg">
                                    <h5 className="text-xs font-bold uppercase text-muted-foreground mb-1">Key Bibles</h5>
                                    <p className="text-sm font-medium">{fam.representedBy.join(', ')}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
