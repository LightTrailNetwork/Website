import { Component, Palette, Droplet } from 'lucide-react';
import { SYMBOLS } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function SymbolsView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-500/10 to-indigo-500/10 rounded-2xl p-8 border border-purple-500/20">
                <h2 className="text-3xl font-bold text-purple-700 dark:text-purple-500 mb-4">Motifs & Symbols</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    Trace the recurring images that God uses to paint His redemptive masterpiece.
                </p>
            </div>

            <div className="space-y-6">
                {SYMBOLS.map(symbol => (
                    <div key={symbol.id} className="bg-card border border-border rounded-xl flex flex-col md:flex-row overflow-hidden hover:shadow-md transition-shadow">
                        <div className="md:w-48 bg-secondary/5 p-6 flex flex-col items-center justify-center text-center border-b md:border-b-0 md:border-r border-border">
                            {/* Icon selection could be dynamic, standardizing mainly for now */}
                            <div className="p-4 bg-background rounded-full shadow-sm mb-3">
                                <Component className="w-8 h-8 text-purple-500" />
                            </div>
                            <h3 className="font-bold text-lg">{symbol.name}</h3>
                            <span className="text-xs text-muted-foreground uppercase tracking-wider mt-1">{symbol.theme}</span>
                        </div>

                        <div className="p-6 flex-1">
                            <h4 className="font-semibold text-lg mb-2 text-purple-700 dark:text-purple-400">Meaning</h4>
                            <p className="text-muted-foreground mb-6">{symbol.meaning}</p>

                            <h4 className="font-semibold text-sm uppercase text-muted-foreground mb-3">Key Appearances</h4>
                            <div className="grid sm:grid-cols-2 gap-4">
                                {symbol.appearances.map((app, idx) => (
                                    <div key={idx} className="bg-secondary/5 p-3 rounded-lg border border-border/50 flex flex-col">
                                        <span className="text-sm font-medium mb-1">{app.context}</span>
                                        <VerseLink reference={app.ref} className="text-xs self-start" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
