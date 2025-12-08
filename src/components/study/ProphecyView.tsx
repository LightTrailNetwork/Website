import { ArrowRight, BookOpen, Quote } from 'lucide-react';
import { PROPHECIES } from '../../data/studyData';
import { useNavigate } from 'react-router-dom';

export default function ProphecyView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20">
                <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-4">Prophecy & Fulfillment</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    "For no matter how many promises God has made, they are 'Yes' in Christ." - 2 Corinthians 1:20
                    <br /><br />
                    Explore the divine thread of promise and realization that runs through the Scriptures, connecting the Old Testament to the New.
                </p>
            </div>

            {/* List */}
            <div className="grid gap-6">
                {PROPHECIES.map((item) => (
                    <div key={item.id} className="group relative bg-card border border-border hover:border-amber-500/50 rounded-xl overflow-hidden transition-all duration-300 hover:shadow-lg">
                        {/* Connecting Line (Desktop) */}
                        <div className="hidden md:block absolute left-1/2 top-4 bottom-4 w-px bg-gradient-to-b from-amber-500/20 via-amber-500/50 to-amber-500/20 -translate-x-1/2" />

                        {/* Connecting Icon (Desktop) */}
                        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-background border border-amber-500/30 rounded-full items-center justify-center text-amber-500 shadow-sm z-10">
                            <ArrowRight className="w-4 h-4" />
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 p-6 relative z-0">
                            {/* Old Testament Promise */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400">
                                        The Promise
                                    </span>
                                    <span className="text-xs font-mono text-muted-foreground">{item.otReference.book} {item.otReference.chapter}:{item.otReference.verse}</span>
                                </div>
                                <div className="relative pl-6 border-l-2 border-amber-500/20">
                                    <Quote className="absolute -left-2 top-0 w-4 h-4 text-amber-500/40 bg-card" />
                                    <p className="text-lg font-serif text-foreground/90 italic leading-relaxed">
                                        "{item.otReference.text}"
                                    </p>
                                </div>
                            </div>

                            {/* Mobile Connector */}
                            <div className="md:hidden flex justify-center py-2">
                                <ArrowRight className="w-6 h-6 text-amber-500/50 rotate-90" />
                            </div>

                            {/* New Testament Fulfillment */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 mb-2 md:justify-end">
                                    <span className="md:order-2 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400">
                                        The Fulfillment
                                    </span>
                                    <span className="md:order-1 text-xs font-mono text-muted-foreground">{item.ntFulfillment.book} {item.ntFulfillment.chapter}:{item.ntFulfillment.verse}</span>
                                </div>
                                <div className="relative pl-6 md:pl-0 md:pr-6 md:border-l-0 md:border-r-2 md:border-emerald-500/20 md:text-right">
                                    <Quote className="absolute -left-2 md:left-auto md:-right-2 top-0 w-4 h-4 text-emerald-500/40 bg-card" />
                                    <p className="text-lg font-serif text-foreground/90 italic leading-relaxed">
                                        "{item.ntFulfillment.text}"
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Footer Context */}
                        <div className="bg-secondary/5 border-t border-border p-4 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                            <div>
                                <h3 className="font-bold text-foreground">{item.title}</h3>
                                <p className="text-sm text-muted-foreground">{item.description}</p>
                            </div>
                            <span className="text-xs px-2 py-1 bg-background rounded-full border border-border text-muted-foreground whitespace-nowrap">
                                Category: {item.category}
                            </span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
