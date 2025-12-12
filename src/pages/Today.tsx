import { useState, useEffect } from 'react';
import { Loader2, ChevronDown, Sun, BookOpen, Moon, CheckCircle2, Circle, ChevronLeft, ChevronRight, Calendar as CalendarIcon, RotateCcw } from 'lucide-react';
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
import { CollapsibleText } from '../components/CollapsibleText';

type TimeSection = 'morning' | 'afternoon' | 'night';

export default function Today() {
  const { profile, loading } = useProfile();
  // Task Persistence State
  const [completedTasks, setCompletedTasks] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('dashboard_daily_tasks');
      if (saved) {
        const { date, tasks } = JSON.parse(saved);
        // Only restore if it's from today
        if (date === new Date().toDateString()) {
          return tasks;
        }
      }
    } catch (e) {
      console.warn('Failed to load tasks', e);
    }
    return [];
  });

  // Persist tasks on change
  useEffect(() => {
    try {
      localStorage.setItem('dashboard_daily_tasks', JSON.stringify({
        date: new Date().toDateString(),
        tasks: completedTasks
      }));
    } catch (e) {
      console.warn('Failed to save tasks', e);
    }
  }, [completedTasks]);
  const [displayDate, setDisplayDate] = useState(new Date());

  const handleDateChange = (delta: number) => {
    const newDate = new Date(displayDate);
    newDate.setDate(newDate.getDate() + delta);
    setDisplayDate(newDate);
  };

  const goToToday = () => {
    setDisplayDate(new Date());
  };

  // Check if viewing today
  const isToday = displayDate.toDateString() === new Date().toDateString();

  // Accordion State
  const [openSection, setOpenSection] = useState<TimeSection | null>('morning');

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Set initial open section based on time of day
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setOpenSection('morning');
    else if (hour < 18) setOpenSection('afternoon');
    else setOpenSection('night');
  }, []);

  // Get dynamic schedule info
  const quarterInfo = getQuarterInfo(displayDate);
  const { weekNum, dayOfWeek } = quarterInfo;
  const userRole = profile?.currentRole || Role.MENTEE;
  const dailyContent = getDailyContent(userRole, quarterInfo);

  // Get detailed study content
  const studyContentRows = getStudyContent(dailyContent);

  const toggleTask = (taskId: string | string[]) => {
    setCompletedTasks(prev => {
      if (Array.isArray(taskId)) {
        const allCompleted = taskId.every(id => prev.includes(id));
        if (allCompleted) {
          return prev.filter(id => !taskId.includes(id));
        } else {
          const newIds = taskId.filter(id => !prev.includes(id));
          return [...prev, ...newIds];
        }
      } else {
        return prev.includes(taskId)
          ? prev.filter(id => id !== taskId)
          : [...prev, taskId];
      }
    });
  };

  const getMemoryContent = () => {
    if (userRole === Role.SCOUT) {
      const scoutItem = scoutSchedule.find(s => s.weekNum === weekNum);
      return { verse: scoutItem?.memorize || 'Review', reference: scoutItem?.topic || '' };
    } else if (userRole === Role.PRE_SCOUT) {
      const preScoutItem = preScoutSchedule.find(s => s.weekNum === weekNum);
      return { verse: preScoutItem?.memorize || 'Review', reference: '' };
    } else {
      return { verse: dailyContent?.memorize || 'Review', reference: '' };
    }
  };

  const memoryContent = getMemoryContent();
  const memoryLink = memoryContent.verse ? getBibleLink(memoryContent.verse) : null;
  const dailyRead = dailyContent?.read || "Rest / Catch Up";

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  const toggleSection = (section: TimeSection) => {
    setOpenSection(prev => (prev === section ? null : section));
  };

  const SectionHeader = ({
    section,
    title,
    icon: Icon,
    colorClass,
    subtitle
  }: {
    section: TimeSection;
    title: string;
    icon: any;
    colorClass: string;
    subtitle?: string;
  }) => (
    <button
      onClick={() => toggleSection(section)}
      className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all duration-300 ${openSection === section
        ? `bg-gradient-to-r ${colorClass} border-border shadow-sm mb-4`
        : 'bg-card hover:bg-secondary/50 border-border hover:border-primary/20 mb-3'
        }`}
    >
      <div className="flex items-center gap-3">
        <div className={`p-2 rounded-full ${openSection === section ? 'bg-background/20 text-foreground' : 'bg-secondary text-muted-foreground'}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="text-left">
          <h3 className={`font-bold text-sm uppercase tracking-wide transition-colors duration-300 ${openSection === section ? 'text-foreground' : 'text-muted-foreground'}`}>{title}</h3>
          {subtitle && (
            <div className={`grid transition-all duration-300 ease-in-out ${openSection === section ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100'}`}>
              <p className="text-xs text-muted-foreground/70 truncate max-w-[200px] md:max-w-md overflow-hidden">{subtitle}</p>
            </div>
          )}
        </div>
      </div>
      <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform duration-300 ${openSection === section ? 'rotate-180' : ''}`} />
    </button>
  );

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fade-in pb-20">

      {/* Quarter Preview Modal */}
      <QuarterPreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        currentWeekNum={weekNum}
        initialSession={quarterInfo.session}
        referenceDate={displayDate}
      />

      {/* Date Navigation */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between bg-card border border-border rounded-xl p-2 shadow-sm">
          <button onClick={() => handleDateChange(-1)} className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div
            className="relative flex items-center justify-center gap-2 font-semibold text-foreground px-4 py-2 hover:bg-secondary/50 rounded-lg cursor-pointer group transition-colors min-w-[200px]"
            onClick={(e) => {
              const input = e.currentTarget.querySelector('input');
              if (input && 'showPicker' in input) {
                try {
                  (input as any).showPicker();
                } catch (err) {
                  // Fallback or ignore
                }
              }
            }}
          >
            <CalendarIcon className="w-4 h-4 text-primary group-hover:text-primary/80" />
            <span>{displayDate.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })}</span>
            <input
              type="date"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
              value={displayDate.toISOString().split('T')[0]}
              onChange={(e) => {
                if (e.target.value) {
                  const parts = e.target.value.split('-').map(Number);
                  if (parts.length === 3) {
                    setDisplayDate(new Date(parts[0]!, parts[1]! - 1, parts[2]!));
                  }
                }
              }}
            />
          </div>

          <button onClick={() => handleDateChange(1)} className="p-2 hover:bg-secondary rounded-lg transition-colors text-muted-foreground hover:text-foreground">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {!isToday && (
          <div className="bg-amber-500/10 text-amber-600 dark:text-amber-400 p-2 rounded-lg text-sm font-medium text-center flex items-center justify-center gap-2 animate-in slide-in-from-top-2">
            <div
              className="relative group cursor-pointer"
              onClick={(e) => {
                const input = e.currentTarget.querySelector('input');
                if (input && 'showPicker' in input) {
                  try {
                    (input as any).showPicker();
                  } catch (err) {
                    // Fallback
                  }
                }
              }}
            >
              <span className="group-hover:underline decoration-amber-600/50 underline-offset-4">Previewing: {displayDate.toLocaleDateString(undefined, { weekday: 'short', month: 'short', day: 'numeric' })}</span>
              <input
                type="date"
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                value={displayDate.toISOString().split('T')[0]}
                onChange={(e) => {
                  if (e.target.value) {
                    const parts = e.target.value.split('-').map(Number);
                    if (parts.length === 3) {
                      setDisplayDate(new Date(parts[0]!, parts[1]! - 1, parts[2]!));
                    }
                  }
                }}
              />
            </div>
            <button onClick={goToToday} className="underline hover:text-foreground flex items-center gap-1 z-20">
              <RotateCcw className="w-3 h-3" /> Return to Today
            </button>
          </div>
        )}
      </div>

      {/* 1. Visual Progress Header */}
      <QuarterProgress
        info={quarterInfo}
        date={displayDate}
        onClick={() => setIsPreviewOpen(true)}
        onWeekSelect={(targetWeek) => {
          const currentWeek = quarterInfo.weekNum;
          const deltaWeeks = targetWeek - currentWeek;

          // Move to target week
          const targetDate = new Date(displayDate);
          targetDate.setDate(targetDate.getDate() + (deltaWeeks * 7));

          // Snap to Monday of that week
          const day = targetDate.getDay();
          const diffToMon = targetDate.getDate() - day + (day === 0 ? -6 : 1);
          targetDate.setDate(diffToMon);

          setDisplayDate(targetDate);
        }}
      />

      {/* 2. Accordion Stack */}
      <div className="space-y-1">

        {/* MORNING SECTION */}
        <SectionHeader
          section="morning"
          title="Morning"
          icon={Sun}
          colorClass="from-blue-500/10 to-cyan-500/10"
          subtitle="Worship & Anchor Prayer"
        />
        {openSection === 'morning' && (
          <div className="pl-2 border-l-2 border-border/50 ml-6 space-y-6 animate-accordion-down mb-8">
            <WorshipCard
              completedTasks={completedTasks}
              onToggle={toggleTask}
              readContent={dailyRead}
            />
            <div className="pt-2">
              <AnchorCard
                completedTasks={completedTasks}
                onToggle={toggleTask}
                dayOfWeek={dayOfWeek}
              />
            </div>
          </div>
        )}

        {/* AFTERNOON SECTION */}
        <SectionHeader
          section="afternoon"
          title="Afternoon"
          icon={BookOpen}
          colorClass="from-orange-500/10 to-amber-500/10"
          subtitle="Memorization"
        />
        {openSection === 'afternoon' && (
          <div className="pl-2 border-l-2 border-border/50 ml-6 animate-accordion-down mb-8">
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
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
          </div>
        )}

        {/* NIGHT SECTION */}
        <SectionHeader
          section="night"
          title="Night"
          icon={Moon}
          colorClass="from-indigo-500/10 to-purple-500/10"
          subtitle="Review & Fellowship"
        />
        {openSection === 'night' && (
          <div className="pl-2 border-l-2 border-border/50 ml-6 animate-accordion-down mb-8">
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm flex-1">
              <div className="p-6">
                {/*  Use a simple Link instead of full collapsible text */}
                <div className="flex items-center justify-between gap-4">
                  <div className="space-y-1">
                    <Link
                      to="/curriculum"
                      className="font-medium text-lg text-foreground hover:text-primary transition-colors block"
                    >
                      {dailyContent?.study || "Rest"}
                    </Link>
                    {dailyContent?.area && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-secondary text-muted-foreground border border-border inline-block">
                        {dailyContent.area}
                      </span>
                    )}
                    {!dailyContent?.study && <span className="text-muted-foreground">Rest night.</span>}
                  </div>

                  <button onClick={(e) => { e.stopPropagation(); toggleTask('study'); }}>
                    {completedTasks.includes('study') ? <CheckCircle2 className="w-6 h-6 text-indigo-500 animate-scale-in" /> : <Circle className="w-6 h-6 text-muted-foreground/30 hover:text-indigo-500/50" />}
                  </button>
                </div>

                <div className="mt-4 pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground italic">
                    Tip: Click the title above to view the full curriculum details for this week.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}