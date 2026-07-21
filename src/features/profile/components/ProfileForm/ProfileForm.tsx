import React from 'react';
import type { Profile, ProfileFormValues } from '../../types/profile.types';
import { useProfileForm } from '../../hooks/useProfileForm';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import './ProfileForm.css';

export interface ProfileFormProps {
  profile: Profile;
  onSave: (values: ProfileFormValues) => void;
  onCancel: () => void;
}

/* Presentational edit form wired to feature state through useProfileForm. */
export const ProfileForm: React.FC<ProfileFormProps> = ({
  profile,
  onSave,
  onCancel,
}) => {
  const {
    values,
    errors,
    isDirty,
    handleChange,
    handleSubmit,
    handleCancel,
  } = useProfileForm({ profile, onSave, onCancel });

  return (
    <form className="profile-form" onSubmit={handleSubmit}>
      <div className="profile-form__header">
        <h2 className="profile-form__title">Edit Profile</h2>
        <p className="profile-form__subtitle">Update your personal information and public profile.</p>
      </div>

      <div className="profile-form__body">
        <div className="input-group">
          <label className="input-label">Full Name</label>
          <Input
            type="text"
            value={values.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('name', e.target.value)}
            placeholder="e.g. Alex Rivera"
            required
          />
          {errors.name && <p className="form-error-text">{errors.name}</p>}
        </div>

        <div className="input-group">
          <label className="input-label">Bio</label>
          <textarea
            className="profile-form__textarea"
            value={values.bio}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange('bio', e.target.value)}
            placeholder="Tell us about yourself..."
            rows={4}
          />
          <p className="input-hint">Brief description for your profile. URLs are allowed.</p>
        </div>

        <div className="input-group">
          <label className="input-label">Location</label>
          <Input
            type="text"
            value={values.location}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('location', e.target.value)}
            placeholder="e.g. San Francisco, CA"
          />
        </div>

        <div className="input-group">
          <label className="input-label">Website</label>
          <Input
            type="url"
            value={values.website}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange('website', e.target.value)}
            placeholder="e.g. https://alexrivera.design"
          />
          {errors.website && <p className="form-error-text">{errors.website}</p>}
        </div>
      </div>

      <div className="profile-form__footer">
        <Button type="button" variant="ghost" onClick={handleCancel}>Cancel</Button>
        <Button type="submit" variant="default" disabled={!isDirty}>Save Changes</Button>
      </div>
    </form>
  );
}
