import React from 'react';
import type { ProfileStats as IProfileStats } from '../../types/profile.types';
import { formatStatCount } from '../../utils/profile.utils';
import './ProfileStats.css';

export interface ProfileStatsProps {
  stats: IProfileStats;
}

/* Pure statistics view for summarizing headline profile metrics. */
export const ProfileStats: React.FC<ProfileStatsProps> = ({ stats }) => {
  return (
    <div className="profile-stats">
      <div className="profile-stat-item">
        <span className="profile-stat-item__value">{formatStatCount(stats.projectsCount)}</span>
        <span className="profile-stat-item__label">Projects</span>
      </div>

      <div className="profile-stat-item">
        <span className="profile-stat-item__value">{formatStatCount(stats.followersCount)}</span>
        <span className="profile-stat-item__label">Followers</span>
      </div>

      <div className="profile-stat-item">
        <span className="profile-stat-item__value">{formatStatCount(stats.contributionsCount)}</span>
        <span className="profile-stat-item__label">Contributions</span>
      </div>
    </div>
  );
};
