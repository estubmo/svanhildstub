import { listRegions } from '@lib/data/regions';
import LocalizedClientLink from '@modules/common/components/localized-client-link';
import SideMenu from '@modules/layout/components/side-menu';
import NavbarSearchContainer from '@modules/search/components/navbar-search-container';
import Image from 'next/image';
import { Suspense } from 'react';

import CartButton from '../../components/cart-button';
import { MotionNav } from './motion-nav';
import { NavBarLinks } from './navbar-links';

export default async function Nav() {
  const regions = await listRegions().then((regions) => regions);

  return (
    <div className="group sticky inset-x-0 top-0 z-40">
      <header className="relative mx-auto flex h-16">
        <div className="absolute left-0 top-0 z-40 hidden h-full flex-grow items-center justify-center pl-8 small:flex small:flex-grow-0">
          <LocalizedClientLink href="/">
            <Image
              className="invert filter transition-transform duration-300 ease-in-out hover:scale-110 "
              src="/assets/images/stub_sig.png"
              alt="svanhild stub signature"
              width={100}
              height={52}
            />
          </LocalizedClientLink>
        </div>
        <MotionNav>
          <>
            <div className="absolute left-0 right-0 flex h-full basis-0 items-center pl-8 small:flex-none">
              <div className="block small:hidden">
                <SideMenu regions={regions} />
              </div>
            </div>

            <div className="flex h-full flex-grow items-center justify-center small:hidden">
              <LocalizedClientLink href="/">
                <Image
                  className="invert filter"
                  src="/assets/images/stub_sig.png"
                  alt="svanhild stub signature"
                  width={100}
                  height={52}
                />
              </LocalizedClientLink>
            </div>
            <NavBarLinks />

            <div className="absolute right-0 top-0 flex h-full items-center justify-end gap-x-6 pr-8">
              <div className="hidden small:flex">
                <NavbarSearchContainer />
              </div>
              <div className="hidden h-full items-center gap-x-6 small:flex">
                <LocalizedClientLink
                  className="text-gray-200 transition-colors duration-200 ease-out hover:text-white"
                  href="/account"
                >
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
                </LocalizedClientLink>
              </div>
              <Suspense
                fallback={
                  <LocalizedClientLink
                    className="flex items-center justify-center text-xl transition-colors duration-200 ease-out hover:text-white"
                    href="/store/cart"
                  >
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
                      <circle cx="8" cy="21" r="1" />
                      <circle cx="19" cy="21" r="1" />
                      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
                    </svg>
                  </LocalizedClientLink>
                }
              >
                <CartButton regions={regions} />
              </Suspense>
            </div>
          </>
        </MotionNav>
      </header>
    </div>
  );
}
