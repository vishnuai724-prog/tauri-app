import React from 'react';
import { getInitials } from '../../utils/profile.utils';
import './ProfileAvatar.css';

export interface ProfileAvatarProps {
  name: string;
  avatarUrl?: string | undefined;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ProfileAvatar: React.FC<ProfileAvatarProps> = ({
  name,
  avatarUrl,
  size = 'md',
}) => {
  const initials = getInitials(name);

  return (
    <div className={`profile-avatar profile-avatar--${size}`}>
      {avatarUrl ? (
        <img src={avatarUrl} alt={name} className="profile-avatar__img" />
      ) : (
        <div className="profile-avatar__fallback" aria-label={name}>
          {initials}
        </div>
      )}
    </div>
  );
};
