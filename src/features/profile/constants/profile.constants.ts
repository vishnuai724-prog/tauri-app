import type { Profile, ProfileStats } from '../types/profile.types';

/* Seed data and route metadata used by the profile feature. */
export const MOCK_PROFILE: Profile = {
  id: 'usr_1',
  name: 'Alex Rivera',
  email: 'alex.rivera@graphify.io',
  bio: 'Senior Product Designer & Frontend Architect. Building the future of visual graph databases and interactive node environments.',
  location: 'San Francisco, CA',
  website: 'https://alexrivera.design',
  joinDate: '2023-04-15T08:30:00.000Z',
};

export const MOCK_STATS: ProfileStats = {
  projectsCount: 34,
  followersCount: 1240,
  contributionsCount: 842,
};

export const PROFILE_ROUTES = {
  view: '/profile',
  edit: '/profile/edit',
};
