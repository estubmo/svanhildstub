import Providers from '@modules/providers';
import { Metadata, Viewport } from 'next';

import 'styles/globals.css';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://localhost:8000';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: 'Svanhild Stub',
  description:
    'Svanhild Stub is a Norwegian artist and painter. She is known for her unique abstract work.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  interactiveWidget: 'resizes-content', // This is here so that OSK resize the content instead of overlapping it
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html
      lang="en"
      data-mode="dark"
      style={{ scrollbarGutter: 'stable' }}
      className="overflow-x-hidden"
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <main className="relative flex min-h-screen flex-1 flex-col bg-gray-900">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
