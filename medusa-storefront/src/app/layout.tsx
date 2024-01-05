import Providers from '@modules/providers';

import 'styles/globals.css';

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
