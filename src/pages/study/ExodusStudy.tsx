import React, { useState } from 'react';
import { MapPin, Mountain, Tent, Calendar, ScrollText, Navigation, Waves } from 'lucide-react';
import { EXODUS_LOCATIONS, EXODUS_ROUTE } from '../../data/exodusData';
import VerseLink from '../../components/study/VerseLink';
import BibleLeafletMap from '../../components/study/BibleLeafletMap';

export default function ExodusStudy() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const mapLocations = EXODUS_LOCATIONS.map(item => ({
        id: item.id,
        lat: item.coordinates.lat,
        lng: item.coordinates.lng,
        label: item.title
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
        // On mobile, scroll back up to map
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
                            Tracing the path of the Israelites from Egypt to the Promised Land, uncovering physical evidence that matches the biblical account.
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
                            Route Information
                        </h4>
                        <p>
                            The path shown traces the route from Goshen (Egypt) through the Sinai peninsula, crossing the Red Sea at Nuweiba Beach, and into modern-day Saudi Arabia to Mt. Sinai (Jebel al-Lawz).
                        </p>
                    </div>
                </div>

                {/* List Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                    {EXODUS_LOCATIONS.map(item => (
                        <div
                            key={item.id}
                            id={`exodus-${item.id}`}
                            className={`
                                group bg-card border rounded-xl overflow-hidden transition-all duration-300 scroll-mt-32
                                ${activeId === item.id
                                    ? 'border-amber-500 ring-1 ring-amber-500 shadow-lg shadow-amber-500/10 scale-[1.02]'
                                    : 'border-border shadow-sm hover:shadow-md hover:border-amber-500/30'
                                }
                            `}
                            onClick={() => handleItemClick(item.id)}
                        >
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                                            {item.type}
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className={`p-2 rounded-lg ${activeId === item.id ? 'bg-amber-500 text-white' : 'bg-secondary text-muted-foreground'} transition-colors`}>
                                        {getIcon(item.type)}
                                    </div>
                                </div>

                                <p className="text-foreground/80 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="pt-4 border-t border-border/50">
                                    <h4 className="text-sm font-bold text-amber-700 dark:text-amber-500 mb-2 flex items-center gap-2">
                                        Significance
                                    </h4>
                                    <p className="text-sm text-foreground/90 italic border-l-2 border-amber-500/30 pl-3 py-1">
                                        {item.significance}
                                    </p>
                                </div>

                                {item.bibleReferences.length > 0 && (
                                    <div className="flex gap-2 flex-wrap pt-2">
                                        {item.bibleReferences.map((ref, idx) => (
                                            <VerseLink
                                                key={idx}
                                                reference={ref}
                                                className="px-2 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs rounded-md font-medium hover:bg-amber-500/20 transition-colors border border-amber-500/20"
                                            />
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
