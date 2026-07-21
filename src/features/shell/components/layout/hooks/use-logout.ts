"use client";

import { useAuth } from "@/shared/contexts/auth-context";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function useLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully", {
        description: "You have been logged out of your account.",
      });
      navigate("/sign-in");
    } catch {
      toast.error("Logout failed", {
        description: "An error occurred while logging out.",
      });
    }
  };

  return { showLogoutDialog, setShowLogoutDialog, handleLogout };
}
