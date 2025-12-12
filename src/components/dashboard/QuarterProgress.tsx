import React from 'react';
import { Flag, Calendar, Info } from 'lucide-react';
import { getQuarterInfo } from '../../utils/scheduleUtils';

interface QuarterProgressProps {
    info: ReturnType<typeof getQuarterInfo>;
    date: Date;
    onClick?: () => void;
}

export default function QuarterProgress({ info, date, onClick }: QuarterProgressProps) {
    const { quarter, session, weekNum, sessionWeek, dayOfWeek } = info;

    const isPrep = session === 'Preparation'; // Week 0
    const isRest = session === 'Rest'; // Week 10-12

    // Helper to render the progress bars
    // We have 5 logical rows: 
    // 0: Prep (Week 0)
    // 1: Session 1 (Weeks 1-3)
    // 2: Session 2 (Weeks 4-6)
    // 3: Session 3 (Weeks 7-9)
    // 4: Rest (Weeks 10-12)

    const renderRow = (rowIndex: number, startWeek: number, endWeek: number, colorClass: string, label?: string) => {
        // Is this row active?
        // Week 0 is Row 0
        // Week 1-3 is Row 1
        // Week 4-6 is Row 2
        // Week 7-9 is Row 3
        // Week 10-12 is Row 4

        let isActiveRow = false;
        if (rowIndex === 0 && weekNum === 0) isActiveRow = true;
        if (rowIndex === 1 && weekNum >= 1 && weekNum <= 3) isActiveRow = true;
        if (rowIndex === 2 && weekNum >= 4 && weekNum <= 6) isActiveRow = true;
        if (rowIndex === 3 && weekNum >= 7 && weekNum <= 9) isActiveRow = true;
        if (rowIndex === 4 && weekNum >= 10 && weekNum <= 12) isActiveRow = true;

        // If row is NOT active, display it very subtly? "only highlight the one that is currently active"
        // User probably wants to see the structure but dimmed.

        const opacity = isActiveRow ? 'opacity-100' : 'opacity-20';

        // Generate segments
        const segments = [];
        for (let w = startWeek; w <= endWeek; w++) {
            // Determine state of this specific segment
            // Past: weekNum > w
            // Current: weekNum === w
            // Future: weekNum < w

            let bgClass = "bg-muted"; // Future
            if (weekNum > w) bgClass = colorClass; // Past (Full Color)
            else if (weekNum === w) bgClass = `${colorClass} ring-1 ring-offset-1 ring-offset-card ring-${colorClass.split('-')[1]}-500`; // Current

            // For inactive rows, maybe just show muted structure?
            // Or show completed state if passed?
            if (!isActiveRow) {
                if (weekNum > w) bgClass = colorClass; // Still show progress in past rows? 
                // User said "only highlight the one that is currently active".
                // This implies past rows might not be the focus.
                // But visual progress usually shows history.
                // I'll keep history colored but the ROW opacity low? That works.
            }

            segments.push(
                <div
                    key={w}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${isActiveRow && weekNum === w ? 'flex-[1.5]' : 'flex-1'} ${bgClass}`}
                />
            );
        }

        return (
            <div className={`flex gap-1 w-[120px] md:w-[140px] shrink-0 ${opacity} transition-opacity duration-300`}>
                {segments}
            </div>
        );
    };

    return (
        <div
            onClick={onClick}
            className={`bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden group transition-all ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary/50 hover:bg-muted/5' : ''}`}
        >
            {/* Click Indicator */}
            {onClick && (
                <div className="md:absolute md:top-3 md:right-3 mb-4 md:mb-0 w-fit ml-auto md:ml-0 opacity-80 md:opacity-60 hover:opacity-100 transition-opacity text-xs font-medium text-muted-foreground flex items-center gap-1 bg-background/50 backdrop-blur-sm px-2 py-0.5 rounded-full border border-transparent hover:border-border/50">
                    <Info className="w-3 h-3" />
                    View Plan
                </div>
            )}

            {/* Background Decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none group-hover:bg-primary/10 transition-colors" />

            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex-1 text-left w-full">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary uppercase tracking-wider">
                            Quarter {quarter} • Week {weekNum}
                        </span>
                        {isPrep && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 uppercase tracking-wider">Prep Week</span>}
                        {isRest && <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-600 uppercase tracking-wider">Rest Week</span>}
                    </div>
                    <h2 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                        {isPrep ? 'Preparation Week' : isRest ? 'Rest & Reflection' : session}
                        {!isPrep && !isRest && <span className="text-muted-foreground font-normal text-lg">• Week {sessionWeek}</span>}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {dayOfWeek}, {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Vertical Stack Progress Indicator */}
                <div className="flex flex-col gap-1.5 items-end shrink-0 w-full md:w-auto mt-4 md:mt-0">
                    {/* Row 1: Prep (Week 0) */}
                    {renderRow(0, 0, 0, 'bg-amber-500')}

                    {/* Row 2: Session 1 (Weeks 1-3) */}
                    {renderRow(1, 1, 3, 'bg-blue-500')}

                    {/* Row 3: Session 2 (Weeks 4-6) */}
                    {renderRow(2, 4, 6, 'bg-indigo-500')}

                    {/* Row 4: Session 3 (Weeks 7-9) */}
                    {renderRow(3, 7, 9, 'bg-violet-500')}

                    {/* Row 5: Rest (Weeks 10-12) */}
                    {renderRow(4, 10, 12, 'bg-emerald-500')}
                </div>
            </div>
        </div>
    );
}
