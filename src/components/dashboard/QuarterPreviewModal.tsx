import React, { useState } from 'react';
import { X, Calendar, BookOpen, Brain, Microscope, CheckCircle2, Users, Clock } from 'lucide-react';
import { quarterlySchedule } from '../../data/tableData';
import { getBibleLink } from '../../utils/linkUtils';
import { Link, useNavigate } from 'react-router-dom';

interface QuarterPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentWeekNum: number;
}

export default function QuarterPreviewModal({ isOpen, onClose, currentWeekNum }: QuarterPreviewModalProps) {
    const [activeSession, setActiveSession] = useState<'Preparation' | 'Session 1' | 'Session 2' | 'Session 3' | 'Rest'>('Session 1');
    const navigate = useNavigate();

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

    const handleReadClick = (link: string | null) => {
        if (link) {
            onClose(); // Close modal on navigation
            // If it's an external link or specialized route, handle naturally
            // If it's a Bible Ref, standard router link
        }
    };

    return (
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in">
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden">
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
                <div className="flex-1 overflow-y-auto p-4 md:p-6 min-h-0 bg-secondary/5">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        {filteredWeeks.length === 0 ? (
                            <div className="col-span-full py-12 text-center text-muted-foreground italic">
                                No scheduled content for this period.
                            </div>
                        ) : (
                            filteredWeeks.map(week => {
                                const isCurrent = week.weekNum === currentWeekNum;
                                const mondayData = week.days['Monday']; // Monday usually holds key metadata
                                const area = mondayData?.area || (week.session === 'Rest' ? 'Rest' : 'General');
                                // Removed weekly 'topic' variable as we now show daily topics

                                const dateRange = (() => {
                                    const now = new Date();
                                    const startOfYear = new Date(now.getFullYear(), 0, 1);
                                    const dayOfYear = Math.floor((now.getTime() - startOfYear.getTime()) / (1000 * 60 * 60 * 24));

                                    // 1. Determine which Quarter we are in (0-3)
                                    const quarterIdx = Math.floor(dayOfYear / 91);
                                    const quarterStartMonth = Math.min(quarterIdx * 3, 9);

                                    // 2. Get the 1st of that Quarter's month
                                    const qStart = new Date(now.getFullYear(), quarterStartMonth, 1);

                                    // 3. Align to the Sunday that begins that week
                                    // If qStart is Sun (0), offset is 0. If Wed (3), offset is 3 (back to Sun).
                                    const offset = qStart.getDay();
                                    const week0Start = new Date(qStart);
                                    week0Start.setDate(qStart.getDate() - offset);

                                    // 4. Calculate this specific week's range
                                    const currentWeekStart = new Date(week0Start);
                                    currentWeekStart.setDate(week0Start.getDate() + (week.weekNum * 7));

                                    const currentWeekEnd = new Date(currentWeekStart);
                                    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);

                                    const format = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                    return `${format(currentWeekStart)} - ${format(currentWeekEnd)}`;
                                })();

                                return (
                                    <div
                                        key={week.weekNum}
                                        className={`flex flex-col border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/50 h-full ${isCurrent ? 'ring-2 ring-primary border-primary bg-primary/5' : 'bg-card border-border'}`}
                                    >
                                        <div className="p-3 bg-secondary/20 border-b border-border/50 flex justify-between items-center shrink-0">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">Week {week.weekNum}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium">{dateRange}</span>
                                            </div>
                                            {isCurrent && <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-primary-foreground rounded-full">CURRENT</span>}
                                        </div>

                                        <div className="p-4 space-y-4 flex-1 flex flex-col">
                                            {/* Header: Area Only */}
                                            <div className="shrink-0">
                                                <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-wider flex items-center gap-1">
                                                    <Microscope className="w-3 h-3" />
                                                    {area}
                                                </div>
                                            </div>

                                            {/* Daily Breakdown */}
                                            {week.session !== 'Rest' && (
                                                <div className="flex-1 space-y-3 mt-2">
                                                    <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Daily Schedule</div>
                                                    {daysOrder.map(day => {
                                                        const dayData = (week.days as any)[day];
                                                        if (!dayData) return null;

                                                        const isSaturday = day === 'Saturday';
                                                        const shortDay = day.slice(0, 3);

                                                        let content = dayData.read;
                                                        let type = 'read';

                                                        if (isSaturday && dayData.action) {
                                                            content = dayData.action;
                                                            type = 'action';
                                                        } else if (!content && dayData.action) {
                                                            content = dayData.action;
                                                            type = 'action';
                                                        }

                                                        if (!content && week.session !== 'Rest') return null;

                                                        const bibleLink = type === 'read' && content ? getBibleLink(content) : null;

                                                        // Parse Memory Verse if available (format: "Text... - Ref Version")
                                                        let memRef = null;
                                                        let memLink = null;

                                                        if (dayData.memorize && content) {
                                                            const parts = dayData.memorize.split(' - ');
                                                            if (parts.length > 1) {
                                                                const fullRef = parts[1]; // e.g. "Matthew 28:19 BSB"
                                                                // Remove version
                                                                const refOnly = fullRef.replace(/ [A-Z]+$/, ''); // "Matthew 28:19"
                                                                if (refOnly.startsWith(content)) {
                                                                    // Extract just the verse part (e.g. ":19" -> "v. 19")
                                                                    const versePart = refOnly.substring(content.length).trim().replace(/^:/, '');
                                                                    if (versePart) {
                                                                        memRef = `(mem v. ${versePart})`;
                                                                        // Construct deep link to verse
                                                                        if (bibleLink) memLink = `${bibleLink}/${versePart}`;
                                                                    }
                                                                } else {
                                                                    // Fallback
                                                                    memRef = `(mem ${refOnly})`;
                                                                }
                                                                // Clean up if it's "Review"
                                                                if (dayData.memorize === 'Review') memRef = null;
                                                            }
                                                        }

                                                        // Determine if we should show a study topic
                                                        // Only show if it exists, isn't "Fellowship" or "Review", and isn't Saturday
                                                        const studyTopic = dayData.study;
                                                        const showTopic = studyTopic && studyTopic !== 'Fellowship' && studyTopic !== 'Review' && !isSaturday;

                                                        return (
                                                            <div key={day} className="flex flex-col text-xs space-y-0.5">
                                                                <div className="flex items-start gap-2">
                                                                    <span className={`font-mono font-bold w-6 shrink-0 ${isSaturday ? 'text-orange-500' : 'text-muted-foreground'}`}>{shortDay}</span>
                                                                    {bibleLink ? (
                                                                        <div className="flex flex-wrap items-center gap-1">
                                                                            <Link
                                                                                to={bibleLink}
                                                                                onClick={() => onClose()}
                                                                                className="text-primary hover:underline hover:text-primary/80 line-clamp-1 font-medium"
                                                                            >
                                                                                {content}
                                                                            </Link>
                                                                            {memRef && (
                                                                                memLink ? (
                                                                                    <Link
                                                                                        to={memLink}
                                                                                        onClick={() => onClose()}
                                                                                        className="text-muted-foreground font-normal text-[10px] whitespace-nowrap hover:text-primary hover:underline"
                                                                                    >
                                                                                        {memRef}
                                                                                    </Link>
                                                                                ) : (
                                                                                    <span className="text-muted-foreground font-normal text-[10px] whitespace-nowrap">
                                                                                        {memRef}
                                                                                    </span>
                                                                                )
                                                                            )}
                                                                        </div>
                                                                    ) : (
                                                                        <span className={`text-muted-foreground/80 line-clamp-1 ${type === 'action' ? 'italic text-orange-600/80' : ''}`} title={content}>
                                                                            {content || '-'}
                                                                        </span>
                                                                    )}
                                                                </div>
                                                                {showTopic && (
                                                                    <div className="pl-8 text-[10px] text-muted-foreground/70 leading-tight">
                                                                        {studyTopic}
                                                                    </div>
                                                                )}
                                                            </div>
                                                        )
                                                    })}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Fellowship Info Footer - Only for Active Sessions */}
                    {
                        ['Session 1', 'Session 2', 'Session 3'].includes(activeSession) && (
                            <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-xl p-4 md:p-6 flex flex-col md:flex-row gap-6 items-start">
                                <div className="flex items-center gap-3 text-indigo-500 shrink-0">
                                    <div className="p-3 bg-indigo-500/10 rounded-full">
                                        <Users className="w-6 h-6" />
                                    </div>
                                    <div className="flex flex-col">
                                        <h3 className="font-bold text-sm uppercase tracking-wide">Weekly Fellowship</h3>
                                        <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                            <Clock className="w-3 h-3" />
                                            <span>Recurring Times</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500 text-white">TUESDAY</span>
                                            <span className="text-sm font-semibold text-foreground">Scout Planning</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            <strong>Stewards, Scouts & Pre-Scouts</strong> meet to discuss options for Saturday Serve.
                                            <br />
                                            <strong>Mentee & Mentor</strong> meet for evening fellowship.
                                        </p>
                                    </div>

                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2">
                                            <span className="text-xs font-bold px-2 py-0.5 rounded bg-indigo-500 text-white">THURSDAY</span>
                                            <span className="text-sm font-semibold text-foreground">Mentor Connect</span>
                                        </div>
                                        <p className="text-xs text-muted-foreground leading-relaxed">
                                            <strong>Mentor & Steward</strong> meet first to finalize Saturday Serve plans.
                                            <br />
                                            <strong>Mentee & Mentor</strong> meet afterwards for Saturday Serve planning and evening fellowship.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )
                    }
                </div >
            </div >
        </div >
    );
}
