'use client';

import ClientOnly from '@modules/client-only';
import NavBarLink from '@modules/layout/components/nav-bar-link';
import { useParams, usePathname } from 'next/navigation';

export function NavBarLinks() {
  const { countryCode } = useParams();
  const currentPath = usePathname().split(`/${countryCode}`)[1];

  return (
    <ClientOnly>
      <div className="hidden h-full flex-grow items-center justify-center gap-4 small:flex">
        <NavBarLink
          route={{ name: 'Home', path: '/' }}
          active={currentPath === ''}
        />
        <NavBarLink
          route={{ name: 'Store', path: '/store' }}
          active={currentPath?.startsWith('/store')}
        />
        <NavBarLink
          route={{ name: 'About', path: '/about' }}
          active={currentPath === '/about'}
        />
      </div>
    </ClientOnly>
  );
}
