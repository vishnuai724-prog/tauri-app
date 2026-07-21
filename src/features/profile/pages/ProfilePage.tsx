import React from 'react';
import { useProfile } from '../hooks/useProfile';
import { ProfileCard } from '../components/ProfileCard/ProfileCard';
import { ProfileStats } from '../components/ProfileStats/ProfileStats';
import { ProfileForm } from '../components/ProfileForm/ProfileForm';
import './ProfilePage.css';

export interface ProfilePageProps {
  onLogout: () => void;
}

export const ProfilePage: React.FC<ProfilePageProps> = ({ onLogout }) => {
  const {
    profile,
    stats,
    viewMode,
    setViewMode,
    updateProfile,
  } = useProfile();

  return (
    <div className="profile-page">
      {/* Header Navigation */}
      <header className="profile-header">
        <div className="profile-header__brand">
          <svg width="32" height="32" viewBox="0 0 40 40" fill="none">
            <circle cx="20" cy="20" r="20" fill="var(--accent)" fillOpacity="0.12" />
            <circle cx="20" cy="20" r="13" fill="var(--accent)" fillOpacity="0.25" />
            <circle cx="20" cy="20" r="7" fill="var(--accent)" />
          </svg>
          <span className="profile-header__title">Graphify Console</span>
        </div>
        <button onClick={onLogout} className="profile-header__logout-btn">
          Sign out
        </button>
      </header>

      {/* Main Content Layout */}
      <main className="profile-main">
        <div className="profile-layout">
          {/* Left Column: Sidebar Card */}
          <div className="profile-layout__sidebar">
            <ProfileCard
              profile={profile}
              onEdit={() => setViewMode('edit')}
              onLogout={onLogout}
            />
          </div>

          {/* Right Column: Main Panel */}
          <div className="profile-layout__content">
            <div className="profile-layout__stack">
              {/* Stats Panel */}
              <ProfileStats stats={stats} />

              {/* View/Edit Toggle Area */}
              {viewMode === 'view' ? (
                <div className="profile-view-panel">
                  <h3 className="profile-view-panel__title">Activity & Contributions</h3>
                  <div className="profile-view-panel__placeholder">
                    <svg className="profile-view-panel__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                      <line x1="9" y1="9" x2="15" y2="9" />
                      <line x1="9" y1="13" x2="15" y2="13" />
                      <line x1="9" y1="17" x2="13" y2="17" />
                    </svg>
                    <p className="profile-view-panel__text">
                      No recent activity to display. Your contributions, commits, and graph visualization projects will appear here.
                    </p>
                  </div>
                </div>
              ) : (
                <ProfileForm
                  profile={profile}
                  onSave={updateProfile}
                  onCancel={() => setViewMode('view')}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
