import { useState, useEffect } from 'react';
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
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">✝️</div>
          <h1 className="text-xl font-semibold text-gray-800">Loading...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-sm">
        {/* Date display - responsive */}
        <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-sm sm:text-base text-gray-600">{today}</p>
        </div>

        {/* Role Tabs */}
        <div className="flex overflow-x-auto bg-white border-b px-4 sm:px-6 lg:px-8">
          {roleTabs.map(({ role, label }) => (
            <button
              key={role}
              onClick={() => setViewedRole(role)}
              className={`px-3 sm:px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                viewedRole === role
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              {role === profile?.currentRole && (
                <span className="ml-1 text-xs bg-primary-100 text-primary-600 px-1 rounded">
                  Me
                </span>
              )}
            </button>
          ))}
        </div>

        {/* MAN Schedule - responsive grid on desktop */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-6">
            {/* Morning */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-yellow-800">Morning</h3>
                <input
                  type="checkbox"
                  className="h-5 w-5 text-yellow-600 rounded border-yellow-300"
                />
              </div>
              <div className="space-y-2 text-sm text-yellow-700">
                {roleContent.morning.activities.map((activity, index) => (
                  <div key={index}>• {activity}</div>
                ))}
                {roleContent.morning.focus && (
                  <div className="text-xs text-yellow-600 italic mt-2">
                    Focus: {roleContent.morning.focus}
                  </div>
                )}
              </div>
            </div>

            {/* Afternoon */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-blue-800">Afternoon</h3>
                <input
                  type="checkbox"
                  className="h-5 w-5 text-blue-600 rounded border-blue-300"
                />
              </div>
              <div className="space-y-2 text-sm text-blue-700">
                <div>• {roleContent.afternoon.title}: {roleContent.afternoon.content}</div>
                {roleContent.afternoon.reference && (
                  <div className="text-xs text-blue-600">
                    {roleContent.afternoon.reference}
                  </div>
                )}
              </div>
            </div>

            {/* Night */}
            <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 lg:p-6">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold text-purple-800">Night</h3>
                <input
                  type="checkbox"
                  className="h-5 w-5 text-purple-600 rounded border-purple-300"
                />
              </div>
              <div className="space-y-2 text-sm text-purple-700">
                <div>• {roleContent.night.title}: {roleContent.night.activity}</div>
                {roleContent.night.details && (
                  <div className="text-xs text-purple-600">
                    {roleContent.night.details}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Share Activity Button */}
          <div className="mt-6 sm:mt-8">
            <button className="w-full btn btn-primary lg:max-w-md lg:mx-auto lg:block">
              Share Activity
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}