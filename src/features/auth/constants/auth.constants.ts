import * as z from "zod";

// ─── Auth feature constants ──────────────────────────────────────────────────

/** Zod schema for login form validation */
export const loginSchema = z.object({
  email: z.string().email({ error: "Please enter a valid email address." }),
  password: z.string().min(6, { error: "Password must be at least 6 characters." }),
});

/** Auth-related route paths */
export const AUTH_ROUTES = {
  LOGIN: "/login",
} as const;
