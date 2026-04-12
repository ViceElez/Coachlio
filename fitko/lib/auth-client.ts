"use client";

import { routes } from "@/constants/routes";
import { createClient } from "@/utils/supabase/client";

export async function sendResetPassword(email: string) {
  const supabase = createClient();
  const redirectTo = `${window.location.origin}/${routes.ENTERNEWPASSWORD}`;

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo,
  });

  if (error) {
    console.log(error);
    return {
      success: false as const,
      error: "Failed to send reset password email. Please try again.",
    };
  }

  return { success: true as const };
}

export async function updatePassword(newPassword: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  if (error) {
    console.log(error);
    return {
      success: false as const,
      error: "Failed to update password. Please try again.",
    };
  }

  return { success: true as const };
}

