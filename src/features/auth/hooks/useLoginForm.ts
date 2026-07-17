import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useAuthStore } from "../store/useAuthStore";
import { loginSchema } from "../constants/auth.constants";
import type { LoginFormValues } from "../types/auth.types";

/**
 * Encapsulates all login form state and submission logic.
 * Keeps the LoginForm component purely presentational.
 */
export function useLoginForm() {
  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormValues) => {
    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Dummy authentication success
      login(
        {
          id: "usr_123",
          name: "Dr. Admin",
          email: data.email,
          role: "admin",
        },
        "dummy-jwt-token",
      );

      toast.success("Successfully logged in to QLIMS");
      navigate("/");
    } catch {
      toast.error("Authentication failed", {
        description: "Please check your credentials and try again.",
      });
    }
  };

  return {
    register: form.register,
    handleSubmit: form.handleSubmit(onSubmit),
    errors: form.formState.errors,
    isSubmitting: form.formState.isSubmitting,
  };
}
