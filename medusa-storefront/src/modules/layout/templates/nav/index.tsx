'use client';

import { useMobileMenu } from '@lib/context/mobile-menu-context';
import Hamburger from '@modules/common/components/hamburger';
import CartDropdown from '@modules/layout/components/cart-dropdown';
import MobileMenu from '@modules/mobile-menu/templates';
import NavbarSearchContainer from '@modules/search/components/navbar-search-container';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

const Nav = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

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
    <div className="group sticky inset-x-0 top-0 z-50">
      <header className="relative mx-auto flex h-16 px-8">
        <div className="hidden h-full flex-grow items-center justify-center small:flex small:flex-grow-0">
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
          className="text-small-regular txt-xsmall-plus flex h-full w-full items-center justify-between text-ui-fg-subtle"
          variants={variants}
          animate={hidden ? 'hidden' : 'visible'}
          transition={{ ease: [0.1, 0.25, 0.3, 1], duration: 0.4 }}
        >
          <div className="flex h-full basis-0 items-center small:flex-none">
            <div className="block small:hidden">
              <Hamburger setOpen={toggle} />
            </div>
          </div>

          <div className="flex h-full flex-grow items-center justify-center small:flex-grow-0">
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

          <div className="hidden h-full flex-grow items-center justify-center gap-4 small:flex">
            <Link
              href="/"
              className="txt-compact-xlarge-plus uppercase hover:text-ui-fg-base"
            >
              Home
            </Link>
            <Link
              href="/store"
              className="txt-compact-xlarge-plus uppercase hover:text-ui-fg-base"
            >
              Store
            </Link>
            <Link
              href="/about"
              className="txt-compact-xlarge-plus uppercase hover:text-ui-fg-base"
            >
              About
            </Link>
          </div>

          <div className="flex h-full items-center justify-end gap-x-6">
            <div className="hidden small:flex">
              <NavbarSearchContainer />
            </div>
            <div className="hidden h-full items-center gap-x-6 small:flex">
              <Link className="hover:text-ui-fg-base" href="/account">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
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
