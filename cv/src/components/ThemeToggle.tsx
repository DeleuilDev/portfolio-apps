'use client';

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Auto-detect system preference on first visit and store for 1 hour
  useEffect(() => {
    setMounted(true);
    
    const stored = localStorage.getItem('theme-preference');
    const timestamp = localStorage.getItem('theme-timestamp');
    const now = Date.now();
    const oneHour = 60 * 60 * 1000; // 1 hour in milliseconds
    
    // If no stored preference or expired (1 hour), detect system preference
    if (!stored || !timestamp || (now - parseInt(timestamp)) > oneHour) {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      const detectedTheme = prefersDark ? 'dark' : 'light';
      
      setTheme(detectedTheme);
      localStorage.setItem('theme-preference', detectedTheme);
      localStorage.setItem('theme-timestamp', now.toString());
    } else {
      // Use stored preference
      setTheme(stored);
    }
  }, [setTheme]);

  if (!mounted) {
    return <div className="w-8 h-8" />; // Placeholder to prevent layout shift
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    
    // Update localStorage with new preference and timestamp
    localStorage.setItem('theme-preference', newTheme);
    localStorage.setItem('theme-timestamp', Date.now().toString());
  };

  const getIcon = () => {
    return theme === 'light' ? (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"/>
      </svg>
    ) : (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd"/>
      </svg>
    );
  };

  const getTitle = () => {
    return theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode';
  };

  return (
    <button
      onClick={toggleTheme}
      title={getTitle()}
      className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors text-gray-500 hover:text-foreground"
      aria-label={getTitle()}
    >
      {getIcon()}
    </button>
  );
} 