import { useState } from 'react';
import { Calendar, CheckCircle2, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import { quarterlySchedule, scoutSchedule, preScoutSchedule } from '../data/tableData';
import { getWeekMnemonicInfo } from '../data/curriculumMnemonics';
import { useProfile } from '../hooks/useProfile';
import { Role } from '../data/types';
import { getBibleLink } from '../utils/linkUtils';

export default function Schedule() {
    const { profile } = useProfile();
    const [selectedRole, setSelectedRole] = useState<Role>(profile?.currentRole || Role.MENTEE);
    const [expandedWeek, setExpandedWeek] = useState<number | null>(null);

    const roleTabs = [
        { role: Role.MENTEE, label: 'Mentee' },
        { role: Role.MENTOR, label: 'Mentor' },
        { role: Role.STEWARD, label: 'Steward' },
        { role: Role.SCOUT, label: 'Scout' },
        { role: Role.PRE_SCOUT, label: 'Pre-Scout' }
    ];

    const isScoutOrPreScout = selectedRole === Role.SCOUT || selectedRole === Role.PRE_SCOUT;

    const toggleWeek = (weekNum: number) => {
        if (expandedWeek === weekNum) {
            setExpandedWeek(null);
        } else {
            setExpandedWeek(weekNum);
        }
    };

    return (
        <div className="max-w-6xl mx-auto space-y-8 animate-fade-in pb-20">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Quarterly Schedule</h1>
                    <p className="text-muted-foreground mt-1">
                        Overview of the 13-week curriculum plan
                    </p>
                </div>

                {/* Role Tabs */}
                <div className="bg-muted/50 p-1 rounded-lg flex overflow-x-auto max-w-full">
                    {roleTabs.map((tab) => (
                        <button
                            key={tab.role}
                            onClick={() => setSelectedRole(tab.role)}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-all whitespace-nowrap ${selectedRole === tab.role
                                ? 'bg-background text-foreground shadow-sm'
                                : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                                }`}
                        >
                            {tab.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Desktop Table View */}
            <div className="hidden md:block border border-border rounded-xl overflow-hidden bg-card shadow-sm overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-muted/50 text-muted-foreground font-medium border-b border-border">
                        <tr>
                            <th className="p-4 whitespace-nowrap">Session</th>
                            <th className="p-4 whitespace-nowrap">Week</th>
                            <th className="p-4 whitespace-nowrap">Day</th>
                            <th className="p-4 min-w-[200px]">Morning (Read)</th>
                            <th className="p-4 min-w-[200px]">Afternoon (Memorize)</th>
                            <th className="p-4 min-w-[200px]">Night (Study)</th>
                            <th className="p-4 whitespace-nowrap">Area</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {quarterlySchedule.map((week, weekIdx) => {
                            let days = Object.entries(week.days);
                            const isPrepOrRest = week.session === 'Preparation' || week.session === 'Rest';

                            // Handle Rest weeks which might have empty days
                            if (days.length === 0 && week.session === 'Rest') {
                                days = [['Monday', { read: 'Rest', memorize: 'Rest', study: 'Rest' }]];
                            }

                            // For Scout/Pre-Scout, verify if there is specific content for this week
                            let scoutMemoryItem = null;
                            if (selectedRole === Role.SCOUT) {
                                scoutMemoryItem = scoutSchedule.find(s => s.weekNum === week.weekNum);
                            } else if (selectedRole === Role.PRE_SCOUT) {
                                scoutMemoryItem = preScoutSchedule.find(s => s.weekNum === week.weekNum);
                            }

                            return days.map(([dayName, content], dayIdx) => {
                                const isFirstDay = dayIdx === 0;
                                const rowSpan = isFirstDay ? days.length : undefined;

                                // Override content for Scouts/Pre-Scouts
                                let displayRead = content.read;
                                let displayMemorize = content.memorize;
                                let displayStudy = content.study;
                                let displayArea = content.area;

                                if (isScoutOrPreScout) {
                                    // Scouts only have specific memory verses and serve days/special events
                                    if (content.action) {
                                        // Keep actions like "Serve Day", "Steak Dinner"
                                        displayRead = content.action;
                                        displayMemorize = "";
                                        displayStudy = "";
                                    } else {
                                        displayRead = "";
                                        displayStudy = "";
                                        // Show memory verse only on Monday (or first day) to avoid repetition, or show "Review"
                                        if (dayName === 'Monday' && scoutMemoryItem) {
                                            displayMemorize = `${scoutMemoryItem.memorize} ${scoutMemoryItem.topic ? `(${scoutMemoryItem.topic})` : ''}`;
                                        } else {
                                            displayMemorize = "";
                                        }
                                    }
                                    displayArea = "";
                                } else if (week.session === 'Rest') {
                                    // For non-scouts during rest weeks
                                    displayRead = "Rest";
                                    displayMemorize = "Rest";
                                    displayStudy = "Rest";
                                    displayArea = "";
                                }

                                const readLink = displayRead ? getBibleLink(displayRead) : null;
                                const memoryLink = displayMemorize ? getBibleLink(displayMemorize) : null;

                                return (
                                    <tr key={`${weekIdx}-${dayIdx}`} className="hover:bg-muted/30 transition-colors">
                                        {isFirstDay && (
                                            <>
                                                <td rowSpan={rowSpan} className="p-4 font-medium align-top border-r border-border/50 bg-muted/5">
                                                    {week.session}
                                                    {!isPrepOrRest && <div className="text-xs text-muted-foreground font-normal mt-1">3 Weeks</div>}
                                                </td>
                                                <td rowSpan={rowSpan} className="p-4 font-medium align-top border-r border-border/50 bg-muted/5">
                                                    {week.weekNum}
                                                </td>
                                            </>
                                        )}
                                        <td className="p-4 font-medium text-muted-foreground">{dayName}</td>
                                        <td className="p-4">
                                            {displayRead && (
                                                <div className="flex items-start gap-2">
                                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${week.session === 'Rest' ? 'bg-muted-foreground/30' : 'bg-primary/70'}`} />
                                                    {readLink ? (
                                                        <Link to={readLink} className="hover:underline text-primary">{displayRead}</Link>
                                                    ) : (
                                                        <span className={week.session === 'Rest' ? 'text-muted-foreground' : ''}>{displayRead}</span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {displayMemorize && (
                                                <div className="flex items-start gap-2">
                                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${week.session === 'Rest' && !isScoutOrPreScout ? 'bg-muted-foreground/30' : 'bg-orange-500/70'}`} />
                                                    {memoryLink ? (
                                                        <Link to={memoryLink} className="hover:underline text-foreground/90 hover:text-orange-600">{displayMemorize}</Link>
                                                    ) : (
                                                        <span className={`text-foreground/90 ${week.session === 'Rest' && !isScoutOrPreScout ? 'text-muted-foreground' : ''}`}>{displayMemorize}</span>
                                                    )}
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4">
                                            {displayStudy && (
                                                <div className="flex items-start gap-2">
                                                    <span className={`mt-1 w-1.5 h-1.5 rounded-full shrink-0 ${week.session === 'Rest' ? 'bg-muted-foreground/30' : 'bg-indigo-500/70'}`} />
                                                    <span className={week.session === 'Rest' ? 'text-muted-foreground' : ''}>{displayStudy}</span>
                                                </div>
                                            )}
                                        </td>
                                        <td className="p-4 text-muted-foreground text-xs">
                                            {(() => {
                                                const mnemonic = getWeekMnemonicInfo(week.weekNum);
                                                if (mnemonic && !isScoutOrPreScout && week.session !== 'Rest') {
                                                    return (
                                                        <div className="flex flex-col gap-1 items-start">
                                                            {mnemonic.tags.map((tag, idx) => (
                                                                <span key={idx} title={tag.tooltip} className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-bold bg-primary/10 text-primary uppercase tracking-wide whitespace-nowrap">
                                                                    {tag.label}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    );
                                                }
                                                return displayArea && (
                                                    <span className="px-2 py-1 rounded-full bg-muted border border-border whitespace-nowrap">
                                                        {displayArea}
                                                    </span>
                                                );
                                            })()}
                                        </td>
                                    </tr>
                                );
                            });
                        })}
                    </tbody>
                </table>
            </div>

            {/* Mobile Accordion View */}
            <div className="md:hidden space-y-4">
                {quarterlySchedule.map((week, weekIdx) => {
                    let days = Object.entries(week.days);
                    const isPrepOrRest = week.session === 'Preparation' || week.session === 'Rest';
                    const isExpanded = expandedWeek === week.weekNum;

                    // Handle Rest weeks which might have empty days
                    if (days.length === 0 && week.session === 'Rest') {
                        days = [['Monday', { read: 'Rest', memorize: 'Rest', study: 'Rest' }]];
                    }

                    // For Scout/Pre-Scout, verify if there is specific content for this week
                    let scoutMemoryItem = null;
                    if (selectedRole === Role.SCOUT) {
                        scoutMemoryItem = scoutSchedule.find(s => s.weekNum === week.weekNum);
                    } else if (selectedRole === Role.PRE_SCOUT) {
                        scoutMemoryItem = preScoutSchedule.find(s => s.weekNum === week.weekNum);
                    }

                    return (
                        <div key={week.weekNum} className="border border-border rounded-xl bg-card overflow-hidden">
                            <button
                                onClick={() => toggleWeek(week.weekNum)}
                                className="w-full flex items-center justify-between p-4 bg-muted/30 hover:bg-muted/50 transition-colors"
                            >
                                <div className="flex flex-col items-start">
                                    <span className="text-sm font-medium text-muted-foreground">{week.session}</span>
                                    <span className="font-semibold">Week {week.weekNum}</span>
                                </div>
                                {isExpanded ? <ChevronUp className="w-5 h-5 text-muted-foreground" /> : <ChevronDown className="w-5 h-5 text-muted-foreground" />}
                            </button>

                            {isExpanded && (
                                <div className="divide-y divide-border">
                                    {days.map(([dayName, content], dayIdx) => {
                                        // Override content for Scouts/Pre-Scouts
                                        let displayRead = content.read;
                                        let displayMemorize = content.memorize;
                                        let displayStudy = content.study;
                                        let displayArea = content.area;

                                        if (isScoutOrPreScout) {
                                            if (content.action) {
                                                displayRead = content.action;
                                                displayMemorize = "";
                                                displayStudy = "";
                                            } else {
                                                displayRead = "";
                                                displayStudy = "";
                                                if (dayName === 'Monday' && scoutMemoryItem) {
                                                    displayMemorize = `${scoutMemoryItem.memorize} ${scoutMemoryItem.topic ? `(${scoutMemoryItem.topic})` : ''}`;
                                                } else {
                                                    displayMemorize = "";
                                                }
                                            }
                                            displayArea = "";
                                        } else if (week.session === 'Rest') {
                                            displayRead = "Rest";
                                            displayMemorize = "Rest";
                                            displayStudy = "Rest";
                                            displayArea = "";
                                        }

                                        const readLink = displayRead ? getBibleLink(displayRead) : null;
                                        const memoryLink = displayMemorize ? getBibleLink(displayMemorize) : null;

                                        if (!displayRead && !displayMemorize && !displayStudy) return null;

                                        return (
                                            <div key={dayIdx} className="p-4 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-sm text-muted-foreground">{dayName}</span>
                                                    {(() => {
                                                        const mnemonic = getWeekMnemonicInfo(week.weekNum);
                                                        if (mnemonic && !isScoutOrPreScout && week.session !== 'Rest' && dayIdx === 0) {
                                                            return (
                                                                <div className="flex flex-wrap gap-1 justify-end max-w-[60%]">
                                                                    {mnemonic.tags.slice(0, 2).map((tag, idx) => (
                                                                        <span key={idx} className="text-[10px] px-1.5 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 whitespace-nowrap">
                                                                            {tag.label}
                                                                        </span>
                                                                    ))}
                                                                </div>
                                                            )
                                                        }
                                                        return displayArea && (
                                                            <span className="text-xs px-2 py-0.5 rounded-full bg-muted border border-border text-muted-foreground whitespace-nowrap">
                                                                {displayArea}
                                                            </span>
                                                        );
                                                    })()}
                                                </div>

                                                {displayRead && (
                                                    <div className="flex items-start gap-2">
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${week.session === 'Rest' ? 'bg-muted-foreground/30' : 'bg-primary/70'}`} />
                                                        <div className="text-sm">
                                                            <span className="text-xs font-medium text-muted-foreground block mb-0.5">READ</span>
                                                            {readLink ? (
                                                                <Link to={readLink} className="hover:underline text-primary">{displayRead}</Link>
                                                            ) : (
                                                                <span className={week.session === 'Rest' ? 'text-muted-foreground' : ''}>{displayRead}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {displayMemorize && (
                                                    <div className="flex items-start gap-2">
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${week.session === 'Rest' && !isScoutOrPreScout ? 'bg-muted-foreground/30' : 'bg-orange-500/70'}`} />
                                                        <div className="text-sm">
                                                            <span className="text-xs font-medium text-muted-foreground block mb-0.5">MEMORIZE</span>
                                                            {memoryLink ? (
                                                                <Link to={memoryLink} className="hover:underline text-foreground/90 hover:text-orange-600">{displayMemorize}</Link>
                                                            ) : (
                                                                <span className={`text-foreground/90 ${week.session === 'Rest' && !isScoutOrPreScout ? 'text-muted-foreground' : ''}`}>{displayMemorize}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                )}

                                                {displayStudy && (
                                                    <div className="flex items-start gap-2">
                                                        <span className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 ${week.session === 'Rest' ? 'bg-muted-foreground/30' : 'bg-indigo-500/70'}`} />
                                                        <div className="text-sm">
                                                            <span className="text-xs font-medium text-muted-foreground block mb-0.5">STUDY</span>
                                                            <span className={week.session === 'Rest' ? 'text-muted-foreground' : ''}>{displayStudy}</span>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
