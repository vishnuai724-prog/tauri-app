import React from 'react';
import type { Profile } from '../../types/profile.types';
import { formatJoinDate } from '../../utils/profile.utils';
import { ProfileAvatar } from '../ProfileAvatar';
import { Button } from '@/components/ui/button';
import './ProfileCard.css';

export interface ProfileCardProps {
  profile: Profile;
  onEdit: () => void;
  onLogout: () => void;
}

/* Sidebar summary card responsible for rendering profile identity, metadata, and actions. */
export const ProfileCard: React.FC<ProfileCardProps> = ({ profile, onEdit, onLogout }) => {
  return (
    <aside className="profile-card">
      <div className="profile-card__header">
        <ProfileAvatar name={profile.name} avatarUrl={profile.avatarUrl || undefined} size="xl" />
        <div>
          <h2 className="profile-card__name">{profile.name}</h2>
          <p className="profile-card__email">{profile.email}</p>
        </div>
      </div>

      <p className="profile-card__bio">{profile.bio}</p>

      <div className="profile-card__meta">
        <div className="profile-card__meta-item">
          <span className="profile-card__icon" aria-hidden="true">📍</span>
          <span>{profile.location || 'Location not provided'}</span>
        </div>
        <div className="profile-card__meta-item">
          <span className="profile-card__icon" aria-hidden="true">🔗</span>
          {profile.website ? (
            <a className="profile-card__link" href={profile.website} target="_blank" rel="noreferrer">
              {profile.website}
            </a>
          ) : (
            <span>Website not provided</span>
          )}
        </div>
        <div className="profile-card__meta-item">
          <span className="profile-card__icon" aria-hidden="true">🗓️</span>
          <span>Joined {formatJoinDate(profile.joinDate)}</span>
        </div>
      </div>

      <div className="profile-card__footer">
        <Button variant="default" onClick={onEdit}>Edit Profile</Button>{' '}
        <Button variant="ghost" onClick={onLogout}>Logout</Button>
      </div>
    </aside>
  );
};
