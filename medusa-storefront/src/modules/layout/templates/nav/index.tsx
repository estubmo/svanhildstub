'use client';

import { useMobileMenu } from '@lib/context/mobile-menu-context';
import Hamburger from '@modules/common/components/hamburger';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import MobileMenu from '@modules/mobile-menu/templates';
import NavbarSearchContainer from '@modules/search/components/navbar-search-container';
import Link from 'next/link';

const Nav = () => {
  const { toggle } = useMobileMenu();

  return (
    <div className="group sticky inset-x-0 top-0 z-50">
      <header className="relative mx-auto h-16 border-b border-ui-border-base bg-ui-bg-base px-8 duration-200">
        <nav className="text-small-regular txt-xsmall-plus flex h-full w-full items-center justify-between text-ui-fg-subtle">
          <div className="flex h-full basis-0 items-center small:flex-none">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
          </div>

          <div className="flex h-full flex-grow items-center justify-center small:flex-grow-0">
            <Link
              href="/"
              className="txt-compact-xlarge-plus uppercase hover:text-ui-fg-base"
            >
              Svanhild Stub
            </Link>
          </div>

          <div className="hidden h-full flex-grow items-center justify-center small:flex">
            <NavbarSearchContainer />
          </div>

          <div className="flex h-full items-center justify-end gap-x-6">
            <div className="hidden h-full items-center gap-x-6 small:flex">
              <Link className="hover:text-ui-fg-base" href="/account">
                Account
              </Link>
            </div>
            <CartDropdown />
          </div>
        </nav>
        <MobileMenu />
      </header>
    </div>
  );
};

export default Nav;
