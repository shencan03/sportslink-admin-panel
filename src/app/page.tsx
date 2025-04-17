// src/app/page.tsx
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/authStore";

export default function Home() {
  const router = useRouter();
  const { isAuthenticated } = useAuthStore();

  useEffect(() => {
    // Redirect to login if not authenticated, otherwise to dashboard
    if (!isAuthenticated) {
      router.push("/login");
    } else {
      router.push("/dashboard");
    }
  }, [isAuthenticated, router]);

  // This page acts as a router only
  return null;
}
