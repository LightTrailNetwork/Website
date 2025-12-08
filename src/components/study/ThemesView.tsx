import { THEMES } from '../../data/studyData';
import { BookOpen } from 'lucide-react';
import VerseLink from './VerseLink';

export default function ThemesView() {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-500/10 to-indigo-500/10 rounded-2xl p-8 border border-blue-500/20">
                <h2 className="text-3xl font-bold text-blue-700 dark:text-blue-500 mb-4">Biblical Themes</h2>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                    Detailed explorations of the major concepts that structure biblical theology.
                </p>
            </div>

            <div className="space-y-8">
                {THEMES.map(theme => (
                    <div key={theme.id} className="bg-card border border-border rounded-xl p-6 shadow-sm">
                        <h3 className="text-2xl font-bold mb-2 flex items-center gap-2">
                            <BookOpen className="w-6 h-6 text-blue-500" />
                            {theme.title}
                        </h3>
                        <p className="text-muted-foreground mb-6 leading-relaxed border-l-4 border-blue-500/20 pl-4 py-1 italic">
                            {theme.definition}
                        </p>

                        <div className="space-y-3">
                            <h4 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Key Verses</h4>
                            <div className="grid gap-3">
                                {theme.verses.map((v, i) => (
                                    <div key={i} className="p-3 bg-secondary/5 rounded-lg border border-border/50">
                                        <div className="flex justify-between mb-1">
                                            <VerseLink reference={v.ref} className="text-blue-600 dark:text-blue-400 font-bold text-sm" />
                                            <span className="text-[10px] text-muted-foreground uppercase">{v.note}</span>
                                        </div>
                                        <p className="text-sm">"{v.text}"</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
