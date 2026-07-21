export interface Profile {
  id: string;
  name: string;
  email: string;
  bio: string;
  location: string;
  website: string;
  avatarUrl?: string;
  joinDate: string;
}

export interface ProfileStats {
  projectsCount: number;
  followersCount: number;
  contributionsCount: number;
}

export interface ProfileFormValues {
  name: string;
  bio: string;
  location: string;
  website: string;
}

export type ProfileView = 'view' | 'edit';
