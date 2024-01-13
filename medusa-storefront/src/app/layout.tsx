import Providers from '@modules/providers';
import { Metadata } from 'next';

import 'styles/globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.svanhildstub.com'),
  title: 'Svanhild Stub',
  description:
    'Svanhild Stub is a Norwegian artist and painter. She is known for her unique abstract work.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      data-mode="dark"
      style={{ scrollbarGutter: 'stable' }}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <main className="relative bg-gray-900">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
