import { Repeat, ArrowDown } from 'lucide-react';
import { PATTERNS } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function PatternsView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-2xl p-8 border border-amber-500/20">
                <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-4">Structure Patterns</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    Discover the literary structures and recurring cycles that organize the biblical narrative.
                </p>
            </div>

            <div className="grid gap-12">
                {PATTERNS.map(pattern => (
                    <div key={pattern.id} className="space-y-6">
                        <div className="border-b border-border pb-4">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <Repeat className="w-6 h-6 text-amber-500" />
                                {pattern.title}
                            </h3>
                            <p className="text-muted-foreground mt-2">{pattern.description}</p>
                            <div className="flex gap-2 mt-4 text-xs">
                                <span className="font-bold uppercase text-muted-foreground">Found in:</span>
                                {pattern.occurrences.map((occ, i) => (
                                    <span key={i} className="px-2 py-0.5 bg-secondary/10 rounded border border-border/50">{occ}</span>
                                ))}
                            </div>
                        </div>

                        {/* Visualization */}
                        <div className="relative">
                            {/* Vertical Line */}
                            <div className="absolute left-6 top-4 bottom-4 w-1 bg-amber-500/20 rounded-full" />

                            <div className="space-y-4">
                                {pattern.steps.map((step, idx) => (
                                    <div key={idx} className="relative flex items-center gap-6 group">
                                        <div className="w-12 h-12 rounded-full bg-background border-2 border-amber-500/50 flex items-center justify-center font-bold text-amber-600 dark:text-amber-400 z-10 group-hover:scale-110 transition-transform shadow-sm">
                                            {step.order}
                                        </div>
                                        <div className="bg-card border border-border p-4 rounded-xl shadow-sm flex-1 hover:border-amber-500/30 transition-colors">
                                            <h4 className="font-bold">{step.label}</h4>
                                            {step.ref && <p className="text-sm text-muted-foreground mt-1">{step.ref}</p>}
                                        </div>
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
