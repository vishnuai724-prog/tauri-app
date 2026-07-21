/**
 * @module  auth/schemas/auth.schema
 * @summary Zod validation schemas for the auth feature.
 *
 * Design principles:
 * ─────────────────
 * 1. **Composable primitives** — Field-level schemas (`emailField`, `passwordField`)
 *    are exported so they can be reused across signup, forgot-password, profile-edit, etc.
 * 2. **Validation constants** — All magic numbers, regex patterns, and error strings
 *    are defined once at the top. Swap them for i18n keys when internationalising.
 * 3. **Input ≠ Output types** — Because Zod transforms (trim, lowercase) mutate
 *    values, we export both `z.input` and `z.output` types so RHF generic params
 *    stay correct.
 * 4. **Default values factory** — `loginDefaults()` provides a single source of
 *    truth for `useForm({ defaultValues })` so the hook and tests stay in sync.
 */

import { z } from 'zod';

// ─── Validation Rules ────────────────────────────────────────────────────────
// Centralised magic numbers & regex patterns. Easy to tune and test.

export const AUTH_VALIDATION = {
  email: {
    maxLength: 254, // RFC 5321
  },
  password: {
    minLength: 6,
    maxLength: 128,
  },
} as const;

// ─── Validation Messages ─────────────────────────────────────────────────────
// Externalised for i18n readiness. Swap with `t('auth.email.required')` later.

export const AUTH_MESSAGES = {
  email: {
    required: 'Email address is required.',
    invalid: 'Please enter a valid email address.',
    maxLength: `Email must not exceed ${AUTH_VALIDATION.email.maxLength} characters.`,
  },
  password: {
    required: 'Password is required.',
    minLength: `Password must be at least ${AUTH_VALIDATION.password.minLength} characters.`,
    maxLength: `Password must not exceed ${AUTH_VALIDATION.password.maxLength} characters.`,
  },
} as const;

// ─── Reusable Field Schemas (Composable Primitives) ──────────────────────────
// Use these to build signup, forgot-password, change-password, etc. schemas
// without duplicating validation logic.

/** Validated + normalised email field. */
export const emailField = z
  .string()
  .min(1, AUTH_MESSAGES.email.required)
  .max(AUTH_VALIDATION.email.maxLength, AUTH_MESSAGES.email.maxLength)
  .email(AUTH_MESSAGES.email.invalid)
  .transform((val) => val.trim().toLowerCase());

/** Password field with length constraints (no complexity rules for login). */
export const passwordField = z
  .string()
  .min(1, AUTH_MESSAGES.password.required)
  .min(AUTH_VALIDATION.password.minLength, AUTH_MESSAGES.password.minLength)
  .max(AUTH_VALIDATION.password.maxLength, AUTH_MESSAGES.password.maxLength);

// ─── Login Schema ────────────────────────────────────────────────────────────

export const loginSchema = z.object({
  email: emailField,
  password: passwordField,
  rememberMe: z.boolean().default(false),
});

// ─── Inferred Types ──────────────────────────────────────────────────────────

/** Raw form input values (before Zod transforms). Use with `useForm<LoginFormInput>`. */
export type LoginFormInput = z.input<typeof loginSchema>;

/** Validated + transformed output. This is what `onSubmit` receives. */
export type LoginFormOutput = z.output<typeof loginSchema>;

// ─── Default Values ──────────────────────────────────────────────────────────
// Factory function so every call returns a fresh object (avoids shared-ref bugs).

export const loginDefaults = (): LoginFormInput => ({
  email: '',
  password: '',
  rememberMe: false,
});
