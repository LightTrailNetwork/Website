import { TIMELINE } from '../../data/studyData';

export default function TimelineView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-500 mb-4">Historical Timeline</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    "From everlasting to everlasting, you are God." - Psalm 90:2
                    <br /><br />
                    Trace the flow of redemptive history from Creation to the Early Church. See the context of every event.
                </p>
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-emerald-500/20 ml-4 md:ml-12 space-y-12 py-8">
                {TIMELINE.map((event, index) => (
                    <div key={event.id} className="relative pl-8 md:pl-12 group">
                        {/* Dot */}
                        <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full border-4 border-background bg-emerald-500 group-hover:scale-125 transition-transform shadow-sm box-content" />

                        {/* Year Label - Floating left on Desktop */}
                        <div className="md:absolute md:-left-32 md:top-1 md:text-right md:w-24 mb-1 md:mb-0">
                            <span className="font-mono text-sm font-bold text-emerald-600 dark:text-emerald-400 block">{event.year}</span>
                            <span className="text-[10px] text-muted-foreground uppercase tracking-wider hidden md:block">{event.era}</span>
                        </div>

                        {/* Content Card */}
                        <div className="bg-card border border-border p-5 rounded-xl hover:shadow-md transition-shadow group-hover:border-emerald-500/30">
                            <h3 className="text-lg font-bold mb-1">{event.title}</h3>
                            <div className="md:hidden text-xs text-muted-foreground uppercase tracking-wider mb-2">{event.era}</div>
                            <p className="text-sm text-muted-foreground leading-relaxed">{event.description}</p>

                            <div className="mt-4 pt-3 border-t border-border/50 flex flex-wrap gap-2">
                                {event.references.map(ref => (
                                    <span key={ref} className="px-2 py-0.5 bg-secondary/10 rounded text-[10px] text-foreground font-medium font-mono">
                                        {ref}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
