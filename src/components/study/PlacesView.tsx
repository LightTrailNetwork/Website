import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import { PLACES } from '../../data/studyData';
import VerseLink from './VerseLink';
import BibleLeafletMap from './BibleLeafletMap';

export default function PlacesView() {
    const [activeId, setActiveId] = useState<string | null>(null);

    const mapRef = React.useRef<HTMLDivElement>(null);

    const handleSelect = (id: string, shouldScroll = true) => {
        setActiveId(id);
        if (shouldScroll) {
            const el = document.getElementById(`place-${id}`);
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
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl p-8 border border-blue-500/20">
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-500 mb-4">Places & Maps</h2>
                        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                            Explore the geography of Scripture. Click points on the map to discover their significance.
                        </p>
                    </div>
                    <div className="hidden md:block p-3 bg-blue-500/10 rounded-full">
                        <MapPin className="w-8 h-8 text-blue-500" />
                    </div>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row gap-8 items-start">
                {/* Map Section - Sticky on Desktop */}
                <div ref={mapRef} className="w-full lg:w-1/2 lg:sticky lg:top-24 z-10 scroll-mt-24">
                    <div className="bg-card rounded-xl shadow-lg overflow-hidden border border-border">
                        <BibleLeafletMap onSelectLocation={handleSelect} activeLocationId={activeId} />
                    </div>
                </div>

                {/* List Section */}
                <div className="w-full lg:w-1/2 space-y-4">
                    {PLACES.map(place => (
                        <div
                            key={place.id}
                            id={`place-${place.id}`}
                            className={`
                                bg-card border rounded-xl p-6 transition-all duration-300 scroll-mt-32
                                ${activeId === place.id
                                    ? 'border-blue-500 ring-1 ring-blue-500 shadow-lg shadow-blue-500/10 scale-[1.02]'
                                    : 'border-border shadow-sm hover:shadow-md hover:border-blue-500/30'
                                }
                            `}
                            onClick={() => handleItemClick(place.id)}
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`p-3 rounded-full ${activeId === place.id ? 'bg-blue-500 text-white' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'} transition-colors`}>
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex justify-between items-start">
                                        <h3 className="text-xl font-bold">{place.name}</h3>
                                        <span className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground">
                                            {place.id.replace(/-/g, ' ').toUpperCase()}
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                                        <Navigation className="w-3 h-3" /> {place.modernLocation}
                                    </p>
                                </div>
                            </div>

                            <p className="text-sm text-foreground/80 mb-6 leading-relaxed">
                                {place.significance}
                            </p>

                            <div className="space-y-2 bg-secondary/5 rounded-lg p-4">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border/50 pb-2 mb-2">Key Events</h4>
                                {place.events.map((event, idx) => (
                                    <div key={idx} className="flex justify-between items-start text-sm group">
                                        <span className="text-foreground/90 font-medium">{event.title}</span>
                                        <VerseLink reference={event.ref} className="text-xs whitespace-nowrap ml-2 opacity-70 group-hover:opacity-100 bg-blue-500/10 text-blue-600 px-2 py-0.5 rounded hover:bg-blue-500/20 transition-colors" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
