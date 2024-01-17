'use client';

import { QueryProvider } from '@lib/context/query-context';
import { ThemeProvider } from 'next-themes';

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  );
}
