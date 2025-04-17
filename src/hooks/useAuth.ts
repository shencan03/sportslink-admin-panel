// src/hooks/useAuth.ts
"use client";

import { useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export const useAuth = (requireAuth = true) => {
  const { isAuthenticated, user } = useAuthStore();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // If authentication is required but user is not authenticated
    if (requireAuth && !isAuthenticated) {
      // Store the intended path for redirect after login
      if (pathname !== "/login") {
        sessionStorage.setItem("redirectPath", pathname);
      }
      router.push("/login");
    }

    // If user is already authenticated and tries to access login page
    if (isAuthenticated && pathname === "/login") {
      // Redirect to dashboard or stored redirect path
      const redirectPath =
        sessionStorage.getItem("redirectPath") || "/dashboard";
      sessionStorage.removeItem("redirectPath");
      router.push(redirectPath);
    }
  }, [isAuthenticated, pathname, requireAuth, router]);

  return { isAuthenticated, user };
};

export default useAuth;
