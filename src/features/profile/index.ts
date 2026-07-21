/**
 * features/profile/index.ts
 * --------------------------
 * Public API barrel for the profile feature.
 *
 * External modules (e.g. App.tsx, cross-feature routes) should import from
 * this single entry point. Feature-internal files continue to use relative
 * imports between siblings.
 *
 * NOTE: The `ProfileStats` COMPONENT is intentionally NOT re-exported here
 * because its name conflicts with the `ProfileStats` domain interface from
 * profile.types.ts. When you need the component, import it directly:
 *   import { ProfileStats } from 'features/profile/components/ProfileStats'
 *
 * Exports:
 *  - Domain types      → Profile, ProfileStats (interface), ProfileFormValues, ProfileView
 *  - Constants         → MOCK_PROFILE, MOCK_STATS, PROFILE_ROUTES
 *  - Utility functions → getInitials, formatJoinDate, formatStatCount
 *  - Business hooks    → useProfile, useProfileForm
 *  - UI components     → ProfileAvatar, ProfileCard, ProfileForm
 *  - Page              → ProfilePage
 */

// ── Domain types ──────────────────────────────────────────────────────────────
export type { Profile, ProfileStats, ProfileFormValues, ProfileView } from './types/profile.types';

// ── Constants ─────────────────────────────────────────────────────────────────
export { MOCK_PROFILE, MOCK_STATS, PROFILE_ROUTES } from './constants/profile.constants';

// ── Utility functions ─────────────────────────────────────────────────────────
export { getInitials, formatJoinDate, formatStatCount } from './utils/profile.utils';

// ── Business logic hooks ──────────────────────────────────────────────────────
export { useProfile } from './hooks/useProfile';
export { useProfileForm } from './hooks/useProfileForm';

// ── Presentational components ─────────────────────────────────────────────────
// Avatar — circular image/initials fallback, usable across features
export { ProfileAvatar } from './components/ProfileAvatar';
export type { ProfileAvatarProps } from './components/ProfileAvatar';

// Card — sidebar identity card with edit/logout actions
export { ProfileCard } from './components/ProfileCard';
export type { ProfileCardProps } from './components/ProfileCard';

// Form — editable profile fields (name, bio, location, website)
export { ProfileForm } from './components/ProfileForm';
export type { ProfileFormProps } from './components/ProfileForm';

// ── Page (router entry point) ─────────────────────────────────────────────────
export { ProfilePage } from './pages/ProfilePage';
export type { ProfilePageProps } from './pages/ProfilePage';
