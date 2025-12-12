import { quarterlySchedule, type WeekSchedule, type DailyContent } from '../data/tableData';

export interface QuarterInfo {
    quarter: number; // 1-4
    weekNum: number; // 0-12
    dayOfWeek: string; // "Monday", "Tuesday", etc.
    session: string; // "Preparation", "Session 1", "Session 2", "Session 3", "Rest"
    sessionWeek: number; // 1-3 (or 1 for Prep/Rest)
    schedule: WeekSchedule | undefined;
}

export function getQuarterInfo(date: Date = new Date()): QuarterInfo {
    // Helper to get the Sunday start of the week for any given date
    const getSunday = (d: Date) => {
        const copy = new Date(d);
        copy.setHours(0, 0, 0, 0);
        copy.setDate(copy.getDate() - copy.getDay());
        return copy;
    };

    const targetSunday = getSunday(date);
    const targetWeekEnd = new Date(targetSunday);
    targetWeekEnd.setDate(targetSunday.getDate() + 6);

    // Determines if a date range contains the 1st of a specific month (0-indexed)
    const containsMonthStart = (start: Date, end: Date, monthIndex: number) => {
        // Iterate days from start to end (max 7 days)
        const current = new Date(start);
        while (current <= end) {
            if (current.getDate() === 1 && current.getMonth() === monthIndex) {
                return true;
            }
            current.setDate(current.getDate() + 1);
        }
        return false;
    };

    // Determine the relevant Quarter Start
    // Months: Jan(0), Apr(3), Jul(6), Oct(9)
    // We check: Does the current week contain next quarter's start? If so, we are in that quarter (Week 0).
    // Or are we past a quarter start?

    // Check "future" or "current" year boundaries slightly carefully
    // We'll check the 4 quarter starts relative to the input year, plus next/prev year to be safe.

    let matchedQuarterIdx = -1; // 0-3
    let matchedYear = date.getFullYear();

    // Check if this week explicitly starts a quarter
    // Check Next Year Jan 1
    if (containsMonthStart(targetSunday, targetWeekEnd, 0)) {
        // Is it Jan 1 of next year?
        if (targetWeekEnd.getFullYear() > date.getFullYear() || (date.getMonth() === 11 && targetWeekEnd.getMonth() === 0)) {
            matchedQuarterIdx = 0;
            matchedYear = targetWeekEnd.getFullYear();
        } else {
            // Jan 1 of current year
            matchedQuarterIdx = 0;
            matchedYear = date.getFullYear();
        }
    } else if (containsMonthStart(targetSunday, targetWeekEnd, 3)) { matchedQuarterIdx = 1; matchedYear = targetWeekEnd.getFullYear(); }
    else if (containsMonthStart(targetSunday, targetWeekEnd, 6)) { matchedQuarterIdx = 2; matchedYear = targetWeekEnd.getFullYear(); }
    else if (containsMonthStart(targetSunday, targetWeekEnd, 9)) { matchedQuarterIdx = 3; matchedYear = targetWeekEnd.getFullYear(); }

    // If not a start week, find the preceding start week
    if (matchedQuarterIdx === -1) {
        // Iterate backwards from current date to find recent Q start?
        // Simpler: Just compare dates.
        // Q1 Start: Jan 1
        // Q2 Start: Apr 1
        // Q3 Start: Jul 1
        // Q4 Start: Oct 1

        // Construct potential start dates for this year
        const y = date.getFullYear();
        const starts = [
            { q: 0, d: new Date(y, 0, 1) },
            { q: 1, d: new Date(y, 3, 1) },
            { q: 2, d: new Date(y, 6, 1) },
            { q: 3, d: new Date(y, 9, 1) },
            // Previous year Q4 (for early Jan)
            { q: 3, d: new Date(y - 1, 9, 1), year: y - 1 }
        ];

        // Find the LATEST start date that is BEFORE the current week's Sunday
        // Actually, we need to compare to the Quarter Start WEEK's Sunday.

        // Let's refine:
        // Identify the Quarter Anchor Week based on simple date check first, then precise week math.

        // Simple approximation:
        // If Jan 1 <= date < Apr 1 => Q1 candidate (unless date falls in Apr 1's week)
        // But we already checked "containsMonthStart". So we are validly "inside" a quarter.

        // Sort starts desc
        // Find first one where getSunday(start) <= targetSunday
        // But wait, if targetSunday < getSunday(Jan 1), we are in Prev Year Q4?

        // Let's stick to the definition:
        // Week 0 of Q(i) contains Day 1 of Month(i).
        // Find the specific Week 0 Sunday.
        // Diff = (CurrentSunday - Week0Sunday) / 7.

        // Which Quarter?
        // Check relative to current date.

        let bestStartSunday: Date | null = null;

        // Check current year quarters, plus prev year Q4
        const candidates = [
            { q: 0, y: y }, { q: 1, y: y }, { q: 2, y: y }, { q: 3, y: y },
            { q: 3, y: y - 1 }
        ];

        for (const c of candidates) {
            const m = c.q * 3;
            const qDate = new Date(c.y, m, 1);
            const qSunday = getSunday(qDate);

            if (qSunday <= targetSunday) {
                // Potential match, we want the LATEST one
                if (!bestStartSunday || qSunday > bestStartSunday) {
                    bestStartSunday = qSunday;
                    matchedQuarterIdx = c.q;
                    matchedYear = c.y; // Unused but good for tracking
                }
            }
        }
    } else {
        // We found a start week directly
        // We need the start Sunday for diff calculation (which is just targetSunday)
        // Logic handles this naturally if we just run the diff calc below? 
        // But we need to ensure we don't pick a "previous" quarter if we are ON the start week.
        // Effectively, if matchedQuarterIdx is set, we are at Week 0.
        // So bestStartSunday = targetSunday.
        // We can skip the loop above.
    }

    // Calculate Week Num
    let weekNum = 0;
    if (matchedQuarterIdx !== -1) {
        // Recalculate start sunday based on matchedQuarter
        // (If we found it directly, use target. If inferred, recalculate).
        const m = matchedQuarterIdx * 3;
        const qDate = new Date(matchedYear, m, 1);
        const qSunday = getSunday(qDate);

        const diffMS = targetSunday.getTime() - qSunday.getTime();
        // Handle DST shifts by rounding to nearest day first
        const diffDays = Math.round(diffMS / (1000 * 60 * 60 * 24));
        weekNum = Math.floor(diffDays / 7);
    }

    // Clamp or Handle Overflow (e.g. 53 week years might produce Week 13 for Q4)
    // Assuming standard 13 week schedule (0-12).
    if (weekNum > 12) weekNum = 12;

    const quarter = matchedQuarterIdx + 1; // 1-4

    // Determine day of week
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const dayOfWeek = days[date.getDay()] || 'Monday';

    // Get schedule for this week
    const schedule = quarterlySchedule.find(s => s.weekNum === weekNum);
    const session = schedule?.session || 'Rest';

    // Calculate session week (1-3)
    let sessionWeek = 1;
    if (session === 'Session 1') sessionWeek = weekNum; // Weeks 1-3 -> 1-3
    else if (session === 'Session 2') sessionWeek = weekNum - 3; // Weeks 4-6 -> 1-3
    else if (session === 'Session 3') sessionWeek = weekNum - 6; // Weeks 7-9 -> 1-3
    else if (session === 'Rest') sessionWeek = weekNum - 9; // Weeks 10-12 -> 1-3

    return {
        quarter,
        weekNum,
        dayOfWeek,
        session,
        sessionWeek,
        schedule
    };
}

export function getDailyContent(role: string, quarterInfo: QuarterInfo): DailyContent | null {
    const { schedule, dayOfWeek } = quarterInfo;

    if (!schedule) return null;

    // Default content from the main schedule
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const content = (schedule.days as any)[dayOfWeek];

    // Override or augment based on role if needed
    // (Currently the main schedule applies to everyone, with role-specific nuances handled in the UI)

    return content || null;
}
