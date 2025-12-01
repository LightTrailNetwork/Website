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
    // Calculate day of year (0-365)
    const startOfYear = new Date(date.getFullYear(), 0, 0);
    const diff = date.getTime() - startOfYear.getTime();
    const oneDay = 1000 * 60 * 60 * 24;
    const dayOfYear = Math.floor(diff / oneDay);

    // Calculate quarter (1-4)
    // Assuming standard quarters: Q1 (Jan-Mar), Q2 (Apr-Jun), Q3 (Jul-Sep), Q4 (Oct-Dec)
    // Each quarter is roughly 91 days. 13 weeks * 7 days = 91 days.
    // 4 * 91 = 364 days. Day 365 (and 366) are extra, usually added to Q4 rest.

    const daysPerQuarter = 91;
    let quarter = Math.floor(dayOfYear / daysPerQuarter) + 1;
    if (quarter > 4) quarter = 4; // Handle day 365/366

    // Calculate week within quarter (0-12)
    const dayOfQuarter = dayOfYear % daysPerQuarter;
    let weekNum = Math.floor(dayOfQuarter / 7);
    if (weekNum > 12) weekNum = 12; // Handle extra days in quarter

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
