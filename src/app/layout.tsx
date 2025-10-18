import * as React from 'react';
import type { Viewport } from 'next';

import '@/styles/global.css';

import { UserProvider } from '@/contexts/user-context';
import { LocalizationProvider } from '@/components/core/localization-provider';
import { ThemeProvider } from '@/components/core/theme-provider/theme-provider';

export const viewport = {
  width: 'device-width',
  initialScale: 1,
} satisfies Viewport;

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps): React.JSX.Element {
  // ✅ Bắt buộc có "use client" để tất cả Provider không bị render 2 môi trường khác nhau (SSR mismatch)
  // ✅ Bao quanh tất cả provider — cấu trúc Provider phải khớp thứ tự (Localization → User → Theme)
  // ✅ Thêm suppressHydrationWarning cho body để tránh cảnh báo React 18 hydration mismatch

  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <LocalizationProvider>
          <UserProvider>
            <ThemeProvider>{children}</ThemeProvider>
          </UserProvider>
        </LocalizationProvider>
      </body>
    </html>
  );
}
