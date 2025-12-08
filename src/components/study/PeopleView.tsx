import { User, Scroll, Calendar, Crosshair, Users } from 'lucide-react';
import { PROFILES } from '../../data/studyData';

export default function PeopleView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-indigo-500/10 to-blue-500/10 rounded-2xl p-8 border border-indigo-500/20">
                <h2 className="text-3xl font-bold text-indigo-700 dark:text-indigo-500 mb-4">People of the Bible</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    "Therefore, since we are surrounded by such a great cloud of witnesses..." - Hebrews 12:1
                    <br /><br />
                    Meet the men and women God used to shape history. Explore their lives, their character, and their role in the redemptive story.
                </p>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {PROFILES.map((person) => (
                    <div key={person.id} className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col">
                        {/* Card Header */}
                        <div className="p-6 border-b border-border bg-gradient-to-br from-background to-secondary/5">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-16 h-16 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-bold text-2xl">
                                        {person.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{person.name}</h3>
                                        <p className="text-indigo-600 dark:text-indigo-400 font-medium text-sm">{person.title}</p>
                                        <p className="text-xs text-muted-foreground mt-0.5">Meaning: "{person.meaning}"</p>
                                    </div>
                                </div>
                                <span className="px-3 py-1 bg-secondary/10 border border-border rounded-full text-xs font-semibold uppercase tracking-wider">
                                    {person.role}
                                </span>
                            </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6 flex-grow space-y-6">
                            {/* Bio */}
                            <p className="text-sm leading-relaxed text-muted-foreground">
                                {person.bio}
                            </p>

                            {/* Stats/Details */}
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div className="bg-secondary/5 p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Calendar className="w-3 h-3" />
                                        <span className="text-[10px] uppercase font-bold">Timeline</span>
                                    </div>
                                    <span className="font-medium">{person.dates}</span>
                                </div>
                                <div className="bg-secondary/5 p-3 rounded-lg">
                                    <div className="flex items-center gap-2 text-muted-foreground mb-1">
                                        <Users className="w-3 h-3" />
                                        <span className="text-[10px] uppercase font-bold">Connections</span>
                                    </div>
                                    <div className="flex flex-wrap gap-1">
                                        {person.connections.map(c => (
                                            <span key={c} className="capitalize">{c}</span>
                                        )).reduce((prev, curr) => [prev, ', ', curr] as any)}
                                    </div>
                                </div>
                            </div>

                            {/* Key Traits */}
                            <div>
                                <h4 className="text-xs font-bold uppercase text-muted-foreground mb-2 flex items-center gap-2">
                                    <Crosshair className="w-3 h-3" /> Traits
                                </h4>
                                <div className="flex flex-wrap gap-2">
                                    {person.traits.map(trait => (
                                        <span key={trait} className="px-2 py-1 bg-indigo-50 dark:bg-indigo-900/20 text-indigo-700 dark:text-indigo-300 rounded text-xs">
                                            {trait}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {/* Key Verse */}
                            {person.keyVerses.length > 0 && (
                                <div className="border-l-2 border-indigo-500/20 pl-4 py-1">
                                    <p className="text-sm italic text-foreground/80">"{person.keyVerses[0].text}"</p>
                                    <p className="text-xs text-indigo-600 dark:text-indigo-400 mt-1 font-semibold">— {person.keyVerses[0].ref}</p>
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
