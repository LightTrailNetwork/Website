import React from 'react';
import { Users, Crosshair, Skull, BookOpen, Anchor, MapPin, Sword, Shield } from 'lucide-react';
import { THE_APOSTLES, type Apostle } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function ApostlesView() {
    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600/10 to-indigo-600/10 rounded-2xl p-8 border border-blue-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-800 dark:text-blue-400 mb-4 flex items-center gap-3">
                            <Users className="w-8 h-8" />
                            The Twelve Apostles
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            "And the wall of the city had twelve foundations, and on them were the twelve names of the twelve apostles of the Lamb." (Revelation 21:14)
                        </p>
                    </div>
                </div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {THE_APOSTLES.map((apostle) => (
                    <div key={apostle.id} className="group bg-card border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col hover:border-blue-500/30">
                        {/* Header */}
                        <div className="p-6 border-b border-border bg-gradient-to-br from-secondary/30 to-background relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                                <Users className="w-32 h-32" />
                            </div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-2 py-1 rounded">
                                        {apostle.occupation}
                                    </span>
                                    {apostle.id === 'paul' && (
                                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 bg-amber-100 px-2 py-1 rounded ml-2">
                                            Apostle to Gentiles
                                        </span>
                                    )}
                                </div>
                                <h3 className="text-2xl font-bold text-foreground group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                    {apostle.name}
                                </h3>
                                <p className="text-sm text-muted-foreground italic mt-1">"{apostle.meaning}"</p>

                                {apostle.ako.length > 0 && (
                                    <div className="text-xs text-muted-foreground mt-2">
                                        <span className="font-semibold">Also:</span> {apostle.ako.join(', ')}
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 flex-grow space-y-6">
                            {/* Profile */}
                            <p className="text-sm leading-relaxed text-foreground/80">
                                {apostle.profile}
                            </p>

                            {/* Symbol icon + text */}
                            <div className="flex items-center gap-3 bg-secondary/20 p-3 rounded-lg border border-secondary/50">
                                <Shield className="w-5 h-5 text-blue-500 shrink-0" />
                                <div>
                                    <p className="text-[10px] uppercase font-bold text-muted-foreground">Traditional Symbol</p>
                                    <p className="text-sm font-semibold">{apostle.symbol}</p>
                                </div>
                            </div>

                            {/* Key Verses */}
                            <div>
                                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-3 flex items-center gap-2">
                                    <BookOpen className="w-3 h-3" /> Key Scriptures
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {apostle.keyVerses.map((kv, i) => (
                                        <VerseLink
                                            key={i}
                                            reference={kv.ref}
                                            className="text-xs px-2 py-1 bg-background border border-border rounded hover:border-blue-500 hover:text-blue-600 transition-colors"
                                        >
                                            {kv.label}
                                        </VerseLink>
                                    ))}
                                </div>
                            </div>

                            {/* Martyrdom */}
                            <div className="border-t border-border pt-4 mt-auto">
                                <h4 className="text-xs font-bold uppercase text-destructive/80 mb-2 flex items-center gap-2">
                                    <Skull className="w-3 h-3" /> Martyrdom
                                </h4>
                                <p className="text-xs text-muted-foreground leading-snug">
                                    {apostle.martyrdom}
                                </p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
