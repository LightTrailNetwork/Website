import { useState, useEffect } from 'react';
import { Sun, Sunset, Moon, Share2, Loader2, CheckCircle2, Circle } from 'lucide-react';
import { Role } from '../data/types';
import { useProfile } from '../hooks/useProfile';
import { getRoleContent, getRoleInfo } from '../utils/roleContent';

export default function Today() {
  const { profile, loading } = useProfile();
  const [viewedRole, setViewedRole] = useState<Role>(Role.MENTEE);

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

  const roleTabs = [
    { role: Role.MENTEE, label: 'Mentee' },
    { role: Role.MENTOR, label: 'Mentor' },
    { role: Role.STEWARD, label: 'Steward' },
    { role: Role.SCOUT, label: 'Scout' },
    { role: Role.PRE_SCOUT, label: 'Pre-Scout' }
  ];

  // Get content for the currently viewed role
  const roleContent = getRoleContent(viewedRole);
  const roleInfo = getRoleInfo(viewedRole);

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
            const isMe = role === profile?.currentRole;
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
                {isMe && (
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
        <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg group-hover:bg-orange-600 group-hover:text-white transition-colors">
                <Sun className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Morning</h3>
            </div>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Circle className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            {roleContent.morning.activities.map((activity, index) => (
              <div key={index} className="flex items-start gap-2 text-sm text-muted-foreground">
                <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-orange-400 flex-shrink-0" />
                <span>{activity}</span>
              </div>
            ))}
            {roleContent.morning.focus && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground italic border border-border">
                Focus: {roleContent.morning.focus}
              </div>
            )}
          </div>
        </div>

        {/* Afternoon */}
        <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                <Sunset className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Afternoon</h3>
            </div>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Circle className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-blue-400 flex-shrink-0" />
              <span>
                <span className="font-medium text-foreground">{roleContent.afternoon.title}:</span>{' '}
                {roleContent.afternoon.content}
              </span>
            </div>
            {roleContent.afternoon.reference && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-primary font-medium border border-border">
                {roleContent.afternoon.reference}
              </div>
            )}
          </div>
        </div>

        {/* Night */}
        <div className="group bg-card border border-border rounded-xl p-6 hover:shadow-lg transition-all duration-300 hover:border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                <Moon className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">Night</h3>
            </div>
            <button className="text-muted-foreground hover:text-primary transition-colors">
              <Circle className="w-5 h-5" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-start gap-2 text-sm text-muted-foreground">
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-400 flex-shrink-0" />
              <span>
                <span className="font-medium text-foreground">{roleContent.night.title}:</span>{' '}
                {roleContent.night.activity}
              </span>
            </div>
            {roleContent.night.details && (
              <div className="mt-4 p-3 bg-muted/50 rounded-lg text-xs text-muted-foreground border border-border">
                {roleContent.night.details}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}