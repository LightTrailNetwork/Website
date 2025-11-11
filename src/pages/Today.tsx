import { useState, useEffect } from 'react';
import { Role } from '../data/types';

export default function Today() {
  const [currentRole, setCurrentRole] = useState<Role>(Role.MENTEE);
  const [viewedRole, setViewedRole] = useState<Role>(Role.MENTEE);

  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const roleTabs = [
    { role: Role.MENTEE, label: 'Mentee' },
    { role: Role.MENTOR, label: 'Mentor' },
    { role: Role.STEWARD, label: 'Steward' },
    { role: Role.SCOUT, label: 'Scout' },
    { role: Role.PRE_SCOUT, label: 'Pre-Scout' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto bg-white min-h-screen">
        {/* Header */}
        <div className="bg-primary-600 text-white p-4">
          <h1 className="text-xl font-semibold">Today's Plan</h1>
          <p className="text-primary-100 text-sm">{today}</p>
        </div>

        {/* Role Tabs */}
        <div className="flex overflow-x-auto bg-white border-b">
          {roleTabs.map(({ role, label }) => (
            <button
              key={role}
              onClick={() => setViewedRole(role)}
              className={`px-4 py-3 text-sm font-medium whitespace-nowrap border-b-2 transition-colors ${
                viewedRole === role
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700'
              }`}
            >
              {label}
              {role === currentRole && (
                <span className="ml-1 text-xs bg-primary-100 text-primary-600 px-1 rounded">
                  Me
                </span>
              )}
            </button>
          ))}
        </div>

        {/* MAN Schedule */}
        <div className="p-4 space-y-4">
          {/* Morning */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-yellow-800">Morning</h3>
              <input
                type="checkbox"
                className="h-5 w-5 text-yellow-600 rounded border-yellow-300"
              />
            </div>
            <div className="space-y-2 text-sm text-yellow-700">
              <div>• Worship Song</div>
              <div>• Offer Yourself to God</div>
              <div>• Read (Bible Chapter)</div>
              <div>• Silence (2 minutes)</div>
              <div>• Hear and Journal</div>
              <div>• Intercession (A.N.C.H.O.R.)</div>
              <div>• Practical (Monday - for your wife)</div>
            </div>
          </div>

          {/* Afternoon */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-blue-800">Afternoon</h3>
              <input
                type="checkbox"
                className="h-5 w-5 text-blue-600 rounded border-blue-300"
              />
            </div>
            <div className="space-y-2 text-sm text-blue-700">
              <div>• Memorization: John 3:16</div>
              <div className="text-xs text-blue-600">
                "For God so loved the world that he gave his one and only Son..."
              </div>
            </div>
          </div>

          {/* Night */}
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-purple-800">Night</h3>
              <input
                type="checkbox"
                className="h-5 w-5 text-purple-600 rounded border-purple-300"
              />
            </div>
            <div className="space-y-2 text-sm text-purple-700">
              <div>• Study: Book of Romans Chapter 1</div>
              <div className="text-xs text-purple-600">
                Focus on Paul's introduction and the gospel's power
              </div>
            </div>
          </div>
        </div>

        {/* Share Activity Button */}
        <div className="p-4">
          <button className="w-full btn btn-primary">
            Share Activity
          </button>
        </div>
      </div>
    </div>
  );
}