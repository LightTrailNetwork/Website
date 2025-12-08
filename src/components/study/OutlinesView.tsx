import { ListTree, Book } from 'lucide-react';
import { OUTLINES } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function OutlinesView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-500 mb-4">Book Outlines</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    Detailed structural breakdowns of Bible books to help you grasp the flow of thought.
                </p>
            </div>

            <div className="grid gap-8">
                {OUTLINES.map(outline => (
                    <div key={outline.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
                        <div className="bg-secondary/10 p-6 border-b border-border flex justify-between items-start">
                            <div>
                                <h3 className="text-2xl font-bold flex items-center gap-2">
                                    <Book className="w-5 h-5 text-emerald-500" />
                                    {outline.bookName}
                                </h3>
                                <p className="text-emerald-600 dark:text-emerald-400 font-medium mt-1">Theme: {outline.theme}</p>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="space-y-1">
                                {outline.sections.map((section, idx) => (
                                    <div key={idx} className="flex gap-4 p-3 hover:bg-secondary/5 rounded-lg border-l-2 border-transparent hover:border-emerald-500/30 transition-all">
                                        <div className="w-32 flex-shrink-0 text-right">
                                            <VerseLink book={outline.bookName} reference={section.range} className="font-mono text-xs text-muted-foreground whitespace-nowrap" />
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-foreground/90">{section.title}</h4>
                                            {section.subpoints && (
                                                <ul className="mt-2 space-y-1">
                                                    {section.subpoints.map((pt, i) => (
                                                        <li key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                                            <span className="w-1 h-1 rounded-full bg-emerald-500/50" />
                                                            {pt}
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
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
