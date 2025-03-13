// src/components/auth/ProtectedRoute.tsx
'use client';

import { useAuth } from '@/context/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Skip redirection while loading
    if (loading) return;

    const publicPaths = ['/login', '/signup'];
    const isPublicPath = publicPaths.some(path => pathname === path || pathname.startsWith(path + '/'));

    // If user is not logged in and trying to access protected route
    if (!user && !isPublicPath) {
      router.push('/login');
      return;
    }

    // If user is logged in but hasn't completed onboarding and not on onboarding page
    if (user && !user.onboardingCompleted && pathname !== '/onboarding') {
      router.push('/onboarding');
      return;
    }

    // If user is logged in and trying to access auth pages
    if (user && isPublicPath) {
      router.push('/');
      return;
    }
  }, [user, loading, pathname, router]);

  // Show loading state while authentication is being determined
  if (loading) {
    return(
      <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-white"></div>
        <p className="mt-4 text-xl font-semibold">Loading, please wait...</p>
      </div>
    ); 
  }

  // Render children only if conditions are met
  return <>{children}</>;
}