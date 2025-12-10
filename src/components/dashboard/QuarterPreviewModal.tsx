import React, { useState } from 'react';
import { X, Calendar, BookOpen, Brain, Microscope, CheckCircle2 } from 'lucide-react';
import { quarterlySchedule } from '../../data/tableData';

interface QuarterPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentWeekNum: number;
}

export default function QuarterPreviewModal({ isOpen, onClose, currentWeekNum }: QuarterPreviewModalProps) {
    const [activeSession, setActiveSession] = useState<'Preparation' | 'Session 1' | 'Session 2' | 'Session 3' | 'Rest'>('Session 1');

    if (!isOpen) return null;

    // Filter schedule by session
    const filteredWeeks = quarterlySchedule.filter(w => {
        if (activeSession === 'Preparation') return w.session === 'Preparation';
        if (activeSession === 'Rest') return w.session === 'Rest';
        return w.session === activeSession;
    });

    const sessions = ['Preparation', 'Session 1', 'Session 2', 'Session 3', 'Rest'];

    // Helper to get ordered days Mon-Sat
    const daysOrder = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    return (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[85vh] flex flex-col overflow-hidden">
                {/* Header */}
                <div className="p-4 border-b border-border flex items-center justify-between shrink-0 bg-card">
                    <div>
                        <h2 className="text-xl font-bold">Quarterly Plan</h2>
                        <p className="text-sm text-muted-foreground">Detailed overview of the 13-week curriculum</p>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-accent/10 rounded-full transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Tabs */}
                <div className="flex overflow-x-auto border-b border-border bg-muted/20 scrollbar-hide shrink-0">
                    {sessions.map(s => (
                        <button
                            key={s}
                            onClick={() => setActiveSession(s as any)}
                            className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-all border-b-2 ${activeSession === s ? 'border-primary text-primary bg-background' : 'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/30'}`}
                        >
                            {s}
                        </button>
                    ))}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {filteredWeeks.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-muted-foreground italic">
                                No scheduled content for this period.
                            </div>
                        ) : (
                            filteredWeeks.map(week => {
                                const isCurrent = week.weekNum === currentWeekNum;
                                const mondayData = week.days['Monday']; // Monday usually holds key metadata
                                const topic = mondayData?.study || "Rest / Review";
                                const area = mondayData?.area || (week.session === 'Rest' ? 'Rest' : 'General');
                                const memorize = mondayData?.memorize?.split(' - ')[0] || "Review"; // Truncate long verses for preview

                                return (
                                    <div
                                        key={week.weekNum}
                                        className={`flex flex-col border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/50 h-full ${isCurrent ? 'ring-2 ring-primary border-primary bg-primary/5' : 'bg-card border-border'}`}
                                    >
                                        <div className="p-3 bg-secondary/20 border-b border-border/50 flex justify-between items-center shrink-0">
                                            <span className="font-bold text-sm">Week {week.weekNum}</span>
                                            {isCurrent && <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-primary-foreground rounded-full">CURRENT</span>}
                                        </div>

                                        <div className="p-4 space-y-4 flex-1 flex flex-col">
                                            {/* Header: Area & Topic */}
                                            <div className="shrink-0">
                                                <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-wider flex items-center gap-1">
                                                    <Microscope className="w-3 h-3" />
                                                    {area}
                                                </div>
                                                <h3 className="font-semibold text-foreground text-sm leading-tight line-clamp-2" title={topic}>
                                                    {topic}
                                                </h3>
                                            </div>

                                            {/* Daily Breakdown */}
                                            <div className="flex-1 space-y-2 mt-2">
                                                <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Daily Schedule</div>
                                                {daysOrder.map(day => {
                                                    const dayData = (week.days as any)[day];
                                                    if (!dayData) return null;

                                                    const isSaturday = day === 'Saturday';
                                                    const shortDay = day.slice(0, 3);

                                                    // Logic: 
                                                    // If Read exists -> Show Read
                                                    // If Action exists -> Show Action
                                                    // Else -> Skip or show Rest?

                                                    let content = dayData.read;
                                                    let type = 'read';

                                                    if (isSaturday && dayData.action) {
                                                        content = dayData.action;
                                                        type = 'action';
                                                    } else if (!content && dayData.action) {
                                                        content = dayData.action;
                                                        type = 'action';
                                                    }

                                                    if (!content && week.session !== 'Rest') return null; // Don't show empty days in sessions unless it's explicitly 'Rest' session which handles differently
                                                    if (week.session === 'Rest') return null; // Don't show detailed breakdown for rest weeks generally

                                                    return (
                                                        <div key={day} className="flex items-start gap-2 text-xs">
                                                            <span className={`font-mono font-bold w-6 shrink-0 ${isSaturday ? 'text-orange-500' : 'text-muted-foreground'}`}>{shortDay}</span>
                                                            <span className={`text-muted-foreground/80 line-clamp-1 ${type === 'action' ? 'italic text-orange-600/80' : ''}`} title={content}>
                                                                {content || '-'}
                                                            </span>
                                                        </div>
                                                    )
                                                })}
                                            </div>

                                            {/* Memorize Footer */}
                                            <div className="pt-3 border-t border-border/50 shrink-0">
                                                <div className="flex items-start gap-2 text-xs">
                                                    <Brain className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                                                    <div className="text-muted-foreground">
                                                        <span className="font-bold text-foreground mr-1">MEMORIZE:</span>
                                                        <span className="line-clamp-1" title={mondayData?.memorize}>{memorize}</span>
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
