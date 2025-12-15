import React, { useMemo, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { TIMELINE, ERAS } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function TimelineView() {
    // Group events by Era
    const timelineByEra = useMemo(() => {
        const grouped: Record<string, typeof TIMELINE> = {};
        ERAS.forEach(era => {
            grouped[era.id] = TIMELINE.filter(e => e.era === era.id || e.era === era.title); // Handle flexible matching if IDs don't perfectly align, though we corrected data
        });

        // Also catch any orphan events not in standard eras if any (fallback)
        // In our data, TIMELINE.era maps to ERA.id (e.g. 'Creation', 'Patriarchs'...)
        // Actually looking at data: TIMELINE era is 'Creation', 'Patriarchs'... 
        // But ERA.id is 'creation', 'patriarchs'... lowercase.
        // We need to normalize.
        const normalizedGrouped: Record<string, typeof TIMELINE> = {};

        TIMELINE.forEach(event => {
            // Find corresponding Era ID
            const eraObj = ERAS.find(e => e.title === event.era || e.id === event.era.toLowerCase().replace(/ /g, '-'));
            // Our data usage varies. 
            // In TIMELINE, we used "Creation", "Patriarchs". 
            // In ERAS, we have ids like "creation", "patriarchs".
            // Let's rely on finding by title or rough match.

            let eraId = 'other';
            if (eraObj) {
                eraId = eraObj.id;
            } else {
                // Try simple lowercase match
                const match = ERAS.find(e => e.id === event.era.toLowerCase().replace(/ /g, '-'));
                if (match) eraId = match.id;
                // Special case for 'Life of Christ' -> 'christ'
                if (event.era === 'Life of Christ') eraId = 'christ';
                // Special case for 'Early Church' -> 'church'
                if (event.era === 'Early Church') eraId = 'church';
                // Special case for 'Return' -> 'return'
                if (event.era === 'Return') eraId = 'return';
                // Special case for 'Silence' -> 'return' or new era? Data has 'return' covering 538-400. 
                // 'Silence' is 400-4BC. ERAS doesn't have explicit Silence era in the list provided in view_file previously?
                // Let's re-check ERAS data.
                // It has 'return' (538-400).
                // It has 'christ' (4BC).
                // It seems 'Silence' is missing from eras list? 
                // We'll group Silence events into 'return' or create a section. 
                // Actually, let's just group by the raw string from TIMELINE if no Era found, 
                // but better to align with ERAS for the header info.
            }

            if (!normalizedGrouped[eraId]) normalizedGrouped[eraId] = [];
            normalizedGrouped[eraId]!.push(event);
        });
        return normalizedGrouped;
    }, []);

    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Helper to scroll to era
    const scrollToEra = (id: string) => {
        const el = document.getElementById(`era-${id}`);
        if (el) {
            const offset = 100; // Sticky header offset
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = el.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
            setIsMobileMenuOpen(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-24">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-500 mb-4">Historical Timeline</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    "From everlasting to everlasting, you are God." - <VerseLink reference="Psalm 90:2" />
                    <br /><br />
                    Trace the flow of redemptive history from Creation to the Early Church.
                    History is His Story.
                </p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 relative">
                {/* Sticky Minimap / Navigation (Desktop) */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                    <div className="sticky top-24 space-y-1">
                        <h3 className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-4 px-3">Eras</h3>
                        {ERAS.map(era => (
                            <button
                                key={era.id}
                                onClick={() => scrollToEra(era.id)}
                                className="w-full text-left px-3 py-2 rounded-md text-sm hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors flex justify-between group"
                            >
                                <span className="font-medium">{era.title}</span>
                                <span className="text-[10px] text-muted-foreground group-hover:text-emerald-600/70">
                                    {era.dates.replace('c. ', '').split(' - ')[0]}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Main Timeline Content */}
                <div className="flex-1 space-y-24">
                    {ERAS.map(era => {
                        const events = timelineByEra[era.id] || [];
                        if (events.length === 0 && era.id !== 'creation') return null; // Skip empty eras except first to be safe

                        return (
                            <div key={era.id} id={`era-${era.id}`} className="scroll-mt-24">
                                {/* Era Header */}
                                <div className="mb-12 border-b-2 border-emerald-500/20 pb-4">
                                    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between mb-2">
                                        <h3 className="text-3xl font-bold text-foreground">{era.title}</h3>
                                        <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">{era.dates}</span>
                                    </div>
                                    <p className="text-muted-foreground max-w-2xl">{era.description}</p>
                                </div>

                                {/* Events List - Snake / Alternating Layout */}
                                <div className="relative">
                                    {/* Central Line */}
                                    <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500/20 -translate-x-1/2"></div>

                                    <div className="space-y-0">
                                        {events.map((event, index) => {
                                            const isLeft = index % 2 === 0;

                                            // Handling the "Silicon" era (Intertestamental) which might not be in ERAS strict list
                                            // If we added events for 'Silence' but didn't have an ERA for it, they might show up here if we mapped them to previous or next. 
                                            // Current grouping logic might miss them if era.id doesn't match. 
                                            // For now assuming 1:1 map or close enough.

                                            return (
                                                <div key={event.id} className={`relative flex items-center md:items-start mb-8 md:mb-0 ${isLeft ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

                                                    {/* Central Dot */}
                                                    <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full border-4 border-background bg-emerald-500 z-10 shadow-sm box-content"></div>

                                                    {/* Spacer for other side */}
                                                    <div className="hidden md:block w-1/2"></div>

                                                    {/* Content Card */}
                                                    <div className={`flex-1 pl-16 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                                                        <div className={`
                                                            bg-card border border-border p-5 rounded-xl transition-all duration-300 hover:shadow-md group md:mb-6
                                                            ${isLeft ? 'md:text-right' : 'md:text-left'}
                                                            hover:border-emerald-500/40 relative
                                                        `}>

                                                            {/* Arrow Pointer */}
                                                            <div className={`
                                                                hidden md:block absolute top-6 w-3 h-3 bg-card border-t border-r border-border rotate-45
                                                                ${isLeft ? '-right-[7px] border-l-0 border-b-0' : '-left-[7px] border-t-0 border-r-0 rotate-[225deg]'}
                                                            `}></div>

                                                            {/* Mobile Year Badge */}
                                                            <div className="md:hidden absolute -left-12 top-1 bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold px-1.5 py-0.5 rounded">
                                                                {event.year}
                                                            </div>

                                                            {/* Header */}
                                                            <div className={`flex flex-col ${isLeft ? 'md:items-end' : 'md:items-start'} gap-1 mb-2`}>
                                                                <span className="hidden md:block font-mono text-xs font-bold text-emerald-600 dark:text-emerald-400">{event.year}</span>
                                                                <h4 className="text-lg font-bold leading-tight">{event.title}</h4>
                                                            </div>

                                                            <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                                                                {event.description}
                                                            </p>

                                                            {/* References */}
                                                            <div className={`flex flex-wrap gap-2 ${isLeft ? 'md:justify-end' : 'md:justify-start'}`}>
                                                                {event.references.map((ref, idx) => (
                                                                    <VerseLink
                                                                        key={idx}
                                                                        reference={ref}
                                                                        className="px-2 py-0.5 bg-secondary/30 rounded text-xs text-foreground font-medium hover:bg-emerald-500/10 hover:text-emerald-600 transition-colors"
                                                                    />
                                                                ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        );
                    })}

                    {/* Catch-all for events not in defined ERAS (like 'Silence' if not in ERAS list) */}
                    {/* We should check if we missed 'Silence' in eras. If so, render it manually. */}
                    {timelineByEra['other'] && timelineByEra['other'].length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold mb-4">Other Events</h3>
                            <div className="space-y-4 pl-8 border-l-2 border-muted">
                                {timelineByEra['other'].map(e => (
                                    <div key={e.id}>
                                        <span className="font-bold">{e.year}</span> - {e.title}
                                        {e.references && e.references.length > 0 && (
                                            <span className="ml-2 text-sm text-muted-foreground">
                                                (
                                                {e.references.map((ref, idx) => (
                                                    <span key={idx}>
                                                        {idx > 0 && ", "}
                                                        <VerseLink reference={ref} />
                                                    </span>
                                                ))}
                                                )
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Navigation FAB */}
            <div className="fixed bottom-6 right-6 z-50 lg:hidden">
                <button
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="bg-emerald-600 text-white p-4 rounded-full shadow-lg hover:bg-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                    aria-label="Toggle navigation"
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Navigation Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-background/95 backdrop-blur-sm z-40 lg:hidden flex flex-col pt-24 px-6 animate-in fade-in duration-200">
                    <h3 className="text-xl font-bold mb-6 text-emerald-600">Jump to Era</h3>
                    <div className="space-y-4 overflow-y-auto pb-24">
                        {ERAS.map(era => (
                            <button
                                key={era.id}
                                onClick={() => scrollToEra(era.id)}
                                className="w-full text-left p-4 rounded-lg bg-secondary/50 hover:bg-emerald-500/10 hover:text-emerald-600 transition-all border border-border/50"
                            >
                                <div className="font-bold text-lg">{era.title}</div>
                                <div className="text-sm text-muted-foreground">{era.dates}</div>
                            </button>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

