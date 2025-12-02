import { useState } from 'react';
import { Sun, BookOpen, Moon, ChevronRight, CheckCircle2, Circle, Calendar as CalendarIcon, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useProfile } from '../hooks/useProfile';
import { getQuarterInfo, getDailyContent } from '../utils/scheduleUtils';
import { scoutSchedule, preScoutSchedule } from '../data/tableData';
import { getBibleLink } from '../utils/linkUtils';
import { getStudyContent } from '../utils/contentUtils';
import { CollapsibleText } from '../components/CollapsibleText';
import { Role } from '../data/types';

export default function Today() {
  const { profile, loading } = useProfile();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [currentDate] = useState(new Date());

  // Get dynamic schedule info
  const quarterInfo = getQuarterInfo(currentDate);
  const { quarter, session, weekNum, sessionWeek, dayOfWeek } = quarterInfo;
  const dailyContent = getDailyContent(profile?.currentRole || Role.MENTEE, quarterInfo);

  // Get detailed study content
  const studyContentRows = getStudyContent(dailyContent);
  const userRole = profile?.currentRole || Role.MENTEE;

  const toggleTask = (taskId: string) => {
    setCompletedTasks(prev =>
      prev.includes(taskId)
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    );
  };

  const toggleAllMorning = () => {
    const morningTasks = ['worship', 'read', 'intercede'];
    const allCompleted = morningTasks.every(t => completedTasks.includes(t));

    if (allCompleted) {
      setCompletedTasks(prev => prev.filter(t => !morningTasks.includes(t)));
    } else {
      setCompletedTasks(prev => [...new Set([...prev, ...morningTasks])]);
    }
  };

  // Helper to get memory verse based on role
  const getMemoryContent = () => {
    if (profile?.currentRole === Role.SCOUT) {
      const scoutItem = scoutSchedule.find(s => s.weekNum === weekNum);
      return {
        verse: scoutItem?.memorize || 'Review',
        reference: scoutItem?.topic || ''
      };
    } else if (profile?.currentRole === Role.PRE_SCOUT) {
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
  const readLink = dailyContent?.read ? getBibleLink(dailyContent.read) : null;
  const memoryLink = memoryContent.verse ? getBibleLink(memoryContent.verse) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const isMorningComplete = ['worship', 'read', 'intercede'].every(t => completedTasks.includes(t));

  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-fade-in pb-20">
      {/* Date Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground tracking-tight">
            {dayOfWeek}
          </h1>
          <p className="text-muted-foreground mt-1">
            {currentDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })} • {session} • Week {sessionWeek} • Q{quarter}
          </p>
        </div>
        <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center">
          <CalendarIcon className="w-6 h-6 text-primary" />
        </div>
      </div>

      {/* Morning W.O.R.S.H.I.P. */}
      <section className="space-y-4">
        <div className="flex items-center justify-between text-primary">
          <div className="flex items-center space-x-2">
            <Sun className="w-5 h-5" />
            <h2 className="font-semibold tracking-wide text-sm uppercase">Morning W.O.R.S.H.I.P.</h2>
          </div>
          <button
            onClick={toggleAllMorning}
            className="text-primary hover:text-primary/80 transition-colors"
          >
            {isMorningComplete ? (
              <CheckCircle2 className="w-6 h-6 animate-scale-in" />
            ) : (
              <Circle className="w-6 h-6 text-muted-foreground/30" />
            )}
          </button>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
          <div className="p-6 space-y-6">
            <div className="flex items-start justify-between group">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Worship & Prayer</h3>
                <p className="text-sm text-muted-foreground">Offer yourself to God</p>
              </div>
              <button onClick={() => toggleTask('worship')} className="focus:outline-none">
                {completedTasks.includes('worship') ? (
                  <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                )}
              </button>
            </div>

            <div className="h-px bg-border/50" />

            <div className="flex items-start justify-between group">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Read</h3>
                {readLink ? (
                  <Link to={readLink} className="text-lg font-medium text-primary hover:underline">
                    {dailyContent?.read}
                  </Link>
                ) : (
                  <p className="text-lg font-medium text-primary">
                    {dailyContent?.read || "Rest / Catch Up"}
                  </p>
                )}
              </div>
              <button onClick={() => toggleTask('read')} className="focus:outline-none">
                {completedTasks.includes('read') ? (
                  <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                )}
              </button>
            </div>

            <div className="h-px bg-border/50" />

            <div className="flex items-start justify-between group">
              <div className="space-y-1">
                <h3 className="font-medium text-foreground">Intercede & Practice</h3>
                <p className="text-sm text-muted-foreground">Pray for others and do good</p>
              </div>
              <button onClick={() => toggleTask('intercede')} className="focus:outline-none">
                {completedTasks.includes('intercede') ? (
                  <CheckCircle2 className="w-6 h-6 text-primary animate-scale-in" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-primary/50 transition-colors" />
                )}
              </button>
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

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md">
          <div className="p-6 flex items-start justify-between">
            <div className="space-y-2 flex-1 pr-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-medium px-2 py-1 rounded-full bg-orange-500/10 text-orange-600">
                  {profile?.currentRole || Role.MENTEE} Track
                </span>
              </div>
              {memoryLink ? (
                <Link to={memoryLink} className="block text-lg font-medium text-foreground leading-relaxed hover:text-orange-600 transition-colors">
                  {memoryContent.verse}
                </Link>
              ) : (
                <p className="text-lg font-medium text-foreground leading-relaxed">
                  {memoryContent.verse}
                </p>
              )}
              {memoryContent.reference && (
                <p className="text-sm font-medium text-muted-foreground">
                  {memoryContent.reference}
                </p>
              )}
            </div>
            <button onClick={() => toggleTask('memorize')} className="focus:outline-none group">
              {completedTasks.includes('memorize') ? (
                <CheckCircle2 className="w-6 h-6 text-orange-500 animate-scale-in" />
              ) : (
                <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-orange-500/50 transition-colors" />
              )}
            </button>
          </div>
        </div>
      </section>

      {/* Night Study */}
      <section className="space-y-4">
        <div className="flex items-center space-x-2 text-indigo-500">
          <Moon className="w-5 h-5" />
          <h2 className="font-semibold tracking-wide text-sm uppercase">Night Study</h2>
        </div>

        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm transition-all hover:shadow-md group">
          <div className="p-6">
            <div className="flex items-center justify-between mb-4 cursor-pointer" onClick={() => toggleTask('study')}>
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
              <div className="flex items-center gap-4">
                {completedTasks.includes('study') ? (
                  <CheckCircle2 className="w-6 h-6 text-indigo-500 animate-scale-in" />
                ) : (
                  <Circle className="w-6 h-6 text-muted-foreground/30 group-hover:text-indigo-500/50 transition-colors" />
                )}
              </div>
            </div>

            {/* Detailed Content from Table */}
            {studyContentRows.length > 0 && (
              <div className="mt-4 pt-4 border-t border-border/50 space-y-4">
                {studyContentRows.map((row, index) => {
                  // Determine content based on role
                  let content = '';
                  if (userRole === Role.STEWARD) content = row.steward;
                  else if (userRole === Role.MENTOR) content = row.mentor;
                  else content = row.mentee; // Default to Mentee

                  return (
                    <div key={index} className="space-y-2">
                      {row.topic && (
                        <h4 className="text-sm font-semibold text-indigo-500 uppercase tracking-wider">
                          {row.topic}
                        </h4>
                      )}
                      <div className="text-sm text-muted-foreground">
                        <CollapsibleText text={content} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}