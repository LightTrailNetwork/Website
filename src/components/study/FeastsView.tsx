import React from 'react';
import { Tent, Calendar, ArrowDown, Wheat, Sun, Sparkles, BookOpen } from 'lucide-react';
import { JEWISH_FEASTS, type JewishFeast } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function FeastsView() {
    const springFeasts = JEWISH_FEASTS.filter(f => f.season === 'Spring');
    const fallFeasts = JEWISH_FEASTS.filter(f => f.season === 'Fall');
    const winterFeasts = JEWISH_FEASTS.filter(f => f.season === 'Winter');

    const FeastCard = ({ feast }: { feast: JewishFeast }) => (
        <div className="relative bg-card rounded-xl border border-border shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
            <div className={`absolute top-0 left-0 w-1 h-full ${feast.season === 'Spring' ? 'bg-emerald-500' : feast.season === 'Fall' ? 'bg-amber-500' : 'bg-blue-500'}`} />

            <div className="p-6 pl-8 space-y-4">
                <div className="flex justify-between items-start">
                    <div>
                        <span className={`text-[10px] font-bold uppercase tracking-wider mb-1 flex items-center gap-1 ${feast.season === 'Spring' ? 'text-emerald-600' : feast.season === 'Fall' ? 'text-amber-600' : 'text-blue-600'}`}>
                            {feast.season === 'Spring' ? <Wheat className="w-3 h-3" /> : feast.season === 'Fall' ? <Sun className="w-3 h-3" /> : <Sparkles className="w-3 h-3" />}
                            {feast.season} Feast
                        </span>
                        <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                            {feast.title}
                        </h3>
                        <div className="text-sm text-muted-foreground font-serif italic">
                            {feast.hebrewTitle} ({feast.transliteration})
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="bg-secondary/50 px-3 py-1 rounded-lg text-xs font-bold text-foreground flex items-center gap-2">
                            <Calendar className="w-3 h-3" />
                            {feast.month}
                        </div>
                    </div>
                </div>

                <div className="text-sm text-foreground/80 leading-relaxed">
                    {feast.significance}
                </div>

                <div className="bg-gradient-to-r from-primary/5 to-transparent p-3 rounded-lg border-l-2 border-primary">
                    <h4 className="text-xs font-bold text-primary mb-1 uppercase tracking-wide">Prophetic Fulfillment</h4>
                    <p className="text-sm font-medium text-foreground/90">
                        {feast.fulfillment}
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-2">
                    {feast.references.map((ref, i) => (
                        <VerseLink
                            key={i}
                            reference={ref}
                            className="bg-secondary hover:bg-secondary/80 text-xs px-2 py-1 rounded-md text-muted-foreground transition-colors"
                        />
                    ))}
                </div>
            </div>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl p-8 border border-emerald-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-emerald-700 dark:text-emerald-400 mb-4 flex items-center gap-3">
                            <Tent className="w-8 h-8" />
                            Jewish Feasts & Festivals
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            "These are a shadow of the things to come, but the substance belongs to Christ." (Col 2:17). Explore the prophetic calendar of redemption.
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 relative">
                {/* Connector Line for Desktop */}
                {/* Connector Line for Desktop */}
                <div className="hidden lg:block absolute left-1/2 top-4 bottom-4 w-px bg-border/50 -translate-x-1/2" />

                {/* Spring Cycle */}
                <div className="space-y-6">
                    <div className="py-4 border-b border-emerald-100 dark:border-emerald-900/30 mb-4">
                        <h3 className="text-2xl font-bold text-emerald-700 dark:text-emerald-500 flex items-center gap-2">
                            <Wheat className="w-6 h-6" />
                            The Spring Cycle
                        </h3>
                        <p className="text-sm text-muted-foreground">The First Coming of Christ (Redemption)</p>
                    </div>

                    <div className="space-y-6">
                        {springFeasts.map(feast => (
                            <FeastCard key={feast.id} feast={feast} />
                        ))}
                    </div>
                </div>

                {/* Fall Cycle */}
                <div className="space-y-6">
                    <div className="py-4 border-b border-amber-100 dark:border-amber-900/30 mb-4">
                        <h3 className="text-2xl font-bold text-amber-700 dark:text-amber-500 flex items-center gap-2">
                            <Sun className="w-6 h-6" />
                            The Fall Cycle
                        </h3>
                        <p className="text-sm text-muted-foreground">The Second Coming of Christ (Restoration)</p>
                    </div>

                    <div className="space-y-6">
                        {fallFeasts.map(feast => (
                            <FeastCard key={feast.id} feast={feast} />
                        ))}

                        {/* Winter Feasts Section appended */}
                        <div className="pt-8 mt-8 border-t border-border">
                            <h4 className="text-lg font-bold text-blue-600 dark:text-blue-400 mb-4 flex items-center gap-2">
                                <Sparkles className="w-4 h-4" />
                                Winter Festivals
                            </h4>
                            <div className="space-y-6">
                                {winterFeasts.map(feast => (
                                    <FeastCard key={feast.id} feast={feast} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
