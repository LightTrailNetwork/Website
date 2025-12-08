import { MapPin, Navigation } from 'lucide-react';
import { PLACES } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function PlacesView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/10 to-teal-500/10 rounded-2xl p-8 border border-blue-500/20">
                <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-500 mb-4">Places & Maps</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    Understand the geography of the Bible. From the hills of Judea to the streets of Babylon.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {PLACES.map(place => (
                    <div key={place.id} className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all">
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-600 dark:text-blue-400">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="text-xl font-bold">{place.name}</h3>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                    <Navigation className="w-3 h-3" /> {place.modernLocation}
                                </p>
                            </div>
                        </div>

                        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                            {place.significance}
                        </p>

                        <div className="space-y-2">
                            <h4 className="text-xs font-bold uppercase tracking-wider text-muted-foreground border-b border-border pb-1 mb-2">Key Events</h4>
                            {place.events.map((event, idx) => (
                                <div key={idx} className="flex justify-between items-start text-sm group">
                                    <span className="text-foreground/90">{event.title}</span>
                                    <VerseLink reference={event.ref} className="text-xs whitespace-nowrap ml-2 opacity-70 group-hover:opacity-100" />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
