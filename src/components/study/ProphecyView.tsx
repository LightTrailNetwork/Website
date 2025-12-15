import React from 'react';
import { GitMerge, ArrowRight, Quote, BookOpen, Scale } from 'lucide-react';
import { MESSIANIC_PROPHECIES, type MessianicProphecy } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function ProphecyView() {
    // Group by topic
    const grouped = MESSIANIC_PROPHECIES.reduce((acc, p) => {
        if (!acc[p.topic]) acc[p.topic] = [];
        acc[p.topic]?.push(p);
        return acc;
    }, {} as Record<string, MessianicProphecy[]>);

    const topics = ['Birth', 'Ministry', 'Passion', 'Resurrection'] as const;

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl p-8 border border-purple-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-400 mb-4 flex items-center gap-3">
                            <GitMerge className="w-8 h-8" />
                            Messianic Prophecies
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Witness the mathematical impossibility of one man fulfilling these ancient promises. The thread of redemption woven through history.
                        </p>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="space-y-16">
                {topics.map(topic => (
                    <div key={topic} className="space-y-6">
                        <div className="flex items-center gap-3 border-b border-border pb-2">
                            <div className="bg-purple-100 dark:bg-purple-900/30 p-2 rounded-lg">
                                <BookOpen className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-foreground">{topic}</h3>
                        </div>

                        <div className="grid gap-6">
                            {grouped[topic]?.map(item => (
                                <div key={item.id} className="bg-card rounded-xl border border-border shadow-sm overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                                    <div className="grid md:grid-cols-2 gap-0 divide-y md:divide-y-0 md:divide-x divide-border">

                                        {/* Prophecy (OT) */}
                                        <div className="p-6 relative bg-secondary/10">
                                            <div className="absolute top-4 left-4 text-xs font-bold text-muted-foreground uppercase tracking-wider flex items-center gap-2">
                                                <Quote className="w-3 h-3" />
                                                The Promise (OT)
                                            </div>
                                            <div className="mt-6 space-y-4">
                                                <blockquote className="text-lg font-serif italic text-foreground/90 leading-relaxed border-l-4 border-purple-500/30 pl-4 py-1">
                                                    "{item.prophecy.text}"
                                                </blockquote>
                                                <div className="flex justify-between items-center pt-2">
                                                    <span className="text-sm font-semibold text-purple-600 dark:text-purple-400">
                                                        — {item.prophecy.source}
                                                    </span>
                                                    <VerseLink
                                                        reference={item.prophecy.verse}
                                                        className="text-xs bg-background border border-border px-2 py-1 rounded shadow-sm hover:shadow transition-shadow"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Fulfillment (NT) */}
                                        <div className="p-6 relative bg-card">
                                            <div className="absolute top-4 left-4 text-xs font-bold text-emerald-600 dark:text-emerald-500 uppercase tracking-wider flex items-center gap-2">
                                                <ArrowRight className="w-3 h-3" />
                                                Fulfillment (NT)
                                            </div>
                                            <div className="mt-6 space-y-4">
                                                <blockquote className="text-lg font-medium text-foreground/90 leading-relaxed border-l-4 border-emerald-500/30 pl-4 py-1">
                                                    "{item.fulfillment.text}"
                                                </blockquote>
                                                <div className="flex justify-end pt-2">
                                                    <VerseLink
                                                        reference={item.fulfillment.verse}
                                                        className="text-xs bg-secondary border border-border px-2 py-1 rounded shadow-sm hover:shadow transition-shadow"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>

                                    {/* Probability / Note */}
                                    {item.probability && (
                                        <div className="bg-purple-50 dark:bg-purple-900/10 px-6 py-3 border-t border-purple-100 dark:border-purple-900/30 flex items-start gap-2">
                                            <Scale className="w-4 h-4 text-purple-500 mt-1 shrink-0" />
                                            <p className="text-sm text-purple-800 dark:text-purple-300">
                                                <span className="font-semibold">Note:</span> {item.probability}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
