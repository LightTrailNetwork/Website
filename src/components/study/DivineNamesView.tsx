import React from 'react';
import { Crown, BookOpen, Languages, Sparkles } from 'lucide-react';
import { DIVINE_NAMES } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function DivineNamesView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl p-8 border border-indigo-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-4 flex items-center gap-3">
                            <Crown className="w-8 h-8" />
                            Divine Names & Titles
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            "And those who know your name put their trust in you." Explore the Hebrew names of God and the Greek titles of Christ.
                        </p>
                    </div>
                </div>
            </div>

            {/* List Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {DIVINE_NAMES.map((item) => (
                    <div
                        key={item.id}
                        className="group relative bg-card rounded-xl border border-border shadow-sm hover:shadow-lg hover:border-indigo-500/30 transition-all duration-300 overflow-hidden"
                    >
                        {/* Decorative Top Border */}
                        <div className={`h-1 w-full bg-gradient-to-r ${item.language === 'Hebrew' ? 'from-amber-500 to-orange-500' : 'from-blue-500 to-indigo-500'}`} />

                        <div className="p-6 space-y-4">
                            {/* Header: Original + English */}
                            <div className="flex justify-between items-start">
                                <div>
                                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground flex items-center gap-1 mb-1">
                                        <Languages className="w-3 h-3" />
                                        {item.language}
                                    </span>
                                    <h3 className="text-2xl font-bold text-foreground group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                                        {item.english}
                                    </h3>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-serif text-indigo-900 dark:text-indigo-100 opacity-80" dir={item.language === 'Hebrew' ? 'rtl' : 'ltr'}>
                                        {item.original}
                                    </div>
                                    <div className="text-xs font-medium text-muted-foreground italic mt-1">
                                        /{item.transliteration}/
                                    </div>
                                </div>
                            </div>

                            {/* Meaning */}
                            <div className="bg-secondary/30 p-3 rounded-lg border border-border/50">
                                <div className="text-sm font-semibold text-foreground/90">
                                    Meaning: <span className="text-indigo-600 dark:text-indigo-400 font-normal">{item.meaning}</span>
                                </div>
                            </div>

                            {/* Significance */}
                            <div>
                                <h4 className="text-xs font-bold text-muted-foreground uppercase mb-2 flex items-center gap-1">
                                    <Sparkles className="w-3 h-3 text-amber-500" />
                                    Significance
                                </h4>
                                <p className="text-sm text-foreground/80 leading-relaxed">
                                    {item.significance}
                                </p>
                            </div>

                            {/* References */}
                            <div className="pt-4 border-t border-border/50 flex flex-wrap gap-2">
                                {item.references.map((ref, idx) => (
                                    <VerseLink
                                        key={idx}
                                        reference={ref}
                                        className="px-2 py-1 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300 text-xs rounded-md font-medium hover:bg-indigo-500/20 transition-colors border border-indigo-500/20"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
