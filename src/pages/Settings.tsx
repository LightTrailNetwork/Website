import { useState, useEffect } from 'react';
import { User, Save, Download, Upload, Trash2, AlertTriangle, Users, Loader2 } from 'lucide-react';
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
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-primary mx-auto" />
          <h1 className="text-xl font-semibold text-foreground">Loading Settings...</h1>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        {/* Profile Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
            <User className="w-5 h-5 text-primary" />
            <h2>Profile</h2>
          </div>

          <div className="bg-card border border-border rounded-xl p-6 space-y-6 shadow-sm">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Display Name
              </label>
              <input
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-input transition-colors"
                placeholder="Enter your name (optional)"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Current Role
              </label>
              <select
                value={profile?.currentRole || Role.MENTEE}
                onChange={(e) => handleRoleChange(e.target.value as Role)}
                className="w-full p-3 bg-background border border-input rounded-lg focus:ring-2 focus:ring-ring focus:border-input transition-colors"
              >
                {roles.map((role) => (
                  <option key={role.value} value={role.value}>
                    {role.label}
                  </option>
                ))}
              </select>
              <p className="text-xs text-muted-foreground">
                This determines which daily plan you see by default
              </p>
            </div>

            <button
              onClick={handleSaveProfile}
              className="w-full btn btn-primary flex items-center justify-center gap-2"
            >
              <Save className="w-4 h-4" />
              Save Profile
            </button>
          </div>
        </div>

        {/* Backup & Danger Zone in right column */}
        <div className="space-y-6">
          {/* Backup Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
              <Download className="w-5 h-5 text-primary" />
              <h2>Backup & Restore</h2>
            </div>

            <div className="bg-card border border-border rounded-xl p-6 space-y-4 shadow-sm">
              <div className="space-y-3">
                <button
                  onClick={handleExport}
                  className="w-full btn btn-secondary flex items-center justify-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  Export Backup
                </button>
                <button
                  onClick={handleImport}
                  className="w-full btn btn-secondary flex items-center justify-center gap-2"
                >
                  <Upload className="w-4 h-4" />
                  Import Backup
                </button>
              </div>

              <p className="text-xs text-muted-foreground text-center">
                Export creates a JSON file with all your data. Import restores from a backup file.
              </p>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-lg font-semibold text-destructive">
              <AlertTriangle className="w-5 h-5" />
              <h2>Danger Zone</h2>
            </div>

            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 space-y-4">
              <button
                onClick={handleReset}
                className="w-full bg-destructive text-destructive-foreground py-2 px-4 rounded-lg hover:bg-destructive/90 transition-colors flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Reset App
              </button>

              <p className="text-xs text-destructive/80 text-center">
                This will permanently delete all your data, contacts, and activity history.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contacts Section - full width */}
      <div className="space-y-6">
        <div className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <Users className="w-5 h-5 text-primary" />
          <h2>My Contacts</h2>
        </div>

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden">
          {contacts.length > 0 ? (
            <div className="divide-y divide-border">
              {contacts.map((contact) => (
                <div key={contact.id} className="flex justify-between items-center p-4 hover:bg-accent/50 transition-colors">
                  <div>
                    <div className="font-medium text-foreground">{contact.relation || 'Contact'}</div>
                    <div className="text-sm text-muted-foreground">{contact.name || contact.displayName}</div>
                    <div className="text-xs text-muted-foreground/60">Added: {new Date(contact.addedAt).toLocaleDateString()}</div>
                  </div>
                  <button className="text-destructive text-sm hover:text-destructive/80 transition-colors p-2 hover:bg-destructive/10 rounded-lg">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-muted-foreground">
              <Users className="w-12 h-12 mx-auto mb-3 text-muted-foreground/20" />
              <p className="text-sm font-medium">No contacts yet</p>
              <p className="text-xs mt-1">Use the Link & QR page to connect with others</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}