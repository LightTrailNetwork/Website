import { GitMerge, ArrowRight } from 'lucide-react';
import { TYPOLOGY } from '../../data/studyData';
import VerseLink from './VerseLink';

export default function TypologyView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-2xl p-8 border border-orange-500/20">
                <h2 className="text-3xl font-bold text-orange-700 dark:text-orange-500 mb-4">Typology: Shadows of Christ</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    "These are a shadow of the things that were to come; the reality, however, is found in Christ." - <VerseLink reference="Colossians 2:17" />
                </p>
            </div>

            <div className="grid gap-8">
                {TYPOLOGY.map(item => (
                    <div key={item.id} className="relative bg-card border border-border rounded-2xl p-6 md:p-8 shadow-sm hover:shadow-lg transition-all">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-bold">{item.title}</h3>
                            <p className="text-muted-foreground mt-2 max-w-2xl mx-auto border-t border-border/50 pt-2 text-sm italic">
                                "{item.significance}"
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-8 items-center">
                            {/* Type (Old Testament) */}
                            <div className="space-y-4 p-6 bg-orange-50 dark:bg-orange-950/20 rounded-xl border border-orange-100 dark:border-orange-900/30 relative">
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-background border border-orange-200 dark:border-orange-800 rounded-full text-xs font-bold text-orange-600 dark:text-orange-400 uppercase tracking-widest">
                                    The Shadow (Type)
                                </span>
                                <div className="text-center pt-2">
                                    <h4 className="text-xl font-bold text-orange-800 dark:text-orange-300 mb-1">{item.otType.entity}</h4>
                                    <VerseLink reference={item.otType.ref} className="text-xs" />
                                </div>
                                <p className="text-center text-sm text-foreground/80 leading-relaxed">
                                    {item.otType.description}
                                </p>
                            </div>

                            {/* Antitype (New Testament) */}
                            <div className="space-y-4 p-6 bg-red-50 dark:bg-red-950/20 rounded-xl border border-red-100 dark:border-red-900/30 relative">
                                <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 px-3 py-1 bg-background border border-red-200 dark:border-red-800 rounded-full text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-widest">
                                    The Reality (Antitype)
                                </span>
                                <div className="text-center pt-2">
                                    <h4 className="text-xl font-bold text-red-800 dark:text-red-300 mb-1">{item.ntAntitype.entity}</h4>
                                    <VerseLink reference={item.ntAntitype.ref} className="text-xs" />
                                </div>
                                <p className="text-center text-sm text-foreground/80 leading-relaxed">
                                    {item.ntAntitype.description}
                                </p>
                            </div>
                        </div>

                        {/* Connector Icon */}
                        <div className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:flex w-10 h-10 bg-background rounded-full border border-border items-center justify-center shadow-sm z-10 text-muted-foreground">
                            <ArrowRight className="w-5 h-5" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
