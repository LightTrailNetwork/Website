import { useState } from 'react';
import { Role } from '../data/types';

export default function Settings() {
  const [currentRole, setCurrentRole] = useState<Role>(Role.MENTEE);
  const [displayName, setDisplayName] = useState('');

  const roles = [
    { value: Role.PRE_SCOUT, label: 'Pre-Scout' },
    { value: Role.SCOUT, label: 'Scout' },
    { value: Role.MENTEE, label: 'Mentee' },
    { value: Role.MENTOR, label: 'Mentor' },
    { value: Role.STEWARD, label: 'Steward' }
  ];

  const contacts = [
    { relation: 'My Mentor', name: 'John Smith', lastSeen: '2 hours ago' },
    { relation: 'My Steward', name: 'David Wilson', lastSeen: '1 day ago' }
  ];

  const handleExport = () => {
    // TODO: Implement export functionality
    console.log('Export backup');
  };

  const handleImport = () => {
    // TODO: Implement import functionality
    console.log('Import backup');
  };

  const handleReset = () => {
    if (confirm('Are you sure you want to reset the app? This will delete all your data.')) {
      // TODO: Implement reset functionality
      console.log('Reset app');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white min-h-screen shadow-sm">
        <div className="p-4 sm:p-6 lg:p-8 space-y-6 lg:space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
          {/* Profile Section */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Profile</h2>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                placeholder="Enter your name (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Current Role
              </label>
              <select
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value as Role)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-gray-500 mt-1">
                This determines which daily plan you see by default
              </p>
            </div>

            <button className="w-full btn btn-primary">
              Save Profile
            </button>
          </div>
          
          {/* Backup & Danger Zone in right column */}
          <div className="space-y-6">
            {/* Backup Section */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-gray-900">Backup & Restore</h2>
              
              <div className="space-y-2">
                <button
                  onClick={handleExport}
                  className="w-full btn btn-secondary"
                >
                  Export Backup
                </button>
                <button
                  onClick={handleImport}
                  className="w-full btn btn-secondary"
                >
                  Import Backup
                </button>
              </div>
              
              <p className="text-xs text-gray-500">
                Export creates a JSON file with all your data. Import restores from a backup file.
              </p>
            </div>

            {/* Danger Zone */}
            <div className="space-y-4 border-t pt-6">
              <h2 className="text-lg font-semibold text-red-600">Danger Zone</h2>
              
              <button
                onClick={handleReset}
                className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
              >
                Reset App
              </button>
              
              <p className="text-xs text-red-500">
                This will permanently delete all your data, contacts, and activity history.
              </p>
            </div>
          </div>
          </div>

          {/* Contacts Section - full width */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">My Contacts</h2>
            
            {contacts.length > 0 ? (
              <div className="space-y-2">
                {contacts.map((contact, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{contact.relation}</div>
                      <div className="text-sm text-gray-600">{contact.name}</div>
                      <div className="text-xs text-gray-500">Last seen: {contact.lastSeen}</div>
                    </div>
                    <button className="text-red-600 text-sm hover:text-red-700">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p className="text-sm">No contacts yet</p>
                <p className="text-xs">Use the Link & QR page to connect with others</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}