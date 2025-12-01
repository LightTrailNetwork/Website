import { useState } from 'react';
import { Sun, BookOpen, Moon, ChevronRight, CheckCircle2, Circle, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { getQuarterInfo, getDailyContent } from '../utils/scheduleUtils';
import { scoutSchedule, preScoutSchedule } from '../data/tableData';

export default function Today() {
  const { profile, loading } = useProfile();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [currentDate] = useState(new Date());

  // Get dynamic schedule info
  const quarterInfo = getQuarterInfo(currentDate);
  const { quarter, session, weekNum, sessionWeek, dayOfWeek } = quarterInfo;
  const dailyContent = getDailyContent(profile?.currentRole || 'Mentee', quarterInfo);

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  // Helper to get memory verse based on role
  const getMemoryContent = () => {
    if (profile?.currentRole === 'Scout') {
      const scoutItem = scoutSchedule.find(s => s.weekNum === weekNum);
      return {
        verse: scoutItem?.memorize || 'Review',
        reference: scoutItem?.topic || ''
      };
    } else if (profile?.currentRole === 'Pre-Scout') {
      const preScoutItem = preScoutSchedule.find(s => s.weekNum === weekNum);
      return {
        verse: preScoutItem?.memorize || 'Review',
        reference: ''
      };
    } else {
      // Mentee, Mentor, Steward use the main schedule
      return {
        verse: dailyContent?.memorize || 'Review',
        reference: ''
      };
    }
  };

  const memoryContent = getMemoryContent();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Date Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {dayOfWeek}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • Q{quarter} {session} Week {sessionWeek}
          </p>
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
          <CalendarIcon className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Morning W.O.R.S.H.I.P. */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-primary">
          <Sun className="w-5 h-5" />
          <h2 className="font-semibold tracking-wide text-sm uppercase">Morning W.O.R.S.H.I.P.</h2>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between group cursor-pointer" onClick={() => toggleTask('worship')}>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Worship & Prayer</h3>
                <p className="text-sm text-muted-foreground">Offer yourself to God</p>
              </div>
              {completedTasks.includes('worship') ? (
                <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
              )}
            </div>

            <div className="h-px bg-border/50" />

            <div className="flex items-start justify-between group cursor-pointer" onClick={() => toggleTask('read')}>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Read</h3>
                <p className="text-lg font-medium text-primary">
                  {dailyContent?.read || "Rest / Catch Up"}
                </p>
              </div>
              {completedTasks.includes('read') ? (
                <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
              )}
            </div>

            <div className="h-px bg-border/50" />

            <div className="flex items-start justify-between group cursor-pointer" onClick={() => toggleTask('intercede')}>
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Intercede & Practice</h3>
                <p className="text-sm text-muted-foreground">Pray for others and do good</p>
              </div>
              {completedTasks.includes('intercede') ? (
                <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Afternoon Memorization */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-orange-500">
          <BookOpen className="w-5 h-5" />
          <h2 className="font-semibold tracking-wide text-sm uppercase">Afternoon Memorization</h2>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md group cursor-pointer" onClick={() => toggleTask('memorize')}>
          <div className="p-6 flex items-start justify-between">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-500/10 text-orange-600">
                  {profile?.currentRole || 'Mentee'} Track
                </span>
              </div>
              <p className="text-lg font-medium text-foreground leading-relaxed">
                {memoryContent.verse}
              </p>
              {memoryContent.reference && (
                <p className="text-sm font-medium text-muted-foreground">
                  {memoryContent.reference}
                </p>
              )}
            </div>
            {completedTasks.includes('memorize') ? (
              <CheckCircle2 className="w-6 h-6 text-orange-500 animate-scale-in" />
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-orange-500/50 transition-colors" />
            )}
          </div>
        </div>
      </section>

      {/* Night Study */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-indigo-500">
          <Moon className="w-5 h-5" />
          <h2 className="font-semibold tracking-wide text-sm uppercase">Night Study</h2>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md group cursor-pointer" onClick={() => toggleTask('study')}>
          <div className="p-6 flex items-center justify-between">
            <div className="space-y-1">
              <h3 className="font-medium text-foreground">
                {dailyContent?.study || "Rest"}
              </h3>
              {dailyContent?.area && (
                <p className="text-sm text-muted-foreground">
                  {dailyContent.area}
                </p>
              )}
            </div>
            <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-indigo-500 transition-colors" />
          </div>
        </div>
      </section>
    </div>
  );
}