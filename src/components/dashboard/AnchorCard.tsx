import React, { useState, useEffect } from 'react';
import { Anchor, Heart, UserPlus, FileWarning, Handshake, Church, Globe2, CheckCircle2, Circle } from 'lucide-react';

interface AnchorCardProps {
    completedTasks: string[];
    onToggle: (taskId: string) => void;
    dayOfWeek: string;
}

const SCHEDULE = {
    Monday: { letter: 'A.', topic: 'Adore Wife', desc: 'Pray for your spouse', icon: Heart },
    Tuesday: { letter: 'N.', topic: 'Nurture Kids', desc: 'Pray for your children', icon: UserPlus },
    Wednesday: { letter: 'C.', topic: 'Confess Sins', desc: 'Heart check & repentance', icon: FileWarning },
    Thursday: { letter: 'H.', topic: 'Help Brothers', desc: 'Family & small group', icon: Handshake },
    Friday: { letter: 'O.', topic: 'Our Church', desc: 'Pastors & community', icon: Church },
    Saturday: { letter: 'R.', topic: 'Reach World', desc: 'Missions & lost souls', icon: Globe2 },
    // Sunday: { letter: 'S', topic: 'Service', desc: 'Worship & Rest', icon: Anchor },
};

export default function AnchorCard({ completedTasks, onToggle, dayOfWeek }: AnchorCardProps) {
    // State to handle previewing other days
    const [previewDay, setPreviewDay] = useState<string | null>(null);

    // Reset preview when day changes (unlikely in session, but good practice)
    useEffect(() => {
        setPreviewDay(null);
    }, [dayOfWeek]);

    // Active day is either the preview day or the actual current day
    // Fallback to Monday if dayOfWeek is Sunday or invalid
    const activeDayKey = previewDay || (SCHEDULE[dayOfWeek as keyof typeof SCHEDULE] ? dayOfWeek : 'Monday');
    const displayItem = SCHEDULE[activeDayKey as keyof typeof SCHEDULE];

    // Is this the ACTUAL today?
    const isToday = activeDayKey === dayOfWeek;
    const isCompleted = completedTasks.includes('anchor_prayer');

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all h-full flex flex-col group relative">
            {/* Background Gradient Hint */}
            <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 pointer-events-none ${isToday ? 'from-indigo-500/5 to-transparent' : 'from-muted/10 to-transparent opacity-50'}`} />

            {/* Header */}
            <div className="p-4 border-b border-border flex items-center justify-between relative z-10">
                <div className="flex items-center gap-2 text-indigo-500">
                    <Anchor className="w-5 h-5" />
                    <h3 className="font-bold tracking-wide text-sm uppercase">Daily A.N.C.H.O.R.</h3>
                </div>
                {!isToday && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                        Previewing {activeDayKey}
                    </span>
                )}
            </div>

            <div className="p-4 flex-1 flex flex-col justify-center relative z-10">
                {/* Main Content */}
                <div className="flex items-start gap-4 animate-fade-in key={activeDayKey}"> {/* Key forces re-render animation */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-bold text-xl flex-shrink-0 transition-colors ${isToday ? 'bg-indigo-500/10 text-indigo-600' : 'bg-secondary text-muted-foreground'}`}>
                        {displayItem.letter}
                    </div>
                    <div className="space-y-1 flex-1">
                        <h4 className={`font-bold text-lg transition-colors ${isToday ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {displayItem.topic}
                        </h4>
                        <p className="text-muted-foreground text-sm">{displayItem.desc}</p>
                    </div>
                </div>

                {/* Action Button (Only show for Today to avoid confusion, or disable) */}
                <div className="mt-6 h-12">
                    {isToday ? (
                        <button
                            onClick={() => onToggle('anchor_prayer')}
                            className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border font-medium transition-all ${isCompleted ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-600' : 'bg-secondary/50 border-transparent text-muted-foreground hover:bg-secondary hover:text-foreground'}`}
                        >
                            {isCompleted ? <CheckCircle2 className="w-5 h-5 animate-scale-in" /> : <Circle className="w-5 h-5" />}
                            {isCompleted ? 'Prayer Completed' : 'Mark as Prayed'}
                        </button>
                    ) : (
                        <button
                            onClick={() => setPreviewDay(null)}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg border border-transparent text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all text-sm"
                        >
                            Return to Today
                        </button>
                    )}
                </div>

                {/* Mini Interactive Calendar Row */}
                <div className="mt-6 flex justify-between px-2">
                    {Object.keys(SCHEDULE).map((day) => {
                        const short = day.slice(0, 1);
                        const isCurrentDay = day === dayOfWeek;
                        const isSelected = day === activeDayKey;

                        return (
                            <button
                                key={day}
                                onClick={() => setPreviewDay(day === dayOfWeek ? null : day)}
                                className={`flex flex-col items-center gap-1 group/day transition-all p-1 rounded hover:bg-muted/50 ${isSelected ? 'scale-110' : 'opacity-70 hover:opacity-100'}`}
                                title={`Preview ${day}`}
                            >
                                <span className={`text-[10px] font-bold uppercase transition-colors ${isCurrentDay ? 'text-indigo-500' : isSelected ? 'text-foreground' : 'text-muted-foreground'}`}>
                                    {short}
                                </span>
                                <div className={`w-1 h-1 rounded-full transition-all ${isCurrentDay ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : isSelected ? 'bg-foreground' : 'bg-transparent'}`} />
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
