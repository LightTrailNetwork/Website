import { useState, useEffect } from 'react';
import { Sun, Sunset, Moon, Share2, Loader2, Circle, CheckCircle2 } from 'lucide-react';
import { Role } from '../data/types';
import { useProfile } from '../hooks/useProfile';
import { getRoleContent, getRoleInfo } from '../utils/roleContent';
import { getTodayData, setTodayData } from '../data/db';

export default function Today() {
  const { profile, loading } = useProfile();
  const [viewedRole, setViewedRole] = useState<Role>(Role.MENTEE);
  const [completed, setCompleted] = useState({
    morning: false,
    afternoon: false,
    night: false
  });

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  // Set initial viewed role to user's current role
  useEffect(() => {
    if (profile && !loading) {
      setViewedRole(profile.currentRole);
    }
  }, [profile, loading]);

  // Load completion status
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await getTodayData();
        setCompleted(data);
      } catch (error) {
        console.error('Failed to load today data:', error);
      }
    };
    loadData();
  }, []);

  const handleToggle = async (slot: 'morning' | 'afternoon' | 'night') => {
    // Only allow toggling if viewing own role
    if (profile?.currentRole !== viewedRole) return;

    const newState = {
      ...completed,
      [slot]: !completed[slot]
    };

    setCompleted(newState);
    try {
      await setTodayData(newState);
    } catch (error) {
      console.error('Failed to save today data:', error);
      // Revert on error
      setCompleted(completed);
    }
  };

  const roleTabs = [
    { role: Role.MENTEE, label: 'Mentee' },
    { role: Role.MENTOR, label: 'Mentor' },
    { role: Role.STEWARD, label: 'Steward' },
    { role: Role.SCOUT, label: 'Scout' },
    { role: Role.PRE_SCOUT, label: 'Pre-Scout' }
  ];

  // Get content for the currently viewed role
  const roleContent = getRoleContent(viewedRole);
  const isMe = profile?.currentRole === viewedRole;

  if (loading) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <h1 className="text-xl font-semibold text-foreground">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Date display */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Today's Plan</h2>
          <p className="text-muted-foreground">{today}</p>
        </div>
        <button className="btn btn-primary flex items-center gap-2">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Role Tabs */}
      <div className="bg-card border border-border rounded-xl p-1 overflow-x-auto">
        <div className="flex space-x-1 min-w-max">
          {roleTabs.map(({ role, label }) => {
            const isActive = viewedRole === role;
            const isUserRole = role === profile?.currentRole;
            return (
              <button
                key={role}
                onClick={() => setViewedRole(role)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 ${isActive
                  ? 'bg-primary text-primary-foreground shadow-sm'
                  : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                  }`}
              >
                {label}
                {isUserRole && (
                  <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${isActive ? 'bg-primary-foreground/20' : 'bg-primary/10 text-primary'
                    }`}>
                    Me
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* MAN Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Morning */}
        <div
          onClick={() => handleToggle('morning')}
          className={`group relative overflow-hidden bg-card border rounded-xl p-6 transition-all duration-300 ${isMe ? 'cursor-pointer hover:shadow-lg hover:border-primary/20' : ''
            } ${completed.morning && isMe
              ? 'bg-green-50/50 dark:bg-green-900/10 border-green-500/30'
              : 'border-border'
            }`}
        >
          {completed.morning && isMe && (
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-green-500 text-white rounded-full p-1 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${completed.morning && isMe
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-orange-100 text-orange-600 group-hover:bg-orange-600 group-hover:text-white'
                }`}>
                <Sun className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-semibold transition-colors ${completed.morning && isMe ? 'text-green-700 dark:text-green-400' : 'text-foreground'
                }`}>Morning</h3>
            </div>
            {!completed.morning && isMe && (
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                <Circle className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className={`space-y-3 transition-opacity duration-300 ${completed.morning && isMe ? 'opacity-75' : ''}`}>
            {roleContent.morning.activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${completed.morning && isMe ? 'bg-green-400' : 'bg-orange-400'
                  }`} />
                <span className={completed.morning && isMe ? 'line-through decoration-green-500/30' : ''}>
                  {activity}
                </span>
              </div>
            ))}
            {roleContent.morning.focus && (
              <div className={`mt-4 p-3 rounded-lg text-xs italic border ${completed.morning && isMe
                  ? 'bg-green-100/50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
                  : 'bg-muted/50 text-muted-foreground border-border'
                }`}>
                Focus: {roleContent.morning.focus}
              </div>
            )}
          </div>
        </div>

        {/* Afternoon */}
        <div
          onClick={() => handleToggle('afternoon')}
          className={`group relative overflow-hidden bg-card border rounded-xl p-6 transition-all duration-300 ${isMe ? 'cursor-pointer hover:shadow-lg hover:border-primary/20' : ''
            } ${completed.afternoon && isMe
              ? 'bg-green-50/50 dark:bg-green-900/10 border-green-500/30'
              : 'border-border'
            }`}
        >
          {completed.afternoon && isMe && (
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-green-500 text-white rounded-full p-1 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${completed.afternoon && isMe
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-blue-100 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'
                }`}>
                <Sunset className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-semibold transition-colors ${completed.afternoon && isMe ? 'text-green-700 dark:text-green-400' : 'text-foreground'
                }`}>Afternoon</h3>
            </div>
            {!completed.afternoon && isMe && (
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                <Circle className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className={`space-y-3 transition-opacity duration-300 ${completed.afternoon && isMe ? 'opacity-75' : ''}`}>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${completed.afternoon && isMe ? 'bg-green-400' : 'bg-blue-400'
                }`} />
              <span className={completed.afternoon && isMe ? 'line-through decoration-green-500/30' : ''}>
                <span className="font-medium text-foreground">{roleContent.afternoon.title}:</span>{' '}
                {roleContent.afternoon.content}
              </span>
            </div>
            {roleContent.afternoon.reference && (
              <div className={`mt-4 p-3 rounded-lg text-xs font-medium border ${completed.afternoon && isMe
                  ? 'bg-green-100/50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
                  : 'bg-muted/50 text-primary border-border'
                }`}>
                {roleContent.afternoon.reference}
              </div>
            )}
          </div>
        </div>

        {/* Night */}
        <div
          onClick={() => handleToggle('night')}
          className={`group relative overflow-hidden bg-card border rounded-xl p-6 transition-all duration-300 ${isMe ? 'cursor-pointer hover:shadow-lg hover:border-primary/20' : ''
            } ${completed.night && isMe
              ? 'bg-green-50/50 dark:bg-green-900/10 border-green-500/30'
              : 'border-border'
            }`}
        >
          {completed.night && isMe && (
            <div className="absolute top-0 right-0 p-4">
              <div className="bg-green-500 text-white rounded-full p-1 shadow-sm animate-fade-in">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
          )}

          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg transition-colors ${completed.night && isMe
                  ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                  : 'bg-indigo-100 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'
                }`}>
                <Moon className="w-5 h-5" />
              </div>
              <h3 className={`text-lg font-semibold transition-colors ${completed.night && isMe ? 'text-green-700 dark:text-green-400' : 'text-foreground'
                }`}>Night</h3>
            </div>
            {!completed.night && isMe && (
              <div className="text-muted-foreground group-hover:text-primary transition-colors">
                <Circle className="w-5 h-5" />
              </div>
            )}
          </div>
          <div className={`space-y-3 transition-opacity duration-300 ${completed.night && isMe ? 'opacity-75' : ''}`}>
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className={`mt-1.5 w-1.5 h-1.5 rounded-full flex-shrink-0 ${completed.night && isMe ? 'bg-green-400' : 'bg-indigo-400'
                }`} />
              <span className={completed.night && isMe ? 'line-through decoration-green-500/30' : ''}>
                <span className="font-medium text-foreground">{roleContent.night.title}:</span>{' '}
                {roleContent.night.activity}
              </span>
            </div>
            {roleContent.night.details && (
              <div className={`mt-4 p-3 rounded-lg text-xs border ${completed.night && isMe
                  ? 'bg-green-100/50 text-green-700 border-green-200 dark:bg-green-900/20 dark:text-green-400 dark:border-green-900/30'
                  : 'bg-muted/50 text-muted-foreground border-border'
                }`}>
                {roleContent.night.details}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}