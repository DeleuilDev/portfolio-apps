'use client';

import { useEffect } from 'react';

export default function NotFound() {
  useEffect(() => {
    // Redirect to deleuil.dev after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = 'https://deleuil.dev';
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background font-mono">
      <div className="text-center">
        <h1 className="text-4xl font-semibold text-foreground mb-4">404</h1>
        <p className="text-gray-500 mb-6">Page not found</p>
        <p className="text-sm text-gray-400 mb-8">
          Redirecting to <span className="font-semibold">deleuil.dev</span> in 3 seconds...
        </p>
        <a 
          href="https://deleuil.dev" 
          className="text-foreground hover:text-gray-600 transition-colors underline"
        >
          Go now
        </a>
      </div>
    </div>
  );
} 