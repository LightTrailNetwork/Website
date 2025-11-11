import { useState, useEffect } from 'react';
import { getProfile, setProfile, createProfile } from '../data/db';
import { Role } from '../data/types';
import type { UserProfile } from '../data/types';

export function useProfile() {
  const [profile, setProfileState] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      let userProfile = await getProfile();
      
      if (!userProfile) {
        // Create default profile if none exists
        userProfile = await createProfile(undefined, Role.MENTEE);
      }
      
      setProfileState(userProfile);
    } catch (error) {
      console.error('Failed to load profile:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!profile) return;

    const updatedProfile = { ...profile, ...updates };
    
    try {
      await setProfile(updatedProfile);
      setProfileState(updatedProfile);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  const updateRole = async (newRole: Role) => {
    await updateProfile({ currentRole: newRole });
  };

  const updateDisplayName = async (newName: string | null) => {
    await updateProfile({ displayName: newName });
  };

  return {
    profile,
    loading,
    updateProfile,
    updateRole,
    updateDisplayName,
    reload: loadProfile
  };
}