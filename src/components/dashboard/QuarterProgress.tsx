import React from 'react';
import { Flag, Calendar, Info } from 'lucide-react';
import { getQuarterInfo } from '../../utils/scheduleUtils';

interface QuarterProgressProps {
    info: ReturnType<typeof getQuarterInfo>;
    date: Date;
    onClick?: () => void;
    onWeekSelect?: (weekNum: number) => void;
}

export default function QuarterProgress({ info, date, onClick, onWeekSelect }: QuarterProgressProps) {
    const { quarter, session, weekNum, sessionWeek, dayOfWeek } = info;

    const isPrep = session === 'Preparation'; // Week 0
    const isRest = session === 'Rest'; // Week 10-12

    // We have 5 logical rows: 
    // 0: Prep (Week 0)
    // 1: Session 1 (Weeks 1-3)
    // 2: Session 2 (Weeks 4-6)
    // 3: Session 3 (Weeks 7-9)
    // 4: Rest (Weeks 10-12)

    let activeRowIndex = 0;
    if (weekNum >= 1 && weekNum <= 3) activeRowIndex = 1;
    if (weekNum >= 4 && weekNum <= 6) activeRowIndex = 2;
    if (weekNum >= 7 && weekNum <= 9) activeRowIndex = 3;
    if (weekNum >= 10 && weekNum <= 12) activeRowIndex = 4;

    const renderRow = (rowIndex: number, startWeek: number, endWeek: number, colorClass: string, className: string = "w-[120px] md:w-[140px]") => {
        let isActiveRow = rowIndex === activeRowIndex;

        // Inactive rows are dimmed but light up on hover so you know they are interactive
        const opacity = isActiveRow ? 'opacity-100' : 'opacity-30 hover:opacity-100';

        // Generate segments
        const segments = [];
        for (let w = startWeek; w <= endWeek; w++) {
            let bgClass = "bg-muted";
            if (weekNum > w) bgClass = colorClass;
            else if (weekNum === w) bgClass = `${colorClass} ring-1 ring-offset-1 ring-offset-card ring-${colorClass.split('-')[1]}-500`;

            if (!isActiveRow) {
                if (weekNum > w) bgClass = colorClass;
            }

            segments.push(
                <div
                    key={w}
                    onClick={(e) => {
                        e.stopPropagation();
                        onWeekSelect?.(w);
                    }}
                    title={`Jump to Week ${w}`}
                    className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${isActiveRow && weekNum === w ? 'flex-[1.5]' : 'flex-1'} ${bgClass} cursor-pointer hover:scale-125 hover:z-10 hover:ring-2 hover:ring-offset-1 hover:ring-primary/50 relative`}
                />
            );
        }

        return (
            <div className={`flex gap-1 shrink-0 ${opacity} transition-opacity duration-300 ${className}`}>
                {segments}
            </div>
        );
    };

    const rowConfigs = [
        { idx: 0, start: 0, end: 0, color: 'bg-amber-500' },
        { idx: 1, start: 1, end: 3, color: 'bg-blue-500' },
        { idx: 2, start: 4, end: 6, color: 'bg-indigo-500' },
        { idx: 3, start: 7, end: 9, color: 'bg-violet-500' },
        { idx: 4, start: 10, end: 12, color: 'bg-emerald-500' },
    ];

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
                        {!isPrep && <span className="text-muted-foreground font-normal text-lg">• Week {sessionWeek}</span>}
                    </h2>
                    <p className="text-muted-foreground mt-1 text-sm flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {dayOfWeek}, {date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}
                    </p>
                </div>

                {/* Mobile: Single Active Row Full Width */}
                <div className="flex md:hidden w-full mt-2">
                    {(() => {
                        const cfg = rowConfigs[activeRowIndex] || rowConfigs[0];
                        return renderRow(cfg.idx, cfg.start, cfg.end, cfg.color, "w-full h-3");
                    })()}
                </div>

                {/* Desktop: Vertical Stack 5 Rows */}
                <div className="hidden md:flex flex-col gap-1.5 items-end shrink-0 w-auto">
                    {rowConfigs.map(cfg => (
                        <React.Fragment key={cfg.idx}>
                            {renderRow(cfg.idx, cfg.start, cfg.end, cfg.color)}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        </div>
    );
}
