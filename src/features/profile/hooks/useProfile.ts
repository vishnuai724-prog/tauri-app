import { useState, useCallback } from 'react';
import type { Profile, ProfileStats, ProfileView } from '../types/profile.types';
import { MOCK_PROFILE, MOCK_STATS } from '../constants/profile.constants';
import { useLocalStorage } from '../../../shared/hooks/useLocalStorage';

/* Owns persisted profile state and the view/edit mode transitions for the profile page. */
export function useProfile() {
  const [profile, setProfile] = useLocalStorage<Profile>('graphify_user_profile', MOCK_PROFILE);
  const [stats] = useState<ProfileStats>(MOCK_STATS);
  const [viewMode, setViewMode] = useState<ProfileView>('view');

  const updateProfile = useCallback((updatedFields: Partial<Profile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedFields,
    }));
    setViewMode('view');
  }, [setProfile]);

  const toggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev === 'view' ? 'edit' : 'view'));
  }, []);

  return {
    profile,
    stats,
    viewMode,
    setViewMode,
    updateProfile,
    toggleViewMode,
  };
}
