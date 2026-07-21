import React from 'react';
import { useLoginForm } from '../../hooks/useLoginForm';
import type { LoginCredentials } from '../../types/auth.types';
import type { LoginFormOutput } from '../../schemas/auth.schema';
import { Input } from '../../../../shared/components/ui/Input/Input';
import { Button } from '../../../../shared/components/ui/Button/Button';
import './LoginForm.css';

export interface LoginFormProps {
  onLoginSuccess: (credentials: LoginCredentials) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const {
    register,
    errors,
    isSubmitting,
    showPassword,
    togglePassword,
    handleSubmit,
  } = useLoginForm({
    onSubmit: (data: LoginFormOutput) => {
      onLoginSuccess({
        email: data.email,
        password: data.password,
        rememberMe: data.rememberMe,
      });
    },
  });

  return (
    <div className="login-card">
      {/* Google SSO */}
      <button type="button" className="btn-social">
        <svg
          className="btn-social__icon"
          width="18"
          height="18"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            fill="#4285F4"
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          />
          <path
            fill="#34A853"
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          />
          <path
            fill="#FBBC05"
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
          />
          <path
            fill="#EA4335"
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
          />
        </svg>
        Continue with Google
      </button>

      {/* Divider */}
      <div className="login-divider" role="separator">
        <span>or sign in with email</span>
      </div>

      {/* Form */}
      <form className="login-form" onSubmit={handleSubmit} noValidate>
        <Input
          label="Email address"
          type="email"
          placeholder="you@example.com"
          {...register('email')}
          error={errors.email?.message}
          autoComplete="email"
          required
        />

        <div className="form-group">
          <div className="form-label-row">
            <label className="form-label">Password</label>
            <a href="#" className="form-link">
              Forgot password?
            </a>
          </div>
          <div className="input-wrapper">
            <input
              type={showPassword ? 'text' : 'password'}
              className={`form-input form-input--padded ${errors.password ? 'form-input--error' : ''}`}
              placeholder="••••••••"
              {...register('password')}
              autoComplete="current-password"
              required
            />
            <button
              type="button"
              className="input-toggle"
              onClick={togglePassword}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              {showPassword ? (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94" />
                  <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              ) : (
                <svg
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}
            </button>
          </div>
          {errors.password && <p className="form-error-text">{errors.password.message}</p>}
        </div>

        {/* Remember me */}
        <div className="form-row">
          <label className="checkbox-label">
            <input
              type="checkbox"
              className="checkbox-input"
              {...register('rememberMe')}
            />
            <span className="checkbox-custom" aria-hidden="true" />
            Remember me for 30 days
          </label>
        </div>

        {/* Submit */}
        <Button type="submit" isLoading={isSubmitting} className="w-full">
          Sign in
        </Button>
        
        <Button 
          type="button" 
          variant="secondary"
          className="w-full mt-3 border-cyan-200 hover:bg-cyan-50 dark:border-cyan-900 dark:hover:bg-cyan-950/30 text-cyan-700 dark:text-cyan-400"
          onClick={() => {
            onLoginSuccess({
              email: 'admin@qlims.com',
              password: 'Password123!',
              rememberMe: true,
            });
          }}
        >
          Quick Demo Login
        </Button>
      </form>
    </div>
  );
};
