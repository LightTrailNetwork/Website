import { useState } from 'react';
import { Loader2 } from 'lucide-react';
import { useProfile } from '../hooks/useProfile';
import { getQuarterInfo, getDailyContent } from '../utils/scheduleUtils';
import { scoutSchedule, preScoutSchedule } from '../data/tableData';
import { getBibleLink } from '../utils/linkUtils';
import { getStudyContent } from '../utils/contentUtils';
import { Role } from '../data/types';
import QuarterProgress from '../components/dashboard/QuarterProgress';
import QuarterPreviewModal from '../components/dashboard/QuarterPreviewModal';
import WorshipCard from '../components/dashboard/WorshipCard';
import AnchorCard from '../components/dashboard/AnchorCard';
import { Link } from 'react-router-dom';
import { BookOpen, Moon, CheckCircle2, Circle } from 'lucide-react';
import { CollapsibleText } from '../components/CollapsibleText';

export default function Today() {
  const { profile, loading } = useProfile();
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [currentDate] = useState(new Date());

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Get dynamic schedule info
  const quarterInfo = getQuarterInfo(currentDate);
  const { weekNum, dayOfWeek } = quarterInfo;
  const userRole = profile?.currentRole || Role.MENTEE;
  const dailyContent = getDailyContent(userRole, quarterInfo);

  // Get detailed study content
  const studyContentRows = getStudyContent(dailyContent);

  const toggleTask = (taskId: string | string[]) => {
    setCompletedTasks(prev => {
      if (Array.isArray(taskId)) {
        // Toggle All Logic:
        // If all items in the batch are already completed, uncheck all.
        // Otherwise, check all (add missing ones).
        const allCompleted = taskId.every(id => prev.includes(id));
        if (allCompleted) {
          return prev.filter(id => !taskId.includes(id));
        } else {
          // Add only unique new IDs
          const newIds = taskId.filter(id => !prev.includes(id));
          return [...prev, ...newIds];
        }
      } else {
        // Single Toggle Logic
        return prev.includes(taskId)
          ? prev.filter(id => id !== taskId)
          : [...prev, taskId];
      }
    });
  };

  // Helper to get memory verse based on role
  const getMemoryContent = () => {
    if (userRole === Role.SCOUT) {
      const scoutItem = scoutSchedule.find(s => s.weekNum === weekNum);
      return {
        verse: scoutItem?.memorize || 'Review',
        reference: scoutItem?.topic || ''
      };
    } else if (userRole === Role.PRE_SCOUT) {
      const preScoutItem = preScoutSchedule.find(s => s.weekNum === weekNum);
      return {
        verse: preScoutItem?.memorize || 'Review',
        reference: ''
      };
    } else {
      return {
        verse: dailyContent?.memorize || 'Review',
        reference: ''
      };
    }
  };

  const memoryContent = getMemoryContent();
  const memoryLink = memoryContent.verse ? getBibleLink(memoryContent.verse) : null;

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Determine Daily Read Content (Handle "Rest" or text vs link)
  // Used in WorshipCard (Morning Read)
  const dailyRead = dailyContent?.read || "Rest / Catch Up";

  return (
    <div className="max-w-5xl mx-auto space-y-6 animate-fade-in pb-20">

      {/* Quarter Preview Modal */}
      <QuarterPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        currentWeekNum={weekNum}
      />

      {/* 1. Visual Progress Header */}
      <QuarterProgress info={quarterInfo} onClick={() => setIsPreviewOpen(true)} />

      {/* 2. Asymmetrical Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

        {/* Left Column: Morning Worship (Tall) */}
        <div className="lg:col-span-7 xl:col-span-7 flex flex-col h-full">
          <WorshipCard
            completedTasks={completedTasks}
            onToggle={toggleTask}
            readContent={dailyRead}
          />
        </div>

        {/* Right Column: Anchor + Afternoon + Night (Stack) */}
        <div className="lg:col-span-5 xl:col-span-5 space-y-6 flex flex-col">

          {/* A. Anchor Prayer */}
          <div className="flex-none">
            <AnchorCard
              completedTasks={completedTasks}
              onToggle={toggleTask}
              dayOfWeek={dayOfWeek}
            />
          </div>

          {/* B. Afternoon Memorization */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
            <div className="p-4 border-b border-border bg-gradient-to-br from-orange-500/10 to-transparent flex items-center gap-2 text-orange-600">
              <BookOpen className="w-5 h-5" />
              <h3 className="font-bold tracking-wide text-sm uppercase">Afternoon Memory</h3>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-4">
                <div className="space-y-1">
                  {memoryLink ? (
                    <Link to={memoryLink} className="text-lg font-medium text-foreground hover:text-orange-600 transition-colors block leading-relaxed">
                      {memoryContent.verse}
                    </Link>
                  ) : (
                    <p className="text-lg font-medium text-foreground leading-relaxed">{memoryContent.verse}</p>
                  )}
                  {memoryContent.reference && <p className="text-sm text-muted-foreground">{memoryContent.reference}</p>}
                </div>
                <button onClick={() => toggleTask('memorize')}>
                  {completedTasks.includes('memorize') ? <CheckCircle2 className="w-6 h-6 text-orange-500 animate-scale-in" /> : <Circle className="w-6 h-6 text-muted-foreground/30 hover:text-orange-500/50" />}
                </button>
              </div>
            </div>
          </div>

          {/* C. Night Study */}
          <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all flex-1">
            <div className="p-4 border-b border-border bg-gradient-to-br from-indigo-500/10 to-transparent flex items-center gap-2 text-indigo-600">
              <Moon className="w-5 h-5" />
              <h3 className="font-bold tracking-wide text-sm uppercase">Night Study</h3>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between gap-4 mb-4" onClick={() => toggleTask('study')}>
                <div>
                  <h4 className="font-medium text-foreground">{dailyContent?.study || "Rest"}</h4>
                  {dailyContent?.area && <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border mt-1 inline-block">{dailyContent.area}</span>}
                </div>
                <button onClick={(e) => { e.stopPropagation(); toggleTask('study'); }}>
                  {completedTasks.includes('study') ? <CheckCircle2 className="w-6 h-6 text-indigo-500 animate-scale-in" /> : <Circle className="w-6 h-6 text-muted-foreground/30 hover:text-indigo-500/50" />}
                </button>
              </div>

              {/* Collapsible Content */}
              {studyContentRows.length > 0 && (
                <div className="space-y-3 pt-4 border-t border-border/50">
                  {studyContentRows.map((row, i) => {
                    let content = userRole === Role.STEWARD ? row.steward : userRole === Role.MENTOR ? row.mentor : row.mentee;
                    return (
                      <div key={i} className="space-y-1">
                        {row.topic && <div className="text-[10px] font-bold uppercase text-indigo-500 tracking-wider">{row.topic}</div>}
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

        </div>
      </div>
    </div>
  );
}