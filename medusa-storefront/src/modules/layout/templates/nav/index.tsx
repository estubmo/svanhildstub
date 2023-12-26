"use client";

import { useMobileMenu } from "@lib/context/mobile-menu-context";
import Hamburger from "@modules/common/components/hamburger";
import CartDropdown from "@modules/layout/components/cart-dropdown";
import MobileMenu from "@modules/mobile-menu/templates";
import NavbarSearchContainer from "@modules/search/components/navbar-search-container";
import Link from "next/link";

const Nav = () => {
  const { toggle } = useMobileMenu();

  return (
    <div className="sticky top-0 inset-x-0 z-50 group">
      <header className="relative h-16 px-8 mx-auto border-b duration-200 bg-ui-bg-base border-ui-border-base">
        <nav className="txt-xsmall-plus text-ui-fg-subtle flex items-center justify-between w-full h-full text-small-regular">
          <div className="small:flex-none basis-0 h-full flex items-center">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
          </div>

          <div className="flex flex-grow small:flex-grow-0 justify-center items-center h-full">
            <Link
              href="/"
              className="txt-compact-xlarge-plus hover:text-ui-fg-base uppercase"
            >
              Svanhild Stub
            </Link>
          </div>

          <div className="hidden small:flex flex-grow justify-center items-center h-full">
            <NavbarSearchContainer />
          </div>

          <div className="flex items-center gap-x-6 h-full justify-end">
            <div className="hidden small:flex items-center gap-x-6 h-full">
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
