import { Hourglass, History } from 'lucide-react';
import { ERAS } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function ErasView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-500 mb-4">Biblical Eras</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    The grand epochs of redemptive history, from Creation to the Early Church.
                </p>
            </div>

            <div className="relative">
                {/* Timeline Line (Desktop) */}
                <div className="hidden md:block absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-emerald-500/30 to-transparent" />

                <div className="space-y-8">
                    {ERAS.map((era, index) => (
                        <div key={era.id} className="relative pl-0 md:pl-20 group">
                            {/* Dot */}
                            <div className="hidden md:flex absolute left-8 top-6 -translate-x-1/2 w-4 h-4 bg-background border-2 border-emerald-500 rounded-full z-10 group-hover:scale-125 transition-transform" />

                            <div className="bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all hover:border-emerald-500/30">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">Era {index + 1}</span>
                                            <span className="w-1 h-1 rounded-full bg-muted-foreground/30" />
                                            <span className="text-xs font-mono text-muted-foreground">{era.dates}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold">{era.title}</h3>
                                    </div>
                                    <div className="text-right hidden md:block">

                                    </div>
                                </div>

                                <p className="text-muted-foreground mb-6 leading-relaxed border-l-2 border-emerald-500/20 pl-4">
                                    {era.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm">
                                    <div>
                                        <h4 className="font-bold text-foreground/80 mb-2 flex items-center gap-2">
                                            <History className="w-4 h-4 text-emerald-500" /> Major Figures
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {era.majorFigures.map(fig => (
                                                <span key={fig} className="px-2 py-1 bg-secondary rounded text-xs">
                                                    {fig}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-foreground/80 mb-2 flex items-center gap-2">
                                            <Hourglass className="w-4 h-4 text-emerald-500" /> Key Books
                                        </h4>
                                        <div className="flex flex-wrap gap-2">
                                            {era.books.map(book => (
                                                <VerseLink key={book} reference={book} className="px-2 py-1 bg-emerald-50 dark:bg-emerald-900/10 text-emerald-700 dark:text-emerald-400 rounded text-xs border border-emerald-200 dark:border-emerald-800/30" />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
