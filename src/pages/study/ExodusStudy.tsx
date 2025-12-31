import React, { useState } from 'react';
import { MapPin, Mountain, Tent, Calendar, ScrollText, Navigation, Waves, Trophy, BookOpen } from 'lucide-react';
import { EXODUS_LOCATIONS, EXODUS_ROUTE, type ExodusLocation } from '../../data/exodusData';
import VerseLink from '../../components/study/VerseLink';
import BibleLeafletMap from '../../components/study/BibleLeafletMap';

export default function ExodusStudy() {
    const [activeId, setActiveId] = useState<string | null>(null);

    // Grouping Data
    const contextItems = EXODUS_LOCATIONS.filter(item => item.category === 'context');
    const journeyItems = EXODUS_LOCATIONS.filter(item => item.category === 'journey').sort((a, b) => (a.order || 0) - (b.order || 0));

    // Map Locations (Context items get special label or no number)
    const mapLocations = EXODUS_LOCATIONS.map(item => ({
        id: item.id,
        lat: item.coordinates.lat,
        lng: item.coordinates.lng,
        label: item.category === 'journey' ? `${item.order}. ${item.title}` : item.title
    }));

    const mapRef = React.useRef<HTMLDivElement>(null);

    const handleSelect = (id: string, shouldScroll = true) => {
        setActiveId(id);
        if (shouldScroll) {
            const el = document.getElementById(`exodus-${id}`);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    };

    const handleItemClick = (id: string) => {
        setActiveId(id);
        if (window.innerWidth < 1024 && mapRef.current) {
            mapRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    const getIcon = (type: string) => {
        switch (type) {
            case 'place': return <Tent className="w-5 h-5" />;
            case 'event': return <Waves className="w-5 h-5" />;
            case 'artifact': return <ScrollText className="w-5 h-5" />;
            default: return <MapPin className="w-5 h-5" />;
        }
    };

    // Helper to render a card
    const LocationCard = ({ item, minimal = false }: { item: ExodusLocation, minimal?: boolean }) => (
        <div
            id={`exodus-${item.id}`}
            className={`
                group bg-card border rounded-xl overflow-hidden transition-all duration-300 scroll-mt-32 relative
                ${activeId === item.id
                    ? 'border-amber-500 ring-1 ring-amber-500 shadow-lg shadow-amber-500/10 scale-[1.02] z-10'
                    : 'border-border shadow-sm hover:shadow-md hover:border-amber-500/30'
                }
            `}
            onClick={() => handleItemClick(item.id)}
        >
            <div className="p-5 space-y-3">
                <div className="flex justify-between items-start gap-4">
                    <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                            {item.order && (
                                <span className="bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 px-1.5 py-0.5 rounded text-[10px] mr-1 border border-amber-200 dark:border-amber-800">
                                    #{item.order}
                                </span>
                            )}
                            {item.type}
                        </div>
                        <h3 className="text-lg font-bold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                            {item.title}
                        </h3>
                    </div>
                    <div className={`p-2 rounded-lg ${activeId === item.id ? 'bg-amber-500 text-white' : 'bg-secondary text-muted-foreground'} transition-colors`}>
                        {getIcon(item.type)}
                    </div>
                </div>

                {item.narrative && (
                    <div className="text-sm font-serif italic text-foreground/80 border-l-2 border-amber-500/20 pl-3 py-1 bg-amber-500/5 rounded-r my-2">
                        "{item.narrative}"
                    </div>
                )}

                <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                </p>

                {!minimal && (
                    <div className="pt-3 border-t border-border/50">
                        <h4 className="text-xs font-bold text-amber-700 dark:text-amber-500 mb-1 flex items-center gap-2">
                            Evidence & Significance
                        </h4>
                        <p className="text-xs text-muted-foreground">
                            {item.significance}
                        </p>
                    </div>
                )}

                {item.bibleReferences.length > 0 && (
                    <div className="flex gap-2 flex-wrap pt-1">
                        {item.bibleReferences.map((ref, idx) => (
                            <VerseLink
                                key={idx}
                                reference={ref}
                                className="px-2 py-0.5 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-[10px] rounded-md font-medium hover:bg-amber-500/20 transition-colors border border-amber-500/20"
                            />
                        ))}
                    </div>
                )}

                {item.links && item.links.length > 0 && (
                    <div className="pt-3 mt-1 border-t border-border/30 flex flex-col gap-1">
                        {item.links.map((link, idx) => (
                            <a
                                key={idx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[10px] text-muted-foreground hover:text-amber-600 dark:hover:text-amber-400 hover:underline flex items-center gap-1 transition-colors w-fit"
                            >
                                <span className="opacity-50">↗</span> {link.label}
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    // Section Header
    const SectionHeader = ({ title, icon: Icon }: { title: string, icon: any }) => (
        <div className="flex items-center gap-3 pt-6 pb-2 border-b border-border/50">
            <div className="p-2 bg-amber-500/10 rounded-full text-amber-600">
                <Icon className="w-5 h-5" />
            </div>
            <h3 className="text-xl font-bold text-foreground">{title}</h3>
        </div>
    );

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-3">
                            <Mountain className="w-8 h-8" />
                            Evidence for the Exodus
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            A narrative journey tracing the path of the Israelites from Egypt to the Promised Land, uncovering physical evidence that matches the biblical account.
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Map Section - Sticky on Desktop */}
                <div ref={mapRef} className="w-full lg:w-1/2 lg:sticky lg:top-24 z-10 scroll-mt-24">
                    <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
                        <BibleLeafletMap
                            onSelectLocation={handleSelect}
                            activeLocationId={activeId}
                            locations={mapLocations}
                            polylines={[EXODUS_ROUTE]}
                        />
                    </div>
                    <div className="mt-4 p-4 bg-secondary/30 rounded-lg text-sm text-muted-foreground border border-border/50">
                        <h4 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                            <Navigation className="w-4 h-4 text-amber-500" />
                            Interactive Map
                        </h4>
                        <p>
                            Follow the numbered path from Egypt (1) to the Jordan River (13). Click any number to read the story.
                        </p>
                    </div>
                </div>

                {/* Narrative List Section */}
                <div className="w-full lg:w-1/2 space-y-8">

                    {/* PROLOGUE */}
                    <div className="space-y-4">
                        <SectionHeader title="Prologue: The Legacy of Joseph" icon={BookOpen} />
                        <p className="text-muted-foreground italic text-sm px-4">
                            Before the Exodus, the Hebrews dwelt in Goshen. Archeology at Avaris (Tell el-Dab'a) reveals evidences of Joseph's rule and a large Semitic population.
                        </p>
                        <div className="grid gap-4">
                            {contextItems.map(item => (
                                <LocationCard key={item.id} item={item} minimal={true} />
                            ))}
                        </div>
                    </div>

                    {/* ACT I: ESCAPE */}
                    <div className="space-y-4">
                        <SectionHeader title="Act I: The Escape" icon={Waves} />
                        <div className="grid gap-4">
                            {journeyItems.filter(i => i.order && i.order <= 2).map(item => (
                                <LocationCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* ACT II: THE MOUNTAIN */}
                    <div className="space-y-4">
                        <SectionHeader title="Act II: The Mountain of God" icon={Mountain} />
                        <div className="grid gap-4">
                            {journeyItems.filter(i => i.order && i.order >= 3 && i.order <= 9).map(item => (
                                <LocationCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* ACT III: The Wilderness */}
                    <div className="space-y-4">
                        <SectionHeader title="Act III: The Wilderness & The Detour" icon={Tent} />
                        <div className="grid gap-4">
                            {journeyItems.filter(i => i.order && i.order >= 10 && i.order <= 11).map(item => (
                                <LocationCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                    {/* ACT IV: THE PROMISE */}
                    <div className="space-y-4">
                        <SectionHeader title="Act IV: The Promise" icon={Trophy} />
                        <div className="grid gap-4">
                            {journeyItems.filter(i => i.order && i.order >= 12).map(item => (
                                <LocationCard key={item.id} item={item} />
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
