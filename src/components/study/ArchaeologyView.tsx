import React, { useState } from 'react';
import { MapPin, Pickaxe, Calendar, ScrollText, Navigation } from 'lucide-react';
import { ARCHAEOLOGY_DATA } from '../../data/studyData';
import VerseLink from './VerseLink';
import BibleLeafletMap from './BibleLeafletMap';

export default function ArchaeologyView() {
    const [activeId, setActiveId] = useState<string | null>(null);

    // Filter to keep map centered/relevant or show all? Show all for now.
    const mapLocations = ARCHAEOLOGY_DATA.map(item => ({
        id: item.id,
        lat: item.coordinates.lat,
        lng: item.coordinates.lng,
        label: item.title
    }));

    const mapRef = React.useRef<HTMLDivElement>(null);

    const handleSelect = (id: string, shouldScroll = true) => {
        setActiveId(id);
        if (shouldScroll) {
            const el = document.getElementById(`arch-${id}`);
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

    return (
        <div className="space-y-8 animate-in fade-in duration-500 pb-20">
            {/* Header */}
            <div className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-2xl p-8 border border-amber-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-amber-700 dark:text-amber-500 mb-4 flex items-center gap-3">
                            <Pickaxe className="w-8 h-8" />
                            Archaeological Evidence
                        </h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            "The stones will cry out." Physical evidence from the ancient world that confirms the history, people, and places of the Bible.
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
                        />
                    </div>
                </div>

                {/* List Section */}
                <div className="w-full lg:w-1/2 space-y-6">
                    {/* Sort by date? They appear to be somewhat random or mixed in the data array.
                        Let's verify order or just render as is. Ideally sorted by Artifact Date/Time.
                        For now, rendering in data order (which seems mixed).
                    */}
                    {ARCHAEOLOGY_DATA.map(item => (
                        <div
                            key={item.id}
                            id={`arch-${item.id}`}
                            className={`
                                group bg-card border rounded-xl overflow-hidden transition-all duration-300 scroll-mt-32
                                ${activeId === item.id
                                    ? 'border-amber-500 ring-1 ring-amber-500 shadow-lg shadow-amber-500/10 scale-[1.02]'
                                    : 'border-border shadow-sm hover:shadow-md hover:border-amber-500/30'
                                }
                            `}
                            onClick={() => handleItemClick(item.id)}
                        >
                            {/* Card Header with Location Image Placeholder or just stylized header */}
                            <div className="p-6 space-y-4">
                                <div className="flex justify-between items-start gap-4">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-600 mb-1">
                                            <Calendar className="w-3 h-3" />
                                            {item.artifactDate}
                                        </div>
                                        <h3 className="text-xl font-bold text-foreground group-hover:text-amber-700 dark:group-hover:text-amber-500 transition-colors">
                                            {item.title}
                                        </h3>
                                    </div>
                                    <div className={`p-2 rounded-lg ${activeId === item.id ? 'bg-amber-500 text-white' : 'bg-secondary text-muted-foreground'} transition-colors`}>
                                        <MapPin className="w-5 h-5" />
                                    </div>
                                </div>

                                <p className="text-foreground/80 leading-relaxed">
                                    {item.description}
                                </p>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-muted-foreground bg-secondary/20 p-3 rounded-lg border border-border/50">
                                    <div className="flex items-center gap-2">
                                        <Navigation className="w-3 h-3 text-amber-500" />
                                        <span>Found in: <strong className="text-foreground">{item.location}</strong></span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <ScrollText className="w-3 h-3 text-amber-500" />
                                        <span>Discovered: <strong className="text-foreground">{item.dateDiscovered}</strong></span>
                                    </div>
                                    {item.currentLocation && (
                                        <div className="flex items-center gap-2 sm:col-span-2 border-t border-border/50 pt-2 mt-1">
                                            <span className="text-[10px] uppercase font-bold text-amber-600/70 tracking-wider">Housed At:</span>
                                            <span className="font-medium text-foreground">{item.currentLocation}</span>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-4 border-t border-border/50">
                                    <h4 className="text-sm font-bold text-amber-700 dark:text-amber-500 mb-2 flex items-center gap-2">
                                        Biblical Significance
                                    </h4>
                                    <p className="text-sm text-foreground/90 italic border-l-2 border-amber-500/30 pl-3 py-1">
                                        {item.significance}
                                    </p>
                                </div>

                                <div className="flex gap-2 flex-wrap pt-2">
                                    {item.bibleReferences.map((ref, idx) => (
                                        <VerseLink
                                            key={idx}
                                            reference={ref}
                                            className="px-2 py-1 bg-amber-500/10 text-amber-700 dark:text-amber-400 text-xs rounded-md font-medium hover:bg-amber-500/20 transition-colors border border-amber-500/20"
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
