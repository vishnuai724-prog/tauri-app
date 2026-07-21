/**
 * features/auth/index.ts
 * -----------------------
 * Public API barrel for the auth feature.
 *
 * External modules should import auth primitives exclusively from this file.
 * Internals (e.g. hook implementation details) are NOT re-exported here —
 * only the surface area that cross-feature code legitimately needs.
 *
 * Exports:
 *  - Domain types    → AuthUser, LoginCredentials, AuthState
 *  - Schemas         → loginSchema, emailField, passwordField, loginDefaults
 *  - Schema types    → LoginFormInput, LoginFormOutput
 *  - Validation      → AUTH_VALIDATION, AUTH_MESSAGES
 *  - Business hook   → useLoginForm
 *  - UI components   → LoginPage
 */

// ── Domain types ──────────────────────────────────────────────────────────────
export type { AuthUser, LoginCredentials, AuthState } from './types/auth.types';

// ── Validation schemas, primitives & inferred types ───────────────────────────
export {
  loginSchema,
  emailField,
  passwordField,
  loginDefaults,
  AUTH_VALIDATION,
  AUTH_MESSAGES,
} from './schemas/auth.schema';
export type { LoginFormInput, LoginFormOutput } from './schemas/auth.schema';

// ── Hooks ─────────────────────────────────────────────────────────────────────
export { useLoginForm } from './hooks/useLoginForm';
export type { UseLoginFormOptions, UseLoginFormReturn } from './hooks/useLoginForm';

// ── Page (router entry point) ─────────────────────────────────────────────────
export { LoginPage } from './pages/LoginPage';
export * from './store/useAuthStore';
