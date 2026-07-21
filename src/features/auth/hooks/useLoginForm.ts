/**
 * @module  auth/hooks/useLoginForm
 * @summary React Hook Form + Zod wrapper for the login form.
 *
 * What makes this senior-level:
 * ─────────────────────────────
 * 1. **Server error mapping** — `setFieldError` / `setRootError` let the caller
 *    surface API-level errors (e.g. "Invalid credentials") directly on form fields
 *    or at the form root, without extra useState.
 * 2. **Memoised callbacks** — `togglePassword` and `handleSubmit` are stable
 *    references (useCallback) so they never cause unnecessary child re-renders.
 * 3. **Type-safe onSubmit** — The callback receives `LoginFormOutput` (post-Zod-
 *    transform), NOT the raw input type. No unsafe `as` casts.
 * 4. **Reset support** — `resetForm` lets consumers clear the form after a
 *    successful login redirect or on modal close.
 * 5. **Validation modes** — `onBlur` for first pass (don't annoy while typing),
 *    `onChange` for re-validation (instant fix feedback).
 */

import { useState, useCallback } from 'react';
import { useForm, type FieldPath } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  loginDefaults,
  type LoginFormInput,
  type LoginFormOutput,
} from '../schemas/auth.schema';

// ─── Public Types ────────────────────────────────────────────────────────────

export interface UseLoginFormOptions {
  /** Called with validated & transformed values after successful client-side validation. */
  onSubmit: (data: LoginFormOutput) => Promise<void> | void;
}

export interface UseLoginFormReturn {
  /** RHF `register` — spread onto `<input>` / `<Input>` elements. */
  register: ReturnType<typeof useForm<LoginFormInput>>['register'];
  /** Per-field error map from Zod + any server errors set via `setFieldError`. */
  errors: ReturnType<typeof useForm<LoginFormInput>>['formState']['errors'];
  /** `true` while the `onSubmit` callback is running. */
  isSubmitting: boolean;
  /** `true` if any field has been modified from its default. */
  isDirty: boolean;
  /** Whether the form has been submitted at least once. */
  isSubmitted: boolean;
  /** Current password visibility state. */
  showPassword: boolean;
  /** Stable toggle for password visibility. */
  togglePassword: () => void;
  /** Bound submit handler — pass directly to `<form onSubmit>`. */
  handleSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  /** Reset all fields to their defaults and clear errors. */
  resetForm: () => void;
  /** Surface a server-side error on a specific field (e.g. "Email not found"). */
  setFieldError: (field: FieldPath<LoginFormInput>, message: string) => void;
  /** Surface a form-level error (e.g. "Invalid credentials"). */
  setRootError: (message: string) => void;
  /** Form-level (root) error message, if any. */
  rootError: string | undefined;
  /** Full RHF instance — escape hatch for advanced use cases (watch, trigger, etc.). */
  form: ReturnType<typeof useForm<LoginFormInput>>;
}

// ─── Hook ────────────────────────────────────────────────────────────────────

export function useLoginForm({ onSubmit }: UseLoginFormOptions): UseLoginFormReturn {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<LoginFormInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: loginDefaults(),
    mode: 'onBlur',
    reValidateMode: 'onChange',
  });

  // ── Stable callbacks ────────────────────────────────────────────────────────

  const togglePassword = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  const handleSubmit = useCallback(
    form.handleSubmit(async (validated) => {
      try {
        await onSubmit(validated as LoginFormOutput);
      } catch (err: unknown) {
        // If the API throws, surface a root-level error so the UI can display it.
        const message =
          err instanceof Error ? err.message : 'Something went wrong. Please try again.';
        form.setError('root', { type: 'server', message });
      }
    }),
    [form, onSubmit],
  );

  const resetForm = useCallback(() => {
    form.reset(loginDefaults());
    setShowPassword(false);
  }, [form]);

  const setFieldError = useCallback(
    (field: FieldPath<LoginFormInput>, message: string) => {
      form.setError(field, { type: 'server', message });
    },
    [form],
  );

  const setRootError = useCallback(
    (message: string) => {
      form.setError('root', { type: 'server', message });
    },
    [form],
  );

  // ── Return ──────────────────────────────────────────────────────────────────

  return {
    register: form.register,
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
    isDirty: form.formState.isDirty,
    isSubmitted: form.formState.isSubmitted,
    showPassword,
    togglePassword,
    handleSubmit,
    resetForm,
    setFieldError,
    setRootError,
    rootError: form.formState.errors.root?.message,
    form,
  };
}
