import { useState, useEffect } from 'react';
import { Role } from '../data/types';
import { useProfile } from '../hooks/useProfile';
import { getContacts, exportAll, importAll, resetApp } from '../data/db';

export default function Settings() {
  const { profile, loading, updateRole, updateDisplayName } = useProfile();
  const [displayName, setDisplayName] = useState('');
  const [contacts, setContacts] = useState<any[]>([]);

  const roles = [
    { value: Role.PRE_SCOUT, label: 'Pre-Scout' },
    { value: Role.SCOUT, label: 'Scout' },
    { value: Role.MENTEE, label: 'Mentee' },
    { value: Role.MENTOR, label: 'Mentor' },
    { value: Role.STEWARD, label: 'Steward' }
  ];

  // Load profile data and contacts when component mounts
  useEffect(() => {
    if (profile) {
      setDisplayName(profile.displayName || '');
    }
    
    loadContacts();
  }, [profile]);

  const loadContacts = async () => {
    try {
      const contactList = await getContacts();
      setContacts(contactList);
    } catch (error) {
      console.error('Failed to load contacts:', error);
    }
  };

  const handleSaveProfile = async () => {
    if (!profile) return;
    
    try {
      if (displayName !== profile.displayName) {
        await updateDisplayName(displayName || null);
      }
      
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleRoleChange = async (newRole: Role) => {
    try {
      await updateRole(newRole);
      alert(`Role updated to ${roles.find(r => r.value === newRole)?.label}`);
    } catch (error) {
      console.error('Failed to update role:', error);
      alert('Failed to update role. Please try again.');
    }
  };

  const handleExport = async () => {
    try {
      const data = await exportAll();
      const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mentorship-backup-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Failed to export data. Please try again.');
    }
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      try {
        const text = await file.text();
        const data = JSON.parse(text);
        await importAll(data);
        alert('Data imported successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Import failed:', error);
        alert('Failed to import data. Please check the file format.');
      }
    };
    input.click();
  };

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset the app? This will delete all your data.')) {
      try {
        await resetApp();
        alert('App reset successfully!');
        window.location.reload();
      } catch (error) {
        console.error('Reset failed:', error);
        alert('Failed to reset app. Please try again.');
      }
    }
  };

  if (loading) {
    return (
      <div className="bg-gray-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4">⚙️</div>
          <h1 className="text-xl font-semibold text-gray-800">Loading Settings...</h1>
        </div>
      </div>
    );
  }

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
                value={profile?.currentRole || Role.MENTEE}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
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

            <button 
              onClick={handleSaveProfile}
              className="w-full btn btn-primary"
            >
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
                {contacts.map((contact) => (
                  <div key={contact.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <div>
                      <div className="font-medium text-gray-900">{contact.relation || 'Contact'}</div>
                      <div className="text-sm text-gray-600">{contact.name || contact.displayName}</div>
                      <div className="text-xs text-gray-500">Added: {new Date(contact.addedAt).toLocaleDateString()}</div>
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