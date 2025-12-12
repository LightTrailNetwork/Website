import React, { useState } from 'react';
import { X, Calendar, BookOpen, Brain, Microscope, CheckCircle2, Users, Clock } from 'lucide-react';
import { quarterlySchedule } from '../../data/tableData';
import { getWeekMnemonicInfo } from '../../data/curriculumMnemonics';
import { ACROSTIC_DATA } from '../../data/acrosticDetails';
import { getBibleLink } from '../../utils/linkUtils';
import { Link, useNavigate } from 'react-router-dom';

interface QuarterPreviewModalProps {
    isOpen: boolean;
    onClose: () => void;
    currentWeekNum: number;
    initialSession?: string;
    referenceDate?: Date;
    onWeekSelect?: (weekNum: number) => void;
}

export default function QuarterPreviewModal({ isOpen, onClose, currentWeekNum, initialSession, referenceDate, onWeekSelect }: QuarterPreviewModalProps) {
    const [activeSession, setActiveSession] = useState<'Preparation' | 'Session 1' | 'Session 2' | 'Session 3' | 'Rest'>('Session 1');
    const navigate = useNavigate();

    // Sync active session with initialSession when modal opens
    React.useEffect(() => {
        if (isOpen && initialSession) {
            // Validate that it is a valid session type before setting
            if (['Preparation', 'Session 1', 'Session 2', 'Session 3', 'Rest'].includes(initialSession)) {
                setActiveSession(initialSession as any);
            }
        }
    }, [isOpen, initialSession]);

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
        <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in" onClick={onClose}>
            <div className="bg-card border border-border rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] flex flex-col overflow-hidden" onClick={e => e.stopPropagation()}>
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
                                    const now = referenceDate || new Date();

                                    // 1. Find the Sunday of the reference date
                                    const currentSunday = new Date(now);
                                    currentSunday.setHours(0, 0, 0, 0);
                                    currentSunday.setDate(currentSunday.getDate() - currentSunday.getDay());

                                    // 2. Back-calculate Week 0 Start (Preparation Week)
                                    // We assume currentWeekNum accurately reflects the distance from Week 0
                                    const week0Start = new Date(currentSunday);
                                    week0Start.setDate(week0Start.getDate() - (currentWeekNum * 7));

                                    // 3. Calculate this specific week's range
                                    const thisWeekStart = new Date(week0Start);
                                    thisWeekStart.setDate(week0Start.getDate() + (week.weekNum * 7));

                                    const thisWeekEnd = new Date(thisWeekStart);
                                    thisWeekEnd.setDate(thisWeekStart.getDate() + 6);

                                    const format = (d: Date) => d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
                                    return `${format(thisWeekStart)} - ${format(thisWeekEnd)}`;
                                })();

                                return (
                                    <div
                                        key={week.weekNum}
                                        onClick={() => {
                                            onWeekSelect?.(week.weekNum);
                                            onClose();
                                        }}
                                        className={`flex flex-col border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md hover:border-primary/50 h-full cursor-pointer group/card ${isCurrent ? 'ring-2 ring-primary border-primary bg-primary/5' : 'bg-card border-border'}`}
                                        title={`Jump to Week ${week.weekNum}`}
                                    >
                                        <div className="p-3 bg-secondary/20 border-b border-border/50 flex justify-between items-center shrink-0">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-sm">Week {week.weekNum}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium">{dateRange}</span>
                                            </div>
                                            {isCurrent && <span className="text-[10px] font-bold px-2 py-0.5 bg-primary text-primary-foreground rounded-full">CURRENT</span>}
                                        </div>

                                        <div className="p-4 space-y-4 flex-1 flex flex-col">
                                            {/* Header: Area & Mnemonics */}
                                            <div className="shrink-0 space-y-1">
                                                {(() => {
                                                    const acrostic = ACROSTIC_DATA[week.weekNum];

                                                    if (!acrostic) {
                                                        return (
                                                            <div className="text-[10px] font-bold uppercase text-muted-foreground mb-1 tracking-wider flex items-center gap-1">
                                                                <Microscope className="w-3 h-3" />
                                                                Week {week.weekNum}
                                                            </div>
                                                        );
                                                    }

                                                    // Paths for linking
                                                    const areaSlug = acrostic.area.toLowerCase();
                                                    const focusSlug = acrostic.focusTerm?.toLowerCase() || '';
                                                    const deepLink = `/curriculum/table/${areaSlug}/${focusSlug}`;

                                                    // Highlight Helper
                                                    const highlightText = (text: string | undefined, highlight: string | undefined) => {
                                                        if (!text) return null;
                                                        if (!highlight) return <span>{text}</span>;

                                                        const idx = text.toUpperCase().indexOf(highlight.toUpperCase());
                                                        if (idx !== -1) {
                                                            return (
                                                                <>
                                                                    {text.substring(0, idx)}
                                                                    <span className="text-primary font-bold">
                                                                        {text.substring(idx, idx + highlight.length)}
                                                                    </span>
                                                                    {text.substring(idx + highlight.length)}
                                                                </>
                                                            );
                                                        }
                                                        return <span>{text}</span>;
                                                    };

                                                    return (
                                                        <div className="flex flex-wrap items-baseline gap-2">
                                                            {/* T.A.B.L.E. */}
                                                            <Link to={`/curriculum/table/${areaSlug}`} className="text-[10px] font-bold text-muted-foreground hover:text-primary tracking-widest">
                                                                {['T', 'A', 'B', 'L', 'E'].map(c => (
                                                                    <span key={c} className={c === acrostic.tableLetter ? "text-primary font-bold" : "opacity-50"}>{c}.</span>
                                                                ))}
                                                            </Link>

                                                            <span className="text-muted-foreground/30 text-xs">›</span>

                                                            <Link to={`/curriculum/table/${areaSlug}`} className="text-[10px] font-bold text-muted-foreground hover:text-primary uppercase tracking-wider">
                                                                {acrostic.area}
                                                            </Link>

                                                            {acrostic.subMnemonic && (
                                                                <>
                                                                    <span className="text-muted-foreground/30 text-xs">›</span>
                                                                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest" title="Sub-Mnemonic">
                                                                        {highlightText(acrostic.subMnemonic, acrostic.subMnemonicHighlight)}
                                                                    </span>
                                                                </>
                                                            )}

                                                            {acrostic.focusTerm && (
                                                                <>
                                                                    <span className="text-muted-foreground/30 text-xs">›</span>
                                                                    <Link
                                                                        to={deepLink}
                                                                        onClick={() => onClose()}
                                                                        className="font-bold text-sm text-primary tracking-tight group"
                                                                    >
                                                                        {highlightText(acrostic.focusTerm, acrostic.focusHighlight)}
                                                                    </Link>
                                                                </>
                                                            )}

                                                            {acrostic.deepMnemonic && (
                                                                <>
                                                                    <span className="text-muted-foreground/30 text-xs">›</span>
                                                                    <span className="text-[10px] font-bold text-muted-foreground tracking-widest" title="Deep Mnemonic">
                                                                        {acrostic.deepMnemonic}
                                                                    </span>
                                                                </>
                                                            )}
                                                        </div>
                                                    );
                                                })()}
                                            </div>

                                            {/* Daily Breakdown */}
                                            {(
                                                <div className="flex-1 space-y-3 mt-2">
                                                    <div className="text-[10px] font-bold uppercase text-muted-foreground tracking-wider mb-1">Daily Schedule</div>
                                                    {daysOrder.map(dayName => {
                                                        const dayData = (week.days as any)[dayName];
                                                        if (!dayData) return null;

                                                        const isSaturday = dayName === 'Saturday';
                                                        const shortDay = dayName.slice(0, 3);
                                                        const topicText = dayData.study || '';

                                                        let content = dayData.read;
                                                        let type = 'read';
                                                        if (isSaturday && dayData.action) {
                                                            content = dayData.action; type = 'action';
                                                        } else if (!content && dayData.action) {
                                                            content = dayData.action; type = 'action';
                                                        }

                                                        const isToday = false;

                                                        // Highlight Logic
                                                        const renderTopic = () => {
                                                            const acrostic = ACROSTIC_DATA[week.weekNum];
                                                            if (!acrostic || !acrostic.dailyHighlights || !topicText) return topicText;

                                                            const rules = acrostic.dailyHighlights.filter(h => dayName.startsWith(h.day));
                                                            if (rules.length === 0) return topicText;

                                                            // Find all highlight ranges
                                                            // Each range: { start, end, highlight }
                                                            const ranges: { start: number; end: number; }[] = [];

                                                            rules.forEach(rule => {
                                                                if (!rule.highlight) return;

                                                                // Strategy:
                                                                // 1. If 'term' is present, find term first, then highlight within that term
                                                                // 2. If no 'term', find highlight directly in topicText
                                                                // 3. For multiple occurrence (like 'R' in 'Rivalry, Relevance'), try to match carefully

                                                                // Only taking first occurrence per rule to keep it simple unless we need global match?
                                                                // User examples imply specific words.

                                                                if (rule.term && topicText.includes(rule.term)) {
                                                                    const termIdx = topicText.indexOf(rule.term);
                                                                    const hIdx = rule.term.indexOf(rule.highlight);
                                                                    if (hIdx !== -1) {
                                                                        const start = termIdx + hIdx;
                                                                        const end = start + rule.highlight.length;
                                                                        ranges.push({ start, end });
                                                                    }
                                                                } else if (!rule.term && topicText.includes(rule.highlight)) {
                                                                    // Direct match (dangerous if multiple, but efficient)
                                                                    const start = topicText.indexOf(rule.highlight);
                                                                    if (start !== -1) {
                                                                        ranges.push({ start, end: start + rule.highlight.length });
                                                                    }
                                                                }
                                                            });

                                                            if (ranges.length === 0) return topicText;

                                                            // Sort ranges
                                                            ranges.sort((a, b) => a.start - b.start);

                                                            // build result
                                                            const result: React.ReactNode[] = [];
                                                            let currentIndex = 0;

                                                            ranges.forEach((range, i) => {
                                                                if (range.start < currentIndex) return; // Overlap or duplicate ignored

                                                                // Text before
                                                                if (range.start > currentIndex) {
                                                                    result.push(<span key={`text-${i}`}>{topicText.substring(currentIndex, range.start)}</span>);
                                                                }

                                                                // Highlighted text
                                                                result.push(
                                                                    <span key={`hl-${i}`} className="text-primary font-bold">
                                                                        {topicText.substring(range.start, range.end)}
                                                                    </span>
                                                                );

                                                                currentIndex = range.end;
                                                            });

                                                            // Remaining text
                                                            if (currentIndex < topicText.length) {
                                                                result.push(<span key="text-end">{topicText.substring(currentIndex)}</span>);
                                                            }

                                                            return <>{result}</>;
                                                        };

                                                        // Link Logic
                                                        const acrostic = ACROSTIC_DATA[week.weekNum];
                                                        let topicLink = '';
                                                        if (acrostic && topicText) {
                                                            const s = acrostic.area.toLowerCase();
                                                            const ss = acrostic.focusTerm?.toLowerCase();
                                                            const rule = acrostic.dailyHighlights?.find(h => dayName.startsWith(h.day));
                                                            const rawSlug = rule?.slug ? rule.slug : (rule?.term ? rule.term : topicText.split(' ')[0]);
                                                            const topicSlug = rawSlug.toLowerCase();
                                                            if (s) {
                                                                if (ss) {
                                                                    topicLink = `/curriculum/table/${s}/${ss}/${topicSlug}`;
                                                                } else {
                                                                    topicLink = `/curriculum/table/${s}/${topicSlug}`;
                                                                }
                                                            }
                                                        }

                                                        const showTopic = topicText && topicText !== 'Fellowship' && topicText !== 'Review' && !isSaturday;
                                                        const bibleLink = type === 'read' && content ? getBibleLink(content) : null;

                                                        let memRef = null;
                                                        let memLink = null;
                                                        if (dayData.memorize && content) {
                                                            const parts = dayData.memorize.split(' - ');
                                                            if (parts.length > 1) {
                                                                const fullRef = parts[1];
                                                                const refOnly = fullRef.replace(/ [A-Z]+$/, '');
                                                                if (refOnly.startsWith(content)) {
                                                                    const versePart = refOnly.substring(content.length).trim().replace(/^:/, '');
                                                                    if (versePart) {
                                                                        memRef = `(mem v. ${versePart})`;
                                                                        if (bibleLink) memLink = `${bibleLink}/${versePart}`;
                                                                    }
                                                                } else {
                                                                    memRef = `(mem ${refOnly})`;
                                                                }
                                                                if (dayData.memorize === 'Review') memRef = null;
                                                            }
                                                        }

                                                        return (
                                                            <div key={dayName} className={`relative pl-4 border-l-2 ${isToday ? 'border-primary' : 'border-border'}`}>
                                                                <div className={`absolute -left-[5px] top-1.5 w-2.5 h-2.5 rounded-full ${isToday ? 'bg-background border-2 border-primary/50' : 'hidden'}`} />

                                                                <div className="flex flex-col text-xs space-y-0.5">
                                                                    <div className="flex items-start gap-2">
                                                                        <span className={`font-mono font-bold w-6 shrink-0 ${isSaturday ? 'text-orange-500' : 'text-muted-foreground'} ${isToday ? 'text-primary' : ''}`}>{shortDay}</span>
                                                                        {bibleLink ? (
                                                                            <div className="flex flex-wrap items-center gap-1">
                                                                                {week.session === 'Rest' && (
                                                                                    <span className="text-[9px] font-bold px-1 py-px rounded bg-emerald-500/10 text-emerald-600 uppercase tracking-wide">Review</span>
                                                                                )}
                                                                                <Link
                                                                                    to={bibleLink}
                                                                                    onClick={() => onClose()}
                                                                                    className="text-primary hover:underline hover:text-primary/80 font-medium"
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
                                                                            <span className={`text-muted-foreground/80 ${type === 'action' ? 'italic text-orange-600/80' : ''}`} title={content}>
                                                                                {content || '-'}
                                                                            </span>
                                                                        )}
                                                                    </div>

                                                                    {showTopic && (
                                                                        <Link
                                                                            to={topicLink || '#'}
                                                                            onClick={() => { if (topicLink) onClose(); }}
                                                                            className={`pl-8 text-[10px] leading-tight block hover:text-primary transition-colors ${topicLink ? 'text-muted-foreground/70' : 'text-muted-foreground/40 cursor-default'}`}
                                                                        >
                                                                            {renderTopic()}
                                                                        </Link>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        );
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

                    {/* Next Quarter Preview - Only for Rest Session */}
                    {activeSession === 'Rest' && (
                        <div className="bg-secondary/10 border border-border/40 rounded-xl p-4 flex flex-col items-center justify-center text-center space-y-2 mt-2">
                            <div className="flex items-center gap-2 text-muted-foreground">
                                <span className="p-1.5 rounded-full bg-secondary text-muted-foreground/50">
                                    <Clock className="w-4 h-4" />
                                </span>
                                <span className="text-xs uppercase tracking-widest font-bold">Up Next</span>
                            </div>
                            <p className="text-sm font-medium text-foreground">
                                Next Quarter begins on <span className="text-primary">
                                    {(() => {
                                        const now = referenceDate || new Date();

                                        // Find Week 0 Start of *Current* Quarter
                                        const currentSunday = new Date(now);
                                        currentSunday.setHours(0, 0, 0, 0);
                                        currentSunday.setDate(currentSunday.getDate() - currentSunday.getDay());

                                        const week0Start = new Date(currentSunday);
                                        week0Start.setDate(week0Start.getDate() - (currentWeekNum * 7));

                                        // Next Quarter is typically 13 weeks after current Week 0?
                                        // Standard Schedule is Weeks 0..12 (13 weeks).
                                        // So Next Week 0 is +13 weeks.
                                        const nextQStart = new Date(week0Start);
                                        nextQStart.setDate(nextQStart.getDate() + (13 * 7));

                                        return nextQStart.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' });
                                    })()}
                                </span>
                            </p>
                            <p className="text-xs text-muted-foreground max-w-sm">
                                Preparation week starts that Sunday.
                            </p>
                        </div>
                    )}
                </div >
            </div >
        </div >
    );
}
