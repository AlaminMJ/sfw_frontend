"use client";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/router";
import { ComponentType, useEffect } from "react";

const withAuth = <P extends object>(WrappedComponent: ComponentType<P>) => {
  const AuthenticatedComponent = (props: P) => {
    const { user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (!loading && !user) {
        router.push("/login"); // Redirect to login if not authenticated
      }
    }, [loading, user, router]);

    if (loading) {
      return <div>Loading...</div>; // Replace with a spinner or loading screen
    }

    if (!user) {
      return null; // Avoid rendering the wrapped component until redirected
    }

    return <WrappedComponent {...props} />;
  };

  return AuthenticatedComponent;
};

export default withAuth;
