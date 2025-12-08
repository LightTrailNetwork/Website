import { Combine } from 'lucide-react';
import { HARMONY } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function HarmonyView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-teal-500/10 to-emerald-500/10 rounded-2xl p-8 border border-teal-500/20">
                <h2 className="text-3xl font-bold text-teal-700 dark:text-teal-500 mb-4">Gospel Harmony</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    See the life of Christ through the four distinct lenses of the Evangelists.
                </p>
            </div>

            {/* Mobile View (Cards) */}
            <div className="md:hidden space-y-4">
                {HARMONY.map(event => (
                    <div key={event.id} className="bg-card border border-border rounded-xl p-5 shadow-sm">
                        <h3 className="font-bold text-lg text-foreground mb-1">{event.title}</h3>
                        <p className="text-sm text-muted-foreground mb-4">{event.description}</p>

                        <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                            {event.references.matthew && (
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 mb-0.5">Matthew</span>
                                    <VerseLink reference={`Matthew ${event.references.matthew}`} className="text-sm font-mono sm:text-base" />
                                </div>
                            )}
                            {event.references.mark && (
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-red-600 dark:text-red-400 mb-0.5">Mark</span>
                                    <VerseLink reference={`Mark ${event.references.mark}`} className="text-sm font-mono sm:text-base" />
                                </div>
                            )}
                            {event.references.luke && (
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-green-600 dark:text-green-400 mb-0.5">Luke</span>
                                    <VerseLink reference={`Luke ${event.references.luke}`} className="text-sm font-mono sm:text-base" />
                                </div>
                            )}
                            {event.references.john && (
                                <div className="flex flex-col">
                                    <span className="text-[10px] uppercase font-bold text-yellow-600 dark:text-yellow-400 mb-0.5">John</span>
                                    <VerseLink reference={`John ${event.references.john}`} className="text-sm font-mono sm:text-base" />
                                </div>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop View (Table) */}
            <div className="hidden md:block overflow-x-auto">
                <div className="min-w-[800px] border border-border rounded-xl bg-card">
                    {/* Table Header */}
                    <div className="grid grid-cols-12 bg-secondary/10 border-b border-border text-sm font-bold p-4">
                        <div className="col-span-4">Event</div>
                        <div className="col-span-2 text-center text-blue-600 dark:text-blue-400">Matthew</div>
                        <div className="col-span-2 text-center text-red-600 dark:text-red-400">Mark</div>
                        <div className="col-span-2 text-center text-green-600 dark:text-green-400">Luke</div>
                        <div className="col-span-2 text-center text-yellow-600 dark:text-yellow-400">John</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-border">
                        {HARMONY.map(event => (
                            <div key={event.id} className="grid grid-cols-12 p-4 items-center hover:bg-secondary/5 transition-colors">
                                <div className="col-span-4 pr-4">
                                    <h3 className="font-semibold text-foreground">{event.title}</h3>
                                    <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                                </div>
                                <div className="col-span-2 text-center">
                                    {event.references.matthew ?
                                        <VerseLink reference={`Matthew ${event.references.matthew}`} className="text-sm font-mono" />
                                        : <span className="text-muted-foreground/30">-</span>}
                                </div>
                                <div className="col-span-2 text-center">
                                    {event.references.mark ?
                                        <VerseLink reference={`Mark ${event.references.mark}`} className="text-sm font-mono" />
                                        : <span className="text-muted-foreground/30">-</span>}
                                </div>
                                <div className="col-span-2 text-center">
                                    {event.references.luke ?
                                        <VerseLink reference={`Luke ${event.references.luke}`} className="text-sm font-mono" />
                                        : <span className="text-muted-foreground/30">-</span>}
                                </div>
                                <div className="col-span-2 text-center">
                                    {event.references.john ?
                                        <VerseLink reference={`John ${event.references.john}`} className="text-sm font-mono" />
                                        : <span className="text-muted-foreground/30">-</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
