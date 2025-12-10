import React from 'react';
import { Flag, Calendar, Info } from 'lucide-react';
import { getQuarterInfo } from '../../utils/scheduleUtils';

interface QuarterProgressProps {
    info: ReturnType<typeof getQuarterInfo>;
    onClick?: () => void;
}

export default function QuarterProgress({ info, onClick }: QuarterProgressProps) {
    const { quarter, session, weekNum, sessionWeek, dayOfWeek } = info;

    // Calculate progress percentage
    // Session = 1, 2, 3 (each 3 weeks?) + Prep (Week 0) + Rest
    // This is visual only, simplified logic:
    // Prep = 0%
    // Session 1 = 10-30%
    // Rest 1 = 35%
    // Session 2 = 40-60%
    // ...
    // Let's just visualize the current Session status.

    const isPrep = session === 'Preparation';
    const isRest = session === 'Rest';

    return (
        <div
            onClick={onClick}
            className={`bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden group transition-all ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary/50 hover:bg-muted/5' : ''}`}
        >
            {/* Click Indicator */}
            {onClick && (
                <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-medium text-muted-foreground flex items-center gap-1">
                    <Info className="w-3 h-3" />
                    View Plan
                </div>
            )}

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/10 transition-colors" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
                <div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                            Quarter {quarter}
                        </span>
                        {isPrep && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-yellow-500/10 text-yellow-600 uppercase tracking-wider">Prep Week</span>}
                        {isRest && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-500/10 text-green-600 uppercase tracking-wider">Rest Week</span>}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                        {isPrep ? 'Preparation Week' : isRest ? 'Rest & Reflection' : session}
                        {!isPrep && !isRest && <span className="text-muted-foreground font-normal text-lg">• Week {sessionWeek}</span>}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {dayOfWeek}, {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Progress Visualizer */}
                <div className="w-full md:w-auto flex items-center gap-1">
                    {/* 13 Weeks Visualization? Or just Current Session Visualization */}
                    {/* Start Simple: Session Progress */}
                    {!isPrep && !isRest && (
                        <div className="flex gap-2">
                            {[1, 2, 3].map(w => (
                                <div
                                    key={w}
                                    className={`h-2 w-12 rounded-full transition-all ${w <= sessionWeek ? 'bg-primary' : 'bg-secondary'}`}
                                    title={`Week ${w} of ${session}`}
                                />
                            ))}
                        </div>
                    )}
                    {isPrep && (
                        <div className="h-2 w-36 rounded-full bg-yellow-500/50 animate-pulse" />
                    )}
                    {isRest && (
                        <div className="h-2 w-36 rounded-full bg-green-500/50" />
                    )}
                </div>
            </div>
        </div>
    );
}
