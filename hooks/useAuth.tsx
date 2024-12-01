"use client";
import { useState, useEffect } from "react";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import apiClient from "@/lib/api";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  // Add other user properties as needed
}

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  logout: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const token = getCookie("accessToken");
      if (token) {
        try {
          const userData: User = await apiClient("/api/auth/me");
          if (userData) {
            setUser(userData);
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching user:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    };

    fetchUser();
  }, []);

  const logout = async () => {
    const res = await apiClient("/api/auth/logout");
    deleteCookie("accessToken");
    deleteCookie("refreshToken");
    setUser(null);
    router.push("/login");
  };

  return { user, loading, logout };
};
