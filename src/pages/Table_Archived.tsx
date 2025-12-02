import { ChevronRight, Book, Scroll, Shield, List, Heart, CheckCircle2 } from 'lucide-react';
import { tableHierarchy } from '../data/tableData';

export default function Table() {
    const sections = [
        { id: 'Tradition', icon: Scroll, color: 'text-amber-500', bg: 'bg-amber-500/10' },
        { id: 'Apologetics', icon: Shield, color: 'text-blue-500', bg: 'bg-blue-500/10' },
        { id: 'Bible', icon: Book, color: 'text-red-500', bg: 'bg-red-500/10' },
        { id: 'Lists', icon: List, color: 'text-green-500', bg: 'bg-green-500/10' },
        { id: 'Ethos', icon: Heart, color: 'text-purple-500', bg: 'bg-purple-500/10' }
    ];

    return (
        <div className="max-w-3xl mx-auto space-y-8 animate-fade-in pb-20">
            <div className="text-center space-y-4">
                <h1 className="text-4xl font-bold tracking-tight">T.A.B.L.E. Curriculum</h1>
                <p className="text-muted-foreground max-w-xl mx-auto">
                    The foundational pillars of the Light Trail Network curriculum, designed to build strong disciples through structured learning and practice.
                </p>
            </div>

            <div className="grid gap-6">
                {sections.map((section) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const data = (tableHierarchy as any)[section.id];
                    const Icon = section.icon;

                    return (
                        <div key={section.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
                            <div className="p-6">
                                <div className="flex items-start gap-4">
                                    <div className={`p-3 rounded-xl ${section.bg} ${section.color}`}>
                                        <Icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex-1 space-y-4">
                                        <div>
                                            <h2 className="text-xl font-bold text-foreground">{section.id}</h2>
                                            <p className="text-muted-foreground mt-1">{data.description}</p>
                                        </div>

                                        {/* Sub-areas */}
                                        <div className="space-y-3">
                                            {data.subAreas && !Array.isArray(data.subAreas) ? (
                                                // Object of sub-areas (like Apologetics)
                                                Object.entries(data.subAreas).map(([key, value]: [string, any]) => (
                                                    <div key={key} className="bg-muted/30 rounded-lg p-4">
                                                        <h3 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                                                            <ChevronRight className="w-4 h-4 text-muted-foreground" />
                                                            {key}
                                                            {value.acronym && (
                                                                <span className="text-xs font-normal px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                                                                    {value.acronym}
                                                                </span>
                                                            )}
                                                        </h3>
                                                        <div className="pl-6 grid gap-2">
                                                            {value.topics && value.topics.map((topic: any, idx: number) => (
                                                                <div key={idx} className="text-sm text-muted-foreground flex items-start gap-2">
                                                                    <span className="w-1.5 h-1.5 rounded-full bg-border mt-1.5 shrink-0" />
                                                                    <span>
                                                                        {typeof topic === 'string' ? topic : (
                                                                            <>
                                                                                <span className="font-medium text-foreground/80">{topic.name}</span>
                                                                                {topic.description && <span className="text-muted-foreground/70"> - {topic.description}</span>}
                                                                                {topic.question && <span className="text-muted-foreground/70 block italic">"{topic.question}"</span>}
                                                                            </>
                                                                        )}
                                                                    </span>
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                ))
                                            ) : Array.isArray(data.subAreas) && data.subAreas.length > 0 ? (
                                                // Array of strings (like Bible)
                                                <div className="flex flex-wrap gap-2">
                                                    {data.subAreas.map((area: string, idx: number) => (
                                                        <span key={idx} className="px-3 py-1 rounded-full bg-muted text-sm font-medium text-muted-foreground">
                                                            {area}
                                                        </span>
                                                    ))}
                                                </div>
                                            ) : data.topics ? (
                                                // Direct topics (like Lists)
                                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                                    {data.topics.map((topic: string, idx: number) => (
                                                        <div key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                                                            <CheckCircle2 className="w-4 h-4 text-primary/40" />
                                                            {topic}
                                                        </div>
                                                    ))}
                                                </div>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
