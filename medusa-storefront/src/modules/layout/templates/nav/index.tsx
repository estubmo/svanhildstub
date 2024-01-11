'use client';

import { useMobileMenu } from '@lib/context/mobile-menu-context';
import ClientOnly from '@modules/client-only';
import Hamburger from '@modules/common/components/hamburger';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import NavBarLink from '@modules/layout/components/nav-bar-link';
import MobileMenu from '@modules/mobile-menu/templates';
import NavbarSearchContainer from '@modules/search/components/navbar-search-container';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Nav = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const pathname = usePathname();

  function update() {
    if (scrollY.get() < scrollY.getPrevious()) {
      setHidden(false);
    } else if (scrollY.get() > 100 && scrollY.get() > scrollY.getPrevious()) {
      setHidden(true);
    }
  }

  useMotionValueEvent(scrollY, 'change', () => update());

  const variants = {
    visible: { opacity: 1, y: 0 },
    hidden: { opacity: 0, y: -25 },
  };

  const { toggle } = useMobileMenu();

  return (
    <div className="group sticky inset-x-0 top-0 z-40">
      <header className="relative mx-auto flex h-16">
        <div className="absolute left-0 top-0 z-40 hidden h-full flex-grow items-center justify-center pl-8 small:flex small:flex-grow-0">
          <Link href="/">
            <Image
              className="invert filter transition-transform ease-in-out hover:scale-110 "
              src="/assets/images/stub_sig.png"
              alt="svanhild stub signature"
              width={100}
              height={52}
            />
          </Link>
        </div>
        <motion.nav
          className="text-small-regular txt-xsmall-plus flex h-full w-full items-center justify-between bg-gradient-to-b from-gray-900 to-transparent px-8 text-ui-fg-subtle"
          variants={variants}
          animate={hidden ? 'hidden' : 'visible'}
          transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.4 }}
        >
          <div className="absolute left-0 flex h-full basis-0 items-center pl-8 small:flex-none">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
          </div>

          <div className="flex h-full flex-grow items-center justify-center small:hidden">
            <Link href="/">
              <Image
                className="invert filter"
                src="/assets/images/stub_sig.png"
                alt="svanhild stub signature"
                width={100}
                height={52}
              />
            </Link>
          </div>

          <ClientOnly>
            <div className="hidden h-full flex-grow items-center justify-center gap-4 small:flex">
              <NavBarLink
                route={{ name: 'Home', path: '/' }}
                active={pathname === '/'}
              />
              <NavBarLink
                route={{ name: 'Store', path: '/store' }}
                active={pathname.startsWith('/store')}
              />
              <NavBarLink
                route={{ name: 'About', path: '/about' }}
                active={pathname === '/about'}
              />
            </div>
          </ClientOnly>

          <div className="absolute right-0 top-0 flex h-full items-center justify-end gap-x-6 pr-8">
            <div className="hidden small:flex">
              <NavbarSearchContainer />
            </div>
            <div className="hidden h-full items-center gap-x-6 small:flex">
              <Link className="text-gray-200 hover:text-white" href="/account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </Link>
            </div>
            <CartDropdown />
          </div>
        </motion.nav>
        <MobileMenu />
      </header>
    </div>
  );
};

export default Nav;
