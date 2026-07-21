"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar";
import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { useLogout } from "@/features/shell/components/layout/hooks/use-logout";
import { useAuth } from "@/shared/contexts/auth-context";
import { Link } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/shared/components/ui/alert-dialog";
import { CreditCard, LogOut, Settings, User } from "lucide-react";

export function ProfileDropdown() {
  const { user } = useAuth();
  const { showLogoutDialog, setShowLogoutDialog, handleLogout } = useLogout();

  if (!user) return null;
  const initials = user.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={user.avatar} alt={user.name} />
              <AvatarFallback>{initials}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{user.name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <Link to="/settings/account" className="flex w-full cursor-pointer items-center">
              <User className="mr-2 size-4" />
              Profile
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings/billing" className="flex w-full cursor-pointer items-center">
              <CreditCard className="mr-2 size-4" />
              Billing
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/settings" className="flex w-full cursor-pointer items-center">
              <Settings className="mr-2 size-4" />
              Settings
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onSelect={() => setShowLogoutDialog(true)} className="cursor-pointer text-destructive focus:bg-destructive/10 focus:text-destructive">
            <LogOut className="mr-2 size-4" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <AlertDialog open={showLogoutDialog} onOpenChange={setShowLogoutDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to log out? You will need to sign in again
              to access your account.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleLogout}>
              Confirm
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
