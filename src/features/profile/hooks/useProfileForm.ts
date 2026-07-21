import { useState, useEffect } from 'react';
import type { Profile, ProfileFormValues } from '../types/profile.types';

interface UseProfileFormProps {
  profile: Profile;
  onSave: (values: ProfileFormValues) => void;
  onCancel: () => void;
}

/* Handles controlled profile form state, validation, dirty tracking, and submit/cancel orchestration. */
export function useProfileForm({ profile, onSave, onCancel }: UseProfileFormProps) {
  const [values, setValues] = useState<ProfileFormValues>({
    name: profile.name,
    bio: profile.bio,
    location: profile.location,
    website: profile.website,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProfileFormValues, string>>>({});
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    setValues({
      name: profile.name,
      bio: profile.bio,
      location: profile.location,
      website: profile.website,
    });
    setIsDirty(false);
    setErrors({});
  }, [profile]);

  const handleChange = (key: keyof ProfileFormValues, value: string) => {
    setValues((prev) => {
      const next = { ...prev, [key]: value };
      setIsDirty(
        next.name !== profile.name ||
        next.bio !== profile.bio ||
        next.location !== profile.location ||
        next.website !== profile.website
      );
      return next;
    });

    if (errors[key]) {
      setErrors((prev) => ({ ...prev, [key]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ProfileFormValues, string>> = {};
    if (!values.name.trim()) {
      newErrors.name = 'Name is required';
    }
    if (values.website.trim() && !/^https?:\/\/[^\s$.?#].[^\s]*$/i.test(values.website.trim())) {
      newErrors.website = 'Please enter a valid URL (including http:// or https://)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      onSave(values);
    }
  };

  return {
    values,
    errors,
    isDirty,
    handleChange,
    handleSubmit,
    handleCancel: onCancel,
  };
}
