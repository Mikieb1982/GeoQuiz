'use client';
import { ThemeProvider } from 'next-themes';
import React from 'react';
import { Toaster } from './ui/toaster';
import OfflineNotifier from './OfflineNotifier';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
      <Toaster />
      <OfflineNotifier />
    </ThemeProvider>
  );
}
